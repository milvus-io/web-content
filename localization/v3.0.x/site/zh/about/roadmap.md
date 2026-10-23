---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: 了解 Milvus 在 3.0 和 3.1 版本中关于搜索、分析、模式演进、数据湖集成以及性能方面的路线图。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路线图<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 3.0 整合了多向量检索、SQL 风格查询、灵活的 Schema 以及对数据湖存储中数据的访问功能。后续阶段将在此基础上，提供更丰富的查询功能、更广泛的数据模型，并提升性能和可扩展性。本路线图概述了开源版 Milvus 的优先发展方向。</p>
<p>Milvus 3.0 自<strong>v3.0.1</strong> 版本起正式发布。下文所述的已发布功能均在<strong>v3.0.0</strong> 版本中引入；预览功能和需主动启用的功能将在相关位置予以标注。<strong>3.0.x</strong>系列在此基础上进一步扩展了这些功能，而<strong>3.1 版本计划于 2026 年 12 月发布</strong>。随着开发进程的推进，计划中的功能和目标日期可能会发生变化。</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">搜索与检索<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>检索路线图的重点在于将更多相关性信号整合到 Milvus 中，涵盖文本匹配、多向量表示、重新排序以及搜索结果分面等功能。</p>
<p><strong>3.0版本中已提供</strong></p>
<ul>
<li><strong>多向量检索：</strong>StructArray搜索支持Muvera和Lemur，并提供<code translate="no">element_filter</code> 用于元素级过滤。匹配策略包括<code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 以及<code translate="no">MATCH_EXACT</code> 。</li>
<li><strong>文本匹配与相似度：</strong>自定义词典和同义词可将文本检索功能适配至应用需求。正则表达式过滤支持模式匹配，而 MinHash 支持近似重复检测。</li>
<li><strong>重新排序与推理：</strong>Milvus 3.0 引入了首批“函数链”（Function Chain）重新排序功能，并搭载了 Hugging Face 推理提供程序。其余“函数链”功能计划在 3.0.x 版本中推出。</li>
<li><strong>搜索聚合：</strong>搜索聚合功能为搜索结果提供分面筛选。</li>
</ul>
<p><strong>计划在 3.0.x 版本中实现</strong></p>
<p>3.0.x 系列计划新增模糊匹配和全局统计功能，并全面支持 Function Chain。</p>
<p><strong>计划在 3.1 版本中实现</strong></p>
<p>计划包括基于 Grep 的检索、通过 ANN-filter 融合实现近似最近邻 (ANN) 搜索与过滤的更紧密集成，以及对稀疏检索的改进。</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">分析和 SQL 风格查询<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 正在扩展其查询引擎，以便应用程序在检索的同时对数据进行排序和聚合。下一阶段将添加连接、物化视图和自定义计算功能。</p>
<p><strong>3.0 版本已支持</strong></p>
<p>查询和搜索功能支持使用<code translate="no">ORDER BY</code> 进行排序。查询聚合功能新增了<code translate="no">GROUP BY</code> ，用于计算分组统计数据。</p>
<p><strong>计划在 3.1 版本中推出</strong></p>
<ul>
<li><strong>更丰富的查询功能：</strong>引入连接操作（首先支持半连接）以及物化视图 Collections。</li>
<li><strong>数据更新与完整性：</strong>支持就地更新，以及在数据摄入过程中对主键进行去重。</li>
<li><strong>查询迭代和 JSON 语义：</strong>添加有状态查询迭代器、JSON<code translate="no">GROUP BY</code> 以及 SQL / JSON NULL 语义。</li>
<li><strong>自定义计算：</strong>支持 Python 用户定义函数 (UDF)。</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">灵活的Schema和数据类型<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Schema方面的开发重点在于演进现有Collection，并支持表示更广泛的数据类型。这包括字段变更、多向量结构、长文本以及实体过期机制。</p>
<p><strong>3.0 版本中可用</strong></p>
<ul>
<li><strong>在线模式变更：</strong>现有 Collections 支持在线字段添加，包括向量和<code translate="no">Array&lt;Struct&gt;</code> 字段。删除字段功能处于<strong>预览</strong>阶段，可能存在限制。</li>
<li><strong>现有数据的回填：</strong>外部回填使用 Spark 连接器。内部回填将 BM25 或 MinHash 函数附加到 Collection 上，并针对现有数据计算其输出结果。</li>
<li><strong>文本和多向量数据：</strong> <code translate="no">TEXT</code> 类型用于存储长文本，而 StructArray 支持通过 `<code translate="no">MAX_SIM</code>` 进行延迟交互检索。<code translate="no">TEXT</code> 需要启用 Storage V3。</li>
<li><strong>NULL 值和过期：</strong>向量字段接受 NULL 值，实体级生存时间 (TTL) 控制过期。</li>
</ul>
<p><strong>3.0.x 版本计划功能</strong></p>
<p>计划中的 Schema 增强功能将扩展 StructArray 对类型、NULL 值以及字段添加和删除的支持。此外，还将为向量字段添加分子式支持以及<code translate="no">IS NULL</code> /<code translate="no">IS NOT NULL</code> 过滤器。</p>
<p><strong>计划在 3.1 版本中实现</strong></p>
<p>下一阶段的数据模型扩展将包括嵌套 JSON 和 Struct、复合主键、不含向量字段的 Collection，以及 StructList 中的稀疏向量。</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">湖存储集成与数据版本控制<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 正在推进与数据湖存储及批处理的深度集成。外部 Collections 可直接访问数据所在位置，而快照则为数据版本控制提供了基础。</p>
<p><strong>已在 3.0 版本中提供</strong></p>
<ul>
<li><strong>外部数据访问：</strong>外部 Collection 支持 Lance、Parquet 和 Iceberg 数据。</li>
<li><strong>快照与批处理集成：</strong>快照可捕获 Collection 数据的某个版本，而 Spark 连接器支持批处理工作流。</li>
<li><strong>存储基础：</strong>Storage V3（Loon）提供可选的 Vortex 和 Lance 支持。该功能默认处于禁用状态，可通过<code translate="no">common.storage.useLoonFFI</code> 启用。快照和<code translate="no">TEXT</code> 均依赖于此功能。</li>
</ul>
<p><strong>3.0.x 版本计划功能</strong></p>
<p>计划中的增强功能将允许 Milvus 采集快照充当外部采集源。外部表支持还将扩展至 JSON 分片、函数字段添加以及字段移除。</p>
<p><strong>3.1 版本计划</strong></p>
<p>计划包括基于 S3 的稀疏索引和标量索引，以及通过导入实现的删除功能。</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">性能、索引和扩展性<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>性能路线图涵盖检索索引、查询执行和集群扩展。此外，还涉及恢复以及必须从对象存储读取数据的查询。</p>
<p><strong>3.0 版本已支持</strong></p>
<ul>
<li><strong>稀疏索引：</strong>稀疏索引的全面改造引入了 SINDI。</li>
<li><strong>索引选择：</strong> <code translate="no">FAISS</code> 直通索引支持Faiss索引生成器字符串，可选方案包括SVS、Panorama、PQ、IVFPQ和ScaNN。DiskANN索引也可用于嵌入列表（EmbList）。</li>
<li><strong>压缩：</strong>Force Merge 提供了对分段合并的显式控制。</li>
</ul>
<p><strong>计划在 3.1 版本中实现</strong></p>
<ul>
<li><strong>存储感知查询：</strong>为 Vortex 添加谓词下推功能，包括页面级剪枝和跳过索引。</li>
<li><strong>集群扩展和多租户：</strong>支持分片拆分、自定义分片键和多租户优化。</li>
<li><strong>查询执行和索引：</strong>开发 QueryView，改进对宽 Collection 的支持、流结果缩减，并支持多个索引。</li>
<li><strong>写入可靠性：</strong>支持幂等写入。</li>
<li><strong>对象存储缓存：</strong>将 Talon 用作 S3 缓存，以改善故障恢复和冷查询性能。</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">3.1 版本之后<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>长期工作包括时间旅行和快照回滚。其范围和发布时间尚待确认。</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">共同规划路线图<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>请在<a href="https://github.com/milvus-io/milvus/discussions">GitHub 讨论区</a>分享对您的应用程序至关重要的工作负载、限制条件和功能需求。通过<a href="https://github.com/milvus-io/milvus/issues">GitHub 问题提交</a> bug 报告。</p>
<p>如需贡献代码或文档，请从《<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">贡献者指南</a>》开始。</p>
