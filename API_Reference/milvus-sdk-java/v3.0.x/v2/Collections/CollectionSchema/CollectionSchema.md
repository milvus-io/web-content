# CollectionSchema

A **CollectionSchema** instance represents the schema of a collection. A schema sketches the structure of a collection.

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.CollectionSchema
```

## Constructor

Constructs the schema of a collection by defining fields, data types, and other parameters.

```java
CreateCollectionReq.CollectionSchema.builder()
    .fieldSchemaList(List<CreateCollectionReq.FieldSchema> fieldSchemaList)
    .structFields(List<CreateCollectionReq.StructFieldSchema> structFields)
    .enableDynamicField(boolean enableDynamicField)
    .functionList(List<CreateCollectionReq.Function> functionList)
    .externalSource(String externalSource)
    .externalSpec(JsonObject externalSpec)
    .build();
```

**BUILDER METHODS:**

- `fieldSchemaList(List<CreateCollectionReq.FieldSchema> fieldSchemaList)` -

    A list of **[FieldSchema](../FieldSchema.md)** objects that define the fields in the collection schema. A field schema represents and contains metadata for a single field, while **CollectionSchema** ties together a list of FieldSchema objects to define the full schema.

- `structFields(List<CreateCollectionReq.StructFieldSchema> structFields)` -

    A list of struct fields (nested-object fields) for the schema. Use this when the collection contains fields whose values are themselves structured records.

- `enableDynamicField(boolean enableDynamicField)` -

    When set to `true`, enables a hidden dynamic field (`$meta`) so inserts can carry arbitrary key-value attributes outside the declared schema. Default: `false`.

- `functionList(List<CreateCollectionReq.Function> functionList)` -

    Attaches functions (e.g., BM25, JSON-path extraction) that derive values from existing fields at insert time. Each `Function` declares its inputs, outputs, and parameters.

- `externalSource(String externalSource)` -

    Identifies the external source (e.g., a S3 bucket, a Lakehouse table) bound to this collection. Pairs with `externalSpec` to define an external collection that refreshes from outside Milvus.

- `externalSpec(JsonObject externalSpec)` -

    Specification for the external source — typically JSON describing connection details and refresh policy. Used together with `externalSource`.

**RETURN TYPE:**

*CollectionSchema*

**RETURNS:**

A **CollectionSchema** object.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// define a Collection Schema
CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two fields, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

## Methods

The following are the methods of the `CollectionSchema` class: