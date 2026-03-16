# SearchResults

This page documents both `SearchResults` and `SingleResult`. `SearchResults` wraps the results for all query vectors in a multi-NQ search. Each element of the inner list is a `SingleResult` containing the top-k hits for one query vector.

## SearchResults

This class is returned by calling `Results()` on a `SearchResponse` or `HybridSearchResponse`.

**Methods:**

- `const std::vector<SingleResult>& Results() const`

      Returns one `SingleResult` per query vector, in the same order as the vectors were added to the request.

- `const std::vector<float>& Recalls() const`

      Recall values per query vector. Populated only when the search is run on a Zilliz Cloud instance with `enable_recall_calculation` set to `true`. Otherwise the vector is empty.

## SingleResult

This struct holds the top-k hits for one query vector.

**Methods:**

- `const std::vector<float>& Scores() const`

      Similarity scores (distances) for each hit, in descending relevance order.

- `IDArray Ids() const`

      Primary key IDs of the top-k hits as an `IDArray`. Prefer using `OutputField(PrimaryKeyName())` for typed access.

- `const std::string& PrimaryKeyName() const`

      The name of the primary key field as reported by the server. Useful when the caller does not know the PK field name.

- `const std::string& ScoreName() const`

      Name of the score field in the result (default: `"score"`). May be `"_score"` or `"__score"` if the collection has a field named `"score"`.

- `FieldDataPtr OutputField(const std::string& name) const`

      Returns a named output field as a `FieldDataPtr`. Cast to the concrete type with `std::dynamic_pointer_cast<FloatVecFieldData>(result.OutputField("vec"))`.

- `const std::vector<FieldDataPtr>& OutputFields() const`

      Returns all output fields.

- `const std::set<std::string>& OutputFieldNames() const`

      Names of the output fields requested in the search.

- `Status OutputRows(EntityRows& rows) const`

      Converts all hits to a vector of JSON-like row maps and stores them in `rows`.

- `Status OutputRow(int i, EntityRow& row) const`

      Converts hit at index `i` to a single JSON-like row map.

- `uint64_t GetRowCount() const`

      Number of hits returned.

## Example

