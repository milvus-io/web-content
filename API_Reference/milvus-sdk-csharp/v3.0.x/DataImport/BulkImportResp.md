# BulkImportResp

The envelope returned by the Milvus bulk-import REST endpoints: the server `code`/`message` plus the endpoint-specific `data` payload.

```csharp
public sealed class BulkImportResp : IDisposable
{
    public int Code { get; }
    public string Message { get; }
    public JsonElement Data { get; }
    public string? JobId { get; }
    public string? State { get; }
    public long? Progress { get; }
    public string? Reason { get; }
    public JsonElement GetDataField(string name) { ... }
}
```

**PARAMETERS:**

- `Code` (*int*) -

    The server response code (0 on success).

- `Message` (*string*) -

    The server response message.

- `Data` (*JsonElement*) -

    The endpoint-specific response payload.

- `JobId` (*string?*) -

    The created or described import job id, when supplied in `Data`.

- `State` (*string?*) -

    The import state, when supplied by the describe/progress endpoint.

- `Progress` (*long?*) -

    The import progress percentage, when supplied by the describe/progress endpoint.

- `Reason` (*string?*) -

    The import failure reason, when supplied by the describe/progress endpoint.

**METHODS:**

- `GetDataField(string name)` -

    Returns one field from the endpoint-specific `Data` payload.
