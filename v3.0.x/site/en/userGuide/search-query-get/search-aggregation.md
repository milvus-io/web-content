---
id: search-aggregation.md
title: "Search Aggregation"
summary: "Group vector search results into buckets, compute per-bucket metrics, order buckets, and return representative hits."
beta: Milvus 3.0.x
---

# Search Aggregation

When a shopper searches for "black running shoes for daily training," approximate nearest neighbor (ANN) search ranks products by vector similarity and returns a flat Top-K list. The results can be relevant but repetitive: in the example below, four of the first six results are Nike products, while Adidas and Puma appear once each.

A flat list cannot directly provide brand-level diversity or statistics. An application may need up to two representative products from each brand, the number of retrieved products for each brand, or the average price for each brand.

Search Aggregation organizes the retrieved entities into buckets based on a selected scalar field. In this example, each brand becomes a separate bucket. Milvus can then calculate statistics independently for each bucket and return representative products from each bucket, making the search results easier to compare and more diverse.

![A flat running-shoe search result becomes a set of comparable brand buckets](../../../../assets/search-aggregation-overview.png)

Search Aggregation summarizes the retrieved candidates rather than every entity in the collection. The bucket counts and metrics are therefore approximate and remain tied to vector relevance.

## How it works

![ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits](../../../../assets/search-aggregation-bucketing.png)

1. **Retrieve candidates.** Milvus runs ANN search to create a retrieval pool of entities that are closest to the query vector. Search Aggregation operates on this pool rather than on every entity in the collection, so the pool determines which entities can contribute to the buckets.

2. **Build buckets.** `SearchAggregation.fields` defines the bucket key. Each unique combination of field values creates a separate key. In the figure, `fields=["brand"]` creates `(Nike)`, `(Adidas)`, and `(Puma)` bucket keys. All retrieved entities with the same key belong to the same bucket and contribute to its `count`. `SearchAggregation.size` limits how many buckets Milvus returns; it does not limit how many entities belong to each bucket.

3. **Calculate and return results.** Each returned bucket contains its key and retrieval-pool entity count. Milvus can also calculate configured metrics, order the buckets, and return representative entities. `TopHits.size` controls how many representative entities are returned from each bucket. Each bucket in `result.agg_buckets` contains its key, count, metrics, hits, and optional child buckets.

In the diagram, the four entity IDs inside the Nike bucket produce `count: 4`. The three brand cards illustrate three returned buckets, while the two product cards in the completed Nike bucket illustrate two representative hits.

With `sub_aggregation`, Milvus repeats steps 2 and 3 inside each parent bucket. Because every stage operates on the ANN retrieval pool, changes in search recall can change bucket counts, metrics, ordering, hits, and nested results.

## Limits

Before using Search Aggregation, note the following limits:

- **Nested aggregations:** A request can contain one root `SearchAggregation` and up to three nested `sub_aggregation` levels, for a maximum of four levels in total.

- **Fields used to create bucket keys:** `SearchAggregation.fields` does not support `FLOAT`, `DOUBLE`, vector, `JSON`, or dynamic fields.

- **Metric and sorting fields:** `metrics` and `TopHits.sort` do not support `JSON` or dynamic fields.

- **Repeated fields:** The same field cannot appear in more than one `SearchAggregation.fields` list. For example, if the root aggregation uses `fields=["category"]`, a nested `sub_aggregation` cannot also use `fields=["category"]`.

- **Unsupported combinations:** Search Aggregation cannot be combined with `offset`, Search Iterators, Hybrid Search, a Highlighter, or Grouping Search.

- **Returned entries:** Keep the configured maximum number of result entries at or below 10,000. Calculate this maximum as:

  `number of query vectors × size at every aggregation level × largest TopHits.size at any level`

  Use `1` for the last factor when no level configures `TopHits`. For example, one query vector, 10 root buckets, five child buckets per root bucket, and two hits per child bucket produce a configured maximum of:

  `1 × 10 × 5 × 2 = 100`

## Use Search Aggregation

Choose an example based on what you want to accomplish:

| Go to | Description | Key settings |
|---|---|---|
| [Compare and sort buckets](#Compare-and-sort-buckets) | Calculate per-bucket statistics to compare buckets, then sort the returned buckets by metrics, counts, or keys. | `fields`, `size`, `metrics`, `order` |
| [Show representative results from each bucket](#Show-representative-results-from-each-bucket) | Return a limited number of entities from each bucket and sort those entities independently by scalar fields or vector score. | `top_hits`, `TopHits.size`, `TopHits.sort` |
| [Group results at multiple levels](#Group-results-at-multiple-levels) | Organize results into parent and child bucket levels to analyze multiple dimensions in sequence. | `sub_aggregation` |

The examples below use a product collection with brand, category, color, price, and rating fields. Expand the following section to create the collection and define the shared search variables.

<details>

<summary>Set up the example collection</summary>

```python
from pymilvus import DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

collection_name = "product_search_aggregation"

if client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=False, enable_dynamic_field=False)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("embedding", DataType.FLOAT_VECTOR, dim=5)
schema.add_field("name", DataType.VARCHAR, max_length=200)
schema.add_field("brand", DataType.VARCHAR, max_length=100)
schema.add_field("category", DataType.VARCHAR, max_length=100)
schema.add_field("color", DataType.VARCHAR, max_length=50)
schema.add_field("price", DataType.DOUBLE)
schema.add_field("rating", DataType.DOUBLE)
schema.add_field("in_stock", DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    # Make preceding writes visible to searches from this client.
    consistency_level="Session",
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            "id": 1,
            "embedding": [0.12, 0.42, 0.18, 0.66, 0.31],
            "name": "Nike Air Zoom Runner",
            "brand": "Nike",
            "category": "running_shoes",
            "color": "black",
            "price": 129.99,
            "rating": 4.7,
            "in_stock": True,
        },
        {
            "id": 2,
            "embedding": [0.10, 0.39, 0.20, 0.61, 0.29],
            "name": "Nike Pegasus Trail",
            "brand": "Nike",
            "category": "running_shoes",
            "color": "blue",
            "price": 139.99,
            "rating": 4.6,
            "in_stock": True,
        },
        {
            "id": 3,
            "embedding": [0.14, 0.44, 0.19, 0.68, 0.33],
            "name": "Adidas Ultraboost Light",
            "brand": "Adidas",
            "category": "running_shoes",
            "color": "white",
            "price": 159.99,
            "rating": 4.8,
            "in_stock": True,
        },
        {
            "id": 4,
            "embedding": [0.16, 0.41, 0.22, 0.62, 0.30],
            "name": "Puma Velocity Nitro",
            "brand": "Puma",
            "category": "running_shoes",
            "color": "red",
            "price": 119.99,
            "rating": 4.4,
            "in_stock": False,
        },
        {
            "id": 5,
            "embedding": [0.48, 0.20, 0.59, 0.15, 0.71],
            "name": "Nike Windrunner Jacket",
            "brand": "Nike",
            "category": "jackets",
            "color": "black",
            "price": 99.99,
            "rating": 4.5,
            "in_stock": True,
        },
        {
            "id": 6,
            "embedding": [0.45, 0.18, 0.55, 0.17, 0.69],
            "name": "Adidas Own The Run Jacket",
            "brand": "Adidas",
            "category": "jackets",
            "color": "blue",
            "price": 89.99,
            "rating": 4.3,
            "in_stock": True,
        },
        {
            "id": 7,
            "embedding": [0.09, 0.38, 0.17, 0.60, 0.27],
            "name": "Nike Vomero 17",
            "brand": "Nike",
            "category": "running_shoes",
            "color": "black",
            "price": 159.99,
            "rating": 4.8,
            "in_stock": True,
        },
        {
            "id": 8,
            "embedding": [0.13, 0.43, 0.21, 0.65, 0.32],
            "name": "Nike InfinityRN 4",
            "brand": "Nike",
            "category": "running_shoes",
            "color": "black",
            "price": 149.99,
            "rating": 4.9,
            "in_stock": True,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [0.11, 0.40, 0.19, 0.64, 0.30]
search_params = {
    "metric_type": "COSINE",
    "params": {},
}
```

</details>

The setup above configures `COSINE` for both the vector index and the search parameters. Therefore, later examples use `{"_score": "desc"}` to place higher cosine similarity first. For a distance metric such as `L2`, use `{"_score": "asc"}`.

### Compare and sort buckets

Use this pattern when you need to compare groups of retrieved entities using calculated statistics and control the order in which the buckets are returned. In this example, Milvus groups retrieved products by `brand`, calculates price metrics for each brand bucket, and sorts the buckets by average price.

If your goal is only to improve result diversity by returning one or more entities per field value, use [Grouping Search](grouping-search.md) instead.

The following configuration creates up to three brand buckets, calculates metrics for each bucket, and sorts the buckets by average price:

```python
aggregation = SearchAggregation(
    # highlight-start
    # Form one bucket for each distinct brand value.
    fields=["brand"],
    # Return up to three buckets at this aggregation level.
    size=3,
    # Calculate named metrics for every selected bucket.
    metrics={
        "product_count": {"count": "*"},
        "avg_price": {"avg": "price"},
        "min_price": {"min": "price"},
    },
    # Sort buckets by average price, highest first.
    order=[
        {"avg_price": "desc"},
        # If average prices are equal, sort by bucket key in ascending order.
        {"_key": "asc"},
    ],
    # highlight-end
)
```

Pass the object to the `search_aggregation` parameter of `MilvusClient.search()`:

```python
result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field="embedding",
    search_params=search_params,
    output_fields=[
        "name",
        "brand",
        "category",
        "color",
        "price",
        "rating",
        "in_stock",
    ],
    # highlight-next-line
    search_aggregation=aggregation,
)
```

<details>

<summary>View the example bucket output</summary>

The following output was captured from the request above and serialized as JSON for readability. PyMilvus returns `AggregationBucket` objects rather than JSON.

```json
[
  {
    "key": [
      {
        "field_id": 103,
        "field_name": "brand",
        "value": "Adidas"
      }
    ],
    "count": 1,
    "metrics": {
      "product_count": 1,
      "avg_price": 159.99,
      "min_price": 159.99
    },
    "hits": [],
    "sub_groups": []
  },
  {
    "key": [
      {
        "field_id": 103,
        "field_name": "brand",
        "value": "Nike"
      }
    ],
    "count": 1,
    "metrics": {
      "product_count": 1,
      "avg_price": 129.99,
      "min_price": 129.99
    },
    "hits": [],
    "sub_groups": []
  },
  {
    "key": [
      {
        "field_id": 103,
        "field_name": "brand",
        "value": "Puma"
      }
    ],
    "count": 1,
    "metrics": {
      "product_count": 1,
      "avg_price": 119.99,
      "min_price": 119.99
    },
    "hits": [],
    "sub_groups": []
  }
]
```

</details>

For the single query vector in this guide, read the returned top-level buckets from `result.agg_buckets[0]`. Each bucket exposes its `key`, retrieval-pool entity `count`, calculated `metrics`, representative `hits`, and nested buckets in `sub_groups`.

Read the configuration as follows:

| Setting | What it controls | In this example |
|---|---|---|
| `fields` | How Milvus creates bucket keys | Creates one bucket for each distinct `brand` value. |
| `size` | The maximum number of returned buckets | Returns up to three brand buckets. |
| `metrics` | The statistics calculated for each bucket | Calculates product count, average price, and minimum price. |
| `order` | How Milvus sorts the returned buckets | Sorts by average price, then uses the bucket key to break ties. |

Milvus ignores `limit` when `search_aggregation` is set. Use the root `SearchAggregation.size` value to control the number of top-level buckets.

With these settings, Milvus returns the Adidas, Nike, and Puma buckets in descending `avg_price` order. The `_key` criterion applies only when buckets have the same average price. Because this configuration does not define `top_hits`, every bucket's `hits` list is empty.

<details>

<summary>Metric and ordering rules</summary>

Each `SearchAggregation.metrics` entry maps a user-defined alias to `{operation: source}`:

| Source | Supported operations | Behavior |
|---|---|---|
| A field name | `count`, `sum`, `avg`, `min`, `max` | `count` counts non-null field values. The other operations calculate over supported values and skip `NULL`. |
| `"*"` | `count` | Counts every retrieval-pool entity assigned to the bucket. The result matches `bucket.count`. |
| `_score` | `sum`, `avg`, `min`, `max` | Aggregates the ANN similarity or distance values of entities in the bucket. |

`SearchAggregation.order` accepts the following keys:

| Order key | Meaning |
|---|---|
| A metric alias | Sorts by a value calculated in `metrics` at the same aggregation level, such as `avg_price`. |
| `_count` | Sorts by the number of retrieval-pool entities in each bucket. |
| `_key` | Sorts by the bucket key rather than a collection field named `_key`. |

Each `order` entry maps a key to `"asc"` or `"desc"`. Milvus evaluates multiple entries from first to last. If you omit `order`, Milvus keeps the bucket discovery order from the retrieval pool.

To sort buckets by vector match quality, first calculate a bucket-level metric from `_score`, and then use the metric alias in `order`. You cannot use `_score` directly as a bucket-order key because each bucket can contain multiple entity scores. For example, with `COSINE` or `IP`:

```python
aggregation = SearchAggregation(
    fields=["brand"],
    size=3,
    metrics={"max_score": {"max": "_score"}},
    order=[{"max_score": "desc"}],
)
```

With `L2`, calculate the minimum `_score` value and sort the metric alias in ascending order so that buckets with the lowest distance come first.

</details>

<details>

<summary>Create composite bucket keys</summary>

To create a composite bucket key, pass multiple field names in the same list:

```python
aggregation = SearchAggregation(
    # highlight-start
    # Combine brand and color to form a composite bucket key.
    fields=["brand", "color"],
    # highlight-end
    size=6,
)
```

This configuration can produce keys such as `(Nike, black)`, `(Nike, blue)`, and `(Adidas, white)`. Two entities share a bucket only when both values match. Milvus preserves the list order, so `brand` is the first key component and `color` is the second. When `_key` is used in `order`, Milvus compares composite key components in the same order. Pass multiple strings in one flat list; nested lists are not supported.

`size=6` is the maximum number of composite buckets returned at this aggregation level. The example data contains five distinct brand-color combinations, so all five can be returned. In the [returned-entry limit](#Limits), this request contributes `1 query vector × 6 buckets × 1 = 6` configured result entries.

Multiple fields in one `SearchAggregation.fields` list create a composite bucket key at that aggregation level. To create a parent-child bucket hierarchy, use a [nested aggregation](#Group-results-at-multiple-levels).

</details>

The examples that follow redefine `aggregation`. Pass the updated object to the same `search_aggregation` parameter and rerun the search call.

### Show representative results from each bucket

Include representative entities when the application needs to show actual products from each bucket. In this example, Milvus returns up to two products from each brand bucket, ordered by rating and then by vector score.

Configure `TopHits` as follows:

```python
aggregation = SearchAggregation(
    fields=["brand"],
    size=3,
    # highlight-start
    # Return and sort representative entities for each selected bucket.
    top_hits=TopHits(
        # Return up to two entities per bucket.
        size=2,
        # Apply sort criteria in list order.
        sort=[
            {"rating": "desc"},
            {"_score": "desc"},
        ],
    ),
    # highlight-end
)
```

<details>

<summary>View a bucket with representative hits</summary>

The following Nike bucket was captured from the request above and serialized as JSON for readability.

```json
{
  "key": [
    {
      "field_id": 103,
      "field_name": "brand",
      "value": "Nike"
    }
  ],
  "count": 2,
  "metrics": {},
  "hits": [
    {
      "pk": 1,
      "score": 0.9997663497924805,
      "fields": {
        "brand": "Nike",
        "name": "Nike Air Zoom Runner",
        "price": 129.99,
        "rating": 4.7
      }
    },
    {
      "pk": 2,
      "score": 0.9997047781944275,
      "fields": {
        "brand": "Nike",
        "name": "Nike Pegasus Trail",
        "price": 139.99,
        "rating": 4.6
      }
    }
  ],
  "sub_groups": []
}
```

</details>

| Parameter | Purpose |
|---|---|
| `top_hits` | Optional. Configures representative entities for this aggregation level. If omitted, Milvus still returns the bucket key, count, metrics, and child buckets, but `bucket.hits` is empty. |
| `TopHits.size` | Returns up to two representative entities from each selected bucket. |
| `TopHits.sort` | Orders entities inside each bucket using the listed criteria. |

Set `top_hits` only when the application needs representative entities from each bucket.

`SearchAggregation.order` sorts buckets, while `TopHits.sort` sorts entities inside each bucket. `TopHits.sort` accepts supported scalar field names and the built-in `_score` field, which represents the ANN similarity or distance. Milvus evaluates the `sort` entries from first to last. In this example, it orders products by `rating` from highest to lowest and uses `_score` only when two ratings are equal. Because the setup uses `COSINE`, descending `_score` places the more similar product first.

The fields used by `TopHits.sort` do not have to appear in `output_fields`. However, only fields in `output_fields` are included in each returned hit's `fields` mapping.

Each returned `AggregationHit` exposes its primary key in `pk`, vector score in `score`, and requested output fields in `fields`.

### Group results at multiple levels

Use nested aggregation when you need one level of buckets inside another. In this example, Milvus creates category buckets first, and then creates brand buckets within each category.

The child aggregation receives only the entities assigned to its parent bucket. `fields` controls the bucket key at each aggregation level, while `sub_aggregation` creates the parent-child hierarchy.

The configuration below creates a category bucket with the key `(running_shoes)`. Within that parent bucket, the child aggregation creates separate brand buckets with keys such as `(Nike)`, `(Adidas)`, and `(Puma)`.

```text
Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Nike)
├── (Adidas)
└── (Puma)
```

Each level can independently use multiple fields. For example, using `fields=["brand", "color"]` in the child aggregation would create composite child keys such as `(Nike, black)`.

The following configuration implements this hierarchy:

```python
aggregation = SearchAggregation(
    fields=["category"],
    size=2,
    metrics={
        "product_count": {"count": "*"},
        "avg_price": {"avg": "price"},
    },
    order=[{"product_count": "desc"}],
    # highlight-start
    # For each category bucket, group only its entities by brand.
    sub_aggregation=SearchAggregation(
        fields=["brand"],
        size=3,
        metrics={
            "brand_count": {"count": "*"},
            "avg_rating": {"avg": "rating"},
        },
        order=[{"avg_rating": "desc"}],
        top_hits=TopHits(
            size=2,
            sort=[{"rating": "desc"}],
        ),
    ),
    # highlight-end
)
```

<details>

<summary>View a nested bucket result</summary>

The following serialized excerpt shows the `running_shoes` parent bucket and its Adidas child bucket. The Nike and Puma child buckets are omitted for brevity.

```json
{
  "key": [
    {
      "field_id": 104,
      "field_name": "category",
      "value": "running_shoes"
    }
  ],
  "count": 4,
  "metrics": {
    "avg_price": 137.49,
    "product_count": 4
  },
  "hits": [],
  "sub_groups": [
    {
      "key": [
        {
          "field_id": 103,
          "field_name": "brand",
          "value": "Adidas"
        }
      ],
      "count": 1,
      "metrics": {
        "avg_rating": 4.8,
        "brand_count": 1
      },
      "hits": [
        {
          "pk": 3,
          "score": 0.999454140663147,
          "fields": {
            "brand": "Adidas",
            "category": "running_shoes",
            "color": "white",
            "in_stock": true,
            "name": "Adidas Ultraboost Light",
            "price": 159.99,
            "rating": 4.8
          }
        }
      ],
      "sub_groups": []
    }
  ]
}
```

</details>

The displayed result represents the bucket path `(running_shoes) → (Adidas)`, not a single composite bucket key `(running_shoes, Adidas)`.

Milvus first selects up to two category buckets, ordered by `product_count`. It then runs `sub_aggregation` independently within each selected category and returns up to three brand buckets, ordered by `avg_rating`.

In the output above:

- The root `running_shoes` bucket contains four retrieval-pool entities. Its `metrics` contain the root-level `avg_price` and `product_count` values.
- The root bucket's `sub_groups` list contains the child brand buckets. The displayed Adidas bucket contains one entity and its own `avg_rating` and `brand_count` values.
- The root bucket's `hits` list is empty because the root aggregation does not configure `top_hits`. The Adidas child contains a representative hit because `top_hits` is configured in `sub_aggregation`.

## FAQ

### How accurate are bucket counts and metrics?

Search Aggregation summarizes the ANN retrieval pool. It does not run a full-collection aggregation.

For example, suppose a collection contains 5,000 Nike products, but the retrieval pool for one query contains 35 Nike products. A `product_count` metric in the Nike bucket describes those 35 retrieved products. It does not report 5,000.

Approximation matters most when `order` uses a metric alias. Changes in search recall can change the metric values and therefore change which buckets fit within `SearchAggregation.size`. Nested aggregation can amplify this effect because each child level operates on the entities available in its parent bucket.

If you need exact statistics over every matching entity, use an exact query aggregation workflow instead of Search Aggregation.

### How does Search Aggregation differ from Grouping Search?

Use [Grouping Search](grouping-search.md) when your goal is to improve result diversity and control how many entities each group returns.

Use Search Aggregation when you need structured bucket results, such as composite keys, per-bucket metrics, bucket ordering, independently sorted representative hits, or nested buckets. Search Aggregation uses a separate API and returns its results through `result.agg_buckets`.

Do not combine `search_aggregation` with `group_by_field` or `group_by_fields` in the same request.
