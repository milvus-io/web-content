---
id: performance_faq.md
summary: 尋找關於搜尋效能、效能增強及其他效能相關問題的常見問題答案。
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">如何為 IVF 索引設定<code translate="no">nlist</code> 和<code translate="no">nprobe</code> ？</h4><p>設定<code translate="no">nlist</code> 需視情況而定。根據經驗，<code translate="no">nlist</code> 的建議值是<code translate="no">4 × sqrt(n)</code> ，其中<code translate="no">n</code> 是段中實體的總數。</p>
<p>每個區段的大小由<code translate="no">datacoord.segment.maxSize</code> 參數決定，預設值為 512 MB。網段 n 中的實體總數可以用<code translate="no">datacoord.segment.maxSize</code> 除以每個實體的大小來估計。</p>
<p><code translate="no">nprobe</code> 的設定是針對資料集和情境而定，並涉及準確性和查詢效能之間的權衡。我們建議透過反覆的實驗找出理想的值。</p>
<p>以下圖表是在 sift50m 資料集和 IVF_SQ8 索引上執行測試的結果，其中比較了不同<code translate="no">nlist</code>/<code translate="no">nprobe</code> 對的召回率和查詢效能。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>精確度測試</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>效能測試</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">為什麼有時候在較小的資料集上查詢需要較長的時間？</h4><p>查詢作業是在區段上進行的。索引可減少查詢資料段所需的時間。如果資料段沒有索引，Milvus 就會對原始資料進行暴力搜尋，大大增加查詢時間。</p>
<p>因此，在小型資料集（集合）上查詢通常需要較長的時間，因為它尚未建立索引。這是因為其區段的大小尚未達到<code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 所設定的索引建立臨界值。呼叫<code translate="no">create_index()</code> ，強制 Milvus 為已達到臨界值但尚未自動建立索引的區段建立索引，可大幅改善查詢效能。</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">哪些因素影響 CPU 使用量？</h4><p>當 Milvus 建立索引或執行查詢時，CPU 使用量會增加。一般而言，除了使用 Annoy（在單一線程上執行）外，索引建立都是 CPU 密集型的。</p>
<p>當執行查詢時，CPU 使用量會受到<code translate="no">nq</code> 和<code translate="no">nprobe</code> 的影響。當<code translate="no">nq</code> 和<code translate="no">nprobe</code> 較小的時候，並發量會很低，CPU 使用量也會保持在低水平。</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">同時插入資料和搜尋會影響查詢效能嗎？</h4><p>插入作業不是 CPU 密集型作業。然而，由於新的區段可能尚未達到建立索引的臨界值，Milvus 會採用強制搜尋，這會嚴重影響查詢效能。</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 參數決定段的索引建立臨界值，預設為 1024 行。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/system_configuration.md">系統設定</a>。</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">在 Milvus 中刪除資料後，儲存空間會立即釋放嗎？</h4><p>不，當您在 Milvus 刪除資料時，儲存空間不會立即釋放。雖然刪除資料會將實體標記為 「邏輯上已刪除」，但實際空間可能不會立即釋放。原因如下：</p>
<ul>
<li><strong>壓縮</strong>：Milvus 會在背景自動壓縮資料。此過程會將較小的資料區段合併為較大的區段，並移除邏輯上已刪除的資料 (標示為刪除的實體) 或已超過使用時間 (TTL) 的資料。但是，壓縮會建立新的區段，同時將舊的區段標記為 「已丟棄」。</li>
<li><strong>垃圾回收</strong>：稱為垃圾回收 (GC) 的獨立程序會定期移除這些「已丟棄」的區段，釋放它們所佔用的儲存空間。這可確保儲存空間的有效使用，但可能會在刪除與空間回收之間產生少許延遲。</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">我可以在操作後立即看到插入、刪除或上插的資料而不需要等待刷新嗎？</h4><p>可以，在 Milvus 中，由於其儲存-運算分解架構，資料可讀性與刷新作業沒有直接關聯。您可以使用一致性層級管理資料的可讀性。</p>
<p>選擇一致性等級時，請考慮一致性與效能之間的權衡。對於需要立即可見性的作業，請使用「強」一致性層級。若要加快寫入速度，請優先使用較弱的一致性 (資料可能無法立即可見)。如需詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/consistency.md">一致性</a>。</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">索引 VARCHAR 欄位可以提高刪除速度嗎？</h4><p>索引 VARCHAR 欄位可以加快「Delete By Expression」作業的速度，但僅限於某些條件：</p>
<ul>
<li><strong>INVERTED 索引</strong>：此索引有助於非主索引鍵 VARCHAR 欄位上的<code translate="no">IN</code> 或<code translate="no">==</code> 表達式。</li>
<li><strong>Trie 索引</strong>：此索引有助於非主鍵 VARCHAR 欄位上的前綴查詢 (例如<code translate="no">LIKE prefix%</code>)。</li>
</ul>
<p>但是，索引 VARCHAR 欄位並不會加快速度：</p>
<ul>
<li><strong>按 ID 刪除</strong>：當 VARCHAR 欄位是主索引鍵時。</li>
<li><strong>不相關的表達</strong>：當 VARCHAR 欄位不是刪除表達式的一部分時。</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">還有問題嗎？</h4><p>您可以</p>
<ul>
<li>在 GitHub 上查看<a href="https://github.com/milvus-io/milvus/issues">Milvus</a>。隨時提出問題、分享想法並幫助他人。</li>
<li>加入我們的<a href="https://discord.com/invite/8uyFbECzPX">Discord 伺服器</a>，尋找支援並參與我們的開放原始碼社群。</li>
</ul>
