# refreshExternalCollection()

This operation triggers a data refresh for an external collection. Use this when the external data source has been updated and you want Milvus to reload the data.

```javascript
await milvusClient.refreshExternalCollection(data: RefreshExternalCollectionReq)
```

## Request Syntax

```javascript
await milvusClient.refreshExternalCollection({
    collection_name: string,
    external_source?: string,
    external_spec?: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
**[REQUIRED]**
The name of the external collection to refresh.

- **external_source** (*string*) -
Optional new external source path. If provided, the collection will be refreshed from this new source.

- **external_spec** (*string*) -
Optional new external spec configuration. If provided, the collection will use this new spec.

- **db_name** (*string*) -
The name of the database. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<RefreshExternalCollectionResponse>*

This method returns a promise that resolves to a **RefreshExternalCollectionResponse** object.

```javascript
{
    job_id: string,
    status:  ResStatus
}
```

**PARAMETERS:**

- **job_id** (*string*) -
The identifier of the asynchronous refresh job. Pass this value to `getRefreshExternalCollectionProgress()` to poll for completion.

- **ResStatus**
A **ResStatus** object.

    - **code** (*number*) -

        A code that indicates the operation result. It remains **0** if this operation succeeds.

    - **error_code** (*string* | *number*) -

        An error code that indicates an occurred error. It remains **Success** if this operation succeeds.

    - **reason** (*string*) -

        The reason that indicates the reason for the reported error. It remains an empty string if this operation succeeds.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await client.refreshExternalCollection({
    collection_name: 'my_external_collection',
    external_source: 's3://bucket/path',
});
```
