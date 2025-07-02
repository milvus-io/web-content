# dropPartition()

MilvusClient interface. This method drops a partition. Note that this method drops all data in this partition and the default partition cannot be dropped.

```java
R<RpcStatus> dropPartition(DropPartitionParam requestParam);
```

#### DropPartitionParam

Use the `DropPartitionParam.Builder` to construct a `DropPartitionParam` object.

```java
import io.milvus.param.DropPartitionParam;
DropPartitionParam.Builder builder = DropPartitionParam.newBuilder();
```

Methods of `DropPartitionParam.Builder`:

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
        <td><p>withPartitionName(String partitionName)</p></td>
        <td><p>Set the partition name. Partition name cannot be empty or null.</p></td>
        <td><p>partitionName: The target partition name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a DropPartitionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DropPartitionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

DropPartitionParam param = DropPartitionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPartitionName(PARTITION_NAME)
        .build();
R<RpcStatus> response = client.dropPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
