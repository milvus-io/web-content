---
id: integrate_with_openai.md
title: 使用 Milvus 和 OpenAI 进行语义搜索
summary: 本页讨论向量数据库与 OpenAI 的 Embeddings API 的集成。
---
<h1 id="Semantic-Search-with-Milvus-and-OpenAI" class="common-anchor-header">使用 Milvus 和 OpenAI 进行语义搜索<button data-href="#Semantic-Search-with-Milvus-and-OpenAI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_openai.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/semantic_search_with_milvus_and_openai.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>本指南展示了如何将<a href="https://platform.openai.com/docs/guides/embeddings">OpenAI 的 Embedding API</a>与 Milvus 向量数据库结合使用，对文本进行语义搜索。</p>
<h2 id="Getting-started" class="common-anchor-header">开始<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><p>在开始之前，请确保您已准备好 OpenAI API 密钥，或者您可以从<a href="https://openai.com/index/openai-api/">OpenAI 网站</a>获取一个。</p>
<p>本示例中使用的数据是书名。你可以<a href="https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks">在这里</a>下载数据集，并将其放在运行以下代码的同一目录下。</p>
<p>首先，安装 Milvus 和 OpenAI 的软件包：</p>
<pre><code translate="no" class="language-shell">pip install --upgrade openai pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，为了启用刚刚安装的依赖项，您可能需要<strong>重启运行时</strong>。(点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<p>这样，我们就可以生成 Embeddings 并使用向量数据库进行语义搜索了。</p>
<h2 id="Searching-book-titles-with-OpenAI--Milvus" class="common-anchor-header">使用 OpenAI 和 Milvus 搜索书名<button data-href="#Searching-book-titles-with-OpenAI--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>在下面的示例中，我们从下载的 CSV 文件中加载书名数据，使用 OpenAI 嵌入模型生成向量表示，并将其存储在 Milvus 向量数据库中进行语义搜索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

MODEL_NAME = <span class="hljs-string">&quot;text-embedding-3-small&quot;</span>  <span class="hljs-comment"># Which model to use, please check https://platform.openai.com/docs/guides/embeddings for available models</span>
DIMENSION = <span class="hljs-number">1536</span>  <span class="hljs-comment"># Dimension of vector embedding</span>

<span class="hljs-comment"># Connect to OpenAI with API Key.</span>
openai_client = OpenAI(api_key=<span class="hljs-string">&quot;&lt;YOUR_OPENAI_API_KEY&gt;&quot;</span>)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

vectors = [
    vec.embedding
    <span class="hljs-keyword">for</span> vec <span class="hljs-keyword">in</span> openai_client.embeddings.create(<span class="hljs-built_in">input</span>=docs, model=MODEL_NAME).data
]

<span class="hljs-comment"># Prepare data to be stored in Milvus vector database.</span>
<span class="hljs-comment"># We can store the id, vector representation, raw text and labels such as &quot;subject&quot; in this case in Milvus.</span>
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]


<span class="hljs-comment"># Connect to Milvus, all data is stored in a local file named &quot;milvus_openai_demo.db&quot;</span>
<span class="hljs-comment"># in current directory. You can also connect to a remote Milvus server following this</span>
<span class="hljs-comment"># instruction: https://milvus.io/docs/install_standalone-docker.md.</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;milvus_openai_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-comment"># Create a collection to store the vectors and text.</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

<span class="hljs-comment"># Insert all data into Milvus vector database.</span>
res = milvus_client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至于<code translate="no">MilvusClient</code> 的参数：</p>
<ul>
<li>将<code translate="no">uri</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> ，作为您的<code translate="no">uri</code> 。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</div>
<p>有了 Milvus 向量数据库中的所有数据，我们现在就可以通过为查询生成向量 Embeddings 来执行语义搜索，并进行向量搜索。</p>
<pre><code translate="no" class="language-python">queries = [<span class="hljs-string">&quot;When was artificial intelligence founded?&quot;</span>]

query_vectors = [
    vec.embedding
    <span class="hljs-keyword">for</span> vec <span class="hljs-keyword">in</span> openai_client.embeddings.create(<span class="hljs-built_in">input</span>=queries, model=MODEL_NAME).data
]

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=query_vectors,  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">2</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)

<span class="hljs-keyword">for</span> q <span class="hljs-keyword">in</span> queries:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query:&quot;</span>, q)
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
        <span class="hljs-built_in">print</span>(result)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>输出结果如下：</p>
<pre><code translate="no" class="language-python">[
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;distance&quot;</span>: -<span class="hljs-number">0.772376537322998</span>,
        <span class="hljs-string">&quot;entity&quot;</span>: {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
            <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>,
        },
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;distance&quot;</span>: -<span class="hljs-number">0.58596271276474</span>,
        <span class="hljs-string">&quot;entity&quot;</span>: {
            <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
            <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>,
        },
    },
]
<button class="copy-code-btn"></button></code></pre>
