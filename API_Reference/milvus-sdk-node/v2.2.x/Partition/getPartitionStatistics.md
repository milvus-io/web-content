# getPartitionStatistics()

This method checks the statistics of a specified partition.

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.getPartitionStatistics(
  GetPartitionStatisticsReq
);
```

### GetPartitionStatisticsReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection in which the partition to check exists                          | String |
| partition_name  | Name of the partition to check                                                         | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

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
