# createAlias()

By creating a collection alias, you can simplify the process of vector search by using the alias instead of the actual collection name.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createAlias({
  collection_name: "my_collection",
  alias: "my_alias",
});
```

### Response

```javascript
// create collection returns
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Target collection name                                                                                                                                                            | String |
| Alias           | Alias name                                                                                                                                                                        | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
