# getFlushState()

This method checks the status of data flush by segment IDs.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getFlushState(GetFlushStateReq);
```

### GetFlushStateReq

| Parameters | Description                                                                            | type     |
| ---------- | -------------------------------------------------------------------------------------- | -------- |
| segmentIDs | An array of the IDs of the segments to check                                           | String[] |
| timeout?   | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.getFlushState({
  segmentIDs: segIds,
});
```

### Response

```javascript
// getFlushState returns
{ status: { error_code: 'Success', reason: '' }, flushed: true }
```
