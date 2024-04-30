# releasePartitions()

MilvusClient interface. This method releases partitions' data from memory.

```java
R<RpcStatus> releasePartitions(ReleasePartitionsParam requestParam);
```

## ReleasePartitionsParam

Use the `ReleasePartitionsParam.Builder` to construct a `ReleasePartitionsParam` object.

```java
import io.milvus.param.ReleasePartitionsParam;
ReleasePartitionsParam.Builder builder = ReleasePartitionsParam.newBuilder();
```

Methods of `ReleasePartitionsParam.Builder`:

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
        <td>withPartitionNames(List&lt;String> partitionNames)</td>
        <td>Set the partition names list. Partition names list cannot be null or empty.</td>
        <td>partitionNames: The name list of partitions to be released.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Add a partition by name. Partition name cannot be empty or null.</td>
        <td>partitionName: A target partition name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a ReleasePartitionsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ReleasePartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.*;

ReleasePartitionsParam param = ReleasePartitionsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .addPartitionName(PARTITION_NAME)
        .build();
R<Boolean> response = client.releasePartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
