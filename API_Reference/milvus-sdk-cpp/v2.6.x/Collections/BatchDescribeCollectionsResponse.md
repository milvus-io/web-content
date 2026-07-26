# BatchDescribeCollectionsResponse

This class represents batched collection metadata returned by `BatchDescribeCollections()`.

```cpp
const BatchDescribeCollectionsResponse& response = resp;
```

**METHODS:**

- `const std::vector<CollectionDesc>& Descs() const`

    Returns the collection descriptions returned by the server.

## Example

```cpp
milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(request, response);
for (const auto& desc : response.Descs()) {
    std::cout << desc.CollectionName() << std::endl;
}
```
