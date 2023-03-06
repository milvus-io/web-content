# createAlias()

By creating a collection alias, you can simplify the process of vector search by using the alias instead of the actual collection name.

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createAlias(CreateAliasReq);
```

### CreateAliasReq

| Parameters      | Description                                                                            | Type   |
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
// create collection returns
{ error_code: 'Success', reason: '' }
```
