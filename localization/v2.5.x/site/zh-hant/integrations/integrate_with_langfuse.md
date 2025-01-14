---
id: integrate_with_langfuse.md
summary: 這是一個簡單的烹飪手冊，示範如何使用 LlamaIndex Langfuse 整合。它使用 Milvus Lite 來儲存文件和 Query。
title: 使用 Langfuse 評估 RAG 品質
---
<h1 id="Using-Langfuse-to-Trace-Queries-in-RAG" class="common-anchor-header">在 RAG 中使用 Langfuse 追蹤查詢<button data-href="#Using-Langfuse-to-Trace-Queries-in-RAG" class="anchor-icon" translate="no">
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
    </button></h1><p><a target="_blank" href="https://colab.research.google.com/github/langfuse/langfuse-docs/blob/main/cookbook/integration_llama-index_milvus-lite.ipynb">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a></p>
<p>這是一個簡單的烹飪手冊，示範如何在 RAG 中使用 Langfuse 來追蹤您的查詢。RAG 管道是使用 LlamaIndex 和 Milvus Lite 來儲存和擷取文件。</p>
<p>在本快速入門中，我們將教您如何使用 Milvus Lite 作為向量儲存，建立 LlamaIndex 應用程式。我們也會告訴您如何使用 Langfuse LlamaIndex 整合來追蹤您的應用程式。</p>
<p><a href="https://github.com/langfuse/langfuse">Langfuse</a>是一個開放原始碼的 LLM 工程平台，可協助團隊協同除錯、分析和迭代他們的 LLM 應用程式。所有平台功能都是原生整合，以加速開發工作流程。</p>
<p><a href="https://github.com/milvus-io/milvus-lite/">Milvus Lite</a>是 Milvus 的輕量級版本，<a href="https://github.com/milvus-io/milvus-lite/">Milvus</a>是一個開放原始碼向量資料庫，以向量嵌入和相似性搜尋為 AI 應用程式提供動力。</p>
<h2 id="Setup" class="common-anchor-header">設定<button data-href="#Setup" class="anchor-icon" translate="no">
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
    </button></h2><p>確定您已安裝<code translate="no">llama-index</code> 和<code translate="no">langfuse</code> 。</p>
<pre><code translate="no" class="language-python">$ pip install llama-index langfuse llama-index-vector-stores-milvus --upgrade
<button class="copy-code-btn"></button></code></pre>
<p>初始化整合。從<a href="https://cloud.langfuse.com">Langfuse 專案設定</a>取得您的 API 金鑰，並將 public_key secret_key 替換為您的金鑰值。本範例使用 OpenAI 進行嵌入和聊天完成，因此您也需要在環境變數中指定 OpenAI 金鑰。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-comment"># Get keys for your project from the project settings page</span>
<span class="hljs-comment"># https://cloud.langfuse.com</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_PUBLIC_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_SECRET_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
os.environ[<span class="hljs-string">&quot;LANGFUSE_HOST&quot;</span>] = <span class="hljs-string">&quot;https://cloud.langfuse.com&quot;</span> <span class="hljs-comment"># 🇪🇺 EU region</span>
<span class="hljs-comment"># os.environ[&quot;LANGFUSE_HOST&quot;] = &quot;https://us.cloud.langfuse.com&quot; # 🇺🇸 US region</span>

<span class="hljs-comment"># Your openai key</span>
os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">core</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">Settings</span>
<span class="hljs-keyword">from</span> llama_index.<span class="hljs-property">core</span>.<span class="hljs-property">callbacks</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">CallbackManager</span>
<span class="hljs-keyword">from</span> langfuse.<span class="hljs-property">llama_index</span> <span class="hljs-keyword">import</span> <span class="hljs-title class_">LlamaIndexCallbackHandler</span>
 
langfuse_callback_handler = <span class="hljs-title class_">LlamaIndexCallbackHandler</span>()
<span class="hljs-title class_">Settings</span>.<span class="hljs-property">callback_manager</span> = <span class="hljs-title class_">CallbackManager</span>([langfuse_callback_handler])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-using-Milvus-Lite" class="common-anchor-header">使用 Milvus Lite 建立索引<button data-href="#Index-using-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document

doc1 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Maxwell &quot;Max&quot; Silverstein, a lauded movie director, screenwriter, and producer, was born on October 25, 1978, in Boston, Massachusetts. A film enthusiast from a young age, his journey began with home movies shot on a Super 8 camera. His passion led him to the University of Southern California (USC), majoring in Film Production. Eventually, he started his career as an assistant director at Paramount Pictures. Silverstein&#x27;s directorial debut, “Doors Unseen,” a psychological thriller, earned him recognition at the Sundance Film Festival and marked the beginning of a successful directing career.
&quot;&quot;&quot;</span>)
doc2 = Document(text=<span class="hljs-string">&quot;&quot;&quot;
Throughout his career, Silverstein has been celebrated for his diverse range of filmography and unique narrative technique. He masterfully blends suspense, human emotion, and subtle humor in his storylines. Among his notable works are &quot;Fleeting Echoes,&quot; &quot;Halcyon Dusk,&quot; and the Academy Award-winning sci-fi epic, &quot;Event Horizon&#x27;s Brink.&quot; His contribution to cinema revolves around examining human nature, the complexity of relationships, and probing reality and perception. Off-camera, he is a dedicated philanthropist living in Los Angeles with his wife and two children.
&quot;&quot;&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Example index construction + LLM query</span>

<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(
    uri=<span class="hljs-string">&quot;tmp/milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">False</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(
    [doc1,doc2], storage_context=storage_context
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query" class="common-anchor-header">查詢<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
response = index.as_query_engine().query(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Chat</span>
response = index.as_chat_engine().chat(<span class="hljs-string">&quot;What did he do growing up?&quot;</span>)
<span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Explore-traces-in-Langfuse" class="common-anchor-header">在 Langfuse 中探索痕跡<button data-href="#Explore-traces-in-Langfuse" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python"><span class="hljs-comment"># As we want to immediately see result in Langfuse, we need to flush the callback handler</span>
langfuse_callback_handler.flush()
<button class="copy-code-btn"></button></code></pre>
<p>完成！您可以在 Langfuse 專案中看到索引和查詢的軌跡。</p>
<p>示例軌跡（公共鏈接）：</p>
<ol>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/2b26fc72-044f-4b0b-a3c3-485328975161">查詢</a></li>
<li><a href="https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/72503163-2b25-4693-9cc9-56190b8e32b9">查詢 (聊天)</a></li>
</ol>
<p>Langfuse 中的軌跡：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://static.langfuse.com/llamaindex-langfuse-docs.gif" alt="Langfuse Traces" class="doc-image" id="langfuse-traces" />
   </span> <span class="img-wrapper"> <span>Langfuse 軌跡</span> </span></p>
<h2 id="Interested-in-more-advanced-features" class="common-anchor-header">對更多進階功能感興趣？<button data-href="#Interested-in-more-advanced-features" class="anchor-icon" translate="no">
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
    </button></h2><p>請參閱完整的<a href="https://langfuse.com/docs/integrations/llama-index/get-started">整合說明文件</a>，瞭解更多進階功能及使用方式：</p>
<ul>
<li>與 Langfuse Python SDK 及其他整合的互操作性</li>
<li>新增自訂元資料與屬性至追蹤資料</li>
</ul>
