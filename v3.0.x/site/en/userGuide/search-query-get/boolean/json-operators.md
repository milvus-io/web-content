---
id: json-operators.md
title: "JSON Operators"
summary: "Milvus supports advanced operators for querying and filtering JSON fields, making them perfect for managing complex, structured data. These operators enable highly effective querying of JSON documents, allowing you to retrieve entities based on specific elements, values, or conditions within the JSON fields. This section will guide you through using JSON-specific operators in Milvus, providing practical examples to illustrate their functionality."
---

# JSON Operators

Milvus supports advanced operators for querying and filtering JSON fields, making them perfect for managing complex, structured data. These operators enable highly effective querying of JSON documents, allowing you to retrieve entities based on specific elements, values, or conditions within the JSON fields. This section will guide you through using JSON-specific operators in Milvus, providing practical examples to illustrate their functionality.

<div class="alert note">

JSON fields cannot deal with complex, nested structures and treats all nested structures as plain strings. Therefore, when working with JSON fields, it is advisable to avoid excessively deep nesting and ensure that your data structures are as flat as possible for optimal performance.

</div>

## Available JSON Operators

Milvus provides several powerful JSON operators that help filter and query JSON data, and these operators are:

- `JSON_CONTAINS(identifier, expr)`: Filters entities where the specified JSON expression is found within the field.

- `JSON_CONTAINS_ALL(identifier, expr)`: Ensures that all elements of the specified JSON expression are present in the field.

- `JSON_CONTAINS_ANY(identifier, expr)`: Filters entities where at least one member of the JSON expression exists within the field.

Let’s explore these operators with examples to see how they can be applied in real-world scenarios.

## JSON_CONTAINS

The `json_contains` operator checks if a specific element or subarray exists within a JSON field. It’s useful when you want to ensure that a JSON array or object contains a particular value.

**Example**

Imagine you have a collection of products, each with a `tags` field that contains a JSON array of strings, such as `["electronics", "sale", "new"]`. You want to filter products that have the tag `"sale"`.

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter = 'json_contains(product["tags"], "sale")'
```

In this example, Milvus will return all products where the `tags` field contains the element `"sale"`.

## JSON_CONTAINS_ALL

The `json_contains_all` operator ensures that all elements of a specified JSON expression are present in the target field. It is particularly useful when you need to match multiple values within a JSON array.

**Example**

Continuing with the product tags scenario, if you want to find all products that have the tags `"electronics"`, `"sale"`, and `"new"`, you can use the `json_contains_all` operator.

```python
# JSON data: {"tags": ["electronics", "sale", "new", "discount"]}
filter = 'json_contains_all(product["tags"], ["electronics", "sale", "new"])'
```

This query will return all products where the `tags` array contains all three specified elements: `"electronics"`, `"sale"`, and `"new"`.

## JSON_CONTAINS_ANY

The `json_contains_any` operator filters entities where at least one member of the JSON expression exists within the field. This is useful when you want to match entities based on any one of several possible values.

**Example**

Let’s say you want to filter products that have at least one of the tags `"electronics"`, `"sale"`, or `"new"`. You can use the `json_contains_any` operator to achieve this.

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter = 'json_contains_any(tags, ["electronics", "new", "clearance"])'
```

In this case, Milvus will return all products that have at least one of the tags in the list `["electronics", "new", "clearance"]`. Even if a product only has one of these tags, it will be included in the result.