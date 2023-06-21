# createDatabase()

A MilvusClient interface. This method creates a database.

```Java
R<RpcStatus> createDatabase(CreateDatabaseParam requestParam);
```

## CreateDatabaseParam

Use the `CreateDatabaseParam.Builder` to construct a `CreateDatabaseParam` object.

```Java
import io.milvus.param.CreateDatabaseParam;
CreateDatabaseParam.Builder builder = CreateDatabaseParam.newBuilder()
```

Methods of `CreateDatabaseParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withDatabaseName(String databaseName)` | Sets the database name.<br>The value cannot be empty or null. | `databaseName`: name of the database. |
| `build()` | Constructs a `CreateDatabaseParam` object | N/A |

The `CreateDatabaseParam.Builder.build()` throws the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

CreateDatabaseParam param = CreateDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<RpcStatus> response = client.createDatabase(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
