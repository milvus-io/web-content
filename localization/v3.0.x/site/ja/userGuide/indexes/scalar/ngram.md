---
id: ngram.md
title: NGRAM
summary: >-
  Milvus の NGRAM インデックスは、VARCHAR フィールドや JSON フィールド内の特定の JSON パスに対する LIKE
  クエリおよび対象となる正規表現フィルターの処理を高速化します。インデックスの構築に先立ち、Milvus はテキストを、固定長 n
  の短い重複する部分文字列（n-gram と呼ばれる）に分割します。
  クエリ実行時、Milvusはこれらのn-gramを使用して、元のフィルタ条件を検証する前に候補エンティティを絞り込みます。
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
    </button></h1><p>Milvusの<code translate="no">NGRAM</code> インデックスは、<code translate="no">VARCHAR</code> フィールド、または<code translate="no">JSON</code> フィールド内の特定のJSONパスに対する<code translate="no">LIKE</code> クエリや、条件を満たす正規表現フィルターの処理を高速化します。インデックスの構築に先立ち、Milvusはテキストを、<em>固定長nの</em>短い重複する部分文字列（<em>n-gram</em>）に分割します。 たとえば、<em>n = 3</em> の場合、単語<em>「Milvus」</em>は 3-グラム<em>「Mil」</em>、<em>「ilv」</em>、<em>「lvu」</em>、<em>「vus」</em>に分割されます<em>。</em>これらの n-グラムは、各グラムが出現するドキュメント ID にマッピングされる逆引きインデックスに格納されます<em>。</em> クエリ実行時、このインデックスにより、Milvus は元のフィルタ条件を検証する前に、検索対象を少数の候補に素早く絞り込むことができます。</p>
<p>次のような、高速な接頭辞、接尾辞、中置辞、ワイルドカード、または正規表現によるフィルタリングが必要な場合に使用します。</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p><code translate="no">LIKE</code> および正規表現フィルタ式の構文の詳細については、「<a href="/docs/ja/pattern-matching.md">パターンマッチング</a>」を参照してください。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">仕組み<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus は、<code translate="no">NGRAM</code> インデックスを 2 段階のプロセスで実装します。</p>
<ol>
<li><p><strong>インデックスの構築</strong>：各ドキュメントの n-gram を生成し、取り込み中に逆引きインデックスを構築します。</p></li>
<li><p><strong>クエリの高速化</strong>：インデックスを使用して候補セットを絞り込み、その後、完全一致を検証します。</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">フェーズ1：インデックスの構築<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>データの取り込み中に、Milvusは主に以下の2つのステップを実行してNGRAMインデックスを構築します：</p>
<ol>
<li><p><strong>テキストをn-gramに分解</strong>：Milvusは、対象フィールド内の各文字列に対して<em>n長の</em>ウィンドウをスライドさせ、重複する部分文字列（<em>n-gram</em>）を抽出します。これらの部分文字列の長さは、設定可能な範囲内（<code translate="no">[min_gram, max_gram]</code> ）に収まります。</p>
<ul>
<li><p><code translate="no">min_gram</code>: 生成する最短のn-gram。これは、インデックスの恩恵を受けられるクエリ部分文字列の最小長も定義します。</p></li>
<li><p><code translate="no">max_gram</code>: 生成するn-gramの最大長。クエリ実行時には、長いクエリ文字列を分割する際の最大ウィンドウサイズとしても使用されます。</p></li>
</ul>
<p>たとえば、<code translate="no">min_gram=2</code> および<code translate="no">max_gram=3</code> を設定した場合、文字列<code translate="no">&quot;AI database&quot;</code> は次のように分割されます:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>N-gramインデックスの構築</span>
  
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
<li><p><strong>逆引きインデックスの構築</strong>：生成された各n-gramを、それを含むドキュメントIDのリストに<strong>マッピングする逆引きインデックスが</strong>作成されます。</p>
<p>たとえば、2-gram「<code translate="no">&quot;AI&quot;</code> 」が ID 1、5、6、8、9 のドキュメントに含まれている場合、インデックスには「<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> 」が記録されます。このインデックスは、クエリ実行時に検索範囲を迅速に絞り込むために使用されます。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>N-gramインデックスの構築 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">フェーズ 2: クエリの高速化<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">LIKE</code> フィルターまたは対象となる正規表現フィルターが実行されると、Milvus は NGRAM インデックスを使用して、以下の手順でクエリを高速化します：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>クエリの高速化</span>
  
 </span></p>
<ol>
<li><p><strong>クエリ用語の抽出：</strong> <code translate="no">LIKE</code> 式から、ワイルドカードを含まない連続した部分文字列が抽出されます（例：<code translate="no">&quot;%database%&quot;</code> は<code translate="no">&quot;database&quot;</code> となります）。正規表現フィルターの場合、Milvusは可能な限り正規表現パターンから固定のリテラル部分文字列を抽出します。例えば、<code translate="no">message =~ &quot;error.*timeout&quot;</code> にはリテラル<code translate="no">error</code> および<code translate="no">timeout</code> が含まれます。</p></li>
<li><p><strong>クエリ用語の分解：</strong>クエリ用語は、その長さ（<code translate="no">L</code> ）および<code translate="no">min_gram</code> と<code translate="no">max_gram</code> の設定に基づいて、<em>n-gram</em>に分解されます。</p>
<ul>
<li><p><code translate="no">L &lt; min_gram</code> の場合、インデックスは使用できず、クエリはフルスキャンに切り替わります。</p></li>
<li><p><code translate="no">min_gram ≤ L ≤ max_gram</code> の場合、クエリ用語全体が単一の n-gram として扱われ、それ以上の分解は必要ありません。</p></li>
<li><p><code translate="no">L &gt; max_gram</code> の場合、クエリ用語は、<code translate="no">max_gram</code> に等しいウィンドウサイズを使用して、重複するグラムに分解されます。</p></li>
</ul>
<p>たとえば、<code translate="no">max_gram</code> が<code translate="no">3</code> に設定されており、クエリ用語が<code translate="no">&quot;database&quot;</code> （長さ<strong>8</strong>）の場合、これは<code translate="no">&quot;dat&quot;</code> 、<code translate="no">&quot;ata&quot;</code> 、<code translate="no">&quot;tab&quot;</code> などの 3-gram の部分文字列に分解されます。</p></li>
<li><p><strong>各グラムを検索し、共通部分を抽出</strong>：Milvusは、クエリの各グラムを逆引きインデックスで検索し、その結果得られたドキュメントIDリストの共通部分を抽出することで、候補となるドキュメントの小さな集合を特定します。これらの候補には、クエリに含まれるすべてのグラムが含まれています。</p></li>
<li><p><strong>結果の検証と返却：</strong>その後、元の<code translate="no">LIKE</code> または正規表現フィルターを、この少数の候補セットに対してのみ最終チェックとして適用し、完全一致を特定します。</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">NGRAMインデックスの作成<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">VARCHAR</code> フィールド、または<code translate="no">JSON</code> フィールド内の特定のパスに対して、NGRAMインデックスを作成できます。</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">例 1: VARCHAR フィールドに作成する<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> フィールドの場合は、<code translate="no">field_name</code> を指定し、<code translate="no">min_gram</code> および<code translate="no">max_gram</code> を設定するだけで済みます。</p>
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
<p>この設定により、<code translate="no">text</code> 内の各文字列に対して2-gramおよび3-gramが生成され、それらを逆引きインデックスに格納します。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">例 2: JSON パスでの作成<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">JSON</code> フィールドの場合、グラムの設定に加えて、以下も指定する必要があります：</p>
<ul>
<li><p><code translate="no">params.json_path</code> – インデックス登録対象の値を指す JSON パス。</p></li>
<li><p><code translate="no">params.json_cast_type</code> – NGRAM インデックス作成は文字列に対して行われるため、<code translate="no">&quot;varchar&quot;</code> （大文字小文字を区別しない）である必要があります。</p></li>
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
<p>この例では：</p>
<ul>
<li><p><code translate="no">json_field[&quot;body&quot;]</code> にある値のみがインデックス化されます。</p></li>
<li><p>この値は、n-gramトークン化の前に<code translate="no">VARCHAR</code> に変換されます。</p></li>
<li><p>Milvusは長さ2～4の部分文字列を生成し、それらを逆引きインデックスに格納します。</p></li>
</ul>
<p>JSONフィールドのインデックス作成方法の詳細については、「<a href="/docs/ja/json-indexing.md">JSONインデックス作成</a>」を参照してください。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">NGRAM によるクエリの高速化<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>NGRAM インデックスを適用するには、以下の条件を満たす必要があります。</p>
<ul>
<li><p>クエリは、<code translate="no">NGRAM</code> インデックスが作成されている<code translate="no">VARCHAR</code> フィールド（またはJSONパス）を対象とする必要があります。</p></li>
<li><p><code translate="no">LIKE</code> パターンのリテラル部分は、<code translate="no">min_gram</code> 文字以上の長さでなければなりません。
<em>（たとえば、予想される最短のクエリ用語が 2 文字の場合、インデックス作成時に min_gram=2 を設定します。</em></p></li>
</ul>
<p>サポートされているクエリの種類：</p>
<ul>
<li><p><strong>プレフィックス一致</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>サフィックス一致</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>中置一致</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>ワイルドカード一致</strong></p>
<p>Milvusは、<code translate="no">%</code> （0個以上の文字）と<code translate="no">_</code> （正確に1つの文字）の両方をサポートしています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSONパスクエリ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>正規表現フィルター</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSONパスに対する正規表現フィルター</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>フィルタ式の構文の詳細については、「<a href="/docs/ja/pattern-matching.md">パターンマッチング</a>」を参照してください。</p>
<h2 id="Drop-an-index" class="common-anchor-header">インデックスの削除<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">drop_index()</code> メソッドを使用すると、コレクションから既存のインデックスを削除できます。</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">使用上の注意<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>フィールドタイプ</strong>：<code translate="no">VARCHAR</code> および<code translate="no">JSON</code> フィールドでサポートされています。JSON の場合、<code translate="no">params.json_path</code> と<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> の両方を指定してください。</p></li>
<li><p><strong>正規表現の高速化</strong>：<code translate="no">NGRAM</code> は、Milvusが正規表現パターンから固定のリテラル部分文字列を抽出できる場合にのみ、正規表現フィルターを高速化します。<code translate="no">[a-z]+</code> のようなパターンは、固定リテラルを含まないため、スキャン処理に切り替わる場合があります。</p></li>
<li><p><strong>大文字小文字を区別しない正規表現</strong>：<code translate="no">(?i)</code> を使用した正規表現パターンはサポートされていますが、インデックスでは元の大文字小文字が保持されるため、<code translate="no">NGRAM</code> による最適化がスキップされる場合があります。</p></li>
<li><p><strong>検証ステップ</strong>：正規表現フィルターの場合、<code translate="no">NGRAM</code> は候補を生成し、Milvusは完全なRE2正規表現パターンでそれらを検証するため、インデックスによる高速化によって一致結果が変わることはありません。</p></li>
<li><p><strong>Unicode</strong>：NGRAMの分解は文字単位で行われ、言語に依存せず、空白や句読点も含まれます。</p></li>
<li><p><strong>空間と時間のトレードオフ</strong>：<code translate="no">[min_gram, max_gram]</code> でグラム範囲を広くすると、生成されるグラムの数が増え、インデックスも大きくなります。メモリが逼迫している場合は、大規模なポスティングリストに対して<code translate="no">mmap</code> モードの使用を検討してください。詳細については、「<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmapの使用</a>」を参照してください。</p></li>
<li><p><strong>不変性</strong>:<code translate="no">min_gram</code> および<code translate="no">max_gram</code> はその場で変更できません。これらを調整するには、インデックスを再構築してください。</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">ベストプラクティス<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>検索の挙動に合わせて `min_gram` および `max_gram` を選択してください</strong></p>
<ul>
<li><p>最初は<code translate="no">min_gram=2</code> 、<code translate="no">max_gram=3</code> から始めます。</p></li>
<li><p><code translate="no">min_gram</code> には、ユーザーが入力すると予想される最短のリテラルを設定します。</p></li>
<li><p><code translate="no">max_gram</code> は、意味のある部分文字列の一般的な長さに近い値に設定します。<code translate="no">max_gram</code> を大きくするとフィルタリングは向上しますが、スペースも増えます。</p></li>
</ul></li>
<li><p><strong>選択性の低いグラムは避ける</strong></p>
<p>繰り返し率の高いパターン（例：<code translate="no">&quot;aaaaaa&quot;</code> ）はフィルタリング効果が弱く、得られるメリットも限定的になる可能性があります。</p></li>
<li><p><strong>一貫して正規化を行う</strong></p>
<p>ユースケースで必要であれば、取り込まれたテキストとクエリリテラルに同じ正規化処理（例：小文字化、先頭・末尾のトリミング）を適用してください。</p></li>
</ul>
