

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
    .build();
```

**BUILDER METHODS:**

- `fieldSchemaList(List<CreateCollectionReq.FieldSchema>)`

    A list of **FieldSchema** objects that define the fields in the collection schema.

    <div class="admonition note">

    <p><b>what is a field schema?</b></p>

    <p>A field schema represents and contains metadata for a single field, while <strong>CollectionSchema</strong> ties together a list of FieldSchema objects to define the full schema.</p>

    </div>

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
// add two fileds, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

## Methods

The following are the methods of the `CollectionSchema` class:

