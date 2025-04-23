---
id: basic-operators.md
title: "Basic Operators"
summary: "Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches."
---

# Basic Operators

Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches.

## Comparison operators

Comparison operators are used to filter data based on equality, inequality, or size. They are applicable to numeric and text fields.

### Supported Comparison Operators:

- `==` (Equal to)

- `!=` (Not equal to)

- `>` (Greater than)

- `<` (Less than)

- `>=` (Greater than or equal to)

- `<=` (Less than or equal to)

### Example 1: Filtering with Equal To (`==`)

Assume you have a field named `status` and you want to find all entities where `status` is "active". You can use the equality operator `==`:

```python
filter = 'status == "active"'
```

### Example 2: Filtering with Not Equal To (`!=`)

To find entities where `status` is not "inactive":

```python
filter = 'status != "inactive"'
```

### Example 3: Filtering with Greater Than (`>`)

If you want to find all entities with an `age` greater than 30:

```python
filter = 'age > 30'
```

### Example 4: Filtering with Less Than

To find entities where `price` is less than 100:

```python
filter = 'price < 100'
```

### Example 5: Filtering with Greater Than or Equal To (`>=`)

If you want to find all entities with `rating` greater than or equal to 4:

```python
filter = 'rating >= 4'
```

### Example 6: Filtering with Less Than or Equal To

To find entities with `discount` less than or equal to 10%:

```python
filter = 'discount <= 10'
```

## Range operators

Range operators help filter data based on specific sets or ranges of values.

### Supported Range Operators:

- `IN`: Used to match values within a specific set or range.

- `LIKE`: Used to match a pattern (mostly for text fields).

### Example 1: Using `IN` to Match Multiple Values

If you want to find all entities where the `color` is either "red", "green", or "blue":

```python
filter = 'color in ["red", "green", "blue"]'
```

This is useful when you want to check for membership in a list of values.

### Example 2: Using `LIKE` for Pattern Matching

The `LIKE` operator is used for pattern matching in string fields. It can match substrings in different positions within the text: as a **prefix**, **infix**, or **suffix**. The `LIKE` operator uses the `%` symbol as a wildcard, which can match any number of characters (including zero).

### Prefix Match (Starts With)

To perform a **prefix** match, where the string starts with a given pattern, you can place the pattern at the beginning and use `%` to match any characters following it. For example, to find all products whose `name` starts with "Prod":

```python
filter = 'name LIKE "Prod%"'
```

This will match any product whose name starts with "Prod", such as "Product A", "Product B", etc.

### Suffix Match (Ends With)

For a **suffix** match, where the string ends with a given pattern, place the `%` symbol at the beginning of the pattern. For example, to find all products whose `name` ends with "XYZ":

```python
filter = 'name LIKE "%XYZ"'
```

This will match any product whose name ends with "XYZ", such as "ProductXYZ", "SampleXYZ", etc.

### Infix Match (Contains)

To perform an **infix** match, where the pattern can appear anywhere in the string, you can place the `%` symbol at both the beginning and the end of the pattern. For example, to find all products whose `name` contains the word "Pro":

```python
filter = 'name LIKE "%Pro%"'
```

This will match any product whose name contains the substring "Pro", such as "Product", "ProLine", or "SuperPro".

## Arithmetic Operators

Arithmetic operators allow you to create conditions based on calculations involving numeric fields.

### Supported Arithmetic Operators:

- `+` (Addition)

- `-` (Subtraction)

- `*` (Multiplication)

- `/` (Division)

- `%` (Modulus)

- `**` (Exponentiation)

### Example 1: Using Modulus (`%`)

To find entities where the `id` is an even number (i.e., divisible by 2):

```python
filter = 'id % 2 == 0'
```

### Example 2: Using Exponentiation (`**`)

To find entities where `price` raised to the power of 2 is greater than 1000:

```python
filter = 'price ** 2 > 1000'
```

## Logical Operators

Logical operators are used to combine multiple conditions into a more complex filter expression. These include `AND`, `OR`, and `NOT`.

### Supported Logical Operators:

- `AND`: Combines multiple conditions that must all be true.

- `OR`: Combines conditions where at least one must be true.

- `NOT`: Negates a condition.

### Example 1: Using `AND` to Combine Conditions

To find all products where `price` is greater than 100 and `stock` is greater than 50:

```python
filter = 'price > 100 AND stock > 50'
```

### Example 2: Using `OR` to Combine Conditions

To find all products where `color` is either "red" or "blue":

```python
filter = 'color == "red" OR color == "blue"'
```

### Example 3: Using `NOT` to Exclude a Condition

To find all products where `color` is not "green":

```python
filter = 'NOT color == "green"'
```

## IS NULL and IS NOT NULL Operators

The `IS NULL` and `IS NOT NULL` operators are used to filter fields based on whether they contain a null value (absence of data).

- `IS NULL`: Identifies entities where a specific field contains a null value, i.e., the value is absent or undefined.

- `IS NOT NULL`: Identifies entities where a specific field contains any value other than null, meaning the field has a valid, defined value.

<div class="alert note">

The operators are case-insensitive, so you can use `IS NULL` or `is null`, and `IS NOT NULL` or `is not null`.

</div>

### Regular Scalar Fields with Null Values

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

### JSON Fields with Null Values

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

**Example 1: Retrieve entities where `metadata` is null**

To find entities where the `metadata` field is either missing or explicitly set to None:

```python
filter = 'metadata IS NULL'

# Example output:
# data: [
#     "{'metadata': None, 'pk': 2}",
#     "{'metadata': None, 'pk': 3}"
# ]
```

**Example 2: Retrieve entities where `metadata` is not null**

To find entities where the `metadata` field is not null:

```python
filter = 'metadata IS NOT NULL'

# Example output:
# data: [
#     "{'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}, 'pk': 1}",
#     "{'metadata': {'category': None, 'price': 99.99, 'brand': 'BrandA'}, 'pk': 4}"
# ]
```

### ARRAY Fields with Null Values

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

**Example 1: Retrieve entities where `tags` is null**

To retrieve entities where the `tags` field is either missing or explicitly set to `None`:

```python
filter = 'tags IS NULL'

# Example output:
# data: [
#     "{'tags': None, 'ratings': [4, 5], 'embedding': [0.78, 0.91, 0.23], 'pk': 2}",
#     "{'tags': None, 'ratings': [9, 5], 'embedding': [0.18, 0.11, 0.23], 'pk': 3}"
# ]
```

**Example 2: Retrieve entities where `tags` is not null**

To retrieve entities where the `tags` field is not null:

```python
filter = 'tags IS NOT NULL'

# Example output:
# data: [
#     "{'metadata': {'category': 'electronics', 'price': 99.99, 'brand': 'BrandA'}, 'pk': 1}",
#     "{'metadata': {'category': None, 'price': 99.99, 'brand': 'BrandA'}, 'pk': 4}"
# ]
```

## Tips on Using Basic Operators with JSON and ARRAY Fields

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