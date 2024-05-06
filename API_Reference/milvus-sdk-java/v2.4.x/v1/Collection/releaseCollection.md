# releaseCollection()

A MilvusClient interface. This method releases the specified collection and all data within it from memory.

```java
R<RpcStatus> releaseCollection(ReleaseCollectionParam requestParam);
```

## ReleaseCollectionParam

Use the `ReleaseCollectionParam.Builder` to construct a `ReleaseCollectionParam` object.

```java
import io.milvus.param.ReleaseCollectionParam;
ReleaseCollectionParam.Builder builder = ReleaseCollectionParam.newBuilder();
```

Methods of `ReleaseCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to release.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ReleaseCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ReleaseCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

ReleaseCollectionParam param = ReleaseCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<Boolean> response = client.releaseCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
