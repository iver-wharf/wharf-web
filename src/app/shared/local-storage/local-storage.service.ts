import { Injectable } from '@angular/core';
@Injectable()
export class LocalStorageService {

  getData(keyName: string): any {
      return JSON.parse(localStorage.getItem(keyName));
  }

  saveData(data: string, keyName: string): void {
      localStorage.setItem(keyName, data);
  }

  deleteDataIfExists(keyName: string): void {
    localStorage.removeItem(keyName);
  }
}
