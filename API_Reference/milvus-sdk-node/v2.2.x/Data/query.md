# query()

This method performs a vector query.

> You must load the collection before searching or querying

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.query(QueryReq);
```

### QueryReq

| Parameters        | Description                                                                            | Type     |
| ----------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_name   | Name of the collection to search on                                                    | String   |
| output_fields     | Vector or scalar field to be returnsed                                                  | String[] |
| expr?             | Boolean expression to filter the data                                                  | String   |
| partitions_names? | An array of the names of the partitions to search on.                                  | String[] |
| timeout?          | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.query({
  collection_name: "my_collection",
  expr: "age > 0",
  output_fields: ["age"],
});
```

### Response

```javascript
// query returns
{
  status: { error_code: 'Success', reason: '' },
  data: [
    { age: '434848878802248081' },
    ...999 more items,
  ]
}
```
