using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Transportex.Application.Common.Extensions;

public static class ServiceCollectionExtention
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration is null)
        {
            throw new ArgumentNullException(nameof(configuration));
        }

        return services;
    }
}
