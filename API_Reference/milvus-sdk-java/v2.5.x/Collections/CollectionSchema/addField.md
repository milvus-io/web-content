# addField()

This operation adds a vector field to the schema of a collection.

```java
public void addField(AddFieldReq addFieldReq)
```

## Request Syntax

```java
CollectionSchema.addField(AddFieldReq.builder()
    .fieldName(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .isPrimaryKey(Boolean isPrimaryKey)
    .isPartitionKey(Boolean isPartitionKey)
    .autoID(Boolean autoID)
    .dimension(int dimension)

    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)
    .isNullable(Boolean isNullable)
    .defaultValue(DataType dataType)

    .build()
)
```

**BUILDER METHODS**

- `fieldName(String fieldName)`

    The name of the field.

- `description(String description)`

    The description of the field.

- `dataType(DataType dataType)`

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.Int64** or **DataType.VarChar**.

    - Scalar fields: Choose from a variety of options, including **DataType.Bool**, **DataType.Int8**, **DataType.Int16**, **DataType.Int32**, **DataType.Int64**, **DataType.Float**, **DataType.Double**, **DataType.VarChar**, **DataType.JSON**, and **DataType.Array**.

    - Vector fields: Select **DataType.BinaryVector** or **DataType.FloatVector**.

- `maxLength(Integer maxLength)`

    The maximum number of characters a value should contain.

    This is required if **dataType** of this field is set to **DataType.VarChar.**

- `isPrimaryKey(Boolean isPrimaryKey)`

    Whether the current field is the primary field.

    Setting this to **True** makes the current field the primary field.

- `isPartitionKey(Boolean isPartitionKey)`

    Whether the current field is the partitionKey field.

    Setting this to **True** makes the current field the partition key.

- `autoID(Boolean autoID)`

    Whether allows the primary field to automatically increment.

    Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    Set this parameter in the field with **isPrimaryKey** set to **True**.

- `dimension(int dimension)`

    The dimensionality of a vector field. 

    The value should be greater than 1 and is usually determined by the embedding model in use.

    This is required if **dataType** of this field is set to **DataType.FloatVector**.

- `elementType(DataType elementType)`

    The data type of elements in array fields.

    This is required if **dataType** of this field is set to **DataType.Array**.

- `maxCapacity(Integer maxCapacity)`

    The maximum number of elements that an array field can contain.

    This is required if **dataType** of this field is set to **DataType.Array**.

- `isNullable(Boolean isNullable)`

    A Boolean parameter that specifies whether the field can accept null values. Valid values:

    - **True**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

    - **False** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

    For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

- `defaultValue(DataType dataType)`

    Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two field, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

