using MediatR;

namespace Transportex.Application.Features.Users.Commands.DeleteUser;

public class DeleteUserCommand : IRequest<bool>
{
    public string Id { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
{
    public Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
