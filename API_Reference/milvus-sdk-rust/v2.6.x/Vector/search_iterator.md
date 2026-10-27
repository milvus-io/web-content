# search_iterator()

Creates an iterator that retrieves search results in batches while preserving the server search token and one MVCC session timestamp across pages.

```rust
pub async fn search_iterator(&self, request: SearchIteratorRequest) -> Result<SearchIterator>
```

## Request Syntax

```rust
let request = SearchIteratorRequest::builder()
    .search(
        SearchRequest::builder()
            .collection_name("books")
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
            .limit(1000)
            .build()?,
    )
    .batch_size(100)
    .build()?;
let mut iterator = client.search_iterator(request).await?;
```

**REQUEST FIELDS:**

- `search: SearchRequest`

    The `SearchRequest` that defines the collection, vector field, and query vectors. Search iterators do not support primary-key IDs or `order_by_fields`. Required.

- `batch_size: usize`

    Number of hits returned per `next()` call. Defaults to `1000`.

- `limit: Option<usize>`

    Optional total number of hits to iterate before stopping.

**RETURN TYPE:**

*Result\<SearchIterator\>*

**RETURNS:**

A **SearchIterator** used to page through the search results in batches. Returns an `Error` if the operation fails.

```rust
SearchIterator
    next() // -> Result<Option<response::dql::SearchResponse>>
    close() // -> Result<()>
```

**METHODS:**

- `next()` (*Result<Option<response::dql::SearchResponse>>*) -

    Fetches the next batch of search results, or `None` when exhausted.

- `close()` (*Result<()>*) -

    Closes the iterator and releases server resources.

## Example

```rust
let request = SearchIteratorRequest::builder()
    .search(
        SearchRequest::builder()
            .collection_name("books")
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
            .limit(1000)
            .build()?,
    )
    .batch_size(100)
    .build()?;
let mut iterator = client.search_iterator(request).await?;
while let Some(batch) = iterator.next().await? {
    println!("got {} hits", batch.results().len());
}
```
