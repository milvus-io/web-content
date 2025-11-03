---
id: roadmap.md
title: Milvus 路线图
related_key: Milvus roadmap
summary: Milvus 是一个开源向量数据库，旨在为人工智能应用提供动力。以下是我们的发展路线图。
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 迈向下一代多模态数据库和数据湖<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>我们正在将 Milvus 带入一个新时代--下一代多模态数据库--从<strong>结构化数据到非结构化数据</strong>，<strong>从实时检索到离线分析</strong>，<strong>从单集群性能到全球数据湖架构</strong>。</p>
<p>本路线图概述了<strong>Milvus v2.6（进行中）</strong>、<strong>Milvus v3.0（目标是2026年底）</strong>和<strong>Milvus v3.1（长期开发）</strong>的核心目标，以及<strong>向量湖（数据湖/Loon）</strong>的演进计划。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">Milvus v2.6（进行中）<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>时间表：2025 年中 - 2025 年底</strong></p>
<p>重点：<strong>升级数据模型</strong>，<strong>重构流架构</strong>，<strong>构建热/冷分层功能</strong>，推出<strong>向量湖原型（v0.1）</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯主要亮点<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
<li><p>引入统一的<strong>Tensor / StructList</strong>数据类型，支持多向量嵌入结构，实现与<em>ColBERT</em>、<em>CoLQwen</em>、<em>视频</em>和<em>多模态向量的</em>兼容。</p></li>
<li><p>添加<strong>地理数据</strong>支持，包括点、区域和空间索引（基于<em>libspatial</em>），以扩展 LBS 和 GIS 中的用例。</p></li>
<li><p>支持<strong>带有时区</strong>数据类型的<strong>时间戳</strong>。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>流节点架构重构</strong></h4><ul>
<li><p>重写流式摄取管道，优化增量写入和实时计算。</p></li>
<li><p>显著提高并发性能和稳定性，为统一的实时和离线处理奠定基础。</p></li>
<li><p>引入新的消息队列引擎：<strong>啄木鸟</strong>。</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>🔹热/冷分层与存储架构（StorageV2）</strong></h4><ul>
<li><p>支持双存储格式：<strong>Parquet</strong>和<strong>Vortex</strong>，提高并发性和内存效率。</p></li>
<li><p>通过自动冷热数据分离和智能调度实现分层存储。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹<strong>向量湖原型（v0.1）</strong></h4><ul>
<li><p>通过 FFI 与<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusion</strong>集成，实现离线 Schema 演进和 KNN 查询。</p></li>
<li><p>提供多模式数据可视化和 Spark ETL 演示，建立基础数据湖架构。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">🌠 Milvus v3.0（目标日期：2026 年末）<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>时间表：2025 年底 - 2026 年初</strong></p>
<p>重点：全面增强<strong>搜索体验</strong>、<strong>Schema 灵活性</strong>和<strong>非结构化数据支持</strong>，同时发布<strong>向量湖（v0.2）</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主要亮点<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹全面改进搜索体验</strong></h4><ul>
<li><p>引入<strong>More Like This (MLT)</strong>相似性搜索，支持带有位置或负面示例的搜索。</p></li>
<li><p>增加语义搜索功能，如<strong>突出显示</strong>和<strong>增强</strong>。</p></li>
<li><p>支持<strong>自定义字典</strong>和<strong>同义词表</strong>，在分析器层实现词汇和语义规则定义。</p></li>
<li><p>为查询引入<strong>聚合</strong>功能。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header"><strong>多租户和资源管理</strong></h4><ul>
<li><p>支持多租户删除、统计和冷热分层。</p></li>
<li><p>改进资源隔离和调度策略，以支持单个集群中的数百万个表。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>增强 Schema 和主键功能</strong></h4><ul>
<li><p>实施<strong>全局主键重复数据删除（全局 PK 重复数据删除）</strong>，以保证数据的一致性和唯一性。</p></li>
<li><p>支持<strong>灵活的 Schema 管理</strong>（添加/删除列、备份填充）。</p></li>
<li><p>允许在向量字段中使用<strong>NULL 值</strong>。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header"><strong>🔹扩展的非结构化数据类型（BLOB/文本）</strong></h4><ul>
<li><p>引入<strong>BLOB 类型</strong>，为文件、图像和视频等二进制数据提供本地存储和引用。</p></li>
<li><p>引入<strong>TEXT 类型</strong>，提供增强的全文和基于内容的搜索功能。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header"><strong>企业级功能</strong></h4><ul>
<li><p>支持<strong>基于快照的备份和恢复</strong>。</p></li>
<li><p>提供<strong>端到端跟踪</strong>和<strong>审计日志</strong>。</p></li>
<li><p>在多集群部署中实施<strong>主动-备用高可用性 (HA)</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹<strong>向量湖（v0.2）</strong></h4><ul>
<li><p>支持<strong>文本/BLOB 存储</strong>和<strong>多版本快照管理</strong>。</p></li>
<li><p>集成 Spark，用于离线索引、聚类、重复数据删除和降维任务。</p></li>
<li><p>提供<strong>ChatPDF 冷查询和离线基准演示</strong>。</p></li>
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
    </button></h2><p><strong>时间表：2026 年中期</strong></p>
<p>重点：<strong>用户自定义函数 (UDF)</strong>、<strong>分布式计算集成</strong>、<strong>标量查询优化</strong>、<strong>动态分片</strong>以及正式发布<strong>向量湖 (v1.0)</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯主要亮点<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header"><strong>用户</strong>定义函数<strong>和分布式计算生态系统</strong></h4><ul>
<li><p>支持<strong>用户</strong>自定义<strong>函数（UDF）</strong>，允许开发人员在检索和计算工作流中注入自定义逻辑。</p></li>
<li><p>与<strong>Ray Dataset / Daft</strong>深度集成，用于分布式 UDF 执行和多模式数据处理。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>标量查询和本地格式演变</strong></h4><ul>
<li><p>优化标量字段的过滤和聚合性能。</p></li>
<li><p>增强表达式评估和索引加速执行。</p></li>
<li><p>支持本地文件格式的<strong>就地更新</strong>。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header"><strong>高级搜索功能</strong></h4><ul>
<li><p>添加以下功能：<strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong> 和<strong>模糊匹配</strong>查询。</p></li>
<li><p>增强文本检索，支持</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header"><strong>动态分片和可扩展性</strong></h4><ul>
<li><p>启用<strong>自动分片</strong>和<strong>负载平衡</strong>，实现无缝扩展。</p></li>
<li><p>改进<strong>全局索引构建</strong>，确保<strong>分布式搜索性能</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header"><strong>向量湖 V1.0</strong></h4><ul>
<li><p>与<strong>Ray / Daft / PyTorch</strong>深度集成，支持分布式 UDF 和上下文工程用例。</p></li>
<li><p>提供<strong>RAG（检索增强生成）演示</strong> <strong>，并从 Iceberg 表导入</strong>。</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">共同构建 Milvus 的未来<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
<p>我们热情邀请所有社区成员帮助打造下一代多模态数据库：</p>
<ul>
<li><p>💬<strong>分享反馈</strong>：提出新功能或优化建议</p></li>
<li><p>🐛<strong>报告问题</strong>：通过 GitHub Issues 报告错误</p></li>
<li><p>🔧<strong>贡献代码</strong>：提交 PR 并帮助构建核心功能</p>
<ul>
<li><p><strong>拉取请求</strong>：直接为我们的<a href="https://github.com/milvus-io/milvus/pulls">代码库</a>贡献<a href="https://github.com/milvus-io/milvus/pulls">代码</a>。无论是修复错误、添加功能还是改进文档，我们都欢迎您的贡献。</p></li>
<li><p><strong>开发指南</strong>：查看我们的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">贡献者指南</a>，了解代码贡献指南。</p></li>
</ul></li>
<li><p>⭐<strong>宣传</strong>：分享最佳实践和成功案例</p></li>
</ul>
<p>👉<strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
