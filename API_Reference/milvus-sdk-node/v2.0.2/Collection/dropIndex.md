# dropIndex()
List all collections or get collection loading status.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex(DropIndexReq);
```

## Parameter
### DropIndexReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |
| field_name      | Feild name      | String | true     |
| index_name      | Index name      | String | false    |

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
