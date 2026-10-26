---
id: multi_tenancy.md
title: 实现多租户功能
summary: 在 Milvus 中，多租户模式是指多个客户或团队（称为“租户”）共享同一个集群，同时保持数据环境的隔离。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">实现多租户功能<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，多租户意味着多个客户或团队（称为<strong>“租户”</strong>）共享同一个集群，同时保持数据环境的隔离。</p>
<p>Milvus 支持四种多租户策略，每种策略在可扩展性、数据隔离性和灵活性之间都有不同的权衡。本指南将带您了解每种选项，帮助您根据具体用例选择最合适的策略。</p>
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
    </button></h2><p>Milvus 支持四个层级的多租户：<strong>数据库</strong>、<strong>Collection</strong>、<strong>分区和</strong> <strong>Partition Key</strong>。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">数据库级多租户<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>在数据库级多租户模式下，每个租户都会获得一个包含一个或多个 Collections 的对应<a href="/docs/zh/v2.6.x/manage_databases.md">数据库</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>数据库级多租户</span>
  
 </span></p>
<ul>
<li><p><strong>可扩展性</strong>：数据库级多租户策略默认最多支持 64 个租户。</p></li>
<li><p><strong>数据隔离</strong>：每个数据库中的数据完全隔离，提供企业级数据隔离，非常适合受监管的环境或具有严格合规需求的客户。</p></li>
<li><p><strong>灵活性</strong>：每个数据库可以包含具有不同Schema的Collection，提供高度灵活的数据组织方式，并允许每个租户拥有自己的数据Schema。</p></li>
<li><p><strong>其他</strong>：该策略还支持基于角色的访问控制（RBAC），可对每个租户的用户访问权限进行精细控制。此外，您可以灵活地为特定租户加载或释放数据，从而有效管理热数据和冷数据。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">集合级多租户<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>通过集合级多租户架构，每个租户都会被分配一个<a href="/docs/zh/v2.6.x/manage-collections.md">Collection，</a>从而实现强数据隔离。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>Collection级多租户</span>
  
 </span></p>
<ul>
<li><p><strong>可扩展性</strong>：由于集群默认最多可容纳 65,536 个 Collection，因此该策略可在集群内容纳相同数量的租户。</p></li>
<li><p><strong>数据隔离</strong>：各Collection在物理上相互隔离。该策略提供了强数据隔离性。</p></li>
<li><p><strong>灵活性</strong>：该策略允许每个 Collection 拥有独立的 Schema，从而支持具有不同数据 Schema 的租户。</p></li>
<li><p><strong>其他</strong>：该策略还支持基于角色的访问控制（RBAC），可对租户实施细粒度的访问控制。此外，您可以灵活地为特定租户加载或释放数据，从而有效管理热数据和冷数据。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">分区级多租户<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>在分区级多租户模式中，每个租户会被分配到共享Collection内一个手动创建<a href="/docs/zh/v2.6.x/manage-partitions.md">的分区中</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>分区级多租户</span>
  
 </span></p>
<ul>
<li><p><strong>可扩展性</strong>：每个 Collection 最多可包含 1,024 个分区，从而支持相同数量的租户。</p></li>
<li><p><strong>数据隔离</strong>：每个租户的数据通过分区在物理上相互隔离。</p></li>
<li><p><strong>灵活性</strong>：此策略要求所有租户共享相同的Schema。此外，分区需要手动创建。</p></li>
<li><p><strong>其他</strong>：分区级别不支持基于角色的访问控制（RBAC）。租户数据既可以单独查询，也可以跨多个分区进行查询，这使得该方法非常适合涉及跨租户分段的聚合查询或分析的场景。此外，您可以灵活地为特定租户加载或释放数据，从而有效管理热数据和冷数据。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">Partition Key级多租户<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>采用此策略时，所有租户共享同一个 Collection 和 Schema，但每个租户的数据会根据<a href="/docs/zh/v2.6.x/use-partition-key.md">Partition Key</a>值自动路由到 16 个物理隔离的分区中。尽管每个物理分区可能包含多个租户，但不同租户的数据在逻辑上仍然相互隔离。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>Partition Key级多租户</span>
  
 </span></p>
<ul>
<li><p><strong>可扩展性</strong>：Partition Key 级策略提供了最具可扩展性的方案，可支持数百万个租户。</p></li>
<li><p><strong>数据隔离</strong>：由于多个租户可能共享一个物理分区，因此该策略提供的数据隔离性相对较弱。</p></li>
<li><p><strong>灵活性</strong>：由于所有租户必须共享相同的Schema，因此该策略的数据灵活性有限。</p></li>
<li><p><strong>其他</strong>：Partition Key级别不支持基于角色的访问控制（RBAC）。租户数据既可单独查询，也可跨多个分区进行查询，这使得该方法非常适合涉及跨租户分段的聚合查询或分析场景。</p></li>
</ul>
<div class="alert note">
<p>建议您在 Partition Key 字段上创建标量索引。由于每个物理分区包含多个租户，Milvus 会对搜索分区中的每个实体评估租户过滤条件，若无索引，则会进行全表扫描。详情请参阅《<a href="/docs/zh/v2.6.x/use-partition-key.md#Index-Partition-Key">索引 Partition Key</a>》。</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">选择合适的多租户策略<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表对四种多租户策略级别进行了全面比较。</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>数据库级别</strong></p></th>
     <th><p><strong>集合级</strong></p></th>
     <th><p><strong>分区级</strong></p></th>
     <th><p><strong>Partition Key级别</strong></p></th>
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
     <td><p>默认值为 64。您可以通过修改 Milvus.yaml 配置文件中的<code translate="no">maxDatabaseNum</code> 参数来增加该数值。 </p></td>
     <td><p>默认值为 65,536。您可以通过修改 Milvus.yaml 配置文件中的<code translate="no">maxCollectionNum</code> 参数来增加该数值。</p></td>
     <td><p>每个 Collection 最多 1,024 个。 </p></td>
     <td><p>数百万</p></td>
   </tr>
   <tr>
     <td><p><strong>数据模式的灵活性</strong></p></td>
     <td><p>高</p></td>
     <td><p>中等</p></td>
     <td><p>低</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p><strong>支持基于角色的访问控制（RBAC）</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>否</p></td>
     <td><p>否</p></td>
   </tr>
   <tr>
     <td><p><strong>搜索性能</strong></p></td>
     <td><p>强劲</p></td>
     <td><p>强</p></td>
     <td><p>中等</p></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p><strong>支持跨租户搜索</strong></p></td>
     <td><p>不</p></td>
     <td><p>不</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>支持对热数据和冷数据进行有效处理</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>否目前，Partition Key级策略尚不支持此功能。</p></td>
   </tr>
</table>
<p>在 Milvus 中选择多租户策略时，需要考虑以下几个因素。</p>
<ol>
<li><p><strong>可扩展性：</strong>Partition Key &gt; 分区 &gt; Collection &gt; 数据库</p>
<p>如果您预计需要支持数量非常庞大的租户（数百万或更多），请使用Partition Key级策略。</p></li>
<li><p><strong>严格的数据隔离要求</strong>：数据库 = Collection &gt; 分区 &gt; Partition Key</p>
<p>如果您有严格的物理数据隔离要求，请选择数据库、Collection或分区级策略。</p></li>
<li><p><strong>每个租户数据具有灵活的数据 Schema：</strong>数据库 &gt; Collection &gt; 分区 = Partition Key</p>
<p>Database级和Collection级策略在Schema方面提供了完全的灵活性。如果您的租户数据结构各不相同，请选择Database级或Collection级多租户方案。</p></li>
<li><p><strong>其他</strong></p>
<ol>
<li><p><strong>性能：</strong>搜索性能由多种因素决定，包括索引、搜索参数和机器配置。Milvus 还支持性能调优。建议在选择多租户策略之前先测试实际性能。</p></li>
<li><p><strong>热数据与冷数据的有效处理</strong>：目前，数据库级、Collection级和分区级策略均支持热数据与冷<strong>数据的</strong>处理。</p></li>
<li><p><strong>跨租户搜索</strong>：仅分区级和Partition Key级策略支持跨租户查询。</p></li>
</ol></li>
</ol>
