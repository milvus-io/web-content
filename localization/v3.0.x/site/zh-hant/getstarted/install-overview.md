---
id: install-overview.md
summary: 請根據您的工作負載、可用性需求及運作環境，選擇 Milvus Lite、獨立執行版或分散式版本。
title: Milvus 部署選項概覽
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvus 部署選項概覽<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援本地原型開發與大規模向量搜尋服務。請根據您的資料、讀寫負載、可用性需求及運作環境，從 Milvus Lite、Milvus Standalone 及 Milvus Distributed 中選擇適合的方案。</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是一個可導入至您應用程式的 Python 函式庫。作為 Milvus 的輕量級版本，它非常適合在 Jupyter Notebook 中進行快速原型開發，或在資源有限的智慧裝置上運行。 Milvus Lite 支援與其他 Milvus 部署模式相同的 API。與 Milvus Lite 互動的客戶端程式碼，亦可與其他部署模式下的 Milvus 實例配合使用。</p>
<p>針對本機範例，請使用 Python 3.10 或更新版本，並明確安裝可選的 Lite 依賴項。在 Windows 系統上，pip 會跳過「<code translate="no">milvus-lite</code> 」這個附加參數，因此必須明確指定套件名稱：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>請使用 `<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` 開啟本機儲存空間。Milvus Lite 3.x 會在此路徑建立目錄；若已有 Milvus Lite 2.x 資料庫檔案，則需進行匯出與遷移。請參閱《<a href="/docs/zh-hant/milvus_lite.md">執行 Milvus Lite</a>》以了解平台需求，並參閱《<a href="/docs/zh-hant/quickstart.md">快速入門</a>》以取得完整的插入與搜尋範例。</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus 獨立版<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone 是一種單機伺服器部署模式。Milvus Standalone 的所有元件均封裝於單一<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 映像中</a>，使部署更加便捷。 若您有生產環境的工作負載，但不希望使用 Kubernetes，則在具備充足記憶體的單一機器上執行 Milvus 獨立版是一個不錯的選擇。預設情況下，Milvus 獨立版會運行<strong>Woodpecker</strong>（內嵌版）作為其訊息佇列，因此無需額外操作獨立的訊息傳遞服務。</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus 分散式<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed 可部署於<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>叢集上。此部署採用雲原生架構，其中資料導入負載與搜尋查詢由隔離的節點分別處理，並為關鍵元件提供冗餘機制。它具備最高的可擴展性與可用性，同時也提供自訂各元件資源分配的靈活性。 對於在生產環境中運行大規模向量搜尋系統的企業用戶而言，Milvus Distributed 是首選方案。預設情況下，Milvus Distributed 會將<strong>Woodpecker</strong>作為其訊息佇列，並與 Milvus 一併部署為專用服務。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">根據您的使用情境選擇合適的部署模式<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>部署模式的選擇通常取決於應用程式的開發階段：</p>
<ul>
<li><p><strong>快速原型開發</strong></p>
<p>請在筆記型電腦中使用 Milvus Lite 來測試嵌入向量、RAG 分塊策略及檢索行為。當您需要共用伺服器，或測量到的記憶體與查詢負載超過本地環境負荷時，請切換至 Milvus Standalone。雖然客戶端 API 相似，但請確認功能差異，並將儲存的資料另行遷移。</p></li>
<li><p><strong>小規模生產環境部署</strong></p>
<p>當單一伺服器足以滿足您的工作負載與可用性需求，且您偏好不使用 Kubernetes 進行運作時，請採用 Milvus Standalone。請根據向量維度、標量欄位、索引設定及複本數估算記憶體需求，並針對預期的查詢並發量與寫入速率進行效能測試。僅憑向量數量並無法確定系統容量。</p></li>
<li><p><strong>大規模生產環境部署</strong></p>
<p>隨著業務快速成長，且資料規模超過單一伺服器的容量，此時便應考慮採用 Milvus Distributed。您可繼續在開發或預備環境中使用 Milvus Standalone 以維持便利性，並同時運作執行 Milvus Distributed 的 K8s 叢集。 此架構不僅能支援數百億向量規模，還能根據特定工作負載（例如高讀取、低寫入，或高寫入、低讀取等情境）靈活調整節點規格。</p></li>
<li><p><strong>邊緣裝置上的本地搜尋</strong></p>
<p>若需在邊緣裝置上搜尋私有或敏感資料，您可直接在裝置上部署 Milvus Lite，無需依賴雲端服務即可進行文字或圖像搜尋。此方案適用於專有文件搜尋或裝置端物件偵測等情境。</p></li>
</ul>
<p>Milvus 的部署模式選擇取決於您的專案階段與規模。無論是快速原型開發還是大規模企業部署，Milvus 都能針對各種需求提供靈活且強大的解決方案。</p>
<ul>
<li><strong>Milvus Lite</strong>適用於單一應用程式的資源範圍內進行本地評估與工作負載處理。</li>
<li>當單台伺服器能滿足您對容量與可用性的具體需求時<strong>，Milvus Standalone</strong>可提供共享服務。</li>
<li>當您需要擴展至多於一台伺服器，或需隔離讀寫資源時<strong>，Milvus Distributed</strong>可提供元件層級的擴展與冗餘功能。</li>
</ul>
<p>Milvus Standalone 和 Distributed 會使用訊息佇列、物件儲存及元資料儲存庫。Milvus Lite 則在本地端運行，無需這些獨立服務。有關伺服器部署的預設依賴項與外部服務選項，請參閱「<a href="/docs/zh-hant/data-infra-integration-overview.md">資料基礎架構</a>」。</p>
<p>若您希望採用託管服務而非自行營運伺服器基礎架構，請考慮<a href="https://zilliz.com/cloud">Zilliz Cloud</a>。若要進行自主部署，請繼續使用<a href="/docs/zh-hant/install_standalone-docker.md">Docker</a>或<a href="/docs/zh-hant/install_cluster-milvusoperator.md">Kubernetes</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>根據您的使用情境選擇部署選項</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">功能比較<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
    </button></h2><p>「Lite」欄位描述的是 Milvus Lite 3.2.2。在本地應用程式中依賴伺服器功能之前，請先確認<a href="/docs/zh-hant/milvus_lite.md#Supported-features-and-limits">Milvus Lite 的限制</a>。</p>
<table>
<thead>
<tr><th>功能</th><th>Milvus Lite</th><th>Milvus 獨立版</th><th>Milvus 分散式</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客戶端函式庫</td><td>Python（本機 PyMilvus 適配器）</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>資料類型</td><td>密集向量<br/>稀疏向量<br/>布林值<br/>整數<br/>浮點數<br/>變長字串<br/>陣列<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二進位向量<br/>布林值<br/>整數<br/>浮點數<br/>VarChar<br/>陣列<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二進位向量<br/>布林值<br/>整數<br/>浮點數<br/>VarChar<br/>陣列<br/>JSON</td></tr>
<tr><td>搜尋功能</td><td>向量搜尋（ANN 搜尋）<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>透過主鍵取得實體<br/>混合搜尋</td><td>向量搜尋 (ANN 搜尋)<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>依主鍵取得實體<br/>混合搜尋</td><td>向量搜尋（ANN 搜尋）<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>透過主鍵取得實體<br/>混合搜尋</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>進階資料管理</td><td>資料庫<br/>區隔<br/>別名<br/>無存取控制</td><td>存取控制<br/>區段<br/>區段鍵</td><td>存取控制<br/>區段<br/>區段金鑰<br/>實體資源分組</td></tr>
<tr><td>一致性層級</td><td>不適用：由單一本地進程處理所有請求；<code translate="no">consistency_level</code> 雖被接受但無效</td><td>強一致性<br/>有限過時性<br/>會話<br/>最終一致性</td><td>強一致性（<br/>） 有限過時（Bounded Staleness）<br/>會話（Session）<br/>最終一致性（Eventual）</td></tr>
<tr><td>訊息佇列</td><td>不適用</td><td>Woodpecker（嵌入式）</td><td>Woodpecker（服務）</td></tr>
</tbody>
</table>
