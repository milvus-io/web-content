---
id: integrate_with_whyhow.md
summary: 本指南演示了如何使用 whyHow.ai 和 Milvus Lite 进行基于规则的检索。
title: Milvus 与 WhyHow 的集成
---
<h1 id="Integrate-Milvus-with-WhyHow" class="common-anchor-header">Milvus 与 WhyHow 的集成<button data-href="#Integrate-Milvus-with-WhyHow" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南演示如何使用 whyHow.ai 和 Milvus Lite 进行基于规则的检索。</p>
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
    </button></h2><p>WhyHow是一个平台，它为开发者提供了组织、上下文化和可靠检索非结构化数据以执行复杂RAG所需的构建模块。基于规则的检索包是WhyHow开发的一个Python包，使人们能够创建和管理具有高级过滤功能的检索增强生成（RAG）应用程序。</p>
<h2 id="Installation" class="common-anchor-header">安装<button data-href="#Installation" class="anchor-icon" translate="no">
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
    </button></h2><p>在开始之前，请安装所有必要的 Python 软件包，以便日后使用。</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus, whyhow_rbr
<button class="copy-code-btn"></button></code></pre>
<p>接下来，我们需要初始化 Milvus 客户端，通过使用 Milvus Lite 实现基于规则的检索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite local path</span>
path=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span> <span class="hljs-comment"># random name for local milvus lite db path</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(path)
<button class="copy-code-btn"></button></code></pre>
<p>你也可以通过 Milvus 云初始化 Milvus 客户端</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Cloud credentials</span>
YOUR_MILVUS_CLOUD_END_POINT = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_END_POINT&quot;</span>
YOUR_MILVUS_CLOUD_TOKEN = <span class="hljs-string">&quot;YOUR_MILVUS_CLOUD_TOKEN&quot;</span>

<span class="hljs-comment"># Initialize the ClientMilvus</span>
milvus_client = ClientMilvus(
        milvus_uri=YOUR_MILVUS_CLOUD_END_POINT, 
        milvus_token=YOUR_MILVUS_CLOUD_TOKEN,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-Collection" class="common-anchor-header">创建 Collections<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Defining-necessary-variables" class="common-anchor-header">定义必要的变量</h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define collection name</span>
COLLECTION_NAME=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span> <span class="hljs-comment"># take your own collection name</span>

<span class="hljs-comment"># Define vector dimension size</span>
DIMENSION=<span class="hljs-number">1536</span> <span class="hljs-comment"># decide by the model you use</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-schema" class="common-anchor-header">添加 Schema</h3><p>在向 Milvus Lite 数据库插入任何数据之前，我们需要先定义数据字段，这里称为 Schema。通过创建对象<code translate="no">CollectionSchema</code> 和添加数据字段<code translate="no">add_field()</code> ，我们可以控制数据类型及其特征。在向 Milvus 插入任何数据之前，这一步是必须的。</p>
<pre><code translate="no" class="language-python">schema = milvus_client.create_schema(auto_id=<span class="hljs-literal">True</span>) <span class="hljs-comment"># Enable id matching</span>

schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema = milvus_client.add_field(schema=schema, field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-index" class="common-anchor-header">创建索引</h3><p>对于每个 Schema，最好都有一个索引，这样查询效率会更高。要创建索引，我们首先需要一个<code translate="no">index_params</code> ，然后在这个<code translate="no">IndexParams</code> 对象上添加更多索引数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Start to indexing data field</span>
index_params = milvus_client.prepare_index_params()
index_params = milvus_client.add_index(
    index_params=index_params,  <span class="hljs-comment"># pass in index_params object</span>
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>该方法是对 Milvus 官方实现<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">（官方文档</a>）的精简封装。</p>
<h3 id="Create-collection" class="common-anchor-header">创建 Collections</h3><p>定义好所有数据字段并建立索引后，我们现在需要创建数据库 Collections，这样就能快速、准确地访问数据了。需要说明的是，我们将<code translate="no">enable_dynamic_field</code> 初始化为 true，这样就可以自由上传任何数据。这样做的代价是数据查询可能会效率低下。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection</span>
milvus_client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upload-documents" class="common-anchor-header">上传文件<button data-href="#Upload-documents" class="anchor-icon" translate="no">
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
    </button></h2><p>创建完 Collections 后，我们就可以用文档填充了。在<code translate="no">whyhow_rbr</code> 中，这是通过<code translate="no">MilvusClient</code> 的<code translate="no">upload_documents</code> 方法完成的。它在引擎盖下执行以下步骤：</p>
<ul>
<li><strong>预处理</strong>：读取并将提供的 PDF 文件分割成块</li>
<li><strong>嵌入</strong>：使用 OpenAI 模型嵌入所有数据块</li>
<li><strong>插入</strong>：将嵌入和元数据上传到 Milvus Lite</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># get pdfs</span>
pdfs = [<span class="hljs-string">&quot;harry-potter.pdf&quot;</span>, <span class="hljs-string">&quot;game-of-thrones.pdf&quot;</span>] <span class="hljs-comment"># replace to your pdfs path</span>

<span class="hljs-comment"># Uploading the PDF document</span>
milvus_client.upload_documents(
    collection_name=COLLECTION_NAME,
    documents=pdfs
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Question-answering" class="common-anchor-header">问题解答<button data-href="#Question-answering" class="anchor-icon" translate="no">
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
    </button></h2><p>现在，我们终于可以进入检索增强生成阶段了。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search data and implement RAG!</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;What food does Harry Potter like to eat?&#x27;</span>,
    collection_name=COLLECTION_NAME,
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Rules" class="common-anchor-header">规则</h3><p>在前面的例子中，我们考虑了索引中的每一份文档。不过，有时只检索满足某些预定义条件（如<code translate="no">filename=harry-potter.pdf</code> ）的文档可能是有益的。在<code translate="no">whyhow_rbr</code> 通过 Milvus Lite，这可以通过调整搜索参数来实现。</p>
<p>规则可以控制以下元数据属性</p>
<ul>
<li><code translate="no">filename</code> 文件名</li>
<li><code translate="no">page_numbers</code> 对应页码的整数列表（0 索引）</li>
<li><code translate="no">id</code> 块的唯一标识符（这是最 "极端 "的过滤器）</li>
<li>其他基于<a href="https://milvus.io/docs/boolean.md">布尔表达式</a>的规则</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># RULES(search on book harry-potter on page 8):</span>
PARTITION_NAME=<span class="hljs-string">&#x27;harry-potter&#x27;</span> <span class="hljs-comment"># search on books</span>
page_number=<span class="hljs-string">&#x27;page_number == 8&#x27;</span>

<span class="hljs-comment"># first create a partitions to store the book and later search on this specific partition:</span>
milvus_client.crate_partition(
    collection_name=COLLECTION_NAME,
    partition_name=PARTITION_NAME <span class="hljs-comment"># separate base on your pdfs type</span>
)

<span class="hljs-comment"># search with rules</span>
res = milvus_client.search(
    question=<span class="hljs-string">&#x27;Tell me about the greedy method&#x27;</span>,
    collection_name=COLLECTION_NAME,
    partition_names=PARTITION_NAME,
    <span class="hljs-built_in">filter</span>=page_number, <span class="hljs-comment"># append any rules follow the Boolean Expression Rule</span>
    anns_field=<span class="hljs-string">&#x27;embedding&#x27;</span>,
    output_fields=<span class="hljs-string">&#x27;text&#x27;</span>
)
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;answer&#x27;</span>])
<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&#x27;matches&#x27;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>在这个例子中，我们首先创建了一个分区来存储与哈利-波特相关的 PDF 文件，通过在这个分区内搜索，我们可以获得最直接的信息。此外，我们还应用页码作为过滤器，以指定我们希望搜索的确切页面。请记住，过滤器参数需要遵循<a href="https://milvus.io/docs/boolean.md">布尔规则</a>。</p>
<h3 id="Clean-up" class="common-anchor-header">清理</h3><p>最后，在执行完所有指令后，可以调用<code translate="no">drop_collection()</code> 清理数据库。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Clean up</span>
milvus_client.drop_collection(
    collection_name=COLLECTION_NAME
)
<button class="copy-code-btn"></button></code></pre>
