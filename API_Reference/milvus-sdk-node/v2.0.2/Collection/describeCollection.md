# describeCollection()
Show the details of a collection, e.g. name, schema.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeCollection(DescribeCollectionReq);
```

## Parameter
### DescribeCollectionReq
| Parameter       | Description     | type   | required |
| --------------- | --------------- | ------ | -------- |
| collection_name | Collection name | String | true     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeCollection({
  collection_name: 'my_collection',
});
```
## Return
```javascript
// describe collection return
{
  status: { error_code: 'Success', reason: '' },
  schema: {
    fields: [ [Object], [Object] ],
    name: 'my_collection',
    description: '',
    autoID: false
  },
  collectionID: '434827658485039105',
  consistency_level: 'Session',
  virtual_channel_names: [
    'by-dev-rootcoord-dml_6_434827658485039105v0',
    'by-dev-rootcoord-dml_7_434827658485039105v1'
  ],
  physical_channel_names: [ 'by-dev-rootcoord-dml_6', 'by-dev-rootcoord-dml_7' ],
}
```
