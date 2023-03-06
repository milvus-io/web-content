# getReplicas()

This method returns replica information.

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getReplicas(GetReplicaReq);
```

### GetIndexStateReq

| Parameter    | Description                                                                            | Type   |
| ------------ | -------------------------------------------------------------------------------------- | ------ |
| collectionID | Collection ID                                                                          | Number |
| timeout?     | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.getReplicas({
  collectionID: 123,
});
```

### Response

```javascript
// getIndexState return
{
  replicas: [
    {
      partition_ids: [Array],
      shard_replicas: [Array],
      node_ids: [Array],
      replicaID: '436724291187770258',
      collectionID: '436777253933154305'
    }
  ],
  status: { error_code: 'Success', reason: '' }
}
```
