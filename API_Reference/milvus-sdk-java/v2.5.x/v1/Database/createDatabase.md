# createDatabase()

The MilvusClient interface. This method creates a database*.*

```java
R<RpcStatus> createDatabase(CreateDatabaseParam requestParam);
```

#### CreateDatabaseParam

Use the `CreateDatabaseParam.Builder` to construct a `CreateDatabaseParam` object.

```java
import io.milvus.param.collection.CreateDatabaseParam;
CreateDatabaseParam.Builder builder = CreateDatabaseParam.newBuilder()
```

Methods of `CreateDatabaseParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. Database name cannot be empty or null.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withReplicaNumber(int replicaNumber)</p></td>
        <td><p>Sets the replica number in database level, then if load collection doesn't have replica number, it will use this replica number.</p></td>
        <td><p>replicaNumber: Replica number</p></td>
    </tr>
    <tr>
        <td><p>withResourceGroups(List&lt;String> resourceGroups)</p></td>
        <td><p>Sets the resource groups in database level, then if load collection doesn't have resource groups, it will use this resource groups.</p></td>
        <td><p>resourceGroups: Resource group names</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a CreateDatabaseParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateDatabaseParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.collection.CreateDatabaseParam;

CreateDatabaseParam param = CreateDatabaseParam.newBuilder()
        .withDatabaseName("mydb")
        .build();
R<RpcStatus> response = client.createDatabase(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
