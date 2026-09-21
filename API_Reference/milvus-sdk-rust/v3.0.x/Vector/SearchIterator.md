# SearchIterator()

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

**RETURNS:**

*Result\<SearchIterator\>*

Returns a `SearchIterator`. Call `next()` to receive the next `SearchResponse` batch (`None` when exhausted) and `close()` when done. Returns `Error` on failure.

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
