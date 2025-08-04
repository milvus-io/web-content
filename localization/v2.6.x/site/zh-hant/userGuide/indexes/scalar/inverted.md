---
id: inverted.md
title: 反向
summary: 當您需要對資料執行頻繁的篩選查詢時，倒轉式索引可以顯著提高查詢性能。Milvus 不需要掃描所有文件，而是使用倒轉式索引來快速找出符合篩選條件的精確記錄。
---
<h1 id="INVERTED" class="common-anchor-header">反向<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>當您需要對資料執行頻繁的篩選查詢時，<code translate="no">INVERTED</code> 索引可以顯著提高查詢性能。Milvus 使用倒排索引來快速找出符合篩選條件的精確記錄，而不是掃描所有文件。</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">何時使用 INVERTED 索引<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>當您需要時，請使用 INVERTED 索引：</p>
<ul>
<li><p><strong>根據特定值進行篩選</strong>：尋找欄位等於特定值的所有記錄 (例如<code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>過濾文字內容</strong>：在<code translate="no">VARCHAR</code> 欄位上執行有效率的搜尋</p></li>
<li><p><strong>查詢 JSON 欄位值</strong>：篩選 JSON 結構中的特定鍵</p></li>
</ul>
<p><strong>效能優勢</strong>：INVERTED 索引不需要進行全集掃描，可將大型資料集的查詢時間從幾秒縮短至幾毫秒。</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">INVERTED 索引如何運作<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用<a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>來實作反轉索引。流程如下</p>
<ol>
<li><p><strong>標記化</strong>：Milvus 將您的資料分解為可搜尋的詞彙</p></li>
<li><p><strong>詞彙字典</strong>：建立所有獨特詞彙的排序清單</p></li>
<li><p><strong>反向清單</strong>：將每個詞彙對應到包含該詞彙的文件</p></li>
</ol>
<p>例如，給出這兩個句子：</p>
<ul>
<li><p><strong>"Milvus 是雲原生向量資料庫</strong></p></li>
<li><p><strong>「Milvus 的性能非常出色」</strong></p></li>
</ul>
<p>倒排索引會將<strong>「Milvus」</strong>→<strong>[文件 0、文件 1]</strong>、<strong>「cloud-native」</strong>→<strong>[文件 0]</strong>、<strong>「效能」</strong>→<strong>[文件 1]</strong>等詞彙對映。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted-index.png" alt="Inverted Index" class="doc-image" id="inverted-index" />
   </span> <span class="img-wrapper"> <span>反向索引</span> </span></p>
<p>當您使用詞彙進行篩選時，Milvus 會在字典中查找該詞彙，並立即檢索所有匹配的文件。</p>
<p>INVERTED 索引支援所有標量欄位類型：<strong>BOOL</strong>、<strong>INT8</strong>、<strong>INT16</strong>、<strong>INT32</strong>、<strong>INT64</strong>、<strong>FLOAT</strong>、<strong>DOUBLE</strong>、<strong>VARCHAR</strong>、<strong>JSON</strong> 和<strong>ARRAY</strong>。然而，索引 JSON 欄位的索引參數與一般標量欄位略有不同。</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">在非 JSON 欄位上建立索引<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>要在非 JSON 欄位上建立索引，請遵循下列步驟：</p>
<ol>
<li><p>準備您的索引參數：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>新增<code translate="no">INVERTED</code> 索引：</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>建立索引：</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">在 JSON 欄位上建立索引<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>您也可以在 JSON 欄位內的特定路徑上建立 INVERTED 索引。這需要額外的參數來指定 JSON 路徑和資料類型：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>有關 JSON 欄位索引的詳細資訊，包括支援的路徑、資料類型和限制，請參閱<a href="/docs/zh-hant/use-json-fields.md">JSON Field</a>。</p>
<h2 id="Best-practices" class="common-anchor-header">最佳實務<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>在載入資料後建立索引</strong>：在已包含資料的集合上建立索引，以獲得更佳效能</p></li>
<li><p><strong>使用描述性索引名稱</strong>：選擇能清楚指出欄位和目的的名稱</p></li>
<li><p><strong>監控索引效能</strong>：在建立索引之前和之後，檢查查詢效能</p></li>
<li><p><strong>考慮您的查詢模式</strong>：在您經常篩選的欄位上建立索引</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">下一步<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>瞭解<a href="/docs/zh-hant/index-explained.md">其他索引類型</a></p></li>
<li><p>請參閱<a href="/docs/zh-hant/use-json-fields.md#Index-values-inside-the-JSON-field">JSON 欄位索引</a>，瞭解進階的 JSON 索引情境</p></li>
</ul>
