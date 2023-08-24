# search()

This method performs Approximate Nearest Neighbor (ANN) searches based on one or more vectors in a collection.

## Invocation

```python
search(
    collection_name,
    data,
    filter,
    limit,
    output_fields,
    search_params,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to search. | String | True     |
| `data` | Vector data to search. | list[] | True     |
| `limit` | Number of results to return per search. Default value: **10**.| Integer | False    | |
| `filter` | Filter used to search. | String | False    |
| `output_fields` | A list of fields to return.| list[String] | False    |
| `search_params` | Parameters used to search.| Dictionary | False    |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

A list of dictionaries, excluding vector embeddings.

## Raises

`ValueError`: Error if the collection being searched does not exist.

## Example

- Search with a single vector:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.search(
        collection_name='medium_articles',
        data = [[-0.008266705,-0.009836753,0.04397694,-0.00025456678, ..., -0.016839132]],
        limit=5,
	    output_fields=["title", "link"]
    )
    ```

- Perform a bulk search with multiple vectors:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.search(
        collection_name='medium_articles',
        data=[
                [-0.008266705,-0.009836753,0.04397694,-0.00025456678, ..., -0.016839132],
                [0.041732933, 0.013779674, -0.027564144, -0.013061441, ..., 0.030096486]
            ],
        limit=5,
        output_fields=["title", "link"]
    )
    ```

- Search with filter expressions in a fixed schema:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.search(
        collection_name='medium_articles',
        data = [[0.041732933, 0.013779674, -0.027564144, -0.013061441, ..., 0.030096486]],
        limit=5,
        filter="10 < reading_time < 15", # Filter articles with reading_time greater than 10 and less than 15.
        output_fields=["title", "link"]
    )
    ```

- Search with filter expressions in a dynamic schema:

    ```python
    from pymilvus import MilvusClient

    client = MilvusClient(uri, token)

    client.search(
        collection_name='medium_articles',
        data = [[0.041732933, 0.013779674, -0.027564144, -0.013061441, ..., 0.030096486]],
        limit=5,
        filter='$meta["claps"] > 30 and responses < 10',
        output_fields=['title', 'claps', 'responses']
    )
    ```

    The preceding code block shows how to access fields `claps` and `responses` that are not defined in the schema.