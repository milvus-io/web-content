---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ 是基於磁碟的向量索引，它擴充了 DISKANN 的功能，可在不超出 RAM 限制的情況下處理 10 億規模的資料集。DISKANN
  將壓縮向量儲存在記憶體中，AISAQ 則不同，它將所有資料儲存在磁碟上，提供兩種模式來平衡效能與儲存成本。
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ 是基於磁碟的向量索引，可擴充<a href="/docs/zh-hant/diskann.md">DISKANN</a>以處理十億級的資料集，而不會超出 RAM 的限制。DISKANN 將壓縮向量儲存在記憶體中，AISAQ 則不同，它將所有資料儲存在磁碟上，提供兩種模式來平衡效能與儲存成本。</p>
<p>當您的向量資料集太大，無法輕鬆放入 RAM，或您需要以降低記憶體需求換取一些查詢效能，以最佳化基礎架構成本時，請使用 AISAQ。</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQ 如何運作<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>上圖比較<strong>DISKANN</strong>、<strong>AISAQ-Performance</strong> 和<strong>AISAQ-Scale</strong> 的儲存配置，顯示資料 (原始向量、邊緣列表和 PQ 代碼) 在 RAM 和磁碟之間的分配方式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">基礎：DISKANN 回顧<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>在 DISKANN 中，原始向量和邊緣清單儲存在磁碟上，而 PQ 壓縮向量則儲存在記憶體 (DRAM)。</p>
<p>當 DISKANN 遍歷到一個節點 (例如<em>向量 0</em>)：</p>
<ul>
<li><p>它會從磁碟載入原始向量<strong>(raw_vector_0</strong>) 及其邊緣清單<strong>(edgelist</strong><strong>_0</strong>)。</p></li>
<li><p>邊緣清單指出下一個要造訪的鄰居 (本範例中的節點 2、3 和 5)。</p></li>
<li><p>原始向量用來計算與查詢向量的精確距離，以進行排序。</p></li>
<li><p>記憶體中的 PQ 資料用於近似距離篩選，以引導下一次遍歷。</p></li>
</ul>
<p>由於 PQ 資料已經快取在 DRAM 中，因此每次節點造訪只需要一次磁碟 I/O，以適度的記憶體使用量達到高查詢速度。</p>
<p>有關這些元件和參數的詳細說明，請參閱<a href="/docs/zh-hant/diskann.md">DISKANN</a>。</p>
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQ 模式<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ 提供兩種以磁碟為基礎的儲存策略。關鍵差異在於 PQ 壓縮資料的儲存方式。</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong>透過將 PQ 資料從記憶體移至磁碟，達到完全以磁碟為基礎的儲存，同時透過資料暫存和備援維持低 IOPS。</p>
<p>在此模式下：</p>
<ul>
<li><p>每個節點的原始向量、邊緣列表及其鄰居的 PQ 資料都一起儲存在磁碟上。</p></li>
<li><p>此佈局可確保訪問一個節點 (例如<em>向量 0</em>) 仍只需要單次磁碟 I/O。</p></li>
<li><p>然而，由於 PQ 資料在多個節點附近被重複儲存，索引檔案的大小會大幅增加，消耗更多的磁碟空間。</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong>著重於<em>減少磁碟空間使用量</em>，同時將所有資料保留在磁碟上。</p>
<p>在此模式下</p>
<ul>
<li><p>PQ 資料會單獨儲存在磁碟上，沒有備援。</p></li>
<li><p>此設計可最小化索引大小，但會導致圖形遍歷過程中產生更多 I/O 作業。</p></li>
<li><p>為了減少 IOPS 開銷，AISAQ 引進了兩種最佳化方法：</p>
<ul>
<li><p>重新排列 (rearrange) 策略，可依優先順序排序 PQ 向量，以改善資料位置性。</p></li>
<li><p>DRAM 中的 PQ 快取記憶體 (pq_cache_size)，可快取經常存取的 PQ 資料。</p></li>
</ul></li>
</ul>
<p>因此，與 DISKANN 或 AISAQ-Performance 相比，AISAQ-scale 能達到更好的儲存效率，但效能較低。</p>
<h2 id="Example-configuration" class="common-anchor-header">配置範例<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ 特有的參數<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ 繼承了 DISKANN 的許多參數。為避免冗餘，以下只詳細說明 AISAQ 特有的參數。有關共用參數的說明，例如<code translate="no">max_degree</code>,<code translate="no">pq_code_budget_gb_ratio</code>,<code translate="no">search_list_size</code>, 和<code translate="no">beam_width_ratio</code> ，請參閱<a href="/docs/zh-hant/diskann.md#DISKANN-params">DISKANN</a>。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>每個節點內嵌儲存的 PQ 向量數量。決定儲存配置 (Performance vs. Scale mode)。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0、<em>max_degree］</em></p><p><strong>預設值</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 越接近<em>max_degree</em>，性能往往越好，但索引檔案大小會大幅增加。</p><p>當<code translate="no">inline_pq</code> 接近 0 時，效能會降低，索引大小會變得與 DISKANN 相似。</p><p><strong>注意</strong>：它高度依賴磁碟效能。如果磁碟效能不佳，不建議啟用此選項，因為有限的磁碟頻寬可能會成為瓶頸，降低整體效能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>啟用 PQ 向量依優先順序排序，以改善 I/O 區域性。</p></td>
     <td><p><strong>類型</strong>：布林</p><p><strong>範圍：</strong>[真，假］</p><p><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>減少查詢 I/O，但增加索引建立時間。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>以 DRAM 為單位的 PQ 快取大小 (位元組)。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[0, 1&lt;&lt;30]</p><p><strong>預設值</strong>：<code translate="no">0</code></p></td>
     <td><p>較大的快取記憶體可改善查詢效能，但會增加 DRAM 使用量。</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">注意事項<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>磁碟效能很重要。AISAQ 非常依賴 SSD IOPS；儲存不良會降低 QPS。</p></li>
<li><p>AISAQ 效能模式 ≈ DISKANN 延遲，但可能需要數倍的磁碟空間。</p></li>
<li><p>AISAQ 規模模式適合離線搜尋或資料歸檔工作負載，在這些模式下 QPS 的重要性較低。</p></li>
</ul>
