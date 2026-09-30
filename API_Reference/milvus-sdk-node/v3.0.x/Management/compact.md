# compact()

This operation compacts and merges small segments into a larger one to save memory usage and improve search performance.

```javascript
await milvusClient.compact(data)
```

## Request Syntax

```javascript
milvusClient.compact()
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the target collection to reassign an alias to.

- **timeout** (*number*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURNS** *Promise<CompactionResponse>*

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
const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});
 const resStatus = await milvusClient.compact({
      collection_name: 'my_collection',
 });
```

