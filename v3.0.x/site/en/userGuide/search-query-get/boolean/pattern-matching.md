---
id: pattern-matching.md
title: "Pattern Matching"
summary: "Match string values with LIKE wildcard patterns or RE2 regular expressions in scalar filters."
---

# Pattern Matching

Use `LIKE` for wildcard matching and `=~` or `!~` for [RE2](https://github.com/google/re2/wiki/syntax) regular expressions. These scalar filters match string structures such as error codes, prefixes, email domains, or URL paths in `query`, `search`, and hybrid search.

<div class="alert note">

These filters match string values. They do not change analyzer tokens or enable token-based `TEXT_MATCH` and `PHRASE_MATCH`. See [Regex Analyzer Filter](regex-filter.md) and [Text Match](keyword-match.md) for those mechanisms.

</div>

Pattern matching expressions are written in the `filter` parameter. For example, the following query matches log messages that contain an error code such as `E1001`:

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

res = client.query(
    collection_name="log_events",
    # highlight-next-line
    filter='message =~ "E[0-9]{4}"',
    output_fields=["message", "severity"],
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

QueryResp res = client.query(QueryReq.builder()
        .collectionName("log_events")
        // highlight-next-line
        .filter("message =~ \"E[0-9]{4}\"")
        .outputFields(Arrays.asList("message", "severity"))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
})
if err != nil {
    // handle error
}
defer client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption("log_events").
    // highlight-next-line
    WithFilter(`message =~ "E[0-9]{4}"`).
    WithOutputFields("message", "severity"))
if err != nil {
    // handle error
}
fmt.Println(res)
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530");
let client = ClientV2::new(&config).await?;

let res = client.query(
    QueryRequest::builder()
        .collection_name("log_events")
        // highlight-next-line
        .filter(r#"message =~ "E[0-9]{4}""#)
        .output_fields(["message", "severity"])
        .build()?,
).await?;

for row in res.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::QueryRequest()
                   .WithCollectionName("log_events")
                   .WithFilter(R"(message =~ "E[0-9]{4}")")
                   .AddOutputField("message")
                   .AddOutputField("severity");

milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const { MilvusClient } = require('@zilliz/milvus2-sdk-node');

async function main() {
  const client = new MilvusClient({ address: 'http://localhost:19530' });

  const res = await client.query({
    collection_name: 'log_events',
    // highlight-next-line
    filter: 'message =~ "E[0-9]{4}"',
    output_fields: ['message', 'severity'],
  });
  console.log(res);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

QueryResp res = await client.QueryAsync(new QueryReq
{
    CollectionName = "log_events",
    Expression = "message =~ \"E[0-9]{4}\"",
    Parameters = new QueryParameters
    {
        OutputFields = { "message", "severity" }
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "log_events",
    "filter": "message =~ \"E[0-9]{4}\"",
    "outputFields": ["message", "severity"]
  }'
```

The remaining examples show the expression assigned to `filter`.

<div class="alert note">

The left operand can be a collection field, such as `message`, or a StructArray subfield at a specific element index, such as `struct[0][subfield] =~ "E[0-9]{4}"`. See [StructArray Operators](struct-array-operators.md).

</div>

## Supported field types

Pattern matching is available for string values.

| Target | `LIKE` | Regex `=~` / `!~` | Notes |
| --- | --- | --- | --- |
| `VARCHAR` field | Yes | Yes | Typical target for pattern matching on string fields. |
| `JSON` path with a string value | Yes | Yes | Positive matches require string values. For index path/cast settings, see [JSON Indexing](json-indexing.md#Understand-cast-types). |
| `ARRAY<VARCHAR>` element | Yes | Yes | Match a specific element by index, such as `tags[0]`. Pattern matching does **not** scan all elements; it only applies to the element at the specified index. |
| Numeric, Boolean, vector, `TEXT`, or other non-string targets | No | No | Patterns require string values. |

## Choose LIKE or regex

Use `==` for exact string equality; otherwise, choose an operator from the following table:

| Requirement | Recommended operator | Example | Description |
| --- | --- | --- | --- |
| Exact string equality | `==` | `status == "active"` | Exact match of the string `active`. |
| Simple prefix match | `LIKE` | `name LIKE "Prod%"` | Matches strings that start with `Prod`. |
| Simple suffix match | `LIKE` | `filename LIKE "%.json"` | Matches strings that end with `.json`. |
| Simple contains match | `LIKE` | `description LIKE "%vector database%"` | Matches values that contain `vector database` anywhere in the string. |
| Match a structured code or fixed-length pattern | `=~` | `code =~ "E[0-9]{4}"` | Matches strings that case-sensitively contain `E` followed by four digits, such as `E1001`. |
| Case-insensitive pattern matching | `=~` with `(?i)` | `message =~ "(?i)error"` | Matches `error`, `ERROR`, or other case variants. |
| Exclude values that match a regex pattern | `!~` | `message !~ "^DEBUG"` | Excludes strings that start with `DEBUG`. |

## Use LIKE

The `LIKE` operator is for simple wildcard matching on string values. It supports only the following wildcards:

| Wildcard | Description |
| --- | --- |
| `%` | Matches zero or more characters. |
| `_` | Matches exactly one character. |

### Common LIKE patterns

Use the position of `%` and `_` to control where the fixed text appears in the matched string.

| Requirement | Pattern | Filter example |
| --- | --- | --- |
| Starts with a prefix | `Prod%` | `filter = 'name LIKE "Prod%"'` |
| Ends with a suffix | `%.json` | `filter = 'filename LIKE "%.json"'` |
| Contains a substring | `%vector%` | `filter = 'description LIKE "%vector%"'` |
| Matches one character at a fixed position | `AB_%` | `filter = 'code LIKE "AB_%"'` |

### LIKE matching behavior

Use `LIKE` for prefix, suffix, contains, and fixed-position single-character matches. `LIKE` does not support character classes such as `[0-9]`, alternation such as `error|failed`, repeat counts such as `{4}`, anchors such as `^` or `$`, or case-insensitive flags such as `(?i)`. Use regex for those patterns.

### Escaping wildcards in a LIKE pattern

To match `%`, `_`, or `\` literally, escape the character with a backslash (`\`):

- `name LIKE r"\%"` matches the literal value `%`.
- `name LIKE r"\_%"` matches values that start with a literal `_`.
- `name LIKE r"\\%"` matches values that start with a literal backslash.

Raw string literals, written as `r"..."` or `r'...'`, keep backslashes verbatim in Milvus filter expressions. They are recommended for `LIKE` and regex patterns that contain backslashes. Without a raw string, ordinary string literals still process escape sequences before the pattern is evaluated, so more backslashes may be required.

## Use regex | Milvus 3.0.x

Regex supports character classes, repetition, alternation, anchors, and case-insensitive matching. The right operand of `=~` or `!~` must be a string literal:

| Operator | Meaning | Example |
| --- | --- | --- |
| `=~` | Matches values that satisfy the regex pattern. | `filter = 'message =~ "E[0-9]{4}"'` |
| `!~` | Excludes values that satisfy the regex pattern. | `filter = 'message !~ "^DEBUG"'` |

### Using raw string literals

Use raw string literals (`r"..."` or `r'...'`) to pass backslashes verbatim to RE2, avoiding the extra escaping in ordinary filter strings:

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
filter = r'filename =~ r"\.json$"'
```

```java
String filter = "filename =~ r\"\\.json$\"";
```

```go
filter := `filename =~ r"\.json$"`
```

```rust
let filter = r#"filename =~ r"\.json$""#;
```

```cpp
std::string filter = R"(filename =~ r"\.json$")";
```

```javascript
const filter = 'filename =~ r"\\.json$"';
```

```csharp
string filter = "filename =~ r\"\\.json$\"";
```

```bash
filter='filename =~ r"\.json$"'
```

This matches strings that end with `.json`, such as `report.json`.

Without a raw string in the Milvus filter expression, ordinary string literals process escape sequences before the regex pattern is evaluated. Escaped literal characters may therefore require additional backslashes in the host-language string.

### Common regex patterns

The following examples use common RE2 syntax in Milvus filter expressions. For complete regex syntax, refer to the [RE2 syntax](https://github.com/google/re2/wiki/syntax) reference.

| Requirement | Pattern | Filter example |
| --- | --- | --- |
| Contains literal text | `error` | `filter = 'message =~ "error"'` |
| Starts with a prefix | `^ERR` | `filter = 'code =~ "^ERR"'` |
| Ends with a suffix | `\.json$` | `filter = 'filename =~ "\\.json$"'` |
| Matches a digit sequence | `[0-9]+` | `filter = 'message =~ "[0-9]+"'` |
| Matches a fixed number of digits | `[0-9]{4}` | `filter = 'code =~ "[0-9]{4}"'` |
| Matches an email domain | `@example\.com$` | `filter = 'email =~ "@example\\.com$"'` |
| Matches case-insensitively | `(?i)error` | `filter = 'message =~ "(?i)error"'` |
| Matches the full string | `^prod-[0-9]+$` | `filter = 'name =~ "^prod-[0-9]+$"'` |

To match one of several words, use alternation with `|`:

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
filter = 'message =~ "error|failed|timeout"'
```

```java
String filter = "message =~ \"error|failed|timeout\"";
```

```go
filter := `message =~ "error|failed|timeout"`
```

```rust
let filter = r#"message =~ "error|failed|timeout""#;
```

```cpp
std::string filter = R"(message =~ "error|failed|timeout")";
```

```javascript
const filter = 'message =~ "error|failed|timeout"';
```

```csharp
string filter = "message =~ \"error|failed|timeout\"";
```

```bash
filter='message =~ "error|failed|timeout"'
```

When matching regex metacharacters literally, escape them in the regex pattern. For example, to match a literal dot (`\.` in regex), write `\\.` in a Python, Java, Go, or Node.js source string:

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
filter = 'email =~ "@gmail\\.com$"'
```

```java
String filter = "email =~ \"@gmail\\.com$\"";
```

```go
filter := `email =~ "@gmail\\.com$"`
```

```rust
let filter = r#"email =~ "@gmail\.com$""#;
```

```cpp
std::string filter = R"(email =~ "@gmail\\.com$")";
```

```javascript
const filter = 'email =~ "@gmail\\.com$"';
```

```csharp
string filter = "email =~ \"@gmail\\.com$\"";
```

```bash
filter='email =~ "@gmail\\.com$"'
```

<div class="alert note">

Milvus rejects invalid regex patterns and syntax that [RE2](https://github.com/google/re2/wiki/syntax) does not support.

</div>

### Matching behavior

**Substring matching**

Milvus regex matching uses substring semantics. The pattern does not need to match the entire field value. For example, the following filter matches both `E1001` and `failed with E1001 after retry`:

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
filter = 'message =~ "E[0-9]{4}"'
```

```java
String filter = "message =~ \"E[0-9]{4}\"";
```

```go
filter := `message =~ "E[0-9]{4}"`
```

```rust
let filter = r#"message =~ "E[0-9]{4}""#;
```

```cpp
std::string filter = R"(message =~ "E[0-9]{4}")";
```

```javascript
const filter = 'message =~ "E[0-9]{4}"';
```

```csharp
string filter = "message =~ \"E[0-9]{4}\"";
```

```bash
filter='message =~ "E[0-9]{4}"'
```

To match the entire field value, use the `^` and `$` anchors:

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
# Match only values that are exactly E followed by four digits
filter = 'code =~ "^E[0-9]{4}$"'
```

```java
// Match only values that are exactly E followed by four digits
String filter = "code =~ \"^E[0-9]{4}$\"";
```

```go
// Match only values that are exactly E followed by four digits
filter := `code =~ "^E[0-9]{4}$"`
```

```rust
// Match only values that are exactly E followed by four digits
let filter = r#"code =~ "^E[0-9]{4}$""#;
```

```cpp
std::string filter = R"(code =~ "^E[0-9]{4}$")";
```

```javascript
// Match only values that are exactly E followed by four digits
const filter = 'code =~ "^E[0-9]{4}$"';
```

```csharp
// Match only values that are exactly E followed by four digits
string filter = "code =~ \"^E[0-9]{4}$\"";
```

```bash
# Match only values that are exactly E followed by four digits
filter='code =~ "^E[0-9]{4}$"'
```

**Nullable VARCHAR fields**

Regex filters do not match null values. This applies to both `=~` and `!~`. If you want to exclude a regex pattern but keep null values, explicitly add `OR field IS NULL`:

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
filter = 'message !~ "^DEBUG" OR message IS NULL'
```

```java
String filter = "message !~ \"^DEBUG\" OR message IS NULL";
```

```go
filter := `message !~ "^DEBUG" OR message IS NULL`
```

```rust
let filter = r#"message !~ "^DEBUG" OR message IS NULL"#;
```

```cpp
std::string filter = R"(message !~ "^DEBUG" OR message IS NULL)";
```

```javascript
const filter = 'message !~ "^DEBUG" OR message IS NULL';
```

```csharp
string filter = "message !~ \"^DEBUG\" OR message IS NULL";
```

```bash
filter='message !~ "^DEBUG" OR message IS NULL'
```

**JSON paths**

For JSON paths, regex filters behave differently when the path is missing, null, or resolves to a non-string value:

| Filter | Includes missing/null/non-string values? | Notes |
| --- | --- | --- |
| `json_field["path"] =~ "pattern"` | No | Matches only string values that satisfy the regex pattern. |
| `json_field["path"] !~ "pattern"` | Yes | Returns entities where the path is missing, null, non-string, or a string that does not match the regex pattern. |

## Accelerate pattern matching with indexes

Pattern matching works without a scalar index. For acceleration options and their eligibility conditions, see [String-pattern index selection](scalar_index.md#String-pattern-indexes). For JSON path indexes, check the [JSON-specific prerequisites](json-indexing.md#Index-requirements).

<div class="alert note">

Query planning can simplify a LIKE expression without wildcards to equality, or a simple anchored regex to equality, prefix, or suffix matching. For example, `name =~ "^abc$"` becomes an equality test and follows equality lookup support. Check index support for the operation after this simplification, not only for the operator written in the original expression.

</div>
