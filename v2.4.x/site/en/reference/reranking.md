---
id: reranking.md
summary: This topic covers the reranking process, explaining its significance and implementation of two reranking methods.
title: Reranking
---

# Reranking

Milvus enables multi-vector search capabilities using the [hybrid_search()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md) API, incorporating sophisticated reranking strategies to refine search results from multiple `AnnSearchRequest` instances. This topic covers the reranking process, explaining its significance and implementation of different reranking strategies in Milvus.

## Overview

Reranking in multi-vector search is a crucial step that consolidates results from several vector fields, ensuring the final output is relevant and accurately prioritized. Currently, Milvus offers two reranking strategies:

- `WeightedRanker`: assigns weights based on the significance of each vector field;

- `RRFRanker`: employs a reciprocal rank fusion (RRF) method.

The following figure illustrates the execution of a multi-vector search in Milvus and highlights the role of reranking in the process.

<img src="../../../assets/multi-vector-rerank.png" alt="reranking_process" width="300"/>

## Weighted Scoring (WeightedRanker)

The Weighted Scoring reranking strategy assigns different weights to the results from each `AnnSearchRequest`, reflecting the importance or confidence in each individual vector field's relevance to the search.

When the relevance of each vector field varies, `WeightedRanker` is the strategy of choice. This method allows you to emphasize certain vector fields over others by assigning them a higher weight. The assigned weights modify the original score (distance or similarity) of each result from the vector fields. For instance, in a multimodal search, the text description might be considered more important than the color distribution in images.

The algorithm for weighted scoring in Milvus takes as input a set of weights corresponding to each `AnnSearchRequest` result, in a format `WeightedRanker(value1, value2, ..., valueN)`. These weight values represent the importance or relevance of that particular `AnnSearchRequest` compared to the others. For each `AnnSearchRequest` result, its original score (like distance or similarity) is multiplied by the corresponding weight. This has the effect of boosting or diminishing the impact of `AnnSearchRequest` results based on their assigned weight. The scores are then aggregated across all `AnnSearchRequest` instances to produce the final ranked list of results. `AnnSearchRequest` with higher weight values will contribute more to the final scores, while those with lower weight values will have less influence.

To use this strategy, apply a `WeightedRanker` instance and set weight values by passing in a variable number of numeric arguments.

```python
from pymilvus import WeightedRanker

# Use WeightedRanker to combine results with specified weights
rerank = WeightedRanker(0.8, 0.8, 0.7) 
```

Note that:

- Each weight value ranges from 0 (least important) to 1 (most important), influencing the final aggregated score.

- The total number of weight values provided in `WeightedRanker` should equal the number of `AnnSearchRequest` instances you have created earlier.

- It is worth noting that due to the different measurements of the different metric types, we normalize the distances of the recall results so that they lie in the interval [0,1], where 0 means different and 1 means similar. The final score will be the sum of the weight values and distances.

## Reciprocal Rank Fusion (RRFRanker)

RRF is a data fusion method that combines ranking lists based on the reciprocal of their ranks. It is an effective way to balance the influence of each vector field, especially when there is no clear precedence of importance. This strategy is typically used when you want to give equal consideration to all vector fields or when there is uncertainty about the relative importance of each field.

The `RRFRanker` algorithm assigns a score to each result based on the reciprocal of its rank plus a damping factor `k`. The rank `i` is the position of the result within its `AnnSearchRequest`, starting from 0. This score is then calculated as `1 / (k + i + 1)`, where the damping factor `k` helps control how quickly the scores decrease as the rank increases. A larger `k` value means the scores will decrease more slowly. These reciprocal rank scores are then aggregated across all `AnnSearchRequest` results to produce the final ranked list of results.

To use this strategy, apply an `RRFRanker` instance.

```python
from pymilvus import RRFRanker

# Default k value is 60
ranker = RRFRanker()

# Or specify k value
ranker = RRFRanker(k=100)
```

RRF allows balancing influence across fields without specifying explicit weights. The top matches agreed upon by multiple fields will be prioritized in the final ranking.
