---
id: roadmap.md
title: Milvus 路線圖
related_key: Milvus roadmap
summary: Milvus 是一個開放原始碼的向量資料庫，專為人工智能應用程式打造。以下是我們的發展路線圖。
---
<h1 id="Milvus-Roadmap" class="common-anchor-header">Milvus 路線圖<button data-href="#Milvus-Roadmap" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="common-anchor-header">邁向新一代多模式資料庫和資料湖<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Data-Lake" class="anchor-icon" translate="no">
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
<p>歡迎來到 Milvus 路線圖！</p>
<p>我們正將 Milvus 帶入一個新時代 - 新世代多模式<strong>資料</strong>庫 - 涵蓋<strong>結構化資料到非結構化資料</strong>、<strong>即時擷取到離線分析</strong>、<strong>單一集群效能到全球資料湖架構</strong>。</p>
<p>本路線圖概述<strong>Milvus v2.6（進行中）</strong>、<strong>Milvus v3.0（目標於 2026 年底）</strong>和<strong>Milvus v3.1（長期開發）</strong>的核心目標，以及<strong>Vector Lake（資料湖 / Loon）</strong>的演進計畫。</p>
<h2 id="🧩-Milvus-v26-In-Progress" class="common-anchor-header">Milvus v2.6 (進行中)<button data-href="#🧩-Milvus-v26-In-Progress" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時間表：2025 年中 - 2025 年底</strong></p>
<p>重點：<strong>升級資料模型</strong>、<strong>重構串流架構</strong>、<strong>建立冷熱分層功能</strong>，以及推出<strong>Vector Lake 原型 (v0.1)</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主要亮點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Data-Model-Upgrade" class="common-anchor-header"><strong>資料模型升級</strong></h4><ul>
<li><p>引入統一的<strong>Tensor / StructList</strong>資料類型，以支援多向量嵌入結構，使其能與<em>ColBERT</em>、<em>CoLQwen</em>、<em>視訊</em>和<em>多模態向量</em>相容。</p></li>
<li><p>新增<strong>Geo Data</strong>支援，包括點、區域和空間索引 (基於<em>libspatial</em>)，以擴充 LBS 和 GIS 的使用案例。</p></li>
<li><p>支援<strong>含時區</strong>資料類型的<strong>Timestamp</strong>。</p></li>
</ul>
<h4 id="🔹-StreamNode-Architecture-Refactor" class="common-anchor-header"><strong>StreamNode 架構重構</strong></h4><ul>
<li><p>重寫串流擷取管道，以最佳化增量寫入與即時計算。</p></li>
<li><p>大幅提升並發效能與穩定性，為統一即時與離線處理奠定基礎。</p></li>
<li><p>引入新的訊息佇列引擎：<strong>Woodpecker</strong>。</p></li>
</ul>
<h4 id="🔹-HotCold-Tiering--Storage-Architecture-StorageV2" class="common-anchor-header"><strong>🔹熱/冷分層與儲存架構 (StorageV2)</strong></h4><ul>
<li><p>支援雙儲存格式：<strong>Parquet</strong>和<strong>Vortex</strong>，增強了並發性和記憶體效率。</p></li>
<li><p>以自動冷熱資料分離和智慧型排程實施分層儲存。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-Prototype-v01" class="common-anchor-header"><strong>向量湖原型 (v0.1)</strong></h4><ul>
<li><p>透過 FFI 與<strong>Spark</strong>/<strong>DuckDB</strong>/<strong>DataFusion</strong>整合，實現離線模式演進和 KNN 查詢。</p></li>
<li><p>提供多模式資料可視化和 Spark ETL 示範，建立基礎資料湖架構。</p></li>
</ul>
<h2 id="🌠-Milvus-v30-Targeted-for-Late-2026" class="common-anchor-header">🌠 Milvus v3.0（目標於 2026 年末推出）<button data-href="#🌠-Milvus-v30-Targeted-for-Late-2026" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時間線：2025 年底 - 2026 年初</strong></p>
<p>重點：全面強化<strong>搜尋體驗</strong>、<strong>模式彈性</strong>和<strong>非結構化資料支援</strong>，同時推出<strong>Vector Lake (v0.2)</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主要亮點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-Search-Experience-Overhaul" class="common-anchor-header"><strong>🔹搜尋體驗徹底改變</strong></h4><ul>
<li><p>引入<strong>More Like This (MLT)</strong>類似性搜尋，支援包含位置或負面範例的搜尋。</p></li>
<li><p>新增語意搜尋功能，例如<strong>高亮顯示</strong>和<strong>強化</strong>。</p></li>
<li><p>支援<strong>自訂字典</strong>和<strong>同義詞表</strong>，在 Analyzer 層支援詞彙和語義規則定義。</p></li>
<li><p>為查詢引入<strong>聚合</strong>功能。</p></li>
</ul>
<h4 id="🔹-Multi-Tenancy--Resource-Management" class="common-anchor-header"><strong>多租戶與資源管理</strong></h4><ul>
<li><p>啟用多租戶刪除、統計和冷/熱分層。</p></li>
<li><p>改善資源隔離與排程策略，以支援單一叢集中的數百萬個資料表。</p></li>
</ul>
<h4 id="🔹-Schema--Primary-Key-Enhancements" class="common-anchor-header"><strong>模式與主金鑰增強功能</strong></h4><ul>
<li><p>實施<strong>全局主金鑰重複資料刪除 (Global PK Dedup)</strong>，以保證資料的一致性和唯一性。</p></li>
<li><p>支援<strong>彈性的模式管理</strong>(新增/刪除欄位、備份填充)。</p></li>
<li><p>允許向量欄位的<strong>NULL 值</strong>。</p></li>
</ul>
<h4 id="🔹-Expanded-Unstructured-Data-Types-BLOB--Text" class="common-anchor-header"><strong>擴充的非結構化資料類型 (BLOB / 文字)</strong></h4><ul>
<li><p>引入<strong>BLOB 類型</strong>，為檔案、影像和視訊等二進位資料提供本機儲存和引用。</p></li>
<li><p>引入<strong>TEXT 類型</strong>，提供增強的全文和基於內容的搜尋功能。</p></li>
</ul>
<h4 id="🔹-Enterprise-Grade-Capabilities" class="common-anchor-header"><strong>🔹企業級功能</strong></h4><ul>
<li><p>支援<strong>以快照為基礎的備份與復原</strong>。</p></li>
<li><p>提供<strong>端對端追蹤</strong>與<strong>稽核記錄</strong>。</p></li>
<li><p>在多群集部署中執行<strong>主動備用高可用性 (HA)</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-v02" class="common-anchor-header"><strong>Vector Lake (v0.2)</strong></h4><ul>
<li><p>支援<strong>TEXT / BLOB 儲存</strong>與<strong>多版本快照管理</strong>。</p></li>
<li><p>整合 Spark 以執行離線索引、群集、重複資料刪除及降維工作。</p></li>
<li><p>提供<strong>ChatPDF 冷查詢和離線基準演示</strong>。</p></li>
</ul>
<h2 id="🪐-Milvus-v31-Long-Term-Vision" class="common-anchor-header">Milvus v3.1 (長期願景)<button data-href="#🪐-Milvus-v31-Long-Term-Vision" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>時間表：2026 年中</strong></p>
<p>重點：<strong>使用者定義函式 (UDF)</strong>、<strong>分散式運算整合</strong>、<strong>標量查詢最佳化</strong>、<strong>動態分片</strong>，以及正式釋出<strong>Vector Lake (v1.0)</strong>。</p>
<h3 id="🎯-Key-Highlights" class="common-anchor-header">主要焦點<button data-href="#🎯-Key-Highlights" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="🔹-UDF--Distributed-Computing-Ecosystem" class="common-anchor-header">🔹<strong>UDF 與分散式運算生態系統</strong></h4><ul>
<li><p>支援<strong>使用者定義函式 (UDF)</strong>，讓開發人員可將自訂邏輯注入擷取與計算工作流程。</p></li>
<li><p>與<strong>Ray Dataset / Daft</strong>深度整合，以進行分散式 UDF 執行與多模式資料處理。</p></li>
</ul>
<h4 id="🔹-Scalar-Query--Local-Format-Evolution" class="common-anchor-header"><strong>標量查詢與本地格式演進</strong></h4><ul>
<li><p>最佳化標量欄位的篩選與聚合效能。</p></li>
<li><p>增強表達式評估和索引加速執行。</p></li>
<li><p>支援本機檔案格式的<strong>就地更新</strong>。</p></li>
</ul>
<h4 id="🔹-Advanced-Search-Capabilities" class="common-anchor-header"><strong>進階搜尋功能</strong></h4><ul>
<li><p>新增下列功能：<strong>RankBy</strong>、<strong>OrderBy</strong>、<strong>Facet</strong> 及<strong>模糊匹配</strong>查詢。</p></li>
<li><p>增強文字擷取，支援</p>
<ul>
<li><p><code translate="no">match_phrase_prefix</code></p></li>
<li><p><code translate="no">Completion Suggester</code></p></li>
<li><p><code translate="no">Term Suggester</code></p></li>
<li><p><code translate="no">Phrase Suggester</code></p></li>
</ul></li>
</ul>
<h4 id="🔹-Dynamic-Sharding--Scalability" class="common-anchor-header"><strong>動態分片與擴充能力</strong></h4><ul>
<li><p>啟用<strong>自動分片</strong>和<strong>負載平衡</strong>，實現無縫擴充。</p></li>
<li><p>改善<strong>全局索引建置</strong>，確保<strong>分散式搜尋效能</strong>。</p></li>
</ul>
<h4 id="🔹-Vector-Lake-V10" class="common-anchor-header"><strong>Vector Lake V1.0</strong></h4><ul>
<li><p>與<strong>Ray / Daft / PyTorch</strong>深度整合，以支援分散式 UDF 和 Context Engineering 用例。</p></li>
<li><p>提供<strong>RAG（Retrieval-Augmented Generation）演示</strong> <strong>，並從 Iceberg 表匯入</strong>。</p></li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">共同打造 Milvus 的未來<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是由全球開發人員社群驅動的開放原始碼專案。</p>
<p>我們熱烈邀請所有社群成員協助塑造下一代的多模態資料庫：</p>
<ul>
<li><p><strong>分享回饋</strong>：提出新功能或最佳化構想</p></li>
<li><p>🐛<strong>回報問題</strong>：透過 GitHub Issues 歸檔錯誤</p></li>
<li><p>🔧<strong>貢獻程式碼</strong>：提交 PR 並協助建立核心功能</p>
<ul>
<li><p><strong>拉取請求</strong>：直接貢獻至我們的<a href="https://github.com/milvus-io/milvus/pulls">程式碼庫</a>。無論是修正錯誤、新增功能或改善文件，我們都歡迎您的貢獻。</p></li>
<li><p><strong>開發指南</strong>：查看我們的<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">貢獻者指南</a>，瞭解有關代碼<a href="https://github.com/milvus-io/milvus/blob/82915a9630ab0ff40d7891b97c367ede5726ff7c/CONTRIBUTING.md">貢獻</a>的指引。</p></li>
</ul></li>
<li><p>⭐<strong>傳播訊息</strong>：分享最佳實作與成功案例</p></li>
</ul>
<p>👉<strong>GitHub:</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
