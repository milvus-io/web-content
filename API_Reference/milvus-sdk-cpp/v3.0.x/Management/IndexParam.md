# IndexParam

Describes an index to create on a collection field. This is the preferred request input for `CreateIndex()` and collection creation; `IndexDesc` remains only for legacy creation input and for index descriptions returned by `DescribeIndex()`.

```cpp
IndexParam();
IndexParam(std::string field_name, std::string index_name,
           milvus::IndexType index_type,
           milvus::MetricType metric_type = milvus::MetricType::INVALID);
```

**PARAMETERS:**

- **field_name** (*std::string*)

    Name of the field to index.

- **index_name** (*std::string*)

    Name of the index. Use an empty string to let Milvus generate one.

- **index_type** (*milvus::IndexType*)

    Index algorithm.
    See [IndexType](IndexType.md).

- **metric_type** (*milvus::MetricType*)

    Distance metric for vector indexes. Omit it for scalar indexes.
    See [MetricType](MetricType.md).

**METHODS:**

- `const std::string& FieldName() const` / `Status SetFieldName(std::string field_name)`

    Returns or sets the indexed field name.

- `const std::string& IndexName() const` / `Status SetIndexName(std::string index_name)`

    Returns or sets the index name.

- `milvus::MetricType MetricType() const` / `Status SetMetricType(milvus::MetricType metric_type)`

    Returns or sets the vector metric type.

- `milvus::IndexType IndexType() const` / `Status SetIndexType(milvus::IndexType index_type)`

    Returns or sets the index type.

- `Status AddExtraParam(const std::string& key, const std::string& value)`

    Adds one index-specific parameter, such as `M` or `efConstruction`.

- `const std::unordered_map<std::string, std::string>& ExtraParams() const`

    Returns all index-specific parameters.

- `Status ExtraParamsFromJson(std::string json)`

    Parses a JSON object and merges its entries into `ExtraParams()`.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

IndexParam param("embedding", "embedding_idx", IndexType::HNSW, MetricType::COSINE);
param.AddExtraParam("M", "16");
param.AddExtraParam("efConstruction", "200");
```
