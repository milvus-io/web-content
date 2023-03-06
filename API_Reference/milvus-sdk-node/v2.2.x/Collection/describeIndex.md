# describeIndex()

This method gets the index information in a collection.

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.describeIndex(DescribeIndexReq);
```

### DescribeIndexReq

| Parameters      | Description                                                                            | Type   |
| --------------- | -------------------------------------------------------------------------------------- | ------ |
| collection_name | Name of the collection to check                                                        | String |
| field_name?     | Name of the field to check                                                             | String |
| index_name?     | Name of the index to check                                                             | String |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.describeIndex({
  collection_name: "my_collection",
});
```

### Response

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
