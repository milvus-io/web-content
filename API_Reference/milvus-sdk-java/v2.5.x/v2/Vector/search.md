# search()

This operation conducts a vector similarity search with an optional scalar filtering expression.

```java
public SearchResp search(SearchReq request)
```

## Request Syntax

```java
search(SearchReq.builder()
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .annsField(String annsField)
    .topK(int topK)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .data(List<BaseVector> data)
    .offset(long offset)
    .limit(long limit)
    .roundDecimal(int roundDecimal)
    .searchParams(String searchParams)
    .guaranteeTimestamp(long guaranteeTimestamp)
    .gracefulTime(long gracefulTime)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .groupByFieldName(String fieldName)
    .groupSize(Integer groupSize)
    .strictGroupSize(Boolean strictGroupSize)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of an existing collection.

- `partitionNames(List<String> partitionNames)`

    A list of partition names.

- `annsField(String annsField)`

    The name of the vector field, used when there is more than one vector field. If only one vector field exists, we will use it directly.

- `topK(int topK)`

    The number of records to return in the search result. This parameter uses the same syntax as the `limit` parameter, so you should only set one of them.

    You can use this parameter in combination with `offset` to enable pagination.

    The sum of this value and `offset` should be less than 16,384. 

- `filter(String filter)`

    A scalar filtering condition to filter matching entities. 

    You can set this parameter to an empty string to skip scalar filtering. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md). 

- `outputFields(List<String> outputFields)`

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, all fields are selected as the output fields.

- `data(List<BaseVector> data)`

    A list of vector embeddings.

    Milvus searches for the most similar vector embeddings to the specified ones.

    BaseVector is a base class for abstract vector classes. The following classes are derived from BaseVector. Choose the correct class as input according to DataType of the vector field.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>In Java SDK v2.3.7 or earlier versions, this method is named <code>distance</code>. Since Java SDK v2.3.8, this method is renamed as <code>score</code>.</p>

    </div>

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
    </table>

- `offset(long offset)`

    The number of records to skip in the query result. 

    You can use this parameter in combination with `limit` to enable pagination.

    The sum of this value and `limit` should be less than 16,384. 

- `limit(long limit)`

    The number of records to return in the search result. This parameter uses the same syntax as the `topK` parameter, so you should only set one of them.

    You can use this parameter in combination with `offset` to enable pagination.

    The sum of this value and `offset` should be less than 16,384. 

    In a grouping search, however, `limit` specifies the maximum number of groups to return, rather than individual entities. Each group is formed based on the specified `groupByFieldName`.

- `roundDecimal(int roundDecimal)`

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to **-1**, indicating that Milvus skips rounding the calculated distances and returns the raw value.

- `searchParams(Map<String,Object> searchParams)`

    The parameter settings specific to this operation.

    - **metric_type** (String)

        The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. 

        Possible values are **L2**, **IP**, and **COSINE**.

    - **radius** (float)

        Determines the threshold of least similarity. When setting `metric_type` to `L2`, ensure that this value is greater than that of **range_filter**. Otherwise, this value should be lower than that of **range_filter**. 

    - **range_filter** (float)

        Refines the search to vectors within a specific similarity range. When setting `metric_type` to `IP` or `COSINE`, ensure that this value is greater than that of **radius**. Otherwise, this value should be lower than that of **radius**.

    For details on other applicable search parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- `guaranteeTimestamp(long guaranteeTimestamp)`

    A valid timestamp. 

    If this parameter is set, MilvusZilliz Cloud executes the query only if all entities inserted before this timestamp are visible to query nodes. 

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>This parameter is valid when the default consistency level applies.</p>

    </div>

- `gracefulTime(long gracefulTime)`

    A period of time in ms.

    The value defaults to **5000L**. If this parameter is set, MilvusZilliz Cloud calculates the guarantee timestamp by subtracting this from the current timestamp.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>This parameter is valid when a consistency level other than the default one applies.</p>

    </div>

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level of the target collection.

    The value defaults to the one specified when you create the current collection, with options of **Strong** (**0**), **Bounded** (**1**), **Session** (**2**), and **Eventually** (**3**).

    <div class="admonition note">

    <p><b>what is the consistency level?</b></p>

    <p>Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time.</p>
    <p>Milvus supports four consistency levels: <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong>, and <strong>Eventually</strong>. The default consistency level in Milvus is <strong>Bounded Staleness</strong>.</p>
    <p>You can easily tune the consistency level when conducting a vector similarity search or query to make it best suit your application.</p>

    </div>

- `ignoreGrowing(boolean ignoreGrowing)`

    Whether to ignore growing segments during similarity searches.

- `groupByFieldName(String fieldName)`

    Groups search results by a specified field to ensure diversity and avoid returning multiple results from the same group.

- `groupSize(Integer groupSize)`

    The target number of entities to return within each group in a grouping search. For example, setting `groupSize=2` instructs the system to return up to 2 of the most similar entities (e.g., document passages or vector representations) within each group. Without setting `groupSize`, the system defaults to returning only 1 entity per group.

- `strictGroupSize(Boolean strictGroupSize)`

    This Boolean parameter dictates whether `groupSize` should be strictly enforced. When `strictGroupSize=True`, the system will attempt to fill each group with exactly `groupSize` results, as long as sufficient data exists within each group. If there is an insufficient number of entities in a group, it will return only the available entities, ensuring that groups with adequate data meet the specified `groupSize`.

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp object representing specific search results with the specified output fields and relevance score.

**PARAMETERS:**

- searchResults(List\<List\<SearchResult\>>)

      A list of SearchResp.SearchResult, the size of searchResults equals the number of query vectors of the search. Each List\<SearchResult\> is a topK result of a query vector. Each SearchResult represents an entity hit by the search.

      Member of SearchResult:

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Search
SearchResp searchR = client.search(SearchReq.builder()
        .collectionName(collectionName)
        .data(Collections.singletonList(new FloatVec(new float[]{1.0f, 2.0f})))
        .filter("id < 100")
        .topK(10)
        .outputFields(Collections.singletonList("*"))
        .build());
        
List<List<SearchResp.SearchResult>> searchResults = searchR.getSearchResults();
System.out.println("\nSearch results:");
for (List<SearchResp.SearchResult> results : searchResults) {
    for (SearchResp.SearchResult result : results) {
        System.out.printf("ID: %d, Score: %f, %s\n", (long)result.getId(), result.getScore(), result.getEntity().toString());
    }
}
```

