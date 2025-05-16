---
id: manage-collections.md
title: 集合说明
summary: >-
  在 Milvus 上，您可以创建多个 Collections 来管理数据，并将数据作为实体插入到 Collections 中。Collections
  和实体类似于关系数据库中的表和记录。本页可帮助你了解 Collections 及相关概念。
---
<h1 id="Collection-Explained" class="common-anchor-header">集合说明<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 上，您可以创建多个 Collections 来管理数据，并将数据作为实体插入到 Collections 中。Collections 和实体类似于关系数据库中的表和记录。本页将帮助你了解 Collection 及其相关概念。</p>
<h2 id="Collection" class="common-anchor-header">Collections<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Collection 是一个二维表，具有固定的列和变化的行。每列代表一个字段，每行代表一个实体。</p>
<p>下图显示了一个有 8 列和 6 个实体的 Collection。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>集合说明</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Schema 和字段<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>在描述一个对象时，我们通常会提到它的属性，如大小、重量和位置。您可以将这些属性用作 Collection 中的字段。每个字段都有各种约束属性，例如向量字段的数据类型和维度。通过创建字段并定义其顺序，可以形成一个 Collections Schema。有关可能适用的数据类型，请参阅<a href="/docs/zh/schema.md">Schema 解释</a>。</p>
<p>您应在要插入的实体中包含所有 Schema 定义的字段。要使其中一些字段可选，可考虑启用动态字段。有关详情，请参阅<a href="/docs/zh/enable-dynamic-field.md">动态</a>字段。</p>
<ul>
<li><p><strong>使其为空或设置默认值</strong></p>
<p>有关如何使字段无效或设置默认值的详细信息，请参阅无效<a href="/docs/zh/nullable-and-default.md">和默认</a>。</p></li>
<li><p><strong>启用动态字段</strong></p>
<p>有关如何启用和使用动态字段的详细信息，请参阅<a href="/docs/zh/enable-dynamic-field.md">动态</a>字段。</p></li>
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
    </button></h2><p>与关系数据库中的主字段类似，Collection 也有一个主字段，用于将实体与其他实体区分开来。主字段中的每个值都是全局唯一的，并与一个特定的实体相对应。</p>
<p>如上图所示，名为<strong>id</strong>的字段是主字段，第一个 ID<strong>0</strong>对应一个名为 "<em>冠状病毒的死亡率并不重要</em>"的实体。不会有其他实体的主字段为 0。</p>
<p>主字段只接受整数或字符串。插入实体时，默认情况下应包含主字段值。但是，如果在创建 Collections 时启用了<strong>AutoId</strong>，Milvus 将在插入数据时生成这些值。在这种情况下，请从要插入的实体中排除主字段值。</p>
<p>有关详细信息，请参阅 "<a href="/docs/zh/primary-field.md">主字段和自动标识</a>"。</p>
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
    </button></h2><p>为特定字段创建索引可提高搜索效率。建议您为服务所依赖的所有字段创建索引，其中必须为向量字段创建索引。</p>
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
    </button></h2><p>实体是指在 Collections 中共享同一组字段的数据记录。同一行中所有字段的值构成一个实体。</p>
<p>您可以根据需要在 Collections 中插入任意数量的实体。但是，随着实体数量的增加，所占用的内存大小也会增加，从而影响搜索性能。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/schema.md">Schema Explained</a>。</p>
<h2 id="Load-and-Release" class="common-anchor-header">加载和释放<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>加载集合是在集合中进行相似性搜索和查询的前提。加载 Collections 时，Milvus 会将所有索引文件和每个字段中的原始数据加载到内存中，以便快速响应搜索和查询。</p>
<p>搜索和查询是内存密集型操作。为节约成本，建议您释放当前不使用的 Collections。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/load-and-release.md">加载和释放</a>。</p>
<h2 id="Search-and-Query" class="common-anchor-header">搜索和查询<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>创建索引并加载 Collections 后，就可以通过输入一个或多个查询向量开始相似性搜索。例如，当接收到搜索请求中携带的查询向量表示时，Milvus 会使用指定的度量类型来衡量查询向量与目标 Collections 中的向量之间的相似性，然后再返回与查询语义相似的向量。</p>
<p>你还可以在搜索和查询中加入元数据过滤功能，以提高搜索结果的相关性。请注意，元数据过滤条件在查询中是强制性的，但在搜索中是可选的。</p>
<p>有关适用度量类型的详细信息，请参阅<a href="/docs/zh/metric.md">度量类型</a>。</p>
<p>有关搜索和查询的更多信息，请参阅搜索和 Rerankers 章节中的文章，其中包括基本功能：</p>
<ul>
<li><p><a href="/docs/zh/single-vector-search.md">基本 ANN 搜索</a></p></li>
<li><p><a href="/docs/zh/filtered-search.md">过滤搜索</a></p></li>
<li><p><a href="/docs/zh/range-search.md">范围搜索</a></p></li>
<li><p><a href="/docs/zh/grouping-search.md">分组搜索</a></p></li>
<li><p><a href="/docs/zh/multi-vector-search.md">混合搜索</a></p></li>
<li><p><a href="/docs/zh/with-iterators.md">搜索迭代器</a></p></li>
<li><p><a href="/docs/zh/get-and-scalar-query.md">查询</a></p></li>
<li><p><a href="/docs/zh/full-text-search.md">全文搜索</a></p></li>
<li><p><a href="/docs/zh/keyword-match.md">文本匹配</a></p></li>
</ul>
<p>此外，Milvus 还提供了提高搜索性能和效率的增强功能。这些增强功能默认为禁用，您可以根据自己的服务要求启用和使用它们。它们是</p>
<ul>
<li><p><a href="/docs/zh/use-partition-key.md">使用 Partition Key</a></p></li>
<li><p><a href="/docs/zh/mmap.md">使用 mmap</a></p></li>
<li><p><a href="/docs/zh/clustering-compaction.md">集群压缩</a></p></li>
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
    </button></h2><p>分区是集合的子集，与其父集合共享相同的字段集，每个分区包含一个实体子集。</p>
<p>通过将实体分配到不同的分区，可以创建实体组。你可以在特定分区中进行搜索和查询，让 Milvus 忽略其他分区中的实体，提高搜索效率。</p>
<p>有关详情，请参阅<a href="/docs/zh/manage-partitions.md">管理分区</a>。</p>
<h2 id="Shard" class="common-anchor-header">分区<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>分区是 Collections 的水平切片。每个分区对应一个数据输入通道。每个 Collections 默认都有一个分区。创建 Collections 时，可以根据预期吞吐量和要插入 Collections 的数据量设置适当的分区数量。</p>
<p>有关如何设置分片数的详细信息，请参阅<a href="/docs/zh/create-collection.md">创建 Collections</a>。</p>
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
    </button></h2><p>您可以为您的集合创建别名。一个集合可以有多个别名，但集合不能共享一个别名。收到针对某个 Collection 的请求后，Milvus 会根据提供的名称定位该 Collection。如果所提供名称的 Collection 不存在，Milvus 会继续定位所提供名称的别名。你可以使用 Collections 别名来调整代码以适应不同的情况。</p>
<p>更多详情，请参阅<a href="/docs/zh/manage-aliases.md">管理别名</a>。</p>
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
    </button></h2><p>您可以为 Milvus 设置函数，以便在创建 Collections 时派生字段。例如，全文搜索功能使用用户定义函数从特定 varchar 字段推导出稀疏向量字段。有关全文搜索的更多信息，请参阅全文<a href="/docs/zh/full-text-search.md">搜索</a>。</p>
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
    </button></h2><p>分布式数据库系统通常使用一致性级别来定义跨数据节点和副本的数据相同性。在创建 Collections 或在 Collections 中进行相似性搜索时，可以分别设置不同的一致性级别。适用的一致性级别包括<strong>强</strong>、<strong>有限制的不稳定性</strong>、<strong>会话</strong>和<strong>最终</strong>。</p>
<p>有关这些一致性级别的详细信息，请参阅<a href="/docs/zh/tune_consistency.md">一致性</a>级别。</p>
