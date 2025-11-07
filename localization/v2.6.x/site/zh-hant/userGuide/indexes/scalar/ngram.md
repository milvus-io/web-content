---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  Milvus 中的 NGRAM 索引是為了加速 VARCHAR 欄位或 JSON 欄位中特定 JSON 路徑的 LIKE
  查詢而建立的。在建立索引之前，Milvus 會將文字分割成固定長度 n 的重疊子串，稱為 n-gram。例如，當 n = 3
  時，單字「Milvus」會被分割成 3 個字元："Mil"、"ilv"、"lvu 「和 」vus"。這些 n-grams
  會儲存在一個反向索引中，該索引會將每個 gram 對應到其出現的文件 ID。在查詢時，此索引允許 Milvus
  快速將搜尋範圍縮小到一小組候選項，從而大大加快了查詢的執行速度。
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 中的<code translate="no">NGRAM</code> 索引是為了加速對<code translate="no">VARCHAR</code> 欄位或<code translate="no">JSON</code> 欄位內特定 JSON 路徑的<code translate="no">LIKE</code> 查詢而建立的。在建立索引之前，Milvus 會將文字分割成固定長度<em>n</em> 的短小、重疊子串，稱為<em>n-gram</em>。例如，當<em>n = 3</em> 時，單字<em>「Milvus」</em>會被分割成 3 個字元：<em>"Mil"、</em> <em>"ilv"、"</em> <em>lvu 「</em>和<em>」vus"。</em>然後，這些 n-grams 會儲存在一個反向索引中，該索引會將每個 gram 對應到出現該 gram 的文件 ID。在查詢時，此索引允許 Milvus 快速將搜尋範圍縮小到一小組候選詞，從而大大加快了查詢的執行速度。</p>
<p>當您需要快速的前綴、後綴、下綴或通配符篩選時，請使用它，例如：</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>有關篩選表達語法的詳細資訊，請參閱<a href="/docs/zh-hant/basic-operators.md#Range-operators">基本運算符</a>。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">如何運作<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 在兩個階段的過程中實現<code translate="no">NGRAM</code> 索引：</p>
<ol>
<li><p><strong>建立索引</strong>：為每個文件產生 n-grams，並在擷取過程中建立反向索引。</p></li>
<li><p><strong>加速查詢</strong>：使用索引過濾到一個小的候選集，然後驗證完全匹配。</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">階段 1：建立索引<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>在資料擷取過程中，Milvus 會執行兩個主要步驟來建立 NGRAM 索引：</p>
<ol>
<li><p><strong>將文字分解成 n-grams</strong>：Milvus 在目標欄位中的每個字串上滑動一個<em>n</em>的視窗，並擷取重疊的子串或<em>n-gram</em>。這些子串的長度在可設定的範圍內，<code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>:要產生的最短 n-gram。這也定義了可從索引獲益的最小查詢子串長度。</p></li>
<li><p><code translate="no">max_gram</code>:要產生的最長 n-gram。在查詢時，它也會用來作為分割長查詢字串時的最大視窗大小。</p></li>
</ul>
<p>例如，以<code translate="no">min_gram=2</code> 和<code translate="no">max_gram=3</code> 為例，字串<code translate="no">&quot;AI database&quot;</code> 拆分如下：</p>
<ul>
<li><strong>2-grams：</strong> <code translate="no">AI</code>,<code translate="no">I_</code>,<code translate="no">_d</code>,<code translate="no">da</code>,<code translate="no">at</code>, ...</li>
<li><strong>3-grams：</strong> <code translate="no">AI_</code>,<code translate="no">I_d</code>,<code translate="no">_da</code>,<code translate="no">dat</code>,<code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>建立 Ngram 索引</span> </span></p>
<blockquote>
<p><strong>注意事項</strong></p>
<ul>
<li><p>對於<code translate="no">[min_gram, max_gram]</code> 的範圍，Milvus 會產生兩值之間每一長度（含）的所有 n-gram。<br>
範例:<code translate="no">[2,4]</code> 和字<code translate="no">&quot;text&quot;</code>, Milvus 會產生：</p>
<ul>
<li><strong>2-grams：</strong> <code translate="no">te</code>,<code translate="no">ex</code> 、<code translate="no">xt</code></li>
<li><strong>3-grams：</strong> <code translate="no">tex</code>,<code translate="no">ext</code></li>
<li><strong>4-grams</strong>：<code translate="no">text</code></li>
</ul></li>
<li><p>N-gram 分解是以字元為基礎，並且與語言無關。例如，在中文中，<code translate="no">&quot;向量数据库&quot;</code> 與<code translate="no">min_gram = 2</code> 會被分解為：<code translate="no">&quot;向量&quot;</code>,<code translate="no">&quot;量数&quot;</code>,<code translate="no">&quot;数据&quot;</code>,<code translate="no">&quot;据库&quot;</code> 。</p></li>
<li><p>在分解過程中，空格和標點符號被視為字符。</p></li>
<li><p>分解時會保留原始大小寫，而匹配是區分大小寫的。例如，<code translate="no">&quot;Database&quot;</code> 和<code translate="no">&quot;database&quot;</code> 將產生不同的 n-gram，在查詢時需要準確的大小寫比對。</p></li>
</ul>
</blockquote></li>
<li><p><strong>建立倒置索引</strong>：建立<strong>倒置索引</strong>，將每個產生的 n-gram 對應到包含該 n-gram 的文件 ID 清單。</p>
<p>例如，如果 2 詞組<code translate="no">&quot;AI&quot;</code> 出現在 ID 為 1、5、6、8 和 9 的文件中，則索引會記錄<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 。此索引可在查詢時使用，以快速縮小搜尋範圍。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>建立 Ngram 索引 2</span> </span></p>
<div class="alert note">
<p>更寬的<code translate="no">[min_gram, max_gram]</code> 範圍會產生更多的克和更大的映射清單。如果記憶體緊張，可考慮使用 mmap 模式來處理非常大的貼圖清單。詳情請參閱<a href="/docs/zh-hant/mmap.md">使用 mmap</a>。</p>
</div>
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
    </button></h3><p>當<code translate="no">LIKE</code> 過濾器被執行時，Milvus 使用 NGRAM 索引來加速查詢，步驟如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>加速查詢</span> </span></p>
<ol>
<li><p><strong>擷取查詢字串：</strong>從<code translate="no">LIKE</code> 表達式中萃取不含通配符的連續子串 (例如<code translate="no">&quot;%database%&quot;</code> 變成<code translate="no">&quot;database&quot;</code>)。</p></li>
<li><p><strong>分解查詢詞：</strong>根據查詢詞的長度 (<code translate="no">L</code>) 以及<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 的設定，將查詢詞分解為<em>n 個字元</em>。</p>
<ul>
<li><p>如果<code translate="no">L &lt; min_gram</code> ，則無法使用索引，查詢會退回到完整掃描。</p></li>
<li><p>如果是<code translate="no">min_gram ≤ L ≤ max_gram</code> ，則整個查詢詞會被視為單一 n-gram，不需要進一步分解。</p></li>
<li><p>如果是<code translate="no">L &gt; max_gram</code> ，查詢詞會使用等於<code translate="no">max_gram</code> 的視窗大小分解成重疊的格。</p></li>
</ul>
<p>舉例來說，如果<code translate="no">max_gram</code> 設定為<code translate="no">3</code> ，而查詢詞為<code translate="no">&quot;database&quot;</code> ，長度為<strong>8</strong>，則會分解為<code translate="no">&quot;dat&quot;</code>,<code translate="no">&quot;ata&quot;</code>,<code translate="no">&quot;tab&quot;</code> 等 3 個克的子串。</p></li>
<li><p><strong>尋找每個格及交集</strong>：Milvus 在倒排索引中尋找每個查詢格，然後交集所得的文件 ID 清單，找出一小組候選文件。這些候選文件包含查詢中的所有語法。</p></li>
<li><p><strong>驗證並返回結果：</strong>然後，原始的<code translate="no">LIKE</code> 過濾器只會應用在小的候選集上做最後檢查，以找出完全符合的結果。</p></li>
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
    </button></h2><p>您可以在<code translate="no">VARCHAR</code> 欄位或<code translate="no">JSON</code> 欄位內的特定路徑上建立 NGRAM 索引。</p>
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
    </button></h3><p>對於<code translate="no">VARCHAR</code> 欄位，您只需指定<code translate="no">field_name</code> 並配置<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 。</p>
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
<p>此設定會為<code translate="no">text</code> 中的每個字串產生 2-gram 和 3-gram，並將它們儲存在反向索引中。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">範例 2：在 JSON 路徑上製作<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>對於<code translate="no">JSON</code> 欄位，除了克設定外，還必須指定：</p>
<ul>
<li><p><code translate="no">params.json_path</code> - 指向要索引的值的 JSON 路徑。</p></li>
<li><p><code translate="no">params.json_cast_type</code> - 必須是<code translate="no">&quot;varchar&quot;</code> (不區分大小寫)，因為 NGRAM 索引是對字串操作的。</p></li>
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
<p>在本範例中</p>
<ul>
<li><p>只索引<code translate="no">json_field[&quot;body&quot;]</code> 的值。</p></li>
<li><p>在 n-gram 標記化之前，該值會被轉換為<code translate="no">VARCHAR</code> 。</p></li>
<li><p>Milvus 會產生長度為 2 到 4 的子串，並將它們儲存在反向索引中。</p></li>
</ul>
<p>有關如何索引 JSON 欄位的詳細資訊，請參閱<a href="/docs/zh-hant/json-indexing.md">JSON 索引</a>。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">由 NGRAM 加速的查詢<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
<li><p>查詢的目標必須是有<code translate="no">NGRAM</code> 索引的<code translate="no">VARCHAR</code> 欄位（或 JSON 路徑）。</p></li>
<li><p><code translate="no">LIKE</code> 模式的字面部分必須至少有<code translate="no">min_gram</code> 個字元長<em>（例如，如果您最短的預期查詢字詞是 2 個字元，請在建立索引時設定 min_gram=2）。</em></p></li>
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
<li><p><strong>後綴匹配</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>通配符匹配</strong></p>
<p>Milvus 支援<code translate="no">%</code> (零個或多個字元) 和<code translate="no">_</code> (正好一個字元)。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSON 路徑查詢</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>有關篩選表達式語法的更多資訊，請參閱<a href="/docs/zh-hant/basic-operators.md">基本運算符</a>號。</p>
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
    </button></h2><p>使用<code translate="no">drop_index()</code> 方法從集合中移除現有索引。</p>
<div class="alert note">
<ul>
<li><p>在<strong>v2.6.3</strong>或更早版本中，您必須在刪除標量索引之前釋放集合。</p></li>
<li><p>從<strong>v2.6.4</strong>或更高版本開始，一旦不再需要標量索引，您可以直接丟棄它，而不需要先釋放集合。</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用注意事項<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>欄位類型</strong>：支援<code translate="no">VARCHAR</code> 和<code translate="no">JSON</code> 欄位。對於 JSON，同時提供<code translate="no">params.json_path</code> 和<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> 。</p></li>
<li><p><strong>Unicode</strong>：NGRAM 分解以字元為基礎，與語言無關，並包含空白和標點符號。</p></li>
<li><p><strong>時空權衡</strong>：更寬的克數範圍<code translate="no">[min_gram, max_gram]</code> 會產生更多的克數和更大的索引。如果記憶體緊張，可考慮<code translate="no">mmap</code> 模式來處理大型張貼清單。如需詳細資訊，請參閱<a href="/docs/zh-hant/mmap.md">使用 mmap</a>。</p></li>
<li><p><strong>不變性</strong>：<code translate="no">min_gram</code> 和<code translate="no">max_gram</code> 無法就地變更，必須重新建立索引才能調整。</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">最佳做法<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>選擇 min_gram 和 max_gram 以符合搜尋行為</strong></p>
<ul>
<li><p>從<code translate="no">min_gram=2</code>,<code translate="no">max_gram=3</code> 開始。</p></li>
<li><p>將<code translate="no">min_gram</code> 設定為您預期使用者會輸入的最短文字。</p></li>
<li><p>將<code translate="no">max_gram</code> 設定在有意義子串的典型長度附近；較大的<code translate="no">max_gram</code> 可以改善過濾，但會增加空間。</p></li>
</ul></li>
<li><p><strong>避免低選擇性克</strong></p>
<p>高度重複的模式 (例如：<code translate="no">&quot;aaaaaa&quot;</code>)，過濾效果較弱，可能產生有限的效益。</p></li>
<li><p><strong>一致地標準化</strong></p>
<p>如果您的使用情況需要，請將相同的規範化套用在擷取的文字與查詢字面意義上 (例如：降低大小寫、修剪)。</p></li>
</ul>
