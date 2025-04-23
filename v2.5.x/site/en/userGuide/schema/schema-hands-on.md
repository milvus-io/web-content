---
id: schema-hands-on.md
title: "Schema Design Hands-On"
summary: "Information Retrieval (IR) systems, also known as search engines, are essential for various AI applications such as Retrieval-augmented generation (RAG), image search, and product recommendation. The first step in developing an IR system is designing the data model, which involves analyzing business requirements, determining how to organize information, and indexing data to make it semantically searchable."
---

# Schema Design Hands-On

Information Retrieval (IR) systems, also known as search engines, are essential for various AI applications such as Retrieval-augmented generation (RAG), image search, and product recommendation. The first step in developing an IR system is designing the data model, which involves analyzing business requirements, determining how to organize information, and indexing data to make it semantically searchable.

Milvus supports defining the data model through a collection schema. A collection organizes unstructured data like text and images, along with their vector representations, including dense and sparse vectors in various precision used for semantic search. Additionally, Milvus supports storing and filtering non-vector data types called "Scalar". Scalar types include BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON, and Array.

![Schema Hands On](../../../../assets/schema-hands-on.png)

The data model design of a search system involves analyzing business needs and abstracting information into a schema-expressed data model. For instance, to search a piece of text, it must be "indexed" by converting the literal string into a vector through "embedding", enabling vector search. Beyond this basic requirement, it may be necessary to store other properties such as publication timestamp and author. This metadata allows for semantic searches to be refined through filtering, returning only texts published after a specific date or by a particular author. They may also need to be retrieved together with the main text, for rendering the search result in the application. To organize these text pieces, each should be assigned a unique identifier, expressed as an integer or string. These elements are essential for achieving sophisticated search logic.

A well-designed schema is important as it abstracts the data model and decides if the business objectives can be achieved through search. Furthermore, since every row of data inserted into the collection needs to follow the schema, it greatly helps to maintain data consistency and long-term quality. From a technical perspective, a well-defined schema leads to well-organized column data storage and a cleaner index structure, which can boost search performance.

## An Example: News Search

Let's say we want to build search for a news website and we have a corpus of news with text, thumbnail images, and other metadata. First, we need to analyze how we want to utilize the data to support the business requirement of search. Imagine the requirement is to retrieve the news based the thumbnail image and the summary of the content, and taking the metadata such as author info and publishing time as criteria to filter the search result. These requirements can be further broken down into:

- To search images via text, we can embed images into vectors via multimodal embedding model that can map text and image data into the same latent space.

- The summary text of an article is embedded into vectors via text embedding model.

- To filter based on the publish time, the dates are stored as a scalar field and an index is needed for the scalar field for efficient filtering. Other more complex data structures such a JSON can be stored in a scalar and a filtered search performed on their contents (indexing JSON is an upcoming feature).

- To retrieve the image thumbnail bytes and render it on the search result page, the image url is also stored. Similarly, for the summary text and title. (Alternatively, we could store the raw text and image file data as scalar fields if required.)

- To improve the search result on the summary text, we design a hybrid search approach. For one retrieval path, we use regular embedding model to generate dense vector from the text, such as OpenAI's `text-embedding-3-large` or the open-source `bge-large-en-v1.5`. These models are good at representing the overall semantic of the text. The other path is to use sparse embedding models such as BM25 or SPLADE to generate a sparse vector, resembling the full-text search which is good at grasping the details and individual concepts in the text. Milvus supports using both in the same data collection thanks to its multi-vector feature. The search on multiple vectors can be done in a single `hybrid_search()` operation.

- Finally, we also need an ID field to identify each individual news page, formally referred to as an "entity" in Milvus terminology. This field is used as the primary key (or "pk" for short).

<table>
   <tr>
     <th><p>Field Name</p></th>
     <th><p>article_id (Primary Key)</p></th>
     <th><p>title</p></th>
     <th><p>author_info</p></th>
     <th><p>publish_ts</p></th>
     <th><p>image_url</p></th>
     <th><p>image_vector</p></th>
     <th><p>summary</p></th>
     <th><p>summary_dense_vector</p></th>
     <th><p>summary_sparse_vector</p></th>
   </tr>
   <tr>
     <td><p>Type</p></td>
     <td><p>INT64</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>JSON</p></td>
     <td><p>INT32</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>VARCHAR</p></td>
     <td><p>FLOAT_VECTOR</p></td>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
   </tr>
   <tr>
     <td><p>Need Index</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N (Support coming soon)</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>Y</p></td>
   </tr>
</table>

## How to Implement the Example Schema

### Create Schema

First, we create a Milvus client instance, which can be used to connect to the Milvus server and manage collections and data. 

To set up a schema, we use `create_schema()` to create a schema object and `add_field()` to add fields to the schema.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

collection_name = "my_collection"

# client = MilvusClient(uri="http://localhost:19530")
client = MilvusClient(uri="./milvus_demo.db")

schema = MilvusClient.create_schema(
    auto_id=False,
)

schema.add_field(field_name="article_id", datatype=DataType.INT64, is_primary=True, description="article id")
schema.add_field(field_name="title", datatype=DataType.VARCHAR, max_length=200, description="article title")
schema.add_field(field_name="author_info", datatype=DataType.JSON, description="author information")
schema.add_field(field_name="publish_ts", datatype=DataType.INT32, description="publish timestamp")
schema.add_field(field_name="image_url", datatype=DataType.VARCHAR,  max_length=500, description="image URL")
schema.add_field(field_name="image_vector", datatype=DataType.FLOAT_VECTOR, dim=768, description="image vector")
schema.add_field(field_name="summary", datatype=DataType.VARCHAR, max_length=1000, description="article summary")
schema.add_field(field_name="summary_dense_vector", datatype=DataType.FLOAT_VECTOR, dim=768, description="summary dense vector")
schema.add_field(field_name="summary_sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR, description="summary sparse vector")
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String collectionName = "my_collection";
CreateCollectionReq.CollectionSchema schema = client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName("article_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .description("article id")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(200)
        .description("article title")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("author_info")
        .dataType(DataType.JSON)
        .description("author information")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("publish_ts")
        .dataType(DataType.Int32)
        .description("publish timestamp")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("image_url")
        .dataType(DataType.VarChar)
        .maxLength(500)
        .description("image URL")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("image_vector")
        .dataType(DataType.FloatVector)
        .dimension(768)
        .description("image vector")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("summary")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .description("article summary")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("summary_dense_vector")
        .dataType(DataType.FloatVector)
        .dimension(768)
        .description("summary dense vector")
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("summary_sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .description("summary sparse vector")
        .build());
```

```javascript
const { MilvusClient } = require("@zilliz/milvus2-sdk-node");
const collectionName = "my_collection";

const client = new MilvusClient("http://localhost:19530");

const schema = [
  { name: "article_id", type: "INT64", is_primary: true, description: "article id" },
  { name: "title", type: "VARCHAR", max_length: 200, description: "article title" },
  { name: "author_info", type: "JSON", description: "author information" },
  { name: "publish_ts", type: "INT32", description: "publish timestamp" },
  { name: "image_url", type: "VARCHAR", max_length: 500, description: "image URL" },
  { name: "image_vector", type: "FLOAT_VECTOR", dim: 768, description: "image vector" },
  { name: "summary", type: "VARCHAR", max_length: 1000, description: "article summary" },
  { name: "summary_dense_vector", type: "FLOAT_VECTOR", dim: 768, description: "summary dense vector" },
  { name: "summary_sparse_vector", type: "SPARSE_FLOAT_VECTOR", description: "summary sparse vector" },
];
```

```go
import (
    "context"
    "fmt"

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

collectionName := "my_collection"
schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("article_id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithDescription("article id"),
).WithField(entity.NewField().
    WithName("title").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(200).
    WithDescription("article title"),
).WithField(entity.NewField().
    WithName("author_info").
    WithDataType(entity.FieldTypeJSON).
    WithDescription("author information"),
).WithField(entity.NewField().
    WithName("publish_ts").
    WithDataType(entity.FieldTypeInt32).
    WithDescription("publish timestamp"),
).WithField(entity.NewField().
    WithName("image_url").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(500).
    WithDescription("image url"),
).WithField(entity.NewField().
    WithName("image_vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768).
    WithDescription("image vector"),
).WithField(entity.NewField().
    WithName("summary").
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(1000).
    WithDescription("article summary"),
).WithField(entity.NewField().
    WithName("summary_dense_vector").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(768).
    WithDescription("summary dense vector"),
).WithField(entity.NewField().
    WithName("summary_sparse_vector").
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription("summary sparse vector"),
)
```

```bash
# restful
export idField='{
    "fieldName": "article_id",
    "dataType": "Int64",
    "isPrimary": true
}'

export titleField='{
    "fieldName": "title",
    "dataType": "VarChar",
    "elementTypeParams": {
       "max_length": 200
    }
}'

export authorField='{
    "fieldName": "author_info",
    "dataType": "JSON"
}'

export publishField='{
    "fieldName": "publish_ts",
    "dataType": "Int32"
}'

export imgField='{
    "fieldName": "image_url",
    "dataType": "VarChar",
    "elementTypeParams": {
       "max_length": 500
    }
}'

export imgVecField='{
    "fieldName": "image_vector",
    "dataType": "FloatVector",
    "elementTypeParams": {
       "dim": 5
    }
}'

export summaryField='{
    "fieldName": "summary",
    "dataType": "VarChar",
    "elementTypeParams": {
       "max_length": 1000
    }
}'

export summaryDenseField='{
    "fieldName": "summary_dense_vector",
    "dataType": "FloatVector",
    "elementTypeParams": {
       "dim": 768
    }
}'

export summarySparseField='{
    "fieldName": "summary_sparse_vector",
    "dataType": "SparseFloatVector",
    "elementTypeParams": {
       "dim": 768
    }
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $idField,
        $titleField,
        $authorField,
        $publishField,
        $imgField,
        $imgVecField,
        $summaryField,
        $summaryDenseField,
        $summarySparseField
    ]
}"
```

You might notice the argument `uri` in `MilvusClient`, which is used to connect to the Milvus server. You can set the arguments as follows:

- If you only need a local vector database for small scale data or prototypeing, setting the uri as a local file, e.g.``./milvus.db``, is the most convenient method, as it automatically utilizes [Milvus Lite](milvus_lite.md) to store all data in this file.

- If you have large scale of data, say more than a million vectors, you can set up a more performant Milvus server on [Docker or Kubernetes](quickstart.md). In this setup, please use the server address and port as your uri, e.g.``http://localhost:19530``. If you enable the authentication feature on Milvus, use "<your_username>:<your_password>" as the token, otherwise don't set the token.

- If you use [Zilliz Cloud](https://zilliz.com/cloud), the fully managed cloud service for Milvus, adjust the ``uri`` and ``token``, which correspond to the Public Endpoint and API key in Zilliz Cloud.

As for the `auto_id` in `MilvusClient.create_schema`, AutoID is an attribute of the primary field that determines whether to enable auto increment for the primary field.  Since we set the field`article_id` as the primary key and want to add article id manually, we set `auto_id` False to disable this feature.

After adding all the fields to the schema object, our schema object agrees with the entries in the table above.

### Define Index

After defining the schema with various fields, including metadata and vector fields for image and summary data, the next step involves preparing the index parameters. Indexing is crucial for optimizing the search and retrieval of vectors, ensuring efficient query performance. In the following section, we will define the index parameters for the specified vector and scalar fields in the collection.

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
    field_name="image_vector",
    index_type="AUTOINDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="summary_dense_vector",
    index_type="AUTOINDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="summary_sparse_vector",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="IP",
)
index_params.add_index(
    field_name="publish_ts",
    index_type="INVERTED",
)
```

```java
import io.milvus.v2.common.IndexParam;

import java.util.ArrayList;
import java.util.List;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("image_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName("summary_dense_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName("summary_sparse_vector")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.IP)
        .build());

indexes.add(IndexParam.builder()
        .fieldName("publish_ts")
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
```

```javascript
const { IndexType, MetricType } = require("@zilliz/milvus2-sdk-node");
const index_params = [
  {
    field_name: "image_vector",
    index_type: IndexType.AUTOINDEX,
    metric_type: MetricType.IP,
  },
  {
    field_name: "summary_dense_vector",
    index_type: IndexType.AUTOINDEX,
    metric_type: MetricType.IP,
  },
  {
    field_name: "summary_sparse_vector",
    index_type: IndexType.SPARSE_INVERTED_INDEX,
    metric_type: MetricType.IP,
  },
  {
    field_name: "publish_ts",
    index_type: IndexType.INVERTED,
  },
];
```

```go
indexOption1 := milvusclient.NewCreateIndexOption(collectionName, "image_vector",
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption(collectionName, "summary_dense_vector",
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption3 := milvusclient.NewCreateIndexOption(collectionName, "summary_sparse_vector",
    index.NewSparseInvertedIndex(index.MetricType(entity.IP), 0.2))
indexOption4 := milvusclient.NewCreateIndexOption(collectionName, "publish_ts",
    index.NewInvertedIndex())
```

```bash
# restful
indexParams='[
  {
    "fieldName": "image_vector",
    "params": {
      "index_type": "AUTOINDEX",
      "metric_type": "IP"
    }
  },
  {
    "fieldName": "summary_dense_vector",
    "params": {
      "index_type": "AUTOINDEX",
      "metric_type": "IP"
    }
  },
  {
    "fieldName": "summary_sparse_vector",
    "params": {
      "index_type": "AUTOINDEX",
      "metric_type": "IP"
    }
  },
  {
    "fieldName": "publish_ts",
    "params": {
      "index_type": "AUTOINDEX"
    }
  }
]'

```

Once the index parameters are set up and applied, Milvus is optimized for handling complex queries on vector and scalar data. This indexing enhances the performance and accuracy of similarity searches within the collection, allowing for efficient retrieval of articles based on image vectors and summary vectors. By leveraging the `AUTOINDEX` for dense vectors, the `SPARSE_INVERTED_INDEX` for sparse vectors and the `INVERTED_INDEX` for scalars, Milvus can quickly identify and return the most relevant results, significantly improving the overall user experience and effectiveness of the data retrieval process.

There are many types of indices and metrics. For more information about them, you can refer to [Milvus index type](overview.md#Index-types) and [Milvus metric type](glossary.md#Metric-type).

### Create Collection

With the schema and indexes defined, we create a "collection" with these parameters. Collection to Milvus is like a table to a relational DB.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
)
```

```java
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```javascript
const client.create_collection({
    collection_name: collection_name,
    schema: schema,
    index_params: index_params,
});
```

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption1, indexOption2, indexOption3, indexOption4))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"my_collection\",
  \"schema\": $schema,
  \"indexParams\": $indexParams
}"

```

We can verify that the collection has been successfully created by describing the collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
collection_desc = client.describe_collection(
    collection_name=collection_name
)
print(collection_desc)
```

```java
DescribeCollectionResp descResp = client.describeCollection(DescribeCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.println(descResp);
```

```javascript
const collection_desc = await client.describeCollection({
    collection_name: collection_name
});
console.log(collection_desc);
```

```go
desc, err := client.DescribeCollection(ctx, milvusclient.NewDescribeCollectionOption(collectionName))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(desc.Schema)
```

```bash
# restful
curl --request POST \
--url "http://localhost:19530/v2/vectordb/collections/describe" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": $collection_name
}'
```

## Other Considerations

### Loading Index

When creating a collection in Milvus, you can choose to load the index immediately or defer it until after bulk ingesting some data. Typically, you don't need to make an explicit choice about this, as the above examples show that the index is automatically built for any ingested data right after collection creation. This allows for immediate searchability of the ingested data. However, if you have a large bulk insert after collection creation and don't need to search for any data until a certain point, you can defer the index building by omitting index_params in the collection creation and build the index by calling load explicitly after ingesting all the data. This method is more efficient for building the index on a large collection, but no searches can be done until calling load().

### How to Define Data Model For Multi-tenancy

The concept of multiple tenants is commonly used in scenarios where a single software application or service needs to serve multiple independent users or organizations, each with their own isolated environment. This is frequently seen in cloud computing, SaaS (Software as a Service) applications, and database systems. For example, a cloud storage service may utilize multi-tenancy to allow different companies to store and manage their data separately while sharing the same underlying infrastructure. This approach maximizes resource utilization and efficiency while ensuring data security and privacy for each tenant.

The easiest way to differentiate tenants is by isolating their data and resources from each other. Each tenant either has exclusive access to specific resources or shares resources with others to manage Milvus entities such as databases, collections, and partitions. There are specific methods aligned with these entities to implement multi-tenancy. You can refer to the [Milvus multi-tenancy page](multi_tenancy.md#Multi-tenancy-strategies) for more information.