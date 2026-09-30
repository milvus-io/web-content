# QueryIterator()

Creates an iterator that retrieves query results in bounded batches.

```rust
pub async fn query_iterator(&self, request: QueryIteratorRequest) -> Result<QueryIterator>
```

## Request Syntax

```rust
let request = QueryIteratorRequest::builder()
    .query(
        QueryRequest::builder()
            .collection_name("books")
            .filter("id > 0")
            .output_fields(["id", "title"])
            .build()?,
    )
    .batch_size(100)
    .build()?;
let mut iterator = client.query_iterator(request).await?;
```

**REQUEST FIELDS:**

- `query: QueryRequest`

    The `QueryRequest` that defines the collection, filter, and output fields. Query iterators do not accept primary-key IDs or `order_by_fields`. Required.

- `batch_size: usize`

    Number of rows returned per `next()` call. Defaults to `1000`.

- `reduce_stop_for_best: bool`

    Whether the iterator stops fetching a page as soon as the best result is found. Defaults to `true`.

- `cursor: Option<QueryCursor>`

    A resumable primary-key cursor that pins the MVCC snapshot and resumes pagination from the captured position. Resume only with a cursor obtained from `QueryIterator::cursor`.

**RETURNS:**

*Result\<QueryIterator\>*

Returns a `QueryIterator`. Call `next()` to receive the next `QueryResponse` batch (`None` when exhausted) and `close()` when done. Returns `Error` on failure.

## Example

```rust
let request = QueryIteratorRequest::builder()
    .query(
        QueryRequest::builder()
            .collection_name("books")
            .filter("id > 0")
            .output_fields(["id", "title"])
            .build()?,
    )
    .batch_size(100)
    .build()?;
let mut iterator = client.query_iterator(request).await?;
while let Some(batch) = iterator.next().await? {
    println!("got {} rows", batch.results().get_row_count());
}
```
