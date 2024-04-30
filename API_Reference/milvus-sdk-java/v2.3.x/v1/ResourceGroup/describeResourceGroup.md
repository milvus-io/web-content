# describeResourceGroup()

MilvusClient interface. This method drops a resource group by name.

```java
R<DescribeResourceGroupResponse> describeResourceGroup(DescribeResourceGroupParam requestParam);
```

## DescribeResourceGroupParam

Use the `DescribeResourceGroupParam.Builder` to construct a `DescribeResourceGroupParam` object.

```java
import io.milvus.param.DescribeResourceGroupParam;
DescribeResourceGroupParam.Builder builder = DescribeResourceGroupParam.newBuilder();
```

Methods of `DescribeResourceGroupParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withGroupName(String groupName)</td>
        <td>Sets the group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the group to describe.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a DescribeResourceGroupParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DescribeResourceGroupParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeResourceGroupResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `DescribeResourceGroupResponse` held by the R template. You can use `DescribeResourceGroupResponse` to get resource group information.

## Example

```java
import io.milvus.param.DescribeResourceGroupParam;

R<DescribeResourceGroupResponse> response = client.describeResourceGroup(DescribeResourceGroupParam.newBuilder()
            .withGroupName(name)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
