# ListImportJobsAsync()

Lists the import jobs of a collection (or all collections when `CollectionName` is empty).

```csharp
public async Task<BulkImportResp> ListImportJobsAsync(ListImportJobsRequest request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListImportJobsRequest
{
    CollectionName = "my_collection"
};

BulkImportResp response = await bulkImport.ListImportJobsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The database whose import jobs to list. Defaults to `"default"`.

- `CollectionName` (*string*) -

    The collection whose import jobs to list; empty lists jobs of all collections.

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

BulkImportResp response = await bulkImport.ListImportJobsAsync(new ListImportJobsRequest
{
    CollectionName = "my_collection"
});
Console.WriteLine($"code: {response.Code}, message: {response.Message}");
```
