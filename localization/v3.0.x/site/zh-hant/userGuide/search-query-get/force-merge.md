---
id: force-merge.md
title: 強制合併壓縮Compatible with Milvus 3.0.x
summary: 使用強制合併壓縮功能來整合小型區段，藉此提升查詢效能與儲存效率。
beta: Milvus 3.0.x
---
<h1 id="Force-Merge-Compaction" class="common-anchor-header">強制合併壓縮<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>「強制合併」旨在將小型且碎片化的區段整合為數量較少且較大的區段，以提升查詢效能與儲存效率。本指南說明如何使用強制合併壓縮功能。</p>
<div class="alert note">
<p>此功能目前處於公開預覽階段。請勿在生產環境中使用。</p>
</div>
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
    </button></h2><p>標準<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">壓縮會</a>透過多對一合併，將區段大小維持在接近設定的<code translate="no">maxSize</code> ，但仍可能留下中型碎片，若要進一步合併這些碎片，可能會超過限制。 例如，如下圖所示，若某個集合有五個 2 MB 的區段，且 `<code translate="no">maxSize</code> ` 設定為 3 MB，則合併任意兩個區段都會超過此限制，因此標準壓縮無法進一步減少區段數量，碎片化的佈局仍將存在。</p>
<p>強制合併新增了<code translate="no">target_size</code> 參數，並在可能的情況下，支援將區段重新組織為目標大小，且容差範圍極小。 如下圖所示，若指定的<code translate="no">target_size</code> 為 4 MB，則可將這五個 2 MB 的小區段進一步合併為較少數的較大區段。此舉可減少多餘的區段數量、支援大於預設<code translate="no">maxSize</code> 設定的目標值，且當目標值非常大時，可讓系統根據當前硬體與 QueryNode 拓撲，選擇實用的輸出大小與區段數量。</p>
<p>若要了解應使用哪種壓縮方法，請參閱<a href="#faq">常見問題解答 (FAQ)</a>。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" /> 
   <span>R8eow3kaqhktokblcmocnvxmnee</span>
  
 </span></p>
<p>強制合併壓縮擴展了現有的 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a> API 並新增了 `<code translate="no">target_size</code> ` 參數。此方法完全向後相容：未包含 `<code translate="no">target_size</code> ` 的現有壓縮呼叫仍會如常運作。</p>
<p>強制合併以非同步方式運作。雖然執行期間會消耗 I/O 和記憶體資源，但不會阻塞搜尋或查詢操作。</p>
<h2 id="Use-Force-Merge-Compaction" class="common-anchor-header">使用強制合併壓縮<button data-href="#Use-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
<li><p>Milvus 3.0 或更新版本</p></li>
<li><p>PyMilvus 3.0 或更高版本</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">全域設定<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>以下配置參數用於控制「強制合併」的運作行為。請在 Milvus 配置檔案中設定這些參數，或透過環境變數進行設定。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">segment:</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">512</span>         <span class="hljs-comment"># Default segment max size (MB).</span>
                         <span class="hljs-comment"># Used when target_size is 0 or omitted.</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">maxFullSegmentThreshold:</span> <span class="hljs-number">100</span>
                         <span class="hljs-comment"># When segment count exceeds this threshold,</span>
                         <span class="hljs-comment"># a faster greedy algorithm is used instead</span>
                         <span class="hljs-comment"># of the standard merge algorithm.</span>
    <span class="hljs-attr">forceMerge:</span>
      <span class="hljs-attr">datanodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># DataNode memory divided by this factor</span>
                         <span class="hljs-comment"># determines the the largest segment</span>
                         <span class="hljs-comment"># size the system can allow.</span>
      <span class="hljs-attr">querynodeMemoryFactor:</span> <span class="hljs-number">4.0</span>
                         <span class="hljs-comment"># Minimum QueryNode memory divided by this</span>
                         <span class="hljs-comment"># factor. Used in automatic size calculation</span>
                         <span class="hljs-comment"># to ensure merged segments can be loaded.</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>預設值</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.segment.maxSize</code></p></td>
     <td><p>1024</p></td>
     <td><p>預設區段最大大小（單位：MB）。當 `<code translate="no">target_size</code> ` 為 0 或未指定時，此值將作為目標。同時也是顯式設定 `<code translate="no">target_size</code>` 時允許的最小值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>用於演算法選擇的分段數閾值。當分段數超過此值時，Milvus 會採用較快的貪婪演算法進行合併規劃。</p><ul><li><p><strong>標準演算法</strong>（當區段數 &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 時使用）：可產生更最佳化的合併結果，但運算時間較長。</p></li><li><p><strong>貪婪演算法</strong>（當區段數 &gt;<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 時使用）：規劃速度明顯更快，但會導致區段分組的優化程度略低。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>系統會將 DataNode 的記憶體除以此係數，以計算系統所能容許的最大區段大小。</p><ul><li><p>較大的數值會為合併分配較少的記憶體，但為其他 DataNode 操作保留更多記憶體，從而提高節點的穩定性。</p></li><li><p>較小的值可進行更大的合併，但會增加記憶體壓力。</p></li><li><p>例如，若預設係數為 4.0，且 DataNode 具備 16 GB 記憶體，則合併預算為 4 GB。這表示單次操作中合併的區段總大小不得超過 4 GB。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>QueryNode 的最小記憶體將被此係數除以。用於自動大小計算（<code translate="no">target_size=max_int64</code> ）期間，以確保合併後的區段能被 QueryNodes 載入。</p><ul><li><p>數值越大，產生的區段越小，QueryNode 便越容易載入。</p></li><li><p>較小的數值雖可產生較大的區段，但可能會導致記憶體受限的 QueryNodes 發生載入失敗。</p></li><li><p>舉例來說，若預設係數為 4.0，且最小的 QueryNode 具備 16 GB 記憶體，則自動計算出的目標大小將不會超過 4 GB。此設定可防止「強制合併」產生過大的區段，導致 QueryNodes 無法載入。</p></li></ul></td>
   </tr>
</table>
<p>若要將上述變更套用至您的 Milvus 叢集，請依照《<a href="/docs/zh-hant/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 配置 Milvus</a>》及《<a href="/docs/zh-hant/configure_operator.md">使用 Milvus Operators 配置 Milvus</a>》中的步驟操作。</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">觸發強制合併（Force Merge）壓縮<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>您可透過呼叫 `<code translate="no">compact()</code> ` 並傳入 `<code translate="no">target_size</code> ` 參數來觸發強制合併壓縮。有關參數的詳細資訊，請參閱下方的「<a href="#parameter-reference">參數參考」</a>。</p>
<p>目前提供三種強制合併壓縮模式：</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 1024 MB)
│  Equivalent to standard compaction
│
├─ Mode 2: target_size = 2048
│  Merges segments to ~2 GB each
│  Must be &gt;= config maxSize
│
└─ Mode 3: target_size = max_int64
   Auto-calculates optimal size based on
   segment distribution and node memory
<button class="copy-code-btn"></button></code></pre>
<p>以下範例將說明如何使用每種強制合併壓縮模式。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">預設（標準壓縮）</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 1024 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">顯式目標大小</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">自動大小計算</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">參數參考</h4><p>下表說明各項參數。</p>
<table>
   <tr>
     <th><p><strong>參數</strong></p></th>
     <th><p><strong>類型</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>必填。要進行壓縮的集合名稱。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>可選。目標區段大小（單位：MB）。此參數值有 3 種選項：</p><ul><li><p><strong>0 或省略</strong>：使用已設定的<code translate="no">dataCoord.segment.maxSize</code> （預設值：1024 MB）。等同於標準壓縮。</p></li><li><p><strong>明確值</strong>：將區段合併至約為指定大小（以 MB 為單位，例如 2048）。必須大於或等於已設定的<code translate="no">dataCoord.segment.maxSize</code> 。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)</strong>：根據當前分段分布及可用節點資源，自動計算最佳大小。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>若指定的<code translate="no">target_size</code> 小於已設定的<code translate="no">dataCoord.segment.maxSize</code> ，則會以錯誤訊息拒絕該請求。</p>
</div>
<h3 id="Check-Compaction-Progress" class="common-anchor-header">檢查壓縮進度<button data-href="#Check-Compaction-Progress" class="anchor-icon" translate="no">
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
    </button></h3><p>強制合併（Force Merge）壓縮會以非同步方式執行。請使用回傳的作業 ID 檢查進度：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">最佳實務<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>請勿在生產環境中使用強制合併壓縮。</strong></p></li>
<li><p><strong>在大多數情況下，請使用自動大小計算模式。</strong>將 `<code translate="no">target_size</code> ` 設定為 `<code translate="no">max_int64</code> `，可讓 Milvus 分析您的分段分佈和節點資源，以確定最佳大小。除非您有特定的尺寸要求，否則這是建議的做法。</p></li>
<li><p><strong>請權衡效能取捨。</strong>強制合併壓縮是一項資源密集型操作，其會讀取、合併並重寫分段資料。請安排在流量較低的時段執行，以將對查詢延遲的影響降至最低。</p></li>
<li><p><strong>請監控緊縮前後的分段數量。</strong>使用<code translate="no">get_compaction_state()</code> 和<code translate="no">list_persistent_segments</code> 確認緊縮操作是否如預期般產生較少且較大的分段。</p></li>
</ul>
<p><a id="faq"></a></p>
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
    </button></h2><p><strong>「強制合併」與標準壓縮有何不同？</strong></p>
<p>這兩種壓縮操作的用途不同。</p>
<ul>
<li><p>標準壓縮（targetSize=0 或省略）是一種盡力而為的增量清理路徑。</p></li>
<li><p>強制合併（targetSize&gt;0）是一種集合層級的重新封裝路徑，旨在產生數量較少、大小較大且接近目標大小的區段。</p></li>
</ul>
<p>關鍵差異在於合併形式：標準壓縮在每個任務中實質上是 m → 1，而強制合併則是跨分組輸入的 m → n。這正是為什麼強制合併能夠解決標準壓縮無法處理的區段佈局問題。下表比較了這兩種操作類型。</p>
<table>
   <tr>
     <th><p><strong>維度</strong></p></th>
     <th><p><strong>標準壓縮（預設）</strong></p></th>
     <th><p><strong>強制合併</strong></p></th>
   </tr>
   <tr>
     <td><p>API 觸發條件</p></td>
     <td><p>targetSize=0（或未設定），無 Major/L0 標誌</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主要目標</p></td>
     <td><p>對明顯的碎片進行增量清理；例行維護</p></td>
     <td><p>針對搜尋與平衡進行全集合範圍的整合</p></td>
   </tr>
   <tr>
     <td><p>區段大小的來源</p></td>
     <td><p>固定值 dataCoord.segment.maxSize（伺服器設定）</p></td>
     <td><p>使用者設定的 targetSize，隨後會根據 maxSafeSize 進行安全限制</p></td>
   </tr>
   <tr>
     <td><p>參數有效性</p></td>
     <td><p>不允許使用者調整大小</p></td>
     <td><p>使用者設定的 targetSize 必須 ≥ dataCoord.segment.maxSize；否則將被拒絕</p></td>
   </tr>
   <tr>
     <td><p>安全上限</p></td>
     <td><p>僅限配置上限</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor（獨立執行且未進行池化時：再減半）</p></td>
   </tr>
   <tr>
     <td><p>合併形狀</p></td>
     <td><p>m → 每項任務 1 個，輸出 &lt;= configMaxSize</p></td>
     <td><p>m → n，輸出接近 targetSize</p></td>
   </tr>
   <tr>
     <td><p>中等區段行為</p></td>
     <td><p>可能永久卡住（例如，兩個 60% 的區段無法合法地合併成一個 120% 的區段）</p></td>
     <td><p>重新打包 + 分割可行；不會出現「卡在 60%」的模式</p></td>
   </tr>
   <tr>
     <td><p>集合扁平化能力</p></td>
     <td><p>有限；重複執行仍可能留下許多中型區段</p></td>
     <td><p>強；旨在減少區段數量並提升填充率</p></td>
   </tr>
   <tr>
     <td><p>拓撲感知能力</p></td>
     <td><p>無</p></td>
     <td><p>有；採用 QueryNode/副本/分片佈局</p></td>
   </tr>
   <tr>
     <td><p>讀取路徑並行度調校</p></td>
     <td><p>無</p></td>
     <td><p>在有效時，使用 queryNodeCount / (副本數 × 分片數) 來調整輸出數量</p></td>
   </tr>
   <tr>
     <td><p>典型使用情境</p></td>
     <td><p>寫入／刪除後的高流失率每日清理</p></td>
     <td><p>效能測試準備、搜尋優化、負載與並行度的對齊</p></td>
   </tr>
   <tr>
     <td><p>預期範圍</p></td>
     <td><p>請勿預期會進行全集合重新封裝</p></td>
     <td><p>旨在實現收集層級的重新封裝結果</p></td>
   </tr>
</table>
<p><strong>選擇指引：</strong></p>
<ul>
<li><p>若需低風險的增量清理，請選擇標準緊縮。</p></li>
<li><p>當您明確希望將集合重塑為較少且較大的區段，並使其與搜尋及載入行為相符時，請選擇「強制合併」。</p></li>
</ul>
<p><strong>「強制合併」與「叢集式壓縮」有何不同？</strong></p>
<p>叢集緊湊化 (<code translate="no">is_clustering=True</code>) 會根據叢集鍵重新組織區段內的資料，以改善搜尋剪枝效能。強制合併 (<code translate="no">target_size=N</code>) 則在不改變資料分佈的情況下，優化區段大小。這兩者用途不同，但可搭配使用——先執行叢集緊湊化來組織資料，再執行強制合併以整合所得的區段。</p>
<p><strong>我可以在正在被查詢的集合上執行強制合併嗎？</strong></p>
<p>可以。強制合併以非同步方式執行，不會阻塞查詢。不過，此操作會消耗 DataNode 和磁碟 I/O 資源，因此在緊縮期間，查詢延遲可能會增加。建議在流量較低的時段排程執行強制合併，以獲得最佳效果。</p>
<p><strong>若將 target_size 設定為小於 maxSize 會發生什麼情況？</strong></p>
<p>系統會以錯誤訊息拒絕該請求。目標大小必須大於或等於已設定的<code translate="no">dataCoord.segment.maxSize</code> 。</p>
