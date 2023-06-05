# delete()

`node sdk v2.2.12+`

This method deletes entities by id array.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).delete({
  collection_name: "my_collection",
  ids: [1, 2, 3, 4],
  output_fields: ["id"],
});
```

### Response

```javascript
// query returns
{
   error_code: 'Success', reason: ''
}
```

### Parameters

| Parameters        | Description                                                                                                                                                                       | Type                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| collection_name   | Name of the collection to search on                                                                                                                                               | String               |
| output_fields     | Vector or scalar field to be returnsed                                                                                                                                            | String[]             |
| ids               | id array                                                                                                                                                                          | String[] or number[] |
| partitions_names? | An array of the names of the partitions to search on.                                                                                                                             | String[]             |
| timeout?          | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number               |
