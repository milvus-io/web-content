# CollectionDesc

This class represents the full schema and runtime metadata of a collection. It is returned by calling `Desc()` on a `DescribeCollectionResponse` object.

**METHODS:**

- `const std::string& DatabaseName() const`

    Name of the database the collection belongs to.

- `const std::string& CollectionName() const`

    Name of the collection.

- `const std::string& Description() const`

    Human-readable description of the collection.

- `int64_t NumShards() const`

    Number of shards in the collection.

- `const CollectionSchema& Schema() const`

    Schema of the collection, including field definitions and dynamic field settings. For details see CollectionSchema.

- `int64_t ID() const`

    Server-assigned collection ID.

- `const std::vector<std::string>& Alias() const`

    List of aliases attached to this collection.

- `uint64_t CreatedTime() const`

    UTC timestamp (microseconds) when the collection was created.

- `uint64_t UpdateTime() const`

    UTC timestamp (microseconds) of the last schema update.

- `const std::unordered_map<std::string, std::string>& Properties() const`

    Collection-level properties as key-value pairs (e.g., TTL settings).

## Example

