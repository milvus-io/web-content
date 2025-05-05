---
id: multi_tenancy.md
title: 實施多租戶
summary: 在 Milvus 中，多租户意味着多个客户或团队（称为租户）共享同一个集群，同时保持隔离的数据环境。
---
<h1 id="Implement-Multi-tenancy" class="common-anchor-header">實施多租戶<button data-href="#Implement-Multi-tenancy" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，多租戶是指多個客戶或團隊（稱為<strong>租戶）</strong>共用同一集群，同時保持隔離的資料環境。</p>
<p>Milvus 支援四種多租戶策略，每種策略都在可擴展性、資料隔離和靈活性之間提供不同的權衡。本指南將介紹每個選項，協助您選擇最適合您使用個案的策略。</p>
<h2 id="Multi-tenancy-strategies" class="common-anchor-header">多租用策略<button data-href="#Multi-tenancy-strategies" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援四個層級的多租戶：<strong>資料庫</strong>、<strong>資料集</strong>、<strong>分區</strong>和<strong>分區鑰匙</strong>。</p>
<h3 id="Database-level-multi-tenancy" class="common-anchor-header">資料庫層級多租戶</h3><p>使用資料庫級多租戶，每個租戶都會收到一個對應的<a href="/docs/zh-hant/manage_databases.md">資料庫</a>，其中包含一個或多個集合。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/database-level-multi-tenancy.png" alt="Database Level Multi Tenancy" class="doc-image" id="database-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>資料庫層級多租戶</span> </span></p>
<ul>
<li><p><strong>可擴展性</strong>：資料庫層級多租戶策略預設最多支援 64 個租戶。</p></li>
<li><p><strong>資料隔離</strong>：每個資料庫中的資料完全分離，提供企業級的資料隔離，非常適合受監管的環境或有嚴格合規需求的客戶。</p></li>
<li><p><strong>彈性</strong>：每個資料庫都可以擁有不同模式的集合，提供高度彈性的資料組織，並允許每個租戶擁有自己的資料模式。</p></li>
<li><p><strong>其他</strong>：此策略也支援 RBAC，可針對每個租戶的使用者存取進行精細控制。此外，您可以彈性載入或釋放特定租戶的資料，以有效管理冷熱資料。</p></li>
</ul>
<h3 id="Collection-level-multi-tenancy" class="common-anchor-header">集合層級多重租用</h3><p>使用集合層級多租戶功能，每個租戶都會被指派一個<a href="/docs/zh-hant/manage-collections.md">集合</a>，提供強大的資料隔離功能。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-level-multi-tenancy.png" alt="Collection Level Multi Tenancy" class="doc-image" id="collection-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>集合層級多租戶</span> </span></p>
<ul>
<li><p><strong>可擴充性</strong>：由於群集預設最多可容納 65,536 個集合，因此此策略可在群集中容納相同數量的租戶。</p></li>
<li><p><strong>資料隔離</strong>：資料集彼此實體隔離。此策略提供強大的資料隔離。</p></li>
<li><p><strong>彈性</strong>：此策略允許每個集合擁有自己的模式，可容納不同資料模式的租戶。</p></li>
<li><p><strong>其他</strong>：此策略也支援 RBAC，允許對租戶進行細粒度存取控制。此外，您可以彈性載入或釋放特定租戶的資料，以有效管理冷熱資料。</p></li>
</ul>
<h3 id="Partition-level-multi-tenancy" class="common-anchor-header">分割層級多重租用</h3><p>在磁碟分割層級多重租用中，每個租戶都會被指派到共用集合中手動建立的<a href="/docs/zh-hant/manage-partitions.md">磁碟分割</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-level-multi-tenancy.png" alt="Partition Level Multi Tenancy" class="doc-image" id="partition-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>分割層級多重租用</span> </span></p>
<ul>
<li><p><strong>可擴充性</strong>：每個集合最多可容納 1,024 個分割區，讓其中的租戶數目相同。</p></li>
<li><p><strong>資料隔離</strong>：每個租戶的資料都由分割區實際分隔。</p></li>
<li><p><strong>彈性</strong>：此策略要求所有租戶共用相同的資料模式。而且需要手動建立分區。</p></li>
<li><p><strong>其他</strong>：分區層級不支援 RBAC。租戶可以單獨或跨多個分區進行查詢，這使得此方法非常適合涉及跨租戶區段的聚合查詢或分析的場景。此外，您可以彈性載入或釋放特定租戶的資料，以有效管理冷熱資料。</p></li>
</ul>
<h3 id="Partition-key-level-multi-tenancy" class="common-anchor-header">分區鑰匙層級多租戶</h3><p>使用此策略，所有租戶共用單一集合和模式，但每個租戶的資料會根據<a href="/docs/zh-hant/use-partition-key.md">分割區金鑰值</a>自動路由至 16 個實體隔離的分割區。雖然每個實體磁碟分割可包含多個租戶，但不同租戶的資料在邏輯上仍是分開的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-key-level-multi-tenancy.png" alt="Partition Key Level Multi Tenancy" class="doc-image" id="partition-key-level-multi-tenancy" />
   </span> <span class="img-wrapper"> <span>分割區金鑰層級多租戶</span> </span></p>
<ul>
<li><p><strong>可擴充性</strong>：磁碟分割金鑰層級策略提供最具擴充能力的方法，可支援數百萬個租戶。</p></li>
<li><p><strong>資料隔離</strong>：此策略提供相對較弱的資料隔離，因為多位租戶可以共用一個實體磁碟分割。</p></li>
<li><p><strong>彈性</strong>：由於所有租戶必須共用相同的資料模式，因此此策略提供的資料彈性有限。</p></li>
<li><p><strong>其他</strong>：分區鑰匙層級不支援 RBAC。租戶可以單獨或跨越多個分區進行查詢，這使得此方法非常適合涉及跨租戶區段的聚合查詢或分析的場景。</p></li>
</ul>
<h2 id="Choosing-the-right-multi-tenancy-strategy" class="common-anchor-header">選擇正確的多租戶策略<button data-href="#Choosing-the-right-multi-tenancy-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>下表全面比較了四種層級的多租戶策略。</p>
<table>
   <tr>
     <th></th>
     <th><p><strong>資料庫層級</strong></p></th>
     <th><p><strong>資料集層級</strong></p></th>
     <th><p><strong>分割層級</strong></p></th>
     <th><p><strong>分割鑰匙層級</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>資料隔離</strong></p></td>
     <td><p>物理層級</p></td>
     <td><p>實體</p></td>
     <td><p>實體</p></td>
     <td><p>物理 + 邏輯</p></td>
   </tr>
   <tr>
     <td><p><strong>最大租戶數</strong></p></td>
     <td><p>預設為 64。您可以透過修改 Milvus.yaml 配置檔案中的<code translate="no">maxDatabaseNum</code> 參數來增加它。 </p></td>
     <td><p>預設為 65,536。您可以透過修改 Milvus.yaml 配置檔案中的<code translate="no">maxCollectionNum</code> 參數來增加。</p></td>
     <td><p>每個集合最多 1,024 個。 </p></td>
     <td><p>百萬</p></td>
   </tr>
   <tr>
     <td><p><strong>資料模式彈性</strong></p></td>
     <td><p>高</p></td>
     <td><p>中</p></td>
     <td><p>低</p></td>
     <td><p>低</p></td>
   </tr>
   <tr>
     <td><p><strong>RBAC 支援</strong></p></td>
     <td><p>是</p></td>
     <td><p>有</p></td>
     <td><p>不支援</p></td>
     <td><p>不支援</p></td>
   </tr>
   <tr>
     <td><p><strong>搜尋效能</strong></p></td>
     <td><p>強</p></td>
     <td><p>強</p></td>
     <td><p>中等</p></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p><strong>跨租户搜索支持</strong></p></td>
     <td><p>無</p></td>
     <td><p>不支援</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>支援有效處理冷熱資料</strong></p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>是</p></td>
     <td><p>No 目前不支援分割區金鑰層級策略。</p></td>
   </tr>
</table>
<p>當您選擇 Milvus 的多租戶策略時，有幾個因素需要考慮。</p>
<ol>
<li><p><strong>擴充性：</strong>分割區金鑰 &gt; 分割區 &gt; 集合 &gt; 資料庫</p>
<p>如果您預期會支援非常多的租戶 (數百萬或更多)，請使用分割區金鑰層級策略。</p></li>
<li><p><strong>強大的資料隔離需求</strong>：資料庫 = 資料集 &gt; 磁碟分割 &gt; 磁碟分割金鑰</p>
<p>如果您有嚴格的實體資料隔離要求，請選擇資料庫、集合或磁碟分割層級策略。</p></li>
<li><p><strong>每個租戶資料的彈性資料模式：</strong>資料庫 &gt; 資料集 &gt; 磁碟分割 = 磁碟分割金鑰</p>
<p>資料庫層級和資料集層級策略提供完全彈性的資料模式。如果您租戶的資料結構不同，請選擇資料庫層級或集合層級的多重租用。</p></li>
<li><p><strong>其他</strong></p>
<ol>
<li><p><strong>效能：</strong>搜尋效能取決於各種因素，包括索引、搜尋參數和機器配置。Milvus 也支援效能調整。建議您在選擇多租用策略前，先測試實際效能。</p></li>
<li><p><strong>有效處理冷熱資料</strong>：目前，資料庫層級、集合層級和分割區層級的策略都支援冷熱資料處理。</p></li>
<li><p><strong>跨租用戶搜尋</strong>：只有磁碟分割層級和磁碟分割 key 層級策略支援跨租客查詢。</p></li>
</ol></li>
</ol>
