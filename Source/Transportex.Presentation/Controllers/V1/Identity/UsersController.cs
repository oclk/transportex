using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Transportex.Application.Features.Users.Commands.CreateUser;
using Transportex.Application.Features.Users.Commands.DeleteUser;
using Transportex.Application.Features.Users.Commands.UpdateUser;
using Transportex.Application.Features.Users.Queries;
using Transportex.Domain.Entities;

namespace Transportex.Presentation.Controllers.V1.Identity;

[Route("Api/V{version:apiVersion}/Identity/[controller]")]
[ApiVersion("1.0")]
[Authorize]
public class UsersController : BaseController
{
    [HttpPost]
    public async Task<bool> CreateUser(CreateUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete]
    public async Task<bool> DeleteUser(DeleteUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok();
    }

    [HttpGet("{userId}/Groups")]
    public async Task<List<Group>> GetUserGorups(string userId)
    {
        var query = new GetUserGorupsQuery { Id = userId };
        return await Mediator.Send(query);
    }

    [HttpPut]
    public async Task<bool> UpdateUser(UpdateUserCommand command)
    {
        return await Mediator.Send(command);
    }    
}
