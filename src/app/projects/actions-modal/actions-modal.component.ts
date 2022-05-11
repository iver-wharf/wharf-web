import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Environment } from 'src/app/models/environment.model';
import { InputField } from 'src/app/models/input-field.model';
import { WharfProject } from 'src/app/models/main-project.model';
import { ProjectBuild } from 'src/app/models/project-build.model';
import { ProjectUtilsService } from './../project-utils.service';
import { ActionsModalStore } from './actions-modal.service';
import { BuildService, EngineService, ProjectService, ResponseEngine } from 'api-client';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'wh-actions-modal',
  templateUrl: './actions-modal.component.html',
})
export class ActionsModalComponent implements OnInit, OnDestroy {
  project: WharfProject;
  editedProjectInstance: WharfProject;
  actionName: string;
  isVisible: boolean;
  actionsFormGroup: FormGroup;
  initialFormState: any;
  engines?: ResponseEngine[];
  defaultEngine?: ResponseEngine;
  private destroyed$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private buildService: BuildService,
    private engineService: EngineService,
    private notificationService: NotificationService,
    public actionsModalStore: ActionsModalStore,
    private projectUtilsService: ProjectUtilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.engineService.getEngineList().pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: resp => {
          this.engines = resp.list;
          this.defaultEngine = resp.defaultEngine;
          const defaultEngineId = this.defaultEngine?.id ?? null;
          this.initialFormState.engine = defaultEngineId;
          this.actionsFormGroup.controls.engine.setValue(defaultEngineId);
        },
        error: err => {
          this.engines = [];
          console.warn('Failed to fetch engines:', err);
        },
      });
    this.actionsModalStore.project$.pipe(takeUntil(this.destroyed$)).subscribe(x => this.project = x);
    this.actionsModalStore.isVisible$.pipe(takeUntil(this.destroyed$)).subscribe(x => this.isVisible = x);
    this.actionsModalStore.actionName$.pipe(takeUntil(this.destroyed$)).subscribe(x => this.actionName = x);
    this.mapBuildProperties();
    this.initializeFormControls();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get shouldShowEnvironmentsForm() {
    // only show if it contains more than just the noEnvironment
    return this.editedProjectInstance.build?.environments?.length > 1;
  }

  submitForm() {
    if (this.actionName === this.projectUtilsService.runAllActionName) {
      this.actionName = 'ALL';
    }
    // Using the fact that we even got some engines as a way to detect
    // the compatibility of wharf-api. If it got engines, then it is in
    // v5.1.0 or greater, and the new startProjectBuild was added in v5.0.0.
    const startBuild$ = this.engines?.length > 0
      ? this.buildService.startProjectBuild(
        this.project.projectId,
        this.actionName,
        this.actionsFormGroup.value.branch.name,
        this.actionsFormGroup.value.environment.value,
        this.actionsFormGroup.value.engine,
        this.actionsFormGroup.value,
      )
      : this.projectService.oldStartProjectBuild(
        this.project.projectId,
        this.actionName,
        this.actionsFormGroup.value.branch.name,
        this.actionsFormGroup.value.environment.value,
        this.actionsFormGroup.value,
      );

    startBuild$.pipe(
      finalize(() => this.cleanup()),
    ).subscribe({
      next: build => {
        this.router.navigate(['build', this.project.projectId, build.buildRef]);
      },
      error: _ => {
        this.notificationService.showError(`Failed to start build`);
      },
    });
  }

  cleanup() {
    this.actionsModalStore.closeModal();
    this.actionsFormGroup.reset();
    this.initializeFormControls();
  }

  private initializeFormControls() {
    const inputsGroup: Record<string, FormControl> = {};
    this.initialFormState = {};
    if (this.editedProjectInstance.build.inputs) {
      this.editedProjectInstance.build.inputs.forEach(input => {
        inputsGroup[input.name] = new FormControl('');
        this.initialFormState[input.name] = input.default || null;
      });
    }
    // eslint-disable-next-line no-underscore-dangle
    this.initialFormState.branch = this.editedProjectInstance.branches?.find(o => o._default) ?? '';
    this.initialFormState.environment =
      this.editedProjectInstance.build.environments[1] // 1 to skip the first noEnvironment
      || this.projectUtilsService.noEnvironment;

    inputsGroup.branch = new FormControl('');
    inputsGroup.environment = new FormControl('');
    inputsGroup.engine = new FormControl('');
    this.actionsFormGroup = new FormGroup(inputsGroup);
    this.initialFormState.engine = this.initialFormState.engine ?? '';
    this.actionsFormGroup.setValue(this.initialFormState);
  }

  private mapBuildProperties() {
    this.initializeEditableProject();
    this.populateFieldsOfEditableProject();
  }

  private initializeEditableProject() {
    this.editedProjectInstance = { ...this.project };
    this.editedProjectInstance.build = new ProjectBuild();
    this.editedProjectInstance.build.inputs = [];
    this.editedProjectInstance.build.environments = [];
  }

  private populateFieldsOfEditableProject() {
    if (this.project?.build?.inputs) {
      Object.values(this.project.build.inputs).map((input, index) => {
        const inputField: InputField = {
          default: input.default,
          name: input.name,
          type: input.type,
        };
        this.editedProjectInstance.build.inputs.push(inputField);
        if (input.type === 'choice') {
          this.populateChoices(index, input);
        }
      });
    }
    if (this.project?.build?.environments) {
      this.populateEnvironments();
    }
  }

  private populateChoices(index: number, input: InputField) {
    this.editedProjectInstance.build.inputs[index].values = [];
    input.values.map(value => {
      const valueItem: SelectItem = { label: JSON.stringify(value), value };
      this.editedProjectInstance.build.inputs[index].values.push(valueItem);
    });
  }

  private populateEnvironments() {
    this.editedProjectInstance.build.environments.push(this.projectUtilsService.noEnvironment);

    const buildEnvironments = this.projectUtilsService.getBuildEnvironments(this.project);
    buildEnvironments.forEach(item => {
      const env: Environment = { label: item, value: item };
      this.editedProjectInstance.build.environments.push(env);
    });
  }
}
