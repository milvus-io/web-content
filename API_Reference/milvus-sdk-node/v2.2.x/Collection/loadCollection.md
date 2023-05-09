# loadCollection()

By utilizing this method, you can load a specified collection into memory, which enables you to perform searches or queries on the data contained within it.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).loadCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// loadCollection returns
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| collection_name | Name of the collection to load                                                                                                                                                    | String          |
| replica_number? | number                                                                                                                                                                            | Collection name |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number          |
