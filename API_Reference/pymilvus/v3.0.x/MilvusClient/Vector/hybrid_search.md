# hybrid_search()

Update the embedded AnnSearchRequest parameter documentation and examples. Async variant shares the sync parameter contract. Document filter as an alias for expr and the mutual-exclusion validation. Document the read-only filter property inline; it is accessed as request.filter, not request.filter().

## Request Syntax

```python
hybrid_search(
    collection_name: str,
    reqs: List[AnnSearchRequest],
    ranker: Union[BaseRanker, Function],
    limit: int = 10,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    partition_names: Optional[List[str]] = None,
    **kwargs,
) -> SearchResult
```

**PARAMETERS:**

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection to search.

- **reqs** (*List[AnnSearchRequest]*) -
**[REQUIRED]**
The ANN search requests combined by the hybrid search. Construct each request with `AnnSearchRequest(data, anns_field, param, limit, expr=None, expr_params=None, filter=None)`.

    - **data** (*Union[List, SparseMatrixInputType]*) -
**[REQUIRED]**
The query vectors or sparse matrix used for this ANN search request.

    - **anns_field** (*str*) -
**[REQUIRED]**
The name of the vector field to search.

    - **param** (*Dict*) -
**[REQUIRED]**
The ANN search parameters, such as the metric type and search-specific settings.

    - **limit** (*int*) -
**[REQUIRED]**
The maximum number of matches returned by this ANN search request.

    - **expr** (*Optional[str]*) -
Default: `None`
The Boolean filtering expression applied before the ANN search. Do not provide both `expr` and `filter`.

    - **expr_params** (*Optional[dict]*) -
Default: `None`
The values substituted into expression-template placeholders.

    - **filter** (*Optional[str]*) -
Default: `None`
The alias for `expr`. Do not provide both values. The resolved expression is available through the read-only `filter` property as `request.filter`.

- **ranker** (*Union[BaseRanker, Function]*) -
**[REQUIRED]**
The ranker used to combine and order results from the search requests.

- **limit** (*int*) -
Default: `10`
The maximum number of records to return, also known as `topk`.

- **output_fields** (*Optional[List[str]]*) -
Default: `None`
The scalar fields to include in each search result.

- **timeout** (*Optional[float]*) -
Default: `None`
The maximum time, in seconds, to wait for the RPC. When omitted, the client waits until the server responds or an error occurs.

- **partition_names** (*Optional[List[str]]*) -
Default: `None`
The names of the partitions to search.

- **kwargs** (*Any*) -
The additional search options, including the pagination offset and consistency level.

**RETURN TYPE:**

*SearchResult*

**RETURNS:**

Search results for the combined ANN requests after applying each request's expression or filter.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

The example constructs an ANN request and runs a hybrid search.

```python
from pymilvus import AnnSearchRequest, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
request = AnnSearchRequest(
    data=[[0.1, 0.2, 0.3]],
    anns_field="vector",
    param={"metric_type": "COSINE"},
    limit=10,
    filter='category == "paper"',
)
results = client.hybrid_search(
    collection_name="book_chunks",
    reqs=[request],
    ranker=None,
    limit=10,
)
print(request.filter)
print(results)
```
