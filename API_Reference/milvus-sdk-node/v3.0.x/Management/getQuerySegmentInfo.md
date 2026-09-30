# getQuerySegmentInfo()

This operation notifies Proxy to return segment information from query nodes, including segment ID, collection ID, partition ID, memory size, number of rows, and state.

```javascript
await milvusClient.getQuerySegmentInfo(data: GetQuerySegmentInfoReq)
```

## Request Syntax

```javascript
await milvusClient.getQuerySegmentInfo({
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

**RETURNS** *Promise<GetQuerySegmentInfoResponse>*

This method returns a promise that resolves to a **GetQuerySegmentInfoResponse** object.

```javascript
{
    infos: QuerySegmentInfo[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **infos** (*QuerySegmentInfo[]*) -
A list of segment-level descriptors for the segments currently held by query nodes.

    - **segmentID** (*number*) -

        The segment identifier.

    - **collectionID** (*number*) -

        The collection that owns the segment.

    - **partitionID** (*number*) -

        The partition that owns the segment.

    - **mem_size** (*number*) -

        The in-memory footprint of the segment in bytes.

    - **num_rows** (*number*) -

        The number of rows in the segment.

    - **index_name** (*string*) -

        The index loaded over this segment, when one exists.

    - **indexID** (*number*) -

        The internal identifier of the loaded index.

    - **state** (*SegmentState*) -

        The segment state. Possible values are **SegmentStateNone**, **NotExist**, **Growing**, **Sealed**, **Flushed**, **Flushing**, **Dropped**, and **Importing**.

    - **nodeIds** (*number[]*) -

        The query nodes that hold this segment.

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
const res = await client.getQuerySegmentInfo({
    collectionName: 'my_collection',
});
console.log(res.infos);
```
