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

**RETURN TYPE:**

*Result\<ListPersistentSegmentsResponse\>*

**RETURNS:**

A **ListPersistentSegmentsResponse** containing the persistent segment information. Returns an `Error` if the operation fails.

```rust
ListPersistentSegmentsResponse
    segments() // -> &[PersistentSegmentInfo]
```

**METHODS:**

- `segments()` (*&[PersistentSegmentInfo]*) -

    The persistent segment information.

    - `get_segment_id()` (*i64*) -

        The ID of the segment.

    - `get_collection_id()` (*i64*) -

        The ID of the collection the segment belongs to.

    - `get_partition_id()` (*i64*) -

        The ID of the partition the segment belongs to.

    - `get_row_count()` (*i64*) -

        The number of rows in the segment.

    - `get_state()` (*SegmentState*) -

        The state of the segment. See [SegmentState](SegmentState.md).

    - `get_collection_name()` (*&str*) -

        The name of the collection the segment belongs to.

    - `get_level()` (*SegmentLevel*) -

        The compaction level of the segment. See [SegmentLevel](SegmentLevel.md).

    - `get_sorted()` (*bool*) -

        

    - `get_storage_version()` (*i64*) -

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
