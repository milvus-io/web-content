# batchDescribeCollections()

This operation retrieves schema and metadata for multiple collections in a single call.

```javascript
await milvusClient.batchDescribeCollections(data: BatchDescribeCollectionReq)
```

## Request Syntax

```javascript
await milvusClient.batchDescribeCollections({
    collection_names: string[],
    db_name?: string,
    collectionIDs?: number[],
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_names** (*string[]*) -
**[REQUIRED]**
The names of the collections to describe.

- **db_name** (*string*) -
The name of the database. Optional.

- **collectionIDs** (*number[]*) -
The IDs of the collections to describe. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<BatchDescribeCollectionResponse>*

This method returns a promise that resolves to a **BatchDescribeCollectionResponse** object.

```javascript
{
    responses: DescribeCollectionResponse[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **responses** (*DescribeCollectionResponse[]*) -
An array containing the schema and metadata for every requested collection. Entries appear in the same order as the input collection names. For the full **DescribeCollectionResponse** field reference, refer to the `describeCollection()` doc.

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

const res = await client.batchDescribeCollections({
    collection_names: ['collection1', 'collection2'],
});
```
