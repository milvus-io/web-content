# flush()

Milvus temporarily buffers newly inserted vectors in cache. This method is asynchronous and persists inserted entities to object storage. After calling this method, you need to wait for a period of time for the data to be flushed.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flush(FlushReq);
```

### FlushReq

| Parameters       | Description                                                                            | Type     |
| ---------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_names | An array of the names of collections that contain the data to flush                    | String[] |
| timeout?         | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.flush({
  collection_names: ["my_collection"],
});
```

### Response

```javascript
// flush returns
{
  status: { error_code: 'Success', reason: '' },
  coll_segIDs: { my_collection: { data: [] } }
}
```
