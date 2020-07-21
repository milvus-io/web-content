---
id: index_overview.md
---

# Vector Index Overview

## Vector index

Vector index is a time-efficient and space-efficient data structure built on vectors through a certain mathematical model. Through the vector index, we can efficiently query several vectors similar to the target vector.

Since accurate retrieval is usually very time-consuming, most of the vector index types of Milvus use ANNS (Approximate Nearest Neighbors Search). Compared with accurate retrieval, the core idea of ANNS is no longer limited to returning the most accurate result, but only searching for neighbors of the target. ANNS improves retrieval efficiency by sacrificing accuracy within an acceptable range.

According to the implementation methods, the ANNS vector index can be divided into four categories:

- Tree-based index
- Graph-based index
- Hash-based index
- Quantization-based index

For more details on index types, see [Milvus Index Types](index.md).

## Vector field and index

To improve query performance, you can specify an index type for each vector field. Currently, a vector field only supports one index type, Milvus will automatically delete the old index when switching the index type.

## Create indexes

When the `create_index` API is called, Milvus synchronously indexes the existing data on this field. Whenever the size of the inserted data reaches the `index_file_size`, Milvus automatically creates an index for it in the background.

<div class="alert note">
When the inserted data segment is less than 4096 rows, Milvus does not index it.
</div>

## Index by segment

Milvus stores massive data in sections. When indexing, Milvus creates an index for each data segment separately.

## Build indexes during free time

It is known that indexing is a resource-consuming and time-consuming task. When the query task and indexing task are concurrent, Milvus preferentially allocates computing resources to the query task, that is, any query command will interrupt the indexing task being executed in the background. After that, only when the user does not send the query task for 5 seconds, Milvus resumes the indexing task in the background. Besides, if the data segment specified by the query command has not been built into the specified index, Milvus will do a full search directly within the segment.