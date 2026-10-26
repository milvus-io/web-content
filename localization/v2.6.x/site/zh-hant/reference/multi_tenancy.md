---
id: multi_tenancy.md
title: 實作多租戶架構
summary: 在 Milvus 中，多租戶模式意指多個客戶或團隊（稱為「租戶」）共用同一個叢集，同時維持各自隔離的資料環境。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">實作多租戶架構<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，多租戶意指多個客戶或團隊（稱為「<strong>租戶</strong>」）共用同一個叢集，同時維持各自隔離的資料環境。</p>
<p>Milvus 支援四種多租戶策略，每種策略在可擴展性、資料隔離與靈活性之間都有不同的權衡取捨。本指南將帶您逐步了解每種選項，協助您為您的使用情境選擇最適合的策略。</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">多租戶策略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援四種層級的多租戶架構：<strong>資料庫</strong>、<strong>集合</strong>、<strong>區隔及</strong> <strong>區隔鍵</strong>。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">資料庫層級的多租戶<button data-href="#Database-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>在資料庫層級的多租戶架構中，每個租戶都會獲得一個對應的<a href="/docs/zh-hant/v2.6.x/manage_databases.md">資料庫</a>，其中包含一個或多個集合。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" /> 
   <span>資料庫層級的多租戶</span>
  
 </span></p>
<ul>
<li><p><strong>可擴展性</strong>：預設情況下，資料庫層級的多租戶策略最多可支援 64 個租戶。</p></li>
<li><p><strong>資料隔離</strong>：每個資料庫中的資料完全分離，提供企業級的資料隔離，非常適合受監管的環境或具有嚴格合規需求的客戶。</p></li>
<li><p><strong>靈活性</strong>：每個資料庫可包含具有不同資料結構的集合，提供高度靈活的資料組織方式，並允許每個租戶擁有自己的資料結構。</p></li>
<li><p><strong>其他</strong>：此策略亦支援基於角色的存取控制（RBAC），可針對每個租戶進行細粒度的使用者存取控制。此外，您可針對特定租戶靈活載入或釋放資料，以有效管理熱資料與冷資料。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">集合層級的多租戶架構<button data-href="#Collection-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>透過集合層級的多租戶架構，每個租戶都會被指派<a href="/docs/zh-hant/v2.6.x/manage-collections.md">一個集合，</a>從而提供強大的資料隔離能力。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" /> 
   <span>集合層級多租戶</span>
  
 </span></p>
<ul>
<li><p><strong>可擴展性</strong>：由於叢集預設最多可容納 65,536 個集合，此策略可在叢集內容納相同數量的租戶。</p></li>
<li><p><strong>資料隔離</strong>：各集合在物理層面上彼此隔離。此策略可提供強大的資料隔離能力。</p></li>
<li><p><strong>靈活性</strong>：此策略允許每個集合擁有專屬的資料結構，可支援具有不同資料結構的租戶。</p></li>
<li><p><strong>其他</strong>：此策略亦支援基於角色的存取控制（RBAC），可對租戶實施細粒度的存取控制。此外，您可針對特定租戶靈活載入或釋放資料，以有效管理熱資料與冷資料。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">分區層級的多租戶架構<button data-href="#Partition-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>在分區層級的多租戶架構中，每個租戶都會被指派至共用集合內一個手動建立<a href="/docs/zh-hant/v2.6.x/manage-partitions.md">的分區</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" /> 
   <span>分區層級多租戶</span>
  
 </span></p>
<ul>
<li><p><strong>可擴展性</strong>：每個集合最多可包含 1,024 個分區，因此可容納相同數量的租戶。</p></li>
<li><p><strong>資料隔離</strong>：各租戶的資料透過分區在物理層面上相互隔離。</p></li>
<li><p><strong>靈活性</strong>：此策略要求所有租戶共用相同的数据模式。此外，分區需手動建立。</p></li>
<li><p><strong>其他</strong>：分區層級不支援基於角色的存取控制（RBAC）。租戶資料可單獨查詢，亦可跨多個分區進行查詢，這使得此方法非常適合涉及跨租戶區段的彙總查詢或分析情境。此外，您可以靈活地為特定租戶載入或釋放資料，以有效管理熱資料與冷資料。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">分區鍵層級的多租戶架構<button data-href="#Partition-key-level-multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h3><p>採用此策略時，所有租戶共用單一集合與資料結構，但每個租戶的資料會根據<a href="/docs/zh-hant/v2.6.x/use-partition-key.md">分區鍵值</a>，自動路由至 16 個物理上相互隔離的分區。雖然每個物理分區可能包含多個租戶，但來自不同租戶的資料在邏輯上仍保持分離。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" /> 
   <span>分區鍵層級的多租戶架構</span>
  
 </span></p>
<ul>
<li><p><strong>可擴展性</strong>：分區鍵層級策略提供最具可擴展性的方案，可支援數百萬個租戶。</p></li>
<li><p><strong>資料隔離</strong>：由於多個租戶可能共用同一個實體分區，此策略提供的資料隔離程度相對較弱。</p></li>
<li><p><strong>靈活性</strong>：由於所有租戶必須共用相同資料結構，此策略提供的資料靈活性有限。</p></li>
<li><p><strong>其他</strong>：分區鍵層級不支援基於角色的存取控制（RBAC）。租戶資料可單獨查詢，亦可跨多個分區進行查詢，這使得此方法非常適合涉及跨租戶區段的彙總查詢或分析的場景。</p></li>
</ul>
<div class="alert note">
<p>我們建議您在分區鍵欄位上建立標量索引。由於每個實體分區都包含多個租戶，Milvus 會針對搜尋分區中的每個實體評估租戶篩選條件；若未建立索引，此過程將進行全表掃描。詳細資訊請參閱《<a href="/docs/zh-hant/v2.6.x/use-partition-key.md#Index-Partition-Key">索引分區鍵》</a>。</p>
</div>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">選擇合適的多租戶策略<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表針對四種層級的多租戶策略提供了全面的比較。</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>資料庫層級</strong></p></th>
     <th><p><strong>集合層級</strong></p></th>
     <th><p><strong>分區層級</strong></p></th>
     <th><p><strong>分區鍵層級</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>資料隔離</strong></p></td>
     <td><p>物理層級</p></td>
     <td><p>物理</p></td>
     <td><p>實體實體</p></td>
     <td><p>物理 + 邏輯</p></td>
   </tr>
   <tr>
     <td><p><strong>租戶最大數量</strong></p></td>
     <td><p>預設為 64。您可以透過修改 Milvus.yaml 配置檔案中的<code translate="no">maxDatabaseNum</code> 參數來增加此數值。 </p></td>
     <td><p>預設為 65,536。您可以透過修改 Milvus.yaml 設定檔中的<code translate="no">maxCollectionNum</code> 參數來增加此數值。</p></td>
     <td><p>每個集合最多 1,024 個。 </p></td>
     <td><p>數百萬</p></td>
   </tr>
   <tr>
     <td><p><strong>資料架構的靈活性</strong></p></td>
     <td><p>高</p></td>
     <td><p>中等</p></td>
     <td><p>低</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p><strong>是否支援 RBAC</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>否</p></td>
     <td><p>否</p></td>
   </tr>
   <tr>
     <td><p><strong>搜尋效能</strong></p></td>
     <td><p>強</p></td>
     <td><p>強</p></td>
     <td><p>中等</p></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p><strong>支援跨租戶搜尋</strong></p></td>
     <td><p>不</p></td>
     <td><p>不</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>支援有效處理熱數據與冷數據</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>否目前不支援分區鍵層級的策略。</p></td>
   </tr>
</table>
<p>在 Milvus 中選擇多租戶策略時，有幾個因素需要考慮。</p>
<ol>
<li><p><strong>可擴展性：</strong>分區鍵 &gt; 分區 &gt; 集合 &gt; 資料庫</p>
<p>若預期需支援極大量租戶（數百萬或更多），請使用分區鍵層級策略。</p></li>
<li><p><strong>嚴格的資料隔離要求</strong>：資料庫 = 集合 &gt; 分區 &gt; 分區鍵</p>
<p>若您有嚴格的物理資料隔離需求，請選擇資料庫、集合或分區層級的策略。</p></li>
<li><p><strong>各租戶資料的靈活資料結構：</strong>資料庫 &gt; 集合 &gt; 分區 = 分區鍵</p>
<p>資料庫層級與集合層級的策略可提供資料結構的完全彈性。若您的租戶資料結構各不相同，請選擇資料庫層級或集合層級的多租戶架構。</p></li>
<li><p><strong>其他</strong></p>
<ol>
<li><p><strong>效能：</strong>搜尋效能取決於多種因素，包括索引、搜尋參數及機器配置。Milvus 亦支援效能調校。建議在選擇多租戶策略前，先測試實際效能。</p></li>
<li><p><strong>有效處理熱數據與冷數據</strong>：目前，資料庫層級、集合層級及分區層級策略均支援熱數據與冷<strong>數據的</strong>處理。</p></li>
<li><p><strong>跨租戶搜尋</strong>：僅分區層級與分區鍵層級策略支援跨租戶查詢。</p></li>
</ol></li>
</ol>
