namespace Transportex.Domain.Common;

public class ResponseContainer<T>
{
    public T Response { get; set; }
    public bool IsSucceed { get; set; }
    public string ErrorCode { get; set; }
    public string ErrorMessage { get; set; }
}
