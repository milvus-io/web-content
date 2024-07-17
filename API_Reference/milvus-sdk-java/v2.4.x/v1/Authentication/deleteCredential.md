# deleteCredential()

A MilvusClient interface. This method deletes the credentials of a corresponding username.

```java
R<RpcStatus> deleteCredential(DeleteCredentialParam requestParam);
```

#### DeleteCredentialParam

Use the `DeleteCredentialParam.Builder` to construct a `DeleteCredentialParam` object.

```java
import io.milvus.param.DeleteCredentialParam;
DeleteCredentialParam.Builder builder = DeleteCredentialParam.newBuilder();
```

Methods of `DeleteCredentialParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withUsername(String username)</p></td>
        <td><p>Sets the username. Username cannot be empty or null.</p></td>
        <td><p>username: The user name used to delete a credential.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a DeleteCredentialParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DeleteCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

DeleteCredentialParam param = DeleteCredentialParam.newBuilder()
        .withUsername("user")
        .build();
R<RpcStatus> response = client.deleteCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
