---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: Milvus 是一个专为支持人工智能应用而构建的开源向量数据库。以下是我们的路线图，用于指导开发工作。
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 迈向新一代多模态数据库和数据湖<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>我们正引领 Milvus 迈入一个新时代——新一代多模态数据库——其覆盖范围<strong>从结构化数据到非结构化数据</strong>，<strong>从实时检索到离线分析</strong>，从<strong>单集群性能到全球数据湖架构</strong>。</p>
<p>本路线图概述了<strong>Milvus v2.6（开发中）</strong>、<strong>Milvus v3.0（计划于 2026 年底发布）</strong>和<strong>Milvus v3.1（长期开发）</strong>的核心目标，以及<strong>Vector Lake（数据湖 / Loon）</strong>的演进计划。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6（开发中）<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>时间表：2025 年中 – 2025 年底</strong></p>
<p>重点：<strong>升级数据模型</strong>、<strong>重构流式处理架构</strong>、<strong>构建热/冷分层能力</strong>，并发布<strong>Vector Lake 原型（v0.1）</strong>。</p>
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹<strong>数据模型升级</strong></h4><ul>
<li><p>引入统一的<strong>Tensor / StructList</strong>数据类型，以支持多向量嵌入结构，实现与<em>ColBERT</em>、<em>CoLQwen</em>、<em>视频及多模态向量的</em>兼容性。</p></li>
<li><p>新增<strong>地理数据</strong>支持，包括点、区域及空间索引（基于<em>libspatial</em>），以拓展 LBS 和 GIS 领域的应用场景。</p></li>
<li><p>支持<strong>带时区的时间戳</strong>数据类型。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹<strong>StreamNode 架构重构</strong></h4><ul>
<li><p>重写流式摄入管道，以优化增量写入和实时计算。</p></li>
<li><p>显著提升了并发性能和稳定性，为实时与离线处理的统一奠定了基础。</p></li>
<li><p>引入新的消息队列引擎：<strong>Woodpecker</strong>。</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹<strong>热/冷分层与存储架构（StorageV2）</strong></h4><ul>
<li><p>支持双存储格式：<strong>Parquet</strong>和<strong>Vortex，</strong>提升并发性和内存效率。</p></li>
<li><p>实现分层存储，具备自动热/冷数据分离和智能调度功能。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹<strong>Vector Lake 原型（v0.1）</strong></h4><ul>
<li><p>通过 FFI 与<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusion</strong>集成，支持离线模式 Schema 演进和 KNN 查询。</p></li>
<li><p>提供多模态数据可视化及 Spark ETL 演示，构建基础数据湖架构。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0（计划于2026年初发布）<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>时间表：2025年底 – 2026年初</strong></p>
<p>重点：全面提升<strong>搜索体验</strong>、<strong>Schema灵活性及</strong> <strong>非结构化数据支持能力</strong>，并发布<strong>Vector Lake (v0.2)</strong>。</p>
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹<strong>搜索体验全面升级</strong></h4><ul>
<li><p>引入<strong>“更多类似内容”（MLT）</strong>相似度搜索，支持带位置或反例的搜索。</p></li>
<li><p>新增语义搜索功能，例如<strong>高亮显示</strong>和<strong>权重提升</strong>。</p></li>
<li><p>支持<strong>自定义词典</strong>和<strong>同义词表</strong>，可在分析器层定义词汇和语义规则。</p></li>
<li><p>引入查询<strong>聚合</strong>功能。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹<strong>多租户与资源管理</strong></h4><ul>
<li><p>启用多租户删除、统计以及热/冷分层功能。</p></li>
<li><p>改进资源隔离和调度策略，以支持单个集群中数百万张表。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹<strong>Schema与主键增强</strong></h4><ul>
<li><p>实现<strong>全局主键去重（Global PK Dedup）</strong>，以确保数据的一致性和唯一性。</p></li>
<li><p>支持<strong>灵活的Schema管理</strong>（添加/删除列、备份填充）。</p></li>
<li><p>允许向量字段中包含<strong>NULL 值</strong>。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹<strong>扩展非结构化数据类型（BLOB / 文本）</strong></h4><ul>
<li><p>引入<strong>BLOB 类型</strong>，为文件、图像和视频等二进制数据提供原生存储和引用功能。</p></li>
<li><p>引入<strong>TEXT 类型</strong>，提供增强的全文和基于内容的搜索功能。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹<strong>企业级功能</strong></h4><ul>
<li><p>支持<strong>基于快照的备份和恢复</strong>。</p></li>
<li><p>提供<strong>端到端追踪</strong>和<strong>审计日志</strong>功能。</p></li>
<li><p>在多集群部署中实现<strong>主备高可用性（HA）</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹<strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>支持<strong>TEXT / BLOB 存储</strong>及<strong>多版本快照管理</strong>。</p></li>
<li><p>集成 Spark 以实现离线索引、聚类、去重和降维任务。</p></li>
<li><p>提供<strong>ChatPDF 冷查询和离线基准测试演示</strong>。</p></li>
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
    </button></h2><p><strong>时间表：2026 年年中</strong></p>
<p>重点：<strong>用户自定义函数（UDF）</strong>、<strong>分布式计算集成</strong>、<strong>标量查询优化</strong>、<strong>动态分片</strong>，以及<strong>Vector Lake（v1.0）</strong>的正式发布。</p>
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹<strong>UDF 与分布式计算生态系统</strong></h4><ul>
<li><p>支持<strong>用户自定义函数（UDF）</strong>，允许开发者在检索和计算工作流中注入自定义逻辑。</p></li>
<li><p>与<strong>Ray Dataset / Daft</strong>深度集成，以实现分布式 UDF 执行和多模态数据处理。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹<strong>标量查询与本地格式演进</strong></h4><ul>
<li><p>优化标量字段的过滤和聚合性能。</p></li>
<li><p>增强表达式求值和基于索引的加速执行。</p></li>
<li><p>支持本地文件格式的<strong>就地更新</strong>。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹<strong>高级搜索功能</strong></h4><ul>
<li><p>新增以下功能：<strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong> 以及<strong>模糊匹配</strong>查询。</p></li>
<li><p>通过支持以下功能增强文本检索：</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹<strong>动态分片与可扩展性</strong></h4><ul>
<li><p>启用<strong>自动分片拆分</strong>和<strong>负载均衡</strong>，实现无缝扩展。</p></li>
<li><p>优化<strong>全局索引构建</strong>，并确保<strong>分布式搜索性能</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹<strong>Vector Lake V1.0</strong></h4><ul>
<li><p>与<strong>Ray / Daft / PyTorch</strong>深度集成，支持分布式 UDF 及上下文工程用例。</p></li>
<li><p>提供<strong>RAG（检索增强生成）演示</strong> <strong>，并支持从 Iceberg 表导入数据</strong>。</p></li>
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
    </button></h2><p>Milvus 是一个由全球开发者社区驱动的开源项目。</p>
<p>我们诚挚邀请所有社区成员共同塑造下一代多模态数据库：</p>
<ul>
<li><p>💬<strong>分享反馈</strong>：提出新功能或优化建议</p></li>
<li><p>🐛<strong>报告问题</strong>：通过 GitHub Issues 提交 bug</p></li>
<li><p>🔧<strong>贡献代码</strong>：提交 PR 并协助构建核心功能</p>
<ul>
<li><p><strong>拉取请求</strong>：直接为我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>做出贡献。无论是修复 bug、添加功能还是完善文档，我们都欢迎您的贡献。</p></li>
<li><p><strong>开发指南</strong>：请查阅我们的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">《贡献者指南》</a>，了解代码贡献的相关规范。</p></li>
</ul></li>
<li><p>⭐<strong>广而告之</strong>：分享最佳实践和成功案例</p></li>
</ul>
<p>👉<strong>GitHub：</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
