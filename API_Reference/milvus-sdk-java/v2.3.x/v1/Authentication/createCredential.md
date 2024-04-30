# createCredential()

A MilvusClient interface. This method creates a credential using the given username and password.

```java
R<RpcStatus> createCredential(CreateCredentialParam requestParam);
```

## CreateCredentialParam

Use the `CreateCredentialParam.Builder` to construct a `CreateCredentialParam` object.

```java
import io.milvus.param.CreateCredentialParam;
CreateCredentialParam.Builder builder = CreateCredentialParam.newBuilder();
```

Methods of `CreateCredentialParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withUsername(String username)</td>
        <td>Sets the username. Username cannot be empty or null.</td>
        <td>username: The user name used to create the credential.</td>
    </tr>
    <tr>
        <td>withPassword(String password)</td>
        <td>Sets the password. Password cannot be empty or null.</td>
        <td>password: The corresponding password to create the credential.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a CreateCredentialParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

CreateCredentialParam param = CreateCredentialParam.newBuilder()
        .withUsername("user")
        .withPassword("password")
        .build();
R<RpcStatus> response = client.createCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
