---
id: single-vector-search.md
order: 1
summary: This article describes how to search for vectors in a Milvus collection using a single query vector.
---

# Single-Vector Search

Once you have inserted your data, the next step is to perform similarity searches on your collection in Milvus.

Milvus allows you to conduct two types of searches, depending on the number of vector fields in your collection:

- **Single-vector search**: If your collection has only one vector field, use the [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) method to find the most similar entities. This method compares your query vector with the existing vectors in your collection and returns the IDs of the closest matches along with the distances between them. Optionally, it can also return the vector values and metadata of the results.
- **Multi-vector search**: For collections with two or more vector fields, use the [`hybrid_search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md) method. This method performs multiple Approximate Nearest Neighbor (ANN) search requests and combines the results to return the most relevant matches after reranking.

This guide focuses on how to perform a single-vector search in Milvus. For details on multi-vector search, refer to [hybrid search](https://milvus.io/docs/multi-vector-search.md).

## Overview

There are a variety of search types to meet different requirements:

- [Basic search](https://milvus.io/docs/single-vector-search.md#Basic-search): Includes single-vector search, bulk-vector search, partition search, and search with specified output fields.

- [Filtered search](https://milvus.io/docs/single-vector-search.md#Filtered-search): Applies filtering criteria based on scalar fields to refine search results.

- [Range search](https://milvus.io/docs/single-vector-search.md#Range-search): Finds vectors within a specific distance range from the query vector.

- [Grouping search](https://milvus.io/docs/single-vector-search.md#Grouping-search): Groups search results based on a specific field to ensure diversity in the results.

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Preparations

The code snippet below repurposes the existing code to establish a connection to a Zilliz Cloud cluster and quickly set up a collection.

```python
from pymilvus import MilvusClient

CLUSTER_ENDPOINT = "YOUR_CLUSTER_ENDPOINT"
TOKEN = "YOUR_CLUSTER_TOKEN"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = [ {"id": i, "vector": [ random.uniform(-1, 1) for _ in range(5) ], "color": f"{random.choice(colors)}_{str(random.randint(1000, 9999))}" } for i in range(1000) ]

res = client.insert(
    collection_name="quick_setup",
    data=data
)

print(res)

# Output
#
# {
#     "insert_count": 1000
# }
```

## Basic search

When sending a `search` request, you can provide one or more vector values representing your query embeddings and a `limit` value indicating the number of results to return.

Depending on your data and your query vector, you may get fewer than `limit` results. This happens when `limit` is larger than the number of possible matching vectors for your query.

### Single-vector search

Single-vector search is the simplest form of `search` operations in Milvus, designed to find the most similar vectors to a given query vector.

To perform a single-vector search, specify the target collection name, the query vector, and the desired number of results (`limit`). This operation returns a result set comprising the most similar vectors, their IDs, and distances from the query vector.

Here is an example of searching for the top 5 entities that are most similar to the query vector:

```python
# Single vector search
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    # Replace with your query vector
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}} # Search parameters
)

# Convert the output to a formatted JSON string
result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 0,
            "distance": 1.4093276262283325,
            "entity": {}
        },
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {}
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {}
        },
        {
            "id": 5,
            "distance": 0.7972343564033508,
            "entity": {}
        },
        {
            "id": 2,
            "distance": 0.5928734540939331,
            "entity": {}
        }
    ]
]
```

The output showcases the top 5 neighbors nearest to your query vector, including their unique IDs and the calculated distances.

### Bulk-vector search

A bulk-vector search extends the [single-vector search](https://milvus.io/docs/single-vector-search.md#Single-Vector-Search) concept by allowing multiple query vectors to be searched in a single request. This type of search is ideal for scenarios where you need to find similar vectors for a set of query vectors, significantly reducing the time and computational resources required.

In a bulk-vector search, you can include several query vectors in the `data` field. The system processes these vectors in parallel, returning a separate result set for each query vector, each set containing the closest matches found within the collection.

Here is an example of searching for two distinct sets of the most similar entities from two query vectors:

```python
# Bulk-vector search
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104],
        [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345]
    ], # Replace with your query vectors
    limit=2, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}} # Search parameters
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 1,
            "distance": 1.3017789125442505,
            "entity": {}
        },
        {
            "id": 7,
            "distance": 1.2419954538345337,
            "entity": {}
        }
    ], # Result set 1
    [
        {
            "id": 3,
            "distance": 2.3358664512634277,
            "entity": {}
        },
        {
            "id": 8,
            "distance": 0.5642921924591064,
            "entity": {}
        }
    ] # Result set 2
]
```

The results include two sets of nearest neighbors, one for each query vector, showcasing the efficiency of bulk-vector searches in handling multiple query vectors at once.

### Partition search

Partition search narrows the scope of your search to a specific subset or partition of your collection. This is particularly useful for organized datasets where data is segmented into logical or categorical divisions, allowing for faster search operations by reducing the volume of data to scan.

To conduct a partition search, simply include the name of the target partition in `partition_names` of your search request. This specifies that the `search` operation only considers vectors within the specified partition.

Here is an example of searching for entities in `partition_1`:

```python
# Search in partition_1
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.02174828545444263, 0.058611125483182924, 0.6168633415965343, -0.7944160935612321, 0.5554828317581426]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    partition_names=["partition_1"] # Partition names to search in
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 16,
            "distance": 0.9200337529182434,
            "entity": {}
        },
        {
            "id": 14,
            "distance": 0.4505271911621094,
            "entity": {}
        },
        {
            "id": 15,
            "distance": 0.19924677908420563,
            "entity": {}
        },
        {
            "id": 17,
            "distance": 0.0075093843042850494,
            "entity": {}
        },
        {
            "id": 13,
            "distance": -0.14609718322753906,
            "entity": {}
        }
    ]
]
```

Then, search for entities in `partition_2`:

```python
# Create a MilvusClient instance
client = MilvusClient(
    uri="http://localhost:19530",
)

# Search in partition_2
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[-0.2798451532635784, 0.9486592746891414, -0.9311928407781922, 0.1830057032090473, 0.6962886429672028]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    partition_names=["partition_2"] # Partition names to search in
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 20,
            "distance": 2.363696813583374,
            "entity": {}
        },
        {
            "id": 26,
            "distance": 1.0665391683578491,
            "entity": {}
        },
        {
            "id": 23,
            "distance": 1.066049575805664,
            "entity": {}
        },
        {
            "id": 29,
            "distance": 0.8353596925735474,
            "entity": {}
        },
        {
            "id": 28,
            "distance": 0.7484277486801147,
            "entity": {}
        }
    ]
]
```

The data in `partition_1` differs from that in `partition_2`. Therefore, the search results will be constrained to the specified partition, reflecting the unique characteristics and data distribution of that subset.

### Search with output fields

Search with output fields allows you to specify which attributes or fields of the matched vectors should be included in the search results.

You can specify `output_fields` in a request to return results with specific fields.

Here is an example of returning results with `color` attribute values:

```python
# Search with output fields
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"] # Output fields to return
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 0,
            "distance": 1.4093276262283325,
            "entity": {
                "color": "pink_8682"
            }
        },
        {
            "id": 16,
            "distance": 1.0159327983856201,
            "entity": {
                "color": "yellow_1496"
            }
        },
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 14,
            "distance": 0.9803846478462219,
            "entity": {
                "color": "green_2899"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        }
    ]
]
```

Alongside the nearest neighbors, the search results will include the specified field `color`, providing a richer set of information for each matching vector.

## Filtered search

Filtered search applies scalar filters to vector searches, allowing you to refine the search results based on specific criteria. You can find more about filter expressions in [Boolean Expression Rules](https://milvus.io/docs/boolean.md) and examples in [Get & Scalar Query](https://milvus.io/docs/get-and-scalar-query.md).

For instance, to refine search results based on a string pattern, you can use the __like__ operator. This operator enables string matching by considering prefixes, infixes, and suffixes:

- To match values starting with a specific prefix, use the syntax __'like "prefix%"'__.

- To match values containing a specific sequence of characters anywhere within the string, use the syntax __'like "%infix%"'__.

- To match values ending with a specific suffix, use the syntax __'like "%suffix"'__.

- The __like__ operator can also be used for single-character matching by using the underscore (_) to represent any single character. For example, __'like "y_llow"'__.

Filter results whose __color__ is prefixed with __red__:

```python
# Search with filter
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"], # Output fields to return
    filter='color like "red%"'
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        },
        {
            "id": 6,
            "distance": -0.4113418459892273,
            "entity": {
                "color": "red_9392"
            }
        }
    ]
]
```

Filter results whose __color__ contains the letters __ll__ anywhere within the string:

```python
# Infix match on color field
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"], # Output fields to return
    filter='color like "%ll%"' # Filter on color field, infix match on "ll"
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 5,
            "distance": 0.7972343564033508,
            "entity": {
                "color": "yellow_4222"
            }
        }
    ]
]
```

## Range search

Range search allows you to find vectors that lie within a specified distance range from your query vector.

By setting `radius` and optionally `range_filter`, you can adjust the breadth of your search to include vectors that are somewhat similar to the query vector, providing a more comprehensive view of potential matches.

- `radius`: Defines the outer boundary of your search space. Only vectors that are within this distance from the query vector are considered potential matches.

- `range_filter`: While `radius` sets the outer limit of the search, `range_filter` can be optionally used to define an inner boundary, creating a distance range within which vectors must fall to be considered matches.

```python
# Conduct a range search
search_params = {
    "metric_type": "IP",
    "params": {
        "radius": 0.8, # Radius of the search circle
        "range_filter": 1.0 # Range filter to filter out vectors that are not within the search circle
    }
}

res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=3, # Max. number of search results to return
    search_params=search_params, # Search parameters
    output_fields=["color"], # Output fields to return
)

result = json.dumps(res, indent=4)
print(result)
```

The output is similar to the following:

```python
[
    [
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 14,
            "distance": 0.9803846478462219,
            "entity": {
                "color": "green_2899"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        }
    ]
]
```

You will observe that all the entities returned have a distance that falls within the range of 0.8 to 1.0 from the query vector.

The parameter settings for `radius` and `range_filter` vary with the metric type in use.

|  __Metric Type__ |  __Charactericstics__                             |  __Range Search Settings__                                                                               |
| ---------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
|  `L2`            |  Smaller L2 distances indicate higher similarity. |  To exclude the closest vectors from results, ensure that:<br/> `range_filter` <= distance < `radius` |
|  `IP`            |  Larger IP distances indicate higher similarity.  |  To exclude the closest vectors from results, ensure that:<br/> `radius` < distance <= `range_filter` |

## Grouping search

In Milvus, grouping search by a specific field can avoid redundancy of the same field item in the results. You can get a varied set of results for the specific field. 

Consider a collection of documents, each document splits into various passages. Each passage is represented by one vector embedding and belongs to one document. To find relevant documents instead of similar passages, you can include the `group_by_field` argument in the `search()` opeartion to group results by the document ID. This helps return the most relevant and unique documents, rather than separate passages from the same document.

Here is the example code to group search results by field:

```python
# Connect to Milvus
client = MilvusClient(uri='http://localhost:19530') # Milvus server address

# Load data into collection
client.load_collection("group_search") # Collection name

# Group search results
res = client.search(
    collection_name="group_search", # Collection name
    data=[[0.14529211512077012, 0.9147257273453546, 0.7965055218724449, 0.7009258593102812, 0.5605206522382088]], # Query vector
    search_params={
    "metric_type": "L2",
    "params": {"nprobe": 10},
    }, # Search parameters
    limit=10, # Max. number of search results to return
    group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

The output is similar to the following:

```python
[5, 10, 1, 7, 9, 6, 3, 4, 8, 2]
```

In the given output, it can be observed that the returned entities do not contain any duplicate `doc_id` values.

For comparison, let's comment out the `group_by_field` and conduct a regular search:

```python
# Connect to Milvus
client = MilvusClient(uri='http://localhost:19530') # Milvus server address

# Load data into collection
client.load_collection("group_search") # Collection name

# Search without `group_by_field`
res = client.search(
    collection_name="group_search", # Collection name
    data=query_passage_vector, # Replace with your query vector
    search_params={
    "metric_type": "L2",
    "params": {"nprobe": 10},
    }, # Search parameters
    limit=10, # Max. number of search results to return
    # group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

The output is similar to the following:

```python
[1, 10, 3, 10, 1, 9, 4, 4, 8, 6]
```

In the given output, it can be observed that the returned entities contain duplicate `doc_id` values.

__Limitations__

- __Indexing__: This grouping feature works only for collections that are indexed with the __HNSW__, __IVF_FLAT__, or __FLAT__ type. For more information, refer to [In-memory Index](https://milvus.io/docs/index.md#HNSW).

- __Field__: Currently, grouping search allows only for a single column. You cannot specify multiple field names in the `group_by_field` config.  Additionally, grouping search is incompatible with data types of JSON, FLOAT, DOUBLE, ARRAY, or vector fields.

- __Performance Impact__: Be mindful that performance degrades with increasing query vector counts. Using a cluster with 2 CPU cores and 8 GB of memory as an example, the execution time for grouping search increases proportionally with the number of input query vectors.

- __Functionality__: Grouping search is not supported by [range search](https://milvus.io/docs/single-vector-search.md#Range-search) or [search iterators](https://milvus.io/docs/with-iterators.md#Search-with-iterator).

## Search parameters

In the above searches except the range search, the default search parameters apply. In normal cases, you do not need to manually set search parameters. 

```python
# In normal cases, you do not need to set search parameters manually
# Except for range searches.
search_parameters = {
    'metric_type': 'L2',
    'params': {
        'nprobe': 10,
        'level': 1，
        'radius': 1.0
        'range_filter': 0.8
    }
}
```

The following table lists all possible settings in the search parameters.

|  __Parameter Name__    |  __Parameter Description__                                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `metric_type`         |  How to measure similarity between vector embeddings.<br/> Possible values are `IP`, `L2`, and `COSINE`, and defaults to that of the loaded index file.      |
|  `params.nprobe`       |  Number of units to query during the search.<br/> The value falls in the range [1, nlist<sub>[1]</sub>].                                                     |
|  `params.level`        |  Search precision level.<br/> Possible values are `1`, `2`, and `3`, and defaults to `1`. Higher values yield more accurate results but slower performance.  |
|  `params.radius`       |  Minimum similarity between the query vector and candidate vectors.<br/> The value falls in the range [1, nlist<sub>[1]</sub>].                              |
|  `params.range_filter` |  A similarity range, optionally refining the search for vectors that fall in the range.<br/> The value falls in the range [top-K<sub>[2]</sub>, ∞].          |

<div class="admonition note">

<p><b>notes</b></p>

<p>[1] Number of cluster units after indexing. When indexing a collection, Zilliz Cloud sub-divides the vector data into multiple cluster units, the number of which varies with the actual index settings.</p>
<p>[2] Number of entities to return in a search.</p>

</div>

