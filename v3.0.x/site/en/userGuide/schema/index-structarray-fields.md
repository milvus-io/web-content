---
id: index-structarray-fields.md
title: "Index StructArray Fields"
summary: "Create indexes on StructArray subfields before you run vector search or accelerate scalar filtering. For a StructArray field, the index target is a subfield path, such as chunks[emb_list_vector], chunks[emb], or chunks[section]."
---
# Index StructArray Fields

Create indexes on StructArray subfields before you run vector search or accelerate scalar filtering. For a StructArray field, the index target is a subfield path, such as `chunks[emb_list_vector]`, `chunks[emb]`, or `chunks[section]`.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The `chunks` StructArray field contains scalar subfields for filtering and vector subfields for search.

## Before you begin

Make sure the collection schema already contains the `chunks` StructArray field. Reuse the initialized client from [Create a StructArray Field](create-structarray-field.md) for your selected language (`cli` and `ctx` for Go, `client` for the other SDKs). You can create indexes before inserting data.

| Subfield path | Type | Index purpose |
| --- | --- | --- |
| `chunks[emb_list_vector]` | `FLOAT_VECTOR` | EmbeddingList search with `MAX_SIM*` metrics. |
| `chunks[emb]` | `FLOAT_VECTOR` | Element-level search with regular vector metrics. |
| `chunks[section]` | `VARCHAR` | Categorical filtering. |
| `chunks[quality_score]` | `FLOAT` | Numeric filtering and range-style predicates. |
| `chunks[has_code]` | `BOOL` | Boolean filtering. |

<div class="alert note">

A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, create two separate vector subfields and index them separately. In this page, `chunks[emb_list_vector]` is indexed for EmbeddingList search, and `chunks[emb]` is indexed for element-level search.

</div>

## Choose indexes

Use the search mode to choose the vector metric family.

| Search or filter goal | Target path | What to choose |
| --- | --- | --- |
| EmbeddingList search | `chunks[emb_list_vector]` | A `MAX_SIM*` metric family. |
| Element-level vector search | `chunks[emb]` | A regular vector metric family, such as `COSINE`, `IP`, or `L2`. |
| Filter by string or category | `chunks[section]` | A scalar index supported by your target. |
| Filter by numeric range | `chunks[quality_score]`, `chunks[page]` | A scalar index supported by your target. |
| Filter by boolean value | `chunks[has_code]` | A scalar index supported by your target. |

EmbeddingList search treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results. Element-level search searches each Struct element independently and can return the matched element offset.

## Create vector indexes

The following example creates two vector indexes. The first index uses a `MAX_SIM*` metric for EmbeddingList search. The second index uses a regular vector metric for element-level search.


<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

# Index for EmbeddingList search.
index_params.add_index(
    field_name="chunks[emb_list_vector]",
    index_name="chunks_emb_list_max_sim",
    index_type="HNSW",
    metric_type="MAX_SIM_COSINE",
    params={
        "M": 16,
        "efConstruction": 200,
    },
)

# Index for element-level search.
index_params.add_index(
    field_name="chunks[emb]",
    index_name="chunks_emb_cosine",
    index_type="HNSW",
    metric_type="COSINE",
    params={
        "M": 16,
        "efConstruction": 200,
    },
)

client.create_index(
    collection_name="tech_articles",
    index_params=index_params,
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Arrays;
import java.util.Map;

client.createIndex(CreateIndexReq.builder()
        .collectionName("tech_articles")
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("chunks[emb_list_vector]")
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
                        .indexName("chunks_emb_list_max_sim")
                        .extraParams(Map.of("M", 16, "efConstruction", 200))
                        .build(),
                IndexParam.builder().fieldName("chunks[emb]")
                        .indexType(IndexParam.IndexType.HNSW)
                        .metricType(IndexParam.MetricType.COSINE)
                        .indexName("chunks_emb_cosine")
                        .extraParams(Map.of("M", 16, "efConstruction", 200))
                        .build()))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[emb_list_vector]", index.NewHNSWIndex(entity.MaxSimCosine, 16, 200)).WithIndexName("chunks_emb_list_max_sim"))
if err != nil {
    fmt.Println(err.Error())
    return
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[emb]", index.NewHNSWIndex(entity.COSINE, 16, 200)).WithIndexName("chunks_emb_cosine"))
if err != nil {
    fmt.Println(err.Error())
    return
}
```

```rust
use milvus::v2::prelude::*;

let request = CreateIndexRequest::builder()
        .collection_name("tech_articles")
        .index_params(vec![
            IndexParam::new().field_name("chunks[emb_list_vector]")
                .index_name("chunks_emb_list_max_sim")
                .index_type(IndexType::Hnsw)
                .metric_type(MetricType::MaxSimCosine)
                .extra_params(std::collections::HashMap::from([("M".into(), "16".into()), ("efConstruction".into(), "200".into())])),
            IndexParam::new().field_name("chunks[emb]")
                .index_name("chunks_emb_cosine")
                .index_type(IndexType::Hnsw)
                .metric_type(MetricType::Cosine)
                .extra_params(std::collections::HashMap::from([("M".into(), "16".into()), ("efConstruction".into(), "200".into())])),
        ])
        .build()?;
client.create_index(request).await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc emb_list_index("chunks[emb_list_vector]", "chunks_emb_list_max_sim",
    milvus::IndexType::HNSW, milvus::MetricType::MAX_SIM_COSINE);
milvus::IndexDesc emb_index("chunks[emb]", "chunks_emb_cosine",
    milvus::IndexType::HNSW, milvus::MetricType::COSINE);

emb_list_index.AddExtraParam("M", "16");
emb_list_index.AddExtraParam("efConstruction", "200");
emb_index.AddExtraParam("M", "16");
emb_index.AddExtraParam("efConstruction", "200");

milvus::CreateIndexRequest vector_request;
vector_request.WithCollectionName("tech_articles");
vector_request.WithIndexes({emb_list_index, emb_index});

status = client->CreateIndex(vector_request);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[emb_list_vector]",
  index_name: "chunks_emb_list_max_sim",
  index_type: "HNSW",
  params: { M: 16, efConstruction: 200 },
  metric_type: "MAX_SIM_COSINE",
});

await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[emb]",
  index_name: "chunks_emb_cosine",
  index_type: "HNSW",
  params: { M: 16, efConstruction: 200 },
  metric_type: "COSINE",
});
```

```csharp
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "tech_articles",
    Indexes = new[]
    {
        new IndexParam("chunks[emb_list_vector]", "chunks_emb_list_max_sim", IndexType.Hnsw, MetricType.MaxSimCosine) { ExtraParams = { ["M"] = 16, ["efConstruction"] = 200 } },
        new IndexParam("chunks[emb]", "chunks_emb_cosine", IndexType.Hnsw, MetricType.Cosine) { ExtraParams = { ["M"] = 16, ["efConstruction"] = 200 } }
    }
});
```

```bash
curl --request POST \
--url "http://localhost:19530/v2/vectordb/indexes/create" \
--header "Authorization: Bearer root:Milvus" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "indexParams": [
        {
            "fieldName": "chunks[emb_list_vector]",
            "indexName": "chunks_emb_list_max_sim",
            "metricType": "MAX_SIM_COSINE",
            "params": { "index_type": "HNSW", "M": "16", "efConstruction": "200" }
        },
        {
            "fieldName": "chunks[emb]",
            "indexName": "chunks_emb_cosine",
            "metricType": "COSINE",
            "params": { "index_type": "HNSW", "M": "16", "efConstruction": "200" }
        }
    ]
}'
```


<div class="alert note">

Warning
Do not create a `MAX_SIM*` index and a regular vector-metric index on the same vector subfield. If both search modes are required, write vectors to two separate vector subfields and create one index on each subfield.

</div>

## Create scalar indexes

Create scalar indexes on StructArray scalar subfields when you use them in filters. Use the same `structArray[subfield]` path syntax.


<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="chunks[section]",
    index_name="chunks_section_inverted",
    index_type="INVERTED",
)

index_params.add_index(
    field_name="chunks[has_code]",
    index_name="chunks_has_code_inverted",
    index_type="INVERTED",
)

index_params.add_index(
    field_name="chunks[quality_score]",
    index_name="chunks_quality_score_sort",
    index_type="STL_SORT",
)

index_params.add_index(
    field_name="chunks[page]",
    index_name="chunks_page_sort",
    index_type="STL_SORT",
)

client.create_index(
    collection_name="tech_articles",
    index_params=index_params,
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Arrays;

client.createIndex(CreateIndexReq.builder()
        .collectionName("tech_articles")
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("chunks[section]").indexType(IndexParam.IndexType.INVERTED)
                        .indexName("chunks_section_inverted").build(),
                IndexParam.builder().fieldName("chunks[has_code]").indexType(IndexParam.IndexType.INVERTED)
                        .indexName("chunks_has_code_inverted").build(),
                IndexParam.builder().fieldName("chunks[quality_score]").indexType(IndexParam.IndexType.STL_SORT)
                        .indexName("chunks_quality_score_sort").build(),
                IndexParam.builder().fieldName("chunks[page]").indexType(IndexParam.IndexType.STL_SORT)
                        .indexName("chunks_page_sort").build()))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[section]", index.NewInvertedIndex()).WithIndexName("chunks_section_inverted"))
if err != nil {
    fmt.Println(err.Error())
    return
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[has_code]", index.NewInvertedIndex()).WithIndexName("chunks_has_code_inverted"))
if err != nil {
    fmt.Println(err.Error())
    return
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[quality_score]", index.NewSortedIndex()).WithIndexName("chunks_quality_score_sort"))
if err != nil {
    fmt.Println(err.Error())
    return
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tech_articles", "chunks[page]", index.NewSortedIndex()).WithIndexName("chunks_page_sort"))
if err != nil {
    fmt.Println(err.Error())
    return
}
```

```rust
use milvus::v2::prelude::*;

let request = CreateIndexRequest::builder()
        .collection_name("tech_articles")
        .index_params(vec![
            IndexParam::new().field_name("chunks[section]").index_name("chunks_section_inverted").index_type(IndexType::Inverted),
            IndexParam::new().field_name("chunks[has_code]").index_name("chunks_has_code_inverted").index_type(IndexType::Inverted),
            IndexParam::new().field_name("chunks[quality_score]").index_name("chunks_quality_score_sort").index_type(IndexType::StlSort),
            IndexParam::new().field_name("chunks[page]").index_name("chunks_page_sort").index_type(IndexType::StlSort),
        ])
        .build()?;
client.create_index(request).await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc section_index("chunks[section]", "chunks_section_inverted",
    milvus::IndexType::INVERTED);
milvus::IndexDesc has_code_index("chunks[has_code]", "chunks_has_code_inverted",
    milvus::IndexType::INVERTED);
milvus::IndexDesc quality_index("chunks[quality_score]", "chunks_quality_score_sort",
    milvus::IndexType::STL_SORT);
milvus::IndexDesc page_index("chunks[page]", "chunks_page_sort",
    milvus::IndexType::STL_SORT);

milvus::CreateIndexRequest scalar_request;
scalar_request.WithCollectionName("tech_articles");
scalar_request.WithIndexes({section_index, has_code_index, quality_index, page_index});

status = client->CreateIndex(scalar_request);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[section]",
  index_name: "chunks_section_inverted",
  index_type: "INVERTED",
});

await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[has_code]",
  index_name: "chunks_has_code_inverted",
  index_type: "INVERTED",
});

await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[quality_score]",
  index_name: "chunks_quality_score_sort",
  index_type: "STL_SORT",
});

await client.createIndex({
  collection_name: "tech_articles",
  field_name: "chunks[page]",
  index_name: "chunks_page_sort",
  index_type: "STL_SORT",
});
```

```csharp
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "tech_articles",
    Indexes = new[]
    {
        new IndexParam("chunks[section]", "chunks_section_inverted", IndexType.Inverted),
        new IndexParam("chunks[has_code]", "chunks_has_code_inverted", IndexType.Inverted),
        new IndexParam("chunks[quality_score]", "chunks_quality_score_sort", IndexType.StlSort),
        new IndexParam("chunks[page]", "chunks_page_sort", IndexType.StlSort)
    }
});
```

```bash
curl --request POST \
--url "http://localhost:19530/v2/vectordb/indexes/create" \
--header "Authorization: Bearer root:Milvus" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "indexParams": [
        { "fieldName": "chunks[section]", "indexName": "chunks_section_inverted", "params": { "index_type": "INVERTED" } },
        { "fieldName": "chunks[has_code]", "indexName": "chunks_has_code_inverted", "params": { "index_type": "INVERTED" } },
        { "fieldName": "chunks[quality_score]", "indexName": "chunks_quality_score_sort", "params": { "index_type": "STL_SORT" } },
        { "fieldName": "chunks[page]", "indexName": "chunks_page_sort", "params": { "index_type": "STL_SORT" } }
    ]
}'
```


Scalar indexes are optional but useful when StructArray scalar subfields appear frequently in filters, such as `element_filter(chunks, $[quality_score] > 0.9)` or `MATCH_ANY(chunks, $[section] == "index")`.

## Applicable metric types

For EmbeddingList search, choose the `MAX_SIM*` metric corresponding to the per-vector comparison: `MAX_SIM_COSINE` (also named `MAX_SIM`), `MAX_SIM_IP`, or `MAX_SIM_L2` for dense vectors, and `MAX_SIM_HAMMING` or `MAX_SIM_JACCARD` for binary vectors. These metrics compare embedding lists and return entity-level results. For element-level search, use the corresponding regular metric listed below.

## Index metric compatibility

Use the following tables to choose an index type and metric type for a StructArray vector subfield. Start from the target, then choose the metric family by search mode.

Choose a Milvus index type and metric type from the following compatibility tables.

### EmbeddingList search

EmbeddingList search uses `MAX_SIM*` metrics. It treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results.


| Vector subfield data type | Index type | Metric type |
| --- | --- | --- |
| `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR` | `IVF_FLAT`, `IVF_FLAT_CC`, `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ`, `DISKANN` | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2` |
| `INT8_VECTOR` | `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ` | `MAX_SIM`, `MAX_SIM_COSINE`, `MAX_SIM_IP`, `MAX_SIM_L2` |
| `BINARY_VECTOR` | `HNSW` | `MAX_SIM_HAMMING`, `MAX_SIM_JACCARD` |


### Element-level search

Element-level search uses regular vector metrics. It searches each Struct element independently and can return the matched element offset.


| Vector subfield data type | Index type | Metric type |
| --- | --- | --- |
| `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR` | `FLAT`, `IVF_FLAT`, `IVF_FLAT_CC`, `IVF_SQ8`, `IVF_SQ_CC`, `IVF_PQ`, `SCANN`, `IVF_RABITQ`, `IVF_RABITQ_FASTSCAN`, `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ`, `DISKANN` | `L2`, `IP`, `COSINE` |
| `INT8_VECTOR` | `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ` | `L2`, `IP`, `COSINE` |
| `BINARY_VECTOR` | `HNSW` | `HAMMING`, `JACCARD` |
| `BINARY_VECTOR` | `BIN_FLAT` | `HAMMING`, `JACCARD`, `SUBSTRUCTURE`, `SUPERSTRUCTURE`, `MHJACCARD` |
| `BINARY_VECTOR` | `BIN_IVF_FLAT` | `HAMMING`, `JACCARD` |


For version-specific support and other limits, see [StructArray Limits](structarray-limits.md).

## Verify indexes

After creating indexes, describe the collection or list indexes to confirm that the expected subfield paths are indexed.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
indexes = client.list_indexes(
    collection_name="tech_articles",
)

print(indexes)
```

```java
import io.milvus.v2.service.index.request.ListIndexesReq;
import java.util.List;

List<String> indexes = client.listIndexes(ListIndexesReq.builder()
        .collectionName("tech_articles")
        .build());
System.out.println(indexes);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

indexes, err := cli.ListIndexes(ctx, milvusclient.NewListIndexOption("tech_articles"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Println(indexes)
```

```rust
use milvus::v2::prelude::*;

let resp = client.list_indexes(ListIndexesRequest::builder()
        .collection_name("tech_articles").build()?).await?;
println!("{:?}", resp.index_names());
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

milvus::ListIndexesResponse list_resp;
status = client->ListIndexes(milvus::ListIndexesRequest()
                                .WithCollectionName("tech_articles"),
                            list_resp);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

for (const auto& name : list_resp.IndexNames()) {
    std::cout << name << std::endl;
}
```

```javascript
const indexes = await client.listIndexes({
  collection_name: "tech_articles",
});
console.log(indexes);
```

```csharp
using Milvus.Client.V2.Requests.Index;

var indexes = await client.ListIndexesAsync(new ListIndexesReq
{
    CollectionName = "tech_articles"
});
Console.WriteLine(string.Join(", ", indexes.IndexNames));
```

```bash
curl --request POST \
--url "http://localhost:19530/v2/vectordb/indexes/list" \
--header "Authorization: Bearer root:Milvus" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles"
}'
```

After creating both the vector and scalar indexes above, the list response should contain the following names, in any order. The formatting depends on the SDK:

```plaintext
chunks_emb_list_max_sim
chunks_emb_cosine
chunks_section_inverted
chunks_has_code_inverted
chunks_quality_score_sort
chunks_page_sort
```

Describe the `chunks_emb_cosine` index created above to inspect its target field and configuration. The response structure and printed representation differ between SDKs.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
index = client.describe_index(
    collection_name="tech_articles",
    index_name="chunks_emb_cosine",
)

print(index)
```

```java
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

DescribeIndexResp index = client.describeIndex(DescribeIndexReq.builder()
        .collectionName("tech_articles")
        .indexName("chunks_emb_cosine")
        .build());
System.out.println(index);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

indexDesc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption("tech_articles", "chunks_emb_cosine"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Println(indexDesc.IndexType())
```

```rust
use milvus::v2::prelude::*;

let resp = client.describe_index(DescribeIndexRequest::builder()
        .collection_name("tech_articles").index_name("chunks_emb_cosine").build()?).await?;
for description in resp.indexes() {
    println!("{:?}", description);
}
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

milvus::DescribeIndexResponse desc_resp;
status = client->DescribeIndex(milvus::DescribeIndexRequest()
                                   .WithCollectionName("tech_articles")
                                   .WithIndexName("chunks_emb_cosine"),
                               desc_resp);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

for (const auto& desc : desc_resp.Descs()) {
    std::cout << desc.FieldName() << ": " << desc.IndexName() << std::endl;
}
```

```javascript
const index = await client.describeIndex({
  collection_name: "tech_articles",
  index_name: "chunks_emb_cosine",
});
console.log(index);
```

```csharp
using Milvus.Client.V2.Requests.Index;

var index = await client.DescribeIndexAsync(new DescribeIndexReq
{
    CollectionName = "tech_articles",
    IndexName = "chunks_emb_cosine"
});
foreach (var description in index.Indexes)
{
    Console.WriteLine($"{description.FieldName}: {description.IndexName}");
}
```

```bash
curl --request POST \
--url "http://localhost:19530/v2/vectordb/indexes/describe" \
--header "Authorization: Bearer root:Milvus" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "indexName": "chunks_emb_cosine"
}'
```

The list response contains the index names; the describe response identifies `chunks[emb]` and the index configuration. Inspect the response or status for errors before using it.

## Index rules

| Rule | Explanation |
| --- | --- |
| Use path syntax for subfield indexes. | Index `chunks[emb]`, not `emb` or `chunks.emb`. |
| One vector subfield accepts one index. | Use separate vector subfields if you need different metric families. |
| Use `MAX_SIM*` metrics for EmbeddingList search. | EmbeddingList query data requires an index built with a `MAX_SIM*` metric. |
| Use regular vector metrics for element-level search. | Element-level search uses regular vector query data and metrics such as `COSINE`, `IP`, or `L2`. |
| Index scalar subfields that appear in filters. | Use scalar index types supported by your target. |
| Keep vector-field limits in mind. | The total number of vector fields and vector subfields is limited. See StructArray Limits before adding many vector subfields. |

## Common mistakes

- Creating an index on `chunks.emb` instead of `chunks[emb]`.

- Creating only a `MAX_SIM*` index and then trying to run element-level search on the same subfield.

- Creating only a regular vector index and then trying to run EmbeddingList search on the same subfield.

- Reusing one vector subfield for both `MAX_SIM*` and regular vector metrics.

- Forgetting scalar indexes for heavily used StructArray filters.

- Indexing a StructArray subfield that does not exist in the Struct schema.

## Next steps

1. To run entity-level EmbeddingList search or element-level vector search, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

2. To filter StructArray scalar subfields during search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

3. To review index and metric limits, read [StructArray Limits](structarray-limits.md).
