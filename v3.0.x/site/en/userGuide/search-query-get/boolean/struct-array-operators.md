---
id: struct-array-operators.md
title: "StructArray Operators"
summary: "StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for element_filter and the MATCH_* operator family."
---
# StructArray Operators

StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for `element_filter` and the `MATCH_*` operator family.

StructArray filtering has two operator families:

| Operator family | Main purpose | Result behavior |
| --- | --- | --- |
| `element_filter` | Match Struct elements that satisfy a scalar predicate. | In element-level search, matched hits can include element offsets. In row-level query or filtered search, result shape depends on the API and output fields. |
| `MATCH_*` | Select entities by how many Struct elements satisfy a scalar predicate. | Row-level filtering. These operators do not return element offsets by themselves. |

Use scalar subfields in StructArray operators. Vector subfields are used by vector search paths and are not scalar predicate inputs.

## When to use which operator

| Goal | Use |
| --- | --- |
| Constrain element-level vector search to elements that match scalar conditions. | `element_filter` |
| Match multiple scalar conditions within the same Struct element. | `element_filter` |
| Return only entities where at least one Struct element satisfies a predicate. | `MATCH_ANY` |
| Return only entities where all Struct elements satisfy a predicate. | `MATCH_ALL` |
| Return only entities where at least, at most, or exactly `N` Struct elements satisfy a predicate. | `MATCH_LEAST`, `MATCH_MOST`, or `MATCH_EXACT` |

## Element Filter

Use `element_filter(structArrayField, predicate)` to match Struct elements in a StructArray field.

Inside the predicate, use `$[subfield]` to refer to a scalar subfield of the current Struct element.

```python
element_filter(chunks, $[section] == "index")
```

When multiple conditions are used inside the predicate, all `$[subfield]` references apply to the same Struct element:

```python
element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)
```

When you combine an entity-level predicate with `element_filter`, place `element_filter` at the end of the expression:

```python
# Correct
category == "index" && element_filter(chunks, $[quality_score] > 0.9)

# Incorrect
element_filter(chunks, $[quality_score] > 0.9) && category == "index"
```

`element_filter` can appear only once in a filter expression. Do not nest `element_filter` or `MATCH_*` inside another `element_filter`.

## Match Family Operators

Use `MATCH_*` operators when an entity should be selected based on how many Struct elements satisfy a predicate.

| Operator | Meaning |
| --- | --- |
| `MATCH_ANY(field, predicate)` | At least one Struct element satisfies the predicate. |
| `MATCH_ALL(field, predicate)` | All Struct elements satisfy the predicate. |
| `MATCH_LEAST(field, predicate, threshold=N)` | At least `N` Struct elements satisfy the predicate. |
| `MATCH_MOST(field, predicate, threshold=N)` | At most `N` Struct elements satisfy the predicate. |
| `MATCH_EXACT(field, predicate, threshold=N)` | Exactly `N` Struct elements satisfy the predicate. |

`MATCH_ANY` and `element_filter` can both express that at least one Struct element satisfies a predicate. Use `MATCH_ANY` when you only need row-level filtering. Use `element_filter` when you need element-level constraints, such as filtering which Struct elements participate in element-level vector search.

### MATCH_ANY

`MATCH_ANY` evaluates to `true` if at least one element in the StructArray satisfies the predicate.

```python
MATCH_ANY(chunks, $[section] == "index")
```

For an empty StructArray, `MATCH_ANY` returns `false`.

### MATCH_ALL

`MATCH_ALL` evaluates to `true` if every element in the StructArray satisfies the predicate.

```python
MATCH_ALL(chunks, $[has_code] == true)
```

For an empty StructArray, `MATCH_ALL` returns `true`.

### MATCH_LEAST

`MATCH_LEAST` evaluates to `true` if the number of elements satisfying the predicate is greater than or equal to `threshold`.

```python
MATCH_LEAST(chunks, $[quality_score] > 0.9, threshold=2)
```

For `MATCH_LEAST`, `threshold` must be a positive integer.

### MATCH_MOST

`MATCH_MOST` evaluates to `true` if the number of elements satisfying the predicate is less than or equal to `threshold`.

```python
MATCH_MOST(chunks, $[has_code] == true, threshold=1)
```

For `MATCH_MOST`, `threshold` can be zero or a positive integer.

### MATCH_EXACT

`MATCH_EXACT` evaluates to `true` if the number of elements satisfying the predicate is exactly equal to `threshold`.

```python
MATCH_EXACT(chunks, $[section] == "filter", threshold=1)
```

For `MATCH_EXACT`, `threshold` can be zero or a positive integer.

## Supported predicates

The `$[...]` syntax represents the scalar value of the current Struct element. Predicate support depends on the scalar subfield type.

| Subfield type | Element-level predicate support |
| --- | --- |
| `BOOL` | Scalar predicates such as `$[has_code] == true` or `!($[has_code] == true)`. Avoid bare boolean expressions such as `$[has_code]`. |
| `INT8`, `INT16`, `INT32`, `INT64` | Comparison, chained range, `in`, `not in`, arithmetic expressions with `+`, `-`, `*`, `/`, or `%` followed by comparison, and logical combinations. |
| `FLOAT`, `DOUBLE` | Comparison, chained range, `in`, `not in`, arithmetic expressions with `+`, `-`, `*`, or `/` followed by comparison, and logical combinations. The `%` operator is not supported for floating-point subfields. |
| `VARCHAR` | String comparison, chained range, `in`, `not in`, `like`, `=~`, `!~`, and logical combinations. |
| Vector subfields | Not supported as `$[...]` scalar predicate inputs. Use vector subfields through EmbeddingList search or element-level vector search instead. |

Logical operators such as `&&`, `\|\|`, and `!` apply to predicate expressions. For example, write `!($[has_code] == true)` instead of `!$[has_code]`.

## Unsupported predicates

Element-level `$[...]` predicates do not support:

- Text match functions, such as `text_match(field, "...")` or `phrase_match(field, "...")`.

- JSON path syntax, `exists` on JSON paths, or JSON functions such as `json_contains`, `json_contains_all`, or `json_contains_any`.

- Array container functions such as `array_contains`, `array_contains_all`, `array_contains_any`, or `array_length`.

- `$[subfield] is null` or `$[subfield] is not null`.

- Geometry / GIS functions.

- Timestamptz expressions.

- `random_sample(...)`.

- Field-level vector predicates.

- Generic filter function calls unless the specific function signature and execution path explicitly support StructArray element-level predicates.

## Syntax rules

- `MATCH_*` operator names are case-insensitive.

- Use `$[subfield]` only inside `element_filter` or `MATCH_*` predicates.

- Do not use `$[subfield]` as a JSON path, array container, or vector field reference.

- Do not nest `element_filter` or `MATCH_*` inside another StructArray operator.

- Use named `threshold=N` for `MATCH_LEAST`, `MATCH_MOST`, and `MATCH_EXACT`.

- `MATCH_ANY` on an empty StructArray returns `false`.

- `MATCH_ALL` on an empty StructArray returns `true`.

## See also

- [Filtered Search with StructArray](filtered-search-with-structarray.md)

- [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md)

- [Index StructArray Fields](index-structarray-fields.md)

- [StructArray Limits](structarray-limits.md)
