namespace Transportex.Domain.Entities;

public class Group
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Path { get; set; }
    public List<Group> SubGroups { get; set; }
}
