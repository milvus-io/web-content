# getIndexState()

This method checks if the index building is completed or not.(Deprecated since 2.2.0)

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexState(GetIndexStateReq);
```

## Parameter

### GetIndexStateReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name?     | Name of the field to build index on                                                    | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexState({
  collection_name: "my_collection",
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
