import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ActionsModalState {
  isVisible: boolean;
  project: any;
  actionName: string;
}

const state: ActionsModalState = {
  isVisible: false,
  project: null,
  actionName: '',
};

@Injectable({
  providedIn: 'root',
})
export class ActionsModalStore {

  store$ = new BehaviorSubject<ActionsModalState>(state);
  state$ = this.store$.asObservable();

  isVisible$ = this.state$.pipe(map(x => x.isVisible));
  project$ = this.state$.pipe(map(x => x.project));
  actionName$ = this.state$.pipe(map(x => x.actionName));

  constructor() { }

  openModal(newState: ActionsModalState) {
    this.updateState(
      {
        isVisible: newState.isVisible,
        project: newState.project,
        actionName: newState.actionName,
      },
    );
  }

  closeModal() {
    this.updateState({ ...state, isVisible: false });
  }

  private updateState(newState: ActionsModalState) {
    this.store$.next(newState);
  }
}
