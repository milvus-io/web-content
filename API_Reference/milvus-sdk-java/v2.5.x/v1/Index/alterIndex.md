# alterIndex()

MilvusClient interface. This method alters an index with key-value properties.

```java
R<RpcStatus> alterIndex(AlterIndexParam requestParam);
```

#### AlterIndexParam

Use the `AlterIndexParam.Builder` to construct an `AlterIndexParam` object.

```java
import io.milvus.param.AlterIndexParam;
AlterIndexParam.Builder builder = AlterIndexParam.newBuilder();
```

Methods of `AlterIndexParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withIndexName(String indexName)</p></td>
        <td><p>Set the target index name. If no index name is specified,the default index name is empty string which means let the server determine it.</p></td>
        <td><p>indexName: The name of the index.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a AlterIndexParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `AlterIndexParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

AlterIndexParam param = AlterIndexParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withIndexName("index1")
        .withMMapEnabled(true)
        .build();
R<RpcStatus> response = client.alterIndex(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
