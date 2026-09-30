# MilvusClientV2Session

A cluster-scoped view of a [ClientV2](MilvusClientV2.md) that exposes the DQL surface only.

```rust
use milvus::v2::prelude::*;
```

Created through [`ClientV2::session`](MilvusClientV2.md), the session shares the parent client's channel, selected database, RPC settings, and caches, and routes every DQL request to a target global-cluster identifier. It does not expose schema, DML, or administration operations. Closing the session marks it closed and makes every subsequent call fail, regardless of which clone of the session is used.

## Construction

```rust
let session = client.session("my-cluster-id")?;
```

`ClientV2::session` returns an `Error` when `cluster_id` is empty.

## PARAMETERS

| Parameter | Type | Description |
| --- | --- | --- |
| `cluster_id` | `String` | Target global-cluster identifier to which every request is routed. A global-cluster connection selects the member cluster to serve the request; a regular server ignores the param when it does not support cluster routing. |

## METHODS

- `pub fn cluster_id(&self) -> &str`

    Returns the target cluster identifier.

- `pub async fn search(&self, request: SearchRequest) -> Result<SearchResponse>`

    Searches vector fields in the target cluster.

- `pub async fn hybrid_search(&self, request: HybridSearchRequest) -> Result<SearchResponse>`

    Executes multiple vector searches combined with a reranking strategy in the target cluster.

- `pub async fn query(&self, request: QueryRequest) -> Result<QueryResponse>`

    Queries entities in the target cluster.

- `pub async fn get(&self, request: GetRequest) -> Result<GetResponse>`

    Retrieves entities by their primary-key values in the target cluster.

- `pub async fn query_iterator(&self, request: QueryIteratorRequest) -> Result<QueryIterator>`

    Creates a query iterator bound to the target cluster. Closing the session also stops this iterator's subsequent pages.

- `pub async fn search_iterator(&self, request: SearchIteratorRequest) -> Result<SearchIterator>`

    Creates a search iterator bound to the target cluster. Closing the session also stops this iterator's subsequent pages.

- `pub fn close(&self)`

    Closes this session view without disconnecting the parent client. Every subsequent call on this session, including on clones created before the close, fails with an error.
