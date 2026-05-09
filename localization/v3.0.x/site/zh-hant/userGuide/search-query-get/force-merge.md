---
id: force-merge.md
title: 強制合併壓縮Compatible with Milvus 3.0.x
summary: 使用強制合併壓縮功能來合併小區段，並改善查詢效能和儲存效率。
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
    </button></h1><p>強制合併 (Force Merge) 旨在將小而分散的區段整合為較少且較大的區段，以改善查詢效能和儲存效率。本指南說明如何使用強制合併壓縮。</p>
<div class="alert note">
<p>此功能處於公開預覽階段。請勿在生產環境中使用。</p>
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
    </button></h2><p>標準<a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md">壓縮</a>透過多對一合併，將區段大小保持在設定的<code translate="no">maxSize</code> 附近，但仍可能會留下無法在不超過限制的情況下進一步合併的中等大小片段。例如，如下圖所示，如果一個資料集中有五個 2 MB 的區段，而<code translate="no">maxSize</code> 是 3 MB，則合併任何兩個區段都會超出限制，因此標準壓縮無法進一步減少區段數，而保留碎片佈局。</p>
<p>強制合併 (Force merge) 增加了<code translate="no">target_size</code> 參數，並支援在可能的情況下，在較小的公差範圍內，朝向所需的大小重組區段。如下圖所示，如果指定的<code translate="no">target_size</code> 為 4 MB，五個 2 MB 的小區段可以進一步合併為較少的較大區段。這可減少多餘的區段數目，支援大於預設<code translate="no">maxSize</code> 設定的目標，而且當目標非常大時，系統可針對目前的硬體和 QueryNode 擴充架構，選擇實際的輸出大小和區段數目。</p>
<p>若要瞭解使用哪種壓縮方法，請參閱<a href="#faq">常見問題</a>集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v3.0.x/assets/compaction.png" alt="R8eow3kaqhktokblcmocnvxmnee" class="doc-image" id="r8eow3kaqhktokblcmocnvxmnee" />
   </span> <span class="img-wrapper"> <span>R8eow3kaqhktokblcmocnvxmnee</span> </span></p>
<p>強制合併壓縮擴充了現有的 <a href="https://milvus.io/api-reference/pymilvus/v2.6.x/MilvusClient/Management/compact.md"><code translate="no">Compaction</code></a>API 的<code translate="no">target_size</code> 參數。它是完全向後相容的：不含<code translate="no">target_size</code> 的現有壓縮呼叫仍可如以往一樣運作。</p>
<p>強制合併以非同步方式運作。它不會阻塞搜尋或查詢作業，但會在執行期間消耗 I/O 和記憶體資源。</p>
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
<li><p>Milvus 2.6.15 或更新版本</p></li>
<li><p>pymilvus 2.6.13 或更新版本</p></li>
</ul>
<h3 id="Global-Configuration" class="common-anchor-header">全局組態<button data-href="#Global-Configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>下列設定參數控制強制合併行為。請在 Milvus 設定檔或透過環境變數設定。</p>
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
     <td><p>512</p></td>
     <td><p>預設網段最大大小 (MB)。<code translate="no">target_size</code> 為 0 或省略時用作目標。也是明確<code translate="no">target_size</code> 的最小允許值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code></p></td>
     <td><p>100</p></td>
     <td><p>選擇演算法的段數臨界值。當區段數超過此值時，Milvus 會使用較快的貪婪演算法進行合併規劃。</p><ul><li><p><strong>標準演算法</strong>(當區段數 &lt;=<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 時使用)：產生更優化的合併結果，但需要較長的計算時間。</p></li><li><p><strong>貪婪演算法</strong>(當分段數 &gt;<code translate="no">dataCoord.compaction.maxFullSegmentThreshold</code> 時使用)：以稍差的最佳分段群組為代價，以更快的速度完成規劃。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.datanodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>資料節點記憶體除以此因子，以計算系統可允許的最大區段大小。</p><ul><li><p>較大值會分配較少記憶體給合併，但會留出較多記憶體給資料節點的其他作業，以改善節點的穩定性。</p></li><li><p>較小值允許較大的合併，但會增加記憶體壓力。</p></li><li><p>例如，預設因子為 4.0 且 DataNode 擁有 16 GB 記憶體時，合併預算為 4 GB。這表示在單一作業中合併的區段總大小不能超過 4 GB。</p></li></ul></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.compaction.forceMerge.querynodeMemoryFactor</code></p></td>
     <td><p>4.0</p></td>
     <td><p>最小 QueryNode 記憶體除以此因子。在自動大小計算 (<code translate="no">target_size=max_int64</code>) 過程中使用，以確保合併的區段能被 QueryNode 載入。</p><ul><li><p>較大值會產生較小的區段，使 QueryNodes 更容易載入。</p></li><li><p>較小值允許較大的區段，但可能會導致記憶體有限的 QueryNodes 出現載入失敗。</p></li><li><p>例如，預設因子為 4.0，最小的 QueryNode 有 16 GB 記憶體，則自動計算的目標大小不會超過 4 GB。這可防止強制合併產生過大的區段，以致 QueryNodes 無法載入。</p></li></ul></td>
   </tr>
</table>
<p>要將上述變更套用到您的 Milvus 叢集，請依照「<a href="/docs/zh-hant/configure-helm.md#Configure-Milvus-via-configuration-file">使用 Helm 設定 Milvus</a>」和<a href="/docs/zh-hant/configure_operator.md">「使用 Milvus Operators 設定 Milvus</a>」中的步驟。</p>
<h3 id="Trigger-Force-Merge-Compaction" class="common-anchor-header">觸發強制合併壓縮<button data-href="#Trigger-Force-Merge-Compaction" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以使用<code translate="no">target_size</code> 參數呼叫<code translate="no">compact()</code> 來觸發強力合併壓縮。有關參數的詳細資訊，請參閱下面的<a href="#parameter-reference">參數參考</a>。</p>
<p>有三種強制合併壓縮模式可供使用：</p>
<pre><code translate="no" class="language-plaintext">compact(&quot;my_collection&quot;, target_size=?)
│
├─ Mode 1: target_size = 0 (or omitted)
│  Uses config maxSize (default 512 MB)
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
<p>以下舉例說明如何使用每種強制合併壓縮模式。</p>
<h4 id="Default-standard-compaction" class="common-anchor-header">預設 (標準壓縮)</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Standard compaction — uses config maxSize (default 512 MB)</span>
job_id = client.compact(<span class="hljs-string">&quot;target_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Explicit-target-size" class="common-anchor-header">明確目標大小</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Merge segments to approximately 2 GB each</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=<span class="hljs-string">&quot;2048&quot;</span>  <span class="hljs-comment"># The unit is MB</span>
)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Automatic-size-calculation" class="common-anchor-header">自動計算大小</h4><pre><code translate="no" class="language-python"><span class="hljs-comment"># Let Milvus determine the optimal segment size</span>
max_int64 = (<span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">63</span>) - <span class="hljs-number">1</span>
job_id = client.compact(
    <span class="hljs-string">&quot;target_collection&quot;</span>,
    target_size=max_int64
)
<button class="copy-code-btn"></button></code></pre>
<p><a id="parameter-reference"></a></p>
<h4 id="Parameter-reference" class="common-anchor-header">參數參考</h4><p>下表說明參數。</p>
<table>
   <tr>
     <th><p><strong>參數</strong></p></th>
     <th><p><strong>類型</strong></p></th>
     <th><p><strong>說明</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">collection_name</code></p></td>
     <td><p>str</p></td>
     <td><p>必須填寫。要壓縮的集合名稱。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">target_size</code></p></td>
     <td><p>int</p></td>
     <td><p>可選。目標區段大小，單位為 MB。參數值有 3 個選項：</p><ul><li><p><strong>0 或省略</strong>：使用設定的<code translate="no">dataCoord.segment.maxSize</code> (預設：512 MB)。等同於標準壓縮。</p></li><li><p><strong>Explicit value (明確值</strong>)：以 MB 為單位，將區段合併為近似指定的大小 (例如：2048)。必須大於或等於設定的<code translate="no">dataCoord.segment.maxSize</code> 。</p></li><li><p><strong>max_int64 ((1 &lt;&lt; 63) - 1)：</strong>根據目前的區段分佈和可用的節點資源，自動計算最佳大小。</p></li></ul></td>
   </tr>
</table>
<div class="alert note">
<p>如果指定的<code translate="no">target_size</code> 小於設定的<code translate="no">dataCoord.segment.maxSize</code> ，則會以錯誤拒絕請求。</p>
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
    </button></h3><p>強制合併壓縮以非同步方式執行。使用傳回的工作 ID 檢查進度：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Check compaction state</span>
state = client.get_compaction_state(job_id)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;State: <span class="hljs-subst">{state}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Best-practices" class="common-anchor-header">最佳做法<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>在大多數情況下使用自動大小計算模式。</strong>將<code translate="no">target_size</code> 設為<code translate="no">max_int64</code> ，可讓 Milvus 分析您的區段分佈和節點資源，以決定最佳大小。這是建議的方法，除非您有特定的大小需求。</p></li>
<li><p><strong>考慮效能權衡。</strong>強制合併壓縮是一項資源密集的作業。它會讀取、合併和重寫區段資料。將其排程在低流量時段，以盡量減少對查詢延遲的影響。</p></li>
<li><p><strong>監控之前和之後的網段數量。</strong>使用<code translate="no">get_compaction_state()</code> 和<code translate="no">list_persistent_segments</code> 來驗證壓縮是否如預期產生較少、較大的分段。</p></li>
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
    </button></h2><p><strong>強制合併 (Force Merge) 與標準壓縮有何不同？</strong></p>
<p>這兩種壓縮作業有不同的目的。</p>
<ul>
<li><p>標準壓縮 (targetSize=0 或省略) 是盡最大努力的增量清理路徑。</p></li>
<li><p>強制合併 (targetSize&gt;0) 是一種集合層級的重新包裝路徑，以產生更少、更大、接近目標的區段。</p></li>
</ul>
<p>關鍵差異在於合併的形狀：標準壓縮實際上是每個任務 m → 1，而強制併合則是在群組輸入中 m → n。這就是為什麼強制合併可以解決標準壓縮無法解決的分段佈局問題。下表比較了這兩種操作。</p>
<table>
   <tr>
     <th><p><strong>尺寸</strong></p></th>
     <th><p><strong>標準壓縮 (預設)</strong></p></th>
     <th><p><strong>強制合併</strong></p></th>
   </tr>
   <tr>
     <td><p>API 觸發</p></td>
     <td><p>targetSize=0 (或未設定)，無 Major/L0 標誌</p></td>
     <td><p>targetSize&gt;0 (MB)</p></td>
   </tr>
   <tr>
     <td><p>主要目標</p></td>
     <td><p>增量清理明顯的片段；例行維護</p></td>
     <td><p>收集範圍內的整合，以利搜尋與平衡</p></td>
   </tr>
   <tr>
     <td><p>區段大小來源</p></td>
     <td><p>固定的 dataCoord.segment.maxSize (伺服器設定)</p></td>
     <td><p>使用者的 targetSize，然後以 maxSafeSize 進行安全箝位</p></td>
   </tr>
   <tr>
     <td><p>參數有效性</p></td>
     <td><p>不調整使用者大小</p></td>
     <td><p>使用者 targetSize 必須 &gt;= dataCoord.segment.maxSize；否則會被拒絕</p></td>
   </tr>
   <tr>
     <td><p>安全上限</p></td>
     <td><p>僅配置上限</p></td>
     <td><p>maxSafeSize = min(QueryNode mem, DataNode mem) / memory_factor（獨立非池：進一步減半）</p></td>
   </tr>
   <tr>
     <td><p>合併形狀</p></td>
     <td><p>每個任務 m → 1，輸出 &lt;= configMaxSize</p></td>
     <td><p>m → n，輸出接近 targetSize</p></td>
   </tr>
   <tr>
     <td><p>中段行為</p></td>
     <td><p>可能會永久卡住（例如，兩個 60% 的區段無法合法地變成一個 120% 的區段）</p></td>
     <td><p>重新封包 + 分割可以運作；沒有「卡在 60% 處」的模式</p></td>
   </tr>
   <tr>
     <td><p>收集平坦化能力</p></td>
     <td><p>有限；重複運行仍可能留下許多中段</p></td>
     <td><p>強大；旨在減少區段數並將滿度推高</p></td>
   </tr>
   <tr>
     <td><p>拓樸感知</p></td>
     <td><p>無</p></td>
     <td><p>有；使用 QueryNode/複製/分散佈局</p></td>
   </tr>
   <tr>
     <td><p>讀取路徑平行調整</p></td>
     <td><p>無</p></td>
     <td><p>當有效時，使用 queryNodeCount / (replicas × shard) 調整輸出數量</p></td>
   </tr>
   <tr>
     <td><p>典型用例</p></td>
     <td><p>寫入/刪除後的高消耗日常清理</p></td>
     <td><p>基準準備、搜尋最佳化、負載平行調整</p></td>
   </tr>
   <tr>
     <td><p>預期範圍</p></td>
     <td><p>不預期會重新封裝整個資料集</p></td>
     <td><p>擬用於集合層級的重新封包結果</p></td>
   </tr>
</table>
<p><strong>選擇指引：</strong></p>
<ul>
<li><p>選擇標準壓縮以進行低風險的增量清理。</p></li>
<li><p>當您明確地想要將資料集重整為符合搜尋和載入行為的較少、較大的區段時，請選擇強制合併。</p></li>
</ul>
<p><strong>強制合併與聚類壓縮有何不同？</strong></p>
<p><a href="/docs/zh-hant/clustering-compaction.md">聚類壓縮</a>(<code translate="no">is_clustering=True</code>) 根據聚類關鍵字在區段內重新組織資料，以改善搜尋剪枝。強制合併 (<code translate="no">target_size=N</code>) 在不改變資料分佈的情況下優化區段大小。它們有不同的目的，但可以一起使用 - 先執行聚類壓縮來組織資料，然後再執行強制合併來合併所產生的區段。</p>
<p><strong>我可以在正在查詢的資料集中執行強制合併嗎？</strong></p>
<p>可以。強制合併以非同步方式執行，不會阻塞查詢。但是，它會消耗 DataNode 和磁碟 I/O 資源，因此在壓縮期間，查詢延遲可能會增加。請安排在低流量時段進行強制合併，以獲得最佳結果。</p>
<p><strong>如果我設定的 target_size 小於 maxSize，會發生什麼情況？</strong></p>
<p>請求會被拒絕，並顯示錯誤。目標大小必須大於或等於設定的<code translate="no">dataCoord.segment.maxSize</code> 。</p>
