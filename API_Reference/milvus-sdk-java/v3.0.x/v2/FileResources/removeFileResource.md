# removeFileResource()

Removes a previously uploaded file resource by name. Removing a resource that is still referenced by an active function or analyzer fails with an error.

```java
public void removeFileResource(RemoveFileResourceReq request)
```

## Request Syntax

```java
removeFileResource(RemoveFileResourceReq.builder()
    .name(String name)
    .build()
);
```

**BUILDER METHODS:**

- `name(String name)` -

    **[REQUIRED]**

    The name of the file resource to remove.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.utility.request.RemoveFileResourceReq;

client.removeFileResource(RemoveFileResourceReq.builder()
    .name("stopwords")
    .build());
```
