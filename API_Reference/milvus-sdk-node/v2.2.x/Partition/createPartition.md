# createPartition()

This method creates a partition in a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).createPartition(
  CreatePartitionReq
);
```

### CreatePartitionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to create a partition in                                        | String |
| partition_name  | Name of the partition to create                                                        | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```
