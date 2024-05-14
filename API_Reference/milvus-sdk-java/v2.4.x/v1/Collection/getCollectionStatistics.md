# getCollectionStatistics()

A MilvusClient interface. This method shows the statistical information of the specified collection. 

<div class="admonition note">

<p><b>the current version only returns the row count of a collection. this method can be deprecated in the future.</b></p>

</div>

```java
R<GetCollectionStatisticsResponse> getCollectionStatistics(GetCollectionStatisticsParam requestParam);
```

## GetCollectionStatisticsParam

Use the `GetCollectionStatisticsParam.Builder` to construct a `GetCollectionStatisticsParam` object.

```java
import io.milvus.param.GetCollectionStatisticsParam;
GetCollectionStatisticsParam.Builder builder = GetCollectionStatisticsParam.newBuilder();
```

Methods of `GetCollectionStatisticsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection whose statistical information needs to be checked.</td>
    </tr>
    <tr>
        <td>withFlush(Boolean flush)</td>
        <td>Requests a flush action before retrieving collection statistics. The default value is False.</td>
        <td>flush: Set the value to true to perform a flush action.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a GetCollectionStatisticsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetCollectionStatisticsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetCollectionStatisticsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetCollectionStatisticsResponse` held by the `R` template. You can use `GetCollStatResponseWrapper` to get the information.

## GetCollStatResponseWrapper

A tool class to encapsulate the `GetCollectionStatisticsResponse`. 

```java
import io.milvus.response.GetCollStatResponseWrapper;
GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(getStatResponse);
```

Methods of `GetCollStatResponseWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getRowCount()<br/></td>
     <td>Gets the row count of a collection. Note that due to technical reasons, the deleted entities are not counted in the row count.</td>
     <td>N/A<br/></td>
     <td>long</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.*;
import io.milvus.response.GetCollStatResponseWrapper;
import io.milvus.grpc.GetCollectionStatisticsResponse;

GetCollectionStatisticsParam param = GetCollectionStatisticsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<GetCollectionStatisticsResponse> response = client.getCollectionStatistics(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(response.getData());
System.out.println("Row count: " + wrapper.getRowCount());
```
