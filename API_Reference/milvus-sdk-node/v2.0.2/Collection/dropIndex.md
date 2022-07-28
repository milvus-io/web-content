# dropIndex()
This method drops the index and its corresponding index file in the collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex(DropIndexReq);
```

## Parameter
### DropIndexReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | True     |
| field_name      | Field name      | String | True     |
| index_name      | Index name      | String | False    |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropIndex({
  collection_name: 'my_collection',
});

```
## Return
```javascript
// dropIndex return
```
