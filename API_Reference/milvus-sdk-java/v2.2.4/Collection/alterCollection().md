# alterCollection()

A MilvusClient interface. This method changes the specified collection properties.

```java
R<RpcStatus> alterCollection(AlterCollectionParam requestParam);
```

## AlterCollectionParam

Use the `AlterCollectionParam.Builder` to construct an AlterCollectionParam object.

```java
import io.milvus.param.AlterCollectionParam;
AlterCollectionParam.Builder builder = AlterCollectionParam.newBuilder();
```

Methods of `AlterCollectionParam.Builder`:

| Method | Description | Parameters |
| ------ | ----------- | ---------- |
| `withCollectionName(String collectionName)` | Sets the collection name. This is mandatory and cannot be empty or null. | `collectionName`: Name of the collection whose properties are to be changed. |
| `withTTL(Integer ttlSeconds)` | Sets the time-to-live (TTL) of a collection. A collection expires when TTL ends and all the data in the collection will be cleaned up. An expired collection is never involved in searches and queries. | `ttlSeconds`: TTL in seconds. The value should be 0 or a positive integer. |
| `build()` | Constructs a `AlterCollectionParam` object | N/A |

The `AlterCollectionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java

import io.milvus.param.*;

AlterCollectionParam param = AlterCollectionParam.newBuilder()
        .withCollectionName(collectionName)
        .withTTL(1800)
        .build();
R<RpcStatus> response = client.alterCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
