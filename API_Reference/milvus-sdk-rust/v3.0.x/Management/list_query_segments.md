# ListQuerySegments()

Lists segments currently loaded on query nodes.

```rust
pub async fn list_query_segments(&self, request: ListQuerySegmentsRequest) -> Result<ListQuerySegmentsResponse>
```

## Request Syntax

```rust
let request = ListQuerySegmentsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose loaded segments are listed. Required.

**RETURN TYPE:**

*Result\<ListQuerySegmentsResponse\>*

**RETURNS:**

A **ListQuerySegmentsResponse** containing the query segment information. Returns an `Error` if the operation fails.

```rust
ListQuerySegmentsResponse
    segments() // -> &[QuerySegmentInfo]
```

**METHODS:**

- `segments()` (*&[QuerySegmentInfo]*) -

    The query segment information.

    - `get_segment_id()` (*i64*) -

        The ID of the segment.

    - `get_collection_id()` (*i64*) -

        The ID of the collection the segment belongs to.

    - `get_partition_id()` (*i64*) -

        The ID of the partition the segment belongs to.

    - `get_memory_size()` (*i64*) -

        The memory size of the segment.

    - `get_row_count()` (*i64*) -

        The number of rows in the segment.

    - `get_index_name()` (*&str*) -

        The name of the index built on the segment.

    - `get_index_id()` (*i64*) -

        The ID of the index built on the segment.

    - `get_node_ids()` (*&[i64]*) -

        The IDs of the query nodes serving the segment.

    - `get_state()` (*SegmentState*) -

        The state of the segment. See [SegmentState](SegmentState.md).

    - `get_collection_name()` (*&str*) -

        The name of the collection the segment belongs to.

    - `get_level()` (*SegmentLevel*) -

        The compaction level of the segment. See [SegmentLevel](SegmentLevel.md).

    - `get_sorted()` (*bool*) -

        Whether the segment is sorted.

    - `get_storage_version()` (*i64*) -

        The storage version of the segment.

## Example

```rust
let request = ListQuerySegmentsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_query_segments(request).await?;
for segment in resp.segments() {
    println!("segment {} on nodes {:?}", segment.get_segment_id(), segment.get_node_ids());
}
```
