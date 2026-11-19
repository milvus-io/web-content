---
id: boolean.md
title: "Filtering Explained"
summary: "Filter expressions select entities using conditions on supported fields. This guide introduces Milvus filter operators and links to their supported types, version requirements, and examples."
---

# Filtering Explained

Filter expressions select entities using conditions on supported fields. This guide introduces filter expressions, with examples focused on query operations. For each operator's supported types, version requirements, and usage, follow the links below.

## Basic operators

Milvus supports several basic operators for filtering data:

- **Comparison Operators**: `==`, `!=`, `>`, `<`, `>=`, and `<=` allow filtering based on numeric or text fields.

- **Range and pattern filters**: `IN`, `LIKE`, `=~`, and `!~` match values, wildcard patterns, or regex patterns. For details about string patterns, refer to [Pattern Matching](pattern-matching.md).

- **Arithmetic Operators**: `+`, `-`, `*`, `/`, `%`, and `**` are used for calculations involving numeric fields.

- **Bitwise Operators**: In Milvus 3.0.0 and later, `&`, `|`, and `^` filter integer fields that encode multiple flags, such as permissions or status bits. For details, refer to [Basic Operators](basic-operators.md#Bitwise-operators).

- **Logical Operators**: `AND`, `OR`, and `NOT` combine multiple conditions into complex expressions.

- **IS NULL and IS NOT NULL Operators**: Select entities based on whether a field is NULL or non-NULL. For scalar and vector field support, version requirements, and examples, refer to [Basic Operators](basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators).

### Example: Filtering by Color

To find entities with primary colors (red, green, or blue) in a scalar field `color`, use the following filter expression:

```python
filter='color in ["red", "green", "blue"]'
```

### Example: Filtering by Permission Bits

To find entities whose integer `permissions` field has the `SHARE` bit set, use the bitwise AND operator (`&`):

```python
filter='(permissions & 4) == 4'
```

### Example: Filtering by Regex Pattern

To find entities whose `message` field contains an error code such as `E1001`, use the regex match operator `=~`:

```python
filter='message =~ "E[0-9]{4}"'
```

Regex filters use substring matching. To require the entire field value to match the pattern, add `^` and `$` anchors. For details, refer to [Pattern Matching](pattern-matching.md).

### Example: Filtering JSON Fields

Milvus allows referencing keys in JSON fields. For instance, if you have a JSON field `product` with keys `price` and `model`, and want to find products with a specific model and price lower than 1,850, use this filter expression:

```python
filter='product["model"] == "JSN-087" AND product["price"] < 1850'
```

### Example: Filtering Array Fields

If you have an array field `history_temperatures` containing the records of average temperatures reported by observatories since the year 2000, and want to find observatories where the temperature in 2009 (the 10th recorded ) exceeds 23°C, use this expression:

```python
filter='history_temperatures[10] > 23'
```

For more information on these basic operators, refer to [Basic Operators](basic-operators.md).

## Filter expression templates

When filtering using CJK characters, processing can be more complex due to their larger character sets and encoding differences. This can result in slower performance, especially with the `IN` operator.

Milvus introduces filter expression templating to optimize performance when working with CJK characters. By separating dynamic values from the filter expression, the query engine handles parameter insertion more efficiently.

### Example

To find individuals over the age of 25 living in either "北京" (Beijing) or "上海" (Shanghai), use the following template expression:

```python
filter = "age > 25 AND city IN ['北京', '上海']"
```

To improve performance, use this variation with parameters:

```python
filter = "age > {age} AND city in {city}",
filter_params = {"age": 25, "city": ["北京", "上海"]}
```

This approach reduces parsing overhead and improves query speed. For more information, see [Filter Templating](filtering-templating.md).

## Data type-specific operators

Milvus provides advanced filtering operators for specific data types, such as JSON, ARRAY, and VARCHAR fields.

### JSON field-specific operators

Milvus offers advanced operators for querying JSON fields, enabling precise filtering within complex JSON structures:

`JSON_CONTAINS(identifier, jsonExpr)`: Checks if a JSON expression exists in the field.

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter='json_contains(tags, "sale")'
```

`JSON_CONTAINS_ALL(identifier, jsonExpr)`: Ensures all elements of the JSON expression are present.

```python
# JSON data: {"tags": ["electronics", "sale", "new", "discount"]}
filter='json_contains_all(tags, ["electronics", "sale", "new"])'
```

`JSON_CONTAINS_ANY(identifier, jsonExpr)`: Filters for entities where at least one element exists in the JSON expression.

```python
# JSON data: {"tags": ["electronics", "sale", "new"]}
filter='json_contains_any(tags, ["electronics", "new", "clearance"])'
```

For more details on JSON operators, refer to [JSON Operators](json-operators.md).

### ARRAY field-specific operators

Milvus provides advanced filtering operators for array fields, such as `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH`, which allow fine-grained control over array data:

`ARRAY_CONTAINS`: Filters entities containing a specific element.

```python
filter="ARRAY_CONTAINS(history_temperatures, 23)"
```

`ARRAY_CONTAINS_ALL`: Filters entities where all elements in a list are present.

```python
filter="ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])"
```

`ARRAY_CONTAINS_ANY`: Filters entities containing any element from the list.

```python
filter="ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])"
```

`ARRAY_LENGTH`: Filters based on the length of the array.

```python
filter="ARRAY_LENGTH(history_temperatures) < 10"
```

For more details on array operators, see [ARRAY Operators](array-operators.md).

### VARCHAR field-specific operators

Milvus provides specialized operators for precise text-based searches on VARCHAR fields:

#### Pattern matching operators

The `LIKE`, `=~`, and `!~` operators match string patterns on `VARCHAR` fields, JSON string paths, and specific `ARRAY<VARCHAR>` elements. Use `LIKE` for simple wildcard patterns. Use `=~` and `!~` for RE2 regular expressions.

For details, refer to [Pattern Matching](pattern-matching.md).

#### `TEXT_MATCH` operator

The `TEXT_MATCH` operator allows precise document retrieval based on specific query terms. It is particularly useful for filtered searches that combine scalar filters with vector similarity searches. Unlike semantic searches, Text Match focuses on exact term occurrences.

Milvus uses Tantivy to support inverted indexing and term-based text search. The process involves:

1. **Analyzer**: Tokenizes and processes input text.

1. **Indexing**: Creates an inverted index mapping unique tokens to documents.

For more details, refer to [Text Match](keyword-match.md).

#### `PHRASE_MATCH` operator | Milvus 2.6.x

The **PHRASE_MATCH** operator enables precise retrieval of documents based on exact phrase matches, considering both the order and adjacency of query terms.

For more details, refer to [Phrase Match](phrase-match.md).
