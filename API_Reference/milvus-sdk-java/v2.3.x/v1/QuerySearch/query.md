# query()

The MilvusClient interface. This method queries entity(s) based on scalar field(s) filtered by boolean expression. Note that the order of the returned entities cannot be guaranteed.

```java
R<QueryResults> query(QueryParam requestParam);
```

## QueryParam

Use the `QueryParam.Builder` to construct a `QueryParam` object.

```java
import io.milvus.param.dml.QueryParam;
QueryParam.Builder builder = QueryParam.newBuilder();
```

Methods of `QueryParam.Builder`:

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
        <td>withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)</td>
        <td>Sets the search consistency level(Optional).<br/>If the level is not set, will use the default consistency level of the collection.</td>
        <td>consistencyLevel: The consistency level used in the query.</td>
    </tr>
    <tr>
        <td>withPartitionNames(List\<String> partitionNames)</td>
        <td>Sets partition names list to specify query scope (Optional).</td>
        <td>partitionNames: The name list of partitions to be queried.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Adds a partition to specify query scope (Optional).</td>
        <td>partitionName: A partition name to be queried.</td>
    </tr>
    <tr>
        <td>withOutFields(List\<String> outFields)</td>
        <td>Specifies output scalar fields (Optional).<br/>If output fields are specified, the QueryResults returned by query() will contains the values of these fields.</td>
        <td><br/>outFields: The name list of fields to be outputed.</td>
    </tr>
    <tr>
        <td>addOutField(String fieldName)</td>
        <td>Specifies an output scalar field (Optional).</td>
        <td>fieldName: An output field name.</td>
    </tr>
    <tr>
        <td>withExpr(String expr)</td>
        <td>Set the expression to query entities. For more information please refer to <a href="https://milvus.io/docs/v2.3.x/boolean.md">this doc</a>.</td>
        <td>expr: The expression to query</td>
    </tr>
    <tr>
        <td>withOffset(Long offset)</td>
        <td>Specify a position, the returned entities before this position will be ignored. Only take effect when the 'limit' value is specified. Default value is 0, start from begin.</td>
        <td>offset: A value to define the position.</td>
    </tr>
    <tr>
        <td>withLimit(Long limit)</td>
        <td>Specify a value to control the returned number of entities. Must be a positive value. Default value is -1, will return without limit.</td>
        <td>limit: A value to define the limit of returned entities.</td>
    </tr>
    <tr>
        <td>withIgnoreGrowing(Boolean ignoreGrowing)</td>
        <td>Ignore the growing segments to get best query performance. For the user case that don't require data visibility. Default value is False.</td>
        <td>ignoreGrowing: Ignore growing segments or not.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a QueryParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `QueryParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<QueryResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns valid `QueryResults` held by the `R` template. You can use `QueryResultsWrapper` to get the query results.

## QueryResultsWrapper

A tool class to encapsulate the `QueryResults`. 

```java
import io.milvus.response.QueryResultsWrapper;
QueryResultsWrapper wrapper = new QueryResultsWrapper(queryResults);
```

Methods of `QueryResultsWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Parameters</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>getFieldWrapper(String fieldName)<br/></td>
     <td>Return a FieldDataWrapper object by a field name. Throws <code>ParamException</code> if the field doesn't exist.</td>
     <td>fieldName: A field name which is specified by the withOutFields() of QueryParam.</td>
     <td>FieldDataWrapper</td>
   </tr>
   <tr>
     <td>getRowCount()</td>
     <td>Gets the row count of a query result.</td>
     <td>N/A</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getRowRecords()</td>
     <td>Gets row records list from the query result.</td>
     <td>N/A</td>
     <td>List\<QueryResultsWrapper.RowRecord></td>
   </tr>
</table>

## FieldDataWrapper

A tool class to encapsulate column data returned by `query()` API. 

Methods of `FieldDataWrapper`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>isVectorField()<br/></td>
     <td>Tell the user if this field is a vector field or a scalar field.</td>
     <td>boolean</td>
   </tr>
   <tr>
     <td>isJsonField()</td>
     <td>Tell the user if this field is a JSON field.</td>
     <td>boolean</td>
   </tr>
   <tr>
     <td>isDynamicField()</td>
     <td>Tell the user if this field is a the dynamic field.</td>
     <td>boolean</td>
   </tr>
   <tr>
     <td>getDim()</td>
     <td>Gets the dimension value if the field is a vector field. Throw IllegalResponseException if the field is not a vector field.</td>
     <td>int</td>
   </tr>
   <tr>
     <td>getRowCount()</td>
     <td>Gets the row count of a field. Throws IllegalResponseException if the field data is illegal.</td>
     <td>long</td>
   </tr>
   <tr>
     <td>getFieldData()</td>
     <td>Returns the field data according to field type.<br/></td>
     <td></td>
   </tr>
</table>

## QueryResultsWrapper.RowRecord

A tool class to hold the data of a single row in key-value format.

Methods of `RowRecord`:

<table>
   <tr>
     <th><strong>Method</strong></th>
     <th><strong>Description</strong></th>
     <th><strong>Returns</strong></th>
   </tr>
   <tr>
     <td>put(String keyName, Object obj)<br/></td>
     <td>For internal use. Set a key-value pair for the row.</td>
     <td>boolean</td>
   </tr>
   <tr>
     <td>get(String keyName)</td>
     <td>Get a value by a key name. If the key name is a field name, return the value of this field.<br/>If the key name is in the dynamic field, return the value from the dynamic field.<br/>Throws ParamException if the key name doesn't exist.</td>
     <td>Object</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
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

