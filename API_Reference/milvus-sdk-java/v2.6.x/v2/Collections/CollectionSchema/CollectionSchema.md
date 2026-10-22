# CollectionSchema

A **CollectionSchema** instance represents the schema of a collection. A schema sketches the structure of a collection.

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.CollectionSchema
```

## Constructor

Constructs the schema of a collection by defining fields, data types, and other parameters.

```java
CreateCollectionReq.CollectionSchema.builder()
    .fieldSchemaList(List<CreateCollectionReq.FieldSchema>)
    .structFields(List<CreateCollectionReq.StructFieldSchema>)
    .enableDynamicField(boolean)
    .functionList(List<CreateCollectionReq.Function>)
    .build();
```

**BUILDER METHODS:**

- `fieldSchemaList(List<CreateCollectionReq.FieldSchema>)`

    A list of **[FieldSchema](../FieldSchema.md)** objects that define the fields in the collection schema.

    <div class="alert note">
    
    A field schema represents and contains metadata for a single field, while **CollectionSchema** ties together a list of FieldSchema objects to define the full schema.

    </div>

- `structFields(List<CreateCollectionReq.StructFieldSchema>)`

    A list of **[StructFieldSchema](../StructFieldSchema/StructFieldSchema.md)** objects that define the Array-of-Struct fields in the collection schema.

- `enableDynamicField(boolean enableDynamicField)`

    Whether to enable the dynamic field. Defaults to `false`.

- `functionList(List<CreateCollectionReq.Function>)`

    A list of **[Function](../Function/Function.md)** objects that define the functions of the collection schema.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

A **CollectionSchema** object.

**EXCEPTIONS:**

- **[MilvusClientException](../../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.client.MilvusClientV2;

// 2. Define a Collection Schema
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
int dim = 2;
// add two fields, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

## Methods

The following are the methods of the `CollectionSchema` class:

