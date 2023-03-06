# deleteEntities()

This method deletes entities from a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.deleteEntities(DeleteEntitiesReq);
```

### DeleteEntitiesReq

| Parameter       | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to delete entities from                                         | String |
| expr            | Boolean expression used for attibute filtering                                         | String |
| partition_name? | Name of the partition to deleted entities from                                         | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.deleteEntities({
  collection_name: "my_collection",
  expr: "age in [434848878802251176,444848878802251176]",
});
```

## Return

```javascript
// DeleteEntitiesReq return
{
  status: { error_code: 'Success', reason: '' },
  succ_index: [],
  err_index: [],
  acknowledged: false,
  insert_cnt: '0',
  delete_cnt: '2',
  upsert_cnt: '0',
  timestamp: '434852827294334977',
  IDs: { int_id: { data: [ '434848878802251176', '444848878802251176' ] }, id_field: 'int_id' }
}
```
