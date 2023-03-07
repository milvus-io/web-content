# insert()

This method inserts data into a specified collection.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.insert(InsertReq);
```

### InsertReq

| Parameters      | Description                                                                            | Type                   |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------- |
| collection_name | Name of the collection to insert data into                                             | String                 |
| fields_data     | Vector data                                                                            | { [x: string]: any }[] |
| partition_name? | Name of the partition to insert data into                                              | String                 |
| hash_keys?      | The hash value determined by primary key                                               | Number[]               |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number                 |

### note

If the field type is binary, the vector data length needs to be dimension / 8.

## Example

```javascript
const vectorsData = Array.from({ length: 10 }).map(() => ({
  vector_01: Array.from({ length: 4 }).map(() =>
    Math.floor(Math.random() * 10)
  ),
}));

new milvusClient(MILUVS_ADDRESS).dataManager.insert({
  collection_name: COLLECTION_NAME,
  fields_data: vectorsData,
});
```

### Response

```javascript
// insert returns
{
  status: { error_code: 'Success', reason: '' },
  succ_index: [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    ... 990 more items
  ],
  err_index: [],
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
