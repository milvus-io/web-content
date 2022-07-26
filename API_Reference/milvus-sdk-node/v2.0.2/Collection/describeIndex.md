# describeIndex()
This method lists all collections or gets the loading status of a specified collection.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeIndex(DescribeIndexReq);
```

## Parameters
### DescribeIndexReq
| Parameter       | Description     | Type   | Required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Name of the collection to check | String | True     |
| field_name      | Name of the field to check      | String | False    |
| index_name      | Name of the index to check     | String | False    |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.describeIndex({
  collection_name: 'my_collection',
});
```

## Return
```javascript
// describeIndex return
{
  status: { error_code: 'Success', reason: '' },
  index_descriptions: [
    {
      params: [
        { key: 'index_type', value: 'IVF_FLAT' },
        { key: 'metric_type', value: 'IP' },
        { key: 'params', value: '{"nlist":10}' }
      ],
      index_name: '_default_idx',
      indexID: '434828928027721731',
      field_name: 'vector_01'
    }
  ],
}
```
