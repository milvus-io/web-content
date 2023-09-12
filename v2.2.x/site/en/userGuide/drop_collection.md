---
id: drop_collection.md
related_key: drop collection
summary: Learn how to drop a collection in Milvus.
---

# Drop a collection

This topic describes how to drop a collection and the data within.

<div class="alert caution">
Dropping a collection irreversibly deletes all data within it.
</div>


<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
  <a href="#curl">Curl</a>
</div>

```python
from pymilvus import utility
utility.drop_collection("book")
```

```javascript
await milvusClient.dropCollection({ collection_name: "book" });
```

```go
err = milvusClient.DropCollection(
  context.Background(), // ctx
  "book",               // CollectionName
)
if err != nil {
	log.Fatal("fail to drop collection:", err.Error())
}
```

```java
milvusClient.dropCollection(
  DropCollectionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
```

```csharp
var collection = Client.GetCollection("book");
await collection.DropAsync();
```

```curl
curl -X 'DELETE' \
  '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/collections/drop' \
  -H 'Authorization: Bearer ${TOKEN}' \
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
    "code": 200,
    "data": {}
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
            <td>Name of the collection to drop.</td>
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
            <td>Name of the collection to drop.</td>
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
            <td>Name of the collection to drop.</td>
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
            <td>Name of the collection to drop.</td>
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
            <td><code>collectionName</code></td>
            <td>Name of the collection to drop.</td>
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
