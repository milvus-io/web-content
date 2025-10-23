---
id: geometry-field.md
title: "Geometry Field"
summary: "When building applications like Geographic Information Systems (GIS), mapping tools, or location-based services, you often need to store and query geometric data. The GEOMETRY data type in Milvus solves this challenge by providing a native way to store and query flexible geometric data."
beta: Milvus 2.6.4+
---

# Geometry Field

When building applications like Geographic Information Systems (GIS), mapping tools, or location-based services, you often need to store and query geometric data. The `GEOMETRY` data type in Milvus solves this challenge by providing a native way to store and query flexible geometric data.

Use a GEOMETRY field when you need to combine vector similarity with spatial constraints, for example:

- Location-Base Service (LBS): "find similar POIs **within** this city block"

- Multi‑modal search: "retrieve similar photos **within 1km** of this point"

- Maps & logistics: "assets **inside** a region" or "routes **intersecting** a path"

<div class="alert note">

The GEOMETRY field requires PyMilvus 2.7.0rc46 or later. This version is currently only available by building from source. For instructions, see [How to build PyMilvus from source](https://github.com/milvus-io/pymilvus#faq).

</div>

## What is a GEOMETRY field?

A GEOMETRY field is a schema-defined data type (`DataType.GEOMETRY`) in Milvus that stores geometric data. When working with geometry fields, you interact with the data using the [Well-Known Text (WKT)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) format, a human-readable representation used for both inserting data and querying. Internally, Milvus converts WKT to [Well-Known Binary (WKB)](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary) for efficient storage and processing, but you do not need to handle WKB directly.

The `GEOMETRY` data type supports the following geometric objects:

- **POINT**: `POINT (x y)`; for example, `POINT (13.403683 52.520711)` where `x` = longitude and `y` = latitude

- **LINESTRING**: `LINESTRING (x1 y1, x2 y2, …)`; for example, `LINESTRING (13.40 52.52, 13.41 52.51)`

- **POLYGON**: `POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))`; for example, `POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))`

- **MULTIPOINT**: `MULTIPOINT ((x1 y1), (x2 y2), …)`, for example, `MULTIPOINT ((10 40), (40 30), (20 20), (30 10))`

- **MULTILINESTRING**: `MULTILINESTRING ((x1 y1, …), (xk yk, …))`, for example, `MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))`

- **MULTIPOLYGON**: `MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))`, for example, `MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))`

- **GEOMETRYCOLLECTION**: `GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)`, for example, `GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))`

## Basic operations

The workflow for using a `GEOMETRY` field involves defining it in your collection schema, inserting geometric data, and then querying the data using specific filter expressions.

### Step 1: Define a GEOMETRY field

To use a `GEOMETRY` field, explicitly define it in your collection schema when creating the collection. The following example demonstrates how to create a collection with a `geo` field of type `DataType.GEOMETRY`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType
import numpy as np

dim = 8
collection_name = "geo_collection"
milvus_client = MilvusClient("http://localhost:19530")

# Create schema with a GEOMETRY field
schema = milvus_client.create_schema(enable_dynamic_field=True)
schema.add_field("id", DataType.INT64, is_primary=True)
schema.add_field("embeddings", DataType.FLOAT_VECTOR, dim=dim)
# highlight-next-line
schema.add_field("geo", DataType.GEOMETRY, nullable=True)
schema.add_field("name", DataType.VARCHAR, max_length=128)

milvus_client.create_collection(collection_name, schema=schema, consistency_level="Strong")
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

<div class="alert note">

In this example, the `GEOMETRY` field defined in the collection schema allows null values with `nullable=True`. For details, refer to [Nullable & Default](nullable-and-default.md).

</div>

### Step 2: Insert data

Insert entities with geometry data in [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) format. Here’s an example with several geo points:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
rng = np.random.default_rng(seed=19530)
geo_points = [
    'POINT(13.399710 52.518010)',
    'POINT(13.403934 52.522877)',
    'POINT(13.405088 52.521124)',
    'POINT(13.408223 52.516876)',
    'POINT(13.400092 52.521507)',
    'POINT(13.408529 52.519274)',
]

rows = [
    {"id": 1, "name": "Shop A", "embeddings": rng.random((1, dim))[0], "geo": geo_points[0]},
    {"id": 2, "name": "Shop B", "embeddings": rng.random((1, dim))[0], "geo": geo_points[1]},
    {"id": 3, "name": "Shop C", "embeddings": rng.random((1, dim))[0], "geo": geo_points[2]},
    {"id": 4, "name": "Shop D", "embeddings": rng.random((1, dim))[0], "geo": geo_points[3]},
    {"id": 5, "name": "Shop E", "embeddings": rng.random((1, dim))[0], "geo": geo_points[4]},
    {"id": 6, "name": "Shop F", "embeddings": rng.random((1, dim))[0], "geo": geo_points[5]},
]

insert_result = milvus_client.insert(collection_name, rows)
print(insert_result)

# Expected output:
# {'insert_count': 6, 'ids': [1, 2, 3, 4, 5, 6]}
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

### Step 3: Filtering operations

Before you can perform filtering operations on `GEOMETRY` fields, make sure:

- You have created an index on each vector field.

- The collection is loaded into memory.

<details>

<summary>Show code</summary>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
index_params = milvus_client.prepare_index_params()
index_params.add_index(field_name="embeddings", metric_type="L2")

milvus_client.create_index(collection_name, index_params)
milvus_client.load_collection(collection_name)
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

</details>

Once these requirements are met, you can use expressions with dedicated geometry operators to filter your collection based on the geometric values.

#### Define filter expressions

To filter on the `GEOMETRY` field, use a geometry-specific operator with the following expression format: `"{operator}(geo_field,'{wkt}')"`, where:

- `{operator}` is a supported geometry operator (e.g., `ST_CONTAINS`, `ST_INTERSECTS`). For a full list of available operators, refer to [Geometry Operators](geometry-operators.md).

- `geo_field` is the name of the `GEOMETRY` field defined in your collection schema.

- `'{wkt}'` is the WKT string representing the geometry object you are filtering on.

<div class="alert note">

Some operators, such as `ST_DWITHIN`, may require additional parameters. For details and usage examples of each operator, refer to [Geometry Operators](geometry-operators.md).

</div>

The following examples demonstrate how to use different geometry-specific operators in a filter expression:

#### Example 1: Find entities within a rectangular area

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
top_left_lon, top_left_lat = 13.403683, 52.520711
bottom_right_lon, bottom_right_lat = 13.455868, 52.495862
bounding_box_wkt = f"POLYGON(({top_left_lon} {top_left_lat}, {bottom_right_lon} {top_left_lat}, {bottom_right_lon} {bottom_right_lat}, {top_left_lon} {bottom_right_lat}, {top_left_lon} {top_left_lat}))"

query_results = milvus_client.query(
    collection_name,
    # highlight-next-line
    filter=f"st_within(geo, '{bounding_box_wkt}')",
    output_fields=["name", "geo"]
)
for ret in query_results:
    print(ret)
    
# Expected output:
# {'name': 'Shop D', 'geo': 'POINT (13.408223 52.516876)', 'id': 4}
# {'name': 'Shop F', 'geo': 'POINT (13.408529 52.519274)', 'id': 6}
# {'name': 'Shop A', 'geo': 'POINT (13.39971 52.51801)', 'id': 1}
# {'name': 'Shop B', 'geo': 'POINT (13.403934 52.522877)', 'id': 2}
# {'name': 'Shop C', 'geo': 'POINT (13.405088 52.521124)', 'id': 3}
# {'name': 'Shop D', 'geo': 'POINT (13.408223 52.516876)', 'id': 4}
# {'name': 'Shop E', 'geo': 'POINT (13.400092 52.521507)', 'id': 5}
# {'name': 'Shop F', 'geo': 'POINT (13.408529 52.519274)', 'id': 6}
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

#### Example 2: Find entities within 1km of a central point

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
center_point_lon, center_point_lat = 13.403683, 52.520711
radius_meters = 1000.0
central_point_wkt = f"POINT({center_point_lon} {center_point_lat})"

query_results = milvus_client.query(
    collection_name,
    # highlight-next-line
    filter=f"st_dwithin(geo, '{central_point_wkt}', {radius_meters})",
    output_fields=["name", "geo"]
)
for ret in query_results:
    print(ret)
    
# Expected output:
# hit: {'id': 4, 'distance': 0.9823770523071289, 'entity': {'name': 'Shop D', 'geo': 'POINT (13.408223 52.516876)'}}
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

#### Example 3: Combine vector similarity with a spatial filter

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>

```python
vectors_to_search = rng.random((1, dim))
result = milvus_client.search(
    collection_name,
    vectors_to_search,
    limit=3,
    output_fields=["name", "geo"],
    # highlight-next-line
    filter=f"st_within(geo, '{bounding_box_wkt}')"
)
for hits in result:
    for hit in hits:
        print(f"hit: {hit}")
        
# Expected output:
# hit: {'id': 6, 'distance': 1.3406795263290405, 'entity': {'name': 'Shop F', 'geo': 'POINT (13.408529 52.519274)'}}
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```bash
# restful
```

## Next: Accelerate queries

By default, queries on `GEOMETRY` fields without an index will perform a full scan of all rows, which can be slow on large datasets. To accelerate geometric queries, create an `RTREE` index on your GEOMETRY field.

For details, refer to [RTREE](rtree.md).

## FAQ

### If I've enabled the dynamic field feature for my collection, can I insert geometric data into a dynamic field key?

No, geometry data cannot be inserted into a dynamic field. Before inserting geometric data, make sure the `GEOMETRY` field has been explicitly defined in your collection schema.

### Does the GEOMETRY field support the mmap feature?

Yes, the `GEOMETRY` field supports mmap. For more information, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

### Can I define the GEOMETRY field as nullable or set a default value?

Yes, the GEOMETRY field supports the `nullable` attribute and a default value in WKT format. For more information, refer to [Nullable & Default](nullable-and-default.md).