# SearchAggregation

`SearchAggregation` groups search results by one or more fields and supports metrics, bucket ordering, top hits, and one nested aggregation level. Pass an instance through `SearchRequest::WithSearchAggregation()` or `SearchIteratorRequest::WithSearchAggregation()`.

```cpp
enum class AggregationDirection { ASC, DESC };
enum class AggregationMetricOp { AVG, SUM, COUNT, MIN, MAX };

struct AggregationMetric {
    AggregationMetric(AggregationMetricOp op, std::string field_name);
    AggregationMetricOp op{AggregationMetricOp::COUNT};
    std::string field_name;
};

struct AggregationOrder {
    AggregationOrder(std::string key, AggregationDirection direction, bool null_first = false);
    std::string key;
    AggregationDirection direction{AggregationDirection::ASC};
    bool null_first{false};
};

struct AggregationSort {
    AggregationSort(std::string field_name, AggregationDirection direction, bool null_first = false);
    std::string field_name;
    AggregationDirection direction{AggregationDirection::ASC};
    bool null_first{false};
};
```

## AggregationDirection

- **ASC** - Sort ascending.

- **DESC** - Sort descending.

## AggregationMetricOp

- **AVG** - Average of the field values.

- **SUM** - Sum of the field values.

- **COUNT** - Count of entities. Use `field_name = "*"` to count all fields.

- **MIN** - Minimum field value.

- **MAX** - Maximum field value.

## AggregationTopHits

Returns the top documents in each bucket.

```cpp
explicit AggregationTopHits(int64_t size);

int64_t Size() const;
void SetSize(int64_t size);
AggregationTopHits& WithSize(int64_t size);

const std::vector<AggregationSort>& Sorts() const;
void SetSorts(std::vector<AggregationSort>&& sorts);
AggregationTopHits& WithSorts(std::vector<AggregationSort>&& sorts);
AggregationTopHits& AddSort(AggregationSort sort);
Status Validate() const;
```

## SearchAggregation

```cpp
SearchAggregation(std::vector<std::string> fields, int64_t size);

const std::vector<std::string>& Fields() const;
SearchAggregation& WithFields(std::vector<std::string>&& fields);
SearchAggregation& AddField(std::string field);

int64_t Size() const;
SearchAggregation& WithSize(int64_t size);

const std::map<std::string, AggregationMetric>& Metrics() const;
SearchAggregation& WithMetrics(std::map<std::string, AggregationMetric>&& metrics);
SearchAggregation& AddMetric(std::string alias, AggregationMetric metric);

const std::vector<AggregationOrder>& Orders() const;
SearchAggregation& WithOrders(std::vector<AggregationOrder>&& orders);
SearchAggregation& AddOrder(AggregationOrder order);

const AggregationTopHitsPtr& TopHits() const;
SearchAggregation& WithTopHits(const AggregationTopHitsPtr& top_hits);

const SearchAggregationPtr& SubAggregation() const;
SearchAggregation& WithSubAggregation(const SearchAggregationPtr& sub_aggregation);

Status Validate() const;
```

**NOTES:**

- Supports at most four aggregation levels.
- Supports at most ten bucket-key fields in total.
- Not combinable with a non-zero offset, hybrid search, iterators, a highlighter, or grouping search.

## Example

```cpp
#include <milvus/types/SearchAggregation.h>
using namespace milvus;

auto aggregation = SearchAggregation({"category"}, 10);
aggregation.AddMetric("avg_price", AggregationMetric(AggregationMetricOp::AVG, "price"));
aggregation.AddOrder(AggregationOrder("avg_price", AggregationDirection::DESC));
```
