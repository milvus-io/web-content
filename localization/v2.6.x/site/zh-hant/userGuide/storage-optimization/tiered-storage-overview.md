---
id: tiered-storage-overview.md
title: 分層儲存概述Compatible with Milvus 2.6.4+
summary: >-
  在 Milvus 中，傳統的完全載入模式要求每個 QueryNode
  在初始化時載入一個區段的所有模式欄位和索引，即使是可能永遠不會被存取的資料。這可確保資料的即時可用性，但通常會造成資源浪費，包括高記憶體使用率、大量磁碟活動以及顯著的
  I/O 開銷，尤其是在處理大型資料集時。
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">分層儲存概述<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，傳統的<strong>全載模式</strong>要求每個 QueryNode 在初始化時載入一個<a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">區段</a>的所有模式欄位和索引，即使是可能永遠不會被存取的資料。這可確保資料的即時可用性，但通常會造成資源浪費，包括高記憶體使用率、大量磁碟活動以及顯著的 I/O 開銷，尤其是在處理大型資料集時。</p>
<p><strong>分層儲存</strong>透過將資料快取與區段載入解耦來解決這個挑戰。Milvus 不再一次載入所有資料，而是引進一個快取層，區分熱資料 (本機快取) 和冷資料 (遠端儲存)。QueryNode 現在最初只載入輕量級的元資料，並依需求動態拉取或驅逐資料。這可大幅縮短載入時間、最佳化本機資源利用率，並使 QueryNode 能夠處理遠遠超過其實體記憶體或磁碟容量的資料集。</p>
<p>在下列情況下，您可以考慮啟用分層儲存：</p>
<ul>
<li><p>超過單一 QueryNode 可用記憶體或 NVMe 容量的資料集</p></li>
<li><p>分析或批次工作負載，其中較快的載入速度比首次查詢延遲更為重要</p></li>
<li><p>混合型工作負載，可容忍不常存取資料偶爾發生的快取記憶體遺漏</p></li>
</ul>
<div class="alert note">
<p>如需更多關於區段和區塊的詳細資訊，請參閱<a href="https://zilliverse.feishu.cn/wiki/IBX3w5p4Tipy1KkNxI6cbEOwnGf">區段說明</a>。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">如何運作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>分層儲存改變了 QueryNode 管理區段資料的方式。QueryNode 現在不再在載入時快取每個欄位和索引，而是只載入<strong>元資料</strong>，並使用快取層動態地取得和驅逐資料。</p>
<div class="alert note">
<p><strong>元資料</strong>包括模式、索引定義、塊映射、行數以及遠端物件的參照。這些資料都很小，而且永遠都會快取，也不會被驅逐。</p>
</div>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">全載模式與分層儲存模式的比較<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>雖然全載模式和分層儲存模式都處理相同的資料，但它們在 QueryNode 快取這些元件的時間和方式上有所不同。</p>
<ul>
<li><p><strong>全載模式</strong>：在載入時，QueryNode 會從物件儲存區快取完整的集合資料，包括元資料、欄位資料和索引。</p></li>
<li><p><strong>分層儲存模式</strong>：在載入時，QueryNode 只快取元資料。欄位資料會以小塊粒度按需取得。索引檔案會保持遠端狀態，直到第一次查詢需要它們為止；然後會取得並快取整個每區段索引。</p></li>
</ul>
<p>下圖顯示這些差異。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>完整載入模式 Vs 分層儲存模式</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">查詢節點載入工作流程<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>在分層儲存模式下，工作流程有三個階段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-loading-workflow.png" alt="Querynode Loading Workflow" class="doc-image" id="querynode-loading-workflow" />
   </span> <span class="img-wrapper"> <span>查詢節點載入工作流程</span> </span></p>
<h4 id="Lazy-load" class="common-anchor-header">懶惰載入</h4><p>在初始化時，Milvus 執行懶惰載入，僅快取包含模式定義、索引資訊、群組映射和行數的<strong>元資料</strong>。</p>
<p>在此階段不會下載欄位資料或索引檔案。這可快速查詢資料集，並將啟動時的資源使用降至最低。</p>
<p><strong>優點</strong></p>
<ul>
<li><p>大幅加快資料集載入時間</p></li>
<li><p>最小的記憶體和磁碟佔用空間</p></li>
<li><p>可讓查詢節點同時處理更多區段</p></li>
</ul>
<p><strong>設定</strong></p>
<p>啟用分層儲存時會自動套用。不需要手動設定。</p>
<h4 id="Partial-load" class="common-anchor-header">部分載入</h4><p>當查詢或搜尋作業開始時，查詢節點會執行部分載入，僅從物件儲存中取得所需的欄位區塊或索引，並暫時快取這些欄位區塊或索引以供重複使用。</p>
<ul>
<li><p><strong>欄位</strong>：按需求載入<strong>欄位</strong>區塊層級</p></li>
<li><p><strong>索引：</strong>在<strong>段</strong>層級首次存取時載入</p></li>
</ul>
<p><strong>優點</strong></p>
<ul>
<li><p>減少記憶體和磁碟壓力</p></li>
<li><p>允許 Milvus 有效率地查詢大型資料集</p></li>
<li><p>平衡查詢延遲與資源效率</p></li>
</ul>
<p><strong>配置</strong></p>
<p>部分載入是啟用分層儲存的預設行為。若要盡量減少關鍵欄位或索引的首次命中延遲，請使用「預<strong>熱」</strong>功能在查詢前預先載入資料。有關設定範例，請參閱「<a href="/docs/zh-hant/warm-up.md">預熱</a>」。</p>
<h4 id="Eviction" class="common-anchor-header">驅逐</h4><p>為了維持健康的資源使用，Milvus 會在達到臨界值時自動釋放未使用的快取資料。</p>
<p>遷出遵循<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">最近最少使用 (LRU)</a>策略，並由可設定的參數管理：</p>
<ul>
<li><p><strong>水印：</strong>定義開始和停止驅逐的臨界值</p></li>
<li><p><strong>快取 TTL：</strong>在定義的持續時間後移除過時的快取項目</p></li>
<li><p><strong>超量認購比率：</strong>在驅逐加速之前允許暫時的超量訂購</p></li>
</ul>
<p><strong>優點</strong></p>
<ul>
<li><p>在不同的工作負載中保持快取記憶體使用率穩定</p></li>
<li><p>最大化快取重複使用，同時防止當機</p></li>
<li><p>長時間維持可預期的效能</p></li>
</ul>
<p><strong>設定</strong></p>
<p>在<code translate="no">milvus.yaml</code> 中啟用和調整驅逐參數。詳細設定請參閱<a href="/docs/zh-hant/eviction.md">驅逐</a>。</p>
<h2 id="Getting-started" class="common-anchor-header">開始使用<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>具有專用記憶體和磁碟資源的 QueryNodes</p></li>
<li><p>物件儲存後端 (S3、MinIO 等)</p></li>
</ul>
<div class="alert warning">
<p>QueryNode 資源不應與其他工作負載共享。共用資源會導致 Tiered Storage 錯誤判斷可用容量，導致當機。</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">基本配置範本<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>編輯 Milvus 配置檔案 (<code translate="no">milvus.yaml</code>) 以設定 Tiered Storage 設定：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>設定預熱</strong>- 優化存取模式的預載。請參閱「<a href="/docs/zh-hant/warm-up.md">預熱</a>」。</p></li>
<li><p><strong>Tune Eviction</strong>- 為您的資源限制設定適當的水印和 TTL。請參閱<a href="/docs/zh-hant/eviction.md">驅逐</a>。</p></li>
<li><p><strong>監控效能</strong>- 追蹤快取點擊率、遷出頻率和查詢延遲模式。</p></li>
<li><p><strong>迭代組態</strong>- 根據觀察到的工作負載特性調整設定。</p></li>
</ol>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">我可以在執行時變更分層儲存參數嗎？<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>不可以。所有參數必須在啟動 Milvus 之前在<code translate="no">milvus.yaml</code> 設定。變更需要重新啟動才能生效。</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">分層儲存會影響資料持久性嗎？<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>不會。資料持久性仍由遠端物件儲存處理。Tiered Storage 只管理 QueryNodes 上的快取。</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">使用 Tiered Storage，查詢速度是否總是更快？<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>不一定。Tiered Storage 可以減少載入時間和資源使用量，但接觸未快取（冷）資料的查詢可能會出現較高的延遲。對於延遲敏感的工作負載，建議使用全載模式。</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">為什麼即使啟用了分層儲存，QueryNode 仍會耗盡資源？<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>兩個常見原因：</p>
<ul>
<li><p>QueryNode 配置的資源太少。水印是相對於可用資源而言的，因此配置不足會擴大錯誤的判斷。</p></li>
<li><p>QueryNode 資源與其他工作負載共享，因此 Tiered Storage 無法正確評估實際可用容量。</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">為什麼有些查詢會在高併發下失敗？<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>如果太多查詢同時命中熱資料，QueryNode 資源限制仍可能會被超出。某些線程可能會因為資源預約超時而失敗。在負載降低後重試，或分配更多資源，可以解決這個問題。</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">啟用分層儲存後，為何搜尋/查詢延遲會增加？<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>可能的原因包括</p>
<ul>
<li><p>頻繁查詢冷資料，而冷資料必須從儲存中取得。</p></li>
<li><p>超量承載比率過高，導致頻繁驅逐。</p></li>
<li><p>水印設定太靠近，導致頻繁同步驅逐。</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">分層儲存是否可以透過過度提交快取記憶體來處理無限制的資料？<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>過度提交比率允許 QueryNode 處理比實體記憶體允許的更多區段，但是過高的比率可能會導致頻繁驅逐、快取激增或查詢失敗。</p>
