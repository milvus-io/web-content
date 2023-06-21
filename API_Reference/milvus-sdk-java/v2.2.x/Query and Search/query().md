# query()

A MilvusClient interface. This method queries entity(s) based on scalar field(s) filtered by boolean expression. 

<div class="alert note">
The order of the returned entities cannot be guaranteed.
</div>

```Java
R<QueryResults> query(QueryParam requestParam);
```

## QueryParam

Use the `QueryParam.Builder` to construct a `QueryParam` object.

```Java
import io.milvus.param.QueryParam;
QueryParam.Builder builder = QueryParam.newBuilder();
```

Methods of `QueryParam.Builder`:

| Method                                                       | Description                                                  | Parameters                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `withCollectionName(collectionName)`                         | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to query.                |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | Sets the consistency level used in the query. If the consistency level is not specified, the default level is `ConsistencyLevelEnum.BOUNDED`. | `consistencyLevel`: The [consistency level](../Misc/ConsistencyLevelEnum.md) used in the query. |
| `withPartitionNames(List<String> partitionNames)`            | Sets a partition name list to specify query scope (Optional). | `partitionNames`: The name list of the partitions to query.  |
| `addPartitionName(String partitionName)`                     | Adds a partition to specify query scope (Optional).          | `partitionName`: The name of the partition to query.        |
| `withTravelTimestamp(Long ts)`                               | Specifies an absolute timestamp in a query to get results based on a data view at a specified point in time (Optional). The default value is `0`, with which the server executes the query on a full data view. For more information please refer to [Search with Time Travel](https://milvus.io/docs/v2.1.x/timetravel.md). | `ts`: An absolute timestamp value.                       |
| `withOutFields(List<String> outFields)`                      | Specifies the output scalar fields (Optional). If the output fields are specified, the `QueryResults` returned by `query()` will contains the values of these fields. | `outFields`: The name list of output fields.                 |
| `addOutField(String fieldName)`                              | Specifies an output scalar field (Optional).                 | `fieldName`: The name of an output field .                   |
| `withExpr(String expr)`                                      | Sets the expression to query entities. For more information please refer to [Boolean Expression Rules](https://milvus.io/docs/v2.1.x/boolean.md). | `expr`: The boolean expression used in the query.         |
| `withOffset(Long offset)`	| Sets a position, the returned entities before which will be ignored. This parameter works only when the `limit` value is specified. The default value is 0, starting from beginning of the returned set of entities. | `offset`: A value that defines the position. |
| `withLimit(Long limit)` | Sets a value to limit the returned number of entities. It must be a positive integer. The default value is 0, indicating that all entities are returned without a limit.	| `limit`: A value that defines the limit of returned entities. |
| `withIgnoreGrowing(Boolean ignoreGrowing)` | Whether to ignore growing segments during similarity searches. The value defaults to `false`, indicating that searches involve growing segments. | `ignoreGrowing`: Whether to ignore growing segments or not. |
| `build()`                                                    | Constructs a `QueryParam` object.                            | N/A                                                      |

The `QueryParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<QueryResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns valid `QueryResults` held by the R template. You can use `QueryResultsWrapper` to get the query results.

## QueryResultsWrapper

A tool class to encapsulate the `QueryResults`. 

```Java
import io.milvus.response.QueryResultsWrapper;
QueryResultsWrapper wrapper = new QueryResultsWrapper(queryResults);
```

Methods of `QueryResultsWrapper`:

| Method                          | Description                                              | Parameters                                               | Returns      |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| `getFieldWrapper(String fieldName)` | Returns a `FieldDataWrapper` object by a field name. `ParamException` is thrown if the field does not exist. | `fieldName`: a field name which is specified by the `withOutFields()` of `QueryParam`. | FieldDataWrapper |
| `getRowCount()` | Gets the row count of a query results. | N/A | long |
| `getRowRecord(long index)` | Gets a row record from query result. Throws a `ParamException` if the specified index does not exist. | `Index`: index of the row to return. | `QueryResultsWrapper.RowRecord` |
| `getRowRecords()` | Gets a list of row records from the query results | N/A | `List<RowRecord>` |

## FieldDataWrapper

A tool class to encapsulate field data returned by `query()` API. 

Methods of `FieldDataWrapper`:

| Method        | Description                                              | Returns                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `isVectorField()` | Indicated whether this field is a vector field or a scalar field. | Boolean                                                      |
| `getDim()`        | Gets the dimension value if the field is a vector field. `IllegalResponseException` is thrown if the field is not a vector field. | int                                                          |
| `getRowCount()`   | Gets the row count of a field. `IllegalResponseException` is thrown if the field data is illegal. | long                                                         |
| `getFieldData()`  | Returns the field data according to field type.              | <li>Returns `List<List<Float>>` for float vector field.</li> <li>Returns `List<ByteBuffer>` for binary vector field.</li> <li>Returns `List<Long>` for int64 field.</li> <li>Returns `List<Integer>` for int32/int16/int8 field.</li> <li>Returns `List<Boolean>` for boolean field.</li> <li>Returns `List<Float>` for float field.</li> <li>Returns `List<Double>` for double field.</li><li>Returns `List<String>` for VARCHAR field.</li> |

## QueryResultsWrapper.RowRecord

| Method                | Description                                                                                                                                                                                       | Returns |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `get(String keyName)` | Get the value of a field by its name. If the field exists either as a pre-defined field or a dynamic field, its value is to return.<br>If the field does not exist, a `ParamException` is raised. | Object  |

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

QueryParam param = QueryParam.newBuilder()
        .withCollectionName("collection1")
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
