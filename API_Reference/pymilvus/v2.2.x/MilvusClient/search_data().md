# search_data()

This method searches for one or more query vectors in the collection.

## Invocation

```python
search_data(
    data,
    top_k,
    filter_expression,
    return_fields,
    partitions,
    search_params,
    timeout
    )
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `data` | Vector data to search. | list[] | True     |
| `top_k` | Number of results to return per search. Default value: **10**.| Integer | False    | |
| `filter_expression` | Filter used to search. | String | False    |
| `return_fields` | A list of fields to return.| list[String] | False    |
| `partitions` | Partitions in which data is searched.| list[String] | False    |
| `search_params` | Parameters used to search.| Dictionary | False    |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception.| Integer | False    |


## Raises

`ValueError`: Error if the collection being searched does not exist.

## Returns

A list of dictionaries are returned, excluding vector embeddings.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.search_data(
    data = [[0.041732933, 0.013779674, -0.027564144, -0.013061441, ..., 0.030096486]],
    top_k=5,
    filter_expression="10 < reading_time < 15",
	return_fields=["title", "link"]
)
```