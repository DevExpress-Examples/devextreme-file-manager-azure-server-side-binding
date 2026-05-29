import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
import { DxFileManagerModule, DxLoadPanelModule } from 'devextreme-angular';

@Component({
  imports: [DxFileManagerModule, DxLoadPanelModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true,
})
export class AppComponent {
  allowedFileExtensions: string[];

  fileSystemProvider: RemoteFileSystemProvider;

  wrapperClassName: string;

  loadPanelVisible: boolean;

  baseUrl = 'https://localhost:7049/api/';

  constructor(http: HttpClient) {
    this.allowedFileExtensions = [];
    this.fileSystemProvider = new RemoteFileSystemProvider({
      endpointUrl: `${this.baseUrl}file-manager-azure`,
    });

    this.wrapperClassName = '';
    this.loadPanelVisible = true;

    this.checkAzureStatus(http);
  }

  checkAzureStatus(http: HttpClient): void {
    const observable = http.get<{ active: boolean }>(`${this.baseUrl}file-manager-azure-status?widgetType=fileManager`);
    const promise = lastValueFrom(observable);

    promise
      .then((response) => {
        this.wrapperClassName = response.active ? 'show-widget' : 'show-message';
        this.loadPanelVisible = false;
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.error('Error occurred:', error);
        /* eslint-enable no-console */
      });
  }
}
