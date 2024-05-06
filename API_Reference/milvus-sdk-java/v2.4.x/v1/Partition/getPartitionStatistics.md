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
        <td>Sets the partition name. Partition name cannot be empty or null.</td>
        <td>partitionName: The target partition name.</td>
    </tr>
    <tr>
        <td>withFlush(Boolean flush)</td>
        <td>Requires a flush action before retrieving partition statistics. Default value is True.</td>
        <td>flush: Set to True to ask a flush action.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a GetPartitionStatisticsParam object.</td>
        <td>N/A</td>
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

|  **Method**    |  **Description**                                                                                      |  **Returns** |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
|  getRowCount() |  Get the row count of a partition.<br/>Throw NumberFormatException if the row count string is illegal. |  long        |

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
