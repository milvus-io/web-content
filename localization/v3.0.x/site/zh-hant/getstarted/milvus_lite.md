---
id: milvus_lite.md
summary: 安裝 Milvus Lite，並使用永久性資料庫路徑執行本機向量搜尋。
title: 在本地執行 Milvus Lite
---
<h1 id="Run-Milvus-Lite-Locally" class="common-anchor-header">在本地執行 Milvus Lite<button data-href="#Run-Milvus-Lite-Locally" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何使用 Milvus Lite 執行本機向量搜尋。內容涵蓋安裝、資料持久化、篩選，以及將資料匯出至另一個 Milvus 部署環境。</p>
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
    </button></h2><p>Milvus Lite 是<a href="https://github.com/milvus-io/pymilvus">Milvus Python SDK</a> 的輕量級本地後端。請透過可選的<code translate="no">milvus-lite</code> 附加元件進行安裝；若僅安裝<code translate="no">pymilvus</code> ，則不會在下方使用的 SDK 版本中安裝此後端。</p>
<p>Milvus Lite 適用於以下環境中的本地開發和小規模工作負載：</p>
<ul>
<li>Jupyter Notebook 或 Google Colab</li>
<li>筆記型電腦</li>
<li>具備相容 Python 依賴項的邊緣裝置</li>
</ul>
<p>Milvus Lite 採用<code translate="no">MilvusClient</code> API 執行受支援的操作，包括向量資料持久化、插入與刪除、向量搜尋，以及元資料篩選。若要將受支援的應用程式工作流程移轉至遠端部署環境，請變更連線 URI 與憑證，並檢視受支援功能的差異。 針對大規模生產工作負載，請使用<a href="/docs/zh-hant/install-overview.md">Milvus Standalone 或 Distributed，</a>或<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上的全託管 Milvus 服務。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南使用 PyMilvus<strong>3.0.2</strong>及 Milvus Lite<strong>3.2.2</strong>。請準備以下環境：</p>
<ul>
<li>Python 3.10 或更新版本。本地 Lite 後端所需的最低 Python 版本高於遠端 PyMilvus 客戶端。</li>
<li>macOS、Linux 或 Windows，並具備相容的依賴項輪子（wheels），例如<code translate="no">faiss-cpu</code> 和<code translate="no">pyarrow</code> 。Milvus Lite 3.2.2 是一個純 Python 套件，因此作業系統和架構必須滿足這些依賴項，而非 Lite 套件本身。</li>
<li>用於儲存資料庫的可寫入本機目錄。</li>
</ul>
<p>在 Windows 系統上，由於 PyMilvus 3.0.2 具有平台標記，pip 會跳過其<code translate="no">milvus-lite</code> 附加元件，因此必須明確指定<code translate="no">milvus-lite</code> 。下方的安裝指令已包含此設定。若需其他套件與平台的組合，請參閱<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#requirements">Milvus Lite 發行版需求</a>。</p>
<h2 id="Set-up-Milvus-Lite" class="common-anchor-header">設定 Milvus Lite<button data-href="#Set-up-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>建立一個隔離的 Python 環境，並安裝這兩個套件：</p>
<pre><code translate="no" class="language-bash">python3 -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate
python -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>請為 extras 表達式加上引號，以免 zsh 等殼層將括號視為語法。在 Windows PowerShell 上，請使用<code translate="no">.venv\Scripts\Activate.ps1</code> 而非<code translate="no">source .venv/bin/activate</code> 來啟動環境。明確指定版本可確保 SDK 與本指南所對應的本地後端保持一致。</p>
<div class="alert note">
<blockquote>
<p>Milvus Lite 3.x 使用的儲存引擎與原始 2.x 套件不同。它無法直接開啟現有的 2.x<code translate="no">.db</code> 檔案。 請保留原始資料庫及其可開啟該資料庫的環境，將資料匯出至該環境，再將資料匯入新資料庫。安裝新套件並不會遷移舊的儲存格式。請參閱《<a href="#Migrating-data-from-Milvus-Lite">從 Milvus Lite 遷移資料</a>》。</p>
</blockquote>
</div>
<h2 id="Connect-to-Milvus-Lite" class="common-anchor-header">連線至 Milvus Lite<button data-href="#Connect-to-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>將以<code translate="no">.db</code> 結尾的本地路徑傳遞給<code translate="no">MilvusClient</code> ：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>對於 Milvus Lite 3.2.2，這會在工作目錄中建立一個<strong>milvus_demo.db 目錄</strong>。該目錄包含資料庫的儲存檔案；<code translate="no">.db</code> 這個後綴並不表示它是一個單一的可攜式檔案。關閉客戶端或重新啟動應用程式後，請重複使用相同的路徑來重新開啟資料庫。</p>
<p>若要建立新資料庫，請使用不同的路徑。若要連線至遠端 Milvus 伺服器，請傳入其端點和憑證：</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;username:password&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-a-local-search-example" class="common-anchor-header">執行本機搜尋範例<button data-href="#Run-a-local-search-example" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例展示使用生成的向量進行 API 工作流程。這些向量並未編碼文字的含義；在建構語義搜尋時，請使用嵌入模型。請針對新的資料庫路徑執行此範例，或在再次執行前移除現有的<code translate="no">demo_collection</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

client = MilvusClient(<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)
client.create_collection(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    dimension=<span class="hljs-number">384</span>  <span class="hljs-comment"># The vectors in this example have 384 dimensions.</span>
)

docs = [
    <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>,
    <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>,
    <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>,
]

<span class="hljs-comment"># Generate reproducible example vectors, not semantic embeddings.</span>
rng = np.random.default_rng(<span class="hljs-number">7</span>)
vectors = rng.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, size=(<span class="hljs-built_in">len</span>(docs), <span class="hljs-number">384</span>)).tolist()
data = [
    {<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vectors[i], <span class="hljs-string">&quot;text&quot;</span>: docs[i], <span class="hljs-string">&quot;subject&quot;</span>: <span class="hljs-string">&quot;history&quot;</span>}
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(docs))
]
res = client.insert(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, data=data)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Search only records whose subject is &quot;history&quot;.</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    data=[vectors[<span class="hljs-number">0</span>]],
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    limit=<span class="hljs-number">2</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Retrieve all records that match the scalar filter, without vector ranking.</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;subject == &#x27;history&#x27;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;subject&quot;</span>],
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Delete one record and keep the others for the export example below.</span>
res = client.delete(collection_name=<span class="hljs-string">&quot;demo_collection&quot;</span>, ids=[<span class="hljs-number">2</span>])
<span class="hljs-built_in">print</span>(res)
client.close()
<button class="copy-code-btn"></button></code></pre>
<p>若您的應用程式是從文字生成嵌入向量，請繼續閱讀<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>。您也可以探索<a href="https://github.com/milvus-io/bootcamp">Milvus Bootcamp</a>中的 RAG、圖像搜尋及框架<a href="https://github.com/milvus-io/bootcamp">整合範例</a>。</p>
<h2 id="Supported-features-and-limits" class="common-anchor-header">支援的功能與限制<button data-href="#Supported-features-and-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Lite 3.2.2 透過其本機 PyMilvus 適配器實作 Milvus 操作集的子集。其<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#supported-features">版本化功能參考文件</a>描述了以下功能：</p>
<table>
<thead>
<tr><th>範圍</th><th>此 Lite 版本的支援情況</th></tr>
</thead>
<tbody>
<tr><td>密集向量與稀疏向量</td><td><code translate="no">FLOAT_VECTOR</code> 以及<code translate="no">SPARSE_FLOAT_VECTOR</code></td></tr>
<tr><td>向量索引</td><td><code translate="no">FLAT</code>、<code translate="no">BRUTE_FORCE</code> 、<code translate="no">IVF_FLAT</code> 、<code translate="no">IVF_SQ8</code> 、<code translate="no">HNSW</code> 、<code translate="no">HNSW_SQ</code> ，以及<code translate="no">AUTOINDEX</code></td></tr>
<tr><td>標量與稀疏索引</td><td><code translate="no">INVERTED</code> 標量索引與<code translate="no">SPARSE_INVERTED_INDEX</code></td></tr>
<tr><td>資料操作</td><td>插入、更新或插入、擷取、查詢、向量搜尋及刪除</td></tr>
<tr><td>搜尋</td><td>密集與稀疏搜尋、元資料篩選器、多個向量欄位及混合搜尋</td></tr>
<tr><td>集合組織</td><td>在本地適配器支援的操作範圍內，包含集合、命名資料庫、別名及分區</td></tr>
</tbody>
</table>
<p>此版本不限於<code translate="no">FLAT</code> 索引。索引的可用性與行為取決於Lite版本；請勿將原始2.x後端設定的限制套用至3.x引擎。</p>
<p>在為應用程式選擇 Lite 之前，請先檢視以下限制：</p>
<ul>
<li>每次僅有一個進程可擁有資料庫儲存目錄。引擎會透過檔案鎖來保護該目錄。</li>
<li>請將對同一集合的寫入操作序列化。系統無法安全地支援並發寫入。</li>
<li>本機適配器並未實作所有 Milvus RPC 介面。不支援的操作會傳回<code translate="no">UNIMPLEMENTED</code> ；無法進行模式變更，亦無法執行區隔層級的載入或釋放操作。</li>
<li>不支援身份驗證、使用者、角色、RBAC 及 TLS。請勿將本地伺服器暴露於不可信的網路中。</li>
<li>不支援二進位、float16、bfloat16 和 int8 向量欄位，以及產品量化索引。</li>
<li>Lite 專為本地工作負載設計。本地 API 相容性無法提供分散式擴展能力，亦無法提供遠端部署所具備的生產環境隔離與可用性。</li>
</ul>
<p>在依賴本地範例未實際運作的伺服器功能之前，請參閱<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#known-limitations">各版本的已知限制</a>。</p>
<h2 id="Migrating-data-from-Milvus-Lite" class="common-anchor-header">從 Milvus Lite 遷移資料<button data-href="#Migrating-data-from-Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p>請使用 `<code translate="no">milvus-lite dump</code> ` 將集合匯出為 Milvus BulkWriter JSON 檔案。這些檔案可匯入至自建的 Milvus 部署環境或 Zilliz Cloud。</p>
<p>在開啟來源資料庫的環境中安裝 SDK 的批量寫入器依賴項：</p>
<pre><code translate="no" class="language-bash">python -m pip install <span class="hljs-string">&quot;pymilvus[bulk_writer]==3.0.2&quot;</span>
milvus-lite dump -h
<button class="copy-code-btn"></button></code></pre>
<p>在另一個進程中執行該命令之前，請先關閉擁有本地資料庫的 Python 應用程式。將前一個範例中的集合匯出：</p>
<pre><code translate="no" class="language-bash">milvus-lite dump -d ./milvus_demo.db -c demo_collection -p ./data_dir
<button class="copy-code-btn"></button></code></pre>
<p>此指令會從<strong>milvus_demo.db 儲存目錄</strong>讀取 `<code translate="no">demo_collection</code> `，並將匯出檔案寫入<strong>data_dir</strong> 目錄下。請透過<a href="/docs/zh-hant/import-data.md">Bulk Insert</a>或<a href="https://docs.zilliz.com/docs/data-import">Zilliz Cloud 資料匯入功能</a>匯入這些檔案。</p>
<div class="alert note">
<blockquote>
<p>若要匯出原始的 2.x 資料庫檔案，請在具備原始 Lite 版本且能開啟該檔案的環境中執行 dump 工具。3.x 版的 dump 工具不會透過直接開啟檔案來轉換舊的儲存格式。請保留來源資料庫，直到您確認已匯入的列數及搜尋結果無誤為止。</p>
</blockquote>
</div>
<p>有關受支援的備份選項及儲存格式限制，請參閱<a href="https://github.com/milvus-io/milvus-lite/blob/v3.2.2/README.md#dump-data">Milvus Lite 匯出參考</a>手冊。</p>
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
    </button></h2><p>請繼續執行以下任務：</p>
<ul>
<li><a href="/docs/zh-hant/quickstart.md">快速入門</a>：產生嵌入向量並執行搜尋工作流程。</li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a>與<a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>：為您的應用程式設計查詢。</li>
<li><a href="/docs/zh-hant/install-overview.md">選擇部署方式</a>：超越本地開發階段。</li>
<li><a href="https://github.com/zilliztech/attu">Attu</a>：探索 Milvus 圖形使用者介面（GUI），進行遠端部署。</li>
</ul>
