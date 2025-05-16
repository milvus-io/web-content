---
id: milvus_lite.md
summary: 开始使用 Milvus Lite。
title: 本地运行 Milvus Lite
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">本地运行 Milvus Lite<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>本页介绍如何使用 Milvus Lite 在本地运行 Milvus。Milvus Lite 是<a href="https://github.com/milvus-io/milvus">Milvus</a> 的轻量级版本，<a href="https://github.com/milvus-io/milvus">Milvus</a> 是一个开源向量数据库，通过向量嵌入和相似性搜索为人工智能应用提供支持。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 可导入您的 Python 应用程序，提供 Milvus 的核心向量搜索功能。Milvus Lite 已包含在<a href="https://github.com/milvus-io/pymilvus">Milvus 的 Python SDK</a> 中。它可以通过<code translate="no">pip install pymilvus</code> 简单地部署。</p>
<p>使用 Milvus Lite，您可以在几分钟内开始构建具有向量相似性搜索功能的人工智能应用程序！Milvus Lite 适合在以下环境中运行：</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>笔记本电脑</li>
<li>边缘设备</li>
</ul>
<p>Milvus Lite 与 Milvus Standalone 和 Distributed 共享相同的 API，涵盖了向量数据持久化和管理、向量 CRUD 操作、稀疏和密集向量搜索、元数据过滤、多向量和混合搜索（hybrid_search）等大部分功能。它们共同为不同类型的环境提供了一致的体验，从边缘设备到云中的集群，适合不同规模的使用案例。使用相同的客户端代码，您可以在笔记本电脑或 Jupyter Notebook 上使用 Milvus Lite 运行 GenAI 应用程序，或在 Docker 容器上使用 Milvus Standalone 运行 GenAI 应用程序，或在大规模 Kubernetes 集群上使用 Milvus Distributed 运行 GenAI 应用程序，为生产提供数十亿向量。</p>
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
    </button></h2><p>Milvus Lite 目前支持以下环境：</p>
<ul>
<li>Ubuntu &gt;= 20.04（x86_64 和 arm64）</li>
<li>MacOS &gt;= 11.0（苹果硅 M1/M2 和 x86_64）</li>
</ul>
<p>请注意，Milvus Lite 仅适用于小规模向量搜索使用案例。对于大规模用例，我们建议使用<a href="https://milvus.io/docs/install-overview.md#Milvus-Standalone">Milvus Standalone</a>或<a href="https://milvus.io/docs/install-overview.md#Milvus-Distributed">Milvus Distributed</a>。您也可以考虑在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上使用完全托管的 Milvus。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">设置 Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell">pip install -U pymilvus
<button class="copy-code-btn"></button></code></pre>
<p>我们建议使用<code translate="no">pymilvus</code> 。由于<code translate="no">milvus-lite</code> 已包含在<code translate="no">pymilvus</code> 2.4.2 或更高版本中，因此可通过<code translate="no">pip install</code> 与<code translate="no">-U</code> 强制更新到最新版本，<code translate="no">milvus-lite</code> 会自动安装。</p>
<p>如果你想明确安装<code translate="no">milvus-lite</code> 软件包，或者你已经安装了旧版本的<code translate="no">milvus-lite</code> 并想更新它，可以使用<code translate="no">pip install -U milvus-lite</code> 。</p>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">连接 Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">pymilvus</code> 中，指定一个本地文件名作为 MilvusClient 的 uri 参数将使用 Milvus Lite。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>
client = <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>运行上述代码段后，将在当前文件夹下生成名为<strong>milvus_demo.db 的</strong>数据库文件。</p>
<blockquote>
<p><strong><em>注意：</em></strong>请注意，同样的 API 也适用于 Milvus Standalone、Milvus Distributed 和 Zilliz Cloud，唯一的区别是将本地文件名替换为远程服务器端点和凭据，例如<code translate="no">client = MilvusClient(uri=&quot;http://localhost:19530&quot;, token=&quot;username:password&quot;)</code> 。</p>
</blockquote>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是如何使用 Milvus Lite 进行文本搜索的简单演示。还有更多使用 Milvus Lite 构建<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/build_RAG_with_milvus.ipynb">RAG</a>、<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/image_search_with_milvus.ipynb">图像搜索</a>等应用程序的综合<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">示例</a>，以及在<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_langchain.ipynb">LangChain</a>和<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/rag_with_milvus_and_llamaindex.ipynb">LlamaIndex</a> 等流行 RAG 框架中使用 Milvus Lite 的<a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/tutorials">示例</a>！</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors we will use in this demo has 384 dimensions</span>
)

<span class="hljs-comment"># Text strings to search from.</span>
docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]
<span class="hljs-comment"># For illustration, here we use fake vectors with random numbers (384 dimension).</span>

vectors = [[ np.random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">384</span>) ] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs)) ]
data = [ {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>} <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(vectors)) ]
res = client.insert(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=data
)

<span class="hljs-comment"># This will exclude any text in &quot;history&quot; subject despite close to the query vector.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># a query that retrieves all entities matching filter expressions.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># delete</span>
res = client.delete(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>运行 Milvus Lite 时，请注意某些功能不受支持。下表总结了 Milvus Lite 的使用限制。</p>
<h3 id="Collection" class="common-anchor-header">Collections</h3><table>
<thead>
<tr><th>方法/参数</th><th>Milvus Lite 支持</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">创建集合()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">dimension</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">id_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">vector_field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">metric_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">schema</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">num_shards</code></td><td>N</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><code translate="no">num_partitions</code></td><td>N</td></tr>
<tr><td><code translate="no">consistency_level</code></td><td>N（仅支持<code translate="no">Strong</code> ；任何配置都将被视为<code translate="no">Strong</code> 。）</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a></td><td>支持获取 Collections 统计信息。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a></td><td><code translate="no">num_shards</code>、<code translate="no">consistency_level</code> 和<code translate="no">collection_id</code> 响应无效。</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/has_collection.md">has_collection()</a></td><td>支持检查集合是否存在。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_collections()</a></td><td>支持列出所有 Collections。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md">drop_collection()</a></td><td>支持删除某个 Collection。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/rename_collection.md">rename_collection()</a></td><td>不支持重命名 Collections。</td></tr>
</tbody>
</table>
<h3 id="Field--Schema" class="common-anchor-header">字段和 Schema</h3><table>
<thead>
<tr><th>方法/参数</th><th>Milvus Lite 支持</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md">创建模式</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">auto_id</code></td><td>Y</td></tr>
<tr><td><code translate="no">enable_dynamic_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">primary_field</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_key_field</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md">add_field()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">datatype</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_primary</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_length</code></td><td>Y</td></tr>
<tr><td><code translate="no">element_type</code></td><td>Y</td></tr>
<tr><td><code translate="no">max_capacity</code></td><td>Y</td></tr>
<tr><td><code translate="no">dim</code></td><td>Y</td></tr>
<tr><td><code translate="no">is_partition_key</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Insert--Search" class="common-anchor-header">插入和搜索</h3><table>
<thead>
<tr><th>方法/参数</th><th>Milvus Lite 支持</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">搜索()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">limit</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">search_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">查询()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/get.md">获取()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_names</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md">删除()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">ids</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">filter</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md">插入()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md">upsert()</a></td><td>支持有限参数</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">data</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><code translate="no">partition_name</code></td><td>N</td></tr>
</tbody>
</table>
<h3 id="Load--Release" class="common-anchor-header">加载和释放</h3><table>
<thead>
<tr><th>方法/参数</th><th>Milvus Lite 支持</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md">load_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md">release_collection()</a></td><td>Y</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a></td><td>不支持获取加载状态。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/refresh_load.md">refresh_load()</a></td><td>不支持加载已加载集合的未加载数据。</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/close.md">close()</a></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Index" class="common-anchor-header">索引</h3><table>
<thead>
<tr><th>方法/参数</th><th>Milvus Lite 支持</th></tr>
</thead>
<tbody>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_collections.md">list_indexes()</a></td><td>支持列出索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">field_name</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">创建索引</a></td><td>仅支持<code translate="no">FLAT</code> 索引类型。</td></tr>
<tr><td><code translate="no">index_params</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/drop_index.md">drop_index()</a></td><td>支持删除索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
<tr><td><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/describe_index.md">describe_index()</a></td><td>支持描述索引。</td></tr>
<tr><td><code translate="no">collection_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">index_name</code></td><td>Y</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Y</td></tr>
</tbody>
</table>
<h3 id="Vector-Index-Types" class="common-anchor-header">向量索引类型</h3><p>Milvus Lite 仅支持<a href="https://milvus.io/docs/index.md?tab=floating#FLAT">FLAT</a>索引类型。无论在 Collections 中指定了哪种索引类型，它都使用 FLAT 类型。</p>
<h3 id="Search-Features" class="common-anchor-header">搜索功能</h3><p>Milvus Lite 支持稀疏向量、多向量和混合搜索。</p>
<h3 id="Partition" class="common-anchor-header">分区</h3><p>Milvus Lite 不支持分区和与分区相关的方法。</p>
<h3 id="Users--Roles" class="common-anchor-header">用户和角色</h3><p>Milvus Lite 不支持用户和角色及相关方法。</p>
<h3 id="Alias" class="common-anchor-header">别名</h3><p>Milvus Lite 不支持别名和与别名相关的方法。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">从 Milvus Lite 迁移数据<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>所有存储在 Milvus Lite 中的数据都可以轻松导出并加载到其他类型的 Milvus 部署中，例如 Docker 上的 Milvus Standalone、K8s 上的 Milvus Distributed 或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上的全托管 Milvus。</p>
<p>Milvus Lite 提供了一个命令行工具，可以将数据转储到 json 文件，该文件可以导入<a href="https://github.com/milvus-io/milvus">Milvus</a>和<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全托管云服务）。milvus-lite 命令将与 milvus-lite python 软件包一起安装。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Install</span>
pip install -U <span class="hljs-string">&quot;pymilvus[bulk_writer]&quot;</span>

milvus-lite dump -h

usage: milvus-lite dump [-h] [-d DB_FILE] [-c COLLECTION] [-p PATH]

optional arguments:
  -h, --<span class="hljs-built_in">help</span>            show this <span class="hljs-built_in">help</span> message and <span class="hljs-built_in">exit</span>
  -d DB_FILE, --db-file DB_FILE
                        milvus lite db file
  -c COLLECTION, --collection COLLECTION
                        collection that need to be dumped
  -p PATH, --path PATH  dump file storage <span class="hljs-built_in">dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>下面的示例转储了<code translate="no">demo_collection</code> Collections 中的所有数据，这些数据存储在<code translate="no">./milvus_demo.db</code> （Milvus Lite 数据库文件）中。</p>
<p>导出数据：</p>
<pre><code translate="no" class="language-shell">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<span class="hljs-comment"># ./milvus_demo.db: milvus lite db file</span>
<span class="hljs-comment"># demo_collection: collection that need to be dumped</span>
<span class="hljs-comment">#./data_dir : dump file storage dir</span>
<button class="copy-code-btn"></button></code></pre>
<p>有了转储文件，你可以通过<a href="https://docs.zilliz.com/docs/data-import">数据导入</a>将数据上传到 Zilliz Cloud，或通过<a href="https://milvus.io/docs/import-data.md">批量插入</a>将数据上传到 Milvus 服务器。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>连接 Milvus Lite 后，您可以</p>
<ul>
<li><p>查看<a href="/docs/zh/v2.4.x/quickstart.md">快速入门</a>，了解 Milvus 的功能。</p></li>
<li><p>学习 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/v2.4.x/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/v2.4.x/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/v2.4.x/insert-update-delete.md">插入、倒置和删除</a></li>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus</a>。</p></li>
<li><p><a href="/docs/zh/v2.4.x/scaleout.md">扩展你的 Milvus 集群</a>。</p></li>
<li><p>在云上部署你的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/eks.md">亚马逊 EKS</a></li>
<li><a href="/docs/zh/v2.4.x/gcp.md">谷歌云</a></li>
<li><a href="/docs/zh/v2.4.x/azure.md">微软 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/v2.4.x/milvus_backup_overview.md">Milvus 备份</a>，一个用于 Milvus 数据备份的开源工具。</p></li>
<li><p>探索<a href="/docs/zh/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>，用于调试 Milvus 和动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://milvus.io/docs/attu.md">Attu</a>，一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/v2.4.x/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
