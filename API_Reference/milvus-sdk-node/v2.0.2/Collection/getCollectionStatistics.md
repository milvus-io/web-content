# getCollectionStatistics()
Get collection row count.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getCollectionStatistics(GetCollectionStatisticsReq);
```

## Parameter
### GetCollectionStatisticsReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |


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
  stats: [ { key: 'row_count', value: '0' } ],
  status: { error_code: 'Success', reason: '' },
  data: { row_count: '0' }
}
```
