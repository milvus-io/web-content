---
id: best-practices-for-tiered-storage.md
title: 分層儲存的最佳實務Compatible with Milvus 2.6.4+
summary: >-
  Milvus
  提供分層儲存，協助您有效率地處理大型資料，同時平衡查詢延遲、容量和資源使用。本指南總結了針對典型工作負載的建議配置，並解釋每個調整策略背後的原因。
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">分層儲存的最佳實務<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供分層儲存，協助您有效率地處理大型資料，同時平衡查詢延遲、容量和資源使用。本指南總結了針對典型工作負載的建議配置，並解釋每個調整策略背後的原因。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始之前<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 或更新版本</p></li>
<li><p>QueryNodes 必須有專用的本機資源 (記憶體和磁碟)。共用環境可能會扭曲快取預估，並導致驅逐錯誤判斷。</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">選擇正確的策略<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>分層儲存提供彈性的載入與快取策略，可以結合使用以符合您的工作負載。</p>
<table>
   <tr>
     <th><p>目標</p></th>
     <th><p>建議重點</p></th>
     <th><p>關鍵機制</p></th>
   </tr>
   <tr>
     <td><p>最小化首次查詢延遲</p></td>
     <td><p>預先載入關鍵欄位</p></td>
     <td><p>預熱</p></td>
   </tr>
   <tr>
     <td><p>有效率地處理大型資料</p></td>
     <td><p>按需載入</p></td>
     <td><p>懶惰載入 + 部分載入</p></td>
   </tr>
   <tr>
     <td><p>保持長期穩定</p></td>
     <td><p>防止快取記憶體溢出</p></td>
     <td><p>驅逐</p></td>
   </tr>
   <tr>
     <td><p>平衡效能與容量</p></td>
     <td><p>結合預先載入與動態快取</p></td>
     <td><p>混合配置</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">情況 1：即時、低延遲檢索<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何時使用</strong></p>
<ul>
<li><p>查詢延遲非常重要（例如即時推薦或搜尋排名）</p></li>
<li><p>經常存取核心向量索引和標量篩選器</p></li>
<li><p>穩定的效能比啟動速度更重要</p></li>
</ul>
<p><strong>建議配置</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>暖機可消除高頻率標量表和向量索引的首次延遲。</p></li>
<li><p>背景驅逐可維持穩定的快取記憶體壓力，而不會阻塞查詢。</p></li>
<li><p>停用快取 TTL 可避免熱資料不必要的重新載入。</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">情況 2：離線、批次分析<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何時使用</strong></p>
<ul>
<li><p>查詢延遲容忍度高</p></li>
<li><p>工作負載涉及大量資料集或許多區段</p></li>
<li><p>容量和吞吐量優先於回應能力</p></li>
</ul>
<p><strong>建議配置</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>理由</strong></p>
<ul>
<li><p>初始化許多區段時，停用暖機可加速啟動。</p></li>
<li><p>較高的水印可讓快取記憶體使用更密集，提高總負載容量。</p></li>
<li><p>快取記憶體 TTL 會自動清除未使用的資料，以釋放本機空間。</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">情況 3：混合部署 (混合線上 + 離線)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>何時使用</strong></p>
<ul>
<li><p>單一叢集同時服務線上與分析工作負載</p></li>
<li><p>某些資料集需要低延遲，其他資料集則以容量為優先</p></li>
</ul>
<p><strong>建議策略</strong></p>
<ul>
<li><p><strong>將即時組態</strong>套用至延遲敏感的資料集中</p></li>
<li><p><strong>將離線配置</strong>套用於分析或歸檔資料集</p></li>
<li><p>針對每種工作負載類型獨立調整 evictableMemoryCacheRatio、cacheTtl 和 watermark 比率</p></li>
</ul>
<p><strong>理據</strong></p>
<p>結合組態可精細控制資源分配。</p>
<p>關鍵資料集可維持低延遲保證，而次級資料集則可處理更多區段和資料量。</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">其他調整提示<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
   <tr>
     <th><p>面向</p></th>
     <th><p>建議</p></th>
     <th><p>說明</p></th>
   </tr>
   <tr>
     <td><p><strong>預熱範圍</strong></p></td>
     <td><p>只預先載入查詢頻率高的欄位或索引。</p></td>
     <td><p>不必要的預載會增加載入時間和資源使用。</p></td>
   </tr>
   <tr>
     <td><p><strong>驅逐調整</strong></p></td>
     <td><p>從預設水印 (75-80%) 開始，逐步調整。</p></td>
     <td><p>間隙太小會造成頻繁驅逐；間隙太大則會延遲資源釋放。</p></td>
   </tr>
   <tr>
     <td><p><strong>快取 TTL</strong></p></td>
     <td><p>對於穩定的熱資料集，請停用；對於動態資料，請啟用 (例如 1-3 天)。</p></td>
     <td><p>防止陳舊快取記憶體累積，同時平衡清理開銷。</p></td>
   </tr>
   <tr>
     <td><p><strong>超量承擔比率</strong></p></td>
     <td><p>除非資源空間很大，否則避免使用 &gt; 0.7 的值。</p></td>
     <td><p>過度的超量提交可能會導致快取記憶體震動和不穩定的延遲。</p></td>
   </tr>
   <tr>
     <td><p><strong>監控</strong></p></td>
     <td><p>追蹤快取點擊率、資源利用率和驅逐頻率。</p></td>
     <td><p>頻繁的冷負載可能表示需要調整暖機或水印。</p></td>
   </tr>
</table>
