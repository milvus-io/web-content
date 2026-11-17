---
id: bitmap.md
title: "BITMAP"
summary: "Use BITMAP for low-cardinality scalar filtering. Check supported filters, field restrictions, and index creation."
---

# BITMAP

`BITMAP` accelerates scalar filtering on fields with few distinct values, such as status codes and categories. Cardinality is the number of distinct values in a field. This page describes supported filters, field restrictions, and index creation.

## Overview

<!-- Preserve the published #Limits link and the filter link used by related pages. These anchors are not headings. -->
<a id="Limits"></a>
<a id="Queries-accelerated-by-BITMAP"></a>

### Index targets and filters

To create a `BITMAP` index explicitly, choose a non-primary-key target from the table below. Each row pairs a supported target with the filters the index can help evaluate:

| Index target | Filters that can use the index |
| --- | --- |
| `BOOL` field | Equality (`==`, `!=`) and membership (`in`, `not in`). |
| Integer field (`INT8`, `INT16`, `INT32`, `INT64`) | Equality, membership, and ranges (`<`, `<=`, `>`, `>=`). |
| `VARCHAR` field | Equality, membership, ranges, and [LIKE or regex patterns](pattern-matching.md). Pattern evaluation can visit many distinct indexed strings. |
| Ordinary `ARRAY` field with `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, or `VARCHAR` elements | `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`, `ARRAY_CONTAINS_ALL`. See [Array index support](array_data_type.md#Array-index-support). |
| JSON path cast to `BOOL` or `VARCHAR` | Filters for the corresponding Boolean or string values above, subject to the [JSON index requirements](json-indexing.md#Index-requirements). |

<div class="alert note">

> Scalar indexes, including `AUTOINDEX`, do not support recursive ARRAY fields or arrays with nullable elements. See [Array index support](array_data_type.md#Array-index-support) for ordinary-array filters and [Index StructArray Fields](index-structarray-fields.md#Create-scalar-indexes) for subfield rules.

</div>


For ARRAY targets, `BITMAP` serves element-containment filters, not whole-array equality, element access by position, or array length. See [Array index support](array_data_type.md#Array-index-support).

For automatic selection beyond these explicit targets, see [AUTOINDEX behavior](scalar_index.md#AUTOINDEX-behavior).

<div class="alert note">

> These are index capabilities, not limits on valid filter expressions. See [Scalar Index](scalar_index.md#Filter-execution) for shared lookup constraints. For `AND`, `OR`, `NOT`, and NULL tests (`IS NULL`, `IS NOT NULL`), see [Basic Operators](basic-operators.md).

</div>


### Memory considerations

Memory and query costs depend on the number of distinct values and their distribution. Compare indexes with representative filters rather than treating a fixed cardinality as a universal performance cutoff.

For dense bitmaps, a rough estimate in bytes is `(D + 1) * N / 8`, where `N` is the number of entities and `D` the number of distinct values. This includes one bitmap per distinct value and one for validity. Value storage and other overhead add to the estimate; an optional offset cache adds approximately `8 * N` bytes on a 64-bit system. Compressed bitmap representations can have substantially different memory use.

These rough estimates cover loaded index memory with memory mapping disabled. Calculate them per segment, then sum across loaded segments and replicas.

<div class="alert note">

> Allow extra memory for loaded field data, vector indexes, collection and index overhead, and temporary allocations. Validate with representative data and queries; arrays, JSON, older index formats, and memory mapping require separate measurement.

</div>


### How BITMAP works

<details>
<summary><strong>View a bitmap filtering example</strong></summary>

A bitmap index associates each distinct field value with a bitmap. Each bit corresponds to an entity: **1** means the entity has that value, and **0** means it does not.

For example, to find public documents in the **Tech** category, combine the bitmaps for **Category = Tech** and **Public = true**:

![Bitmap](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png)

As shown in the figure, the bitmap indexes for **Category** and **Public** are:

- **Tech**: [1, 0, 1, 0, 0], which shows that only the 1st and 3rd documents fall into the **Tech** category.

- **Public**: [1, 0, 0, 1, 0], which shows that only the 1st and 4th documents are open to the **Public**.

To find the documents that match both criteria, we perform a bitwise AND operation on these two bitmaps:

- **Tech** AND **Public**: [1, 0, 0, 0, 0]

Only the first document (**ID 1**) satisfies both criteria.

</details>

## Create a bitmap index

To create a bitmap index in Milvus, use the `create_index()` method and set the `index_type` parameter to `"BITMAP"`.

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

client = MilvusClient(
    uri="http://localhost:19530",
)

index_params = client.prepare_index_params() # Prepare an empty IndexParams object, without having to specify any index parameters
index_params.add_index(
    field_name="category", # Name of the scalar field to be indexed
    index_type="BITMAP", # Type of index to be created
    index_name="category_bitmap_index" # Name of the index to be created
)

client.create_index(
    collection_name="my_collection", # Specify the collection name
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
        .collectionName("my_collection")
        .indexParams(Collections.singletonList(IndexParam.builder()
                .fieldName("category")
                .indexType(IndexParam.IndexType.BITMAP)
                .indexName("category_bitmap_index")
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

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("my_collection", "category", index.NewBitmapIndex()).WithIndexName("category_bitmap_index"))

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
            .collection_name("my_collection")
            .index_param(
                IndexParam::new()
                    .field_name("category")
                    .index_type(IndexType::Bitmap)
                    .index_name("category_bitmap_index"),
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

status = client->CreateIndex(milvus::CreateIndexRequest().WithCollectionName("my_collection")
        .AddIndex(milvus::IndexDesc("category", "category_bitmap_index", milvus::IndexType::BITMAP)));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.createIndex({
    collection_name: "my_collection",
    field_name: "category",
    index_type: "BITMAP",
    index_name: "category_bitmap_index",
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

// Prepare index building params
var indexParam = new IndexParam(
    fieldName: "category",
    indexType: IndexType.Bitmap,
    indexName: "category_bitmap_index");

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "my_collection",
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
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "indexParams": [
        {
            "fieldName": "category",
            "indexName": "category_bitmap_index",
            "indexType": "BITMAP"
        }
    ]
}'

# {
#     "code": 0,
#     "data": {}
# }
```

This creates an index on `my_collection.category`. Use the field in a query or search `filter`; see [Filtering Explained](boolean.md).

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
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
client.drop_index(
    collection_name="my_collection",   # Name of the collection
    index_name="category_bitmap_index" # Name of the index to drop
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
        .collectionName("my_collection")
        .indexName("category_bitmap_index")
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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("my_collection", "category_bitmap_index"))

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
            .collection_name("my_collection")
            .index_name("category_bitmap_index")
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
        .WithCollectionName("my_collection")
        .WithIndexName("category_bitmap_index"));

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

await client.dropIndex({
    collection_name: "my_collection",
    index_name: "category_bitmap_index",
});
```

```csharp
using Milvus.Client.V2.Requests.Index;

await client.DropIndexAsync(new DropIndexReq
{
    CollectionName = "my_collection", // Name of the collection
    IndexName = "category_bitmap_index" // Name of the index to drop
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
    "collectionName": "my_collection",
    "indexName": "category_bitmap_index"
}'

# {
#     "code": 0,
#     "data": {}
# }
```
