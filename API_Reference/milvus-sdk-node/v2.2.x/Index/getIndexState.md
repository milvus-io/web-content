# getIndexState()

This method checks if the index building is completed or not.(Deprecated since 2.2.0)

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.getIndexState(GetIndexStateReq);
```

### GetIndexStateReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name?     | Name of the field to build index on                                                    | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.getIndexState({
  collection_name: "my_collection",
});
```

### Response

```javascript
// getIndexState returns
{
  status: { error_code: 'Success', reason: '' },
  state: 'Finished',
  fail_reason: ''
}
```
