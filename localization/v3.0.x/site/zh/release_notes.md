---
id: release_notes.md
summary: Milvus 版本说明
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
    </button></h1><p>了解 Milvus 的新功能！本页面汇总了每个版本中的新功能、改进、已知问题和错误修复。建议您定期访问此页面，了解最新更新。</p>
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>发布日期：2026年7月29日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th><th>Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 正式发布！基于<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> 版本中引入的湖原生架构，此版本完成了 beta 版所开启的工作：外部 Collection 覆盖了更多湖屋工作流；Schema 支持在线添加、回填和删除；稀疏索引围绕 SINDI 进行了重建； StructArray 和分面搜索完善了检索引擎；FAISS 直通和 TEXT 扩展了索引及模态选项；Woodpecker 作为独立服务运行。</p>
<p>如果您是首次接触 3.0 系列，下文的“Core 3.0 功能回顾”部分总结了 3.0-beta 中引入的功能；完整的说明请参阅<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta 发布说明</a>。</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0 版本的新功能（相较于 3.0-beta）<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部Collection：更完善的湖屋工作流</h4><p>3.0-beta 版本引入了“外部 Collection”功能：原地引用湖存储文件、构建索引，并在无需将数据复制到 Milvus 的情况下进行检索。本次发布进一步扩展了该功能，以实现完整的湖存储检索工作流。 外部字段现可为函数输出字段（如 BM25 稀疏向量、MinHash 签名和文本 Embeddings）提供数据，因此文本和模型衍生检索字段可在 Milvus 内部构建，无需复制源表。 刷新功能还支持增量式模式演进：当外部表新增列时，Milvus 会修补受影响的段，而非重建整个 Collection。</p>
<p>此版本还新增了<code translate="no">milvus-table</code> 外部格式，该格式将Milvus快照元数据和Storage V3清单视为外部数据源，因此Collection快照本身可作为外部表提供服务——批处理和服务系统可获得基于同一数据清单的共享视图。</p>
<p>有关更多信息，请参阅《<a href="https://milvus.io/docs/v3.0.x/create-an-external-collection.md">创建外部Collection和</a> <a href="https://milvus.io/docs/v3.0.x/snapshots.md">快照》</a>。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">灵活的Schema：在线添加、补全和删除列</h4><p>在生产环境中，Schema 并非一成不变——嵌入模型会被替换、特征会迭代、字段会被废弃——而过去这些操作往往意味着需要重建整个 Collection，从而导致停机或双重写入。3.0.0 版本实现了闭环：在持续服务的同时，可以添加、填充和删除列。</p>
<p>补写支持双向操作。外部补写处理在 Milvus 外部计算的值：添加一列，对 Collection 进行快照以作为一致的起点，离线运行任务，将值写回，Milvus 会增量地为新列建立索引——这使得跨越数亿行数据的嵌入式模型升级成为无需停机的热路径。 内部回填则处理内核生成的值：将 BM25 或 MinHash 函数附加到现有 Collection 后，其输出字段会自动基于现有数据计算得出。</p>
<p>有关更多信息，请参阅《<a href="https://milvus.io/docs/v3.0.x/add-fields-to-an-existing-collection.md">向现有Collection添加字段》</a>。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">稀疏索引全面升级：SINDI、Block-Max WAND 和 Block-Max MaxScore</h4><p>Milvus 3.0 对稀疏向量索引进行了全面升级。它引入了新的搜索算法<a href="https://arxiv.org/abs/2509.08395">——SINDI</a>、Block-Max WAND 和 Block-Max MaxScore——同时还支持倒排列表压缩、可配置量化以及按工作负载选择搜索算法。 此外，mmap 加载、序列化和 BM25 评分机制也得到了优化，从而降低了大规模稀疏向量和全文搜索的索引存储及加载开销。 在内部基准测试中，在可比召回率下，压缩后的 BM25 索引大小约为 2.6 稀疏索引的 1/3；而在基于学习型稀疏 Embeddings 的场景中，SINDI 的 QPS 最高可达 MaxScore 的 10 倍左右。 启用新索引版本后（参见“兼容性与行为说明”），SINDI 将成为稀疏 IP 搜索的默认选项，而 MaxScore 将成为 BM25 的默认选项。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray 支持范围</h4><p>StructArray 现支持空值、位图索引、对在线 Collection 的 Dynamic Field 添加，以及通过 upsert 对结构体字段进行部分更新，并提供相应的 REST 和批量导入支持。</p>
<p>元素级搜索新增了跨向量子字段的混合搜索，支持按实体配置折叠方式（最大值/求和/平均值/前k个变体），并可在其中进行范围搜索和分组操作。嵌套过滤支持<code translate="no">element_filter</code> 谓词、<code translate="no">MATCH_ANY</code> /<code translate="no">MATCH_ALL</code> /<code translate="no">MATCH_LEAST</code> /<code translate="no">MATCH_MOST</code> /<code translate="no">MATCH_EXACT</code> 量词、位置子字段访问（如<code translate="no">tags[0][name]</code> ）以及针对结构体列的<code translate="no">array_length()</code> 操作。</p>
<p>有关更多信息，请参阅<a href="https://milvus.io/docs/v3.0.x/array-of-structs.md">StructArray</a>和<a href="https://milvus.io/docs/v3.0.x/struct-array-operators.md">StructArray 操作符</a>。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">搜索聚合与分面搜索</h4><p>测试版中的查询聚合会对过滤后的数据计算精确统计数据；3.0.0 版本在搜索路径中添加了分面功能。在搜索时指定一个分面字段，Milvus 将返回排名前列的分面值，每个值由其在 ANN 排名中匹配度最高的成员代表，并标注有 COUNT 和 AVG 等聚合统计信息 ——在单次请求中即可获得分面搜索侧边栏（品牌、价格范围、属性）的结果，而无需在客户端进行过度检索和计数。</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">函数链重新排序<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>现在可以通过函数链 API 对重新排序进行组合，该 API 作为单个搜索请求的一部分，执行有序且带类型的管道。 一条链可以结合 QueryNode 上的早期 L0 重新评分与 Proxy 上的 L2 后缩减重新排序，支持评分转换与组合、基于模型的重新排序、排序以及候选项筛选，且无需客户端协调。 此版本还新增了针对 L0 重新排序的原生 XGBoost 评分功能，该功能使用注册为 FileResources 的 UBJ 模型，同时引入了 Hugging Face 推理提供程序，用于服务器管理的文本嵌入和句子相似度重新排序。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 长文本字段</h4><p>TEXT字段使长文本成为第一类数据，并取消了存储层面的长度限制：它们支持<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 和BM25。小于64 KB的值保持内联存储；更大的值则存储在分区级别的Vortex格式LOB文件中，而列中仅存储<code translate="no">(file_id, offset)</code> 引用。 LOB 文件在各分段间共享，因此压缩操作仅需移动引用而非重写文本。对于 RAG 而言，这意味着可通过单次 I/O 从同一存储中检索向量和源文本——无需操作外部 blob 存储。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS 索引直通</h4><p>新的<code translate="no">FAISS</code> 索引类型通过<code translate="no">faiss_index_name</code> 参数接受任意Faiss索引生成器字符串——<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> ——并传递搜索参数，因此Faiss配置方案可直接在Milvus上复现。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">支持 Vortex 和 Lance 格式</h4><p>存储层新增了两种开放的列式格式：Vortex作为下一代内部格式——支持自适应编码（字典编码、RLE、位打包、浮点数专用压缩），零拷贝解压，并针对向量与标量混合工作负载进行了优化；此外，Lance与Parquet并行，用于开放生态系统的数据交换。 Vortex 将成为默认的内部格式，其路线图中还包含过滤器下推和本地变体功能。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker 独立部署</h4><p>作为流式写入路径核心的 WAL（写入前日志）组件 Woodpecker，现可作为独立服务部署，而非嵌入其他节点——具备独立扩展、故障隔离和可观测性，如同任何其他微服务。这对大型集群和高写入工作负载尤为重要。</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0 功能回顾<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>以下功能在<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>版本中引入，并已纳入 3.0.0 正式版；完整说明请参阅 beta 版本说明。</p>
<ul>
<li><strong>外部Collection</strong>——原地查询湖仓数据（Parquet、Lance、Iceberg、Vortex）：零拷贝、只读，并通过增量刷新进行同步。</li>
<li><strong>快照</strong>— 通过分段引用生成特定时间点的只读Collection视图，边际存储成本近乎为零。</li>
<li><strong>存储 V3（Loon）</strong>——基于清单的对象存储列式存储；是快照和外部 Collection 的基础。</li>
<li><strong>查询/搜索 ORDER BY</strong>— 支持服务器端多字段排序，每个字段均可设置 ASC/DESC。</li>
<li><strong>查询聚合</strong>— 支持带分组的 COUNT / SUM / AVG / MIN / MAX，在服务器端进行计算。</li>
<li><strong>EmbList + DiskANN</strong>—— 针对 StructArray 嵌入列表的磁盘多向量索引，包含 Muvera 和 Lemur 等加速路径。</li>
<li><strong>MinHash 函数（doc-in、doc-out）</strong>——服务器端的 MinHash 签名，配合<code translate="no">MINHASH_LSH</code> 实现近似重复检测。</li>
<li><strong>可为空向量</strong>— 所有六种向量类型均支持NULL；搜索会跳过NULL行，且AddField功能已扩展至向量字段。</li>
<li><strong>实体 TTL</strong>— 由 TIMESTAMPTZ 字段驱动的按行过期机制。</li>
<li><strong>FileResource</strong>— 用于分析器、BM25 和文本匹配的集群管理的词典、同义词列表和停用词列表。</li>
<li><strong>强制合并</strong>— 由操作符触发的分段压缩，支持同步或异步模式。</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">兼容性与行为说明<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3（Loon）默认处于禁用状态。</strong>依赖于它的功能（如快照和 TEXT 字段）需要通过<code translate="no">common.storage.useLoonFFI</code> 手动启用。Storage V3 将在后续版本中默认启用。</li>
<li><strong>保证 2.6 → 3.0 的兼容性和回滚——</strong>3.0 部署可回滚至 2.6。但是，一旦启用或使用了会更改序列化数据格式的功能（例如 Storage V3），则无法再进行回滚。</li>
<li><strong>目前新索引版本需手动启用。</strong>新引入的索引算法<strong>在</strong>生效前需要手动将目标索引版本提升（例如将<code translate="no">dataCoord.targetVecIndexVersion</code> 设为 10，<code translate="no">dataCoord.targetScalarIndexVersion</code> 设为 4）；后续版本将默认启用这些功能。</li>
<li><strong>GPU 镜像已迁移至 CUDA 12.9</strong>，且不再保留与 Ubuntu 20.04 的 GPU 兼容性。</li>
</ul>
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
<p>Milvus 3.0-beta 通过与 OpenLake 生态系统的新集成扩展了 Milvus 向量数据库：External Collection 使 Milvus 能够以零拷贝方式查询外部 Lake 表，而 Spark 则可通过 Snapshot 直接读取 Milvus Collections。 此次发布还带来了更丰富的检索功能、更具表现力的 Schema、更深入的文本搜索定制、更精细的数据和模型生命周期控制，以及更多操作符级别的控制选项。Milvus 3.0 是 Zilliz Lakebase 的核心内核，为其统一的服务、发现和批处理提供支持。</p>
<p>观看下方视频，深入了解 Milvus 3.0 并参与与核心维护者的 AMA 问答环节：</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">External Collection</h4><p>在典型的 AI 数据管道中，数 TB 的 Embeddings 和元数据已作为 Parquet、Lance 或 Iceberg 表存储在对象存储中。将这些数据复制到 Milvus 会使存储成本翻倍，增加必须保持同步的 ETL 管道，并导致数据治理权脱离客户掌控。</p>
<p>“外部 Collection”消除了数据复制的需求。Milvus Collection 可直接引用数据原生存储位置的文件，而 Milvus 仅负责管理 Schema、索引和查询执行。 增量刷新机制确保 Collection 与底层文件保持同步。对于数据无法离开数据湖的客户（如金融和医疗团队），可在数据原地运行向量检索。单个驻留于数据湖的数据集也可同时由多个 Milvus 实例提供服务。</p>
<p>如需了解更多信息，请参阅《<a href="/docs/zh/create-an-external-collection.md">创建外部Collection》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服务和批量发现通常需要同时访问同一个 Collection。A/B 模型评估、大规模去重、回填验证以及版本回滚等操作，在写入仍在进行时，都需要 Collection 的稳定视图。</p>
<p>快照通过引用现有分段（而非复制数据）来创建 Collection 的某个时间点的只读视图，因此边际存储成本接近于零。在 MVCC 风格的隔离机制下，批处理任务可以从快照中读取数据，而实时 Collection 则继续接受写入操作。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/snapshots.md">“快照”</a>、<a href="/docs/zh/manage-snapshots.md">“管理快照</a>”和<a href="/docs/zh/snapshot-use-cases.md">“快照用例”</a>。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查询/搜索排序</h4><p>搜索和查询现支持多字段排序，排序操作已下推至Milvus内核，且每个字段均可设置<code translate="no">ASC</code> /<code translate="no">DESC</code> 参数。这弥补了生产环境中常见的缺陷：当最相似的项目并非最便宜、最新或最受欢迎时，仅基于距离的Top-K排序往往无法满足业务需求。</p>
<p>应用程序不再需要过度检索结果并在客户端重新排序来实现复合排名。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">按标量字段排序搜索结果</a>》和《<a href="/docs/zh/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">排序查询结果</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查询聚合</h4><p>过去，要从 Milvus Collection 中生成租户分布统计、字段完整性计数或版本发布进度，需要将匹配的实体拉回客户端并在那里进行聚合。 Milvus 3.0 将 SQL 风格的标量聚合推入内核。查询调用支持 `<code translate="no">group_by_fields</code> ` 以及 `<code translate="no">output_fields</code>` 中的聚合表达式，包括 `<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>` 和 `<code translate="no">max(&lt;field&gt;)</code>`。聚合在过滤后于服务器端进行评估。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">“聚合查询结果</a>”。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>Embeddings通常是异步生成的，因此实体可能在其向量生成之前就已到达。 多模态数据本身也存在天然缺失，例如没有字幕的视频或没有图片的产品。早期版本对此没有理想的解决方案：应用程序要么延迟写入直到向量准备就绪，要么填入占位符向量，这两种选择都会降低检索质量。</p>
<p>Milvus 3.0 支持在所有六种向量类型的向量字段中使用 NULL。搜索会自动跳过 NULL 向量，检索质量不受影响，且 NULL 向量实际上不占用存储空间。<code translate="no">AddField</code> 功能也扩展到了此次变更涉及的向量字段：通过 `<code translate="no">nullable=True</code>`，现有 Collection 可在不重建的情况下在线扩展新的向量字段。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/nullable-and-default.md">可为空字段</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自定义词典与同义词词典</h4><p>开箱即用的分词器并不总能满足生产环境的搜索质量要求。中文、医学、法律和化学等垂直领域，以及多语言语料库，均可从自定义词典和同义词表中获益匪浅。此前，这些资源主要以应用程序侧的查询重写形式存在。</p>
<p>Milvus 3.0 引入了 FileResource 机制，用于注册自定义分词器词典、同义词表、停用词表以及复合词拆分规则。 资源注册后，可在任何分词器或过滤器中引用，并适用于 BM25、分析器和文本匹配功能。词典和同义词现可进行版本控制并集中管理，无需分散在应用程序代码中。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/manage-file-resources.md">管理文件资源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">实体 TTL</h4><p>对于许多生命周期和合规性场景而言，Collection 级和分区级的 TTL 过于粗放。同一 Collection 内的不同租户通常具有不同的保留规则，且单个实体的过期时间表可能需要与 Collection 中的其他实体不一致。</p>
<p>Milvus 3.0 支持按实体设置 TTL。在 Schema 中声明一个<code translate="no">TIMESTAMPTZ</code> 字段，通过 Collection 属性将其标记为 TTL 字段，Milvus 便会自动回收已过期的实体。这涵盖了“被遗忘权”请求、过期的会话数据以及有限的对话历史记录，且无需应用程序端进行清理。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">设置实体级 TTL</a>》。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（文档输入、文档输出）</h4><p>Milvus 2.6 添加了用于集合式近似重复检测的<code translate="no">MINHASH_LSH</code> 索引，但应用程序在将数据写入 Milvus 之前仍需计算 MinHash 签名。</p>
<p>Milvus 3.0 引入了服务器端的 MinHash 函数。在 Schema 中声明一个<code translate="no">VARCHAR</code> 输入字段和一个<code translate="no">BINARY_VECTOR</code> 输出字段，并关联一个<code translate="no">FunctionType.MINHASH</code> 函数，Milvus 便会在插入、批量插入和搜索过程中自动计算签名。结合<code translate="no">MINHASH_LSH</code> ，这支持 Milvus 内部针对大型数据集的去重工作流、指纹识别以及抄袭检测。</p>
<p>有关更多信息，请参阅<a href="/docs/zh/minhash-function.md">MinHash 函数</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>“一个实体 = 一个向量”的假设已不再适用于现代检索。长文档会被拆分为多个片段，ColBERT 等晚期交互模型会为每个令牌生成一个向量，而多模态实体可能包含多种视图。</p>
<p>EmbList 为每个实体存储一个可变长度的向量列表，并以<code translate="no">DISKANN</code> 作为磁盘索引。当语料库规模超过内存预算时，该磁盘路径可有效控制内存占用。EmbList +<code translate="no">DISKANN</code> 是本次RC版本中更广泛的StructList家族的首个变体。 该家族的其余部分，包括 StructList 过滤以及 Muvera / Lemur 多向量加速功能，计划在 3.0 正式版中发布。</p>
<p>更多信息请参阅《<a href="/docs/zh/search-with-embedding-lists.md">使用Embeddings列表进行搜索</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">强制合并</h4><p>生产环境中的工作负载会随着时间推移积累分段碎片，从而导致查询延迟波动和存储空间膨胀。</p>
<p>Milvus 3.0 增加了在非高峰时段显式触发分段压缩的功能，支持同步和异步两种模式。</p>
<p>有关更多信息，请参阅《<a href="/docs/zh/force-merge.md">强制合并压缩</a>》。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 推出了 Storage V3，这是一种基于清单的列式存储引擎，其数据和元数据存储在兼容 S3 的对象存储中。每个数据集版本都被封装为不可变的清单快照——这是一个 Avro 编码文件，记录了构成该数据集的列组、增量日志和统计信息。</p>
<p>清单是紧凑的 Avro 文件，增量日志记录实体级别的删除操作，而无需重写数据文件。这确保了随着数据集的增长，元数据开销保持在较低水平。此外，清单还将元数据追踪与查询路径解耦，使 Collection 能够管理更多分段，同时不会降低查询性能。</p>
<p>由于状态存储在对象存储中，数据集具有自描述性：任何能够访问存储路径的读取者，无需中央目录即可发现并解析数据集。这一特性为外部Collection、快照以及未来的湖存储集成提供了基础。</p>
