# describeCollection()

A MilvusClient interface. This method shows the details of a collection, e.g. name, schema.

```java
R<DescribeCollectionResponse> describeCollection(DescribeCollectionParam requestParam);
```

## DescribeCollectionParam

Use the `DescribeCollectionParam.Builder` to construct a `DescribeCollectionParam` object.

```java
import io.milvus.param.DescribeCollectionParam;
DescribeCollectionParam.Builder builder = DescribeCollectionParam.newBuilder();
```

Methods of `DescribeCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to release.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a ReleaseCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `DescribeCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<DescribeCollectionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `DescribeCollectionResponse` held by the `R` template. You can use `DescCollResponseWrapper` to get the information.

## DescCollResponseWrapper

A tool class to encapsulate the DescribeCollectionResponse. 

```java
import io.milvus.response.DescCollResponseWrapper;
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response);
```

Methods of `DescCollResponseWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getCollectionName()</td>
     <td>Get the name of the collection.</td>
     <td>N/A</td>
     <td>String</td>
   </tr>
   <tr>
     <td>getCollectionDescription()</td>
     <td>Get the description of the collection.<br/></td>
     <td>N/A</td>
     <td>String</td>
   </tr>
   <tr>
     <td>getCollectionID()</td>
     <td>Get the internal ID of the collection.</td>
     <td>N/A</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getShardNumber()</td>
     <td>Get the shard number of the collection.</td>
     <td>N/A</td>
     <td>int<br/></td>
   </tr>
   <tr>
     <td>getCreatedUtcTimestamp()</td>
     <td>Get UTC timestamp when the collection is created.</td>
     <td>N/A<br/></td>
     <td>long<br/></td>
   </tr>
   <tr>
     <td>getAliases()</td>
     <td>Get aliases of the collection.</td>
     <td>N/A</td>
     <td>List\<String></td>
   </tr>
   <tr>
     <td>getFields()</td>
     <td>Get the schema of the collection's fields.</td>
     <td>N/A</td>
     <td>List\<FieldType></td>
   </tr>
   <tr>
     <td>getFieldByName(String fieldName)</td>
     <td>Get the schema of a field by name.<br/>Return null if the field doesn't exist.</td>
     <td>fieldName: The name of a field</td>
     <td>FieldType</td>
   </tr>
   <tr>
     <td>isDynamicFieldEnabled()</td>
     <td>Get whether the collection dynamic field is enabled</td>
     <td>N/A</td>
     <td>boolean</td>
   </tr>
   <tr>
     <td>getPartitionKeyField()</td>
     <td>Get the partition key field.<br/>Return null if the partition key field doesn't exist.</td>
     <td>N/A</td>
     <td>FieldType</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.*;
import io.milvus.response.DescCollResponseWrapper;

DescribeCollectionParam param = DescribeCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<DescribeCollectionResponse> response = client.describeCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response.getData());
System.out.println("Shard number: " + wrapper.getShardNumber());
```
