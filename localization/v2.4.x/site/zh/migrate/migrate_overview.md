---
id: migrate_overview.md
summary: 本文概述了 Milvus 迁移工具，包括支持的迁移、功能和架构。
title: Milvus 迁移概述
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Milvus 迁移概述<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>认识到用户群的多样化需求，Milvus 扩展了其迁移工具，不仅便于从 Milvus 1.x 早期版本升级，还能无缝集成来自<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a>和<a href="https://github.com/facebookresearch/faiss">Faiss</a> 等其他系统的数据。<a href="https://github.com/zilliztech/milvus-migration">Milvus 迁移</a>项目旨在弥合这些不同数据环境与 Milvus 技术最新进展之间的差距，确保您能无缝利用改进的功能和性能。</p>
<h2 id="Supported-migrations" class="common-anchor-header">支持的迁移<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具支持多种迁移路径，以满足不同用户的需求：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/es2m.md">从 Elasticsearch 迁移到 Milvus 2.x</a>：使用户能够从 Elasticsearch 环境迁移数据，以利用 Milvus 的优化向量搜索功能。</li>
<li><a href="/docs/zh/v2.4.x/f2m.md">Faiss 到 Milvus 2.x</a>：为从 Faiss（一种用于高效相似性搜索的流行库）传输数据提供实验支持。</li>
<li><a href="/docs/zh/v2.4.x/m2m.md">Milvus 1.x 到 Milvus 2.x</a>：确保早期版本的数据顺利过渡到最新框架。</li>
<li><a href="/docs/zh/v2.4.x/from-m2x.md">Milvus 2.3.x 到 Milvus 2.3.x 或更高版本</a>：为已迁移至 2.3.x 的用户提供一次性迁移路径。</li>
</ul>
<h2 id="Features" class="common-anchor-header">特点<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration 具有强大的功能，可处理各种迁移情况：</p>
<ul>
<li>多种交互方式：你可以通过命令行界面或Restful API来执行迁移，并可灵活掌握迁移的执行方式。</li>
<li>支持各种文件格式和云存储：<a href="https://github.com/zilliztech/milvus-migration">Milvus 迁移</a>工具可以处理存储在本地文件以及 S3、OSS 和 GCP 等云存储解决方案中的数据，确保广泛的兼容性。</li>
<li>数据类型处理：<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>既能处理向量数据，也能处理标量字段，是满足不同数据迁移需求的多功能选择。</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">架构<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>的架构设计具有战略意义，可促进高效的数据流、解析和写入过程，实现跨各种数据源的强大迁移能力。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Milvus-迁移架构</span> </span></p>
<p>在上图中</p>
<ul>
<li><strong>数据源</strong> <a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>支持多种数据源，包括通过<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">scroll API读取</a>的Elasticsearch、本地或云存储数据文件，以及Milvus 1.x数据库。这些数据都可以通过简化的方式访问和读取，从而启动迁移过程。</li>
<li><strong>流水线</strong>：<ul>
<li><strong>解析过程</strong>：来自数据源的数据将根据其格式进行解析。例如，对于来自 Elasticsearch 的数据源，会使用 Elasticsearch 格式解析器，而其他格式则使用各自的解析器。这一步对于将原始数据转换为可进一步处理的结构化格式至关重要。</li>
<li><strong>转换过程</strong>：解析后，数据将进行转换，根据目标 Milvus 2.x 模式过滤字段、转换数据类型并调整表名。这可确保数据符合 Milvus 的预期结构和类型。</li>
</ul></li>
<li><strong>数据写入和加载</strong><ul>
<li><strong>写入数据</strong>：将处理后的数据写入中间 JSON 或 NumPy 文件，以便加载到 Milvus 2.x 中。</li>
<li><strong>加载数据</strong>：使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>操作将数据最终加载到 Milvus 2.x，该操作可高效地将大量数据写入 Milvus 存储系统（基于云或文件存储）。</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">未来计划<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>开发团队致力于通过以下功能增强<a href="https://github.com/zilliztech/milvus-migration">Milvus 迁移</a>功能：</p>
<ul>
<li><strong>支持更多数据源</strong>：计划扩展对其他数据库和文件系统的支持，如 Pinecone、Chroma 和 Qdrant。如果你需要特定数据源的支持，请通过<a href="https://github.com/zilliztech/milvus-migration/issues">GitHub 问题链接</a>提交请求。</li>
<li><strong>命令简化</strong>：努力简化命令流程，使其更易于执行。</li>
<li><strong>SPI 解析器</strong>/<strong>转换器</strong>：该架构有望包含用于解析和转换的服务提供商接口 (SPI) 工具。这些工具允许自定义实现，用户可将其插入迁移过程，以处理特定的数据格式或转换规则。</li>
<li><strong>检查点恢复</strong>：允许迁移从上一个检查点恢复，以提高迁移中断时的可靠性和效率。将创建保存点以确保数据完整性，并将保存点存储在 SQLite 或 MySQL 等数据库中，以跟踪迁移过程的进度。</li>
</ul>
