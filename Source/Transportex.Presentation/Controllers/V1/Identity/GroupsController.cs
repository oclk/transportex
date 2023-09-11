using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Transportex.Presentation.Controllers.V1.Identity;

[Route("Api/V{version:apiVersion}/Identity/[controller]")]
[ApiVersion("1.0")]
[Authorize]
public class GroupsController : BaseController
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok();
    }
}
