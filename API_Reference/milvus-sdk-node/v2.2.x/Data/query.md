# query()

This method conducts a vector query.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.query(QueryReq);
```

## Parameters

### QueryReq

| Parameter         | Description                                                                            | Type     |
| ----------------- | -------------------------------------------------------------------------------------- | -------- |
| collection_name   | Name of the collection to search on                                                    | String   |
| output_fields     | Vector or scalar field to be returned                                                  | String[] |
| expr?             | Boolean expression to filter the data                                                  | String   |
| partitions_names? | An array of the names of the partitions to search on.                                  | String[] |
| timeout?          | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.query({
  collection_name: "my_collection",
  expr: "age > 0",
  output_fields: ["age"],
});
```

## Return

```javascript
// query return
{
  status: { error_code: 'Success', reason: '' },
  data: [
    { age: '434848878802248081' },
    ...999 more items,
  ]
}
```
