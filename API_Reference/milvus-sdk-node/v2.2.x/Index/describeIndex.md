# describeIndex()

This method fetches the index details from a collection.

```javascript
new milvusClient(MILUVS_ADDRESS).describeIndex(DescribeIndexReq);
```

### DescribeIndexReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| field_name?     | Name of the field to check                                                             | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).describeIndex({
  collection_name: "my_collection",
});
```

### Response

```javascript
// describeIndex returns
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
