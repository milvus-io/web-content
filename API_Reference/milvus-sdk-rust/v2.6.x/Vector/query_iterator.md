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

**RETURN TYPE:**

*Result\<QueryIterator\>*

**RETURNS:**

A **QueryIterator** used to page through the query results in batches. Returns an `Error` if the operation fails.

```rust
QueryIterator
    next() // -> Result<Option<response::dql::QueryResponse>>
    close() // -> Result<()>
```

**METHODS:**

- `next()` (*Result<Option<response::dql::QueryResponse>>*) -

    Fetches the next batch of query results, or `None` when exhausted.

- `close()` (*Result<()>*) -

    Closes the iterator and releases server resources.

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
