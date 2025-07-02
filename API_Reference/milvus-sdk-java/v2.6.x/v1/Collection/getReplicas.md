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
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection whose replica information needs to be listed.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetReplicasParam object.</p></td>
        <td><p>N/A</p></td>
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
