---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenancy in Milvus.
title: Multi-tenancy strategies
---

# Multi-tenancy strategies

As ChatGPT gains popularity, more developers are creating their own SaaS services using the CVP (ChatGPT, Vector Database, Prompt) stack. This guide explains how to achieve multi-tenancy on Milvus, one of the most widely-used vector databases in the world, to keep up with this trend.

Multi-tenancy is an architecture where a single Milvus instance serves multiple tenants. The simplest way to distinguish tenants is by separating their data and resources from those of others. Each tenant has their own dedicated resources or shares resources with others to manage Milvus objects like databases, collections, and partitions. Based on these objects, there are corresponding methods for achieving Milvus multi-tenancy.

## Database-oriented multi-tenancy

Since Milvus version 2.2.9, the object database is now available. You can create multiple databases in a single Milvus cluster. This new feature makes it possible to achieve database-oriented multi-tenancy by assigning a database for each tenant, so that they can create their own collections and partitions to make the most out of their data. However, this strategy ensures data isolation and search performance for tenants, but resources may be wasted on idle tenants.

## Collection-oriented multi-tenancy

There are two possible ways to achieve collection-oriented multi-tenancy.

### One collection for all tenants

Using a single collection to implement multi-tenancy by adding a tenant field to distinguish between tenants is a simple option. When conducting ANN searches for a specific tenant, add a filter expression to filter out all entities that belong to other tenants. This is the simplest way to achieve multi-tenancy. However, be aware that the filter's performance may become the bottleneck of ANN searches.

### One collection per tenant

Another approach is to create a collection for each tenant to store its own data, instead of storing the data of all tenants in a single collection. This provides better data isolation and query performance. However, keep in mind that this approach requires more investment in resource scheduling, operational capability, and costs and may be not applicable if the number of tenants exceeds the maximum number of collections that a single Milvus cluster supports.

## Partition-oriented multi-tenancy

There are also two possible ways to achieve partition-oriented multi-tenancy:

### One partition per tenant

Managing a single collection is much easier than managing multiple ones. Instead of creating multiple collections, consider assigning a partition for each tenant to achieve flexible data isolation and memory management. The search performance of partition-oriented multi-tenancy is much better than collection-oriented multi-tenancy. However, note that the number of tenants of the collection should not exceed the maximum number of partitions a collection can hold.

### Partition-key-based multi-tenancy

Milvus 2.2.9 introduces a new feature named partition key. Upon the creation of a collection, nominate a tenant field and make it the partition key field. Milvus will store entities in a partition according to the values in the partition key field. When conducting ANN searches, Milvus changes to a partition based on the specified partition key, filters entities according to the partition key, and searches among the filtered entities.

</div>

This strategy lifts the limit on the maximum number of tenants that a Milvus collection can support and greatly simplifies resource management because Milvus automatically manages partitions for you.

To recap, you can use either or some of the multi-tenancy strategies above to form your own solution. The following table makes comparisons among these strategies in terms of data isolation, search performance, and maximum number of tenants.

|                           | Data isolation | Search perf. | Max. num. of tenants | Recommend scenarios      |
|---------------------------|----------------|--------------|----------------------|---------------------------------------------------------------------------------------------|
| Database oriented         | Strong         | Strong       | 64                   |For those that require collections to vary with projects, especially suitable for data isolation between departments in your organization. |
| One collection for all    | Weak           | Medium       | N/A                  |For those that have limited resources and are insensitive to data isolation.               |
| One collection per tenant | Strong         | Strong       | Less than 10,000     |For those that have less than 10,000 tenants per cluster.                                  |
| One partition per tenant  | Medium         | Strong       | 4,096                |For those that have less than 4,096 tenants per collection.                                |
| Partition-key-based       | Medium         | Strong       | 10,000,000+          |For those that predict a rapid tenant increase into millions.                              |

## What's next

[Manage Databases](manage_databases.md)
[Schema](schema.md)
