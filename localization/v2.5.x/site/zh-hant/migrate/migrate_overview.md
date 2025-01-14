---
id: migrate_overview.md
summary: 本文概述了 Milvus-migration 工具，包括支援的遷移、功能和架構。
title: Milvus 遷移概述
---
<h1 id="Milvus-Migration-Overview" class="common-anchor-header">Milvus 遷移概述<button data-href="#Milvus-Migration-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus意識到用戶群的多樣化需求，擴展了其遷移工具，不僅方便從早期的Milvus 1.x版本升級，還能無縫集成來自其他系統（如<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html">Elasticsearch</a>和<a href="https://github.com/facebookresearch/faiss">Faiss</a>）的數據。<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>專案旨在縮短這些不同資料環境與 Milvus 技術最新進展之間的差距，確保您能無縫利用改進的功能和效能。</p>
<h2 id="Supported-migrations" class="common-anchor-header">支援的遷移<button data-href="#Supported-migrations" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具支援多種遷移路徑，以滿足不同使用者的需求：</p>
<ul>
<li><a href="/docs/zh-hant/es2m.md">Elasticsearch 至 Milvus 2.x</a>：讓使用者能夠從 Elasticsearch 環境遷移資料，以利用 Milvus 最佳化的向量搜尋功能。</li>
<li><a href="/docs/zh-hant/f2m.md">Faiss 至 Milvus 2.x</a>：提供從 Faiss 轉移資料的實驗性支援，Faiss 是高效率相似性搜尋的流行函式庫。</li>
<li><a href="/docs/zh-hant/m2m.md">Milvus 1.x 至 Milvus 2.x</a>：確保早期版本的資料能順利過渡到最新的架構。</li>
<li><a href="/docs/zh-hant/from-m2x.md">Milvus 2.3.x 至 Milvus 2.3.x 或以上版本</a>：為已遷移至 2.3.x 的使用者提供一次性遷移路徑。</li>
</ul>
<h2 id="Features" class="common-anchor-header">特點<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-migration 具備強大的功能，可處理各種不同的遷移情境：</p>
<ul>
<li>多種互動方式：您可以透過命令列介面或 Restful API 執行遷移，彈性處理遷移的執行方式。</li>
<li>支援各種檔案格式與雲端儲存：<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>工具可處理儲存在本機檔案以及 S3、OSS 和 GCP 等雲端儲存解決方案中的資料，確保廣泛的相容性。</li>
<li>資料類型處理：<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>既能處理向量資料，也能處理標量值欄位，是滿足不同資料遷移需求的多用途選擇。</li>
</ul>
<h2 id="Architecture" class="common-anchor-header">架構<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>的架構是經過策略性的設計，以促進有效率的資料串流、解析和寫入過程，使其能夠在各種資料來源之間進行強大的遷移能力。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-migration-architecture.jpeg" alt="Milvus-migration architecture" class="doc-image" id="milvus-migration-architecture" />
   </span> <span class="img-wrapper"> <span>Milvus-migration架構</span> </span></p>
<p>在上圖中</p>
<ul>
<li><strong>資料來源</strong>：<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>支援多種資料來源，包括透過<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/scroll-api.html">scroll API</a> 的 Elasticsearch、本機或雲端儲存的資料檔案，以及 Milvus 1.x 資料庫。這些資料會以簡化的方式存取與讀取，以啟動遷移程序。</li>
<li><strong>流管道</strong>：<ul>
<li><strong>解析流程</strong>：來自資料來源的資料會根據其格式進行解析。例如，對於來自 Elasticsearch 的資料來源，會使用 Elasticsearch 格式解析器，而其他格式則使用各自的解析器。這個步驟對於將原始資料轉換為可進一步處理的結構化格式非常重要。</li>
<li><strong>轉換流程</strong>：解析之後，資料會進行轉換，在轉換過程中，欄位會被篩選、資料類型會被轉換，而表名也會根據目標 Milvus 2.x 結構描述進行調整。這可確保資料符合 Milvus 的預期結構和類型。</li>
</ul></li>
<li><strong>資料寫入與載入</strong>：<ul>
<li><strong>寫入資料</strong>：將處理後的資料寫入中間的 JSON 或 NumPy 檔案，準備載入 Milvus 2.x。</li>
<li><strong>載入資料</strong>：資料最後使用<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">BulkInsert</a>作業載入 Milvus 2.x，此作業可有效率地將大量資料寫入 Milvus 儲存系統，無論是雲端或檔案儲存。</li>
</ul></li>
</ul>
<h2 id="Future-plans" class="common-anchor-header">未來計劃<button data-href="#Future-plans" class="anchor-icon" translate="no">
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
    </button></h2><p>開發團隊致力於增強<a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>的功能，例如</p>
<ul>
<li><strong>支援更多資料來源</strong>：計劃擴展對其他資料庫和檔案系統的支援，例如 Pinecone、Chroma、Qdrant。如果您需要特定資料來源的支援，請透過此<a href="https://github.com/zilliztech/milvus-migration/issues">GitHub issue 連結</a>提交您的請求。</li>
<li><strong>指令簡化</strong>：努力簡化指令流程，讓執行更容易。</li>
<li><strong>SPI 解析器</strong>/<strong>轉換器</strong>：本架構期望包含服務供應商介面 (SPI) 工具，以進行解析與轉換。這些工具允許自訂實作，使用者可將其插入遷移程序，以處理特定的資料格式或轉換規則。</li>
<li><strong>檢查點恢復</strong>：使遷移能從上一個檢查點恢復，以提高中斷時的可靠性和效率。會建立儲存點以確保資料完整性，並儲存於 SQLite 或 MySQL 等資料庫中，以追蹤遷移過程的進度。</li>
</ul>
