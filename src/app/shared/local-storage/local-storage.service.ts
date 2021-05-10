export class LocalStorageService {

  public getData(keyName: string): any {
      return JSON.parse(localStorage.getItem(keyName));
  }

  public saveData(data: string, keyName: string): void {
      localStorage.setItem(keyName, data);
  }

  public deleteDataIfExists(keyName: string): void {
    localStorage.removeItem(keyName);
  }
}
