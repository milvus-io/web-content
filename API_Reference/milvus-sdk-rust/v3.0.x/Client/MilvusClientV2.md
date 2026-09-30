# MilvusClientV2

A **ClientV2** instance represents a Rust client that connects to a specific Milvus instance and exposes the request/response-based Milvus API.

Import the client and its entry points with the prelude:

```rust
use milvus::v2::prelude::*;
```

The prelude re-exports `ClientV2`, `ConnectConfig`, `ClientTelemetry`, `MilvusClientV2Session`, and all public request, response, and type objects.

## Constructor

```rust
pub async fn new(config: &ConnectConfig) -> Result<Self>
```

Creates a `ClientV2` and connects it using the supplied [`ConnectConfig`](ConnectConfig.md). The call waits up to `connect_timeout` for the Milvus server to become ready, and it fails with an `Error` when the server cannot be reached or the configuration is invalid (for example, a client certificate without a matching key).

```rust
let config = ConnectConfig::new()
    .uri("http://localhost:19530")
    .token("root:Milvus");
let client = ClientV2::new(&config).await?;
```

## Runtime configuration

- `pub fn set_rpc_deadline(&self, timeout: Duration)`

    Sets the timeout applied independently to each RPC attempt.

- `pub fn set_retry_param(&self, retry: RetryConfig)`

    Replaces the retry policy used by subsequent RPC calls.

- `pub fn telemetry(&self) -> ClientTelemetry`

    Returns the shared client-side telemetry manager. See [ClientTelemetry](ClientTelemetry.md).

- `pub fn session(&self, cluster_id: impl Into<String>) -> Result<MilvusClientV2Session>`

    Creates a cluster-scoped session view bound to the given cluster identifier. See [MilvusClientV2Session](MilvusClientV2Session.md).

- `pub async fn use_database(&self, database: impl Into<String>) -> Result<()>`

    Selects the database used by subsequent operations on this client and its clones. See [UseDatabase](../Database/UseDatabase.md).

- `pub fn current_database(&self) -> String`

    Returns the database currently selected by this client.

- `pub fn sdk_version(&self) -> &'static str`

    Returns the compile-time Rust SDK package version. See [SDKVersion](../Management/SDKVersion.md).

## Method index

Operations are grouped into the following categories. Click a category page to see the request fields and examples for each operation.

- **Client** — connection and runtime configuration.
- [**Database**](../Database/CreateDatabase.md) — database lifecycle and selection: `use_database`, `current_database`, `create_database`, `drop_database`, `list_databases`, `describe_database`, `alter_database_properties`, `drop_database_properties`.
- **Collections** — collection lifecycle and schema: `create_collection`, `has_collection`, `describe_collection`, `list_collections`, `batch_describe_collections`, `get_collection_stats`, `drop_collection`, `load_collection`, `refresh_load`, `release_collection`, `get_load_state`, `truncate_collection`, `rename_collection`, `describe_replicas`, `alter_collection_properties`, `drop_collection_properties`, `alter_collection_field_properties`, `drop_collection_field_properties`, `add_collection_field`, `add_collection_struct_field`, `drop_collection_field`, `add_collection_function`, `alter_collection_function`, `drop_collection_function`, `add_function_field`, `drop_function_field`.
- [**Vector**](../Vector/Insert.md) — DML and DQL: `insert`, `upsert`, `delete`, `query`, `get`, `search`, `hybrid_search`, `query_iterator`, `search_iterator`.
- **Partitions** — partition lifecycle: `create_partition`, `drop_partition`, `has_partition`, `list_partitions`, `load_partitions`, `release_partitions`, `get_partition_stats`.
- **Index** — index management: `create_index`, `describe_index`, `drop_index`, `list_indexes`, `alter_index_properties`, `drop_index_properties`.
- [**Authentication**](../Authentication/CreateUser.md) — users, roles, privileges, and privilege groups.
- [**ResourceGroup**](../ResourceGroup/CreateResourceGroup.md) — resource-group lifecycle, node and replica transfer.
- [**Snapshots**](../Snapshots/CreateSnapshot.md) — snapshot backup, restore, and pinning.
- [**Management**](../Management/CheckHealth.md) — maintenance, compaction, segments, server version, and health.
- **CDC** — change-data-capture replication: `update_replicate_configuration`, `get_replicate_configuration`, `get_replicate_info`, `dump_messages`.
- **Alias** — collection aliases: `create_alias`, `drop_alias`, `alter_alias`, `describe_alias`, `list_aliases`.

## Example

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new()
    .uri("http://localhost:19530")
    .token("root:Milvus");
let client = ClientV2::new(&config).await?;

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
            .dimension(4),
    );
let request = CreateCollectionRequest::builder()
    .collection_name("books")
    .schema(schema)
    .build()?;
client.create_collection(request).await?;
```
