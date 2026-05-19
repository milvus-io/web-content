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

**RETURNS:**

*ListFileResourcesResp*

The response wraps `List<FileResourceInfo>` accessible via `getResources()`. Each `FileResourceInfo` entry has:

- `name` (*String*) - The unique name of the resource.

- `path` (*String*) - The original local path that was uploaded.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.utility.request.ListFileResourcesReq;
import io.milvus.v2.service.utility.response.ListFileResourcesResp;
import io.milvus.v2.service.utility.response.FileResourceInfo;

ListFileResourcesResp resp = client.listFileResources(
    ListFileResourcesReq.builder().build()
);
for (FileResourceInfo res : resp.getResources()) {
    System.out.println(res.getName() + " → " + res.getPath());
}
```
