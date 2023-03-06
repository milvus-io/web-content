# releasePartitions()

This method releases the specified partition from memory.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.releasePartitions(
  ReleasePartitionsReq
);
```

### ReleasePartitionsReq

| Parameter       | Description                                                                            | Type     |
| --------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_name | Name of the collection in which the partition to release exists                        | String   |
| partition_names | An array of the name of the partitions to release                                      | String[] |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.releasePartitions({
  collection_name: "my_collection",
  partition_names: ["my_partition"],
});
```

## Response

```javascript
{ error_code: 'Success', reason: '' }
```
