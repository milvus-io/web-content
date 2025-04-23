---
id: rag_with_milvus_and_unstructured.md
summary: 在本教程中，我们将使用 Unstructured 来摄取 PDF 文档，然后使用 Milvus 构建 RAG 管道。
title: 利用 Milvus 和 Unstructured 创建 RAG
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_unstructured.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Build-a-RAG-with-Milvus-and-Unstructured" class="common-anchor-header">利用 Milvus 和 Unstructured 创建 RAG<button data-href="#Build-a-RAG-with-Milvus-and-Unstructured" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.unstructured.io/welcome">Unstructured</a>提供了一个平台和工具，用于为检索增强生成（RAG）和模型微调摄取和处理非结构化文档。它提供无代码 UI 平台和无服务器 API 服务，允许用户在 Unstructured 托管的计算资源上处理数据。</p>
<p>在本教程中，我们将使用 Unstructured 采集 PDF 文档，然后使用 Milvus 构建 RAG 管道。</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">依赖和环境</h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -qU <span class="hljs-string">&quot;unstructured[pdf]&quot;</span> pymilvus openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>安装选项：</strong></p>
<ul>
<li>用于处理所有文档格式：<code translate="no">pip install &quot;unstructured[all-docs]&quot;</code></li>
<li>用于特定格式（如 PDF）：<code translate="no">pip install &quot;unstructured[pdf]&quot;</code></li>
<li>更多安装选项，请参阅<a href="https://docs.unstructured.io/open-source/installation/full-installation">Unstructured 文档</a></li>
</ul>
<p>如果使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
<p>在本例中，我们将使用 OpenAI 作为 LLM。您应将<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 作为环境变量。</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-Milvus-and-OpenAI-clients" class="common-anchor-header">准备 Milvus 和 OpenAI 客户端</h3><p>您可以使用 Milvus 客户端创建 Milvus Collections 并向其中插入数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Initialize Milvus client</span>
milvus_client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至于<code translate="no">MilvusClient</code> 的参数：</p>
<ul>
<li>将<code translate="no">uri</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储到此文件中。</li>
<li>如果你有大规模数据，比如超过一百万个向量，你可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器地址和端口作为 uri，例如<code translate="no">http://localhost:19530</code> 。如果在 Milvus 上启用了身份验证功能，请使用 "<your_username>:<your_password>" 作为令牌，否则不要设置令牌。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">uri</code> 和<code translate="no">token</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</div>
<p>检查 Collections 是否已经存在，如果存在则删除。</p>
<pre><code translate="no" class="language-python">collection_name = <span class="hljs-string">&quot;my_rag_collection&quot;</span>

<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>准备一个 OpenAI 客户端来生成嵌入和生成响应。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> OpenAI

openai_client = OpenAI()


<span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>生成一个测试嵌入，并打印其维度和前几个元素。</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">1536
[0.009889289736747742, -0.005578675772994757, 0.00683477520942688, -0.03805781528353691, -0.01824733428657055, -0.04121600463986397, -0.007636285852640867, 0.03225184231996536, 0.018949154764413834, 9.352207416668534e-05]
</code></pre>
<h2 id="Create-Milvus-Collection" class="common-anchor-header">创建 Milvus Collections<button data-href="#Create-Milvus-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>我们将创建一个具有以下 Schema 的 Collection：</p>
<ul>
<li><code translate="no">id</code>主键：主键是每个文档的唯一标识符。</li>
<li><code translate="no">vector</code>主键：文档的 Embeddings。</li>
<li><code translate="no">text</code>文档的文本内容。</li>
<li><code translate="no">metadata</code>文档的元数据。</li>
</ul>
<p>然后，我们在<code translate="no">vector</code> 字段上建立<code translate="no">AUTOINDEX</code> 索引。然后创建 Collections。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create schema</span>
schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
<span class="hljs-comment"># Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=embedding_dim)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;metadata&quot;</span>, datatype=DataType.JSON)
index_params = MilvusClient.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
)
milvus_client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,
)

milvus_client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-data-from-Unstructured" class="common-anchor-header">从 Unstructured 中加载数据<button data-href="#Load-data-from-Unstructured" class="anchor-icon" translate="no">
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
    </button></h2><p>Unstructured 提供了灵活而强大的摄取管道，可以处理各种文件类型，包括 PDF、HTML 等。 我们将对本地 PDF 文件进行分区和分块。然后将数据加载到 Milvus 中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> warnings
<span class="hljs-keyword">from</span> unstructured.partition.auto <span class="hljs-keyword">import</span> partition

warnings.filterwarnings(<span class="hljs-string">&quot;ignore&quot;</span>)

elements = partition(
    filename=<span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>,
    strategy=<span class="hljs-string">&quot;hi_res&quot;</span>,
    chunking_strategy=<span class="hljs-string">&quot;by_title&quot;</span>,
)  <span class="hljs-comment"># Replace with the path to your PDF file</span>
<button class="copy-code-btn"></button></code></pre>
<p>让我们检查 PDF 文件中的分区元素。每个元素代表 Unstructured 分区过程中提取的内容块。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> element <span class="hljs-keyword">in</span> elements:
    <span class="hljs-built_in">print</span>(element)
    <span class="hljs-keyword">break</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">What is Milvus?

Milvus is a high-performance, highly scalable vector database that runs efficiently across a wide range of environments, from a laptop to large-scale distributed systems. It is available as both open-source software and a cloud service.
</code></pre>
<p>将数据插入 Milvus。</p>
<pre><code translate="no" class="language-python">data = []
<span class="hljs-keyword">for</span> i, element <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(elements):
    data.append(
        {
            <span class="hljs-string">&quot;id&quot;</span>: i,
            <span class="hljs-string">&quot;vector&quot;</span>: emb_text(element.text),
            <span class="hljs-string">&quot;text&quot;</span>: element.text,
            <span class="hljs-string">&quot;metadata&quot;</span>: element.metadata.to_dict(),
        }
    )
milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'insert_count': 29, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 'cost': 0}
</code></pre>
<h2 id="Retrieve-and-Generate-Response" class="common-anchor-header">检索和生成响应<button data-href="#Retrieve-and-Generate-Response" class="anchor-icon" translate="no">
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
    </button></h2><p>定义一个函数，从 Milvus 中检索相关文件。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_documents</span>(<span class="hljs-params">question, top_k=<span class="hljs-number">3</span></span>):
    search_res = milvus_client.search(
        collection_name=collection_name,
        data=[emb_text(question)],
        limit=top_k,
        <span class="hljs-comment"># search_params={&quot;metric_type&quot;: &quot;IP&quot;, &quot;params&quot;: {}},</span>
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    )
    <span class="hljs-keyword">return</span> [(res[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;text&quot;</span>], res[<span class="hljs-string">&quot;distance&quot;</span>]) <span class="hljs-keyword">for</span> res <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]
<button class="copy-code-btn"></button></code></pre>
<p>定义一个函数，使用 RAG 管道中检索到的文档生成响应。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_rag_response</span>(<span class="hljs-params">question</span>):
    retrieved_docs = retrieve_documents(question)
    context = <span class="hljs-string">&quot;\n&quot;</span>.join([<span class="hljs-string">f&quot;Text: <span class="hljs-subst">{doc[<span class="hljs-number">0</span>]}</span>\n&quot;</span> <span class="hljs-keyword">for</span> doc <span class="hljs-keyword">in</span> retrieved_docs])
    system_prompt = (
        <span class="hljs-string">&quot;You are an AI assistant. Provide answers based on the given context.&quot;</span>
    )
    user_prompt = <span class="hljs-string">f&quot;&quot;&quot;
    Use the following pieces of information to answer the question. If the information is not in the context, say you don&#x27;t know.
    
    Context:
    <span class="hljs-subst">{context}</span>
    
    Question: <span class="hljs-subst">{question}</span>
    &quot;&quot;&quot;</span>
    response = openai_client.chat.completions.create(
        model=<span class="hljs-string">&quot;gpt-4o-mini&quot;</span>,
        messages=[
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;system&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: system_prompt},
            {<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt},
        ],
    )
    <span class="hljs-keyword">return</span> response.choices[<span class="hljs-number">0</span>].message.content
<button class="copy-code-btn"></button></code></pre>
<p>让我们用一个示例问题来测试 RAG 管道。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>
answer = generate_rag_response(question)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Question: <span class="hljs-subst">{question}</span>&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Answer: <span class="hljs-subst">{answer}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Question: What is the Advanced Search Algorithms in Milvus?
Answer: The Advanced Search Algorithms in Milvus include a wide range of in-memory and on-disk indexing/search algorithms such as IVF, HNSW, and DiskANN. These algorithms have been deeply optimized, and Milvus delivers 30%-70% better performance compared to popular implementations like FAISS and HNSWLib.
</code></pre>
