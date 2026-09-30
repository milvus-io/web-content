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

**RETURNS:**

*Promise\<BatchDescribeCollectionResponse\>*

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

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
