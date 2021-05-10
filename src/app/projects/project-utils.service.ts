import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Environment } from '../models/environment.model';
import { WharfProject } from '../models/main-project.model';
import { ActionsModalStore } from './actions-modal/actions-modal.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectUtilsService {
  readonly runAllActionName = 'Run all';
  readonly noEnvironmentActionName = '*Only stages without environments filter*';
  readonly noEnvironment = {
    label: this.noEnvironmentActionName,
    value: null
  } as Environment;
  readonly actionsExcludedElements = ['environments', 'inputs'];

  constructor(
    private actionsModalStore: ActionsModalStore) { }

  getActionsMenuItems(proj: WharfProject): MenuItem[] {
    if (proj.build != null) {
      proj.actions = [];
      return Object.keys(proj.build)
        .filter(x => !this.actionsExcludedElements.includes(x))
        .map((x) => {
          proj.actions.push({ label: x, value: x });
          return { label: x, command: () => this.openActions(x, proj) };
        });
    }
    return [];
  }

  getActionsEnvironments(proj: WharfProject): string[] {
    if (proj.build != null) {
      const actions = Object.keys(proj.build || {})
        .filter(x => !this.actionsExcludedElements.includes(x))
        .map(x => proj.build[x].environments);

      return [...new Set<string>([].concat.apply([], actions))];
    }
    return [];
  }

  getBuildEnvironments(proj: WharfProject): string[] {
    return [...new Set<string>(Object.keys(proj.build.environments || {}))];
  }

  openActions(label, proj) {
    this.actionsModalStore.openModal(
      {
        project: proj,
        isVisible: true,
        actionName: label,
      }
    );
  }
}
