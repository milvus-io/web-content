# query()

A MilvusClient interface. This method queries entities based on scalar field(s) filtered by boolean expression. 

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
| `withCollectionName(collectionName)`                         | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The target collection name.                |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | Sets the consistency level used in the query. If the consistency level is not specified, the default level is `ConsistencyLevelEnum.STRONG`. | `consistencyLevel`: The consistency level used in the query. |
| `withPartitionNames(List<String> partitionNames)`            | Sets a partition name list to specify query scope (Optional). | `partitionNames`: The name list of the partitions to query.  |
| `addPartitionName(String partitionName)`                     | Adds a partition to specify query scope (Optional).          | `partitionName`: The name of the partition to query.        |
| `withGracefulTime(Long gracefulTime)`                        | Only used in `Bounded` consistency level. The default value is `5000` miliseconds. If graceful time is set, the `query()` will use current timestamp minus the graceful time as the ` GuaranteeTimestamp`. | `gracefulTime`: The graceful time value (unit: millisecond).  |
| `withGuaranteeTimestamp(Long ts)`                            | Instructs the server to see the insert/delete operations performed before a provided timestamp (Optional). If no such timestamp is specified, the server will wait for the latest operation to finish before processing a query. If you use an operation's TSO (Timestamp Oracle) to set this parameter, the server will execute the query after this operation is finished. The default value is `GUARANTEE_EVENTUALLY_TS`, with which the server executes query immediately. (Note that the timestamp is not an absolute timestamp, it is a hybrid value combined by UTC time and internal flags. We call it TSO, for more information please refer to [Guarantee Timestamp](https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md). You can get a TSO from insert/delete operations, see the [MutationResultWrapper](../Collection/insert().md#MutationResultWrapper) class for [insert()](../Collection/insert().md) API.) | `ts`: A  TSO timestamp value.                            |
| `withTravelTimestamp(Long ts)`                               | Specifies an absolute timestamp in a query to get results based on a data view at a specified point in time (Optional). The default value is `0`, with which the server executes the query on a full data view. For more information please refer to [Search with Time Travel](https://milvus.io/docs/v2.1.x/timetravel.md). | `ts`: An absolute timestamp value.                       |
| `withOutFields(List<String> outFields)`                      | Specifies the output scalar fields (Optional). If the output fields are specified, the `QueryResults` returned by `query()` will contains the values of these fields. | `outFields`: The name list of output fields.                 |
| `addOutField(String fieldName)`                              | Specifies an output scalar field (Optional).                 | `fieldName`: The name of an output field .                   |
| `withExpr(String expr)`                                      | Sets the expression to query entities. For more information please refer to [Boolean Expression Rules](https://milvus.io/docs/v2.1.x/boolean.md). | `expr`: The boolean expression used in the query.         |
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
| `getFieldWrapper(String fieldName)` | Returns a `FieldDataWrapper` object by a field name. Throws `ParamException` if the field doesn't exist. | `fieldName`: a field name which is specified by the `withOutFields()` of `QueryParam`. | FieldDataWrapper |

## FieldDataWrapper

A tool class to encapsulate field data returned by `query()` API. 

Methods of `FieldDataWrapper`:

| **Method**        | **Description**                                              | **Returns**                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `isVectorField()` | Tells the user whether this field is a vector field or a scalar field. | boolean                                                      |
| `getDim()`        | Gets the dimension value if the field is a vector field. Throw `IllegalResponseException` if the field is not a vector filed. | int                                                          |
| `getRowCount()`   | Gets the row count of a field. Throws `IllegalResponseException` if the field data is illegal. | long                                                         |
| `getFieldData()`  | Returns the field data according to field type.              | <li>Returns `List<List<Float>>` for float vector field.</li> <li>Returns `List<ByteBuffer>` for binary vector field.</li> <li>Returns `List<Long>` for int64 field.</li> <li>Returns `List<Integer>` for int32/int16/int8 field.</li> <li>Returns `List<Boolean>` for boolean field.</li> <li>Returns `List<Float>` for float field.</li> <li>Returns `List<Double>` for double field.</li><li>Returns `List<String>` for VARCHAR field.</li> |

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
FieldDataWrapper fieldData = queryResultsWrapper.getFieldWrapper("field1");
System.out.println("Field " + fieldName + " row count: " + fieldData.getRowCount());
System.out.println(fieldData.getFieldData());
```
