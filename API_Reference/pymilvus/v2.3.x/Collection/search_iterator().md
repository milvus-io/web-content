# search_iterator()

This method conducts a vector similarity search with an iterator.

## Invocation

```python
search_iterator(vectors_to_search, vector_field, search_params, limit, output_fields)
```

## Parameters

| Parameter | Description | Type | Required
| --- | --- | --- | --- |
| `vectors_to_search` | Query vector to search with. | list[] | True |
| `vector_field` | Name of the vector field. | String | True |
| `search_params` | Search parameters specific to the index. Find more expression details in [search()](search().md). | Dict | True |
| `limit` | Number of results to return per page. | Integer | True |
| `radius` | Angle where the vector with the least similarity resides. Find more expression details in [search()](search().md). | Float | False |
| `range_filter` | Filters vector field values whose similarity to the query vector falls into a specific range. Find more expression details in [search()](search().md). | Float | False |
| `output_fields` | Name of the field to return. | list[String] | False |

## Return

A SearchResult object, an iterable, 2d-array-like class whose first dimension is the number of vectors to query (`nq`), and the second dimension is the number of limit (`topk`).

## Raises

- `RpcError`: error if gRPC encounter an error.
- `ParamError`: error if the parameters are invalid.
- `DataTypeNotMatchException`: error if wrong type of data is passed to server.
- `BaseException`: error if the return result from server is not ok.

## Example

```python
vectors_to_search = rng.random((SEARCH_NQ, DIM))

search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10, "radius": 1.0},
}

# create a search iterator
search_iterator = collection.search_iterator(
    vectors_to_search,
    VECTOR_FIELD_NAME,
    search_params,
    limit=5,
    output_fields=[bookID, authors]
)
                                             
while True:
    # turn to the next page
    res = search_iterator.next()
    if len(res) == 0:
        print("search iteration finished, close")
        # close the iterator
        search_iterator.close()
        break
    for i in range(len(res)):
        print(res[i])
```
