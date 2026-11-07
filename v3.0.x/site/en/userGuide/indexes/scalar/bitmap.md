---
id: bitmap.md
title: "BITMAP"
summary: "Bitmap indexing is an efficient indexing technique designed to improve query performance on low-cardinality scalar fields. Cardinality refers to the number of distinct values in a field. Fields with fewer distinct elements are considered low-cardinality."
---

# BITMAP

Bitmap indexing is an efficient indexing technique designed to improve query performance on low-cardinality scalar fields. Cardinality refers to the number of distinct values in a field. Fields with fewer distinct elements are considered low-cardinality.

This index type helps reduce the retrieval time of scalar queries by representing field values in a compact binary format and performing efficient bitwise operations on them. Compared to other types of indexes, bitmap indexes typically have higher space efficiency and faster query speeds when dealing with low-cardinality fields.

## Overview

The term **Bitmap** combines two words: **Bit** and **Map**. A bit represents the smallest unit of data in a computer, which can only hold a value of either **0** or **1**. A map, in this context, refers to the process of transforming and organizing data according to what value should be assigned to 0 and 1.

A bitmap index consists of two main components: bitmaps and keys. Keys represent the unique values in the indexed field. For each unique value, there is a corresponding bitmap. The length of these bitmaps is equal to the number of records in the collection. Each bit in the bitmap corresponds to a record in the collection. If the value of the indexed field in a record matches the key, the corresponding bit is set to **1**; otherwise, it is set to **0**.

Consider a collection of documents with fields **Category** and **Public**. We want to retrieve documents that fall into the **Tech** category and are open to the **Public**. In this case, the keys for our bitmap indexes are **Tech** and **Public**.

![Bitmap](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitmap.png)

As shown in the figure, the bitmap indexes for **Category** and **Public** are:

- **Tech**: [1, 0, 1, 0, 0], which shows that only the 1st and 3rd documents fall into the **Tech** category.

- **Public**: [1, 0, 0, 1, 0], which shows that only the 1st and 4th documents are open to the **Public**.

To find the documents that match both criteria, we perform a bitwise AND operation on these two bitmaps:

- **Tech** AND **Public**: [1, 0, 0, 0, 0]

The resulting bitmap [1, 0, 0, 0, 0] indicates that only the first document (**ID** **1**) satisfies both criteria. By using bitmap indexes and efficient bitwise operations, we can quickly narrow down the search scope, eliminating the need to scan the entire dataset.

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

In this example, we create a bitmap index on the `category` field of the `my_collection` collection. The `add_index()` method is used to specify the field name, index type, and index name.

Once the bitmap index is created, you can use the `filter` parameter in query operations to perform scalar filtering based on the indexed field. This allows you to efficiently narrow down the search results using the bitmap index. For more information, refer to [Filtering Explained](boolean.md).

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

## Limits

- Bitmap indexes are supported only for scalar fields that are not primary keys.

- The data type of the field must be one of the following:

    - `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `VARCHAR`

    - `ARRAY` (elements must be one of: `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `VARCHAR`)

- Bitmap indexes do not support the following data types:

    - `FLOAT`, `DOUBLE`: Floating-point types are not compatible with the binary nature of bitmap indexes.

    - `JSON`: JSON data types have a complex structure that cannot be efficiently represented using bitmap indexes.

- Bitmap indexes are not suitable for fields with high cardinality (i.e., fields with a large number of distinct values).

    - As a general guideline, bitmap indexes are most effective when the cardinality of a field is less than 500.

    - When the cardinality increases beyond this threshold, the performance benefits of bitmap indexes diminish, and the storage overhead becomes significant.

    - For high-cardinality fields, consider using alternative indexing techniques such as inverted indexes, depending on your specific use case and query requirements.
