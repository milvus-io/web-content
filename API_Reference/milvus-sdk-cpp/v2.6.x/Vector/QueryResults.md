# QueryResults

This class holds the column-based result data returned by a `Query()` call. Access it via `Results()` on a `QueryResponse` object.

**METHODS:**

- `FieldDataPtr OutputField(const std::string& name) const`

      Returns the named output field as a `FieldDataPtr`. Cast to the concrete type with `std::dynamic_pointer_cast<Int64FieldData>(results.OutputField("id"))`.

- `const std::vector<FieldDataPtr>& OutputFields() const`

      Returns all output fields in the order they were returned by the server.

- `const std::set<std::string>& OutputFieldNames() const`

      Returns the set of output field names that were requested in the query.

- `Status OutputRows(EntityRows& rows) const`

      Converts all result rows to a vector of JSON-like row maps and stores them in `rows`.

- `Status OutputRow(int i, EntityRow& row) const`

      Converts the row at index `i` to a JSON-like row map.

- `uint64_t GetRowCount() const`

      Number of rows returned. When the query uses `count(*)`, this returns the aggregate count.

## Example

