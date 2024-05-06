# listResourceGroups()

MilvusClient interface. This method lists all the resource groups.

```java
R<ListResourceGroupsResponse> listResourceGroups(ListResourceGroupsParam requestParam);
```

#### ListResourceGroupsParam

Use the `ListResourceGroupsParam.Builder` to construct a `ListResourceGroupsParam` object.

```java
import io.milvus.param.ListResourceGroupsParam;
ListResourceGroupsParam.Builder builder = ListResourceGroupsParam.newBuilder();
```

Methods of `ListResourceGroupsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a DescribeResourceGroupParam object.</td>
        <td>N/A</td>
    </tr>
</table>

#### Returns

This method catches all the exceptions and returns an `R<ListResourceGroupsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `ListResourceGroupsResponse` held by the `R` template. You can use `ListResourceGroupsResponse` to get resource group information.

#### Example

```java
import io.milvus.param.ListResourceGroupsParam;

R<ListResourceGroupsResponse> response = client.listResourceGroups(ListResourceGroupsParam.newBuilder()
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
