# getIndexState()
This method checks if the index building is completed or not.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexState(GetIndexStateReq);
```

## Parameter
### GetIndexStateReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | True     |
| field_name      | Name of the field to build index on      | String | False    |
| index_name      | Name of the index to check      | String | False    |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexState({
  collection_name: 'my_collection',
});
```

## Return
```javascript
// getIndexState return
{
  status: { error_code: 'Success', reason: '' },
  state: 'Finished',
  fail_reason: ''
}
```
