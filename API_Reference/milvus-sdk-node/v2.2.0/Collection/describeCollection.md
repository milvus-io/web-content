# describeCollection()

This method checks the details of a collection, including collection name, schema, and more.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeCollection(
  DescribeCollectionReq
);
```

## Parameters

### DescribeCollectionReq

| Parameter       | Description                                                                            | Type   | Required |
| --------------- | -------------------------------------------------------------------------------------- | ------ | -------- |
| collection_name | Name of the collection to check                                                        | String | True     |
| timeout         | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number | False    |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.describeCollection({
  collection_name: "my_collection",
});
```

## Return

```javascript
// describe collection return
{
  status: { error_code: 'Success', reason: '' },
  schema: {
    fields: [ {
    type_params: [
      {
        dim: 8
      }
    ],
    index_params: [],
    fieldID: '100',
    name: 'vector_01',
    is_primary_key: false,
    description: 'vector field',
    data_type: 'FloatVector',
    autoID: false
  },
  {
    type_params: [],
    index_params: [],
    fieldID: '101',
    name: 'age',
    is_primary_key: true,
    description: '',
    data_type: 'Int64',
    autoID: true
  } ],
    name: 'my_collection',
    description: '',
    autoID: false
  },
  collectionID: '434827658485039105',
  consistency_level: 'Session',
}
```
