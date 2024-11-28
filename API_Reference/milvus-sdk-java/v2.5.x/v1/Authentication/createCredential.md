# createCredential()

A MilvusClient interface. This method creates a credential using the given username and password.

```java
R<RpcStatus> createCredential(CreateCredentialParam requestParam);
```

#### CreateCredentialParam

Use the `CreateCredentialParam.Builder` to construct a `CreateCredentialParam` object.

```java
import io.milvus.param.CreateCredentialParam;
CreateCredentialParam.Builder builder = CreateCredentialParam.newBuilder();
```

Methods of `CreateCredentialParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withUsername(String username)</p></td>
        <td><p>Sets the username. Username cannot be empty or null.</p></td>
        <td><p>username: The user name used to create the credential.</p></td>
    </tr>
    <tr>
        <td><p>withPassword(String password)</p></td>
        <td><p>Sets the password. Password cannot be empty or null.</p></td>
        <td><p>password: The corresponding password to create the credential.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a CreateCredentialParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
