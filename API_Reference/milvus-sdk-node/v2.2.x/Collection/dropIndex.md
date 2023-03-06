# dropIndex()

This method drops the index and its corresponding index file in the collection.

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex(DropIndexReq);
```

### DropIndexReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Collection name                                                                        | String |
| field_name      | Field name                                                                             | String |
| index_name?     | Index name                                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.dropIndex({
  collection_name: "my_collection",
});
```

### Response

```javascript
// dropIndex return
```
