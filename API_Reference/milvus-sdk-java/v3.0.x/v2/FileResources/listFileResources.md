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

**EXCEPTIONS