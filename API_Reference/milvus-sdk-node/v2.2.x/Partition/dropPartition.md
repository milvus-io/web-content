# dropPartition()

This method drops a partition and all data within this partition. Note that the `_default` partition cannot be dropped.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.dropPartition(
  DropPartitionReq
);
```

### DropPartitionReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which to drop the partition                                  | String |
| partition_name  | Name of the partition to drop                                                          | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.dropPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

## Return

```javascript
{ error_code: 'Success', reason: '' }
```
