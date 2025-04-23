---
id: sparse_vector.md
title: "Sparse Vector"
summary: "Sparse vectors are an important method of data representation in information retrieval and natural language processing. While dense vectors are popular for their excellent semantic understanding capabilities, sparse vectors often provide more accurate results when it comes to applications that require precise matching of keywords or phrases."
---

# Sparse Vector

Sparse vectors are an important method of data representation in information retrieval and natural language processing. While dense vectors are popular for their excellent semantic understanding capabilities, sparse vectors often provide more accurate results when it comes to applications that require precise matching of keywords or phrases.

## Overview

A sparse vector is a special representation of high-dimensional vectors where most elements are zero, and only a few dimensions have non-zero values. This characteristic makes sparse vectors particularly effective in handling large-scale, high-dimensional, but sparse data. Common applications include:

- **Text Analysis:** Representing documents as bag-of-words vectors, where each dimension corresponds to a word, and only words that appear in the document have non-zero values.

- **Recommendation Systems:** User-item interaction matrices, where each dimension represents a user's rating for a particular item, with most users interacting with only a few items.

- **Image Processing:** Local feature representation, focusing only on key points in the image, resulting in high-dimensional sparse vectors.

As shown in the diagram below, dense vectors are typically represented as continuous arrays where each position has a value (e.g., `[0.3, 0.8, 0.2, 0.3, 0.1]`). In contrast, sparse vectors store only non-zero elements and their indices, often represented as key-value pairs (e.g., `[{2: 0.2}, ..., {9997: 0.5}, {9999: 0.7}]`). This representation significantly reduces storage space and increases computational efficiency, especially when dealing with extremely high-dimensional data (e.g., 10,000 dimensions).

![Sparse Vector](../../../../assets/sparse-vector.png)

Sparse vectors can be generated using various methods, such as [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) (Term Frequency-Inverse Document Frequency) and [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) in text processing. Additionally, Milvus offers convenient methods to help generate and process sparse vectors. For details, refer to Embeddings.

For text data, Milvus also provides full-text search capabilities, allowing you to perform vector searches directly on raw text data without using external embedding models to generate sparse vectors. For more information, refer to [Full Text Search](full-text-search.md).

After vectorization, the data can be stored in Milvus for management and vector retrieval. The diagram below illustrates the basic process.

![Use Sparse Vector](../../../../assets/use-sparse-vector.png)

<div class="alert note">

In addition to sparse vectors, Milvus also supports dense vectors and binary vectors. Dense vectors are ideal for capturing deep semantic relationships, while binary vectors excel in scenarios like quick similarity comparisons and content deduplication. For more information, refer to [Dense Vector](dense-vector.md) and [Binary Vector](binary-vector.md).

</div>

## Use sparse vectors

Milvus supports representing sparse vectors in any of the following formats:

- **Sparse Matrix (using the `scipy.sparse` class)**

    ```python
    from scipy.sparse import csr_matrix
    
    # Create a sparse matrix
    row = [0, 0, 1, 2, 2, 2]
    col = [0, 2, 2, 0, 1, 2]
    data = [1, 2, 3, 4, 5, 6]
    sparse_matrix = csr_matrix((data, (row, col)), shape=(3, 3))
    
    # Represent sparse vector using the sparse matrix
    sparse_vector = sparse_matrix.getrow(0)
    ```

- **List of Dictionaries (formatted as `{dimension_index: value, ...}`)**

    <div class="multipleCode">
        <a href="#python">Python</a>
        <a href="#java">Java</a>
    </div>

    ```python
    # Represent sparse vector using a dictionary
    sparse_vector = [{1: 0.5, 100: 0.3, 500: 0.8, 1024: 0.2, 5000: 0.6}]
    ```

    ```java
    SortedMap<Long, Float> sparseVector = new TreeMap<>();
    sparseVector.put(1L, 0.5f);
    sparseVector.put(100L, 0.3f);
    sparseVector.put(500L, 0.8f);
    sparseVector.put(1024L, 0.2f);
    sparseVector.put(5000L, 0.6f);
    ```

- **List of Tuple Iterators (formatted as `[(dimension_index, value)]`)**

    ```python
    # Represent sparse vector using a list of tuples
    sparse_vector = [[(1, 0.5), (100, 0.3), (500, 0.8), (1024, 0.2), (5000, 0.6)]]
    ```

### Add vector field

To use sparse vectors in Milvus, define a field for storing sparse vectors when creating a collection. This process includes:

1. Setting `datatype` to the supported sparse vector data type, `SPARSE_FLOAT_VECTOR`.

1. No need to specify the dimension.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema(
    auto_id=True,
    enable_dynamic_fields=True,
)

schema.add_field(field_name="pk", datatype=DataType.VARCHAR, is_primary=True, max_length=100)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());
        
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);
schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(true)
        .maxLength(100)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .build());
```

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

const schema = [
  {
    name: "metadata",
    data_type: DataType.JSON,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "sparse_vector",
    data_type: DataType.SparseFloatVector,
  }
];

```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeVarChar).
    WithIsAutoID(true).
    WithIsPrimaryKey(true).
    WithMaxLength(100),
).WithField(entity.NewField().
    WithName("sparse_vector").
    WithDataType(entity.FieldTypeSparseVector),
)
```

```bash
export primaryField='{
    "fieldName": "pk",
    "dataType": "VarChar",
    "isPrimary": true,
    "elementTypeParams": {
        "max_length": 100
    }
}'

export vectorField='{
    "fieldName": "sparse_vector",
    "dataType": "SparseFloatVector"
}'

export schema="{
    \"autoID\": true,
    \"fields\": [
        $primaryField,
        $vectorField
    ]
}"
```

In this example, a vector field named `sparse_vector` is added for storing sparse vectors. The data type of this field is `SPARSE_FLOAT_VECTOR`.

### Set index params for vector field

The process of creating an index for sparse vectors is similar to that for [dense vectors](dense-vector.md), but with differences in the specified index type (`index_type`), distance metric (`metric_type`), and index parameters (`params`).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="sparse_vector",
    index_name="sparse_inverted_index",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="IP",
    params={"inverted_index_algo": "DAAT_MAXSCORE"}, # or "DAAT_WAND" or "TAAT_NAIVE"
)

```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();

Map<String,Object> extraParams = new HashMap<>();
extraParams.put("inverted_index_algo": "DAAT_MAXSCORE"); // Algorithm used for building and querying the index

indexes.add(IndexParam.builder()
        .fieldName("sparse_vector")

        .indexName("sparse_inverted_index")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)

        .metricType(IndexParam.MetricType.IP)

        .extraParams(extraParams)

        .build());
```

```javascript
const indexParams = await client.createIndex({
    field_name: 'sparse_vector',
    metric_type: MetricType.IP,

    index_name: 'sparse_inverted_index',
    index_type: IndexType.SPARSE_INVERTED_INDEX,
    params: {
      inverted_index_algo: 'DAAT_MAXSCORE', 
    },

});
```

```go
idx := index.NewSparseInvertedIndex(entity.IP, 0.2)
indexOption := milvusclient.NewCreateIndexOption("my_collection", "sparse_vector", idx)
```

```bash
export indexParams='[
        {
            "fieldName": "sparse_vector",
            "metricType": "IP",

            "indexName": "sparse_inverted_index",
            "indexType": "SPARSE_INVERTED_INDEX",
            "params":{"inverted_index_algo": "DAAT_MAXSCORE"}

        }
    ]'
```

In the example above:

- `index_type`: The type of index to create for the sparse vector field.

    - `SPARSE_INVERTED_INDEX`: A general-purpose inverted index for sparse vectors.

    <div class="alert note">
    
    From Milvus 2.5.4 onward, `SPARSE_WAND` is being deprecated. Instead, it is recommended to use `"inverted_index_algo": "DAAT_WAND"` for equivalency while maintaining compatibility.

    </div>

- `metric_type`: The metric used to calculate similarity between sparse vectors. Valid Values:

    - `IP` (Inner Product): Measures similarity using dot product.

    - `BM25`: Typically used for full-text search, focusing on textual similarity.

        For further details, refer to [Metric Types](metric.md) and [Full Text Search](full-text-search.md).

- `params.inverted_index_algo`: The algorithm used for building and querying the index. Valid values:

    - `"DAAT_MAXSCORE"` (default): Optimized Document-at-a-Time (DAAT) query processing using the MaxScore algorithm. MaxScore provides better performance for high *k* values or queries with many terms by skipping terms and documents likely to have minimal impact. It achieves this by partitioning terms into essential and non-essential groups based on their maximum impact scores, focusing on terms that can contribute to the top-k results.

    - `"DAAT_WAND"`: Optimized DAAT query processing using the WAND algorithm. WAND evaluates fewer hit documents by leveraging maximum impact scores to skip non-competitive documents, but it has a higher per-hit overhead. This makes WAND more efficient for queries with small *k* values or short queries, where skipping is more feasible.

    - `"TAAT_NAIVE"`: Basic Term-at-a-Time (TAAT) query processing. While it is slower compared to `DAAT_MAXSCORE` and `DAAT_WAND`, `TAAT_NAIVE` offers a unique advantage. Unlike DAAT algorithms, which use cached maximum impact scores that remain static regardless of changes to the global collection parameter (avgdl), `TAAT_NAIVE` dynamically adapts to such changes.

### Create collection

Once the sparse vector and index settings are complete, you can create a collection that contains sparse vectors. The example below uses the `create_collection` method to create a collection named `my_collection`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: 'http://localhost:19530'
});

await client.createCollection({
    collection_name: 'my_collection',
    schema: schema,
    index_params: indexParams
});
```

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

### Insert data

After creating the collection, insert data containing sparse vectors.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
sparse_vectors = [
    {"sparse_vector": {1: 0.5, 100: 0.3, 500: 0.8}},
    {"sparse_vector": {10: 0.1, 200: 0.7, 1000: 0.9}},
]

client.insert(
    collection_name="my_collection",
    data=sparse_vectors
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
{
    JsonObject row = new JsonObject();
    SortedMap<Long, Float> sparse = new TreeMap<>();
    sparse.put(1L, 0.5f);
    sparse.put(100L, 0.3f);
    sparse.put(500L, 0.8f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    rows.add(row);
}
{
    JsonObject row = new JsonObject();
    SortedMap<Long, Float> sparse = new TreeMap<>();
    sparse.put(10L, 0.1f);
    sparse.put(200L, 0.7f);
    sparse.put(1000L, 0.9f);
    row.add("sparse_vector", gson.toJsonTree(sparse));
    rows.add(row);
}

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```javascript
const data = [
  { sparse_vector: { "1": 0.5, "100": 0.3, "500": 0.8 } },
  { sparse_vector: { "10": 0.1, "200": 0.7, "1000": 0.9 } },
];
client.insert({
  collection_name: "my_collection",
  data: data,
});

```

```go
v := make([]entity.SparseEmbedding, 0, 2)
sparseVector1, _ := entity.NewSliceSparseEmbedding([]uint32{1, 100, 500}, []float32{0.5, 0.3, 0.8})
v = append(v, sparseVector1)
sparseVector2, _ := entity.NewSliceSparseEmbedding([]uint32{10, 200, 1000}, []float32{0.1, 0.7, 0.9})
v = append(v, sparseVector2)
column := column.NewColumnSparseVectors("sparse_vector", v)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithColumns(column))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"sparse_vector": {"1": 0.5, "100": 0.3, "500": 0.8}},
        {"sparse_vector": {"10": 0.1, "200": 0.7, "1000": 0.9}}        
    ],
    "collectionName": "my_collection"
}'

## {"code":0,"cost":0,"data":{"insertCount":2,"insertIds":["453577185629572534","453577185629572535"]}}
```

### Perform similarity search

To perform similarity search using sparse vectors, prepare the query vector and search parameters.

```python
# Prepare search parameters
search_params = {
    "params": {"drop_ratio_search": 0.2},  # A tunable drop ratio parameter with a valid range between 0 and 1
}

# Prepare the query vector
query_vector = [{1: 0.2, 50: 0.4, 1000: 0.7}]
```

In this example, `drop_ratio_search` is an optional parameter specifically for sparse vectors, allowing fine-tuning of small values in the query vector during the search. For example, with `{"drop_ratio_search": 0.2}`, the smallest 20% of values in the query vector will be ignored during the search.

Then, execute the similarity search using the `search` method:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    data=query_vector,
    limit=3,
    output_fields=["pk"],
    search_params=search_params,
)

print(res)

# Output
# data: ["[{'id': '453718927992172266', 'distance': 0.6299999952316284, 'entity': {'pk': '453718927992172266'}}, {'id': '453718927992172265', 'distance': 0.10000000149011612, 'entity': {'pk': '453718927992172265'}}]"]
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

Map<String,Object> searchParams = new HashMap<>();
searchParams.put("drop_ratio_search", 0.2);

SortedMap<Long, Float> sparse = new TreeMap<>();
sparse.put(1L, 0.2f);
sparse.put(50L, 0.4f);
sparse.put(1000L, 0.7f);

SparseFloatVec queryVector = new SparseFloatVec(sparse);

SearchResp searchR = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(queryVector))
        .annsField("sparse_vector")
        .searchParams(searchParams)
        .topK(3)
        .outputFields(Collections.singletonList("pk"))
        .build());
        
System.out.println(searchR.getSearchResults());

// Output
//
// [[SearchResp.SearchResult(entity={pk=457270974427187729}, score=0.63, id=457270974427187729), SearchResp.SearchResult(entity={pk=457270974427187728}, score=0.1, id=457270974427187728)]]
```

```javascript
await client.search({
    collection_name: 'my_collection',
    data: {1: 0.2, 50: 0.4, 1000: 0.7},
    limit: 3,
    output_fields: ['pk'],
    params: {
        drop_ratio_search: 0.2
    }
});
```

```go
queryVector, _ := entity.NewSliceSparseEmbedding([]uint32{1, 50, 1000}, []float32{0.2, 0.4, 0.7})

annSearchParams := index.NewCustomAnnParam()
annSearchParams.WithExtraParam("drop_ratio_search", 0.2)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    3,                      // limit
    []entity.Vector{entity.SparseEmbedding(queryVector)},
).WithANNSField("sparse_vector").
    WithOutputFields("pk").
    WithAnnParam(annSearchParams))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("Pks: ", resultSet.GetColumn("pk").FieldData().GetScalars())
}

// Results:
//   IDs:  string_data:{data:"457270974427187705"  data:"457270974427187704"}
//   Scores:  [0.63 0.1]
//   Pks:  string_data:{data:"457270974427187705"  data:"457270974427187704"}

```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "my_collection",
    "data": [
        {"1": 0.2, "50": 0.4, "1000": 0.7}
    ],
    "annsField": "sparse_vector",
    "limit": 3,
    "searchParams":{
        "params":{"drop_ratio_search": 0.2}
    },
    "outputFields": ["pk"]
}'

## {"code":0,"cost":0,"data":[{"distance":0.63,"id":"453577185629572535","pk":"453577185629572535"},{"distance":0.1,"id":"453577185629572534","pk":"453577185629572534"}]}
```

For more information on similarity search parameters, refer to [Basic ANN Search](single-vector-search.md).