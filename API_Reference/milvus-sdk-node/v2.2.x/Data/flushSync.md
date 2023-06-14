# flushSync()

This synchronous version of [`flush()` method](API_Reference/milvus-sdk-node/v2.2.x/Data/flush.md). This method differs from others in that it guarantees that the data is flushed and persisted before returning the function result.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).flushSync({
  collection_names: ["my_collection"],
});
```

### Response

```javascript
// flushSync returns
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```

### Parameters

| Parameters       | Description                                                                                                                                                                       | type     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| collection_names | An array of the names of the collections to flush                                                                                                                                 | String[] |
| timeout?         | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |
