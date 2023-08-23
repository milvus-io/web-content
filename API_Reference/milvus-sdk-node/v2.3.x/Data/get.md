# get()

`node sdk v2.2.12+`

This method performs a get vector by id.

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).get({
  collection_name: "my_collection",
  ids: [1, 2, 3, 4],
  output_fields: ["id"],
});
```

### Response

```javascript
// query returns
{
  status: { error_code: 'Success', reason: '' },
  data: [
    { id: '434848878802248081' },
    ...999 more items,
  ]
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
