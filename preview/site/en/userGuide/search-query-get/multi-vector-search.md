---
id: multi-vector-search.md
order: 2
summary: This guide demonstrates how to perform hybrid search in Milvus and understand the reranking of results.
title: Hybrid Search
---

# Hybrid Search

Since Milvus 2.4, we introduced multi-vector support and a hybrid search framework, which means users can bring in several vector fields (up to 10) into a single collection. These vectors in different columns represent diverse facets of data, originating from different embedding models or undergoing distinct processing methods. The results of hybrid searches are integrated using reranking strategies, such as Reciprocal Rank Fusion (RRF) and Weighted Scoring. To learn more about reranking strategies, refer to [Reranking](reranking.md).

This feature is particularly useful in comprehensive search scenarios, such as identifying the most similar person in a vector library based on various attributes like pictures, voice, fingerprints, etc.

In this tutorial, you will learn how to:

- Create multiple `AnnSearchRequest` instances for similarity searches on different vector fields;

- Configure a reranking strategy to combine and rerank search results from multiple `AnnSearchRequest` instances;

- Use the [`hybrid_search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md) method to perform a hybrid search.

<div class="alert note">

The code snippets on this page use the [PyMilvus ORM module](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md) to interact with Milvus. Code snippets with the new [MilvusClient SDK](https://milvus.io/api-reference/pymilvus/v2.4.x/About.md) will be available soon.

</div>

## Preparations

Before starting a hybrid search, ensure you have a collection with multiple vector fields. Currently, Milvus introduces a default of four vector fields per collection, which can be extended to a maximum of ten by modifying the [proxy.maxVectorFieldNum](https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum) configuration.

Below is an example of creating a collection named `test_collection` with two vector fields, `filmVector` and `posterVector`, and inserting random entities into it.

```python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
import random

# Connect to Milvus
connections.connect(
    host="10.102.7.3", # Replace with your Milvus server IP
    port="19530"
)

# Create schema
fields = [
    FieldSchema(name="film_id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="filmVector", dtype=DataType.FLOAT_VECTOR, dim=5), # Vector field for film vectors
    FieldSchema(name="posterVector", dtype=DataType.FLOAT_VECTOR, dim=5)] # Vector field for poster vectors

schema = CollectionSchema(fields=fields,enable_dynamic_field=False)

# Create collection
collection = Collection(name="test_collection", schema=schema)

# Create index for each vector field
index_params = {
    "metric_type": "L2",
    "index_type": "IVF_FLAT",
    "params": {"nlist": 128},
}

collection.create_index("filmVector", index_params)
collection.create_index("posterVector", index_params)

# Generate random entities to insert
entities = []

for _ in range(1000):
    # generate random values for each field in the schema
    film_id = random.randint(1, 1000)
    film_vector = [ random.random() for _ in range(5) ]
    poster_vector = [ random.random() for _ in range(5) ]

    # create a dictionary for each entity
    entity = {
        "film_id": film_id,
        "filmVector": film_vector,
        "posterVector": poster_vector
    }

    # add the entity to the list
    entities.append(entity)
    
collection.insert(entities)
```

## Step 1: Create Multiple AnnSearchRequest Instances

A hybrid search uses the `hybrid_search()` API to perform multiple ANN search requests in a single call. Each `AnnSearchRequest` represents a single search request on a specific vector field.

The following example creates two `AnnSearchRequest` instances to perform individual similarity searches on two vector fields.

```python
from pymilvus import AnnSearchRequest

# Create ANN search request 1 for filmVector
query_filmVector = [[0.8896863042430693, 0.370613100114602, 0.23779315077113428, 0.38227915951132996, 0.5997064603128835]]

search_param_1 = {
    "data": query_filmVector, # Query vector
    "anns_field": "filmVector", # Vector field name
    "param": {
        "metric_type": "L2", # This parameter value must be identical to the one used in the collection schema
        "params": {"nprobe": 10}
    },
    "limit": 2 # Number of search results to return in this AnnSearchRequest
}
request_1 = AnnSearchRequest(**search_param_1)

# Create ANN search request 2 for posterVector
query_posterVector = [[0.02550758562349764, 0.006085637357292062, 0.5325251250159071, 0.7676432650114147, 0.5521074424751443]]
search_param_2 = {
    "data": query_posterVector, # Query vector
    "anns_field": "posterVector", # Vector field name
    "param": {
        "metric_type": "L2", # This parameter value must be identical to the one used in the collection schema
        "params": {"nprobe": 10}
    },
    "limit": 2 # Number of search results to return in this AnnSearchRequest
}
request_2 = AnnSearchRequest(**search_param_2)

# Store these two requests as a list in `reqs`
reqs = [request_1, request_2]
```

Parameters:

- `AnnSearchRequest` (_object_)

    A class representing an ANN search request. Each hybrid search can contain 1 to 1,024 `ANNSearchRequest` objects at a time.

- `data` (_list_)

    The query vector to search in a single `AnnSearchRequest`. Currently, this parameter accepts a list containing only a single query vector, for example, `[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]`. In the future, this parameter will be expanded to accept multiple query vectors.

- `anns_field` (_string_)

    The name of the vector field to use in a single `AnnSearchRequest`.

- `param` (_dict_)

    A dictionary of search parameters for a single `AnnSearchRequest`. These search parameters are identical to those for a single-vector search. For more information, refer to [Search parameters](https://milvus.io/docs/single-vector-search.md#Search-parameters).

- `limit` (_int_)

    The maximum number of search results to include in a single `ANNSearchRequest`.

    This parameter only affects the number of search results to return within an individual `ANNSearchRequest`, and it does not decide the final results to return for a `hybrid_search` call. In a hybrid search, the final results are determined by combining and reranking the results from multiple `ANNSearchRequest` instances.

## Step 2: Configure a Reranking Strategy

After creating `AnnSearchRequest` instances, configure a reranking strategy to combine and rerank the results. Currently, there are two options: `WeightedRanker` and `RRFRanker`. For more information about reranking strategies, refer to [Reranking](reranking.md).

- Use weighted scoring

    The `WeightedRanker` is used to assign importance to the results from each vector field search with specified weights. If you prioritize some vector fields over others, `WeightedRanker(value1, value2, ..., valueN)` can reflect this in the combined search results.

    ```python
    from pymilvus import WeightedRanker
    # Use WeightedRanker to combine results with specified weights
    # Assign weights of 0.8 to text search and 0.2 to image search
    rerank = WeightedRanker(0.8, 0.2)  
    ```

    When using `WeightedRanker`, note that:

  - Each weight value ranges from 0 (least important) to 1 (most important), influencing the final aggregated score.
  - The total number of weight values provided in `WeightedRanker` should equal the number of `AnnSearchRequest` instances you have created.

- Use Reciprocal Rank Fusion (RFF)

    ```python
    # Alternatively, use RRFRanker for reciprocal rank fusion reranking
    from pymilvus import RRFRanker
    
    rerank = RRFRanker()
    ```

## Step 3: Perform a Hybrid Search

With the `AnnSearchRequest` instances and reranking strategy set, use the `hybrid_search()` method to perform the hybrid search.

```python
# Before conducting hybrid search, load the collection into memory.
collection.load()

res = collection.hybrid_search(
    reqs, # List of AnnSearchRequests created in step 1
    rerank, # Reranking strategy specified in step 2
    limit=2 # Number of final search results to return
)

print(res)
```

Parameters:

- `reqs` (_list_)

  A list of search requests, where each request is an `ANNSearchRequest` object. Each request can correspond to a different vector field and a different set of search parameters.

- `rerank` (_object_)

  The reranking strategy to use for hybrid search. Possible values: `WeightedRanker(value1, value2, ..., valueN)` and `RRFRanker()`.

    For more information about reranking strategies, refer to [Reranking](reranking.md).

- `limit` (_int_)

    The maximum number of final results to return in the hybrid search.

The output is similar to the following:

```python
["['id: 844, distance: 0.006047376897186041, entity: {}', 'id: 876, distance: 0.006422005593776703, entity: {}']"]
```

## Limits

- Typically, each collection has a default allowance of up to 4 vector fields. However, you have the option to adjust the `proxy.maxVectorFieldNum` configuration to expand the maximum number of vector fields in a collection, with a maximum limit of 10 vector fields per collection. See [Proxy-related Configurations](https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations) for more.

- Partially indexed or loaded vector fields in a collection will result in an error.

- Currently, each `AnnSearchRequest` in a hybrid search can carry one query vector only.

## FAQ

- **In which scenario is hybrid search recommended?**

    Hybrid search is ideal for complex situations demanding high accuracy, especially when an entity can be represented by multiple, diverse vectors. This applies to cases where the same data, such as a sentence, is processed through different embedding models or when multimodal information (like images, fingerprints, and voiceprints of an individual) is converted into various vector formats. By assigning weights to these vectors, their combined influence can significantly enrich recall and improve the effectiveness of search results.

- **How does a weighted ranker normalize distances between different vector fields?**

    A weighted ranker normalizes the distances between vector fields using assigned weights to each field. It calculates the importance of each vector field according to its weight, prioritizing those with higher weights. It's advised to use the same metric type across ANN search requests to ensure consistency. This method ensures that vectors deemed more significant have a greater influence on the overall ranking.

- **Is it possible to use alternative rankers like Cohere Ranker or BGE Ranker?**

    Currently, only the provided rankers are supported. Plans to include additional rankers are underway for future updates.

- **Is it possible to conduct multiple hybrid search operations at the same time?**

    Yes, simultaneous execution of multiple hybrid search operations is supported.

- **Can I use the same vector field in multiple AnnSearchRequest objects to perform hybrid searches?**

    Technically, it is possible to use the same vector field in multiple AnnSearchRequest objects for hybrid searches. It is not necessary to have multiple vector fields for a hybrid search.
