---
id: integrate_with_jina.md
summary: 本指南示範如何使用 Jina 嵌入和 Milvus 進行相似性搜尋和檢索任務。
title: 整合 Milvus 與 Jina
---
<h1 id="Integrate-Milvus-with-Jina-AI" class="common-anchor-header">整合 Milvus 與 Jina AI<button data-href="#Integrate-Milvus-with-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/milvus_with_Jina.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>本指南展示了如何使用 Jina AI 嵌入和 Milvus 來進行相似性搜索和檢索任務。</p>
<h2 id="Who-is-Jina-AI" class="common-anchor-header">誰是 Jina AI<button data-href="#Who-is-Jina-AI" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina AI 於 2020 年在柏林成立，是一家先進的人工智能公司，專注於透過其搜尋基礎徹底改變人工智能的未來。Jina AI 專精於多模態 AI，旨在透過其整合式元件套件，包括 embeddings、reerankers、prompt ops 和核心基礎架構，讓企業和開發人員能夠利用多模態資料的力量來創造價值和節省成本。<br>
Jina AI 的尖端嵌入式系統擁有頂級效能，其 8192 符記長度模型是全面資料表達的理想選擇。這些嵌入式提供多語言支援，並可與 OpenAI 等領先平台無縫整合，有助於跨語言應用程式的發展。</p>
<h2 id="Milvus-and-Jina-AIs-Embedding" class="common-anchor-header">Milvus 與 Jina AI 的嵌入式系統<button data-href="#Milvus-and-Jina-AIs-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>為了有效地儲存和搜尋這些嵌入式資料，以達到速度和規模，需要專為此目的而設計的特定基礎架構。Milvus 是廣為人知的先進開源向量資料庫，能夠處理大規模的向量資料。Milvus 能夠根據大量指標進行快速準確的向量（嵌入）搜尋。它的可擴展性允許無縫處理大量的影像資料，即使資料集成長也能確保高效能的搜尋作業。</p>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina 嵌入已經整合到 PyMilvus 模型庫中。現在，我們將以程式碼範例來展示如何實際使用 Jina embeddings。</p>
<p>在開始之前，我們需要為 PyMilvus 安裝模型庫。</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus milvus-lite
$ pip install <span class="hljs-string">&quot;pymilvus[model]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動運行時間</strong>。(按一下螢幕上方的「Runtime」功能表，然後從下拉式功能表中選擇「Restart session」）。</p>
</div>
<h2 id="General-Purpose-Embedding" class="common-anchor-header">通用嵌入<button data-href="#General-Purpose-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina AI 的核心嵌入模型擅於理解詳細的文字，因此非常適合語意搜尋、內容分類，進而支援進階情感分析、文字摘要和個人化推薦系統。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=<span class="hljs-number">1024</span>
)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information retrieval is the process of finding relevant information from a large collection of data or documents.&quot;</span>

qvecs = ef.encode_queries([query])  <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>
dvecs = ef.encode_documents([doc])  <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Bilingual-Embeddings" class="common-anchor-header">雙語嵌入<button data-href="#Bilingual-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina AI 的雙語模型增強了多語言平台、全球支援和跨語言內容發現。它們專為德英和中英翻譯而設計，可促進多種語言群體之間的理解，簡化跨語言互動。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-de&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;what is information retrieval?&quot;</span>
doc = <span class="hljs-string">&quot;Information Retrieval ist der Prozess, relevante Informationen aus einer großen Sammlung von Daten oder Dokumenten zu finden.&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Code-Embeddings" class="common-anchor-header">程式碼嵌入<button data-href="#Code-Embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina AI 的程式碼嵌入模型可透過程式碼和文件提供搜尋能力。它支援英文和 30 種常用程式語言，可用於增強程式碼導航、簡化程式碼檢閱和自動化文件輔助。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
ef = JinaEmbeddingFunction(<span class="hljs-string">&quot;jina-embeddings-v2-base-code&quot;</span>, jina_api_key)

<span class="hljs-comment"># Case1: Enhanced Code Navigation</span>
<span class="hljs-comment"># query: text description of the functionality</span>
<span class="hljs-comment"># document: relevant code snippet</span>

query = <span class="hljs-string">&quot;function to calculate average in Python.&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count
&quot;&quot;&quot;</span>

<span class="hljs-comment"># Case2: Streamlined Code Review</span>
<span class="hljs-comment"># query: text description of the programming concept</span>
<span class="hljs-comment"># document: relevante code snippet or PR</span>

query = <span class="hljs-string">&quot;pull quest related to Collection&quot;</span>
doc = <span class="hljs-string">&quot;fix:[restful v2] parameters of create collection ...&quot;</span>

<span class="hljs-comment"># Case3: Automatic Documentation Assistance</span>
<span class="hljs-comment"># query: code snippet you need explanation</span>
<span class="hljs-comment"># document: relevante document or DocsString</span>

query = <span class="hljs-string">&quot;What is Collection in Milvus&quot;</span>
doc = <span class="hljs-string">&quot;&quot;&quot;
In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.
Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.
&quot;&quot;&quot;</span>

qvecs = ef.encode_queries([query])
dvecs = ef.encode_documents([doc])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Semantic-Search-with-Jina--Milvus" class="common-anchor-header">使用 Jina 與 Milvus 進行語意搜尋<button data-href="#Semantic-Search-with-Jina--Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>透過強大的向量嵌入功能，我們可以結合利用 Jina AI 模型與 Milvus Lite 向量資料庫所擷取的嵌入資料來執行語意搜尋。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.dense <span class="hljs-keyword">import</span> JinaEmbeddingFunction
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>
DIMENSION = <span class="hljs-number">1024</span>  <span class="hljs-comment"># `jina-embeddings-v3` supports flexible embedding sizes (32, 64, 128, 256, 512, 768, 1024), allowing for truncating embeddings to fit your application. </span>
ef = JinaEmbeddingFunction(
    <span class="hljs-string">&quot;jina-embeddings-v3&quot;</span>, 
    jina_api_key,
    task=<span class="hljs-string">&quot;retrieval.passage&quot;</span>,
    dimensions=DIMENSION,
)


doc = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

dvecs = ef.encode_documents(doc) <span class="hljs-comment"># This method uses `retrieval.passage` as the task</span>

data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: dvecs[i], <span class="hljs-string">&quot;text&quot;</span>: doc[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(dvecs))
]

milvus_client = MilvusClient(<span class="hljs-string">&quot;./milvus_jina_demo.db&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;demo_collection&quot;</span>  <span class="hljs-comment"># Milvus collection name</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(collection_name=COLLECTION_NAME, dimension=DIMENSION)

res = milvus_client.insert(collection_name=COLLECTION_NAME, data=data)

<span class="hljs-built_in">print</span>(res[<span class="hljs-string">&quot;insert_count&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至於<code translate="no">MilvusClient</code> 的參數：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您想使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
</div>
<p>有了 Milvus 向量資料庫中的所有資料，我們現在就可以透過為查詢產生向量嵌入來執行語意搜尋，並進行向量搜尋。</p>
<pre><code translate="no" class="language-python">queries = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>
qvecs = ef.encode_queries([queries]) <span class="hljs-comment"># This method uses `retrieval.query` as the task</span>

res = milvus_client.search(
    collection_name=COLLECTION_NAME,  <span class="hljs-comment"># target collection</span>
    data=[qvecs[<span class="hljs-number">0</span>]],  <span class="hljs-comment"># query vectors</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># number of returned entities</span>
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],  <span class="hljs-comment"># specifies fields to be returned</span>
)[<span class="hljs-number">0</span>]

<span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">{'id': 1, 'distance': 0.8802614808082581, 'entity': {'text': &quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, 'subject': 'history'}}
</code></pre>
<h2 id="Jina-Reranker" class="common-anchor-header">Jina Reranker<button data-href="#Jina-Reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Jina Ai 在使用 embeddings 進行搜尋後，還提供 reranker 以進一步提升檢索品質。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.model.reranker <span class="hljs-keyword">import</span> JinaRerankFunction

jina_api_key = <span class="hljs-string">&quot;&lt;YOUR_JINA_API_KEY&gt;&quot;</span>

rf = JinaRerankFunction(<span class="hljs-string">&quot;jina-reranker-v1-base-en&quot;</span>, jina_api_key)

query = <span class="hljs-string">&quot;What event in 1956 marked the official birth of artificial intelligence as a discipline?&quot;</span>

documents = [
    <span class="hljs-string">&quot;In 1950, Alan Turing published his seminal paper, &#x27;Computing Machinery and Intelligence,&#x27; proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;</span>,
    <span class="hljs-string">&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term &#x27;artificial intelligence&#x27; and laid out its basic goals.&quot;</span>,
    <span class="hljs-string">&quot;In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.&quot;</span>,
    <span class="hljs-string">&quot;The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.&quot;</span>,
]

rf(query, documents)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">[RerankResult(text=&quot;The Dartmouth Conference in 1956 is considered the birthplace of artificial intelligence as a field; here, John McCarthy and others coined the term 'artificial intelligence' and laid out its basic goals.&quot;, score=0.9370958209037781, index=1),
 RerankResult(text='The invention of the Logic Theorist by Allen Newell, Herbert A. Simon, and Cliff Shaw in 1955 marked the creation of the first true AI program, which was capable of solving logic problems, akin to proving mathematical theorems.', score=0.35420963168144226, index=3),
 RerankResult(text=&quot;In 1950, Alan Turing published his seminal paper, 'Computing Machinery and Intelligence,' proposing the Turing Test as a criterion of intelligence, a foundational concept in the philosophy and development of artificial intelligence.&quot;, score=0.3498658835887909, index=0),
 RerankResult(text='In 1951, British mathematician and computer scientist Alan Turing also developed the first program designed to play chess, demonstrating an early example of AI in game strategy.', score=0.2728956639766693, index=2)]
</code></pre>
