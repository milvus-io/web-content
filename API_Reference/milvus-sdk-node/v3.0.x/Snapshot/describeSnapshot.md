# describeSnapshot()

This operation retrieves detailed information about a specific snapshot.

```javascript
await milvusClient.describeSnapshot(data: DescribeSnapshotReq)
```

## Request Syntax

```javascript
await milvusClient.describeSnapshot({
    collection_name: string,
    snapshot_name: string,
    db_name?: string,
    timeout?: number,
    client_request_id?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -
**[REQUIRED]**
The name of the collection the snapshot belongs to.

- **snapshot_name** (*string*) -
**[REQUIRED]**
The name of the snapshot to describe.

- **db_name** (*string*) -
The name of the database. Optional.

- **timeout** (*number*) -
An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined.

- **client_request_id** (*string*) -
A trace ID for request tracking. Optional.

**RETURNS** *Promise<DescribeSnapshotResponse>*

This method returns a promise that resolves to a **DescribeSnapshotResponse** object.

```javascript
{
    name: string,
    description: string,
    collection_name: string,
    partition_names: string[],
    create_ts: string,
    s3_location: string,
    status:  ResStatus
}
```

**PARAMETERS:**

- **name** (*string*) -
The snapshot name.

- **description** (*string*) -
The description supplied at snapshot creation, or an empty string if none was provided.

- **collection_name** (*string*) -
The collection that owns the snapshot.

- **partition_names** (*string[]*) -
The partition names captured by the snapshot.

- **create_ts** (*string*) -
The hybrid timestamp at which the snapshot was created.

- **s3_location** (*string*) -
The object-store URI where the snapshot data is persisted.

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

const res = await client.describeSnapshot({
    collection_name: 'my_collection',
    snapshot_name: 'snapshot_2024_01',
});
```
