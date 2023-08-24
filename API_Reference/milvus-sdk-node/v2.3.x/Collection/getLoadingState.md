# getLoadingState()

Get loading progress of a collection.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).getLoadingState({
  collection_name: "my_collection",
});
```

### Response

```javascript
// getLoadingState returns
{status: { error_code: 'Success', reason: '' }, progress: '100'}
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to load                                                                                                                                                    | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
