﻿using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Transportex.Presentation.Common.Middlewares;

namespace Transportex.Presentation.Common.Extensions;

public static class WebApplicationExtension
{
    public static WebApplication Use(this WebApplication app)
    {
        var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

        #region General
        app.MapControllers();
        // app.UseHttpsRedirection();
        #endregion

        #region Swagger
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(o =>
            {
                foreach (var description in provider.ApiVersionDescriptions)
                {
                    o.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", $"Transportex - {description.GroupName.ToUpper()}");
                }
            });
        }
        #endregion

        #region Middleware(s)
        app.UseMiddleware<ErrorHandlingMiddleware>();
        //app.UseMiddleware(typeof(SecurityMiddleware));
        #endregion

        #region Auth
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors();
        #endregion

        return app;
    }
}
