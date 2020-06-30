---
id: terms.md
title: Milvus Terminology
sidebar_label: Milvus Terminology
---

# Milvus Terminology

- **Collection**: A collection that consists of a set of entities and are equivalent to a table in an RDBMS.

- **Entity**: A group of fields that correspond to real world objects. These fields can be structured data representing object properties or vectors representing object features.

- **Entity ID**: A guaranteed unique value that can be used to always reference an entity.
  > Note: Currently, Milvus does not support entity ID de-duplication and it is possible to have duplicate IDs in a segment.

- **Field**: A field within an entity. A field can either be structured data, such as numbers, strings, or unstructured data, such as vectors.

- **Index**: An index built based on raw data and improves the speed of data retrieval operations on a collection.

- **Mapping**: A set of rules that define how data is organized in a collection.

- **Segment**: A data file that Milvus automatically creates by merging inserted data. A collection can contain multiple segments. One segment can contain multiple entities. During search, Milvus searches each segment, filters deleted data, and returns the combined result.

- **Vector**: A type of field representing the feature of an object.
  > Note: Currently, an entity can only contain up to one vector.