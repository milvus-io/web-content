---
id: multi-vector-search.md
order: 2
summary: This guide demonstrates how to perform multi-vector search in Milvus and understand the reranking of results.
title: Multi-Vector Search
---

# Multi-Vector Search

Since Milvus 2.4, we introduced multi-vector support and a hybrid search framework, which means users can bring in several vector fields (max to 10) into one collection. Different vector fields can represent different aspects, different embedding models or even different modalities of data characterizing the same entity, which greatly expands the richness of information.

Multi-vector search allows conducting a search that includes multiple vector fields within a single collection. This feature enables executing search requests over various vector fields and integrating the results using reranking strategies, including Reciprocal Rank Fusion (RRF) and Weighted Scoring. 

It is mainly used in comprehensive search scenarios, such as finding the most similar person in the vector library based on multiple elements such as someone's picture, voice, fingerprint, etc.

This guide provides a step-by-step explanation of how to execute multi-vector search in Milvus and understand the reranking of results.

## API overview

The `hybrid_search` API is central to performing a multi-vector search. The following 2 key params represent two essential phases: multi-way recalls and a hybrid rerank.

- `reqs`: This is a list of ANN search requests. Each search request is an `ANNSearchRequest` object tied to a unique vector field and its search parameters.

- `rerank`: Specifies the reranking strategy. Options include `WeightedRanker` and `RRFRanker`.

    - `WeightedRanker`: The Average Weighted Scoring reranking strategy, which prioritizes vectors based on relevance, averaging their significance.

    - `RRFRanker`: The RRF reranking strategy, which merges results from multiple searches, favoring items that consistently appear.

    More rerank models are coming soon to enhance our reranking capabilities, such as Cohere ranking, BGE ranking, etc. Stay tuned!

__Example of a `hybrid_search` call__:

```python
# Create a Collection instance
collection = Collection(name='{your_collection_name}') # Replace with the actual name of your collection

# Perform hybrid search with placeholder configs
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

__Expected output__:

```python
[
  "['id: 2, distance: 0.4452269673347473, entity: {}', 'id: 1, distance: 0.0, entity: {}']"
]
```

__Considerations__:

- A collection must have multiple vector fields, each with its own index.

- Partially indexed or loaded vector fields in a collection will result in an error.

- Currently, each AnnSearchRequest in a hybrid search can carry one query vector.

- Typically, each collection has a default allowance of up to 4 vector fields. However, you have the option to adjust the `proxy.maxVectorFieldNum` configuration to expand the maximum number of vector fields in a collection, with a maximum limit of 10 vector fields per collection. See [Proxy-related Configurations](https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations) for more.

## Practical examples 

Consider a collection named `test_collection` with two vector fields: `filmVector` and `posterVector`.

- `filmVector`: Represents textual content of a film.

- `posterVector`: Converts visual features of a film's poster into vector format.

Here is an example of creating and indexing the collection:

```python
# Create schema
fields = [
    FieldSchema(name="film_id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="filmVector", dtype=DataType.FLOAT_VECTOR, dim=5),
    FieldSchema(name="posterVector", dtype=DataType.FLOAT_VECTOR, dim=5)]

schema = CollectionSchema(fields=fields,enable_dynamic_field=False)

# Create collection
collection = Collection(name="test_collection", schema=schema)

# Create index for each vector field
index_params = {
    "metric_type": "IP",
    "index_type": "IVF_FLAT",
    "params": {"nlist": 128},
}

collection.create_index("filmVector", index_params)
collection.create_index("posterVector", index_params)

collection.load()
utility.loading_progress('test_collection')

# Output:
# {'loading_progress': '100%'}
```

To insert data into the collection, use the `insert` method.

Here is how to insert 5 rows of data:

```python
# Insert data
data = [
    [1, 2, 3, 4, 5],
    [
        [0.8896863042430693, 0.370613100114602, 0.23779315077113428, 0.38227915951132996, 0.5997064603128835],
        [0.5078114059712959, 0.3432028079630215, 0.8089418399592051, 0.474462050627378, 0.5856421849875101],
        [0.2990413172901394, 0.9028391994278029, 0.34082510211853334, 0.4107540298194492, 0.47539164233358744],
        [0.5832605600308075, 0.8511790894069673, 0.7112488464298848, 0.553514109969526, 0.15985473038541032],
        [0.21188658802419225, 0.572143948100824, 0.4585998365439241, 0.565993613724163, 0.5862558542959135]
    ],
    [
        [0.02550758562349764, 0.006085637357292062, 0.5325251250159071, 0.7676432650114147, 0.5521074424751443],
        [0.19516017744052183, 0.22918923173953565, 0.9548363036811129, 0.5643725931032165, 0.5964664905051439],
        [0.06260894301791908, 0.814777822276412, 0.8672567702540677, 0.1374189887611933, 0.9268283838873627],
        [0.5364943790237713, 0.9962551093178361, 0.31902289153816554, 0.9924305856358849, 0.6287783946443399],
        [0.7644141951092023, 0.8478868932552704, 0.5442341774477372, 0.8379655462947587, 0.5167658776852181]
    ]
]

collection.insert(data)

# Output:
# (insert count: 5, delete count: 0, upsert count: 0, timestamp: 447370828842532866, success count: 5, err count: 0)
```

Because Milvus executes searches over multiple vector fields, you need to create separate `ANNSearchRequest` objects for each vector field:

```python
# Create ANN search request for filmVector
query_filmVector = [[0.8896863042430693, 0.370613100114602, 0.23779315077113428, 0.38227915951132996, 0.5997064603128835]]

search_param_1 = {
    "data": query_filmVector, # Query vector
    "anns_field": "filmVector", # Vector field name
    "param": {
        "metric_type": "IP",
        "params": {"nprobe": 10}
    },
    "limit": 2
}
request_1 = AnnSearchRequest(**search_param_1)

# Create ANN search request for posterVector
query_posterVector = [[0.02550758562349764, 0.006085637357292062, 0.5325251250159071, 0.7676432650114147, 0.5521074424751443]]
search_param_2 = {
    "data": query_posterVector, # Query vector
    "anns_field": "posterVector", # Vector field name
    "param": {
        "metric_type": "IP",
        "params": {"nprobe": 10}
    },
    "limit": 2
}
request_2 = AnnSearchRequest(**search_param_2)
```

Once `request_1` and `request_2` are created, implement hybrid search with reranking strategies: Weighted Scoring and RRF.

### Use weighted scoring

To use this strategy, set `rerank` to `WeightedRanker` and assign weights to each `ANNSearchRequest`.

```python
# hybrid search with WeightedRanker

weighted_result = collection.hybrid_search(
    reqs=[request_1, request_2],
    # Combine the results with weight 0.8 for request_1 and 0.2 for request_2
    rerank=WeightedRanker(0.8, 0.2),
    limit=2
)

# Print the results
print(weighted_result)

# Output:
# ["['id: 2, distance: 0.4452269673347473, entity: {}', 'id: 1, distance: 0.0, entity: {}']"]
```

### Use RRF

For RRF reranking, set `rerank` to `RRFRanker`:

```python
# hybrid search with RRFRanker

rrf_result = collection.hybrid_search(
    reqs=[request_1, request_2],
    rerank=RRFRanker(),
    limit=2
)

# Print the results
print(rrf_result)

# Output:
# ["['id: 1, distance: 0.032786883413791656, entity: {}', 'id: 2, distance: 0.032258063554763794, entity: {}']"]
```

## Hybrid search parameters

The following table outlines the parameters used in a hybrid search.

|  Parameter                          |  Description                                                                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  `reqs`                             |  A list of search requests, where each request is an `ANNSearchRequest` object. Each request corresponds to a different vector field and a different set of search parameters. |
|  `reqs.ANNSearchRequest`            |  A class representing an ANN search request.                                                                                                                                   |
|  `reqs.ANNSearchRequest.data`       |  The query vector to search in the request. This parameter accepts a list containing one element (or query vector).                                                                                                                                   |
|  `reqs.ANNSearchRequest.anns_field` |  The vector field to use in the request.                                                                                                                                       |
|  `reqs.ANNSearchRequest.param`      |  A dictionary of search parameters for the request. For details, refer to [Search parameters](single-vector-search.md#search-parameters).                                       |
|  `reqs.ANNSearchRequest.limit`      |  The maximum number of results to return in the request. When performing a hybrid search with multiple ANN search requests, the top results defined by limit from each request will be combined and re-ranked before returning the final search results.                                                                                                                      |
|  `reqs.ANNSearchRequest.expr`       |  (Optional) The expression to filter the results.                                                                                                                              |
|  `rerank`                           |  The reranking strategy to use for hybrid search. Valid values: `WeightedRanker` and `RRFRanker`.                                                                              |
|  `limit`                            |  The maximum number of results to return in the hybrid search.                                                                                                                 |

## FAQ

1. __In which scenarios is multi-vector search recommended?__

    Multi-vector search is ideal for complex situations demanding high accuracy, especially when an entity can be represented by multiple, diverse vectors. This applies to cases where the same data, such as a sentence, is processed through different embedding models or when multimodal information (like images, fingerprints, and voiceprints of an individual) is converted into various vector formats. By assigning weights to these vectors, their combined influence can significantly enrich recall and improve the effectiveness of search results.

1. __How does a weighted ranker normalize distances between different vector fields?__

    A weighted ranker normalizes the distances between vector fields using assigned weights to each field. It calculates the importance of each vector field according to its weight, prioritizing those with higher weights. It's advised to use the same metric type across ANN search requests to ensure consistency. This method ensures that vectors deemed more significant have a greater influence on the overall ranking.

1. __Is it possible to use alternative rankers like Cohere Ranker or BGE Ranker?__

    Currently, only the provided rankers are supported. Plans to include additional rankers are underway for future updates.

1. __Is it possible to conduct multiple hybrid search operations at the same time?__

    Yes, simultaneous execution of multiple hybrid search operations is supported.