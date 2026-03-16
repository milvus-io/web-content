# CollectionInfo

This class holds summary information about a single collection in a list result. `ListCollectionsResponse::CollectionInfos()` returns a `CollectionsInfo` value, which is a type alias for `std::vector<CollectionInfo>`.

**METHODS:**

- `const std::string& Name() const`

      Name of the collection.

- `int64_t ID() const`

      Server-assigned internal ID of the collection.

- `uint64_t CreatedTime() const`

      UTC timestamp (microseconds) when the collection was created.

- `uint64_t MemoryPercentage() const`

      Deprecated. Always returns `0`. Use `GetLoadState()` to check the load progress instead.

## Example

