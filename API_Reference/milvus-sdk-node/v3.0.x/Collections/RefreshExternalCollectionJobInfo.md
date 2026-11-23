# RefreshExternalCollectionJobInfo

Information of an external collection refresh job.

```typescript
export interface RefreshExternalCollectionJobInfo {
  job_id: string;
  collection_name: string;
  state:
    | RefreshExternalCollectionState
    | keyof typeof RefreshExternalCollectionState;
  progress: string;
  reason: string;
  external_source: string;
  start_time: string;
  end_time: string;
}
```

**FIELDS:**

- **job_id** (*string*) -

    The refresh job identifier.

- **collection_name** (*string*) -

    The name of the external collection being refreshed.

- **state** (*RefreshExternalCollectionState | keyof typeof RefreshExternalCollectionState*) -

    The refresh job state. Possible values are **RefreshPending**, **RefreshInProgress**, **RefreshCompleted**, and **RefreshFailed**. A refresh job transitions from **RefreshInProgress** to **RefreshCompleted** or **RefreshFailed**.

- **progress** (*string*) -

    The refresh progress.

- **reason** (*string*) -

    The failure reason when the refresh failed.

- **external_source** (*string*) -

    The external data source of the collection.

- **start_time** (*string*) -

    The start time of the refresh job.

- **end_time** (*string*) -

    The end time of the refresh job.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.listRefreshExternalCollectionJobs({
    collection_name: 'my_external_collection',
});

console.log(res.jobs); // RefreshExternalCollectionJobInfo[]
```

