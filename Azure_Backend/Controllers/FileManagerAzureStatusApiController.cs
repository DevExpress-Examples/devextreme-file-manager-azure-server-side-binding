using DevExtreme.Azure_Backend.Models.FileManagement;
using System.Net.Http;
using DevExtreme.AspNet.Mvc.FileManagement;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DevExtreme.NETCore.Demos.Controllers {
    public class FileManagerAzureStatusApiController : Controller {
        [HttpGet]
        [Route("api/file-manager-azure-status", Name = "FileManagementAzureApiStatus")]
        public IActionResult Get(string widgetType) {
            AzureStorageAccount account = widgetType == "fileManager"
                ? AzureStorageAccount.FileManager : AzureStorageAccount.FileUploader;

            bool active = !account.IsEmpty();
            var result = new {
                active = active
            };
            return Ok(result);
        }
    }
}
