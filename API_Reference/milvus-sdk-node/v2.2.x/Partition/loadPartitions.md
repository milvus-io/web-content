# loadPartitions()

This method is used to load a specific partition into memory for search or query purposes.

> You must load before searching or querying

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.loadPartitions(
  LoadPartitionsReq
);
```

### LoadPartitionsReq

| Parameters      | Description                                                                                                                                                                       | Type     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| collection_name | Name of the collection in which the partition to load exists                                                                                                                      | String   |
| partition_names | An array of the names of the partitions to load                                                                                                                                   | String[] |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |

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
