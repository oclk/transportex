using FluentValidation;

namespace Transportex.Application.Features.Users.Commands.DeleteUser;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
	public DeleteUserCommandValidator()
	{
        RuleFor(v => v.Id)
            .NotEmpty();
    }
}
