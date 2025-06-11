---
id: knowledge_table_with_milvus.md
summary: >-
  默认情况下，知识表使用 Milvus
  数据库来存储和检索提取的数据。这样，用户就可以利用Milvus的强大功能轻松搜索、过滤和分析数据。在本教程中，我们将介绍如何开始使用 Knowledge
  Table 和 Milvus。
title: 使用 Milvus 的知识表
---
<h1 id="Knowledge-Table-with-Milvus" class="common-anchor-header">使用 Milvus 的知识表<button data-href="#Knowledge-Table-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/whyhow-ai/knowledge-table">Knowledge Table</a> 由<a href="https://www.whyhow.ai/">WhyHow AI</a> 开发，是一个开源软件包，旨在促进从非结构化文档中提取和探索结构化数据。它为用户提供了一个类似电子表格的界面，并能通过自然语言查询界面创建表格和图形等知识表征。该软件包包括可定制的提取规则、格式选项和通过出处进行的数据追踪，使其适用于各种应用。它支持无缝集成到 RAG 工作流中，既满足了需要用户友好界面的企业用户的需求，也满足了需要灵活后端来高效处理文档的开发人员的需求。</p>
<p>默认情况下，Knowledge Table 使用 Milvus 数据库来存储和检索提取的数据。这样，用户就可以利用 Milvus 的强大功能轻松搜索、过滤和分析数据。在本教程中，我们将介绍如何开始使用 Knowledge Table 和 Milvus。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>装载机</li>
<li>Docker Compose</li>
</ul>
<h2 id="Cloning-the-project" class="common-anchor-header">克隆项目<button data-href="#Cloning-the-project" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/whyhow-ai/knowledge-table.git</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-the-environment" class="common-anchor-header">设置环境<button data-href="#Set-up-the-environment" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以在项目根目录下找到<code translate="no">.env.example</code> 文件。将该文件复制到<code translate="no">.env</code> ，并填写所需的环境变量。</p>
<p>对于 Milvus，应设置<code translate="no">MILVUS_DB_URI</code> 和<code translate="no">MILVUS_DB_TOKEN</code> 环境变量。以下是一些提示：</p>
<blockquote>
<ul>
<li>将<code translate="no">MILVUS_DB_URI</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果你有大规模数据，比如超过一百万个向量，你可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器地址和端口作为 uri，例如<code translate="no">http://localhost:19530</code> 。如果在 Milvus 上启用了身份验证功能，请使用 "<your_username>:<your_password>" 作为令牌，否则不要设置令牌。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">MILVUS_DB_URI</code> 和<code translate="no">MILVUS_DB_TOKEN</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</blockquote>
<p>除 Milvus 外，您还应设置其他环境，如<code translate="no">OPENAI_API_KEY</code> 。您可以从相关网站获取这些信息。</p>
<h2 id="Starting-the-app" class="common-anchor-header">启动应用程序<button data-href="#Starting-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose up -d --build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Stopping-the-app" class="common-anchor-header">停止应用程序<button data-href="#Stopping-the-app" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-sh">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-the-project" class="common-anchor-header">访问项目<button data-href="#Accessing-the-project" class="anchor-icon" translate="no">
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
    </button></h2><p>前台可从<code translate="no">http://localhost:3000</code> 访问，后台可从<code translate="no">http://localhost:8000</code> 访问。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/knowlege_table.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>您可以玩转用户界面，并尝试使用自己的文档。</p>
<p>如需进一步了解演示用法，请参阅官方<a href="https://github.com/whyhow-ai/knowledge-table/tree/main">知识表文档</a>。</p>
