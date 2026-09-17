# RoaringBitmap

This class builds the binary blob consumed by a `roaring_match(field, {blob})` filter expression. Use it to create a client-side membership bitmap over a set of integer IDs, then hand the blob to a request's `AddFilterTemplate()`.

```cpp
milvus::RoaringBitmapBuilder builder;
for (const auto& row : rows) {
    builder.AddInt64(row.id);
}
const auto ids = builder.BuildTemplate();   // build once, reuse across requests
```

**METHODS:**

- `RoaringBitmapBuilder& AddInt64(int64_t value)`

    Adds one integer member to the bitmap. Numeric overloads for other types (for example `float` or `uint64_t`) are deleted to prevent accidental conversions.

- `RoaringBitmapBuilder& AddInt64s(const std::vector<int64_t>& values)`

    Adds a batch of integer members.

- `uint64_t Cardinality() const`

    Returns the number of members added.

- `RoaringBitmapStats Stats() const`

    Returns what `Build()` would produce without allocating the body, including cardinality, container counts, and body length. Call `Validate()` first when the member set may exceed the size limits.

- `Status Validate() const`

    Checks the member set against the size limits (`RoaringBitmapMaxHighContainers`, `RoaringBitmapMaxDecodedSize`, `RoaringBitmapMaxBodySize`).

- `RoaringBitmapBuilder::BlobType Build() const`

    Builds the raw bitmap blob. Throws `std::runtime_error` when the member set exceeds a limit; call `Validate()` first, or use `RoaringBitmapTemplate()`, when the set comes from untrusted input.

- `nlohmann::json BuildTemplate() const`

    Returns the same blob as `Build()`, wrapped as a JSON binary value so it can be handed directly to `AddFilterTemplate()`.

## Related constants and helpers

- `RoaringBitmapMaxHighContainers` — Maximum number of high-container slots (1 << 18).
- `RoaringBitmapMaxDecodedSize` — Maximum decoded size in bytes (64 MiB).
- `RoaringBitmapMaxBodySize` — Maximum body size in bytes (128 MiB).
- `void RoaringBitmapTemplate(const std::vector<int64_t>& members, nlohmann::json& output)` — Builds a bitmap over a membership set, ready for `AddFilterTemplate()`.
