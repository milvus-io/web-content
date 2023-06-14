# dropPartition()

This method is used to drop a partition and all the data contained within it.

> the `_default` partition cannot be dropped.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dropPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

### Response

```javascript
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which to drop the partition                                                                                                                             | String |
| partition_name  | Name of the partition to drop                                                                                                                                                     | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
