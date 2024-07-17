# getCollectionStatistics()

A MilvusClient interface. This method shows the statistical information of the specified collection. 

<div class="admonition note">

<p><b>the current version only returns the row count of a collection. this method can be deprecated in the future.</b></p>

</div>

```java
R<GetCollectionStatisticsResponse> getCollectionStatistics(GetCollectionStatisticsParam requestParam);
```

#### GetCollectionStatisticsParam

Use the `GetCollectionStatisticsParam.Builder` to construct a `GetCollectionStatisticsParam` object.

```java
import io.milvus.param.GetCollectionStatisticsParam;
GetCollectionStatisticsParam.Builder builder = GetCollectionStatisticsParam.newBuilder();
```

Methods of `GetCollectionStatisticsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection whose statistical information needs to be checked.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. Database name can be null for default database.</p></td>
        <td><p>databaseName: The name of the database.</p></td>
    </tr>
    <tr>
        <td><p>withFlush(Boolean flush)</p></td>
        <td><p>Requests a flush action before retrieving collection statistics. The default value is False.</p></td>
        <td><p>flush: Set the value to true to perform a flush action.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetCollectionStatisticsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetCollectionStatisticsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetCollectionStatisticsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetCollectionStatisticsResponse` held by the `R` template. You can use `GetCollStatResponseWrapper` to get the information.

#### GetCollStatResponseWrapper

A tool class to encapsulate the `GetCollectionStatisticsResponse`. 

```java
import io.milvus.response.GetCollStatResponseWrapper;
GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(getStatResponse);
```

Methods of `GetCollStatResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getRowCount()</p></td>
     <td><p>Gets the row count of a collection. Note that due to technical reasons, the deleted entities are not counted in the row count.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
</table>

#### Example

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
