---
id: gpu-index-overview.md
title: GPU 索引概述
summary: 在 Milvus 中建立支援 GPU 的索引，可以大幅提升高吞吐量和高召回情境下的搜尋效能。
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPU 索引概述<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中建立支援 GPU 的索引，可以大幅提升高吞吐量和高召回情境下的搜尋效能。</p>
<p>下圖比較了不同索引配置、硬體設定、向量資料集（Cohere 和 OpenAI）和搜尋批次大小的查詢吞吐量（每秒查詢次），顯示<code translate="no">GPU_CAGRA</code> 的表現持續優於其他方法。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>GPU 索引效能</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">為 Milvus 設定 GPU 記憶池<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援全域 GPU 記憶體池並在<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 配置檔中</a>提供兩個配置參數<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>當 Milvus 啟動時，預設的<code translate="no">initMemSize</code> 通常是一半的 GPU 記憶體，而<code translate="no">maxMemSize</code> 則預設為整個 GPU 記憶體。GPU 記憶池大小初始設定為<code translate="no">initMemSize</code> ，並會視需要自動擴充至<code translate="no">maxMemSize</code> 。</p>
<p>當指定啟用 GPU 的索引時，Milvus 會在搜尋之前將目標集合資料載入 GPU 記憶體，因此<code translate="no">maxMemSize</code> 必須至少是資料大小。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>對於<code translate="no">GPU_IVF_FLAT</code>,<code translate="no">limit</code> 的最大值是 1,024 。</p></li>
<li><p>對於<code translate="no">GPU_IVF_PQ</code> 和<code translate="no">GPU_CAGRA</code> ，<code translate="no">limit</code> 的最大值為 1,024。</p></li>
<li><p>雖然<code translate="no">limit</code> 沒有設定<code translate="no">GPU_BRUTE_FORCE</code> ，但建議不要超過 4,096 以避免潛在的效能問題。</p></li>
<li><p>目前，GPU 索引不支援<code translate="no">COSINE</code> 距離。如果需要<code translate="no">COSINE</code> 距離，應先將資料規格化，然後再使用內積 (IP) 距離作為替代。</p></li>
<li><p>不完全支援 GPU 索引的載入 OOM 保護，太多資料可能會導致 QueryNode 當機。</p></li>
<li><p>GPU 索引不支援<a href="/docs/zh-hant/range-search.md">範圍</a>搜尋及<a href="/docs/zh-hant/grouping-search.md">群組搜尋等</a>搜尋功能。</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">支援的 GPU 索引類型<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>下表列出 Milvus 支援的 GPU 索引類型。</p>
<table>
   <tr>
     <th><p>索引類型</p></th>
     <th><p>說明</p></th>
     <th><p>記憶體使用量</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA 是針對 GPU 最佳化的圖形索引，使用推理等級的 GPU 來執行 Milvus GPU 版本比使用昂貴的訓練等級 GPU 更具成本效益。</p></td>
     <td><p>記憶體使用量約為原始向量資料的 1.8 倍。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT 是最基本的 IVF 索引，每個單元儲存的編碼資料與原始資料一致。在進行搜尋時，請注意您可以針對 GPU_IVF_FLAT 索引的資料集，將任何搜尋的 top-k (<code translate="no">limit</code>) 設定為最高 256。</p></td>
     <td><p>需要相等於原始資料大小的記憶體。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ 會在量化向量的乘積之前執行 IVF 索引聚類。進行搜尋時，請注意您可以針對 GPU_IVF_FLAT 索引集合的任何搜尋，將 top-k (<code translate="no">limit</code>) 設定為最多 8,192 個。</p></td>
     <td><p>利用較小的記憶體佔用空間，這取決於壓縮參數的設定。</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/zh-hant/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE 專為需要極高召回率的情況量身打造，透過將每個查詢與資料集中的所有向量進行比較，保證召回率為 1。它只需要度量類型 (<code translate="no">metric_type</code>) 和 top-k (<code translate="no">limit</code>) 作為索引建立和搜尋參數。</p></td>
     <td><p>需要與原始資料大小相等的記憶體。</p></td>
   </tr>
</table>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">為 GPU 記憶體控制配置 Milvus 設定<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用全局圖形記憶體池來分配 GPU 記憶體。它在<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 配置檔中</a>支援兩個參數<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 。記憶體池大 小初始設定為<code translate="no">initMemSize</code> ，超過此限制後會自動擴充至<code translate="no">maxMemSize</code> 。</p>
<p>當 Milvus 啟動時，預設的<code translate="no">initMemSize</code> 是可用 GPU 記憶體的 1/2，而預設的<code translate="no">maxMemSize</code> 是等於所有可用的 GPU 記憶體。</p>
<p>在 Milvus 2.4.1 之前，Milvus 使用統一的 GPU 記憶池。對於 2.4.1 之前的版本，建議將這兩個值都設定為 0。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>從 Milvus 2.4.1 起，GPU 記憶體池僅在搜尋時用於臨時 GPU 資料。因此，建議將其設定為 2048 和 4096。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>要瞭解如何建立 GPU 索引，請參閱各索引類型的特定指南。</p>
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
    </button></h2><ul>
<li><p><strong>何時適合使用 GPU 索引？</strong></p>
<p>GPU 索引特別適用於需要高吞吐量或高召回率的情況。例如，在處理大量批次時，GPU 索引的吞吐量可比 CPU 索引高出 100 倍之多。在批次較小的情況下，GPU 索引在效能上仍遠遠優於 CPU 索引。此外，如果需要快速插入資料，整合 GPU 可大幅加快建立索引的過程。</p></li>
<li><p><strong>GPU 索引（如 GPU_CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT 和 GPU_BRUTE_FORCE）最適合哪些應用場景？</strong></p>
<p><code translate="no">GPU_CAGRA</code> indexes are ideal for scenarios that demand enhanced performance, albeit at the cost of consuming more memory.對於以節省記憶體為優先考量的環境，<code translate="no">GPU_IVF_PQ</code> 索引可幫助將儲存需求降至最低，儘管這會帶來較高的精確度損失。<code translate="no">GPU_IVF_FLAT</code> 索引是一個平衡的選擇，在效能與記憶體使用量之間取得折衷。最後，<code translate="no">GPU_BRUTE_FORCE</code> 索引專為徹底搜尋作業而設計，透過執行遍歷搜尋，保證召回率為 1。</p></li>
</ul>
