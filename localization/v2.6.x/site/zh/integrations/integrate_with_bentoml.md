---
id: integrate_with_bentoml.md
summary: 本指南演示了如何使用 BentoCloud 上的开源嵌入模型和大语言模型与 Milvus 向量数据库来构建检索增强生成（RAG）应用程序。
title: 使用 Milvus 和 BentoML 的检索增强生成（RAG）
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="common-anchor-header">使用 Milvus 和 BentoML 的检索增强生成（RAG）<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="Introduction" class="common-anchor-header">简介<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南演示了如何使用 BentoCloud 上的开源嵌入模型和大型语言模型以及 Milvus 向量数据库来构建 RAG（检索增强生成）应用程序。 BentoCloud 是面向快速发展的人工智能团队的人工智能推理平台，为模型推理提供量身定制的全面管理基础设施。它与开源模型服务框架 BentoML 配合使用，便于轻松创建和部署高性能模型服务。在本演示中，我们使用 Milvus Lite 作为向量数据库，它是 Milvus 的轻量级版本，可以嵌入到您的 Python 应用程序中。</p>
<h2 id="Before-you-begin" class="common-anchor-header">开始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 可在 PyPI 上获取。您可以在 Python 3.8 以上版本中通过 pip 安装它：</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus milvus-lite bentoml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "Runtime"（运行时）菜单，从下拉菜单中选择 "Restart session"（重启会话））。</p>
</div>
<p>登录 BentoCloud 后，我们可以在 "部署"（Deployments）中与已部署的 BentoCloud 服务交互，相应的END_POINT 和 API 位于 Playground -&gt; Python。 您可以<a href="https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data">在此处</a>下载城市数据。</p>
<h2 id="Serving-Embeddings-with-BentoMLBentoCloud" class="common-anchor-header">使用 BentoML/BentoCloud 服务 Embeddings<button data-href="#Serving-Embeddings-with-BentoMLBentoCloud" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用该端点，请导入<code translate="no">bentoml</code> ，并通过指定端点和令牌（如果在 BentoCloud 上打开<code translate="no">Endpoint Authorization</code> ）使用<code translate="no">SyncHTTPClient</code> 设置 HTTP 客户端。或者，您也可以使用 BentoML 的<a href="https://github.com/bentoml/BentoSentenceTransformers">Sentence Transformers Embeddings</a>资源库来提供相同的模型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bentoml

BENTO_EMBEDDING_MODEL_END_POINT = <span class="hljs-string">&quot;BENTO_EMBEDDING_MODEL_END_POINT&quot;</span>
BENTO_API_TOKEN = <span class="hljs-string">&quot;BENTO_API_TOKEN&quot;</span>

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
<button class="copy-code-btn"></button></code></pre>
<p>连接到 embedding_client 后，我们需要处理数据。我们提供了几个函数来执行数据分割和嵌入。</p>
<p>读取文件并将文本预处理为字符串列表。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># naively chunk on newlines</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chunk_text</span>(<span class="hljs-params">filename: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
        text = f.read()
    sentences = text.split(<span class="hljs-string">&quot;\n&quot;</span>)
    <span class="hljs-keyword">return</span> sentences
<button class="copy-code-btn"></button></code></pre>
<p>首先，我们需要下载城市数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> urllib.request

<span class="hljs-comment"># set up the data source</span>
repo = <span class="hljs-string">&quot;ytang07/bento_octo_milvus_RAG&quot;</span>
directory = <span class="hljs-string">&quot;data&quot;</span>
save_dir = <span class="hljs-string">&quot;./city_data&quot;</span>
api_url = <span class="hljs-string">f&quot;https://api.github.com/repos/<span class="hljs-subst">{repo}</span>/contents/<span class="hljs-subst">{directory}</span>&quot;</span>


response = requests.get(api_url)
data = response.json()

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(save_dir):
    os.makedirs(save_dir)

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data:
    <span class="hljs-keyword">if</span> item[<span class="hljs-string">&quot;type&quot;</span>] == <span class="hljs-string">&quot;file&quot;</span>:
        file_url = item[<span class="hljs-string">&quot;download_url&quot;</span>]
        file_path = os.path.join(save_dir, item[<span class="hljs-string">&quot;name&quot;</span>])
        urllib.request.urlretrieve(file_url, file_path)
<button class="copy-code-btn"></button></code></pre>
<p>接下来，我们将对每个文件进行处理。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># please upload your data directory under this file&#x27;s folder</span>
cities = os.listdir(<span class="hljs-string">&quot;city_data&quot;</span>)
<span class="hljs-comment"># store chunked text for each of the cities in a list of dicts</span>
city_chunks = []
<span class="hljs-keyword">for</span> city <span class="hljs-keyword">in</span> cities:
    chunked = chunk_text(<span class="hljs-string">f&quot;city_data/<span class="hljs-subst">{city}</span>&quot;</span>)
    cleaned = []
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunked:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(chunk) &gt; <span class="hljs-number">7</span>:
            cleaned.append(chunk)
    mapped = {<span class="hljs-string">&quot;city_name&quot;</span>: city.split(<span class="hljs-string">&quot;.&quot;</span>)[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;chunks&quot;</span>: cleaned}
    city_chunks.append(mapped)
<button class="copy-code-btn"></button></code></pre>
<p>将字符串列表拆分成嵌入列表，每个嵌入列表分组 25 个文本字符串。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(texts) &gt; <span class="hljs-number">25</span>:
        splits = [texts[x : x + <span class="hljs-number">25</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(texts), <span class="hljs-number">25</span>)]
        embeddings = []
        <span class="hljs-keyword">for</span> split <span class="hljs-keyword">in</span> splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        <span class="hljs-keyword">return</span> embeddings
    <span class="hljs-keyword">return</span> embedding_client.encode(
        sentences=texts,
    )
<button class="copy-code-btn"></button></code></pre>
<p>现在，我们需要将 embeddings 和文本块匹配起来。由于嵌入列表和句子列表应按索引进行匹配，因此我们可以通过<code translate="no">enumerate</code> 任一列表进行匹配。</p>
<pre><code translate="no" class="language-python">entries = []
<span class="hljs-keyword">for</span> city_dict <span class="hljs-keyword">in</span> city_chunks:
    <span class="hljs-comment"># No need for the embeddings list if get_embeddings already returns a list of lists</span>
    embedding_list = get_embeddings(city_dict[<span class="hljs-string">&quot;chunks&quot;</span>])  <span class="hljs-comment"># returns a list of lists</span>
    <span class="hljs-comment"># Now match texts with embeddings and city name</span>
    <span class="hljs-keyword">for</span> i, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embedding_list):
        entry = {
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
            <span class="hljs-string">&quot;sentence&quot;</span>: city_dict[<span class="hljs-string">&quot;chunks&quot;</span>][
                i
            ],  <span class="hljs-comment"># Assume &quot;chunks&quot; has the corresponding texts for the embeddings</span>
            <span class="hljs-string">&quot;city&quot;</span>: city_dict[<span class="hljs-string">&quot;city_name&quot;</span>],
        }
        entries.append(entry)
    <span class="hljs-built_in">print</span>(entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Inserting-Data-into-a-Vector-Database-for-Retrieval" class="common-anchor-header">将数据插入向量数据库以便检索<button data-href="#Inserting-Data-into-a-Vector-Database-for-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>准备好嵌入和数据后，我们就可以将向量连同元数据一起插入 Milvus Lite，以便稍后进行向量搜索。本节的第一步是通过连接 Milvus Lite 来启动客户端。我们只需导入<code translate="no">MilvusClient</code> 模块并初始化一个 Milvus Lite 客户端，它将连接到你的 Milvus Lite 向量数据库。维度大小来自嵌入模型的大小，例如，Sentence Transformers 模型<code translate="no">all-MiniLM-L6-v2</code> 产生的向量维度为 384。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

COLLECTION_NAME = <span class="hljs-string">&quot;Bento_Milvus_RAG&quot;</span>  <span class="hljs-comment"># random name for your collection</span>
DIMENSION = <span class="hljs-number">384</span>

<span class="hljs-comment"># Initialize a Milvus Lite client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至于<code translate="no">MilvusClient</code> 的参数：</p>
<ul>
<li>将<code translate="no">uri</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> ，作为您的<code translate="no">uri</code> 。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</div>
<p>或者使用旧的 connections.connect API（不推荐）：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

connections.connect(uri=<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-Your-Milvus-Lite-Collection" class="common-anchor-header">创建 Milvus Lite Collections<button data-href="#Creating-Your-Milvus-Lite-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 Milvus Lite 创建 Collections 包括两个步骤：首先是定义 Schema，其次是定义索引。在本节中，我们需要一个模块：DataType 告诉我们字段中的数据类型。我们还需要使用两个函数来创建模式和添加字段：create_schema()：创建 Collections 模式，add_field()：向 Collection 的模式中添加字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<p>现在，我们已经创建了模式并成功定义了数据字段，我们需要定义索引。就搜索而言，"索引 "定义了我们如何映射数据以供检索。在本项目中，我们使用默认的 "<a href="https://docs.zilliz.com/docs/autoindex-explained">AUTOINDEX</a>"为数据建立索引。</p>
<p>接下来，我们用之前给定的名称、Schema 和索引创建 Collections。最后，插入之前处理过的数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># prepare index parameters</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># add index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)

<span class="hljs-comment"># create collection</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

<span class="hljs-comment"># Outside the loop, now you upsert all the entries at once</span>
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Your-LLM-for-RAG" class="common-anchor-header">为 RAG 设置 LLM<button data-href="#Set-up-Your-LLM-for-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>要创建 RAG 应用程序，我们需要在 BentoCloud 上部署 LLM。让我们使用最新的 Llama3 LLM。启动并运行后，只需复制该模型服务的端点和令牌，并为其设置客户端即可。</p>
<pre><code translate="no" class="language-python">BENTO_LLM_END_POINT = <span class="hljs-string">&quot;BENTO_LLM_END_POINT&quot;</span>

llm_client = bentoml.SyncHTTPClient(BENTO_LLM_END_POINT, token=BENTO_API_TOKEN)
<button class="copy-code-btn"></button></code></pre>
<h2 id="LLM-Instructions" class="common-anchor-header">LLM 说明<button data-href="#LLM-Instructions" class="anchor-icon" translate="no">
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
    </button></h2><p>现在，我们用提示、上下文和问题设置 LLM 指令。下面是作为 LLM 的函数，它会以字符串格式返回客户端的输出。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dorag</span>(<span class="hljs-params">question: <span class="hljs-built_in">str</span>, context: <span class="hljs-built_in">str</span></span>):

    prompt = (
        <span class="hljs-string">f&quot;You are a helpful assistant. The user has a question. Answer the user question based only on the context: <span class="hljs-subst">{context}</span>. \n&quot;</span>
        <span class="hljs-string">f&quot;The user question is <span class="hljs-subst">{question}</span>&quot;</span>
    )

    results = llm_client.generate(
        max_tokens=<span class="hljs-number">1024</span>,
        prompt=prompt,
    )

    res = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        res += result

    <span class="hljs-keyword">return</span> res
<button class="copy-code-btn"></button></code></pre>
<h2 id="A-RAG-Example" class="common-anchor-header">RAG 示例<button data-href="#A-RAG-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>现在我们可以提问了。该函数只需接收一个问题，然后通过 RAG 从背景信息中生成相关上下文。然后，我们将上下文和问题传递给 dorag() 并得到结果。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What state is Cambridge in?&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_a_question</span>(<span class="hljs-params">question</span>):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  <span class="hljs-comment"># search for the one (1) embedding returned as a list of lists</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># get me the top 5 results</span>
        output_fields=[<span class="hljs-string">&quot;sentence&quot;</span>],  <span class="hljs-comment"># get the sentence/chunk and city</span>
    )

    sentences = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            <span class="hljs-built_in">print</span>(hit)
            sentences.append(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;sentence&quot;</span>])
    context = <span class="hljs-string">&quot;. &quot;</span>.join(sentences)
    <span class="hljs-keyword">return</span> context


context = ask_a_question(question=question)
<span class="hljs-built_in">print</span>(context)
<button class="copy-code-btn"></button></code></pre>
<p>实现 RAG</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(dorag(question=question, context=context))
<button class="copy-code-btn"></button></code></pre>
<p>对于询问剑桥处于哪个州的示例问题，我们可以从 BentoML 中打印出整个回复。不过，如果我们花点时间解析一下，就会发现它看起来更漂亮，而且应该能告诉我们剑桥位于马萨诸塞州。</p>
