# getFields()

This operation returns the fields of the Struct elements in an Array of Structs.

```java
public List<CreateCollectionReq.FieldSchema> getFields()
```

## Request Syntax

```java
getFields()
```

**RETURN TYPE:**

*List<CreateCollectionReq.FieldSchema>*

**RETURNS:**

The return value will be the fields of the Struct elements in an Array of Structs.

## Examples

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;

// Build a StructFieldSchema instance that represents an Array of Struct field
CreateCollectionReq.StructFieldSchema structFieldSchema = CreateCollectionReq.StructFieldSchema.builder()
    .name("struct_field")
    .description("clips of a film")
    .maxCapacity(100)
    .fields(Collections.singletonList(CreateCollectionReq.FieldSchema.builder()
        .name("frame_field")
        .dataType(DataType.Int32)
        .build()))
    .build();

structFieldSchema.getFields();
```

