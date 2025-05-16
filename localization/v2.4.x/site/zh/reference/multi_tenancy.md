---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Milvus 中的多租户。
title: 多租户战略
---

<h1 id="Multi-tenancy-strategies" class="common-anchor-header">多租户策略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h1><p>随着 ChatGPT 的普及，越来越多的开发人员开始使用 CVP（ChatGPT、向量数据库、提示）栈创建自己的 SaaS 服务。本指南介绍了如何在全球使用最广泛的向量数据库之一 Milvus 上实现多租户，以跟上这一趋势。</p>
<p>多租户是指一个 Milvus 实例服务多个租户的架构。区分租户的最简单方法是将租户的数据和资源与其他租户的数据和资源分开。每个租户都有自己的专用资源或与其他租户共享资源，以管理数据库、集合和分区等 Milvus 对象。根据这些对象，有相应的方法来实现 Milvus 多租户。</p>
<h2 id="Database-oriented-multi-tenancy" class="common-anchor-header">面向数据库的多租户<button data-href="#Database-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>自 Milvus 2.2.9 版起，对象数据库开始可用。你可以在一个 Milvus 集群中创建多个数据库。这项新功能可以为每个租户分配一个数据库，从而实现面向数据库的多租户，这样租户就可以创建自己的集合和分区，充分利用自己的数据。不过，这种策略可以确保租户的数据隔离和搜索性能，但资源可能会浪费在闲置的租户身上。</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">面向集合的多租户<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>实现面向集合的多租户有两种可能的方法。</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">所有租户使用一个集合</h3><p>通过添加租户字段来区分租户，使用单个集合来实现多租户是一种简单的选择。在对特定租户进行 ANN 搜索时，添加一个过滤表达式，以过滤掉属于其他租户的所有实体。这是实现多租户的最简单方法。但要注意，过滤器的性能可能会成为 ANN 搜索的瓶颈。</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">每个租户一个集合</h3><p>另一种方法是为每个租户创建一个集合来存储自己的数据，而不是将所有租户的数据存储在一个集合中。这可以提供更好的数据隔离和查询性能。不过，请记住，这种方法需要在资源调度、运行能力和成本方面投入更多，如果租户数量超过了单个 Milvus 集群支持的最大集合数，这种方法可能就不适用了。</p>
<h2 id="Partition-oriented-multi-tenancy" class="common-anchor-header">面向分区的多租户<button data-href="#Partition-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>实现面向分区的多租户也有两种可能的方法：</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">每个租户一个分区</h3><p>管理单个集合比管理多个集合容易得多。与其创建多个集合，不如考虑为每个租户分配一个分区，以实现灵活的数据隔离和内存管理。面向分区的多租户搜索性能比面向集合的多租户要好得多。但需要注意的是，集合的租户数量不应超过集合可容纳分区的最大数量。</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">基于Partition Key的多租户</h3><p>Milvus 2.2.9 引入了名为Partition Key的新功能。创建集合时，指定一个租户字段并将其作为Partition Key字段。Milvus 将根据分区键字段中的值在分区中存储实体。在进行 ANN 搜索时，Milvus 会根据指定的分区键切换到一个分区，根据分区键过滤实体，并在过滤后的实体中进行搜索。</p>
</div>
<p>这种策略取消了 Milvus 集合可支持的最大租户数限制，并大大简化了资源管理，因为 Milvus 会自动为你管理分区。</p>
<p>总而言之，你可以使用上述任一或某些多租户策略来形成自己的解决方案。下表从数据隔离、搜索性能和最大租户数等方面对这些策略进行了比较。</p>
<table>
<thead>
<tr><th></th><th>数据隔离</th><th>搜索性能</th><th>最大租户数</th><th>推荐方案</th></tr>
</thead>
<tbody>
<tr><td>面向数据库</td><td>强</td><td>强</td><td>64</td><td>适用于需要集合随项目变化而变化的情况，尤其适用于组织内各部门之间的数据隔离。</td></tr>
<tr><td>一个集合适用于所有项目</td><td>弱</td><td>中等</td><td>不适用</td><td>适用于资源有限且对数据隔离不敏感的企业。</td></tr>
<tr><td>每个租户一个集合</td><td>强</td><td>强</td><td>少于 10,000</td><td>适用于每个群集拥有少于 10,000 个租户的情况。</td></tr>
<tr><td>每个租户一个分区</td><td>中</td><td>强</td><td>4,096</td><td>适用于每个集群租户少于 4 096 个的情况。</td></tr>
<tr><td>基于Partition Key</td><td>中</td><td>强</td><td>10,000,000+</td><td>适用于预测租户数量会迅速增加到数百万的用户。</td></tr>
</tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">下一步计划<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/zh/v2.4.x/manage_databases.md">管理数据库</a><a href="/docs/zh/v2.4.x/schema.md">模式</a></p>
