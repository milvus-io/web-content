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
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
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

```go
hasColl, err := milvusClient.HasCollection(
  context.Background(), // ctx
  collectionName,       // CollectionName
)
if err != nil {
  log.Fatal("failed to check whether collection exists:", err.Error())
}
log.Println(hasColl)
```

```java
R<Boolean> respHasCollection = milvusClient.hasCollection(
  HasCollectionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
if (respHasCollection.getData() == Boolean.TRUE) {
  System.out.println("Collection exists.");
}
```

```shell
describe collection -c book
```

```curl
curl -X 'GET' \
  'http://localhost:9091/api/v1/collection/existence' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book"
  }'
```

<div class="language-curl">
Output:

```json
{
  "status":{},
  "value":true
}
```

</div>

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

<table class="language-go">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>


<table class="language-java">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>

<table class="language-shell">
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

<table class="language-curl">
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

## Check collection details

Check the details of a collection.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
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

```go
collDesc, err := milvusClient.DescribeCollection(               // Return the name and schema of the collection.
  context.Background(),   // ctx
  "book",                 // CollectionName
)
if err != nil {
  log.Fatal("failed to check collection schema:", err.Error())
}
log.Printf("%v\n", collDesc)

collStat, err := milvusClient.GetCollectionStatistics(          // Return the statistics information of the collection.
  context.Background(),   // ctx
  "book",                 // CollectionName
)
if err != nil {
  log.Fatal("failed to check collection statistics:", err.Error())
}
```

```java
R<DescribeCollectionResponse> respDescribeCollection = milvusClient.describeCollection(
  // Return the name and schema of the collection.
  DescribeCollectionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
DescCollResponseWrapper wrapperDescribeCollection = new DescCollResponseWrapper(respDescribeCollection.getData());
System.out.println(wrapperDescribeCollection);

R<GetCollectionStatisticsResponse> respCollectionStatistics = milvusClient.getCollectionStatistics(
  // Return the statistics information of the collection.
  GetCollectionStatisticsParam.newBuilder()
    .withCollectionName("book")
    .build()
  );
GetCollStatResponseWrapper wrapperCollectionStatistics = new GetCollStatResponseWrapper(respCollectionStatistics.getData());
System.out.println("Collection row count: " + wrapperCollectionStatistics.getRowCount());
```

```shell
describe collection -c book
```

```curl
curl -X 'GET' \
  'http://localhost:9091/api/v1/collection' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book"
  }'
```

<div class="language-curl">
Output:

```json
{
  "status": {},
  "schema": {
    "name": "book",
    "description": "Test book search",
    "fields": [
      {
        "fieldID": 100,
        "name": "book_id",
        "is_primary_key": true,
        "description": "book id",
        "data_type": 5
      },
      {
        "fieldID": 101,
        "name": "book_intro",
        "description": "embedded vector of book introduction",
        "data_type": 101,
        "type_params": [
          {
            "key": "dim",
            "value": "2"
          }
        ]
      }
    ]
  },
  "collectionID": 434240188610972993,
  "virtual_channel_names": [
    "by-dev-rootcoord-dml_0_434240188610972993v0",
    "by-dev-rootcoord-dml_1_434240188610972993v1"
  ],
  "physical_channel_names": [
    "by-dev-rootcoord-dml_0",
    "by-dev-rootcoord-dml_1"
  ],
  "created_timestamp": 434240188610772994,
  "created_utc_timestamp": 1656494860118,
  "shards_num": 2,
  "consistency_level": 1
}
```

</div>

<table class="language-python">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
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
        </tr>
        <tr>
            <td>primary_field</td>
            <td>The primary field of the collection.</td>
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

<table class="language-go">
	<thead>
        <tr>
            <th>Parameter</th>
	    <th>Description</th>
	</tr>
	<tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>

<table class="language-java">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>

<table class="language-shell">
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

<table class="language-curl">
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

## List all collections

List all collections in this Milvus Instance.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import utility
utility.list_collections()
```

```javascript
await milvusClient.collectionManager.showCollections();
```

```go
listColl, err := milvusClient.ListCollections(
  context.Background(),   // ctx
)
if err != nil {
  log.Fatal("failed to list all collections:", err.Error())
}
log.Println(listColl)
```

```java
R<ShowCollectionsResponse> respShowCollections = milvusClient.showCollections(
    ShowCollectionsParam.newBuilder().build()
  );
System.out.println(respShowCollections);
```

```shell
list collections
```

```curl
curl -X 'GET' \
  'http://localhost:9091/api/v1/collections' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json'
```

<div class="language-curl">
Output:

```json
{
  "status": {},
  "collection_names": [
    "book"
  ],
  "collection_ids": [
    434240188610972993
  ],
  "created_timestamps": [
    434240188610772994
  ],
  "created_utc_timestamps": [
    1656494860118
  ]
}
```

</div>

<table class="language-go">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
    </tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
