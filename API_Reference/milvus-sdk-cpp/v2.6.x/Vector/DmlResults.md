# DmlResults

This class carries the outcome of a data-mutation operation (insert, upsert, or delete). It is accessed via `Results()` on `InsertResponse`, `UpsertResponse`, or `DeleteResponse`.

**METHODS:**

- `const IDArray& IdArray() const`

      The IDs of the entities that were inserted, upserted, or deleted. For auto-ID collections the server fills this in after insert. See IDArray for how to read integer or string IDs.

- `uint64_t Timestamp() const`

      Server-side operation timestamp. Can be passed as the `guarantee_timestamp` in subsequent search or query calls to ensure read-your-writes consistency.

- `uint64_t InsertCount() const`

      Number of rows that were inserted. Populated for `InsertResponse` and `UpsertResponse`.

- `uint64_t DeleteCount() const`

      Number of rows that were deleted. Populated for `DeleteResponse` and `UpsertResponse`.

- `uint64_t UpsertCount() const`

      Number of rows that were upserted (inserted as new or replaced existing). Populated for `UpsertResponse`.

## Example

