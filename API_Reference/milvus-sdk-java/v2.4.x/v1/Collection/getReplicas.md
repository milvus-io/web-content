# getReplicas()

A MilvusClient interface. This method lists the replica information of a specified collection.

```java
R<GetReplicasResponse> getReplicas(GetReplicasParam requestParam);
```

#### GetReplicasParam

Use the `GetReplicasParam.Builder` to construct a GetReplicasParam object.

```java
import io.milvus.param.GetReplicasParam;
GetReplicasParam.Builder builder = GetReplicasParam.newBuilder();
```

Methods of `GetReplicasParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection whose replica information needs to be listed.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a GetReplicasParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetReplicasParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetReplicasResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetReplicasResponse` held by the `R` template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetReplicasResponse;
import io.milvus.grpc.ReplicaInfo;

GetReplicasParam param = GetReplicasParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
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
