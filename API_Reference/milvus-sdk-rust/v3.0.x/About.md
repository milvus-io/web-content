# About Milvus Rust SDK

The Milvus Rust SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-rust).

## Installation

Add the SDK to your project with Cargo:

```bash
cargo add milvus-sdk-rust@3.0.3
```

## Quick Start

The following example connects to Milvus, creates a collection, inserts one entity, and runs a vector search using the V2 client API, which is the current API of this SDK.

```rust
use milvus::v2::prelude::*;

#[tokio::main]
async fn main() -> Result<()> {
    let client = ClientV2::new(
        &ConnectConfig::new()
            .uri("http://localhost:19530")
            .token("root:Milvus"),
    )
    .await?;

    let schema = CollectionSchema::new()
        .add_field(
            FieldSchema::new()
                .name("id")
                .data_type(DataType::Int64)
                .primary_key(true),
        )
        .add_field(
            FieldSchema::new()
                .name("vector")
                .data_type(DataType::FloatVector)
                .dimension(3),
        );
    client
        .create_collection(
            CreateCollectionRequest::builder()
                .collection_name("hello_milvus")
                .schema(schema)
                .build()?,
        )
        .await?;

    let insert_req = InsertRequest::builder()
        .collection_name("hello_milvus")
        .columns(vec![
            FieldData::Int64 {
                name: "id".into(),
                values: vec![1],
            },
            FieldData::FloatVector {
                name: "vector".into(),
                values: vec![vec![1.0f32, 2.0, 3.0]],
            },
        ])
        .build()?;
    client.insert(insert_req).await?;

    client
        .create_index(
            CreateIndexRequest::builder()
                .collection_name("hello_milvus")
                .index_params(vec![IndexParam::new()
                    .field_name("vector")
                    .index_type(IndexType::AutoIndex)
                    .metric_type(MetricType::Cosine)])
                .build()?,
        )
        .await?;
    client
        .load_collection(
            LoadCollectionRequest::builder()
                .collection_name("hello_milvus")
                .build()?,
        )
        .await?;

    let search_resp = client
        .search(
            SearchRequest::builder()
                .collection_name("hello_milvus")
                .vector_field("vector")
                .vectors(SearchVectors::Float(vec![vec![1.0f32, 2.0, 3.0]]))
                .limit(1)
                .consistency_level(ConsistencyLevel::Strong)
                .build()?,
        )
        .await?;
    println!("hit count: {}", search_resp.results().len());

    client
        .drop_collection(
            DropCollectionRequest::builder()
                .collection_name("hello_milvus")
                .build()?,
        )
        .await?;
    Ok(())
}
```

## Compatibility

Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server. The table lists the recommended SDK version validated for each Milvus version.

| Milvus version | Recommended SDK version |
|:-----:|:-----:|
| 2.6.x | v2.6.2 |
| 3.0.x | v3.0.3 |

## Breaking Changes

### 3.0.2

- `filter_templates` on `QueryRequest`, `SearchRequest`, `SubSearchRequest`, and `DeleteRequest` now takes and returns `HashMap<String, FilterTemplateValue>` instead of `HashMap<String, serde_json::Value>`. Pass the typed `FilterTemplateValue` variants (`Int64`, `String`, `Int64Array`, `StringArray`, `Bytes`), or use the new `add_filter_template` builder method, instead of raw JSON values.

### 3.0.1

- `use_database()` is now asynchronous and validates that the target database exists. Await the call and handle a validation error when the database does not exist.
- `AddCollectionFieldRequest` requires `FieldSchema.nullable(true)` when adding a vector field to an existing collection.
- `RunAnalyzerRequest.analyzer_params` accepts an optional `serde_json::Value` object instead of a pre-serialized JSON string.

### 3.0.0

- `CompactRequest` rejects `target_size = 0`. Omit `target_size` to request the server default.

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to the Milvus Rust SDK are welcome from everyone. Refer to the [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-rust/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-rust/issues/new) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](https://github.com/milvus-io/milvus-sdk-rust/blob/master/LICENSE)
