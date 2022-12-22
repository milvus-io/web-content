# getIndexBuildProgress()

This method checks the progress of index building and shows the total number of rows and the number of index rows. (Deprecated since 2.2.0)

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexBuildProgress(
  GetIndexBuildProgressReq
);
```

## Parameters

### GetIndexBuildProgressReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Collection name                                                                        | String | True     |
| field_name      | Name of the field to build index on                                                    | String | False    |
| index_name      | Name of the index to check                                                             | String | False    |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexBuildProgress({
  collection_name: "my_collection",
});
```

## Return

```javascript
// getIndexBuildProgress return
{
  status: { error_code: 'Success', reason: '' },
  indexed_rows: '0',
  total_rows: '0'
}
```
