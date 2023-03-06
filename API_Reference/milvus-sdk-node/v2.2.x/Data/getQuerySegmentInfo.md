# getQuerySegmentInfo()

This method checks the information of the segments in the query nodes via proxy.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo(
  getQuerySegmentInfoReq
);
```

### getQuerySegmentInfoReq

| Parameter      | Description                                                                            | Type   |
| -------------- | -------------------------------------------------------------------------------------- | ------ |
| collectionName | Name of the collection to check                                                        | String |
| timeout?       | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.getQuerySegmentInfo({
  collectionName: "my_collection",
});
```

### Response

```javascript
// getQuerySegmentInfo return
{ status: { error_code: 'Success', reason: '' }, infos: [] }
```
