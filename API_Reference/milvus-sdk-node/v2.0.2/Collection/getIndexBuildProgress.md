# getIndexBuildProgress()
Get index building progress.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexBuildProgress(GetIndexBuildProgressReq);
```

## Parameter
### GetIndexBuildProgressReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |
| field_name      | Feild name      | String | false    |
| index_name      | Index name      | String | false    |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexBuildProgress({
  collection_name: 'my_collection',
});
```
## Return
```javascript
// getIndexBuildProgress return
{
  status: { error_code: 'Success', reason: '' },
  indexed_rows: '0',
  total_rows: '0'
}
```
