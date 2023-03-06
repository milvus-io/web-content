# createPartition()

This method creates a partition in a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.createPartition(
  CreatePartitionReq
);
```

### CreatePartitionReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to create a partition in                                        | String |
| partition_name  | Name of the partition to create                                                        | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.createPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```
