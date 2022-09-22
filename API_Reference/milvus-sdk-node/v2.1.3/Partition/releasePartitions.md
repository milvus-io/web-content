# releasePartitions()
This method releases the specified partition from memory.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.releasePartitions(ReleasePartitionsReq);
```

## Parameters
### ReleasePartitionsReq
| Parameter       | Description              | Type     | Required |
| --------------- | ------------------------ | -------- | -------- |
| collection_name | Name of the collection in which the partition to release exists          | String   | True     |
| partition_names | An array of the name of the partitions to release | String array | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.releasePartitions({
  collection_name: 'my_collection',
  partition_names: ['my_partition'],
});
```

## Return
```javascript
{ error_code: 'Success', reason: '' }
```
