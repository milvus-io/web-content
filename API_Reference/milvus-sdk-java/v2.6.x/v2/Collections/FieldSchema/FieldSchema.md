# FieldSchema

A **FieldSchema** instance defines the data type and related attributes of a specific field in a collection.

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.FieldSchema
```

## Constructor

Constructs the schema of a field by defining the field name, data type, and other parameters.

```java
CreateCollectionReq.FieldSchema.builder()
    .name(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(int maxLength)
    .dimension(int dimension)
    .isPrimaryKey(boolean isPrimaryKey)
    .isPartitionKey(boolean isPartitionKey)
    .autoID(boolean autoID)

    .elementType(DataType elementType)
    .maxCapacity(int maxCapacity)

    .build();
```

**BUILDER METHODS:**

- `name(String fieldName)`

    The name of the field.

- `description(String description)`

    The description of the field.

- `dataType(DataType dataType)`

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.Int64** or **DataType.VarChar**.

    - Scalar fields: Choose from a variety of options, including **DataType.Bool**, **DataType.Int8**, **DataType.Int16**, **DataType.Int32**, **DataType.Int64**, **DataType.Float**, **DataType.Double**, **DataType.VarChar**, **DataType.JSON**, and **DataType.Array**.

    - Vector fields: Select **DataType.BinaryVector** or **DataType.FloatVector**.

- `maxLength(int maxLength)`

    The maximum number of characters a value should contain.

    This is required if **dataType** of this field is set to **DataType.VarChar.**

- `dimension(int dimension)`

    The number of dimensions a value should have.

    This is required if **dataType** of this field is set to **DataType.FloatVector**.

- `isPrimaryKey(boolean isPrimaryKey)`

    Whether the current field is the primary field.

    Setting this to **True** makes the current field the primary field.

- `isPartitionKey(boolean isPartitionKey)`

    Whether the current field is the partitionKey field.

    Setting this to **True** makes the current field the partition key.

- `autoID(boolean autoID)`

    Whether allows the primary field to automatically increment.

    Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    Set this parameter in the field with **isPrimaryKey** set to **True**.

- `elementType(DataType elementType)`

    The data type of elements in array fields.

    This is required if **dataType** of this field is set to **DataType.Array**.

- `maxCapacity(int maxCapacity)`

    The maximum number of elements that an array field can contain.

    This is required if **dataType** of this field is set to **DataType.Array**.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

A **FieldSchema** object.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// define a id field with autoID set to false
CreateCollectionReq.FieldSchema fieldSchema = CreateCollectionReq.FieldSchema.builder()
        .name("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .autoID(Boolean.FALSE)
        .build();
```
