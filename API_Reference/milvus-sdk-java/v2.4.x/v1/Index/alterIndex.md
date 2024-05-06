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
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withIndexName(String indexName)</td>
        <td>Set the target index name. If no index name is specified,the default index name is empty string which means let the server determine it.</td>
        <td>indexName: The name of the index.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a AlterIndexParam object.</td>
        <td>N/A</td>
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
