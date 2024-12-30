---
id: multi_tenancy.md
related_key: multi-tenancy
summary: Milvus 的多租户。
title: 多租户策略
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
    </button></h1><p>在许多使用案例中，开发人员希望运行一个 Milvus 集群，并为多个租户提供服务，例如几个产品团队或数百万终端用户。本指南介绍了在 Milvus 上实现多租户的几种不同策略。</p>
<p>Milvus 的设计支持数据库、 Collections 或分区级别的多租户。多租户的目的是将数据和资源相互分离。在不同级别实施多租户可以实现不同程度的隔离，但也涉及不同的开销。下面我们将解释它们之间的权衡。</p>
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
    </button></h2><p>从 Milvus 2.2.9 版开始，你可以在一个 Milvus 集群中创建多个数据库。该功能通过为每个租户分配一个数据库，使他们可以创建自己的 Collections，从而实现面向数据库的多租户。这种方法可为租户提供最好的数据和资源隔离，但一个集群中最多只能有 64 个数据库。</p>
<h2 id="Collection-oriented-multi-tenancy" class="common-anchor-header">面向 Collection 的多租户模式<button data-href="#Collection-oriented-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h2><p>实现面向 Collection 的多租户有两种可能的方法。</p>
<h3 id="One-collection-for-all-tenants" class="common-anchor-header">所有租户使用一个 Collection</h3><p>通过添加租户字段来区分租户，使用单个 Collections 实现多租户是一种简单的选择。在对特定租户进行 ANN 搜索时，添加一个过滤表达式，以过滤掉属于其他租户的所有实体。这是实现多租户的最简单方法。但要注意的是，过滤器的性能可能会成为 ANN 搜索的瓶颈。为了提高搜索性能，可以使用以下面向分区的多租户方法进行优化。</p>
<h3 id="One-collection-per-tenant" class="common-anchor-header">每个租户一个 Collection</h3><p>另一种方法是为每个租户创建一个 Collection 来存储自己的数据，而不是将所有租户的数据都存储在一个 Collection 中。这可以提供更好的数据隔离和查询性能。但要注意的是，这种方法在调度时需要更多资源，而且一个集群中最多只能有 10,000 个 Collections。</p>
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
    </button></h2><p>有两种方法可以实现面向分区的多租户：</p>
<h3 id="One-partition-per-tenant" class="common-anchor-header">每个租户一个分区</h3><p>管理一个 Collection 比管理多个 Collection 容易得多。与其创建多个 Collections，不如考虑为每个租户分配一个分区，以实现灵活的数据隔离和内存管理。面向分区的多租户的搜索性能要比面向 Collection 的多租户好得多。但需要注意的是，Collection 的租户数量不应超过一个 Collection 所能容纳的最大分区数。</p>
<h3 id="Partition-key-based-multi-tenancy" class="common-anchor-header">基于 Partition Key 的多租户功能</h3><p>Milvus 2.2.9 引入了一项名为分区密钥的新功能。创建 Collections 时，指定一个租户字段并将其作为 Partition Key 字段。Milvus 会根据分区 Key 字段的哈希值将实体存储在分区中。在进行 ANN 搜索时，Milvus 只搜索包含分区键的分区。这将在很大程度上缩小搜索范围，从而获得比不使用分区关键字更好的性能。</p>
</div>
<p>这种策略解除了 Milvus Collections 可支持的最大租户数限制，并大大简化了资源管理，因为 Milvus 会自动为你管理分区。</p>
<p>总而言之，你可以使用上述任一或某些多租户策略来形成自己的解决方案。下表从数据隔离、搜索性能和最大租户数等方面对这些策略进行了比较。</p>
<table>
<thead>
<tr><th></th><th>数据隔离</th><th>搜索性能</th><th>最大租户数</th><th>推荐方案</th></tr>
</thead>
<tbody>
<tr><td>面向数据库</td><td>强</td><td>强</td><td>64</td><td>适用于那些需要集合随项目变化而变化的情况，尤其适用于组织内各部门之间的数据隔离。</td></tr>
<tr><td>一个 Collection 适用于所有项目</td><td>弱</td><td>中等</td><td>不适用</td><td>适用于资源有限且对数据隔离不敏感的企业。</td></tr>
<tr><td>每个租户一个 Collections</td><td>强</td><td>强</td><td>少于 10,000</td><td>适用于每个群集拥有少于 10,000 个租户的情况。</td></tr>
<tr><td>每个租户一个分区</td><td>中</td><td>强</td><td>4,096</td><td>适用于每个 Collections 的租户少于 4,096 个的情况。</td></tr>
<tr><td>基于分区 Key</td><td>中</td><td>强</td><td>10,000,000+</td><td>适用于预测租户数量会迅速增加到数百万的用户。</td></tr>
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
    </button></h2><p><a href="/docs/zh/manage_databases.md">管理数据库</a><a href="/docs/zh/schema.md">Schema</a></p>
