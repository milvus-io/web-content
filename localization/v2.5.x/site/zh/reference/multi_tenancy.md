---
id: multi_tenancy.md
title: 实施多租户
summary: 在 Milvus，多租户意味着多个客户或团队（称为租户）共享同一个集群，同时保持隔离的数据环境。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">实施多租户<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，多<strong>租户</strong>意味着多个客户或团队（称为<strong>租户）</strong>共享同一个集群，同时保持隔离的数据环境。</p>
<p>Milvus 支持四种多租户策略，每种策略都在可扩展性、数据隔离和灵活性之间提供不同的权衡。本指南将向您介绍每种方案，帮助您选择最适合自己使用情况的策略。</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">多租户策略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持四个级别的多租户：<strong>数据库</strong>、<strong>Collection</strong>、<strong>Partition</strong> 和<strong>Partition Key</strong>。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">数据库级多租户</h3><p>使用数据库级多租户，每个租户都会收到一个包含一个或多个 Collections 的相应<a href="/docs/zh/manage_databases.md">数据库</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>数据库级多租户</span> </span></p>
<ul>
<li><p><strong>可扩展性</strong>：数据库级多租户策略默认最多支持 64 个租户。</p></li>
<li><p><strong>数据隔离</strong>：每个数据库中的数据完全分离，提供企业级数据隔离，是受监管环境或有严格合规需求的客户的理想选择。</p></li>
<li><p><strong>灵活性</strong>：每个数据库都可以拥有不同 Schema 的 Collections，从而提供高度灵活的数据组织，并允许每个租户拥有自己的数据模式。</p></li>
<li><p><strong>其他</strong>该策略还支持 RBAC，可对每个租户的用户访问进行细粒度控制。此外，您还可以为特定租户灵活加载或释放数据，从而有效管理冷热数据。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">Collections 级多租户功能</h3><p>有了 Collection 级多租户功能，每个租户都会被分配到一个<a href="/docs/zh/manage-collections.md">Collection</a>，从而提供强大的数据隔离功能。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Collections 级多租户</span> </span></p>
<ul>
<li><p><strong>可扩展性</strong>：由于集群默认情况下最多可容纳 65,536 个 Collection，因此该策略可在集群内容纳相同数量的租户。</p></li>
<li><p><strong>数据隔离</strong>：Collections 之间是物理隔离的。这种策略提供了强大的数据隔离功能。</p></li>
<li><p><strong>灵活性</strong>：此策略允许每个 Collections 拥有自己的 Schema，以适应具有不同数据模式的租户。</p></li>
<li><p><strong>其他</strong>：这种策略还支持 RBAC，允许对租户进行细粒度的访问控制。此外，您还可以为特定租户灵活加载或释放数据，从而有效管理冷热数据。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">分区级多租户</h3><p>在分区级多租户中，每个租户都被分配到共享 Collections 中手动创建的<a href="/docs/zh/manage-partitions.md">分区</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>分区级多租户</span> </span></p>
<ul>
<li><p><strong>可扩展性</strong>：每个 Collection 最多可容纳 1,024 个分区，允许其中的租户数量相同。</p></li>
<li><p><strong>数据隔离</strong>：每个租户的数据都由分区物理隔离。</p></li>
<li><p><strong>灵活性</strong>：这种策略要求所有租户共享相同的数据 Schema。分区需要手动创建。</p></li>
<li><p><strong>其他</strong>：分区级别不支持 RBAC。租户既可以单独查询，也可以跨多个分区查询，因此这种方法非常适合涉及跨租户分区的聚合查询或分析的场景。此外，您还可以灵活加载或释放特定租户的数据，从而有效管理冷热数据。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Partition Key 级多租户</h3><p>采用这种策略，所有租户共享一个 Collections 和 Schema，但每个租户的数据会根据<a href="/docs/zh/use-partition-key.md">分区键值</a>自动路由到 16 个物理隔离的分区中。虽然每个物理分区可以包含多个租户，但不同租户的数据在逻辑上是分开的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>Partition Key 级别 多租户</span> </span></p>
<ul>
<li><p><strong>可扩展性</strong>：Partition Key 级策略提供了最具可扩展性的方法，可支持数百万个租户。</p></li>
<li><p><strong>数据隔离</strong>：这种策略的数据隔离性相对较弱，因为多个租户可以共享一个物理分区。</p></li>
<li><p><strong>灵活性</strong>：由于所有租户必须共享相同的数据 Schema，因此这种策略提供的数据灵活性有限。</p></li>
<li><p><strong>其他</strong>：不支持分区 Key 级别的 RBAC。租户既可以单独查询，也可以跨多个分区查询，因此这种方法非常适合涉及跨租户分区的聚合查询或分析的场景。</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">选择正确的多租户策略<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表对四个级别的多租户策略进行了全面比较。</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>数据库级</strong></p></th>
     <th><p><strong>Collections 级</strong></p></th>
     <th><p><strong>分区级</strong></p></th>
     <th><p><strong>分区 Key 级</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>数据隔离</strong></p></td>
     <td><p>物理</p></td>
     <td><p>物理</p></td>
     <td><p>物理</p></td>
     <td><p>物理 + 逻辑</p></td>
   </tr>
   <tr>
     <td><p><strong>最大租户数</strong></p></td>
     <td><p>默认为 64 个。您可以通过修改 Milvus.yaml 配置文件中的<code translate="no">maxDatabaseNum</code> 参数来增加租户数。 </p></td>
     <td><p>默认为 65,536。可以通过修改 Milvus.yaml 配置文件中的<code translate="no">maxCollectionNum</code> 参数来增加。</p></td>
     <td><p>每个 Collection 最多 1,024 个。 </p></td>
     <td><p>百万</p></td>
   </tr>
   <tr>
     <td><p><strong>数据 Schema 灵活性</strong></p></td>
     <td><p>高</p></td>
     <td><p>中</p></td>
     <td><p>低</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC 支持</strong></p></td>
     <td><p>支持</p></td>
     <td><p>支持</p></td>
     <td><p>支持</p></td>
     <td><p>不支持</p></td>
   </tr>
   <tr>
     <td><p><strong>搜索性能</strong></p></td>
     <td><p>强</p></td>
     <td><p>强</p></td>
     <td><p>中等</p></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p><strong>跨租户搜索支持</strong></p></td>
     <td><p>不支持</p></td>
     <td><p>支持</p></td>
     <td><p>支持</p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>支持有效处理冷热数据</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>支持</p></td>
     <td><p>否 目前不支持 Partition Key 级策略。</p></td>
   </tr>
</table>
<p>在选择 Milvus 的多租户策略时，有几个因素需要考虑。</p>
<ol>
<li><p><strong>可扩展性：</strong>分区密钥 &gt; 分区 &gt; Collections &gt; 数据库</p>
<p>如果预计要支持非常多的租户（数百万或更多），请使用分区密钥级策略。</p></li>
<li><p><strong>强大的数据隔离要求</strong>：数据库 = Collection &gt; 分区 &gt; 分区密钥</p>
<p>如果有严格的物理数据隔离要求，请选择数据库、Collection 或分区级策略。</p></li>
<li><p><strong>每个租户数据的灵活数据 Schema：</strong>Database &gt; Collections &gt; Partition = Partition Key</p>
<p>数据库级和 Collections 级策略为数据 Schema 提供了充分的灵活性。如果租户的数据结构不同，请选择数据库级或 Collections 级多租户。</p></li>
<li><p><strong>其他</strong></p>
<ol>
<li><p><strong>性能：</strong>搜索性能由多种因素决定，包括索引、搜索参数和机器配置。Milvus 也支持性能调整。建议在选择多租户策略前测试实际性能。</p></li>
<li><p><strong>有效处理冷热数据</strong>：目前，数据库级、 Collections 级和分区级策略都支持冷热数据处理。</p></li>
<li><p><strong>跨租户搜索</strong>：只有分区级和 Partition Key 级策略支持跨租户查询。</p></li>
</ol></li>
</ol>
