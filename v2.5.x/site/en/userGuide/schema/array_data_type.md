---
id: array_data_type.md
title: Array Field​​
summary: The Array type is used to store fields containing multiple values of the same data type. It provides a flexible way to store attributes with multiple elements, making it especially useful in scenarios where a set of related data needs to be saved. In Milvus, you can store Array fields alongside vector data, enabling more complex query and filtering requirements.​
---

# Array Field​

The Array type is used to store fields containing multiple values of the same data type. It provides a flexible way to store attributes with multiple elements, making it especially useful in scenarios where a set of related data needs to be saved. In Milvus, you can store Array fields alongside vector data, enabling more complex query and filtering requirements.​

For example, in a music recommendation system, an Array field can store a list of tags for a song; in user behavior analysis, it can store user ratings for songs. Below is an example of a typical Array field:​

```JSON
{​
  "tags": ["pop", "rock", "classic"],​
  "ratings": [5, 4, 3]​
}​

```

In this example, `tags` and `ratings` are both Array fields. The `tags` field is a string array representing song genres like pop, rock, and classic, while the `ratings` field is an integer array representing user ratings for the song, ranging from 1 to 5. These Array fields provide a flexible way to store multi-value data, making it easier to perform detailed analysis during queries and filtering.​

## Add Array field​

To use Array fields in Milvus, define the relevant field type when creating the collection schema. This process includes:​

1. Setting `datatype` to the supported Array data type, `ARRAY`.​

2. Using the `element_type` parameter to specify the data type of elements in the array. This can be any scalar data type supported by Milvus, such as `VARCHAR` or `INT64`. All elements in the same Array must be of the same data type.​

3. Using the `max_capacity` parameter to define the maximum capacity of the array, i.e., the maximum number of elements it can contain.​

Here’s how to define a collection schema that includes Array fields:​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType​
​
client = MilvusClient(uri="http://localhost:19530")​
​
schema = client.create_schema(​
    auto_id=False,​
    enable_dynamic_fields=True,​
)​
​
# Add an Array field with elements of type VARCHAR​
schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10)​
# Add an Array field with elements of type INT64​
schema.add_field(field_name="ratings", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5)​
​
# Add primary field​
schema.add_field(field_name="pk", datatype=DataType.INT64, is_primary=True)​
​
# Add vector field​
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=3)​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.common.DataType;​
import io.milvus.v2.service.collection.request.AddFieldReq;​
import io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .build());​
        ​
CreateCollectionReq.CollectionSchema schema = client.createSchema();​
schema.setEnableDynamicField(true);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName("tags")​
        .dataType(DataType.Array)​
        .elementType(DataType.VarChar)​
        .maxCapacity(10)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName("ratings")​
        .dataType(DataType.Array)​
        .elementType(DataType.Int64)​
        .maxCapacity(5)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName("pk")​
        .dataType(DataType.Int64)​
        .isPrimaryKey(true)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName("embedding")​
        .dataType(DataType.FloatVector)​
        .dimension(3)​
        .build());​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
const schema = [​
  {​
    name: "tags",​
    data_type: DataType.Array,​
    element_type: DataType.VarChar,​
    max_capacity: 10,​
    max_length: 65535​
  },​
  {​
    name: "rating",​
    data_type: DataType.Array,​
    element_type: DataType.Int64,​
    max_capacity: 5,​
  },​
  {​
    name: "pk",​
    data_type: DataType.Int64,​
    is_primary_key: true,​
  },​
  {​
    name: "embedding",​
    data_type: DataType.FloatVector,​
    dim: 3,​
  },​
];​

```

```curl
export arrayField1='{​
    "fieldName": "tags",​
    "dataType": "Array",​
    "elementDataType": "VarChar",​
    "elementTypeParams": {​
        "max_capacity": 10,​
        "max_length": 100​
    }​
}'​
​
export arrayField2='{​
    "fieldName": "ratings",​
    "dataType": "Array",​
    "elementDataType": "Int64",​
    "elementTypeParams": {​
        "max_capacity": 5​
    }​
}'​
​
export pkField='{​
    "fieldName": "pk",​
    "dataType": "Int64",​
    "isPrimary": true​
}'​
​
export vectorField='{​
    "fieldName": "embedding",​
    "dataType": "FloatVector",​
    "elementTypeParams": {​
        "dim": 3​
    }​
}'​
​
export schema="{​
    \"autoID\": false,​
    \"fields\": [​
        $arrayField1,​
        $arrayField2,​
        $pkField,​
        $vectorField​
    ]​
}"​

```

In this example:​

- `tags` is a string array with `element_type` set to `VARCHAR`, indicating that elements in the array must be strings. `max_capacity` is set to 10, meaning the array can contain up to 10 elements.​

- `ratings` is an integer array with `element_type` set to `INT64`, indicating that elements must be integers. `max_capacity` is set to 5, allowing up to 5 ratings.​

- We also add a primary key field `pk` and a vector field `embedding`.​

<div class="alert note">

The primary field and vector field are mandatory when you create a collection. The primary field uniquely identifies each entity, while the vector field is crucial for similarity search. For more details, refer to [​Primary Field & AutoID](primary-field.md), [​Dense Vector](dense-vector.md), [​Binary Vector](binary-vector.md), or [​Sparse Vector](sparse_vector.md).​

</div>

## Set index params​

Setting index parameters for Array fields is optional but can significantly improve retrieval efficiency.​

In the following example, we create an `AUTOINDEX` for the `tags` field, which means Milvus will automatically create an appropriate scalar index based on the data type.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# Prepare index parameters​
index_params = client.prepare_index_params()  # Prepare IndexParams object​
​
index_params.add_index(​
    field_name="tags",  # Name of the Array field to index​
    index_type="AUTOINDEX",  # Index type​
    index_name="inverted_index"  # Index name​
)​

```

```java
import io.milvus.v2.common.IndexParam;​
import java.util.*;​
​
List<IndexParam> indexes = new ArrayList<>();​
indexes.add(IndexParam.builder()​
        .fieldName("tags")​
        .indexName("inverted_index")​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​

```

```javascript
const indexParams = [{​
    index_name: 'inverted_index',​
    field_name: 'tags',​
    index_type: IndexType.AUTOINDEX,​
)];​

```

```curl
export indexParams='[​
        {​
            "fieldName": "tags",​
            "indexName": "inverted_index",​
            "indexType": "AUTOINDEX"​
        }​
    ]'​

```

In addition to `AUTOINDEX`, you can specify other scalar index types like `INVERTED` or `BITMAP`. For supported index types, refer to [​Scalar Indexes](index-scalar-fields.md).​

Moreover, you must create an index for the vector field before creating the collection. In this example, we use `AUTOINDEX` to simplify vector index setup.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
# Add vector index​
index_params.add_index(​
    field_name="embedding",​
    index_type="AUTOINDEX",  # Use automatic indexing to simplify complex index settings​
    metric_type="COSINE"  # Specify similarity metric type, such as L2, COSINE, or IP​
)​

```

```java
indexes.add(IndexParam.builder()​
        .fieldName("embedding")​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

```

```javascript
 indexParams.push({​
    index_name: 'embedding_index',​
    field_name: 'embedding',​
    index_type: IndexType.AUTOINDEX,​
});​

```

```curl
export indexParams='[​
        {​
            "fieldName": "tags",​
            "indexName": "inverted_index",​
            "indexType": "AUTOINDEX"​
        },​
        {​
            "fieldName": "embedding",​
            "metricType": "COSINE",​
            "indexType": "AUTOINDEX"​
        }​
    ]'​

```

## Create collection​

Use the defined schema and index parameters to create a collection:​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
client.create_collection(​
    collection_name="my_array_collection",​
    schema=schema,​
    index_params=index_params​
)​

```

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()​
        .collectionName("my_array_collection")​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

```

```javascript
client.create_collection({​
    collection_name: "my_array_collection",​
    schema: schema,​
    index_params: indexParams​
})​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d "{​
    \"collectionName\": \"my_array_collection\",​
    \"schema\": $schema,​
    \"indexParams\": $indexParams​
}"​

```

## Insert data​

After creating the collection, you can insert data that includes Array fields.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
data = [​
    {​
        "tags": ["pop", "rock", "classic"],​
        "ratings": [5, 4, 3],​
        "pk": 1,​
        "embedding": [0.12, 0.34, 0.56]​
    },​
    {​
        "tags": ["jazz", "blues"],​
        "ratings": [4, 5],​
        "pk": 2,​
        "embedding": [0.78, 0.91, 0.23]​
    },​
    {​
        "tags": ["electronic", "dance"],​
        "ratings": [3, 3, 4],​
        "pk": 3,​
        "embedding": [0.67, 0.45, 0.89]​
    }​
]​
​
client.insert(​
    collection_name="my_array_collection",​
    data=data​
)​

```

```java
import com.google.gson.Gson;​
import com.google.gson.JsonObject;​
​
import io.milvus.v2.service.vector.request.InsertReq;​
import io.milvus.v2.service.vector.response.InsertResp;​
​
List<JsonObject> rows = new ArrayList<>();​
Gson gson = new Gson();​
rows.add(gson.fromJson("{\"tags\": [\"pop\", \"rock\", \"classic\"], \"ratings\": [5, 4, 3], \"pk\": 1, \"embedding\": [0.1, 0.2, 0.3]}", JsonObject.class));​
rows.add(gson.fromJson("{\"tags\": [\"jazz\", \"blues\"], \"ratings\": [4, 5], \"pk\": 2, \"embedding\": [0.4, 0.5, 0.6]}", JsonObject.class));​
rows.add(gson.fromJson("{\"tags\": [\"electronic\", \"dance\"], \"ratings\": [3, 3, 4], \"pk\": 3, \"embedding\": [0.7, 0.8, 0.9]}", JsonObject.class));​
​
InsertResp insertR = client.insert(InsertReq.builder()​
        .collectionName("my_array_collection")​
        .data(rows)​
        .build());​

```

```javascript
const data = [​
    {​
        "tags": ["pop", "rock", "classic"],​
        "ratings": [5, 4, 3],​
        "pk": 1,​
        "embedding": [0.12, 0.34, 0.56]​
    },​
    {​
        "tags": ["jazz", "blues"],​
        "ratings": [4, 5],​
        "pk": 2,​
        "embedding": [0.78, 0.91, 0.23]​
    },​
    {​
        "tags": ["electronic", "dance"],​
        "ratings": [3, 3, 4],​
        "pk": 3,​
        "embedding": [0.67, 0.45, 0.89]​
    }​
];​
​
client.insert({​
  collection_name: "my_array_collection",​
  data: data,​
});​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "data": [​
        {​
        "tags": ["pop", "rock", "classic"],​
        "ratings": [5, 4, 3],​
        "pk": 1,​
        "embedding": [0.12, 0.34, 0.56]​
    },​
    {​
        "tags": ["jazz", "blues"],​
        "ratings": [4, 5],​
        "pk": 2,​
        "embedding": [0.78, 0.91, 0.23]​
    },​
    {​
        "tags": ["electronic", "dance"],​
        "ratings": [3, 3, 4],​
        "pk": 3,​
        "embedding": [0.67, 0.45, 0.89]​
    }       ​
    ],​
    "collectionName": "my_array_collection"​
}'​

```

In this example:​

- Each data entry includes a primary field (`pk`), while `tags` and `ratings` are Array fields used to store tags and ratings.​

- `embedding` is a 3-dimensional vector field used for vector similarity searches.​

## Search and query​

Array fields enable scalar filtering during searches, enhancing Milvus's vector search capabilities. You can query based on the properties of Array fields alongside vector similarity searches.​

### Filter queries​

You can filter data based on properties of Array fields, such as accessing a specific element or checking if an array element meets a certain condition.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
filter = 'ratings[0] < 4'​
​
res = client.query(​
    collection_name="my_array_collection",​
    filter=filter,​
    output_fields=["tags", "ratings", "embedding"]​
)​
​
print(res)​
​
# Output​
# data: ["{'pk': 3, 'tags': ['electronic', 'dance'], 'ratings': [3, 3, 4], 'embedding': [np.float32(0.67), np.float32(0.45), np.float32(0.89)]}"] ​

```

```java
import io.milvus.v2.service.vector.request.QueryReq;​
import io.milvus.v2.service.vector.response.QueryResp;​
​
String filter = "ratings[0] < 4";​
QueryResp resp = client.query(QueryReq.builder()​
        .collectionName("my_array_collection")​
        .filter(filter)​
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))​
        .build());​
​
System.out.println(resp.getQueryResults());​
​
// Output​
//​
// [QueryResp.QueryResult(entity={ratings=[3, 3, 4], pk=3, embedding=[0.7, 0.8, 0.9], tags=[electronic, dance]})]​

```

```javascript
client.query({​
    collection_name: 'my_array_collection',​
    filter: 'ratings[0] < 4',​
    output_fields: ['tags', 'ratings', 'embedding']​
});​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_array_collection",​
    "filter": "ratings[0] < 4",​
    "outputFields": ["tags", "ratings", "embedding"]​
}'​
# {"code":0,"cost":0,"data":[{"embedding":[0.67,0.45,0.89],"pk":3,"ratings":{"Data":{"LongData":{"data":[3,3,4]}}},"tags":{"Data":{"StringData":{"data":["electronic","dance"]}}}}]}​

```

In this query, Milvus filters out entities where the first element of the `ratings` array is less than 4, returning entities that match the condition.​

### Vector search with Array filtering​

By combining vector similarity with Array filtering, you can ensure that the retrieved data is not only similar in semantics but also meets specific conditions, making the search results more accurate and aligned with business needs.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
filter = 'tags[0] == "pop"'​
​
res = client.search(​
    collection_name="my_array_collection",​
    data=[[0.3, -0.6, 0.1]],​
    limit=5,​
    search_params={"params": {"nprobe": 10}},​
    output_fields=["tags", "ratings", "embedding"],​
    filter=filter​
)​
​
print(res)​
​
# Output​
# data: ["[{'id': 1, 'distance': 1.1276001930236816, 'entity': {'ratings': [5, 4, 3], 'embedding': [0.11999999731779099, 0.3400000035762787, 0.5600000023841858], 'tags': ['pop', 'rock', 'classic']}}]"]​

```

```java
import io.milvus.v2.service.vector.request.SearchReq;​
import io.milvus.v2.service.vector.response.SearchResp;​
​
String filter = "tags[0] == \"pop\"";​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName("my_array_collection")​
        .annsField("embedding")​
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))​
        .topK(5)​
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))​
        .filter(filter)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={ratings=[5, 4, 3], embedding=[0.1, 0.2, 0.3], tags=[pop, rock, classic]}, score=-0.2364331, id=1)]]​

```

```javascript
client.search({​
    collection_name: 'my_array_collection',​
    data: [0.3, -0.6, 0.1],​
    limit: 5,​
    output_fields: ['tags', 'ratings', 'embdding'],​
    filter: 'tags[0] == "pop"'​
});​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_array_collection",​
    "data": [​
        [0.3, -0.6, 0.1]​
    ],​
    "annsField": "embedding",​
    "limit": 5,​
    "filter": "tags[0] == \"pop\"",​
    "outputFields": ["tags", "ratings", "embedding"]​
}'​
​
# {"code":0,"cost":0,"data":[{"distance":-0.24793813,"embedding":[0.12,0.34,0.56],"id":1,"ratings":{"Data":{"LongData":{"data":[5,4,3]}}},"tags":{"Data":{"StringData":{"data":["pop","rock","classic"]}}}}]}​

```

In this example, Milvus returns the top 5 entities most similar to the query vector, with the `tags` array's first element being `"pop"`.​

Additionally, Milvus supports advanced Array filtering operators like `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH` to further enhance query capabilities. For more details, refer to [​Metadata Filtering](boolean.md).​

## Limits​

- **Data Type**: All elements in an Array field must have the same data type, as specified by the `element_type`.​

- **Array Capacity**: The number of elements in an Array field must be less than or equal to the maximum capacity defined when the Array was created, as specified by `max_capacity`.​

- **String Handling**: String values in Array fields are stored as-is, without semantic escaping or conversion. For example, `'a"b'`, `"a'b"`, `'a\'b'`, and `"a\"b"` are stored as entered, while `'a'b'` and `"a"b"` are considered invalid values.​

