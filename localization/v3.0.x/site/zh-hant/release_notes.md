---
id: release_notes.md
summary: Milvus 發行說明
title: 發行說明
---
<h1 id="Release-Notes" class="common-anchor-header">發行說明<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>了解 Milvus 的最新動態！本頁面彙整了各版本中的新功能、改進、已知問題及錯誤修正。建議您定期造訪此頁面，以掌握最新更新資訊。</p>
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
    </button></h2><p>發佈日期：2026年5月9日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta 透過與 Open Lake 生態系統的全新整合，擴展了 Milvus 向量資料庫的功能：External Collection 讓 Milvus 能以零拷貝方式查詢外部 Lake 資料表，而 Spark 則可透過 Snapshot 直接讀取 Milvus 集合。 此版本還帶來更豐富的檢索功能、更具表現力的資料結構、更深入的文字搜尋自訂選項、更精細的資料與模型生命週期控制，以及更多運算子端的控制選項。Milvus 3.0 是 Zilliz Lakebase 的核心內核，驅動其統一的服務、探索與批次處理功能。</p>
<p>觀看下方影片，進一步了解 Milvus 3.0 並參與與核心維護者的問答環節：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h3 id="Key-Features" class="common-anchor-header">主要功能<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部集合</h4><p>在典型的 AI 資料管線中，數 TB 的嵌入向量與元資料早已以 Parquet、Lance 或 Iceberg 表格的形式存放於物件儲存系統中。將這些資料複製到 Milvus 會使儲存成本翻倍，還需建立並維持同步的 ETL 管線，且會使資料治理權限脫離客戶掌控。</p>
<p>「外部集合」功能消除了複製需求。Milvus 集合可直接引用原始檔案位置，而 Milvus 僅負責管理資料結構、索引及查詢執行。 增量更新機制可確保 Collection 與底層檔案保持同步。對於無法將資料移出資料湖的客戶（例如金融與醫療團隊），可直接在資料原位置執行向量檢索。單一駐留於資料湖的資料集，亦可同時由多個 Milvus 執行個體提供服務。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服務與批次探索常需同時存取同一個 Collection。A/B 模型評估、大規模去重、回填驗證及版本回滾等作業，皆需在寫入仍在進行時，取得 Collection 的穩定視圖。</p>
<p>快照透過參照現有區段而非複製資料，為集合建立一個特定時間點的唯讀檢視，因此邊際儲存成本接近於零。批次工作可在 MVCC 風格的隔離環境下從快照讀取資料，同時活的集合仍持續接受寫入。</p>
<p>如需更多資訊，請參閱「<a href="/docs/zh-hant/snapshots.md">快照</a>」、<a href="/docs/zh-hant/manage-snapshots.md">「管理快照</a>」及「<a href="/docs/zh-hant/snapshot-use-cases.md">快照使用案例</a>」。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查詢 / 搜尋 Order By</h4><p>搜尋與查詢功能現已支援多欄位排序，排序邏輯已下推至 Milvus 核心，且可針對各欄位設定 `<code translate="no">ASC</code> ` 與 `<code translate="no">DESC</code> `。此功能彌補了生產環境中常見的缺口：當最相似的項目並非最便宜、最新或最熱門時，僅依距離排序的 Top-K 結果往往無法滿足業務需求。</p>
<p>應用程式不再需要過度擷取結果，並在客戶端重新排序以呈現複合式排名。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">《按標量欄位排序搜尋結果</a>》及《<a href="/docs/zh-hant/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">排序查詢結果</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查詢聚合</h4><p>過去若要從 Milvus 集合產生租戶分佈統計、欄位完整性計數或版本部署進度，必須將符合條件的實體拉回客戶端並在當地進行彙總。 Milvus 3.0 將 SQL 風格的標量聚合推入核心。查詢呼叫接受 `<code translate="no">group_by_fields</code> ` 以及 `<code translate="no">output_fields</code>` 中的聚合表達式，包括 `<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>` 以及 `<code translate="no">max(&lt;field&gt;)</code>`。聚合會在過濾後於伺服器端進行評估。</p>
<p>如需更多資訊，請參閱「<a href="/docs/zh-hant/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">彙總查詢結果</a>」。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>嵌入向量通常是異步產生的，因此實體可能在對應的向量抵達之前就已送達。 多模態資料本身也存在自然缺口，例如沒有字幕的影片或沒有圖片的產品。早期版本對此沒有好的解決方案：應用程式要麼延遲寫入直到向量準備就緒，要麼填入一個佔位符向量，而這兩種選擇都會損害檢索品質。</p>
<p>Milvus 3.0 支援所有六種向量類型中的向量欄位使用 NULL。搜尋會自動跳過 NULL 向量，檢索品質不受影響，且 NULL 向量實際上不佔用任何儲存空間。此變更亦將「<code translate="no">AddField</code> 」功能擴展至向量欄位：透過 `<code translate="no">nullable=True</code>`，現有的 Collection 可在線上新增向量欄位，無需重建。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為 NULL 的欄位</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自訂字典與同義詞字典</h4><p>預設的詞元化器未必總是能滿足生產環境的搜尋品質要求。中文、醫學、法律和化學等垂直領域，以及多語言語料庫，都能從自訂詞典和同義詞表中獲益良多。迄今為止，這些資源大多以應用程式端的查詢重寫形式存在。</p>
<p>Milvus 3.0 新增了 FileResource 機制，用於註冊自訂分詞器的詞典、同義詞清單、停用詞清單以及複合詞拆分規則。 資源註冊後，任何分詞器或篩選器皆可引用，並對 BM25、分析器及文字比對功能生效。詞典與同義詞現可進行版本控制並集中管理，無需分散於各處應用程式程式碼中。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/manage-file-resources.md">管理檔案資源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">實體 TTL</h4><p>對於許多生命週期與合規情境而言，集合層級與區隔層級的 TTL 過於粗略。同一集合內的不同租戶通常有不同的保留規則，且個別實體可能需要依照與集合其餘部分不一致的時程過期。</p>
<p>Milvus 3.0 支援「每實體 TTL」。在資料結構中宣告一個 `<code translate="no">TIMESTAMPTZ</code> ` 欄位，並透過 Collection 屬性將其標記為 TTL 欄位，Milvus 便會自動回收已過期的實體。此功能涵蓋「被遺忘權」請求、過期的會話資料，以及無需應用程式端清理即可實現的有限對話歷史紀錄。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">設定實體層級 TTL》</a>。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 新增了<code translate="no">MINHASH_LSH</code> 索引，用於基於集合的近似重複檢測，但應用程式在將資料寫入 Milvus 之前，仍需自行計算 MinHash 簽名。</p>
<p>Milvus 3.0 新增了伺服器端的 MinHash 函式。在資料結構中宣告一個<code translate="no">VARCHAR</code> 輸入欄位和一個<code translate="no">BINARY_VECTOR</code> 輸出欄位，並附加一個<code translate="no">FunctionType.MINHASH</code> 函式，Milvus 便會在插入、批量插入和搜尋過程中計算簽名。結合<code translate="no">MINHASH_LSH</code> ，這支援 Milvus 內的大型資料集去重工作流程、指紋識別以及剽竊檢測。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/minhash-function.md">MinHash 函數</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「一個實體 = 一個向量」的假設已不再適用於現代檢索。長篇文件會被分割成多個片段，ColBERT 等延遲交互模型會針對每個標記輸出一個向量，而多模態實體可能包含多種視圖。</p>
<p>EmbList 針對每個實體儲存一個可變長度的向量清單，並以<code translate="no">DISKANN</code> 作為磁碟索引。當語料庫超過記憶體預算時，此磁碟路徑可有效控制 RAM 使用量。EmbList +<code translate="no">DISKANN</code> 是本次 RC 版本中更廣泛的 StructList 家族的首個變體。 該家族的其餘功能，包括 StructList 過濾以及 Muvera / Lemur 多向量加速，預計將於正式 3.0 版本中推出。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/search-with-embedding-lists.md">使用嵌入式清單進行搜尋</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制合併</h4><p>生產環境的工作負載隨時間累積區段碎片，這會導致查詢延遲波動及儲存空間膨脹。</p>
<p>Milvus 3.0 新增了在非高峰時段以同步和非同步模式明確觸發區段壓縮的功能。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/force-merge.md">強制合併壓縮</a>》。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 推出 Storage V3，這是一種基於清單的列式儲存引擎，其資料與元資料皆存放於相容 S3 的物件儲存中。每個資料集版本皆以不可變的清單快照形式保存，此為 Avro 編碼的檔案，記錄了構成該資料集的欄位群組、增量日誌及統計資料。</p>
<p>清單是精簡的 Avro 檔案，而增量日誌則在不重寫資料檔案的情況下記錄實體層級的刪除操作。這使得隨著資料集增長，元資料的開銷仍能保持在低水平。清單還將元資料追蹤與查詢路徑解耦，使 Collection 能夠管理更多區段，同時不影響查詢效能。</p>
<p>由於狀態儲存於物件儲存中，資料集具有自描述性：任何能存取儲存路徑的讀取者，皆可無需中央目錄即可發現並解讀資料集。此特性為外部集合、快照以及未來的資料湖整合奠定了基礎。</p>
