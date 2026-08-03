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
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>發佈日期：2026 年 7 月 29 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th><th>Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 正式發布！本版本基於<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> 版所引進的「湖原生」架構，完成了 beta 版所開啟的各項工作：外部集合（External Collection）涵蓋了更多湖屋（Lakehouse）工作流程；模式（schema）支援線上新增／回填／刪除；稀疏索引已改以 SINDI 為核心重新建構； StructArray 與分面搜尋完善了檢索引擎；FAISS 直通與 TEXT 擴展了索引及模態選項；而 Woodpecker 現可作為獨立服務運行。</p>
<p>請觀看下方影片，進一步了解 Milvus 3.0 並參與與核心維護者的問答環節：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>若您初次接觸 3.0 系列，下方的「Core 3.0 功能回顧」部分概述了 3.0-beta 版所引入的功能；完整的說明請參閱<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta 版本說明</a>。</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">3.0.0 的新功能（相較於 3.0-beta）<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部資料集：更完整的湖屋工作流程</h4><p>3.0-beta 版本引入了「外部資料集」功能：可直接參照原位置的湖屋檔案、建立索引，並在無需將資料複製至 Milvus 的情況下進行搜尋。本次發布進一步擴展此功能，以實現完整的湖屋檢索工作流程。 外部欄位現可作為函式輸出欄位的資料來源，例如 BM25 稀疏向量、MinHash 簽名及文字嵌入向量，因此無需複製來源資料表，即可在 Milvus 內部建立文字及模型衍生的檢索欄位。 Refresh 亦支援增量式模式演進：當外部資料表新增欄位時，Milvus 會修補受影響的區段，而非重建整個集合。</p>
<p>此版本還新增了<code translate="no">milvus-table</code> 外部格式，該格式將Milvus快照元數據和Storage V3清單視為外部來源，因此集合快照本身可作為外部資料表提供服務——批次處理系統與服務系統皆能透過清單支援，共享同一組資料的視圖。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合</a>與<a href="/docs/zh-hant/snapshots.md">快照》</a>。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">彈性資料結構：線上新增、回填及刪除欄位</h4><p>在生產環境中，資料結構並非一成不變——嵌入式模型會被替換、特徵會迭代、欄位會被廢棄——而過去這通常意味著必須重建整個集合，進而導致系統停機或產生雙重寫入。3.0.0 版本解決了這個問題：現在可以在持續提供服務的同時，新增、回填及刪除欄位。</p>
<p>資料回填支援雙向操作。外部回填可處理在 Milvus 外部計算的值：新增一欄、對集合建立快照作為一致的起點、離線執行工作、將值寫回，而 Milvus 會增量地為新欄建立索引——這使得橫跨數億筆記錄的嵌入式模型升級，成為無停機時間的熱路徑。 內部回填則涵蓋由核心演算法衍生的值：將 BM25 或 MinHash 函數附加至現有集合後，其輸出欄位便會自動根據現有資料進行計算。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">為現有集合新增欄位</a>》。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">稀疏索引全面升級：SINDI、Block-Max WAND 及 Block-Max MaxScore</h4><p>Milvus 3.0 全面升級了稀疏向量索引。它引入了新的搜尋<a href="https://arxiv.org/abs/2509.08395">演算法——SINDI</a>、Block-Max WAND 和 Block-Max MaxScore——同時還具備倒排列表壓縮、可配置量化以及按工作負載選擇搜尋演算法等功能。 此外，mmap 載入、序列化及 BM25 評分機制亦經優化，有效降低大規模稀疏向量與全文檢索的索引儲存空間及載入開銷。 在內部基準測試中，壓縮後的 BM25 索引在相近的召回率下，其大小約為 2.6 稀疏索引的 1/3；而在學習過的稀疏嵌入中，SINDI 的每秒查詢量（QPS）最高可達 MaxScore 的約 10 倍。 一旦啟用新索引版本（請參閱「相容性與行為說明」），SINDI 將成為稀疏 IP 搜尋的預設選項，而 MaxScore 則成為 BM25 的預設選項。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray 支援範圍</h4><p>StructArray 現已支援 null 值、位圖索引、對活躍集合進行動態欄位新增，以及透過 upsert 對結構體欄位進行部分更新，並提供相應的 REST 及批量匯入支援。</p>
<p>元素層級搜尋新增了跨向量子欄位的混合搜尋，可針對每個實體設定可配置的彙總方式（最大值／總和／平均值／前 k 項變體），並支援範圍搜尋及其中的分組功能。嵌套篩選涵蓋<code translate="no">element_filter</code> 命題、<code translate="no">MATCH_ANY</code> ／<code translate="no">MATCH_ALL</code> ／<code translate="no">MATCH_LEAST</code> ／<code translate="no">MATCH_MOST</code> ／<code translate="no">MATCH_EXACT</code> 量詞、位置子欄位存取（例如<code translate="no">tags[0][name]</code> ），以及針對結構體欄位的<code translate="no">array_length()</code> 。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/array-of-structs.md">StructArray</a>及<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">搜尋聚合與分面搜尋</h4><p>來自 beta 版的查詢聚合會針對過濾後的資料計算精確統計數值；3.0.0 版本則在搜尋路徑中新增了分面功能。在搜尋時指定一個分面欄位，Milvus 便會返回排名前列的分面值，每個值皆由 ANN 排名中最佳匹配的成員代表，並標註 COUNT 和 AVG 等聚合值 —— 透過單一請求即可實現分面搜尋側邊欄（品牌、價格範圍、屬性）的功能，無需在客戶端進行過度擷取與計數。</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">函式鏈重新排序<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>重新排序現可透過函式鏈 API 進行組合，該 API 會將有序且具型別的處理管線作為單一搜尋請求的一部分來執行。 一個鏈可將 QueryNode 上的早期 L0 重新評分與 Proxy 上的 L2 後縮減重新排序結合，無需客戶端協調即可支援分數轉換與組合、基於模型的重新排序、排序以及候選結果篩選。 此版本還新增了針對 L0 重新排序的原生 XGBoost 評分功能，使用已註冊為 FileResources 的 UBJ 模型，並搭配 Hugging Face 推論提供者，以實現伺服器管理的文字嵌入與句子相似度重新排序。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 長文本欄位</h4><p>TEXT 欄位使長文本成為一等公民，並移除了儲存端長度限制：它們支援<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 以及 BM25。小於 64 KB 的值保持內聯儲存；較大的值則存入分區層級的 Vortex 格式 LOB 檔案中，而欄位僅儲存<code translate="no">(file_id, offset)</code> 參考連結。 由於 LOB 檔案在各分段間共享，因此壓縮操作僅需移動參考而非重寫內容。對於 RAG 而言，這意味著可透過單次 I/O 從同一儲存庫中檢索向量與原始文字——無需操作外部 BLOB 儲存庫。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS 索引直通</h4><p>新的<code translate="no">FAISS</code> 索引類型可透過<code translate="no">faiss_index_name</code> 參數接受任意的Faiss索引生成器字串 —<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> — 並傳遞搜尋參數，因此Faiss配方可直接在Milvus上重現。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">支援 Vortex 與 Lance 格式</h4><p>儲存層新增兩種開放式列式格式：Vortex 作為新一代內部格式——具備自適應編碼（字典、RLE、位元打包、浮點數專用壓縮）、零拷貝解壓縮，並針對向量與標量混合工作負載進行優化——以及 Lance，與 Parquet 一同用於開放生態系統的資料交換。 Vortex 將成為預設的內部格式，其路徑圖中還包含過濾器下推（filter pushdown）及本地變體。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker 獨立部署</h4><p>作為串流寫入路徑核心的 WAL —— Woodpecker，現可作為獨立服務部署，而非嵌入其他節點中 —— 具備獨立擴展、故障隔離及可觀察性，如同任何其他微服務。這對大型叢集和高寫入工作負載至關重要。</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0 功能回顧<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>以下功能於<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>版本中推出，並已納入 3.0.0 版本；完整說明請參閱 beta 版本說明。</p>
<ul>
<li><strong>外部集合</strong>— 原地查詢湖屋資料（Parquet、Lance、Iceberg、Vortex）：零拷貝、唯讀，並透過增量刷新進行同步。</li>
<li><strong>快照</strong>— 透過區段參考建立的特定時間點唯讀彙總檢視，邊際儲存空間近乎為零。</li>
<li><strong>儲存 V3 (Loon)</strong>— 基於清單的物件儲存列式儲存；為「快照」與「外部集合」奠定基礎。</li>
<li><strong>查詢／搜尋 ORDER BY</strong>— 伺服器端多欄位排序，支援各欄位 ASC／DESC 排序。</li>
<li><strong>查詢聚合</strong>— 支援帶有 group-by 的 COUNT / SUM / AVG / MIN / MAX，於伺服器端進行運算。</li>
<li><strong>EmbList + DiskANN</strong>— 針對 StructArray 嵌入清單的磁碟端多向量索引，具備 Muvera 和 Lemur 等加速路徑。</li>
<li><strong>MinHash 函式（doc-in、doc-out）</strong>—— 伺服器端 MinHash 簽名，搭配<code translate="no">MINHASH_LSH</code> 進行近似重複項目偵測。</li>
<li><strong>可為 NULL 的向量</strong>— 六種向量類型皆支援 NULL；搜尋會跳過 NULL 列，且 AddField 功能已擴展至向量欄位。</li>
<li><strong>實體 TTL</strong>— 由 TIMESTAMPTZ 欄位驅動的每行過期機制。</li>
<li><strong>FileResource</strong>— 由叢集管理的詞典、同義詞清單及停用詞清單，適用於分析器、BM25 及 Text Match。</li>
<li><strong>強制合併</strong>— 由運算子觸發的片段壓縮，支援同步或非同步模式。</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">相容性與行為說明<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3（Loon）預設為停用狀態。</strong>依賴此功能的特性（例如 Snapshot 和 TEXT 欄位）需透過<code translate="no">common.storage.useLoonFFI</code> 手動啟用。Storage V3 將於後續版本中預設啟用。</li>
<li><strong>2.6 → 3.0 的相容性與回滾功能均受保證</strong>— 3.0 部署可回滾至 2.6。然而，一旦啟用或使用會變更序列化資料格式的功能（例如 Storage V3），便無法再進行回滾。</li>
<li><strong>目前新索引版本採自願啟用機制。</strong>新引入的索引演算法<strong>在</strong>生效前，需手動將目標索引版本提升（例如將<code translate="no">dataCoord.targetVecIndexVersion</code> 設為 10，<code translate="no">dataCoord.targetScalarIndexVersion</code> 設為 4）；後續版本將預設啟用這些功能。</li>
<li><strong>GPU 映像已遷移至 CUDA 12.9</strong>，且不再維持與 Ubuntu 20.04 的 GPU 相容性。</li>
</ul>
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
<p>Milvus 3.0-beta 透過與 Open Lake 生態系統的全新整合，擴展了 Milvus 向量資料庫的功能：「外部集合 (External Collection)」讓 Milvus 能以零拷貝方式查詢外部 Lake 資料表，而 Spark 則可透過 Snapshot 直接讀取 Milvus 集合。 此版本還帶來更豐富的檢索功能、更具表現力的資料結構、更深入的文字搜尋自訂選項、更精細的資料與模型生命週期控制，以及更多運算子端的控制選項。Milvus 3.0 是 Zilliz Lakebase 的核心內核，驅動其統一的服務、發現與批次處理功能。</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部集合</h4><p>在典型的 AI 資料管線中，數 TB 的嵌入向量與元資料早已以 Parquet、Lance 或 Iceberg 資料表的形式存放於物件儲存中。將這些資料複製到 Milvus 會使儲存成本加倍，還需建立並維持同步的 ETL 管線，且會使資料治理權從客戶手中移出。</p>
<p>「外部集合」功能消除了複製的必要。Milvus 集合可直接參照檔案的原始位置，而 Milvus 僅負責管理資料結構、索引及查詢執行。 增量更新可確保 Collection 與底層檔案保持同步。對於無法將資料移出資料湖的客戶（例如金融和醫療保健團隊），可直接在資料所在位置執行向量檢索。單一駐留於資料湖的資料集，亦可同時由多個 Milvus 實例提供服務。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服務與批次探索通常需要同時存取同一個 Collection。A/B 模型評估、大規模去重、回填驗證以及版本回滾，在寫入操作仍在進行時，皆需 Collection 的穩定視圖。</p>
<p>快照透過參照現有區段（而非複製資料）來建立集合的特定時間點唯讀檢視，因此邊際儲存成本接近於零。批次工作可在 MVCC 風格的隔離機制下從快照讀取資料，同時活躍的集合仍持續接受寫入。</p>
<p>如需更多資訊，請參閱「<a href="/docs/zh-hant/snapshots.md">快照</a>」、<a href="/docs/zh-hant/manage-snapshots.md">「管理快照</a>」及「<a href="/docs/zh-hant/snapshot-use-cases.md">快照使用案例</a>」。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查詢／搜尋排序</h4><p>搜尋與查詢現已支援多欄位排序，排序作業已下推至 Milvus 核心，且可針對各欄位設定 `<code translate="no">ASC</code> ` 與 `<code translate="no">DESC</code> `。這彌補了生產環境中常見的缺口：當最相似的項目並非最便宜、最新或最熱門時，僅依距離排序的「Top-K」結果往往無法滿足業務需求。</p>
<p>應用程式不再需要過度擷取結果，並在客戶端重新排序以呈現複合式排名。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">依標量欄位排序搜尋結果</a>》及《<a href="/docs/zh-hant/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">排序查詢結果</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查詢彙總</h4><p>過去若要從 Milvus 集合中產生租戶分佈統計、欄位完整性計數或版本部署進度，必須將符合條件的實體拉回客戶端並在當地進行彙總。 Milvus 3.0 將 SQL 風格的標量彙總功能整合至核心中。查詢呼叫可接受 `<code translate="no">group_by_fields</code> ` 以及 `<code translate="no">output_fields</code>` 中的彙總表達式，包括 `<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>` 及 `<code translate="no">max(&lt;field&gt;)</code>`。彙總會在過濾後於伺服器端進行評估。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">彙總查詢結果》</a>。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>嵌入向量通常是異步產生的，因此實體可能在對應的向量抵達之前就已出現。 多模態資料本身也存在自然缺口，例如沒有字幕的影片或沒有圖片的產品。早期版本對此並無理想解決方案：應用程式要麼延遲寫入直到向量準備就緒，要麼填入佔位向量，而這兩種選擇都會影響檢索品質。</p>
<p>Milvus 3.0 支援所有六種向量類型中向量欄位的 NULL 值。搜尋會自動跳過 NULL 向量，檢索品質不受影響，且 NULL 向量實際上不佔用任何儲存空間。此變更亦延伸至<code translate="no">AddField</code> 中的向量欄位：透過 `<code translate="no">nullable=True</code>`，現有的 Collection 可在線上新增向量欄位，無需重建。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為 NULL 的欄位</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自訂詞典與同義詞詞典</h4><p>預設的詞元化器未必總是能滿足生產環境的搜尋品質要求。中文、醫學、法律和化學等垂直領域，以及多語言語料庫，都能從自訂詞典和同義詞表中獲益良多。迄今為止，這些資源大多以應用程式端的查詢重寫形式存在。</p>
<p>Milvus 3.0 新增了 FileResource 機制，用於註冊自訂分詞器的詞典、同義詞清單、停用詞清單以及複合詞拆分規則。 資源一旦註冊，即可從任何分詞器或篩選器中引用，並對 BM25、分析器及文字比對功能生效。詞典和同義詞現可進行版本控制並集中管理，無需分散於各處的應用程式程式碼中。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/manage-file-resources.md">管理檔案資源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">實體 TTL</h4><p>對於許多生命週期與合規情境而言，集合層級和分區層級的 TTL 過於粗略。同一集合內的不同租戶通常有不同的保留規則，且個別實體可能需要依照與該集合其餘部分不一致的時程過期。</p>
<p>Milvus 3.0 支援「每實體 TTL」。在資料結構中宣告一個<code translate="no">TIMESTAMPTZ</code> 欄位，並透過 Collection 屬性將其標記為 TTL 欄位，Milvus 便會自動回收已過期的實體。此功能涵蓋「被遺忘權」請求、過期的會話資料，以及無需應用程式端清理即可實現的有限對話歷史紀錄。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">設定實體層級 TTL》</a>。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（Doc-in, Doc-out）</h4><p>Milvus 2.6 新增了<code translate="no">MINHASH_LSH</code> 索引，用於基於集合的近重複檢測，但應用程式在將資料寫入 Milvus 之前，仍需計算 MinHash 簽名。</p>
<p>Milvus 3.0 新增了伺服器端的 MinHash 函式。只需在資料結構中宣告<code translate="no">VARCHAR</code> 輸入欄位與<code translate="no">BINARY_VECTOR</code> 輸出欄位，並附加<code translate="no">FunctionType.MINHASH</code> 函式，Milvus 便會在插入、批次插入及搜尋過程中自動計算簽名。結合<code translate="no">MINHASH_LSH</code> ，此功能可支援大型資料集的去重工作流程、指紋識別，以及在 Milvus 內的剽竊檢測。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/minhash-function.md">MinHash 函式</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「一個實體 = 一個向量」的假設已不再適用於現代檢索。長篇文件會被分割成多個片段，ColBERT 等延遲交互模型會針對每個標記輸出一個向量，而多模態實體則可能包含多種視圖。</p>
<p>EmbList 針對每個實體儲存一個可變長度的向量清單，並以<code translate="no">DISKANN</code> 作為磁碟索引。當語料庫規模超過記憶體預算時，此磁碟路徑可有效控制 RAM 的使用量。EmbList +<code translate="no">DISKANN</code> 是本次 RC 版本中更廣泛的 StructList 家族的首個變體。 該家族的其餘功能，包括 StructList 過濾以及 Muvera / Lemur 多向量加速，預計將於正式 3.0 版本中推出。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/search-with-embedding-lists.md">使用嵌入式清單進行搜尋</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制合併</h4><p>生產環境中的工作負載會隨時間累積區段碎片，這會導致查詢延遲波動及儲存空間膨脹。</p>
<p>Milvus 3.0 新增了在非高峰時段以同步和非同步模式明確觸發區段壓縮的功能。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/force-merge.md">強制合併壓縮</a>》。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 推出了 Storage V3，這是一種基於清單的列式儲存引擎，其資料與元資料皆存放於相容於 S3 的物件儲存中。每個資料集版本皆以不可變的清單快照形式保存，該快照為 Avro 編碼檔案，記錄了構成該資料集的欄位群組、增量日誌及統計資料。</p>
<p>清單是精簡的 Avro 檔案，而增量日誌則在不重寫資料檔案的情況下記錄實體層級的刪除操作。這能確保隨著資料集規模擴大，元資料的開銷仍能保持在低水平。此外，清單將元資料追蹤與查詢路徑解耦，使 Collection 能夠管理更多分段，同時不影響查詢效能。</p>
<p>由於狀態儲存於物件儲存中，資料集具有自描述性：任何能存取儲存路徑的讀取者，皆可無需中央目錄即可發現並解讀資料集。此特性為「外部集合」、「快照」以及未來的資料湖整合奠定了基礎。</p>
