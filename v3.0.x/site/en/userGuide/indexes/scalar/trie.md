---
id: trie.md
title: "TRIE"
summary: "The TRIE index organizes VARCHAR field values in a tree structure to accelerate string equality and prefix matching. It is the fastest scalar index choice for exact lookups and prefix filters such as name LIKE \"abc%\"."
---

# TRIE

The `TRIE` index in Milvus organizes `VARCHAR` field values into a prefix tree (a *trie*). Each character in a string corresponds to an edge in the tree, and shared prefixes are stored only once. This structure makes exact string lookups and prefix matching fast, without scanning every value in the field.

Use the `TRIE` index if you frequently run queries with:

- Exact equality on string values, such as `category == "books"`

- Prefix filtering, such as `name LIKE "abc%"`

## Supported data types

- `VARCHAR` fields. For details, refer to [String Field](string.md).

`TRIE` is supported only on `VARCHAR` fields. To index a string value inside a `JSON` field, cast the path to `VARCHAR` and use the [NGRAM](ngram.md) index instead.

## How it works

Milvus implements `TRIE` in two phases:

1. **Build index**

    - During ingestion, Milvus reads each value of the indexed field.

    - The values are inserted into a trie: characters are stored along edges, and each terminal node records the entity IDs that share that string.

    - The completed tree is persisted as the index.

1. **Accelerate queries**

    - For equality, Milvus walks the tree character by character to reach the node for the exact value and returns its entity IDs.

    - For a prefix, Milvus walks to the node matching the prefix and collects the entity IDs in its subtree.

    - Matching entity IDs are passed to the query executor for final result assembly.

For equality and prefix filters, lookup cost is proportional to the string length rather than the number of entities, which keeps these queries fast on large collections.

## Create a TRIE index

You can create a `TRIE` index on a `VARCHAR` field. No extra parameters are required.

The example below shows how to create a `TRIE` index on a `VARCHAR` field:

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

## Queries accelerated by TRIE

The `TRIE` index accelerates the following filter patterns on a `VARCHAR` field:

- **Equality**

    ```python
    filter = 'category == "books"'
    ```

- **Membership**

    ```python
    filter = 'category in ["books", "electronics"]'
    ```

- **Prefix match**

    ```python
    filter = 'category LIKE "elec%"'
    ```

- **Range**

    ```python
    filter = 'category >= "a" and category < "m"'
    ```

    Range evaluation may visit multiple indexed strings.

Suffix, substring, and general `LIKE` patterns can also be evaluated against the indexed strings, but they may require visiting many distinct values. If your workload is dominated by substring or regex matching, consider the [FMINDEX](fmindex.md) or [NGRAM](ngram.md) index instead.

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

## Usage notes

- **Field types:** Works with `VARCHAR` fields only. For more information on data types, refer to [String Field](string.md).

- **Parameters:** No index parameters are needed.

- **Pattern matching:** `TRIE` is fastest for equality and prefix filters. Range filters are supported but may visit multiple indexed strings. Suffix, substring, and general `LIKE` patterns can be evaluated but may require scanning many indexed strings.

## Best practices

- Use `TRIE` when your filters are dominated by exact lookups or prefix matching.

- If your workload relies on substring (`LIKE "%abc%"`) or regex filters, use [FMINDEX](fmindex.md) for exact anchored matching or [NGRAM](ngram.md) for candidate narrowing instead.
