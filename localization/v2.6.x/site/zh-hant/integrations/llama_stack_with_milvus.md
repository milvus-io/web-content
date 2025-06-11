---
id: llama_stack_with_milvus.md
title: 使用 Llama Stack 與 Milvus 建立 RAG
related_key: Llama Stack
summary: >-
  本教學介紹如何建立一個配置 Milvus 的 Llama Stack
  伺服器，讓您能夠匯入私人資料作為您的知識庫。然後，我們將在伺服器上執行查詢，建立一個完整的 RAG 應用程式。
---
<h1 id="Build-RAG-with-Llama-Stack-with-Milvus" class="common-anchor-header">使用 Milvus 的 Llama Stack 建立 RAG<button data-href="#Build-RAG-with-Llama-Stack-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/meta-llama/llama-stack/tree/main">Llama Stack</a>是一種以服務為導向、API 為先的方法，可用於建立生產型 AI 應用程式。它提供了一個通用的堆疊，讓開發人員可以隨處開發、隨處部署，並利用生產就緒的構建區塊，真正獨立於提供商。Llama Stack 著重於 Meta 的 Llama 模型、可複合性、生產就绪性以及合作生態系統。</p>
<p>在本教程中，我們將介紹如何使用 Milvus 建立 Llama Stack 伺服器，讓您能夠匯入私人資料作為您的知識庫。然後，我們將在伺服器上執行查詢，建立完整的 RAG 應用程式。</p>
<h2 id="Preparing-the-Environment" class="common-anchor-header">準備環境<button data-href="#Preparing-the-Environment" class="anchor-icon" translate="no">
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
    </button></h2><p>有許多方式可以啟動 Llama Stack 伺服器，例如<a href="https://llama-stack.readthedocs.io/en/latest/distributions/importing_as_library.html">作為一個函式庫</a>，<a href="https://llama-stack.readthedocs.io/en/latest/distributions/building_distro.html">建立一個發行版</a>等等。對於 Llama Stack 中的每個元件，也可以選擇各種提供者。因此，有許多啟動 Llama Stack 伺服器的方式。</p>
<p>本教學使用下列配置作為啟動服務的範例。如果您希望以其他方式啟動，請參閱啟動<a href="https://llama-stack.readthedocs.io/en/latest/distributions/index.html">Llama Stack 伺服器</a>。</p>
<ul>
<li>我們使用 Conda 以 Milvus 組態建立自訂的發行版。</li>
<li>我們使用<a href="https://llama-stack.readthedocs.io/en/latest/distributions/self_hosted_distro/together.html#via-conda">Together AI</a>作為 LLM 提供者。</li>
<li>我們使用預設的<code translate="no">all-MiniLM-L6-v2</code> 作為嵌入模型。</li>
</ul>
<div class="alert note">
<p>本教學主要參考<a href="https://llama-stack.readthedocs.io/en/latest/index.html">Llama Stack 文件</a>的官方安裝指南。如果您在本教學中發現任何過時的部分，您可以優先遵循官方指南，並為我們建立一個問題。</p>
</div>
<h2 id="Start-Llama-Stack-Server" class="common-anchor-header">啟動 Llama Stack 伺服器<button data-href="#Start-Llama-Stack-Server" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prepare-the-Environment" class="common-anchor-header">準備環境</h3><p>由於我們需要使用 Together AI 作為 LLM 服務，因此必須先登入官方網站申請<a href="https://api.together.xyz/settings/api-keys">API key</a>，並將 API key<code translate="no">TOGETHER_API_KEY</code> 設定為環境變數。</p>
<p>克隆 Llama Stack 原始碼</p>
<pre><code translate="no" class="language-bash">$ git <span class="hljs-built_in">clone</span> https://github.com/meta-llama/llama-stack.git
$ <span class="hljs-built_in">cd</span> llama-stack
<button class="copy-code-btn"></button></code></pre>
<p>建立 conda 環境並安裝相依性</p>
<pre><code translate="no" class="language-bash">$ conda create -n stack python=3.10
$ conda activate stack

$ pip install -e .
<button class="copy-code-btn"></button></code></pre>
<p>修改<code translate="no">llama_stack/llama_stack/template/together/run.yaml</code> 中的內容，將 vector_io 部分改成相關的 Milvus 設定。例如，新增</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">vector_io:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">provider_id:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">provider_type:</span> <span class="hljs-string">inline::milvus</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">db_path:</span> <span class="hljs-string">~/.llama/distributions/together/milvus_store.db</span>

<span class="hljs-comment">#  - provider_id: milvus</span>
<span class="hljs-comment">#    provider_type: remote::milvus</span>
<span class="hljs-comment">#    config:</span>
<span class="hljs-comment">#      uri: http://localhost:19530</span>
<span class="hljs-comment">#      token: root:Milvus</span>
<button class="copy-code-btn"></button></code></pre>
<p>在 Llama Stack 中，Milvus 有兩種配置方式：本地配置，即<code translate="no">inline::milvus</code> ；遠端配置，即<code translate="no">remote::milvus</code> 。</p>
<ul>
<li><p>最簡單的方法是本地配置，需要設定<code translate="no">db_path</code> ，這是本地儲存<a href="https://milvus.io/docs/quickstart.md">Milvus-Lite</a>檔案的路徑。</p></li>
<li><p>遠端設定適合大量資料儲存。</p>
<ul>
<li>如果您有大量的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">Docker 或 Kubernetes</a> 上架設效能優異的 Milvus 伺服器。在此設定中，請使用伺服器 URI，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。預設的<code translate="no">token</code> 是<code translate="no">root:Milvus</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>（Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務），請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，它們對應於 Zilliz Cloud 中的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 API key</a>。</li>
</ul></li>
</ul>
<h3 id="Build-distribution-from-the-template" class="common-anchor-header">從模板建立發行版</h3><p>執行下列指令建立發行版：</p>
<pre><code translate="no" class="language-bash">$ llama stack build --template together --image-type conda
<button class="copy-code-btn"></button></code></pre>
<p>將產生檔案<code translate="no">~/.llama/distributions/together/together-run.yaml</code> 。然後，執行此指令啟動伺服器：</p>
<pre><code translate="no" class="language-bash">$ llama stack run --image-type conda ~/.llama/distributions/together/together-run.yaml
<button class="copy-code-btn"></button></code></pre>
<p>如果一切順利，您應該會看到 Llama Stack 伺服器在 8321 連接埠成功執行。</p>
<h2 id="Perform-RAG-from-client" class="common-anchor-header">從用戶端執行 RAG<button data-href="#Perform-RAG-from-client" class="anchor-icon" translate="no">
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
    </button></h2><p>啟動伺服器後，您就可以寫用戶端程式碼來存取伺服器。以下是範例程式碼：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> uuid
<span class="hljs-keyword">from</span> llama_stack_client.types <span class="hljs-keyword">import</span> Document
<span class="hljs-keyword">from</span> llama_stack_client.lib.agents.agent <span class="hljs-keyword">import</span> Agent
<span class="hljs-keyword">from</span> llama_stack_client.types.agent_create_params <span class="hljs-keyword">import</span> AgentConfig

<span class="hljs-comment"># See https://www.together.ai/models for all available models</span>
INFERENCE_MODEL = <span class="hljs-string">&quot;meta-llama/Llama-3.3-70B-Instruct-Turbo&quot;</span>
LLAMA_STACK_PORT = <span class="hljs-number">8321</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">create_http_client</span>():
    <span class="hljs-keyword">from</span> llama_stack_client <span class="hljs-keyword">import</span> LlamaStackClient

    <span class="hljs-keyword">return</span> LlamaStackClient(
        base_url=<span class="hljs-string">f&quot;http://localhost:<span class="hljs-subst">{LLAMA_STACK_PORT}</span>&quot;</span>  <span class="hljs-comment"># Your Llama Stack Server URL</span>
    )


client = create_http_client()

<span class="hljs-comment"># Documents to be used for RAG</span>
urls = [<span class="hljs-string">&quot;chat.rst&quot;</span>, <span class="hljs-string">&quot;llama3.rst&quot;</span>, <span class="hljs-string">&quot;memory_optimizations.rst&quot;</span>, <span class="hljs-string">&quot;lora_finetune.rst&quot;</span>]
documents = [
    Document(
        document_id=<span class="hljs-string">f&quot;num-<span class="hljs-subst">{i}</span>&quot;</span>,
        content=<span class="hljs-string">f&quot;https://raw.githubusercontent.com/pytorch/torchtune/main/docs/source/tutorials/<span class="hljs-subst">{url}</span>&quot;</span>,
        mime_type=<span class="hljs-string">&quot;text/plain&quot;</span>,
        metadata={},
    )
    <span class="hljs-keyword">for</span> i, url <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(urls)
]

<span class="hljs-comment"># Register a vector database</span>
vector_db_id = <span class="hljs-string">f&quot;test-vector-db-<span class="hljs-subst">{uuid.uuid4().<span class="hljs-built_in">hex</span>}</span>&quot;</span>
client.vector_dbs.register(
    vector_db_id=vector_db_id,
    embedding_model=<span class="hljs-string">&quot;all-MiniLM-L6-v2&quot;</span>,
    embedding_dimension=<span class="hljs-number">384</span>,
    provider_id=<span class="hljs-string">&quot;milvus&quot;</span>,
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;inserting...&quot;</span>)
<span class="hljs-comment"># Insert the documents into the vector database</span>
client.tool_runtime.rag_tool.insert(
    documents=documents, vector_db_id=vector_db_id, chunk_size_in_tokens=<span class="hljs-number">1024</span>,
)

agent_config = AgentConfig(
    model=INFERENCE_MODEL,
    <span class="hljs-comment"># Define instructions for the agent ( aka system prompt)</span>
    instructions=<span class="hljs-string">&quot;You are a helpful assistant&quot;</span>,
    enable_session_persistence=<span class="hljs-literal">False</span>,
    <span class="hljs-comment"># Define tools available to the agent</span>
    toolgroups=[{<span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;builtin::rag&quot;</span>, <span class="hljs-string">&quot;args&quot;</span>: {<span class="hljs-string">&quot;vector_db_ids&quot;</span>: [vector_db_id]}}],
)

rag_agent = Agent(client, agent_config)
session_id = rag_agent.create_session(<span class="hljs-string">&quot;test-session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;finish init agent...&quot;</span>)
user_prompt = (
    <span class="hljs-string">&quot;What are the top 5 topics that were explained? Only list succinct bullet points.&quot;</span>
)

<span class="hljs-comment"># Get the final answer from the agent</span>
response = rag_agent.create_turn(
    messages=[{<span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;content&quot;</span>: user_prompt}],
    session_id=session_id,
    stream=<span class="hljs-literal">False</span>,
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Response: &quot;</span>)
<span class="hljs-built_in">print</span>(response.output_message.content)
<button class="copy-code-btn"></button></code></pre>
<p>執行此程式碼來執行 RAG 查詢，如果一切運作正常，輸出應該是這樣的：</p>
<pre><code translate="no" class="language-log">inserting...
finish init agent...
Response: 
* Fine-Tuning Llama3 with Chat Data
* Evaluating fine-tuned Llama3-8B models with EleutherAI's Eval Harness
* Generating text with our fine-tuned Llama3 model
* Faster generation via quantization
* Fine-tuning on a custom chat dataset
</code></pre>
