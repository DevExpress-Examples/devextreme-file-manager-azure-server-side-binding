using DevExtreme.Azure_Backend.Models.FileManagement;

var builder = WebApplication.CreateBuilder(args);

static AzureBlobFileProvider CreateAzureBlobFileProvider(IServiceProvider serviceProvider) {
    var env = serviceProvider.GetRequiredService<IWebHostEnvironment>();
    var tempDirPath = Path.Combine(env.ContentRootPath, "UploadTemp");
    var account = AzureStorageAccount.FileManager;
    return new AzureBlobFileProvider(account.AccountName, account.AccessKey, account.ContainerName, tempDirPath);
}

// Add services to the container.
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder => {
    builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(_ => true)
        .AllowCredentials();
}));
builder.Services.AddControllers();
builder.Services.AddTransient(CreateAzureBlobFileProvider);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.WebHost.UseUrls(new[] { "https://localhost:7049/" });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

AzureStorageAccount.Load(app.Configuration.GetSection("AzureStorage"));

app.Run();