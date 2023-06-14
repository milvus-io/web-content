# deleteEntities()

This method deletes entities from a specified collection.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).deleteEntities({
  collection_name: "my_collection",
  expr: "age in [434848878802251176,444848878802251176]",
});
```

### Response

```javascript
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

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to delete entities from                                                                                                                                    | String |
| expr            | Boolean expression used for attibute filtering                                                                                                                                    | String |
| partition_name? | Name of the partition to deleted entities from                                                                                                                                    | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |
