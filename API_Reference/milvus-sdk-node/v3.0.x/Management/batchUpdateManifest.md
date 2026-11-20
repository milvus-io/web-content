# batchUpdateManifest()

This operation publishes already-written manifest versions for persisted Storage V3 segments.

```javascript
await milvusClient.batchUpdateManifest(data: BatchUpdateManifestReq)
```

## Request Syntax

```javascript
await milvusClient.batchUpdateManifest({
    collection_name: string,
    items: BatchUpdateManifestItem[],
    field_names?: string[],
    db_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **items** (*BatchUpdateManifestItem[]*) -

    **[REQUIRED]**

    The segments whose manifest versions to publish. Each item has the following members:

    - **segment_id** (*number* | *string*) -

        The segment ID. Pass int64 values as decimal strings when they exceed JavaScript's safe integer range.

    - **manifest_version** (*number* | *string*) -

        The manifest version to publish.

- **field_names** (*string[]*) -

    The field names to publish manifests for. Optional.

- **db_name** (*string*) -

    The name of the database that holds the collection. Defaults to the client's active database.

- **timeout** (*number*) -

    An optional duration of time in milliseconds to allow for the RPC. If it is set to `undefined`, the client keeps waiting until the server responds or an error occurs. Default is `undefined`.

**RETURNS:**

*Promise<ResStatus>*

This method returns a promise that resolves to a **ResStatus** object.

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**PARAMETERS:**

- **code** (*number*) -

    A code that indicates the operation result. It remains **0** if this operation succeeds.

- **error_code** (*string* | *number*) -

    An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

- **reason** (*string*) -

    The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

**EXCEPTIONS:**

- **Error**

    This exception is raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.batchUpdateManifest({
    collection_name: 'my_collection',
    items: [
        { segment_id: '1', manifest_version: '2' },
    ],
});
```
