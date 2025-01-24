---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenancy in Milvus.
title: Multi-tenancy strategies
---

# Multi-tenancy strategies

In many use cases, developers want to run one Milvus cluster and serve multiple tenants, such as a couple of product teams, or millions of end users. This guide explains a few different strategies to achieve multi-tenancy on Milvus.

Milvus is designed to support multi-tenancy at database, collection, or partition levels. The objective of multi-tenancy is to separate the data and resources from each other. Implementing multi-tenancy at different level can achieves different extent of isolation but also involves different overhead. Here we explain the trade-offs of them.

## Database-oriented multi-tenancy

Since Milvus version 2.2.9, you can create multiple databases in a single Milvus cluster. This feature makes it possible to achieve database-oriented multi-tenancy by assigning a database for each tenant, so that they can create their own collections. This approaches provides the best data and resource isolation for tenants, but it's limited to 64 databases in one cluster at most.

## Collection-oriented multi-tenancy

There are two possible ways to achieve collection-oriented multi-tenancy.

### One collection for all tenants

Using a single collection to implement multi-tenancy by adding a tenant field to distinguish between tenants is a simple option. When conducting ANN searches for a specific tenant, add a filter expression to filter out all entities that belong to other tenants. This is the simplest way to achieve multi-tenancy. However, be aware that the filter's performance may become the bottleneck of ANN searches. To improve the search performance, you can optimize with below partition-oriented multi-tenancy.

### One collection per tenant

Another approach is to create a collection for each tenant to store its own data, instead of storing the data of all tenants in a single collection. This provides better data isolation and query performance. However, keep in mind that this approach requires more resource in scheduling and limited to 10,000 collections in a cluster at most.

## Partition-oriented multi-tenancy

There are two ways to achieve partition-oriented multi-tenancy:

### One partition per tenant

Managing a single collection is much easier than managing multiple ones. Instead of creating multiple collections, consider assigning a partition for each tenant to achieve flexible data isolation and memory management. The search performance of partition-oriented multi-tenancy is much better than collection-oriented multi-tenancy. However, note that the number of tenants of the collection should not exceed the maximum number of partitions a collection can hold.

### Partition-key-based multi-tenancy

Milvus 2.2.9 introduces a new feature named partition key. Upon the creation of a collection, nominate a tenant field and make it the partition key field. Milvus will store entities in a partition according to the hash value of the partition key field. When conducting ANN searches, Milvus only searches the partition that contains the partition key. This will largely reduce the scope of the search thus achieving better performance than without partition key.

</div>

This strategy lifts the limit on the maximum number of tenants that a Milvus collection can support and greatly simplifies resource management because Milvus automatically manages partitions for you.

To recap, you can use either or some of the multi-tenancy strategies above to form your own solution. The following table makes comparisons among these strategies in terms of data isolation, search performance, and maximum number of tenants.

|                           | Data isolation | Search perf. | Max. num. of tenants | Recommend scenarios      |
|---------------------------|----------------|--------------|----------------------|---------------------------------------------------------------------------------------------|
| Database oriented         | Strong         | Strong       | 64                   |For those that require collections to vary with projects, especially suitable for data isolation between departments in your organization. |
| One collection for all    | Weak           | Medium       | N/A                  |For those that have limited resources and are insensitive to data isolation.               |
| One collection per tenant | Strong         | Strong       | Less than 10,000     |For those that have less than 10,000 tenants per cluster.                                  |
| One partition per tenant  | Medium         | Strong       | 1,024                |For those that have less than 1,024 tenants per collection.                                |
| Partition-key-based       | Medium         | Strong       | 10,000,000+          |For those that predict a rapid tenant increase into millions.                              |

## What's next

[Manage Databases](manage_databases.md)
[Schema](schema.md)
