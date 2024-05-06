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
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withGroupName(String groupName)</td>
        <td>Sets the group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the group to be created.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a CreateResourceGroupParam object.</td>
        <td>N/A</td>
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
