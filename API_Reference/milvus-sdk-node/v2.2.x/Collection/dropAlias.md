# dropAlias()

This method remove alias for a collection.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropAlias(DropAliasReq);
```

## Parameters

### DropAliasReq(object)

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Target collection name                                                                 | String |
| Alias           | Alias name                                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropAlias({
  collection_name: "my_collection",
  alias: "my_alias",
});
```

## Return

```javascript
// create collection return
{ error_code: 'Success', reason: '' }
```
