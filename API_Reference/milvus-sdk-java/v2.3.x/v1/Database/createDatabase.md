# createDatabase()

The MilvusClient interface. This method creates a database*.*

```java
R<RpcStatus> createDatabase(CreateDatabaseParam requestParam);
```

## CreateDatabaseParam

Use the `CreateDatabaseParam.Builder` to construct a `CreateDatabaseParam` object.

```java
import io.milvus.param.CreateDatabaseParam;
CreateDatabaseParam.Builder builder = CreateDatabaseParam.newBuilder()
```

Methods of `CreateDatabaseParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withDatabaseName(String databaseName)</td>
        <td>Sets the database name. Database name cannot be empty or null.</td>
        <td>databaseName: The database name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a CreateDatabaseParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateDatabaseParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

CreateDatabaseParam param = CreateDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<RpcStatus> response = client.createDatabase(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
