# search()

A MilvusClient interface. This method conducts approximate nearest neighbor (ANN) search on a vector field and pairs up with boolean expression to conduct filtering on scalar fields before searching.

```Java
R<SearchResults> search(SearchParam requestParam);
```

## SearchParam

Use the `SearchParam.Builder` to construct a `SearchParam` object.

```Java
import io.milvus.param.SearchParam;
SearchParam.Builder builder = SearchParam.newBuilder();
```

Methods of `SearchParam.Builder`:

| Method                                                       | Description                                                  | Parameters                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(collectionName)`                         | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: Target collection name.                    |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | Sets the consistency level used in the search. If the consistency level is not specified, the default level is `ConsistencyLevelEnum.STRONG`. | `consistencyLevel`: Consistency level used in the search.    |
| `withPartitionNames(List<String> partitionNames)`            | Sets a partition name list to specify search scope (Optional). | `partitionNames`: Name list of the partitions to search.     |
| `addPartitionName(String partitionName)`                     | Adds a partition to specify search scope (Optional).         | `partitionName`: Name of the partition to search.            |
| `withGracefulTime(Long gracefulTime)`                        | Only used in `Bounded` consistency level. The Ddfault value is `5000` milliseconds. If graceful time is set, the `search()` will use current timestamp minus the graceful time as the ` GuaranteeTimestamp`. | `gracefulTime`: Graceful time value (unit: millisecond).     |
| `withGuaranteeTimestamp(Long ts)`                            | Instructs the server to see insert/delete operations performed before a provided timestamp. If no such timestamp is specified, the server will wait for the latest operation to finish before processing a search. If you use an operation's TSO (Timestamp Oracle) to set this parameter, the server will execute the search after this operation is finished. The default value is `GUARANTEE_EVENTUALLY_TS`, with which the server executes the search immediately. (Note that the timestamp is not an absolute timestamp, it is a hybrid value combined by UTC time and internal flags. We call it TSO, for more information please refer to [Guarantee Timestamp](https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md). You can get a TSO from insert/delete operations, see the `MutationResultWrapper` class for `insert()` API.) | `ts`: A TSO timestamp value.                                 |
| ` withTravelTimestamp(Long ts)`                              | Specifies an absolute timestamp in a query to get results based on a data view at a specified point in time (Optional). The default value is `0`, with which the server executes the search on a full data view. For more information please refer to [Search with Time Travel](https://milvus.io/docs/v2.1.x/timetravel.md). | `ts`: An absolute timestamp value.                           |
| `withOutFields(List<String> outFields)`                      | Specifies output scalar fields (Optional).                   | `outFields`: Name list of output fields.                     |
| `addOutField(String fieldName)`                              | Specifies an output scalar field (Optional).                 | `fieldName`: Name of an output field.                        |
| `withExpr(String expr)`                                      | Sets the expression to filter scalar fields before searching (Optional). For more information please refer to [Boolean Expression Rules](https://milvus.io/docs/v2.1.x/boolean.md). | `expr`: Expression used to filter scalar fields.             |
| `withMetricType(MetricType metricType)`                      | Sets the metric type of ANN search. The default value is `MetricType.L2`. | `metricType`: Metric type.                                   |
| `withVectorFieldName(String vectorFieldName)`                | Sets the target vector field by name. The field name cannot be empty or null. | `vectorFieldName`: A vector field name.                      |
| `withTopK(Integer topK)`                                     | Sets the topK value of ANN search. The available range is [1, 16384]. | `topK`: topK value.                                          |
| `withVectors(List<?> vectors)`                               | Sets the target vectors. Up to 16384 vectors are allowed.    | `vectors`:  <ul><li> If target field type is float vector, `List< List<Float>>` is required.</li> <li>If target field type is binary vector, `List<ByteBuffer>` is required.</li></ul> |
| `withRoundDecimal(Integer decimal)`                          | Specifies the decimal place for returned distance. The available range is [-1, 6]. The default value is `-1`, with which the method returns all digits. | `decimal`: Number of digits reserved after the decimal point. |
| `build()`                                                    | Constructs a `SearchParam` object.                           | N/A                                                          |

The `SearchParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<SearchResults>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns valid `SearchResults` held by the R template. You can use `SearchResultsWrapper` to get the results.

## SearchResultsWrapper

A tool class to encapsulate the `SearchResults`. 

```Java
import io.milvus.response.SearchResultsWrapper;
SearchResultsWrapper wrapper = new SearchResultsWrapper(searchResults);
```

Methods of `SearchResultsWrapper`:

| **Method**                                          | **Description**                                              | **Parameters**                                               | Returns                                                      |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `getFieldData(String fieldName, int indexOfTarget)` | Gets data for an output field which is specified by `SearchParam`. Throws `ParamException` if the field doesn't exist or `indexOfTarget` is illegal. | `fieldName`: A field name which is specified by the `withOutFields()` of `SearchParam.indexOfTarget` (the order number of a target vector). | <ul><li>Returns `List<List<Float>>` for float vector field.</li> <li>Returns `List<ByteBuffer>` for binary vector field.</li> <li>Returns `List<Long>` for int64 field.</li> <li>Returns `List<Integer>` for int32/int16/int8 field.</li> <li>Returns `List<Boolean>` for boolean field.</li> <li>Returns `List<Float>` for float field.</li> <li>Returns `List<Double>` for double field.</li> <li>Returns `List<String>` for VARCHAR field.</li></ul> |
| `getIDScore(int indexOfTarget)`                     | Gets ID-score pairs returned by `search()`. Throws `ParamException` if the `indexOfTarget` is illegal. Throws `IllegalResponseException` if the returned results are illegal. | `indexOfTarget`: Order number of a target vector.            | `List<IDScore>`                                              |

## IDScore

A tool class to hold a pair of ID and distance.

Methods of `SearchResultsWrapper.IDScore`:

| **Method**     | **Description**                                    | **Returns** |
| -------------- | -------------------------------------------------- | ----------- |
| `getLongID() ` | Gets integer ID if the primary key type is Int64.  | long        |
| `getStrID()`   | Gets string ID if the primary key type is VarChar. | String      |
| `getScore()`   | Gets distance value.                               | float       |

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.grpc.SearchResults;

SearchParam param = SearchParam.newBuilder()
        .withCollectionName("collection1")
        .withMetricType(MetricType.IP)
        .withTopK(10)
        .withVectors(targetVectors)
        .withVectorFieldName("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .build();
R<SearchResults> response = client.search(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData());
System.out.println("Search results:");
for (int i = 0; i < targetVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = results.getIDScore(i);
    for (int j = 0; j < scores.size(); ++j) {
        SearchResultsWrapper.IDScore score = scores.get(j);
        System.out.println("Top " + j + " ID:" + score.getLongID() + " Distance:" + score.getScore());
    }
}
```