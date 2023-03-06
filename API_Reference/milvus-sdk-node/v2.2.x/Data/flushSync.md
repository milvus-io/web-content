# flushSync()

This synchronous method is the same as the asynchronous [`flush()` method](API_Reference/milvus-sdk-node/v2.0.2/Data/flush.md). The difference is that this method ensures that data is flushed when the function result is returned.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flushSync(FlushReq);
```

### FlushReq

| Parameter        | Description                                                                            | type     |
| ---------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_names | An array of the names of the collections to flush                                      | String[] |
| timeout?         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.flushSync({
  collection_names: ["my_collection"],
});
```

## Return

```javascript
// flushSync return
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```
