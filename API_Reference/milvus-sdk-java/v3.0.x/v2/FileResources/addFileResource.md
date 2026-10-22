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

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.AddFileResourceReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. Add a file resource from a path on the server
client.addFileResource(AddFileResourceReq.builder()
    .name("stopwords")
    .path("/data/stopwords-en.txt")
    .build());
```
