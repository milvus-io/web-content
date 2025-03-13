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
    </button></h1><p>瞭解 Milvus 的新功能！本頁總結了每個版本的新功能、改進、已知問題和錯誤修正。您可以在本節中找到 v2.5.0 以後每個版本的發行說明。我們建議您定期造訪此頁面以瞭解更新資訊。</p>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 3 月 10 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>我們很高興宣佈推出 Milvus 2.5.6，其特色是對工具鏈、日誌、度量和陣列處理進行了寶貴的增強，並修復了多個錯誤以提高可靠性和性能。此更新包括精緻的並發處理、更強大的壓縮任務，以及其他重要的改進。我們鼓勵您升級或試用，並一如既往地歡迎您提供意見，以幫助我們持續改進 Milvus！</p>
<h3 id="Improvements" class="common-anchor-header">改進</h3><ul>
<li>將 Go 工具鏈升級至 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>升級 Rust 版本到 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>將 Etcd 版本提升至 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>僅檢查非空陣列的元素類型<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>移除資源群組處理程式中的除錯記錄 (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>改善 gRPC 解析器的記錄<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>為異步 CGO 元件新增更多指標<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>在集合釋出後清理分片位置快取<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">修正錯誤</h3><ul>
<li>修正了忽略有效性導致的陣列損壞<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>修正了<code translate="no">null</code> 表達式對 JSON 欄位不起作用的問題<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>修正了使用可空欄位建立 Tantivy 時儲存錯誤偏移的問題<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>跳過執行零區段的統計<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>修正陣列的記憶體大小估計<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>傳遞一個 knapsack 指針以避免多重壓縮<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>修正了大量插入時的當機問題<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304</a>)</li>
<li>透過正確終止主派發器，防止訊息流洩漏<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>修正了<code translate="no">null</code> 偏移量的並發問題<a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>修正了<code translate="no">import end ts</code> 的解析問題<a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>改進了<code translate="no">InitMetaCache</code> 函式的錯誤處理和單元測試<a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>為<code translate="no">CreateIndex</code> 增加了重複參數檢查<a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>解決了大小超過最大限制時，壓縮任務無法執行的問題<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>修正了隱形段從串流中重複消耗的問題<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>變更 CMake 變數切換到<code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>修正了透過 RESTful 丟棄 DB 屬性失敗的問題<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>為<code translate="no">OperatePrivilegeV2</code> API 使用了不同的訊息類型<a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>修正了任務 delta 快取中的資料競賽問題<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>解決了由重複任務 ID 引起的任務 delta 快取洩漏<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期2025 年 2 月 26 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 在單一叢集可支援的集合和分割區數量方面帶來了顯著的改進。現在，運行 Milvus 的 10K 集合和 100K 磁碟分割是完全可行的。這個版本也解決了幾個重要的錯誤，包括遺失匹配統計資料和多階段查詢中的死鎖問題。此外，它還包含許多可觀察性與安全性的強化。我們強烈建議所有執行 Milvus 2.5.x 的使用者儘快升級。</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">相依性升級</h3><p>升級至 ETCD 3.5.18 以修正數個 CVE。</p>
<ul>
<li>[2.5] 更新 raft 至 cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] 更新 Knowhere 版本<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>,<a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">重大錯誤</h3><ul>
<li>[2.5] 在 textmatchindex 空偏移文件中使用<code translate="no">text_log</code> 前綴<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936</a>)</li>
<li>[2.5] 為多階段任務新增子任務池以避免死鎖<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">修正錯誤</h3><ul>
<li>[2.5] 修正任務排程死鎖<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121</a>)</li>
<li>[2.5] 修正了導致多個相同索引被創建的競賽條件<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] 修正了可以創建重名集合的問題<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>修正了搜索 null 表達式失敗的問題<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] 修正了前綴中包含通配符時前綴匹配失敗的問題<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>HTTP 請求超時時，取消子內容的連鎖反應<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] 修正了 reduce 任務上的任務 delta 快取洩漏<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056</a>)</li>
<li>[2.5] 修正了角落情況下 querycoord 的恐慌<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] 增強 isbalanced 函數，以正確計算引號對<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] 修正負 -1 執行壓縮任務的問題<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] 修正了一個區段可能永遠不會從封存轉移到沖洗的錯誤<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>載入 pk 索引時跳過建立主索引<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] 當排序後段為零時，跳過文字索引的建立<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969</a>)</li>
<li>[2.5] 修正了尋找最早位置的失敗<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966</a>)</li>
<li>忽略在混合搜索時丟失的成長選項<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900</a>)</li>
<li>[2.5] 修正了altercollection無法修改一致性等級的問題<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902</a>)</li>
<li>修正了由於行數為 0 而導入失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904</a>)</li>
<li>[2.5] 修正了長類型的錯誤模組結果<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802</a>)</li>
<li>[2.5] 為壓縮觸發添加並使用生命周期上下文<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] 在目標檢查之前檢查集合釋放<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>修正了 Rootcoord 優化停止失敗和 CI 資源有限的問題<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793</a>)</li>
<li>[2.5] 移除載入欄位與模式欄位大小檢查<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>,<a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] 創建索引時，移除類型參數中的 mmap.enable 參數<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] 在丟失屬性時沒有傳遞索引名稱<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] 分段同時傳回成長和封閉的結果<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] 修正並發地圖問題<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] 解決了 QC 任務測試的衝突<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] 修正壓縮或 GC 發生時收集載入卡住的問題<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] 修正由於執行任務 delta 快取洩漏所造成的不均勻分佈<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759</a>)</li>
<li>[2.5] 跳過載入 pk 索引時提前返回<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763</a>)</li>
<li>[2.5] 修正了即使設定了<code translate="no">common.security.rootShouldBindRole</code> ，root 使用者仍能列出所有集合的問題<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] 修正 flowgraph 洩漏<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] 使用參數項格式化以避免 setconfig 疊加<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] 元儲存權限名稱用權限名稱 "all "檢查<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] 為 RESTful v1 新增速率限制器<a href="https://github.com/milvus-io/milvus/pull/39555">(#39555</a>)</li>
<li>[2.5] 移除 RESTful 處理器中硬編碼的分割區編號<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進</h3><h4 id="Observability" class="common-anchor-header">可觀察性</h4><ul>
<li>新增監控指標以擷取原始資料<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] 新增獲取向量延遲指標，並改善請求限制錯誤訊息<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] 新增代理佇列指標<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>公開更多指標資料<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] 新增解析表達式的指標<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] 為 hybridsearch 新增 DSL 日誌欄位<a href="https://github.com/milvus-io/milvus/pull/39598">(#39598</a>)</li>
<li>[2.5] 如果索引被丟棄，跳過更新索引度量<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] 如果元件停止進度超時，會丟棄 pprof 資訊<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] 新增管理 API 以檢查 querycoord 平衡狀態<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">統計/壓縮/索引任務排程優化</h4><ul>
<li>改進索引任務調度策略<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] 限制產生統計任務的速度<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645</a>)</li>
<li>新增壓縮排程的設定<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] 檢查 L0 壓縮是否僅限於同一通道<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] 調整了段加載器對臨時索引的記憶體估算<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] 根據生命週期政策，使用開始位置 ts 來封鎖區段<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994</a>)</li>
<li>當不再需要任務時，移除任務元<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] 在 binlog 匯入時加速列出物件<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>支援建立有描述的集合<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] 在配置中輸出索引請求超時間隔<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] 同步 proxy.maxTaskNum 預設值為 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>將 dump 快照限制從 10w 降為 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102</a>)</li>
<li>[2.5] 批次 pk 存在時，避免字串到切片位元組的複製<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>描述索引時，支援傳回可設定的屬性<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>優化了特定點的表達性能<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] 優化了 getQueryNodeDistribution 的結果格式<a href="https://github.com/milvus-io/milvus/pull/39926">(#39926</a>)</li>
<li>[cp25] 啟用寫入放大的觀察<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] 在 RESTful v2 中搜尋時傳回 top-k 結果<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5][GoSDK] 新增 withEnableMatch 語法糖<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] 臨時索引支援不同的索引類型和更多的資料類型 (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK][2.5] 同步主分支的 GoSDK 提交<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>保持記憶體與廣播者元的一致性<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>使用基於事件的通知進行廣播<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550</a>)</li>
<li>[2.5] 改良模式與索引檢查的錯誤訊息<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565</a>)</li>
<li>[2.5] 重設標量的預設自動索引類型<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] 當預先檢查失敗時，重新排列 L0 壓縮任務<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 1 月 23 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>我們很高興地宣佈 Milvus 2.5.4 正式發行，它引進了關鍵的效能最佳化和新功能，例如 PartitionKey 隔離、Sparse Index with DAAT MaxScore，以及增強的鎖定機制。此版本的一大亮點是支援 10,000 個集合和 1 百萬個分割區，標誌著多租戶使用個案的一大里程碑。這個版本也解決了多個 Bug，提高了整體穩定性和可靠性，其中兩個關鍵 Bug 可能會導致資料遺失。我們鼓勵您升級或試用此最新版本，並期待您的意見協助我們持續改進 Milvus！</p>
<h3 id="Features" class="common-anchor-header">功能特色</h3><ul>
<li>支援 PartitionKey 隔離，以改善多個分割區金鑰的效能<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>)。如需詳細資訊，請參閱<a href="/docs/zh-hant/use-partition-key.md">使用分割區金鑰</a>。</li>
<li>Sparse Index 現在支援 DAAT MaxScore<a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md">Sparse Vector</a>。</li>
<li>在表達式中加入對<code translate="no">is_null</code> 的支援<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>可以自訂 Root 權限<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進</h3><ul>
<li>在一個集群中支援 10K 集合和 100 萬個分割<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>緩存區段的 delta 資訊以加速查詢協調器<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>在集合層級同步讀取元資料，以加速故障復原<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>精煉查詢節點的鎖粒度<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>使用 CStatus 來處理 NewCollection CGO 呼叫，以統一風格<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>如果沒有設定分區，跳過產生分區限制器<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>新增更多 RESTful API 支援<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>移除查詢節點<a href="https://github.com/milvus-io/milvus/pull/38913">（</a>QueryNode）和資料節點（DataNode）中不必要的 Bloom 過濾器，以減少記憶體使用量<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>透過加速 QueryCoord 中的任務產生、排程和執行，加速資料載入<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>減少 DataCoord 中的鎖定，以加快載入和插入操作<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>在<code translate="no">SearchResult</code> 和<code translate="no">QueryResults</code> 中新增主字段名稱<a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>使用 binlog 大小和索引大小作為磁碟配額節流標準<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>優化了全文檢索 knowhere/#1011 的記憶體使用量</li>
<li>新增標量索引的版本控制<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>避免不必要的複製，改善從 RootCoord 取得集合資訊的速度<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">重要錯誤修正</h3><ul>
<li>修正索引主鍵搜尋失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>修正了重新啟動 MixCoord 並同時沖洗可能導致的資料遺失問題<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>修正了在 MixCoord 重新啟動後，由於 stats 任務和 L0 compaction 之間的不當並發而引發的刪除失敗問題<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>修正了從 2.4 升級到 2.5 時標量倒置索引的不兼容性<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正</h3><ul>
<li>修正了多列載入時粗鎖粒度導致的緩慢查詢問題<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>修正了使用別名可能導致迭代器遍歷錯誤資料庫的問題<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>修正了更改資料庫時資源組更新失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>修正了一個零星的問題，在釋放時，tantivy 索引無法刪除索引檔案<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>修正了因線程數過多而造成的索引緩慢問題<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>修正了在大量匯入時，無法跳過磁碟配額檢查的問題<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>透過限制並發量，解決了因太多訊息佇列消費者所造成的凍結問題<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>修正了在大規模壓縮期間，由於 MixCoord 重新啟動而導致的查詢超時問題<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>修正由於節點停機所造成的頻道不平衡問題<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
<li>修正了可能導致頻道平衡卡住的問題。<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>修正了 RBAC 自訂群組權限等級檢查變得無效的問題<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>修正了擷取空索引中的行數失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>修正了小區段記憶體估算錯誤的問題<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2025 年 1 月 13 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 提供重要的錯誤修正與效能強化，以改善整體穩定性、可靠性與可用性。此版本改進了並發處理、加強了資料索引和擷取，並更新了幾個關鍵元件，以提供更強大的使用者體驗。</p>
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正</h3><ul>
<li>修正了在<code translate="no">VARCHAR</code> 主索引鍵上使用<code translate="no">IN</code> 過濾器可能返回空結果的問題。<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>修正了查詢與刪除操作之間的並發問題，該問題可能會導致不正確的結果。<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>修正了查詢請求中<code translate="no">expr</code> 為空時，迭代過濾所導致的失敗。<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>修正了配置更新時磁碟錯誤導致使用預設配置設定的問題。<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>修正了聚類壓縮可能導致刪除資料遺失的問題。<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>修正了在成長中的資料片段中，文字匹配查詢出錯的問題。<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>修正了因索引不包含稀疏向量的原始數據而導致的檢索失敗。<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>修正了並行查詢和資料載入可能導致的列字段競賽情況。<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>修正了當資料中沒有包含 nullable 或 default_value 欄位時，大量插入的失敗問題。<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進</h3><ul>
<li>為 RESTful 介面新增資源群組 API。<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>利用 bitset SIMD 方法優化了擷取效能。<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>指定時使用 MVCC 時間戳作為保證時間戳。<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>新增遺失的刪除指標。<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>更新 Etcd 至 v3.5.16 版。<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>建立新的 Go 套件來管理 protos。<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期: 2025年1月3日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 支援修改 VARCHAR 欄位的最大長度，並解決了幾個關於並發、分割區丟失以及匯入時 BM25 統計處理的重要問題。我們強烈建議升級至此版本，以改善穩定性和效能。</p>
<h3 id="Improvements" class="common-anchor-header">改進</h3><ul>
<li>僅在指定路徑不存在時才產生磁碟使用記錄。<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>新增調整最大 VARCHAR 長度的參數，並將限制恢復為 65,535<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>支持表達式的參數類型轉換。<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正</h3><ul>
<li>修正了並發情況下的潛在死鎖。<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>只為支援空值的欄位產生 index_null_offset 檔案。<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>修正了還原階段中 free 之後的 retrieve 計劃使用問題。<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>識別大寫 AND 和 OR 的表達式。<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>即使載入失敗，也允許成功丟棄分割區。<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>修正匯入時 BM25 統計檔註冊問題。<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2024 年 12 月 26 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 主要針對記憶體載入、RBAC 列表、查詢節點平衡和封存段索引等一系列錯誤進行修復，同時也改進了 Web UI 和截取器。我們強烈建議升級至 2.5.1，以增強穩定性和可靠性。</p>
<h3 id="Improvement" class="common-anchor-header">改進</h3><ul>
<li>更新 Web UI 收集和查詢頁面。<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正</h3><ul>
<li>在載入估算中加入記憶體因素，修正了 OOM 問題。<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>在 RootCoord 中列出政策時，修正了特權群組擴充的問題。<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>修正列出特權群組與集合的問題。<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>修正了平衡器，以避免重複超載相同的查詢節點。<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>修正了在 QueryCoord 重新啟動後所觸發的意外平衡任務。<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>修正了載入配置更新不適用於載入集合的問題。<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>修正資料匯入時讀取計數為零的問題。<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>修正了表達式中 JSON 鍵的 Unicode 解碼問題。<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>修正了2.5版本中alterCollectionField的interceptor DB名稱。 <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>當使用 BM25 強力搜尋時，修正了封存區段的空索引參數。<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>發行日期：2024 年 12 月 23 日</p>
<table>
<thead>
<tr><th>Milvus 版本</th><th>Python SDK 版本</th><th>Node.js SDK 版本</th><th>Java SDK 版本</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 為處理向量搜尋與大規模資料管理的使用者帶來了顯著的進步，以提升可用性、可擴充性與效能。在此版本中，Milvus 整合了強大的新功能，例如：基於術語的搜尋、針對最佳化查詢的聚類壓縮，以及對稀疏與密集向量搜尋方法的多樣化支援。在群集管理、索引和資料處理方面的強化，將彈性和易用性提升到新的層級，使 Milvus 成為更強大、更易於使用的向量資料庫。</p>
<h3 id="Key-Features" class="common-anchor-header">主要功能</h3><h4 id="Full-Text-Search" class="common-anchor-header">全文檢索</h4><p>Milvus 2.5 支援以 Sparse-BM25 實作的全文檢索！此功能是 Milvus 強大語義搜尋功能的重要補充，尤其是在涉及罕見字詞或技術術語的情況下。在之前的版本中，Milvus 支援稀疏向量以協助關鍵字搜尋。這些稀疏向量是由 SPLADEv2/BGE-M3 等神經模型或 BM25 演算法等統計模型在 Milvus 外部產生的。</p>
<p>在<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> 的支援下，Milvus 2.5 內建了分析器和稀疏向量萃取，將 API 從僅接收向量作為輸入擴展到直接接受文字。當資料插入時，BM25 統計資訊會即時更新，提升可用性與精確度。此外，以近似近鄰 (ANN) 演算法為基礎的稀疏向量，提供比標準關鍵字搜尋系統更強大的效能。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/analyzer-overview.md">Analyzer 概觀</a>與<a href="/docs/zh-hant/full-text-search.md">全文</a>檢索。</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">叢集管理 WebUI (測試版)</h4><p>為了更好地支援海量資料和豐富的功能，Milvus 的精密設計包括各種依賴關係、眾多節點角色、複雜的資料結構等。這些方面都可能為使用和維護帶來挑戰。</p>
<p>Milvus 2.5 引入了內建的叢集管理 WebUI，透過可視化 Milvus 複雜的運行環境資訊，降低系統維護的難度。這包括資料庫和資料集、網段、頻道、依存關係、節點健康狀態、任務資訊、緩慢查詢等詳細資訊。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<h4 id="Text-Match" class="common-anchor-header">文字匹配</h4><p>Milvus 2.5 利用<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>的分析器和索引來進行文字預處理和索引建立，支援根據特定詞彙對文字資料進行精確的自然語言匹配。此功能主要用於滿足特定條件的篩選搜尋，並可結合標量篩選來精細查詢結果，允許在符合標量條件的向量內進行相似性搜尋。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/analyzer-overview.md">Analyzer 概觀</a>和<a href="/docs/zh-hant/keyword-match.md">文字匹配</a>。</p>
<h4 id="Bitmap-Index" class="common-anchor-header">位圖索引</h4><p>Milvus 系列新增了標量資料索引。BitMap 索引使用長度等於行數的位元陣列來表示值的存在並加速搜尋。</p>
<p>Bitmap 索引傳統上對於低心數欄位非常有效，因為低心數欄位只有少量不同的值--例如，包含性別資訊的欄位只有兩個可能的值：男性和女性。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/bitmap.md">位元圖索引</a>。</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">可空值與預設值</h4><p>Milvus 現在支援為除主索引鍵欄位以外的標量欄位設定 nullable 屬性和預設值。對於標記為<code translate="no">nullable=True</code> 的標量欄位，使用者可以在插入資料時省略該欄位；系統會將其視為空值或預設值（如果已設定），而不會產生錯誤。</p>
<p>預設值和可為空的屬性為 Milvus 提供了更大的靈活性。使用者在建立集合時，可以利用此功能來處理值不確定的欄位。它也簡化了從其他資料庫系統到 Milvus 的資料遷移，允許處理包含空值的資料集，同時保留原始的預設值設定。</p>
<p>詳情請參閱<a href="/docs/zh-hant/nullable-and-default.md">Nullable &amp; Default Value</a>。</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">基於 Faiss 的 HNSW SQ/PQ/PRQ</h4><p>透過與 Faiss 社群的密切合作，Faiss 中的 HNSW 演算法在功能和效能上都有顯著的改善。基於穩定性和可維護性的考量，Milvus 2.5 正式將 HNSW 的支援從 hnswlib 移轉到 Faiss。</p>
<p>在 Faiss 的基礎上，Milvus 2.5 支援 HNSW 的多種量化方法，以滿足不同場景的需求：SQ (Scalar Quantizers)、PQ (Product Quantizer)、PRQ (Product Residual Quantizer)。SQ 和 PQ 比較常見；SQ 提供良好的查詢效能和建立速度，而 PQ 則在相同的壓縮比下提供較佳的召回率。許多向量資料庫普遍使用二進位量化，這是 SQ 量化的一種簡單形式。</p>
<p>PRQ 是 PQ 與 AQ (Additive Quantizer) 的融合。與 PQ 相比，它需要更長的建立時間，才能提供更好的召回率，尤其是在高壓縮率時，說二進位壓縮。</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">聚類壓縮 (測試版)</h4><p>Milvus 2.5 引入了聚類壓縮 (Clustering Compaction)，以加速搜尋並降低大型資料庫的成本。透過指定標量欄位作為聚類關鍵，資料會依範圍重新分配，以最佳化儲存與擷取。此功能的作用類似全局索引，可讓 Milvus 在根據聚類元資料進行查詢時，有效地剪裁資料，並在套用標量篩選條件時，提升搜尋效能。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/clustering-compaction.md">聚類壓縮</a>。</p>
<h3 id="Other-Features" class="common-anchor-header">其他功能</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">串流節點 (測試版)</h4><p>Milvus 2.5 引入了一個稱為串流節點的新元件，提供先寫後記錄 (WAL) 服務。這可讓 Milvus 在讀寫通道前後達成共識，釋放新特性、功能和最佳化。Milvus 2.5 預設停用此功能，並將於 3.0 版正式提供。</p>
<h4 id="IPv6-Support" class="common-anchor-header">IPv6 支援</h4><p>Milvus 現在支援 IPv6，擴大網路連線性與相容性。</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">CSV 大量匯入</h4><p>除了 JSON 和 Parquet 格式外，Milvus 現在還支援直接大量匯入 CSV 格式的資料。</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">加速查詢的表達式範本</h4><p>Milvus 現在支援表達式範本，提高表達式解析效率，特別是在使用複雜表達式的情況下。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/filtering-templating.md">篩選模板</a>。</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">GroupBy 增強功能</h4><ul>
<li><strong>可自訂群組大小</strong>：新增支援指定每個群組返回的項目數量。</li>
<li><strong>混合 GroupBy 搜尋</strong>：支援基於多向量列的混合 GroupBy 搜尋。</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">迭代器增強功能</h4><ul>
<li><strong>MVCC 支援</strong>：使用者現在可以使用迭代器，而不會受到後續資料變更 (例如插入與刪除) 的影響，這都要歸功於多版本並發控制 (Multi-Version Concurrency Control, MVCC)。</li>
<li><strong>持久游標</strong>：Milvus 現在支援 QueryIterator 的持久游標，讓使用者可以在 Milvus 重新啟動後，從最後一個位置恢復迭代，而不需要重新啟動整個迭代過程。</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進</h3><h4 id="Deletion-Optimization" class="common-anchor-header">刪除優化</h4><p>透過優化鎖的使用和記憶體管理，提高了大規模刪除的速度並降低了記憶體使用量。</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">相依性升級</h4><p>升級至 ETCD 3.5.16 與 Pulsar 3.0.7 LTS，修正現有的 CVE 並加強安全性。注意：升級至 Pulsar 3.x 與之前的 2.x 版本不相容。</p>
<p>對於已經有一個正常運作的 Milvus 部署的使用者，您需要先升級 ETCD 和 Pulsar 元件，才能使用新的特性和功能。詳情請參考<a href="/docs/zh-hant/upgrade-pulsar-v3.md">Pulsar 從 2.x 升級到 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">本機儲存 V2</h4><p>在 Milvus 2.5 中引入了新的本地文件格式，提高了標量資料的載入和查詢效率，減少了記憶體開銷，並為未來的優化奠定了基礎。</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">表達式解析最佳化</h4><p>透過對重複表達式實施快取、升級 ANTLR，以及優化<code translate="no">NOT IN</code> 子句的效能，改善表達式解析。</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">改善 DDL 並發效能</h4><p>優化了資料定義語言 (DDL) 作業的並發效能。</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 功能對齊</h4><p>將 RESTful API 的功能與其他 SDK 統一。</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">安全性與組態更新</h4><p>支援 TLS 以確保在更複雜或企業環境中的節點間通訊安全。如需詳細資訊，請參閱<a href="/docs/zh-hant/tls.md">安全性設定</a>。</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">壓縮效能增強</h4><p>移除混合壓縮中的最大區段限制，現在會優先處理較小的區段，以提高效率並加快大型或分散資料集的查詢速度。</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">基於分數的通道平衡</h4><p>引進可動態平衡各通道負載的政策，在大規模部署中提高資源利用率和整體穩定性。</p>
