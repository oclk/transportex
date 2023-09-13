using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Transportex.Presentation.Common.Filters;

namespace Transportex.Presentation.Common.Extensions;

public static class ServiceCollectionExtention
{
    public static IServiceCollection AddPresentationServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration is null)
        {
            throw new ArgumentNullException(nameof(configuration));
        }

        #region General Configuration(s)
        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddAutoMapper(typeof(Program));
#pragma warning disable CS0618 // Type or member is obsolete
        services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Program>());
#pragma warning restore CS0618 // Type or member is obsolete
        #endregion

        #region Api Versioning Configuration(s)
        services.AddApiVersioning(opt =>
        {
            opt.DefaultApiVersion = new ApiVersion(1, 0);
            opt.AssumeDefaultVersionWhenUnspecified = true;
            opt.ReportApiVersions = true;
            opt.ApiVersionReader = ApiVersionReader.Combine(new UrlSegmentApiVersionReader(),
                                                            new QueryStringApiVersionReader("x-api-version"),
                                                            new HeaderApiVersionReader("x-api-version"),
                                                            new MediaTypeApiVersionReader("x-api-version"));
        });

        services.AddVersionedApiExplorer(opt =>
        {
            opt.GroupNameFormat = "'v'VVV";
            opt.SubstituteApiVersionInUrl = true;
        });
        #endregion

        #region Swagger Configuration
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Transportex API", Version = "v1" });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                   new OpenApiSecurityScheme
                   {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                   },
                   Array.Empty<string>()
                }
            });
            options.CustomSchemaIds(type => type.ToString());
            options.CustomSchemaIds(type => type.FullName);
            options.OperationFilter<SwaggerDefaultValuesFilter>();
        });
        #endregion

        #region Keycloak Auth Configuration
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
                var sslRequired = string.IsNullOrWhiteSpace(configuration["Keycloak:SslRequired"])
                    || configuration["Keycloak:SslRequired"]
                        .Equals("external", StringComparison.OrdinalIgnoreCase);
#pragma warning restore CS8602 // Dereference of a possibly null reference.

                options.Authority = $"{configuration["Keycloak:RealmUrl"]}/realms/transportex/";
                options.Audience = configuration["Keycloak:Client"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidAudiences = new string[] { "account", "transportex", "service-account" }
                };
                options.RequireHttpsMetadata = sslRequired;
                options.SaveToken = true;
                options.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();
                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";
                        return c.Response.WriteAsync(c.Exception.ToString());
                    }
                };
                options.Validate();
            });
        #endregion

        #region CORS Configuration
        string[] _allowedOrigins = Array.Empty<string>();

        if (!string.IsNullOrEmpty(configuration["AllowedOrigin"]))
        {
            _allowedOrigins = configuration["AllowedOrigin"].Split(',', StringSplitOptions.RemoveEmptyEntries);
        }

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                builder =>
                {
                    builder.WithOrigins(_allowedOrigins)
                            .AllowAnyHeader()
                            .WithMethods("GET", "PUT", "POST", "DELETE", "UPDATE", "OPTIONS")
                            .AllowCredentials();
                });
        });
        #endregion

        return services;
    }
}
