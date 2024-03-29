---
id: manage_data.md
title: Manage Data
---

# Manage Data

Data in Milvus are called entities. An entity consists of a group of fields and is used to represent unstructured data like images, magazine articles, short videos, and more.

- [Insert Data](insert_data.md): Prepare and insert entities into Milvus. Milvus 2.1 now supports VARCHAR data type on scalar field.

- [Delete Data](delete_data.md): Milvus supports deleting entities by primary key filtered with boolean expression.

- [Compact Data](compact_data.md): Milvus supports automatic data compaction by default. You can still compact data manually and check the compaction status.

- [Upsert Entities](upsert_entities.md): Upserting is a combination of insert and delete operations. Milvus allows you to upsert entities.