# getCompactionState()

This operation lists the statistics collected on a specific collection.

```javascript
await milvusClient.getCompactionState(data)
```

## Request Syntax

```javascript
await milvusClient.getCompactionState({ 
    compactionID: string | number,
    timeout?: number 
})
```

**PARAMETERS:**

- **compactionID** (*string | number*) -

    **[REQUIRED]**

    The ID of a compaction job that is returned by a call to [`compact()`](compact.md).

- **timeout** (*number*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURNS** *Promise<GetCompactionStateResponse>*

This method returns a promise that resolves to a **GetCompactionStateResponse** object.

```javascript
{
    state: CompactionState,
    executingPlanNo: string,
    timeoutPlanNo: string,
    completedPlanNo: string,
    failedPlanNo: string,
    status:  ResStatus
}
```

**PARAMETERS:**

- **state** (*CompactionState*) -
The aggregate state of the compaction. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **executingPlanNo** (*string*) -
The number of plans still executing.

- **timeoutPlanNo** (*string*) -
The number of plans that timed out.

- **completedPlanNo** (*string*) -
The number of plans that completed successfully.

- **failedPlanNo** (*string*) -
The number of plans that failed.

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
const resStatus = await milvusClient.getCompactionState({
    compactionID: 'your_compaction_id',
});
```

