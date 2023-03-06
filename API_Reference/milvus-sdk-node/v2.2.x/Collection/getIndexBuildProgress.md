# getIndexBuildProgress()

This method checks the progress of index building and shows the total number of rows and the number of index rows. (Deprecated since 2.2.0)

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexBuildProgress(
  GetIndexBuildProgressReq
);
```

### GetIndexBuildProgressReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name?     | Name of the field to build index on                                                    | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

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
