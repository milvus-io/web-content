---
id: use_milvus_in_docsgpt.md
summary: 在本教程中，我们将向您展示如何使用 Milvus 作为 DocsGPT 的后台向量数据库。
title: 在 DocsGPT 中使用 Milvus
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">在 DocsGPT 中使用 Milvus<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">DocsGPT</a>是一种先进的开源解决方案，它通过集成强大的 GPT 模型简化了项目文档中信息的查找。它能让开发人员轻松获得有关项目问题的准确答案，消除耗时的手动搜索。</p>
<p>在本教程中，我们将向你展示如何使用 Milvus 作为 DocsGPT 的后台向量数据库。</p>
<div class="alert note">
<p>本教程主要参考<a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">DocsGPT</a>官方安装指南。如果你发现本教程有过时的部分，可以优先参考官方指南，并向我们提出问题。</p>
</div>
<h2 id="Requirements" class="common-anchor-header">安装要求<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>确保已安装<a href="https://docs.docker.com/engine/install/">Docker</a></p>
<h2 id="Clone-the-repository" class="common-anchor-header">克隆版本库<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>克隆版本库并导航到它：</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">添加依赖关系<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">application</code> 文件夹下的<code translate="no">requirements.txt</code> 文件中添加<code translate="no">langchain-milvus</code> 依赖关系：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">设置环境变量<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>将<code translate="no">VECTOR_STORE=milvus</code>,<code translate="no">MILVUS_URI=...</code>,<code translate="no">MILVUS_TOKEN=...</code> 添加到<code translate="no">docker-compose.yaml</code> 文件中<code translate="no">backend</code> 和<code translate="no">worker</code> 服务的环境变量中，就像这样：</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>对于<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> ，您既可以使用完全托管的<a href="https://zilliz.com/cloud">Zilliz Cloud</a>(Recommended) 服务，也可以手动启动 Milvus 服务。</p>
<ul>
<li><p>对于完全托管的 Zilliz 云服务：我们推荐使用 Zilliz Cloud 服务。您可以在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上注册一个免费试用账户。之后，您将获得<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> ，它们与<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>相对应。</p></li>
<li><p>用于手动启动 Milvus 服务：如果要设置 Milvus 服务，可以按照<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Milvus 官方文档</a>设置 Milvus 服务器，然后从服务器获取<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> 。<code translate="no">MILVUS_URI</code> 和<code translate="no">MILVUS_TOKEN</code> 的格式应分别为<code translate="no">http://&lt;your_server_ip&gt;:19530</code> 和<code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> 。</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">启动服务<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>运行：<code translate="no">./setup.sh</code></p>
<p>然后导航至 http://localhost:5173/。</p>
<p>您可以在用户界面上进行操作，并提出有关文件的问题。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>alt文本</span> </span></p>
<p>如果要停止服务，运行：</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>有关详细信息和更高级的设置，请参阅<a href="https://github.com/arc53/DocsGPT">DocsGPT</a>官方文档。</p>
