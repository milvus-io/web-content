---
id: primary-key-search.md
title: "Primary-Key Search"
summary: "When conducting similarity searches, you are always asked to provide one or more query vectors, even if the query vectors are already present in the target collection. To avoid retrieving vectors before the search, you can use primary keys instead."
beta: Milvus 2.6.9+
---

# Primary-Key Search

When conducting similarity searches, you are always asked to provide one or more query vectors, even if the query vectors are already present in the target collection. To avoid retrieving vectors before the search, you can use primary keys instead.

## Overview

On e-commerce platforms, users can enter a keyword to retrieve products that match it. Once the user views a product detail page, the platform will also display a list of similar products at the bottom of the page for users who want to compare them.

The recommendations are sorted by their similarity to the keyword or the current product. To achieve this, platform developers need to retrieve the vector representation of the keyword or the current product from Milvus before the actual similarity search, which increases the round-trip between the platform and Milvus and results in a large number of high-dimensional floats being transmitted across the network.

To simplify the interaction logic between your applications and Milvus, reduce the number of round-trips, and avoid transmitting large amounts of high-dimensional floating-point values across the network, consider using primary key searches.

In a primary key search, you do not need to provide any query vectors. Instead, you are asked to provide the primary keys (`ids`) of the entities that contain the query vectors. 

## Limits & restrictions

- Searches using primary keys apply to all vector data types, except sparse vector fields derived from VarChar fields, as in BM25 functions.

- You can use primary keys instead of query vectors in filtered, range, and grouping searches, optionally with pagination enabled. However, this feature does not apply to hybrid searches and search iterators.

- For similarity searches involving embedding lists, you still need to retrieve the query vectors, arrange them into embedding lists, and run the searches.

- You cannot use primary keys instead of query vectors in RESTful APIs.

- For any nonexistent primary keys or those in an incorrect format, Milvus will prompt errors.

- Primary keys and query vectors are mutually exclusive. Providing both also results in errors.

## Examples

The following examples assume that all provided Int64 IDs are available in the target collection.

<div class="alert note">

The primary keys are not used for filtering; they are used only for vector retrieval.

</div>

### Example 1: Basic primary-key search

To conduct a basic primary-key search, simply replace the query vectors with primary keys.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

res = client.search(
    collection_name="quick_setup",
    anns_field="vector",
    # highlight-start
    ids=[551, 296, 43], # a list of primary keys
    # highlight-end
    limit=3,
    search_params={"metric_type": "IP"}
)

for hits in res:
    for hit in hits:
        print(hit)
```

```java
// java
```

```javascript
// node.js
```

```go
// go
```

```bash
# restful
```

### Example 2: Filtered search using primary keys

The following example assumes that color and likes are two schema-defined fields in the target collection. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43], #
    filter='color like "red%" and likes > 50',
    output_fields=["color", "likes"],
    # highlight-end
    limit=3,
)
```

```java
// java
```

```javascript
// node.js
```

```go
// go
```

```bash
# restful
```

### Example 3: Range search using primary keys

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43],
    # highlight-end
    limit=3,
    search_params={
        # highlight-start
        "params": {
            "radius": 0.4,
            "range_filter": 0.6
        }
        # highlight-end
    }
)
```

```java
// java
```

```javascript
// node.js
```

```go
// go
```

```bash
# restful
```

### Example 4: Grouping search using primary keys

The following example assumes `docId` is a schema-defined fields in the target collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43],
    # highlight-end
    limit=3,
    group_by_field="docId",
    output_fields=["docId"]
)
```

```java
// java
```

```javascript
// node.js
```

```go
// go
```

```bash
# restful
```

