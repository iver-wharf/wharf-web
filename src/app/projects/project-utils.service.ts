import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Environment } from '../models/environment.model';
import { WharfProject } from '../models/main-project.model';
import { ActionsModalStore } from './actions-modal/actions-modal.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectUtilsService {
  readonly runAllActionName = 'Run all';
  readonly noEnvironmentActionName = '*Only stages without environments filter*';
  readonly noEnvironment = {
    label: this.noEnvironmentActionName,
    value: null,
  } as Environment;
  readonly actionsExcludedElements = ['environments', 'inputs'];

  constructor(
    private actionsModalStore: ActionsModalStore) { }

  getActionsMenuItems(proj: WharfProject): MenuItem[] {
    if (proj.build != null) {
      const actions: MenuItem[] = Object.keys(proj.build)
        .filter(x => !this.actionsExcludedElements.includes(x))
        .map<MenuItem>(x => ({ label: x, value: x, command: () => this.openActions(x, proj) }));
      return actions;
    }
    return [];
  }

  getBuildEnvironments(proj: WharfProject): string[] {
    return [...new Set<string>(Object.keys(proj.build.environments || {}))];
  }

  openActions(label, proj: WharfProject) {
    this.actionsModalStore.openModal(
      {
        project: proj,
        isVisible: true,
        actionName: label,
      },
    );
  }
}
