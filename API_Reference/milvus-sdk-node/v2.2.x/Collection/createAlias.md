# createAlias()

This method creates a alias for a collection.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createAlias(CreateAliasReq);
```

### CreateAliasReq(object)

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Target collection name                                                                 | String |
| Alias           | Alias name                                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.createAlias({
  collection_name: "my_collection",
  alias: "my_alias",
});
```

### Response

```javascript
// create collection return
{ error_code: 'Success', reason: '' }
```
