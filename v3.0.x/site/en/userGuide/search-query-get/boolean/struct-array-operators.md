---
id: struct-array-operators.md
title: "StructArray Operators"
summary: "Use element filters and match-family operators to filter scalar sub-fields inside StructArray fields."
beta: Milvus 3.0.x
---

# StructArray Operators

The Array of Structs, or StructArray, in an entity stores an ordered set of Struct elements. Each Struct in the Array shares the same predefined schema, which comprises multiple vectors and scalar fields. When a scalar sub-field in a Struct is indexed, you can use **element filters** and **operators in the match family** to perform scalar filtering on it.

An element filter selects entities that contain at least one value in a StructArray field matching the specified predicate. In contrast, the match family operators are used to find entities that contain specific numbers or proportions of values in a StructArray field matching the specified predicate.

<div class="alert note">

When building predicates against `$[subField]`, ensure the sub-field is indexed if you are working with large-scale datasets, as these operators require iterating through the array elements for each candidate entity.

</div>

## Element filter

Use element filters when you need to check whether an entity contains the values that match a specific predicate in its StructArray field.

```python
element_filter(chunks, $[text] LIKE "Red%")
```

As shown in the above element filter expression, the element filter returns entities that contain at least one chunk that starts with "Red" in the `text` sub-field. The first parameter is the name of the StructArray field, while the second parameter is the predicate that applies to the Struct sub-field.

You can use comparison, range, and arithmetic operators to build the condition, and logical operators to concatenate multiple conditions, as shown in [Basic Operators](basic-operators.md).

However, when you build a filter expression that combines both an entity-level predicate and an element filter, you should always place the element fltler at the end, as shown in the following example.

```python
# correct
id > 0 && element_filter(chunks, $[x] > 1)

# incorrect, resulting errors
element_filter(chunks, $[x] > 1) && id > 0
```

## Match family operators

The match family operators work over a StructArray field, too. Instead of simply checking whether an element exists, you can determine how many elements (or what proportion) must satisfy an element predicate.

- [`MATCH_ANY(identifier, predicate)`](struct-array-operators.md#MATCHANY): returns entities that contain at least one chunk that starts with "Red" in the `text` sub-field; semantically, this is equivalent to `element_filter`.

- [`MATCH_ALL(identifier, predicate)`](struct-array-operators.md#MATCHALL): returns entities whose text sub-fields in all chunks start with "Red".

- [`MATCH_LEAST(identifier, predicate, k)`](struct-array-operators.md#MATCHLEAST): returns entities that contain at least `k` chunks that start with "Red" in the `text` sub-field.

- [`MATCH_MOST(identifier, predicate, k)`](struct-array-operators.md#MATCHMOST): returns entities that contain at most `k` chunks that start with "Red" in the `text` sub-field.

- [`MATCH_EXACT(identifier, predicate, k)`](struct-array-operators.md#MATCHEXACT): returns entities that contain exactly `k` chunks that start with "Red" in the `text` sub-field.

### MATCH_ANY

This operator evaluates to true if **at least one** element in the array satisfies the predicate, which indicates that the structural equivalent of a logical `OR` across all array elements.

MATCH_ANY operators and element filters are semantically the same, and you can use them interchangeably. When you need to express the logic `count(matches) >= 1`, you should use them.

**EXAMPLE:**

The following example returns entities where any part of the document starts with "Red".

```python
MATCH_ANY(chunks, $[text] LIKE 'Red%')
```

### MATCH_ALL

This operator evaluates to true only if **every single** element in the array satisfies the predicate.

When you need to express the logic `count(matches) == total elements`, use this operator.

**EXAMPLE:**

```python
MATCH_ALL(chunks, $[text] LIKE 'Red%')
```

### MATCH_LEAST

This operator is a quantitative filter that returns true if the number of elements satisfying the predicate is **greater than or equal to** a specified constant $k$.

When you need to express the logic `count(matches) >= k`, use this operator.

**EXAMPLE:**

```python
MATCH_LEAST(chunks, $[text] LIKE 'Red%', 3)
```

### MATCH_MOST

This operator is a quantitative filter that returns true if the number of elements satisfying the predicate is **less than or equal to** a specified constant $k$.

This is particularly useful for filtering out entities that over-target a specific keyword (noise reduction).

**EXAMPLE:**

```python
MATCH_MOST(chunks, $[text] LIKE 'Red%', 3)
```

### MATCH_EXACT

This operator is the most restrictive quantitative operator in the family. It returns true if and only if the number of elements satisfying the predicate is **exactly** $k$.

**EXAMPLE:**

```python
MATCH_EXACT(chunks, $[text] LIKE 'Red%', 3)
```
