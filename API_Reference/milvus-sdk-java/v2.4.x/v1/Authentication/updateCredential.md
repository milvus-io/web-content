# updateCredential()

A MilvusClient interface. This method updates the password corresponding to a given username. The original username and password must be provided to check if the update operation is valid. 

<div class="admonition note">

<p><b>the milvus client will not update the corresponding connection when the credential is updated. therefore, the original connection might be invalid.</b></p>

</div>

```java
R<RpcStatus> updateCredential(UpdateCredentialParam requestParam);
```

## UpdateCredentialParam

Use the `UpdateCredentialParam.Builder` to construct an `UpdateCredentialParam` object.

```java
import io.milvus.param.UpdateCredentialParam;
UpdateCredentialParam.Builder builder = UpdateCredentialParam.newBuilder();
```

Methods of `UpdateCredentialParam.Builder`:

<table>
    <tr>
        <th>withUsername(String username)</th>
        <th>Sets the username. Username cannot be empty or null.</th>
        <th>username: The user name.</th>
    </tr>
    <tr>
        <td>withUsername(String username)</td>
        <td>Sets the username. Username cannot be empty or null.</td>
        <td>username: The user name.</td>
    </tr>
    <tr>
        <td>withOldPassword(String password)</td>
        <td>Sets the old password. Old password cannot be empty or null.</td>
        <td>password: The old password.</td>
    </tr>
    <tr>
        <td>withNewPassword(String password)</td>
        <td>Sets the new password. New password cannot be empty or null.</td>
        <td>password: The new password.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a UpdateCredentialParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `UpdateCredentialParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
