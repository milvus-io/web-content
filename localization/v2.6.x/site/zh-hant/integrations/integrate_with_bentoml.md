---
id: integrate_with_bentoml.md
summary: 本指南示範如何使用 BentoCloud 上的開放原始碼嵌入模型和大型語言模型，並搭配 Milvus 向量資料庫，建立檢索擴增世代 (RAG) 應用程式。
title: 使用 Milvus 和 BentoML 的 Retrieval-Augmented Generation (RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="common-anchor-header">使用 Milvus 和 BentoML 的 Retrieval-Augmented Generation (RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-BentoML" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_bentoml.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<h2 id="Introduction" class="common-anchor-header">簡介<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南說明如何使用 BentoCloud 上的開放原始碼嵌入模型和大型語言模型，以及 Milvus 向量資料庫來建立 RAG (Retrieval Augmented Generation) 應用程式。 BentoCloud 是專為快速行動的人工智能團隊所設計的人工智能推論平台，提供專為模型推論量身打造的完整管理基礎架構。它與 BentoML（一個開放源碼的模型服務架構）結合使用，可簡化高效能模型服務的建立與部署。在這個示範中，我們使用 Milvus Lite 作為向量資料庫，它是 Milvus 的輕量版，可以嵌入到您的 Python 應用程式中。</p>
<h2 id="Before-you-begin" class="common-anchor-header">開始之前<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 可在 PyPI 上找到。您可以透過 Python 3.8+ 的 pip 安裝它：</p>
<pre><code translate="no" class="language-python">$ pip install -U pymilvus bentoml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用的是 Google Colab，為了啟用剛安裝的依賴項目，您可能需要<strong>重新啟動運行時</strong>（點擊螢幕上方的「Runtime」功能表，從下拉式功能表中選擇「Restart session」）。</p>
</div>
<p>登入 BentoCloud 後，我們可以在部署中與已部署的 BentoCloud 服務互動，而相對應的 END_POINT 和 API 則位於 Playground -&gt; Python。 您可以<a href="https://github.com/ytang07/bento_octo_milvus_RAG/tree/main/data">在此</a>下載城市資料。</p>
<h2 id="Serving-Embeddings-with-BentoMLBentoCloud" class="common-anchor-header">使用 BentoML/BentoCloud 提供嵌入式服務<button data-href="#Serving-Embeddings-with-BentoMLBentoCloud" class="anchor-icon" translate="no">
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
    </button></h2><p>要使用此端點，請匯入<code translate="no">bentoml</code> ，並透過指定端點和可選的令牌（如果您在 BentoCloud 上開啟<code translate="no">Endpoint Authorization</code> ），使用<code translate="no">SyncHTTPClient</code> 設定 HTTP 客戶端。或者，您也可以使用 BentoML 的<a href="https://github.com/bentoml/BentoSentenceTransformers">Sentence Transformers Embeddings</a>套件庫來提供相同的模型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> bentoml

BENTO_EMBEDDING_MODEL_END_POINT = <span class="hljs-string">&quot;BENTO_EMBEDDING_MODEL_END_POINT&quot;</span>
BENTO_API_TOKEN = <span class="hljs-string">&quot;BENTO_API_TOKEN&quot;</span>

embedding_client = bentoml.SyncHTTPClient(
    BENTO_EMBEDDING_MODEL_END_POINT, token=BENTO_API_TOKEN
)
<button class="copy-code-btn"></button></code></pre>
<p>一旦連接到 embedding_client，我們就需要處理資料。我們提供了幾個函式來執行資料分割和嵌入。</p>
<p>讀取檔案並將文字預先處理為字串清單。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># naively chunk on newlines</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">chunk_text</span>(<span class="hljs-params">filename: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(filename, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> f:
        text = f.read()
    sentences = text.split(<span class="hljs-string">&quot;\n&quot;</span>)
    <span class="hljs-keyword">return</span> sentences
<button class="copy-code-btn"></button></code></pre>
<p>首先，我們需要下載城市資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> requests
<span class="hljs-keyword">import</span> urllib.request

<span class="hljs-comment"># set up the data source</span>
repo = <span class="hljs-string">&quot;ytang07/bento_octo_milvus_RAG&quot;</span>
directory = <span class="hljs-string">&quot;data&quot;</span>
save_dir = <span class="hljs-string">&quot;./city_data&quot;</span>
api_url = <span class="hljs-string">f&quot;https://api.github.com/repos/<span class="hljs-subst">{repo}</span>/contents/<span class="hljs-subst">{directory}</span>&quot;</span>


response = requests.get(api_url)
data = response.json()

<span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> os.path.exists(save_dir):
    os.makedirs(save_dir)

<span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> data:
    <span class="hljs-keyword">if</span> item[<span class="hljs-string">&quot;type&quot;</span>] == <span class="hljs-string">&quot;file&quot;</span>:
        file_url = item[<span class="hljs-string">&quot;download_url&quot;</span>]
        file_path = os.path.join(save_dir, item[<span class="hljs-string">&quot;name&quot;</span>])
        urllib.request.urlretrieve(file_url, file_path)
<button class="copy-code-btn"></button></code></pre>
<p>接下來，我們處理每個檔案。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># please upload your data directory under this file&#x27;s folder</span>
cities = os.listdir(<span class="hljs-string">&quot;city_data&quot;</span>)
<span class="hljs-comment"># store chunked text for each of the cities in a list of dicts</span>
city_chunks = []
<span class="hljs-keyword">for</span> city <span class="hljs-keyword">in</span> cities:
    chunked = chunk_text(<span class="hljs-string">f&quot;city_data/<span class="hljs-subst">{city}</span>&quot;</span>)
    cleaned = []
    <span class="hljs-keyword">for</span> chunk <span class="hljs-keyword">in</span> chunked:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(chunk) &gt; <span class="hljs-number">7</span>:
            cleaned.append(chunk)
    mapped = {<span class="hljs-string">&quot;city_name&quot;</span>: city.split(<span class="hljs-string">&quot;.&quot;</span>)[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;chunks&quot;</span>: cleaned}
    city_chunks.append(mapped)
<button class="copy-code-btn"></button></code></pre>
<p>將字串清單分割成嵌入清單，每組 25 個文字串。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">get_embeddings</span>(<span class="hljs-params">texts: <span class="hljs-built_in">list</span></span>) -&gt; <span class="hljs-built_in">list</span>:
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(texts) &gt; <span class="hljs-number">25</span>:
        splits = [texts[x : x + <span class="hljs-number">25</span>] <span class="hljs-keyword">for</span> x <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(texts), <span class="hljs-number">25</span>)]
        embeddings = []
        <span class="hljs-keyword">for</span> split <span class="hljs-keyword">in</span> splits:
            embedding_split = embedding_client.encode(sentences=split)
            embeddings += embedding_split
        <span class="hljs-keyword">return</span> embeddings
    <span class="hljs-keyword">return</span> embedding_client.encode(
        sentences=texts,
    )
<button class="copy-code-btn"></button></code></pre>
<p>現在，我們需要匹配 embeddings 和文字塊。由於嵌入式清單和句子清單應該依索引匹配，因此我們可以透過<code translate="no">enumerate</code> 任一清單進行匹配。</p>
<pre><code translate="no" class="language-python">entries = []
<span class="hljs-keyword">for</span> city_dict <span class="hljs-keyword">in</span> city_chunks:
    <span class="hljs-comment"># No need for the embeddings list if get_embeddings already returns a list of lists</span>
    embedding_list = get_embeddings(city_dict[<span class="hljs-string">&quot;chunks&quot;</span>])  <span class="hljs-comment"># returns a list of lists</span>
    <span class="hljs-comment"># Now match texts with embeddings and city name</span>
    <span class="hljs-keyword">for</span> i, embedding <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(embedding_list):
        entry = {
            <span class="hljs-string">&quot;embedding&quot;</span>: embedding,
            <span class="hljs-string">&quot;sentence&quot;</span>: city_dict[<span class="hljs-string">&quot;chunks&quot;</span>][
                i
            ],  <span class="hljs-comment"># Assume &quot;chunks&quot; has the corresponding texts for the embeddings</span>
            <span class="hljs-string">&quot;city&quot;</span>: city_dict[<span class="hljs-string">&quot;city_name&quot;</span>],
        }
        entries.append(entry)
    <span class="hljs-built_in">print</span>(entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Inserting-Data-into-a-Vector-Database-for-Retrieval" class="common-anchor-header">將資料插入向量資料庫以進行檢索<button data-href="#Inserting-Data-into-a-Vector-Database-for-Retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>準備好嵌入和資料後，我們就可以將向量連同 metadata 插入 Milvus Lite，以便稍後進行向量搜尋。本節的第一步是連線到 Milvus Lite 來啟動一個用戶端。我們只要匯入<code translate="no">MilvusClient</code> 模組，並初始化一個連線到 Milvus Lite 向量資料庫的 Milvus Lite 用戶端。維度大小來自嵌入模型的大小，例如句子轉換模型<code translate="no">all-MiniLM-L6-v2</code> 產生 384 維度的向量。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

COLLECTION_NAME = <span class="hljs-string">&quot;Bento_Milvus_RAG&quot;</span>  <span class="hljs-comment"># random name for your collection</span>
DIMENSION = <span class="hljs-number">384</span>

<span class="hljs-comment"># Initialize a Milvus Lite client</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>至於<code translate="no">MilvusClient</code> 的參數 ：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
</div>
<p>或使用舊的 connections.connect API (不建議)：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections

connections.connect(uri=<span class="hljs-string">&quot;milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Creating-Your-Milvus-Lite-Collection" class="common-anchor-header">建立您的 Milvus Lite 套件<button data-href="#Creating-Your-Milvus-Lite-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 Milvus Lite 建立資料集包含兩個步驟：第一，定義模式；第二，定義索引。在這一節，我們需要一個模組：DataType 告訴我們欄位中的資料類型。create_schema(): 建立一個集合的模式，add_field(): 加入一個欄位到集合的模式。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType, Collection

<span class="hljs-comment"># Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=DIMENSION)
<button class="copy-code-btn"></button></code></pre>
<p>現在我們已經建立了模式並成功定義了資料欄位，我們需要定義索引。就搜尋而言，「索引」定義了我們如何將資料映射出來以供擷取。在本專案中，我們使用預設選項<a href="https://docs.zilliz.com/docs/autoindex-explained">AUTOINDEX</a>來為資料建立索引。</p>
<p>接下來，我們使用之前給定的名稱、模式和索引建立集合。最後，我們插入先前處理過的資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># prepare index parameters</span>
index_params = milvus_client.prepare_index_params()

<span class="hljs-comment"># add index</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># use autoindex instead of other complex indexing method</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,  <span class="hljs-comment"># L2, COSINE, or IP</span>
)

<span class="hljs-comment"># create collection</span>
<span class="hljs-keyword">if</span> milvus_client.has_collection(collection_name=COLLECTION_NAME):
    milvus_client.drop_collection(collection_name=COLLECTION_NAME)
milvus_client.create_collection(
    collection_name=COLLECTION_NAME, schema=schema, index_params=index_params
)

<span class="hljs-comment"># Outside the loop, now you upsert all the entries at once</span>
milvus_client.insert(collection_name=COLLECTION_NAME, data=entries)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-Your-LLM-for-RAG" class="common-anchor-header">為 RAG 設定您的 LLM<button data-href="#Set-up-Your-LLM-for-RAG" class="anchor-icon" translate="no">
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
    </button></h2><p>要建立 RAG 應用程式，我們需要在 BentoCloud 上部署 LLM。讓我們使用最新的 Llama3 LLM。一旦部署完成，只需複製此模型服務的端點和標記，並為其設定用戶端即可。</p>
<pre><code translate="no" class="language-python">BENTO_LLM_END_POINT = <span class="hljs-string">&quot;BENTO_LLM_END_POINT&quot;</span>

llm_client = bentoml.SyncHTTPClient(BENTO_LLM_END_POINT, token=BENTO_API_TOKEN)
<button class="copy-code-btn"></button></code></pre>
<h2 id="LLM-Instructions" class="common-anchor-header">LLM 指令<button data-href="#LLM-Instructions" class="anchor-icon" translate="no">
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
    </button></h2><p>現在，我們設定 LLM 指令的提示、上下文和問題。以下是執行 LLM 的函式，它會以字串格式回傳用戶端的輸出。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dorag</span>(<span class="hljs-params">question: <span class="hljs-built_in">str</span>, context: <span class="hljs-built_in">str</span></span>):

    prompt = (
        <span class="hljs-string">f&quot;You are a helpful assistant. The user has a question. Answer the user question based only on the context: <span class="hljs-subst">{context}</span>. \n&quot;</span>
        <span class="hljs-string">f&quot;The user question is <span class="hljs-subst">{question}</span>&quot;</span>
    )

    results = llm_client.generate(
        max_tokens=<span class="hljs-number">1024</span>,
        prompt=prompt,
    )

    res = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> result <span class="hljs-keyword">in</span> results:
        res += result

    <span class="hljs-keyword">return</span> res
<button class="copy-code-btn"></button></code></pre>
<h2 id="A-RAG-Example" class="common-anchor-header">RAG 範例<button data-href="#A-RAG-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>現在我們準備提出問題。這個函式簡單地接收一個問題，然後進行 RAG，從背景資訊中產生相關的上下文。接著，我們將上下文和問題傳給 dorag() 並得到結果。</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;What state is Cambridge in?&quot;</span>


<span class="hljs-keyword">def</span> <span class="hljs-title function_">ask_a_question</span>(<span class="hljs-params">question</span>):
    embeddings = get_embeddings([question])
    res = milvus_client.search(
        collection_name=COLLECTION_NAME,
        data=embeddings,  <span class="hljs-comment"># search for the one (1) embedding returned as a list of lists</span>
        anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,  <span class="hljs-comment"># Search across embeddings</span>
        limit=<span class="hljs-number">5</span>,  <span class="hljs-comment"># get me the top 5 results</span>
        output_fields=[<span class="hljs-string">&quot;sentence&quot;</span>],  <span class="hljs-comment"># get the sentence/chunk and city</span>
    )

    sentences = []
    <span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
        <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
            <span class="hljs-built_in">print</span>(hit)
            sentences.append(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;sentence&quot;</span>])
    context = <span class="hljs-string">&quot;. &quot;</span>.join(sentences)
    <span class="hljs-keyword">return</span> context


context = ask_a_question(question=question)
<span class="hljs-built_in">print</span>(context)
<button class="copy-code-btn"></button></code></pre>
<p>執行 RAG</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(dorag(question=question, context=context))
<button class="copy-code-btn"></button></code></pre>
<p>對於問劍橋在哪個州的範例問題，我們可以從 BentoML 列印整個回應。但是，如果我們花點時間來解析它，它看起來就會比較美觀，而且它應該會告訴我們劍橋位於麻薩諸塞州。</p>
