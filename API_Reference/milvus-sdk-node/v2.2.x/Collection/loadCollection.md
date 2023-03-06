# loadCollection()

This method loads the specified collection to memory (for search or query).

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection(
  LoadCollectionReq
);
```

### LoadCollectionReq

| Parameters      | Description                                                                            | Type            |
| --------------- | -------------------------------------------------------------------------------------- | --------------- |
| collection_name | Name of the collection to load                                                         | String          |
| replica_number? | number                                                                                 | Collection name |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number          |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.loadCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// loadCollection return
{ error_code: 'Success', reason: '' }
```
