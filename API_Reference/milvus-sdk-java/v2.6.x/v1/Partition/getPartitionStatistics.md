# getPartitionStatistics()

MilvusClient interface. This method shows the statistical information of a partition.

```java
R<GetPartitionStatisticsResponse> getPartitionStatistics(GetPartitionStatisticsParam requestParam);
```

#### GetPartitionStatisticsParam

Use the `GetPartitionStatisticsParam.Builder` to construct a `GetPartitionStatisticsParam` object.

```java
import io.milvus.param.GetPartitionStatisticsParam;
GetPartitionStatisticsParam.Builder builder = GetPartitionStatisticsParam.newBuilder();
```

Methods of `GetPartitionStatisticsParam.Builder`:

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
        <td><p>Sets the partition name. Partition name cannot be empty or null.</p></td>
        <td><p>partitionName: The target partition name.</p></td>
    </tr>
    <tr>
        <td><p>withFlush(Boolean flush)</p></td>
        <td><p>Requires a flush action before retrieving partition statistics. Default value is True.</p></td>
        <td><p>flush: Set to True to ask a flush action.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a GetPartitionStatisticsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetPartitionStatisticsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetPartitionStatisticsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetPartitionStatisticsResponse` held by the `R` template. You can use `GetPartStatResponseWrapper` to get statistics easily.

#### GetPartStatResponseWrapper

A tool class to encapsulate the `GetPartitionStatisticsResponse`. 

```java
import io.milvus.response.GetPartStatResponseWrapper;
GetPartStatResponseWrapper wrapper = new GetPartStatResponseWrapper(partStatResponse);
```

Methods of `GetPartStatResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getRowCount()</p></td>
     <td><p>Get the row count of a partition.Throw NumberFormatException if the row count string is illegal.</p></td>
     <td><p>long</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetPartitionStatisticsResponse;
import io.milvus.response.GetPartStatResponseWrapper;

GetPartitionStatisticsParam param = GetPartitionStatisticsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withPartitionName(PARTITION_NAME)
        .build();
R<GetPartitionStatisticsResponse> response = client.getPartitionStatistics(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetPartStatResponseWrapper wrapper = new GetPartStatResponseWrapper(response.getData());
System.out.println("Partition row count: " + wrapper.getRowCount());
```
