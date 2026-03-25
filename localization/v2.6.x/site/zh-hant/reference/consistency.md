---
id: consistency.md
summary: 了解 Milvus 的四種一致性等級。
title: 一致性
---
<h1 id="Consistency" class="common-anchor-header">一致性<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 的四種一致性等級及其最適合的情況。本主題也涵蓋 Milvus 確保一致性背後的機制。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>分佈式資料庫的一致性特指確保每個節點或副本在特定時間寫入或讀取資料時擁有相同資料視圖的屬性。</p>
<p>Milvus 支援四個一致性層級：強、有界線僵化、會話和最終。Milvus 的預設一致性等級是有界的僵化。  您可以在進行<a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a>、<a href="/docs/zh-hant/multi-vector-search.md">混合搜尋或</a> <a href="/docs/zh-hant/get-and-scalar-query.md">查詢</a>時，輕鬆調整一致性層級，使其最適合您的應用程式。</p>
<h2 id="Consistency-levels" class="common-anchor-header">一致性等級<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>根據<a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>理論的定義，分散式資料庫必須在一致性、可用性和延遲之間進行權衡。高一致性意味著高準確性，但也意味著高搜尋延遲，而低一致性會導致快速的搜尋速度，但卻會損失一定的資料可視性。因此，不同等級的一致性適用於不同的情況。</p>
<p>以下說明 Milvus 支援的四種一致性等級的差異，以及它們各自適合的情境。</p>
<h3 id="Strong" class="common-anchor-header">強<button data-href="#Strong" class="anchor-icon" translate="no">
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
    </button></h3><p>強是最高和最嚴格的一致性等級。它確保使用者可以讀取最新版本的資料。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>強一致性</span> </span></p>
<p>根據 PACELC 理論，如果一致性等級設定為強，延遲會增加。因此，我們建議在功能測試時選擇強一致性，以確保測試結果的準確性。強一致性也最適合那些以搜尋速度為代價，但對資料一致性有嚴格要求的應用程式。例如，處理訂單付款和帳單的線上財務系統。</p>
<h3 id="Bounded-staleness" class="common-anchor-header">有限制的陳舊性<button data-href="#Bounded-staleness" class="anchor-icon" translate="no">
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
    </button></h3><p>有界僵化，顧名思義，允許資料在某段時間內不一致。但是，一般而言，在該期間外的資料總是全局一致的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>有界僵化一致性</span> </span></p>
<p>有限制的不一致適用於需要控制搜尋延遲，並且可以接受零星資料不存在的情況。例如，在視訊推薦引擎等推薦系統中，資料不可見有時對整體召回率的影響較小，但卻能大幅提升推薦系統的效能。</p>
<h3 id="Session" class="common-anchor-header">會話<button data-href="#Session" class="anchor-icon" translate="no">
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
    </button></h3><p>Session 可確保在同一會話中，所有資料寫入都能立即被讀取。換句話說，當您透過一個用戶端寫入資料時，新插入的資料會立即成為可搜尋資料。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>會話一致性</span> </span></p>
<p>我們建議在對同一會話中的資料一致性要求較高的情況下，選擇會話作為一致性層級。舉例來說，從圖書館系統中刪除某個書籍項目的資料，在確認刪除並重 新刷新頁面（不同的會話）後，搜尋結果中應不再顯示該書籍。</p>
<h3 id="Eventually" class="common-anchor-header">最終<button data-href="#Eventually" class="anchor-icon" translate="no">
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
    </button></h3><p>讀取與寫入的順序並無保證，只要不再進行寫入作業，副本最終都會收斂到相同的狀態。在「最終」的一致性下，副本會以最新更新的值開始處理讀取要求。最終一致性是四種一致性中最弱的一種。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>最終一致性</span> </span></p>
<p>然而，根據 PACELC 理論，犧牲一致性可以大幅縮短搜尋延遲。因此，最終一致性最適合對資料一致性要求不高，但需要極快搜尋效能的情況。例如，使用最終一致的層級檢索 Amazon 產品的評論和評分。</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">保證時間戳<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 透過引入<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">保證時間戳</a>(GuaranteeTs) 來實現不同的一致性等級。</p>
<p>GuaranteeTs 的作用是通知查詢節點，在查詢節點可以看到 GuaranteeTs 之前的所有資料之前，不會執行搜尋或查詢請求。當您指定一致性層級時，一致性層級會對應到特定的 GuaranteeTs 值。不同的 GuaranteeTs 值對應不同的一致性等級：</p>
<ul>
<li><p><strong>強</strong>：GuaranteeTs 設定為與最新的系統時間戳完全相同，查詢節點要等到可以看到最新的系統時間戳之前的所有資料，才會處理搜尋或查詢請求。</p></li>
<li><p><strong>有限制的僵化</strong>：GuaranteeTs 設定為相對小於最新的系統時間戳，查詢節點在可容忍、更新較少的資料檢視上進行搜尋。</p></li>
<li><p><strong>會話</strong>：用戶端使用最新寫入操作的時間戳作為 GuaranteeTs，這樣每個用戶端至少可以檢索到同一用戶端插入的資料。</p></li>
<li><p><strong>最終</strong>：GuaranteeTs 設定為非常小的值，以跳過一致性檢查。查詢節點會立即在現有的資料檢視上進行搜尋。</p></li>
</ul>
<p>請參閱<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">GuaranteeTs 如何運作</a>，以獲得更多關於在 Milvus 中確保不同層級一致性背後的機制的資訊。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li>了解如何在下列情況下調整一致性等級<ul>
<li><a href="/docs/zh-hant/single-vector-search.md">進行單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">進行混合搜尋</a></li>
<li><a href="/docs/zh-hant/get-and-scalar-query.md">進行標量查詢</a></li>
</ul></li>
</ul>
