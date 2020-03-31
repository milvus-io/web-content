---
id: glossary.md
title: Milvus Terminology
sidebar_label: Milvus Terminology
---

# Milvus Terminology

- **Compact**: An operation that releases space from a segment when data is deleted from the segment.

- **Collection**: A collection that consists of a set of entities and are equivalent to a table in an RDBMS.

- **Delete**: An operation that removes data from Milvus.

- **Entity**: A group of fields that correspond to real world objects. These fields can be structured data representing object properties or vectors representing object features.

- **Entity ID**: A guaranteed unique value that can be used to always reference an entity.
  > Note: Currently, Milvus does not support entity ID de-duplication and it is possible to have duplicate IDs in a segment.

- **Field**: A field within an entity. A field can either be structured data, such as numbers, strings, or unstructured data, such as vectors.

- **Flush**: An operation that saves data from memory to disk to avoid data loss.

- **Index**: An index built based on raw data and improves the speed of data retrieval operations on a collection.

- **Insert**: An operation in which data is added to Milvus and stored as raw data files.

- **Mapping**: A set of rules that define how data is organized in a collection.

- **Merge**: An operation that automatically merges small segments to large segments in the backend to improve search performance.

- **Search**: An operation that returns data from a dataset per similarity to the target data.

- **Segment**: A data file that Milvus automatically creates by merging inserted data. A collection can contain multiple segments. During search, Milvus searches each segment, filters deleted data, and returns the combined result.

- **Vector**: A type of field representing the feature of an object.
  > Note: Currently, an entity can only contain up to one vector.
