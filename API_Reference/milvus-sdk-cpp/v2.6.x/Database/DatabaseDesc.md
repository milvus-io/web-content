# DatabaseDesc

This class represents the metadata of a Milvus database. It is returned by calling `Desc()` on a `DescribeDatabaseResponse` object.

**METHODS:**

- `const std::string& Name() const`

    Name of the database.

- `int64_t ID() const`

    Server-assigned database ID.

- `const std::unordered_map<std::string, std::string>& Properties() const`

    Database-level properties as key-value pairs.

- `uint64_t CreatedTime() const`

    UTC timestamp (microseconds) when the database was created.

## Example

