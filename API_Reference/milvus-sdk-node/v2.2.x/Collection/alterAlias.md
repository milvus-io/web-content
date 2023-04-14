# alterAlias()

Using this method, you can change the target collection of a pre-existing alias to another collection.

```javascript
new milvusClient(MILUVS_ADDRESS).alterAlias(AlterAliasReq);
```

### AlterAliasReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Target collection name                                                                 | String |
| Alias           | Alias name                                                                             | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).alterAlias({
  collection_name: "another_collection",
  alias: "my_alias",
});
```

### Response

```javascript
// create collection returns
{ error_code: 'Success', reason: '' }
```
