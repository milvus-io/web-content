---
id: roadmap.md
title: Milvus 發展藍圖
related_key: Milvus roadmap
summary: 探索 Milvus 在 3.0 及 3.1 版本中，針對搜尋、分析、模式演進、資料湖整合及效能等領域的開發藍圖。
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
    </button></h1><p>Milvus 3.0 整合了多向量檢索、SQL 風格查詢、彈性資料結構，以及對資料湖儲存的存取功能。後續階段將在此基礎上，提供更豐富的查詢功能、更廣泛的資料模型，並提升效能與擴展性。本路線圖概述了開源版 Milvus 的優先發展方向。</p>
<p>Milvus 3.0 自<strong>v3.0.1</strong> 起正式推出。以下已發布的功能於<strong>v3.0.0</strong> 中首次推出；預覽功能與需主動啟用的功能將於出現之處標示。<strong>3.0.x</strong>系列將進一步擴展這些功能，而<strong>3.1 版本預計於 2026 年 12 月推出</strong>。隨著開發進程的推進，規劃中的功能與目標日期可能會有所變動。</p>
<h2 id="Search-and-retrieval" class="common-anchor-header">搜尋與檢索<button data-href="#Search-and-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p>檢索路線圖的重點在於將更多相關性訊號整合至 Milvus 之中，範圍涵蓋從文字比對、多向量表示，到重新排序及搜尋結果篩選條件。</p>
<p><strong>3.0 版本中已提供</strong></p>
<ul>
<li><strong>多向量檢索：</strong>StructArray 搜尋支援 Muvera 和 Lemur，並透過<code translate="no">element_filter</code> 進行元素層級篩選。匹配策略包括<code translate="no">MATCH_ANY</code> 、<code translate="no">MATCH_ALL</code> 、<code translate="no">MATCH_LEAST</code> 、<code translate="no">MATCH_MOST</code> 以及<code translate="no">MATCH_EXACT</code> 。</li>
<li><strong>文字比對與相似度：</strong>自訂詞典和同義詞可將文字檢索功能調整以符合應用程式需求。正規表達式（Regex）篩選支援模式比對，而 MinHash 則支援近重複內容偵測。</li>
<li><strong>重新排序與推論：</strong>Milvus 3.0 引入了首批「函數鏈（Function Chain）」重新排序功能，並搭配 Hugging Face 推論提供者。其餘的函數鏈功能預計將於 3.0.x 版本中推出。</li>
<li><strong>搜尋聚合：</strong>搜尋聚合功能可針對搜尋結果提供篩選維度。</li>
</ul>
<p><strong>預計於 3.0.x 版本中推出</strong></p>
<p>3.0.x 系列預計將新增模糊匹配與全局統計功能，並完整支援「函數鏈」。</p>
<p><strong>預計於 3.1 版本推出</strong></p>
<p>規劃內容包括基於 Grep 的檢索、透過 ANN-filter 融合更緊密地整合近似最近鄰 (ANN) 搜尋與篩選功能，以及對稀疏檢索的改進。</p>
<h2 id="Analytics-and-SQL-style-querying" class="common-anchor-header">分析與 SQL 風格查詢<button data-href="#Analytics-and-SQL-style-querying" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 正在擴展其查詢引擎，使應用程式能在檢索的同時對資料進行排序與彙總。下一階段將新增聯結、實體化檢視以及自訂運算功能。</p>
<p><strong>3.0 版本已提供</strong></p>
<p>查詢與搜尋功能現已支援透過 `<code translate="no">ORDER BY</code>` 進行排序。查詢彙總功能新增了 `<code translate="no">GROUP BY</code> `，用於計算分組統計資料。</p>
<p><strong>預計於 3.1 版本推出</strong></p>
<ul>
<li><strong>更豐富的查詢功能：</strong>引入聯結（首先支援半聯結）以及實體化檢視集合。</li>
<li><strong>資料更新與完整性：</strong>支援就地更新，以及在資料導入過程中的主鍵去重。</li>
<li><strong>查詢迭代與 JSON 語義：</strong>新增具狀態的查詢迭代器、JSON<code translate="no">GROUP BY</code> 以及 SQL / JSON NULL 語義。</li>
<li><strong>自訂運算：</strong>支援 Python 使用者自訂函式 (UDF)。</li>
</ul>
<h2 id="Flexible-schema-and-data-types" class="common-anchor-header">靈活的資料結構與資料類型<button data-href="#Flexible-schema-and-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>模式相關的工作重點在於演進現有集合，並能呈現更廣泛的資料類型。其涵蓋欄位變更、多向量結構、長文字以及實體過期機制。</p>
<p><strong>3.0 版本中提供</strong></p>
<ul>
<li><strong>線上模式變更：</strong>現有集合支援線上新增欄位，包括向量與<code translate="no">Array&lt;Struct&gt;</code> 欄位。刪除欄位功能目前處於<strong>預覽階段</strong>，可能存在某些限制。</li>
<li><strong>現有資料的回填：</strong>外部回填使用 Spark Connector。內部回填則將 BM25 或 MinHash 函式附加至集合，並針對現有資料計算其輸出結果。</li>
<li><strong>文字與多向量資料：</strong> <code translate="no">TEXT</code> 類型用於儲存長文字，而 StructArray 則透過 `<code translate="no">MAX_SIM</code>` 支援延遲互動檢索。<code translate="no">TEXT</code> 需啟用 Storage V3 功能。</li>
<li><strong>NULL 值與過期設定：</strong>向量欄位可接受 NULL 值，且實體層級的存活時間 (TTL) 會控制過期行為。</li>
</ul>
<p><strong>3.0.x 版本規劃</strong></p>
<p>規劃中的架構增強功能將擴展 StructArray 對資料型別、NULL 值以及欄位新增與移除的支持。此外，還將新增分子式支援，並為向量欄位提供<code translate="no">IS NULL</code> /<code translate="no">IS NOT NULL</code> 篩選器。</p>
<p><strong>3.1 版本規劃</strong></p>
<p>下一階段的資料模型擴充功能將包含嵌套 JSON 與 Struct、複合主鍵、不含向量欄位的集合，以及 StructList 中的稀疏向量。</p>
<h2 id="Lake-integration-and-data-versioning" class="common-anchor-header">湖儲存整合與資料版本控制<button data-href="#Lake-integration-and-data-versioning" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 正致力於與資料湖儲存及批次處理進行更緊密的整合。外部集合可讓使用者直接存取資料的原始位置，而快照則為資料版本控制奠定基礎。</p>
<p><strong>已於 3.0 版本推出</strong></p>
<ul>
<li><strong>外部資料存取：</strong>外部集合支援 Lance、Parquet 及 Iceberg 資料。</li>
<li><strong>快照與批次整合：</strong>快照可擷取集合資料的特定版本，而 Spark 連接器則支援批次工作流程。</li>
<li><strong>儲存基礎架構：</strong>Storage V3（Loon）提供可選擇啟用的 Vortex 和 Lance 支援。此功能預設為停用狀態，需透過<code translate="no">common.storage.useLoonFFI</code> 啟用。快照與<code translate="no">TEXT</code> 皆依賴此功能。</li>
</ul>
<p><strong>3.0.x 版本規劃</strong></p>
<p>規劃中的增強功能將允許 Milvus 收集快照用作外部收集。外部資料表支援範圍亦將擴展至 JSON 拆分、函數欄位新增及欄位移除。</p>
<p><strong>3.1 版本規劃</strong></p>
<p>計畫內容包含基於 S3 的稀疏索引與標量索引，以及透過匯入進行刪除的功能。</p>
<h2 id="Performance-indexing-and-scale" class="common-anchor-header">效能、索引與擴展性<button data-href="#Performance-indexing-and-scale" class="anchor-icon" translate="no">
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
    </button></h2><p>效能路線圖涵蓋檢索索引、查詢執行及叢集擴展。此外，亦針對復原作業，以及必須從物件儲存讀取資料的查詢進行優化。</p>
<p><strong>3.0 版本已提供</strong></p>
<ul>
<li><strong>稀疏索引：</strong>稀疏索引的全面改版引進了 SINDI。</li>
<li><strong>索引選擇：</strong> <code translate="no">FAISS</code> 直通索引支援 Faiss 索引生成器字串，選項包括 SVS、Panorama、PQ、IVFPQ 及 ScaNN。此外，DiskANN 索引亦可用於嵌入清單（EmbList）。</li>
<li><strong>壓縮：</strong>Force Merge 提供對區段合併的明確控制。</li>
</ul>
<p><strong>預計於 3.1 版本推出</strong></p>
<ul>
<li><strong>儲存體感知查詢：</strong>為 Vortex 新增謂詞下推功能，包括頁級修剪與跳過索引。</li>
<li><strong>叢集擴展與租戶管理：</strong>支援分片分割、自訂分片鍵以及多租戶優化。</li>
<li><strong>查詢執行與索引：</strong>開發 QueryView，改進對寬集合、串流結果縮減的支持，並支援多個索引。</li>
<li><strong>寫入可靠性：</strong>支援幂等寫入。</li>
<li><strong>物件儲存快取：</strong>使用 Talon 作為 S3 快取，以改善故障恢復與冷查詢效能。</li>
</ul>
<h2 id="Beyond-31" class="common-anchor-header">3.1 之後<button data-href="#Beyond-31" class="anchor-icon" translate="no">
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
    </button></h2><p>較長期的開發工作包括「時間旅行」與快照回滾功能。其具體範圍與發布時程尚待確認。</p>
<h2 id="Help-shape-the-roadmap" class="common-anchor-header">協助形塑路線圖<button data-href="#Help-shape-the-roadmap" class="anchor-icon" translate="no">
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
    </button></h2><p>請在<a href="https://github.com/milvus-io/milvus/discussions">GitHub 討論區中</a>分享對您的應用程式至關重要的工作負載、限制條件及功能需求。透過<a href="https://github.com/milvus-io/milvus/issues">GitHub Issue</a> 回報錯誤。</p>
<p>若要貢獻程式碼或文件，請先參閱《<a href="https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md">貢獻者指南</a>》。</p>
