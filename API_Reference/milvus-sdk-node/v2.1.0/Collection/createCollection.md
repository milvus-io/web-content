# createCollection()

This method creates a collection with the specified schema.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createCollection(
  CreateCollectionReq
);
```

## Parameters

### CreateCollectionReq(object)

| Parameter       | Description                        | Type   | Required |
| --------------- | ---------------------------------- | ------ | -------- |
| collection_name | Name of the collection to create   | String | True     |
| fields          | Schema of the collection to create | Field  | True     |

### Fields(object)

| Parameter      | Description                                                             | Type     | Required |
| -------------- | ----------------------------------------------------------------------- | -------- | -------- |
| name           | Field name                                                              | String   | True     |
| description    | Field description                                                       | String   | True     |
| data_type      | Data type of the field (see the table below)                            | DataType | True     |
| type_params    | Vector field parameters                                                 | Object   | False    |
| autoID         | Boolean value to indicate whether the IDs are automatically generated   | Bool     | False    |
| is_primary_key | Boolean value to indicate whether this field is used as the primary key | Bool     | False    |

#### DataType

| Value | Description   |
| ----- | ------------- |
| 0     | None          |
| 1     | Bool          |
| 2     | Int8          |
| 3     | Int16         |
| 4     | Int32         |
| 5     | Int64         |
| 10    | Float         |
| 11    | Double        |
| 20    | String        |
| 21    | Varchar       |
| 100   | Binary vector |
| 101   | Float vector  |

## Example

```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createCollection({
  collection_name: "my_collection",
  fields: [
    {
      name: "vector_01",
      description: "vector field",
      data_type: DataType.FloatVector,
      type_params: {
        dim: "8",
      },
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

## Return

```javascript
// create collection return
{ error_code: 'Success', reason: '' }
```
