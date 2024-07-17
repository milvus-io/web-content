# releasePartitions()

MilvusClient interface. This method releases partitions' data from memory.

```java
R<RpcStatus> releasePartitions(ReleasePartitionsParam requestParam);
```

#### ReleasePartitionsParam

Use the `ReleasePartitionsParam.Builder` to construct a `ReleasePartitionsParam` object.

```java
import io.milvus.param.ReleasePartitionsParam;
ReleasePartitionsParam.Builder builder = ReleasePartitionsParam.newBuilder();
```

Methods of `ReleasePartitionsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List\<String> partitionNames)</p></td>
        <td><p>Set the partition names list. Partition names list cannot be null or empty.</p></td>
        <td><p>partitionNames: The name list of partitions to be released.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Add a partition by name. Partition name cannot be empty or null.</p></td>
        <td><p>partitionName: A target partition name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a ReleasePartitionsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `ReleasePartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

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
