using FluentValidation;

namespace Transportex.Application.Features.Users.Commands.UpdateUser;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        //RuleFor(v => v.PostId)
        //    .NotEmpty();

        //RuleFor(v => v.Name)
        //    .MaximumLength(200)
        //    .NotEmpty();
    }
}
