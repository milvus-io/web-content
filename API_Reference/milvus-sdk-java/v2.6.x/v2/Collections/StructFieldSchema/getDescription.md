# getDescription()

This operation returns the description of an Array of Structs field.

```java
public String getDescription()
```

## Request Syntax

```java
getDescription()
```

**RETURN TYPE:**

*String*

**RETURNS:**

The return value will be the description of the specified Array of Struct field.

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

structFieldSchema.getDescription();

// "clips of a film"
```


