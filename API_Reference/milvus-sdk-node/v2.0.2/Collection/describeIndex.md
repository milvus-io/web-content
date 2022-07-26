# describeIndex()
List all collections or get collection loading status.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeIndex(DescribeIndexReq);
```

## Parameter
### DescribeIndexReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |
| field_name      | Feild name      | String | false    |
| index_name      | Index name      | String | false    |

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
