# ListPersistentSegments()

Lists persisted segments reported by data nodes.

```rust
pub async fn list_persistent_segments(&self, request: ListPersistentSegmentsRequest) -> Result<ListPersistentSegmentsResponse>
```

## Request Syntax

```rust
let request = ListPersistentSegmentsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose persisted segments are listed. Required.

**RETURNS:**

*Result\<ListPersistentSegmentsResponse\>*

`ListPersistentSegmentsResponse` exposes `segments()` returning a slice of `PersistentSegmentInfo`, each carrying the segment ID, collection/partition IDs, row count, `SegmentState`, compaction `SegmentLevel`, sort flag, and storage version. Returns an `Error` on failure.

## Example

```rust
let request = ListPersistentSegmentsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_persistent_segments(request).await?;
for segment in resp.segments() {
    println!("segment {}: {} rows", segment.get_segment_id(), segment.get_row_count());
}
```
