# flushSync()

This synchronous method is the same as the asynchronous [`flush()` method](API_Reference/milvus-sdk-node/v2.0.2/Data/flush.md). The difference is that this method ensures that data is flushed when the function result is returnsed.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.flushSync(FlushReq);
```

### FlushReq

| Parameters       | Description                                                                            | type     |
| ---------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_names | An array of the names of the collections to flush                                      | String[] |
| timeout?         | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.flushSync({
  collection_names: ["my_collection"],
});
```

### Response

```javascript
// flushSync returns
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```
