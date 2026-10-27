# getTypeParams()

This operation returns the type parameters of an Array of Structs field.

```java
public Map<String, String> getTypeParams()
```

## Request Syntax

```java
getTypeParams()
```

**RETURN TYPE:**

*Map\<String, String\>*

**RETURNS:**

The return value will be a map of the type parameters of the specified Array of Struct field.

## Examples

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;

// Build a StructFieldSchema instance that represents an Array of Struct field
CreateCollectionReq.StructFieldSchema structFieldSchema = CreateCollectionReq.StructFieldSchema.builder()
    .name("struct_field")
    .description("clips of a film")
    .typeParam("max_capacity", "100")
    .fields(Collections.singletonList(CreateCollectionReq.FieldSchema.builder()
        .name("frame_field")
        .dataType(DataType.Int32)
        .build()))
    .build();

structFieldSchema.getTypeParams();
```
