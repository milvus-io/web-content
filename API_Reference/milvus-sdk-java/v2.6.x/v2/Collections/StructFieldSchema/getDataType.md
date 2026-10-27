# getDataType()

This operation returns the data type of an Array of Structs field.

```java
public DataType getDataType()
```

## Request Syntax

```java
getDataType()
```

**RETURN TYPE:**

*[DataType](../DataType.md)*

**RETURNS:**

The return value will always be `DataType.Array`.

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

structFieldSchema.getDataType();

// DataType.Array
```
