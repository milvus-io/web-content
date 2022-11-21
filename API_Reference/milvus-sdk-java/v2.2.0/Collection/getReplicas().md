# getReplicas()

A MilvusClient interface. This method lists the replica information of a specified collection.

```Java
R<GetReplicasResponse> getReplicas(GetReplicasParam requestParam);
```

## GetReplicasParam

Use the `GetReplicasParam.Builder` to construct a `GetReplicasParam` object.

```Java
import io.milvus.param.GetReplicasParam;
GetReplicasParam.Builder builder = GetReplicasParam.newBuilder();
```

Methods of `GetReplicasParam.Builder`:

| Method                                      | Description                                                  | Parameters                                                   |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose replica information needs to be listed. |
| `build()`                                   | Constructs a `GetReplicasParam` object.                      | N/A                                                          |

The `GetReplicasParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetReplicasResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetReplicasResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetReplicasResponse;
import io.milvus.grpc.ReplicaInfo;

GetReplicasParam param = GetReplicasParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<GetReplicasResponse> response = client.getReplicas(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetReplicasResponse replicas = response.getData();
for (int i = 0; i < replicas.getReplicasCount(); i++) {
    ReplicaInfo info = replicas.getReplicas(i);
    System.out.println("Replica ID: " + info.getReplicaID() + ", nodes: " + info.getNodeIdsList().toString());
}
```

