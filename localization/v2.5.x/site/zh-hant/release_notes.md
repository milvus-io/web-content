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
<p>我們很高興宣佈推出 Milvus 2.5.4，該版本引入了關鍵性能優化和新功能，例如 PartitionKey 隔離、帶有 DAAT MaxScore 的 Sparse Index 以及增強的鎖定機制。這個版本也解決了多個 Bug，提升了整體的穩定性與可靠性。我們鼓勵您升級或試用這個最新版本，並期待您的回饋，以幫助我們持續改進 Milvus！</p>
<h3 id="Features" class="common-anchor-header">功能特色</h3><ul>
<li>支援 PartitionKey 隔離，以改善多個分割區金鑰的效能<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>)。如需詳細資訊，請參閱<a href="/docs/zh-hant/use-partition-key.md">使用分割區金鑰</a>。</li>
<li>Sparse Index 現在支援 DAAT MaxScore<a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>。如需詳細資訊，請參閱<a href="/docs/zh-hant/sparse_vector.md">Sparse Vector</a>。</li>
<li>在表達式中加入對<code translate="no">is_null</code> 的支援<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>可以自訂 Root 權限<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">改進</h3><ul>
<li>快取片段的 delta 資訊以加速查詢協調器<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>在集合層級同步讀取元資料，加速故障復原<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>改進查詢節點的鎖粒度<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
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
<h3 id="Bug-fixes" class="common-anchor-header">錯誤修正</h3><ul>
<li>修正了在多列載入時，粗鎖粒度所導致的緩慢查詢問題<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>修正了使用別名可能導致迭代器遍歷錯誤資料庫的問題<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>修正了帶索引的主鍵搜索失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>修正了重新啟動 MixCoord 和同時刷新可能導致的資料遺失問題<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>修正了更改資料庫時資源群組更新失敗的問題<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>修正了在釋放時，tantivy 索引無法刪除索引檔案的偶發問題<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>修正了在 MixCoord 重新啟動後，由於 stats 任務與 L0 compaction 之間的不當並發所導致的刪除失敗<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>修正了因線程數過多而造成的索引緩慢問題<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>修正了防止在大量匯入時跳過磁碟配額檢查的問題<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319</a>)</li>
<li>透過限制並發量，解決了因太多訊息佇列消費者所造成的凍結問題<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>修正了在大規模壓縮期間，由於 MixCoord 重新啟動而導致的查詢超時問題<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926</a>)</li>
<li>修正了從 2.4 升級到 2.5 時標量倒置索引不相容的問題<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
<li>修正了節點停機造成的頻道不平衡問題<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200</a>)</li>
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
<p>Milvus 2.5 引入了內建的群集管理 WebUI，透過可視化 Milvus 複雜的運行環境資訊，降低系統維護的難度。這包括資料庫和資料集、網段、頻道、依存關係、節點健康狀態、任務資訊、緩慢查詢等詳細資訊。</p>
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
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">聚類壓縮 (測試版)</h4><p>Milvus 2.5 引入了聚類壓縮 (Clustering Compaction)，以加速搜尋並降低大型資料庫的成本。透過指定標量欄位作為聚類關鍵，資料會依範圍重新分配，以最佳化儲存與擷取。此功能的作用類似全局索引，可讓 Milvus 在根據聚類元資料進行查詢時有效地剪裁資料，並在套用標量篩選器時提升搜尋效能。</p>
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
<h4 id="Dependencies-Upgrade" class="common-anchor-header">相依性升級</h4><p>升級至 ETCD 3.5.16 及 Pulsar 3.0.7 LTS，修正現有 CVE 並加強安全性。注意：升級至 Pulsar 3.x 與之前的 2.x 版本不相容。</p>
<p>對於已經有一個正常運作的 Milvus 部署的使用者，您需要先升級 ETCD 和 Pulsar 元件，才能使用新的特性和功能。詳情請參考<a href="/docs/zh-hant/upgrade-pulsar-v3.md">Pulsar 從 2.x 升級到 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">本機儲存 V2</h4><p>在 Milvus 2.5 中引入了新的本地文件格式，提高了標量資料的載入和查詢效率，減少了記憶體開銷，並為未來的優化奠定了基礎。</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">表達式解析最佳化</h4><p>透過實作重複表達式的快取、升級 ANTLR，以及優化<code translate="no">NOT IN</code> 子句的效能，改善表達式解析。</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">改善 DDL 並發效能</h4><p>優化了資料定義語言 (DDL) 作業的並發效能。</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">RESTful API 功能對齊</h4><p>將 RESTful API 的功能與其他 SDK 統一。</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">安全性與組態更新</h4><p>支援 TLS 以確保在更複雜或企業環境中的節點間通訊安全。如需詳細資訊，請參閱<a href="/docs/zh-hant/tls.md">安全性設定</a>。</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">壓縮效能增強</h4><p>移除混合壓縮中的最大區段限制，現在會優先處理較小的區段，以提高效率並加快大型或分散資料集的查詢速度。</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">基於分數的通道平衡</h4><p>引進可動態平衡各通道負載的政策，在大規模部署中提高資源利用率和整體穩定性。</p>
