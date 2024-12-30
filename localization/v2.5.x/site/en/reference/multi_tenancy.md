---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Multi-tenancy in Milvus.
title: Multi-tenancy strategies
---
<h1 id="Multi-tenancy-strategies" class="common-anchor-header">Multi-tenancy strategies<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>In many use cases, developers want to run one Milvus cluster and serve multiple tenants, such as a couple of product teams, or millions of end users. This guide explains a few different strategies to achieve multi-tenancy on Milvus.</p>
<p>Milvus is designed to support multi-tenancy at database, collection, or partition levels. The objective of multi-tenancy is to separate the data and resources from each other. Implementing multi-tenancy at different level can achieves different extent of isolation but also involves different overhead. Here we explain the trade-offs of them.</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">Database-oriented multi-tenancy<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Since Milvus version 2.2.9, you can create multiple databases in a single Milvus cluster. This feature makes it possible to achieve database-oriented multi-tenancy by assigning a database for each tenant, so that they can create their own collections. This approaches provides the best data and resource isolation for tenants, but it’s limited to 64 databases in one cluster at most.</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">Collection-oriented multi-tenancy<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>There are two possible ways to achieve collection-oriented multi-tenancy.</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">One collection for all tenants</h3><p>Using a single collection to implement multi-tenancy by adding a tenant field to distinguish between tenants is a simple option. When conducting ANN searches for a specific tenant, add a filter expression to filter out all entities that belong to other tenants. This is the simplest way to achieve multi-tenancy. However, be aware that the filter’s performance may become the bottleneck of ANN searches. To improve the search performance, you can optimize with below partition-oriented multi-tenancy.</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">One collection per tenant</h3><p>Another approach is to create a collection for each tenant to store its own data, instead of storing the data of all tenants in a single collection. This provides better data isolation and query performance. However, keep in mind that this approach requires more resource in scheduling and limited to 10,000 collections in a cluster at most.</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">Partition-oriented multi-tenancy<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>There are two ways to achieve partition-oriented multi-tenancy:</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">One partition per tenant</h3><p>Managing a single collection is much easier than managing multiple ones. Instead of creating multiple collections, consider assigning a partition for each tenant to achieve flexible data isolation and memory management. The search performance of partition-oriented multi-tenancy is much better than collection-oriented multi-tenancy. However, note that the number of tenants of the collection should not exceed the maximum number of partitions a collection can hold.</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">Partition-key-based multi-tenancy</h3><p>Milvus 2.2.9 introduces a new feature named partition key. Upon the creation of a collection, nominate a tenant field and make it the partition key field. Milvus will store entities in a partition according to the hash value of the partition key field. When conducting ANN searches, Milvus only searches the partition that contains the partition key. This will largely reduce the scope of the search thus achieving better performance than without partition key.</p>
</div>
<p>This strategy lifts the limit on the maximum number of tenants that a Milvus collection can support and greatly simplifies resource management because Milvus automatically manages partitions for you.</p>
<p>To recap, you can use either or some of the multi-tenancy strategies above to form your own solution. The following table makes comparisons among these strategies in terms of data isolation, search performance, and maximum number of tenants.</p>
<table>
<thead>
<tr><th></th><th>Data isolation</th><th>Search perf.</th><th>Max. num. of tenants</th><th>Recommend scenarios</th></tr>
</thead>
<tbody>
<tr><td>Database oriented</td><td>Strong</td><td>Strong</td><td>64</td><td>For those that require collections to vary with projects, especially suitable for data isolation between departments in your organization.</td></tr>
<tr><td>One collection for all</td><td>Weak</td><td>Medium</td><td>N/A</td><td>For those that have limited resources and are insensitive to data isolation.</td></tr>
<tr><td>One collection per tenant</td><td>Strong</td><td>Strong</td><td>Less than 10,000</td><td>For those that have less than 10,000 tenants per cluster.</td></tr>
<tr><td>One partition per tenant</td><td>Medium</td><td>Strong</td><td>4,096</td><td>For those that have less than 4,096 tenants per collection.</td></tr>
<tr><td>Partition-key-based</td><td>Medium</td><td>Strong</td><td>10,000,000+</td><td>For those that predict a rapid tenant increase into millions.</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><a href="/docs/manage_databases.md">Manage Databases</a>
<a href="/docs/schema.md">Schema</a></p>
