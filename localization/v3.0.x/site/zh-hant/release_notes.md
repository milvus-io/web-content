---
id: release_notes.md
summary: Milvus 發行紀錄
title: 發佈筆記
---
<h1 id="Release-Notes" class="common-anchor-header">發佈筆記<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>瞭解 Milvus 的新功能！本頁總結了每個版本的新功能、改進、已知問題和錯誤修正。我們建議您定期訪問此頁面以瞭解更新資訊。</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2026 年 5 月 9 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta 擴充了 Milvus 向量資料庫，並與開放式湖泊生態系統進行新的整合：External Collection 讓 Milvus 可以零拷貝方式查詢外部湖表，而 Spark 則可以透過 Snapshot 直接讀取 Milvus 集合。該版本還帶來了更豐富的檢索、更具表達力的模式、更深入的文字搜尋客製化、更精細的資料與模型生命週期控制，以及更多操作者端控制。Milvus 3.0 是 Zilliz Lakebase 的核心內核，為其統一服務、發現和批次提供動力。</p>
<p>請點擊下方參加我們的網路研討會，瞭解 Milvus 3.0 的更多詳細資訊，並與核心維護人員進行 AMA：</p>
<p><a href="https://zilliz.com/event/whats-new-in-milvus-3-0-beta">
  
   <span class="img-wrapper"> <img translate="no" src="https://assets.zilliz.com/webinar_3_0_4746da7c2d.png" alt="Webinar 3.0 walkthrough" class="doc-image" id="webinar-3.0-walkthrough" />
 </span>  <span class="img-wrapper"> <span>網路研討會 3.0 解說</span> </span></a></p>
<h3 id="Key-Features" class="common-anchor-header">關鍵功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部收集</h4><p>在典型的人工智能資料管道中，TB 級的嵌入與元資料已經以 Parquet、Lance 或 Iceberg 表的形式存在於物件儲存中。將這些資料複製到 Milvus 會增加一倍的儲存成本，增加一個必須保持同步的 ETL 管道，並將資料管理從客戶身上移開。</p>
<p>External Collection 移除了複製。Milvus Collection 可以引用已經存在的檔案，Milvus 只管理模式、索引和查詢執行。增量刷新使 Collection 與底層檔案保持一致。資料無法離開資料庫的客戶，例如財務和醫療照護團隊，可以針對資料所在的位置執行向量檢索。單一的湖駐留資料集也可以同時從多個 Milvus 實體提供服務。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/create-an-external-collection.md">建立外部</a>資料<a href="/docs/zh-hant/create-an-external-collection.md">集</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服務和批次發現通常需要同時使用相同的資料集。A/B 模型評估、大規模重複資料刪除、回填驗證和版本回溯都需要在寫入仍在進行時對資料集有穩定的檢視。</p>
<p>快照透過引用現有的區段，而不是複製資料，來建立集合的時間點、唯讀檢視，因此邊際儲存成本接近零。批次作業可以在 MVCC 式的隔離下從快照讀取資料，而 Live Collection 則持續接受寫入。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/snapshot-use-cases.md">快照</a>、<a href="/docs/zh-hant/manage-snapshots.md">管理</a> <a href="/docs/zh-hant/snapshot-use-cases.md">快照</a>和<a href="/docs/zh-hant/snapshot-use-cases.md">快照使用個案</a>。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查詢 / 搜尋順序</h4><p>Search 和 Query 現在可以接受多欄位排序，排序推送到 Milvus 核心，每個欄位可設定<code translate="no">ASC</code> /<code translate="no">DESC</code> 。這可縮小常見的生產差距：如果最相似的項目不是最便宜、最近或最流行的項目，則單憑距離排序的 Top-K 通常無法滿足業務需求。</p>
<p>應用程式不再需要過度擷取結果，並在用戶端重新排序，以表達複合排序。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">依標量欄位排序搜尋結果</a>及<a href="/docs/zh-hant/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">查詢結果排序</a>。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查詢聚合</h4><p>從 Milvus Collection 生成租戶分佈統計、欄位完成度計數或版本滾動進度過去需要將匹配的實體拉回客戶端並在那裡進行聚合。Milvus 3.0 將 SQL 式的標量彙集推入核心。查詢呼叫接受<code translate="no">group_by_fields</code> 和<code translate="no">output_fields</code> 中的聚合表達式，包括<code translate="no">count(*)</code>,<code translate="no">count(&lt;field&gt;)</code>,<code translate="no">sum(&lt;field&gt;)</code>,<code translate="no">avg(&lt;field&gt;)</code>,<code translate="no">min(&lt;field&gt;)</code>, 和<code translate="no">max(&lt;field&gt;)</code> 。彙總會在篩選後於伺服器端進行評估。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">聚合查詢結果</a>。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>嵌入通常是以非同步方式產生的，因此實體可能會比向量先到達。多模式資料也有自然的缺口，例如沒有字幕的影片或沒有圖片的產品。早期的版本沒有很好的答案：應用程式不是延遲寫入直到向量準備好，就是填入一個佔位向量，而這兩種選擇都會損害檢索品質。</p>
<p>Milvus 3.0 支援所有六種向量類型的向量欄位上的 NULL。搜尋會自動跳過 NULL 向量，檢索品質不會受到影響，而且 NULL 向量實際上不佔用任何儲存空間。在這項變更下，<code translate="no">AddField</code> 也延伸到向量欄位：透過<code translate="no">nullable=True</code> ，現有的 Collection 可以線上增加新的向量欄位，而不需要重建。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable Fields</a>。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自訂辭典與同義詞辭典</h4><p>開箱即用的 tokenizer 並不總是符合生產搜尋的品質要求。中文、垂直領域 (如醫學、法律和化學)，以及多語言語料庫都可以從自訂字典和同義詞表中獲益良多。到目前為止，這些資源大多是以應用程式端查詢重寫的方式存在。</p>
<p>Milvus 3.0 新增了 FileResource 機制，用來註冊自訂的 tokenizer 字典、同義字表、停止字表和反編譯規則。註冊後，資源可從任何 tokenizer 或過濾器引用，並在 BM25、分析器和 Text Match 上生效。字典和同義字現在可以集中版本控制和管理，而不是分散在應用程式碼中。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/manage-file-resources.md">管理檔案資源</a>。</p>
<h4 id="Entity-TTL" class="common-anchor-header">實體 TTL</h4><p>對於許多生命週期和法規遵循情境而言，集合層級和分割區層級的 TTL 過於粗略。同一 Collection 內的不同租戶通常有不同的保留規則，個別實體可能需要依據與 Collection 其他部分不一致的排程過期。</p>
<p>Milvus 3.0 支援每個實體的 TTL。在模式中宣告<code translate="no">TIMESTAMPTZ</code> 欄位，透過集合屬性將它標示為 TTL 欄位，Milvus 就會自動回收過期的實體。這包括遺忘權請求、過期的會話資料，以及有界線的會話歷史，而不需要應用程式端清理。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Set Entity-level TTL</a>。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 增加了<code translate="no">MINHASH_LSH</code> 索引，用於基於集合的近似重複檢測，但應用程式在將資料寫入 Milvus 之前仍需計算 MinHash 簽署。</p>
<p>Milvus 3.0 增加了伺服器端的 MinHash 功能。在模式中宣告<code translate="no">VARCHAR</code> 輸入欄位和<code translate="no">BINARY_VECTOR</code> 輸出欄位，附加<code translate="no">FunctionType.MINHASH</code> 函式，Milvus 就會在插入、大量插入和搜尋時計算簽章。連同<code translate="no">MINHASH_LSH</code> ，這在 Milvus 內支援大型資料集、指紋和抄襲偵測的重複資料刪除工作流程。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/minhash-function.md">MinHash 功能</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>一個實體 = 一個向量」的假設不再適用於現代檢索。長文件會被分割成許多小塊，ColBERT 等後期互動模型會為每個符號釋出一個向量，而多模態實體則可能包含多個觀點。</p>
<p>EmbList 會為每個實體儲存一個長度可變的向量清單，並以<code translate="no">DISKANN</code> 作為磁碟索引。當語料庫超出記憶體預算時，磁碟路徑可以控制 RAM 的使用量。EmbList +<code translate="no">DISKANN</code> 是本 RC 中更廣泛的 StructList 系列的第一個變體。該系列的其餘部分，包括 StructList 過濾和 Muvera / Lemur 多向量加速，將以正式的 3.0 版本為目標。</p>
<p>如需詳細資訊，請參閱「<a href="/docs/zh-hant/search-with-embedding-lists.md">使用內嵌清單搜尋</a>」。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制合併</h4><p>生產工作負載會隨著時間累積分段碎片，導致查詢延遲抖動和儲存空間膨脹。</p>
<p>Milvus 3.0 增加了在同步和非同步模式下，在非繁忙時段明確觸發網段壓縮的功能。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/force-merge.md">強制合併壓縮</a>。</p>
<h4 id="Storage-V3" class="common-anchor-header">儲存 V3</h4><p>Milvus 3.0 引入了儲存 V3，這是一個以艙單為基礎的列式儲存引擎，資料和元資料都存放在相容於 S3 的物件儲存上。每個資料集版本都會被擷取為不可變的清單快照，這是一個 Avro 編碼檔案，記錄了資料集所包含的列群、delta 記錄和統計資料。</p>
<p>清單是精簡的 Avro 檔案，而 delta 日誌會記錄實體層級的刪除，而不會重寫資料檔案。這可在資料集成長時保持較小的元資料開銷。此外，manifest 也將元資料追蹤與查詢路徑解耦，讓 Collection 可以管理更多區段，而不會降低查詢效能。</p>
<p>由於狀態儲存在物件儲存上，資料集是自我描述的：任何能存取儲存路徑的讀者都能發現並解釋資料集，而不需要中央目錄。此特性是 External Collection、Snapshot 及未來 Lake 整合的基礎。</p>
