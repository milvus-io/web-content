---
id: partition.md
title: Table Partitioning
sidebar_label: Table Partitioning
---

# Table Partitioning

Those familiar with databases all know that as a table becomes larger, query performance degrades. That's when a table need to be divided into partitions for faster query of the data.

This page introduces briefly the implementation of partitioning in Milvus. 

## How partitioning works in Milvus

Rather than commonly used methods such as range partitioning and list partitioning, Milvus provides a more flexible option called **tag partitioning**.

The table is partitioned by `partition_tag` that defines key values of a column in the table. When you create tag partitioned tables, they have the same schema definition as the table.

Assume you want to create a tag named “2019-12-12”. To create tag partitioned tables, use `create_partition` followed by the table name, partition name and the tag.

```python
create_partition(table_name="my_table", partition_name="partition_1", partition_tag="2019-12-12")
```

`partition_name` is the name of the partitioned table which must follow the table naming conventions in Milvus while `partition_tag` is user-defined type. When querying against a partition, they can be used interchangeablely.

When the partitioned tables are created, you can insert vectors to a specified partition by the following command: 

```python
add_vector(table_name="my_table", records=vectors, ids=vector_ids, partition_tag="2019-12-12")
```

To delete a partition, use `delete_partition` followed by the table name and the tag.

```python
delete_partion(table_name="my_table", partition_tag="2019-12-12")
```

To query against a specified partition, add the `partition_tags` parameter.

```python
search_vectors(table_name="my_table", query_records=q_records, top_k=2, nprobe=16, partition_tags=["2019-12-12"])
```

## Related links

[Learn Milvus Operations](../guides/milvus_operation.md)

