# OptimizeResponse

This class represents optimize task output including normalized target size, compaction ID, and progress history.

**METHODS:**

- `const std::string& StatusText() const`

      Returns the current status text reported by optimize execution.

- `const std::string& CollectionName() const`

      Returns the collection being optimized.

- `int64_t CompactionID() const`

      Returns the compaction task ID.

- `const std::string& TargetSize() const`

      Returns the normalized target size used by the optimizer.

- `const std::vector<std::string>& ProgressHistory() const`

      Returns progress messages collected during task execution.

## Example

