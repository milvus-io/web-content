# GetImportProgressAsync()

Gets the progress of an import job.

```csharp
public async Task<BulkImportResp> GetImportProgressAsync(GetImportProgressRequest request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetImportProgressRequest
{
    JobId = "job-1"
};

BulkImportResp response = await bulkImport.GetImportProgressAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The database the job was created in. Defaults to `"default"`; carried on the `DB-Name` header because the progress endpoint derives the database from there rather than the body.

- `JobId` (*string*) -

    The import job ID.

- `ClusterId` (*string?*) -

    The cloud deployment target (Zilliz Cloud only).

- `ProjectId` (*string?*) -

    The cloud project ID (Zilliz Cloud only).

- `RegionId` (*string?*) -

    The cloud region ID (Zilliz Cloud only).

**RETURN TYPE:**

*Task\<BulkImportResp\>*

**RETURNS:**

A **BulkImportResp** object that contains the envelope returned by the bulk-import REST endpoint. See [BulkImportResp](BulkImportResp.md).

```csharp
BulkImportResp
    Code       // -> int
    Message    // -> string
    Data       // -> JsonElement
    JobId      // -> string?
    State      // -> string?
    Progress   // -> long?
    Reason     // -> string?
```

**PARAMETERS:**

- **Code** (*int*) -

    The server response code (0 on success).

- **Message** (*string*) -

    The server response message.

- **Data** (*JsonElement*) -

    The endpoint-specific response payload.

- **JobId** (*string?*) -

    The created or described import job ID, when supplied in `Data`.

- **State** (*string?*) -

    The import state, when supplied by the describe/progress endpoint.

- **Progress** (*long?*) -

    The import progress percentage, when supplied by the describe/progress endpoint.

- **Reason** (*string?*) -

    The import failure reason, when supplied by the describe/progress endpoint.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var bulkImport = new BulkImport(new BulkImportConfig
{
    Url = "http://localhost:19530",
    ApiKey = "..."
});

BulkImportResp response = await bulkImport.GetImportProgressAsync(new GetImportProgressRequest
{
    JobId = "job-1"
});
Console.WriteLine($"state: {response.State}, progress: {response.Progress}");
```
