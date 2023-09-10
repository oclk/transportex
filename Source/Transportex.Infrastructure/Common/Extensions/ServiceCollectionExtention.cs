using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Transportex.Infrastructure.Common.Extensions;

public static class ServiceCollectionExtention
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration is null)
        {
            throw new ArgumentNullException(nameof(configuration));
        }

        return services;
    }
}
