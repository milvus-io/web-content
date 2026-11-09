---
id: array-operators.md
title: "ARRAY Operators"
summary: "Milvus provides ARRAY operators for filtering ARRAY fields and partially updating ARRAY field values."
---

# ARRAY Operators

Milvus provides ARRAY operators for filtering ARRAY fields and partially updating ARRAY field values.

<div class="alert note">

All elements within an array must be the same type, and nested structures within arrays are treated as plain strings. Therefore, when working with ARRAY fields, it is advisable to avoid excessively deep nesting and ensure that your data structures are as flat as possible for optimal performance.

</div>

ARRAY operators in Milvus cover two usage scenarios:

- Filter expressions for query and search.

- Partial updates in `upsert` requests.

## Available ARRAY operators

The following table lists ARRAY operators available in Milvus.

| Operator | Use in | Description |
| --- | --- | --- |
| [ARRAY_CONTAINS(identifier, expr)](#ARRAYCONTAINS) | Filter expression | Checks whether a specific element exists in an ARRAY field. |
| [ARRAY_CONTAINS_ALL(identifier, expr)](#ARRAYCONTAINSALL) | Filter expression | Checks whether all elements in a specified list exist in an ARRAY field. |
| [ARRAY_CONTAINS_ANY(identifier, expr)](#ARRAYCONTAINSANY) | Filter expression | Checks whether any element in a specified list exists in an ARRAY field. |
| [ARRAY_LENGTH(identifier)](#ARRAYLENGTH) | Filter expression | Returns the number of elements in an ARRAY field and can be combined with comparison operators for filtering. |
| [ARRAY_APPEND](#ARRAYAPPEND) | `upsert` with `field_ops` | Appends payload elements to an existing ARRAY field. Available in Milvus v2.6.17 and later. |
| [ARRAY_REMOVE](#ARRAYREMOVE) | `upsert` with `field_ops` | Removes every element from an existing ARRAY field that matches a value in the request payload. Available in Milvus v2.6.17 and later. |

## ARRAY_CONTAINS

The `ARRAY_CONTAINS` operator checks if a specific element exists in an array field. It’s useful when you want to find entities where a given element is present in the array.

**Example**

Suppose you have an array field `history_temperatures`, which contains the recorded lowest temperatures for different years. To find all entities where the array contains the value `23`, you can use the following filter expression:

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
filter = 'ARRAY_CONTAINS(history_temperatures, 23)'
```

```java
String filter = "ARRAY_CONTAINS(history_temperatures, 23)";
```

```go
filter := "ARRAY_CONTAINS(history_temperatures, 23)"
```

```rust
let filter = "ARRAY_CONTAINS(history_temperatures, 23)";
```

```cpp
std::string filter = "ARRAY_CONTAINS(history_temperatures, 23)";
```

```javascript
const filter = 'ARRAY_CONTAINS(history_temperatures, 23)';
```

```csharp
// ARRAY_CONTAINS filter
var filter = "ARRAY_CONTAINS(history_temperatures, 23)";
```

```bash
filter='ARRAY_CONTAINS(history_temperatures, 23)'
```

This will return all entities where the `history_temperatures` array contains the value `23`.

## ARRAY_CONTAINS_ALL

The `ARRAY_CONTAINS_ALL` operator ensures that all elements of the specified list are present in the array field. This operator is useful when you want to match entities that contain multiple values in the array.

**Example**

If you want to find all entities where the `history_temperatures` array contains both `23` and `24`, you can use:

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
filter = 'ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])'
```

```java
String filter = "ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])";
```

```go
filter := "ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])"
```

```rust
let filter = "ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])";
```

```cpp
std::string filter = "ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])";
```

```javascript
const filter = 'ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])';
```

```csharp
// ARRAY_CONTAINS_ALL filter
var filter = "ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])";
```

```bash
filter='ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])'
```

This will return all entities where the `history_temperatures` array contains both of the specified values.

## ARRAY_CONTAINS_ANY

The `ARRAY_CONTAINS_ANY` operator checks if any of the elements from the specified list are present in the array field. This is useful when you want to match entities that contain at least one of the specified values in the array.

**Example**

To find all entities where the `history_temperatures` array contains either `23` or `24`, you can use:

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
filter = 'ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])'
```

```java
String filter = "ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])";
```

```go
filter := "ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])"
```

```rust
let filter = "ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])";
```

```cpp
std::string filter = "ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])";
```

```javascript
const filter = 'ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])';
```

```csharp
// ARRAY_CONTAINS_ANY filter
var filter = "ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])";
```

```bash
filter='ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])'
```

This will return all entities where the `history_temperatures` array contains at least one of the values `23` or `24`.

## ARRAY_LENGTH

The `ARRAY_LENGTH` returns the length (number of elements) of an array field. It accepts exactly one parameter: the array field identifier.

**Example**

To find all entities where the `history_temperatures` array has fewer than 10 elements:

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
filter = 'ARRAY_LENGTH(history_temperatures) < 10'
```

```java
String filter = "ARRAY_LENGTH(history_temperatures) < 10";
```

```go
filter := "ARRAY_LENGTH(history_temperatures) < 10"
```

```rust
let filter = "ARRAY_LENGTH(history_temperatures) < 10";
```

```cpp
std::string filter = "ARRAY_LENGTH(history_temperatures) < 10";
```

```javascript
const filter = 'ARRAY_LENGTH(history_temperatures) < 10';
```

```csharp
// ARRAY_LENGTH filter
var filter = "ARRAY_LENGTH(history_temperatures) < 10";
```

```bash
filter='ARRAY_LENGTH(history_temperatures) < 10'
```

This will return all entities where the `history_temperatures` array has fewer than 10 elements.

## ARRAY_APPEND | Milvus 2.6.17+

The `ARRAY_APPEND` operator appends payload elements to an existing ARRAY field during an `upsert` request. It is not a filter expression. Use it when you want to add values to an array without first querying the current array value.

The following example appends `"premium"` to the `tags` ARRAY field of the entity whose primary key is `1`:

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
from pymilvus import FieldOp

client.upsert(
    collection_name="users",
    data=[{"pk": 1, "tags": ["premium"]}],
    field_ops={"tags": FieldOp.array_append()},
)
```

```java
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;
import java.util.*;

JsonObject row = new JsonObject();
row.addProperty("pk", 1);
JsonArray tags = new JsonArray();
tags.add("premium");
row.add("tags", tags);

List<UpsertReq.FieldPartialUpdateOp> fieldOps = new ArrayList<>();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build());

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("users")
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/column"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("users").
    WithInt64Column("pk", []int64{1}).
    WithColumns(column.NewColumnVarCharArray("tags", [][]string{{"premium"}})).
    WithArrayAppend("tags"))
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let res = client
    .upsert(
        UpsertRequest::builder()
            .insert(
                InsertRequest::builder()
                    .collection_name("users")
                    .row(json!({"pk": 1, "tags": ["premium"]}))
                    .build()?,
            )
            .add_field_op(
                FieldPartialUpdateOp::new()
                    .field_name("tags")
                    .op_type(FieldPartialUpdateOpType::ArrayAppend),
            )
            .build()?,
    )
    .await?;
```

```cpp
auto upsertRequest = milvus::UpsertRequest()
                         .WithCollectionName("users")
                         .AddRowData({{"pk", 1}, {"tags", nlohmann::json::array({"premium"})}})
                         .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND));

milvus::UpsertResponse upsertResponse;
client->Upsert(upsertRequest, upsertResponse);
```

```javascript
const res = await client.upsert({
    collection_name: "users",
    data: [{ pk: 1, tags: ["premium"] }],
    field_ops: [{ field_name: "tags", op: "ARRAY_APPEND" }]
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Types;

await client.UpsertAsync(new UpsertReq
{
    CollectionName = "users",
    RowsData = new[]
    {
        new Dictionary<string, object?>
        {
            ["pk"] = 1L,
            ["tags"] = new[] { "premium" }
        }
    },
    FieldOps = new[]
    {
        new FieldPartialUpdateOp("tags", FieldPartialUpdateOpType.ArrayAppend)
    }
});
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
      "collectionName": "users",
      "data": [{"pk": 1, "tags": ["premium"]}],
      "fieldOps": [{"fieldName": "tags", "op": "array_append"}]
  }'
```

Attaching `ARRAY_APPEND` to a field through `field_ops` enables partial-update semantics for that field. For the full workflow, supported element types, and limits, refer to [Upsert ARRAY fields in merge mode](upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617).

## ARRAY_REMOVE | Milvus 2.6.17+

The `ARRAY_REMOVE` operator removes every element from an existing ARRAY field that matches a value in the request payload during an `upsert` request. It is not a filter expression. Use it when you want to remove matching values from an array without first querying the current array value.

The following example removes `"trial"` from the `tags` ARRAY field of the entity whose primary key is `1`:

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
from pymilvus import FieldOp

client.upsert(
    collection_name="users",
    data=[{"pk": 1, "tags": ["trial"]}],
    field_ops={"tags": FieldOp.array_remove()},
)
```

```java
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;
import java.util.*;

JsonObject row = new JsonObject();
row.addProperty("pk", 1);
JsonArray tags = new JsonArray();
tags.add("trial");
row.add("tags", tags);

List<UpsertReq.FieldPartialUpdateOp> fieldOps = new ArrayList<>();
fieldOps.add(UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build());

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("users")
        .data(Collections.singletonList(row))
        .fieldOps(fieldOps)
        .build();

client.upsert(upsertReq);
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/column"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("users").
    WithInt64Column("pk", []int64{1}).
    WithColumns(column.NewColumnVarCharArray("tags", [][]string{{"trial"}})).
    WithArrayRemove("tags"))
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let res = client
    .upsert(
        UpsertRequest::builder()
            .insert(
                InsertRequest::builder()
                    .collection_name("users")
                    .row(json!({"pk": 1, "tags": ["trial"]}))
                    .build()?,
            )
            .add_field_op(
                FieldPartialUpdateOp::new()
                    .field_name("tags")
                    .op_type(FieldPartialUpdateOpType::ArrayRemove),
            )
            .build()?,
    )
    .await?;
```

```cpp
auto upsertRequest = milvus::UpsertRequest()
                         .WithCollectionName("users")
                         .AddRowData({{"pk", 1}, {"tags", nlohmann::json::array({"trial"})}})
                         .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE));

milvus::UpsertResponse upsertResponse;
client->Upsert(upsertRequest, upsertResponse);
```

```javascript
const res = await client.upsert({
    collection_name: "users",
    data: [{ pk: 1, tags: ["trial"] }],
    field_ops: [{ field_name: "tags", op: "ARRAY_REMOVE" }]
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Types;

await client.UpsertAsync(new UpsertReq
{
    CollectionName = "users",
    RowsData = new[]
    {
        new Dictionary<string, object?>
        {
            ["pk"] = 1L,
            ["tags"] = new[] { "trial" }
        }
    },
    FieldOps = new[]
    {
        new FieldPartialUpdateOp("tags", FieldPartialUpdateOpType.ArrayRemove)
    }
});
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
      "collectionName": "users",
      "data": [{"pk": 1, "tags": ["trial"]}],
      "fieldOps": [{"fieldName": "tags", "op": "array_remove"}]
  }'
```

Attaching `ARRAY_REMOVE` to a field through `field_ops` enables partial-update semantics for that field. For the full workflow, supported element types, and limits, refer to [Upsert ARRAY fields in merge mode](upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode--Milvus-2617).
