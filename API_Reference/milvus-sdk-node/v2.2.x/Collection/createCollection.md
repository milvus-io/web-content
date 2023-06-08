# createCollection()

With this method, you can create a new collection with a defined schema based on your specified requirements.

> The collection to create must contain a primary key field and a vector field. `Int64` or `String` are supported data type on primary key field.

> The collection to create must contain a vector field, which can be `DataType.FloatVector` or `DataType.BinaryVector`, and set it's dimensions with the property `dim`.

## Example

### After Milvus v2.2.9，new createCollection can be used, but still you can pass old parameters.

When the collection is created, milvus will create and load the collection for you, so you can insert data and search directly.

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createCollection({
  collection_name: "my_collection",
  dimension: 128,
});
```

#### Parameters

| Parameters          | Description                                                    | Type                               |
| ------------------- | -------------------------------------------------------------- | ---------------------------------- |
| collection_name     | collection name                                                | String                             |
| dimension           | vector dimension                                               | number                             |
| primary_field_name? | primary field name                                             | String                             |
| id_type?            | What data type is the id type, default is DataType.Int64,      | DataType.Int64 or DataType.VarChar |
| vector_field_name?  | vector field name                                              | string                             |
| metric_type?        | max length of the varChar field                                | string or MetricType               |
| enableDynamicField? | enable dynamic field                                           | Bool                               |
| auto_id?            | enable auto id, default is fales                               | Bool                               |
| index_params?       | create index params, same as parameters for method createIndex | Object                             |

### Before Milvus v2.2.9

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createCollection({
  collection_name: "my_collection",
  fields: [
    {
      name: "age",
      description: "id field",
      data_type: DataType.Int64,
      autoID: true,
      is_primary_key: true,
    },
    {
      name: "vector_01",
      description: "vector field",
      data_type: DataType.FloatVector,
      dim: 8,
    },
    {
      name: "name",
      description: "other field",
      data_type: DataType.VarChar,
      max_length: 256,
    },
    {
      name: "meta",
      description: "json field",
      data_type: DataType.JSON,
    },
  ],
  enable_dynamic_field: false,
});
```

### Response

```javascript
// create collection returns
{ error_code: 'Success', reason: '' }
```

## Parameters

| Parameters                                                   | Description                                                                                                                                                                          | Type                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| collection_name                                              | Name of the collection to create                                                                                                                                                     | String                      |
| fields                                                       | field schema to create                                                                                                                                                               | Field[]                     |
| timeout?                                                     | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined.    | Number                      |
| consistency_level?                                           | Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time. | String , default: "Bounded" |
| num_partitions? `milvus v2.2.9+` & `node sdk v2.2.12+`       | partitions limit, default: 64, max: 4096                                                                                                                                             | Field[]                     |
| enable_dynamic_field? `milvus v2.2.9+` & `node sdk v2.2.12+` | enbale dynamic field                                                                                                                                                                 | String                      |

### Field Object

| Parameters                                               | Description                                                                                                                      | Type                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| name                                                     | Field name                                                                                                                       | String                     |
| data_type                                                | Data type of the field (see the table below)                                                                                     | DataType(number) or String |
| description?                                             | Field description                                                                                                                | String                     |
| autoID?                                                  | Boolean value to indicate whether the IDs are automatically generated                                                            | Bool                       |
| dim?                                                     | dimension of the vector field                                                                                                    | number                     |
| max_length?                                              | max length of the varChar field                                                                                                  | number                     |
| is_primary_key?                                          | Boolean value to indicate whether this field is used as the primary key                                                          | Bool                       |
| is_partition_key? `milvus v2.2.9+` & `node sdk v2.2.12+` | Boolean value to indicate whether this field is used as the partition key enabled field, only support `Int64` or `VarChar` field | Bool                       |

#### data_type property

You can either use enum or string, for example: `DataType.Int64` or `Int64` for the `data_type` property.

| Number | String                                  |
| ------ | --------------------------------------- |
| 1      | Bool                                    |
| 2      | Int8                                    |
| 3      | Int16                                   |
| 4      | Int32                                   |
| 5      | Int64                                   |
| 10     | Float                                   |
| 11     | Double                                  |
| 21     | Varchar                                 |
| 23     | JSON `milvus v2.2.9+` & `node v2.2.12+` |
| 100    | BinaryVector                            |
| 101    | FloatVector                             |

### consistency_level property

The default value is `"Bounded"`, you can set the consistency level as : `"Session"` or `"Bounded"` or `"Eventually"` or `"Customized"`.
