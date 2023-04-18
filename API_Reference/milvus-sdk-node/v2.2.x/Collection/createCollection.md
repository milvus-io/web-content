# createCollection()

With this method, you can create a new collection with a defined schema based on your specified requirements.

```javascript
new milvusClient(MILUVS_ADDRESS).createCollection(
  CreateCollectionReq
);
```

### CreateCollectionReq

| Parameters      | Description                                                                            | Type          |
| --------------- | -------------------------------------------------------------------------------------- | ------------- |
| collection_name | Name of the collection to create                                                       | String        |
| fields          | Schema of the collection to create                                                     | Field(object) |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number        |

### Field

| Parameters      | Description                                                             | Type             |
| --------------- | ----------------------------------------------------------------------- | ---------------- |
| name            | Field name                                                              | String           |
| description     | Field description                                                       | String           |
| data_type       | Data type of the field (see the table below)                            | DataType(number) |
| type_params?    | Vector field parameters                                                 | Object           |
| autoID?         | Boolean value to indicate whether the IDs are automatically generated   | Bool             |
| is_primary_key? | Boolean value to indicate whether this field is used as the primary key | Bool             |

#### DataType

| Value | Description               |
| ----- | ------------------------- |
| 0     | None                      |
| 1     | Bool                      |
| 2     | Int8                      |
| 3     | Int16                     |
| 4     | Int32                     |
| 5     | Int64                     |
| 10    | Float                     |
| 11    | Double                    |
| 20    | String(Not supported yet) |
| 21    | Varchar                   |
| 100   | Binary vector             |
| 101   | Float vector              |

## Example

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createCollection({
  collection_name: "my_collection",
  fields: [
    {
      name: "vector_01",
      description: "vector field",
      data_type: DataType.FloatVector,
      dim: "8",
    },
    {
      name: "age",
      data_type: DataType.Int64,
      autoID: true,
      is_primary_key: true,
      description: "",
    },
  ],
});
```

### Response

```javascript
// create collection returns
{ error_code: 'Success', reason: '' }
```
