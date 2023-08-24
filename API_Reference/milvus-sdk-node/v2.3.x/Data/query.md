# query()

This method performs a vector query.

> You must load the collection before searching or querying

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).query({
  collection_name: "my_collection",
  expr: "age > 0",
  output_fields: ["age"],
  limit: 1000,
  offset: 2,
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

### Parameters

| Parameters        | Description                                                                                                                                                                                                        | Type     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| collection_name   | Name of the collection to search on                                                                                                                                                                                | String   |
| output_fields     | Vector or scalar field to be returnsed                                                                                                                                                                             | String[] |
| expr or filter    | Expression to filter the data                                                                                                                                                                                      | String   |
| limit             | Sets a value to limit the returned number of entities. It must be a positive integer. The default value is 0, indicating that all entities are returned without a limit.                                           | Number   |
| offset            | Sets a position, the returned entities before which will be ignored. This parameter works only when the limit value is specified. The default value is 0, starting from beginning of the returned set of entities. | Number   |
| partitions_names? | An array of the names of the partitions to search on.                                                                                                                                                              | String[] |
| timeout?          | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined.                                  | Number   |
