# EmbeddingList

This class holds one or more query vectors of the same type, used as the target vectors for a `SearchRequest`, `SubSearchRequest`, or struct-field ANN search via `AddEmbeddingList()`. Build an `EmbeddingList` by calling the Add*/Set* methods, then pass it to `SearchRequestBase::AddEmbeddingList()`.

```cpp
EmbeddingList list;
```

**METHODS:**

**Read methods:**

- `FieldDataPtr TargetVectors() const`

    Returns the underlying field data containing all vectors.

- `size_t Count() const`

    Returns the number of vectors added.

- `int64_t Dim() const`

    Returns the vector dimension. For embedded-text mode the value is `0`.

**Single-vector add methods:**

- `Status AddFloatVector(const FloatVecFieldData::ElementT& vector)`

- `Status AddBinaryVector(const std::string& vector)`

- `Status AddBinaryVector(const BinaryVecFieldData::ElementT& vector)`

- `Status AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

- `Status AddSparseVector(const nlohmann::json& vector)`

- `Status AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

- `Status AddFloat16Vector(const std::vector<float>& vector)` — auto-converts float to float16

- `Status AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

- `Status AddBFloat16Vector(const std::vector<float>& vector)` — auto-converts float to bfloat16

- `Status AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

- `Status AddEmbeddedText(const std::string& text)` — for BM25 text-embedding

**Batch set methods (reset the list):**

- `Status SetFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

- `Status SetBinaryVectors(const std::vector<std::string>& vectors)`

- `Status SetBinaryVectors(std::vector<BinaryVecFieldData::ElementT>&& vectors)`

- `Status SetSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

- `Status SetSparseVectors(const std::vector<nlohmann::json>& vectors)`

- `Status SetFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

- `Status SetFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

- `Status SetBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

- `Status SetBFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

- `Status SetInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

- `Status SetEmbeddedTexts(std::vector<std::string>&& texts)` — for BM25 text-embedding

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

EmbeddingList dense_list;
dense_list.AddFloatVector({0.1f, 0.2f, 0.3f /* ... 128 dims */});

EmbeddingList sparse_list;
sparse_list.AddSparseVector({{0u, 0.4f}, {5u, 0.6f}});

SearchResponse response;
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
client->Search(
    SearchRequest()
        .WithCollectionName("my_collection")
        .WithAnnsField("embeddings")
        .WithLimit(5)
        .AddEmbeddingList(std::move(dense_list))
        .AddEmbeddingList(std::move(sparse_list)),
    response);
```
