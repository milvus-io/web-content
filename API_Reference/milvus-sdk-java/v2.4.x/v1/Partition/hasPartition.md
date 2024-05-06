# hasPartition()

MilvusClient interface. This method checks if a partition exists in the specified collection.

```java
R<Boolean> hasPartition(HasPartitionParam requestParam);
```

#### HasPartitionParam

Use the `HasPartitionParam.Builder` to construct a `HasPartitionParam` object.

```java
import io.milvus.param.HasPartitionParam;
HasPartitionParam.Builder builder = HasPartitionParam.newBuilder();
```

Methods of `HasPartitionParam.Builder`:

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
        <td>partitionName: The target partition name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a HasPartitionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `HasPartitionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<Boolean>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

HasPartitionParam param = HasPartitionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPartitionName(PARTITION_NAME)
        .build();
R<Boolean> response = client.hasPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Partition existence: " + response.getData());
```
