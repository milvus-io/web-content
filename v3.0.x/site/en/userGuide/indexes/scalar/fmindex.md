---
id: fmindex.md
title: "FMINDEX"
summary: "The FMINDEX index is an exact byte-level substring index for VARCHAR fields. It answers anchored LIKE queries — prefix, infix, and suffix matching — with no candidate recheck, making it ideal for substring search over long text."
---

# FMINDEX

The `FMINDEX` index in Milvus is an exact byte-level substring index for `VARCHAR` fields. It answers anchored `LIKE` queries with prefix, infix, or suffix matching and returns exact matches without a candidate recheck.

Use the `FMINDEX` index if you frequently run substring filters, such as:

- `title LIKE "vector%"` (prefix)

- `title LIKE "%database"` (suffix)

- `title LIKE "%vector database%"` (infix / substring)

Unlike `NGRAM`, which narrows candidates and then rechecks, `FMINDEX` can resolve anchored prefix, suffix, and infix patterns directly from the index.

## Supported data types

- `VARCHAR` fields. For details, refer to [String Field](string.md).

`FMINDEX` is supported only on `VARCHAR` fields. It does not support `JSON` fields or `JSON` paths cast to `VARCHAR`.

## How it works

`FMINDEX` is a full-text FM-index, a compressed structure built from the Burrows-Wheeler Transform (BWT) of the concatenated field values, together with a sampled suffix array and a wavelet tree for rank queries. This layout supports *backward search*: given a pattern, Milvus walks the pattern from its last character to its first to find the exact range of entities whose text contains the pattern.

At query time, Milvus uses the index to:

1. **Locate matches** for the anchored literal extracted from a `LIKE` pattern.

1. **Return exact entity IDs** for prefix, suffix, and infix literals without rechecking the original values.

For patterns with multiple non-adjacent literals (general `LIKE`) or complex regex, `FMINDEX` may produce candidates that Milvus then verifies against the original values.

## Create an FMINDEX index

You can create an `FMINDEX` index on a `VARCHAR` field. Both build parameters are optional; leave them unset to take the server defaults.

| Parameter | Description | Allowed values | Default |
| --- | --- | --- | --- |
| `fm_sa_sample_rate` | Suffix-array sampling rate. Trades index size against locate latency; does not affect count-only queries. | Integer from 4 through 256 | 8 |
| `fm_block_bytes` | Rank-directory block granularity in bytes. Larger blocks shrink the resident directory. | 8, 16, 32, 64, or 128 | 64 |

The example below shows how to create an `FMINDEX` index on a `VARCHAR` field:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Assume you have defined a VARCHAR field named "text" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add FMINDEX index on the "text" field
# highlight-start
index_params.add_index(
    field_name="text",           # Target VARCHAR field
    index_type="FMINDEX",        # Index type is FMINDEX
    index_name="fmindex_index",  # Custom name for the index
    fm_sa_sample_rate=8,         # Optional: suffix-array sampling rate (4-256, default 8)
    fm_block_bytes=64            # Optional: block granularity in bytes (8/16/32/64/128, default 64)
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="log_catalog",
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

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

Map<String, Object> params = new HashMap<>();
params.put("fm_sa_sample_rate", "8");
params.put("fm_block_bytes", "64");

client.createIndex(CreateIndexReq.builder()
        .collectionName("log_catalog")
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("text").indexType(IndexParam.IndexType.FMINDEX)
                        .indexName("fmindex_index")
                        .extraParams(params)
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

idx := index.NewFMIndex().WithSaSampleRate(8).WithBlockBytes(64)

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("log_catalog", "text", idx).WithIndexName("fmindex_index"))

if err != nil {
    log.Fatal("failed to create index: ", err.Error())
}
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

auto status = client->Connect(milvus::ConnectParam("http://localhost:19530"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::IndexDesc fmindex_index("text", "fmindex_index", milvus::IndexType::FMINDEX);
fmindex_index.AddExtraParam("fm_sa_sample_rate", "8");
fmindex_index.AddExtraParam("fm_block_bytes", "64");

status = client->CreateIndex(milvus::CreateIndexRequest().WithCollectionName("log_catalog")
        .AddIndex(fmindex_index));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.createIndex({
    collection_name: "log_catalog",
    field_name: "text",
    index_type: "FMINDEX",
    index_name: "fmindex_index",
    params: { fm_sa_sample_rate: 8, fm_block_bytes: 64 },
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
    "collectionName": "log_catalog",
    "indexParams": [
        {
            "fieldName": "text",
            "indexName": "fmindex_index",
            "params": {
                "index_type": "FMINDEX",
                "fm_sa_sample_rate": 8,
                "fm_block_bytes": 64
            }
        }
    ]
}'

# {
#     "code": 0,
#     "data": {}
# }
```

## Queries accelerated by FMINDEX

`FMINDEX` accelerates the following filter patterns on a `VARCHAR` field. Anchored prefix, suffix, and infix literals resolve exactly from the index; general `LIKE` and regex patterns produce candidates that Milvus verifies against the original values.

- **Prefix match**

    ```python
    filter = 'text LIKE "vector%"'
    ```

- **Suffix match**

    ```python
    filter = 'text LIKE "%database"'
    ```

- **Infix / substring match**

    ```python
    filter = 'text LIKE "%vector database%"'
    ```

- **General LIKE (candidates)**

    ```python
    filter = 'text LIKE "a%b_c"'
    ```

- **Regex (candidates)**

    ```python
    filter = 'text =~ "error.*timeout"'
    ```

For more information on filter expression syntax, refer to [Pattern Matching](pattern-matching.md).

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
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_index(
    collection_name="log_catalog",   # Name of the collection
    index_name="fmindex_index"       # Name of the index to drop
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
        .collectionName("log_catalog")
        .indexName("fmindex_index")
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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("log_catalog", "fmindex_index"))

if err != nil {
    log.Fatal("failed to drop index: ", err.Error())
}
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
        .WithCollectionName("log_catalog")
        .WithIndexName("fmindex_index"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.dropIndex({
    collection_name: "log_catalog",
    index_name: "fmindex_index",
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
    "collectionName": "log_catalog",
    "indexName": "fmindex_index"
}'

# {
#     "code": 0,
#     "data": {}
# }
```

## Usage notes

- **Field types:** Works with `VARCHAR` fields only. For more information on data types, refer to [String Field](string.md).

- **Version compatibility:** `FMINDEX` requires scalar index engine version 5 or newer.

- **SDK availability:** The Rust v2 SDK does not yet include the `FMINDEX` index type.

- **Exact matching:** Anchored prefix, suffix, and infix `LIKE` literals return exact matches with no candidate recheck.

- **Candidates:** General `LIKE` and regex patterns may produce candidates that Milvus verifies against the original values. When a pattern provides little useful filtering or is too expensive to resolve, Milvus may scan the field instead.

- **Immutability:** `fm_sa_sample_rate` and `fm_block_bytes` cannot be changed in place—rebuild the index to adjust them.

## Best practices

- Use `FMINDEX` for exact substring search over long `VARCHAR` fields, especially when `NGRAM` candidate rechecking is costly.

- Keep `fm_block_bytes` at its default of 64 for most workloads; increase it to shrink the resident directory when memory is tight.

- Lower `fm_sa_sample_rate` improves locate latency at the cost of a larger index; raise it to reduce index size when queries are mostly count-only.
