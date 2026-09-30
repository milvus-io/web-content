# getPersistentSegmentInfo()

This operation notifies Proxy to return segment information from data nodes, including segment ID, collection ID, partition ID, number of rows, and state.

```javascript
await milvusClient.getPersistentSegmentInfo(data: GePersistentSegmentInfoReq)
```

## Request Syntax

```javascript
await milvusClient.getPersistentSegmentInfo({
    collectionName: string,
    dbName?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    The name of the collection.

- **dbName** (*string*) -

    The name of the database. Optional.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS** *Promise<GePersistentSegmentInfoResponse>*

This method returns a promise that resolves to a **GePersistentSegmentInfoResponse** object.

```javascript
{
    infos: PersistentSegmentInfo[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **infos** (*PersistentSegmentInfo[]*) -
A list of segment-level descriptors for segments persisted to object storage.

    - **segmentID** (*number*) -

        The segment identifier.

    - **collectionID** (*number*) -

        The collection that owns the segment.

    - **partitionID** (*number*) -

        The partition that owns the segment.

    - **num_rows** (*number*) -

        The number of rows in the segment.

    - **state** (*SegmentState*) -

        The segment state. For the full list of possible values, refer to the `getQuerySegmentInfo()` doc.

    - **level** (*SegmentLevel*) -

        The segment level. Possible values are **Legacy**, **L0**, **L1**, and **L2**.

    - **is_sorted** (*boolean*) -

        Whether the segment data is sorted by primary key.

    - **storage_version** (*number*) -

        The storage format version of the segment.

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
const res = await client.getPersistentSegmentInfo({
    collectionName: 'my_collection',
});
console.log(res.infos);
```
