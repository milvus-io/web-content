# BulkImport

The `BulkImport` struct is an async client for the Milvus bulk-import REST endpoints. Create one with `BulkImport::new()`, then use its methods to create, commit, or abort import jobs; list jobs; and monitor progress. The create operation is also called bulk import.

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

**RETURN TYPE:**

*Result\<BulkImport\>*

**RETURNS:**

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

The request selects exactly one import mode: open-source Milvus with `files`, Zilliz Cloud object storage with `object_urls` (or the deprecated singular `object_url`), or a Zilliz Cloud volume with `volume_name` and `data_paths`.

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

    **Zilliz Cloud only.** Deprecated singular object URL. Prefer `object_urls`.

- `object_urls: Vec<Vec<String>>`

    **Zilliz Cloud only.** Object URLs of the files to import, grouped per import.

- `cluster_id: String`

    **Zilliz Cloud only.** Cluster ID of the target deployment. Optional when the connected deployment is the target. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    **Zilliz Cloud only.** Project ID of the target deployment. Must be specified together with `region_id` as an alternative to `cluster_id`.

- `region_id: String`

    **Zilliz Cloud only.** Region ID of the target deployment. Must be specified together with `project_id` as an alternative to `cluster_id`.

- `access_key: String`

    **Zilliz Cloud only.** Object-storage access key for object-URL import. Must be specified together with `secret_key`.

- `secret_key: String`

    **Zilliz Cloud only.** Object-storage secret key for object-URL import. Must be specified together with `access_key`.

- `token: String`

    **Zilliz Cloud only.** Object-storage session token for object-URL import.

- `volume_name: String`

    **Zilliz Cloud only.** Volume name, required for volume import.

- `data_paths: Vec<Vec<String>>`

    **Zilliz Cloud only.** Data paths within the volume to import, grouped per import.

- `options: HashMap<String, Value>`

    Additional import options, such as `auto_commit`. Use `rls_principal()` and `skip_rls()` to populate the row-level security options for an import into an RLS-enabled collection.

    The request exposes `rls_principal()` and `should_skip_rls()` accessors for those two options.

**RETURN TYPE:**

*Result\<BulkImportResponse\>*

**RETURNS:**

A **BulkImportResponse** containing the bulk-import endpoint response. Returns an `Error` if the operation fails.

```rust
BulkImportResponse
    code() // -> i64
    message() // -> &str
    data() // -> &Value
    get_data_field() // -> Option<&Value>
    job_id() // -> Option<&str>
    state() // -> Option<&str>
    progress() // -> Option<i64>
    reason() // -> Option<&str>
```

**METHODS:**

- `code()` (*i64*) -

    The response status code.

- `message()` (*&str*) -

    The response message.

- `data()` (*&Value*) -

    The raw response data payload.

- `get_data_field()` (*Option<&Value>*) -

    A named field from the response data, when present.

- `job_id()` (*Option<&str>*) -

    The job ID reported by the endpoint, when present.

- `state()` (*Option<&str>*) -

    The job state reported by the endpoint, when present.

- `progress()` (*Option<i64>*) -

    The job progress reported by the endpoint, when present.

- `reason()` (*Option<&str>*) -

    The failure reason reported by the endpoint, when present.

## Example

```rust
let bulk = BulkImport::new(
    &BulkImportConfig::new()
        .url("http://localhost:19530")
        .api_key("root:Milvus"),
)?;
```
