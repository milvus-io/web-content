# BaseRanker

The **BaseRanker** is the base class for all reranking strategies used by `hybrid_search()`. Pass a concrete subclass — `RRFRanker` or `WeightedRanker` — as the `ranker`/`rerank` argument of a hybrid search to combine and order the results of the underlying ANN search requests.

```python
class pymilvus.client.abstract.BaseRanker
```

**METHODS:**

- **dict** ()

    Returns the ranker configuration as a dictionary.

- **__str__** ()

    Returns the string representation of the ranker configuration.

## RRFRanker

The Reciprocal Rank Fusion (**RRF**) reranking strategy. It merges the ranked lists from multiple ANN searches and favors items that consistently appear near the top of each list.

```python
class pymilvus.RRFRanker(BaseRanker)
```

### Constructor

```python
RRFRanker(
    k: int = 60,
)
```

**PARAMETERS:**

- **k** (*int*)

    The rank-smoothing factor used by the RRF formula. Default: `60`.

## WeightedRanker

The Average Weighted Scoring reranking strategy. It assigns a weight to each underlying ANN search and combines the results by weighted average, prioritizing vectors based on their relevance.

```python
class pymilvus.WeightedRanker(BaseRanker)
```

### Constructor

```python
WeightedRanker(
    *nums,
    norm_score: bool = True,
)
```

**PARAMETERS:**

- **nums** (*float*)

    One or more numeric weights, one per ANN search request. A value of `0.8` means 80% of the final score comes from the corresponding search.

- **norm_score** (*bool*)

    Whether to normalize the scores before combining them. Default: `True`.

## Example

```python
from pymilvus import MilvusClient, AnnSearchRequest, WeightedRanker, RRFRanker

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

reqs = [
    AnnSearchRequest(data=[[0.1, 0.2, 0.3, 0.4]], anns_field="dense", param={"metric_type": "IP"}, limit=5),
    AnnSearchRequest(data=["some text"], anns_field="sparse", param={"metric_type": "BM25"}, limit=5),
]

# Combine the results by weighted average
client.hybrid_search(
    collection_name="my_collection",
    reqs=reqs,
    ranker=WeightedRanker(0.8, 0.2),
    limit=5,
)

# Or use reciprocal rank fusion
client.hybrid_search(
    collection_name="my_collection",
    reqs=reqs,
    ranker=RRFRanker(),
    limit=5,
)
```
