# deleteEntities()
Delete entities in a collection

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.deleteEntities(DeleteEntitiesReq);
```

## Parameter
### DeleteEntitiesReq
| Parameter                | Description                                  | type   | required |
| ------------------------ | -------------------------------------------- | ------ | -------- |
| collection_name          | Collection name                              | String | True     |
| expr                     | Boolean expression used to filter attribute. | String | True     |
| partition_name(optional) | partition name                               | String | False    |

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
  succ_index: [],
  err_index: [],
  status: { error_code: 'Success', reason: '' },
  acknowledged: false,
  insert_cnt: '0',
  delete_cnt: '2',
  upsert_cnt: '0',
  timestamp: '434852827294334977',
  IDs: { int_id: { data: [ '434848878802251176', '444848878802251176' ] }, id_field: 'int_id' }
}
```
