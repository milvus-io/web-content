---
id: primary-key-search.md
title: 主鍵搜尋Compatible with Milvus 2.6.9+
summary: 進行相似性檢索時，總是會要求您提供一個或多個查詢向量，即使查詢向量已經存在於目標集合中。為了避免在搜尋之前擷取向量，您可以使用主鍵來代替。
beta: Milvus 2.6.9+
---
<h1 id="Primary-Key-Search" class="common-anchor-header">主鍵搜尋<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>進行相似性檢索時，總是會要求您提供一個或多個查詢向量，即使這些查詢向量已經存在於目標資料集中。為了避免在搜尋之前擷取向量，您可以使用主鍵來代替。</p>
<h2 id="Overview" class="common-anchor-header">概觀<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>在電子商務平台上，使用者可以輸入關鍵字來擷取符合該關鍵字的產品。當使用者檢視產品詳細頁面後，平台也會在頁面底部顯示相似產品清單，供想要比較的使用者參考。</p>
<p>這些推薦會依據與關鍵字或目前產品的相似度排序。為了達到這個目的，平台開發人員需要在實際的相似性搜尋之前，先從 Milvus 擷取關鍵字或目前產品的向量表示，這會增加平台與 Milvus 之間的往返，並導致大量高維浮動值在網路上傳輸。</p>
<p>為了簡化您的應用程式與 Milvus 之間的互動邏輯，減少往返次數，並避免在網路上傳輸大量的高維浮點數值，請考慮使用主鍵搜尋。</p>
<p>在主鍵搜尋中，您不需要提供任何查詢向量。相反，您需要提供包含查詢向量的實體的主索引鍵 (<code translate="no">ids</code>)。</p>
<h2 id="Limits--restrictions" class="common-anchor-header">限制與約束<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
<li><p>使用主索引鍵的搜尋適用於所有向量資料類型，除了從 VarChar 欄位衍生出來的稀疏向量欄位，如 BM25 函式。</p></li>
<li><p>您可以在篩選、範圍和群組搜尋中使用主索引鍵取代查詢向量，並可選擇啟用分頁功能。但是，此功能不適用於混合搜尋和搜尋迭接器。</p></li>
<li><p>對於涉及嵌入清單的相似性搜尋，您仍需要擷取查詢向量、將它們排列成嵌入清單，然後執行搜尋。</p></li>
<li><p>您不能在 RESTful API 中使用主鍵來取代查詢向量。</p></li>
<li><p>對於任何不存在的主鍵或格式不正確的主鍵，Milvus 會提示錯誤。</p></li>
<li><p>主鍵和查詢向量是互相排斥的。同時提供兩者也會導致錯誤。</p></li>
</ul>
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
    </button></h2><p>以下範例假設所有提供的 Int64 ID 在目標集合中都是可用的。</p>
<div class="alert note">
<p>主鍵不會用於篩選；它們只會用於向量擷取。</p>
</div>
<h3 id="Example-1-Basic-primary-key-search" class="common-anchor-header">範例 1：基本主索引鍵搜尋<button data-href="#Example-1-Basic-primary-key-search" class="anchor-icon" translate="no">
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
    </button></h3><p>若要進行基本的 primary-key 搜尋，只要將查詢向量換成 primary keys 即可。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment"># a list of primary keys</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtered-search-using-primary-keys" class="common-anchor-header">範例 2：使用主鍵進行篩選搜尋<button data-href="#Example-2-Filtered-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>以下範例假設 color 和 likes 是目標集合中兩個模式定義的欄位。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">#</span></span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-search-using-primary-keys" class="common-anchor-header">範例 3：使用主鍵的範圍搜尋<button data-href="#Example-3-Range-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Grouping-search-using-primary-keys" class="common-anchor-header">範例 4：使用主索引鍵進行群組搜尋<button data-href="#Example-4-Grouping-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>以下範例假設<code translate="no">docId</code> 是目標集合中一個模式定義的欄位。</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
