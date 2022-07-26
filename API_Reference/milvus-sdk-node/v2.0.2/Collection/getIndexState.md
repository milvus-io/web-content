# getIndexState()
Get index building progress.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.getIndexState(GetIndexStateReq);
```

## Parameter
### GetIndexStateReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |
| field_name      | Feild name      | String | false    |
| index_name      | Index name      | String | false    |

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
