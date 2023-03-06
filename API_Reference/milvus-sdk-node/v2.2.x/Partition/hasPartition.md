# hasPartition()

This method verifies if a partition exists in the specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.hasPartition(HasPartitionReq);
```

### HasPartitionReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which the partition to verify exists                         | String |
| partition_name  | Name of the partition to verify                                                        | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.hasPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

## Response

```javascript
{ status: { error_code: 'Success', reason: '' }, value: true }
```
