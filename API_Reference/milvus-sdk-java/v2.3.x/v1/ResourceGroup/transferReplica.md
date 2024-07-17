# transferReplica()

MilvusClient interface. This method transfers a query node from the source resource group to another resource group.

```java
R<RpcStatus> transferReplica(TransferReplicaParam requestParam);
```

#### TransferReplicaParam

Use the `TransferReplicaParam.Builder` to construct a `TransferReplicaParam` object.

```java
import io.milvus.param. TransferReplicaParam;
TransferReplicaParam.Builder builder =  TransferReplicaParam.newBuilder();
```

Methods of `TransferReplicaParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withSourceGroupName(String groupName)</p></td>
        <td><p>Sets the source group name. groupName cannot be empty or null.</p></td>
        <td><p>groupName: The name of the source group.</p></td>
    </tr>
    <tr>
        <td><p>withTargetGroupName(String groupName)</p></td>
        <td><p>Sets the target group name. groupName cannot be empty or null.</p></td>
        <td><p>groupName: The name of the target group.</p></td>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of a collection.</p></td>
    </tr>
    <tr>
        <td><p>withReplicaNumber(Long replicaNumber)</p></td>
        <td><p>Specify number of replicas to transfer.</p></td>
        <td><p>replicaNumber: The number of replicas to transfer.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a TransferReplicaParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `TransferReplicaParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.TransferReplicaParam;

R<RpcStatus> response = client.transferReplica(TransferReplicaParam.newBuilder()
            .withTargetGroupName(sourceName)
            .withTargetGroupName(targetName)
            .withCollectionName(COLLECTION_NAME)
            .withNodeNumber(1)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
