# loadCollection()

This method loads the specified collection to memory (for search or query).

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection(
  LoadCollectionReq
);
```

## Parameters

### LoadCollectionReq

| Parameter       | Description                    | Type            | Required |
| --------------- | ------------------------------ | --------------- | -------- |
| collection_name | Name of the collection to load | String          | True     |
| replica_number? | number                         | Collection name | false    |
| timeout | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection({
  collection_name: "my_collection",
});
```

## Return

```javascript
// loadCollection return
{ error_code: 'Success', reason: '' }
```
