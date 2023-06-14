# hasCollection()

This method checks if a specified collection exists.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).hasCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// hasCollection returns
{ status: { error_code: 'Success', reason: '' }, value: true }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                                                                                                                   | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
