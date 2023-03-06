# describeCollection()

This method checks the details of a collection, including collection name, schema, and more.

```javascript
new milvusClient(MILVUS_ADDRESS).collectionManager.describeCollection(
  DescribeCollectionReq
);
```

### DescribeCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).collectionManager.describeCollection({
  collection_name: "my_collection",
});
```

### Response

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
