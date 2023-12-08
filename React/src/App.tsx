import React, { useCallback, useState, useEffect } from 'react';
import FileManager, { Permissions } from 'devextreme-react/file-manager';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
import { LoadPanel } from 'devextreme-react/load-panel';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { PositionConfig } from 'devextreme/animation/position';

const baseUrl = 'https://localhost:7049/api/';
const fileSystemProvider = new RemoteFileSystemProvider({
  endpointUrl: `${baseUrl}file-manager-azure`,
});

const allowedFileExtensions: string[] = [];
const loadPanelPosition: PositionConfig = { of: '#file-manager' };

function App(): JSX.Element {
  const [wrapperClassName, setWrapperClassName] = useState('');
  const [loadPanelVisible, setLoadPanelVisible] = useState(true);
  const checkAzureStatus = useCallback(() => {
    fetch(`${baseUrl}file-manager-azure-status?widgetType=fileManager`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        const className = result.active ? 'show-widget' : 'show-message';
        setWrapperClassName(className);
        setLoadPanelVisible(false);
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.error('Error fetching Azure status:', error);
        /* eslint-enable no-console */
      });
  }, []);

  useEffect(() => {
    checkAzureStatus();
  }, [checkAzureStatus]);

  return (
    <div id="wrapper" className={wrapperClassName}>
      <LoadPanel visible={loadPanelVisible} position={loadPanelPosition} />
      <FileManager id="file-manager" fileSystemProvider={fileSystemProvider} allowedFileExtensions={allowedFileExtensions}>
        {/* uncomment the code below to enable file/directory management */}
        <Permissions
          // create={true}
          // copy={true}
          // move={true}
          // delete={true}
          // rename={true}
          // upload={true}
          download={true}>
        </Permissions>
      </FileManager>
      <div id="message-box">To run the demo, specify your Azure storage account name, access key and container name in the <strong>appsettings.json</strong> file.</div>
    </div>
  );
}

export default App;
