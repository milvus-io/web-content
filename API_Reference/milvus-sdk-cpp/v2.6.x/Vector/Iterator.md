# Iterator

This page documents both `SearchIterator` and `QueryIterator`. Both are type aliases of the `Iterator<T>` template base class, where `T` is `SingleResult` for search and `QueryResults` for query. Use these iterators when you need to retrieve more results than the `limit` of a single request allows.

## Iterator

Abstract base class. Not instantiated directly; use the concrete aliases below.

- `virtual Status Next(T& results) = 0`

      Fetches the next batch of results into `results`. Returns a `Status` with `IsOk() == false` when there are no more results (the iterator is exhausted). Not thread-safe.

## SearchIterator

Iterates over `SingleResult` batches from a `SearchIterator()` call. Each call to `Next()` fills a `SingleResult` with the next batch of hits.

Obtained via `MilvusClientV2::SearchIterator(IteratorArguments, SearchIteratorPtr&)`.

## QueryIterator

Iterates over `QueryResults` batches from a `QueryIterator()` call. Each call to `Next()` fills a `QueryResults` with the next batch of rows.

Obtained via `MilvusClientV2::QueryIterator(IteratorArguments, QueryIteratorPtr&)`.

## Example

