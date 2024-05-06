# createPartition()

MilvusClient interface. This method creates a partition in the specified collection.

```java
R<RpcStatus> createPartition(CreatePartitionParam requestParam);
```

## CreatePartitionParam

Use the `CreatePartitionParam.Builder` to construct a `CreatePartitionParam` object.

```java
import io.milvus.param.CreatePartitionParam;
CreatePartitionParam.Builder builder = CreatePartitionParam.newBuilder();
```

Methods of `CreatePartitionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withPartitionName(String partitionName)</td>
        <td>Set the partition name. Partition name cannot be empty or null.</td>
        <td>partitionName: The partition name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a CreatePartitionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreatePartitionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

CreatePartitionParam param = CreatePartitionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPartitionName(PARTITION_NAME)
        .build();
R<RpcStatus> response = client.createPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
