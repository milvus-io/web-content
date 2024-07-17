# alterCollection()

Alter collection properties. Currently, it supports modifying the time to live (TTL) of a collection's data and enabling MMap of a collection.

```java
R<RpcStatus> alterCollection(AlterCollectionParam requestParam);
```

#### AlterCollectionParam

Use the `AlterCollectionParam.Builder` to construct an `AlterCollectionParam` object.

```java
import io.milvus.param.AlterCollectionParam;
AlterCollectionParam.Builder builder = AlterCollectionParam.newBuilder();
```

Methods of `AlterCollectionParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to alter properties.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. Database name can be null for default database.</p></td>
        <td><p>databaseName: The name of the database.</p></td>
    </tr>
    <tr>
        <td><p>withTTL(Integer ttlSeconds)</p></td>
        <td><p>Collection time to live (TTL) is the expiration time of data in a collection. Expired data in the collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds.<br/>This method internally calls the withProperty() to set value.</p></td>
        <td><p>ttlSeconds: The time to live value. The value should be 0 or greater.</p></td>
    </tr>
    <tr>
        <td><p>withMMapEnabled(boolean enabledMMap)</p></td>
        <td><p>Enable MMap or not for original data files.<br/>This method internally calls the withProperty() to set value.</p></td>
        <td><p>enabledMMap: Set to true to enable MMap.</p></td>
    </tr>
    <tr>
        <td><p>withProperty(String key,  String value)</p></td>
        <td><p>Basic method to set a key-value property.</p></td>
        <td><p>key: The key of a property.<br/>value: The value of a property.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a AlterCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `AlterCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

AlterCollectionParam param = AlterCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withTTL(1800)
        .build();
R<RpcStatus> response = client.alterCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
