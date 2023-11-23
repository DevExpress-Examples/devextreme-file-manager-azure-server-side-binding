# FileManager for DevExtreme - Azure Server-Side Binding

This example illustrates how to configure the FileManager to manage files and folders in Microsoft Azure Blob Storage. To access the Azure Blob Storage, the component uses the [Remote File System Provider](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/File_System_Providers/Remote/).

![FileManager](/file-manager-server-side-binding.png)

This file system provider allows you to access the storage's file system on the client side. To process the HTTP requests on the server, create your own file system provider that implements the [IFileSystemItemLoader](https://docs.devexpress.com/AspNetCore/DevExtreme.AspNet.Mvc.FileManagement.IFileSystemItemLoader), [IFileSystemItemEditor](https://docs.devexpress.com/AspNetCore/DevExtreme.AspNet.Mvc.FileManagement.IFileSystemItemEditor), [IFileUploader](https://docs.devexpress.com/AspNetCore/DevExtreme.AspNet.Mvc.FileManagement.IFileUploader) and [IFileContentProvider](https://docs.devexpress.com/AspNetCore/DevExtreme.AspNet.Mvc.FileManagement.IFileContentProvider) interfaces.

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **React**
    - [App.tsx](React/src/App.tsx)
- **NetCore**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with FileManager](https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/FileManager/Getting_Started_with_File_Manager/)
- [Bind FileManager to File Systems](https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/FileManager/Bind_to_File_Systems/)

## More Examples

- [FileManager for DevExtreme - Azure Client-Side Binding](https://github.com/DevExpress-Examples/devextreme-file-manager-azure-client-side-binding)
- [FileUploader for DevExtreme - Direct Upload to Azure](https://github.com/DevExpress-Examples/devextreme-file-uploader-direct-upload-to-azure)