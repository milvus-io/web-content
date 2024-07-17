# query()

The MilvusClient interface. This method queries entity(s) based on scalar field(s) filtered by boolean expression. Note that the order of the returned entities cannot be guaranteed.

```java
R<QueryResults> query(QueryParam requestParam);
```

#### QueryParam

Use the `QueryParam.Builder` to construct a `QueryParam` object.

```java
import io.milvus.param.dml.QueryParam;
QueryParam.Builder builder = QueryParam.newBuilder();
```

Methods of `QueryParam.Builder`:

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
        <td><p>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</p></td>
        <td><p>Sets the search consistency level(Optional).<br/>If the level is not set, will use the default consistency level of the collection.</p></td>
        <td><p>consistencyLevel: The consistency level used in the query.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List\<String> partitionNames)</p></td>
        <td><p>Sets partition names list to specify query scope (Optional).</p></td>
        <td><p>partitionNames: The name list of partitions to be queried.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Adds a partition to specify query scope (Optional).</p></td>
        <td><p>partitionName: A partition name to be queried.</p></td>
    </tr>
    <tr>
        <td><p>withOutFields(List\<String> outFields)</p></td>
        <td><p>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</p></td>
        <td><p><br/>outFields: The name list of fields to be outputed.</p></td>
    </tr>
    <tr>
        <td><p>addOutField(String fieldName)</p></td>
        <td><p>Specifies an output scalar field (Optional).</p></td>
        <td><p>fieldName: An output field name.</p></td>
    </tr>
    <tr>
        <td><p>withExpr(String expr)</p></td>
        <td><p>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/boolean.md">this doc</a>.</p></td>
        <td><p>expr: The expression to query</p></td>
    </tr>
    <tr>
        <td><p>withOffset(Long offset)</p></td>
        <td><p>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified. Default value is 0, start from begin.</p></td>
        <td><p>offset: A value to define the position.</p></td>
    </tr>
    <tr>
        <td><p>withLimit(Long limit)</p></td>
        <td><p>Specify a value to control the returned number of entities. Must be a positive value. Default value is -1, will return without limit.</p></td>
        <td><p>limit: A value to define the limit of returned entities.</p></td>
    </tr>
    <tr>
        <td><p>withIgnoreGrowing(Boolean ignoreGrowing)</p></td>
        <td><p>Ignore the growing segments to get best query performance. For the user case that don't require data visibility. Default value is False.</p></td>
        <td><p>ignoreGrowing: Ignore growing segments or not.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a QueryParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `QueryParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<QueryResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `QueryResults` held by the `R` template. You can use `QueryResultsWrapper` to get the query results.

#### QueryResultsWrapper

A tool class to encapsulate the `QueryResults`. 

```java
import io.milvus.response.QueryResultsWrapper;
QueryResultsWrapper wrapper = new QueryResultsWrapper(queryResults);
```

Methods of `QueryResultsWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Parameters</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>getFieldWrapper(String fieldName)</p></td>
     <td><p>Return a FieldDataWrapper object by a field name. Throws <code>ParamException</code> if the field doesn't exist.</p></td>
     <td><p>fieldName: A field name which is specified by the withOutFields() of QueryParam.</p></td>
     <td><p>FieldDataWrapper</p></td>
   </tr>
   <tr>
     <td><p>getRowCount()</p></td>
     <td><p>Gets the row count of a query result.</p></td>
     <td><p>N/A</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getRowRecords()</p></td>
     <td><p>Gets row records list from the query result.</p></td>
     <td><p>N/A</p></td>
     <td><p>List\<QueryResultsWrapper.RowRecord></p></td>
   </tr>
</table>

#### FieldDataWrapper

A tool class to encapsulate column data returned by `query()` API. 

Methods of `FieldDataWrapper`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>isVectorField()</p></td>
     <td><p>Tell the user if this field is a vector field or a scalar field.</p></td>
     <td><p>boolean</p></td>
   </tr>
   <tr>
     <td><p>isJsonField()</p></td>
     <td><p>Tell the user if this field is a JSON field.</p></td>
     <td><p>boolean</p></td>
   </tr>
   <tr>
     <td><p>isDynamicField()</p></td>
     <td><p>Tell the user if this field is a the dynamic field.</p></td>
     <td><p>boolean</p></td>
   </tr>
   <tr>
     <td><p>getDim()</p></td>
     <td><p>Gets the dimension value if the field is a vector field. Throw IllegalResponseException if the field is not a vector field.</p></td>
     <td><p>int</p></td>
   </tr>
   <tr>
     <td><p>getRowCount()</p></td>
     <td><p>Gets the row count of a field. Throws IllegalResponseException if the field data is illegal.</p></td>
     <td><p>long</p></td>
   </tr>
   <tr>
     <td><p>getFieldData()</p></td>
     <td><p>Returns the field data according to field type.</p></td>
     <td><ul><li><p>Return List\<List\<Float>gt; for FloatVector field.</p></li><li><p>Return List\<ByteBuffer> for BinaryVector/Float16Vector/BFloatVector field.</p></li><li><p>Return List\<SortedMap\<Long, Float>gt; for SparseFloatVector field.</p></li><li><p>Return List\<Long> for Int64 field.</p></li><li><p>Return List\<Integer> for Int32/Int16/Int8 field.</p></li><li><p>Return List\<Boolean> for Bool field.</p></li><li><p>Return List\<Float> for Float field.</p></li><li><p>Return List\<Double> for Double field.</p></li><li><p>Return List\<String> for Varchar field.</p></li><li><p>Return List\<ByteString> for JSON field.</p></li></ul></td>
   </tr>
</table>

#### QueryResultsWrapper.RowRecord

A tool class to hold the data of a single row in key-value format.

Methods of `RowRecord`:

<table>
   <tr>
     <th><p><strong>Method</strong></p></th>
     <th><p><strong>Description</strong></p></th>
     <th><p><strong>Returns</strong></p></th>
   </tr>
   <tr>
     <td><p>put(String keyName, Object obj)</p></td>
     <td><p>For internal use. Set a key-value pair for the row.</p></td>
     <td><p>boolean</p></td>
   </tr>
   <tr>
     <td><p>get(String keyName)</p></td>
     <td><p>Get a value by a key name. If the key name is a field name, return the value of this field.If the key name is in the dynamic field, return the value from the dynamic field.Throws ParamException if the key name doesn't exist.</p></td>
     <td><p>Object</p></td>
   </tr>
</table>

#### Example

```java
import io.milvus.param.dml.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

QueryParam param = QueryParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withExpr("id in [100, 101]")
        .addOutFields("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .build();
R<QueryResults> response = client.query(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

QueryResultsWrapper wrapper = new QueryResultsWrapper(response.getData());
List<QueryResultsWrapper.RowRecord> records = wrapper.getRowRecords();
for (QueryResultsWrapper.RowRecord record:records) {
    System.out.println(record);
}
```
