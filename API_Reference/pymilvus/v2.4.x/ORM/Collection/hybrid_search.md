# hybrid_search()

This operation performs multi-vector search on a collection and returns search results after reranking.

## Request Syntax

```python
hybrid_search(
    reqs: List,
    rerank: BaseRanker,
    limit: int,
    partition_names: Optional[List[str]] = None,
    output_fields: Optional[List[str]] = None,
    timeout: Optional[float] = None,
    round_decimal: int = -1,
)
```

__PARAMETERS:__

- __reqs__ (_List[AnnSearchRequest]_) -

    A list of search requests, where each request is an __ANNSearchRequest__ object. Each request corresponds to a different vector field and a different set of search parameters.

    - __ANNSearchRequest__: A class representing an ANN search request.

        ```python
        ├── AnnSearchRequest
        │   └── data  
        │   └── anns_field
        │   └── param 
        │   └── limit 
        │   └── expr
        ```

        - __data__: The query vector to search in the request.

        - __anns_field__: The vector field to use in the request.

        - __param__: A dictionary of search parameters for the request. For details, refer to [Search parameters](https://milvus.io/docs/single-vector-search#search-parameters).

        - __limit__: The maximum number of results to return in the request.

        - __expr__: (Optional) The expression to filter the results.

- __rerank __(_BaseRanker_) -

    The reranking strategy to use for hybrid search. Valid values: `WeightedRanker` and `RRFRanker`.

    - `WeightedRanker`: The Average Weighted Scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

    - `RRFRanker`: The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

- __limit__ (_int_) -

    The total number of entities to return.

    You can use this parameter in combination with `offset` in __param__ to enable pagination.

    The sum of this value and `offset` in __param__ should be less than 16,384.

- __partition_names__ (_List[str]_) -

    A list of partition names.

    The value defaults to __None__. If specified, only the specified partitions are involved in queries.

- __output_fields__ (_List[str]_) -

    A list of field names to include in each entity in return.

    The value defaults to __None__. If left unspecified, only the primary field is included.

- __timeout__ (_float_) -

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __round_decimal__ (int) -

    The number of decimal places that Milvus rounds the calculated distances to.

    The value defaults to __-1__, indicating that Milvus skips rounding the calculated distances and returns the raw value.

__RETURN TYPE:__

_SearchResult_

__RETURNS:__

A __SearchResult__ object that contains a list of __Hits__ objects. 

- Response structure

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>A <strong>SearchResult</strong> object contains a list of <strong>Hits</strong> objects, each corresponding to a query vector in the search request. </p>
    <p>A <strong>Hits</strong> object contains a list of <strong>Hit</strong> objects, each corresponding to an entity hit by the search.</p>

    </div>

    ```plaintext
    ├── SearchResult
    │   └── Hits  
    │       ├── ids
    │       ├── distances
    │       └── Hit
    │           ├── id
    │           ├── distance
    │           ├── score
    │           ├── vector
    │           └── get()
    ```

- Properties and methods

    - A __Hits__ object has the following fields:

        - __ids__ (_list[int]_ | _list[str]_)

            A list containing the IDs of the hit entities.

        - __distances__ (list[float]) 

            A list of distances from the hit entities' vector fields to the query vector.

    - A __Hit__ object has the following fields:

        - __id__ (_int_ | _str_)

            The ID of a hit entity.

        - __distance__ (_float_)

            The distance from a hit entity's vector field to the query vector.

        - __score__ (_float_)

            An alias to __distance__.

        - __vector__ (_list[float]_)   

            The vector field of a hit entity.

        - __get(_field_name: str_)__

            A function to get the value of the specified field in a hit entity. 

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
collection = Collection(name='{your_collection_name}') # Replace with the actual name of your collection

res = collection.hybrid_search(
    reqs=[
        AnnSearchRequest(
            data=[['{your_text_query_vector}']],  # Replace with your text vector data
            anns_field='{text_vector_field_name}',  # Textual data vector field
            param={"metric_type": "IP", "params": {"nprobe": 10}}, # Search parameters
            limit=2
        ),
        AnnSearchRequest(
            data=[['{your_image_query_vector}']],  # Replace with your image vector data
            anns_field='{image_vector_field_name}',  # Image data vector field
            param={"metric_type": "IP", "params": {"nprobe": 10}}, # Search parameters
            limit=2
        )
    ],
    # Use WeightedRanker to combine results with specified weights
    rerank=WeightedRanker(0.8, 0.2), # Assign weights of 0.8 to text search and 0.2 to image search
    # Alternatively, use RRFRanker for reciprocal rank fusion reranking
    # rerank=RRFRanker(),
    limit=2
)
```
