---
id: chunk_cache.md
title: 配置分塊緩存
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">配置分塊緩存<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>大塊快取機制讓 Milvus 能夠在需要資料之前，將資料預先載入查詢節點本機硬碟的快取記憶體。此機制可縮短將資料從磁碟載入記憶體的時間，大幅提升向量檢索效能。</p>
<h2 id="Background" class="common-anchor-header">背景資料<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>在進行查詢以擷取向量之前，Milvus 需要將資料從物件儲存區載入查詢節點本機硬碟的記憶體快取記憶體。這是一個耗時的過程。在所有資料載入之前，Milvus 可能會延遲回應某些向量檢索請求。</p>
<p>為了改善查詢效能，Milvus 提供了一個分塊快取機制，在需要資料之前，將資料從物件儲存預先載入本機硬碟的快取記憶體。當收到查詢請求時，Segcore 會先檢查資料是否在快取記憶體中，而不是在物件儲存空間中。如果資料在快取記憶體中，Segcore 可以快速地從快取記憶體中擷取，並將結果回傳給客戶端。</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">配置 Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南提供如何為Milvus實例配置chunk cache機制的說明。配置因您安裝 Milvus 實例的方式而異。</p>
<ul>
<li><p>對於使用 Helm Charts 安裝的 Milvus 實例</p>
<p>將配置加入<code translate="no">values.yaml</code> 檔案的<code translate="no">config</code> 部分。詳情請參閱<a href="/docs/zh-hant/configure-helm.md">使用 Helm Charts 設定 Milvus</a>。</p></li>
<li><p>對於使用 Docker Compose 安裝的 Milvus 實體</p>
<p>將配置新增到您用來啟動 Milvus 實例的<code translate="no">milvus.yaml</code> 檔案。如需詳細資訊，請參閱<a href="/docs/zh-hant/configure-docker.md">使用 Docker Compose 配置 Milvus</a>。</p></li>
<li><p>對於使用 Operator 安裝的 Milvus 實例</p>
<p>將配置新增到<code translate="no">Milvus</code> 自訂資源的<code translate="no">spec.components</code> 區段。如需詳細資訊，請參閱<a href="/docs/zh-hant/configure_operator.md">使用 Operator 配置 Milvus</a>。</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">組態選項</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">warmup</code> 参数决定 Milvus 是否在需要之前将数据从对象存储预加载到查询节点本地硬盘上的缓存中。此参数默认为<code translate="no">disable</code> 。可能的選項如下：</p>
<ul>
<li><code translate="no">async</code>:Milvus 在后台异步预加载数据，这不会影响加载集合所需的时间。然而，在載入過程完成後的一段短時間內，使用者在擷取向量時可能會遇到延遲。  這是預設選項。</li>
<li><code translate="no">sync</code>:Milvus 會同步預先載入資料，這可能會影響載入資料集所需的時間。不過，使用者可以在載入過程完成後立即執行查詢，而不會有任何延遲。</li>
<li><code translate="no">disable</code>:Milvus 不會預先載入資料到記憶體快取。</li>
</ul>
<p>請注意，大塊快取設定也適用於新資料插入資料集或資料集索引重建時。</p>
<h3 id="FAQ" class="common-anchor-header">常見問題</h3><ul>
<li><p><strong>如何判斷chunk cache機制是否正常運作？</strong></p>
<p>建議您在載入資料集後，檢查搜尋或查詢請求的延遲時間。如果延遲時間明顯高於預期（例如數秒），可能表示主群快取機制仍在運作。</p>
<p>如果查詢延遲長時間居高不下。您可以檢查物件儲存的吞吐量，以確保分塊快取機制仍在運作。在正常情況下，工作中的 chunk 快取將會在物件儲存上產生高吞吐量。或者，您可以簡單地在<code translate="no">sync</code> 模式下嘗試使用 chunk 快取。</p></li>
</ul>
