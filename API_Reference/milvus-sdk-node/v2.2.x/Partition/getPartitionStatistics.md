# getPartitionStatistics()

This method checks the statistics of a specified partition.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.getPartitionStatistics(
  GetPartitionStatisticsReq
);
```

### GetPartitionStatisticsReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which the partition to check exists                          | String |
| partition_name  | Name of the partition to check                                                         | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).partitionManager.getPartitionStatistics({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

### Response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' },
  stats: [ { key: 'row_count', value: '0' } ]
}
```
