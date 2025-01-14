---
id: quickstart_with_attu.md
summary: >-
  Attu 是 Milvus 的多合一、開放源碼管理工具。它具有直觀的圖形化使用者介面
  (GUI)，讓您輕鬆與資料庫互動。只需幾下點擊，您就可以直觀查看群集狀態、管理元資料、執行資料查詢等。
title: 問題回答系統
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">快速開始使用 Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1.簡介<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a>是 Milvus 的多合一、開放源碼管理工具。它具有直觀的圖形化使用者介面 (GUI)，讓您輕鬆與資料庫互動。只需幾下點擊，您就可以視覺化您的集群狀態、管理元資料、執行資料查詢等。</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2.安裝桌面應用程式<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>訪問 Attu<a href="https://github.com/zilliztech/attu/releases">GitHub 發佈頁面下載</a>桌面版 Attu。選擇適合您作業系統的版本，並依照安裝步驟進行。</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">適用於 macOS (M 系列晶片) 的注意事項：</h3><p>如果遇到錯誤：</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>在終端機執行以下指令，以繞過此問題：</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3.連接至 Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu 支援連線至<strong>Milvus Standalone</strong>和<strong>Zilliz Cloud</strong>，提供使用本機或雲端託管資料庫的彈性。</p>
<p>要在本機使用 Milvus Standalone：</p>
<ol>
<li>按照<a href="https://milvus.io/docs/install_standalone-docker.md">Milvus 安裝指南</a>啟動 Milvus Standalone。</li>
<li>開啟 Attu 並輸入連線資訊：<ul>
<li>Milvus 位址：您的 Milvus Standalone 伺服器 URI，例如 http://localhost:19530</li>
<li>其他可選設定：您可以依據您的 Milvus 設定來設定，或保留為預設值。</li>
</ul></li>
<li>點擊 「連接 」訪問您的數據庫。</li>
</ol>
<blockquote>
<p>您也可以在<a href="https://zilliz.com/cloud">Zilliz Cloud</a> 上連接完全管理的 Milvus。只需將<code translate="no">Milvus Address</code> 和<code translate="no">token</code> 設定為 Zilliz Cloud 實例的<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">公共端點和 API 金鑰</a>。</p>
</blockquote>
<ol start="4">
<li>按一下以存取您的資料庫。</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4.準備資料、建立集合和插入資料<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 準備資料</h3><p>我們使用<a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Milvus 文件 2.4.x</a>中的常見問題頁面作為本範例的資料集。</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">下載並擷取資料：</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2<span class="hljs-number">.4</span><span class="hljs-number">.6</span>-preview/milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span>
unzip -q milvus_docs_2<span class="hljs-number">.4</span>.x_en.<span class="hljs-built_in">zip</span> -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">處理 Markdown 檔案：</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 產生嵌入</h3><p>定義一個嵌入模型，使用<code translate="no">milvus_model</code> 產生文字嵌入。我們以<code translate="no">DefaultEmbeddingFunction</code> 模型為例，這是一個預先訓練好的輕量級嵌入模型。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">輸出：</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 建立集合</h3><p>連接到 Milvus 並建立一個 Collection：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 插入資料</h3><p>迭代文本行、建立嵌入模型，並將資料插入 Milvus：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 可視化資料和模式</h3><p>現在我們可以使用 Attu 的介面來視覺化資料模式和插入的實體。模式顯示已定義的欄位，包括<code translate="no">id</code> 欄位類型<code translate="no">Int64</code> 和<code translate="no">vector</code> 欄位類型<code translate="no">FloatVector(768)</code> ，以及<code translate="no">Inner Product (IP)</code> 公制。集合載入了<strong>72 個實體</strong>。</p>
<p>此外，我們可以檢視插入的資料，包括 ID、向量嵌入以及儲存文字內容等元資料的動態欄位。介面支援根據指定條件或動態欄位進行篩選和查詢。</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.5.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5.可視化搜尋結果及關係<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu 提供強大的介面，可視化和探索資料關係。若要檢視插入的資料點及其相似性關係，請遵循下列步驟：</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1<strong>執行搜尋</strong></h3><p>導覽到 Attu 的<strong>向量搜尋</strong>索引標籤。</p>
<ol>
<li>按一下「<strong>產生隨機資料</strong>」按鈕以建立測試查詢。</li>
<li>按一下「<strong>搜尋」</strong>，以根據產生的資料擷取結果。</li>
</ol>
<p>結果會顯示在表格中，顯示 ID、相似度得分，以及每個匹配實體的動態欄位。</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2<strong>探索資料關係</strong></h3><p>按一下結果面板中的 [<strong>探索] (Explore)</strong>按鈕，可以將查詢向量與搜尋結果之間的關係可視化為<strong>類似知識圖表的結構</strong>。</p>
<ul>
<li><strong>中央節點</strong>代表搜尋向量。</li>
<li><strong>連接的節點</strong>代表搜尋結果，按一下它們會顯示對應節點的詳細資訊。</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3<strong>展開圖形</strong></h3><p>按兩下任何結果節點可展開其連線。此動作會顯示選取節點與資料集中其他資料點之間的其他關係，從而建立一個<strong>更大、相互連結的知識圖形</strong>。</p>
<p>透過此擴充檢視，可根據向量相似性深入探索資料點的關聯方式。</p>
<p align="center">
  <img translate="no" src="/docs/v2.5.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6.結論<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu 簡化了儲存於 Milvus 的向量資料的管理與可視化。從資料插入、查詢執行到互動探索，它提供了一個直觀的介面來處理複雜的向量搜尋任務。憑藉動態模式支援、圖形化搜尋視覺化和靈活的查詢篩選器等功能，Attu 讓使用者能夠有效地分析大型資料集。</p>
<p>利用 Attu 的視覺化探索工具，使用者可以更好地瞭解他們的資料，找出隱藏的關係，並做出以資料為導向的決策。現在就開始使用 Attu 和 Milvus 探索您自己的資料集！</p>
<hr>
