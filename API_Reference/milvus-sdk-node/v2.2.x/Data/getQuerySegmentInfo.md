# getQuerySegmentInfo()

This method checks the information of the segments in the query nodes via proxy.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo(
  getQuerySegmentInfoReq
);
```

### getQuerySegmentInfoReq

| Parameters     | Description                                                                            | Type   |
| -------------- | -------------------------------------------------------------------------------------- | ------ |
| collectionName | Name of the collection to check                                                        | String |
| timeout?       | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo({
  collectionName: "my_collection",
});
```

### Response

```javascript
// getQuerySegmentInfo returns
{ status: { error_code: 'Success', reason: '' }, infos: [] }
```
