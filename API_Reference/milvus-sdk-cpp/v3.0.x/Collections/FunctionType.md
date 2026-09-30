# FunctionType

Enumerates the function types supported by collection schema functions.

## Example

Demonstrates FunctionType with the C++ SDK.

```cpp
auto function_type = milvus::FunctionType::BM25;
```

## Notes

- UNKNOWN = 0

- BM25 = 1

- TEXTEMBEDDING = 2

- RERANK = 3

- MINHASH = 4

- MOLFINGERPRINT = 5

