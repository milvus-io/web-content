---
id: check_collection.md
related_key: collection
summary: Learn how to check collection information in Milvus.
---

# Check Collection Information

This topic describes how to check the information of the collection in Milvus.

## Check if a collection exists

Verify if a collection exists in Milvus.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import utility
utility.has_collection("book")
```

```javascript
await milvusClient.collectionManager.hasCollection({
  collection_name: "book",
});
```

```cli
describe collection -c book
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
            <td><code>collection_name</code></td>
            <td>Name of the collection to check.</td>
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
            <td><code>collection_name</code></td>
            <td>Name of the collection to check.</td>
        </tr>
	</tbody>
</table>

<table class="language-cli">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>

## Check collection details

Check the details of a collection.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")  # Get an existing collection.

collection.schema                # Return the schema.CollectionSchema of the collection.
collection.description           # Return the description of the collection.
collection.name                  # Return the name of the collection.
collection.is_empty              # Return the boolean value that indicates if the collection is empty.
collection.num_entities          # Return the number of entities in the collection.
collection.primary_field         # Return the schema.FieldSchema of the primary key field.
collection.partitions            # Return the list[Partition] object.
collection.indexes               # Return the list[Index] object.
```

```javascript
await milvusClient.collectionManager.describeCollection({          // Return the name and schema of the collection.
  collection_name: "book",
});

await milvusClient.collectionManager.getCollectionStatistics({     // Return the statistics information of the collection.
  collection_name: "book",
});
```

```cli
describe collection -c book
```

<table class="language-python">
    <thead>
        <tr>
            <th>Property</th>
            <th>Return</th>
            <th>Exception</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>schema</td>
            <td>The schema of the collection.</td>
        </tr>
        <tr>
            <td>description</td>
            <td>The description of the collection.</td>
        </tr>
        <tr>
            <td>name</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>is_empty</td>
            <td>A boolean value that indicates whether the collection is empty.</td>
        </tr>
        <tr>
            <td>num_entities</td>
            <td>The number of entities in the collection.</td>
            <td><code>CollectionNotExistException</code> is raised if the collection does not exist.</td>
        </tr>
        <tr>
            <td>primary_field</td>
            <td>The primary field of the collection.</td>
        </tr>
        <tr>
            <td>partitions</td>
            <td>A list of all partitions.</td>
            <td><code>CollectionNotExistException</code> is raised if the collection does not exist.</td>
        </tr>
        <tr>
            <td>indexes</td>
            <td>A list of all indexes.</td>
            <td><code>CollectionNotExistException</code> is raised if the collection does not exist.</td>
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
            <td><code>collection_name</code></td>
            <td>Name of the collection to check.</td>
        </tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
        <tr>
            <th>Property</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>status</code></td>
            <td>{ error_code: number, reason: string }</td>
        </tr>
        <tr>
            <td><code>schema</code></td>
            <td>Information of all fields in this collection</td>
        <tr>
            <td><code>collectionID</code></td>
            <td> collectionID</td>
        </tr>
	</tbody>
</table>

<table class="language-cli">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>


## List all collections

List all collections in this Milvus Instance.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import utility
utility.list_collections()
```

```javascript
await milvusClient.collectionManager.showCollections();
```

```cli
list collections
```

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.20/tutorial.html)

