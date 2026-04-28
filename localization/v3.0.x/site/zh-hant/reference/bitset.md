---
id: bitset.md
summary: 了解 Milvus 中的 bitsets。
title: 比特集
---
<h1 id="Bitset" class="common-anchor-header">比特集<button data-href="#Bitset" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹在 Milvus 中有助於實現屬性過濾和<a href="https://milvus.io/blog/2022-02-07-how-milvus-deletes-streaming-data-in-distributed-cluster.md">刪除操作</a>等關鍵功能的 bitset 機制。</p>
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
    </button></h2><p>比特集是一組比特。比特是只有兩個可能值的元素，最典型的是<code translate="no">0</code> 和<code translate="no">1</code> ，或者是布林值<code translate="no">true</code> 和<code translate="no">false</code> 。在 Milvus 中，比特集是由比特數<code translate="no">0</code> 和<code translate="no">1</code> 組成的陣列，相對於 ints、floats 或 chars，比特集可用來精簡、有效地表示某些資料。位元數預設為<code translate="no">0</code> ，只有在符合特定要求時才會被設定為<code translate="no">1</code> 。</p>
<p>位元集的運算以<a href="/docs/zh-hant/boolean.md">布林邏輯</a>進行，在<a href="/docs/zh-hant/boolean.md">布林邏輯</a>下，輸出值為有效或無效，也分別以<code translate="no">1</code> 和<code translate="no">0</code> 表示。例如，<a href="https://milvus.io/docs/v2.1.x/boolean.md#Logical-operators">邏輯運算符</a> <code translate="no">AND</code> 可用於比較兩個位元集，比較的基礎是位於相同索引位置的項目，並將結果產生一個新的位元集。如果某個位置上的兩個項目相同，那麼在新的位元集中<code translate="no">1</code> 將被寫入該位置；如果兩個項目不同，則<code translate="no">0</code> 。</p>
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
    </button></h2><p>Bitset 是一個簡單但功能強大的機制，可以幫助 Milvus 執行屬性過濾、資料刪除，以及使用 Time Travel 進行查詢。</p>
<h3 id="Attribute-filtering" class="common-anchor-header">屬性過濾</h3><p>由於 bitset 只包含兩個可能的值，因此非常適合儲存<a href="https://milvus.io/docs/v2.1.x/hybridsearch.md">屬性篩選</a>的結果。符合特定屬性篩選條件的資料會以<code translate="no">1</code> 標示。</p>
<h3 id="Data-deletion" class="common-anchor-header">資料刪除</h3><p>比特集是儲存段中某一行是否被刪除資訊的簡潔方式。已刪除的實體在對應的位元集中會以<code translate="no">1</code> 標記，在搜尋或查詢<a href="https://milvus.io/blog/deleting-data-in-milvus.md">時不會被計算</a>。</p>
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
    </button></h2><p>在這裡，我們提出三個範例來說明如何在 Milvus 中使用 bitset，並參考上面討論過的所有三種主要 bitset 實作。在所有三個案例中，都有一個包含 8 個實體的區段，接下來會發生一系列的資料處理語言 (DML) 事件，其順序如下所示。</p>
<ul>
<li>其中四個實體，其<code translate="no">primary_key</code>s 分別為 [1、2、3、4]，會在時間戳<code translate="no">ts</code> 等於 100 時插入。</li>
<li>其餘四個實體，其<code translate="no">primary_key</code>s 為 [5、6、7、8]，會在時間戳<code translate="no">ts</code> 等於 200 時插入。</li>
<li><code translate="no">primary_key</code>s 為 [7, 8] 的實體，會在時間戳記<code translate="no">ts</code> 等於 300 時刪除。</li>
<li>只有<code translate="no">primary_key</code>s 為 [1, 3, 5, 7] 的實體才滿足屬性過濾的條件。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitset_0.svg" alt="Order of DML events" class="doc-image" id="order-of-dml-events" />
   </span> <span class="img-wrapper"> <span>DML 事件的順序</span> </span></p>
<h3 id="Case-one" class="common-anchor-header">情況一</h3><p>在這種情況下，使用者設定<code translate="no">time_travel</code> 為 150，這表示使用者對滿足<code translate="no">ts = 150</code> 的資料進行查詢。比特集生成過程如圖 1 所示。</p>
<p>在初始篩選階段，<code translate="no">filter_bitset</code> 應該是<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> ，其中實體 [1, 3, 5, 7] 因為是有效的篩選結果而被標記為<code translate="no">1</code> 。</p>
<p>然而，當<code translate="no">ts</code> 等於 150 時，實體 [4, 5, 6, 7] 並未插入向量資料庫。因此，不論篩選條件為何，這四個實體都應該標記為 0。現在比特集的結果應該是<code translate="no">[1, 0, 1, 0, 0, 0, 0, 0]</code> 。</p>
<p>正如在<a href="#data-deletion">資料刪除</a>中所討論的，在搜尋或查詢時，標記為<code translate="no">1</code> 的實體會被忽略。比特集結果現在需要翻轉，以便與刪除比特圖結合，這樣我們就可以得到<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，初始值應該是<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。但是，直到<code translate="no">ts</code> 為 300 時，才會刪除實體 7 和 8。因此，當<code translate="no">ts</code> 為 150 時，實體 7 和 8 仍然有效。因此，時間旅行之後的<code translate="no">del_bitset</code> 值是<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>現在，經過時間旅行和屬性篩選之後，我們有兩個位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。  使用<code translate="no">OR</code> 二元邏輯運算符結合這兩個位元集。result_bitset 的最終數值是<code translate="no">[0, 1, 0, 1, 1, 1, 1, 1]</code> ，這表示在接下來的搜尋或查詢階段中，只有實體 1 和 3 會被計算出來。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_1.jpg" alt="Figure 1. Search with Time Travel = 150." class="doc-image" id="figure-1.-search-with-time-travel-=-150." />
   <span>圖 1.時間旅行 = 150 的搜尋</span>。 </span></p>
<h3 id="Case-two" class="common-anchor-header">案例二</h3><p>在這種情況下，使用者設定<code translate="no">time_travel</code> 為 250。比特集生成過程如圖 2 所示。</p>
<p>和情況一一樣，初始<code translate="no">filter_bitset</code> 是<code translate="no">[1, 0, 1, 0, 1, 0, 1, 0]</code> 。</p>
<p>當<code translate="no">ts</code> = 250 時，所有實體都在向量資料庫中。因此，當我們將時間戳記納入因子時，<code translate="no">filter_bitset</code> 保持不變。同樣地，我們需要翻轉結果，得到<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，初始值為<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。然而，直到<code translate="no">ts</code> 為 300 時，實體 7 和 8 才被刪除。因此，當<code translate="no">ts</code> 為 250 時，實體 7 和 8 仍然有效。因此，時間旅行之後的<code translate="no">del_bitset</code> 是<code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。</p>
<p>現在我們有兩個經過時間旅行和屬性篩選後的位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 0, 0]</code> 。使用<code translate="no">OR</code> 二元邏輯運算符號合併這兩個位元集。結果_比特集是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。也就是說，在接下來的搜尋或查詢階段，只有 Entites [1, 3, 5, 7] 會被計算出來。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_2.jpg" alt="Figure 2. Search with Time Travel = 250." class="doc-image" id="figure-2.-search-with-time-travel-=-250." />
   <span>圖 2.時間旅行 = 250 的搜尋</span>。 </span></p>
<h3 id="Case-three" class="common-anchor-header">情況三</h3><p>在這種情況下，使用者設定<code translate="no">time_travel</code> 為 350。比特集的產生過程如圖 3 所示。</p>
<p>與之前的情況一樣，初始<code translate="no">filter_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 。</p>
<p><code translate="no">ts</code>= 350 時，所有實體都在向量資料庫中。因此，最終翻轉的<code translate="no">filter_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> ，與案例二相同。</p>
<p>至於刪除位元集<code translate="no">del_bitset</code> ，由於實體 7 和 8 在<code translate="no">ts = 350</code> 時已經被刪除，因此<code translate="no">del_bitset</code> 的結果是<code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。</p>
<p>現在，經過時間旅行和屬性篩選之後，我們有兩個位元集：<code translate="no">filter_bitset</code> <code translate="no">[0, 1, 0, 1, 0, 1, 0, 1]</code> 和<code translate="no">del_bitset</code> <code translate="no">[0, 0, 0, 0, 0, 0, 1, 1]</code> 。  使用<code translate="no">OR</code> 二元邏輯算子結合這兩個位元集。最終的<code translate="no">result_bitset</code> 是<code translate="no">[0, 1, 0, 1, 0, 1, 1, 1]</code> 。也就是說，在接下來的搜尋或查詢階段，只有實體 [1, 3, 5] 會被計算出來。</p>
<p>
 <span class="img-wrapper">
   <img translate="no" src="/docs/v2.6.x/assets/bitset_3.jpg" alt="Figure 3. Search with Time Travel = 350." class="doc-image" id="figure-3.-search-with-time-travel-=-350." />
   <span>圖 3.時間旅行 = 350 的搜尋</span>。 </span></p>
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
    </button></h2><p>現在您知道 bitsets 在 Milvus 中是如何運作的了，您也許還想</p>
<ul>
<li>學習如何<a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">使用字串來篩選</a>您的搜尋結果，或參考我們文件上的<a href="https://milvus.io/docs/hybridsearch.md">Hybrid Search</a>。</li>
<li>瞭解 Milvus<a href="https://milvus.io/docs/v2.1.x/data_processing.md">如何處理資料</a>。</li>
</ul>
