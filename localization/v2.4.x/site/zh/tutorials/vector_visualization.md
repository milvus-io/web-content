---
id: vector_visualization.md
summary: 在本例中，我们将展示如何使用 t-SN 可视化 Milvus 中的嵌入（向量）。
title: 向量可视化
---
<h1 id="Vector-Visualization" class="common-anchor-header">向量可视化<button data-href="#Vector-Visualization" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/vector_visualization.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/vector_visualization.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>在本例中，我们将展示如何使用<a href="https://www.wikiwand.com/en/articles/T-distributed_stochastic_neighbor_embedding">t-SNE</a> 可视化 Milvus 中的嵌入（向量）。</p>
<p>减维技术（如 t-SNE）对于在二维或三维空间中可视化复杂的高维数据，同时保留局部结构来说非常宝贵。这可以实现模式识别，增强对特征关系的理解，并方便解释机器学习模型的结果。此外，它还能通过直观地比较聚类结果来帮助算法评估，简化向非专业受众的数据展示，并通过使用低维表示来降低计算成本。通过这些应用，t-SNE 不仅有助于深入了解数据集，还能支持更明智的决策过程。</p>
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
    </button></h2><h3 id="Dependencies-and-Environment" class="common-anchor-header">依赖和环境</h3><pre><code translate="no" class="language-shell">$ pip install --upgrade pymilvus openai requests tqdm matplotlib seaborn
<button class="copy-code-btn"></button></code></pre>
<p>我们将在本例中使用 OpenAI 的 Embeddings 模型。你需要准备 OPENAI_API_KEY 作为环境变量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.<span class="hljs-property">environ</span>[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-data" class="common-anchor-header">准备数据<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h2><p>我们使用 Milvus<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">文档 2.4.x</a>中的常见问题页面作为 RAG 中的私有知识，这对于简单的 RAG 管道来说是一个很好的数据源。</p>
<p>下载 zip 文件并将文档解压缩到<code translate="no">milvus_docs</code> 文件夹中。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
$ unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<p>我们从<code translate="no">milvus_docs/en/faq</code> 文件夹中加载所有标记文件。对于每个文档，我们只需简单地使用 &quot;#&quot;来分隔文件中的内容，这样就能大致分隔出 markdown 文件中每个主要部分的内容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-the-Embedding-Model" class="common-anchor-header">准备嵌入模型<button data-href="#Prepare-the-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>我们初始化 OpenAI 客户端，准备嵌入模型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> openai <span class="hljs-keyword">import</span> <span class="hljs-title class_">OpenAI</span>

openai_client = <span class="hljs-title class_">OpenAI</span>()
<button class="copy-code-btn"></button></code></pre>
<p>定义一个函数，使用 OpenAI 客户端生成文本嵌入。我们以<a href="https://platform.openai.com/docs/guides/embeddings">text-embedding-3-large</a>模型为例。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">emb_text</span>(<span class="hljs-params">text</span>):
    <span class="hljs-keyword">return</span> (
        openai_client.embeddings.create(<span class="hljs-built_in">input</span>=text, model=<span class="hljs-string">&quot;text-embedding-3-large&quot;</span>)
        .data[<span class="hljs-number">0</span>]
        .embedding
    )
<button class="copy-code-btn"></button></code></pre>
<p>生成一个测试嵌入，并打印其尺寸和前几个元素。</p>
<pre><code translate="no" class="language-python">test_embedding = emb_text(<span class="hljs-string">&quot;This is a test&quot;</span>)
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">3072
[-0.015370666049420834, 0.00234124343842268, -0.01011690590530634, 0.044725317507982254, -0.017235849052667618, -0.02880779094994068, -0.026678944006562233, 0.06816216558218002, -0.011376636102795601, 0.021659553050994873]
</code></pre>
<h2 id="Load-data-into-Milvus" class="common-anchor-header">将数据载入 Milvus<button data-href="#Load-data-into-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-Collection" class="common-anchor-header">创建 Collections</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>

milvus_client = <span class="hljs-title class_">MilvusClient</span>(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)

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
<p>检查 Collections 是否已存在，如果已存在，则将其删除。</p>
<pre><code translate="no" class="language-python">if milvus_client.has_collection(collection_name):
    milvus_client.drop_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>使用指定参数创建新 Collections。</p>
<p>如果我们不指定任何字段信息，Milvus 会自动创建一个主键的默认<code translate="no">id</code> 字段，以及一个存储向量数据的<code translate="no">vector</code> 字段。保留的 JSON 字段用于存储非 Schema 定义的字段及其值。</p>
<pre><code translate="no" class="language-python">milvus_client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Strong consistency level</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">插入数据<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>遍历文本行，创建 Embeddings，然后将数据插入 Milvus。</p>
<p>这里有一个新字段<code translate="no">text</code> ，它是 Collections Schema 中的一个非定义字段。它会自动添加到预留的 JSON 动态字段中，在高层次上可将其视为普通字段。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: emb_text(line), <span class="hljs-string">&quot;text&quot;</span>: line})

milvus_client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Creating embeddings: 100%|██████████| 72/72 [00:20&lt;00:00,  3.60it/s]





{'insert_count': 72, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71], 'cost': 0}
</code></pre>
<h2 id="Visualizing-Embeddings-in-Vector-Search" class="common-anchor-header">向量搜索中的可视化 Embeddings<button data-href="#Visualizing-Embeddings-in-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将执行一次 milvus 搜索，然后将查询向量和检索向量一起进行降维可视化。</p>
<h3 id="Retrieve-Data-for-a-Query" class="common-anchor-header">检索查询数据</h3><p>让我们为搜索准备一个问题。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Modify the question to test it with your own query!</span>

question = <span class="hljs-string">&quot;How is data stored in Milvus?&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Collections 中搜索该问题，并检索语义前 10 个匹配项。</p>
<pre><code translate="no" class="language-python">search_res = milvus_client.search(
    collection_name=collection_name,
    data=[
        emb_text(question)
    ],  <span class="hljs-comment"># Use the `emb_text` function to convert the question to an embedding vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># Return top 10 results</span>
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
        0.7675539255142212
    ],
    [
        &quot;How does Milvus handle vector data types and precision?\n\nMilvus supports Binary, Float32, Float16, and BFloat16 vector types.\n\n- Binary vectors: Store binary data as sequences of 0s and 1s, used in image processing and information retrieval.\n- Float32 vectors: Default storage with a precision of about 7 decimal digits. Even Float64 values are stored with Float32 precision, leading to potential precision loss upon retrieval.\n- Float16 and BFloat16 vectors: Offer reduced precision and memory usage. Float16 is suitable for applications with limited bandwidth and storage, while BFloat16 balances range and efficiency, commonly used in deep learning to reduce computational requirements without significantly impacting accuracy.\n\n###&quot;,
        0.6210848689079285
    ],
    [
        &quot;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When a query request comes, Milvus searches both incremental data and historical data by loading them into memory. Incremental data are in the growing segments, which are buffered in memory before they reach the threshold to be persisted in storage engine, while historical data are from the sealed segments that are stored in the object storage. Incremental data and historical data together constitute the whole dataset to search.\n\n###&quot;,
        0.585393488407135
    ],
    [
        &quot;Why is there no vector data in etcd?\n\netcd stores Milvus module metadata; MinIO stores entities.\n\n###&quot;,
        0.579704999923706
    ],
    [
        &quot;How does Milvus flush data?\n\nMilvus returns success when inserted data are loaded to the message queue. However, the data are not yet flushed to the disk. Then Milvus' data node writes the data in the message queue to persistent storage as incremental logs. If `flush()` is called, the data node is forced to write all data in the message queue to persistent storage immediately.\n\n###&quot;,
        0.5777501463890076
    ],
    [
        &quot;What is the maximum dataset size Milvus can handle?\n\n  \nTheoretically, the maximum dataset size Milvus can handle is determined by the hardware it is run on, specifically system memory and storage:\n\n- Milvus loads all specified collections and partitions into memory before running queries. Therefore, memory size determines the maximum amount of data Milvus can query.\n- When new entities and and collection-related schema (currently only MinIO is supported for data persistence) are added to Milvus, system storage determines the maximum allowable size of inserted data.\n\n###&quot;,
        0.5655910968780518
    ],
    [
        &quot;Does Milvus support inserting and searching data simultaneously?\n\nYes. Insert operations and query operations are handled by two separate modules that are mutually independent. From the client\u2019s perspective, an insert operation is complete when the inserted data enters the message queue. However, inserted data are unsearchable until they are loaded to the query node. If the segment size does not reach the index-building threshold (512 MB by default), Milvus resorts to brute-force search and query performance may be diminished.\n\n###&quot;,
        0.5618637204170227
    ],
    [
        &quot;What data types does Milvus support on the primary key field?\n\nIn current release, Milvus supports both INT64 and string.\n\n###&quot;,
        0.5561620593070984
    ],
    [
        &quot;Is Milvus available for concurrent search?\n\nYes. For queries on the same collection, Milvus concurrently searches the incremental and historical data. However, queries on different collections are conducted in series. Whereas the historical data can be an extremely huge dataset, searches on the historical data are relatively more time-consuming and essentially performed in series.\n\n###&quot;,
        0.529681921005249
    ],
    [
        &quot;Can vectors with duplicate primary keys be inserted into Milvus?\n\nYes. Milvus does not check if vector primary keys are duplicates.\n\n###&quot;,
        0.528809666633606
    ]
]
</code></pre>
<h3 id="Dimensionality-reduction-to-2-d-by-t-SNE" class="common-anchor-header">通过 t-SNE 将维度降低到 2-d</h3><p>让我们通过 t-SNE 将 Embeddings 的维度降为 2-d。我们将使用<code translate="no">sklearn</code> 库来执行 t-SNE 变换。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">from</span> sklearn.manifold <span class="hljs-keyword">import</span> TSNE

data.append({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-built_in">len</span>(data), <span class="hljs-string">&quot;vector&quot;</span>: emb_text(question), <span class="hljs-string">&quot;text&quot;</span>: question})
embeddings = []
<span class="hljs-keyword">for</span> gp <span class="hljs-keyword">in</span> data:
    embeddings.append(gp[<span class="hljs-string">&quot;vector&quot;</span>])

X = np.array(embeddings, dtype=np.float32)
tsne = TSNE(random_state=<span class="hljs-number">0</span>, max_iter=<span class="hljs-number">1000</span>)
tsne_results = tsne.fit_transform(X)

df_tsne = pd.DataFrame(tsne_results, columns=[<span class="hljs-string">&quot;TSNE1&quot;</span>, <span class="hljs-string">&quot;TSNE2&quot;</span>])
df_tsne
<button class="copy-code-btn"></button></code></pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type { vertical-align: middle; }<pre><code translate="no">.dataframe tbody tr th {
    vertical-align: top;
}

.dataframe thead th {
    text-align: right;
}
</code></pre>
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>TSNE1</th>
      <th>TSNE2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-3.877362</td>
      <td>0.866726</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-5.923084</td>
      <td>0.671701</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.645954</td>
      <td>0.240083</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.444582</td>
      <td>1.222875</td>
    </tr>
    <tr>
      <th>4</th>
      <td>6.503896</td>
      <td>-4.984684</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>69</th>
      <td>6.354055</td>
      <td>1.264959</td>
    </tr>
    <tr>
      <th>70</th>
      <td>6.055961</td>
      <td>1.266211</td>
    </tr>
    <tr>
      <th>71</th>
      <td>-1.516003</td>
      <td>1.328765</td>
    </tr>
    <tr>
      <th>72</th>
      <td>3.971772</td>
      <td>-0.681780</td>
    </tr>
    <tr>
      <th>73</th>
      <td>3.971772</td>
      <td>-0.681780</td>
    </tr>
  </tbody>
</table>
<p>74 行 × 2 列</p>
</div>
<h3 id="Visualizing-Milvus-search-results-on-a-2d-plane" class="common-anchor-header">在二维平面上可视化 Milvus 搜索结果</h3><p>我们将用绿色绘制查询向量，用红色绘制检索向量，用蓝色绘制剩余向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> matplotlib.pyplot <span class="hljs-keyword">as</span> plt
<span class="hljs-keyword">import</span> seaborn <span class="hljs-keyword">as</span> sns

<span class="hljs-comment"># Extract similar ids from search results</span>
similar_ids = [gp[<span class="hljs-string">&quot;id&quot;</span>] <span class="hljs-keyword">for</span> gp <span class="hljs-keyword">in</span> search_res[<span class="hljs-number">0</span>]]

df_norm = df_tsne[:-<span class="hljs-number">1</span>]

df_query = pd.DataFrame(df_tsne.iloc[-<span class="hljs-number">1</span>]).T

<span class="hljs-comment"># Filter points based on similar ids</span>
similar_points = df_tsne[df_tsne.index.isin(similar_ids)]

<span class="hljs-comment"># Create the plot</span>
fig, ax = plt.subplots(figsize=(<span class="hljs-number">8</span>, <span class="hljs-number">6</span>))  <span class="hljs-comment"># Set figsize</span>

<span class="hljs-comment"># Set the style of the plot</span>
sns.set_style(<span class="hljs-string">&quot;darkgrid&quot;</span>, {<span class="hljs-string">&quot;grid.color&quot;</span>: <span class="hljs-string">&quot;.6&quot;</span>, <span class="hljs-string">&quot;grid.linestyle&quot;</span>: <span class="hljs-string">&quot;:&quot;</span>})

<span class="hljs-comment"># Plot all points in blue</span>
sns.scatterplot(
    data=df_tsne, x=<span class="hljs-string">&quot;TSNE1&quot;</span>, y=<span class="hljs-string">&quot;TSNE2&quot;</span>, color=<span class="hljs-string">&quot;blue&quot;</span>, label=<span class="hljs-string">&quot;All knowledge&quot;</span>, ax=ax
)

<span class="hljs-comment"># Overlay similar points in red</span>
sns.scatterplot(
    data=similar_points,
    x=<span class="hljs-string">&quot;TSNE1&quot;</span>,
    y=<span class="hljs-string">&quot;TSNE2&quot;</span>,
    color=<span class="hljs-string">&quot;red&quot;</span>,
    label=<span class="hljs-string">&quot;Similar knowledge&quot;</span>,
    ax=ax,
)

sns.scatterplot(
    data=df_query, x=<span class="hljs-string">&quot;TSNE1&quot;</span>, y=<span class="hljs-string">&quot;TSNE2&quot;</span>, color=<span class="hljs-string">&quot;green&quot;</span>, label=<span class="hljs-string">&quot;Query&quot;</span>, ax=ax
)

<span class="hljs-comment"># Set plot titles and labels</span>
plt.title(<span class="hljs-string">&quot;Scatter plot of knowledge using t-SNE&quot;</span>)
plt.xlabel(<span class="hljs-string">&quot;TSNE1&quot;</span>)
plt.ylabel(<span class="hljs-string">&quot;TSNE2&quot;</span>)

<span class="hljs-comment"># Set axis to be equal</span>
plt.axis(<span class="hljs-string">&quot;equal&quot;</span>)

<span class="hljs-comment"># Display the legend</span>
plt.legend()

<span class="hljs-comment"># Show the plot</span>
plt.show()
<button class="copy-code-btn"></button></code></pre>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/vector_visualization_33_0.png" alt="png" class="doc-image" id="png" />
   </span> <span class="img-wrapper"> <span>图</span> </span></p>
<p>我们可以看到，查询向量与检索向量很接近。虽然检索到的向量并不在以查询为中心、半径固定的标准圆内，但我们可以看到，它们在二维平面上仍然非常接近查询向量。</p>
<p>使用降维技术可以促进对向量的理解和故障排除。希望你能通过本教程更好地理解向量。</p>
