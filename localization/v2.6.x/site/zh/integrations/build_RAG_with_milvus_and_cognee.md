---
id: build_RAG_with_milvus_and_cognee.md
summary: 在本教程中，我们将向您展示如何使用 Milvus 和 Cognee 构建 RAG（检索-增强生成）管道。
title: 与 Milvus 和 Cognee 一起构建 RAG
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/build_RAG_with_milvus_and_cognee.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h3 id="Build-RAG-with-Milvus-and-Cognee" class="common-anchor-header">使用 Milvus 和 Cognee 构建 RAG</h3><p><a href="https://www.cognee.ai">Cognee</a>是一个以开发人员为先的平台，可通过可扩展的模块化 ECL（提取、认知、加载）管道简化人工智能应用程序开发。通过与 Milvus 无缝集成，Cognee 可实现对话、文档和转录的高效连接和检索，减少幻觉并优化操作符。</p>
<p>凭借对 Milvus、图数据库和 LLMs 等向量存储的强大支持，Cognee 为构建检索增强生成（RAG）系统提供了一个灵活且可定制的框架。其生产就绪的架构可确保提高人工智能应用的准确性和效率。</p>
<p>在本教程中，我们将向您展示如何使用 Milvus 和 Cognee 构建 RAG（检索增强生成）管道。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install pymilvus git+https://github.com/topoteretes/cognee.git</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>如果您使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</blockquote>
<p>默认情况下，本例中使用 OpenAI 作为 LLM。您应准备好<a href="https://platform.openai.com/docs/quickstart">api 密钥</a>，并在配置<code translate="no">set_llm_api_key()</code> 函数中进行设置。</p>
<p>要将 Milvus 配置为向量数据库，请将<code translate="no">VECTOR_DB_PROVIDER</code> 设置为<code translate="no">milvus</code> ，并指定<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> 。由于我们在本演示中使用 Milvus Lite 存储数据，因此只需提供<code translate="no">VECTOR_DB_URL</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">import</span> cognee

cognee.config.set_llm_api_key(<span class="hljs-string">&quot;YOUR_OPENAI_API_KEY&quot;</span>)


os.environ[<span class="hljs-string">&quot;VECTOR_DB_PROVIDER&quot;</span>] = <span class="hljs-string">&quot;milvus&quot;</span>
os.environ[<span class="hljs-string">&quot;VECTOR_DB_URL&quot;</span>] = <span class="hljs-string">&quot;./milvus.db&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至于环境变量<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> ：</p>
<ul>
<li>将<code translate="no">VECTOR_DB_URL</code> 设置为本地文件，如<code translate="no">./milvus.db</code> ，是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> ，作为您的<code translate="no">VECTOR_DB_URL</code> 。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整<code translate="no">VECTOR_DB_URL</code> 和<code translate="no">VECTOR_DB_KEY</code> ，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
<p></a></p>
<h3 id="Prepare-the-data" class="common-anchor-header">准备数据</h3><p>我们使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文档 2.4.x</a>中的常见问题页面作为 RAG 中的私有知识，这对于简单的 RAG 管道来说是一个很好的数据源。</p>
<p>下载 zip 文件并将文档解压缩到<code translate="no">milvus_docs</code> 文件夹中。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs</span>
<button class="copy-code-btn"></button></code></pre>
<p>我们从<code translate="no">milvus_docs/en/faq</code> 文件夹中加载所有标记文件。对于每个文档，我们只需简单地使用 "#"来分隔文件中的内容，这样就能大致分隔出 markdown 文件中每个主要部分的内容。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []

<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()

    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><h3 id="Resetting-Cognee-Data" class="common-anchor-header">重置 Cognee 数据</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>现在，我们可以添加数据集并将其处理成知识图谱。</p>
<h3 id="Adding-Data-and-Cognifying" class="common-anchor-header">添加数据和认知</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.add(data=text_lines, dataset_name=<span class="hljs-string">&quot;milvus_faq&quot;</span>)
<span class="hljs-keyword">await</span> cognee.cognify()

<span class="hljs-comment"># [DocumentChunk(id=UUID(&#x27;6889e7ef-3670-555c-bb16-3eb50d1d30b0&#x27;), updated_at=datetime.datetime(2024, 12, 4, 6, 29, 46, 472907, tzinfo=datetime.timezone.utc), text=&#x27;Does the query perform in memory? What are incremental data and historical data?\n\nYes. When ...</span>
<span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add</code> 方法将数据集（Milvus 常见问题解答）加载到 Cognee 中，<code translate="no">cognify</code> 方法对数据进行处理，提取实体、关系和摘要，构建知识图谱。</p>
<h3 id="Querying-for-Summaries" class="common-anchor-header">查询摘要</h3><p>数据处理完成后，我们来查询知识图谱。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.SUMMARIES, query_text=query_text)

<span class="hljs-built_in">print</span>(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 'de5c6713-e079-5d0b-b11d-e9bacd1e0d73', 'text': 'Milvus stores two data types: inserted data and metadata.'}
</code></pre>
<p>该查询会在知识图谱中搜索与查询文本相关的摘要，并打印出最相关的候选摘要。</p>
<h3 id="Querying-for-Chunks" class="common-anchor-header">查询摘要块</h3><p>摘要提供了高层次的见解，但对于更细化的细节，我们可以直接从处理过的数据集中查询特定的数据块。这些数据块来自知识图谱创建过程中添加和分析的原始数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> cognee.api.v1.search <span class="hljs-keyword">import</span> SearchType

query_text = <span class="hljs-string">&quot;How is data stored in milvus?&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.CHUNKS, query_text=query_text)
<button class="copy-code-btn"></button></code></pre>
<p>让我们将其格式化并显示出来，以提高可读性！</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">format_and_print</span>(<span class="hljs-params">data</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;ID:&quot;</span>, data[<span class="hljs-string">&quot;id&quot;</span>])
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nText:\n&quot;</span>)
    paragraphs = data[<span class="hljs-string">&quot;text&quot;</span>].split(<span class="hljs-string">&quot;\n\n&quot;</span>)
    <span class="hljs-keyword">for</span> paragraph <span class="hljs-keyword">in</span> paragraphs:
        <span class="hljs-built_in">print</span>(paragraph.strip())
        <span class="hljs-built_in">print</span>()


format_and_print(search_results[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">ID: 4be01c4b-9ee5-541c-9b85-297883934ab3

Text:

Where does Milvus store data?

Milvus deals with two types of data, inserted data and metadata.

Inserted data, including vector data, scalar data, and collection-specific schema, are stored in persistent storage as incremental log. Milvus supports multiple object storage backends, including [MinIO](https://min.io/), [AWS S3](https://aws.amazon.com/s3/?nc1=h_ls), [Google Cloud Storage](https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes) (GCS), [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs), [Alibaba Cloud OSS](https://www.alibabacloud.com/product/object-storage-service), and [Tencent Cloud Object Storage](https://www.tencentcloud.com/products/cos) (COS).

Metadata are generated within Milvus. Each Milvus module has its own metadata that are stored in etcd.

###
</code></pre>
<p>在前面的步骤中，我们查询了 Milvus FAQ 数据集，以获取摘要和特定的数据块。虽然这提供了详细的见解和细粒度信息，但由于数据集很大，要清晰可视化知识图谱中的依赖关系非常困难。</p>
<p>为了解决这个问题，我们将重新设置 Cognee 环境，并使用更小、更集中的数据集。这将使我们能够更好地展示在认知过程中提取的关系和依赖性。通过简化数据，我们可以清楚地看到 Cognee 如何组织和构建知识图谱中的信息。</p>
<h3 id="Reset-Cognee" class="common-anchor-header">重置 Cognee</h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">await</span> cognee.prune.prune_data()
<span class="hljs-keyword">await</span> cognee.prune.prune_system(metadata=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Adding-the-Focused-Dataset" class="common-anchor-header">添加重点数据集</h3><p>在这里，我们添加并处理了一个只有一行文本的较小数据集，以确保知识图谱重点突出、易于解读。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># We only use one line of text as the dataset, which simplifies the output later</span>
text = <span class="hljs-string">&quot;&quot;&quot;
    Natural language processing (NLP) is an interdisciplinary
    subfield of computer science and information retrieval.
    &quot;&quot;&quot;</span>

<span class="hljs-keyword">await</span> cognee.add(text)
<span class="hljs-keyword">await</span> cognee.cognify()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Querying-for-Insights" class="common-anchor-header">查询洞察</h3><p>通过关注这个较小的数据集，我们现在可以清楚地分析知识图谱中的关系和结构。</p>
<pre><code translate="no" class="language-python">query_text = <span class="hljs-string">&quot;Tell me about NLP&quot;</span>
search_results = <span class="hljs-keyword">await</span> cognee.search(SearchType.INSIGHTS, query_text=query_text)

<span class="hljs-keyword">for</span> result_text <span class="hljs-keyword">in</span> search_results:
    <span class="hljs-built_in">print</span>(result_text)

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># ({&#x27;id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;natural language processing&#x27;, &#x27;description&#x27;: &#x27;An interdisciplinary subfield of computer science and information retrieval.&#x27;}, {&#x27;relationship_name&#x27;: &#x27;is_a_subfield_of&#x27;, &#x27;source_node_id&#x27;: UUID(&#x27;bc338a39-64d6-549a-acec-da60846dd90d&#x27;), &#x27;target_node_id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 15, 473137, tzinfo=datetime.timezone.utc)}, {&#x27;id&#x27;: UUID(&#x27;6218dbab-eb6a-5759-a864-b3419755ffe0&#x27;), &#x27;updated_at&#x27;: datetime.datetime(2024, 11, 21, 12, 23, 1, 211808, tzinfo=datetime.timezone.utc), &#x27;name&#x27;: &#x27;computer science&#x27;, &#x27;description&#x27;: &#x27;The study of computation and information processing.&#x27;})</span>
<span class="hljs-comment"># (...)</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># It represents nodes and relationships in the knowledge graph:</span>
<span class="hljs-comment"># - The first element is the source node (e.g., &#x27;natural language processing&#x27;).</span>
<span class="hljs-comment"># - The second element is the relationship between nodes (e.g., &#x27;is_a_subfield_of&#x27;).</span>
<span class="hljs-comment"># - The third element is the target node (e.g., &#x27;computer science&#x27;).</span>
<button class="copy-code-btn"></button></code></pre>
<p>该输出代表了知识图谱查询的结果，展示了从处理过的数据集中提取的实体（节点）及其关系（边）。每个元组包括源实体、关系类型和目标实体，以及唯一 ID、描述和时间戳等元数据。图突出显示了关键概念及其语义联系，提供了对数据集的结构化理解。</p>
<p>恭喜您，您已经学会了 cognee 与 Milvus 的基本用法。如果想了解更多 cognee 的高级用法，请参阅其官方<a href="https://github.com/topoteretes/cognee">页面</a>。</p>
