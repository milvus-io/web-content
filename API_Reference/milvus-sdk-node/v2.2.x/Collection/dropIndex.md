# dropIndex()

This method drops the index and its corresponding index file in the collection.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex(DropIndexReq);
```

## Parameter

### DropIndexReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name      | Field name                                                                             | String |
| index_name?     | Index name                                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex({
  collection_name: "my_collection",
});
```

## Return

```javascript
// dropIndex return
```
