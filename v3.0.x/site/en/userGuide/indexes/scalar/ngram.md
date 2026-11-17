---
id: ngram.md
title: "NGRAM"
summary: "Use NGRAM for LIKE and eligible regex filters on VARCHAR fields and JSON string paths."
---

# NGRAM

`NGRAM` accelerates LIKE and eligible regex filters on `VARCHAR` fields and JSON string paths. It uses character sequences to narrow matching entities; some patterns require checking the original values.

Use it for prefix, suffix, substring, wildcard, or regex filters with usable literal text, such as `title LIKE "%vector%"` or `message =~ "error.*timeout"`. For syntax, see [Pattern Matching](pattern-matching.md).

## Overview

### Supported data types

`VARCHAR` fields and JSON paths cast to `VARCHAR`. JSON paths require `json_path` and `json_cast_type`; see [JSON Indexing](json-indexing.md).

<a id="Queries-accelerated-by-NGRAM"></a>

<a id="Supported-filters"></a>

<a id="Filter-expression-examples"></a>

### Filter acceleration

The query must target the indexed field or JSON path. The examples illustrate each pattern; acceleration depends on the conditions in the last column:

| Pattern | Example expression | Acceleration conditions and behavior |
| --- | --- | --- |
| Prefix or suffix literal | `text LIKE "database%"` or `text LIKE "%database"` | Requires at least `min_gram` characters; finds candidates, then checks original values. |
| Substring literal | `text LIKE "%database%"` | Requires at least `min_gram` characters. Returns exact matches within `[min_gram, max_gram]`; longer literals produce candidates for rechecking. |
| General LIKE | `text LIKE "%st%um%"` | Finds candidates when each non-empty literal fragment meets `min_gram`, then checks original values. |
| Regex | `text =~ "error.*timeout"` | Finds candidates when suitable literals can be extracted, then checks the full regex. |

For an indexed JSON string path, use the path in the expression, such as `json_field["body"] LIKE "%database%"`. See [Pattern Matching](pattern-matching.md#Common-LIKE-patterns) for LIKE examples and [regex examples](pattern-matching.md#Common-regex-patterns).

Without suitable literals, Milvus scans the data. `NGRAM` provides pattern lookup, not direct equality, membership, or range lookup. These rules apply after [query-planning simplifications](pattern-matching.md#Accelerate-pattern-matching-with-indexes).

<div class="alert note">

> These are index capabilities, not limits on valid filter expressions. See [Scalar Index](scalar_index.md#Filter-execution) for shared lookup constraints. For `AND`, `OR`, `NOT`, and NULL tests (`IS NULL`, `IS NOT NULL`), see [Basic Operators](basic-operators.md).

</div>


### Usage notes

N-gram decomposition is character-based, language-agnostic, and includes whitespace and punctuation. It preserves case. Wider gram ranges produce more grams and larger indexes; consider [mmap](mmap.md) for large posting lists when memory is tight.

<div class="alert note">

Regex patterns without fixed literals, such as `[a-z]+`, can fall back to scanning. Case-insensitive patterns with `(?i)` may also skip `NGRAM` optimization. Candidate verification uses the full RE2 pattern, preserving the regex's match results.

</div>

### Memory considerations

For a rough loaded-memory estimate, use `S` bytes, where `S` is the built index size before storage compression. Obtain `S` by building on representative data; raw text size is not a substitute. Gram ranges and data distribution affect the built size.

These rough estimates cover loaded index memory with memory mapping disabled. Calculate them per segment, then sum across loaded segments and replicas.

<div class="alert note">

> Allow extra memory for loaded field data, vector indexes, collection and index overhead, and temporary allocations. Validate with representative data and queries; arrays, JSON, older index formats, and memory mapping require separate measurement.

</div>


<a id="How-it-works"></a>

### How NGRAM works

<a id="Phase-1-Build-the-index"></a>
<a id="Phase-2-Accelerate-queries"></a>

<details>
<summary><strong>View the build and query process</strong></summary>

An n-gram is an overlapping sequence of characters. With `n=3`, `"Milvus"` produces `"Mil"`, `"ilv"`, `"lvu"`, and `"vus"`.

**Phase 1: Build the index**

For each string, generate grams of every length from `min_gram` through `max_gram`, inclusive. With `min_gram=2` and `max_gram=3`, `"AI database"` produces 2-grams such as `AI`, `I_`, `_d`, and `da`, and 3-grams such as `AI_`, `I_d`, `_da`, and `dat`. Here, `_` represents a space:

![Build Ngram Index](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png)

Map each gram to the entity IDs containing it. For example, if `"AI"` occurs in entities 1, 5, 6, 8, and 9, store `{"AI": [1, 5, 6, 8, 9]}`:

![Build Ngram Index 2](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png)

**Phase 2: Accelerate queries**

Extract literal text from the LIKE or eligible regex pattern. For example, `"%database%"` yields `database`, and `"error.*timeout"` contains `error` and `timeout`. For a literal of length `L`:

- If `L < min_gram`, the literal cannot use the index.
- If `min_gram ≤ L ≤ max_gram`, look up the literal as one gram.
- If `L > max_gram`, split it into overlapping `max_gram`-length grams.

Intersect the grams' entity lists to find candidates, then apply the original filter when rechecking is required. A simple substring literal within `[min_gram, max_gram]` returns exact matches without rechecking:

![Accelerate Queries](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png)

</details>

## Create an NGRAM index

You can create an NGRAM index on a `VARCHAR` field or on a specific path inside a `JSON` field. Specify both `min_gram` and `max_gram` as positive integers, with `min_gram <= max_gram`.

The parameters control the indexed character sequences. Rebuild the index to change them:

| Parameter | Meaning |
| --- | --- |
| `min_gram` | Minimum sequence length in characters. It also sets the minimum literal length that can use the index. |
| `max_gram` | Maximum sequence length in characters. Longer query literals are split into overlapping sequences of this length. |

### Example 1: Create on a VARCHAR field

For a `VARCHAR` field, you simply specify the `field_name` and configure `min_gram` and `max_gram`.

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

client = MilvusClient(uri="http://localhost:19530") # Replace with your server address

# Assume you have defined a VARCHAR field named "text" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add NGRAM index on the "text" field
# highlight-start
index_params.add_index(
    field_name="text",   # Target VARCHAR field
    index_type="NGRAM",           # Index type is NGRAM
    index_name="ngram_index",     # Custom name for the index
    min_gram=2,                   # Minimum substring length (e.g., 2-gram: "st")
    max_gram=3                    # Maximum substring length (e.g., 3-gram: "sta")
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="Documents",
    index_params=index_params
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

Map<String, Object> params = new HashMap<>();
params.put("min_gram", "2");
params.put("max_gram", "3");

client.createIndex(CreateIndexReq.builder()
        .collectionName("Documents")
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("text").indexType(IndexParam.IndexType.NGRAM)
                        .indexName("ngram_index")
                        .extraParams(params)
                        .build()))
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
    fmt.Println(err)
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("Documents", "text", index.NewNgramIndex(2, 3)).WithIndexName("ngram_index"))
if err != nil {
    fmt.Println(err)
}
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let request = CreateIndexRequest::builder()
    .collection_name("Documents")
    .index_params(vec![IndexParam::new()
        .field_name("text")
        .index_name("ngram_index")
        .index_type(IndexType::Ngram)
        .extra_params(HashMap::from([
            ("min_gram".to_string(), "2".to_string()),
            ("max_gram".to_string(), "3".to_string()),
        ]))])
    .build()?;
client.create_index(request).await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::IndexDesc ngram_index("text", "ngram_index", milvus::IndexType::NGRAM);
ngram_index.AddExtraParam("min_gram", "2");
ngram_index.AddExtraParam("max_gram", "3");

milvus::CreateIndexRequest create_request;
create_request.WithCollectionName("Documents");
create_request.WithIndexes({ngram_index});
create_request.WithSync(true);

status = client->CreateIndex(create_request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

await client.createIndex({
    collection_name: "Documents",
    field_name: "text",
    index_name: "ngram_index",
    index_type: "NGRAM",
    params: { min_gram: 2, max_gram: 3 },
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
    "collectionName": "Documents",
    "indexParams": [
        {
            "fieldName": "text",
            "indexName": "ngram_index",
            "params": {
                "index_type": "NGRAM",
                "min_gram": 2,
                "max_gram": 3
            }
        }
    ]
}'
```

This configuration generates 2-grams and 3-grams for each string in `text` and stores them in the inverted index.

### Example 2: Create on a JSON path

For a JSON path, use a `VARCHAR` cast (case-insensitive) and the gram settings below. See [JSON Indexing](json-indexing.md#Index-requirements) for path and cast requirements.

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
# Assume you have defined a JSON field named "json_field" in your collection schema, with a JSON path named "body"

# Prepare index parameters
index_params = client.prepare_index_params()

# Add NGRAM index on a JSON field
# highlight-start
index_params.add_index(
    field_name="json_field",              # Target JSON field
    index_type="NGRAM",                   # Index type is NGRAM
    index_name="json_ngram_index",        # Custom index name
    min_gram=2,                           # Minimum n-gram length
    max_gram=4,                           # Maximum n-gram length
    params={
        "json_path": "json_field[\"body\"]",  # Path to the value inside the JSON field
        "json_cast_type": "varchar"                  # Required: cast the value to varchar
    }
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="Documents",
    index_params=index_params
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> params = new HashMap<>();
params.put("min_gram", "2");
params.put("max_gram", "4");
params.put("json_path", "json_field[\"body\"]");
params.put("json_cast_type", "varchar");

client.createIndex(CreateIndexReq.builder()
        .collectionName("Documents")
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("json_field").indexType(IndexParam.IndexType.NGRAM)
                        .indexName("json_ngram_index")
                        .extraParams(params)
                        .build()))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

opt := milvusclient.NewCreateIndexOption("Documents", "json_field", index.NewNgramIndex(2, 4)).
    WithIndexName("json_ngram_index")
opt.WithExtraParam("json_path", `json_field["body"]`)
opt.WithExtraParam("json_cast_type", "varchar")

_, err = cli.CreateIndex(ctx, opt)
if err != nil {
    fmt.Println(err)
}
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

    let request = CreateIndexRequest::builder()
        .collection_name("Documents")
        .index_params(vec![IndexParam::new()
            .field_name("json_field")
            .index_name("json_ngram_index")
            .index_type(IndexType::Ngram)
            .extra_params(HashMap::from([
                ("min_gram".to_string(), "2".to_string()),
                ("max_gram".to_string(), "4".to_string()),
                ("json_path".to_string(), "json_field[\"body\"]".to_string()),
                ("json_cast_type".to_string(), "varchar".to_string()),
            ]))])
        .build()?;
    client.create_index(request).await?;
```

```cpp
milvus::IndexDesc json_ngram_index("json_field", "json_ngram_index", milvus::IndexType::NGRAM);
json_ngram_index.AddExtraParam("min_gram", "2");
json_ngram_index.AddExtraParam("max_gram", "4");
json_ngram_index.AddExtraParam("json_path", "json_field[\"body\"]");
json_ngram_index.AddExtraParam("json_cast_type", "varchar");

milvus::CreateIndexRequest create_request;
create_request.WithCollectionName("Documents");
create_request.WithIndexes({json_ngram_index});
create_request.WithSync(true);

status = client->CreateIndex(create_request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.createIndex({
    collection_name: "Documents",
    field_name: "json_field",
    index_name: "json_ngram_index",
    index_type: "NGRAM",
    params: { min_gram: 2, max_gram: 4, json_path: 'json_field["body"]', json_cast_type: "varchar" },
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "Documents",
    "indexParams": [
        {
            "fieldName": "json_field",
            "indexName": "json_ngram_index",
            "params": {
                "index_type": "NGRAM",
                "min_gram": 2,
                "max_gram": 4,
                "json_path": "json_field[\"body\"]",
                "json_cast_type": "varchar"
            }
        }
    ]
}'
```

This indexes `json_field["body"]` as a `VARCHAR` value using substrings of length 2 to 4. For other path options, see [JSON Indexing](json-indexing.md).

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
    collection_name="Documents",   # Name of the collection
    index_name="ngram_index" # Name of the index to drop
)
```

```java
import io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName("Documents")
        .indexName("ngram_index")
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("Documents", "ngram_index"))
if err != nil {
    fmt.Println(err)
}
```

```rust
use milvus::v2::prelude::*;

    let request = DropIndexRequest::builder()
        .collection_name("Documents")
        .index_name("ngram_index")
        .build()?;
    client.drop_index(request).await?;
```

```cpp
status = client->DropIndex(milvus::DropIndexRequest()
                               .WithCollectionName("Documents")
                               .WithIndexName("ngram_index"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.dropIndex({ collection_name: "Documents", index_name: "ngram_index" });
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "Documents",
    "indexName": "ngram_index"
}'
```

## Best practices

- **Choose `min_gram` and `max_gram` to match search behavior**

    - Start with `min_gram=2`, `max_gram=3`.

    - Set `min_gram` to the shortest literal you expect users to type.

    - Set `max_gram` near the typical length of meaningful substrings; larger `max_gram` improves filtering but increases space.

- **Avoid low-selectivity grams**

    Highly repetitive patterns (e.g., `"aaaaaa"`) provide weak filtering and may yield limited gains.

- **Normalize consistently**

    Apply the same normalization to ingested text and query literals (e.g., lowercasing, trimming) if your use case needs it.
