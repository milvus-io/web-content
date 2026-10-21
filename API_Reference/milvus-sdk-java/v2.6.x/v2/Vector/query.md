# query()

This operation conducts a scalar filtering with a specified boolean expression.

```java
public QueryResp query(QueryReq request)
```

## Request Syntax

```java
query(QueryReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .outputFields(List<String> outputFields)
    .ids(List<Object> ids)
    .filter(String filter)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .offset(long offset)
    .limit(long limit)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .queryParams(Map<String, Object> queryParams)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionNames(List<String> partitionNames)` -

    A list of partition names to target.

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `ids(List<Object> ids)` -

    A list of primary key values to identify specific entities.

- `filter(String filter)` -

    A boolean expression to filter results.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `offset(long offset)` -

    The number of results to skip before returning.

- `limit(long limit)` -

    The maximum number of results to return.

- `ignoreGrowing(boolean ignoreGrowing)` -

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)` -

    The timezone string for time-related filters.

- `queryParams(Map<String, Object> queryParams)` -

    Additional query parameters as key-value pairs. Defaults to `new HashMap<>()`.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

**RETURN TYPE:**

*QueryResp*

**RETURNS:**

A **QueryResp** object that contains query rows with the specified output fields. The object exposes the following getters:

- `getQueryResults()` (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The field values of the result row.

- `getSessionTs()` (*long*) -

    The session timestamp used for the query.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field with dimension 2
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert data
List<JsonObject> rows = new ArrayList<>();
for (long id = 0; id < 10; id++) {
    JsonObject row = new JsonObject();
    row.addProperty("id", id);
    row.add("vector", new Gson().toJsonTree(new float[]{id * 0.1f, id * 0.2f}));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName("test")
        .data(rows)
        .build());

// 4. Load the collection
client.loadCollection(LoadCollectionReq.builder().collectionName("test").build());

// 5. Query by filter "id < 10"
QueryReq queryReq = QueryReq.builder()
        .collectionName("test")
        .filter("id < 10")
        .build();
QueryResp queryResp = client.query(queryReq);
for (QueryResp.QueryResult result : queryResp.getQueryResults()) {
    System.out.println(result.getEntity());
}
```
