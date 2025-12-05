---
id: use_milvus_in_private_gpt.md
summary: 在本教程中，我们将向您展示如何使用 Milvus 作为 PrivateGPT 的后台向量数据库。
title: 在 PrivateGPT 中使用 Milvus
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">在 PrivateGPT 中使用 Milvus<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">PrivateGPT</a>是一个可投入生产的人工智能项目，它能让用户在没有互联网连接的情况下，使用大型语言模型对其文档提出问题，同时确保 100% 的隐私。PrivateGPT 提供的应用程序接口分为高级和低级区块。它还提供了一个 Gradio UI 客户端以及批量模型下载脚本和摄取脚本等实用工具。从概念上讲，PrivateGPT 封装了一个 RAG 管道并公开了其基元，可随时使用并提供 API 和 RAG 管道的完整实现。</p>
<p>在本教程中，我们将向您展示如何使用 Milvus 作为 PrivateGPT 的后端向量数据库。</p>
<div class="alert note">
<p>本教程主要参考<a href="https://docs.privategpt.dev/installation/getting-started/installation">PrivateGPT</a>官方安装指南。如果您发现本教程有过时的部分，可以优先参考官方指南，并向我们提出问题。</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">运行 PrivateGPT 的基本要求<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1.克隆 PrivateGPT 仓库</h3><p>克隆版本库并导航到它：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2.安装诗歌</h3><p>安装用于依赖关系管理的<a href="https://python-poetry.org/docs/#installing-with-the-official-installer">Poetry</a>：按照 Poetry 官方网站上的说明进行安装。</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. （可选）安装 make</h3><p>要运行各种脚本，需要安装 make。</p>
<p>macOS（使用 Homebrew）：</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows （使用 Chocolatey）：</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">安装可用模块<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>PrivateGPT 允许自定义设置某些模块，例如 LLM、Embeddings、向量存储、用户界面。</p>
<p>在本教程中，我们将使用以下模块：</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>：Ollama</li>
<li><strong>向量存储</strong>：Milvus</li>
<li><strong>用户界面</strong>Gradio</li>
</ul>
<p>运行以下命令，使用诗歌来安装所需的模块依赖项：</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">启动 Ollama 服务<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>访问<a href="https://ollama.com/">ollama.ai</a>，按照说明在机器上安装 Ollama。</p>
<p>安装完成后，确保关闭 Ollama 桌面应用程序。</p>
<p>现在，启动 Ollama 服务（它将启动本地推理服务器，同时为 LLM 和 Embeddings 服务）：</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>安装要使用的模型，默认<code translate="no">settings-ollama.yaml</code> 配置为用户<code translate="no">llama3.1</code> 8b LLM (~4GB) 和<code translate="no">nomic-embed-text</code> Embeddings (~275MB)</p>
<p>默认情况下，PrivateGPT 会根据需要自动提取模型。可以通过修改<code translate="no">ollama.autopull_models</code> 属性来改变这种行为。</p>
<p>无论如何，如果您想手动提取模型，请运行以下命令：</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>您可以选择在<code translate="no">settings-ollama.yaml</code> 文件中更改到您最喜欢的模型，然后手动拉取它们。</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">更改 Milvus 设置<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">settings-ollama.yaml</code> 文件中，将 vectorstore 设置为 milvus：</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>你也可以添加一些累积的 Milvus 配置来指定你的设置。 像这样：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>可用的配置选项有</p>
<table>
<thead>
<tr><th>字段 选项</th><th>说明</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>默认设置为 "local_data/private_gpt/milvus/milvus_local.db"，作为本地文件；你也可以在 docker 或 k8s 上设置性能更高的 Milvus 服务器，例如 http://localhost:19530，作为你的 uri；要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，请将 uri 和 token 调整为 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>。</td></tr>
<tr><td>令牌</td><td>与 docker 或 k8s 上的 Milvus 服务器配对，或与 Zilliz Cloud 的 API 密钥配对。</td></tr>
<tr><td>集合名称</td><td>Collections 的名称，默认设置为 "milvus_db"。</td></tr>
<tr><td>覆盖</td><td>覆盖 Collection 中已存在的数据，默认设置为 "true"。</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">启动 PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>完成所有设置后，即可通过 Gradio UI 运行 PrivateGPT。</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>用户界面的网址是<code translate="no">http://0.0.0.0:8001</code> 。</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>您可以玩转用户界面，并就您的文档提出问题。</p>
<p>更多详情，请参阅<a href="https://docs.privategpt.dev/">PrivateGPT</a>官方文档。</p>
