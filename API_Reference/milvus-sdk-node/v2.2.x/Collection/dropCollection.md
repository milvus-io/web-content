# dropCollection()

This method drops a collection and all data within this specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.dropCollection(
  DropCollectionReq
);
```

### DropCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to drop                                                         | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.dropCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// dropCollection returns
{ error_code: 'Success', reason: '' }
```
