using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Transportex.Domain.Entities;

namespace Transportex.Application.Features.Users.Queries;

public class GetUserGorupsQuery : IRequest<List<Group>>
{
    public string Id { get; set; }
}

public class GetUserGorupsQueryHandler : IRequestHandler<GetUserGorupsQuery, List<Group>>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IConfiguration _configuration;

    public GetUserGorupsQueryHandler(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
    {
        _httpContextAccessor = httpContextAccessor;
        _configuration = configuration;
    }

    public async Task<List<Group>> Handle(GetUserGorupsQuery request, CancellationToken cancellationToken)
    {
        using (var httpClient = new HttpClient())
        {
            // Get or create JWT.
            string[] jwtTokenStr = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString()?.Split(" ");
            string jwtToken = (jwtTokenStr != null && jwtTokenStr.Length > 1) ? jwtTokenStr[1] : null;

            // Add JWT to the Authorization header when creating an HTTP request.
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", jwtToken);

            // Create Url
            string url = $"{_configuration["Keycloak:RealmUrl"]}/admin/realms/transportex/users/{request.Id}/groups";

            // Send Request
            var response = await httpClient.GetAsync(url, cancellationToken);

            if (response.IsSuccessStatusCode)
            {
                var jsonString = await response.Content.ReadAsStringAsync();

                // Convert the JSON response into a class.
                List<Group> groups = JsonConvert.DeserializeObject<List<Group>>(jsonString);
                return groups;
            }
            else
            {
                Console.WriteLine($"HTTP request failed: {response.StatusCode}");
                throw new Exception();
            }
        }
    }
}
