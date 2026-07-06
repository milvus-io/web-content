---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: Milvus 是一个专为支持人工智能应用而构建的开源向量数据库。以下是我们的路线图，用于指导我们的开发工作。
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 迈向新一代多模态数据库和向量 Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus 产品路线图</strong></p>
<p>欢迎阅读 Milvus 路线图！</p>
<p>我们正引领 Milvus 迈入一个新时代——新一代多模态数据库<strong>——其覆盖范围从结构化数据到非结构化数据，从实时检索到离线分析，从单集群性能到全球化的</strong> <strong>Vector Lakebase 架构。</strong></p>
<p>本路线图概述了<strong>Milvus v3.0（公开测试版）</strong>和<strong>Milvus v3.1（长期开发版）</strong>的核心目标，以及<strong>Zilliz Vector Lakebase</strong> 的演进计划。</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0（公开测试版）<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>公开测试版：2026年5月</strong></p>
<p>重点：构建具备引擎内排序、聚合和多向量检索功能的<strong>语义原生查询引擎</strong>，以及<strong>Zilliz Vector Lakebase 的湖原生基础架构</strong>，使计算无需数据迁移即可直接访问数据。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主要亮点<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹<strong>Schema与数据类型演进</strong></h4><ul>
<li>支持在运行时执行 ALTER Collection ADD COLUMN 和 删除 Collection 操作，无需重建索引或中断服务。</li>
<li>为新列提供<strong>两种补全路径</strong>：通过 Spark Connector 进行的外部补全，以及在写入时自动生成 BM25 稀疏向量实现的内部补全。</li>
<li>引入<strong>TEXT</strong>作为一等数据类型，可在存储原始文本的同时存储向量，并支持 BM25 和文本匹配。</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹<strong>查询</strong> <strong>执行全面改造</strong></h4><ul>
<li>将<strong>Order By</strong>推入引擎，支持按分段排序以及跨查询节点的归并排序。</li>
<li>添加在内核中计算的 SQL 风格<strong>查询</strong> <strong>聚合</strong>（GROUP BY 配合 COUNT、SUM、AVG、MIN、MAX）。</li>
<li>在 ANN 结果上引入<strong>搜索维度</strong>，支持按桶统计以及服务器端的嵌套子维度。</li>
<li>支持在集群端注册<strong>自定义词典</strong>和同义词表，以提升中日韩（CJK）及特定领域的召回率。</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹<strong>多向量与延迟交互支持</strong></h4><ul>
<li>引入<strong>StructList，</strong>将一个实体表示为包含多个向量的单行数据，并通过 MAX_SIM 原生支持延迟交互（ColBERT、ColPali）。</li>
<li>支持对 StructList 字段进行<strong>元素级和实体级搜索</strong>，并为实体级结果提供可配置的匹配策略。</li>
<li>新增三种<strong>多向量检索策略</strong>：TokenANN（穷举式）、Muvera（基于投影，无需训练）和 Lemur（学习型压缩）。</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹<strong>检索与索引全面升级</strong></h4><ul>
<li>通过块压缩、权重量化和持久化格式对<strong>稀疏倒排索引</strong>进行全面改造；引入<strong>SINDI</strong>作为默认的稀疏倒排索引算法。</li>
<li>通过完整的<strong>Faiss 系列</strong>（SVS、Panorama、PQ、IVFPQ、ScaNN）以及用于近似重复项检测的<strong>MinHash DIDO，</strong>扩展索引覆盖范围。</li>
<li>支持<strong>可为空的向量字段</strong>，以处理异步Embeddings和缺失模态，并在搜索时进行自动过滤。</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹<strong>Vector Lakebase 存储与计算架构</strong></h4><ul>
<li>引入<strong>External Collection</strong>，可在 S3 / GCS / Azure 中原地对数据进行索引和查询，支持 Lance、Parquet、Iceberg 和 Vortex 表格式。</li>
<li>新增<strong>Vortex</strong>（一种开放的列式格式）以及<strong>Loon（Storage V3）</strong>，后者作为混合格式存储层，可从对象存储中高效读取单个数据点。</li>
<li>支持采用 MVCC 风格隔离的<strong>特定时间点快照</strong>，可在服务持续写入的同时进行批处理。</li>
<li>作为<strong>Spark DataSource v2</strong>集成，可在 Spark / Databricks / EMR 管道中直接读写 Milvus 数据。</li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1（长期愿景）<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>时间表：2026 年末及以后</strong></p>
<p>重点：<strong>存储智能</strong>、<strong>写入路径完整性</strong>、<strong>计算可扩展性</strong>，以及<strong>扩展</strong> <strong>Vector Lakebase</strong> <strong>的互操作性</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主要亮点<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹<strong>存储与写入路径</strong></h4><ul>
<li>在存储层添加<strong>谓词下推功能</strong>，并结合页索引和布隆过滤器进行数据修剪。</li>
<li>在数据摄入时实现<strong>主键去重</strong>，以防止写入时的数据重复。</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹<strong>计算与弹性</strong></h4><ul>
<li>支持<strong>用户定义函数（UDF）</strong>，可在引擎的数据平面中运行自定义逻辑。</li>
<li>启用<strong>分片拆分</strong>功能，可在数据增长时重新划分分片，并支持自定义分片键。</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹<strong>Spark 与</strong> <strong>Vector Lakebase</strong> <strong>扩展</strong></h4><ul>
<li>通过更丰富的<strong>原生批处理操作符</strong>库扩展 Spark 连接器。</li>
<li>新增<strong>表格式</strong>功能，包括时间回溯、Schema演进和快照回滚。</li>
<li>通过<strong>CDC 实时外部索引</strong>、对 Apache Paimon 的支持以及更多数据格式，扩展 Vector Lakebase 的互操作性。</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 携手共建 Milvus 的未来<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一个由全球开发者社区驱动的开源项目。我们诚邀所有社区成员共同塑造下一代多模态数据库：</p>
<ul>
<li><p>💬<strong>分享反馈</strong>：在<a href="https://github.com/milvus-io/milvus/discussions">GitHub 讨论区</a>提出新功能或优化建议。</p></li>
<li><p>🐛<strong>报告问题</strong>：通过<a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a> 提交 bug 报告。</p></li>
<li><p>🔧<strong>贡献代码</strong>：提交 PR，协助构建核心功能。</p>
<ul>
<li><strong>拉取请求</strong>：直接为我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>做出贡献。无论是修复 bug、添加功能还是完善文档，我们都欢迎您的贡献。</li>
<li><strong>开发指南</strong>：请查阅我们的<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">《贡献者指南》</a>，了解代码贡献的相关规范。</li>
</ul></li>
<li><p>🗣️<strong>加入讨论</strong>：在<a href="https://milvus.io/discord">Discord</a>、<a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus 办公时间</a>或<a href="https://milvus.io/community">所有社区频道</a>中提问并结识维护者。</p></li>
<li><p>⭐<strong>广而告之</strong>：分享最佳实践和成功案例，并在<a href="https://twitter.com/milvusio">X</a>、<a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> 和<a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a> 上关注 Milvus。</p></li>
</ul>
<p>👉<strong>GitHub：</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
