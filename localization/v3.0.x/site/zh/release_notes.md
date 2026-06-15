---
id: release_notes.md
summary: Milvus 版本说明
title: 发布说明
---
<h1 id="Release-Notes" class="common-anchor-header">发布说明<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>了解 Milvus 新功能！本页面汇总了每个版本中的新功能、改进、已知问题和错误修复。建议您定期访问此页面，了解最新更新。</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta 通过与 Open Lake 生态系统的全新集成扩展了 Milvus 向量数据库：External Collection 使 Milvus 能够零拷贝查询外部 Lake 表，而 Spark 可以通过 Snapshot 直接读取 Milvus Collections。 此版本还带来了更丰富的检索功能、更具表现力的 Schema、更深入的文本搜索定制、更精细的数据和模型生命周期控制，以及更多操作员级别的控制。Milvus 3.0 是 Zilliz Lakebase 的核心内核，为其统一的服务、发现和批处理提供支持。</p>
<p>观看下方视频，深入了解 Milvus 3.0 并参与核心维护者的 AMA 问答：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">主要功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">External Collection</h4><p>在典型的 AI 数据管道中，数 TB 的 Embeddings 和元数据通常已作为 Parquet、Lance 或 Iceberg 表存储在对象存储中。将这些数据复制到 Milvus 会使存储成本翻倍，增加必须保持同步的 ETL 管道，并导致数据治理权脱离客户掌控。</p>
<p>外部 Collection 消除了复制需求。Milvus Collection 可直接引用数据原生存储位置，Milvus 仅负责管理 Schema、索引和查询执行。 增量刷新机制确保 Collections 与底层文件保持同步。对于数据无法离开数据湖的客户（如金融和医疗团队），可在数据原地运行向量检索。单个驻留数据湖的数据集也可由多个 Milvus 实例同时提供服务。</p>
<p>如需了解更多信息，请参阅《<a href="/docs/zh/create-an-external-collection.md">创建外部Collection》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服务和批量发现通常需要同时访问同一个 Collection。A/B 模型评估、大规模去重、回填验证以及版本回滚，在写入仍在进行时，都需要 Collection 的稳定视图。</p>
<p>快照通过引用现有分段而非复制数据，为 Collection 创建一个特定时间点的只读视图，因此边际存储成本接近于零。在 MVCC 风格的隔离机制下，批处理任务可从快照中读取数据，而实时 Collection 则继续接受写入操作。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/snapshots.md">“快照”</a>、<a href="/docs/zh/manage-snapshots.md">“管理快照</a>”和<a href="/docs/zh/snapshot-use-cases.md">“快照用例”</a>。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查询 / 搜索 Order By</h4><p>搜索和查询现支持多字段排序，排序操作已下推至Milvus内核，且可针对每个字段设置<code translate="no">ASC</code> /<code translate="no">DESC</code> 参数。这解决了生产环境中的常见痛点：当最相似的项并非最便宜、最新或最受欢迎时，仅基于距离的Top-K排序往往无法满足业务需求。</p>
<p>应用程序不再需要过度检索结果并在客户端重新排序来实现复合排名。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">按标量字段排序搜索结果</a>》和《<a href="/docs/zh/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">排序查询结果</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查询聚合</h4><p>过去，要从 Milvus Collection 中生成租户分布统计、字段完整性计数或版本发布进度，需要将匹配的实体拉回客户端并在那里进行聚合。 Milvus 3.0 将 SQL 风格的标量聚合推入内核。查询调用接受 `<code translate="no">group_by_fields</code> ` 以及 `<code translate="no">output_fields</code>` 中的聚合表达式，包括 `<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>` 和 `<code translate="no">max(&lt;field&gt;)</code>`。聚合在过滤后在服务器端进行评估。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">聚合查询结果</a>。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>Embeddings通常是异步生成的，因此实体可能在其向量到达之前就已到达。 多模态数据本身也存在天然缺失，例如没有字幕的视频或没有图片的产品。早期版本对此没有好的解决方案：应用程序要么延迟写入直到向量准备就绪，要么填充一个占位符向量，这两种选择都会损害检索质量。</p>
<p>Milvus 3.0 支持所有六种向量类型的向量字段中的 NULL 值。搜索会自动跳过 NULL 向量，检索质量不受影响，且 NULL 向量实际上不占用存储空间。<code translate="no">AddField</code> 也扩展到了此变更下的向量字段：通过 `<code translate="no">nullable=True</code>`，现有 Collection 可以在不重建的情况下在线扩展新的向量字段。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/nullable-and-default.md">可为空字段</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自定义词典与同义词词典</h4><p>开箱即用的分词器并不总能满足生产环境的搜索质量要求。中文、医学、法律和化学等垂直领域，以及多语言语料库，均可从自定义词典和同义词表中获益匪浅。此前，这些资源主要以应用程序侧的查询重写形式存在。</p>
<p>Milvus 3.0 引入了 FileResource 机制，用于注册自定义分词器词典、同义词表、停用词表以及拆分规则。 资源注册后，可在任何分词器或过滤器中引用，并适用于 BM25、分析器和文本匹配功能。词典和同义词现可进行版本控制并集中管理，不再分散在应用程序代码中。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/manage-file-resources.md">管理文件资源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">实体 TTL</h4><p>对于许多生命周期和合规性场景而言，Collection 级和分区级的 TTL 过于粗略。同一 Collection 内的不同租户通常具有不同的保留规则，且个别实体可能需要按照与 Collection 其余部分不一致的计划过期。</p>
<p>Milvus 3.0 支持按实体设置 TTL。在 Schema 中声明一个 `<code translate="no">TIMESTAMPTZ</code> ` 字段，通过 Collection 属性将其标记为 TTL 字段，Milvus 便会自动回收已过期的实体。这涵盖了“被遗忘权”请求、过期的会话数据以及有限的对话历史记录，且无需应用程序端进行清理。</p>
<p>更多信息，请参阅《<a href="/docs/zh/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">设置实体级 TTL</a>》。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（文档输入、文档输出）</h4><p>Milvus 2.6 引入了用于集合式近似重复检测的<code translate="no">MINHASH_LSH</code> 索引，但应用程序在将数据写入 Milvus 之前仍需计算 MinHash 签名。</p>
<p>Milvus 3.0 引入了服务器端的 MinHash 函数。在 Schema 中声明一个<code translate="no">VARCHAR</code> 输入字段和一个<code translate="no">BINARY_VECTOR</code> 输出字段，并关联一个<code translate="no">FunctionType.MINHASH</code> 函数，Milvus 便会在插入、批量插入和搜索过程中计算签名。结合<code translate="no">MINHASH_LSH</code> ，这支持 Milvus 内部针对大型数据集的去重工作流、指纹识别以及抄袭检测。</p>
<p>更多信息，请参阅<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>“一个实体 = 一个向量”的假设已不再适用于现代检索。长文档会被拆分为多个片段，ColBERT 等晚期交互模型会为每个令牌生成一个向量，而多模态实体可能包含多种视图。</p>
<p>EmbList为每个实体存储一个可变长度的向量列表，并以<code translate="no">DISKANN</code> 作为磁盘索引。当语料库超过内存预算时，磁盘路径可有效控制RAM使用量。EmbList +<code translate="no">DISKANN</code> 是本次RC版本中更广泛的StructList家族的首个变体。 该家族的其余部分，包括 StructList 过滤以及 Muvera / Lemur 多向量加速功能，计划在正式的 3.0 版本中发布。</p>
<p>更多信息请参阅《<a href="/docs/zh/search-with-embedding-lists.md">使用Embeddings列表进行搜索</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">强制合并</h4><p>生产工作负载会随着时间的推移积累分段碎片，从而导致查询延迟波动和存储膨胀。</p>
<p>Milvus 3.0 增加了在非高峰时段显式触发分段压缩的功能，支持同步和异步两种模式。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/force-merge.md">强制合并压缩</a>。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 引入了 Storage V3，这是一个基于清单的列式存储引擎，其中数据和元数据存储在兼容 S3 的对象存储中。每个数据集版本都被捕获为一个不可变的清单快照，这是一个 Avro 编码的文件，记录了构成该数据集的列组、增量日志和统计信息。</p>
<p>清单是紧凑的 Avro 文件，增量日志记录实体级别的删除操作，而无需重写数据文件。这使得随着数据集的增长，元数据开销得以保持在较低水平。此外，清单将元数据追踪与查询路径解耦，使 Collection 能够管理更多分段，同时不会降低查询性能。</p>
<p>由于状态存储在对象存储中，数据集具有自描述性：任何能够访问存储路径的读取者均可发现并解析数据集，无需依赖中央目录。这一特性为外部Collection、快照以及未来的湖存储集成提供了基础。</p>
