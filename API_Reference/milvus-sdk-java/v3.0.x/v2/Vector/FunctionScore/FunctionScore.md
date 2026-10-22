# FunctionScore

A `FunctionScore` instance is a list of `Function` instances used as rerankers.

```java
io.milvus.v2.service.vector.request.FunctionScore
```

## Constructor

This constructor initializes a new `FunctionScore` instance that comprises one or more rankers.

```java
FunctionScore.builder()
    .functions(List<CreateCollectionReq.Function> functions)
    .params(Map<String, String> params)
    .build()
```

**BUILDER METHODS:**

- `functions(List<CreateCollectionReq.Function> functions)`

    A list of `Function` instances. See [Function](../../Collections/Function/Function.md).

- `params(Map<String, String> params)`

    Extra parameters for how the specified functions work together. For a Boost ranker, you can set the following parameters:

    - `boost_mode` (String)

        Specifies how the specified weights influence the scores of any matching entities. Possible values are:

        - `Multiple`

            Indicates that the weighted value is equal to the original score of a matching entity multiplied by the specified weight.

            This is the default value.

        - `Sum`

            Indicates that the weighted value is equal to the sum of the original score of a matching entity and the specified weight

    - `function_mode` (String)

        Specifies how the weighted values from various Boost Rankers are processed. Possible values are:

        - `Multiplify`

            Indicates that the final score of a matching entity is equal to the product of the weighted values from all Boost Rankers.

            This is the default value.

        - `Sum`

            Indicates that the final score of a matching entity is equal to the sum of the weighted values from all Boost Rankers.

**RETURN TYPE:**

*FunctionScore*

**RETURNS:**

A **FunctionScore** instance.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.FunctionScore;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import com.google.gson.JsonObject;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field, a "vector" field, and a "doctype" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("doctype").dataType(DataType.VarChar).maxLength(64).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert a row and load the collection
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new com.google.gson.Gson().toJsonTree(new float[]{-0.619954f, 0.447943f, -0.174938f, -0.424803f, -0.864845f}));
row.addProperty("doctype", "abstract");
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Build a boost rerank function
CreateCollectionReq.Function ranker = CreateCollectionReq.Function.builder()
                 .functionType(FunctionType.RERANK)
                 .name("boost")
                 .param("reranker", "boost")
                 .param("filter", "doctype == \"abstract\"")
                 .param("weight", "0.5")
                 .param("random_score", "{\"seed\": 126, \"field\": \"id\"}")
                 .build();
                 
// 5. Search with FunctionScore for reranking
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new FloatVec(new float[]{-0.619954f, 0.447943f, -0.174938f, -0.424803f, -0.864845f})))
        .annsField("vector")
        .outputFields(Collections.singletonList("doctype"))
        .limit(10)
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .build());
```
