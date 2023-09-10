using MediatR;

namespace Transportex.Application.Features.Users.Commands.UpdateUser;

public class UpdateUserCommand : IRequest<bool>
{
}

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, bool>
{
    public Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
