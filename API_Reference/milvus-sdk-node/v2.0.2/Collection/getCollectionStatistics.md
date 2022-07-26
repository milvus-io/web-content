# getCollectionStatistics()
This method checks the row count of a specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics(GetCollectionStatisticsReq);
```

## Parameters
### GetCollectionStatisticsReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to check | String | True     |


## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics({
  collection_name: 'my_collection',
});
```
## Return
```javascript
// getCollectionStatistics return
{
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' }
  stats: [ { key: 'row_count', value: '0' } ],
}
```
