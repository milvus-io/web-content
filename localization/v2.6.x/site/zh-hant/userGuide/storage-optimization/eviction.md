---
id: eviction.md
title: 驅逐Compatible with Milvus 2.6.4+
summary: >-
  Eviction 管理 Milvus 中每個 QueryNode
  的快取資源。啟用時，一旦達到資源臨界值，它會自動移除快取資料，以確保穩定的效能，並防止記憶體或磁碟耗盡。
beta: Milvus 2.6.4+
---
<h1 id="Eviction" class="common-anchor-header">驅逐<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Eviction" class="anchor-icon" translate="no">
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
    </button></h1><p>Eviction 管理 Milvus 中每個 QueryNode 的快取資源。啟用後，一旦達到資源臨界值，它會自動移除快取資料，以確保穩定的效能，並防止記憶體或磁碟耗盡。</p>
<p>驅逐使用<a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">最近最少使用 (LRU)</a>政策來回收快取空間。元資料永遠都會被快取而不會被驅逐，因為元資料對於查詢規劃來說是不可或缺的，而且通常都很小。</p>
<div class="alert note">
<p>驅逐必須明確啟用。如果沒有設定，快取資料會繼續累積，直到資源耗盡為止。</p>
</div>
<h2 id="Eviction-types" class="common-anchor-header">遷出類型<button data-href="#Eviction-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援兩種互補的驅逐模式<strong>(sync</strong>和<strong>async</strong>)，兩種模式共同作用，以達到最佳的資源管理：</p>
<table>
   <tr>
     <th><p>方面</p></th>
     <th><p>同步驅逐</p></th>
     <th><p>同步驅逐</p></th>
   </tr>
   <tr>
     <td><p>觸發</p></td>
     <td><p>在查詢或搜尋期間，當記憶體/磁碟使用量超過內部限制。</p></td>
     <td><p>背景線程會定期檢查使用量，並在超過高水準時觸發驅逐。</p></td>
   </tr>
   <tr>
     <td><p>行為</p></td>
     <td><p>暫停查詢執行，同時回收快取記憶體。驅逐持續，直到使用量降至低水準以下。</p></td>
     <td><p>在背景中持續執行；當使用量超過高水準時移除資料，直到使用量降至低水準以下。不會阻擋查詢。</p></td>
   </tr>
   <tr>
     <td><p>最適合</p></td>
     <td><p>可容忍短暫延遲尖峰的工作負載，或當異步驅逐無法快速回收空間時。</p></td>
     <td><p>需要平穩效能的延遲敏感型工作負載。適用於主動式資源管理。</p></td>
   </tr>
   <tr>
     <td><p>注意事項</p></td>
     <td><p>增加進行中查詢的延遲。如果可收回的資料不足，可能會導致逾時。</p></td>
     <td><p>需要適當調整的浮水印。有輕微的背景資源開銷。</p></td>
   </tr>
   <tr>
     <td><p>設定</p></td>
     <td><p>經由<code translate="no">evictionEnabled: true</code></p></td>
     <td><p>透過<code translate="no">backgroundEvictionEnabled: true</code> 啟用 (需要<code translate="no">evictionEnabled: true</code>)</p></td>
   </tr>
</table>
<p><strong>建議設定</strong>：</p>
<p>啟用兩種模式以達到最佳平衡。非同步驅逐會主動管理快取記憶體的使用，而同步驅逐則會在資源幾乎耗盡時作為安全退路。</p>
<div class="alert note">
<p>對於可驅逐的欄位和索引，驅逐單位與載入粒度相匹配--標量/向量欄位按小塊驅逐，標量/向量索引按區段驅逐。</p>
</div>
<h2 id="Enable-eviction" class="common-anchor-header">啟用驅逐<button data-href="#Enable-eviction" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">milvus.yaml</code> 的<code translate="no">queryNode.segcore.tieredStorage</code> 下設定驅逐：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>             <span class="hljs-comment"># Enables synchronous eviction</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>   <span class="hljs-comment"># Enables background (asynchronous) eviction</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>類型</p></th>
     <th><p>值</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>驅逐策略的主開關。預設為<code translate="no">false</code> 。啟用同步驅逐模式。</p></td>
     <td><p>在分層儲存中永遠設定為<code translate="no">true</code> 。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">backgroundEvictionEnabled</code></p></td>
     <td><p>bool</p></td>
     <td><p><code translate="no">true</code>/<code translate="no">false</code></p></td>
     <td><p>在背景中異步執行驅逐。需要<code translate="no">evictionEnabled: true</code> 。預設為<code translate="no">false</code> 。</p></td>
     <td><p>使用<code translate="no">true</code> 可獲得更順暢的查詢效能；可降低同步驅逐頻率。</p></td>
   </tr>
</table>
<h2 id="Configure-watermarks" class="common-anchor-header">設定水印<button data-href="#Configure-watermarks" class="anchor-icon" translate="no">
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
    </button></h2><p>水印定義記憶體和磁碟的快取驅逐開始和結束的時間。每種資源類型有兩個臨界值：</p>
<ul>
<li><p><strong>高水印</strong>：當使用量超過此值時，即開始同步驅逐。</p></li>
<li><p><strong>低水印</strong>：驅逐持續，直到使用量低於此值。</p></li>
</ul>
<div class="alert note">
<p>只有<a href="/docs/zh-hant/eviction.md#Enable-eviction">啟用驅逐時</a>，此設定才會生效。</p>
</div>
<p><strong>範例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Memory watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>    <span class="hljs-comment"># Eviction stops below 75% memory usage</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>    <span class="hljs-comment"># Eviction starts above 80% memory usage</span>

      <span class="hljs-comment"># Disk watermarks</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>      <span class="hljs-comment"># Eviction stops below 75% disk usage</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>      <span class="hljs-comment"># Eviction starts above 80% disk usage</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>類型</p></th>
     <th><p>範圍</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">memoryLowWatermarkRatio</code></p></td>
     <td><p>浮動</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>停止驅逐的記憶體使用量。</p></td>
     <td><p>從<code translate="no">0.75</code> 開始。如果 QueryNode 記憶體有限，則略為降低。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">memoryHighWatermarkRatio</code></p></td>
     <td><p>浮點數</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>非同步驅逐開始時的記憶體使用量。</p></td>
     <td><p>從<code translate="no">0.8</code> 開始。與低水準保持合理的差距 (例如 0.05-0.10)，以防止頻繁觸發。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskLowWatermarkRatio</code></p></td>
     <td><p>浮動</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>停止驅逐的磁碟使用量。</p></td>
     <td><p>從<code translate="no">0.75</code> 開始。如果磁碟 I/O 受限，可調整至較低。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">diskHighWatermarkRatio</code></p></td>
     <td><p>浮動</p></td>
     <td><p>(0.0, 1.0]</p></td>
     <td><p>啟動同步驅逐的磁碟使用量。</p></td>
     <td><p>從<code translate="no">0.8</code> 開始。與低水準保持合理的差距 (例如 0.05-0.10)，以防止頻繁觸發。</p></td>
   </tr>
</table>
<p><strong>最佳做法</strong>：</p>
<ul>
<li><p>請勿設定高水準或低水準超過 ~0.80，以便為 QueryNode 的靜態使用和查詢時間突發留出空間。</p></li>
<li><p>避免高低水印之間有大的間隙；大間隙會延長每次驅逐週期，並增加延遲。</p></li>
</ul>
<h2 id="Configure-cache-TTL" class="common-anchor-header">設定快取記憶體 TTL<button data-href="#Configure-cache-TTL" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>快取存活時間 (TTL)</strong>會在設定的持續時間後自動移除快取資料，即使未達到資源臨界值。它與 LRU 驅逐一起工作，防止陳舊資料無限期地佔用快取記憶體。</p>
<div class="alert note">
<p>Cache TTL 需要<code translate="no">backgroundEvictionEnabled: true</code> ，因為它在同一個背景線程上執行。</p>
</div>
<p><strong>YAML 示例</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Set the cache expiration time to 604,800 seconds (7 days),</span>
      <span class="hljs-comment"># and expired caches will be cleaned up by a background thread.</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>類型</p></th>
     <th><p>單位</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">cacheTtl</code></p></td>
     <td><p>整數</p></td>
     <td><p>秒</p></td>
     <td><p>快取資料過期前的持續時間。過期的項目會在背景中移除。</p></td>
     <td><p>對於高度動態的資料，請使用較短的 TTL (小時)；對於穩定的資料集，請使用較長的 TTL (天)。設定 0 可停用以時間為基礎的過期。</p></td>
   </tr>
</table>
<h2 id="Configure-overcommit-ratio" class="common-anchor-header">設定超量提交比率<button data-href="#Configure-overcommit-ratio" class="anchor-icon" translate="no">
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
    </button></h2><p>Overcommit 比率定義保留多少快取記憶體為可驅逐，允許 QueryNodes 在驅逐強化之前暫時超過正常容量。</p>
<div class="alert note">
<p>只有<a href="/docs/zh-hant/eviction.md#Enable-eviction">啟用驅逐時</a>，此設定才會生效。</p>
</div>
<p><strong>範例 YAML</strong>：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-comment"># Evictable Memory Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of physical memory is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-comment"># Evictable Disk Cache Ratio: 30%</span>
      <span class="hljs-comment"># (30% of disk capacity is reserved for storing evictable data)</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>類型</p></th>
     <th><p>範圍</p></th>
     <th><p>說明</p></th>
     <th><p>建議用例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">evictableMemoryCacheRatio</code></p></td>
     <td><p>浮動</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>分配給可移除資料的記憶體快取部分。</p></td>
     <td><p>從<code translate="no">0.3</code> 開始。增加 (0.5-0.7) 表示驅逐頻率較低；減少 (0.1-0.2) 表示區段容量較高。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">evictableDiskCacheRatio</code></p></td>
     <td><p>浮動</p></td>
     <td><p>[0.0, 1.0]</p></td>
     <td><p>分配給可遷移資料的磁碟快取部分。</p></td>
     <td><p>使用與記憶體相似的比率，除非磁碟 I/O 成為瓶頸。</p></td>
   </tr>
</table>
<p><strong>邊界行為</strong>：</p>
<ul>
<li><p><code translate="no">1.0</code>:所有快取都是可驅逐的 - 很少會觸發驅逐，但每個 QueryNode 可容納的區段較少。</p></li>
<li><p><code translate="no">0.0</code>:沒有可驅逐的快取記憶體 - 驅逐經常發生；適合的區段較多，但延遲可能會增加。</p></li>
</ul>
