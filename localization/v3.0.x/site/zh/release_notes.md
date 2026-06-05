---
id: release_notes.md
summary: Milvus 发行说明
title: 版本说明
---
<h1 id="Release-Notes" class="common-anchor-header">版本说明<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>了解 Milvus 的新功能！本页总结了每个版本的新功能、改进、已知问题和错误修复。我们建议您定期访问此页面，了解更新信息。</p>
<h2 id="v30-beta" class="common-anchor-header">版本 3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026 年 5 月 9 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta 开始了 Milvus 从向量数据库向语义原生湖引擎的转变。Milvus 内核现在可以直接操作开放湖格式的数据，Milvus 的核心功能也在检索、Schema、生命周期、语言和操作符方面得到了扩展。</p>
<p>外部收集和快照是湖方面新增的主要功能。基于 Milvus 3.0 的语义原生数据平台 Zilliz Lakebase 也采用了相同的内核。</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部 Collections</h4><p>在典型的人工智能数据管道中，数 TB 的嵌入和元数据已经以 Parquet、Lance 或 Iceberg 表的形式存在于对象存储中。将这些数据复制到 Milvus 会使存储成本翻倍，增加一个必须保持同步的 ETL 管道，并将数据管理从客户手中转移出去。</p>
<p>外部 Collections 可以消除复制。Milvus Collections 可以引用已经存在的文件，Milvus 只管理 Schema、索引和查询执行。增量刷新可使 Collections 与底层文件保持一致。数据不能离开数据湖的客户，如财务和医疗保健团队，可以在数据所在的地方对这些数据运行向量检索。也可以同时从多个 Milvus 实例提供单个驻湖数据集。</p>
<p>更多信息，请参阅<a href="/docs/zh/create-an-external-collection.md">创建外部 Collections</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服务和批量发现经常需要同时使用同一个 Collection。A/B 模型评估、大规模重复数据删除、回填验证和版本回滚都需要在写入时对 Collections 进行稳定查看。</p>
<p>快照通过引用现有段而不是复制数据，创建了一个 Collection 的时间点只读视图，因此边际存储成本接近于零。批处理任务可以在 MVCC 类型的隔离下从快照中读取数据，同时实时 Collections 继续接受写入。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/snapshot-use-cases.md">快照</a>、<a href="/docs/zh/manage-snapshots.md">管理快照</a>和<a href="/docs/zh/snapshot-use-cases.md">快照使用案例</a>。</p>
<h4 id="External-Backfill" class="common-anchor-header">外部回填</h4><p>升级嵌入模型，例如在现有 Collections 上从 v1 嵌入升级到 v2 嵌入，过去意味着要从头开始重建。这就迫使服务停机或在应用程序端进行双重写入逻辑。</p>
<p>Milvus 3.0 支持作为热工作流进行升级。您可以通过<code translate="no">AddCollectionField</code> 添加一个新的向量字段，使用快照冻结一个一致的起点，针对快照离线运行嵌入作业，并通过正常的摄取路径写回值。新字段在线编入索引后，应用程序可以在不停机的情况下进行切换。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查询/搜索排序</h4><p>搜索和查询现在可接受多字段排序，排序推送到 Milvus 内核，每个字段可设置<code translate="no">ASC</code> /<code translate="no">DESC</code> 。这弥补了一个常见的生产差距：当最相似的项目不是最便宜、最新或最受欢迎时，仅按距离排序往往不能满足业务需求。</p>
<p>应用程序不再需要在客户端上过度获取结果和重新排序，以表达综合排名。</p>
<p>如需了解更多信息，请参阅<a href="/docs/zh/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">按标量字段排序搜索结果</a>和<a href="/docs/zh/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">查询结果排序</a>。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>Embeddings 通常是异步生成的，因此实体可能会在其向量到达之前到达。多模态数据也有天然的空白，例如没有字幕的视频或没有图片的产品。早期版本没有很好的解决办法：应用程序要么延迟写入，直到向量准备就绪，要么填入一个占位向量，而这两种选择都会损害检索质量。</p>
<p>Milvus 3.0 支持所有六种向量类型的向量字段上的 NULL。搜索会自动跳过 NULL 向量，检索质量不受影响，而且 NULL 向量实际上不占用任何存储空间。<code translate="no">AddField</code> 也在这一变更下扩展到了向量字段：通过<code translate="no">nullable=True</code> ，现有的 Collections 可以在线增长新的向量字段，而无需重建。</p>
<p>有关详细信息，请参阅 "<a href="/docs/zh/nullable-and-default.md">可空字段</a>"。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自定义字典和同义词字典</h4><p>开箱即用的标记化器并不总能满足生产搜索的质量要求。中文、垂直领域（如医学、法律和化学）以及多语言语料库可以从自定义词典和同义词表中获益匪浅。到目前为止，这些资源大多是应用方查询重写。</p>
<p>Milvus 3.0 增加了一个 FileResource 机制，用于注册自定义标记符号字典、同义词表、停止词表和反编译规则。资源一旦注册，就可以从任何标记符或过滤器中引用，并在 BM25、分析器和文本匹配中生效。字典和同义词现在可以进行版本控制和集中管理，而不是分散在应用程序代码中。</p>
<p>有关详细信息，请参阅<a href="/docs/zh/manage-file-resources.md">管理文件资源</a>。</p>
<h4 id="Entity-TTL" class="common-anchor-header">实体 TTL</h4><p>对于许多生命周期和合规性场景来说，Collection 级别和分区级别的 TTL 都过于粗糙。同一 Collections 中的不同租户往往有不同的保留规则，个别实体可能需要按照与 Collections 其他部分不一致的时间表过期。</p>
<p>Milvus 3.0 支持每个实体的 TTL。在 Schema 中声明一个<code translate="no">TIMESTAMPTZ</code> 字段，通过 Collections 属性将其标记为 TTL 字段，Milvus 就会自动回收过期实体。这包括有权被遗忘的请求、过期的会话数据和有边界的对话历史，而无需在应用程序端进行清理。</p>
<p>更多信息，请参阅<a href="/docs/zh/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">设置实体级 TTL</a>。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（文档输入、文档输出）</h4><p>Milvus 2.6 增加了<code translate="no">MINHASH_LSH</code> 索引，用于基于集合的近似重复检测，但应用程序在将数据写入 Milvus 之前仍需计算 MinHash 签名。</p>
<p>Milvus 3.0 增加了服务器端 MinHash 函数。在 Schema 中声明<code translate="no">VARCHAR</code> 输入字段和<code translate="no">BINARY_VECTOR</code> 输出字段，附加<code translate="no">FunctionType.MINHASH</code> 函数，Milvus 就能在插入、批量插入和搜索时计算签名。与<code translate="no">MINHASH_LSH</code> 一起，这支持 Milvus 内部大型数据集的重复数据删除工作流、指纹识别和剽窃检测。</p>
<p>更多信息，请参阅<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>一个实体 = 一个向量 "的假设不再适合现代检索。长文档会被分割成许多块，ColBERT 等后期交互模型会对每个标记发出一个向量，而多模态实体可以携带多个视图。</p>
<p>EmbList 为每个实体存储一个长度可变的向量列表，<code translate="no">DISKANN</code> 作为磁盘索引。当语料库超出内存预算时，磁盘路径可以控制内存的使用。EmbList +<code translate="no">DISKANN</code> 是本 RC 中更广泛的 StructList 系列的第一个变体。该系列的其他部分，包括 StructList 过滤和 Muvera / Lemur 多向量加速，将在 3.0 正式版中发布。</p>
<p>更多信息，请参阅<a href="/docs/zh/search-with-embedding-lists.md">使用 Embeddings 列表搜索</a>。</p>
<h4 id="Force-Merge" class="common-anchor-header">强制合并</h4><p>生产工作负载会随着时间的推移而积累段碎片，从而导致查询延迟抖动和存储膨胀。</p>
<p>Milvus 3.0 增加了在同步和异步模式下，在非高峰窗口期间显式触发网段压缩的功能。</p>
<p>更多信息，请参阅<a href="/docs/zh/force-merge.md">强制合并压缩</a>。</p>
