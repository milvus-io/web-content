# releaseCollection()

This method releases the specified collection from memory.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection(
  ReleaseCollectionReq
);
```

### ReleaseCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to release                                                      | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.releaseCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// releaseCollection return
{ error_code: 'Success', reason: '' }
```
