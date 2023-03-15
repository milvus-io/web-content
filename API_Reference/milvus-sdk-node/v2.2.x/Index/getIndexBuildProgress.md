# getIndexBuildProgress()

This method monitors the index building progress and displays the total number of rows as well as the number of indexed rows.

> This method has been deprecated since version 2.2.0, you can use getIndexState instead.

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexBuildProgress(
  GetIndexBuildProgressReq
);
```

### GetIndexBuildProgressReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name?     | Name of the field to build index on                                                    | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.getIndexBuildProgress({
  collection_name: "my_collection",
});
```

### Response

```javascript
// getIndexBuildProgress returns
{
  status: { error_code: 'Success', reason: '' },
  indexed_rows: '0',
  total_rows: '0'
}
```
