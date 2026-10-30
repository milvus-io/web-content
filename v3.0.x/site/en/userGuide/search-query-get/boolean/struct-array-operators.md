---
id: struct-array-operators.md
title: "StructArray Operators"
summary: "StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for element_filter, the MATCH_* operator family, and row-level predicates on StructArray paths."
---
# StructArray Operators

StructArray operators filter entities by evaluating predicates on scalar subfields inside a StructArray field. Use this page as a syntax reference for `element_filter`, the `MATCH_*` operator family, and row-level predicates on StructArray paths.

StructArray filtering has two operator families and a set of row-level path predicates:

| Filter form | Main purpose | Result behavior |
| --- | --- | --- |
| `element_filter` | Match Struct elements that satisfy a scalar predicate. | In element-level search, matched hits can include element offsets. In row-level query or filtered search, result shape depends on the API and output fields. |
| `MATCH_*` | Select entities by how many Struct elements satisfy a scalar predicate. | Row-level filtering. These operators do not return element offsets by themselves. |
| Row-level path predicates | Test one element position, count Struct elements, or test subfield values across elements without a `$[...]` predicate. | Row-level filtering. These predicates do not return element offsets. |

Use scalar subfields in StructArray operators. Vector subfields are used by vector search paths and are not scalar predicate inputs.

## When to use which operator

Choose an operator according to your filtering goal:

| Goal | Use |
| --- | --- |
| Constrain element-level vector search to elements that match scalar conditions. | `element_filter` |
| Match multiple scalar conditions within the same Struct element. | `element_filter` |
| Return only entities where at least one Struct element satisfies a predicate. | `MATCH_ANY` |
| Return only entities where all Struct elements satisfy a predicate. | `MATCH_ALL` |
| Return only entities where at least, at most, or exactly `N` Struct elements satisfy a predicate. | `MATCH_LEAST`, `MATCH_MOST`, or `MATCH_EXACT` |
| Check the Struct element at a specific position, such as the first chunk. | A positional path such as `chunks[0][section]` |
| Filter by the number of Struct elements in an entity. | `array_length(chunks)` |
| Check whether any Struct element holds a subfield value, without combining conditions on the same element. | `array_contains`, `array_contains_any`, or `array_contains_all` on a subfield path such as `chunks[section]` |

## Example data

The following partial entity examples show only the `chunks` fields of **Entity A** and **Entity B**. They are not complete insert payloads.

**Entity A**:

```json
{
    "chunks": [
        {
            "section": "index",
            "quality_score": 0.74,
            "has_code": true
        },
        {
            "section": "index",
            "quality_score": 0.72,
            "has_code": true
        },
        {
            "section": "index",
            "quality_score": 0.83,
            "has_code": true
        },
        {
            "section": "index",
            "quality_score": 0.87,
            "has_code": true
        }
    ]
}
```

**Entity B**:

```json
{
    "chunks": [
        {
            "section": "index",
            "quality_score": 0.95,
            "has_code": true
        },
        {
            "section": "index",
            "quality_score": 0.92,
            "has_code": true
        },
        {
            "section": "index",
            "quality_score": 0.97,
            "has_code": true
        }
    ]
}
```

## Element Filter

Use `element_filter(structArrayField, predicate)` to match Struct elements in a StructArray field.

Inside the predicate, use `$[subfield]` to refer to a scalar subfield of the current Struct element.

```text
element_filter(chunks, $[section] == "index")
```

Both Entity A and Entity B match: all seven shown elements have `section` set to `"index"`.

When multiple conditions are used inside the predicate, all `$[subfield]` references apply to the same Struct element:

```text
element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)
```

Only Entity B matches: all three of its elements satisfy both conditions.

When you combine an entity-level predicate with `element_filter`, place `element_filter` at the end of the expression:

```text
# Correct
category == "index" && element_filter(chunks, $[quality_score] > 0.9)

# Incorrect
element_filter(chunks, $[quality_score] > 0.9) && category == "index"
```

The `category` example illustrates expression ordering independently of the example data, which does not define `category`.

`element_filter` can appear only once in a filter expression. Do not nest `element_filter` or `MATCH_*` inside another `element_filter`.

## Match Family Operators

Use `MATCH_*` operators when an entity should be selected based on how many Struct elements satisfy a predicate. The operators have the following meanings:

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

```text
MATCH_ANY(chunks, $[section] == "index")
```

Both Entity A and Entity B match because each has at least one element with `section` set to `"index"`.

For an empty StructArray, `MATCH_ANY` returns `false`.

### MATCH_ALL

`MATCH_ALL` evaluates to `true` if every element in the StructArray satisfies the predicate.

```text
MATCH_ALL(chunks, $[has_code] == true)
```

Both Entity A and Entity B match because every shown element has `has_code` set to `true`.

For an empty StructArray, `MATCH_ALL` returns `true`.

### MATCH_LEAST

`MATCH_LEAST` evaluates to `true` if the number of elements satisfying the predicate is greater than or equal to `threshold`.

```text
MATCH_LEAST(chunks, $[quality_score] > 0.9, threshold=2)
```

Only Entity B matches: Entity A has zero qualifying elements, and Entity B has three.

For `MATCH_LEAST`, `threshold` must be a positive integer.

### MATCH_MOST

`MATCH_MOST` evaluates to `true` if the number of elements satisfying the predicate is less than or equal to `threshold`.

```text
MATCH_MOST(chunks, $[has_code] == true, threshold=1)
```

Neither entity matches: Entity A has four qualifying elements, and Entity B has three.

For `MATCH_MOST`, `threshold` can be zero or a positive integer.

### MATCH_EXACT

`MATCH_EXACT` evaluates to `true` if the number of elements satisfying the predicate is exactly equal to `threshold`.

```text
MATCH_EXACT(chunks, $[section] == "filter", threshold=1)
```

Neither entity matches because neither has an element with `section` set to `"filter"`.

For `MATCH_EXACT`, `threshold` can be zero or a positive integer.

## Row-level predicates on StructArray paths

Besides `element_filter` and `MATCH_*`, a regular filter expression can reference a StructArray field or one of its scalar subfields directly. These predicates evaluate at the entity level and do not return element offsets.

### Subfield access

#### Access a Struct element by position

Use `structArrayField[index][subfield]` to reference one scalar subfield of the Struct element at a zero-based position. Write the position first, then the subfield name. The reversed path `chunks[quality_score][0] > 0.8` is invalid.

For example, test the first element's quality score:

```text
chunks[0][quality_score] > 0.8
```

Only Entity B matches this expression.

```text
# The first chunk belongs to the "index" section.
chunks[0][section] == "index"

# The second chunk has a high quality score.
chunks[1][quality_score] > 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 < chunks[0][quality_score] < 0.95
```

For Entity A and Entity B, the first section predicate matches both entities, the second score predicate matches only Entity B, and the strict score range matches neither. The `page` predicate is a generic example; the example data does not define `page`.

Positional paths support comparison, `in`, `not in`, and chained range predicates on scalar subfields. An entity does not match when its StructArray field has no element at that position.

### ARRAY operators

#### Count Struct elements

Use `array_length(structArrayField)` to filter by the number of Struct elements in an entity. `array_length` on a subfield path, such as `array_length(chunks[section])`, returns the same count, because every subfield holds one value per Struct element.

```text
# Articles with at least three chunks.
array_length(chunks) >= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
```

The parent-field count predicates match both entities for `>= 3` and neither for `== 1`. You can also count values on a subfield path:

```text
ARRAY_LENGTH(chunks[quality_score]) == 3
```

Only Entity B matches because its `quality_score` subfield has three values.

#### Test subfield values across elements

For example, test whether any quality score equals `0.74`:

```text
ARRAY_CONTAINS(chunks[quality_score], 0.74)
```

Only Entity A matches.

Use `array_contains`, `array_contains_any`, or `array_contains_all` on a scalar subfield path to test the values of that subfield across all Struct elements in the entity. Each subfield path is evaluated on its own, so conditions on different subfields can be satisfied by different Struct elements.

```text
# At least one chunk belongs to the "index" section.
array_contains(chunks[section], "index")

# At least one chunk belongs to the "index" or the "search" section.
array_contains_any(chunks[section], ["index", "search"])

# The chunks cover both the "index" and the "search" sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], ["index", "search"])
```

For the example data, the `array_contains` and `array_contains_any` expressions match both entities. The `array_contains_all` expression matches neither because neither entity has a `"search"` section. These examples do not demonstrate conditions satisfied by different elements on different subfields.

`array_contains(chunks[section], "index")` selects the same entities as `MATCH_ANY(chunks, $[section] == "index")`. Use `MATCH_*` or `element_filter` when several conditions must hold for the same Struct element, because `$[...]` predicates are evaluated per element.

### Test whether a nullable StructArray field is null

Use `IS NULL` or `IS NOT NULL` on a nullable StructArray field to test the whole field value. NULL applies to the entire StructArray field, so these predicates accept only the field name, not a subfield path.

```text
# Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
```

For applicability, see [Nullable and dynamic schema limits](structarray-limits.md#Nullable-and-dynamic-schema-limits). Entity A and Entity B both have non-NULL StructArray values.

## Supported predicates

The `$[...]` syntax represents the scalar value of the current Struct element. Predicate support depends on the scalar subfield type:

| Subfield type | Element-level predicate support |
| --- | --- |
| `BOOL` | Scalar predicates such as `$[has_code] == true` or `!($[has_code] == true)`. Avoid bare boolean expressions such as `$[has_code]`. |
| `INT8`, `INT16`, `INT32`, `INT64` | Comparison, chained range, `in`, `not in`, arithmetic expressions with `+`, `-`, `*`, `/`, or `%` followed by comparison, and logical combinations. |
| `FLOAT`, `DOUBLE` | Comparison, chained range, `in`, `not in`, arithmetic expressions with `+`, `-`, `*`, or `/` followed by comparison, and logical combinations. The `%` operator is not supported for floating-point subfields. |
| `VARCHAR` | String comparison, chained range, `in`, `not in`, `like`, `=~`, `!~`, and logical combinations. |
| Vector subfields | Not supported as `$[...]` scalar predicate inputs. Use vector subfields through EmbeddingList search or element-level vector search instead. |

Logical operators such as `&&`, `||`, and `!` apply to predicate expressions. For example, write `!($[has_code] == true)` instead of `!$[has_code]`.

## Unsupported predicates

Element-level `$[...]` predicates do not support:

- Text match functions, such as `text_match(field, "...")` or `phrase_match(field, "...")`.

- JSON path syntax, `exists` on JSON paths, or JSON functions such as `json_contains`, `json_contains_all`, or `json_contains_any`.

- Array container functions such as `array_contains`, `array_contains_all`, `array_contains_any`, or `array_length` on `$[subfield]`. Use these functions on a subfield path such as `chunks[section]` in a row-level predicate instead.

- `$[subfield] is null` or `$[subfield] is not null`.

- Geometry / GIS functions.

- Timestamptz expressions.

- `random_sample(...)`.

- Field-level vector predicates.

- Generic filter function calls unless the specific function signature and execution path explicitly support StructArray element-level predicates.

## Syntax rules

Follow these syntax rules:

- `MATCH_*` operator names are case-insensitive.

- Use `$[subfield]` only inside `element_filter` or `MATCH_*` predicates. For example, `array_length($[section])` is rejected.

- Do not use `$[subfield]` as a JSON path, array container, or vector field reference.

- Do not nest `element_filter` or `MATCH_*` inside another StructArray operator.

- Use named `threshold=N` for `MATCH_LEAST`, `MATCH_MOST`, and `MATCH_EXACT`.

- In positional paths, write the element position before the subfield name: `chunks[0][section]`, not `chunks[section][0]`.

- Use `IS NULL` and `IS NOT NULL` only on the whole StructArray field, such as `chunks is null`. Do not use them on a subfield path such as `chunks[section]` or on `$[subfield]`.

- `MATCH_ANY` on an empty StructArray returns `false`.

- `MATCH_ALL` on an empty StructArray returns `true`.

## See also

For related guidance, see:

- [Filtered Search with StructArray](filtered-search-with-structarray.md)

- [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md)

- [Index StructArray Fields](index-structarray-fields.md)

- [StructArray Limits](structarray-limits.md)
