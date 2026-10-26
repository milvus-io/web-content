---
id: bitset.md
summary: 了解 Milvus 中的位元集。
title: 位元集
---
<h1 id="Bitset" class="common-anchor-header">位元集<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹位元集機制，該機制有助於實現 Milvus 中的關鍵功能，例如屬性篩選和<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">刪除操作</a>。</p>
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
    </button></h2><p>位元集（bitset）是一組位元。位元是僅有兩種可能值的元素，最常見的是<code translate="no">0</code> 和<code translate="no">1</code> ，或是布林值<code translate="no">true</code> 和<code translate="no">false</code> 。在 Milvus 中，位元集是位元數的陣列<code translate="no">0</code> 和<code translate="no">1</code> ，相較於整數（ints）、浮點數（floats）或字元（chars），可用來緊湊且高效地表示特定資料。 位元數預設為<code translate="no">0</code> ，僅在滿足特定條件時才會設定為<code translate="no">1</code> 。</p>
<p>位元集的運算採用<a href="/docs/zh-hant/boolean.md">布林邏輯</a>進行，在此邏輯下，輸出值要麼為有效，要麼為無效，分別以<code translate="no">1</code> 和<code translate="no">0</code> 表示。 例如，可使用<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">邏輯運算子</a> <code translate="no">AND</code> 根據相同索引位置的項目來比較兩個位元集，並產生一個包含結果的新位元集。若同一位置的兩個項目相同，則在新位元集中該位置將寫入<code translate="no">1</code> ；若不同，則寫入<code translate="no">0</code> 。</p>
<h2 id="Implementation" class="common-anchor-header">實作<button data-href="#Implementation" class="anchor-icon" translate="no">
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
    </button></h2><p>位元集（Bitset）是一種簡單卻強大的機制，有助於 Milvus 執行屬性篩選、資料刪除，以及透過「時間旅行」（Time Travel）進行查詢。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">屬性篩選<button data-href="#Attribute-filtering" class="anchor-icon" translate="no">
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
    </button></h3><p>由於位元集僅包含兩種可能的值，因此非常適合用來儲存<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">屬性篩選</a>的結果。符合特定屬性篩選條件的資料會被標記為<code translate="no">1</code> 。</p>
<h3 id="Data-deletion" class="common-anchor-header">資料刪除<button data-href="#Data-deletion" class="anchor-icon" translate="no">
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
    </button></h3><p>位集可作為一種緊湊的方式，用以儲存區段中某一行是否已被刪除的資訊。已刪除的實體會在對應的位集中標記為<code translate="no">1</code> ，這些資料在搜尋或查詢過程中<a href="https://milvus.io/blog/deleting-data-in-milvus.md">將不會被計算</a>。</p>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>以下提供三個範例，說明位元集在 Milvus 中的應用方式，並參照上文討論的三種主要位元集實作方式。在這三種情況中，皆存在一個包含 8 個實體的分段，隨後會依下圖所示順序發生一系列資料操作語言（DML）事件。</p>
<ul>
<li>其中四個實體（其<code translate="no">primary_key</code>分別為 [1, 2, 3, 4]）是在時間戳<code translate="no">ts</code> 等於100時插入的。</li>
<li>其餘四個實體（<code translate="no">primary_key</code>分別為 [5, 6, 7, 8]）則在時間戳記<code translate="no">ts</code> 等於 200 時被插入。</li>
<li>當時間戳記<code translate="no">ts</code> 等於 300 時，<code translate="no">primary_key</code>為 [7, 8] 的實體將被刪除。</li>
<li>僅當<code translate="no">primary_key</code>的值為[1, 3, 5, 7]時，實體才符合屬性篩選的條件。</li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" /> 
   <span>DML 事件的順序</span>
  
 </span></p>
<h3 id="Case-one" class="common-anchor-header">第一種情況<button data-href="#Case-one" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情況下，使用者將<code translate="no">time_travel</code> 設定為 150，這表示該使用者對滿足<code translate="no">ts = 150</code> 的資料進行查詢。位元集的產生過程如圖 1 所示。</p>
<p>在初始過濾階段，<code translate="no">filter_bitset</code> 應為<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ，其中實體 [1, 3, 5, 7] 被標記為<code translate="no">1</code> ，因為它們是有效的過濾結果。</p>
<p>然而，當<code translate="no">ts</code> 等於 150 時，實體 [5, 6, 7, 8] 並未被插入向量資料庫。因此，無論篩選條件為何，這四個實體都應標記為 0。此時位元集結果應為<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> 。</p>
<p>如「<a href="#data-deletion">資料刪除</a>」章節所述，標記為<code translate="no">1</code> 的實體在搜尋或查詢過程中將被忽略。現在需要將位元集結果反轉，以便與刪除位元圖結合，從而得到<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，其初始值應為<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。然而，實體 7 和 8 直到<code translate="no">ts</code> 為 300 時才會被刪除。因此，當<code translate="no">ts</code> 為 150 時，實體 7 和 8 仍然有效。結果，時間旅行後的<code translate="no">del_bitset</code> 值為<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>現在，在執行「時間旅行」與屬性篩選後，我們有兩個位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 以及<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。將這兩個位元集透過<code translate="no">OR</code> 二進位邏輯運算子進行組合。result_bitset 的最終值為<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ，這表示在接下來的搜尋或查詢階段中，僅會對實體 1 和 3 進行運算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." /> 
   <span>圖 1. 時間旅行 (Time Travel) 設為 150 時的搜尋。</span>
  
 </span></p>
<h3 id="Case-two" class="common-anchor-header">案例二<button data-href="#Case-two" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情況下，使用者將「<code translate="no">time_travel</code> 」設定為 250。位元集的生成過程如圖 2 所示。</p>
<p>與第一種情況相同，初始的 `<code translate="no">filter_bitset</code> ` 為 `<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code>`。</p>
<p>當<code translate="no">ts</code> = 250時，所有實體皆存於向量資料庫中。因此，在納入時間戳記後，<code translate="no">filter_bitset</code> 保持不變。同樣地，我們需要將結果反轉，得到<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，其初始值為<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。然而，實體 7 和 8 直到<code translate="no">ts</code> 達到 300 時才被刪除。因此，當<code translate="no">ts</code> 為 250 時，實體 7 和 8 仍然有效。結果，時間旅行後的<code translate="no">del_bitset</code> 為<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>現在，在執行「時間旅行」與屬性篩選後，我們有兩個位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 以及<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。將這兩個位元集透過<code translate="no">OR</code> 二進位邏輯運算子進行組合。結果位元集 result_bitset 為<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。也就是說，在接下來的搜尋或查詢階段中，僅會對實體 [1, 3, 5, 7] 進行運算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." /> 
   <span>圖 2. 時間旅行 (Time Travel) 設為 250 時的搜尋。</span>
  
 </span></p>
<h3 id="Case-three" class="common-anchor-header">第三種情況<button data-href="#Case-three" class="anchor-icon" translate="no">
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
    </button></h3><p>在此情況下，使用者將「<code translate="no">time_travel</code> 」設定為 350。位元集生成過程如圖 3 所示。</p>
<p>與前兩種情況相同，初始的<code translate="no">filter_bitset</code> 為<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>當<code translate="no">ts</code>= 350時，所有實體皆位於向量資料庫中。因此，最終翻轉後的<code translate="no">filter_bitset</code> 為<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ，與案例二相同。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，由於在<code translate="no">ts = 350</code> 時實體 7 和 8 已被刪除，因此<code translate="no">del_bitset</code> 的結果為<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。</p>
<p>經過「時間旅行」與屬性篩選後，我們現在有兩個位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 以及<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。將這兩個位元集透過二進位邏輯運算子「<code translate="no">OR</code> 」進行組合。最終的<code translate="no">result_bitset</code> 結果為<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 。也就是說，在接下來的搜尋或查詢階段中，僅會對實體 [1, 3, 5] 進行運算。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." /> 
   <span>圖 3. 時間旅行 = 350 時的搜尋。</span>
  
 </span></p>
<h2 id="Whats-next" class="common-anchor-header">接下來該做什麼<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>既然您已經了解位元集在 Milvus 中的運作方式，您可能還想：</p>
<ul>
<li>學習如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字串篩選</a>搜尋結果，或參閱我們文件中的「<a href="https://milvus.io/docs/hybridsearch.md">混合搜尋</a>」章節。</li>
<li>了解 Milvus 中<a href="https://milvus.io/docs/v2.1.x/data_processing.md">資料的處理方式</a>。</li>
</ul>
