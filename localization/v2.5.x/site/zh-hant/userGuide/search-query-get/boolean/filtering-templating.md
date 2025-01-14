---
id: filtering-templating.md
summary: >-
  在 Milvus 中，具有眾多元素的複雜篩選表達式，尤其是那些涉及非 ASCII
  字元（如中日韓字符）的篩選表達式，會顯著影響查詢性能。為了解決這個問題，Milvus
  引入了篩選表達式模板化機制，旨在通過減少解析複雜表達式所花的時間來提高效率。本頁說明如何在搜尋、查詢和刪除作業中使用篩選表達式模板。
title: 過濾模板
---
<h1 id="Filter-Templating​" class="common-anchor-header">篩選器模板<button data-href="#Filter-Templating​" class="anchor-icon" translate="no">
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
    </button></h1><p>在 Milvus 中，包含大量元素的複雜篩選表達式，尤其是那些涉及非 ASCII 字符（如中日韓字符）的篩選表達式，會顯著影響查詢性能。為了解決這個問題，Milvus 引入了篩選表達式模板化機制，旨在通過減少解析複雜表達式所花的時間來提高效率。本頁說明在搜尋、查詢和刪除操作中使用篩選表達式模板。</p>
<h2 id="Overview​" class="common-anchor-header">概述<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>篩選表達式範本化允許您使用占位符建立篩選表達式，這些占位符可以在查詢執行時動態地使用值取代。使用模板，您可以避免直接在篩選器中嵌入大型陣列或複雜的表達式，從而減少解析時間並提昇查詢效能。</p>
<p>假設您有一個篩選表達式，其中包含兩個欄位<code translate="no">age</code> 和<code translate="no">city</code> ，而您想要找出所有年齡大於 25 歲，且居住在「北京」（Beijing）或「上海」（Shanghai）的人。您可以使用模板，而不是直接將值嵌入篩選表達式中。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​

<button class="copy-code-btn"></button></code></pre>
<p>在此，<code translate="no">{age}</code> 和<code translate="no">{city}</code> 是占位符，在執行查詢時，它們將被<code translate="no">filter_params</code> 中的實際值取代。</p>
<p>在 Milvus 中使用篩選表達式模板有幾個主要優點。</p>
<ul>
<li><p><strong>減少解析時間</strong>：透過使用占位符取代大型或複雜的篩選表達式，系統花在解析和處理篩選表達式的時間就會減少。</p></li>
<li><p><strong>改善<strong>查詢</strong>效能</strong>：隨著解析開銷的減少，查詢效能得以提升，進而達到更高的 QPS 和更快的回應時間。</p></li>
<li><p><strong>可擴充性</strong>：隨著資料集的成長，篩選表達式也變得更複雜，樣板化功能可確保效能維持在高效且可擴充的狀態。</p></li>
</ul>
<h2 id="Search-Operations​" class="common-anchor-header">搜尋作業<button data-href="#Search-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 Milvus 中的搜尋作業，<code translate="no">filter</code> 表達式用於定義篩選條件，而<code translate="no">filter_params</code> 參數則用於指定佔位符的值。<code translate="no">filter_params</code> 字典包含 Milvus 用來代入篩選表達式的動態值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.search(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    vectors[:nq],​
    filter=<span class="hljs-built_in">expr</span>,​
    <span class="hljs-built_in">limit</span>=10,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: 100}},​
    filter_params=filter_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>在這個範例中，Milvus 在執行搜尋時，會以<code translate="no">25</code> 動態取代<code translate="no">{age}</code> ，以<code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> 動態取代<code translate="no">{city}</code> 。</p>
<h2 id="Query-Operations​" class="common-anchor-header">查詢操作<button data-href="#Query-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>同樣的模板機制也可以應用在 Milvus 的查詢操作上。在<code translate="no">query</code> 函式中，您定義篩選表達式，並使用<code translate="no">filter_params</code> 指定要取代的值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.query(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>透過使用<code translate="no">filter_params</code> ，Milvus 可以有效率地處理值的動態插入，提高查詢的執行速度。</p>
<h2 id="Delete-Operations​" class="common-anchor-header">刪除操作<button data-href="#Delete-Operations​" class="anchor-icon" translate="no">
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
    </button></h2><p>您也可以在刪除作業中使用篩選表達式模板。與搜尋和查詢相似，<code translate="no">filter</code> 表達式定義條件，而<code translate="no">filter_params</code> 則提供佔位符的動態值。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>​
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: 25, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}​
res = client.delete(​
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,​
    filter=<span class="hljs-built_in">expr</span>,​
    filter_params=filter_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>這種方法可以改善刪除作業的效能，尤其是在處理複雜的篩選條件時。</p>
<h2 id="Conclusion​" class="common-anchor-header">結論<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
    </button></h2><p>篩選表達式模板化是 Milvus 優化查詢效能的重要工具。透過使用佔位符和<code translate="no">filter_params</code> 字典，您可以大幅減少解析複雜篩選表達式所花的時間。這可加快查詢執行速度，並提高整體效能。</p>
