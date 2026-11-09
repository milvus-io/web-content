---
id: ngram.md
title: NGRAM
summary: >-
  NGRAM 索引可加速針對 VARCHAR 欄位或 JSON 欄位內特定 JSON 路徑所執行的 LIKE
  查詢及符合條件的正規表達式篩選。在建立索引之前，文字會被分割成固定長度 n 的短且相互重疊的子字串，稱為 n-gram。在查詢時，這些 n-gram
  會在驗證原始篩選條件之前，先將候選實體範圍縮小。
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
    </button></h1><p>Milvus 中的<code translate="no">NGRAM</code> 索引可加速針對<code translate="no">VARCHAR</code> 欄位，或<code translate="no">JSON</code> 欄位內特定 JSON 路徑所執行的<code translate="no">LIKE</code> 查詢及符合條件的正規表達式篩選。在建立索引之前，Milvus 會將文字分割成固定長度<em>n</em> 的短且重疊的子字串，稱為<em>n-gram</em>。 例如，當<em>n = 3</em> 時，單字<em>「Milvus」</em>會被分割為 3-grams：<em>「Mil」</em>、<em>「ilv」</em>、<em>「lvu」</em>和<em>「vus」。</em>這些 n-grams 隨後會儲存於倒排索引中，該索引會將每個 n-gram 映射至其出現的文件 ID。 在查詢時，此索引可讓 Milvus 在驗證原始篩選條件之前，迅速將搜尋範圍縮小至一小組候選結果。</p>
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
    </button></h2><p><details></p>
<p><summary>展開以了解 NGRAM 的運作原理</summary></p>
<p>Milvus 透過兩階段流程實作<code translate="no">NGRAM</code> 索引：</p>
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
    </button></h3><p>在資料導入過程中，Milvus 透過執行以下兩個主要步驟來建立 NGRAM 索引：</p>
<ol>
<li><p><strong>將文字分解為 n-gram</strong>：Milvus 會將一個長度為<em>n</em>的滑動視窗沿著目標欄位中的每個字串移動，並擷取重疊的子字串（即<em>n-gram</em>）。這些子字串的長度須落在可配置的範圍內，<code translate="no">[min_gram, max_gram]</code> 。</p>
<ul>
<li><p><code translate="no">min_gram</code>：要生成的最短 n-gram。此參數同時定義了可從索引中受益的最小查詢子字串長度。</p></li>
<li><p><code translate="no">max_gram</code>：要生成的最長 n-gram。在查詢時，此參數亦用作分割長查詢字串時的最大視窗大小。</p></li>
</ul>
<p>例如，當<code translate="no">min_gram=2</code> 且<code translate="no">max_gram=3</code> 時，字串<code translate="no">&quot;AI database&quot;</code> 的拆分結果如下：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>建立 N-gram 索引</span>
  
 </span></p>
<ul>
<li><p><strong>2-grams：</strong> <code translate="no">AI</code> 、<code translate="no">I_</code> 、<code translate="no">_d</code> 、<code translate="no">da</code> 、<code translate="no">at</code> 、……</p></li>
<li><p><strong>3-grams：</strong> <code translate="no">AI_</code> 、<code translate="no">I_d</code> 、<code translate="no">_da</code> 、<code translate="no">dat</code> 、<code translate="no">ata</code> 、……</p></li>
</ul>
<p><div class="alert note"></p>
<ul>
<li><p>對於範圍<code translate="no">[min_gram, max_gram]</code> ，Milvus 會針對介於兩個數值之間（含兩端）的所有長度，生成所有 n-gram。例如，以<code translate="no">[2,4]</code> 及單字<code translate="no">&quot;text&quot;</code> 為例，Milvus 會生成：</p></li>
<li><p><strong>2-grams：</strong> <code translate="no">te</code> 、<code translate="no">ex</code> 、<code translate="no">xt</code></p></li>
<li><p><strong>3-grams：</strong> <code translate="no">tex</code> ，<code translate="no">ext</code></p></li>
<li><p><strong>4-grams：</strong> <code translate="no">text</code></p></li>
<li><p>N-gram 分解是以字元為基礎且與語言無關的。例如，在中文中，<code translate="no">&quot;向量数据库&quot;</code> 與<code translate="no">min_gram = 2</code> 會被分解為：<code translate="no">&quot;向量&quot;</code> 、<code translate="no">&quot;量数&quot;</code> 、<code translate="no">&quot;数据&quot;</code> 、<code translate="no">&quot;据库&quot;</code> 。</p></li>
<li><p>在分解過程中，空格和標點符號均被視為字元。</p></li>
<li><p>分解過程會保留原始的大小寫，且比對時會區分大小寫。例如，<code translate="no">&quot;Database&quot;</code> 與<code translate="no">&quot;database&quot;</code> 會產生不同的 n-gram，且在查詢時需要精確的大小寫比對。</p></li>
</ul>
<p></div></p></li>
<li><p><strong>建立倒排索引</strong>：系統會建立一個<strong>倒排索引</strong>，將每個生成的 n-gram 映射到包含該 n-gram 的文件 ID 清單。</p>
<p>例如，若 2-gram「<code translate="no">&quot;AI&quot;</code> 」出現在 ID 為 1、5、6、8 和 9 的文件中，索引便會記錄「<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 」。此索引隨後會在查詢時用來快速縮小搜尋範圍。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>建立 N-gram 索引 2</span>
  
 </span></p>
<p><div class="alert note"></p>
<p><code translate="no">[min_gram, max_gram]</code> 的範圍越廣，產生的 n-gram 數量越多，對應的映射清單也越大。若記憶體資源有限，針對非常龐大的 posting 清單，請考慮使用 mmap 模式。詳細資訊請參閱「<a href="/docs/zh-hant/mmap.md">使用 mmap</a>」。</p>
<p></div></p></li>
</ol>
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
    </button></h3><p>當執行<code translate="no">LIKE</code> 篩選器或符合資格的正規表達式篩選器時，Milvus 會透過 NGRAM 索引依照以下步驟加速查詢：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>加速查詢</span>
  
 </span></p>
<ol>
<li><p><strong>提取查詢詞：</strong>從「<code translate="no">LIKE</code> 」表達式中提取不含萬用字元的連續子字串（例如，<code translate="no">&quot;%database%&quot;</code> 會變成<code translate="no">&quot;database&quot;</code> ）。對於正規表達式篩選器，Milvus 會在可能的情況下從正規表達式模式中提取固定的字面子字串。例如，<code translate="no">message =~ &quot;error.*timeout&quot;</code> 包含字面值<code translate="no">error</code> 和<code translate="no">timeout</code> 。</p></li>
<li><p><strong>分解查詢詞：</strong>查詢詞會根據其長度（<code translate="no">L</code> ）以及<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 的設定，被分解為<em>n-gram</em>。</p>
<ul>
<li><p>若<code translate="no">L &lt; min_gram</code> ，則無法使用索引，查詢將回退至全表掃描。</p></li>
<li><p>若<code translate="no">min_gram ≤ L ≤ max_gram</code> ，則整個查詢詞將被視為單一 n-gram，無需進一步分解。</p></li>
<li><p>若<code translate="no">L &gt; max_gram</code> ，則會使用等於<code translate="no">max_gram</code> 的視窗大小，將查詢詞分解為重疊的格拉姆。</p></li>
</ul>
<p>例如，若<code translate="no">max_gram</code> 設定為<code translate="no">3</code> ，而查詢詞為<code translate="no">&quot;database&quot;</code> （長度<strong>為8</strong>），則會被分解為<code translate="no">&quot;dat&quot;</code> 、<code translate="no">&quot;ata&quot;</code> 、<code translate="no">&quot;tab&quot;</code> 等3-gram子字串。</p></li>
<li><p><strong>搜尋每個字元組並進行交集運算</strong>：Milvus 會將查詢中的每個字元組在倒排索引中進行查詢，然後將所得的文件 ID 清單進行交集運算，以找出一個小型候選文件集。這些候選文件包含查詢中的所有字元組。</p></li>
<li><p><strong>驗證並返回結果：</strong>接著僅針對這組精簡的候選集，套用原始的<code translate="no">LIKE</code> 或正規表達式篩選器作為最終檢查，以找出完全匹配的結果。</p></li>
</ol>
<p></details></p>
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
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;text&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}

_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).WithIndexName(<span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
    .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;text&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;3&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ]))])
    .<span class="hljs-title function_ invoke__">build</span>()?;
client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;text&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">3</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;text&quot;,
            &quot;indexName&quot;: &quot;ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 3
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>此設定會針對 `<code translate="no">text</code> ` 中的每個字串產生 2-gram 和 3-gram，並將其儲存於倒排索引中。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">範例 2：在 JSON 路徑上建立索引<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
<li><p><code translate="no">params.json_cast_type</code> – 必須為<code translate="no">&quot;varchar&quot;</code> （不區分大小寫），因為 NGRAM 索引是針對字串進行操作的。</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
params.put(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
params.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
params.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName(<span class="hljs-string">&quot;json_field&quot;</span>).indexType(IndexParam.IndexType.NGRAM)
                        .indexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
                        .extraParams(params)
                        .build()))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

opt := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;json_field&quot;</span>, index.NewNgramIndex(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>)).
    WithIndexName(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">`json_field[&quot;body&quot;]`</span>)
opt.WithExtraParam(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>)

_, err = cli.CreateIndex(ctx, opt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;json_field&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;json_ngram_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Ngram)
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
                (<span class="hljs-string">&quot;min_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;2&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;max_gram&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;4&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
                (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;varchar&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            ]))])
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">create_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-function">milvus::IndexDesc <span class="hljs-title">json_ngram_index</span><span class="hljs-params">(<span class="hljs-string">&quot;json_field&quot;</span>, <span class="hljs-string">&quot;json_ngram_index&quot;</span>, milvus::IndexType::NGRAM)</span></span>;
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;min_gram&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;max_gram&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>);
json_ngram_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;varchar&quot;</span>);

milvus::CreateIndexRequest create_request;
create_request.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>);
create_request.<span class="hljs-built_in">WithIndexes</span>({json_ngram_index});
create_request.<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>);

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(create_request);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;json_field&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;json_ngram_index&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;NGRAM&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">min_gram</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">max_gram</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;json_field[&quot;body&quot;]&#x27;</span>, <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;varchar&quot;</span> },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;json_field&quot;,
            &quot;indexName&quot;: &quot;json_ngram_index&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;NGRAM&quot;,
                &quot;min_gram&quot;: 2,
                &quot;max_gram&quot;: 4,
                &quot;json_path&quot;: &quot;json_field[\&quot;body\&quot;]&quot;,
                &quot;json_cast_type&quot;: &quot;varchar&quot;
            }
        }
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在此範例中：</p>
<ul>
<li><p>僅會將<code translate="no">json_field[&quot;body&quot;]</code> 處的值納入索引。</p></li>
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
<li><p><code translate="no">LIKE</code> 模式中的字面量部分長度必須至少為<code translate="no">min_gram</code> 個字元。</p>
<p><em>（例如，若預期最短的查詢詞長為 2 個字元，則在建立索引時應將 min_gram 設定為 2。）</em></p></li>
</ul>
<p>支援的查詢類型：</p>
<ul>
<li><p><strong>前綴匹配</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>後綴匹配</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%database\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%database&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%database\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>中綴匹配</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>通配符匹配</strong></p>
<p>Milvus 同時支援「<code translate="no">%</code> 」（零個或多個字元）與「<code translate="no">_</code> 」（精確一個字元）。</p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
filter := <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text LIKE &quot;%st%um%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text LIKE \&quot;%st%um%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 路徑查詢</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(json_field[&quot;body&quot;] LIKE &quot;%database%&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;json_field[\&quot;body\&quot;] LIKE \&quot;%database%\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>正規表達式篩選</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
filter := <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(text =~ &quot;error.*timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;text =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>針對 JSON 路徑的正規表達式篩選</strong></p>
<p><div class="multipleCode">
<a href="#python">Python</a>
<a href="#java">Java</a>
<a href="#go">Go</a>
<a href="#rust">Rust</a>
<a href="#cpp">C++</a>
<a href="#javascript">NodeJS</a>
<a href="#bash">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> filter = <span class="hljs-string">R&quot;(json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Use this filter expression in the &quot;filter&quot; field of the query/search request:</span>
<span class="hljs-comment"># &quot;filter&quot;: &quot;json_field[\&quot;body\&quot;] =~ \&quot;error.*timeout\&quot;&quot;</span>
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
    </button></h2><p>請使用 `<code translate="no">drop_index()</code> ` 方法，從集合中移除現有的索引。</p>
<div class="alert note">
<ul>
<li><p>在<strong>v2.6.3</strong>或更早版本中，您必須先釋放集合，才能刪除標量索引。</p></li>
<li><p>自<strong>v2.6.4</strong>或更新版本起，當標量索引不再需要時，可直接刪除該索引，無需先釋放集合。</p></li>
</ul>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DropIndexReq;

client.dropIndex(DropIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;Documents&quot;</span>)
        .indexName(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption(<span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-string">&quot;ngram_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

    <span class="hljs-keyword">let</span> <span class="hljs-variable">request</span> = DropIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">build</span>()?;
    client.<span class="hljs-title function_ invoke__">drop_index</span>(request).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">status = client-&gt;<span class="hljs-built_in">DropIndex</span>(milvus::<span class="hljs-built_in">DropIndexRequest</span>()
                               .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;Documents&quot;</span>)
                               .<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;ngram_index&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropIndex</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;Documents&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;ngram_index&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/drop&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;Documents&quot;,
    &quot;indexName&quot;: &quot;ngram_index&quot;
}&#x27;</span>
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
<li><p><strong>正規表達式加速</strong>：僅當 Milvus 能從正規表達式模式中提取固定的字面子字串時，<code translate="no">NGRAM</code> 才會加速正規表達式篩選。如<code translate="no">[a-z]+</code> 此類模式可能因未包含固定字面字串而退回掃描模式。</p></li>
<li><p><strong>不區分大小寫的正規表達式</strong>：支援<code translate="no">(?i)</code> 的正規表達式模式，但由於索引會保留原始大小寫，因此可能會跳過<code translate="no">NGRAM</code> 的優化。</p></li>
<li><p><strong>驗證步驟</strong>：對於正規表達式篩選器，<code translate="no">NGRAM</code> 會產生候選結果，而 Milvus 會使用完整的 RE2 正規表達式模式對其進行驗證，因此索引加速不會改變匹配結果。</p></li>
<li><p><strong>Unicode</strong>：NGRAM 分解是以字元為基礎且與語言無關的，並包含空白字元和標點符號。</p></li>
<li><p><strong>空間與時間的權衡</strong>：<code translate="no">[min_gram, max_gram]</code> 產生的格拉姆範圍較寬，會產生更多格拉姆並形成更大的索引。若記憶體資源有限，針對大型發文清單，請考慮使用<code translate="no">mmap</code> 模式。如需更多資訊，請參閱「<a href="/docs/zh-hant/mmap.md">使用 mmap</a>」。</p></li>
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
<li><p><strong>選擇<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 以配合搜尋行為</strong></p>
<ul>
<li><p>請從<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 開始設定。</p></li>
<li><p>將 `<code translate="no">min_gram</code> ` 設定為您預期使用者會輸入的最短字串。</p></li>
<li><p>將<code translate="no">max_gram</code> 設定為有意義子字串的典型長度附近；較大的<code translate="no">max_gram</code> 雖能提升篩選效果，但會增加儲存空間。</p></li>
</ul></li>
<li><p><strong>避免使用選擇性低的字元組</strong></p>
<p>高度重複的模式（例如<code translate="no">&quot;aaaaaa&quot;</code> ）篩選效果薄弱，且可能帶來有限的效益。</p></li>
<li><p><strong>保持標準化的一致性</strong></p>
<p>若您的使用情境有此需求，請對導入的文字和查詢字面值（例如：轉為小寫、去除空格）套用相同的正規化處理。</p></li>
</ul>
