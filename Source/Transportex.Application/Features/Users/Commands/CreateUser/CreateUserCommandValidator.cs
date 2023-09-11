using FluentValidation;

namespace Transportex.Application.Features.Users.Commands.CreateUser;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        //RuleFor(v => v.PostId)
        //    .NotEmpty();

        //RuleFor(v => v.Name)
        //    .MaximumLength(200)
        //    .NotEmpty();
    }
}
