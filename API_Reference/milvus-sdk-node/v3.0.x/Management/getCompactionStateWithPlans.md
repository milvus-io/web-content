# getCompactionStateWithPlans()

This operation gets the compaction states of a targeted compaction ID, including merge plans showing which segments will be combined.

```javascript
await milvusClient.getCompactionStateWithPlans(data: GetCompactionPlansReq)
```

## Request Syntax

```javascript
await milvusClient.getCompactionStateWithPlans({
    compactionID: number | string,
    timeout?: number,
})
```

**PARAMETERS:**

- **compactionID** (*number | string*) -

    **[REQUIRED]**

    The ID of the compaction operation returned by `compact()`.

- **timeout** (*number*) -

    RPC timeout in milliseconds. Optional.

**RETURNS** *Promise<GetCompactionPlansResponse>*

This method returns a promise that resolves to a **GetCompactionPlansResponse** object.

```javascript
{
    state: CompactionState,
    mergeInfos: { sources: string[], target: string }[],
    status:  ResStatus
}
```

**PARAMETERS:**

- **state** (*CompactionState*) -
The aggregate state of the compaction. Possible values are **UndefiedState**, **Executing**, and **Completed**.

- **mergeInfos** (*{ sources: string[], target: string }[]*) -
A list of merge plans dispatched by the compaction.

    - **sources** (*string[]*) -

        The segment IDs being merged.

    - **target** (*string*) -

        The new segment ID produced by the merge.

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
const compactRes = await client.compact({ collection_name: 'my_collection' });
const plans = await client.getCompactionStateWithPlans({
    compactionID: compactRes.compactionID,
});
console.log(plans.state, plans.mergeInfos);
```
