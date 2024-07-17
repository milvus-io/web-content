# describeCollection()

A MilvusClient interface. This method shows the details of a collection, e.g. name, schema.

```java
R<DescribeCollectionResponse> describeCollection(DescribeCollectionParam requestParam);
```

#### DescribeCollectionParam

Use the `DescribeCollectionParam.Builder` to construct a `DescribeCollectionParam` object.

```java
import io.milvus.param.DescribeCollectionParam;
DescribeCollectionParam.Builder builder = DescribeCollectionParam.newBuilder();
```

Methods of `DescribeCollectionParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to release.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a ReleaseCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `DescribeCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<DescribeCollectionResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `DescribeCollectionResponse` held by the `R` template. You can use `DescCollResponseWrapper` to get the information.

#### DescCollResponseWrapper

A tool class to encapsulate the DescribeCollectionResponse. 

```java
import io.milvus.response.DescCollResponseWrapper;
DescCollResponseWrapper wrapper = new DescCollResponseWrapper(response);
```

Methods of `DescCollResponseWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getCollectionName()</p></td>
     <td><p>Get the name of the collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getCollectionDescription()</p></td>
     <td><p>Get the description of the collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>String</p></td>
   </tr>
   <tr>
     <td><p>getCollectionID()</p></td>
     <td><p>Get the internal ID of the collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getShardNumber()</p></td>
     <td><p>Get the shard number of the collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getCreatedUtcTimestamp()</p></td>
     <td><p>Get UTC timestamp when the collection is created.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getAliases()</p></td>
     <td><p>Get aliases of the collection.</p></td>
     <td><p>N/A</p></td>
     <td><p>List\<String></p></td>
   </tr>
   <tr>
     <td><p>getFields()</p></td>
     <td><p>Get the schema of the collection's fields.</p></td>
     <td><p>N/A</p></td>
     <td><p>List\<FieldType></p></td>
   </tr>
   <tr>
     <td><p>getFieldByName(String fieldName)</p></td>
     <td><p>Get the schema of a field by name.Return null if the field doesn't exist.</p></td>
     <td><p>fieldName: The name of a field</p></td>
     <td><p>FieldType</p></td>
   </tr>
   <tr>
     <td><p>isDynamicFieldEnabled()</p></td>
     <td><p>Get whether the collection dynamic field is enabled</p></td>
     <td><p>N/A</p></td>
     <td><p>boolean</p></td>
   </tr>
   <tr>
     <td><p>getPartitionKeyField()</p></td>
     <td><p>Get the partition key field.Return null if the partition key field doesn't exist.</p></td>
     <td><p>N/A</p></td>
     <td><p>FieldType</p></td>
   </tr>
</table>

#### Example

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
