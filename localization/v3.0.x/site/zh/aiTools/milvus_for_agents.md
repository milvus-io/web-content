---
id: milvus_for_agents.md
title: 适用于 AI 代理的 Milvus
summary: 了解 AI 代理如何将 Milvus 用作 RAG、语义搜索和长期记忆的向量数据库。
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">适用于 AI 代理的 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供了面向智能体的友好接口，使 AI 编程智能体和自主智能体系统能够通过编程方式与向量数据库进行交互。无论您是在构建 RAG 管道、语义搜索还是智能体记忆系统，Milvus 都为智能体提供了多种连接和操作方式。</p>
<h2 id="Agent-tools" class="common-anchor-header">Agent tools<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">一款面向 Claude Code 的智能体技能，用于指导 LLMs 使用 PyMilvus 进行向量数据库操作。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 服务器</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">一种模型上下文协议（MCP）服务器，允许任何兼容 MCP 的 Agent 直接与 Milvus 进行交互。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude 上下文 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">专为 Claude Code 设计的 MCP 服务器，提供基于上下文的 Milvus 文档访问功能。</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AI 提示词<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>经过精心筛选的提示词，可帮助AI编码助手编写正确的Milvus代码。每个提示词都蕴含了防止最常见错误的规则和模式。</p>
<p><strong>使用方法：</strong></p>
<ol>
<li>从任意提示页面上的“完整提示”部分<strong>复制</strong>一个提示。</li>
<li>将其<strong>保存</strong>为您的 AI 工具所支持的文件格式（请参阅下方的<a href="#use-in-different-environments">环境对照表</a>）。</li>
<li>您的AI助手在生成或审查Milvus代码时，将自动应用这些规则。</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">提示词页面<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">适用于任何 AI 编码代理的顶级规则。若您仅需一个文件，请从这里开始。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正确的连接模式、MilvusClient 使用方法以及 ORM API 禁用规则。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">模式设计</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">字段类型、主键、Schema 不可变性以及 BM25 配置。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">搜索模式</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">基于ANN、混合及全文搜索，并附带关键约束规则。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">索引选择</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">适用于 AUTOINDEX、HNSW、DiskANN 和 IVF_FLAT 的决策树。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 管道</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">基于 Milvus 的端到端检索增强生成流程。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MilvusClient 方法调用、字段定义、响应状态检查以及搜索结果结构。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Go SDK v3 模块路径、连接超时、Collection 加载以及搜索结果集。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">v2 端点、camelCase 请求字段、响应代码检查以及加载状态轮询。</p>
  </a>
</div>
</div>
<p>Agents.md 以及四个主题提示对应的卡片将打开 Python 版本。其中每项还提供 Node.js、Go 以及 RESTful API v2 版本：</p>
<table>
<thead>
<tr><th>提示</th><th>Python</th><th>Node.js</th><th>Go</th><th>RESTful API v2</th></tr>
</thead>
<tbody>
<tr><td>AGENTS.md</td><td><a href="/docs/zh/agents_overview.md">Python</a></td><td><a href="/docs/zh/agents_overview_nodejs.md">Node.js</a></td><td><a href="/docs/zh/agents_overview_go.md">Go</a></td><td><a href="/docs/zh/agents_overview_restful.md">RESTful API v2</a></td></tr>
<tr><td>模式设计</td><td><a href="/docs/zh/schema_design.md">Python</a></td><td><a href="/docs/zh/schema_design_nodejs.md">Node.js</a></td><td><a href="/docs/zh/schema_design_go.md">Go</a></td><td><a href="/docs/zh/schema_design_restful.md">RESTful API v2</a></td></tr>
<tr><td>搜索模式</td><td><a href="/docs/zh/search_patterns.md">Python</a></td><td><a href="/docs/zh/search_patterns_nodejs.md">Node.js</a></td><td><a href="/docs/zh/search_patterns_go.md">Go</a></td><td><a href="/docs/zh/search_patterns_restful.md">RESTful API v2</a></td></tr>
<tr><td>索引选择</td><td><a href="/docs/zh/index_selection.md">Python</a></td><td><a href="/docs/zh/index_selection_nodejs.md">Node.js</a></td><td><a href="/docs/zh/index_selection_go.md">Go</a></td><td><a href="/docs/zh/index_selection_restful.md">RESTful API v2</a></td></tr>
<tr><td>RAG 管道</td><td><a href="/docs/zh/rag_pipeline.md">Python</a></td><td><a href="/docs/zh/rag_pipeline_nodejs.md">Node.js</a></td><td><a href="/docs/zh/rag_pipeline_go.md">Go</a></td><td><a href="/docs/zh/rag_pipeline_restful.md">RESTful API v2</a></td></tr>
</tbody>
</table>
<h3 id="Use-in-different-environments" class="common-anchor-header">在不同环境中的应用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>环境</th><th>提示语放置位置</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>光标</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">配置项目规则</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">自定义说明</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code 文档</a></td></tr>
<tr><td>JetBrains 集成开发环境</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">自定义指南</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 代码实验室</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">配置 .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">配置 guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Agents的推荐部署方案<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>选择合适的 Milvus 部署方案取决于您的开发阶段。</p>
<table>
<thead>
<tr><th>阶段</th><th>部署</th><th>原因</th></tr>
</thead>
<tbody>
<tr><td>原型开发</td><td><a href="/docs/zh/milvus_lite.md">Milvus Lite</a></td><td>零配置，进程内运行。可在任何支持 Python 的环境中运行——非常适合快速进行代理原型开发。</td></tr>
<tr><td>开发</td><td><a href="/docs/zh/install_standalone-docker.md">Milvus Standalone</a></td><td>单节点 Docker 部署。适用于本地开发以及使用真实数据量进行测试。</td></tr>
<tr><td>生产环境</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>全托管、无服务器模式的 Milvus。无需管理基础设施——Agents只需连接并运行即可。</td></tr>
<tr><td>自托管生产环境</td><td><a href="/docs/zh/install_cluster-helm.md">Milvus Distributed</a></td><td>面向需要完全掌控基础设施的团队的多节点 Kubernetes 部署方案。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>对于代理工作负载，建议在生产环境中使用<strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong>。Agents 通常无需管理基础设施，因此无服务器部署可消除操作开销并提供自动扩展功能。</p>
</div>
