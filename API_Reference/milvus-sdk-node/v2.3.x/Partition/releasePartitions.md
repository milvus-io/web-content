# releasePartitions()

This method is used to release a specific partition from memory.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).releasePartitions({
  collection_name: "my_collection",
  partition_names: ["my_partition"],
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| collection_name | Name of the collection in which the partition to release exists                                                                                                                   | String   |
| partition_names | An array of the name of the partitions to release                                                                                                                                 | String[] |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |
