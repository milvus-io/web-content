# hasPartition()

This method verifies if a partition exists in the specified collection.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).hasPartition({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

### Response

```javascript
{ status: { error_code: 'Success', reason: '' }, value: true }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which the partition to verify exists                                                                                                                    | String |
| partition_name  | Name of the partition to verify                                                                                                                                                   | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
