using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Transportex.Application.Features.Users.Commands.CreateUser;
using Transportex.Application.Features.Users.Commands.DeleteUser;
using Transportex.Application.Features.Users.Commands.UpdateUser;

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

    [HttpPut]
    public async Task<bool> UpdateUser(UpdateUserCommand command)
    {
        return await Mediator.Send(command);
    }    
}
