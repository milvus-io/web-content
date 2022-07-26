# getIndexBuildProgress()
This method checks the progress of index building.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexBuildProgress(GetIndexBuildProgressReq);
```

## Parameters
### GetIndexBuildProgressReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | True     |
| field_name      | Field name      | String | False    |
| index_name      | Index name      | String | False    |

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
