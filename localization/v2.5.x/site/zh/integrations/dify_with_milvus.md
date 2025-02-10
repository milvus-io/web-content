---
id: dify_with_milvus.md
summary: 在本教程中，我们将向您展示如何利用 Milvus 部署 Dify，以实现高效检索和 RAG 引擎。
title: 使用 Milvus 部署 Dify
---
<h1 id="Deploying-Dify-with-Milvus" class="common-anchor-header">使用 Milvus 部署 Dify<button data-href="#Deploying-Dify-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://dify.ai/">Dify</a>是一个开源平台，旨在通过将 Backend-as-a-Service 与 LLMOps 相结合来简化人工智能应用程序的构建。它支持主流 LLMs，提供直观的提示协调界面、高质量的 RAG 引擎和灵活的 AI Agents 框架。凭借低代码工作流、易用的界面和 API，Dify 使开发人员和非技术用户都能专注于创建创新的、真实世界的人工智能解决方案，而无需处理复杂的问题。</p>
<p>在本教程中，我们将向您展示如何利用 Milvus 部署 Dify，实现高效检索和 RAG 引擎。</p>
<h2 id="Clone-the-Repository" class="common-anchor-header">克隆资源库<button data-href="#Clone-the-Repository" class="anchor-icon" translate="no">
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
    </button></h2><p>将 Dify 源代码克隆到本地计算机：</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-the-Environment-Variables" class="common-anchor-header">设置环境变量<button data-href="#Set-the-Environment-Variables" class="anchor-icon" translate="no">
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
    </button></h2><p>导航到 Dify 源代码中的 Docker 目录</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cd</span> dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>复制环境配置文件</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">cp</span> .env.example .<span class="hljs-built_in">env</span>
<button class="copy-code-btn"></button></code></pre>
<p>更改<code translate="no">.env</code> 文件中的<code translate="no">VECTOR_STORE</code> 值</p>
<pre><code translate="no">VECTOR_STORE=milvus
<button class="copy-code-btn"></button></code></pre>
<p>确保<code translate="no">.env</code> 文件中的 Milvus 配置有以下一行：</p>
<pre><code translate="no"><span class="hljs-variable constant_">MILVUS_URI</span>=<span class="hljs-attr">http</span>:<span class="hljs-comment">//host.docker.internal:19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意，通过指定<code translate="no">VECTOR_STORE=milvus</code> ，Dify 会在 docker 中调出 Milvus Standalone 服务器。即使可以通过<code translate="no">http://localhost:19530</code> 从 Docker 外部访问服务器，其他 Dify 容器要想在 Docker 环境内与之对话，也需要连接到特殊的 DNS 名称<code translate="no">host.docker.internal</code> 。因此，我们将<code translate="no">http://host.docker.internal:19530</code> 设置为<code translate="no">MILVUS_URI</code> 。</p>
<p>对于生产部署，您可能需要自定义身份验证。有关如何在 Milvus 中设置令牌或用户名和密码的更多信息，请参阅<a href="https://milvus.io/docs/authenticate.md?tab=docker#Update-user-password">身份验证页面</a>。</p>
<h2 id="Start-the-Docker-Containers" class="common-anchor-header">启动 Docker 容器<button data-href="#Start-the-Docker-Containers" class="anchor-icon" translate="no">
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
    </button></h2><p>根据系统中的 Docker Compose 版本，选择适当的命令来启动容器。你可以使用<code translate="no">$ docker compose version</code> 命令检查版本，更多信息请参阅 Docker 文档：</p>
<p>如果您使用的是 Docker Compose V2，请使用以下命令：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<p>如果您使用的是 Docker Compose V1，请使用以下命令：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Log-in-to-Dify" class="common-anchor-header">登录 Dify<button data-href="#Log-in-to-Dify" class="anchor-icon" translate="no">
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
    </button></h2><p>打开浏览器，进入 Dify 安装页面，在这里设置管理员账户：<code translate="no">http://localhost/install</code> ，然后登录 Dify 主页面，进一步使用。</p>
<p>更多使用方法和指导，请参阅<a href="https://docs.dify.ai/">Dify 文档</a>。</p>
