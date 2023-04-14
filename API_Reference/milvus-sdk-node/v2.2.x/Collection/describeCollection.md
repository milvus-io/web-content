# describeCollection()

By using this method, you can retrieve a collection's details such as its name, schema, and other relevant information.

```javascript
new milvusClient(MILVUS_ADDRESS).describeCollection(
  DescribeCollectionReq
);
```

### DescribeCollectionReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).describeCollection({
  collection_name: "my_collection",
});
```

### Response

```javascript
// describe collection returns
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
