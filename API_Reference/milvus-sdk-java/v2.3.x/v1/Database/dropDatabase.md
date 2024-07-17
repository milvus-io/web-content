# dropDatabase()

The MilvusClient interface. This method drops a database. Note that this method drops all data in the database.

```java
R<RpcStatus> dropDatabase(DropDatabaseParam requestParam);
```

#### DropDatabaseParam

Use the `DropDatabaseParam.Builder` to construct a `DropDatabaseParam` object.

```java
import io.milvus.param.collection.DropDatabaseParam;
DropDatabaseParam.Builder builder = DropDatabaseParam.newBuilder()
```

Methods of `DropDatabaseParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the databaseName name. Database name cannot be empty or null.</p></td>
        <td><p>databaseName: The database name</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a CreateDatabaseParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DropDatabaseParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.collection.DropDatabaseParam;

DropDatabaseParam param = DropDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<RpcStatus> response = client.dropDatabase(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
