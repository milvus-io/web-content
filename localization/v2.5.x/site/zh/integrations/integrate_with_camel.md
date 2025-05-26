---
id: integrate_with_camel.md
summary: 本指南演示了如何使用 CAMEL 和 Milvus 建立检索增强生成（RAG）系统。
title: 使用 Milvus 和 Camel 的检索增强生成 (RAG) 系统
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-Camel" class="common-anchor-header">使用 Milvus 和 Camel 的检索增强生成 (RAG) 系统<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-Camel" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_camel.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_camel.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>本指南演示了如何使用 Camel 和 Milvus 建立一个检索-增强生成（RAG）系统。</p>
<p>RAG 系统将检索系统与生成模型相结合，根据给定提示生成新文本。该系统首先使用 Milvus 从语料库中检索相关文档，然后使用生成模型根据检索到的文档生成新文本。</p>
<p><a href="https://www.camel-ai.org/">Camel</a>是一个多 Agents 框架。<a href="https://milvus.io/">Milvus</a>是世界上最先进的开源向量数据库，专为支持 Embeddings 相似性搜索和人工智能应用而构建。</p>
<p>在本笔记本中，我们将展示 CAMEL 检索模块的定制方式和自动方式的用法。我们还将展示如何将<code translate="no">AutoRetriever</code> 与<code translate="no">ChatAgent</code> 结合起来，并通过使用<code translate="no">Function Calling</code> 进一步将<code translate="no">AutoRetriever</code> 与<code translate="no">RolePlaying</code> 结合起来。</p>
<p>包括 4 个主要部分：</p>
<ul>
<li>自定义 RAG</li>
<li>自动 RAG</li>
<li>使用自动 RAG 的单个 Agents</li>
<li>使用自动 RAG 进行角色扮演</li>
</ul>
<h2 id="Load-Data" class="common-anchor-header">加载数据<button data-href="#Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p>首先从 https://arxiv.org/pdf/2303.17760.pdf 加载 Camel 文件。这将是我们的本地示例数据。</p>
<pre><code translate="no" class="language-python">$ pip install -U <span class="hljs-string">&quot;camel-ai[all]&quot;</span> pymilvus
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，要启用刚刚安装的依赖项，可能需要<strong>重新启动运行时</strong>（点击屏幕上方的 "运行时 "菜单，从下拉菜单中选择 "重新启动会话"）。</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests

os.makedirs(<span class="hljs-string">&quot;local_data&quot;</span>, exist_ok=<span class="hljs-literal">True</span>)

url = <span class="hljs-string">&quot;https://arxiv.org/pdf/2303.17760.pdf&quot;</span>
response = requests.get(url)
<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>, <span class="hljs-string">&quot;wb&quot;</span>) <span class="hljs-keyword">as</span> file:
    file.write(response.content)
<button class="copy-code-btn"></button></code></pre>
<h2 id="1-Customized-RAG" class="common-anchor-header">1.自定义 RAG<button data-href="#1-Customized-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将设置自定义 RAG 管道，以<code translate="no">VectorRetriever</code> 为例。我们将把<code translate="no">OpenAIEmbedding</code> 设置为嵌入模型，把<code translate="no">MilvusStorage</code> 设置为其存储空间。</p>
<p>要设置 OpenAI 嵌入，我们需要在下面的<code translate="no">OPENAI_API_KEY</code> 中进行设置。</p>
<pre><code translate="no" class="language-python">os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;Your Key&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>导入并设置嵌入实例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.embeddings <span class="hljs-keyword">import</span> OpenAIEmbedding

embedding_instance = OpenAIEmbedding()
<button class="copy-code-btn"></button></code></pre>
<p>导入并设置向量存储实例：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.storages <span class="hljs-keyword">import</span> MilvusStorage

storage_instance = MilvusStorage(
    vector_dim=embedding_instance.get_output_dim(),
    url_and_api_key=(
        <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
        <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
    ),
    collection_name=<span class="hljs-string">&quot;camel_paper&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>对于<code translate="no">url_and_api_key</code> ：</p>
<ul>
<li>使用本地文件，例如<code translate="no">./milvus.db</code> ，作为 Milvus 连接 URI 是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储在此文件中。</li>
<li>如果数据规模较大，可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上设置性能更强的 Milvus 服务器。在这种设置中，请使用服务器 uri（例如<code translate="no">http://localhost:19530</code> ）作为您的 url。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整连接 uri 和令牌，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">公共端点和 Api 密钥</a>相对应。</li>
</ul>
</div>
<p>导入并设置检索器实例：</p>
<p>默认情况下，<code translate="no">similarity_threshold</code> 设置为 0.75。您可以更改。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> VectorRetriever

vector_retriever = VectorRetriever(
    embedding_model=embedding_instance, storage=storage_instance
)
<button class="copy-code-btn"></button></code></pre>
<p>我们使用集成的<code translate="no">Unstructured Module</code> 将内容分割成小块，内容将通过<code translate="no">chunk_by_title</code> 功能自动分割，每个小块的最大字符数为 500 字符，这是<code translate="no">OpenAIEmbedding</code> 的合适长度。分块中的所有文本将被嵌入并存储到向量存储实例中，这需要一些时间，请稍候。</p>
<pre><code translate="no" class="language-python">vector_retriever.process(content_input_path=<span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[nltk_data] Downloading package punkt to /root/nltk_data...
[nltk_data]   Unzipping tokenizers/punkt.zip.
[nltk_data] Downloading package averaged_perceptron_tagger to
[nltk_data]     /root/nltk_data...
[nltk_data]   Unzipping taggers/averaged_perceptron_tagger.zip.
</code></pre>
<p>现在，我们可以通过查询从向量存储中获取信息。默认情况下，它会返回余弦相似度得分最高的前 1 个块中的文本内容，相似度得分应高于 0.75，以确保检索到的内容与查询相关。您也可以更改<code translate="no">top_k</code> 值。</p>
<p>返回的字符串列表包括</p>
<ul>
<li>相似度得分</li>
<li>内容路径</li>
<li>元数据</li>
<li>文本</li>
</ul>
<pre><code translate="no" class="language-python">retrieved_info = vector_retriever.query(query=<span class="hljs-string">&quot;What is CAMEL?&quot;</span>, top_k=<span class="hljs-number">1</span>)
<span class="hljs-built_in">print</span>(retrieved_info)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'similarity score': '0.8321675658226013', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 45}, 'text': 'CAMEL Data and Code License The intended purpose and licensing of CAMEL is solely for research use. The source code is licensed under Apache 2.0. The datasets are licensed under CC BY NC 4.0, which permits only non-commercial usage. It is advised that any models trained using the dataset should not be utilized for anything other than research purposes.\n\n45'}]
</code></pre>
<p>让我们试试不相关的查询：</p>
<pre><code translate="no" class="language-python">retrieved_info_irrelevant = vector_retriever.query(
    query=<span class="hljs-string">&quot;Compared with dumpling and rice, which should I take for dinner?&quot;</span>, top_k=<span class="hljs-number">1</span>
)

<span class="hljs-built_in">print</span>(retrieved_info_irrelevant)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{'text': 'No suitable information retrieved from local_data/camel paper.pdf                 with similarity_threshold = 0.75.'}]
</code></pre>
<h2 id="2-Auto-RAG" class="common-anchor-header">2.自动 RAG<button data-href="#2-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将使用默认设置运行<code translate="no">AutoRetriever</code> 。它使用<code translate="no">OpenAIEmbedding</code> 作为默认嵌入模型，使用<code translate="no">Milvus</code> 作为默认向量存储。</p>
<p>您需要做的是</p>
<ul>
<li>设置内容输入路径，可以是本地路径或远程网址</li>
<li>为 Milvus 设置远程 url 和 api 密钥</li>
<li>提供查询</li>
</ul>
<p>自动 RAG 管道将为给定的内容输入路径创建 Collections，Collection 名称将根据内容输入路径名称自动设置，如果该 Collections 存在，它将直接进行检索。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> AutoRetriever
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> StorageType

auto_retriever = AutoRetriever(
    url_and_api_key=(
        <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
        <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
    ),
    storage_type=StorageType.MILVUS,
    embedding_model=embedding_instance,
)

retrieved_info = auto_retriever.run_vector_retriever(
    query=<span class="hljs-string">&quot;What is CAMEL-AI&quot;</span>,
    content_input_paths=[
        <span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>,  <span class="hljs-comment"># example local path</span>
        <span class="hljs-string">&quot;https://www.camel-ai.org/&quot;</span>,  <span class="hljs-comment"># example remote url</span>
    ],
    top_k=<span class="hljs-number">1</span>,
    return_detailed_info=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(retrieved_info)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Original Query:
{What is CAMEL-AI}
Retrieved Context:
{'similarity score': '0.8252888321876526', 'content path': 'local_data/camel paper.pdf', 'metadata': {'last_modified': '2024-04-19T14:40:00', 'filetype': 'application/pdf', 'page_number': 7}, 'text': ' Section 3.2, to simulate assistant-user cooperation. For our analysis, we set our attention on AI Society setting. We also gathered conversational data, named CAMEL AI Society and CAMEL Code datasets and problem-solution pairs data named CAMEL Math and CAMEL Science and analyzed and evaluated their quality. Moreover, we will discuss potential extensions of our framework and highlight both the risks and opportunities that future AI society might present.'}
{'similarity score': '0.8378663659095764', 'content path': 'https://www.camel-ai.org/', 'metadata': {'filetype': 'text/html', 'languages': ['eng'], 'page_number': 1, 'url': 'https://www.camel-ai.org/', 'link_urls': ['#h.3f4tphhd9pn8', 'https://join.slack.com/t/camel-ai/shared_invite/zt-2g7xc41gy-_7rcrNNAArIP6sLQqldkqQ', 'https://discord.gg/CNcNpquyDc'], 'link_texts': [None, None, None], 'emphasized_text_contents': ['Mission', 'CAMEL-AI.org', 'is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.', 'Join us via', 'Slack', 'Discord', 'or'], 'emphasized_text_tags': ['span', 'span', 'span', 'span', 'span', 'span', 'span']}, 'text': 'Mission\n\nCAMEL-AI.org is an open-source community dedicated to the study of autonomous and communicative agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we provide, implement, and support various types of agents, tasks, prompts, models, datasets, and simulated environments.\n\nJoin us via\n\nSlack\n\nDiscord\n\nor'}
</code></pre>
<h2 id="3-Single-Agent-with-Auto-RAG" class="common-anchor-header">3.带有自动 RAG 的单一 Agents<button data-href="#3-Single-Agent-with-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将展示如何将<code translate="no">AutoRetriever</code> 与一个<code translate="no">ChatAgent</code> 结合起来。</p>
<p>让我们设置一个 Agents 函数，在此函数中，我们可以通过向该代理提供查询来获取响应。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> camel.agents <span class="hljs-keyword">import</span> ChatAgent
<span class="hljs-keyword">from</span> camel.messages <span class="hljs-keyword">import</span> BaseMessage
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> RoleType
<span class="hljs-keyword">from</span> camel.retrievers <span class="hljs-keyword">import</span> AutoRetriever
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> StorageType


<span class="hljs-keyword">def</span> <span class="hljs-title function_">single_agent</span>(<span class="hljs-params">query: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    <span class="hljs-comment"># Set agent role</span>
    assistant_sys_msg = BaseMessage(
        role_name=<span class="hljs-string">&quot;Assistant&quot;</span>,
        role_type=RoleType.ASSISTANT,
        meta_dict=<span class="hljs-literal">None</span>,
        content=<span class="hljs-string">&quot;&quot;&quot;You are a helpful assistant to answer question,
         I will give you the Original Query and Retrieved Context,
        answer the Original Query based on the Retrieved Context,
        if you can&#x27;t answer the question just say I don&#x27;t know.&quot;&quot;&quot;</span>,
    )

    <span class="hljs-comment"># Add auto retriever</span>
    auto_retriever = AutoRetriever(
        url_and_api_key=(
            <span class="hljs-string">&quot;./milvus_demo.db&quot;</span>,  <span class="hljs-comment"># Your Milvus connection URI</span>
            <span class="hljs-string">&quot;&quot;</span>,  <span class="hljs-comment"># Your Milvus token</span>
        ),
        storage_type=StorageType.MILVUS,
        embedding_model=embedding_instance,
    )

    retrieved_info = auto_retriever.run_vector_retriever(
        query=query,
        content_input_paths=[
            <span class="hljs-string">&quot;local_data/camel paper.pdf&quot;</span>,  <span class="hljs-comment"># example local path</span>
            <span class="hljs-string">&quot;https://www.camel-ai.org/&quot;</span>,  <span class="hljs-comment"># example remote url</span>
        ],
        <span class="hljs-comment"># vector_storage_local_path=&quot;storage_default_run&quot;,</span>
        top_k=<span class="hljs-number">1</span>,
        return_detailed_info=<span class="hljs-literal">True</span>,
    )

    <span class="hljs-comment"># Pass the retrieved infomation to agent</span>
    user_msg = BaseMessage.make_user_message(role_name=<span class="hljs-string">&quot;User&quot;</span>, content=retrieved_info)
    agent = ChatAgent(assistant_sys_msg)

    <span class="hljs-comment"># Get response</span>
    assistant_response = agent.step(user_msg)
    <span class="hljs-keyword">return</span> assistant_response.msg.content


<span class="hljs-built_in">print</span>(single_agent(<span class="hljs-string">&quot;What is CAMEL-AI&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">CAMEL-AI is an open-source community dedicated to the study of autonomous and communicative agents. It provides, implements, and supports various types of agents, tasks, prompts, models, datasets, and simulated environments to facilitate research in this field.
</code></pre>
<h2 id="4-Role-playing-with-Auto-RAG" class="common-anchor-header">4.使用自动 RAG 进行角色扮演<button data-href="#4-Role-playing-with-Auto-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>在本节中，我们将展示如何通过应用<code translate="no">Function Calling</code> 将<code translate="no">RETRIEVAL_FUNCS</code> 与<code translate="no">RolePlaying</code> 结合起来。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> colorama <span class="hljs-keyword">import</span> Fore

<span class="hljs-keyword">from</span> camel.agents.chat_agent <span class="hljs-keyword">import</span> FunctionCallingRecord
<span class="hljs-keyword">from</span> camel.configs <span class="hljs-keyword">import</span> ChatGPTConfig
<span class="hljs-keyword">from</span> camel.functions <span class="hljs-keyword">import</span> (
    MATH_FUNCS,
    RETRIEVAL_FUNCS,
)
<span class="hljs-keyword">from</span> camel.societies <span class="hljs-keyword">import</span> RolePlaying
<span class="hljs-keyword">from</span> camel.types <span class="hljs-keyword">import</span> ModelType
<span class="hljs-keyword">from</span> camel.utils <span class="hljs-keyword">import</span> print_text_animated


<span class="hljs-keyword">def</span> <span class="hljs-title function_">role_playing_with_rag</span>(<span class="hljs-params">
    task_prompt, model_type=ModelType.GPT_4O, chat_turn_limit=<span class="hljs-number">10</span>
</span>) -&gt; <span class="hljs-literal">None</span>:
    task_prompt = task_prompt

    user_model_config = ChatGPTConfig(temperature=<span class="hljs-number">0.0</span>)

    function_list = [
        *MATH_FUNCS,
        *RETRIEVAL_FUNCS,
    ]
    assistant_model_config = ChatGPTConfig(
        tools=function_list,
        temperature=<span class="hljs-number">0.0</span>,
    )

    role_play_session = RolePlaying(
        assistant_role_name=<span class="hljs-string">&quot;Searcher&quot;</span>,
        user_role_name=<span class="hljs-string">&quot;Professor&quot;</span>,
        assistant_agent_kwargs=<span class="hljs-built_in">dict</span>(
            model_type=model_type,
            model_config=assistant_model_config,
            tools=function_list,
        ),
        user_agent_kwargs=<span class="hljs-built_in">dict</span>(
            model_type=model_type,
            model_config=user_model_config,
        ),
        task_prompt=task_prompt,
        with_task_specify=<span class="hljs-literal">False</span>,
    )

    <span class="hljs-built_in">print</span>(
        Fore.GREEN
        + <span class="hljs-string">f&quot;AI Assistant sys message:\n<span class="hljs-subst">{role_play_session.assistant_sys_msg}</span>\n&quot;</span>
    )
    <span class="hljs-built_in">print</span>(Fore.BLUE + <span class="hljs-string">f&quot;AI User sys message:\n<span class="hljs-subst">{role_play_session.user_sys_msg}</span>\n&quot;</span>)

    <span class="hljs-built_in">print</span>(Fore.YELLOW + <span class="hljs-string">f&quot;Original task prompt:\n<span class="hljs-subst">{task_prompt}</span>\n&quot;</span>)
    <span class="hljs-built_in">print</span>(
        Fore.CYAN
        + <span class="hljs-string">f&quot;Specified task prompt:\n<span class="hljs-subst">{role_play_session.specified_task_prompt}</span>\n&quot;</span>
    )
    <span class="hljs-built_in">print</span>(Fore.RED + <span class="hljs-string">f&quot;Final task prompt:\n<span class="hljs-subst">{role_play_session.task_prompt}</span>\n&quot;</span>)

    n = <span class="hljs-number">0</span>
    input_msg = role_play_session.init_chat()
    <span class="hljs-keyword">while</span> n &lt; chat_turn_limit:
        n += <span class="hljs-number">1</span>
        assistant_response, user_response = role_play_session.step(input_msg)

        <span class="hljs-keyword">if</span> assistant_response.terminated:
            <span class="hljs-built_in">print</span>(
                Fore.GREEN
                + (
                    <span class="hljs-string">&quot;AI Assistant terminated. Reason: &quot;</span>
                    <span class="hljs-string">f&quot;<span class="hljs-subst">{assistant_response.info[<span class="hljs-string">&#x27;termination_reasons&#x27;</span>]}</span>.&quot;</span>
                )
            )
            <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">if</span> user_response.terminated:
            <span class="hljs-built_in">print</span>(
                Fore.GREEN
                + (
                    <span class="hljs-string">&quot;AI User terminated. &quot;</span>
                    <span class="hljs-string">f&quot;Reason: <span class="hljs-subst">{user_response.info[<span class="hljs-string">&#x27;termination_reasons&#x27;</span>]}</span>.&quot;</span>
                )
            )
            <span class="hljs-keyword">break</span>

        <span class="hljs-comment"># Print output from the user</span>
        print_text_animated(Fore.BLUE + <span class="hljs-string">f&quot;AI User:\n\n<span class="hljs-subst">{user_response.msg.content}</span>\n&quot;</span>)

        <span class="hljs-comment"># Print output from the assistant, including any function</span>
        <span class="hljs-comment"># execution information</span>
        print_text_animated(Fore.GREEN + <span class="hljs-string">&quot;AI Assistant:&quot;</span>)
        tool_calls: <span class="hljs-type">List</span>[FunctionCallingRecord] = assistant_response.info[<span class="hljs-string">&quot;tool_calls&quot;</span>]
        <span class="hljs-keyword">for</span> func_record <span class="hljs-keyword">in</span> tool_calls:
            print_text_animated(<span class="hljs-string">f&quot;<span class="hljs-subst">{func_record}</span>&quot;</span>)
        print_text_animated(<span class="hljs-string">f&quot;<span class="hljs-subst">{assistant_response.msg.content}</span>\n&quot;</span>)

        <span class="hljs-keyword">if</span> <span class="hljs-string">&quot;CAMEL_TASK_DONE&quot;</span> <span class="hljs-keyword">in</span> user_response.msg.content:
            <span class="hljs-keyword">break</span>

        input_msg = assistant_response.msg
<button class="copy-code-btn"></button></code></pre>
<p>使用定义的检索器函数运行角色扮演：</p>
<pre><code translate="no" class="language-python">role_playing_with_rag(
    task_prompt=<span class="hljs-string">&quot;&quot;&quot;What is the main termination reasons for AI Society
                   dataset, how many number of messages did camel decided to
                   limit, what&#x27;s the value plus 100? You should refer to the
                   content in path camel/local_data/camel paper.pdf&quot;&quot;&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">AI Assistant sys message:
BaseMessage(role_name='Searcher', role_type=&lt;RoleType.ASSISTANT: 'assistant'&gt;, meta_dict={'task': &quot;What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?&quot;, 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content=&quot;===== RULES OF ASSISTANT =====\nNever forget you are a Searcher and I am a Professor. Never flip roles! Never instruct me!\nWe share a common interest in collaborating to successfully complete a task.\nYou must help me to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?. Never forget our task!\nI must instruct you based on your expertise and my needs to complete the task.\n\nI must give you one instruction at a time.\nYou must write a specific solution that appropriately solves the requested instruction and explain your solutions.\nYou must decline my instruction honestly if you cannot perform the instruction due to physical, moral, legal reasons or your capability and explain the reasons.\nUnless I say the task is completed, you should always start with:\n\nSolution: &lt;YOUR_SOLUTION&gt;\n\n&lt;YOUR_SOLUTION&gt; should be very specific, include detailed explanations and provide preferable detailed implementations and examples and lists for task-solving.\nAlways end &lt;YOUR_SOLUTION&gt; with: Next request.&quot;)

AI User sys message:
BaseMessage(role_name='Professor', role_type=&lt;RoleType.USER: 'user'&gt;, meta_dict={'task': &quot;What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?&quot;, 'assistant_role': 'Searcher', 'user_role': 'Professor'}, content='===== RULES OF USER =====\nNever forget you are a Professor and I am a Searcher. Never flip roles! You will always instruct me.\nWe share a common interest in collaborating to successfully complete a task.\nI must help you to complete the task.\nHere is the task: What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what\'s the value plus 100?. Never forget our task!\nYou must instruct me based on my expertise and your needs to solve the task ONLY in the following two ways:\n\n1. Instruct with a necessary input:\nInstruction: &lt;YOUR_INSTRUCTION&gt;\nInput: &lt;YOUR_INPUT&gt;\n\n2. Instruct without any input:\nInstruction: &lt;YOUR_INSTRUCTION&gt;\nInput: None\n\nThe &quot;Instruction&quot; describes a task or question. The paired &quot;Input&quot; provides further context or information for the requested &quot;Instruction&quot;.\n\nYou must give me one instruction at a time.\nI must write a response that appropriately solves the requested instruction.\nI must decline your instruction honestly if I cannot perform the instruction due to physical, moral, legal reasons or my capability and explain the reasons.\nYou should instruct me not ask me questions.\nNow you must start to instruct me using the two ways described above.\nDo not add anything else other than your instruction and the optional corresponding input!\nKeep giving me instructions and necessary inputs until you think the task is completed.\nWhen the task is completed, you must only reply with a single word &lt;CAMEL_TASK_DONE&gt;.\nNever say &lt;CAMEL_TASK_DONE&gt; unless my responses have solved your task.')

Original task prompt:
What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?

Specified task prompt:
None

Final task prompt:
What is the main termination reasons for AI Society dataset, how many number of messages did camel decided to limit, what's the value plus 100?



AI User:

Instruction: Provide a summary of the main termination reasons in the AI Society dataset.
Input: None


AI Assistant:

Function Execution: local_retriever
    Args: {'query': 'main termination reasons for AI Society dataset'}
    Result: Original Query:
{main termination reasons for AI Society dataset}
Retrieved Context:
Next we examine the conversation termination reasons for both AI Society and Code datasets. As can be seen in Figure 8, the main termination reasons for AI Society dataset is Assistant Instruct whereas for Code it is Token Limit. The latter is expected as the since responses that contain code tend to be long. It is also interesting to note that in both datasets, the termination due to Maximum Number of Messages is low indicating that the limit of 40 maximum messages is reasonable. Our decision t

Solution: The main termination reason for the AI Society dataset is &quot;Assistant Instruct.&quot; This indicates that conversations in the AI Society dataset typically end when the assistant is instructed to terminate the conversation.

Next request.


AI User:

Instruction: Identify the number of messages that the camel decided to limit in the context provided.
Input: None


AI Assistant:

Solution: The context provided from the local retriever indicates that the camel decided to limit the number of messages to a maximum of 40 messages. This is mentioned in the retrieved context where it states that the termination due to Maximum Number of Messages is low, indicating that the limit of 40 maximum messages is reasonable.

Next request.


AI User:

Instruction: Calculate the value of the message limit plus 100.
Input: None


AI Assistant:

Function Execution: add
    Args: {'a': 40, 'b': 100}
    Result: 140

Solution: The value of the message limit plus 100 is 140.

Next request.


AI User:

CAMEL_TASK_DONE


AI Assistant:

Solution: Understood, the task is completed.

Next request.
</code></pre>
