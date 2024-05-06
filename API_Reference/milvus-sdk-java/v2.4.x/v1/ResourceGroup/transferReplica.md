# transferReplica()

MilvusClient interface. This method transfers a query node from the source resource group to another resource group.

```java
R<RpcStatus> transferReplica(TransferReplicaParam requestParam);
```

## TransferNodeParam

Use the `TransferReplicaParam.Builder` to construct a `TransferReplicaParam` object.

```java
import io.milvus.param. TransferReplicaParam;
TransferReplicaParam.Builder builder =  TransferReplicaParam.newBuilder();
```

Methods of `TransferReplicaParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withSourceGroupName(String groupName)</td>
        <td>Sets the source group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the source group.</td>
    </tr>
    <tr>
        <td>withTargetGroupName(String groupName)</td>
        <td>Sets the target group name. groupName cannot be empty or null.</td>
        <td>groupName: The name of the target group.</td>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of a collection.</td>
    </tr>
    <tr>
        <td>withReplicaNumber(Long replicaNumber)</td>
        <td>Specify number of replicas to transfer.</td>
        <td>replicaNumber: The number of replicas to transfer.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a TransferReplicaParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `TransferReplicaParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
