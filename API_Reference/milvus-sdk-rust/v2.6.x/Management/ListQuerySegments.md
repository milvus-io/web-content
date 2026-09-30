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

**RETURNS:**

*Result\<ListQuerySegmentsResponse\>*

`ListQuerySegmentsResponse` exposes `segments()` returning a slice of `QuerySegmentInfo`, each carrying the segment ID, collection/partition IDs, memory size, row count, index name and ID, serving node IDs, `SegmentState`, compaction `SegmentLevel`, sort flag, and storage version. Returns an `Error` on failure.

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
