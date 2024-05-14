# describeIndex()

MilvusClient interface. This method shows the information of the specified index.

```java
R<DescribeIndexResponse> describeIndex(DescribeIndexParam requestParam);
```

## DescribeIndexParam

Use the `DescribeIndexParam.Builder` to construct a `DescribeIndexParam` object.

```java
import io.milvus.param.DescribeIndexParam;
DescribeIndexParam.Builder builder = DescribeIndexParam.newBuilder();
```

Methods of `DescribeIndexParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withIndexName(String indexName)</td>
        <td>Set the target index name. If no index name is specified, the default index name is empty string which means let the server determine it.</td>
        <td>indexName: The name of the index.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a DescribeIndexParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DropIndexParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeIndexResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `DescribeIndexResponse` held by the `R` template. You can use `DescIndexResponseWrapper` to get index descriptions easily.

## DescIndexResponseWrapper

A tool class to encapsulate the `DescribeIndexResponse`. 

```java
import io.milvus.response.DescIndexResponseWrapper;
DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(descIndexResponse);
```

Methods of `DescIndexResponseWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getIndexDescriptions()<br/></td>
     <td>Get a list of all index descriptions. (Currently only return one index information)</td>
     <td>N/A</td>
     <td>List\<IndexDesc></td>
   </tr>
   <tr>
     <td>getIndexDescByFieldName(String fieldName)<br/></td>
     <td>Get index description by field name. Return null if the field doesn't exist.</td>
     <td>fieldName: A field name</td>
     <td>IndexDesc</td>
   </tr>
</table>

## IndexDesc

A tool class to describe an index.

Methods of `DescIndexResponseWrapper.IndexDesc`

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
import io.milvus.response.DescIndexResponseWrapper;
import io.milvus.grpc.DescribeIndexResponse;

DescribeIndexParam param = DescribeIndexParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withIndexName("index1")
        .build();
R<DescribeIndexResponse> response = client.describeIndex(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

DescIndexResponseWrapper wrapper = new DescIndexResponseWrapper(response.getData());
for (DescIndexResponseWrapper.IndexDesc desc : wrapper.getIndexDescriptions()) {
    System.out.println(desc.toString());
}
```
