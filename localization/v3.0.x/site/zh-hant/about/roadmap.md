---
id: roadmap.md
title: Milvus 發展藍圖
related_key: Milvus roadmap
summary: Milvus 是一個專為支援 AI 應用程式而建構的開源向量資料庫。以下是我們用以指導開發工作的路線圖。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 發展藍圖<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">🌌 邁向新一代多模態資料庫與資料湖<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus 產品路線圖</strong></p>
<p>歡迎瀏覽 Milvus 發展藍圖！</p>
<p>我們正引領 Milvus 邁向一個新時代——次世代多模態資料庫——涵蓋<strong>從結構化到非結構化資料</strong>、<strong>從即時檢索到離線分析</strong>，以及<strong>從單一叢集效能到全球資料湖架構</strong>。</p>
<p>本路線圖概述了<strong>Milvus v2.6（開發中）</strong>、<strong>Milvus v3.0（預計於 2026 年底推出）</strong>及<strong>Milvus v3.1（長期開發）</strong>的核心目標，並包含<strong>Vector Lake（資料湖／Loon）</strong>的演進計畫。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">🧩 Milvus v2.6（開發中）<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時程：2025 年中 – 2025 年底</strong></p>
<p>重點：<strong>升級資料模型</strong>、<strong>重構串流架構</strong>、<strong>建置熱/冷分層功能</strong>，並推出<strong>Vector Lake 原型（v0.1）</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 重點亮點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header">🔹<strong>資料模型升級</strong></h4><ul>
<li><p>引入統一的<strong>Tensor / StructList</strong>資料型別，以支援多向量嵌入結構，實現與<em>ColBERT</em>、<em>CoLQwen</em>、<em>影片及多模態向量的</em>相容性。</p></li>
<li><p>新增<strong>地理資料</strong>支援，包含點、區域及空間索引（基於<em>libspatial</em>），以擴展 LBS 與 GIS 的應用場景。</p></li>
<li><p>支援<strong>帶時區</strong>的<strong>Timestamp</strong>資料型別。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header">🔹<strong>StreamNode 架構重構</strong></h4><ul>
<li><p>重寫串流導入管線，以優化增量寫入與即時運算。</p></li>
<li><p>顯著提升並行處理效能與穩定性，為統一的即時與離線處理奠定基礎。</p></li>
<li><p>引入新的訊息佇列引擎：<strong>Woodpecker</strong>。</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header">🔹<strong>熱/冷分層與儲存架構 (StorageV2)</strong></h4><ul>
<li><p>支援雙重儲存格式：<strong>Parquet</strong>與<strong>Vortex，</strong>提升並發能力與記憶體效率。</p></li>
<li><p>實作分層儲存，具備自動熱/冷資料分離與智慧調度功能。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header">🔹<strong>Vector Lake 原型 (v0.1)</strong></h4><ul>
<li><p>透過 FFI 與<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusion</strong>整合，實現離線模式演進與 KNN 查詢。</p></li>
<li><p>提供多模態資料視覺化及 Spark ETL 示範，建立基礎資料湖架構。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Early-2026" class="common-anchor-header">🌠 Milvus v3.0（預計於 2026 年初推出）<button data-href="#🌠-Milvus-v30-Targeted-for-Early-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時間表：2025 年末 – 2026 年初</strong></p>
<p>重點：全面提升<strong>搜尋體驗</strong>、<strong>資料結構靈活性及</strong> <strong>非結構化資料支援能力</strong>，並同步發布<strong>Vector Lake (v0.2)</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 主要亮點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header">🔹<strong>搜尋體驗全面革新</strong></h4><ul>
<li><p>導入「<strong>更多類似內容」（MLT）</strong>相似度搜尋功能，並支援帶有位置資訊或反例的搜尋。</p></li>
<li><p>新增語義搜尋功能，例如<strong>文字標示</strong>與<strong>權重提升</strong>。</p></li>
<li><p>支援<strong>自訂詞典</strong>與<strong>同義詞表</strong>，可在分析器層級定義詞彙與語義規則。</p></li>
<li><p>為查詢引入<strong>彙總</strong>功能。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header">🔹<strong>多租戶與資源管理</strong></h4><ul>
<li><p>啟用多租戶刪除、統計分析以及熱/冷分層功能。</p></li>
<li><p>改進資源隔離與調度策略，以支援單一叢集中數百萬張資料表。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header">🔹<strong>模式與主鍵增強功能</strong></h4><ul>
<li><p><strong>實作全域主鍵去重 (Global PK Dedup)</strong>，以確保資料的一致性與唯一性。</p></li>
<li><p>支援<strong>靈活的模式管理</strong>（新增／刪除欄位、備份填補）。</p></li>
<li><p>允許向量欄位中出現<strong>NULL 值</strong>。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header">🔹<strong>擴展非結構化資料類型（BLOB / 文字）</strong></h4><ul>
<li><p>引入<strong>BLOB 資料型別，</strong>為檔案、圖片及影片等二進位資料提供原生儲存與參照功能。</p></li>
<li><p>引入<strong>TEXT 資料型別</strong>，提供增強的全文字與內容導向搜尋功能。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header">🔹<strong>企業級功能</strong></h4><ul>
<li><p>支援<strong>基於快照的備份與還原</strong>。</p></li>
<li><p>提供<strong>端到端追蹤</strong>與<strong>稽核日誌</strong>功能。</p></li>
<li><p>在跨多叢集部署中實現<strong>主動-備援高可用性 (HA)</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header">🔹<strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>支援<strong>TEXT / BLOB 儲存</strong>及<strong>多版本快照管理</strong>。</p></li>
<li><p>整合 Spark 以執行離線索引、聚類、去重及維度縮減任務。</p></li>
<li><p>提供<strong>ChatPDF 冷查詢及離線基準測試示範</strong>。</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">🪐 Milvus v3.1（長期願景）<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時程：2026 年中</strong></p>
<p>重點：<strong>使用者自訂函數（UDF）</strong>、<strong>分散式運算整合</strong>、<strong>標量查詢優化</strong>、<strong>動態分片</strong>，以及<strong>Vector Lake（v1.0）</strong>的正式發布。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">🎯 重點亮點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹<strong>自定義函數 (UDF) 與分散式運算生態系統</strong></h4><ul>
<li><p>支援<strong>使用者自訂函式（UDF）</strong>，讓開發人員能將自訂邏輯注入檢索與運算工作流程中。</p></li>
<li><p>與<strong>Ray Dataset / Daft</strong>深度整合，以實現分散式 UDF 執行與多模態資料處理。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header">🔹<strong>標量查詢與本地格式演進</strong></h4><ul>
<li><p>針對標量欄位優化篩選與彙總效能。</p></li>
<li><p>強化表達式評估與索引加速執行。</p></li>
<li><p>支援本地檔案格式的<strong>就地更新</strong>。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header">🔹<strong>進階搜尋功能</strong></h4><ul>
<li><p>新增以下功能：<strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong> 及<strong>模糊匹配</strong>查詢。</p></li>
<li><p>透過支援以下功能來強化文字檢索：</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header">🔹<strong>動態分片與可擴展性</strong></h4><ul>
<li><p>啟用<strong>自動分片分割</strong>與<strong>負載平衡</strong>，以實現無縫擴展。</p></li>
<li><p>優化<strong>全局索引建置</strong>，並確保<strong>分散式搜尋效能</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header">🔹<strong>Vector Lake V1.0</strong></h4><ul>
<li><p>與<strong>Ray / Daft / PyTorch</strong>深度整合，以支援分散式 UDF 及情境工程（Context Engineering）的應用場景。</p></li>
<li><p>提供<strong>RAG（檢索增強生成）示範</strong> <strong>，並支援從 Iceberg 資料表匯入資料</strong>。</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 攜手共築 Milvus 的未來<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一個由全球開發者社群驅動的開源專案。</p>
<p>我們誠摯邀請所有社群成員共同塑造下一代多模態資料庫：</p>
<ul>
<li><p>💬<strong>分享回饋</strong>：提出新功能或優化建議</p></li>
<li><p>🐛<strong>回報問題</strong>：透過 GitHub Issues 提交錯誤報告</p></li>
<li><p>🔧<strong>貢獻程式碼</strong>：提交 Pull Request 並協助開發核心功能</p>
<ul>
<li><p><strong>拉取請求</strong>（<strong>Pull Requests</strong>）：直接為我們的<a href="https://github.com/milvus-io/milvus/pulls">程式碼庫</a>做出貢獻。無論是修復錯誤、新增功能，還是改進文件，我們都歡迎您的貢獻。</p></li>
<li><p><strong>開發指南</strong>：請參閱我們的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">《貢獻者指南》</a>，了解程式碼貢獻的相關規範。</p></li>
</ul></li>
<li><p>⭐<strong>廣為宣傳</strong>：分享最佳實踐與成功案例</p></li>
</ul>
<p>👉<strong>GitHub：</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
