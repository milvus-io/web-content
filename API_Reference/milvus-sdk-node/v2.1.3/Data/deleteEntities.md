# deleteEntities()
This method deletes entities from a specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.deleteEntities(DeleteEntitiesReq);
```

## Parameters
### DeleteEntitiesReq
| Parameter                | Description                                  | Type   | Required |
| ------------------------ | -------------------------------------------- | ------ | -------- |
| collection_name          | Name of the collection to delete entities from                              | String | True     |
| expr                     | Boolean expression used for attibute filtering | String | True     |
| partition_name(optional) | Name of the partition to deleted entities from                              | String | False    |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.deleteEntities({
   collection_name: "my_collection",
   expr: 'age in [434848878802251176,444848878802251176]',
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
