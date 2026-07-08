---
id: basic-operators.md
title: "Basic Operators"
summary: "Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches."
---

# Basic Operators

Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches.

## Comparison operators

Comparison operators are used to filter data based on equality, inequality, or size. They are applicable to numeric and text fields.

### Supported comparison operators

- `==` (Equal to)

- `!=` (Not equal to)

- `>` (Greater than)

- `<` (Less than)

- `>=` (Greater than or equal to)

- `<=` (Less than or equal to)

### Example 1: Filtering with equal to (`==`)

Assume you have a field named `status` and you want to find all entities where `status` is "active". You can use the equality operator `==`:

```python
filter = 'status == "active"'
```

### Example 2: Filtering with not equal to (`!=`)

To find entities where `status` is not "inactive":

```python
filter = 'status != "inactive"'
```

### Example 3: Filtering with greater than (`>`)

If you want to find all entities with an `age` greater than 30:

```python
filter = 'age > 30'
```

### Example 4: Filtering with less than

To find entities where `price` is less than 100:

```python
filter = 'price < 100'
```

### Example 5: Filtering with greater than or equal to (`>=`)

If you want to find all entities with `rating` greater than or equal to 4:

```python
filter = 'rating >= 4'
```

### Example 6: Filtering with less than or equal to

To find entities with `discount` less than or equal to 10%:

```python
filter = 'discount <= 10'
```

## Range operators

Range operators help filter data based on a specific set of values. Milvus supports `IN` for set membership checks.

If you want to find all entities where the `color` is either "red", "green", or "blue":

```python
filter = 'color in ["red", "green", "blue"]'
```

This is useful when you want to check for membership in a list of values.

## Pattern matching operators

Pattern matching operators help filter string values based on wildcard patterns or regular expressions.

- `LIKE`: Used to match simple wildcard patterns on string values. For example, `name LIKE "Prod%"` matches values that start with `Prod`.

- `=~`: Used to match a string value with an RE2 regular expression. For example, `code =~ "E[0-9]{4}"` matches values that contain an error code such as `E1001`.

- `!~`: Used to exclude string values that match an RE2 regular expression. This is equivalent to `NOT (field =~ "pattern")`.

To find entities where `name` starts with `Prod`:

```python
filter = 'name LIKE "Prod%"'
```

To find entities whose `code` contains an error code such as `E1001`:

```python
filter = 'code =~ "E[0-9]{4}"'
```

To exclude entities whose `message` starts with `DEBUG`:

```python
filter = 'message !~ "^DEBUG"'
```

For more details about choosing between `LIKE` and regex, supported field types, regex syntax, escaping rules, and performance, refer to [Pattern Matching](pattern-matching.md). Milvus also allows you to build an `NGRAM` index on `VARCHAR` fields or JSON string paths to accelerate eligible pattern matching filters. For details, refer to [NGRAM](ngram.md).

## Arithmetic operators

Arithmetic operators allow you to create conditions based on calculations involving numeric fields.

### Supported arithmetic operators

- `+` (Addition)

- `-` (Subtraction)

- `*` (Multiplication)

- `/` (Division)

- `%` (Modulus)

- `**` (Exponentiation)

### Example 1: Using modulus (`%`)

To find entities where the `id` is an even number (i.e., divisible by 2):

```python
filter = 'id % 2 == 0'
```

### Example 2: Using exponentiation (`**`)

To find entities where `price` raised to the power of 2 is greater than 1000:

```python
filter = 'price ** 2 > 1000'
```

## Bitwise operators | Milvus 3.0.0+

Bitwise operators are useful when an integer field encodes multiple flags, such as permissions, feature flags, or status bits. You can use these operators in filter expressions to check, combine, or compare individual bits in an integer value.

For scalar fields, bitwise operators apply to integer field types, such as `INT8`, `INT16`, `INT32`, and `INT64`.

### Supported bitwise operators

| Operator | Name | Typical use |
| --- | --- | --- |
| `&` | Bitwise AND | Check whether specific bits are set. |
| <code>&#124;</code> | Bitwise OR | Combine bits before comparison. |
| `^` | Bitwise XOR | Compare bit differences between two values. |

### Example: Filtering by permission bits

Assume you have an integer field named `permissions`, and each bit in the integer represents a permission flag:

| Permission flag | Bit value |
| --- | --- |
| `READ` | `1` |
| `WRITE` | `2` |
| `SHARE` | `4` |
| `ADMIN` | `8` |

For example, `permissions = 5` means that the `READ` and `SHARE` bits are set, because `5 = 1 + 4`.

To find entities where the `SHARE` bit is set, use bitwise AND (`&`):

```python
filter = "(permissions & 4) == 4"
```

To find entities where setting the `WRITE` bit produces the `READ + WRITE + SHARE` permission set, use bitwise OR (`|`):

```python
filter = "(permissions | 2) == 7"
```

To find entities whose permission bits differ from `READ + WRITE + SHARE` by only the `WRITE` bit, use bitwise XOR (`^`):

```python
filter = "(permissions ^ 7) == 2"
```

<div class="alert note">

Always wrap the bitwise operation in parentheses before comparing the result, such as `(permissions & 4) == 4`. Milvus 3.0.0 supports `&`, `|`, and `^` in filter expressions. Bitwise NOT (`~`) and shift operators (`<<` and `>>`) are not supported.

</div>

## Logical operators

Logical operators are used to combine multiple conditions into a more complex filter expression. These include `AND`, `OR`, and `NOT`.

### Supported logical operators

- `AND`: Combines multiple conditions that must all be true.

- `OR`: Combines conditions where at least one must be true.

- `NOT`: Negates a condition.

### Example 1: Using `AND` to combine conditions

To find all products where `price` is greater than 100 and `stock` is greater than 50:

```python
filter = 'price > 100 AND stock > 50'
```

### Example 2: Using `OR` to combine conditions

To find all products where `color` is either "red" or "blue":

```python
filter = 'color == "red" OR color == "blue"'
```

### Example 3: Using `NOT` to exclude a condition

To find all products where `color` is not "green":

```python
filter = 'NOT color == "green"'
```

## IS NULL and IS NOT NULL operators

The `IS NULL` and `IS NOT NULL` operators are used to filter fields based on whether they contain a null value (absence of data).

- `IS NULL`: Identifies entities where a specific field contains a null value, i.e., the value is absent or undefined.

- `IS NOT NULL`: Identifies entities where a specific field contains any value other than null, meaning the field has a valid, defined value.

<div class="alert note">

The operators are case-insensitive, so you can use `IS NULL` or `is null`, and `IS NOT NULL` or `is not null`.

</div>

### Regular scalar fields with null values

Milvus allows filtering on regular scalar fields, such as strings or numbers, with null values.

<div class="alert note">

An empty string `""` is not treated as a null value for a `VARCHAR` field.

</div>

To retrieve entities where the `description` field is null:

```python
filter = 'description IS NULL'
```

To retrieve entities where the `description` field is not null:

```python
filter = 'description IS NOT NULL'
```

To retrieve entities where the `description` field is not null and the `price` field is higher than 10:

```python
filter = 'description IS NOT NULL AND price > 10'
```

### JSON fields with null values

Milvus allows filtering on JSON fields that contain null values. A JSON field is treated as null in the following ways:

- The entire JSON object is explicitly set to None (null), for example, `{"metadata": None}`.

- The JSON field itself is completely missing from the entity.

<div class="alert note">

If some elements within a JSON object are null (e.g. individual keys), the field is still considered non-null. For example, `\{"metadata": \{"category": None, "price": 99.99}}` is not treated as null, even though the `category` key is null.

</div>

To further illustrate how Milvus handles JSON fields with null values, consider the following sample data with a JSON field `metadata`:

```python
data = [
  {
      "metadata": {"category": "electronics", "price": 99.99, "brand": "BrandA"},
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "metadata": None, # Entire JSON object is null
      "pk": 2,
      "embedding": [0.56, 0.78, 0.90]
  },
  {  # JSON field `metadata` is completely missing
      "pk": 3,
      "embedding": [0.91, 0.18, 0.23]
  },
  {
      "metadata": {"category": None, "price": 99.99, "brand": "BrandA"}, # Individual key value is null
      "pk": 4,
      "embedding": [0.56, 0.38, 0.21]
  }
]
```

**Example 1: Retrieve entities where metadata is null**

To find entities where the `metadata` field is either missing or explicitly set to None:

```python
filter = 'metadata IS NULL'

# Example output:
# data: [
#     "{'metadata': None, 'pk': 2}",
#     "{'metadata': None, 'pk': 3}"
# ]
```

**Example 2: Retrieve entities where metadata is not null**

To find entities where the `metadata` field is not null:

```python
filter = 'metadata IS NOT NULL'

# Example output:
# data: [
#     "{'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}, 'pk': 1}",
#     "{'metadata': {'category': None, 'price': 99.99, 'brand': 'BrandA'}, 'pk': 4}"
# ]
```

### ARRAY fields with null values

Milvus allows filtering on ARRAY fields that contain null values. An ARRAY field is treated as null in the following ways:

- The entire ARRAY field is explicitly set to None (null), for example, `"tags": None`.

- The ARRAY field is completely missing from the entity.

<div class="alert note">

An ARRAY field cannot contain partial null values as all elements in an ARRAY field must have the same data type. For details, refer to [Array Field](array_data_type.md).

</div>

To further illustrate how Milvus handles ARRAY fields with null values, consider the following sample data with an ARRAY field `tags`:

```python
data = [
  {
      "tags": ["pop", "rock", "classic"],
      "ratings": [5, 4, 3],
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "tags": None,  # Entire ARRAY is null
      "ratings": [4, 5],
      "pk": 2,
      "embedding": [0.78, 0.91, 0.23]
  },
  {  # The tags field is completely missing
      "ratings": [9, 5],
      "pk": 3,
      "embedding": [0.18, 0.11, 0.23]
  }
]
```

**Example 1: Retrieve entities where tags is null**

To retrieve entities where the `tags` field is either missing or explicitly set to `None`:

```python
filter = 'tags IS NULL'

# Example output:
# data: [
#     "{'tags': None, 'ratings': [4, 5], 'embedding': [0.78, 0.91, 0.23], 'pk': 2}",
#     "{'tags': None, 'ratings': [9, 5], 'embedding': [0.18, 0.11, 0.23], 'pk': 3}"
# ]
```

**Example 2: Retrieve entities where tags is not null**

To retrieve entities where the `tags` field is not null:

```python
filter = 'tags IS NOT NULL'

# Example output:
# data: [
#     "{'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}, 'pk': 1}",
#     "{'metadata': {'category': None, 'price': 99.99, 'brand': 'BrandA'}, 'pk': 4}"
# ]
```

## Tips on using basic operators with JSON and ARRAY fields

While the basic operators in Milvus are versatile and can be applied to scalar fields, they can also be effectively used with the keys and indexes in the JSON and ARRAY fields.

For example, if you have a `product` field that contains multiple keys like `price`, `model`, and `tags`, always reference the key directly:

```python
filter = 'product["price"] > 1000'
```

To find records where the first temperature in an array of recorded temperatures exceeds a certain value, use:

```python
filter = 'history_temperatures[0] > 30'
```

## Conclusion

Milvus offers a range of basic operators that give you flexibility in filtering and querying your data. By combining comparison, range, arithmetic, and logical operators, you can create powerful filter expressions to narrow down your search results and retrieve the data you need efficiently.

## FAQ

**Is there a limit to the length of the match value list in filter conditions (e.g., filter='color in ["red", "green", "blue"]')? What should I do if the list is too long?**

Zilliz Cloud does not impose a length limit on the match value list in filter conditions. However, an excessively long list can significantly impact query performance.
If your filter condition includes a long list of match values or a complex expression with many elements, we recommend using [Filter Templating](filtering-templating.md) to improve query performance.
