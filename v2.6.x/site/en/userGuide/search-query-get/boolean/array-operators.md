---
id: array-operators.md
title: "ARRAY Operators"
summary: "Milvus provides powerful operators to query array fields, allowing you to filter and retrieve entities based on the contents of arrays."
---

# ARRAY Operators

Milvus provides powerful operators to query array fields, allowing you to filter and retrieve entities based on the contents of arrays. 

<div class="alert note">

All elements within an array must be the same type, and nested structures within arrays are treated as plain strings. Therefore, when working with ARRAY fields, it is advisable to avoid excessively deep nesting and ensure that your data structures are as flat as possible for optimal performance.

</div>

## Available ARRAY Operators

The ARRAY operators allow for fine-grained querying of array fields in Milvus. These operators are:

- `ARRAY_CONTAINS(identifier, expr)`: checks if a specific element exists in an array field.

- `ARRAY_CONTAINS_ALL(identifier, expr)`: ensures that all elements of the specified list are present in the array field.

- `ARRAY_CONTAINS_ANY(identifier, expr)`: checks if any of the elements from the specified list are present in the array field.

- `ARRAY_LENGTH(identifier, expr)`: allows you to filter entities based on the number of elements in an array field.

## ARRAY_CONTAINS

The `ARRAY_CONTAINS` operator checks if a specific element exists in an array field. It’s useful when you want to find entities where a given element is present in the array.

**Example**

Suppose you have an array field `history_temperatures`, which contains the recorded lowest temperatures for different years. To find all entities where the array contains the value `23`, you can use the following filter expression:

```python
filter = 'ARRAY_CONTAINS(history_temperatures, 23)'
```

This will return all entities where the `history_temperatures` array contains the value `23`.

## ARRAY_CONTAINS_ALL

The `ARRAY_CONTAINS_ALL` operator ensures that all elements of the specified list are present in the array field. This operator is useful when you want to match entities that contain multiple values in the array.

**Example**

If you want to find all entities where the `history_temperatures` array contains both `23` and `24`, you can use:

```python
filter = 'ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])'
```

This will return all entities where the `history_temperatures` array contains both of the specified values.

## ARRAY_CONTAINS_ANY

The `ARRAY_CONTAINS_ANY` operator checks if any of the elements from the specified list are present in the array field. This is useful when you want to match entities that contain at least one of the specified values in the array.

**Example**

To find all entities where the `history_temperatures` array contains either `23` or `24`, you can use:

```python
filter = 'ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])'
```

This will return all entities where the `history_temperatures` array contains at least one of the values `23` or `24`.

## ARRAY_LENGTH

The `ARRAY_LENGTH` operator allows you to filter entities based on the number of elements in an array field. This is useful when you need to find entities with arrays of a certain length.

**Example**

If you want to find all entities where the `history_temperatures` array has fewer than 10 elements, you can use:

```python
filter = 'ARRAY_LENGTH(history_temperatures) < 10'
```

This will return all entities where the `history_temperatures` array has fewer than 10 elements.