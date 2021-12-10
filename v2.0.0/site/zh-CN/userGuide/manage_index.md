---
id: manage_index.md
related_key: create index
summary: Learn how to build an index for vectors in Milvus.
---

# Manage Indexes

This topic describes how to manage indexes in Milvus. See [Vector Index](index.md) and [Index Selection](index_selection.md) for more information.

Vector indexes are an organizational unit of metadata used to accelerate [vector similarity search](search.md). Without index built on vectors, Milvus will perform a brute-force search by default.

<div class="alert note">
<ul>
<li>Current release of Milvus only supports building and dropping an index on vector field. Future releases will support these operations on scalar field.</li>
<li>By default, Milvus does not index a segment with less than 1,024 rows. To change this parameter, configure <a href="configuration_standalone-advanced.md#System-Behavior-Configurations"><code>minSegmentSizeToEnableIndex</code></a> in <code>root_coord.yaml</code>.</li>
</div>

## Build an index

The following example builds a 1024-cluster IVF_FLAT index with Euclidean distance (L2) as the similarity metrics. You can choose the index and metric that suit your scenario.

Prepare the index parameters.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
index_params = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
```

```javascript
const index_params = {
  metric_type: "L2",
  index_type: "IVF_FLAT",
  params: JSON.stringify({ nlist: 1024 }),
};
```

```cli
create index

Collection name (example_collection): example_collection

The name of the field to create an index for (example_field): example_field

Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY): IVF_FLAT

Index metric type (L2, IP, HAMMING, TANIMOTO): L2

Index params nlist: 1024

Timeout []:
```

<table class="language-python">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>metric_type</code></td>
		<td>Type of metrics used to measure similarity of vectors. Find more options in <a href="metric.md">Simlarity Metrics</a>.</td>
	</tr>
	<tr>
		<td><code>index_type</code></td>
		<td>Type of index used to accelerate the vector search. Find more options in <a href="index_selection.md">Index Selection</a>.</td>
	</tr>
	<tr>
		<td><code>params</code></td>
		<td>Building parameter(s) specific to the index. See <a href="index_selection.md">Index Selection</a> for more information.</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>metric_type</code></td>
		<td>Type of metrics used to measure similarity of vectors. Find more options in <a href="metric.md">Simlarity Metrics</a>.</td>
	</tr>
	<tr>
		<td><code>index_type</code></td>
		<td>Type of index used to accelerate the vector search. Find more options in <a href="index_selection.md">Index Selection</a>.</td>
	</tr>
	<tr>
		<td><code>params</code></td>
		<td>Building parameter(s) specific to the index. See <a href="index_selection.md">Index Selection</a> for more information.</td>
	</tr>
	</tbody>
</table>


<table class="language-cli">
    <thead>
        <tr>
            <td>Option</td>
            <td>Full name</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>


Build the index by specifying the vector field name and index parameters.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import collection
collection = Collection("example_collection")      # Get an existing collection.
collection.create_index(field_name="example_field", index_params=index_params)
```

```python
Status(code=0, message='')
```

```javascript
await milvusClient.indexManager.createIndex({
  collection_name: "example_collection",
  field_name: "example_field",
  extra_params: index_params,
});
```

```cli
# See the previous step.
```


## View index details

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import collection
collection = Collection("example_collection")      # Get an existing collection.
collection.index().params
```

```python
{'metric_type': 'L2', 'index_type': 'IVF_FLAT', 'params': {'nlist': 1024}}
```

```javascript
await milvusClient.indexManager.describeIndex({
  collection_name: "example_collection",
});
```

```cli
describe index -c example_collection
```

<table class="language-cli">
    <thead>
        <tr>
            <td>Option</td>
            <td>Full name</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>--collection-name</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>

## Drop an index

Drop the index if you are sure that you do not want to use it anymore.

<div class="alert caution">
The drop operation is irreversible. Dropping an index removes all corresponding index files.
</div>



<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import collection
collection = Collection("example_collection")      # Get an existing collection.
collection.drop_index()
```

```javascript
await milvusClient.indexManager.dropIndex({
  collection_name: "example_collection",
});
```

```cli
delete index -c example_collection
```

<table class="language-cli">
    <thead>
        <tr>
            <td>Option</td>
            <td>Full name</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>--collection-name</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-t</td>
            <td>--timeout</td>
            <td>(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

