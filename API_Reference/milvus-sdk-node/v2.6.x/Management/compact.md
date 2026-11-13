# compact()

This operation compacts and merges small segments into a larger one to save memory usage and improve search performance.

```javascript
await milvusClient.compact(data)
```

## Request Syntax

```javascript
await milvusClient.compact({
    collection_name: string,
    db_name?: string,
    timetravel?: number | string,
    majorCompaction?: boolean,
    partition_id?: number | string,
    channel?: string,
    segment_ids?: number[],
    l0Compaction?: boolean,
    target_size?: number | string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to compact.

- **db_name** (*string*) -

    The name of the database that holds the target collection.

- **timetravel** (*number* | *string*) -

    A timestamp to compact data before it, for time-travel compaction.

- **majorCompaction** (*boolean*) -

    Whether to perform a major compaction that merges small segments.

- **partition_id** (*number* | *string*) -

    The ID of the partition to compact.

- **channel** (*string*) -

    The channel to compact.

- **segment_ids** (*number[]*) -

    The IDs of the segments to compact.

- **l0Compaction** (*boolean*) -

    Whether to perform an L0 compaction that cleans up deleted data.

- **target_size** (*number* | *string*) -

    The target segment size for the compaction.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS:**

*Promise<CompactionResponse>*

This method returns a promise that resolves to a **CompactionResponse** object.

```javascript
{
    compactionID: string,
    compactionPlanCount: number,
    status:  ResStatus
}
```

**PARAMETERS:**

- **compactionID** (*string*) -
The identifier of the compaction operation. Pass this value to `getCompactionState()` or `getCompactionStateWithPlans()` to poll progress.

- **compactionPlanCount** (*number*) -
The number of compaction plans generated for this operation.

- **status** (*ResStatus*) -
A **ResStatus** object.

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
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
 const resStatus = await milvusClient.compact({
      collection_name: 'my_collection',
 });
```

