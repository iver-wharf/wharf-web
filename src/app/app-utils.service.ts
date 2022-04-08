import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {

  constructor() { }

  downloadFile(data: Blob, fileName: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('style', 'display: none');
    link.href = url;
    link.download = fileName;
    link.click();
    link.remove();
  }
}
