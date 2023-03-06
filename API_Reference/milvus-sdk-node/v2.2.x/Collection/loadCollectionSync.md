# loadCollectionSync()

This method allows you to load a specified collection into memory synchronously, ensuring that the collection is successfully loaded and available for search or query operations.

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
// loadCollectionSync returns
{ error_code: 'Success', reason: '' }
```
