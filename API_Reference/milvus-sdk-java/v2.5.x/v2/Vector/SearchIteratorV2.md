# SearchIteratorV2()

This operation creates an iterator for you to iterate over the search results. It is useful, especially when the search result contains a large volume of data.

```java
public SearchIteratorV2 searchIteratorV2(SearchIteratorReqV2 request)
```

## Request Syntax

```java
searchIteratorV2(SearchIteratorReqV2.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .metricType(IndexParam.MetricType)
    .vectorFieldName(String vectorFieldName)
    .topK(int topK)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .vectors(List<BaseVector> vectors)
    .roundDecimal(int roundDecimal)
    .searchParams(Map<String, Object> searchParams)
    .consistencyLevel(ConsistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .groupByFieldName(String groupbyFieldName)
    .batchSize(long batchSize)
    .externalFilterFunc(Function<List<SearchResp.SearchResult>, List<SearchResp.SearchResult>> externalFilterFunc)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database to which the collection belongs. You can ignore it if the database is the default.

- `collectionName(String collectionName)`

    The name of an existing collection.

- `partitionNames(List<String> partitionNames)`

    A list of target partition names. The search scope is limited to the designated partitions if specified.

- `metricType(IndexParam.MetricType)`

    The metric type used during the vector search. For more information, refer to [Metric Types](https://milvus.io/docs/metric.md).

- `vectorFieldName(String vectorFieldName)`

    The name of the target vector field.

- `topK(int topk)`

    The top-K value, which indicates the number of entities to return.

- `filter(String filter)`

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Filtering](https://milvus.io/docs/boolean.md). 

- `outputFields(List<String> outputFields)`

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, all fields in the collection are selected as the output fields.

- `vectors(List<BaseVector> vectors)`

    Set the target vectors to do ANN search.

    BaseVector is a base class for abstract vector classes. The following classes are derived from BaseVector. Choose the correct class as input according to DataType of the vector field.

    <table>
       <tr>
         <th><p><strong>Class Name</strong></p></th>
         <th><p><strong>Constructors</strong></p></th>
         <th><p><strong>Description</strong></p></th>
       </tr>
       <tr>
         <td><p>FloatVec</p></td>
         <td><p>FloatVec(List\<Float> data) FloatVec(float[] data)</p></td>
         <td><p>For DataType.FloatVector type field.</p></td>
       </tr>
       <tr>
         <td><p>BinaryVec</p></td>
         <td><p>BinaryVec(ByteBuffer data) BinaryVec(byte[] data)</p></td>
         <td><p>For DataType.BinaryVector type field.</p></td>
       </tr>
       <tr>
         <td><p>Float16Vec</p></td>
         <td><p>Float16Vec(ByteBuffer data) Float16Vec(byte[] data) Float16Vec(List\<Float> data)</p></td>
         <td><p>For DataType.Float16Vector type field.</p></td>
       </tr>
       <tr>
         <td><p>BFloat16Vec</p></td>
         <td><p>BFloat16Vec(ByteBuffer data) BFloat16Vec(byte[] data) BFloat16Vec(List\<Float> data)</p></td>
         <td><p>For DataType.BFloat16Vector type field.</p></td>
       </tr>
       <tr>
         <td><p>SparseFloatVec</p></td>
         <td><p>SparseFloatVec(SortedMap\<Long, Float> data)</p></td>
         <td><p>For DataType.SparseFloatVector type field.</p></td>
       </tr>
    </table>

- `roundDecimal(int decimal)`

How many digits are reserved after the decimal point.

- `searchParams(Map<String, Object> searchParams)`

A JSON format string for extra serach parameters.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level of the target collection.

    The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- `ignoreGrowing(boolean ignoreGrwing)`

Ignore growing segments or not.

- `groupByFieldName(String fieldName)`

Sets the field name to do grouping for results.

- `batchSize(long size)`

A value to define the number of entities returned per batch.

- `externalFilterFunc(Function<List<SearchResp.SearchResult>, List<SearchResp.SearchResult>> externalFilterFunc)`

    A list of external filter functions, used to further filter the search results.

**RETURN TYPE:**

*SearchIteratorV2*

**RETURNS:**

A *SearchIteratorV2* object to iterate search results, which offers the following methods:

- `List<QueryResultsWrapper.RowRecord> next()`

    Returns a batch of results.

- `close()`

    Releases the cache results.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.SearchIteratorV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchIteratorReqV2;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

import java.util.*;
import java.util.function.Function;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Prepare inputs
List<Float> vector = generateFloatVector();

Map<String,Object> extraParams = new HashMap<>();
extraParams.put("radius",15.0);

Function<List<SearchResp.SearchResult>, List<SearchResp.SearchResult>> externalFilterFunc = (List<SearchResp.SearchResult> src)->{
    List<SearchResp.SearchResult> newRes = new ArrayList<>();
    for (SearchResp.SearchResult res : src) {
        long id = (long)res.getId();
        if (id%2 == 0) {
            newRes.add(res);
        }
    }
    return newRes;
};

// 3. Iterator search
SearchIteratorV2 searchIterator = client.searchIteratorV2(SearchIteratorReqV2.builder()
        .collectionName("test")
        .outputFields(Lists.newArrayList("vector"))
        .batchSize(50L)
        .vectorFieldName("vector")
        .vectors(Collections.singletonList(new FloatVec(vector)))
        .filter("id > 100")
        .searchParams(extraParams)
        .topK(300)
        .metricType(IndexParam.MetricType.L2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .externalFilterFunc(externalFilterFunc)
        .build());

System.out.println("SearchIteratorV2 results:");
while (true) {
    List<SearchResp.SearchResult> res = searchIterator.next();
    if (res.isEmpty()) {
        System.out.println("Search iteration finished, close");
        searchIterator.close();
        break;
    }

    for (SearchResp.SearchResult record : res) {
        System.out.println(record);
    }
}
```
