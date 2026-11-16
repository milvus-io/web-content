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

    Appends one dense float vector.

- `Status AddBinaryVector(const std::string& vector)`

    Appends one binary vector. The string overload converts the string to binary bytes.

- `Status AddBinaryVector(const BinaryVecFieldData::ElementT& vector)`

    Appends one binary vector. The string overload converts the string to binary bytes.

- `Status AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Appends one sparse vector from index-value data or a supported JSON representation.

- `Status AddSparseVector(const nlohmann::json& vector)`

    Appends one sparse vector from index-value data or a supported JSON representation.

- `Status AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Appends one float16 vector. The float-vector overload converts values to float16.

- `Status AddFloat16Vector(const std::vector<float>& vector)` — auto-converts float to float16

    Appends one float16 vector. The float-vector overload converts values to float16.

- `Status AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Appends one bfloat16 vector. The float-vector overload converts values to bfloat16.

- `Status AddBFloat16Vector(const std::vector<float>& vector)` — auto-converts float to bfloat16

    Appends one bfloat16 vector. The float-vector overload converts values to bfloat16.

- `Status AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Appends one dense int8 vector.

- `Status AddEmbeddedText(const std::string& text)` — for BM25 text-embedding

    Appends text for a supported text-embedding function such as BM25.

**Batch set methods (reset the list):**

- `Status SetFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Replaces the current list with dense float vectors.

- `Status SetBinaryVectors(const std::vector<std::string>& vectors)`

    Replaces the current list with binary vectors.

- `Status SetBinaryVectors(std::vector<BinaryVecFieldData::ElementT>&& vectors)`

    Replaces the current list with binary vectors.

- `Status SetSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Replaces the current list with sparse vectors.

- `Status SetSparseVectors(const std::vector<nlohmann::json>& vectors)`

    Replaces the current list with sparse vectors.

- `Status SetFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Replaces the current list with float16 vectors; float input is converted when applicable.

- `Status SetFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

    Replaces the current list with float16 vectors; float input is converted when applicable.

- `Status SetBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Replaces the current list with bfloat16 vectors; float input is converted when applicable.

- `Status SetBFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

    Replaces the current list with bfloat16 vectors; float input is converted when applicable.

- `Status SetInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Replaces the current list with dense int8 vectors.

- `Status SetEmbeddedTexts(std::vector<std::string>&& texts)` — for BM25 text-embedding

    Replaces the current list with text input for a supported embedding function.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Build an EmbeddingList with one dense float query vector
EmbeddingList emb_list;
emb_list.AddFloatVector({0.1f, 0.2f, 0.3f});

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

auto status = client->Search(
    SearchRequest()
        .WithCollectionName("my_collection")
        .WithAnnsField("vector")
        .AddEmbeddingList(std::move(emb_list))
        .WithLimit(1),
    SearchResponse());
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
