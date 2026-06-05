---
id: array-of-structs.md
title: "StructArray"
summary: "Use StructArray fields to store ordered Struct elements with a shared schema of vector and scalar fields."
---

# StructArray

An Array of Structs field, or a StructArray field, in an entity stores an ordered set of Struct elements. Each Struct in the Array shares the same pre-defined schema, comprising multiple vectors and scalar fields.

Here's an example of an entity from a collection that contains a StructArray field.

```json
{
    'id': 0,
    'title': 'Walden',
    'title_vector': [0.1, 0.2, 0.3, 0.4, 0.5],
    'author': 'Henry David Thoreau',
    'year_of_publication': 1845,
    // highlight-start
    'chunks': [
        {
            'text': 'When I wrote the following pages, or rather the bulk of them...',
            'text_vector': [0.3, 0.2, 0.3, 0.2, 0.5],
            'chapter': 'Economy',
        },
        {
            'text': 'I would fain say something, not so much concerning the Chinese and...',
            'text_vector': [0.7, 0.4, 0.2, 0.7, 0.8],
            'chapter': 'Economy'
        }
    ]
    // hightlight-end
}
```

In the example above, the `chunks` field is a StructArray field, and each Struct element contains its own fields, namely `text`, `text_vector`, and `chapter`.

## When to use

Modern AI applications, from autonomous driving to multimodal retrieval, increasingly rely on nested, heterogeneous data. Traditional flat data models struggle to represent complex relationships like "**one document with many annotated chunks**" or "**one driving scene with multiple observed maneuvers**". This is where the StructArray data type in Milvus shines.

To quickly determine if the StructArray field suits your application scenarios, consider whether:

- Your data is in a hierarchical structure, such as one document with many annotated chunks.

- The search result should be the document, rather than the chunks, as in the above example.

- The search results contain massive duplicate entities, and you struggle to retrieve the final results using techniques such as grouping, deduplication, and reranking.

If your answers to the questions above are yes, you should use the StructArray.

## Limits

- **Data types**

    When you create a collection, you can use the Struct type as the data type for the elements in an Array field. However, you cannot add a StructArray to an existing collection, and Milvus does not support using the Struct type as the data type for a collection field.

    The Structs in an Array field share the same schema, which should be defined when you create the Array field.

    A Struct schema contains both vectors and scalar fields, as listed below:

    <Grid columnSize="2" widthRatios="50,50">

        <div>

            Applicable vector fields:

            - `FLOAT_VECTOR`

            - `FLOAT16_VECTOR`

            - `BFLOAT16_VECTOR`

            - `INT8_VECTOR`

            - `BINARY_VECTOR`

        </div>

        <div>

            Applicable scalar fields:

            - `VARCHAR`

            - `INT8/16/32/64`

            - `FLOAT`

            - `DOUBLE`

            - `BOOL`

        </div>

    </Grid>

    Keep the number of vector fields both at the collection level and in the Structs combined to be no greater than or equal to 10.

- **Nullable & default values**

    A StructArray field is not nullable and does not accept any default value.

- **Function**

    You cannot use a function to derive a vector field from a scalar field within a Struct.

- **Index type & metric type**

    All vector fields in a collection must be indexed. To index a vector field within a StructArray field, Milvus uses an embedding list to organize the vector embeddings in each Struct element and indexes the entire embedding list as a whole.

    You can use `AUTOINDEX` or `HNSW` as the index type and any metric type listed below to build indexes for the embedding lists in a StructArray field.

    <table>
       <tr>
         <th><p>Index type</p></th>
         <th><p>Metric type</p></th>
         <th><p>Remarks</p></th>
       </tr>
       <tr>
         <td rowspan="3"><ul><li><p><code>AUTOINDEX</code></p></li><li><p><code>HNSW</code></p></li><li><p><code>IVF_FLAT</code></p></li><li><p><code>DISKANN</code></p></li></ul></td>
         <td rowspan="3"><ul><li><p><code>MAX_SIM_COSINE</code></p></li><li><p><code>MAX_SIM_IP</code></p></li><li><p><code>MAX_SIM_L2</code></p></li></ul></td>
         <td rowspan="3"><p>For embedding lists of the following types:</p><ul><li><p><code>FLOAT_VECTOR</code></p></li><li><p><code>FLOAT16_VECTOR</code></p></li><li><p><code>BFLOAT16_VECTOR</code></p></li><li><p><code>INT8_VECTOR</code></p></li><li><p><code>BINARY_VECTOR</code></p></li></ul></td>
       </tr>
    </table>

    For details on how Milvus calculates the similarity between the query and an embedding list, refer to [Maximum Similarity](metric.md#Maximum-similarity).

    The scalar fields in the StructArray field support the following index types:

    - `INVERTED`

        This usually applies to string-like or categorical filters, like `structA[color]` or `structA[str_val]`. For details, refer to [INVERTED](inverted.md).

    - `STL_SORT`

        This usually applies to range or order-style acceleration on numeric values, like `strctA[num_val]`. For details, refer to [STL_SORT](stl-sort.md).

- **Upsert data**

    Structs do not support upsert in merge mode. However, you can still perform upserts in override mode to update data in Structs. For details about the differences between upsert in merge mode and override mode, refer to [Upsert Entities](upsert-entities.md#Overview).

- **Scalar filtering**

    You can use **element filters** and **operators in the match family** to conduct scalar filtering against a scalar sub-field in a StructArray field. For details, refer to [Scalar filtering in a StructArray field](array-of-structs.md#Scalar-filtering-in-a-StructArray-field).

## Add a StructArray

To add a StructArray field in Milvus, you need to define an array field when creating a collection, and set the data type for its elements to Struct. The process is as follows:

1. Set the data type of a field to `DataType.ARRAY` when adding the field as an Array field to the collection schema.

1. Set the field's `element_type` attribute to `DataType.STRUCT` to make the field a Struct Array.

1. Create a Struct schema and include the required fields. Then, reference the Struct schema in the field's `struct_schema` attribute.

1. Set the field's `max_capacity` attribute to an appropriate value to specify the maximum number of Structs each entity can contain in this field.

1. (**Optional**) You can set `mmap.enabled` for any field within the Struct element to balance the hot and cold data in the Struct.

Here's how you can define a collection schema that includes a StructArray field:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

schema = client.create_schema()

# add the primary field to the collection
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True, auto_id=True)

# add some scalar fields to the collection
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="author", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="year_of_publication", datatype=DataType.INT64)

# add a vector field to the collection
schema.add_field(field_name="title_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# highlight-start
# Create a struct schema
struct_schema = client.create_struct_field_schema()

# add a scalar field to the struct
struct_schema.add_field("text", DataType.VARCHAR, max_length=65535)
struct_schema.add_field("chapter", DataType.VARCHAR, max_length=512)

# add a vector field to the struct with mmap enabled
struct_schema.add_field("text_vector", DataType.FLOAT_VECTOR, mmap_enabled=True, dim=5)

# reference the struct schema in an Array field with its 
# element type set to `DataType.STRUCT`
schema.add_field("chunks", datatype=DataType.ARRAY, element_type=DataType.STRUCT, 
                    struct_schema=struct_schema, max_capacity=1000)
# highlight-end
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(512)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("author")
        .dataType(DataType.VarChar)
        .maxLength(512)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("year_of_publication")
        .dataType(DataType.Int64)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("title_vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

Map<String, String> params = new HashMap<>();
params.put("mmap_enabled", "true");
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("chunks")
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(1000)
        .addStructField(AddFieldReq.builder()
                .fieldName("text")
                .dataType(DataType.VarChar)
                .maxLength(65535)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("chapter")
                .dataType(DataType.VarChar)
                .maxLength(512)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("text_vector")
                .dataType(DataType.FloatVector)
                .dimension(VECTOR_DIM)
                .typeParams(params)
                .build())
        .build());
```

```go
// go
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const milvusClient = new MilvusClient("http://localhost:19530");

const schema = [
  {
    name: "id",
    data_type: DataType.INT64,
    is_primary_key: true,
    auto_id: true,
  },
  {
    name: "title",
    data_type: DataType.VARCHAR,
    max_length: 512,
  },
  {
    name: "author",
    data_type: DataType.VARCHAR,
    max_length: 512,
  },
  {
    name: "year_of_publication",
    data_type: DataType.INT64,
  },
  {
    name: "title_vector",
    data_type: DataType.FLOAT_VECTOR,
    dim: 5,
  },
  // highlight-start
  {
    name: "chunks",
    data_type: DataType.ARRAY,
    element_type: DataType.STRUCT,
    fields: [
      {
        name: "text",
        data_type: DataType.VARCHAR,
        max_length: 65535,
      },
      {
        name: "chapter",
        data_type: DataType.VARCHAR,
        max_length: 512,
      },
      {
        name: "text_vector",
        data_type: DataType.FLOAT_VECTOR,
        dim: 5,
        mmap_enabled: true,
      },
    ],
    max_capacity: 1000,
  },
  // highlight-end
];
```

```bash
# restful
SCHEMA='{
  "autoID": true,
  "fields": [
    {
      "fieldName": "id",
      "dataType": "Int64",
      "isPrimary": true
    },
    {
      "fieldName": "title",
      "dataType": "VarChar",
      "elementTypeParams": { "max_length": "512" }
    },
    {
      "fieldName": "author",
      "dataType": "VarChar",
      "elementTypeParams": { "max_length": "512" }
    },
    {
      "fieldName": "year_of_publication",
      "dataType": "Int64"
    },
    {
      "fieldName": "title_vector",
      "dataType": "FloatVector",
      "elementTypeParams": { "dim": "5" }
    }
  ],
  "structArrayFields": [
    {
      "name": "chunks",
      "description": "Array of document chunks with text and vectors",
      "elementTypeParams":{
         "max_capacity": 1000
      },
      "fields": [
        {
          "fieldName": "text",
          "dataType": "VarChar",
          "elementTypeParams": { "max_length": "65535" }
        },
        {
          "fieldName": "chapter",
          "dataType": "VarChar",
          "elementTypeParams": { "max_length": "512" }
        },
        {
          "fieldName": "text_vector",
          "dataType": "FloatVector",
          "elementTypeParams": {
            "dim": "5",
            "mmap_enabled": "true"
          }
        }
      ]
    }
  ]
}'
```

The highlighted lines in the code example above illustrate how to include a StructArray in a collection schema.

## Set index params

Indexing is mandatory for all vector fields, including both the vector fields in the collection and those defined in the element Struct.

The applicable index parameters vary by index type. For details on applicable index parameters, refer to [Index Explained](index-explained.md) and the documentation for your selected index type.

### Index an embedding list

To index an embedding list, you need to set its index type to `AUTOINDEX`  or any of the applicable index types listed above, and use an listed metric type for Milvus to measure the similarities between embedding lists.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Create index parameters
index_params = client.prepare_index_params()

# Create an index for the vector field in the collection
index_params.add_index(
    field_name="title_vector",
    index_type="AUTOINDEX",
    metric_type="L2",
)

# highlight-start
# Create an index for the vector field in the element Struct
index_params.add_index(
    field_name="chunks[text_vector]",
    index_type="AUTOINDEX",
    metric_type="MAX_SIM_COSINE",
)
# highlight-end
```

```java
import io.milvus.v2.common.IndexParam;

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(IndexParam.builder()
        .fieldName("title_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
indexParams.add(IndexParam.builder()
        .fieldName("chunks[text_vector]")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
        .build());
```

```go
// go
```

```javascript
await milvusClient.createCollection({
  collection_name: "books",
  fields: schema,
});

const indexParams = [
  {
    field_name: "title_vector",
    index_type: "AUTOINDEX",
    metric_type: "L2",
  },
  // highlight-start
  {
    field_name: "chunks[text_vector]",
    index_type: "AUTOINDEX",
    metric_type: "MAX_SIM_COSINE",
  },
  // highlight-end
];
```

```bash
# restful
INDEX_PARAMS='[
  {
    "fieldName": "title_vector",
    "indexName": "title_vector_index",
    "indexType": "AUTOINDEX",
    "metricType": "L2"
  },
  {
    "fieldName": "chunks[text_vector]",
    "indexName": "chunks_text_vector_index",
    "indexType": "AUTOINDEX",
    "metricType": "MAX_SIM_COSINE"
  }
]'
```

### Index a scalar struct sub-field

When you create indexes on a scalar struct sub-field, Milvus actually builds the index at the **element level**, not at the row level, to accelerate scalar filtering.

The following code snippet creates an index on a scalar struct sub-field named `chunks[text]`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params.add_index(
    field_name="chunks[text]",
    index_type="INVERTED"
)
```

```java
indexParams.add(IndexParam.builder()
        .fieldName("chunks[text]")
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
```

```go
// go
```

```javascript
indexParams.push({
    field_name: "chunks[text]",
    index_type: "INVERTED"
})
```

```bash
INDEX_PARAMS += '{
    "fieldName": "chunks[text]",
    "indexName": "chunks_text_vector_index",
    "indexType": "INVERTED"
}'
```

## Create a collection

Once the schema and index are ready, you can create a collection that includes a StructArray field.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
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
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
```

```go
// go
```

```javascript
await milvusClient.createCollection({
  collection_name: "my_collection",
  fields: schema,
  indexes: indexParams,
});
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/collections/create" \
  -H "Content-Type: application/json" \
  -d "{
    \"collectionName\": \"my_collection\",
    \"description\": \"A collection for storing book information with struct array chunks\",
    \"schema\": $SCHEMA,
    \"indexParams\": $INDEX_PARAMS
  }"
```

## Insert data

After creating the collection, you can insert data that includes Arrays of Structs as follows.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Sample data
data = {
    'title': 'Walden',
    'title_vector': [0.1, 0.2, 0.3, 0.4, 0.5],
    'author': 'Henry David Thoreau',
    'year_of_publication': 1845,
    'chunks': [
        {
            'text': 'When I wrote the following pages, or rather the bulk of them...',
            'text_vector': [0.3, 0.2, 0.3, 0.2, 0.5],
            'chapter': 'Economy',
        },
        {
            'text': 'I would fain say something, not so much concerning the Chinese and...',
            'text_vector': [0.7, 0.4, 0.2, 0.7, 0.8],
            'chapter': 'Economy'
        }
    ]
}

# insert data
client.insert(
    collection_name="my_collection",
    data=[data]
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

Gson gson = new Gson();
JsonObject row = new JsonObject();
row.addProperty("title", "Walden");
row.add("title_vector", gson.toJsonTree(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f, 0.5f)));
row.addProperty("author", "Henry David Thoreau");
row.addProperty("year_of_publication", 1845);

JsonArray structArr = new JsonArray();
JsonObject struct1 = new JsonObject();
struct1.addProperty("text", "When I wrote the following pages, or rather the bulk of them...");
struct1.add("text_vector", gson.toJsonTree(Arrays.asList(0.3f, 0.2f, 0.3f, 0.2f, 0.5f)));
struct1.addProperty("chapter", "Economy");
structArr.add(struct1);
JsonObject struct2 = new JsonObject();
struct2.addProperty("text", "I would fain say something, not so much concerning the Chinese and...");
struct2.add("text_vector", gson.toJsonTree(Arrays.asList(0.7f, 0.4f, 0.2f, 0.7f, 0.8f)));
struct2.addProperty("chapter", "Economy");
structArr.add(struct2);

row.add("chunks", structArr);

InsertResp insertResp = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
```

```go
// go
```

```javascript
  {
    id: 0,
    title: "Walden",
    title_vector: [0.1, 0.2, 0.3, 0.4, 0.5],
    author: "Henry David Thoreau",
    "year-of-publication": 1845,
    chunks: [
      {
        text: "When I wrote the following pages, or rather the bulk of them...",
        text_vector: [0.3, 0.2, 0.3, 0.2, 0.5],
        chapter: "Economy",
      },
      {
        text: "I would fain say something, not so much concerning the Chinese and...",
        text_vector: [0.7, 0.4, 0.2, 0.7, 0.8],
        chapter: "Economy",
      },
    ],
  },
];

await milvusClient.insert({
  collection_name: "books",
  data: data,
});
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/insert" \
  -H "Content-Type: application/json" \
  -d '{
    "collectionName": "my_collection",
    "data": [
      {
        "title": "Walden",
        "title_vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        "author": "Henry David Thoreau",
        "year_of_publication": 1845,
        "chunks": [
          {
            "text": "When I wrote the following pages, or rather the bulk of them...",
            "text_vector": [0.3, 0.2, 0.3, 0.2, 0.5],
            "chapter": "Economy"
          },
          {
            "text": "I would fain say something, not so much concerning the Chinese and...",
            "text_vector": [0.7, 0.4, 0.2, 0.7, 0.8],
            "chapter": "Economy"
          }
        ]
      }
    ]
  }'
```

<details>

<summary>Need more data?</summary>

```python
import json
import random
from typing import List, Dict, Any

# Real classic books (title, author, year)
BOOKS = [
    ("Pride and Prejudice", "Jane Austen", 1813),
    ("Moby Dick", "Herman Melville", 1851),
    ("Frankenstein", "Mary Shelley", 1818),
    ("The Picture of Dorian Gray", "Oscar Wilde", 1890),
    ("Dracula", "Bram Stoker", 1897),
    ("The Adventures of Sherlock Holmes", "Arthur Conan Doyle", 1892),
    ("Alice's Adventures in Wonderland", "Lewis Carroll", 1865),
    ("The Time Machine", "H.G. Wells", 1895),
    ("The Scarlet Letter", "Nathaniel Hawthorne", 1850),
    ("Leaves of Grass", "Walt Whitman", 1855),
    ("The Brothers Karamazov", "Fyodor Dostoevsky", 1880),
    ("Crime and Punishment", "Fyodor Dostoevsky", 1866),
    ("Anna Karenina", "Leo Tolstoy", 1877),
    ("War and Peace", "Leo Tolstoy", 1869),
    ("Great Expectations", "Charles Dickens", 1861),
    ("Oliver Twist", "Charles Dickens", 1837),
    ("Wuthering Heights", "Emily Brontë", 1847),
    ("Jane Eyre", "Charlotte Brontë", 1847),
    ("The Call of the Wild", "Jack London", 1903),
    ("The Jungle Book", "Rudyard Kipling", 1894),
]

# Common chapter names for classics
CHAPTERS = [
    "Introduction", "Prologue", "Chapter I", "Chapter II", "Chapter III",
    "Chapter IV", "Chapter V", "Chapter VI", "Chapter VII", "Chapter VIII",
    "Chapter IX", "Chapter X", "Epilogue", "Conclusion", "Afterword",
    "Economy", "Where I Lived", "Reading", "Sounds", "Solitude",
    "Visitors", "The Bean-Field", "The Village", "The Ponds", "Baker Farm"
]

# Placeholder text snippets (mimicking 19th-century prose)
TEXT_SNIPPETS = [
    "When I wrote the following pages, or rather the bulk of them...",
    "I would fain say something, not so much concerning the Chinese and...",
    "It is a truth universally acknowledged, that a single man in possession...",
    "Call me Ishmael. Some years ago—never mind how long precisely...",
    "It was the best of times, it was the worst of times...",
    "All happy families are alike; each unhappy family is unhappy in its own way.",
    "Whether I shall turn out to be the hero of my own life, or whether that station...",
    "You will rejoice to hear that no disaster has accompanied the commencement...",
    "The world is too much with us; late and soon, getting and spending...",
    "He was an old man who fished alone in a skiff in the Gulf Stream..."
]

def random_vector() -> List[float]:
    return [round(random.random(), 1) for _ in range(5)]

def generate_chunk() -> Dict[str, Any]:
    return {
        "text": random.choice(TEXT_SNIPPETS),
        "text_vector": random_vector(),
        "chapter": random.choice(CHAPTERS)
    }

def generate_record(record_id: int) -> Dict[str, Any]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(1, 5)  # 1 to 5 chunks per book
    chunks = [generate_chunk() for _ in range(num_chunks)]
    return {
        "title": title,
        "title_vector": random_vector(),
        "author": author,
        "year_of_publication": year,
        "chunks": chunks
    }

# Generate 1000 records
data = [generate_record(i) for i in range(1000)]

# Insert the generated data
client.insert(collection_name="my_collection", data=data)
```

</details>

## Vector search in a StructArray field

You can perform vector searches on the vector fields of a collection and in a StructArray.

Specifically, you should concatenate the name of the StructArray field and those of the target vector fields within Struct elements as the value for the `anns_field` parameter in a search request, and use `EmbeddingList` to organize query vectors neatly.

<div class="alert note">

Milvus provides `EmbeddingList` to help you organize query vectors for searches against an embedding list in a StructArray more neatly. Each `EmbeddingList` contains at least a vector embedding and expects a number of topK entities in return.

However, `EmbeddingList` can be used only in `search()` requests without range search or grouping search parameters, let alone `search_iterator()` requests.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus.client.embedding_list import EmbeddingList

# each query embedding list triggers a single search
embeddingList1 = EmbeddingList()
embeddingList1.add([0.2, 0.9, 0.4, -0.3, 0.2])

embeddingList2 = EmbeddingList()
embeddingList2.add([-0.2, -0.2, 0.5, 0.6, 0.9])
embeddingList2.add([-0.4, 0.3, 0.5, 0.8, 0.2])

# a search with a single embedding list
results = client.search(
    collection_name="my_collection",
    data=[ embeddingList1 ],
    anns_field="chunks[text_vector]",
    search_params={"metric_type": "MAX_SIM_COSINE"},
    limit=3,
    output_fields=["chunks[text]"]
)
```

```java
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;

EmbeddingList embeddingList1 = new EmbeddingList();
embeddingList1.add(new FloatVec(new float[]{0.2f, 0.9f, 0.4f, -0.3f, 0.2f}));

EmbeddingList embeddingList2 = new EmbeddingList();
embeddingList2.add(new FloatVec(new float[]{-0.2f, -0.2f, 0.5f, 0.6f, 0.9f}));
embeddingList2.add(new FloatVec(new float[]{-0.4f, 0.3f, 0.5f, 0.8f, 0.2f}));

Map<String, Object> params = new HashMap<>();
params.put("metric_type", "MAX_SIM_COSINE");
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("chunks[text_vector]")
        .data(Collections.singletonList(embeddingList1))
        .searchParams(params)
        .limit(3)
        .outputFields(Collections.singletonList("chunks[text]"))
        .build());
```

```go
// go
```

```javascript
const embeddingList1 = [[0.2, 0.9, 0.4, -0.3, 0.2]];
const embeddingList2 = [
  [-0.2, -0.2, 0.5, 0.6, 0.9],
  [-0.4, 0.3, 0.5, 0.8, 0.2],
];
const results = await milvusClient.search({
  collection_name: "books",
  data: embeddingList1,
  anns_field: "chunks[text_vector]",
  search_params: { metric_type: "MAX_SIM_COSINE" },
  limit: 3,
  output_fields: ["chunks[text]"],
});

```

```bash
# restful
embeddingList1='[[0.2,0.9,0.4,-0.3,0.2]]'
embeddingList2='[[-0.2,-0.2,0.5,0.6,0.9],[-0.4,0.3,0.5,0.8,0.2]]'
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -d "{
    \"collectionName\": \"my_collection\",
    \"data\": [$embeddingList1],
    \"annsField\": \"chunks[text_vector]\",
    \"searchParams\": {\"metric_type\": \"MAX_SIM_COSINE\"},
    \"limit\": 3,
    \"outputFields\": [\"chunks[text]\"]
  }"
```

The above search request uses `chunks[text_vector]` to refer to the `text_vector` field in Struct elements. You can use this syntax to set the `anns_field` and `output_fields` parameters. 

The output would be a list of the three most similar entities.

<details>

<summary>Output</summary>

```python
# [
#     [
#         {
#             'id': 461417939772144945,
#             'distance': 0.9675756096839905,
#             'entity': {
#                 'chunks': [
#                     {'text': 'The world is too much with us; late and soon, getting and spending...'},
#                     {'text': 'All happy families are alike; each unhappy family is unhappy in its own way.'}
#                 ]
#             }
#         },
#         {
#             'id': 461417939772144965,
#             'distance': 0.9555778503417969,
#             'entity': {
#                 'chunks': [
#                     {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#                     {'text': 'He was an old man who fished alone in a skiff in the Gulf Stream...'},
#                     {'text': 'When I wrote the following pages, or rather the bulk of them...'},
#                     {'text': 'It was the best of times, it was the worst of times...'},
#                     {'text': 'The world is too much with us; late and soon, getting and spending...'}
#                 ]
#             }
#         },
#         {
#             'id': 461417939772144962,
#             'distance': 0.9469035863876343,
#             'entity': {
#                 'chunks': [
#                     {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#                     {'text': 'The world is too much with us; late and soon, getting and spending...'},
#                     {'text': 'He was an old man who fished alone in a skiff in the Gulf Stream...'},
#                     {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#                     {'text': 'The world is too much with us; late and soon, getting and spending...'}
#                 ]
#             }
#         }
#     ]
# ]
```

</details>

You can also include multiple embedding lists in the `data` parameter to retrieve search results for each of these embedding lists.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# a search with multiple embedding lists
results = client.search(
    collection_name="my_collection",
    data=[ embeddingList1, embeddingList2 ],
    anns_field="chunks[text_vector]",
    search_params={"metric_type": "MAX_SIM_COSINE"},
    limit=3,
    output_fields=["chunks[text]"]
)

print(results)
```

```java
Map<String, Object> params = new HashMap<>();
params.put("metric_type", "MAX_SIM_COSINE");
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("chunks[text_vector]")
        .data(Arrays.asList(embeddingList1, embeddingList2))
        .searchParams(params)
        .limit(3)
        .outputFields(Collections.singletonList("chunks[text]"))
        .build());
        
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (int i = 0; i < searchResults.size(); i++) {
    System.out.println("Results of No." + i + " embedding list");
    List<SearchResp.SearchResult> results = searchResults.get(i);
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
```

```go
// go
```

```javascript
const results2 = await milvusClient.search({
  collection_name: "books",
  data: [embeddingList1, embeddingList2],
  anns_field: "chunks[text_vector]",
  search_params: { metric_type: "MAX_SIM_COSINE" },
  limit: 3,
  output_fields: ["chunks[text]"],
});
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -d "{
    \"collectionName\": \"my_collection\",
    \"data\": [$embeddingList1, $embeddingList2],
    \"annsField\": \"chunks[text_vector]\",
    \"searchParams\": {\"metric_type\": \"MAX_SIM_COSINE\"},
    \"limit\": 3,
    \"outputFields\": [\"chunks[text]\"]
  }"
```

The output would be a list of the three most similar entities for each embedding list.

<details>

<summary>Output</summary>

```python
# [
#   [
#     {
#       'id': 461417939772144945,
#       'distance': 0.9675756096839905,
#       'entity': {
#         'chunks': [
#           {'text': 'The world is too much with us; late and soon, getting and spending...'},
#           {'text': 'All happy families are alike; each unhappy family is unhappy in its own way.'}
#         ]
#       }
#     },
#     {
#       'id': 461417939772144965,
#       'distance': 0.9555778503417969,
#       'entity': {
#         'chunks': [
#           {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#           {'text': 'He was an old man who fished alone in a skiff in the Gulf Stream...'},
#           {'text': 'When I wrote the following pages, or rather the bulk of them...'},
#           {'text': 'It was the best of times, it was the worst of times...'},
#           {'text': 'The world is too much with us; late and soon, getting and spending...'}
#         ]
#       }
#     },
#     {
#       'id': 461417939772144962,
#       'distance': 0.9469035863876343,
#       'entity': {
#         'chunks': [
#           {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#           {'text': 'The world is too much with us; late and soon, getting and spending...'},
#           {'text': 'He was an old man who fished alone in a skiff in the Gulf Stream...'},
#           {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'},
#           {'text': 'The world is too much with us; late and soon, getting and spending...'}
#         ]
#       }
#     }
#   ],
#   [
#     {
#       'id': 461417939772144663,
#       'distance': 1.9761409759521484,
#       'entity': {
#         'chunks': [
#           {'text': 'It was the best of times, it was the worst of times...'},
#           {'text': 'It is a truth universally acknowledged, that a single man in possession...'},
#           {'text': 'Whether I shall turn out to be the hero of my own life, or whether that station...'},
#           {'text': 'He was an old man who fished alone in a skiff in the Gulf Stream...'}
#         ]
#       }
#     },
#     {
#       'id': 461417939772144692,
#       'distance': 1.974656581878662,
#       'entity': {
#         'chunks': [
#           {'text': 'It is a truth universally acknowledged, that a single man in possession...'},
#           {'text': 'Call me Ishmael. Some years ago—never mind how long precisely...'}
#         ]
#       }
#     },
#     {
#       'id': 461417939772144662,
#       'distance': 1.9406685829162598,
#       'entity': {
#         'chunks': [
#           {'text': 'It is a truth universally acknowledged, that a single man in possession...'}
#         ]
#       }
#     }
#   ]
# ]
```

</details>

In the above code example, `embeddingList1` is an embedding list of one vector, while `embeddingList2` contains two vectors. Each triggers a separate search request and expects a list of top-K similar entities.

## Scalar filtering in a StructArray field

You can use **element filters** and **operators in the match family** to conduct scalar filtering against a scalar sub-field in a StructArray. For more details and examples on the two operator types above, refer to [Array of Structs Operators](struct-array-operators.md).

### Element filters

This is an entity-level filter that checks whether at least one element in the StructArray field of an entity satisfies the predicate. For example, the following element filter returns entities that contain at least one chunk that starts with "Red" in the `text` sub-field.

```python
element_filter(chunks, $[text] LIKE "Red%")
```

You can use almost all comparison, range, and arithmetic operators in the predicate, which is evaluated per element, and the logical operators can be used to combine multiple conditions on the same element. For details, refer to [Basic Operators](basic-operators.md).

If multiple scalar-filtering expressions are present in a filtered search or a query request, place the element filter expression after all entity-level filter expressions, as shown below.

```python
# correct
id > 0 && element_filter(chunks, $[x] > 1)

# incorrect, resulting errors
element_filter(chunks, $[x] > 1) && id > 0
```

### Match family operators

The match family operators work over a StructArray field too. Instead of simply checking whether an element exists, you can determine how many elements (or what proportion) must satisfy an element predicate.

- `MATCH_ANY(chunks, $[text] LIKE "Red%")`

    This returns entities that contain at least one chunk that starts with "Red" in the `text` sub-field; semantically, this is equivalent to `element_filter`.

- `MATCH_ALL(chunks, $[text] LIKE "Red%")`

    This returns entities whose text sub-fields in all chunks start with "Red".

- `MATCH_LEAST(chunks, $[text] LIKE "Red%", k)`

    This returns entities that contain at least `k` chunks that start with "Red" in the `text` sub-field.

- `MATCH_MOST(chunks, $[text] LIKE "Red%", k)`

    This returns entities that contain at most `k` chunks that start with "Red" in the `text` sub-field.

- `MATCH_EXACT(chunks, $[text] LIKE "Red%", k)`

    This returns entities that contain exactly `k` chunks that start with "Red" in the `text` sub-field.

## Next steps

The development of a native StructArray data type represents a major advancement in Milvus's capability to handle complex data structures. To better understand its use cases and maximize this new feature, you are encouraged to read [Schema Design Using an Array of Structs](best-practices-for-array-of-structs.md).

