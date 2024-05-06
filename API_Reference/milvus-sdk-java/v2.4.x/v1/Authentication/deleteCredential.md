# deleteCredential()

A MilvusClient interface. This method deletes the credentials of a corresponding username.

```java
R<RpcStatus> deleteCredential(DeleteCredentialParam requestParam);
```

## DeleteCredentialParam

Use the `DeleteCredentialParam.Builder` to construct a `DeleteCredentialParam` object.

```java
import io.milvus.param.DeleteCredentialParam;
DeleteCredentialParam.Builder builder = DeleteCredentialParam.newBuilder();
```

Methods of `DeleteCredentialParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withUsername(String username)</td>
        <td>Sets the username. Username cannot be empty or null.</td>
        <td>username: The user name used to delete a credential.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a DeleteCredentialParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DeleteCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
