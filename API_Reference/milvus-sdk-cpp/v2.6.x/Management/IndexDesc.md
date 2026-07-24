# IndexDesc

This class carries the parameters needed to build a vector or scalar index. Pass one or more `IndexDesc` objects to `CreateIndexRequest::AddIndex()`. `DescribeIndex()` also returns `IndexDesc` objects (via `DescribeIndexResponse::Descs()`) that include build-progress and state information.

**PARAMETERS:**

- **field_name** (*std::string*)

    Name of the collection field to index.

- **index_name** (*std::string*)

    Optional name for the index. When empty, the server uses `field_name` as the index name. Must be unique within the collection.

- **index_type** (*milvus::IndexType*)

    The algorithm used to build the index. See `IndexType` for available values.

- **metric_type** (*milvus::MetricType*)

    Distance metric used to compare vectors. Not required for scalar field indexes. Default: `MetricType::INVALID` (server auto-determines). See `MetricType` for available values.

## Methods

**Input methods (used when creating an index):**

- `Status SetFieldName(std::string field_name)` / `const std::string& FieldName() const`

    Sets or gets the field this index is built on.

- `Status SetIndexName(std::string index_name)` / `const std::string& IndexName() const`

    Sets or gets the index name. Cannot be empty after creation.

- `Status SetIndexType(milvus::IndexType index_type)` / `milvus::IndexType IndexType() const`

    Sets or gets the index algorithm.

- `Status SetMetricType(milvus::MetricType metric_type)` / `milvus::MetricType MetricType() const`

    Sets or gets the vector distance metric. Leave unset (or `INVALID`) for scalar field indexes.

- `Status AddExtraParam(const std::string& key, const std::string& value)`

    Adds an algorithm-specific tuning parameter (e.g., `milvus::NLIST` / `"nlist"` for IVF indexes, `"M"` and `"efConstruction"` for HNSW).

- `const std::unordered_map<std::string, std::string>& ExtraParams() const`

    Returns all extra parameters as a key-value map.

- `Status ExtraParamsFromJson(std::string json)`

    Populates extra parameters by parsing a JSON string.

**Output methods (populated by DescribeIndex):**

- `int64_t IndexId() const`

    Server-assigned index identifier.

- `milvus::IndexStateCode StateCode() const`

    Current build state: `NONE`, `UNISSUED`, `IN_PROGRESS`, `FINISHED`, or `FAILED`.

- `std::string FailReason() const`

    Failure message when `StateCode()` is `FAILED`.

- `int64_t IndexedRows() const`

    Number of rows that have been indexed. May exceed `TotalRows()` if compaction triggers re-indexing.

- `int64_t TotalRows() const`

    Total number of rows in the collection.

- `int64_t PendingRows() const`

    Number of rows not yet indexed.

## Example

