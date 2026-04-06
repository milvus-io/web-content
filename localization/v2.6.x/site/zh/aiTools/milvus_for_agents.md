---
id: milvus_for_agents.md
title: 用于人工智能代理的 Milvus
summary: 了解人工智能 Agents 如何将 Milvus 作为向量数据库，用于 RAG、语义搜索和长期记忆。
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">用于人工智能代理的 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供代理友好界面，允许人工智能编码代理和自主代理系统以编程方式与向量数据库交互。无论您是要构建 RAG 管道、语义搜索还是代理记忆系统，Milvus 都能为代理提供多种连接和操作方法。</p>
<h2 id="Agent-tools" class="common-anchor-header">Agents 工具<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus 技能</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code 的一项代理技能，教 LLMs 使用 PyMilvus 进行向量数据库操作。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 服务器</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">模型上下文协议服务器，可让任何兼容 MCP 的 Agents 直接与 Milvus 交互。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">克劳德上下文 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">为克劳德代码设计的 MCP 服务器，提供上下文感知的 Milvus 文档访问。</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">人工智能提示<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>经过编辑的提示，可帮助人工智能编码助手编写正确的 Milvus 代码。每个提示都包含防止最常见错误的规则和模式。</p>
<p><strong>如何使用</strong></p>
<ol>
<li>从任何提示页面的 "完整提示 "部分<strong>复制</strong>一个提示。</li>
<li>将其<strong>保存</strong>到人工智能工具所需的文件中（见下<a href="#use-in-different-environments">表</a>）。</li>
<li>您的人工智能助手在生成或审查 Milvus 代码时将自动应用这些规则。</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">提示页面<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Agents.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">任何人工智能编码代理的顶级规则。如果您只需要一个文件，请从这里开始。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正确的连接模式、MilvusClient 使用和 ORM API 禁止。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Schema 设计</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">字段类型、主键、Schema 不变性和 BM25 配置。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">搜索模式</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">带有关键约束规则的 ANN、混合和全文搜索。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">索引选择</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">用于 AUTOINDEX、HNSW、DiskANN 和 IVF_FLAT 的决策树。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 管道</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">使用 Milvus 的端到端检索增强生成流程。</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">在不同环境中使用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>使用环境</th><th>提示位置</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>光标</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">配置项目规则</a></td></tr>
<tr><td>GitHub 副驾驶</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">自定义说明</a></td></tr>
<tr><td>克劳德代码</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">克劳德代码文档</a></td></tr>
<tr><td>JetBrains 集成开发环境</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">自定义指南</a></td></tr>
<tr><td>双子座 CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">双子座 CLI 代码实验室</a></td></tr>
<tr><td>VS 代码</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">配置 .instructions.md</a></td></tr>
<tr><td>风帆</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">配置指南.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">推荐的 Agents 部署<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>选择合适的 Milvus 部署取决于你的开发阶段。</p>
<table>
<thead>
<tr><th>阶段</th><th>部署</th><th>为什么</th></tr>
</thead>
<tbody>
<tr><td>原型开发</td><td><a href="/docs/zh/milvus_lite.md">Milvus Lite</a></td><td>零配置，进程中。可在 Python 运行的任何地方运行，是快速代理原型开发的理想选择。</td></tr>
<tr><td>开发</td><td><a href="/docs/zh/install_standalone-docker.md">Milvus 单机版</a></td><td>单节点 Docker 部署。适合本地开发和实际数据量测试。</td></tr>
<tr><td>生产</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>全面管理的无服务器 Milvus。无需管理基础设施 - Agents 只需连接和操作。</td></tr>
<tr><td>自托管生产</td><td><a href="/docs/zh/install_cluster-helm.md">分布式 Milvus</a></td><td>多节点 Kubernetes 部署，适用于需要完全控制基础设施的团队。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>对于代理工作负载，建议在生产中使用<strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong>。Agents 通常不管理基础设施，因此无服务器部署可消除操作开销，并提供自动扩展功能。</p>
</div>
