---
id: filtering-templating.md
title: "Filter Templating"
summary: "In Milvus, complex filter expressions with numerous elements, especially those involving non-ASCII characters like CJK characters, can significantly affect query performance. To address this, Milvus introduces a filter expression templating mechanism designed to improve efficiency by reducing the time spent parsing complex expressions. This page explains using filter expression templating in search, query, and delete operations."
---

# Filter Templating

In Milvus, complex filter expressions with numerous elements, especially those involving non-ASCII characters like CJK characters, can significantly affect query performance. To address this, Milvus introduces a filter expression templating mechanism designed to improve efficiency by reducing the time spent parsing complex expressions. This page explains using filter expression templating in search, query, and delete operations.

## Overview

Filter expression templating allows you to create filter expressions with placeholders, which can be dynamically substituted with values during query execution. Using templating, you avoid embedding large arrays or complex expressions directly into the filter, reducing parsing time and improving query performance.

Let's say you have a filter expression involving two fields, `age` and `city`, and you want to find all people whose age is greater than 25 and who live in either "北京" (Beijing) or "上海" (Shanghai). Instead of directly embedding the values in the filter expression, you can use a template:

```python
filter = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
```

Here, `{age}` and `{city}` are placeholders that will be replaced with the actual values in `filter_params` when the query is executed.

Using filter expression templating in Milvus has several key advantages:

- **Reduced Parsing Time**: By replacing large or complex filter expressions with placeholders, the system spends less time parsing and processing the filter.

- **Improved Query Performance**: With reduced parsing overhead, query performance improves, leading to higher QPS and faster response times.

- **Scalability**: As your datasets grow and filter expressions become more complex, templating ensures that performance remains efficient and scalable.

## Search Operations

For search operations in Milvus, the `filter` expression is used to define the filtering condition, and the `filter_params` parameter is used to specify the values for the placeholders. The `filter_params` dictionary contains the dynamic values that Milvus will use to substitute into the filter expression.

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.search(
    "hello_milvus",
    vectors[:nq],
    filter=expr,
    limit=10,
    output_fields=["age", "city"],
    search_params={"metric_type": "COSINE", "params": {"search_list": 100}},
    filter_params=filter_params,
)
```

In this example, Milvus will dynamically replace `{age}` with `25` and `{city}` with `["北京", "上海"]` when executing the search.

## Query Operations

The same templating mechanism can be applied to query operations in Milvus. In the `query` function, you define the filter expression and use the `filter_params` to specify the values to substitute.

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.query(
    "hello_milvus",
    filter=expr,
    output_fields=["age", "city"],
    filter_params=filter_params
)
```

By using `filter_params`, Milvus efficiently handles the dynamic insertion of values, improving the speed of query execution.

## Delete Operations

You can also use filter expression templating in delete operations. Similar to search and query, the `filter` expression defines the conditions, and the `filter_params` provides the dynamic values for the placeholders.

```python
expr = "age > {age} AND city IN {city}"
filter_params = {"age": 25, "city": ["北京", "上海"]}
res = client.delete(
    "hello_milvus",
    filter=expr,
    filter_params=filter_params
)
```

This approach improves the performance of delete operations, especially when dealing with complex filter conditions.

## Conclusion

Filter expression templating is an essential tool for optimizing query performance in Milvus. By using placeholders and the `filter_params` dictionary, you can significantly reduce the time spent parsing complex filter expressions. This leads to faster query execution and better overall performance.