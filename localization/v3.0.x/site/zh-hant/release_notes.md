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
    </button></h1><p>了解 Milvus 的最新動態！本頁面彙整了各版本中的新功能、改進項目、已知問題及錯誤修正。建議您定期造訪此頁面，以掌握最新更新資訊。</p>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>發佈日期：2026 年 9 月 9 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th><th>Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>我們很高興宣布 Milvus v3.0.1 正式發布！此版本新增了 REST v2 快照管理功能、擴展的重新排序能力，以及在 Go 客戶端和 RESTful API 中對 TEXT 欄位的支援，同時也針對 Storage V3、資料一致性及安全性進行了效能優化與錯誤修正。</p>
<h3 id="Features-improvements" class="common-anchor-header">功能改進<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
<li>新增 REST v2 API，用於集合層級的原生快照管理與非同步還原 (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>,<a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>新增可配置的結果數閾值，用以控制搜尋與查詢操作中 Take 輸出路徑的選取 (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>在 Go 客戶端和 RESTful API 中新增對 TEXT 欄位的支援（<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>）</li>
<li>為外部資料表新增可配置的初始與最大讀取 IOPS 速率 (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>新增外部集合刷新任務的選配設定，使其在報告完成前會等待所有分段完成索引，同時不延遲資料發佈 (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>在搜尋函式鏈中新增 L1 重新排序支援 (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>在 FunctionScore、REST、傳統混合搜尋及 Go 客戶端中，新增具加權 RRF 重新排序功能，並支援針對每個 ANN 請求設定可選權重 (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>,<a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">穩定性改進<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
<li>改進幾何 RTree 索引與快取的記憶體安全性，並優化無法解析的 WKB 及空幾何查詢的處理機制 (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>透過恢復全進程範圍的暫存記憶體預算，並修正同時載入 Storage V2/V3 欄位與標量 V3 索引時的記憶體估算值，以改善記憶體管理 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>透過並行化讀取操作，並將原始向量資料串流至磁碟，減少外部集合索引建置過程中的下載瓶頸與記憶體使用量（<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>）</li>
<li>透過批次處理客戶端追加操作並公開同步設定，改善小批次、高並發工作負載下的 Woodpecker 吞吐量 (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>改善了記錄讀取器的擁有權與生命週期一致性、空 Blob 處理，以及儲存與壓縮路徑間的讀取錯誤回報 (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>透過四路交錯管線，並針對碰撞與重新哈希邊界加入防護機制，來提升分組哈希探測的效率 (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>針對未包含 BM25 或 MinHash 輸出欄位的集合，透過跳過 WAL 插入本體解析來降低插入處理開銷 (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>透過在各執行層間保留暫時性與永久性錯誤分類，改進儲存故障回報與重試處理 (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>預設啟用 GIS 粗略/精細拆分以及同欄位謂詞融合，以提升空間查詢效能 (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>透過基於共享待辦清單的准入控制與交替提交優先級，改進文字索引與 JSON 拆分任務的排程 (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>新增對密封區段偏移量映射的 mmap 支援，並提供專用的載入選項與磁碟資源計量功能 (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>透過按需執行各欄位的區塊記憶體估算，優化 Storage V2 資料載入 (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>新增伺服器端 AutoIndex 支援，適用於綁定至新函式輸出欄位的索引，允許 add_function_field 請求省略索引參數或指定 AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>透過增量報告（並保留完整報告作為備用方案）來減少 QueryNode 分佈報告的資料量，並降低指標收集過程中的記憶體分配 (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>,<a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>將 bcrypt 成本從 4 提高至 10，以增強密碼雜湊強度，並要求輪替憑證才能升級現有雜湊值 (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>在 Parquet 匯入過程中，僅讀取結構體陣列子欄位所需的葉節點欄位，從而減少冗餘解碼 (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>透過多輪基於大小的規劃來改進強制合併分組，並廢棄了舊式的規劃閾值設定 (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>升級 cgosymbolizer，以防止 Milvus 作為 PID 1 運行的進程在發生原生錯誤後陷入懸掛狀態 (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>改進語義標示輸入的行數驗證機制 (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>透過可配置的寫入重試退避機制，改進匯入重試控制 (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>,<a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>,<a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>透過回收過期的統計資料版本並持久化終端狀態，改進分析任務的生命週期管理 (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>,<a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>透過在鎖定超時後等待區段釋放，改進區段生命週期協調機制 (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>透過 k-路合併，改進資料壓縮的儲存排序機制 (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>透過在區塊存取、表達式評估及 JSON 統計資料中保留壓縮遮罩，減少可為空欄位的有效性緩衝區擴展 (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>透過防止敏感憑證、API 金鑰、RBAC 密碼雜湊值及外部收集來源詳細資訊在日誌或錯誤訊息中外洩，強化其保護機制 (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>,<a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>,<a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>透過樂觀 CAS 驗證及針對符合條件的衝突進行安全重試，改進部分更新之並發控制 (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>改進了增長區段讀取快照的穩定性及模式快照存活時間管理 (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>減少備份過程中對授權元資料的重複掃描 (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>透過將可為空向量 ID 映射移至索引層、統一邏輯 ID 處理，並支援密封索引的 mmap 後端映射，以改進其效能 (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>改進 CPU 和 GPU 建置中 Sonic JIT 編譯與 Go 外掛程式載入之間的同步 (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>透過元資料快取改進代理寫入路徑的通道解析，消除冗餘的協調器 RPC 並改善錯誤分類 (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>在已報告的基準測試中，當 topk=100000 時，將召回計算時間從約 3.08 秒縮短至 18.5 毫秒 (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>透過重複使用有效性位圖、減少冗餘的 null 偏移量儲存，以及加速位元集複製，來優化可為 null 欄位的篩選 (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>,<a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>,<a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>當不同元素的計數達到位圖基數限制時，透過使用 STL_SORT 來改善嵌套結構體子欄位的混合標量索引 (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>改進元數據快取中區段 ID 篩選的效率（<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>）</li>
<li>減少哈希輔助函式中的記憶體分配 (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>透過消除每次比較時的映射查詢，優化合併後重新排序結果的排序（<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>）</li>
<li>在處理 JSON 預設值和非 NUL 終止的字串視圖時，提升了記憶體安全性 (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>透過範圍限定統一編譯、改善編譯器快取以及減少冗餘編譯工作，縮短了 C++ 建置時間 (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>透過在抓取時從快取的檔案系統收集指標，同時保留現有的指標名稱和標籤，以改善檔案系統指標的覆蓋範圍和即時性 (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>新增可刷新設定 `growingBuildThreadRate`，用以配置每個增長區段臨時索引建置的執行緒數，同時保留單執行緒預設值 (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>透過回溯移植，在 3.0 版本中新增 mmap 欄位資料寫回支援，並提供預設為停用的 queryNode.mmap.writeback 選項 (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>修正了 JSON、ARRAY 和 TIMESTAMPTZ 查詢中不正確的結果與不一致的謂詞驗證問題，包括混合型別謂詞、大數值比較，以及跨多個批次進行篩選的情況 (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>修正當分段的來源檔案橫跨多個任務時，在平行外部集合刷新期間，刷新資料不一致的問題 (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>修正了 MATCH 表達式接受未在元素層級運作的謂詞的問題 (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>修正了無匹配結果的搜尋會因「不支援的 ID 類型」錯誤而失敗的問題 (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>透過新增可配置的遷移超時（預設為 10 秒），修正了獨立部署的 Milvus 在關機時會卡住的問題 (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>修正當 DataNode 工作節點在多個服務叢集中共用時，外部資料表嵌入請求會使用錯誤叢集識別碼的問題 (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>修正了導致無法更新 TextEmbedding 函數的 integration_id 和 model_deployment_id 的問題 (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>修正了 HTTP JSON 回應中，針對失敗的回填區段未明確包含 `ok=false` 狀態碼的問題 (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>修正了在傳輸或低速超時後重試時，MinIO 物件上傳會因 HTTP 400 XAmzContentChecksumMismatch 錯誤而失敗的問題 (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>,<a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>修復了在啟用串流服務時，QueryNodes 之間的區段平衡會陷入停滯的問題 (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>,<a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>修正了當無法重建保留記錄時，混合壓縮過程中會發生無預警資料遺失的問題 (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>修復了快照還原時遺失集合設定，並意外預設為「強一致性」的問題 (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>修正了串流刪除操作遺漏新載入的已封存區段的問題，導致已刪除資料仍可被查詢 (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>修正了針對空資料時，嵌套索引無法正確建立的問題 (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>修正切換至串流服務時發生死鎖，導致操作無限期等待的問題 (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>修正了在壓縮和記錄重建期間幾何形狀預設值不正確的問題，以及 Parquet 匯入中預設填充的幾何形狀值標記為 null 的錯誤 (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>修正了 DataCoord 重新啟動後，在緊湊化和恢復過程中，有效的 V3 分段被拒絕的問題 (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>,<a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>,<a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>,<a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>,<a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>,<a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>修正了在結構體（struct）的 VARCHAR 陣列子欄位上使用混合標量索引時，因缺少版本元資料而導致的區段載入失敗問題 (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>修正了重新開啟已更新的清單時，外部欄位無法重新整理的問題 (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>修正了在包含時間依賴條件的搜尋中時區處理不當的問題 (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>修正了搜尋請求中對 ArrayOfVector 輸入處理不正確的問題 (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>修正了插入操作無法拒絕超過支援大小限制的資料列的問題 (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>修正臨時索引忽略已設定目標索引版本的問題 (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>修正使用 order_by 的查詢無法返回密集向量輸出欄位的問題 (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>,<a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>修正了從權限群組中移除後，已撤銷的權限仍保持有效之問題 (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>修正 DataCoord 重啟後，Storage V3 分段的二進位日誌檔案數量與儲存格式標籤不正確的問題 (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>,<a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>修正了因工作節點版本檢查不可靠，或不斷重試不支援的工作節點直至超時，導致外部快照還原卡住的問題 (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>修正了使用 3.0.0 版本遺留 STLSORT 檔案時，HYBRID 索引在結構陣列子欄位上的區段載入失敗問題，且無需重新建立索引 (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>修復了處理長度為零的 Arrow C 資料緩衝區時發生的當機問題 (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>修正了在清單錯誤後載入或重新開啟 Storage V3 分段時，錯誤的失敗處理機制，並保留現有分段狀態以進行安全重試 (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>修正了當 ARRAY 元素篩選器在後續元素之前遇到整批 NULL 或空陣列時，所導致的查詢失敗問題 (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>修正了在集合模式變更後，後填任務提交過期嵌入的狀況 (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>修正了 Storage V3 記錄中缺失的欄位被返回為 NULL 而非其宣告的預設值的問題 (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>,<a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>,<a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>修復了導致無法使用 IAM/OAuth 憑證在 GCS 上還原 Storage V3 快照的伺服器端複製錯誤，包括大於 5 GiB 的物件複製 (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>修正了透過外部代理伺服器埠的串流 gRPC 呼叫進行未經身份驗證的存取問題 (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>修復了叢集緊湊化後資料失去原始提交時間戳記的問題 (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>修正了在已存在 Storage V2 分段的集合中新增 TEXT 欄位後，因重複的刷新失敗而導致的串流節點當機問題 (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>修正了 Storage V3 分段中已過期的資料列無法觸發基於 TTL 欄位的壓縮，並會持續儲存直至滿足另一項壓縮條件的情況 (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>修正 CDC 複製匯入過程中，來源與目標集合間自動產生的一級鍵不一致問題 (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>修復了在 WAL 後端遷移期間，並行寫入資料遺失的問題 (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>,<a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>,<a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>修正了重建或壓縮後含有高基數資料的嵌套 HYBRID 索引，在回滾至舊版本後變得無法讀取的問題 (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>修正了外部密集向量列中對 null 元素的處理方式，現在接受所有欄位皆為 null 的可為空列，並新增可配置的處理機制來處理部分欄位為 null 的列 (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>修正了串流節點故障轉移後，V3 分段的列數不正確以及排序壓縮重複失敗的問題 (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>修正了將範圍條件與 OR 運算子結合的查詢會遺漏包含下限的記錄的問題 (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>修正了根據主鍵進行搜尋時無法保留所要求的 ID 順序的問題 (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>修正了在啟用 Storage V3 後新增 TEXT 欄位，會導致現有 Storage V2 擴充分段無法載入，進而干擾刷新、排序和索引操作的問題 (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>修正了快照包含未提交的 Storage V3 分段的問題，此問題會導致還原操作報告成功，但還原的分段卻無法載入 (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>,<a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>已修正當 Storage V3 文字索引的檔案儲存於嵌套的任務或版本目錄中時，無法載入的問題 (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
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
<p>Milvus 3.0.0 正式發布！本版本基於<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> 版中引入的「湖原生」架構，完成了 beta 版所開啟的各項工作：外部集合（External Collection）涵蓋更多湖屋（Lakehouse）工作流程；模式（schema）支援線上新增／回填／刪除；稀疏索引（sparse index）已基於 SINDI 重新建構； StructArray 與分面搜尋完善了檢索引擎；FAISS 直通與 TEXT 擴展了索引與模態的選擇範圍；而 Woodpecker 現可作為獨立服務運行。</p>
<p>請觀看下方影片，進一步了解 Milvus 3.0 並參與與核心維護者的問答環節：</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>若您初次接觸 3.0 系列，下方的「Core 3.0 功能回顧」部分彙整了 3.0-beta 版所引入的功能；完整的說明請參閱<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta 版發行說明</a>。</p>
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">外部資料集：更完整的湖屋工作流程</h4><p>3.0-beta 版本推出了「外部資料集」功能：可就地參照湖屋檔案、建立索引，並在無需將資料複製至 Milvus 的情況下進行搜尋。本次發布進一步擴展此功能，以實現完整的湖屋檢索工作流程。 外部欄位現可作為函數輸出欄位的資料來源，例如 BM25 稀疏向量、MinHash 簽名及文字嵌入向量，因此無需複製來源資料表，即可在 Milvus 內部建立文字及模型衍生的檢索欄位。 Refresh 亦支援增量式模式演進：當外部資料表新增欄位時，Milvus 會修補受影響的區段，而非重建整個集合。</p>
<p>此版本還新增了<code translate="no">milvus-table</code> 外部格式，該格式將Milvus快照元資料和Storage V3清單視為外部來源，因此集合快照本身可作為外部資料表提供服務——批次處理系統和服務系統都能獲得由清單支援的相同資料共享檢視。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合</a>與<a href="/docs/zh-hant/snapshots.md">快照》</a>。</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">彈性資料結構：線上新增、回填及刪除欄位</h4><p>在生產環境中，模式並非一成不變——嵌入式模型會被替換、特徵會迭代、欄位會被廢棄——而過去這些變更往往意味著必須重建整個集合，進而導致停機或產生雙重寫入。3.0.0 版本彌補了這一缺口：現在可以在持續提供服務的同時，新增、填補及刪除欄位。</p>
<p>資料回填可雙向運作。外部回填處理在 Milvus 外部計算的值：新增一欄、將集合快照作為一致的起點、離線執行工作、將值寫回，而 Milvus 會增量地為新欄建立索引——橫跨數億筆資料的嵌入式模型升級，將成為無停機時間的熱路徑。 內部回填則涵蓋內核衍生的值：將 BM25 或 MinHash 函數附加至現有集合，其輸出欄位便會自動根據現有資料進行計算。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">為現有集合新增欄位</a>》。</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">稀疏索引全面升級：SINDI、Block-Max WAND 及 Block-Max MaxScore</h4><p>Milvus 3.0 全面升級了稀疏向量索引。它引入了新的搜尋<a href="https://arxiv.org/abs/2509.08395">演算法——SINDI</a>、Block-Max WAND 和 Block-Max MaxScore——同時還具備倒排列表壓縮、可配置量化以及按工作負載選擇搜尋演算法等功能。 此外，mmap 載入、序列化及 BM25 評分機制亦已優化，有效降低大規模稀疏向量與全文檢索的索引儲存空間及載入開銷。 在內部基準測試中，壓縮後的 BM25 索引在相近的召回率下，其大小約為 2.6 稀疏索引的 1/3；而在學習過的稀疏嵌入上，SINDI 的每秒查詢量（QPS）最高可達 MaxScore 的 10 倍。 一旦啟用新索引版本（請參閱「相容性與行為說明」），SINDI 將成為稀疏 IP 搜尋的預設選項，而 MaxScore 則成為 BM25 的預設選項。</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray 支援範圍</h4><p>StructArray 現已支援 null 值、位圖索引、對活躍集合進行動態欄位新增，以及透過 upsert 對結構體欄位進行部分更新，並提供相應的 REST 及批次匯入支援。</p>
<p>元素層級搜尋新增了跨向量子欄位的混合搜尋，可針對每個實體設定可配置的彙總方式（最大值／總和／平均值／前 k 項變體），並支援範圍搜尋及其中的分組功能。嵌套篩選涵蓋<code translate="no">element_filter</code> 謂詞、<code translate="no">MATCH_ANY</code> ／<code translate="no">MATCH_ALL</code> ／<code translate="no">MATCH_LEAST</code> ／<code translate="no">MATCH_MOST</code> ／<code translate="no">MATCH_EXACT</code> 量化詞、位置子欄位存取（例如<code translate="no">tags[0][name]</code> ），以及針對結構體欄位的<code translate="no">array_length()</code> 操作。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/array-of-structs.md">StructArray</a>與<a href="/docs/zh-hant/struct-array-operators.md">StructArray 運算子</a>。</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">搜尋聚合與分面搜尋</h4><p>測試版中的「查詢彙總」會針對過濾後的資料計算精確統計值；3.0.0 版本則在搜尋路徑中新增了分面搜尋功能。在搜尋時指定一個分面欄位，Milvus 便會返回排名前列的分面值，每個分面值皆由 ANN 排名中最佳匹配的成員代表，並標註 COUNT 和 AVG 等彙總值 —— 透過單一請求即可實現分面搜尋側邊欄（品牌、價格範圍、屬性），無需在客戶端進行過度擷取與計數。</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">函式鏈重新排序</h4><p>重新排序現可透過「函式鏈」API 進行組合，該 API 會將有序且具類型的處理管線作為單一搜尋請求的一部分來執行。 一個鏈可將 QueryNode 上的早期 L0 重新評分與 Proxy 上的 L2 後縮減重新排序結合，支援分數轉換與組合、基於模型的重新排序、排序以及候選項篩選，且無需客戶端協調。 此版本還新增了針對 L0 重新排序的原生 XGBoost 評分功能，使用已註冊為 FileResources 的 UBJ 模型，並新增 Hugging Face 推論提供者，用於伺服器管理的文字嵌入與句子相似度重新排序。</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT 長文本欄位</h4><p>TEXT 欄位使長文本成為一級資料類型，並移除了儲存端長度限制：它們支援<code translate="no">text_match</code> 、<code translate="no">phrase_match</code> 以及 BM25。小於 64 KB 的值保持內聯儲存；較大的值則存入分區層級的 Vortex 格式 LOB 檔案中，而欄位僅儲存<code translate="no">(file_id, offset)</code> 參考連結。 由於 LOB 檔案在各分段間共享，因此壓縮過程僅需移動參考而非重寫內容。對於 RAG 而言，這意味著可透過單次 I/O 從同一儲存庫中檢索向量與原始文字——無需操作外部 blob 儲存庫。</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS 索引直通</h4><p>新的<code translate="no">FAISS</code> 索引類型可透過<code translate="no">faiss_index_name</code> 參數接受任意的 Faiss 索引生成器字串 —<code translate="no">IVF64,Flat</code> 、<code translate="no">HNSW16,Flat</code> 、<code translate="no">OPQ16,IVF64,PQ16x4</code> — 並傳遞搜尋參數，因此 Faiss 配方可直接在 Milvus 上重現。</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">支援 Vortex 與 Lance 格式</h4><p>儲存層新增兩種開放式列式格式：Vortex 作為新一代內部格式 — 具備自適應編碼（字典、RLE、位元打包、浮點數專用壓縮）、零複製解壓縮，並針對向量與標量混合工作負載進行優化 — 以及 Lance，與 Parquet 一同用於開放生態系統的資料交換。 Vortex 將成為預設的內部格式，其路徑圖中還包含濾波器下推（filter pushdown）及本地變體。</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker 獨立部署</h4><p>作為串流寫入路徑核心的 WAL —— Woodpecker，現可作為獨立服務部署，而非嵌入其他節點之中 —— 具備獨立擴展、故障隔離及可觀察性，如同任何其他微服務。這對於大型叢集和高寫入工作負載至關重要。</p>
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
    </button></h3><p>以下功能於<a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>版本中推出，並已納入 3.0.0 版本；詳情請參閱 beta 版本說明。</p>
<ul>
<li><strong>外部集合</strong>— 原地查詢湖屋（Lakehouse）資料（Parquet、Lance、Iceberg、Vortex）：零拷貝、唯讀，並透過增量刷新進行同步。</li>
<li><strong>快照</strong>— 透過區段參考建立的特定時間點唯讀彙總檢視，邊際儲存空間近乎為零。</li>
<li><strong>儲存 V3 (Loon)</strong>— 基於清單的物件儲存列式儲存；為「快照」與「外部集合」的功能基礎。</li>
<li><strong>查詢／搜尋 ORDER BY</strong>— 伺服器端多欄位排序，支援各欄位 ASC／DESC 排序。</li>
<li><strong>查詢聚合</strong>— 支援帶有 group-by 的 COUNT / SUM / AVG / MIN / MAX，於伺服器端進行運算。</li>
<li><strong>EmbList + DiskANN</strong>— 針對 StructArray 嵌入清單的磁碟端多向量索引，具備 Muvera 和 Lemur 等加速路徑。</li>
<li><strong>MinHash 函式（doc-in、doc-out）</strong>— 伺服器端 MinHash 簽名，搭配<code translate="no">MINHASH_LSH</code> 用於近似重複項檢測。</li>
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
<li><strong>Storage V3（Loon）預設為停用狀態。</strong>依賴此功能的特性（例如 Snapshot 和 TEXT 欄位）需透過<code translate="no">common.storage.useLoonFFI</code> 手動啟用。Storage V3 將在後續版本中預設啟用。</li>
<li><strong>2.6 → 3.0 的相容性與回滾功能有保障</strong>— 3.0 部署可回滾至 2.6。然而，一旦啟用或使用會變更序列化資料格式的功能（例如 Storage V3），便無法再進行回滾。</li>
<li><strong>目前新索引版本採自願啟用制。</strong>新引入的索引演算法需手動將目標索引版本提升（<code translate="no">dataCoord.targetVecIndexVersion</code> 設為 10，<code translate="no">dataCoord.targetScalarIndexVersion</code> 設為 4）後才會生效；後續版本將預設啟用這些功能。</li>
<li><strong>GPU 映像已遷移至 CUDA 12.9</strong>，且不再保留與 Ubuntu 20.04 的 GPU 相容性。</li>
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
<p>Milvus 3.0-beta 透過與 Open Lake 生態系統的全新整合，擴展了 Milvus 向量資料庫的功能：「外部集合 (External Collection)」讓 Milvus 能以零拷貝方式查詢外部 Lake 資料表，而 Spark 則可透過 Snapshot 直接讀取 Milvus 集合。 此版本還帶來更豐富的檢索功能、更具表現力的資料結構、更深入的文字搜尋自訂、更精細的資料與模型生命週期控制，以及更多運算子端的控制選項。Milvus 3.0 是 Zilliz Lakebase 的核心內核，驅動其統一的服務、發現與批次處理功能。</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">外部集合</h4><p>在典型的 AI 資料管線中，數 TB 的嵌入向量與元資料早已以 Parquet、Lance 或 Iceberg 資料表的形式存放在物件儲存系統中。將這些資料複製到 Milvus 會使儲存成本加倍，還需建立並維持同步的 ETL 管線，同時使資料治理權從客戶手中移出。</p>
<p>「外部集合」功能消除了複製的必要。Milvus 集合可直接參照檔案的原始位置，而 Milvus 僅負責管理資料結構、索引及查詢執行。 增量更新可確保 Collection 與底層檔案保持同步。對於無法將資料移出資料湖的客戶（例如金融與醫療保健團隊），可針對資料原位置執行向量檢索。單一駐留於資料湖的資料集，亦可同時由多個 Milvus 執行個體提供服務。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/create-an-external-collection.md">建立外部集合》</a>。</p>
<h4 id="Snapshot" class="common-anchor-header">快照</h4><p>服務與批次探索通常需要同時存取同一個 Collection。A/B 模型評估、大規模去重、回填驗證以及版本回滾，在寫入操作仍在進行時，皆需要 Collection 的穩定視圖。</p>
<p>快照透過引用現有分段（而非複製資料）來建立集合的特定時間點唯讀視圖，因此邊際儲存成本接近於零。批次工作可在 MVCC 風格的隔離機制下從快照讀取資料，同時活躍的集合仍持續接受寫入。</p>
<p>如需更多資訊，請參閱「<a href="/docs/zh-hant/snapshots.md">快照</a>」、<a href="/docs/zh-hant/manage-snapshots.md">「管理快照</a>」及「<a href="/docs/zh-hant/snapshot-use-cases.md">快照使用案例</a>」。</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">查詢／搜尋排序</h4><p>搜尋與查詢現已支援多欄位排序，排序作業已下推至 Milvus 核心，且可針對各欄位設定 `<code translate="no">ASC</code> ` 與 `<code translate="no">DESC</code> `。這彌補了生產環境中常見的缺口：當最相似的項目並非最便宜、最新或最熱門時，僅依距離排序的「Top-K」結果往往無法滿足業務需求。</p>
<p>應用程式不再需要過度擷取結果，並在客戶端重新排序以實現複合式排名。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">依標量欄位排序搜尋結果</a>》及《<a href="/docs/zh-hant/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">排序查詢結果</a>》。</p>
<h4 id="Query-Aggregation" class="common-anchor-header">查詢彙總</h4><p>過去若要從 Milvus 集合產生租戶分佈統計、欄位完整性計數或版本推出進度，必須將符合條件的實體拉回至客戶端，並在該處進行彙總。 Milvus 3.0 將 SQL 風格的標量聚合功能整合至核心中。查詢呼叫可接受 `<code translate="no">group_by_fields</code> ` 以及以 `<code translate="no">output_fields</code>` 格式表示的聚合表達式，包括 `<code translate="no">count(*)</code>`、`<code translate="no">count(&lt;field&gt;)</code>`、`<code translate="no">sum(&lt;field&gt;)</code>`、`<code translate="no">avg(&lt;field&gt;)</code>`、`<code translate="no">min(&lt;field&gt;)</code>` 以及 `<code translate="no">max(&lt;field&gt;)</code>`。聚合會在過濾後於伺服器端進行評估。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">彙總查詢結果》</a>。</p>
<h4 id="Null-Vector" class="common-anchor-header">空向量</h4><p>嵌入向量通常是異步產生的，因此實體可能在對應的向量抵達之前就已送達。 多模態資料本身也存在自然缺口，例如缺乏字幕的影片或沒有圖片的產品。早期版本對此並無理想解決方案：應用程式要麼延遲寫入直到向量準備就緒，要麼填入佔位向量，而這兩種選擇都會損害檢索品質。</p>
<p><code translate="no">nullable=True</code>Milvus 3.0 支援所有六種向量類型中向量欄位的 NULL 值。搜尋會自動跳過 NULL 向量，檢索品質不受影響，且 NULL 向量實際上不佔用任何儲存空間。此變更亦延伸至向量欄位，透過 `<code translate="no">AddField</code> ` 指令，現有的 Collection 可在線上新增向量欄位，無需重建。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/nullable-and-default.md">可為 NULL 的欄位</a>》。</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">自訂詞典與同義詞詞典</h4><p>預設的詞元化器未必總是能滿足生產環境的搜尋品質要求。中文、醫學、法律和化學等垂直領域，以及多語言語料庫，都能從自訂詞典和同義詞表中獲益良多。迄今為止，這些資源大多以應用程式端的查詢重寫形式存在。</p>
<p>Milvus 3.0 新增了 FileResource 機制，用於註冊自訂分詞器的詞典、同義詞清單、停用詞清單以及複合詞拆分規則。 資源註冊後，任何分詞器或篩選器皆可引用該資源，並對 BM25、分析器及文字比對功能生效。詞典與同義詞現可進行版本控制並集中管理，無需分散於各處的應用程式程式碼中。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/manage-file-resources.md">管理檔案資源</a>》。</p>
<h4 id="Entity-TTL" class="common-anchor-header">實體 TTL</h4><p>對於許多生命週期與合規情境而言，彙集層級和分區層級的 TTL 過於粗略。同一彙集內的不同租戶通常有不同的保留規則，而個別實體的過期時程可能需要與彙集其餘部分不同。</p>
<p>Milvus 3.0 支援「按實體」的 TTL。在模式中宣告一個<code translate="no">TIMESTAMPTZ</code> 欄位，並透過集合屬性將其標記為 TTL 欄位，Milvus 便會自動回收已過期的實體。此功能涵蓋「被遺忘權」請求、過期的會話資料，以及無需應用程式端清理即可實現的有限對話歷史紀錄。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">設定實體層級 TTL》</a>。</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO（Doc-in, Doc-out）</h4><p>Milvus 2.6 新增了<code translate="no">MINHASH_LSH</code> 索引，用於基於集合的近似重複檢測，但應用程式在將資料寫入 Milvus 之前，仍需自行計算 MinHash 簽名。</p>
<p>Milvus 3.0 新增了伺服器端的 MinHash 函式。在資料結構中宣告一個<code translate="no">VARCHAR</code> 輸入欄位和一個<code translate="no">BINARY_VECTOR</code> 輸出欄位，並附加一個<code translate="no">FunctionType.MINHASH</code> 函式，Milvus 便會在插入、批次插入及搜尋過程中計算這些簽名。結合<code translate="no">MINHASH_LSH</code> ，這項功能可支援大型資料集的去重工作流程、指紋識別，以及在 Milvus 內的剽竊檢測。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/minhash-function.md">MinHash 函式</a>。</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>「一個實體 = 一個向量」的假設已不再適用於現代檢索。長篇文件會被分割成多個片段，ColBERT 等後期交互作用模型會針對每個標記輸出一個向量，而多模態實體則可能包含多種視圖。</p>
<p>EmbList 針對每個實體儲存一個可變長度的向量清單，並以<code translate="no">DISKANN</code> 作為磁碟索引。當語料庫規模超過記憶體預算時，此磁碟路徑可有效控制 RAM 的使用量。EmbList +<code translate="no">DISKANN</code> 是本次 RC 版本中，更廣泛的 StructList 家族的首個變體。 該家族的其餘功能，包括 StructList 篩選以及 Muvera / Lemur 多向量加速，預計將於 3.0 正式版中推出。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/search-with-embedding-lists.md">使用嵌入式清單進行搜尋</a>》。</p>
<h4 id="Force-Merge" class="common-anchor-header">強制合併</h4><p>生產環境中的工作負載會隨時間累積區段碎片，進而導致查詢延遲波動及儲存空間膨脹。</p>
<p>Milvus 3.0 新增了在非高峰時段以同步和非同步模式明確觸發區段壓縮的功能。</p>
<p>如需更多資訊，請參閱《<a href="/docs/zh-hant/force-merge.md">強制合併壓縮</a>》。</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 推出了 Storage V3，這是一種基於清單（manifest）的欄位式儲存引擎，其資料與元資料皆存放於相容於 S3 的物件儲存中。每個資料集版本皆以不可變的清單快照形式保存，該快照為一個 Avro 編碼檔案，記錄了構成該資料集的欄位群組、增量日誌及統計資料。</p>
<p>清單是精簡的 Avro 檔案，而增量日誌則在不重寫資料檔案的情況下記錄實體層級的刪除操作。這能確保隨著資料集規模擴大，元資料的開銷仍能保持在低水平。此外，清單將元資料追蹤與查詢路徑解耦，使 Collection 能管理更多分段，同時不影響查詢效能。</p>
<p>由於狀態儲存於物件儲存中，資料集具有自描述性：任何可存取儲存路徑的讀取者，皆無需中央目錄即可發現並解讀資料集。此特性為「外部集合」、「快照」及未來的資料湖整合奠定了基礎。</p>
