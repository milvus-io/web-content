---
id: rtree.md
title: "RTREE"
summary: "The RTREE index is a tree-based data structure that accelerates queries on GEOMETRY fields. If your collection stores geometric objects such as points, lines, or polygons in Well-known text (WKT) format and you want to accelerate spatial filtering, RTREE is an ideal choice."
beta: Milvus 2.6.4+
---

# RTREE

The `RTREE` index is a tree-based data structure that accelerates queries on `GEOMETRY` fields in Milvus. If your collection stores geometric objects such as points, lines, or polygons in [Well-known text (WKT)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) format and you want to accelerate spatial filtering, `RTREE` is an ideal choice.

## How it works

Milvus uses an `RTREE` index to efficiently organize and filter geometry data, following a two-phase process:

### Phase 1: Build the index

1. **Create leaf nodes:** For each geometry object, calculate its [Minimum Bounding Rectangle](https://en.wikipedia.org/wiki/Minimum_bounding_rectangle) (MBR), which is the smallest rectangle that fully contains the object, and store it as a leaf node.

1. **Group into larger boxes:** Cluster nearby leaf nodes together and wrap each group with a new MBR, forming internal nodes. For example, group **B** contains **D** and **E**; group **C** contains **F** and **G**.

1. **Add the root node:** Add a root node whose MBR covers all internal groups, resulting in a height-balanced tree structure.

![How Retree Works](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/how-retree-works.png)

### Phase 2: Accelerate queries

1. **Form the query MBR:** Calculate the MBR for your query geometry.

1. **Prune branches:** Starting at the root, compare the query MBR to each internal node. Skip any branches whose MBR does not intersect with the query MBR.

1. **Collect candidates:** Descend into intersecting branches to gather candidate leaf nodes.

1. **Exact match:** For each candidate, perform an exact spatial predicate to determine true matches.

## Create an RTREE index

You can create an `RTREE` index on a `GEOMETRY` field defined in your collection schema.

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
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530") # Replace with your server address

# Assume you have defined a GEOMETRY field named "geo" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add RTREE index on the "geo" field
# highlight-start
index_params.add_index(
    field_name="geo",
    index_type="RTREE",      # Spatial index for GEOMETRY
    index_name="rtree_geo",  # Optional, name your index
    params={}                # No extra params needed
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="geo_demo",
    index_params=index_params
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

IndexParam indexParam = IndexParam.builder()
        .fieldName("geo")
        .indexName("rtree_geo")
        .indexType(IndexParam.IndexType.RTREE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName("geo_demo")
        .indexParams(Collections.singletonList(indexParam))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer cli.Close(ctx)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("geo_demo", "geo", index.NewRTreeIndex()).
    WithIndexName("rtree_geo"))
if err != nil {
    fmt.Println(err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let index_params = vec![
    IndexParam::new()
        .field_name("geo")
        .index_name("rtree_geo")
        .index_type(IndexType::Rtree),
];

let create_index_req = CreateIndexRequest::builder()
    .collection_name("geo_demo")
    .index_params(index_params)
    .build()?;

client.create_index(create_index_req).await?;
```

```c++
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::IndexDesc index("geo", "rtree_geo", milvus::IndexType::RTREE);

status = client->CreateIndex(milvus::CreateIndexRequest()
                                 .WithCollectionName("geo_demo")
                                 .WithIndexes({index}));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, IndexType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

await client.createIndex({
    collection_name: "geo_demo",
    field_name: "geo",
    index_type: IndexType.RTREE,
    index_name: "rtree_geo",
    params: {},
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

// Assume you have defined a GEOMETRY field named "geo" in your collection schema

// Prepare index parameters
var indexParam = new IndexParam(
    fieldName: "geo",
    indexName: "rtree_geo",
    indexType: IndexType.Rtree);

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "geo_demo",
    Indexes = [indexParam]
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "geo_demo",
    "indexParams": [
        {
            "fieldName": "geo",
            "indexName": "rtree_geo",
            "indexType": "RTREE",
            "params": {}
        }
    ]
}'
```

## Query with RTREE

You filter with geometry operators in the `filter` expression. When an `RTREE` exists on the target `GEOMETRY` field, Milvus uses it to prune candidates automatically. Without the index, the filter falls back to a full scan.

For a full list of available geometry-specific operators, refer to [Geometry Operators](geometry-operators.md).

### Example 1: Filter only

Find all geometric objects within a given polygon:

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
filter_expr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')"

res = client.query(
    collection_name="geo_demo",
    filter=filter_expr,
    output_fields=["id", "geo"],
    limit=10
)
print(res)   # Expected: a list of rows where geo is entirely inside the polygon
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String filter_expr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("geo_demo")
        .filter(filter_expr)
        .outputFields(Arrays.asList("id", "geo"))
        .limit(10)
        .build());
System.out.println(resp);
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter_expr := "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')"

_, err = cli.Query(ctx, milvusclient.NewQueryOption("geo_demo").
    WithFilter(filter_expr).
    WithOutputFields("id", "geo").
    WithLimit(10))
if err != nil {
    fmt.Println(err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let filter_expr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')";

let query_req = QueryRequest::builder()
    .collection_name("geo_demo")
    .filter(filter_expr)
    .output_fields(vec!["id", "geo"])
    .limit(10)
    .build()?;

let res = client.query(query_req).await?;
println!("{:?}", res.results());
```

```c++
#include <iostream>
#include <string>

std::string filter_expr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')";

milvus::QueryResponse response;
status = client->Query(milvus::QueryRequest()
                           .WithCollectionName("geo_demo")
                           .WithFilter(filter_expr)
                           .WithOutputFields({"id", "geo"})
                           .WithLimit(10),
                       response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const filter_expr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')";

const res = await client.query({
    collection_name: "geo_demo",
    filter: filter_expr,
    output_fields: ["id", "geo"],
    limit: 10,
});
console.log(res);
```

```csharp
using Milvus.Client.V2.Requests.Dql;

string filterExpr = "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')";

QueryResp res = await client.QueryAsync(new QueryReq
{
    CollectionName = "geo_demo",
    Expression = filterExpr,
    Parameters = new QueryParameters
    {
        OutputFields = { "id", "geo" },
        Limit = 10
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d @- <<'EOF'
{
    "collectionName": "geo_demo",
    "filter": "ST_WITHIN(geo, 'POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')",
    "outputFields": ["id", "geo"],
    "limit": 10
}
EOF
```

### Example 2: Vector search + spatial filter

Find the nearest vectors that also intersect a line:

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
# Assume you've also created an index on "vec" and loaded the collection.
query_vec = [[0.1, 0.2, 0.3, 0.4, 0.5]]
filter_expr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')"

hits = client.search(
    collection_name="geo_demo",
    data=query_vec,
    limit=5,
    filter=filter_expr,
    output_fields=["id", "geo"]
)
print(hits)  # Expected: top-k by vector similarity among rows whose geo intersects the line
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

float[] query_vec = {0.1f, 0.2f, 0.3f, 0.4f, 0.5f};
String filter_expr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("geo_demo")
        .data(Collections.singletonList(new FloatVec(query_vec)))
        .topK(5)
        .filter(filter_expr)
        .outputFields(Arrays.asList("id", "geo"))
        .build());
System.out.println(resp);
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

query_vec := []entity.Vector{entity.FloatVector{0.1, 0.2, 0.3, 0.4, 0.5}}
filter_expr := "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')"

_, err = cli.Search(ctx, milvusclient.NewSearchOption("geo_demo", 5, query_vec).
    WithFilter(filter_expr).
    WithOutputFields("id", "geo"))
if err != nil {
    fmt.Println(err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let query_vec = vec![0.1f32, 0.2, 0.3, 0.4, 0.5];
let filter_expr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')";

let search_req = SearchRequest::builder()
    .collection_name("geo_demo")
    .vector_field("vec")
    .vectors(SearchVectors::Float(vec![query_vec]))
    .filter(filter_expr)
    .output_fields(vec!["id", "geo"])
    .limit(5)
    .build()?;

let res = client.search(search_req).await?;
println!("{:?}", res.results());
```

```c++
#include <iostream>
#include <vector>
#include <string>

std::vector<float> query_vec = {0.1f, 0.2f, 0.3f, 0.4f, 0.5f};
std::string filter_expr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')";

milvus::SearchResponse response;
status = client->Search(milvus::SearchRequest()
                            .WithCollectionName("geo_demo")
                            .WithLimit(5)
                            .WithAnnsField("vec")
                            .WithFilter(filter_expr)
                            .WithOutputFields({"id", "geo"})
                            .AddFloatVector(query_vec),
                        response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const query_vec = [0.1, 0.2, 0.3, 0.4, 0.5];
const filter_expr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')";

const res = await client.search({
    collection_name: "geo_demo",
    anns_field: "vec",
    data: [query_vec],
    limit: 5,
    filter: filter_expr,
    output_fields: ["id", "geo"],
});
console.log(res);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Assume you've also created an index on "vec" and loaded the collection.
var queryVec = new ReadOnlyMemory<float>(new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f });
string filterExpr = "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')";

SearchResp hits = await client.SearchAsync(new SearchReq
{
    CollectionName = "geo_demo",
    Vectors = [queryVec],
    VectorFieldName = "vec",
    MetricType = MetricType.L2,
    Limit = 5,
    Parameters = new SearchParameters
    {
        Expression = filterExpr
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d @- <<'EOF'
{
    "collectionName": "geo_demo",
    "annsField": "vec",
    "data": [[0.1, 0.2, 0.3, 0.4, 0.5]],
    "limit": 5,
    "filter": "ST_INTERSECTS(geo, 'LINESTRING (1 1, 2 2)')",
    "outputFields": ["id", "geo"]
}
EOF
```

For more information on how to use a `GEOMETRY` field, refer to [Geometry Field](geometry-field.md).

## Drop an index

Use the `drop_index()` method to remove an existing index from a collection.

<div class="alert note">

- In **v2.6.3** or earlier, you must release the collection before dropping a scalar index.

- From **v2.6.4** or later, you can drop a scalar index directly once it’s no longer needed—no need to release the collection first.

</div>

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
client.drop_index(
    collection_name="geo_demo",   # Name of the collection
    index_name="rtree_geo" # Name of the index to drop
)
```

```java
import io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName("geo_demo")
        .indexName("rtree_geo")
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("geo_demo", "rtree_geo"))
if err != nil {
    fmt.Println(err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let drop_index_req = DropIndexRequest::builder()
    .collection_name("geo_demo")
    .index_name("rtree_geo")
    .build()?;

client.drop_index(drop_index_req).await?;
```

```c++
status = client->DropIndex(milvus::DropIndexRequest()
                               .WithCollectionName("geo_demo")
                               .WithIndexName("rtree_geo"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.dropIndex({
    collection_name: "geo_demo",
    index_name: "rtree_geo",
});
```

```csharp
using Milvus.Client.V2.Requests.Index;

await client.DropIndexAsync(new DropIndexReq
{
    CollectionName = "geo_demo", // Name of the collection
    IndexName = "rtree_geo" // Name of the index to drop
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "geo_demo",
    "indexName": "rtree_geo"
}'
```
