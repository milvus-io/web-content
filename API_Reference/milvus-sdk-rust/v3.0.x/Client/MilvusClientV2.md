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

    Returns the shared client-side telemetry manager.

    A shared client-side telemetry manager that reports operation metrics and errors to the Milvus server over a heartbeat, and executes server-pushed commands.

    ## Construction

    A `ClientTelemetry` is owned by a [ClientV2](MilvusClientV2.md) and obtained through `ClientV2::telemetry()`:

    ```rust
    let telemetry = client.telemetry();
    ```

    The manager starts a heartbeat task when the client connects, unless telemetry is disabled in the [TelemetryConfig](TelemetryConfig.md). Use `with_client_request_id` to attach a request ID to a future's gRPC metadata:

    ```rust
    let request_id = new_client_request_id();
    let resp = with_client_request_id(request_id, async {
        client.search(search_request).await
    }).await?;
    ```

    - `pub async fn with_client_request_id<F>(request_id: impl Into<String>, future: F) -> F::Output`

        Runs a future with a caller-provided `client_request_id`. The ID must be a non-zero, 32-character lowercase OpenTelemetry TraceID; malformed values are omitted from gRPC metadata and telemetry error correlation.

    - `pub fn new_client_request_id() -> String`

        Generates a non-zero, lowercase, 32-character OpenTelemetry TraceID.

    ## PARAMETERS

    `ClientTelemetry` is not constructed directly; it is created internally by `ClientV2` from the [TelemetryConfig](TelemetryConfig.md) in the connect configuration.

    ## METHODS

    - `pub fn client_id(&self) -> &str`

        Returns the stable runtime client identifier sent in heartbeats.

    - `pub fn config(&self) -> TelemetryConfig`

        Returns the current effective telemetry configuration.

    - `pub fn is_supported(&self) -> bool`

        Reports whether the server is not currently known to reject telemetry as unimplemented.

    - `pub fn last_heartbeat_error(&self) -> Option<String>`

        Returns the most recent best-effort heartbeat failure.

    - `pub fn recent_errors(&self, max_count: usize) -> Vec<TelemetryErrorInfo>`

        Returns recent operation errors, newest first. Each `TelemetryErrorInfo` carries the error timestamp, operation name, error text, associated collection, and request ID.

    - `pub fn snapshots(&self) -> Vec<TelemetrySnapshot>`

        Returns retained metric snapshots in chronological order. Each `TelemetrySnapshot` contains the window start/end and per-operation `TelemetryMetrics` (request counts and latency percentiles).

    - `pub fn register_command_handler<F>(&self, command_type: impl Into<String>, handler: F)`

        Registers or replaces a custom command handler where `F: Fn(&ClientTelemetryCommand) -> ClientTelemetryCommandReply + Send + Sync + 'static`. The handler is invoked for server commands of the matching `command_type` and returns a reply acknowledging success or failure.

- `pub fn session(&self, cluster_id: impl Into<String>) -> Result<MilvusClientV2Session>`

    **Zilliz Cloud only.** Creates a cluster-scoped session view bound to the given cluster identifier.

    **Zilliz Cloud only.**

    A cluster-scoped view of a [ClientV2](MilvusClientV2.md) that exposes the DQL surface only.

    Created through [`ClientV2::session`](MilvusClientV2.md), the session shares the parent client's channel, selected database, RPC settings, and caches, and routes every DQL request to a target global-cluster identifier. It does not expose schema, DML, or administration operations. Closing the session marks it closed and makes every subsequent call fail, regardless of which clone of the session is used.

    ## Construction

    ```rust
    let session = client.session("my-cluster-id")?;
    ```

    `ClientV2::session` returns an `Error` when `cluster_id` is empty.

    ## PARAMETERS

    | Parameter | Type | Description |
    | --- | --- | --- |
    | `cluster_id` | `String` | Target global-cluster identifier to which every request is routed. A global-cluster connection selects the member cluster to serve the request; a regular server ignores the param when it does not support cluster routing. |

    ## METHODS

    - `pub fn cluster_id(&self) -> &str`

        Returns the target cluster identifier.

    - `pub async fn search(&self, request: SearchRequest) -> Result<SearchResponse>`

        Searches vector fields in the target cluster.

    - `pub async fn hybrid_search(&self, request: HybridSearchRequest) -> Result<SearchResponse>`

        Executes multiple vector searches combined with a reranking strategy in the target cluster.

    - `pub async fn query(&self, request: QueryRequest) -> Result<QueryResponse>`

        Queries entities in the target cluster.

    - `pub async fn get(&self, request: GetRequest) -> Result<GetResponse>`

        Retrieves entities by their primary-key values in the target cluster.

    - `pub async fn query_iterator(&self, request: QueryIteratorRequest) -> Result<QueryIterator>`

        Creates a query iterator bound to the target cluster. Closing the session also stops this iterator's subsequent pages.

    - `pub async fn search_iterator(&self, request: SearchIteratorRequest) -> Result<SearchIterator>`

        Creates a search iterator bound to the target cluster. Closing the session also stops this iterator's subsequent pages.

    - `pub fn close(&self)`

        Closes this session view without disconnecting the parent client. Every subsequent call on this session, including on clones created before the close, fails with an error.

- `pub async fn use_database(&self, database: impl Into<String>) -> Result<()>`

    Selects the database used by subsequent operations on this client and its clones. See [UseDatabase](../Database/use_database.md).

- `pub fn current_database(&self) -> String`

    Returns the database currently selected by this client.

- `pub fn sdk_version(&self) -> &'static str`

    Returns the compile-time Rust SDK package version. See [SDKVersion](../Management/sdk_version.md).

## Method index

Operations are grouped into the following categories. Click a category page to see the request fields and examples for each operation.

- **Client** — connection and runtime configuration.
- [**Database**](../Database/create_database.md) — database lifecycle and selection: `use_database`, `current_database`, `create_database`, `drop_database`, `list_databases`, `describe_database`, `alter_database_properties`, `drop_database_properties`.
- **Collections** — collection lifecycle and schema: `create_collection`, `has_collection`, `describe_collection`, `list_collections`, `batch_describe_collections`, `get_collection_stats`, `drop_collection`, `load_collection`, `refresh_load`, `release_collection`, `get_load_state`, `truncate_collection`, `rename_collection`, `describe_replicas`, `alter_collection_properties`, `drop_collection_properties`, `alter_collection_field_properties`, `drop_collection_field_properties`, `add_collection_field`, `add_collection_struct_field`, `drop_collection_field`, `add_collection_function`, `alter_collection_function`, `drop_collection_function`, `add_function_field`, `drop_function_field`.
- [**Vector**](../Vector/insert.md) — DML and DQL: `insert`, `upsert`, `delete`, `query`, `get`, `search`, `hybrid_search`, `query_iterator`, `search_iterator`.
- **Partitions** — partition lifecycle: `create_partition`, `drop_partition`, `has_partition`, `list_partitions`, `load_partitions`, `release_partitions`, `get_partition_stats`.
- **Index** — index management: `create_index`, `describe_index`, `drop_index`, `list_indexes`, `alter_index_properties`, `drop_index_properties`.
- [**Authentication**](../Authentication/create_user.md) — users, roles, privileges, privilege groups, and row-level security.
- [**ResourceGroup**](../ResourceGroup/create_resource_group.md) — resource-group lifecycle, node and replica transfer.
- [**Snapshots**](../Snapshots/create_snapshot.md) — snapshot backup, restore, and pinning.
- [**Management**](../Management/check_health.md) — maintenance, compaction, segments, server version, and health.
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
