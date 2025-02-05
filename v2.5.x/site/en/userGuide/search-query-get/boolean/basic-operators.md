---
id: basic-operators.md
summary: Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches.​
title: Basic Operators
---

# Basic Operators​

Milvus provides a rich set of basic operators to help you filter and query data efficiently. These operators allow you to refine your search conditions based on scalar fields, numeric calculations, logical conditions, and more. Understanding how to use these operators is crucial for building precise queries and maximizing the efficiency of your searches.​

## Comparison operators​

Comparison operators are used to filter data based on equality, inequality, or size. They are applicable to numeric, text, and date fields.​

### Supported Comparison Operators:​

- `==` (Equal to)​

- `!=` (Not equal to)​

- `>` (Greater than)​

- `<` (Less than)​

- `>=` (Greater than or equal to)​

- `<=` (Less than or equal to)​

### Example 1: Filtering with Greater Than or Equal To (`>=`)​

If you want to find all entities with `rating` greater than or equal to 4:​

```python
filter = 'rating >= 4'​

```

### Example 2: Filtering with Less Than or Equal To (`<=`)​

To find entities with `discount` less than or equal to 10%:​

```python
filter = 'discount <= 10'​

```

## Range operators​

Range operators help filter data based on specific sets or ranges of values.​

### Supported Range Operators:​

- `IN`: Used to match values within a specific set or range.​

- `LIKE`: Used to match a pattern (mostly for text fields).​

### Example 1: Using `IN` to Match Multiple Values​

If you want to find all entities where the `color` is either "red", "green", or "blue":​

```python
filter = 'color in ["red", "green", "blue"]'​

```

This is useful when you want to check for membership in a list of values.​

### Example 2: Using `LIKE` for Pattern Matching​

The `LIKE` operator is used for pattern matching in string fields. It can match substrings in different positions within the text: as a **prefix**, **infix**, or **suffix**. The `LIKE` operator uses the `%` symbol as a wildcard, which can match any number of characters (including zero).​

#### Prefix Match (Starts With)​

To perform a **prefix** match, where the string starts with a given pattern, you can place the pattern at the beginning and use `%` to match any characters following it. For example, to find all products whose `name` starts with "Prod":​

```python
filter = 'name LIKE "Prod%"'​

```

This will match any product whose name starts with "Prod", such as "Product A", "Product B", etc.​

#### Suffix Match (Ends With)​

For a **suffix** match, where the string ends with a given pattern, place the `%` symbol at the beginning of the pattern. For example, to find all products whose `name` ends with "XYZ":​

```python
filter = 'name LIKE "%XYZ"'​

```

This will match any product whose name ends with "XYZ", such as "ProductXYZ", "SampleXYZ", etc.​

#### Infix Match (Contains)​

To perform an **infix** match, where the pattern can appear anywhere in the string, you can place the `%` symbol at both the beginning and the end of the pattern. For example, to find all products whose `name` contains the word "Pro":​

```python
filter = 'name LIKE "%Pro%"'​

```

This will match any product whose name contains the substring "Pro", such as "Product", "ProLine", or "SuperPro".​

## Arithmetic Operators​

Arithmetic operators allow you to create conditions based on calculations involving numeric fields.​

### Supported Arithmetic Operators:​

- `+` (Addition)​

- `-` (Subtraction)​

- `*` (Multiplication)​

- `/` (Division)​

- `%` (Modulus)​

- `**` (Exponentiation)​

### Example 1: Using Addition (`+`)​

To find entities where the `total` price is the sum of `base_price` and `tax`:​

```python
filter = 'total == base_price + tax'​

```

### Example 2: Using Subtraction (`-`)​

To find entities where `quantity` is greater than 50 and `quantity_sold` is less than 30:​

```python
filter = 'quantity - quantity_sold > 50'​

```

### Example 3: Using Multiplication (`*`)​

To find entities where `price` is greater than 100 and `quantity` is greater than 10, multiplied:​

```python
filter = 'price * quantity > 1000'​

```

### Example 4: Using Division (`/`)​

To find products where `total_price` divided by `quantity` is less than 50:​

```python
filter = 'total_price / quantity < 50'​

```

### Example 5: Using Modulus (`%`)​

To find entities where the `id` is an even number (i.e., divisible by 2):​

```python
filter = 'id % 2 == 0'​

```

### Example 6: Using Exponentiation (`**`)​

To find entities where `price` raised to the power of 2 is greater than 1000:​

```python
filter = 'price ** 2 > 1000'​

```

## Logical Operators​

Logical operators are used to combine multiple conditions into a more complex filter expression. These include `AND`, `OR`, and `NOT`.​

### Supported Logical Operators:​

- `AND`: Combines multiple conditions that must all be true.​

- `OR`: Combines conditions where at least one must be true.​

- `NOT`: Negates a condition.​

### Example 1: Using `AND` to Combine Conditions​

To find all products where `price` is greater than 100 and `stock` is greater than 50:​

```python
filter = 'price > 100 AND stock > 50'​

```

### Example 2: Using `OR` to Combine Conditions​

To find all products where `color` is either "red" or "blue":​

```python
filter = 'color == "red" OR color == "blue"'​

```

### Example 3: Using `NOT` to Exclude a Condition​

To find all products where `color` is not "green":​

```python
filter = 'NOT color == "green"'​

```

## Tips on Using Basic Operators with JSON and ARRAY Fields​

While the basic operators in Milvus are versatile and can be applied to scalar fields, they can also be effectively used with the keys and indexes in the JSON and ARRAY fields.​

For example, if you have a `product` field that contains multiple keys like `price`, `model`, and `tags`, always reference the key directly:​

```python
filter = 'product["price"] > 1000'​

```

To find records where the first temperature in an array of recorded temperatures exceeds a certain value, use:​

```python
filter = 'history_temperatures[0] > 30'​

```

## Conclusion​

Milvus offers a range of basic operators that give you flexibility in filtering and querying your data. By combining comparison, range, arithmetic, and logical operators, you can create powerful filter expressions to narrow down your search results and retrieve the data you need efficiently.​
