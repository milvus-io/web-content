# getQuerySegmentInfo()

This method retrieves information about the segments in the query nodes through the proxy.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).getQuerySegmentInfo({
  collectionName: "my_collection",
});
```

### Response

```javascript
// getQuerySegmentInfo returns
{ status: { error_code: 'Success', reason: '' }, infos: [] }
```

### Parameters

| Parameters     | Description                                                                                                                                                                       | Type   |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collectionName | Name of the collection to check                                                                                                                                                   | String |
| timeout?       | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
