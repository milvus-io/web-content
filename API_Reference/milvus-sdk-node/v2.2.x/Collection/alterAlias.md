# alterAlias()

This method change alias target to another collection.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.alterAlias(AlterAliasReq);
```

## Parameters

### AlterAliasReq(object)

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Target collection name                                                                 | String |
| Alias           | Alias name                                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.createAlias({
  collection_name: "another_collection",
  alias: "my_alias",
});
```

## Return

```javascript
// create collection return
{ error_code: 'Success', reason: '' }
```
