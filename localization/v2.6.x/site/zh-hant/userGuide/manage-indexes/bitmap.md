---
id: bitmap.md
title: 位圖索引
related_key: bitmap
summary: 位圖索引是一種有效率的索引技術，設計用來改善低心數標量欄位的查詢效能。
---

<h1 id="BITMAP​" class="common-anchor-header">位圖索引<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>位圖索引是一種有效率的索引技術，設計用來改善低卡片性標量欄位的查詢效能。Cardinality 指的是欄位中不同值的數量。具有較少不同元素的欄位被視為低卡片性。</p>
<p>此索引類型以精簡的二進位格式表示欄位值，並對其執行有效的位運算，有助於縮短標量值查詢的檢索時間。與其他類型的索引相比，位元圖索引在處理低心數欄位時，通常具有更高的空間效率和更快的查詢速度。</p>
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
    </button></h2><p>Bitmap 一詞由兩個字組合而成：<strong>Bit</strong>和<strong>Map</strong>。位元代表電腦中最小的資料單位，只能容納<strong>0</strong>或<strong>1 的</strong>值。在此上下文中，映射是指根據 0 和 1 應該被指定什麼值來轉換和組織資料的過程。</p>
<p>位圖索引由兩個主要部分組成：位圖和鍵。鍵代表索引欄位中的唯一值。每個唯一值都有一個對應的位元圖。這些位元圖的長度等於集合中記錄的數量。位圖中的每個位元對應集合中的一筆記錄。如果記錄中索引欄位的值與關鍵相符，對應的位就會被設定為<strong>1</strong>；否則就會被設為<strong>0</strong>。</p>
<p>考慮一個具有<strong>Category</strong>和<strong>Public 欄位</strong>的文件集合。我們要擷取屬於<strong>Tech</strong>類別且開放給<strong>Public 的</strong>文件。在這種情況下，我們的位圖索引的鍵是<strong>Tech</strong>和<strong>Public</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
   </span> <span class="img-wrapper"> <span>位圖索引</span> </span></p>
<p>如圖所示，<strong>Category</strong>和<strong>Public</strong>的位圖索引為</p>
<ul>
<li><p><strong>Tech</strong>：[1, 0, 1, 0, 0]，這表示只有第 1 和第 3 個文件屬於<strong>Tech</strong>類別。</p></li>
<li><p><strong>Public</strong>：[1, 0, 0, 1, 0]，表示只有第 1 和第 4 個文件<strong>對公眾</strong>開放。</p></li>
</ul>
<p>為了找出符合這兩個條件的文件，我們在這兩個位元圖上執行位相 AND 運算。</p>
<ul>
<li><strong>Tech</strong>AND<strong>Public</strong>：[1, 0, 0, 0, 0]</li>
</ul>
<p>結果位圖 [1, 0, 0, 0, 0] 表示只有第一個文件<strong>(ID</strong> <strong>1</strong>) 符合這兩個條件。透過使用位元圖索引和有效率的位元運算，我們可以快速縮小搜尋範圍，而不需要掃描整個資料集。</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">建立位圖索引<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中建立位圖索引，請使用<code translate="no">create_index()</code> 方法，並將<code translate="no">index_type</code> 參數設定為<code translate="no">&quot;BITMAP&quot;</code> 。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>

<p>在這個範例中，我們在<code translate="no">my_collection</code> 資料集中的<code translate="no">category</code> 欄位上建立位圖索引。<code translate="no">add_index()</code> 方法用來指定欄位名稱、索引類型和索引名稱。</p>
<p>一旦建立位圖索引，您就可以在查詢作業中使用<code translate="no">filter</code> 參數，根據索引欄位執行標量篩選。這可讓您使用位圖索引有效地縮窄搜尋結果的範圍。如需詳細資訊，請參<a href="/docs/zh-hant/boolean.md">閱元資料篩選</a>。</p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>位圖索引只支援非主鍵的標量欄位。</p></li>
<li><p>欄位的資料類型必須是下列其中之一。</p>
<ul>
<li><p><code translate="no">BOOL</code>,<code translate="no">INT8</code>,<code translate="no">INT16</code>,<code translate="no">INT32</code>,<code translate="no">INT64</code>,<code translate="no">VARCHAR</code></p></li>
<li><p><code translate="no">ARRAY</code> (元素必須是下列其中之一： , , , , , )<code translate="no">BOOL</code> <code translate="no">INT8</code> <code translate="no">INT16</code> <code translate="no">INT32</code> <code translate="no">INT64</code> <code translate="no">VARCHAR</code></p></li>
</ul></li>
<li><p>位圖索引不支援下列資料類型。</p>
<ul>
<li><p><code translate="no">FLOAT</code>,<code translate="no">DOUBLE</code>: 浮點類型與位圖索引的二進位性質不相容。</p></li>
<li><p><code translate="no">JSON</code>:JSON 資料類型具有複雜的結構，無法使用位圖索引有效地表示。</p></li>
</ul></li>
<li><p>位圖索引不適用於高 cardinality 的欄位（即有大量不同值的欄位）。</p>
<ul>
<li><p>一般而言，當欄位的 cardinality 小於 500 時，位圖索引最為有效。</p></li>
<li><p>當卡片性增加到超過這個臨界值時，位圖索引的效能優勢就會減弱，而且儲存開銷也會變得很大。</p></li>
<li><p>對於高卡片數的欄位，請考慮使用其他索引技術，例如倒轉索引，這取決於您的特定使用個案和查詢需求。</p></li>
</ul></li>
</ul>
