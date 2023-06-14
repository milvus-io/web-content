# renameCollection()

This method allows you to change the name of a collection.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).renameCollection({
  collection_name: "my_collection",
  new_collection_name: "my_new_collection",
});
```

### Response

```javascript
// renameCollection returns
{ status: { error_code: 'Success', reason: '' }, value: true }
```

### Parameters

| Parameters          | Description                                                                                                                                                                       | Type   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name     | Name of the collection to check                                                                                                                                                   | String |
| new_collection_name | New Collection name                                                                                                                                                               | String |
| timeout?            | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
