# flush()

Milvus temporarily buffers newly inserted vectors in cache. This method is asynchronous and persists inserted entities to object storage. After calling this method, you need to wait for a period of time for the data to be flushed.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flush(FlushReq);
```

### FlushReq

| Parameter        | Description                                                                            | Type     |
| ---------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_names | An array of the names of collections that contain the data to flush                    | String[] |
| timeout?         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.flush({
  collection_names: ["my_collection"],
});
```

### Response

```javascript
// flush return
{
  status: { error_code: 'Success', reason: '' },
  coll_segIDs: { my_collection: { data: [] } }
}
```
