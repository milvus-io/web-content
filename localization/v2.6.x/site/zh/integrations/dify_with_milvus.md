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
<p>在本教程中，我们将向您展示如何使用 Milvus 部署 Dify，以实现高效检索和 RAG 引擎。</p>
<div class="alert note">
<p>本文档主要基于<a href="https://docs.dify.ai/">Dify</a> 官方<a href="https://docs.dify.ai/">文档</a>。如果您发现任何过时或不一致的内容，请优先使用官方文档，并随时向我们提出问题。</p>
</div>
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
    </button></h2><h3 id="Clone-the-Repository" class="common-anchor-header">克隆资源库</h3><p>克隆 Dify 源代码到本地计算机：</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/langgenius/dify.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Environment-Configuration" class="common-anchor-header">准备环境配置</h3><p>导航至 Dify 源代码中的 Docker 目录</p>
<pre><code translate="no" class="language-shell">cd dify/docker
<button class="copy-code-btn"></button></code></pre>
<p>复制环境配置文件</p>
<pre><code translate="no" class="language-shell">cp .env.example .env
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deployment-Options" class="common-anchor-header">部署选项<button data-href="#Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h2><p>你可以使用两种不同的方法通过 Milvus 部署 Dify。请选择最适合您需求的一种：</p>
<h2 id="Option-1-Using-Milvus-with-Docker" class="common-anchor-header">方案 1：使用 Milvus 和 Docker<button data-href="#Option-1-Using-Milvus-with-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>该选项使用 Docker Compose 在本地计算机上运行 Milvus 容器和 Dify。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">配置环境变量</h3><p>用以下 Milvus 配置编辑<code translate="no">.env</code> 文件：</p>
<pre><code translate="no">VECTOR_STORE=milvus
MILVUS_URI=http://host.docker.internal:19530
MILVUS_TOKEN=
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><code translate="no">MILVUS_URI</code> 使用<code translate="no">host.docker.internal:19530</code> ，允许 Docker 容器通过 Docker 的内部网络访问在主机上运行的 Milvus。</li>
<li><code translate="no">MILVUS_TOKEN</code> 可以留空，用于本地 Milvus 部署。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">启动 Docker 容器</h3><p>使用<code translate="no">milvus</code> 配置文件启动容器，以包含 Milvus 服务：</p>
<pre><code translate="no" class="language-shell">docker compose --profile milvus up -d
<button class="copy-code-btn"></button></code></pre>
<p>此命令将与<code translate="no">milvus-standalone</code> 、<code translate="no">etcd</code> 和<code translate="no">minio</code> 容器一起启动 Dify 服务。</p>
<h2 id="Option-2-Using-Zilliz-Cloud" class="common-anchor-header">选项 2：使用 Zilliz Cloud<button data-href="#Option-2-Using-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>此选项将 Dify 连接到 Zilliz Cloud 上受管理的 Milvus 服务。</p>
<h3 id="Configure-Environment-Variables" class="common-anchor-header">配置环境变量</h3><p>使用 Zilliz Cloud 连接详细信息编辑<code translate="no">.env</code> 文件：</p>
<pre><code translate="no"><span class="hljs-attr">VECTOR_STORE</span>=milvus
<span class="hljs-attr">MILVUS_URI</span>=YOUR_ZILLIZ_CLOUD_ENDPOINT
<span class="hljs-attr">MILVUS_TOKEN</span>=YOUR_ZILLIZ_CLOUD_API_KEY
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>用 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点</a>替换<code translate="no">YOUR_ZILLIZ_CLOUD_ENDPOINT</code> 。</li>
<li>用 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">API 密钥</a>替换<code translate="no">YOUR_ZILLIZ_CLOUD_API_KEY</code> 。</li>
</ul>
</div>
<h3 id="Start-the-Docker-Containers" class="common-anchor-header">启动 Docker 容器</h3><p>只启动 Dify 容器，不启动 Milvus 配置文件：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
<button class="copy-code-btn"></button></code></pre>
<h2 id="Accessing-Dify" class="common-anchor-header">访问 Dify<button data-href="#Accessing-Dify" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Log-in-to-Dify" class="common-anchor-header">登录 Dify</h3><p>打开浏览器，进入 Dify 安装页面，您可以在这里设置您的管理员账户：<code translate="no">http://localhost/install</code> ，然后登录 Dify 主页面以进一步使用。</p>
<p>更多使用方法和指导，请参阅<a href="https://docs.dify.ai/">Dify 文档</a>。</p>
