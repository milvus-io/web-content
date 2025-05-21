---
id: elasticsearch-queries-to-milvus.md
title: "Elasticsearch Queries to Milvus"
summary: "Elasticsearch, built on Apache Lucene, is a leading open-source search engine. However, it faces challenges in modern AI applications, including high update costs, poor real-time performance, inefficient shard management, a non-cloud-native design, and excessive resource demands. As a cloud-native vector database, Milvus overcomes these issues with decoupled storage and computing, efficient indexing for high-dimensional data, and seamless integration with modern infrastructures. It offers superior performance and scalability for AI workloads."
---

# Elasticsearch Queries to Milvus

Elasticsearch, built on Apache Lucene, is a leading open-source search engine. However, it faces challenges in modern AI applications, including high update costs, poor real-time performance, inefficient shard management, a non-cloud-native design, and excessive resource demands. As a cloud-native vector database, Milvus overcomes these issues with decoupled storage and computing, efficient indexing for high-dimensional data, and seamless integration with modern infrastructures. It offers superior performance and scalability for AI workloads.

This article aims to facilitate the migration of your code base from Elasticsearch to Milvus, providing various examples of converting queries in between.

## Overview

In Elasticsearch, operations in the query context generate relevance scores, while those in the filter context do not. Similarly, Milvus searches produce similarity scores, whereas its filter-like queries do not. When migrating your code base from Elasticsearch to Milvus, the key principle is converting fields used in Elasticsearch's query context into vector fields to enable similarity score generation. 

The table below outlines some Elasticsearch query patterns and their corresponding equivalents in Milvus.

<table>
   <tr>
     <th><p>Elasticsearch Queries</p></th>
     <th><p>Milvus Equivalents</p></th>
     <th><p>Remarks</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Full-text queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Match-query">Match query</a></p></td>
     <td><p>Full-text search</p></td>
     <td><p>Both provide similar sets of capabilities.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Term-level queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#IDs">IDs</a></p></td>
     <td><p><code>in</code> operator</p></td>
     <td rowspan="6"><p>Both provide the same or similar set of capabilities when these Elasticsearch queries are used in the filter context.</p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Prefix-query">Prefix query</a></p></td>
     <td><p><code>like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Range-query">Range query</a></p></td>
     <td><p>Comparison operators like <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, and <code>&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Term-query">Term query</a></p></td>
     <td><p>Comparison operators like <code>==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Terms-query">Terms query</a></p></td>
     <td><p><code>in</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Wildcard-query">Wildcard query</a></p></td>
     <td><p><code>like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Boolean-query">Boolean query</a></p></td>
     <td><p>Logical operators like <code>AND</code></p></td>
     <td><p>Both provide similar sets of capabilities when used in the filter context.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Vector queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Knn-query">kNN query</a></p></td>
     <td><p>Search</p></td>
     <td><p>Milvus provides more advanced vector search capabilities.</p></td>
   </tr>
   <tr>
     <td><p><a href="elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Reciprocal rank fusion</a></p></td>
     <td><p>Hybrid Search</p></td>
     <td><p>Milvus supports multiple reranking strategies.</p></td>
   </tr>
</table>

## Full-text queries

In Elasticsearch, the full text queries enable you to search analyzed text fields such as the body of an email. The query string is processed using the same analyzer that was applied to the field during indexing.

### Match query

In Elasticsearch, a match query returns documents that match a provided text, number, date, or boolean value. The provided text is analyzed before matching. 

The following is an example Elasticsearch search request with a match query.

```bash
resp = client.search(
    query={
        "match": {
            "message": {
                "query": "this is a test"
            }
        }
    },
)

```

Milvus provides the same capability through the full-text search feature. You can convert the above Elasticsearch query into Milvus as follows:

```python
res = client.search(
    collection_name="my_collection",
    data=['How is the weather in Jamaica?'],
    anns_field="message_sparse",
    output_fields=["id", "message"]
)
```

In the example above, `message_sparse` is a sparse vector field derived from a VarChar field named `message`. Milvus uses the BM25 embedding model to convert the values in the `message` field into sparse vector embeddings and stores them in the `message_sparse` field. Upon receiving the search request, Milvus embeds the plain text query payload using the same BM25 model and performs a sparse vector search and returns the `id` and `message` fields specified in the `output_fields` parameter along with the corresponding similarity scores.

To use this functionality, you must enable the analyzer on the `message` field and define a function to derive the `message_sparse` field from it. For detailed instructions on enabling the analyzer and creating the derivative function in Milvus, refer to [Full Text Search](full-text-search.md).

## Term-level queries

In Elasticsearch, term-level queries are used to find documents based on exact values in structured data, such as date ranges, IP addresses, prices, or product IDs. This section outlines the possible equivalents of some Elasticsearch term-level queries in Milvus. All examples in this section are adapted to operate within the filter context to align with Milvus's capabilities.

### IDs

In Elasticsearch, you can find documents based on their IDs in the filter context as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "ids": {
                    "values": [
                        "1",
                        "4",
                        "100"
                    ]
                }            
            }
        }
    },
)
```

In Milvus, you can also find entities based on their IDs as follows:

```python
# Use the filter parameter
res = client.query(
    collection_name="my_collection",
    filter="id in [1, 4, 100]",
    output_fields=["id", "title"]
)

# Use the ids parameter
res = client.query(
    collection_name="my_collection",
    ids=[1, 4, 100],
    output_fields=["id", "title"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html). For details on query and get requests as well as the filter expressions in Milvus, refer to [Query](get-and-scalar-query.md) and [Filtering](filtering).

### Prefix query

In Elasticsearch, you can find documents that contain a specific prefix in a provided field in the filter context as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                 "prefix": {
                    "user": {
                        "value": "ki"
                    }
                }           
            }
        }
    },
)

```

In Milvus, you can find the entities whose values start with the specified prefix as follows:

```python
res = client.query(
    collection_name="my_collection",
    filter='user like "ki%"',
    output_fields=["id", "user"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html). For details on the `like` operator in Milvus, refer to [Using ](basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching)`LIKE`[ for Pattern Matching](basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching).

### Range query

In Elasticsearch, you can find documents that contain terms within a provided range as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "range": {
                    "age": {
                        "gte": 10,
                        "lte": 20
                    }
                }           
            }
        }
    },
)

```

In Milvus, you can find the entities whose values in a specific field are within a provided range as follows:

```python
res = client.query(
    collection_name="my_collection",
    filter='10 <= age <= 20',
    output_fields=["id", "user", "age"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html). For details on comparison operators in Milvus, see [Comparison operators](basic-operators.md#Comparison-operators).

### Term query

In Elasticsearch, you can find documents that contain an **exact** term in a provided field as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "term": {
                    "status": {
                        "value": "retired"
                    }
                }            
            }
        }
    },
)

```

In Milvus, you can find the entities whose values in the specified field are exactly the specified term as follows:

```python
# use ==
res = client.query(
    collection_name="my_collection",
    filter='status=="retired"',
    output_fields=["id", "user", "status"]
)

# use TEXT_MATCH
res = client.query(
    collection_name="my_collection",
    filter='TEXT_MATCH(status, "retired")',
    output_fields=["id", "user", "status"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html). For details on comparison operators in Milvus, see [Comparison operators](basic-operators.md#Comparison-operators).

### Terms query

In Elasticsearch, you can find documents that contain one or more **exact** terms in a provided field as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "terms": {
                    "degree": [
                        "graduate",
                        "post-graduate"
                    ]
                }        
            }
        }
    }
)

```

Milvus does not have a complete equivalence of this one. However, you can find the entities whose values in the specified field are one of the specified terms as follows:

```python
# use in
res = client.query(
    collection_name="my_collection",
    filter='degree in ["graduate", "post-graduate"]',
    output_fields=["id", "user", "degree"]
)

# use TEXT_MATCH
res = client.query(
    collection_name="my_collection",
    filter='TEXT_MATCH(degree, "graduate post-graduate")',
    output_fields=["id", "user", "degree"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html). For details on range operators in Milvus, refer to [Range operators](basic-operators.md#Range-operators).

### Wildcard query

In Elasticsearch, you can find documents that contain terms matching a wildcard pattern as follows:

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "wildcard": {
                    "user": {
                        "value": "ki*y"
                    }
                }          
            }
        }
    },
)

```

Milvus does not support wildcard in its filtering conditions. However, you can use the `like` operator to achieve the similar effect as follows:

```python
res = client.query(
    collection_name="my_collection",
    filter='user like "ki%" AND user like "%y"',
    output_fields=["id", "user"]
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html). For details on the range operators in Milvus, refer to [Range operators](basic-operators.md#Range-operators). 

## Boolean query

In Elasticsearch, a boolean query is a query that matches documents matching boolean combinations of other queries. 

The following example is adapted from an example in Elasticsearch documentation on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html). The query will return users with `kimchy` in their names with a `production` tag.

```python
resp = client.search(
    query={
        "bool": {
            "filter": {
                "term": {
                    "user": "kimchy"
                }
            },
            "filter": {
                "term": {
                    "tags": "production"
                }
            }
        }
    },
)

```

In Milvus, you can do the similar thing as follows:

```python
filter = 

res = client.query(
    collection_name="my_collection",
    filter='user like "%kimchy%" AND ARRAY_CONTAINS(tags, "production")',
    output_fields=["id", "user", "age", "tags"]
)
```

The above example assumes that you have a `user` field of the **VarChar** type and a `tags` field of the **Array** type, in the target collection. The query will return users with `kimchy` in their names with a `production` tag.

## Vector queries

In Elasticsearch, vector queries are specialized queries that work on vector fields to efficiently perform semantic search.

### Knn query

Elasticsearch supports both approximate kNN queries and exact, brute-force kNN queries. You can find the *k* nearest vectors to a query vector in either way, as measured by a similarity metric, as follows:

```python
resp = client.search(
    index="my-image-index",
    size=3,
    query={
        "knn": {
            "field": "image-vector",
            "query_vector": [
                -5,
                9,
                -12
            ],
            "k": 10
        }
    },
)

```

Milvus, as a specialized vector database, uses index types to optimize vector searches. Typically, it prioritizes approximate nearest neighbor (ANN) search for high-dimensional vector data. While brute-force kNN search with the FLAT index type delivers precise results, it is both time-consuming and resource-intensive. In contrast, ANN search using AUTOINDEX or other index types balances speed and accuracy, offering significantly faster and more resource-efficient performance than kNN. 

A similar equivalence to the above vector query in Mlivus goes like this:

```python
res = client.search(
    collection_name="my_collection",
    anns_field="image-vector"
    data=[[-5, 9, -12]],
    limit=10
)
```

You can find the Elasticsearch example on [this page](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html). For details on ANN searches in Milvus, read [Basic ANN Search](single-vector-search.md).

### Reciprocal Rank Fusion

Elasticsearch provides Reciprocal Rank Fusion (RRF) to combine multiple result sets with different relevance indicators into a single ranked result set.

The following example demonstrates combining a traditional term-based search with a k-nearest neighbors (kNN) vector search to improve search relevance:

```python
client.search(
    index="my_index",
    size=10,
    query={
        "retriever": {
            "rrf": {
                "retrievers": [
                    {
                        "standard": {
                            "query": {
                                "term": {
                                    "text": "shoes"
                                }
                            }
                        }
                    },
                    {
                        "knn": {
                            "field": "vector",
                            "query_vector": [1.25, 2, 3.5],  # Example vector; replace with your actual query vector
                            "k": 50,
                            "num_candidates": 100
                        }
                    }
                ],
                "rank_window_size": 50,
                "rank_constant": 20
            }
        }
    }
)
```

In this example, RRF combines results from two retrievers:

- A standard term-based search for documents containing the term `"shoes"` in the `text` field.

- A kNN search on the `vector` field using the provided query vector.

Each retriever contributes up to 50 top matches, which are reranked by RRF, and the final top 10 results are returned.

In Milvus, you can achieve a similar hybrid search by combining searches across multiple vector fields, applying a reranking strategy, and retrieving the top-K results from the combined list. Milvus supports both RRF and weighted reranker strategies. For more details, refer to [Reranking](reranking.md).

The following is a non-strict equivalence of the above Elasticsearch example in Milvus.

```python
search_params_dense = {
    "data": [[1.25, 2, 3.5]],
    "anns_field": "vector",
    "param": {
        "metric_type": "IP",
        "params": {"nprobe": 10}, 
    },
    "limit": 100
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    "data": ["shoes"],
    "anns_field": "text_sparse",
    "param": {
        "metric_type": "BM25",
        "params": {"drop_ratio_search": 0.2}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name="my_collection",
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=10
)
```

This example demonstrates a hybrid search in Milvus that combines:

1. **Dense vector search**: Using the inner product (IP) metric with `nprobe` set to 10 for approximate nearest neighbor (ANN) search on the `vector` field.

1. **Sparse vector search**: Using the BM25 similarity metric with a `drop_ratio_search` parameter of 0.2 on the `text_sparse` field.

The results from these searches are executed separately, combined, and reranked using the Reciprocal Rank Fusion (RRF) ranker. The hybrid search returns the top 10 entities from the reranked list.

Unlike Elasticsearch's RRF ranking, which merges results from standard text-based queries and kNN searches, Milvus combines results from sparse and dense vector searches, providing a unique hybrid search capability optimized for multimodal data.

## Recap

In this article, we covered the conversions of typical Elasticsearch queries to their Milvus equivalents, including term-level queries, boolean queries, full-text queries, and vector queries. If you have further questions about converting other Elasticsearch queries, feel free to reach out to us.