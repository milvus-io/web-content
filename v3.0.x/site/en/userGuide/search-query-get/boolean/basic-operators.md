---
id: basic-operators.md
title: "Basic Operators"
summary: "Use comparison, range, arithmetic, logical, and NULL operators to filter entities. Starting in Milvus 3.0.3, IS NULL and IS NOT NULL also support ordinary vector fields."
---

# Basic Operators

Milvus provides comparison, range, arithmetic, logical, and NULL operators for filtering entities. Each operator supports specific field types.

<div class="alert note">

The literal on the left-hand side of a filtering expression can either be a collection field name, such as `status`, `color`, etc., used in examples below, or the name of a StructArray subfield at a specific element index, as in `filter = 'struct[0][subfield] > 10'`.

For details on scalar filtering in a StructArray field, refer to [StructArray Operators](struct-array-operators.md).

</div>

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

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'status == "active"'
```

```java
String filter = "status == \"active\"";
```

```go
filter := "status == \"active\""
```

```rust
let filter = "status == \"active\"";
```

```cpp
std::string filter = "status == \"active\"";
```

```javascript
const filter = 'status == "active"';
```

```csharp
string filter = "status == \"active\"";
```

```bash
filter='status == "active"'
```

### Example 2: Filtering with not equal to (`!=`)

To find entities where `status` is not "inactive":

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'status != "inactive"'
```

```java
String filter = "status != \"inactive\"";
```

```go
filter := "status != \"inactive\""
```

```rust
let filter = "status != \"inactive\"";
```

```cpp
std::string filter = "status != \"inactive\"";
```

```javascript
const filter = 'status != "inactive"';
```

```csharp
string filter = "status != \"inactive\"";
```

```bash
filter='status != "inactive"'
```

### Example 3: Filtering with greater than (`>`)

If you want to find all entities with an `age` greater than 30:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'age > 30'
```

```java
String filter = "age > 30";
```

```go
filter := "age > 30"
```

```rust
let filter = "age > 30";
```

```cpp
std::string filter = "age > 30";
```

```javascript
const filter = 'age > 30';
```

```csharp
string filter = "age > 30";
```

```bash
filter='age > 30'
```

### Example 4: Filtering with less than

To find entities where `price` is less than 100:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'price < 100'
```

```java
String filter = "price < 100";
```

```go
filter := "price < 100"
```

```rust
let filter = "price < 100";
```

```cpp
std::string filter = "price < 100";
```

```javascript
const filter = 'price < 100';
```

```csharp
string filter = "price < 100";
```

```bash
filter='price < 100'
```

### Example 5: Filtering with greater than or equal to (`>=`)

If you want to find all entities with `rating` greater than or equal to 4:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'rating >= 4'
```

```java
String filter = "rating >= 4";
```

```go
filter := "rating >= 4"
```

```rust
let filter = "rating >= 4";
```

```cpp
std::string filter = "rating >= 4";
```

```javascript
const filter = 'rating >= 4';
```

```csharp
string filter = "rating >= 4";
```

```bash
filter='rating >= 4'
```

### Example 6: Filtering with less than or equal to

To find entities with `discount` less than or equal to 10%:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'discount <= 10'
```

```java
String filter = "discount <= 10";
```

```go
filter := "discount <= 10"
```

```rust
let filter = "discount <= 10";
```

```cpp
std::string filter = "discount <= 10";
```

```javascript
const filter = 'discount <= 10';
```

```csharp
string filter = "discount <= 10";
```

```bash
filter='discount <= 10'
```

## Range operators

Range operators help filter data based on a specific set of values. Milvus supports `IN` for set membership checks.

If you want to find all entities where the `color` is either "red", "green", or "blue":

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'color in ["red", "green", "blue"]'
```

```java
String filter = "color in [\"red\", \"green\", \"blue\"]";
```

```go
filter := "color in [\"red\", \"green\", \"blue\"]"
```

```rust
let filter = "color in [\"red\", \"green\", \"blue\"]";
```

```cpp
std::string filter = "color in [\"red\", \"green\", \"blue\"]";
```

```javascript
const filter = 'color in ["red", "green", "blue"]';
```

```csharp
string filter = "color in [\"red\", \"green\", \"blue\"]";
```

```bash
filter='color in ["red", "green", "blue"]'
```

This is useful when you want to check for membership in a list of values.

## Pattern matching operators

Pattern matching operators help filter string values based on wildcard patterns or regular expressions.

- `LIKE`: Used to match simple wildcard patterns on string values. For example, `name LIKE "Prod%"` matches values that start with `Prod`.

- `=~`: Used to match a string value with an RE2 regular expression. For example, `code =~ "E[0-9]{4}"` matches values that contain an error code such as `E1001`.

- `!~`: Used to exclude string values that match an RE2 regular expression. This is equivalent to `NOT (field =~ "pattern")`.

To find entities where `name` starts with `Prod`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'name LIKE "Prod%"'
```

```java
String filter = "name LIKE \"Prod%\"";
```

```go
filter := "name LIKE \"Prod%\""
```

```rust
let filter = "name LIKE \"Prod%\"";
```

```cpp
std::string filter = "name LIKE \"Prod%\"";
```

```javascript
const filter = 'name LIKE "Prod%"';
```

```csharp
string filter = "name LIKE \"Prod%\"";
```

```bash
filter='name LIKE "Prod%"'
```

To find entities whose `code` contains an error code such as `E1001`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'code =~ "E[0-9]{4}"'
```

```java
String filter = "code =~ \"E[0-9]{4}\"";
```

```go
filter := "code =~ \"E[0-9]{4}\""
```

```rust
let filter = "code =~ \"E[0-9]{4}\"";
```

```cpp
std::string filter = "code =~ \"E[0-9]{4}\"";
```

```javascript
const filter = 'code =~ "E[0-9]{4}"';
```

```csharp
string filter = "code =~ \"E[0-9]{4}\"";
```

```bash
filter='code =~ "E[0-9]{4}"'
```

To exclude entities whose `message` starts with `DEBUG`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'message !~ "^DEBUG"'
```

```java
String filter = "message !~ \"^DEBUG\"";
```

```go
filter := "message !~ \"^DEBUG\""
```

```rust
let filter = "message !~ \"^DEBUG\"";
```

```cpp
std::string filter = "message !~ \"^DEBUG\"";
```

```javascript
const filter = 'message !~ "^DEBUG"';
```

```csharp
string filter = "message !~ \"^DEBUG\"";
```

```bash
filter='message !~ "^DEBUG"'
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

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'id % 2 == 0'
```

```java
String filter = "id % 2 == 0";
```

```go
filter := "id % 2 == 0"
```

```rust
let filter = "id % 2 == 0";
```

```cpp
std::string filter = "id % 2 == 0";
```

```javascript
const filter = 'id % 2 == 0';
```

```csharp
string filter = "id % 2 == 0";
```

```bash
filter='id % 2 == 0'
```

### Example 2: Using exponentiation (`**`)

To find entities where `price` raised to the power of 2 is greater than 1000:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'price ** 2 > 1000'
```

```java
String filter = "price ** 2 > 1000";
```

```go
filter := "price ** 2 > 1000"
```

```rust
let filter = "price ** 2 > 1000";
```

```cpp
std::string filter = "price ** 2 > 1000";
```

```javascript
const filter = 'price ** 2 > 1000';
```

```csharp
string filter = "price ** 2 > 1000";
```

```bash
filter='price ** 2 > 1000'
```

<div class="alert note">

Arithmetic operators only support expressions involving a **single field and a constant**. Expressions that combine two fields arithmetically — such as `price * quantity > 100` — are not currently supported and will return an error. If you need to filter on a derived value computed from multiple fields, consider storing the pre-computed value as a separate scalar field at insert time.

</div>

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

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = "(permissions & 4) == 4"
```

```java
String filter = "(permissions & 4) == 4";
```

```go
filter := "(permissions & 4) == 4"
```

```rust
let filter = "(permissions & 4) == 4";
```

```cpp
std::string filter = "(permissions & 4) == 4";
```

```javascript
const filter = '(permissions & 4) == 4';
```

```csharp
string filter = "(permissions & 4) == 4";
```

```bash
filter='(permissions & 4) == 4'
```

To find entities where setting the `WRITE` bit produces the `READ + WRITE + SHARE` permission set, use bitwise OR (`|`):

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = "(permissions | 2) == 7"
```

```java
String filter = "(permissions | 2) == 7";
```

```go
filter := "(permissions | 2) == 7"
```

```rust
let filter = "(permissions | 2) == 7";
```

```cpp
std::string filter = "(permissions | 2) == 7";
```

```javascript
const filter = '(permissions | 2) == 7';
```

```csharp
string filter = "(permissions | 2) == 7";
```

```bash
filter='(permissions | 2) == 7'
```

To find entities whose permission bits differ from `READ + WRITE + SHARE` by only the `WRITE` bit, use bitwise XOR (`^`):

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = "(permissions ^ 7) == 2"
```

```java
String filter = "(permissions ^ 7) == 2";
```

```go
filter := "(permissions ^ 7) == 2"
```

```rust
let filter = "(permissions ^ 7) == 2";
```

```cpp
std::string filter = "(permissions ^ 7) == 2";
```

```javascript
const filter = '(permissions ^ 7) == 2';
```

```csharp
string filter = "(permissions ^ 7) == 2";
```

```bash
filter='(permissions ^ 7) == 2'
```

<div class="alert note">

Always wrap the bitwise operation in parentheses before comparing the result, such as `(permissions & 4) == 4`. Milvus supports `&`, `|`, and `^` in filter expressions. Bitwise NOT (`~`) and shift operators (`<<` and `>>`) are not supported.

</div>

## Logical operators

Logical operators are used to combine multiple conditions into a more complex filter expression. These include `AND`, `OR`, and `NOT`.

### Supported logical operators

- `AND`: Combines multiple conditions that must all be true.

- `OR`: Combines conditions where at least one must be true.

- `NOT`: Negates a condition.

### Example 1: Using `AND` to combine conditions

To find all products where `price` is greater than 100 and `stock` is greater than 50:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'price > 100 AND stock > 50'
```

```java
String filter = "price > 100 AND stock > 50";
```

```go
filter := "price > 100 AND stock > 50"
```

```rust
let filter = "price > 100 AND stock > 50";
```

```cpp
std::string filter = "price > 100 AND stock > 50";
```

```javascript
const filter = 'price > 100 AND stock > 50';
```

```csharp
string filter = "price > 100 AND stock > 50";
```

```bash
filter='price > 100 AND stock > 50'
```

### Example 2: Using `OR` to combine conditions

To find all products where `color` is either "red" or "blue":

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'color == "red" OR color == "blue"'
```

```java
String filter = "color == \"red\" OR color == \"blue\"";
```

```go
filter := "color == \"red\" OR color == \"blue\""
```

```rust
let filter = "color == \"red\" OR color == \"blue\"";
```

```cpp
std::string filter = "color == \"red\" OR color == \"blue\"";
```

```javascript
const filter = 'color == "red" OR color == "blue"';
```

```csharp
string filter = "color == \"red\" OR color == \"blue\"";
```

```bash
filter='color == "red" OR color == "blue"'
```

### Example 3: Using `NOT` to exclude a condition

To find all products where `color` is not "green":

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'NOT color == "green"'
```

```java
String filter = "NOT color == \"green\"";
```

```go
filter := "NOT color == \"green\""
```

```rust
let filter = "NOT color == \"green\"";
```

```cpp
std::string filter = "NOT color == \"green\"";
```

```javascript
const filter = 'NOT color == "green"';
```

```csharp
string filter = "NOT color == \"green\"";
```

```bash
filter='NOT color == "green"'
```

## IS NULL and IS NOT NULL operators

Use `IS NULL` and `IS NOT NULL` to find entities with missing or available field values. For example, you can find products without a category or entities whose embeddings are ready for search. Both operators work on supported scalar and vector fields, with the same meaning:

| Operator | Matches |
| --- | --- |
| `<field> IS NULL` | Entities whose specified field has a NULL value |
| `<field> IS NOT NULL` | Entities whose specified field has a non-NULL value |

Supported scalar fields include Boolean, numeric, `VARCHAR`, `JSON`, and `ARRAY` fields. These operators do not support [TEXT fields](text.md).

Starting in Milvus 3.0.3, the operators also support ordinary vector fields: `FLOAT_VECTOR`, `BINARY_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, `SPARSE_FLOAT_VECTOR`, and `INT8_VECTOR`.

The operators are case-insensitive: `IS NULL` and `is null` are equivalent, as are `IS NOT NULL` and `is not null`.

### Example: Find entities with missing or available values

Assume a collection named `products` is indexed and loaded. The collection has an `INT64` primary key named `id`, a nullable `VARCHAR` field named `category`, and a nullable, three-dimensional `FLOAT_VECTOR` field named `embedding`. It already contains the following entities:

| `id` | `category` | `embedding` |
| --- | --- | --- |
| `1` | `"book"` | `[0.1, 0.2, 0.3]` |
| `2` | NULL | `[0.4, 0.5, 0.6]` |
| `3` | `"book"` | NULL |

Collection creation and data insertion are omitted. For those steps, see [Nullable Fields](nullable-and-default.md).

To find entities that still need an embedding, query for `embedding IS NULL`. Adjust the connection settings for your server.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

results = client.query(
    collection_name="products",
    filter="embedding IS NULL",
    output_fields=["id"],
    limit=10,
)
print(sorted(entity["id"] for entity in results))
# Expected: [3]
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

QueryReq queryReq = QueryReq.builder()
        .collectionName("products")
        .filter("embedding IS NULL")
        .outputFields(Collections.singletonList("id"))
        .limit(10)
        .build();
QueryResp queryResp = client.query(queryReq);
System.out.println(queryResp.getQueryResults());
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal("failed to connect to milvus server: ", err.Error())
}
defer cli.Close(ctx)

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("products").
    WithFilter("embedding IS NULL").
    WithOutputFields("id").
    WithLimit(10))
if err != nil {
    log.Fatal("failed to query: ", err.Error())
}
ids := rs.GetColumn("id")
var result []int64
for i := 0; i < ids.Len(); i++ {
    v, _ := ids.GetAsInt64(i)
    result = append(result, v)
}
fmt.Println(result)
// Expected: [3]
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus"),
)
.await?;

let request = QueryRequest::builder()
    .collection_name("products")
    .filter("embedding IS NULL")
    .output_fields(["id"])
    .limit(10)
    .build()?;
let response = client.query(request).await?;
for row in response.results().rows()? {
    println!("{:?}", row.get_i64("id")?);
}
```

```cpp
#include <iostream>
#include <string>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::QueryRequest()
                   .WithCollectionName("products")
                   .WithFilter("embedding IS NULL")
                   .AddOutputField("id")
                   .WithLimit(10);

milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const results = await client.query({
  collection_name: "products",
  filter: "embedding IS NULL",
  output_fields: ["id"],
  limit: 10,
});
console.log(results);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

QueryResp results = await client.QueryAsync(new QueryReq
{
    CollectionName = "products",
    Expression = "embedding IS NULL",
    Parameters = new QueryParameters
    {
        OutputFields = { "id" },
        Limit = 10
    }
});

for (int i = 0; i < results.RowCount; i++)
{
    Console.WriteLine(results.GetRow(i)["id"]);
}
// Output
// 3
```

```bash
curl -X 'POST' \
  'http://localhost:19530/v2/vectordb/entities/query' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer root:Milvus' \
  -H 'Content-Type: application/json' \
  -d '{
    "collectionName": "products",
    "filter": "embedding IS NULL",
    "outputFields": ["id"],
    "limit": 10
  }'
```

Replace the `filter` in the same query to check either field or combine conditions:

| Filter expression | Matching IDs | Purpose |
| --- | --- | --- |
| `category IS NULL` | `2` | Find entities without a category |
| `category IS NOT NULL` | `1`, `3` | Find entities with a category |
| `embedding IS NULL` | `3` | Find entities without an embedding |
| `embedding IS NOT NULL` | `1`, `2` | Find entities with an embedding |
| `category IS NOT NULL AND embedding IS NOT NULL` | `1` | Find entities with both values |

<a id="Regular-scalar-fields-with-null-values"></a>
<a id="JSON-fields-with-null-values"></a>
<a id="ARRAY-fields-with-null-values"></a>

### How field values are treated

The operators check the stored field value. For a nullable field without a default value, omitting the field during insertion or explicitly setting it to NULL stores NULL. A configured default value can change what is stored. For details, see [Nullable Fields](nullable-and-default.md) and [Default Values](default-values.md).

| Field type | NULL behavior |
| --- | --- |
| `VARCHAR` | An empty string `""` is a non-NULL value. |
| `JSON` | A NULL value for the entire field matches `IS NULL`. A JSON object such as `{"category": null}` is non-NULL, even though a value inside it is NULL. |
| `ARRAY` | A NULL value for the entire field matches `IS NULL`. Individual elements cannot be NULL, and `IS NULL` / `IS NOT NULL` do not support array element access such as `tags[0]`. See [Array Field](array_data_type.md). |
| Ordinary vector types | NULL means the vector value is absent. A vector whose components are zero is not NULL. |

For a supported field defined with `nullable=False`, `IS NULL` matches no entities and `IS NOT NULL` matches all visible entities. Other conditions in the filter still apply.

### Use NULL filters in vector search

The same operators can be used in search filters, but an entity also needs a vector in the field being searched to participate in similarity search.

Using the example data above, consider a search with `anns_field="embedding"`:

| Filter expression | Entities eligible for similarity search | Reason |
| --- | --- | --- |
| `category IS NULL` | `2` | Entity `2` has no category, but has an `embedding` vector. |
| `embedding IS NULL` | None | Entity `3` matches the filter, but has no `embedding` vector to compare with the query vector. |
| `embedding IS NOT NULL` | `1`, `2` | Both entities have an `embedding` vector. |

All three filters are valid. A search on `embedding` with `embedding IS NULL` returns no hits because no entity can satisfy both requirements. To retrieve the entities with missing embeddings, use `query()` as shown above.

Vector search already skips entities whose searched vector field is NULL, so `embedding IS NOT NULL` does not further narrow the candidates for a search on `embedding`. Ranking, other filters, and the search limit still determine which candidates are returned.

## Tips on using basic operators with JSON and ARRAY fields

While the basic operators in Milvus are versatile and can be applied to scalar fields, they can also be effectively used with the keys and indexes in the JSON and ARRAY fields.

For example, if you have a `product` field that contains multiple keys like `price`, `model`, and `tags`, always reference the key directly:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'product["price"] > 1000'
```

```java
String filter = "product[\"price\"] > 1000";
```

```go
filter := "product[\"price\"] > 1000"
```

```rust
let filter = "product[\"price\"] > 1000";
```

```cpp
std::string filter = "product[\"price\"] > 1000";
```

```javascript
const filter = 'product["price"] > 1000';
```

```csharp
string filter = "product[\"price\"] > 1000";
```

```bash
filter='product["price"] > 1000'
```

To find records where the first temperature in an array of recorded temperatures exceeds a certain value, use:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = 'history_temperatures[0] > 30'
```

```java
String filter = "history_temperatures[0] > 30";
```

```go
filter := "history_temperatures[0] > 30"
```

```rust
let filter = "history_temperatures[0] > 30";
```

```cpp
std::string filter = "history_temperatures[0] > 30";
```

```javascript
const filter = 'history_temperatures[0] > 30';
```

```csharp
string filter = "history_temperatures[0] > 30";
```

```bash
filter='history_temperatures[0] > 30'
```

## Conclusion

Milvus offers a range of basic operators that give you flexibility in filtering and querying your data. By combining comparison, range, arithmetic, and logical operators, you can create powerful filter expressions to narrow down your search results and retrieve the data you need efficiently.

## FAQ

**Is there a limit to the length of the match value list in filter conditions (e.g., filter='color in ["red", "green", "blue"]')? What should I do if the list is too long?**

Milvus does not impose a length limit on the match value list in filter conditions. However, an excessively long list can significantly impact query performance.
If your filter condition includes a long list of match values or a complex expression with many elements, we recommend using [Filter Templating](filtering-templating.md) to improve query performance.
