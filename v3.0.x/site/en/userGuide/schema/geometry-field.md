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

To use the GEOMETRY field, upgrade your SDK to the latest version.

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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;

private static final String COLLECTION_NAME = "geo_collection";
private static final Integer DIM = 128;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());
        
CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(true)
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("embeddings")
        .dataType(DataType.FloatVector)
        .dimension(DIM)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("geo")
        .dataType(DataType.Geometry)
        .isNullable(true)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("name")
        .dataType(DataType.VarChar)
        .maxLength(128)
        .build());
        
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);

```

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient('http://localhost:19530');
const schema = [
  { name: 'id', data_type: DataType.Int64, is_primary_key: true },
  { name: 'embeddings', data_type: DataType.FloatVector, dim: 8 },
  // highlight-next-line
  { name: 'geo', data_type: DataType.Geometry, is_nullable: true },
  { name: 'name', data_type: DataType.VarChar, max_length: 128 },
];

await milvusClient.createCollection({
  collection_name: 'geo_collection',
  fields: schema,
  consistency_level: 'Strong',
});
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
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;

List<String> geoPoints = Arrays.asList(
        "POINT(13.399710 52.518010)",
        "POINT(13.403934 52.522877)",
        "POINT(13.405088 52.521124)",
        "POINT(13.408223 52.516876)",
        "POINT(13.400092 52.521507)",
        "POINT(13.408529 52.519274)"
);
List<String> names = Arrays.asList("Shop A", "Shop B", "Shop C", "Shop D", "Shop E", "Shop F");
Random ran = new Random();
Gson gson = new Gson();
List<JsonObject> rows = new ArrayList<>();
for (int i = 0; i < geoPoints.size(); i++) {
    JsonObject row = new JsonObject();
    row.addProperty("id", i);
    row.addProperty("geo", geoPoints.get(i));
    row.addProperty("name", names.get(i));
    List<Float> vector = new ArrayList<>();
    for (int d = 0; d < DIM; ++d) {
        vector.add(ran.nextFloat());
    }
    row.add("embeddings", gson.toJsonTree(vector));
    rows.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(rows)
        .build());
```

```javascript
const geo_points = [
    'POINT(13.399710 52.518010)',
    'POINT(13.403934 52.522877)',
    'POINT(13.405088 52.521124)',
    'POINT(13.408223 52.516876)',
    'POINT(13.400092 52.521507)',
    'POINT(13.408529 52.519274)',
];

const rows = [
    {"id": 1, "name": "Shop A", "embeddings": [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8], "geo": geo_points[0]},
    {"id": 2, "name": "Shop B", "embeddings": [0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9], "geo": geo_points[1]},
    {"id": 3, "name": "Shop C", "embeddings": [0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0], "geo": geo_points[2]},
    {"id": 4, "name": "Shop D", "embeddings": [0.4,0.5,0.6,0.7,0.8,0.9,1.0,0.1], "geo": geo_points[3]},
    {"id": 5, "name": "Shop E", "embeddings": [0.5,0.6,0.7,0.8,0.9,1.0,0.1,0.2], "geo": geo_points[4]},
    {"id": 6, "name": "Shop F", "embeddings": [0.6,0.7,0.8,0.9,1.0,0.1,0.2,0.3], "geo": geo_points[5]},
];

const insert_result = await milvusClient.insert({
  collection_name: 'geo_collection',
  data: rows,
});
console.log(insert_result);
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
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(IndexParam.builder()
        .fieldName("embeddings")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
client.createIndex(CreateIndexReq.builder()
        .collectionName(COLLECTION_NAME)
        .indexParams(indexParams)
        .build());
```

```javascript

const index_params = {
  field_name: "embeddings",
  index_type: "IVF_FLAT",
  metric_type: "L2",
  params: { nlist: 128 },
};

await milvusClient.createIndex({
  collection_name: 'geo_collection',
  index_name: 'embeddings_index',
  index_params: index_params,
});

await milvusClient.loadCollection({
  collection_name: 'geo_collection',
});
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

To filter on a `GEOMETRY` field, use a geometry operator in an expression:

- General: `{operator}(geo_field, '{wkt}')`

- Distance-based: `ST_DWITHIN(geo_field, '{wkt}', distance)`

Where:

- `operator` is one of the supported geometry operators (e.g., `ST_CONTAINS`, `ST_INTERSECTS`). Operator names must be all uppercase or all lowercase. For a list of supported operators, refer to [Supported geometry operators](geometry-operators.md#Supported-geometry-operators).

- `geo_field` is the name of your `GEOMETRY` field.

- `'{wkt}'` is the WKT representation of the geometry to query.

- `distance` is the threshold specifically for `ST_DWITHIN`.

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
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

float topLeftLon = 13.403683f;
float topLeftLat = 52.520711f;
float bottomRightLon = 13.455868f;
float bottomRightLat = 52.495862f;
String boundingBoxWkt = String.format("POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))",
        topLeftLon, topLeftLat, bottomRightLon, topLeftLat, bottomRightLon, bottomRightLat,
        topLeftLon, bottomRightLat, topLeftLon, topLeftLat);

String filter = String.format("st_within(geo, '%s')", boundingBoxWkt);
QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(COLLECTION_NAME)
        .filter(filter)
        .outputFields(Arrays.asList("name", "geo"))
        .build());
List<QueryResp.QueryResult> queryResults = queryResp.getQueryResults();
System.out.println("Query results:");
for (QueryResp.QueryResult result : queryResults) {
    System.out.println(result.getEntity());
}
```

```javascript
const top_left_lon = 13.403683;
const top_left_lat = 52.520711;
const bottom_right_lon = 13.455868;
const bottom_right_lat = 52.495862;
const bounding_box_wkt = `POLYGON((${top_left_lon} ${top_left_lat}, ${bottom_right_lon} ${top_left_lat}, ${bottom_right_lon} ${bottom_right_lat}, ${top_left_lon} ${bottom_right_lat}, ${top_left_lon} ${top_left_lat}))`;

const query_results = await milvusClient.query({
  collection_name: 'geo_collection',
  // highlight-next-line
  filter: `st_within(geo, '${bounding_box_wkt}')`,
  output_fields: ['name', 'geo'],
});
for (const ret of query_results.data) {
    console.log(ret);
}
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
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

float centerPointLon = 13.403683f;
float centerPointLat = 52.520711f;
float radiusMeters = 1000.0f;
String centralPointWkt = String.format("POINT(%f %f)", centerPointLon, centerPointLat);
String filter=String.format("st_dwithin(geo, '%s', %f)", centralPointWkt, radiusMeters);
QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName(COLLECTION_NAME)
        .filter(filter)
        .outputFields(Arrays.asList("name", "geo"))
        .build());
List<QueryResp.QueryResult> queryResults = queryResp.getQueryResults();
System.out.println("Query results:");
for (QueryResp.QueryResult result : queryResults) {
    System.out.println(result.getEntity());
}
```

```javascript
const center_point_lon = 13.403683;
const center_point_lat = 52.520711;
const radius_meters = 1000.0;
const central_point_wkt = `POINT(${center_point_lon} ${center_point_lat})`;

const query_results_dwithin = await milvusClient.query({
  collection_name: 'geo_collection',
  // highlight-next-line
  filter: `st_dwithin(geo, '${central_point_wkt}', ${radius_meters})`,
  output_fields: ['name', 'geo'],
});
for (const ret of query_results_dwithin.data) {
    console.log(ret);
}
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
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

Random ran = new Random();
List<Float> vector = new ArrayList<>();
for (int d = 0; d < DIM; ++d) {
    vector.add(ran.nextFloat());
}
String filter=String.format("st_within(geo, '%s')", boundingBoxWkt);
SearchReq request = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new FloatVec(vector)))
        .limit(3)
        .filter(filter)
        .outputFields(Arrays.asList("name", "geo"))
        .build();
SearchResp statusR = client.search(request);
List<List<SearchResp.SearchResult>> searchResults = statusR.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    for (SearchResp.SearchResult result : results) {
        System.out.printf("ID: %d, Score: %f, %s\n", (long)result.getId(), result.getScore(), result.getEntity().toString());
    }
}
```

```javascript
const vectors_to_search = [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]];
const search_results = await milvusClient.search({
  collection_name: "geo_collection",
  vectors: vectors_to_search,
  limit: 3,
  output_fields: ["name", "geo"],
  // highlight-next-line
  filter: `st_within(geo, '${bounding_box_wkt}')`,
});
for (const hits of search_results.results) {
  for (const hit of hits) {
    console.log(`hit: ${JSON.stringify(hit)}`);
  }
}
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