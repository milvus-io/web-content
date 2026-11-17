---
id: stl-sort.md
title: "STL_SORT"
summary: "Use STL_SORT for value lookups, range filtering, and string prefix matching on compatible fields."
---

# STL_SORT

`STL_SORT` stores values in sorted order to accelerate value lookups, range filters, and string prefix matching.

## Overview

### Supported data types

- Numeric fields (e.g., `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`). For details, refer to [Boolean & Number](number.md).

- `VARCHAR` fields. For details, refer to [String Field](string.md).

- `TIMESTAMPTZ` fields. For details, refer to [TIMESTAMPTZ Field](timestamptz-field.md).

For numeric, VARCHAR, or TIMESTAMPTZ subfields in a StructArray, see [Index StructArray Fields](index-structarray-fields.md#Create-scalar-indexes). Ordinary ARRAY fields do not support `STL_SORT`; see [Array index support](array_data_type.md#Array-index-support) for their index choices.

JSON paths cast to `DOUBLE` or `VARCHAR` support `STL_SORT` after the [3.0 JSON index opt-in setup](json-indexing.md#Index-requirements).

<a id="Queries-accelerated-by-STLSORT"></a>

<a id="Supported-filters"></a>

### Filter acceleration

An `STL_SORT` index can help evaluate the following conditions, subject to field and cast compatibility:

- Equality (`==`, `!=`) and membership (`in`, `not in`).
- Ranges: `<`, `<=`, `>`, `>=`, including intervals such as `10 <= price < 50`.
- VARCHAR prefix matching, such as `name LIKE "abc%"`.
- Comparisons on eligible JSON scalar paths. See [JSON filters](json-indexing.md#Supported-filters).

For suffix, substring, general LIKE, and regex filters, Milvus can evaluate the pattern against strings stored in the index. This can require visiting many distinct strings. See [Pattern Matching](pattern-matching.md) for syntax and planning simplifications.

<div class="alert note">

> These are index capabilities, not limits on valid filter expressions. See [Scalar Index](scalar_index.md#Filter-execution) for shared lookup constraints. For `AND`, `OR`, `NOT`, and NULL tests (`IS NULL`, `IS NOT NULL`), see [Basic Operators](basic-operators.md).

</div>


<a id="Usage-notes"></a>

### Memory considerations

Explicit `STL_SORT` indexes do not support memory-mapped mode.

For numeric and timestamp fields with no NULL values, use these rough estimates in bytes. `N` is the number of entities:

| Field type | Estimate |
| --- | --- |
| `INT8`, `INT16`, `INT32`, `FLOAT` | `12 * N` |
| `INT64`, `DOUBLE`, `TIMESTAMPTZ` | `20 * N` |
| `VARCHAR` | Measure with representative data; loaded memory depends on string storage, distinct values, and posting-list capacity. |

Divide by `1024 * 1024` to convert bytes to MiB. One million non-NULL INT64 values require roughly 19 MiB for the main index structures. Measure VARCHAR indexes after loading: serialized index size does not include all in-memory string and posting-list allocations.

These rough estimates cover loaded index memory with memory mapping disabled. Calculate them per segment, then sum across loaded segments and replicas.

<div class="alert note">

> Allow extra memory for loaded field data, vector indexes, collection and index overhead, and temporary allocations. Validate with representative data and queries; arrays, JSON, older index formats, and memory mapping require separate measurement.

</div>


<a id="How-it-works"></a>

### How STL_SORT works

<details>
<summary><strong>View the sorting and lookup process</strong></summary>

During index building, Milvus pairs field values with entity IDs, sorts them in ascending order using [std::sort](https://en.cppreference.com/w/cpp/algorithm/sort.html), and persists the sorted array.

For equality and range queries, binary search ([std::lower_bound](https://en.cppreference.com/w/cpp/algorithm/lower_bound.html) and [std::upper_bound](https://en.cppreference.com/w/cpp/algorithm/upper_bound.html)) locates the matching interval. The query executor receives the entity IDs in that interval.

This reduces query complexity from **O(n)** (full scan) to **O(log n + m)**, where *m* is the number of matches.

</details>

## Create an STL_SORT index

Set `index_type` to `STL_SORT`; no extra index parameters are required. This example indexes a `TIMESTAMPTZ` field:

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

# Assume you have defined a TIMESTAMPTZ field named "tsz" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add STL_SORT index on the "tsz" field
# highlight-start
index_params.add_index(
    field_name="tsz",
    index_type="STL_SORT",   # Index for TIMESTAMPTZ
    index_name="tsz_index",  # Optional, name your index
    params={}                # No extra params needed
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="tsz_demo",
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
        .collectionName("tsz_demo")
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName("tsz")
                .indexType(IndexParam.IndexType.STL_SORT)
                .indexName("tsz_index")
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

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("tsz_demo", "tsz", index.NewSortedIndex()).WithIndexName("tsz_index"))

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
            .collection_name("tsz_demo")
            .index_param(
                IndexParam::new()
                    .field_name("tsz")
                    .index_type(IndexType::StlSort)
                    .index_name("tsz_index"),
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

status = client->CreateIndex(milvus::CreateIndexRequest().WithCollectionName("tsz_demo")
        .AddIndex(milvus::IndexDesc("tsz", "tsz_index", milvus::IndexType::STL_SORT)));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.createIndex({
    collection_name: "tsz_demo",
    field_name: "tsz",
    index_type: "STL_SORT",
    index_name: "tsz_index",
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
    "collectionName": "tsz_demo",
    "indexParams": [
        {
            "fieldName": "tsz",
            "indexName": "tsz_index",
            "indexType": "STL_SORT"
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
    collection_name="tsz_demo",   # Name of the collection
    index_name="tsz_index" # Name of the index to drop
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
        .collectionName("tsz_demo")
        .indexName("tsz_index")
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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("tsz_demo", "tsz_index"))

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
            .collection_name("tsz_demo")
            .index_name("tsz_index")
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
        .WithCollectionName("tsz_demo")
        .WithIndexName("tsz_index"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.dropIndex({
    collection_name: "tsz_demo",
    index_name: "tsz_index",
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
    "collectionName": "tsz_demo",
    "indexName": "tsz_index"
}'

# {
#     "code": 0,
#     "data": {}
# }
```
