# listFileResources()

Lists all uploaded file resources in the current database.

```java
public ListFileResourcesResp listFileResources(ListFileResourcesReq request)
```

## Request Syntax

```java
listFileResources(ListFileResourcesReq.builder().build());
```

This request takes no parameters.

**RETURN TYPE:**

*ListFileResourcesResp*

**RETURNS:**

A **ListFileResourcesResp** object that contains the result of this operation.

- `getResources()` (*List\<FileResourceInfo\>*) -

    The list of file resources. Each **FileResourceInfo** has the following getters:

    - `getName()` (*String*) -

        The unique name of the resource.

    - `getPath()` (*String*) -

        The original local path that was uploaded.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.ListFileResourcesReq;
import io.milvus.v2.service.utility.response.ListFileResourcesResp;
import io.milvus.v2.service.utility.response.FileResourceInfo;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. List the file resources
ListFileResourcesResp resp = client.listFileResources(
    ListFileResourcesReq.builder().build()
);
for (FileResourceInfo res : resp.getResources()) {
    System.out.println(res.getName() + " -> " + res.getPath());
}
```
