# transferNode()

MilvusClient interface. This method transfers a query node from the source resource group to another resource group.

```java
R<RpcStatus> transferNode(TransferNodeParam requestParam);
```

#### TransferNodeParam

Use the `TransferNodeParam.Builder` to construct a `TransferNodeParam` object.

```java
import io.milvus.param. TransferNodeParam;
TransferNodeParam.Builder builder =  TransferNodeParam.newBuilder();
```

Methods of `TransferNodeParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withSourceGroupName(String groupName)</td>
        <td>Sets the source group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the source group.</td>
    </tr>
    <tr>
        <td>withTargetGroupName(String groupName)</td>
        <td>Sets the target group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the target group.</td>
    </tr>
    <tr>
        <td>withNodeNumber(Integer nodeNumber)</td>
        <td>Specify how many query nodes to transfer to another resource group.</td>
        <td>nodeNumber: The number of nodes to transfer.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a TransferNodeParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `TransferNodeParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.TransferNodeParam;

R<RpcStatus> response = client.transferNode(TransferNodeParam.newBuilder()
            .withTargetGroupName(sourceName)
            .withTargetGroupName(targetName)
            .withNodeNumber(1)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
