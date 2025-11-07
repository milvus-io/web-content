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
    </button></h1><p>瞭解 Milvus 的新功能！本頁總結了每個版本的新功能、改進、已知問題和錯誤修正。您可以在本節中找到 v2.6.0 以後每個版本的發行說明。我們建議您定期造訪此頁面以瞭解更新資訊。</p>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期2025 年 10 月 21 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我們很高興地宣佈 Milvus 2.6.4 正式發行，它擁有一系列強大的新功能、效能增強以及重要的錯誤修正。此更新介紹了一些重要的功能，例如用於進階資料建模的 ARRAY 中的 Struct。此外，我們在預設情況下啟用 JSON Shredding，進一步提升查詢效能與效率。我們也解決了幾個重要的錯誤，以確保更高的穩定性和可靠性。透過此版本，Milvus 將繼續為所有使用者提供更強大且更有效率的體驗。以下是此版本的主要重點。</p>
<h3 id="Features" class="common-anchor-header">特點<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>ARRAY 中的 Struct：Milvus 引入了新的資料類型 Struct，允許使用者在單一實體中組織和管理多個相關欄位。目前，Struct 只能作為 DataType.ARRAY 下的元素使用，可實現向量陣列 (Array of Vector) 等功能，其中每一行包含多個向量，為複雜的資料建模和搜尋開啟新的可能性。<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>在 DashScope 中支援 Qwen GTE-rerank-v2 模型<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li><strong>將 Go 版本升級至 1.24.6</strong>，並支援圖片建立工具<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>啟用預設的 JSON Shredding<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>新增載入 binlog 大小的磁碟配額，以防止查詢節點載入失敗<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>在 MemVectorIndex 中啟用結構陣列的 mmap 支援<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>新增 TextMatchIndex 的快取層管理<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>最佳化位圖反向查詢效能 (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>更新 Knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>移除載入段落時的邏輯使用檢查<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>新增模板值長度資訊的存取記錄欄位<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>允許在索引建立期間覆寫目前的索引類型<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>新增向量索引的載入參數<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>統一壓縮執行器的任務狀態管理<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>為 QueryCoord 中的任務調度程序新增精煉日誌<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>確保 accesslog.$consistency_level 代表實際使用的值 (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>從 datacoord 移除多餘的通道管理員<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">修正錯誤<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>從建立的 Dockerfile 中移除 GCC，以修正 CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>當分數相同時，確保確定性的搜尋結果排序<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>如果 reranker 未使用欄位資料，則在重新查詢前重新排序<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>確保 CreateArrowFileSystem 拋出異常時履行承諾<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>修正遺失磁碟加密設定<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839</a>)</li>
<li>修正停用餘額檢查器導致餘額停止的問題<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>修正了 "not equal「 不包含 」none" 的問題<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>在 CreateArrowScalarFromDefaultValue 中支援 JSON 預設值<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>使用短偵錯字串以避免在偵錯日誌中換行<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>修正了 JSON 平面索引的 exists 表達式<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>統一了JSON exists路徑語義<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>修正了空的內部插入訊息所導致的恐慌<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>更新了 AI/SAQ 參數<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>移除停用自動索引時重複資料刪除的限制<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>避免在 DataCoord 公制上同時進行重設/新增操作<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>修正了 JSON_contains(path, int) 中的錯誤<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>在處理 JSON 時，避免了快取層的驅逐<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>修正了跳過exp過濾器時的錯誤結果<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>檢查查詢節點是否帶有標籤和流節點列表的 SQN<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>修正了 BM25 與 boost 產生無序結果的問題<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759</a>)</li>
<li>修正了自動 ID 的批量匯入<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>載入索引時透過 FileManagerContext 傳送檔案系統<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>使用 「最終 」並固定任務 ID 同時出現在執行和完成狀態<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>移除不正確的開始時間勾選，以避免過濾 Timeticks 小於它的 DML<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>讓 AWS 認證提供者成為單一<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>停用包含數字的 JSON 路徑的粉碎功能<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>修正了 TestUnaryRangeJsonNullable 的有效單元測試<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>修正了單元測試，並移除檔案系統回退邏輯<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期2025 年 10 月 11 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我們很高興地宣布推出 Milvus 2.6.3，它引入了各種令人興奮的新功能、改進和關鍵錯誤修復。該版本增強了系統性能，擴展了功能，並修復了關鍵問題，為所有用戶提供了更穩定的體驗。以下是此版本的重點內容：</p>
<h3 id="New-Features" class="common-anchor-header">新功能<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>啟用自動識別主索引鍵：使用者現在可以在<code translate="no">autoid</code> 啟用時寫入主鍵欄位。<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>手動壓縮 L0 區段：新增手動壓縮 L0 區段的支援。<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>AutoID 中的叢集 ID 編碼：自動生成的 ID 現在將包含叢集 ID。<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>gRPC 令牌器支援：整合 gRPC 令牌器以增強查詢彈性。<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>透過實作優先順序佇列來改進平衡檢查器，改善任務分配。<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>預先載入封存區段的 BM25 統計資料，並優化序列化。<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Nullable 欄位現在可以用作 BM25 函式的輸入。<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>在啄木鳥中新增了對 Azure Blob Storage 的支援。<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>在 Woodpecker 片段壓縮之後立即清除小檔案。<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>啟用提升查詢的隨機得分功能。<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>在自動索引中為<code translate="no">int8</code> 向量類型新增配置選項。<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>新增控制混合搜尋重新查詢政策的參數項目。<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>新增控制插入函式輸出欄位的支援。<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>衰減函數現在支援可設定的分數合併，以獲得更好的效能。<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>改善了字串二進位搜尋的效能。<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>在查詢中引入對稀疏篩選器的支援。 <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>多項增強分層索引功能的更新。<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>新增標量與向量搜尋的儲存資源使用追蹤。<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>新增刪除/upsert/restful 的儲存使用量<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>啟用<code translate="no">flushall</code> 作業的粒度刷新目標。<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>資料節點現在會使用非精靈檔案系統，以改善資源管理。<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>在元資料中新增批次處理的設定選項。 <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>錯誤訊息現在包含資料庫名稱，讓訊息更清晰。<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>為了更好地模組化，將追蹤測試移至<code translate="no">milvus-common</code> 儲存庫。<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>為了更好的組織，將 C API 單元測試檔案移到<code translate="no">src</code> 目錄。<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>如果<code translate="no">autoid</code> 已經啟用，Go SDK 現在允許使用者插入主索引資料。<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">修正錯誤<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>解決 CVE-2020-25576 和 WS-2023-0223 漏洞。<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>修正在串流節點的配額中心中，邏輯資源被用於度量的問題。<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>啟用待命時，在<code translate="no">activatefunc</code> 設定<code translate="no">mixcoord</code> 。<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>移除儲存 V2 元件的冗餘初始化。<a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>修正了因執行器迴圈退出而導致壓縮任務阻塞的問題。<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>在<code translate="no">insert/deleterecord</code> 析构函数中退还了已加载资源的使用。<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>修正了複製器無法停止的問題，並增強了複製配置驗證器。<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>停用 mmap 時，將<code translate="no">mmap_file_raii_</code> 設為<code translate="no">nullptr</code> 。<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>讓<code translate="no">diskfilemanager</code> 使用上下文的檔案系統。<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>在儲存 V2 中為 OSS 和 COS 強制虛擬主機。<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>為了相容性，當<code translate="no">extrainfo</code> 不是<code translate="no">nil</code> 時，設定<code translate="no">report_value</code> 的預設值。<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>在 rootcoord 中丟棄集合後，清理了集合指標。<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>修正了因重複欄位<code translate="no">mmap.enable</code> 屬性而導致的段落載入失敗。<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>修正動態複製的載入配置解析錯誤。<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>在 Go SDK 中處理了動態列的行到列輸入。<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 9 月 19 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我們很高興地宣布 Milvus 2.6.2 正式發行！此次更新引入了強大的新功能、顯著的性能增強以及關鍵修復，使系統更加穩定、更適合生產。新功能包括使用 upsert 進行部分欄位更新、使用 JSON Shredding 加速動態欄位篩選、使用 NGram 索引加快 LIKE 查詢速度，以及在現有資料集中進行更靈活的模式演進。此版本以社群回饋為基礎，為實際部署提供更強大的基礎，我們鼓勵所有使用者升級以利用這些改進。</p>
<h3 id="Features" class="common-anchor-header">功能特色<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>新增 JSON Shredding 支援，以加速動態欄位篩選。如需詳細資訊，請參閱<a href="/docs/zh-hant/json-shredding.md">JSON Shredding</a>。</li>
<li>新增對 NGRAM 索引的支援，以加速類似操作。詳情請參閱<a href="/docs/zh-hant/ngram.md">NGRAM</a>。</li>
<li>新增對 upsert API 部分欄位更新的支援。詳情請參閱<a href="/docs/zh-hant/upsert-entities.md">Upsert Entities</a>。</li>
<li>新增 Boost 功能支援。詳情請參閱<a href="/docs/zh-hant/boost-ranker.md">Boost Ranker</a>。</li>
<li>新增 JSON 欄位和動態欄位群組支援<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>新增對在現有集合上啟用動態模式的支援<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>新增在不釋放集合的情況下刪除索引的支援<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] 將日誌檔案大小改為壓縮大小<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] 在載入資訊中新增子欄位<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] 新增在系統群組中納入分割區和叢集金鑰的支援<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>移除壓縮任務的逾時<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] 啟用 Azure 建置功能<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] 利用群組資訊來估計邏輯使用量<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] 利用群組分割資訊來估計使用量<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] 在壓縮中儲存列群組結果<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] 新增基於大小的分割政策配置<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] 新增對基於模式和大小的分割原則的支援<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] 新增可設定的分割政策<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] 新增更多指標和設定<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>新增在載入區段之前等待所有索引就緒的支援<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>新增救援節點的內部核心延遲指標<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>優化了列印 KV 參數時的存取記錄格式<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>新增設定以修改 dump 快照批次大小<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215</a>)</li>
<li>減少壓縮任務的清理間隔<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>增強了合併排序，以支援多個欄位<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>新增分層索引的負載資源估算<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>新增重複資料情況下的自動索引設定<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>新增配置，允許在名稱中使用自訂字元 (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>新增串流服務的 cchannel 支援<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>新增互斥和範圍檢查，以保護並發刪除<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>對齊了暴力和索引之間 exists 表達式的行為<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>修正重命名為已刪除集合時的錯誤<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] 檢查子欄位長度<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] 預設開啟 Azure<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>修正了池化資料節點下 L0 壓縮的上傳路徑<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>如果啟用資料庫加密，不允許重新命名<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>禁止刪除 dynamicfield.enable 屬性<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>當預分配的 ID 無效時，將任務標示為失敗<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>跳過 PK 比較表達式的 MVCC 檢查<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>修正了統計的 json_contains bug<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>新增查詢節點和串流節點的初始化檔案系統檢查<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>修正了當段被垃圾回收時，壓縮目標為空的問題<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>修正了初始化時間戳索引時的競賽條件<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>檢查 arraydata 是否為 nil 以防止恐慌<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>修正了為嵌套物件建立 JSON 統計的錯誤<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>避免多個 JSON 欄位的 mmap 重寫<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>統一有效的資料格式<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>隱藏網頁介面中嵌入/排名提供者的憑證<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>修正池化資料節點下的 statslog 路徑<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>修正 IDF 甲骨文路徑<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>如果沒有 vchannel 正在復原，則使用復原快照檢查點<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>限制 JSON 統計資料的列數<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>製作負載資源計數 n-gram 索引<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237</a>)</li>
<li>從非空搜尋結果推斷度量類型<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>修正多區段寫入只寫入一個區段的問題<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>修正了合併排序超出範圍的問題<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>執行 BM25 函式前新增 UTF-8 檢查<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>如果舊會話存在，重試舊會話<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>新增 Kafka 緩衝區大小限制，以防止資料節點 OOM<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>修正了因擴大鎖保護範圍而引起的恐慌<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>修正了模式變更時，成長中的區段未被刷新的問題<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] 處理 IO 錯誤<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>防止在 Tantivy 索引路徑不存在時發生恐慌<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 9 月 3 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>我們很高興地宣佈 Milvus 2.6.1 正式發行！此版本以先前版本的主要架構進步為基礎，提供了專注於生產穩定性、效能和操作穩健性的重要增強功能。此版本回應了主要的社群回饋，並強化了系統的大規模部署。我們強烈鼓勵所有使用者升級，從更穩定、效能更佳且更可靠的系統中獲益。</p>
<h3 id="Improvements" class="common-anchor-header">改進<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>遠端儲存支援 POSIX 相容的檔案系統<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>引入基於模型的重定向器<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>優化主鍵欄位的比較表達式效能<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>直接從發佈清單中收集 doc_id 以加速文字匹配<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>將多個 != 條件轉換為單個 NOT IN 子句，以優化查詢效能<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>增強段載入期間快取層的資源管理<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>改善資料載入期間臨時索引的記憶體估算<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104</a>)</li>
<li>可設定臨時索引的建立比率<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>為磁碟寫入器新增可設定的寫入速率限制<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>現在可以動態更新 SegCore 參數，而無需重新啟動 Milvus 服務<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>新增統一的 gRPC 延遲指標，以提供更好的可觀察性<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>在 gRPC 標頭中包含用戶端請求時間戳，以簡化除錯<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>支援 segcore 的追蹤日誌層級<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>新增可設定的開關，調整一致性保證以提高可用性<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>實施健全的重新觀察機制，以處理 etcd 連線故障<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>改進內部節點健康檢查邏輯<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>優化列出集合時的元資料存取<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>將 Pulsar 客戶端升級至 v0.15.1 正式版，並新增更多記錄<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>將 aws-sdk 從 1.9.234 升級至 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>支援 ticker 元件的動態間隔更新<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>改善自動偵測位元組操作的 ARM SVE 指令集<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>改進文本或短語匹配失敗時的錯誤資訊<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>改進向量尺寸不匹配時的錯誤訊息<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>當物件儲存空間不可用時，改善追加超時的錯誤回報<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
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
<li>修正 Parquet 檔案匯入時可能發生的記憶體用完 (OOM) 問題<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>修正待命節點在租約到期時無法復原的問題<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>正確處理壓縮重試狀態<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>修正了連續讀取請求與索引載入之間的潛在死鎖，該死鎖可能會阻止索引載入<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>修正了在高併發情況下可能導致資料刪除失敗的錯誤<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>修正了載入文字和 JSON 索引時的潛在競爭條件<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>修正在重新啟動 QueryCoord 後可能發生的節點狀態不一致問題<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>確保「髒」的 QueryNode 在重新啟動後會被正確清理<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>修正了一個問題，在此問題中，對於具有非空有效載荷的請求，重試狀態未被正確處理<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>修正 bulk writer v2 未使用正確 bucket 名稱的問題<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>從 RESTful get_configs 端點隱藏敏感項目，以加強安全性<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>確保 woodpecker 的物件上傳在超時重試期間是等效的<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>禁止從 Parquet 檔案匯入陣列欄位的空元素<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>修正了一個錯誤，在建立集合別名後，代理快取並未失效<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>改善串流節點的內部服務發現機制<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>修正資源群組邏輯，以正確過濾串流節點<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>新增資料庫名稱<a href="https://github.com/milvus-io/milvus/pull/43808">(</a>databaseName) 標籤至指標，以防止多資料庫環境中的命名衝突<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>修正內部任務狀態處理的邏輯錯誤<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>優化內部指標的初始化時序，以避免潛在的恐慌<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>修正內部 HTTP 伺服器罕見的潛在當機問題<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 8 月 6 日</p>
<table>
<thead>
<tr><th style="text-align:left">Milvus 版本</th><th style="text-align:left">Python SDK 版本</th><th style="text-align:left">Node.js SDK 版本</th><th style="text-align:left">Java SDK 版本</th><th style="text-align:left">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 正式發行！在<a href="#v260-rc1">2.6.0-rc1</a> 所奠定的架構基礎上，這個可量產的版本解決了許多穩定性和效能問題，同時引入了強大的新功能，包括儲存格式 V2、進階 JSON 處理，以及增強的搜尋功能。Milvus 2.6.0 根據 RC 階段的社群回饋，進行了大量的錯誤修正與最佳化，您可以隨時探索並採用。</p>
<div class="alert warning">
<p>由於架構上的改變，不支援從 2.6.0 之前的版本直接升級。請遵循我們的<a href="/docs/zh-hant/upgrade_milvus_cluster-operator.md">升級指南</a>。</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">2.6.0 的新功能 (自 RC 起)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">最佳化儲存格式 v2</h4><p>為了解決混合標量與向量資料儲存的挑戰，特別是非結構化資料的點查詢，Milvus 2.6 推出儲存格式 V2。這種新的自適應列式儲存格式採用「窄列合併 + 寬列獨立」的佈局策略，從根本上解決了向量資料庫中處理點查詢和小批量檢索時的效能瓶頸。</p>
<p>新格式現在可支援無 I/O 放大的高效隨機存取，與之前採用的 vanilla Parquet 格式相比，效能可提升 100 倍，非常適合需要分析處理和精確向量檢索的 AI 工作負載。此外，對於典型的工作負載，它可將檔案數量減少高達 98%。主要壓縮的記憶體消耗可減少 300%，I/O 作業的讀取最佳化高達 80%，寫入最佳化超過 600%。</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON 平面索引 (beta)</h4><p>Milvus 2.6 引入 JSON Flat Index 來處理高度動態的 JSON 結構。JSON Path Index 需要預先聲明特定路徑及其預期類型，與此不同，JSON Flat Index 會自動發現指定路徑下的所有巢狀結構並編製索引。在為 JSON 欄位建立索引時，它會遞迴地將整個子樹扁平化，為遇到的每個路徑-值對創建倒置索引項目，而不考慮深度或類型。 這種自動扁平化的方式使 JSON Flat Index 非常適合用於不斷演化的模式，在這種模式中，新欄位的出現毫無預兆。例如，如果您為一個「metadata」欄位建立索引，系統會自動處理新的巢狀欄位，例如「metadata.version2.features.experimental」，因為它們會出現在傳入的資料中，而不需要新的索引設定。</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">核心 2.6.0 功能回顧<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>有關 2.6.0-RC 中架構變更和新增功能的詳細資訊，請參閱<a href="#v260-rc1">2.6.0-rc1 發行紀錄</a>。</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">架構簡化</h4><ul>
<li>串流節點 (GA) - 集中化 WAL 管理</li>
<li>使用 Woodpecker 的原生 WAL - 移除對 Kafka/Pulsar 的依賴</li>
<li>統一協調器 (MixCoord)；合併 IndexNode 與 DataNode - 降低元件複雜度</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">搜尋與分析</h4><ul>
<li>RaBitQ 1 位量化與高召回率</li>
<li>詞組匹配</li>
<li>用於重複資料刪除的 MinHash LSH</li>
<li>時間感知的排序功能</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">開發人員經驗</h4><ul>
<li>用於 「資料輸入、資料輸出 」工作流程的嵌入功能</li>
<li>線上模式演進</li>
<li>INT8 向量支援</li>
<li>支援全球語言的增強型標記器</li>
<li>具有懶惰載入功能的快取層 - 處理大於記憶體的資料集</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">版本 2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 6 月 18 日</p>
<table>
<thead>
<tr><th style="text-align:center">Milvus 版本</th><th style="text-align:center">Python SDK 版本</th><th style="text-align:center">Node.js SDK 版本</th><th style="text-align:center">Java SDK 版本</th><th style="text-align:center">Go SDK 版本</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 引入了簡化的雲原生架構，旨在透過降低部署複雜度來提高運作效率、資源利用率和總擁有成本。此版本新增的功能著重於效能、搜尋與開發。主要功能包括可提升效能的高精度 1 位元量化 (RaBitQ) 與動態快取層、使用 MinHash 進行近乎重複的偵測、進階搜尋的精準短語比對，以及自動嵌入功能與線上模式修改，以提升開發人員的使用經驗。</p>
<div class="alert note">
<p>這是 Milvus 2.6.0 的預發佈版本。若要試用最新功能，請安裝此版本作為全新部署。不支援從 Milvus v2.5.x 或更早版本升級至 2.6.0-rc1。</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">架構變更<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>自 2.6 起，Milvus 引進了重大的架構變更，目的在於改善效能、可擴充性和易用性。如需詳細資訊，請參閱<a href="/docs/zh-hant/architecture_overview.md">Milvus 架構概述</a>。</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">串流節點 (GA)</h4><p>在先前的版本中，串流資料由 Proxy 寫入 WAL，並由 QueryNode 和 DataNode 讀取。這種架構使得寫入端很難達成共識，讀取端則需要複雜的邏輯。此外，查詢委託器位於 QueryNode 中，也妨礙了擴充性。Milvus 2.5.0 引入了 Streaming Node，並在 2.6.0 版本中成為 GA。這個元件現在負責所有 shard-level WAL 讀/寫作業，同時也是查詢委託器，解決了上述問題，並啟用新的最佳化功能。</p>
<p><strong>重要升級通知</strong>：Streaming Node 是一項重大的架構變更，因此不支援從先前版本直接升級至 Milvus 2.6.0-rc1。</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">啄木鳥原生 WAL</h4><p>Milvus 之前的 WAL 依賴 Kafka 或 Pulsar 等外部系統。這些系統雖然功能強大，但卻增加了大量的作業複雜度和資源開銷，特別是對於中小型部署而言。在 Milvus 2.6 中，Woodpecker 取代了這些系統，Woodpecker 是專為雲端原生 WAL 系統而打造的。Woodpecker 專為物件儲存而設計，同時支援本機與物件儲存的零磁碟模式，在簡化操作的同時提升效能與擴充性。</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">資料節點與索引節點合併</h4><p>在 Milvus 2.6 中，壓縮、大量匯入、統計資料收集和索引建立等工作現在都由統一的排程器管理。之前由 DataNode 處理的資料持久化功能已移至 Streaming Node。為了簡化部署和維護，IndexNode 和 DataNode 已合併為單一的 DataNode 元件。這個整合後的節點現在可執行所有這些關鍵任務，降低作業複雜度並優化資源利用率。</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">協調器合併為 MixCoord</h4><p>先前的設計有獨立的 RootCoord、QueryCoord 和 DataCoord 模組，造成模組間通訊的複雜性。為了簡化系統設計，這些元件已合併為單一、統一的協調器，稱為 MixCoord。這個合併減少了分散式程式設計的複雜性，以內部函式呼叫取代網路通訊，使系統操作更有效率，並簡化開發與維護。</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1 位元量化</h4><p>為了處理大型資料集，1 位元量化是改善資源利用率和搜尋效能的有效技術。然而，傳統方法會對召回率造成負面影響。Milvus 2.6 與原研究作者合作，推出了 RaBitQ 這種 1 位元量化解決方案，在提供 1 位元壓縮的資源與效能優勢的同時，仍能維持高回召準確度。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/ivf-rabitq.md">IVF_RABITQ</a>。</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">JSON 能力增強</h4><p>Milvus 2.6 透過下列改進增強了對 JSON 資料類型的支援：</p>
<ul>
<li><strong>效能</strong>：現在正式支援 JSON 路徑索引，允許在 JSON 物件 (例如<code translate="no">meta.user.location</code>) 內的特定路徑上建立反向索引。這可避免完整物件掃描，並改善複雜篩選條件查詢的延遲時間。</li>
<li><strong>功能性</strong>：為了支援更複雜的篩選邏輯，此版本新增了對<code translate="no">JSON_CONTAINS</code>,<code translate="no">JSON_EXISTS</code>,<code translate="no">IS NULL</code>, 以及<code translate="no">CAST</code> 函式的支援。 展望未來，我們在 JSON 支援方面的工作仍在繼續。我們很高興地預告，即將推出的正式版本將具備更強大的功能，例如<strong>JSON 切碎</strong>和<strong>JSON FLAT 索引</strong>，旨在大幅改善高度嵌套的 JSON 資料的效能。</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Analyzer/Tokenizer 功能增強</h4><p>此版本透過對 Analyzer 和 Tokenizer 的多項更新，大幅增強了文字處理功能：</p>
<ul>
<li>新的<a href="/docs/zh-hant/analyzer-overview.md#Example-use">Run Analyzer</a>語法可用來驗證 tokenizer 配置。</li>
<li>整合了<a href="/docs/zh-hant/lindera-tokenizer.md">Lindera tokenizer</a>，以改善對日文和韓文等亞洲語言的支援。</li>
<li>現在支援 Row-level tokenizer 選擇，並提供通用<a href="/docs/zh-hant/icu-tokenizer.md">ICU tokenizer</a>作為多國語言方案的備用功能。</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">資料輸入、資料輸出的嵌入功能</h4><p>Milvus 2.6 引入了「資料進入、資料輸出」功能，可直接與第三方嵌入模型 (例如 OpenAI、AWS Bedrock、Google Vertex AI、Hugging Face) 整合，簡化 AI 應用程式開發。使用者現在可以使用原始文字資料進行插入與查詢，Milvus 會自動呼叫指定的模型服務，即時將資料轉換成向量。這樣就不再需要獨立的向量轉換管道。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/embedding-function-overview.md">嵌入功能概述</a>。</p>
<h4 id="Phrase-Match" class="common-anchor-header">短語匹配</h4><p>短語匹配是一種文字搜尋功能，只有當查詢的準確字詞序列在文件中以正確的順序連續出現時，才會傳回結果。</p>
<p><strong>主要特徵</strong>：</p>
<ul>
<li>順序敏感：詞彙出現的順序必須與查詢的順序相同。</li>
<li>連續匹配：除非使用了 slop 值，否則字詞必須緊挨著出現。</li>
<li>Slop (選用)：一個可調整的參數，允許少量的詞彙間隔，以實現模糊短語匹配。</li>
</ul>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/phrase-match.md">短語匹配</a>。</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">MinHash LSH 索引 (Beta)</h4><p>為解決模型訓練中重複資料刪除的需求，Milvus 2.6 新增 MINHASH_LSH 索引的支援。此功能提供了一種計算效率高且可擴充的方法，用來估計文件之間的 Jaccard 相似性，以辨識近乎重複的文件。使用者可以在預處理時為文字文件產生 MinHash 簽章，並在 Milvus 中使用 MINHASH_LSH 索引來有效率地在大型資料集中尋找相似的內容，改善資料清理與模型品質。</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">時間感知衰減函數</h4><p>Milvus 2.6 引入了時間感知衰減函數，以應對資訊價值隨時間變化的情況。在結果重新排序時，使用者可以根據時間戳欄位套用指數、高斯或線性衰減函數，以調整文件的相關性得分。這可確保較近期的內容能獲得優先排序，這對於新聞饋送、電子商務和 AI 代理的記憶體等應用程式來說至關重要。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/decay-ranker-overview.md">Decay Ranker 概觀</a>。</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">新增線上模式演進欄位</h4><p>為了提供更高的模式彈性，Milvus 2.6 現在支援線上新增標量欄位到現有資料集的模式。這避免了在應用程式需求改變時，需要建立新的資料集和執行擾亂性的資料遷移。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/add-fields-to-an-existing-collection.md">新增欄位到現有的集合</a>。</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">INT8 向量支援</h4><p>為了因應越來越多使用量化模型產生 8 位元整數嵌入，Milvus 2.6 新增了 INT8 向量的原生資料類型支援。這可讓使用者直接擷取這些向量，而無需去量化，從而節省計算、網路頻寬和儲存成本。此功能最初支援 HNSW 系列索引。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/dense-vector.md">密集向量</a>。</p>
