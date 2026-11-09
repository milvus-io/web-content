---
id: manage-collections.md
title: Collection详解
summary: >-
  在 Milvus 上，您可以创建多个 Collection 来管理数据，并将数据作为实体插入到这些 Collection 中。Collection
  和实体类似于关系型数据库中的表和记录。本页面将帮助您了解 Collection 和相关概念。
---
<h1 id="Collection-Explained" class="common-anchor-header">Collection详解<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 上，您可以创建多个 Collection 来管理数据，并将数据作为实体插入到 Collection 中。Collection 和实体类似于关系型数据库中的表和记录。本页面将帮助您了解 Collection 和相关概念。</p>
<h2 id="Collection" class="common-anchor-header">Collection<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Collection是一个具有固定列和可变行的二维表。每列代表一个字段，每行代表一个实体。</p>
<p>下图展示了一个包含八列和六个实体的Collection。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" /> 
   <span>Collection说明</span>
  
 </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Schema与字段<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>在描述一个对象时，我们通常会提及它的属性，例如大小、重量和位置。您可以将这些属性作为Collection中的字段使用。每个字段都有各种约束属性，例如数据类型和向量字段的维数。您可以通过创建字段并定义其顺序来构建Schema。 有关可用的数据类型，请参阅<a href="/docs/zh/schema.md">“Schema说明”</a>。</p>
<p>您应在待插入的实体中包含所有Schema定义的字段。若需将部分字段设为可选，请考虑启用Dynamic Field。详情请参阅《<a href="/docs/zh/enable-dynamic-field.md">Dynamic Field</a>》。</p>
<ul>
<li><p><strong>设置字段为可空或设置默认值</strong></p>
<p>有关如何将字段设为可空或设置默认值的详细信息，请参阅《<a href="/docs/zh/nullable-and-default.md">可空与默认值</a>》。</p></li>
<li><p><strong>启用 Dynamic Field</strong></p>
<p>有关如何启用和使用动态字段的详细信息，请参阅《<a href="/docs/zh/enable-dynamic-field.md">Dynamic Field</a>》。</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">主键和 AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>与关系型数据库中的主键类似，Collection也拥有一个主字段，用于区分其他实体。主字段中的每个值在全球范围内都是唯一的，并对应一个特定的实体。</p>
<p>如上图所示，名为<strong>id</strong>的字段用作主字段，第一个 ID<strong>0</strong>对应于标题为<em>《冠状病毒的死亡率并不重要》</em>的实体。不会存在其他主字段值为 0 的实体。</p>
<p>主字段仅接受整数或字符串。插入实体时，默认应包含主字段值。但是，如果在创建 Collection 时启用了<strong>AutoId</strong>，Milvus 将在插入数据时自动生成这些值。在这种情况下，请勿在待插入的实体中包含主字段值。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/primary-field.md">主字段与 AutoId</a>》。</p>
<h2 id="Index" class="common-anchor-header">索引<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>在特定字段上创建索引可提高搜索效率。建议为服务所依赖的所有字段创建索引，其中向量字段的索引是必需的。</p>
<h2 id="Entity" class="common-anchor-header">实体<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Entity是指在Collection中具有相同字段集的数据记录。同一行中所有字段的值共同构成一个实体。</p>
<p>您可以根据需要向Collection中插入任意数量的实体。但是，随着实体数量的增加，其占用的内存大小也会随之增加，从而影响搜索性能。</p>
<p>如需了解更多信息，请参阅<a href="/docs/zh/schema.md">《Schema详解》</a>。</p>
<h2 id="Load-and-Release" class="common-anchor-header">加载与释放<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>加载 Collection 是进行 Collection 内相似度搜索和查询的前提条件。当您加载 Collection 时，Milvus 会将所有索引文件和每个字段中的原始数据加载到内存中，以便快速响应搜索和查询。</p>
<p>搜索和查询是内存密集型操作。为节省资源，建议释放当前未使用的 Collections。</p>
<p>有关更多详细信息，请参阅《<a href="/docs/zh/load-and-release.md">加载与释放</a>》。</p>
<h2 id="Search-and-Query" class="common-anchor-header">搜索与查询<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>创建索引并加载 Collection 后，您可以通过提供一个或多个查询向量来启动相似度搜索。例如，当收到搜索请求中携带的查询向量表示时，Milvus 会使用指定的度量类型来衡量查询向量与目标 Collection 中的向量之间的相似度，然后返回与查询在语义上相似的向量。</p>
<p>您还可以在搜索和查询中加入元数据过滤，以提高结果的相关性。请注意，元数据过滤条件在查询中是必填的，但在搜索中是可选的。</p>
<p>有关适用度量类型的详细信息，请参阅《<a href="/docs/zh/metric.md">度量类型》</a>。</p>
<p>有关搜索和查询的更多信息，请参阅“搜索与重新排序”章节中的文章，其中基本功能包括：</p>
<ul>
<li><p><a href="/docs/zh/single-vector-search.md">基本人工神经网络搜索</a></p></li>
<li><p><a href="/docs/zh/filtered-search.md">过滤搜索</a></p></li>
<li><p><a href="/docs/zh/range-search.md">范围搜索</a></p></li>
<li><p><a href="/docs/zh/grouping-search.md">分组搜索</a></p></li>
<li><p><a href="/docs/zh/multi-vector-search.md">混合搜索</a></p></li>
<li><p><a href="/docs/zh/with-iterators.md">搜索迭代器</a></p></li>
<li><p><a href="/docs/zh/get-and-scalar-query.md">查询</a></p></li>
<li><p><a href="/docs/zh/full-text-search.md">全文搜索</a></p></li>
<li><p><a href="/docs/zh/keyword-match.md">文本匹配</a></p></li>
</ul>
<p>此外，Milvus 还提供了一些增强功能，以提升搜索性能和效率。这些功能默认处于禁用状态，您可以根据服务需求启用并使用它们。这些功能包括</p>
<ul>
<li><p><a href="/docs/zh/use-partition-key.md">使用Partition Key</a></p></li>
<li><p><a href="/docs/zh/mmap.md">使用 mmap</a></p></li>
<li><p><a href="/docs/zh/clustering-compaction.md">聚簇压缩</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">分区<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>分区是Collection的子集，与父Collection共享相同的字段集，每个分区包含实体的子集。</p>
<p>通过将实体分配到不同的分区中，您可以创建实体组。您可以在特定分区中进行搜索和查询，使 Milvus 忽略其他分区中的实体，从而提高搜索效率。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/manage-partitions.md">“管理分区</a>”。</p>
<h2 id="Shard" class="common-anchor-header">分片<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>分片是Collection的水平切片。每个分片对应一个数据输入通道。每个Collection默认都有一个分片。在创建Collection时，您可以根据预期的吞吐量以及要插入到Collection中的数据量，设置适当的分片数量。</p>
<p>有关如何设置分片数量的详细信息，请参阅《<a href="/docs/zh/create-collection.md">创建Collection》</a>。</p>
<h2 id="Alias" class="common-anchor-header">别名<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以为 Collections 创建别名。 一个Collection可以拥有多个别名，但不同Collection不能共享同一个别名。当收到针对某个Collection的请求时，Milvus 会根据提供的名称定位该Collection。如果该名称对应的Collection不存在，Milvus 会继续将该名称作为别名进行定位。您可以使用Collection别名来适应不同的代码场景。</p>
<p>有关更多详细信息，请参阅《<a href="/docs/zh/manage-aliases.md">管理别名</a>》。</p>
<h2 id="Function" class="common-anchor-header">函数<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以为 Milvus 设置函数，以便在创建 Collection 时派生字段。例如，全文搜索功能会使用用户定义的函数，从特定的 varchar 字段中派生出稀疏向量字段。有关全文搜索的更多信息，请参阅《<a href="/docs/zh/full-text-search.md">全文搜索</a>》。</p>
<h2 id="Consistency-Level" class="common-anchor-header">一致性级别<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>分布式数据库系统通常使用一致性级别来定义数据节点和副本之间的数据一致性。您可以在创建Collection或在Collection内进行相似度搜索时设置不同的一致性级别。适用的一致性级别包括<strong>“强一致”</strong>、<strong>“有限过时”</strong>、<strong>“会话一致</strong>”和<strong>“最终一致”</strong>。</p>
<p>有关这些一致性级别的详细信息，请参阅《<a href="/docs/zh/tune_consistency.md">一致性级别</a>》。</p>
