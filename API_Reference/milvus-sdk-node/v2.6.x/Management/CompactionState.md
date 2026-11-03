# CompactionState

Represents the state of a compaction task.

```typescript
export enum CompactionState {
  UndefiedState = 0,
  Executing = 1,
  Completed = 2,
}
```

**Constants:**

- **UndefiedState** (0)

    The compaction state is undefined (spelling as in the SDK source).

- **Executing** (1)

    A compaction task is currently running.

- **Completed** (2)

    The compaction task has completed.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.getCompactionState({
    compactionID: 'your_compaction_id',
});

console.log(res.state); // CompactionState
```

