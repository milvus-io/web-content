# showPartitions()

MilvusClient interface. This method shows all partitions in the specified collection.

```java
R<ShowPartitionsResponse> showPartitions(ShowPartitionsParam requestParam);
```

## ShowPartitionsParam

Use the `ShowPartitionsParam.Builder` to construct a `ShowPartitionsParam` object.

```java
import io.milvus.param.ShowPartitionsParam;
ShowPartitionsParam.Builder builder = ShowPartitionsParam.newBuilder();
```

Methods of `ShowPartitionsParam.Builder`:

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
        <td>withPartitionNames(List\<String> partitionNames)</td>
        <td>Set the partition names list. Partition names list cannot be null or empty.</td>
        <td>partitionNames: The name list of partitions to show.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Add a partition by name. Partition name cannot be empty or null.</td>
        <td>partitionName: A target partition name.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a ShowPartitionsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ShowPartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ShowPartitionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `ShowPartitionsResponse` held by the R template. You can use `ShowPartResponseWrapper` to get information easily.

## ShowPartResponseWrapper

A tool class to encapsulate the ShowPartitionsResponse. 

```java
import io.milvus.response.ShowPartResponseWrapper;
ShowPartResponseWrapper wrapper = new ShowPartResponseWrapper(showPartitionsResponse);
```

Methods of `ShowPartitionsResponse`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getPartitionsInfo()<br/></td>
     <td>Return a list of PartitionInfo.</td>
     <td>N/A</td>
     <td>List\<PartitionInfo></td>
   </tr>
   <tr>
     <td>getPartitionInfoByName(String partitionName)<br/></td>
     <td>Return a PartitionInfo object by a partition name.</td>
     <td>partitionName: The target partition name.</td>
     <td>PartitionInfo</td>
   </tr>
</table>

## PartitionInfo

A tool class to hold information of a partition.

Methods of `ShowPartitionsResponse.PartitionInfo`

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getIndexType()</td>
     <td>Get index type.</td>
     <td>IndexType</td>
   </tr>
   <tr>
     <td>getMetricType()</td>
     <td>Get metric type.</td>
     <td>MetricType</td>
   </tr>
   <tr>
     <td>getExtraParam()</td>
     <td>Get index parameters in JSON format.</td>
     <td>String</td>
   </tr>
</table>

## Example

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
