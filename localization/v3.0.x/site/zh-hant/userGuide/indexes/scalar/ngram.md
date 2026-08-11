---
id: ngram.md
title: NGRAM
summary: >-
  Milvus 中的 NGRAM 索引可加速針對 VARCHAR 欄位或 JSON 欄位內特定 JSON 路徑所執行的 LIKE
  查詢及符合條件的正規表達式篩選。在建立索引之前，Milvus 會將文字分割成固定長度 n 的短且相互重疊的子字串，稱為 n-gram。
  在執行查詢時，Milvus 會先利用這些 n-gram 來縮小候選實體的範圍，然後才驗證原始的篩選條件。
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的「<code translate="no">NGRAM</code> 」索引可加速對<code translate="no">VARCHAR</code> 欄位，或<code translate="no">JSON</code> 欄位內特定 JSON 路徑所執行的<code translate="no">LIKE</code> 查詢及符合條件的正規表達式篩選。在建立索引之前，Milvus 會將文字分割成固定長度<em>n</em> 的短且重疊的子字串，稱為<em>n-gram</em>。 例如，當<em>n = 3</em> 時，單字<em>「Milvus」</em>會被分割為 3-grams：<em>「Mil」</em>、<em>「ilv」</em>、<em>「lvu」</em>和<em>「vus」。</em>這些 n-grams 隨後會儲存於倒排索引中，該索引會將每個 n-gram 映射至其出現的文件 ID。 在查詢時，此索引可讓 Milvus 在驗證原始篩選條件之前，迅速將搜尋範圍縮小至一小組候選結果。</p>
<p>當您需要快速的前綴、後綴、中綴、萬用字元或符合資格的正規表達式篩選時，請使用此功能，例如：</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>有關「<code translate="no">LIKE</code> 」及正規表達式篩選語法詳情，請參閱《<a href="/docs/zh-hant/pattern-matching.md">模式比對</a>》。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">運作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 透過兩階段流程實作<code translate="no">NGRAM</code> 索引：</p>
<ol>
<li><p><strong>建立索引</strong>：在資料導入過程中，為每個文件產生 n-gram，並建立倒排索引。</p></li>
<li><p><strong>加速查詢</strong>：利用索引將結果篩選至較小的候選集，然後驗證完全匹配。</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">第一階段：建立索引<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在資料導入過程中，Milvus 透過以下兩個主要步驟建立 NGRAM 索引：</p>
<ol>
<li><p><strong>將文字分解為 n-gram</strong>：Milvus 會將一個長度為<em>n</em>的滑動視窗沿著目標欄位中的每個字串移動，並擷取重疊的子字串（即<em>n-gram</em>）。這些子字串的長度須落在可配置的範圍內，<code translate="no">[min_gram, max_gram]</code> 。</p>
<ul>
<li><p><code translate="no">min_gram</code>：要生成的最短 n-gram。此參數同時定義了可從索引中受益的最小查詢子字串長度。</p></li>
<li><p><code translate="no">max_gram</code>：要生成的最長 n-gram。在查詢時，此參數亦用作分割長查詢字串時的最大視窗大小。</p></li>
</ul>
<p>例如，當<code translate="no">min_gram=2</code> 且<code translate="no">max_gram=3</code> 時，字串<code translate="no">&quot;AI database&quot;</code> 的拆分結果如下：</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>建立 N-gram 索引</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>建立倒排索引</strong>：建立一個<strong>倒排索引</strong>，將每個生成的 n-gram 映射到包含該 n-gram 的文件 ID 清單。</p>
<p>舉例來說，若 2-gram「<code translate="no">&quot;AI&quot;</code> 」出現在 ID 為 1、5、6、8 和 9 的文件中，索引便會記錄「<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 」。此索引隨後會在查詢時被用來快速縮小搜尋範圍。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>建立 N-gram 索引 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">第二階段：加速查詢<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>當執行<code translate="no">LIKE</code> 篩選器或符合資格的正規表達式篩選器時，Milvus 會透過 NGRAM 索引以以下步驟加速查詢：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>加速查詢</span>
  
 </span></p>
<ol>
<li><p><strong>提取查詢詞：</strong>從<code translate="no">LIKE</code> 表達式中提取不含萬用字元的連續子字串（例如，<code translate="no">&quot;%database%&quot;</code> 會變成<code translate="no">&quot;database&quot;</code> ）。對於正規表達式篩選器，Milvus 會在可能的情況下從正規表達式模式中提取固定的字面子字串。例如，<code translate="no">message =~ &quot;error.*timeout&quot;</code> 包含字面值<code translate="no">error</code> 和<code translate="no">timeout</code> 。</p></li>
<li><p><strong>分解查詢詞：</strong>查詢詞會根據其長度（<code translate="no">L</code> ）以及<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 的設定，被分解為<em>n-gram</em>。</p>
<ul>
<li><p>若<code translate="no">L &lt; min_gram</code> ，則無法使用索引，查詢將回退至全表掃描。</p></li>
<li><p>若<code translate="no">min_gram ≤ L ≤ max_gram</code> ，整個查詢詞將被視為單一 n-gram，無需進一步分解。</p></li>
<li><p>若<code translate="no">L &gt; max_gram</code> ，查詢詞將使用等於<code translate="no">max_gram</code> 的視窗大小，分解為重疊的格拉姆。</p></li>
</ul>
<p>例如，若<code translate="no">max_gram</code> 設定為<code translate="no">3</code> ，而查詢詞為<code translate="no">&quot;database&quot;</code> （長度為<strong>8</strong>），則會被分解為 3-gram 子字串，例如<code translate="no">&quot;dat&quot;</code> 、<code translate="no">&quot;ata&quot;</code> 、<code translate="no">&quot;tab&quot;</code> 等。</p></li>
<li><p><strong>搜尋每個字元組並進行交集運算</strong>：Milvus 會將查詢中的每個字元組在倒排索引中進行查詢，然後將所得的文件 ID 清單進行交集運算，以找出一個小型候選文件集。這些候選文件包含查詢中的所有字元組。</p></li>
<li><p><strong>驗證並回傳結果：</strong>接著僅針對這組精簡的候選集，套用原始的<code translate="no">LIKE</code> 或正規表達式篩選器作為最終檢查，以找出完全匹配的結果。</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">建立 NGRAM 索引<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在<code translate="no">VARCHAR</code> 欄位上，或<code translate="no">JSON</code> 欄位內的特定路徑上建立NGRAM索引。</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">範例 1：在 VARCHAR 欄位上建立<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>對於<code translate="no">VARCHAR</code> 欄位，您只需指定<code translate="no">field_name</code> ，並設定<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 即可。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>此設定會針對<code translate="no">text</code> 中的每個字串產生 2-gram 和 3-gram，並將其儲存於倒排索引中。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">範例 2：在 JSON 路徑上建立<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>對於<code translate="no">JSON</code> 欄位，除了字元組設定外，您還必須指定：</p>
<ul>
<li><p><code translate="no">params.json_path</code> – 指向您要建立索引之值的 JSON 路徑。</p></li>
<li><p><code translate="no">params.json_cast_type</code> – 必須為 `<code translate="no">&quot;varchar&quot;</code> `（不區分大小寫），因為 NGRAM 索引是針對字串進行操作的。</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中：</p>
<ul>
<li><p>僅會對<code translate="no">json_field[&quot;body&quot;]</code> 處的值進行索引。</p></li>
<li><p>該值會在 n-gram 分詞之前被轉換為<code translate="no">VARCHAR</code> 。</p></li>
<li><p>Milvus 會產生長度為 2 至 4 的子字串，並將其儲存於倒排索引中。</p></li>
</ul>
<p>有關如何對 JSON 欄位進行索引的更多資訊，請參閱<a href="/docs/zh-hant/json-indexing.md">JSON 索引</a>。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">由 N-gram 加速的查詢<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>若要套用 NGRAM 索引：</p>
<ul>
<li><p>查詢必須針對具有<code translate="no">NGRAM</code> 索引的<code translate="no">VARCHAR</code> 欄位（或 JSON 路徑）。</p></li>
<li><p><code translate="no">LIKE</code> 模式中的字面量部分長度必須至少為<code translate="no">min_gram</code> 個字元。
<em>（例如，若預期最短的查詢詞長度為 2 個字元，則在建立索引時請將 min_gram 設定為 2。）</em></p></li>
</ul>
<p>支援的查詢類型：</p>
<ul>
<li><p><strong>前綴匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>後綴匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>中綴匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>萬用字元匹配</strong></p>
<p>Milvus 同時支援「<code translate="no">%</code> 」（零個或多個字元）與「<code translate="no">_</code> 」（精確一個字元）。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 路徑查詢</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>正規表達式篩選</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>針對 JSON 路徑的正規表達式篩選</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>有關篩選表達式語法的更多資訊，請參閱「<a href="/docs/zh-hant/pattern-matching.md">模式匹配</a>」。</p>
<h2 id="Drop-an-index" class="common-anchor-header">刪除索引<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 `<code translate="no">drop_index()</code> ` 方法從集合中移除現有索引。</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用說明<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>欄位類型</strong>：僅支援<code translate="no">VARCHAR</code> 及<code translate="no">JSON</code> 欄位。對於 JSON，請同時提供<code translate="no">params.json_path</code> 與<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 。</p></li>
<li><p><strong>正規表達式加速</strong>：<code translate="no">NGRAM</code> 僅在 Milvus 能從正規表達式模式中提取固定的字面子字串時，才會加速正規表達式篩選。如<code translate="no">[a-z]+</code> 此類模式可能因未包含固定字面值而退回掃描處理。</p></li>
<li><p><strong>不區分大小寫的正規表達式</strong>：支援帶有<code translate="no">(?i)</code> 的正規表達式模式，但由於索引會保留原始大小寫，因此可能會跳過<code translate="no">NGRAM</code> 的優化。</p></li>
<li><p><strong>驗證步驟</strong>：對於正規表達式篩選器，<code translate="no">NGRAM</code> 會產生候選結果，而 Milvus 會使用完整的 RE2 正規表達式模式對其進行驗證，因此索引加速不會改變匹配結果。</p></li>
<li><p><strong>Unicode</strong>：NGRAM 分解是以字元為基礎且與語言無關的，並包含空白字元和標點符號。</p></li>
<li><p><strong>空間與時間的權衡</strong>：<code translate="no">[min_gram, max_gram]</code> 產生的格拉姆範圍較寬，會產生更多格拉姆並形成更大的索引。若記憶體資源有限，針對大型發佈清單，請考慮使用<code translate="no">mmap</code> 模式。如需更多資訊，請參閱「<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">使用 mmap</a>」。</p></li>
<li><p><strong>不可變性</strong>：<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 無法就地修改——需重建索引才能調整這些參數。</p></li>
</ul>
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
<li><p><strong>選擇 min_gram 和 max_gram 以配合搜尋行為</strong></p>
<ul>
<li><p>建議從<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 開始設定。</p></li>
<li><p>將<code translate="no">min_gram</code> 設定為您預期使用者會輸入的最短字串。</p></li>
<li><p>將 `<code translate="no">max_gram</code> ` 設定為接近有意義子字串的典型長度；較大的 `<code translate="no">max_gram</code> ` 雖能改善篩選效果，但會增加儲存空間。</p></li>
</ul></li>
<li><p><strong>避免使用選擇性低的字元組</strong></p>
<p>高度重複的模式（例如<code translate="no">&quot;aaaaaa&quot;</code> ）篩選效果薄弱，且可能帶來有限的效益。</p></li>
<li><p><strong>保持標準化的一致性</strong></p>
<p>若您的使用情境有此需求，請對導入的文字和查詢字面值（例如：轉為小寫、去除空格）套用相同的正規化處理。</p></li>
</ul>
