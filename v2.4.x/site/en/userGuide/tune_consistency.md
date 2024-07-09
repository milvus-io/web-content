---
id: tune_consistency.md
related_key: tune consistency
title: Tune Consistency
summary: Learn how to tune consistency level in Milvus.
deprecate: true
---

# Tune consistency

Milvus supports setting consistency level while creating a collection, conducting a vector query, and conducting a vector search (only on PyMilvus currently). Milvus supports four levels of consistency: `Strong`, `Eventual`, `Bounded`, and `Session`. By default, a collection created without specifying the consistency level is set with `Bounded` consistency level. This topic describes how to tune consistency.

## Configure parameter
By default, the consistency level is set as `Bounded`, under which Milvus reads a less updated data view (usually several seconds earlier) when a search or query request comes. You can set the consistency level by configuring the parameter `consistency_level` while creating a collection and conducting a search or query. See [Guarantee Timestamp in Search Requests](https://github.com/milvus-io/milvus/blob/master/docs/developer_guides/how-guarantee-ts-works.md) for the mechanism behind.

<table class="language-python">
        <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>consistency_level</code></td>
            <td>Consistency level of the collection to create.</td>
            <td>
                <ul>
                    <li><code>Strong</code></li>
                    <li><code>Bounded</code></li>
                    <li><code>Session</code></li>
                    <li><code>Eventually</code></li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

#### Example

The following examples set the consistency level as `Strong`, meaning Milvus will read the most updated data view at the exact time point when a search or query request comes. The consistency level set in the search or query requests overwrites the one set while creating the collection.  Without specifying the consistency level during a search or query, Milvus adopts the original consistency level of the collection.

- **Create a collection**

```
from pymilvus import Collection
collection = Collection(
    name=collection_name, 
    schema=schema, 
    using='default', 
    shards_num=2,
    consistency_level="Strong"
    )
```

- **Conduct a vector search**

```
result = hello_milvus.search(
        vectors_to_search,
        "embeddings",
        search_params,
        limit=3,
        output_fields=["random"],
        # search will scan all entities inserted into Milvus.
        consistency_level="Strong",
        )
```

- **Conduct a vector query**    

```
res = collection.query(
  expr = "book_id in [2,4,6,8]", 
  output_fields = ["book_id", "book_intro"],
  consistency_level="Strong"
)
```


