---
id: milvus_rag_with_dynamiq.md
summary: >-
  在本教程中，我们将探讨如何将 Dynamiq 与 Milvus（专为 RAG 工作流打造的高性能向量数据库）无缝结合使用。Milvus
  擅长向量嵌入的高效存储、索引和检索，是要求快速、精确访问上下文数据的人工智能系统不可或缺的组件。
title: 开始使用 Dynamiq 和 Milvus
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_rag_with_dynamiq.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_rag_with_dynamiq.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Getting-Started-with-Dynamiq-and-Milvus" class="common-anchor-header">开始使用 Dynamiq 和 Milvus<button data-href="#Getting-Started-with-Dynamiq-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://www.getdynamiq.ai/">Dynamiq</a>是一个功能强大的 Gen AI 框架，可简化人工智能应用的开发。凭借对检索增强生成（RAG）和大型语言模型（LLM）Agent 的强大支持，Dynamiq 使开发人员能够轻松高效地创建智能动态系统。</p>
<p>在本教程中，我们将探讨如何将 Dynamiq 与<a href="https://milvus.io/">Milvus</a>（专为 RAG 工作流打造的高性能向量数据库）无缝结合使用。Milvus 擅长向量嵌入的高效存储、索引和检索，是要求快速、精确访问上下文数据的人工智能系统不可或缺的组件。</p>
<p>本分步指南将涵盖两个核心 RAG 工作流程：</p>
<ul>
<li><p><strong>文档索引流程</strong>：了解如何处理输入文件（如 PDF），将其内容转换为向量嵌入，并存储到 Milvus 中。利用 Milvus 的高性能索引功能，可确保您的数据随时可供快速检索。</p></li>
<li><p><strong>文档检索流程</strong>：了解如何查询 Milvus 中的相关文档嵌入，并使用它们与 Dynamiq 的 LLM Agents 一起生成有洞察力的、上下文感知的响应，从而创建无缝的人工智能驱动的用户体验。</p></li>
</ul>
<p>本教程结束时，您将对 Milvus 和 Dynamiq 如何协同工作，根据您的需求量身打造可扩展的上下文感知人工智能系统有一个扎实的了解。</p>
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
    </button></h2><h3 id="Download-required-libraries" class="common-anchor-header">下载所需程序库<button data-href="#Download-required-libraries" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install dynamiq pymilvus milvus-lite</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重启运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重启会话"）。</p>
</div>
<h3 id="Configure-the-LLM-agent" class="common-anchor-header">配置 LLM Agent<button data-href="#Configure-the-LLM-agent" class="anchor-icon" translate="no">
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
    </button></h3><p>在本例中，我们将使用 OpenAI 作为 LLM。您应将<a href="https://platform.openai.com/docs/quickstart">api key</a> <code translate="no">OPENAI_API_KEY</code> 设置为环境变量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="RAG---Document-Indexing-Flow" class="common-anchor-header">RAG - 文档索引流程<button data-href="#RAG---Document-Indexing-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>本教程演示了以 Milvus 为向量数据库编制文档索引的检索增强生成（RAG）工作流程。该工作流程接收输入的 PDF 文件，将其处理成较小的块，使用 OpenAI 的嵌入模型生成向量嵌入，并将嵌入存储在 Milvus Collections 中，以便高效检索。</p>
<p>本工作流程结束时，您将拥有一个可扩展的高效文档索引系统，可支持语义搜索和问题解答等未来的 RAG 任务。</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">导入所需库并初始化工作流<button data-href="#Import-Required-Libraries-and-Initialize-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Importing necessary libraries for the workflow</span>
<span class="hljs-keyword">from</span> io <span class="hljs-keyword">import</span> BytesIO
<span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.nodes <span class="hljs-keyword">import</span> InputTransformer
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.converters <span class="hljs-keyword">import</span> PyPDFConverter
<span class="hljs-keyword">from</span> dynamiq.nodes.splitters.document <span class="hljs-keyword">import</span> DocumentSplitter
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.writers <span class="hljs-keyword">import</span> MilvusDocumentWriter

<span class="hljs-comment"># Initialize the workflow</span>
rag_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-PDF-Converter-Node" class="common-anchor-header">定义 PDF 转换器节点<button data-href="#Define-PDF-Converter-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">converter = PyPDFConverter(document_creation_mode=<span class="hljs-string">&quot;one-doc-per-page&quot;</span>)
converter_added = rag_wf.flow.add_nodes(
    converter
)  <span class="hljs-comment"># Add node to the DAG (Directed Acyclic Graph)</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Document-Splitter-Node" class="common-anchor-header">定义文档分割器节点<button data-href="#Define-Document-Splitter-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">document_splitter = DocumentSplitter(
    split_by=<span class="hljs-string">&quot;sentence&quot;</span>,  <span class="hljs-comment"># Splits documents into sentences</span>
    split_length=<span class="hljs-number">10</span>,
    split_overlap=<span class="hljs-number">1</span>,
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[converter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    converter
)  <span class="hljs-comment"># Set dependency on the PDF converter</span>
splitter_added = rag_wf.flow.add_nodes(document_splitter)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Embedding-Node" class="common-anchor-header">定义 Embeddings 节点<button data-href="#Define-Embedding-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">embedder = OpenAIDocumentEmbedder(
    connection=OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>]),
    input_transformer=InputTransformer(
        selector={
            <span class="hljs-string">&quot;documents&quot;</span>: <span class="hljs-string">f&quot;$<span class="hljs-subst">{[document_splitter.<span class="hljs-built_in">id</span>]}</span>.output.documents&quot;</span>,
        },
    ),
).depends_on(
    document_splitter
)  <span class="hljs-comment"># Set dependency on the splitter</span>
document_embedder_added = rag_wf.flow.add_nodes(embedder)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Vector-Store-Node" class="common-anchor-header">定义 Milvus 向量存储节点<button data-href="#Define-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">vector_store = (
    MilvusDocumentWriter(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        create_if_not_exist=<span class="hljs-literal">True</span>,
        metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    )
    .inputs(documents=embedder.outputs.documents)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Set dependency on the embedder</span>
)
milvus_writer_added = rag_wf.flow.add_nodes(vector_store)  <span class="hljs-comment"># Add to the DAG</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:03 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:03 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:04 - DEBUG - Created new connection using: 0bef2849fdb1458a85df8bb9dd27f51d
2024-11-19 22:14:04 - INFO - Collection my_milvus_collection does not exist. Creating a new collection.
2024-11-19 22:14:04 - DEBUG - Successfully created collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
2024-11-19 22:14:05 - DEBUG - Successfully created an index on collection: my_milvus_collection
</code></pre>
<div class="alert note">
<p>Milvus 提供两种部署类型，以满足不同的使用情况：</p>
<ol>
<li><strong>MilvusDeploymentType.FILE</strong></li>
</ol>
<ul>
<li><strong>本地原型</strong>或<strong>小规模数据</strong>存储的理想选择。</li>
<li>将<code translate="no">uri</code> 设置为本地文件路径（如<code translate="no">./milvus.db</code> ），以利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>，它可自动将所有数据存储到指定文件中。</li>
<li>这是<strong>快速设置</strong>和<strong>实验的</strong>便捷选项。</li>
</ul>
<ol start="2">
<li><strong>MilvusDeploymentType.HOST</strong></li>
</ol>
<ul>
<li><p>专为<strong>大规模数据</strong>场景设计，例如管理超过一百万个向量。</p>
<p><strong>自托管服务器</strong></p>
<ul>
<li>使用<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 部署高性能 Milvus 服务器。</li>
<li>将服务器地址和端口配置为<code translate="no">uri</code> （如<code translate="no">http://localhost:19530</code> ）。</li>
<li>如果启用了身份验证：</li>
<li>提供<code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code> 作为<code translate="no">token</code> 。</li>
<li>如果禁用了身份验证：</li>
<li>不设置<code translate="no">token</code> 。</li>
</ul>
<p><strong>Zilliz Cloud（托管服务）</strong></p>
<ul>
<li>要获得完全托管、基于云的 Milvus 体验，请使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。</li>
<li>根据 Zilliz Cloud 控制台提供的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>设置<code translate="no">uri</code> 和<code translate="no">token</code> 。</li>
</ul></li>
</ul>
</div>
<h3 id="Define-Input-Data-and-Run-the-Workflow" class="common-anchor-header">定义输入数据并运行工作流<button data-href="#Define-Input-Data-and-Run-the-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">file_paths = [<span class="hljs-string">&quot;./pdf_files/WhatisMilvus.pdf&quot;</span>]
input_data = {
    <span class="hljs-string">&quot;files&quot;</span>: [BytesIO(<span class="hljs-built_in">open</span>(path, <span class="hljs-string">&quot;rb&quot;</span>).read()) <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
    <span class="hljs-string">&quot;metadata&quot;</span>: [{<span class="hljs-string">&quot;filename&quot;</span>: path} <span class="hljs-keyword">for</span> path <span class="hljs-keyword">in</span> file_paths],
}

<span class="hljs-comment"># Run the workflow with the prepared input data</span>
inserted_data = rag_wf.run(input_data=input_data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">/var/folders/09/d0hx80nj35sb5hxb5cpc1q180000gn/T/ipykernel_31319/3145804345.py:4: ResourceWarning: unclosed file &lt;_io.BufferedReader name='./pdf_files/WhatisMilvus.pdf'&gt;
  BytesIO(open(path, &quot;rb&quot;).read()) for path in file_paths
ResourceWarning: Enable tracemalloc to get the object allocation traceback
2024-11-19 22:14:09 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution started.
2024-11-19 22:14:09 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution started.
2024-11-19 22:14:09 - INFO - Node PyPDF File Converter - 6eb42b1f-7637-407b-a3ac-4167bcf3b5c4: execution succeeded in 58ms.
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution started.
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/websockets/legacy/__init__.py:6: DeprecationWarning: websockets.legacy is deprecated; see https://websockets.readthedocs.io/en/stable/howto/upgrade.html for upgrade instructions
  warnings.warn(  # deprecated in 14.0 - 2024-11-09
/Users/jinhonglin/anaconda3/envs/myenv/lib/python3.11/site-packages/pydantic/fields.py:804: PydanticDeprecatedSince20: Using extra keyword arguments on `Field` is deprecated and will be removed. Use `json_schema_extra` instead. (Extra keys: 'is_accessible_to_agent'). Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.7/migration/
  warn(
2024-11-19 22:14:09 - INFO - Node DocumentSplitter - 5baed580-6de0-4dcd-bace-d7d947ab6c7f: execution succeeded in 104ms.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution started.
2024-11-19 22:14:09 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - d30a4cdc-0fab-4aff-b2e5-6161a62cb6fd: execution succeeded in 724ms.
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution started.
2024-11-19 22:14:10 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:10 - INFO - Node MilvusDocumentWriter - dddab4cc-1dae-4e7e-9101-1ec353f530da: execution succeeded in 66ms.
2024-11-19 22:14:10 - INFO - Node OpenAIDocumentEmbedder - 91928f67-a00f-48f6-a864-f6e21672ec7e: execution succeeded in 961ms.
2024-11-19 22:14:10 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 1.3s.
2024-11-19 22:14:10 - INFO - Workflow 87878444-6a3d-43f3-ae32-0127564a959f: execution succeeded in 1.3s.
</code></pre>
<p>通过这个工作流程，我们成功实现了一个文档索引管道，使用 Milvus 作为向量数据库，并使用 OpenAI 的 Embeddings 模型进行语义表示。这一设置实现了快速、准确的基于向量的检索，为语义搜索、文档检索和上下文人工智能驱动的交互等 RAG 工作流程奠定了基础。</p>
<p>借助 Milvus 的可扩展存储功能和 Dynamiq 的协调功能，该解决方案既可用于原型开发，也可用于大规模生产部署。现在，您可以扩展这一管道，将基于检索的问题解答或人工智能驱动的内容生成等额外任务纳入其中。</p>
<h2 id="RAG-Document-Retrieval-Flow" class="common-anchor-header">RAG 文档检索流程<button data-href="#RAG-Document-Retrieval-Flow" class="anchor-icon" translate="no">
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
    </button></h2><p>在本教程中，我们将实现一个检索-增强生成（RAG）文档检索工作流。该工作流接收用户查询，为其生成向量嵌入，从 Milvus 向量数据库中检索最相关的文档，并使用大型语言模型（LLM）根据检索到的文档生成详细的、上下文感知的答案。</p>
<p>通过遵循这一工作流程，您将创建一个用于语义搜索和问题解答的端到端解决方案，将基于向量的文档检索功能与 OpenAI 高级 LLMs 的能力结合起来。这种方法可利用文档数据库中存储的知识，对用户查询做出高效、智能的响应。</p>
<h3 id="Import-Required-Libraries-and-Initialize-Workflow" class="common-anchor-header">导入所需库并初始化工作流程<button data-href="#Import-Required-Libraries-and-Initialize-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> dynamiq <span class="hljs-keyword">import</span> Workflow
<span class="hljs-keyword">from</span> dynamiq.connections <span class="hljs-keyword">import</span> (
    OpenAI <span class="hljs-keyword">as</span> OpenAIConnection,
    Milvus <span class="hljs-keyword">as</span> MilvusConnection,
    MilvusDeploymentType,
)
<span class="hljs-keyword">from</span> dynamiq.nodes.embedders <span class="hljs-keyword">import</span> OpenAITextEmbedder
<span class="hljs-keyword">from</span> dynamiq.nodes.retrievers <span class="hljs-keyword">import</span> MilvusDocumentRetriever
<span class="hljs-keyword">from</span> dynamiq.nodes.llms <span class="hljs-keyword">import</span> OpenAI
<span class="hljs-keyword">from</span> dynamiq.prompts <span class="hljs-keyword">import</span> Message, Prompt

<span class="hljs-comment"># Initialize the workflow</span>
retrieval_wf = Workflow()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-OpenAI-Connection-and-Text-Embedder" class="common-anchor-header">定义 OpenAI 连接和文本嵌入器<button data-href="#Define-OpenAI-Connection-and-Text-Embedder" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Establish OpenAI connection</span>
openai_connection = OpenAIConnection(api_key=os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>])

<span class="hljs-comment"># Define the text embedder node</span>
embedder = OpenAITextEmbedder(
    connection=openai_connection,
    model=<span class="hljs-string">&quot;text-embedding-3-small&quot;</span>,
)

<span class="hljs-comment"># Add the embedder node to the workflow</span>
embedder_added = retrieval_wf.flow.add_nodes(embedder)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-Milvus-Document-Retriever" class="common-anchor-header">定义 Milvus 文档检索器<button data-href="#Define-Milvus-Document-Retriever" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">document_retriever = (
    MilvusDocumentRetriever(
        connection=MilvusConnection(
            deployment_type=MilvusDeploymentType.FILE, uri=<span class="hljs-string">&quot;./milvus.db&quot;</span>
        ),
        index_name=<span class="hljs-string">&quot;my_milvus_collection&quot;</span>,
        dimension=<span class="hljs-number">1536</span>,
        top_k=<span class="hljs-number">5</span>,
    )
    .inputs(embedding=embedder.outputs.embedding)  <span class="hljs-comment"># Connect to embedder output</span>
    .depends_on(embedder)  <span class="hljs-comment"># Dependency on the embedder node</span>
)

<span class="hljs-comment"># Add the retriever node to the workflow</span>
milvus_retriever_added = retrieval_wf.flow.add_nodes(document_retriever)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:19 - WARNING - Environment variable 'MILVUS_API_TOKEN' not found
2024-11-19 22:14:19 - INFO - Pass in the local path ./milvus.db, and run it using milvus-lite
2024-11-19 22:14:19 - DEBUG - Created new connection using: 98d1132773af4298a894ad5925845fd2
2024-11-19 22:14:19 - INFO - Collection my_milvus_collection already exists. Skipping creation.
</code></pre>
<h3 id="Define-the-Prompt-Template" class="common-anchor-header">定义提示模板<button data-href="#Define-the-Prompt-Template" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the prompt template for the LLM</span>
prompt_template = <span class="hljs-string">&quot;&quot;&quot;
Please answer the question based on the provided context.

Question: {{ query }}

Context:
{% for document in documents %}
- {{ document.content }}
{% endfor %}
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Create the prompt object</span>
prompt = Prompt(messages=[Message(content=prompt_template, role=<span class="hljs-string">&quot;user&quot;</span>)])
<button class="copy-code-btn"></button></code></pre>
<h3 id="Define-the-Answer-Generator" class="common-anchor-header">定义答案生成器<button data-href="#Define-the-Answer-Generator" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">answer_generator = (
    OpenAI(
        connection=openai_connection,
        model=<span class="hljs-string">&quot;gpt-4o&quot;</span>,
        prompt=prompt,
    )
    .inputs(
        documents=document_retriever.outputs.documents,
        query=embedder.outputs.query,
    )
    .depends_on(
        [document_retriever, embedder]
    )  <span class="hljs-comment"># Dependencies on retriever and embedder</span>
)

<span class="hljs-comment"># Add the answer generator node to the workflow</span>
answer_generator_added = retrieval_wf.flow.add_nodes(answer_generator)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Run-the-Workflow" class="common-anchor-header">运行工作流<button data-href="#Run-the-Workflow" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-comment"># Run the workflow with a sample query</span>
sample_query = <span class="hljs-string">&quot;What is the Advanced Search Algorithms in Milvus?&quot;</span>

result = retrieval_wf.run(input_data={<span class="hljs-string">&quot;query&quot;</span>: sample_query})

answer = result.output.get(answer_generator.<span class="hljs-built_in">id</span>).get(<span class="hljs-string">&quot;output&quot;</span>, {}).get(<span class="hljs-string">&quot;content&quot;</span>)
<span class="hljs-built_in">print</span>(answer)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2024-11-19 22:14:22 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution started.
2024-11-19 22:14:22 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution started.
2024-11-19 22:14:22 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution started.
2024-11-19 22:14:23 - INFO - HTTP Request: POST https://api.openai.com/v1/embeddings &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:23 - INFO - Node OpenAITextEmbedder - 47afb0bc-cf96-429d-b58f-11b6c935fec3: execution succeeded in 474ms.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution started.
2024-11-19 22:14:23 - INFO - Node MilvusDocumentRetriever - 51c8311b-4837-411f-ba42-21e28239a2ee: execution succeeded in 23ms.
2024-11-19 22:14:23 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution started.
2024-11-19 22:14:24 - INFO - HTTP Request: POST https://api.openai.com/v1/chat/completions &quot;HTTP/1.1 200 OK&quot;
2024-11-19 22:14:24 - INFO - Node LLM - ac722325-bece-453f-a2ed-135b0749ee7a: execution succeeded in 1.8s.
2024-11-19 22:14:25 - INFO - Flow b30b48ec-d5d2-4e4c-8e25-d6976c8a9c17: execution succeeded in 2.4s.
2024-11-19 22:14:25 - INFO - Workflow f4a073fb-dfb6-499c-8cac-5710a7ad6d47: execution succeeded in 2.4s.


The advanced search algorithms in Milvus include a variety of in-memory and on-disk indexing/search algorithms such as IVF (Inverted File), HNSW (Hierarchical Navigable Small World), and DiskANN. These algorithms have been deeply optimized to enhance performance, delivering 30%-70% better performance compared to popular implementations like FAISS and HNSWLib. These optimizations are part of Milvus's design to ensure high efficiency and scalability in handling vector data.
</code></pre>
