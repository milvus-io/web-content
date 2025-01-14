---
id: install-overview.md
summary: >-
  Milvus 是一個高效能、可擴充的向量資料庫。它支援各種規模的使用案例，從在本機 Jupyter Notebooks
  中執行的示範，到處理數百億向量的大規模 Kubernetes 集群。目前，Milvus 有三種部署選項_Milvus Lite、Milvus
  Standalone 和 Milvus Distributed。
title: Milvus 部署選項概述
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvus 部署選項概述<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 是一個高效能、可擴充的向量資料庫。它支援各種規模的使用案例，從在本機 Jupyter Notebooks 中執行的示範，到處理數百億向量的大型 Kubernetes 集群。目前，Milvus 有三種部署選項：Milvus Lite、Milvus Standalone 和 Milvus Distributed。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>是可匯入您應用程式的 Python 函式庫。作為 Milvus 的輕量級版本，它非常適合在 Jupyter Notebook 或資源有限的智慧型裝置上執行快速原型。Milvus Lite 支援與其他 Milvus 部署相同的 API。與 Milvus Lite 互動的用戶端程式碼也可以在其他部署模式下與 Milvus 實體一起運作。</p>
<p>要將 Milvus Lite 整合到您的應用程式中，請執行<code translate="no">pip install pymilvus</code> 來安裝它，並使用<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> 語句來實體化一個向量資料庫，該資料庫的本機檔案會持久化您所有的資料。如需更多詳細資訊，請參閱<a href="https://milvus.io/docs/milvus_lite.md">運行 Milvus Lite</a>。</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus 單機版<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone 是單機伺服器部署。Milvus Standalone 的所有元件都包裝在單一<a href="https://milvus.io/docs/install_standalone-docker.md">Docker 映像檔中</a>，讓部署更方便。如果您有生產工作負載，但又不想使用 Kubernetes，在有足夠記憶體的單機上執行 Milvus Standalone 是個不錯的選擇。此外，Milvus Standalone 透過主從複製支援高可用性。</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">分散式 Milvus<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributed 可以部署在<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>集群上。此部署採用雲原生架構，擷取負載和搜尋查詢分別由獨立節點處理，讓關鍵元件具有備援。它提供最高的可擴充性和可用性，以及自訂每個元件所分配資源的彈性。Milvus Distributed 是企業用戶在生產中運行大型向量搜索系統的首選。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">為您的使用個案選擇正確的部署模式<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>部署模式的選擇通常取決於您應用程式的開發階段：</p>
<ul>
<li><p><strong>用於快速原型</strong></p>
<p>如果您想快速建立原型或作為學習用途，例如檢索擴增世代 (Retrieval Augmented Generation, RAG) demo、AI 聊天機、多模態搜尋，Milvus Lite 本身或 Milvus Lite 與 Milvus Standalone 的組合都很適合。您可以在筆記型電腦中使用 Milvus Lite 進行快速原型設計，並探索各種方法，例如 RAG 中的不同分塊策略。您可能希望將 Milvus Lite 建立的應用程式部署到小規模的生產中，以服務真正的使用者，或在較大的資料集上驗證想法，例如超過幾百萬的向量。Milvus Standalone 是合適的。Milvus Lite 的應用程式邏輯仍可共用，因為所有 Milvus 部署都有相同的客戶端 API。Milvus Lite 儲存的資料也可以透過命令列工具移植到 Milvus Standalone。</p></li>
<li><p><strong>小規模生產部署</strong></p>
<p>對於早期階段的生產，當專案仍在尋求產品與市場的契合，敏捷性比可擴展性更重要時，Milvus Standalone 是最好的選擇。只要有足夠的機器資源，Milvus Standalone 仍可擴充至 1 億向量，同時對 DevOps 的需求遠低於維護 K8s 集群。</p></li>
<li><p><strong>大型生產部署</strong></p>
<p>當您的業務快速成長，資料規模超過單一伺服器的容量，是時候考慮Milvus Distributed。您可以繼續使用Milvus Standalone作為開發或暫存環境，並運行Milvus Distributed的K8s集群。這可讓您持續處理數百億個向量，並可針對您的特定工作負載，例如高讀取次數、低寫入次數或高寫入次數、低讀取次數的情況，彈性調整節點大小。</p></li>
<li><p><strong>邊緣裝置上的本機搜尋</strong></p>
<p>若要在邊緣裝置上搜尋私人或敏感資料，您可以在裝置上部署 Milvus Lite，而無需依賴雲端服務來進行文字或影像搜尋。這適用於專屬文件搜尋或裝置上物件偵測等情況。</p></li>
</ul>
<p>Milvus 部署模式的選擇取決於您專案的階段與規模。Milvus 提供靈活且功能強大的解決方案，可滿足從快速原型到大規模企業部署的各種需求。</p>
<ul>
<li><strong>Milvus Lite</strong>建議用於較小的資料集，最多可達數百萬向量。</li>
<li><strong>Milvus Standalone</strong>適用於中型資料集，最多可擴充至 1 億向量。</li>
<li><strong>Milvus Distributed</strong>專為大規模部署而設計，能夠處理從 1 億到數百億向量的資料集。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>選擇適合您使用情況的部署選項</span> </span></p>
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
<tr><th>特點</th><th>Milvus Lite</th><th>Milvus 單機版</th><th>分散式</th></tr>
</thead>
<tbody>
<tr><td>SDK / 客戶端軟體</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>資料類型</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>搜尋功能</td><td>向量搜尋 (ANN Search)<br/>元資料篩選<br/>範圍搜尋<br/>標量查詢<br/>依主索引鍵取得實體<br/>混合搜尋</td><td>向量搜尋 (ANN Search)<br/>元資料篩選<br/>範圍搜尋<br/>標量查詢<br/>依主索引鍵取得實體<br/>混合搜尋</td><td>向量搜尋 (ANN 搜尋)<br/>元資料篩選<br/>範圍搜尋<br/>標量查詢<br/>依主索引鍵取得實體<br/>混合搜尋</td></tr>
<tr><td>CRUD 操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>進階資料管理</td><td>不適用</td><td>存取控制<br/>磁碟分割<br/>磁碟分割金鑰</td><td>存取控制<br/>磁碟分割<br/>磁碟分割金鑰<br/>實體資源群組</td></tr>
<tr><td>一致性等級</td><td>強</td><td>強<br/>有限制的停滯性<br/>會話<br/>最終</td><td>強<br/>有限制的不穩定性<br/>會話<br/>最終</td></tr>
</tbody>
</table>
