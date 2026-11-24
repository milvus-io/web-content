---
id: performance_faq.md
summary: 在此可查閱有關搜尋效能、效能優化及其他與效能相關問題的常見問題解答。
title: 效能常見問題
---
<h1 id="Performance-FAQ" class="common-anchor-header">效能常見問題<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">如何為 IVF 索引設定<code translate="no">nlist</code> 和<code translate="no">nprobe</code> ？</h4><p><code translate="no">nlist</code> 的設定需視具體情境而定。作為經驗法則，<code translate="no">nlist</code> 的建議值為<code translate="no">4 × sqrt(n)</code> ，其中<code translate="no">n</code> 代表區段中的實體總數。</p>
<p>每個區段的大小由<code translate="no">datacoord.segment.maxSize</code> 參數決定，預設值為 1024 MB。區段 n 中的實體總數可透過將<code translate="no">datacoord.segment.maxSize</code> 除以每個實體的大小來估算。</p>
<p><code translate="no">nprobe</code> 的設定需視資料集與使用情境而定，並涉及精準度與查詢效能之間的權衡。我們建議透過反覆實驗來找出最佳值。</p>
<p>以下圖表是針對 sift50m 資料集和 IVF_SQ8 索引進行測試的結果，比較了不同<code translate="no">nlist</code>/<code translate="no">nprobe</code> 組合的召回率與查詢效能。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>準確度測試</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   效能測試</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">為何在較小的資料集上，查詢有時會耗時更久？</h4><p>查詢操作是針對分段進行的。索引能縮短查詢單一分段所需的時間。若某個分段尚未建立索引，Milvus 將改為對原始資料進行暴力搜尋——這會大幅增加查詢時間。</p>
<p>因此，在小型資料集（集合）上進行查詢通常會耗時較久，因為尚未建立索引。這是因為其分段的大小尚未達到由<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 設定的索引建立閾值。呼叫<code translate="no">create_index()</code> 可強制 Milvus 為已達到閾值但尚未自動建立索引的分段建立索引，從而顯著提升查詢效能。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">哪些因素會影響 CPU 使用率？</h4><p>當 Milvus 正在建立索引或執行查詢時，CPU 使用率會增加。一般而言，建立索引是 CPU 密集型作業，但若使用 Annoy 則例外，因為 Annoy 僅在單一執行緒上運作。</p>
<p>執行查詢時，CPU 使用率會受到<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的影響。當<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的數值較小，表示並發程度較低，CPU 使用率亦會維持在低水平。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">同時進行資料插入與搜尋會影響查詢效能嗎？</h4><p>插入操作本身並不會造成 CPU 負載過高。然而，由於新區段可能尚未達到建立索引的閾值，Milvus 會改採暴力搜尋——這將顯著影響查詢效能。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 參數決定分段的索引建立閾值，預設值為 1024 行。更多資訊請參閱《<a href="/docs/zh-hant/system_configuration.md">系統配置》</a>。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">為 VARCHAR 欄位建立索引能否提升刪除速度？</h4><p>為 VARCHAR 欄位建立索引可加速「依表達式刪除」操作，但僅在特定條件下成立：</p>
<ul>
<li><strong>反向索引（INVERTED Index</strong>）：此索引有助於在非主鍵的 VARCHAR 欄位上執行「按表達式刪除」（<code translate="no">IN</code> ）或「按表達式刪除部分資料」（<code translate="no">==</code> ）操作。</li>
<li><strong>Trie 索引</strong>：此索引有助於針對非主鍵 VARCHAR 欄位執行前綴查詢（例如：<code translate="no">LIKE prefix%</code> ）。</li>
</ul>
<p>然而，為 VARCHAR 欄位建立索引並不會加速以下操作：</p>
<ul>
<li><strong>根據 ID 刪除</strong>：當 VARCHAR 欄位為主鍵時。</li>
<li><strong>無關的表達式</strong>：當 VARCHAR 欄位並非刪除表達式的一部分時。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">還有疑問嗎？</h4><p>您可以：</p>
<ul>
<li>前往 GitHub 探索<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。歡迎隨時提問、分享想法，並協助他人。</li>
<li>加入我們的<a href="https://discord.com/invite/8uyFbECzPX">Discord 頻道</a>，以獲得支援並參與我們的開源社群。</li>
</ul>
