import { Injectable } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage/local-storage.service';

@Injectable()
export class LocalStorageProjectsService {
  private favoriteProjectsKeyName = 'favoriteProjects';

  constructor(private localStorageService: LocalStorageService) {}

  projectIsFavorite(projectId: number): boolean {
    return this.getFavoriteProjectsIds().some(id => id === projectId);
  }

  getFavoriteProjectsIds(): number[] {
    return this.getProjects(this.favoriteProjectsKeyName);
  }

  setFavoriteProjectIds(projectIds: number[]): void {
    this.setProjects(projectIds, this.favoriteProjectsKeyName);
  }

  addToFavoriteProjects(projectId: number): void {
    this.addProject(projectId, this.favoriteProjectsKeyName);
  }

  handleFavoriteButtonClick(projectId: number): void {
    const favoriteProjectsIds = this.getFavoriteProjectsIds();
    if (favoriteProjectsIds.length && this.projectIsFavorite(projectId)) {
        const modifiedFavoriteProjects = this.getProjectsIdsDifference(favoriteProjectsIds, projectId);
        this.localStorageService.saveData(JSON.stringify(modifiedFavoriteProjects), this.favoriteProjectsKeyName);
        return;
    }
    this.addToFavoriteProjects(projectId);
  }

  private getProjects(localStorageKeyName: string): number[] {
    const localStorageItem = this.localStorageService.getData(localStorageKeyName);
    return localStorageItem == null ? [] : localStorageItem;
  }

  private getProjectsIdsDifference(projectsIds: number[], projectId: number): number[] {
    return projectsIds.filter(id => id !== projectId);
  }

  private addProject(
    projectId: number,
    localStorageKeyName: string): void {
    const projectIds = this.getProjects(localStorageKeyName);
    projectIds.unshift(projectId);
    this.setProjects(projectIds, localStorageKeyName);
  }

  private setProjects(projectIds: number[], localStorageKeyName: string): void {
    this.localStorageService.saveData(JSON.stringify([...new Set<number>(projectIds)]), localStorageKeyName);
  }
}
