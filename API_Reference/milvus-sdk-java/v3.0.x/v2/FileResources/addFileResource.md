# addFileResource()

Uploads a local file as a named resource so it can be referenced by other Milvus operations (e.g., functions, analyzers). Names are unique per database — re-using a name overwrites the existing resource.

```java
public void addFileResource(AddFileResourceReq request)
```

## Request Syntax

```java
addFileResource(AddFileResourceReq.builder()
    .name(String name)
    .path(String path)
    .build()
);
```

**BUILDER METHODS:**

- `name(String name)` -

    **[REQUIRED]**

    The unique name of the file resource.

- `path(String path)` -

    **[REQUIRED]**

    The local filesystem path of the file to upload.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.utility.request.AddFileResourceReq;

client.addFileResource(AddFileResourceReq.builder()
    .name("stopwords")
    .path("/data/stopwords-en.txt")
    .build());
```
