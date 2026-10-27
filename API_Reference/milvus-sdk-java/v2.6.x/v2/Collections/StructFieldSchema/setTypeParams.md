# setTypeParams()

This operation sets the type parameters of an Array of Structs field.

```java
public void setTypeParams(Map<String, String> typeParams)
```

## Request Syntax

```java
setTypeParams(Map<String, String> typeParams)
```

**PARAMETERS:**

- **typeParams** (*Map\<String, String\>*) -

    A map of struct-field type parameters. Supported keys include `mmap.enabled` and `warmup`.

**RETURNS:**

*void*

## Example

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Map;

CreateCollectionReq.StructFieldSchema structFieldSchema = CreateCollectionReq.StructFieldSchema.builder()
    .name("metadata")
    .maxCapacity(100)
    .fields(Collections.emptyList())
    .build();

structFieldSchema.setTypeParams(Map.of(
    "mmap.enabled", "true",
    "warmup", "sync"
));
```
