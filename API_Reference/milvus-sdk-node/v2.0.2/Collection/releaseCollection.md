# releaseCollection()
This method releases the specified collection from memory.
 
## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection(ReleaseCollectionReq);
```

## Parameters
### ReleaseCollectionReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to release | String | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection({
  collection_name: 'my_collection',
});
```

## Return
```javascript
// releaseCollection return
{ error_code: 'Success', reason: '' }
```
