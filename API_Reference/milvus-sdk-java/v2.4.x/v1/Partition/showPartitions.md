# showPartitions()

MilvusClient interface. This method shows all partitions in the specified collection.

```java
R<ShowPartitionsResponse> showPartitions(ShowPartitionsParam requestParam);
```

#### ShowPartitionsParam

Use the `ShowPartitionsParam.Builder` to construct a `ShowPartitionsParam` object.

```java
import io.milvus.param.ShowPartitionsParam;
ShowPartitionsParam.Builder builder = ShowPartitionsParam.newBuilder();
```

Methods of `ShowPartitionsParam.Builder`:

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
        <td><p>withPartitionNames(List&lt;String> partitionNames)</p></td>
        <td><p>Set the partition names list. Partition names list cannot be null or empty.</p></td>
        <td><p>partitionNames: The name list of partitions to show.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Add a partition by name. Partition name cannot be empty or null.</p></td>
        <td><p>partitionName: A target partition name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a ShowPartitionsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `ShowPartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<ShowPartitionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `ShowPartitionsResponse` held by the `R` template. You can use ShowPartResponseWrapper to get information easily.

#### ShowPartResponseWrapper

A tool class to encapsulate the `ShowPartitionsResponse`. 

```java
import io.milvus.response.ShowPartResponseWrapper;
ShowPartResponseWrapper wrapper = new ShowPartResponseWrapper(showPartitionsResponse);
```

Methods of `ShowPartitionsResponse`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getPartitionsInfo()</p></td>
     <td><p>Return a list of PartitionInfo.</p></td>
     <td><p>N/A</p></td>
     <td><p>List&lt;PartitionInfo></p></td>
   </tr>
   <tr>
     <td><p>getPartitionInfoByName(String partitionName)</p></td>
     <td><p>Return a PartitionInfo object by a partition name.</p></td>
     <td><p>partitionName: The target partition name.</p></td>
     <td><p>PartitionInfo</p></td>
   </tr>
</table>

#### PartitionInfo

A tool class to hold information of a partition.

Methods of `ShowPartitionsResponse.PartitionInfo`

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getIndexType()</p></td>
     <td><p>Get index type.</p></td>
     <td><p>IndexType</p></td>
   </tr>
   <tr>
     <td><p>getMetricType()</p></td>
     <td><p>Get metric type.</p></td>
     <td><p>MetricType</p></td>
   </tr>
   <tr>
     <td><p>getExtraParam()</p></td>
     <td><p>Get index parameters in JSON format.</p></td>
     <td><p>String</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.ShowPartitionsResponse;
import io.milvus.response.ShowPartResponseWrapper;

ShowPartitionsParam param = ShowPartitionsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .addPartitionName(PARTITION_NAME)
        .build();
R<ShowPartitionsResponse> response = client.showPartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

ShowPartResponseWrapper wrapper = new ShowPartResponseWrapper(response.getData());
ShowPartResponseWrapper.PartitionInfo info = wrapper.getPartitionInfoByName("_default");
System.out.println("Partition name: " + info.getName() + ", ID: " + info.getId() + ", in-memory: " + info.getInMemoryPercentage() + "%");
```
