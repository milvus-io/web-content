# BulkImport

The `BulkImport` struct is an async client for the Milvus bulk-import REST endpoints. Create one with `BulkImport::new()`, then use its methods to create import jobs, list jobs, and monitor progress. The create operation is also called bulk import.

```rust
pub struct BulkImport
```

## Constructor

Constructs a bulk-import REST client from the given configuration.

```rust
pub fn new(config: &BulkImportConfig) -> Result<Self>
```

**PARAMETERS:**

- `config: &BulkImportConfig`

    Connection settings for the bulk-import REST client. The `url` must be a valid `http` or `https` URL containing a host and no query string or fragment. TLS-related fields are validated together.

**RETURNS:**

*Result\<BulkImport\>*

Returns a `BulkImport` client on success, or `Error` when the configuration is invalid.

## BulkImportConfig

Connection settings for the bulk-import REST client.

```rust
pub struct BulkImportConfig
```

**PARAMETERS:**

- `url: String`

    Base URL of the Milvus bulk-import REST endpoint. Required.

- `api_key: String`

    API key sent as a `Bearer` token in the `Authorization` header.

- `timeout: Duration`

    Overall timeout for each HTTP request. A zero duration disables the client-side request timeout. Defaults to 20 seconds.

- `verify_tls: bool`

    Whether to verify the server's TLS certificate. Defaults to `true`.

- `ca_certificate_path: Option<PathBuf>`

    Path to a PEM CA certificate used to verify the server. Cannot be combined with disabled TLS verification.

- `client_identity_path: Option<PathBuf>`

    Path to one PEM file containing the client certificate and private key. Cannot be combined with separate client certificate or private-key paths.

- `client_certificate_path: Option<PathBuf>`

    Path to a PEM client certificate, used together with `client_private_key_path`.

- `client_private_key_path: Option<PathBuf>`

    Path to a PEM client private key, used together with `client_certificate_path`.

## Methods

### BulkImport()

Creates a bulk-import job.

```rust
pub async fn bulk_import(&self, request: BulkImportRequest) -> Result<BulkImportResponse>
```

The request must specify exactly one data source among `files`, `object_url`, `object_urls`, and `data_paths`.

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database that holds the collection.

- `collection_name: String`

    Name of the target collection. Required.

- `partition_name: String`

    Name of the target partition.

- `files: Vec<Vec<String>>`

    Local or object-storage paths visible to an open-source Milvus deployment, grouped per import.

- `object_url: String`

    Deprecated singular object URL accepted by Milvus 2.6. Prefer `object_urls`.

- `object_urls: Vec<Vec<String>>`

    Object URLs of the files to import, grouped per import.

- `cluster_id: String`

    Cluster ID for Zilliz Cloud deployments. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    Project ID for Zilliz Cloud deployments. Must be specified together with `region_id`.

- `region_id: String`

    Region ID for Zilliz Cloud deployments. Must be specified together with `project_id`.

- `access_key: String`

    Object-storage access key. Must be specified together with `secret_key`.

- `secret_key: String`

    Object-storage secret key. Must be specified together with `access_key`.

- `token: String`

    Object-storage session token.

- `volume_name: String`

    Volume name, required when `data_paths` is used.

- `data_paths: Vec<Vec<String>>`

    Data paths within the volume to import, grouped per import.

- `options: HashMap<String, Value>`

    Additional import options, such as `auto_commit`.

**RETURNS:**

*Result\<BulkImportResponse\>*

`BulkImportResponse` exposes `code()`, `message()`, `data()`, and the convenience accessors `job_id()`, `state()`, `progress()`, and `reason()`. Returns `Error` on failure.

**Example**

```rust
let request = BulkImportRequest::builder()
    .database_name("books_db")
    .collection_name("books")
    .file("one.parquet")
    .file_group(["id.npy", "embedding.npy"])
    .option("auto_commit", serde_json::json!(false))
    .build()?;
let resp = bulk.bulk_import(request).await?;
println!("job_id: {:?}", resp.job_id());
```

## Example

```rust
let bulk = BulkImport::new(
    &BulkImportConfig::new()
        .url("http://localhost:19530")
        .api_key("root:Milvus"),
)?;
```
