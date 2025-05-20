---
id: disk_index.md
related_key: disk_index
summary: Milvus 用於磁碟最佳化向量搜尋的磁碟索引機制。
title: 磁碟上索引
---
<h1 id="On-disk-Index" class="common-anchor-header">磁碟上索引<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>本文將介紹 DiskANN，一種用於磁碟最佳化向量搜尋的磁碟上索引演算法。DiskANN 以 Vamana 圖形為基礎，在大型資料集中提供高效率的磁碟上向量搜尋。</p>
<p>為了改善查詢效能，您可以為每個向量欄位<a href="/docs/zh-hant/index-vector-fields.md">指定索引類型</a>。</p>
<div class="alert note"> 
目前，一個向量欄位只支援一種索引類型。切換索引類型時，Milvus 會自動刪除舊索引。</div>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中使用 DiskANN，請注意</p>
<ul>
<li>Milvus 實例在 Ubuntu 18.04.6 或更新版本上執行。</li>
<li>Milvus 資料路徑應掛載至 NVMe SSD，以獲得完整效能：<ul>
<li>對於 Milvus 獨立實例，資料路徑應該是實例執行所在容器中的<strong>/var/lib/milvus/data</strong>。</li>
<li>對於 Milvus 叢集實例，資料路徑應該是 QueryNodes 和 IndexNodes 執行所在容器中的<strong>/var/lib/milvus/data</strong>。</li>
</ul></li>
</ul>
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
    </button></h2><p>要使用 DiskANN，請確保您</p>
<ul>
<li>在資料中只使用至少 1 維的浮動向量。</li>
<li>僅使用 Euclidean Distance (L2)、Inner Product (IP) 或 COSINE 來測量向量之間的距離。</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">索引和搜尋設定<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>索引建立參數</p>
<p>建立 DiskANN 索引時，請使用<code translate="no">DISKANN</code> 作為索引類型。不需要索引參數。</p></li>
<li><p>搜尋參數</p>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>候選名單的大小，較大的大小提供較高的召回率，但效能會降低。</td><td>[topk, int32_max] (最大值)</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">DiskANN 相關的 Milvus 配置<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN 是可調整的。您可以在<code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> 中修改 DiskANN 相關的參數，以改善其效能。</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">...</span>
<span class="hljs-attr">DiskIndex:</span>
  <span class="hljs-attr">MaxDegree:</span> <span class="hljs-number">56</span>
  <span class="hljs-attr">SearchListSize:</span> <span class="hljs-number">100</span>
  <span class="hljs-attr">PQCodeBugetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">SearchCacheBudgetGBRatio:</span> <span class="hljs-number">0.125</span>
  <span class="hljs-attr">BeamWidthRatio:</span> <span class="hljs-number">4.0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>參數</th><th>說明</th><th>值範圍</th><th>預設值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Vamana 圖形的最大度數。 <br/> 值越大，召回率越高，但會增加索引的大小和建立索引的時間。</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>候選名單的大小。 <br/> 較大值會增加建立索引所花費的時間，但可提供較高的召回率。 <br/> 除非您需要減少建立索引的時間，否則請將它設定為小於<code translate="no">MaxDegree</code> 的值。</td><td>[1, int32_max］</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>PQ 代碼的大小限制。 <br/> 較大值可提供較高的召回率，但會增加記憶體使用量。</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>快取節點數與原始資料的比率。 <br/> 較大值可改善索引建立效能，但會增加記憶體使用量。</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>每次搜索迭代的最大 IO 請求數目與 CPU 數目之間的比率。</td><td>[1，max(128 / CPU 數目，16)] 4.0</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">疑難排解<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>如何處理<code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code> 錯誤？</p>
<p>Linux 核心提供異步非阻塞 I/O (Asynchronous non-blocking I/O, AIO) 功能，允許一個進程同時啟動多個 I/O 作業，而不必等待任何一個完成。這有助於提升可重複處理和 I/O 的應用程式的效能。</p>
<p>可以使用 proc 檔案系統中的<code translate="no">/proc/sys/fs/aio-max-nr</code> 虛擬檔案調整效能。<code translate="no">aio-max-nr</code> 參數決定允許的最大並發要求數目。</p>
<p><code translate="no">aio-max-nr</code> 預設為<code translate="no">65535</code> ，您可以將其設定為<code translate="no">10485760</code> 。</p></li>
</ul>
