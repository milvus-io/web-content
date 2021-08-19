---
id: index.md
related_key: index

---

# Vector Index

Indexing, a process of organizing data, is a huge component of what makes it possible to efficiently query the million-, billion-, or even trillion-vector datasets that vector databases rely on. 

## **How does vector indexing work?**

Similarity search engines work by comparing an input to a database to find objects that are most similar to the input. Indexing is the process of efficiently organizing data, and it plays a major role in making similarity search useful by dramatically accelerating time-consuming queries on large datasets. After a massive vector dataset is indexed, queries can be routed to clusters, or subsets of data, that are most likely to contain vectors similar to an input query. In practice, this means a certain degree of accuracy is sacrificed to speed up queries on really big vector data.


## Vector field and index

To improve query performance, you can specify an [index type](index_selection.md) for each vector field. Currently, a vector field only supports one index type, Milvus will automatically delete the old index when switching the index type.

## Create indexes

When the `create_index` method is called, Milvus synchronously indexes the existing data on this field. 

<div class="alert note">
When the inserted data segment is less than 4,096 rows, Milvus does not index it.
</div>



### Index by segment

Milvus stores massive data in sections. When indexing, Milvus creates an index for each data segment separately.

### Build indexes during free time

It is known that indexing is a resource-consuming and time-consuming task. When the query task and indexing task are concurrent, Milvus preferentially allocates computing resources to the query task, that is, any query command will interrupt the indexing task being executed in the background. After that, only when the user does not send the query task for 5 seconds, Milvus resumes the indexing task in the background. Besides, if the data segment specified by the query command has not been built into the specified index, Milvus will do an exhaustive search directly within the segment.

## How to choose an index

To learn about the index types supported by Milvus and how to choose an appropriate index for your application scenarios, please read [How to Select an Index in Milvus](index_selection.md).

To learn how to choose an appropriate index for a metric, see [Similarity Metrics](metric.md).
