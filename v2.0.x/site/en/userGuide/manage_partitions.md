---
id: manage_partitions.md
title: Manage Partitions
---

# Manage Partitions

A partition is a division of a collection. Milvus supports dividing collection data into multiple parts on physical storage so that search and other operations can be limited to one partition to improve performance. Learn about the partition-level operations.

- [Create a Partition](create_partition.md): Create a partition with the example of creating a novel partition within a book collection.
- [Check Partition Information](check_partition.md): Check the basic information of a partition in Milvus including its name.
- [Drop a Partition](drop_partition.md): Caution is needed as the delete operation irreversibly drops the partition and all data within it.
- [Load a Partition](load_partition.md): Load the partition to memory before a search or a query instead of loading the whole collection can significantly reduce memory usage. Milvus 2.1 now supports loading a partition as multiple replicas.
- [Release a Partition](release_partition.md): Release a partition from memory after a search or a query to reduce memory usage.
