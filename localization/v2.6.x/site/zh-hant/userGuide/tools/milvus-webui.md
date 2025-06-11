---
id: milvus-webui.md
summary: Milvus Web UI 是 Milvus 的圖形管理工具。它以簡單直觀的介面增強系統的可觀察性。您可以
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI 是 Milvus 的圖形管理工具。它以簡單直觀的介面增強系統的可觀察性。您可以使用 Milvus Web UI 觀察 Milvus 元件和相依性的統計和指標、檢查資料庫和收集的詳細資料，以及列出詳細的 Milvus 設定。</p>
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
    </button></h2><p>Milvus Web UI 與 Birdwatcher 和 Attu 的不同之處在於它是一個內建工具，以簡單直觀的介面提供整體系統的可觀察性。</p>
<p>下表比較 Milvus Web UI 和 Birdwatcher/Attu 的功能：</p>
<table>
<thead>
<tr><th>功能</th><th>Milvus Web UI</th><th>觀鳥者</th><th>鳥報</th></tr>
</thead>
<tbody>
<tr><td>操作形式</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>目標使用者</td><td>維護人員、開發人員</td><td>維護人員</td><td>開發人員</td></tr>
<tr><td>安裝</td><td>內建</td><td>獨立工具</td><td>獨立工具</td></tr>
<tr><td>相依性</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>主要功能</td><td>運行環境、資料庫/資料集細節、區段、頻道、任務和慢速查詢請求</td><td>元資料檢查和 Milvus API 執行</td><td>資料庫管理與作業任務</td></tr>
<tr><td>自</td><td>v2.5.0</td><td>v2.0.0</td><td>v0.1.8</td></tr>
</tbody>
</table>
<p>自v2.5.0起，您可以在運行中的Milvus實例上使用以下URL訪問Milvus Web UI：</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">功能<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI 提供以下功能：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 總覽</span> </span></p>
<ul>
<li><p><a href="#Home">首頁</a></p>
<p>您可以找到關於目前執行中的 Milvus 實例、其元件、連結的用戶端和相依性的資訊。</p></li>
<li><p><a href="#Collections">資料庫</a></p>
<p>您可以檢視目前在 Milvus 中的資料庫和集合清單，並檢查其詳細資訊。</p></li>
<li><p><a href="#Query">查詢</a></p>
<p>您可以查看查詢節點和查詢協調器在區段、通道、複製和資源群組方面收集的統計資料。</p></li>
<li><p><a href="#Data">資料</a></p>
<p>您可以檢視收集到的資料節點在區段和通道方面的統計資料。</p></li>
<li><p><a href="#Tasks">任務</a></p>
<p>您可以檢視在 Milvus 中執行的任務清單，包括 Querycoord 排程任務、壓縮任務、索引建立任務、匯入任務和資料同步任務。</p></li>
<li><p><a href="#Slow-requests">緩慢請求</a></p>
<p>您可以檢視 Milvus 中的慢速請求清單，包括請求類型、請求持續時間和請求參數。</p></li>
<li><p><a href="#Configurations">配置</a></p>
<p>您可以檢視 Milvus 配置清單及其值。</p></li>
<li><p><a href="#Tools">工具</a></p>
<p>您可以從 Web UI 存取兩個內建工具，pprof 和 Milvus 資料可視化工具。</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">首頁<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>在首頁，您可以找到以下資訊：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 首頁</span> </span></p>
<ul>
<li><p><strong>系統資訊</strong>：檢視系統資訊，包括部署模式、部署中使用的映像，以及相關資訊。</p></li>
<li><p><strong>元件資訊</strong>：檢視 Milvus 中元件的狀態和指標，包括查詢節點、資料節點、索引節點、協調器和代理的狀態和指標。</p></li>
<li><p><strong>已連接的用戶端</strong>：檢視已連接的用戶端及其資訊，包括 SDK 類型和版本、使用者名稱及其存取記錄。</p></li>
<li><p><strong>系統相依性</strong>：檢視 Milvus 依賴系統的狀態和指標，包括元儲存、訊息佇列和物件儲存的狀態和指標。</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">收藏集<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>在集合頁面，您可以檢視 Milvus 目前的資料庫和集合清單，並檢查它們的詳細資料。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 收藏集</span> </span></p>
<ul>
<li><p><strong>資料庫</strong>：檢視目前在 Milvus 中的資料庫清單及其詳細資訊。</p></li>
<li><p><strong>收藏集</strong>：檢視每個資料庫的收藏集清單及其詳細資訊。</p>
<p>您可以點擊一個集合來查看其詳細資訊，包括欄位數量、分區、索引和其他詳細資訊。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 集合詳細資訊</span> </span></p></li>
</ul>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 查詢頁面</span> </span></p>
<ul>
<li><p><strong>區段</strong>：檢視區段清單及其詳細資訊，包括區段 ID、對應的集合、狀態、大小等。</p></li>
<li><p><strong>頻道</strong>：檢視頻道清單及其詳細資訊，包括頻道名稱、對應的集合等。</p></li>
<li><p><strong>複製</strong>：檢視複製的清單及其詳細資訊，包括複製 ID、對應的集合等。</p></li>
<li><p><strong>資源群組</strong>：檢視資源群組清單及其詳細資訊，包括資源群組名稱、群組中的查詢節點數量及其配置等。</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">資料<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 資料頁面</span> </span></p>
<ul>
<li><p><strong>區段</strong>：檢視資料節點/協調器的區段清單及其詳細資訊，包括區段 ID、對應的集合、狀態、大小等。</p></li>
<li><p><strong>通道</strong>：檢視資料節點/協調員的頻道清單及其詳細資訊，包括頻道名稱、對應的集合等。</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">任務<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 任務頁面</span> </span></p>
<ul>
<li><p><strong>任務</strong>：檢視在 Milvus 中執行的任務清單，包括任務類型、狀態和動作。</p>
<ul>
<li><p><strong>QueryCoord 任務</strong>：檢視所有 QueryCoord 排程工作，包括過去 15 分鐘內的 balancer、index/segment/channel/leader 檢查工作。</p></li>
<li><p><strong>壓縮任務</strong>：檢視資料協調員在過去 15 分鐘內的所有壓縮任務。</p></li>
<li><p><strong>索引建立任務</strong>：檢視資料協調員在過去 30 分鐘內的所有索引建立工作。</p></li>
<li><p><strong>匯入任務</strong>：檢視資料協調員在過去 30 分鐘內的所有匯入工作。</p></li>
<li><p><strong>資料同步工作</strong>：檢視資料節點在過去 15 分鐘內的所有資料同步工作。</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">緩慢請求<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 慢速請求頁面</span> </span></p>
<ul>
<li><strong>慢速請求</strong>：慢速請求是指延遲時間超過設定中指定的<code translate="no">proxy.slowQuerySpanInSeconds</code> 值的搜尋或查詢。慢速請求清單顯示最近 15 分鐘內的所有慢速請求。</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">設定<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Milvus Web UI 配置頁面</span> </span></p>
<ul>
<li><strong>配置</strong>：檢視 Milvus 執行時設定清單及其值。</li>
</ul>
<h2 id="Tools" class="common-anchor-header">工具<button data-href="#Tools" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>pprof</strong>: 存取 pprof 工具，用於剖析和除錯 Milvus。</p></li>
<li><p><strong>Milvus 資料可視化工具</strong>：存取 Milvus 資料視覺化工具，以視覺化 Milvus 中的資料。</p></li>
</ul>
