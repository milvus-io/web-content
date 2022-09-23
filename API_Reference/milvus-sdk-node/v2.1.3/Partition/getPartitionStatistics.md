# getPartitionStatistics()

This method checks the statistics of a specified partition.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.getPartitionStatistics(
  GetPartitionStatisticsReq
);
```

## Parameters

### GetPartitionStatisticsReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Name of the collection in which the partition to check exists                          | String | True     |
| partition_name  | Name of the partition to check                                                         | String | True     |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.getPartitionStatistics({
  collection_name: "my_collection",
  partition_name: "my_partition",
});
```

## Return

```javascript
{
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' },
  stats: [ { key: 'row_count', value: '0' } ]
}
```
