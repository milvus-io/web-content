---
id: rename_collection.md
related_key: rename collection
summary: Learn how to rename a collection from memory in Milvus.
---

# Rename a Collection

If you want to rename a collection, you can use the collection-renaming API to interact with Milvus. This guide helps you understand how to rename an existing collection using the SDK of your choice.

In the following code snippet, we create a collection and name it `old_collection`. Then we rename it `new_collection`.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import Collection, utility

collection = Collection(name="old_collection", schema=schema)
utility.rename_collection("old_collection", "new_collection")
```

```java
import io.milvus.client.*;
import io.milvus.param.*;

RenameCollectionParam renameCollectionParam = new RenameCollectionParam.newBuilder()
    .withOldCollectionName("old_collection")
    .withNewCollectionName("new_collection")
    .build();

milvusClient.renameCollection(renameCollectionParam);
```

```go
// Not available yet
```

```javascript
const { MilvusClient } = require('@zilliz/milvus2-sdk-node');

const client = new MilvusClient({ address, username, password });

client.renameCollection({
    collection_name: "old_collection",
    new_collection_name: "new_collection"
}).then(res => {
    console.log(res);
})
```

```csharp
using Milvus.Client;

var collection = milvusClient.GetCollection("old_collection").RenameAsync("new_collection");
```

For code examples in the flavor of other programming languages, keep watching.

## What's next

- [Insert data into Milvus](insert_data.md)
- [Create a partition](create_partition.md)
- [Build an index for vectors](build_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)

