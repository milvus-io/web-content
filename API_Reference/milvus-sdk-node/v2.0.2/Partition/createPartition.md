# createPartition()
This method creates a partition in a specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.createPartition(CreatePartitionReq);
```

## Parameters
### CreatePartitionReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to create a partition in  | String | True     |
| partition_name  | Name of the partition to create | String | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.createPartition({
  collection_name: 'my_collection',
  partition_name: 'my_partition',
});
```

## Return
```javascript
{ error_code: 'Success', reason: '' }
```
