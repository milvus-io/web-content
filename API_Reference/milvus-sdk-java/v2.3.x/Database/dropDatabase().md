# dropDatabase()

A MilvusClient interface. This method drops a database. Note that this method drops all data in the database.

```Java
R<RpcStatus> dropDatabase(DropDatabaseParam requestParam);
```

## DropDatabaseParam

Use the `DropDatabaseParam.Builder` to construct a `DropDatabaseParam` object.

```Java
import io.milvus.param.DropDatabaseParam;
DropDatabaseParam.Builder builder = DropDatabaseParam.newBuilder()
```

| Method | Description | Parameters |
| ---- | --- | --- |
| `withDatabaseName(String databaseName)` | Sets the name of the database.<br>The value cannot be empty or null. | `databaseName`: Name of the database. |
| `build()` | Construct a `DropDatabaseParam` object. | N/A |

The `DropDatabaseParam.Builder.build()` throws the following exceptions:

- `ParamException` is raised if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.
- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

DropDatabaseParam param = DropDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<RpcStatus> response = client.dropDatabase(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
