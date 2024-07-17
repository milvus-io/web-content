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
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withSourceGroupName(String groupName)</p></td>
        <td><p>Sets the source group name. groupName cannot be empty or null.</p></td>
        <td><p>groupName: The name of the source group.</p></td>
    </tr>
    <tr>
        <td><p>withTargetGroupName(String groupName)</p></td>
        <td><p>Sets the target group name. groupName cannot be empty or null.</p></td>
        <td><p>groupName: The name of the target group.</p></td>
    </tr>
    <tr>
        <td><p>withNodeNumber(Integer nodeNumber)</p></td>
        <td><p>Specify how many query nodes to transfer to another resource group.</p></td>
        <td><p>nodeNumber: The number of nodes to transfer.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a TransferNodeParam object.</p></td>
        <td><p>N/A</p></td>
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
            .withSourceGroupName(sourceName)
            .withTargetGroupName(targetName)
            .withNodeNumber(1)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
