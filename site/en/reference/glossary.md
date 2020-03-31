---
id: glossary.md
title: Glossary
sidebar_label: Glossary
---

# Glossary

## Data structure

- Collection: Consists of a set of entities and are equivalent to a table in an RDBMS.

- Entity: Consists of a group of fields that correspond to real objects.

- Entity ID: A unique value that can be used to reference an entity.

    > Note: Currently, Milvus does not support ID de-duplication. So, it is possible to have duplicate IDs in a segment.

- Field: Component of an entity. A field can either be structured data, such as numbers, strings, or unstructured data, such as vectors.

- Mapping: A set of rules that define how data is organized in a collection.

- Index: Built based on raw data and improves the speed of search operations on a collection.

- Segment: A data file that Milvus automatically creates by merging inserted data. A collection can contain multiple segments. During search, Milvus searches each segment, filters deleted data, and returns the combined result.

- Vector: A type of field representing features of an object. In Milvus, an entity must only contain one vector. A segment can contain multiple vectors. Vectors can be acquired by feature extraction of unstructured data.

## Operations

- Compact: An operation that releases space from a segment when data is deleted from the segment.

- Delete: An operation that removes data from Milvus.

- Flush: An operation that saves data from memory to disk to avoid data loss.

- Insert: An operation in which data is added to Milvus and stored as raw data files.

- Merge: An operation that automatically merges small segments to large segments in the backend to improve search performance.

- Search: An operation that returns data from a dataset per similarity to the target data.
