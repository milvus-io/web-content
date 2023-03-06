# loadCollectionSync()

This method loads the specified collection to memory (for search or query) synchronously and ensures that this collection is loaded.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollectionSync(
  LoadCollectionReq
);
```

### LoadCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to load.                                                        | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollectionSync({
  collection_name: "my_collection",
});
```

### Response

```javascript
// loadCollectionSync return
{ error_code: 'Success', reason: '' }
```
