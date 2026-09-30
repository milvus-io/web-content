# About Milvus Rust SDK

The Milvus Rust SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-rust).

## Installation

Add the SDK to your project with Cargo:

```bash
cargo add milvus-sdk-rust@3.0.2
```

## Quick Start

The following example connects to Milvus, creates a collection, and runs a vector search using the V2 client API, which is the current API of this SDK.

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
                .name("embedding")
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
                name: "embedding".into(),
                values: vec![vec![0.1f32, 0.2, 0.3]],
            },
        ])
        .build()?;
    client.insert(insert_req).await?;

    client
        .create_index(
            CreateIndexRequest::builder()
                .collection_name("hello_milvus")
                .index_params(vec![IndexParam::new()
                    .field_name("embedding")
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
                .vector_field("embedding")
                .vectors(SearchVectors::Float(vec![vec![0.1f32, 0.2, 0.3]]))
                .limit(1)
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
| 2.6.x | v2.6.1 |
| 3.0.x | v3.0.2 |

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to the Milvus Rust SDK are welcome from everyone. Refer to the [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-rust/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-rust/issues/new) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](LICENSE)
