# About Milvus Rust SDK

Milvus Rust SDK is an open-source project and its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-rust).

## Compatibility

| Milvus version | Recommended SDK version |
|:-----:|:-----:|
| 2.6.x | v2.6.1 |
| 3.0.x | v3.0.2 |

Note: Milvus and the Rust SDK are NOT compatible across major versions.

## Installation

Add the SDK to your project with Cargo:

```bash
cargo add milvus-sdk-rust@3.0.2
```

Then connect to Milvus through the V2 API:

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
    let health = client
        .check_health(CheckHealthRequest::builder().build()?)
        .await?;
    println!("healthy: {}", health.is_healthy());
    Ok(())
}
```

## License

[Apache License 2.0](LICENSE)
