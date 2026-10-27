# describeIndex()

MilvusClient interface. This method shows the information of the specified index.

```java
R<DescribeIndexResponse> describeIndex(DescribeIndexParam requestParam);
```

#### DescribeIndexParam

Use the `DescribeIndexParam.Builder` to construct a `DescribeIndexParam` object.

```java
import io.milvus.param.DescribeIndexParam;
DescribeIndexParam.Builder builder = DescribeIndexParam.newBuilder();
```

Methods of `DescribeIndexParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withIndexName(String indexName)</p></td>
        <td><p><strong>Deprecated.</strong> Set the target index name. If no index name is specified, the default index name is empty string which means let the server determine it.</p></td>
        <td><p>indexName: The name of the index.</p></td>
    </tr>
    <tr>
        <td><p>withFieldName(String fieldName)</p></td>
        <td><p>Sets the target field name. Field name can be empty or null.<br/>If no field name is specified, then return all this collection indexes.</p></td>
        <td><p>fieldName: The field name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a DescribeIndexParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DropIndexParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<DescribeIndexResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `DescribeIndexResponse` held by the `R` template. You can use `DescIndexResponseWrapper` to get index descriptions easily.

#### DescIndexResponseWrapper

A tool class to encapsulate the `DescribeIndexResponse`.

```java
import io.milvus.response.DescIndexResponseWrapper;
DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(descIndexResponse);
```

Methods of `DescIndexResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getIndexDescriptions()</p></td>
     <td><p>Get a list of all index descriptions. (Currently only return one index information)</p></td>
     <td><p>N/A</p></td>
     <td><p>List&lt;IndexDesc></p></td>
   </tr>
   <tr>
     <td><p>getIndexDescByFieldName(String fieldName)</p></td>
     <td><p>Get index description by field name. Return null if the field doesn't exist.</p></td>
     <td><p>fieldName: A field name</p></td>
     <td><p>IndexDesc</p></td>
   </tr>
</table>

Each `DescIndexResponseWrapper.IndexDesc` has the following getters:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>getFieldName()</p></td>
     <td><p>Get the name of the indexed field.</p></td>
   </tr>
   <tr>
     <td><p>getIndexName()</p></td>
     <td><p>Get the name of the index.</p></td>
   </tr>
   <tr>
     <td><p>getId()</p></td>
     <td><p>Get the ID of the index.</p></td>
   </tr>
   <tr>
     <td><p>getParams()</p></td>
     <td><p>Get the parameters of the index.</p></td>
   </tr>
   <tr>
     <td><p>getIndexedRows()</p></td>
     <td><p>Get the number of rows that have been indexed.</p></td>
   </tr>
   <tr>
     <td><p>getTotalRows()</p></td>
     <td><p>Get the total number of rows known to the index.</p></td>
   </tr>
   <tr>
     <td><p>getPendingIndexRows()</p></td>
     <td><p>Get the number of rows waiting to be indexed.</p></td>
   </tr>
   <tr>
     <td><p>getIndexState()</p></td>
     <td><p>Get the current state of index building.</p></td>
   </tr>
   <tr>
     <td><p>getIndexFailedReason()</p></td>
     <td><p>Get the reason why index building failed.</p></td>
   </tr>
   <tr>
     <td><p>getIndexType()</p></td>
     <td><p>Get the index type parsed from the index parameters.</p></td>
   </tr>
   <tr>
     <td><p>getMetricType()</p></td>
     <td><p>Get the metric type parsed from the index parameters.</p></td>
   </tr>
   <tr>
     <td><p>getExtraParam()</p></td>
     <td><p>Get the extra index parameters other than index type and metric type.</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.*;
import io.milvus.response.DescIndexResponseWrapper;
import io.milvus.grpc.DescribeIndexResponse;

DescribeIndexParam param = DescribeIndexParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withIndexName("index1")
        .build();
R<DescribeIndexResponse> response = client.describeIndex(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(response.getData());
for (DescIndexResponseWrapper.IndexDesc desc : wrapper.getIndexDescriptions()) {
    System.out.println(desc.toString());
}
```
