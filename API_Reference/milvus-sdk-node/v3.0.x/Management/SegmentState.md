# SegmentState

Represents the state of a segment.

```typescript
export enum SegmentState {
  SegmentStateNone,
  NotExist,
  Growing,
  Sealed,
  Flushed = 'Flushed',
  Flushing = 'Flushing',
  Dropped = 'Dropped',
  Importing = 'Importing',
}
```

**Constants:**

- **SegmentStateNone**

    Placeholder for an unknown state.

- **NotExist**

    The segment does not exist.

- **Growing**

    The segment is actively accepting inserts.

- **Sealed**

    The segment is sealed and no longer accepts inserts.

- **Flushed** ('Flushed')

    The segment is sealed and has been flushed to storage.

- **Flushing** ('Flushing')

    The segment is being flushed.

- **Dropped** ('Dropped')

    The segment has been dropped.

- **Importing** ('Importing')

    The segment is being created via bulk import.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.getPersistentSegmentInfo({
    collectionName: 'my_collection',
});

res.infos.forEach(info => console.log(info.state)); // SegmentState
```

