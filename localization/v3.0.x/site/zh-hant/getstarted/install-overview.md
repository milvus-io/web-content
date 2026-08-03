---
id: install-overview.md
summary: >-
  Milvus 是一款效能卓越且具備可擴展性的向量資料庫。它支援各種規模的使用情境，從在 Jupyter Notebook
  中本地執行的示範，到處理數百億個向量的大型 Kubernetes 叢集皆可涵蓋。目前，Milvus 提供三種部署選項：Milvus Lite、Milvus
  Standalone 以及 Milvus Distributed。
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
    </button></h1><p>Milvus 是一款高效能且可擴展的向量資料庫。它支援各種規模的使用情境，從在 Jupyter Notebook 中本地執行的示範，到處理數百億個向量的大型 Kubernetes 叢集皆可涵蓋。目前，Milvus 提供三種部署選項：Milvus Lite、Milvus Standalone 以及 Milvus Distributed。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是一個可導入至您應用程式的 Python 函式庫。作為 Milvus 的輕量級版本，它非常適合在 Jupyter Notebook 中進行快速原型開發，或在資源有限的智慧裝置上運行。 Milvus Lite 支援與其他 Milvus 部署模式相同的 API。與 Milvus Lite 互動的客戶端程式碼，亦可與其他部署模式下的 Milvus 實例協同運作。</p>
<p>若要將 Milvus Lite 整合至您的應用程式中，請執行 `<code translate="no">pip install pymilvus</code> ` 進行安裝，並使用 `<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ` 語句，透過本地檔案建立向量資料庫以持久化所有資料。更多詳細資訊，請參閱《<a href="https://milvus.io/docs/milvus_lite.md">執行 Milvus Lite</a>》。</p>
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
    </button></h2><p>Milvus Standalone 是一種單機伺服器部署模式。Milvus Standalone 的所有元件均封裝於單一<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 映像檔中</a>，使部署更加便捷。 若您有生產環境的工作負載，但不希望使用 Kubernetes，則在具備充足記憶體的單一機器上執行 Milvus 獨立版是一個不錯的選擇。預設情況下，Milvus 獨立版會使用<strong>Woodpecker</strong>（內嵌版）作為訊息佇列，因此無需額外運作獨立的訊息傳遞服務。</p>
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
<p>若您希望快速建構原型或進行學習，例如檢索增強生成（RAG）示範、AI 聊天機器人、多模態搜尋等，Milvus Lite 本身或 Milvus Lite 與 Milvus Standalone 的組合皆為合適選擇。 您可以在筆記本中使用 Milvus Lite 進行快速原型開發，並探索各種方法，例如 RAG 中的不同分塊策略。若您希望將使用 Milvus Lite 建置的應用程式部署於小規模生產環境以服務真實使用者，或在更大規模的資料集（例如超過數百萬個向量）上驗證構想，則 Milvus Standalone 是合適的選擇。 由於所有 Milvus 部署皆採用相同的客戶端 API，因此 Milvus Lite 的應用程式邏輯仍可共用。此外，儲存於 Milvus Lite 中的資料亦可透過命令列工具遷移至 Milvus Standalone。</p></li>
<li><p><strong>小規模生產環境部署</strong></p>
<p>對於早期生產階段，當專案仍在尋求產品與市場的契合度，且敏捷性比可擴展性更為重要時，Milvus Standalone 是最佳選擇。在具備足夠的機器資源下，它仍可擴展至 1 億個向量，同時所需的 DevOps 維護工作遠少於維護 K8s 叢集。</p></li>
<li><p><strong>大規模生產部署</strong></p>
<p>隨著業務快速成長，且資料規模超過單一伺服器的容量，此時便該考慮採用 Milvus Distributed。您可繼續在開發或預備環境中使用 Milvus Standalone 以維持便利性，並同時運作執行 Milvus Distributed 的 K8s 叢集。 此架構不僅能支援數百億向量的處理量，還能根據特定工作負載（例如高讀取、低寫入，或高寫入、低讀取等情境）靈活調整節點規格。</p></li>
<li><p><strong>邊緣裝置上的本地搜尋</strong></p>
<p>若需在邊緣裝置上搜尋私有或敏感資料，您可直接在裝置上部署 Milvus Lite，無需依賴雲端服務即可進行文字或圖像搜尋。此方案適用於專有文件搜尋或裝置端物件偵測等情境。</p></li>
</ul>
<p>Milvus 的部署模式選擇取決於您的專案階段與規模。無論是快速原型開發還是大規模企業部署，Milvus 都能針對各種需求提供靈活且強大的解決方案。</p>
<ul>
<li>若資料集較小（最多數百萬個向量），建議使用<strong>Milvus Lite</strong>。</li>
<li><strong>Milvus Standalone</strong>適用於中型資料集，可擴展至 1 億個向量。</li>
<li><strong>Milvus Distributed</strong>專為大規模部署設計，可處理從 1 億到數十億向量不等的資料集。</li>
</ul>
<p>無論採用何種部署模式，每個 Milvus 實例皆仰賴訊息佇列、物件儲存及元資料儲存庫——預設分別為<strong>Woodpecker</strong>、<strong>MinIO</strong> 及<strong>etcd</strong>。若要瞭解這些依賴項、進行調整或連接外部服務，請參閱《<a href="/docs/zh-hant/data-infra-integration-overview.md">資料基礎架構與整合》</a>。</p>
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
    </button></h2><table>
<thead>
<tr><th>功能</th><th>Milvus Lite</th><th>Milvus 獨立版</th><th>Milvus 分散式</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客戶端函式庫</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>資料類型</td><td>密集向量<br/>稀疏向量<br/>二進位向量<br/>布林值<br/>整數<br/>浮點數<br/>變長字元串<br/>陣列<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二進位向量<br/>布林值<br/>整數<br/>浮點數<br/>VarChar<br/>陣列<br/>JSON</td><td>密集向量<br/>稀疏向量<br/>二進位向量<br/>布林值<br/>整數<br/>浮點數<br/>VarChar<br/>陣列<br/>JSON</td></tr>
<tr><td>搜尋功能</td><td>向量搜尋（ANN 搜尋）<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>透過主鍵取得實體<br/>混合搜尋</td><td>向量搜尋 (ANN 搜尋)<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>透過主鍵取得實體<br/>混合搜尋</td><td>向量搜尋 (ANN 搜尋)<br/>元數據篩選<br/>範圍搜尋<br/>標量查詢<br/>透過主鍵取得實體<br/>混合搜尋</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>進階資料管理</td><td>不適用</td><td>存取控制<br/>分區<br/>分區金鑰</td><td>存取控制<br/>區隔<br/>區隔金鑰<br/>實體資源分組</td></tr>
<tr><td>一致性層級</td><td>強</td><td>強<br/>有限過時<br/>會話<br/>最終</td><td>強<br/>有界過時<br/>會話<br/>最終</td></tr>
<tr><td>訊息佇列</td><td>不適用</td><td>Woodpecker（嵌入式）</td><td>Woodpecker（服務）</td></tr>
</tbody>
</table>
