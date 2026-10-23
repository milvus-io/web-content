# BulkImportAsync()

Creates an import job from the given data files (or cloud object/volume sources).

```csharp
public async Task<BulkImportResp> BulkImportAsync(BulkImportRequest request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new BulkImportRequest
{
    CollectionName = "my_collection",
    Files = [["/tmp/import/book.parquet"]],
    Options = { ["format"] = "json" }
};

BulkImportResp response = await bulkImport.BulkImportAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The database to import into. Defaults to `"default"`.

- `CollectionName` (*string*) -

    The target collection name.

- `PartitionName` (*string?*) -

    An optional partition to import into.

- `Files` (*IReadOnlyList\<IReadOnlyList\<string\>\>*) -

    The data files to import, grouped: each inner list is one file group. Open-source Milvus only uses this import mode, and exactly one import source (`Files`, object URLs, or a volume) must be set.

- `ClusterId` (*string?*) -

    The cloud deployment target (Zilliz Cloud only).

- `ProjectId` (*string?*) -

    The cloud project ID (Zilliz Cloud only).

- `RegionId` (*string?*) -

    The cloud region ID (Zilliz Cloud only).

- `ObjectUrl` (*string?*) -

    A singular object URL (Zilliz Cloud only; deprecated, prefer `ObjectUrls`).

- `ObjectUrls` (*IReadOnlyList\<IReadOnlyList\<string\>\>*) -

    The object URLs to import, grouped (Zilliz Cloud only).

- `AccessKey` (*string?*) -

    The access key for object-URL import mode (Zilliz Cloud only).

- `SecretKey` (*string?*) -

    The secret key for object-URL import mode (Zilliz Cloud only).

- `Token` (*string?*) -

    The token for object-URL import mode (Zilliz Cloud only).

- `VolumeName` (*string?*) -

    The volume name for volume import mode (Zilliz Cloud only).

- `DataPaths` (*IReadOnlyList\<IReadOnlyList\<string\>\>*) -

    The data paths for volume import mode (Zilliz Cloud only; requires `VolumeName`).

- `Options` (*IDictionary\<string, string\>*) -

    The import options, e.g. `["format"] = "json"`. Entries are added via the collection-initializer syntax `Options = { ... }`.

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

BulkImportResp response = await bulkImport.BulkImportAsync(new BulkImportRequest
{
    CollectionName = "my_collection",
    Files = [["/tmp/import/book.parquet"]],
    Options = { ["format"] = "json" }
});
Console.WriteLine(response.JobId);
```
