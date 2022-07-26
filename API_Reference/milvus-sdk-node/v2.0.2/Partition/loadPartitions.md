# loadPartitions()
This method loads the specified partition to memory (for search or query).

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.loadPartitions(LoadPartitionsReq);
```

## Parameters
### LoadPartitionsReq
| Parameter       | Description              | Type     | Required |
| --------------- | ------------------------ | -------- | -------- |
| collection_name | Name of the collection in which the partition to load exists          | String   | True     |
| partition_names | An array of the names of the partitions to load | String[] | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).partitionManager.loadPartitions({
  collection_name: 'my_collection',
  partition_names: ['my_partition'],
});
```

## Return
```javascript
{ error_code: 'Success', reason: '' }
```
