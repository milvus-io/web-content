---
id: trie.md
title: "TRIE"
summary: "Use TRIE to accelerate exact string lookups and prefix filters on VARCHAR fields."
---

# TRIE

`TRIE` organizes strings in a prefix tree to accelerate exact lookups and prefix filters such as `name LIKE "abc%"`.

## Overview

### Supported data types

Only [VARCHAR fields](string.md). For JSON string paths, choose a compatible index in [JSON Indexing](json-indexing.md).

<a id="Queries-accelerated-by-TRIE"></a>

<a id="Supported-filters"></a>

### Filter acceleration

A `TRIE` index can help evaluate the following conditions on a `VARCHAR` field. The expressions are examples:

| Filters that can use the index | Example expression |
| --- | --- |
| Equality (`==`, `!=`) | `category == "books"` |
| Membership (`in`, `not in`) | `category in ["books", "electronics"]` |
| Prefix match | `category LIKE "elec%"` |
| Range (`<`, `<=`, `>`, `>=`) | `category >= "a" and category < "m"` |

For expression syntax, see [Basic Operators](basic-operators.md) and [Pattern Matching](pattern-matching.md).

Range evaluation may visit multiple indexed strings. Suffix, substring, general `LIKE`, and regex patterns can also be evaluated against the indexed strings, but they may require visiting many distinct values. For substring or regex workloads, compare [NGRAM](ngram.md) using its pattern eligibility rules.

<a id="Best-practices"></a>

Compare query latency with representative string lengths, prefixes, and result counts.

<a id="Usage-notes"></a>

<div class="alert note">

> These are index capabilities, not limits on valid filter expressions. See [Scalar Index](scalar_index.md#Filter-execution) for shared lookup constraints. For `AND`, `OR`, `NOT`, and NULL tests (`IS NULL`, `IS NOT NULL`), see [Basic Operators](basic-operators.md).

</div>


<a id="How-it-works"></a>

### How TRIE works

<details>
<summary><strong>View the prefix tree lookup process</strong></summary>

During index building, Milvus inserts strings into a prefix tree and persists it. Characters are stored along edges, shared prefixes are stored once, and each terminal node records the entity IDs with that string.

For equality, traverse the tree to the exact string's terminal node. For a prefix, find the prefix node and collect IDs from its subtree. The query executor receives the matching entity IDs.

Traversing to the string or prefix node depends on the pattern length; returning matches also requires collecting the associated entity IDs.

</details>

## Create a TRIE index

Set `index_type` to `TRIE`; no extra index parameters are required:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Assume you have defined a VARCHAR field named "category" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add TRIE index on the "category" field
# highlight-start
index_params.add_index(
    field_name="category",     # Target VARCHAR field
    index_type="TRIE",         # Index type is TRIE
    index_name="category_trie" # Optional, name your index
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="product_catalog",
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
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName("product_catalog")
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName("category")
                .indexType(IndexParam.IndexType.TRIE)
                .indexName("category_trie")
                .build()))
        .build());
```

```go
import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
})

if err != nil {
    log.Fatal("failed to connect to milvus server: ", err.Error())
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("product_catalog", "category", index.NewTrieIndex()).WithIndexName("category_trie"))

if err != nil {
    log.Fatal("failed to create index: ", err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530");

let client = ClientV2::new(&config).await?;

client
    .create_index(
        CreateIndexRequest::builder()
            .collection_name("product_catalog")
            .index_param(
                IndexParam::new()
                    .field_name("category")
                    .index_type(IndexType::Trie)
                    .index_name("category_trie"),
            )
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

auto status = client->Connect(milvus::ConnectParam("http://localhost:19530"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateIndex(milvus::CreateIndexRequest().WithCollectionName("product_catalog")
        .AddIndex(milvus::IndexDesc("category", "category_trie", milvus::IndexType::TRIE)));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.createIndex({
    collection_name: "product_catalog",
    field_name: "category",
    index_type: "TRIE",
    index_name: "category_trie",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "product_catalog",
    "indexParams": [
        {
            "fieldName": "category",
            "indexName": "category_trie",
            "indexType": "TRIE"
        }
    ]
}'

# {
#     "code": 0,
#     "data": {}
# }
```

## Drop an index

Use the `drop_index()` method to remove an existing index from a collection.

<div class="alert note">

> For release requirements when dropping a scalar index, see [Scalar Index](scalar_index.md#Drop-index-compatibility).

</div>


<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_index(
    collection_name="product_catalog",   # Name of the collection
    index_name="category_trie"           # Name of the index to drop
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.index.request.DropIndexReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

client.dropIndex(DropIndexReq.builder()
        .collectionName("product_catalog")
        .indexName("category_trie")
        .build());
```

```go
import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
})

if err != nil {
    log.Fatal("failed to connect to milvus server: ", err.Error())
}

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("product_catalog", "category_trie"))

if err != nil {
    log.Fatal("failed to drop index: ", err.Error())
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530");

let client = ClientV2::new(&config).await?;

client
    .drop_index(
        DropIndexRequest::builder()
            .collection_name("product_catalog")
            .index_name("category_trie")
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

auto status = client->Connect(milvus::ConnectParam("http://localhost:19530"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropIndex(milvus::DropIndexRequest()
        .WithCollectionName("product_catalog")
        .WithIndexName("category_trie"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.dropIndex({
    collection_name: "product_catalog",
    index_name: "category_trie",
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "product_catalog",
    "indexName": "category_trie"
}'

# {
#     "code": 0,
#     "data": {}
# }
```
