# createResourceGroup()

MilvusClient interface. This method creates an empty resource group with a name.

```java
R<RpcStatus> createResourceGroup(CreateResourceGroupParam requestParam);
```

#### CreateResourceGroupParam

Use the `CreateResourceGroupParam.Builder` to construct a `CreateResourceGroupParam` object.

```java
import io.milvus.param.CreateResourceGroupParam;
CreateResourceGroupParam.Builder builder = CreateResourceGroupParam.newBuilder();
```

Methods of `CreateResourceGroupParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withGroupName(String groupName)</p></td>
        <td><p>Sets the group name. groupName cannot be empty or null.</p></td>
        <td><p>groupName: The name of the group to be created.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a CreateResourceGroupParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateResourceGroupParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.CreateResourceGroupParam;

R<RpcStatus> response = client.createResourceGroup(CreateResourceGroupParam.newBuilder()
            .withGroupName(name)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
