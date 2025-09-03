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
<h4 id="JSON-flat-index-beta" class="common-anchor-header">JSON 平面索引 (beta)</h4><p>Milvus 2.6 引入 JSON Flat Index 來處理高度動態的 JSON 結構。JSON Path Index 需要預先聲明特定路徑及其預期類型，與此不同，JSON Flat Index 會自動發現特定路徑下的所有巢狀結構並編製索引。在為 JSON 欄位建立索引時，它會遞迴地將整個子樹扁平化，為遇到的每個路徑-值對創建倒置索引項目，而不考慮深度或類型。 這種自動扁平化的方式使 JSON Flat Index 非常適合用於不斷演化的模式，在這種模式中，新欄位的出現毫無預兆。例如，如果您為一個「metadata」欄位建立索引，系統會自動處理新的巢狀欄位，例如「metadata.version2.features.experimental」，因為它們會出現在傳入的資料中，而不需要新的索引設定。</p>
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
<p>Milvus 2.6.0-rc1 引入了簡化的雲原生架構，旨在透過降低部署複雜度來提高運作效率、資源利用率和總擁有成本。此版本新增的功能著重於效能、搜尋與開發。主要功能包括可提升效能的高精度 1 位元量化 (RaBitQ) 與動態快取記憶體層級、使用 MinHash 進行近乎重複的偵測、進階搜尋的精準短語比對，以及自動嵌入功能與線上模式修改，以提升開發人員的使用經驗。</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">RaBitQ 1 位元量化</h4><p>為了處理大型資料集，1 位元量化是改善資源利用率和搜尋效能的有效技術。然而，傳統方法會對召回率造成負面影響。Milvus 2.6 與原研究作者合作推出了 RaBitQ，這是一種 1 位元量化解決方案，可維持高召回準確度，同時提供 1 位元壓縮的資源與效能優勢。</p>
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
