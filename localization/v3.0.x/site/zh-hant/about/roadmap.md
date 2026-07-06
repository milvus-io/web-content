---
id: roadmap.md
title: Milvus 發展藍圖
related_key: Milvus roadmap
summary: Milvus 是一個專為驅動 AI 應用程式而打造的開源向量資料庫。以下是我們用以指導開發工作的路線圖。
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
    </button></h1><h2 id="🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="common-anchor-header">🌌 邁向新一代多模態資料庫與向量 Lakebase<button data-href="#🌌-Toward-the-Next-Gen-Multimodal-Database-and-Vector-Lakebase" class="anchor-icon" translate="no">
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
<p>我們正引領 Milvus 邁向一個新時代——次世代多模態資料庫<strong>——涵蓋從結構化到非結構化資料、從即時檢索到離線分析，以及從單一叢集效能到全球性</strong> <strong>Vector Lakebase 架構。</strong></p>
<p>本路線圖概述了<strong>Milvus v3.0（公開測試版）</strong>與<strong>Milvus v3.1（長期開發版）</strong>的核心目標，以及<strong>Zilliz Vector Lakebase</strong> 的演進計畫。</p>
<h2 id="🌠-Milvus-v30-Public-Beta" class="common-anchor-header">🌠 Milvus v3.0（公開測試版）<button data-href="#🌠-Milvus-v30-Public-Beta" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>公開測試版：2026 年 5 月</strong></p>
<p>重點：打造具備引擎內排序、聚合及多向量檢索功能的<strong>語義原生查詢引擎，</strong>並建立<strong>Zilliz Vector Lakebase 的湖原生基礎架構</strong>，使運算無需資料遷移即可直接存取資料。</p>
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
    </button></h3><h4 id="🔹-Schema--Data-Type-Evolution" class="common-anchor-header">🔹<strong>模式與資料型別演進</strong></h4><ul>
<li>支援在執行時執行 ALTER COLLECTION ADD COLUMN 及 DROP COLUMN 操作，無需重建索引或中斷服務。</li>
<li>針對新欄位提供<strong>兩種回填路徑</strong>：透過 Spark Connector 進行外部回填，以及在寫入時自動生成 BM25 稀疏向量以進行內部回填。</li>
<li>引入<strong>TEXT</strong>作為一級資料型別，可儲存原始文字及向量，並支援 BM25 與文字比對功能。</li>
</ul>
<h4 id="🔹-Query-Execution-Overhaul" class="common-anchor-header">🔹<strong>查詢</strong> <strong>執行全面改版</strong></h4><ul>
<li>將<strong>Order By</strong>推入引擎，採用分段排序並在查詢節點間進行合併排序。</li>
<li>新增在核心中運算的 SQL 風格<strong>查詢</strong> <strong>聚合功能</strong>（GROUP BY 搭配 COUNT、SUM、AVG、MIN、MAX）。</li>
<li>針對 ANN 結果引入<strong>搜尋篩選條件</strong>，並在伺服器端提供每桶統計資料與嵌套子篩選條件。</li>
<li>支援在叢集端註冊<strong>自訂詞典</strong>與同義詞表，以提升中日韓（CJK）及特定領域的召回率。</li>
</ul>
<h4 id="🔹-Multi-Vector--Late-Interaction-Support" class="common-anchor-header">🔹<strong>多向量與延遲交互支援</strong></h4><ul>
<li>引入<strong>StructList，將</strong>單一實體表示為包含多個向量的單一行，並透過 MAX_SIM 原生支援延遲交互（ColBERT、ColPali）。</li>
<li>支援針對 StructList 欄位的<strong>元素層級與實體層級搜尋</strong>，並針對實體層級結果提供可配置的匹配策略。</li>
<li>新增三種<strong>多向量檢索策略</strong>：TokenANN（窮盡式）、Muvera（基於投影，無需訓練）以及 Lemur（學習式壓縮）。</li>
</ul>
<h4 id="🔹-Retrieval--Index-Overhaul" class="common-anchor-header">🔹<strong>檢索與索引全面改版</strong></h4><ul>
<li>透過區塊壓縮、權重量化及持久化格式，全面改版<strong>稀疏倒排索引</strong>；引入<strong>SINDI</strong>作為預設的稀疏倒排索引演算法。</li>
<li>透過完整的<strong>Faiss 系列</strong>（SVS、Panorama、PQ、IVFPQ、ScaNN）以及用於近似重複檢測的<strong>MinHash DIDO，</strong>擴展索引涵蓋範圍。</li>
<li>支援<strong>可為空的向量場</strong>，以處理非同步嵌入與缺失模態，並在搜尋時進行自動過濾。</li>
</ul>
<h4 id="🔹-Vector-Lakebase-Storage--Compute-Architecture" class="common-anchor-header">🔹<strong>Vector Lakebase 儲存與運算架構</strong></h4><ul>
<li>引入<strong>External Collection</strong>，可原地對 S3 / GCS / Azure 中的資料進行索引與查詢，並支援 Lance、Parquet、Iceberg 及 Vortex 表格格式。</li>
<li>新增<strong>Vortex</strong>（一種開放式欄位式格式）以及<strong>Loon（Storage V3）</strong>，這是一種混合格式儲存層，可從物件儲存中高效讀取單一資料點。</li>
<li>支援具備 MVCC 風格隔離機制的<strong>時間點快照</strong>，可在持續寫入服務的同時進行批次處理。</li>
<li>整合為<strong>Spark DataSource v2</strong>，可在 Spark / Databricks / EMR 管線中直接讀寫 Milvus 資料。</li>
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
    </button></h2><p><strong>時間表：2026 年末及以後</strong></p>
<p>重點：<strong>儲存智慧</strong>、<strong>寫入路徑完整性</strong>、<strong>運算可擴展性</strong>，以及<strong>擴展</strong> <strong>Vector Lakebase</strong> <strong>的互通性</strong>。</p>
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
    </button></h3><h4 id="🔹-Storage--Write-Path" class="common-anchor-header">🔹<strong>儲存與寫入路徑</strong></h4><ul>
<li>在儲存層新增帶有頁索引與布隆濾波器修剪<strong>的謂詞下推功能</strong>。</li>
<li>在資料導入時實作<strong>主鍵去重</strong>，以防止寫入時產生重複資料。</li>
</ul>
<h4 id="🔹-Compute--Elasticity" class="common-anchor-header">🔹<strong>運算與彈性</strong></h4><ul>
<li>支援<strong>使用者自訂函式 (UDF)</strong>，可在引擎的資料層執行自訂邏輯。</li>
<li>啟用<strong>分片拆分</strong>功能，可隨著資料增長重新分割分片，並支援自訂分片鍵。</li>
</ul>
<h4 id="🔹-Spark--Vector-Lakebase-Expansion" class="common-anchor-header">🔹<strong>Spark 與</strong> <strong>Vector Lakebase</strong> <strong>擴展</strong></h4><ul>
<li>透過更豐富的<strong>原生批次運算子函</strong>式庫，擴充 Spark 連接器。</li>
<li>新增<strong>資料表格式</strong>功能，包括時間回溯、資料結構演進及快照回滾。</li>
<li>透過<strong>CDC 即時外部索引</strong>、Apache Paimon 支援以及更多資料格式，擴展 Vector Lakebase 的互通性。</li>
</ul>
<h2 id="🤝-Co-Building-the-Future-of-Milvus" class="common-anchor-header">🤝 攜手共創 Milvus 的未來<button data-href="#🤝-Co-Building-the-Future-of-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 是一個由全球開發者社群驅動的開源專案。我們誠摯邀請所有社群成員共同塑造下一代多模態資料庫：</p>
<ul>
<li><p>💬<strong>分享回饋</strong>：在<a href="https://github.com/milvus-io/milvus/discussions">GitHub Discussions</a> 上提出新功能或優化建議。</p></li>
<li><p>🐛<strong>回報問題</strong>：透過<a href="https://github.com/milvus-io/milvus/issues">GitHub Issues</a> 提交錯誤報告。</p></li>
<li><p>🔧<strong>貢獻程式碼</strong>：提交 Pull Request 並協助開發核心功能。</p>
<ul>
<li><strong>拉取請求</strong>：直接為我們的<a href="https://github.com/milvus-io/milvus/pulls">程式碼庫</a>貢獻心力。無論是修復錯誤、新增功能，還是改進文件，我們都歡迎您的貢獻。</li>
<li><strong>開發指南</strong>：請參閱我們的<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">《貢獻者指南》</a>，了解程式碼貢獻的相關規範。</li>
</ul></li>
<li><p>🗣️<strong>加入討論</strong>：在<a href="https://milvus.io/discord">Discord</a>、<a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Milvus 辦公室時間</a>（<a href="https://meetings.hubspot.com/chloe-williams1/milvus-meeting">Office Hours</a>）或<a href="https://milvus.io/community">所有社群頻道</a>上提問並與維護者交流。</p></li>
<li><p>⭐<strong>廣為宣傳</strong>：分享最佳實踐與成功案例，並在<a href="https://twitter.com/milvusio">X</a>、<a href="https://www.linkedin.com/company/the-milvus-project/">LinkedIn</a> 和<a href="https://www.youtube.com/c/MilvusVectorDatabase">YouTube</a> 上追蹤 Milvus。</p></li>
</ul>
<p>👉<strong>GitHub：</strong> <a href="https://github.com/milvus-io/milvus">milvus-io/milvus</a></p>
