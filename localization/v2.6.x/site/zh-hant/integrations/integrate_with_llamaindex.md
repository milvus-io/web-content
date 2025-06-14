---
id: integrate_with_llamaindex.md
summary: 本指南示範如何使用 LlamaIndex 和 Milvus 建立檢索增強世代 (RAG) 系統。
title: 使用 Milvus 和 LlamaIndex 的檢索增強世代 (RAG)
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">使用 Milvus 和 LlamaIndex 的檢索增強世代 (RAG)<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>本指南展示了如何使用 LlamaIndex 和 Milvus 建立一個檢索-增強生成 (RAG) 系統。</p>
<p>RAG 系統結合了檢索系統與生成模型，可根據給定的提示生成新的文字。該系統首先使用 Milvus 從語料庫中檢索相關文件，然後根據檢索到的文件使用生成模型生成新文本。</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a>是一個簡單、靈活的資料框架，可將自訂資料來源連接至大型語言模型 (LLM)。<a href="https://milvus.io/">Milvus</a>是世界上最先進的開放原始碼向量資料庫，是為了強化嵌入式相似性搜尋與 AI 應用程式而建立的。</p>
<p>在本筆記簿中，我們將展示使用 MilvusVectorStore 的快速示範。</p>
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">安裝相依性</h3><p>本頁面的程式碼片段需要 pymilvus 和 llamaindex 的相依性。您可以使用下列指令安裝它們：</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您使用 Google Colab，為了啟用剛安裝的相依性，您可能需要<strong>重新啟動執行時間</strong>。(按一下螢幕上方的「Runtime」功能表，然後從下拉式功能表中選擇「Restart session」）。</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">設定 OpenAI</h3><p>讓我們先加入 openai api 金鑰。這將允許我們存取 chatgpt。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">準備資料</h3><p>您可以使用下列指令下載範例資料：</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">開始<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">產生我們的資料</h3><p>作為第一個範例，讓我們從檔案<code translate="no">paul_graham_essay.txt</code> 產生一個文件。這是一篇來自 Paul Graham 的單篇文章，標題是<code translate="no">What I Worked On</code> 。我們將使用 SimpleDirectoryReader 來產生文件。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">在資料中建立索引</h3><p>現在我們有一個文件，我們可以建立一個索引並插入該文件。對於索引，我們將使用 MilvusVectorStore。MilvusVectorStore 需要幾個參數：</p>
<h4 id="basic-args" class="common-anchor-header">基本參數</h4><ul>
<li><code translate="no">uri (str, optional)</code>:要連線到的 URI，對於 Milvus 或 Zilliz 雲端服務，其形式為「https://address:port」；對於精簡本端 Milvus，則為「path/to/local/milvus.db」。預設為"./milvus_llamaindex.db"。</li>
<li><code translate="no">token (str, optional)</code>:登入的代碼。如果未使用 rbac，則為空，如果使用 rbac，則很可能是 "username:password"。</li>
<li><code translate="no">collection_name (str, optional)</code>:儲存資料的集合名稱。預設為 "llamalection"。</li>
<li><code translate="no">overwrite (bool, optional)</code>:是否以相同名稱覆寫現有的集合。預設為 False。</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">標量欄位包括 doc id &amp; text</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>:集合的 doc_id 欄位名稱。預設為 DEFAULT_DOC_ID_KEY。</li>
<li><code translate="no">text_key (str, optional)</code>:在傳送的集合中儲存什麼關鍵文字。當帶入您自己的 collection 時使用。預設為 DEFAULT_TEXT_KEY。</li>
<li><code translate="no">scalar_field_names (list, optional)</code>:要包含在集合模式中的額外標量欄位名稱。</li>
<li><code translate="no">scalar_field_types (list, optional)</code>:額外標量欄位的類型。</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">密集欄位</h4><ul>
<li><code translate="no">enable_dense (bool)</code>:啟用或停用密集嵌入的布林標誌。預設為 True。</li>
<li><code translate="no">dim (int, optional)</code>:集合的嵌入向量的維度。必須在 enable_sparse 為 False 時建立新的集合。</li>
<li><code translate="no">embedding_field (str, optional)</code>:集合的密集嵌入欄位名稱，預設為 DEFAULT_EMBEDDING_KEY。</li>
<li><code translate="no">index_config (dict, optional)</code>:用來建立密集嵌入索引的設定。預設為 None。</li>
<li><code translate="no">search_config (dict, optional)</code>:用來搜尋 Milvus 密集索引的設定。請注意，這必須與<code translate="no">index_config</code> 指定的索引類型相容。預設為 None。</li>
<li><code translate="no">similarity_metric (str, optional)</code>:用於密集嵌入的相似度指標，目前支援 IP、COSINE 和 L2。</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">稀疏欄位</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>:用來啟用或停用 sparse embedding 的布林標記。預設為 False。</li>
<li><code translate="no">sparse_embedding_field (str)</code>:sparse embedding 欄位的名稱，預設為 DEFAULT_SPARSE_EMBEDDING_KEY。</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>:如果 enable_sparse 為 True，則應該提供此物件來轉換文字為稀疏嵌入。若為 None，則採用預設的稀疏嵌入函數 (BGEM3SparseEmbeddingFunction)。</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>:用來建立稀疏嵌入索引的設定。預設為 None。</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">混合排序器</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>:指定混合搜尋查詢使用的排名器類型。目前只支援 ["RRFRanker", "WeightedRanker"]。預設為 "RRFRanker"。</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>:混合排名器的設定參數。此字典的結構取決於所使用的特定排名器：</p>
<ul>
<li>對於 "RRFRanker"，它應該包括<ul>
<li>"k" (int)：Reciprocal Rank Fusion (RRF) 中使用的參數。此值用於計算排名分數，作為 RRF 演算法的一部分，RRF 演算法會將多種排名策略合併為單一分數，以改善搜尋相關性。</li>
</ul></li>
<li>對於 "WeightedRanker"，它期望：<ul>
<li>「權重」（浮點數清單）：一個正好包含兩個權重的清單：<ol>
<li>密集嵌入元件的權重。</li>
<li>sparse embedding 元件的權重。 這些權重是用來調整混合檢索過程中 embeddings 的 dense 和 sparse 元件的重要性。 預設為空字典，表示 ranker 將以其預先定義的預設值運作。</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">其他</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>:集合屬性，例如 TTL（Time-To-Live）和 MMAP（記憶體映射）。預設為無。它可以包括<ul>
<li>"collection.ttl.seconds"（int）：設定此屬性後，目前集合中的資料會在指定時間內過期。資料集中過期的資料將會被清理，並且不會參與搜尋或查詢。</li>
<li>"mmap.enabled" (bool)：是否在集合層級啟用記憶體映射儲存。</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>:指定要使用的索引管理策略。預設為 "create_if_not_exists"。</li>
<li><code translate="no">batch_size (int)</code>:當插入資料到 Milvus 時，設定在一個批次中處理的文件數量。預設為 DEFAULT_BATCH_SIZE。</li>
<li><code translate="no">consistency_level (str, optional)</code>:對於新建立的集合使用哪個一致性層級。預設為 "Session"。</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>對於<code translate="no">MilvusVectorStore</code> 的參數：</p>
<ul>
<li>將<code translate="no">uri</code> 設定為本機檔案，例如<code translate="no">./milvus.db</code> ，是最方便的方法，因為它會自動利用<a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>將所有資料儲存在這個檔案中。</li>
<li>如果您有大規模的資料，您可以在<a href="https://milvus.io/docs/quickstart.md">docker 或 kubernetes</a> 上架設效能更高的 Milvus 伺服器。在此設定中，請使用伺服器的 uri，例如<code translate="no">http://localhost:19530</code> ，作為您的<code translate="no">uri</code> 。</li>
<li>如果您要使用<a href="https://zilliz.com/cloud">Zilliz Cloud</a>，Milvus 的完全管理<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">雲端</a>服務，請調整<code translate="no">uri</code> 和<code translate="no">token</code> ，對應 Zilliz Cloud 的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint 和 Api key</a>。</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">查詢資料</h3><p>現在我們的文件已儲存在索引中，我們可以針對索引提出問題。索引會使用本身儲存的資料作為 chatgpt 的知識庫。</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>下一個測試顯示覆寫會移除先前的資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>下一個測試顯示在已存在的索引中加入額外的資料。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">元資料篩選<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>我們可以透過篩選特定來源來產生結果。以下範例說明從目錄載入所有文件，並隨後根據元資料過濾這些文件。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>我們只想擷取檔案<code translate="no">uber_2021.pdf</code> 中的文件。</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>當從檔案<code translate="no">paul_graham_essay.txt</code> 擷取時，我們會得到不同的結果。</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
