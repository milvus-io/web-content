# SearchAggregation

`SearchAggregation` configures bucket aggregation for a search request. It groups matching entities by one or more fields, optionally calculates metrics, orders buckets, returns top hits, and can contain a nested sub-aggregation.

```typescript
export type AggregationDirection = 'asc' | 'desc';

export type AggregationMetricOp =
  | 'avg'
  | 'sum'
  | 'count'
  | 'min'
  | 'max';

export interface SearchAggregationMetric {
  op: AggregationMetricOp;
  field_name: string;
}

export interface SearchAggregationOrder {
  key: string;
  direction: AggregationDirection;
}

export interface SearchAggregationSort {
  field_name: string;
  direction: AggregationDirection;
}

export interface SearchAggregationTopHits {
  size: number;
  sort?: SearchAggregationSort[];
}

export interface SearchAggregation {
  fields: string[];
  size: number;
  metrics?: Record<string, SearchAggregationMetric>;
  order?: SearchAggregationOrder[];
  top_hits?: SearchAggregationTopHits;
  sub_aggregation?: SearchAggregation;
}
```

## AggregationDirection

- **asc** - Sort buckets in ascending order.

- **desc** - Sort buckets in descending order.

## AggregationMetricOp

- **avg** - Average of the grouped field values.

- **sum** - Sum of the grouped field values.

- **count** - Number of entities in each group.

- **min** - Minimum of the grouped field values.

- **max** - Maximum of the grouped field values.

## SearchAggregation

- **fields** (*string[]*)

    **[REQUIRED]**

    The group-by field names. At least one field is required.

- **size** (*number*)

    **[REQUIRED]**

    The number of buckets to return. Must be a positive integer.

- **metrics** (*Record\\<string, SearchAggregationMetric\\>*)

    Optional metric aggregations keyed by alias.

- **order** (*SearchAggregationOrder[]*)

    Optional ordering rules for returned buckets. A key can be a metric alias, `_count`, or `_key`.

- **top_hits** (*SearchAggregationTopHits*)

    Optional top-hit documents returned for each bucket.

- **sub_aggregation** (*SearchAggregation*)

    Optional nested sub-aggregation. At most four aggregation levels are supported.

## SearchAggregationTopHits

- **size** (*number*)

    **[REQUIRED]**

    The number of hits to return per bucket. Must be a positive integer.

- **sort** (*SearchAggregationSort[]*)

    Optional sort rules applied to the hits in each bucket.

## SearchAggregationSort

- **field_name** (*string*)

    **[REQUIRED]**

    The field used to sort top hits.

- **direction** (*AggregationDirection*)

    The sort direction. Defaults to **desc**.

## Example

```typescript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
  address: 'localhost:19530',
});

const results = await milvusClient.search({
  collection_name: 'books',
  data: [[0.1, 0.2, 0.3]],
  limit: 10,
  search_aggregation: {
    fields: ['category'],
    size: 10,
    metrics: {
      avg_price: {
        op: 'avg',
        field_name: 'price',
      },
    },
    order: [
      {
        key: 'avg_price',
        direction: 'desc',
      },
    ],
    top_hits: {
      size: 3,
    },
  },
});
```

**NOTES:**

- Supports at most four aggregation levels.
- Supports at most ten group-by fields in total.
- Cannot be combined with a non-zero `offset`, hybrid search, search or query iterators, a highlighter, or `group_by_field`.
