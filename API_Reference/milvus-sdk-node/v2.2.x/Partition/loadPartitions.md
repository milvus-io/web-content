# loadPartitions()

This method loads the specified partition to memory (for search or query).

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.loadPartitions(
  LoadPartitionsReq
);
```

### LoadPartitionsReq

| Parameter       | Description                                                                            | Type     |
| --------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_name | Name of the collection in which the partition to load exists                           | String   |
| partition_names | An array of the names of the partitions to load                                        | String[] |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.loadPartitions({
  collection_name: "my_collection",
  partition_names: ["my_partition"],
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```
