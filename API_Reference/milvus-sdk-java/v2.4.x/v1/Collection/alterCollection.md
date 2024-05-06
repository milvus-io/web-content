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
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to alter properties.</td>
    </tr>
    <tr>
        <td>withTTL(Integer ttlSeconds)</td>
        <td>Collection time to live (TTL) is the expiration time of data in a collection. Expired data in the collection will be cleaned up and will not be involved in searches or queries. Specify TTL in the unit of seconds.This method internally calls the withProperty() to set value.</td>
        <td>ttlSeconds: The time to live value. The value should be 0 or greater.</td>
    </tr>
    <tr>
        <td>withMMapEnabled(boolean enabledMMap)</td>
        <td>Enable MMap or not for original data files.This method internally calls the withProperty() to set value.</td>
        <td>enabledMMap: Set to true to enable MMap.</td>
    </tr>
    <tr>
        <td>withProperty(String key,  String value)</td>
        <td>Basic method to set a key-value property.</td>
        <td>key: The key of a property.value: The value of a property.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a AlterCollectionParam object.</td>
        <td>N/A</td>
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
