# insert()
This method inserts data into a specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.insert(InsertReq);
```

## Parameters
### InsertReq
| Parameter                | Description                               | Type                   | Required |
| ------------------------ | ----------------------------------------- | ---------------------- | -------- |
| collection_name          | Name of the collection to insert data into                           | String                 | True     |
| partition_name(optional) | Name of the partition to insert data into                        | String                 | False    |
| fields_data              | Vector data                               | { [x: string]: any }[] | True    |
| hash_keys(optional)      | The hash value determined by primary key | Number[]               | False    |

### note 
If the field type is binary, the vector data length needs to be dimension / 8.

## Example
```javascript

const vectorsData = Array.from({ length: 10 }).map(() => ({
    vector_01: Array.from({ length: 4 }).map(() =>
      Math.floor(Math.random() * 100000)
    ),
  }));

new milvusClient(MILUVS_ADDRESS).dataManager.insert({
  collection_name: COLLECTION_NAME,
  fields_data: vectorsData,
});
```
## Return
```javascript
// insert return
{
  succ_index: [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    ... 990 more items
  ],
  err_index: [],
  status: { error_code: 'Success', reason: '' },
  acknowledged: false,
  insert_cnt: '1',
  delete_cnt: '0',
  upsert_cnt: '0',
  timestamp: '434849944099356674',
  IDs: {
    int_id: {
      data: [
        '434848878802250134',
        ...999 more items,
      ],
    },
    id_field: 'int_id',
  },
}
```
