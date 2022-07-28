# dropCollection()
This method drops a collection and all data within this specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropCollection(DropCollectionReq);
```

## Parameters
### DropCollectionReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to drop | String | True     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropCollection({
  collection_name: 'my_collection',
});
```
## Return
```javascript
// dropCollection return
{ error_code: 'Success', reason: '' }
```
