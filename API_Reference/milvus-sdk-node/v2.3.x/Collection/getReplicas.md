# getReplicas()

This method returns replica information.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).getReplicas({
  collectionID: 123,
});
```

### Response

```javascript
// getIndexState returns
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

### Parameters

| Parameters   | Description                                                                                                                                                                       | Type   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collectionID | Collection ID                                                                                                                                                                     | Number |
| timeout?     | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
