# updateCredential()

A MilvusClient interface. This method updates the password corresponding to a given username. The original username and password must be provided to check if the update operation is valid. 

<div class="admonition note">

<p><b>the milvus client will not update the corresponding connection when the credential is updated. therefore, the original connection might be invalid.</b></p>

</div>

```java
R<RpcStatus> updateCredential(UpdateCredentialParam requestParam);
```

#### UpdateCredentialParam

Use the `UpdateCredentialParam.Builder` to construct an `UpdateCredentialParam` object.

```java
import io.milvus.param.UpdateCredentialParam;
UpdateCredentialParam.Builder builder = UpdateCredentialParam.newBuilder();
```

Methods of `UpdateCredentialParam.Builder`:

<table>
    <tr>
        <th><p>withUsername(String username)</p></th>
        <th><p>Sets the username. Username cannot be empty or null.</p></th>
        <th><p>username: The user name.</p></th>
    </tr>
    <tr>
        <td><p>withUsername(String username)</p></td>
        <td><p>Sets the username. Username cannot be empty or null.</p></td>
        <td><p>username: The user name.</p></td>
    </tr>
    <tr>
        <td><p>withOldPassword(String password)</p></td>
        <td><p>Sets the old password. Old password cannot be empty or null.</p></td>
        <td><p>password: The old password.</p></td>
    </tr>
    <tr>
        <td><p>withNewPassword(String password)</p></td>
        <td><p>Sets the new password. New password cannot be empty or null.</p></td>
        <td><p>password: The new password.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a UpdateCredentialParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `UpdateCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

UpdateCredentialParam param = UpdateCredentialParam.newBuilder()
        .withUsername("user")
        .withOldPassword("old_password")
        .withNewPassword("new_password")
        .build();
R<RpcStatus> response = client.updateCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
