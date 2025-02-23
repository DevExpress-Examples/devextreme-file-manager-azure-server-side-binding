using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ASP_NET_Core.Models;
using DevExtreme.Azure_Backend.Models.FileManagement;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ASP_NET_Core {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }
        static AzureBlobFileProvider CreateAzureBlobFileProvider(IServiceProvider serviceProvider) {
            var env = serviceProvider.GetRequiredService<IWebHostEnvironment>();
            var tempDirPath = Path.Combine(env.ContentRootPath, "UploadTemp");
            var account = AzureStorageAccount.FileManager;
            return new AzureBlobFileProvider(account.AccountName, account.AccessKey, account.ContainerName, tempDirPath);
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            // Add framework services.
            services
                .AddControllersWithViews()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddTransient(CreateAzureBlobFileProvider);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            AzureStorageAccount.Load(Configuration.GetSection("AzureStorage"));
        }
    }
}
