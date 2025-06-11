---
id: llama_agents_metadata.md
summary: >-
  在本笔记本中，我们将探讨不同的想法：将数据存储到 Milvus 中，使用 llama-index 与 Mistral
  模型进行数据查询，创建自动数据搜索和读取 Agents，以及开发根据用户查询进行元数据过滤的 Agents。
title: 使用 Mistral AI、Milvus 和 Llama-agents 的多代理系统
---
<h1 id="Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="common-anchor-header">使用 Mistral AI、Milvus 和 Llama-agents 的多代理系统<button data-href="#Multi-agent-Systems-with-Mistral-AI-Milvus-and-Llama-agents" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Goal-of-this-Notebook" class="common-anchor-header">本手册的目标<button data-href="#Goal-of-this-Notebook" class="anchor-icon" translate="no">
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
    </button></h2><p>在本笔记本中，我们将探索不同的想法：</p>
<ul>
<li><p>1️⃣将数据存储到Milvus中：学习将数据存储到Milvus中，Milvus是一个高效的向量数据库，专为高速相似性搜索和人工智能应用而设计。</p></li>
<li><p>2️⃣結合Mistral模型使用llama-index進行數據查詢：探索如何結合Mistral模型使用llama-index查詢儲存於Milvus的數據。</p></li>
<li><p>3️⃣创建自动数据搜索和读取代理：建立能够根据用户查询自动搜索和读取数据的代理。这些自动代理将通过提供快速、准确的响应，减少人工搜索的工作量，从而提升用户体验。</p></li>
<li><p>4️⃣开发基于用户查询的元数据过滤代理：实施能够根据用户查询自动生成元数据过滤器的代理，细化搜索结果并将其与上下文联系起来，避免混淆并提高检索信息的准确性，即使对于复杂的查询也是如此。</p></li>
<li><p>🔍 小结 在本手册结束时，您将全面了解如何使用 Milvus、带有 llama-agents 的 llama-index 和 Mistral 模型来构建健壮高效的数据检索系统。</p></li>
</ul>
<h2 id="Milvus" class="common-anchor-header">Milvus<button data-href="#Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一个开源向量数据库，通过向量嵌入和相似性搜索为人工智能应用提供动力。</p>
<p>在本笔记本中，我们使用 Milvus Lite，它是 Milvus 的轻量级版本。</p>
<p>有了 Milvus Lite，你可以在几分钟内开始用向量相似性搜索构建人工智能应用！Milvus Lite 适合在以下环境中运行：</p>
<ul>
<li>Jupyter Notebook / Google Colab</li>
<li>笔记本电脑</li>
<li>边缘设备</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ad459431-95ac-4cbd-a931-453d08d5fdef.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>图像.png</span> </span></p>
<h2 id="llama-agents" class="common-anchor-header">llama-agents<button data-href="#llama-agents" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">llama-agents</code> 可以将 Agents 作为微服务运行。这样就可以上下扩展服务。</p>
<h2 id="llama-index" class="common-anchor-header">llama-index<button data-href="#llama-index" class="anchor-icon" translate="no">
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
    </button></h2><p>LlamaIndex 是 LLM 应用程序的数据框架。它提供的工具包括</p>
<ul>
<li>数据连接器可从本地来源和格式摄取现有数据。</li>
<li>数据索引将您的数据结构化为便于 LLMs 使用且性能良好的中间表示形式。</li>
<li>引擎提供对数据的自然语言访问。</li>
<li>Agents 是由 LLM 驱动的知识工作者，通过工具（从简单的辅助功能到 API 集成等）进行增强。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/7bd73318-7929-4675-8998-c2e9ef091906.png" alt="image.png" class="doc-image" id="image.png" />
   </span> <span class="img-wrapper"> <span>图片.png</span> </span></p>
<h2 id="Mistral-AI" class="common-anchor-header">Mistral AI<button data-href="#Mistral-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral AI 是一家构建 LLMs 和 Embeddings 模型的研究实验室，他们最近发布了新版本的模型 Mistral Nemo 和 Mistral Large，这两个模型在 RAG 和函数调用方面表现尤为出色。因此，我们将在本笔记本中使用它们。</p>
<h2 id="Install-Dependencies" class="common-anchor-header">安装依赖项<button data-href="#Install-Dependencies" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-agents pymilvus openai python-dotenv</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index-readers-file llama-index-llms-ollama llama-index-llms-mistralai llama-index-embeddings-mistralai</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># <span class="hljs-doctag">NOTE:</span> This is ONLY necessary in jupyter notebook.</span>
<span class="hljs-comment"># Details: Jupyter runs an event-loop behind the scenes.</span>
<span class="hljs-comment">#          This results in nested event-loops when we start an event-loop to make async queries.</span>
<span class="hljs-comment">#          This is normally not allowed, we use nest_asyncio to allow it for convenience.</span>
<span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Get-your-API-Key-for-Mistral" class="common-anchor-header">获取 Mistral 的 API 密钥<button data-href="#Get-your-API-Key-for-Mistral" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以从<a href="https://console.mistral.ai/api-keys/">Mistral 云控制台</a>获取 Mistral API 密钥。</p>
<pre><code translate="no" class="language-python"><span class="hljs-string">&quot;&quot;&quot;
load_dotenv reads key-value pairs from a .env file and can set them as environment variables.
This is useful to avoid leaking your API key for example :D
&quot;&quot;&quot;</span>

<span class="hljs-keyword">from</span> dotenv <span class="hljs-keyword">import</span> load_dotenv
<span class="hljs-keyword">import</span> os

load_dotenv()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">True
</code></pre>
<h2 id="Download-data" class="common-anchor-header">下载数据<button data-href="#Download-data" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/10k/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/uber_2021.pdf&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/lyft_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/10k/lyft_2021.pdf&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h1 id="Prepare-Embedding-Model" class="common-anchor-header">准备嵌入模型<button data-href="#Prepare-Embedding-Model" class="anchor-icon" translate="no">
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
    </button></h1><p>我们定义了将在本笔记本中使用的 Embedding 模型。我们使用<code translate="no">mistral-embed</code> ，它是 Mistral 开发的 Embedding 模型，在训练时考虑了检索问题，因此非常适合我们的 Agentsic RAG 系统。详情请参阅 Mistral 文档中的<a href="https://docs.mistral.ai/capabilities/embeddings/">Embeddings</a>页面。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings
<span class="hljs-keyword">from</span> llama_index.embeddings.mistralai <span class="hljs-keyword">import</span> MistralAIEmbedding

<span class="hljs-comment"># Define the default Embedding model used in this Notebook.</span>
<span class="hljs-comment"># We are using Mistral Models, so we are also using Mistral Embeddings</span>

Settings.embed_model = MistralAIEmbedding(model_name=<span class="hljs-string">&quot;mistral-embed&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-the-LLM-Model" class="common-anchor-header">定义 LLM 模型<button data-href="#Define-the-LLM-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Llama Index 使用 LLMs 来响应提示和查询，并负责编写自然语言响应。 我们将 Mistral Nemo 定义为默认的一个。Nemo 可提供高达 128k 个词组的大型上下文窗口。它的推理能力、世界知识和编码准确性在同类产品中都是最先进的。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama

Settings.llm = Ollama(<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Instanciate-Milvus-and-Load-Data" class="common-anchor-header">安装 Milvus 并加载数据<button data-href="#Instanciate-Milvus-and-Load-Data" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/">Milvus</a>是一个流行的开源向量数据库，它通过高性能、可扩展的向量相似性搜索为人工智能应用提供动力。</p>
<ul>
<li>将 uri 设置为本地文件（如<code translate="no">./milvus.db</code> ）是最方便的方法，因为它会自动利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>将所有数据存储到该文件中。</li>
<li>如果你有大规模数据，比如超过一百万个向量，你可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上设置性能更强的 Milvus 服务器。在此设置中，请使用服务器 uri，例如<code translate="no">http://localhost:19530</code> 作为您的 uri。</li>
<li>如果你想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的全托管云服务），请调整 uri 和令牌，它们与 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端点和 API 密钥</a>相对应。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> (
    SimpleDirectoryReader,
    VectorStoreIndex,
    StorageContext,
    load_index_from_storage,
)
<span class="hljs-keyword">from</span> llama_index.core.tools <span class="hljs-keyword">import</span> QueryEngineTool, ToolMetadata

input_files = [<span class="hljs-string">&quot;./data/10k/lyft_2021.pdf&quot;</span>, <span class="hljs-string">&quot;./data/10k/uber_2021.pdf&quot;</span>]

<span class="hljs-comment"># Create a single Milvus vector store</span>
vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1024</span>, overwrite=<span class="hljs-literal">False</span>, collection_name=<span class="hljs-string">&quot;companies_docs&quot;</span>
)

<span class="hljs-comment"># Create a storage context with the Milvus vector store</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)

<span class="hljs-comment"># Load data</span>
docs = SimpleDirectoryReader(input_files=input_files).load_data()

<span class="hljs-comment"># Build index</span>
index = VectorStoreIndex.from_documents(docs, storage_context=storage_context)

<span class="hljs-comment"># Define the query engine</span>
company_engine = index.as_query_engine(similarity_top_k=<span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Define-Tools" class="common-anchor-header">定义工具<button data-href="#Define-Tools" class="anchor-icon" translate="no">
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
    </button></h2><p>构建有效 Agents 的关键步骤之一是定义它可以用来执行任务的工具。这些工具本质上是 Agents 可以用来检索信息或执行操作的功能或服务。</p>
<p>下面，我们将定义两个工具，让我们的 Agents 可以用来查询 2021 年 Lyft 和 Uber 的财务信息。这些工具将集成到我们的 Agents 中，使其能够用精确的相关信息响应自然语言查询。</p>
<p>如果你看一下我们顶部的图，这就是 "Agent 服务"。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define the different tools that can be used by our Agent.</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;lyft_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Lyft financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
    QueryEngineTool(
        query_engine=company_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;uber_10k&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about Uber financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.ollama <span class="hljs-keyword">import</span> Ollama
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># Set up the agent</span>
llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)

response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;Could you please provide a comparison between Lyft and Uber&#x27;s total revenues in 2021?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Example usage without metadata filtering</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response without metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Response without metadata filtering:
The revenue for Lyft in 2021 was $3.84 billion.

Uber's total revenue for the year ended December 31, 2021 was $17,455 million.
</code></pre>
<h2 id="Metadata-Filtering" class="common-anchor-header">元数据过滤<button data-href="#Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus</strong>支持<a href="https://zilliz.com/blog/json-metadata-filtering-in-milvus">元数据过滤</a>，这是一种可以根据与数据相关的特定属性或标签来完善和缩小搜索结果的技术。这在拥有大量数据、只需检索符合特定条件的相关数据子集的情况下特别有用。</p>
<h2 id="Use-Cases-for-Metadata-Filtering" class="common-anchor-header">元数据过滤使用案例<button data-href="#Use-Cases-for-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>精确搜索结果</strong>：通过应用元数据筛选器，可以确保搜索结果与用户的查询高度相关。例如，如果您有一个财务文档 Collections，您可以根据公司名称、年份或任何其他相关元数据对其进行过滤。</p></li>
<li><p><strong>效率</strong>：元数据过滤有助于减少需要处理的数据量，提高搜索操作的效率。这在处理大型数据集时尤其有益。</p></li>
<li><p><strong>定制</strong>：不同的用户或应用程序可能有不同的要求。元数据过滤功能可让您自定义搜索结果，以满足特定需求，例如检索特定年份或公司的文档。</p></li>
</ul>
<h2 id="Example-usage" class="common-anchor-header">使用示例<button data-href="#Example-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>在下面的代码块中，元数据过滤用于创建一个过滤查询引擎，根据特定的元数据键值对检索文档：<code translate="no">file_name</code> ：<code translate="no">lyft_2021.pdf</code></p>
<p>下面定义的<code translate="no">QueryEngineTool</code> 比上面定义的更通用，在上面的工具中，我们为每家公司（Uber 和 Lyft）提供了一个工具，而在这个工具中，它更通用。通过添加元数据过滤，我们可以只从特定文档中获取数据。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Example usage with metadata filtering</span>
filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;lyft_2021.pdf&quot;</span>)]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;filters: <span class="hljs-subst">{filters}</span>&quot;</span>)
filtered_query_engine = index.as_query_engine(filters=filters)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
                <span class="hljs-string">&quot;Use this tool to retrieve specific data points about a company. &quot;</span>
                <span class="hljs-string">&quot;Do not attempt to interpret or summarize the data.&quot;</span>
            ),
        ),
    ),
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">filters: filters=[MetadataFilter(key='file_name', value='lyft_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<h2 id="Function-Calling" class="common-anchor-header">函数调用<button data-href="#Function-Calling" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral Nemo 和 Large 支持本地函数调用。通过 LLM 上的<code translate="no">predict_and_call</code> 函数，可与 LlamaIndex 工具实现无缝集成。这允许用户附加任何工具，并让 LLM 决定调用哪些工具（如果有的话）。</p>
<p>您可以在 llama-index 网站上了解有关<a href="https://docs.llamaindex.ai/en/latest/module_guides/deploying/agents/">Agents</a>的更多信息。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Set up the LLM we will use for Function Calling</span>

llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Interact-with-the-Agent" class="common-anchor-header">与 Agents 交互<button data-href="#Interact-with-the-Agent" class="anchor-icon" translate="no">
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
    </button></h2><p>现在我们可以看到元数据过滤的实际效果：</p>
<ol>
<li>在第一张图中，Agent 应该找不到任何与用户查询相关的信息，因为它是关于 Uber 的，而我们只过滤了关于 Lyft 的文档。</li>
<li>在第二个例子中，Agent 应该能找到关于 Lyft 的信息，因为我们只搜索关于 Lyft 的文档。</li>
</ol>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;How many employees does Uber have?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">I'm unable to provide information about Uber's employee count as it's outside the given Lyft context.
</code></pre>
<pre><code translate="no" class="language-python">response = llm.predict_and_call(
    query_engine_tools,
    user_msg=<span class="hljs-string">&quot;What are the risk factors for Lyft?&quot;</span>,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Investing in Lyft carries significant risks. These include general economic factors like impacts from pandemics or crises, operational factors such as competition, pricing changes, and driver/ride growth unpredictability, insurance coverage issues, autonomous vehicle technology uncertainties, reputational concerns, potential security breaches, reliance on third-party services, and challenges in expanding platform offerings. Lyft's business operations are subject to numerous other risks not explicitly mentioned here, which could also harm its financial condition and prospects.
</code></pre>
<h2 id="Example-of-Confusion-Without-Metadata-Filtering" class="common-anchor-header">没有元数据过滤的混乱示例<button data-href="#Example-of-Confusion-Without-Metadata-Filtering" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">&gt; Question: What are the risk factors for Uber?

&gt; Response without metadata filtering:
Based on the provided context, which pertains to Lyft&#x27;s Risk Factors section in their Annual Report, some of the potential risk factors applicable to a company like Uber might include:

- General economic factors such as the impact of global pandemics or other crises on ride-sharing demand.
- Operational factors like competition in ride-hailing services, unpredictability in results of operations, and uncertainty about market growth for ridesharing and related services.
- Risks related to attracting and retaining qualified drivers and riders.
<button class="copy-code-btn"></button></code></pre>
<p>在这个例子中，系统错误地提供了关于 Lyft 而不是 Uber 的信息，导致了误导性的回复。系统一开始说它没有相关信息，然后就继续说下去。</p>
<h2 id="Using-an-Agent-to-Extract-Metadata-Filters" class="common-anchor-header">使用 Agents 提取元数据过滤器<button data-href="#Using-an-Agent-to-Extract-Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>为了解决这个问题，我们可以使用 Agents 自动从用户的问题中提取元数据过滤器，并在问题解答过程中应用它们。这样就能确保系统检索到正确的相关信息。</p>
<h2 id="Code-Example" class="common-anchor-header">代码示例<button data-href="#Code-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>下面是一个代码示例，演示如何使用 Agents 从用户问题中提取元数据过滤器来创建过滤查询引擎：</p>
<h3 id="Explanation" class="common-anchor-header">说明</h3><ul>
<li><p><strong>提示模板</strong>：PromptTemplate 类用于定义从用户问题中提取元数据过滤器的模板。该模板指示语言模型考虑公司名称、年份和其他相关属性。</p></li>
<li><p><strong>LLM</strong>: Mistral Nemo 用于根据用户的问题生成元数据过滤器。模型根据问题和模板提示提取相关过滤器。</p></li>
<li><p><strong>元数据过滤器</strong>：对来自 LLM 的响应进行解析，以创建<code translate="no">MetadataFilters</code> 对象。如果没有提及特定的筛选器，则会返回一个空的<code translate="no">MetadataFilters</code> 对象。</p></li>
<li><p><strong>过滤查询引擎</strong>：<code translate="no">index.as_query_engine(filters=metadata_filters)</code> 方法会创建一个查询引擎，将提取的元数据过滤器应用到索引中。这可确保只检索符合筛选条件的文档。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.prompts.base <span class="hljs-keyword">import</span> PromptTemplate


<span class="hljs-comment"># Function to create a filtered query engine</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_query_engine</span>(<span class="hljs-params">question</span>):
    <span class="hljs-comment"># Extract metadata filters from question using a language model</span>
    prompt_template = PromptTemplate(
        <span class="hljs-string">&quot;Given the following question, extract relevant metadata filters.\n&quot;</span>
        <span class="hljs-string">&quot;Consider company names, years, and any other relevant attributes.\n&quot;</span>
        <span class="hljs-string">&quot;Don&#x27;t write any other text, just the MetadataFilters object&quot;</span>
        <span class="hljs-string">&quot;Format it by creating a MetadataFilters like shown in the following\n&quot;</span>
        <span class="hljs-string">&quot;MetadataFilters(filters=[ExactMatchFilter(key=&#x27;file_name&#x27;, value=&#x27;lyft_2021.pdf&#x27;)])\n&quot;</span>
        <span class="hljs-string">&quot;If no specific filters are mentioned, returns an empty MetadataFilters()\n&quot;</span>
        <span class="hljs-string">&quot;Question: {question}\n&quot;</span>
        <span class="hljs-string">&quot;Metadata Filters:\n&quot;</span>
    )

    prompt = prompt_template.<span class="hljs-built_in">format</span>(question=question)
    llm = Ollama(model=<span class="hljs-string">&quot;mistral-nemo&quot;</span>)
    response = llm.complete(prompt)

    metadata_filters_str = response.text.strip()
    <span class="hljs-keyword">if</span> metadata_filters_str:
        metadata_filters = <span class="hljs-built_in">eval</span>(metadata_filters_str)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;eval: <span class="hljs-subst">{metadata_filters}</span>&quot;</span>)
        <span class="hljs-keyword">return</span> index.as_query_engine(filters=metadata_filters)
    <span class="hljs-keyword">return</span> index.as_query_engine()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">response = create_query_engine(
    <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Example usage with metadata filtering</span>
question = <span class="hljs-string">&quot;What is Uber revenue? This should be in the file_name: uber_2021.pdf&quot;</span>
filtered_query_engine = create_query_engine(question)

<span class="hljs-comment"># Define query engine tools with the filtered query engine</span>
query_engine_tools = [
    QueryEngineTool(
        query_engine=filtered_query_engine,
        metadata=ToolMetadata(
            name=<span class="hljs-string">&quot;company_docs_filtering&quot;</span>,
            description=(
                <span class="hljs-string">&quot;Provides information about various companies&#x27; financials for year 2021. &quot;</span>
                <span class="hljs-string">&quot;Use a detailed plain text question as input to the tool.&quot;</span>
            ),
        ),
    ),
]
<span class="hljs-comment"># Set up the agent with the updated query engine tools</span>
response = llm.predict_and_call(
    query_engine_tools,
    user_msg=question,
    allow_parallel_tool_calls=<span class="hljs-literal">True</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Response with metadata filtering:&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">eval: filters=[MetadataFilter(key='file_name', value='uber_2021.pdf', operator=&lt;FilterOperator.EQ: '=='&gt;)] condition=&lt;FilterCondition.AND: 'and'&gt;
Response with metadata filtering:
Uber's total revenue for the year ended December 31, 2021, is $17.455 billion.
</code></pre>
<h2 id="Orchestrating-the-different-services-with-Mistral-Large" class="common-anchor-header">使用 Mistral Large 协调不同服务<button data-href="#Orchestrating-the-different-services-with-Mistral-Large" class="anchor-icon" translate="no">
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
    </button></h2><p>Mistral Large 是 Mistral 的旗舰模型，具有非常出色的推理、知识和编码能力。它是需要大型推理能力或高度专业化的复杂任务的理想选择。它具有高级函数调用能力，这正是我们协调不同 Agents 所需要的。</p>
<h3 id="Why-do-we-need-a-smarter-Model" class="common-anchor-header">为什么我们需要更智能的模型？</h3><p>下面要回答的问题特别具有挑战性，因为它需要协调多个服务和代理，以提供一致而准确的响应。这涉及到协调各种工具和 Agents，以检索和处理来自不同来源的信息，例如来自不同公司的财务数据。</p>
<h3 id="Whats-so-difficult-about-that" class="common-anchor-header">这有什么难的？</h3><ul>
<li>复杂性：这个问题涉及多个 Agents 和服务，每个都有自己的功能和数据源。协调这些 Agents 实现无缝协作是一项复杂的任务。</li>
</ul>
<ul>
<li><p>数据整合：由于数据格式、结构和元数据存在差异，要整合来自不同来源的数据具有挑战性。</p></li>
<li><p>语境理解：问题可能需要理解不同信息之间的上下文和关系，这对认知能力要求很高。</p></li>
</ul>
<h3 id="Why-would-Mistral-Large-help-in-this-case" class="common-anchor-header">在这种情况下，Mistral Large 为什么能提供帮助？</h3><p>Mistral Large 具有高级推理和函数调用功能，非常适合这项任务。以下是它的帮助方式：</p>
<ul>
<li><p>高级推理：Mistral Large 可以处理复杂的推理任务，是协调多个 Agents 和服务的理想选择。它可以理解不同信息之间的关系，并做出明智的决策。</p></li>
<li><p>函数调用功能：Mistral Large 具有先进的函数调用功能，这对于协调不同 Agents 的行动至关重要。这可以实现各种服务的无缝集成和协调。</p></li>
<li><p>专业知识：Mistral Large 专为高度专业化的任务而设计，因此非常适合处理需要深厚领域知识的复杂查询。</p></li>
</ul>
<p>鉴于上述原因，我决定在这里使用 Mistral Large 而不是 Mistral Nemo 更为合适。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_agents <span class="hljs-keyword">import</span> (
    AgentService,
    ToolService,
    LocalLauncher,
    MetaServiceTool,
    ControlPlaneServer,
    SimpleMessageQueue,
    AgentOrchestrator,
)

<span class="hljs-keyword">from</span> llama_index.core.agent <span class="hljs-keyword">import</span> FunctionCallingAgentWorker
<span class="hljs-keyword">from</span> llama_index.llms.mistralai <span class="hljs-keyword">import</span> MistralAI

<span class="hljs-comment"># create our multi-agent framework components</span>
message_queue = SimpleMessageQueue()
control_plane = ControlPlaneServer(
    message_queue=message_queue,
    orchestrator=AgentOrchestrator(llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)),
)

<span class="hljs-comment"># define Tool Service</span>
tool_service = ToolService(
    message_queue=message_queue,
    tools=query_engine_tools,
    running=<span class="hljs-literal">True</span>,
    step_interval=<span class="hljs-number">0.5</span>,
)

<span class="hljs-comment"># define meta-tools here</span>
meta_tools = [
    <span class="hljs-keyword">await</span> MetaServiceTool.from_tool_service(
        t.metadata.name,
        message_queue=message_queue,
        tool_service=tool_service,
    )
    <span class="hljs-keyword">for</span> t <span class="hljs-keyword">in</span> query_engine_tools
]

<span class="hljs-comment"># define Agent and agent service</span>
worker1 = FunctionCallingAgentWorker.from_tools(
    meta_tools, llm=MistralAI(<span class="hljs-string">&quot;mistral-large-latest&quot;</span>)
)

agent1 = worker1.as_agent()
agent_server_1 = AgentService(
    agent=agent1,
    message_queue=message_queue,
    description=<span class="hljs-string">&quot;Used to answer questions over differnet companies for their Financial results&quot;</span>,
    service_name=<span class="hljs-string">&quot;Companies_analyst_agent&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> logging

<span class="hljs-comment"># change logging level to enable or disable more verbose logging</span>
logging.getLogger(<span class="hljs-string">&quot;llama_agents&quot;</span>).setLevel(logging.INFO)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment">## Define Launcher</span>
launcher = LocalLauncher(
    [agent_server_1, tool_service],
    control_plane,
    message_queue,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_str = <span class="hljs-string">&quot;What are the risk factors for Uber?&quot;</span>
result = launcher.launch_single(query_str)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">INFO:llama_agents.message_queues.simple - Consumer AgentService-27cde4ed-5163-4005-90fc-13c158eda7e3: Companies_analyst_agent has been registered.
INFO:llama_agents.message_queues.simple - Consumer ToolService-b73c500a-5fbe-4f57-95c7-db74e173bd1b: default_tool_service has been registered.
INFO:llama_agents.message_queues.simple - Consumer 62465ab8-32ff-436e-95fa-74e828745150: human has been registered.
INFO:llama_agents.message_queues.simple - Consumer ControlPlaneServer-f4c27d43-5474-43ca-93ca-a9aeed4534d7: control_plane has been registered.
INFO:llama_agents.services.agent - Companies_analyst_agent launch_local
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Launching message queue locally
INFO:llama_agents.services.agent - Processing initiated.
INFO:llama_agents.services.tool - Processing initiated.
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.simple - Consumer MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41: MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41 has been registered.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f4c270a4-bc47-4bbf-92fe-e2cc80757943 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.base - Publishing message to 'Companies_analyst_agent' with action 'ActionTypes.NEW_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.services.agent - Created new task: 0720da2f-1751-4766-a814-ba720bc8a467
INFO:llama_agents.message_queues.simple - Successfully published message 'Companies_analyst_agent' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'default_tool_service' with action 'ActionTypes.NEW_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'default_tool_service' to consumer.
INFO:llama_agents.services.tool - Processing tool call id f888f9a8-e716-4505-bfe2-577452e9b6e6 with company_docs
INFO:llama_agents.message_queues.base - Publishing message to 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' with action 'ActionTypes.COMPLETED_TOOL_CALL'
INFO:llama_agents.message_queues.simple - Successfully published message 'MetaServiceTool-5671c175-7b03-4bc8-b60d-bd7101d0fc41' to consumer.
INFO:llama_agents.message_queues.base - Publishing message to 'control_plane' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.base - Publishing message to 'human' with action 'ActionTypes.COMPLETED_TASK'
INFO:llama_agents.message_queues.simple - Successfully published message 'control_plane' to consumer.
INFO:llama_agents.message_queues.simple - Successfully published message 'human' to consumer.
</code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[{&quot;name&quot;: &quot;finalize&quot;, &quot;arguments&quot;: {&quot;input&quot;: &quot;Uber faces several risk factors, including general economic impacts such as pandemics or downturns, operational challenges like competition, market growth uncertainty, attracting and retaining drivers and riders, insurance adequacy, autonomous vehicle technology development, maintaining its reputation and brand, and managing growth. Additionally, reliance on third-party providers for various services can introduce further risks to its operations.&quot;}}]
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>在本笔记本中，你已经看到了如何使用 llama-agents 通过调用适当的工具来执行不同的操作。通过将 Mistral Large 与 Mistral Nemo 结合使用，我们展示了如何利用不同 LLMs 的优势，有效地协调智能、资源节约型系统。我们看到，Agent 可以挑选包含用户请求的数据的 Collections。</p>
