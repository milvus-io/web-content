# showPartitions()

This method lists all the partitions in a specified collection.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).showPartitions({
  collection_name: "my_collection",
});
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  partition_names: [ '_default', 'my_partition' ],
  partitionIDs: [ '434827144696954882', '434827353243779073' ],
  created_timestamps: [ '434827144696954883', '434827353243779075' ],
  created_utc_timestamps: [ '1658733919895', '1658734715438' ],
  inMemory_percentages: []
}
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to list all the partitions within                                                                                                                          | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
