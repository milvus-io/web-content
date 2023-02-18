# hasCollection()

This method checks if a specified collection exists.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.hasCollection(
  HasCollectionReq
);
```

## Parameters

### HasCollectionReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Name of the collection to check                                                        | String | True     |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.hasCollection({
  collection_name: "my_collection",
});
```

## Return

```javascript
// hasCollection return
{ status: { error_code: 'Success', reason: '' }, value: true }
```
