# getMaxCapacity()

This operation returns the maximum capacity of an Array of Structs field.

```java
public Integer getMaxCapacity()
```

## Request Syntax

```java
getMaxCapacity()
```

**RETURN TYPE:**

*Integer*

**RETURNS:**

The return value will be the maximum capacity of the specified Array of Struct field.

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

structFieldSchema.getMaxCapacity();

// 100
```


