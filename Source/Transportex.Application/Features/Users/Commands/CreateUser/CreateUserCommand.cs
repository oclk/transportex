using MediatR;

namespace Transportex.Application.Features.Users.Commands.CreateUser;

public class CreateUserCommand : IRequest<bool>
{
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, bool>
{
    public Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}