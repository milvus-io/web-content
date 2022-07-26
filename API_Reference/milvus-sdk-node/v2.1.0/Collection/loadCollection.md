# loadCollection()
This method loads the specified collection to memory (for search or query).

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection(LoadCollectionReq);
```

## Parameters
### LoadCollectionReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to load | String | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection({
  collection_name: 'my_collection',
});
```

## Return
```javascript
// loadCollection return
{ error_code: 'Success', reason: '' }
```
