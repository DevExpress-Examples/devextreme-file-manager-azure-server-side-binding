$(() => {
  const baseUrl = 'https://localhost:7049/api/';

  const loadPanel = $('#load-panel').dxLoadPanel({
    position: { of: '#file-manager' },
  }).dxLoadPanel('instance');

  $.ajax({
    url: `${baseUrl}file-manager-azure-status?widgetType=fileManager`,
    success(result) {
      const className = result.active ? 'show-widget' : 'show-message';
      $('#wrapper').addClass(className);
      loadPanel.hide();
    },
  });

  const provider = new DevExpress.fileManagement.RemoteFileSystemProvider({
    endpointUrl: `${baseUrl}file-manager-azure`,
  });

  $('#file-manager').dxFileManager({
    name: 'fileManager',
    fileSystemProvider: provider,
    permissions: {
      download: true,
      // uncomment the code below to enable file/directory management
      /* create: true,
            copy: true,
            move: true,
            delete: true,
            rename: true,
            upload: true */
    },
    allowedFileExtensions: [],
  });
});
