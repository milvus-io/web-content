# SubSearchRequest

This class represents a single ANN sub-search within a `HybridSearch` operation. Add target vectors and set search parameters using the fluent With*/Add* methods, then pass a `SubSearchRequestPtr` to `HybridSearchRequest::AddSubRequest()`. `SubSearchRequest` inherits the full vector-assigning API from `SearchRequestVectorAssigner`.

## Request Syntax

**REQUEST METHODS:**

- `SubSearchRequest& WithAnnsField(const std::string& ann_field)`

      Target vector field name for this sub-search.

- `SubSearchRequest& WithLimit(int64_t limit)`

      Top-k limit for this sub-search result before reranking. This value is stored in extra params.

- `SubSearchRequest& WithFilter(std::string filter)`

      Boolean filter expression applied to this sub-search only.

- `SubSearchRequest& WithMetricType(milvus::MetricType metric_type)`

      Metric type override for this sub-search.

- `SubSearchRequest& WithTimezone(const std::string& timezone)`

      Timezone string for `Timestamptz` field filtering.

**Inherited vector methods** (all return `SubSearchRequest&` for chaining):

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

- `AddBinaryVector(const std::string& vector)`

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

- `AddEmbeddedText(const std::string& text)`

- `AddEmbeddingList(EmbeddingList&& emb_list)` — for struct-field ANN

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)` — batch

- `WithSparseVectors(...)`, `WithFloat16Vectors(...)`, etc. — batch variants

## Example

