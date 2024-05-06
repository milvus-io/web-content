# dropCollection()

A MilvusClient interface. This method drops a specified collection. 

<div class="admonition note">

<p><b>this method drops all data within the collection.</b></p>

</div>

```java
R<RpcStatus> dropCollection(DropCollectionParam requestParam);
```

#### DropCollectionParam

Use the `DropCollectionParam.Builder` to construct a `DropCollectionParam` object.

```java
import io.milvus.param.DropCollectionParam;
DropCollectionParam.Builder builder = DropCollectionParam.newBuilder();
```

Methods of `DropCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to drop.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a DropCollectionParam object</td>
        <td>N/A</td>
    </tr>
</table>

The `DropCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

DropCollectionParam dropParam = DropCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();

R<RpcStatus> response = client.dropCollection(dropParam);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
