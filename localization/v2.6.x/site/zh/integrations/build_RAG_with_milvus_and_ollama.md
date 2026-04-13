---
id: build_RAG_with_milvus_and_ollama.md
summary: 在本指南中，我们将向您展示如何利用 Ollama 和 Milvus 高效、安全地构建 RAG（检索-增强生成）管道。
title: 使用 Milvus 和 Ollama 构建 RAG
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_ollama.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-RAG-with-Milvus-and-Ollama" class="common-anchor-header">使用 Milvus 和 Ollama 构建 RAG<button data-href="#Build-RAG-with-Milvus-and-Ollama" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://ollama.com/">Ollama</a>是一个开源平台，可简化大型语言模型 (LLM) 的本地运行和定制。它提供了用户友好的无云体验，无需高级技术技能即可轻松实现模型下载、安装和交互。凭借不断增长的预训练 LLMs 库（从通用型到特定领域型），Ollama 可以轻松管理和定制各种应用的模型。它确保了数据的私密性和灵活性，使用户能够完全在自己的机器上微调、优化和部署人工智能驱动的解决方案。</p>
<p>在本指南中，我们将向您展示如何利用 Ollama 和 Milvus 高效、安全地构建 RAG（检索-增强生成）管道。</p>
<h2 id="Preparation" class="common-anchor-header">准备工作<button data-href="#Preparation" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">依赖关系和环境<button data-href="#Dependencies-and-Environment" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus milvus-lite ollama</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<h3 id="Prepare-the-data" class="common-anchor-header">准备数据<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>我们使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文档 2.4.x</a>中的常见问题页面作为 RAG 中的私有知识，这对于简单的 RAG 管道来说是一个很好的数据源。</p>
<p>下载 zip 文件并将文档解压缩到<code translate="no">milvus_docs</code> 文件夹中。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2024-11-26 21:47:19--  https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
Resolving github.com (github.com)... 140.82.112.4
Connecting to github.com (github.com)|140.82.112.4|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20241127T024720Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&amp;X-Amz-SignedHeaders=host&amp;response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&amp;response-content-type=application%2Foctet-stream [following]
--2024-11-26 21:47:20--  https://objects.githubusercontent.com/github-production-release-asset-2e65be/267273319/c52902a0-e13c-4ca7-92e0-086751098a05?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=releaseassetproduction%2F20241127%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20241127T024720Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=7808b77cbdaa7e122196bcd75a73f29f2540333a350c4830bbdf5f286e876304&amp;X-Amz-SignedHeaders=host&amp;response-content-disposition=attachment%3B%20filename%3Dmilvus_docs_2.4.x_en.zip&amp;response-content-type=application%2Foctet-stream
Resolving objects.githubusercontent.com (objects.githubusercontent.com)... 185.199.109.133, 185.199.111.133, 185.199.108.133, ...
Connecting to objects.githubusercontent.com (objects.githubusercontent.com)|185.199.109.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 613094 (599K) [application/octet-stream]
Saving to: ‘milvus_docs_2.4.x_en.zip’

milvus_docs_2.4.x_e 100%[===================&gt;] 598.72K  1.20MB/s    in 0.5s    

2024-11-26 21:47:20 (1.20 MB/s) - ‘milvus_docs_2.4.x_en.zip’ saved [613094/613094]
</code></pre>
<p>我们从<code translate="no">milvus_docs/en/faq</code> 文件夹中加载所有标记文件。对于每个文档，我们只需简单地使用 "#"来分隔文件中的内容，这样就能大致分隔出 markdown 文件中每个主要部分的内容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-LLM-and-Embedding-Model" class="common-anchor-header">准备 LLM 和 Embeddings 模型<button data-href="#Prepare-the-LLM-and-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h3><p>Ollama 支持基于 LLM 任务和嵌入生成的多种模型，这使得开发检索增强生成（RAG）应用变得非常容易。在此设置中</p>
<ul>
<li>我们将使用<strong>Llama 3.2 (3B)</strong>作为文本生成任务的 LLM。</li>
<li>对于嵌入生成，我们将使用<strong>mxbai-embed-large</strong>，这是一个针对语义相似性优化的 334M 参数模型。</li>
</ul>
<p>在开始之前，请确保这两个模型都已拉到本地：</p>
<pre><code translate="no" class="language-python">! ollama pull mxbai-embed-large
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
pulling 819c2adf5ce6... 100% ▕████████████████▏ 669 MB                         
pulling c71d239df917... 100% ▕████████████████▏  11 KB                         
pulling b837481ff855... 100% ▕████████████████▏   16 B                         
pulling 38badd946f91... 100% ▕████████████████▏  408 B                         
verifying sha256 digest 
writing manifest 
success [?25h
</code></pre>
<pre><code translate="no" class="language-python">! ollama pull llama3<span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[?25lpulling manifest ⠋ [?25h[?25l[2K[1Gpulling manifest ⠙ [?25h[?25l[2K[1Gpulling manifest ⠹ [?25h[?25l[2K[1Gpulling manifest ⠸ [?25h[?25l[2K[1Gpulling manifest ⠼ [?25h[?25l[2K[1Gpulling manifest ⠴ [?25h[?25l[2K[1Gpulling manifest 
pulling dde5aa3fc5ff... 100% ▕████████████████▏ 2.0 GB                         
pulling 966de95ca8a6... 100% ▕████████████████▏ 1.4 KB                         
pulling fcc5a6bec9da... 100% ▕████████████████▏ 7.7 KB                         
pulling a70ff7e570d9... 100% ▕████████████████▏ 6.0 KB                         
pulling 56bb8bd477a5... 100% ▕████████████████▏   96 B                         
pulling 34bb5ab01051... 100% ▕████████████████▏  561 B                         
verifying sha256 digest 
writing manifest 
success [?25h
</code></pre>
<p>准备好这些模型后，我们就可以开始实施 LLM 驱动的生成和基于嵌入的检索工作流程了。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> ollama


<span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    response = ollama.embeddings(model=<span class="hljs-string">&quot;mxbai-embed-large&quot;</span>, prompt=text)
    <span class="hljs-keyword">return</span> response[<span class="hljs-string">&quot;embedding&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<p>生成一个测试嵌入并打印其维度和前几个元素。</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1024
[0.23276396095752716, 0.4257211685180664, 0.19724100828170776, 0.46120673418045044, -0.46039995551109314, -0.1413791924715042, -0.18261606991291046, -0.07602324336767197, 0.39991313219070435, 0.8337644338607788]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">将数据加载到 Milvus 中<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">创建 Collections<button data-href="#Create-the-Collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至于<code translate="no">MilvusClient</code> 的参数：</p>
<ul>
<li>将<code translate="no">uri</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> ，作为您的<code translate="no">uri</code> 。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</div>
<p>检查 Collections 是否已存在，如果已存在，则删除它。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定参数创建新 Collections。</p>
<p>如果我们不指定任何字段信息，Milvus 会自动创建一个主键的默认<code translate="no">id</code> 字段，以及一个存储向量数据的<code translate="no">vector</code> 字段。保留的 JSON 字段用于存储非 Schema 定义的字段及其值。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/tune_consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">插入数据<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>遍历文本行，创建 Embeddings，然后将数据插入 Milvus。</p>
<p>这里有一个新字段<code translate="no">text</code> ，它是 Collections Schema 中的一个非定义字段。它将自动添加到保留的 JSON 动态字段中，在高层次上可将其视为普通字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:03&lt;00:00, 22.56it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Build-RAG" class="common-anchor-header">构建 RAG<button data-href="#Build-RAG" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Retrieve-data-for-a-query" class="common-anchor-header">为查询检索数据<button data-href="#Retrieve-data-for-a-query" class="anchor-icon" translate="no">
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
    </button></h3><p>让我们指定一个关于 Milvus 的常见问题。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Collections 中搜索该问题，并检索语义前 3 个匹配项。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># Return top 3 results</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},  <span class="hljs-comment"># Inner product distance</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],  <span class="hljs-comment"># Return the text field</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>让我们看看查询的搜索结果</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json

retrieved_lines_with_distances = [
    (res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]
]
<span class="hljs-built_in">print</span>(json.dumps(retrieved_lines_with_distances, indent=<span class="hljs-number">4</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[
    [
        &quot; Where does Milvus store data?\n\nMilvus deals with two types of data, inserted data and metadata. \n\nInserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).\n\nMetadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.\n\n###&quot;,
        231.9398193359375
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        226.48316955566406
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        210.60745239257812
    ]
]
</code></pre>
<h3 id="Use-LLM-to-get-a-RAG-response" class="common-anchor-header">使用 LLM 获取 RAG 响应<button data-href="#Use-LLM-to-get-a-RAG-response" class="anchor-icon" translate="no">
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
    </button></h3><p>将检索到的文档转换为字符串格式。</p>
<pre><code translate="no" class="language-python">context = <span class="hljs-string">&quot;\n&quot;</span>.join(
    [line_with_distance[<span class="hljs-number">0</span>] <span class="hljs-keyword">for</span> line_with_distance <span class="hljs-keyword">in</span> retrieved_lines_with_distances]
)
<button class="copy-code-btn"></button></code></pre>
<p>为 Lanage 模型定义系统和用户提示。该提示与从 Milvus 检索到的文档组装在一起。</p>
<pre><code translate="no" class="language-python">SYSTEM_PROMPT = <span class="hljs-string">&quot;&quot;&quot;
Human: You are an AI assistant. You are able to find answers to the questions from the contextual passage snippets provided.
&quot;&quot;&quot;</span>
USER_PROMPT = <span class="hljs-string">f&quot;&quot;&quot;
Use the following pieces of information enclosed in &lt;context&gt; tags to provide an answer to the question enclosed in &lt;question&gt; tags.
&lt;context&gt;
<span class="hljs-subst">{context}</span>
&lt;/context&gt;
&lt;question&gt;
<span class="hljs-subst">{question}</span>
&lt;/question&gt;
&quot;&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>使用 Ollama 提供的<code translate="no">llama3.2</code> 模型，根据提示生成响应。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> ollama <span class="hljs-keyword">import</span> chat
<span class="hljs-keyword">from</span> ollama <span class="hljs-keyword">import</span> ChatResponse

response: ChatResponse = chat(
    model=<span class="hljs-string">&quot;llama3.2&quot;</span>,
    messages=[
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: SYSTEM_PROMPT},
        {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: USER_PROMPT},
    ],
)
<span class="hljs-built_in">print</span>(response[<span class="hljs-string">&quot;message&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">According to the provided context, data in Milvus is stored in two types:

1. **Inserted data**: Storing data in persistent storage as incremental log. It supports multiple object storage backends such as MinIO, AWS S3, Google Cloud Storage (GCS), Azure Blob Storage, Alibaba Cloud OSS, and Tencent Cloud Object Storage.

2. **Metadata**: Generated within Milvus and stored in etcd.
</code></pre>
<p>很好！我们利用 Milvus 和 Ollama 成功构建了 RAG 管道。</p>
