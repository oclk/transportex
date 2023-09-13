using MediatR;

namespace Transportex.Application.Features.Groups.Queries.GetGorups;

public class GetGorupsQuery : IRequest<bool>
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
}

public class GetGorupsQueryHandler : IRequestHandler<GetGorupsQuery, bool>
{
    public Task<bool> Handle(GetGorupsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}