---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  MilvusのNGRAMインデックスは、VARCHARフィールドまたはJSONフィールド内の特定のJSONパスに対するLIKEクエリを高速化するために構築されています。インデックスを構築する前に、Milvusはテキストをn-gramと呼ばれる固定長nの短く重なり合った部分文字列に分割します。例えば、n
  = 3の場合、"Milvus "という単語は3つのグラムに分割される：「Mil"、"ilv"、"lvu"、"vus
  "である。これらのn-gramは、各gramとそれが出現する文書IDを対応付ける転置インデックスに格納される。クエリー時、このインデックスにより、Milvusは素早く検索候補を絞り込むことができ、その結果、クエリーの実行が非常に速くなる。
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
    </button></h1><p>Milvusの<code translate="no">NGRAM</code> インデックスは、<code translate="no">VARCHAR</code> フィールドまたは<code translate="no">JSON</code> フィールド内の特定のJSONパスに対する<code translate="no">LIKE</code> クエリを高速化するために構築されています。インデックスを構築する前に、Milvusはテキストを<em>n-gramと</em>呼ばれる固定長<em>nの</em>短く重なり合った部分文字列に分割する。例えば、<em>n = 3の</em>場合、<em>"Milvus "という</em>単語は3つのグラムに分割される：<em>「Mil"、</em> <em>"ilv"、</em> <em>"lvu"、</em> <em>"vus "である。</em>これらのn-gramは、各gramとそれが出現する文書IDを対応付ける転置インデックスに格納される。クエリ実行時に、このインデックスによりmilvusは素早く検索候補を絞り込むことができ、その結果、クエリの実行が非常に速くなります。</p>
<p>などのプレフィックス、サフィックス、インフィックス、ワイルドカードによるフィルタリングを高速に行う必要がある場合に使用します：</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>フィルタ式の構文の詳細については、「<a href="/docs/ja/basic-operators.md#Range-operators">基本演算子</a>」を参照してください。</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">動作原理<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusは2段階のプロセスで<code translate="no">NGRAM</code> インデックスを実装します：</p>
<ol>
<li><p><strong>インデックスを構築する</strong>：各文書のn-gramを生成し、インジェスト時に転置インデックスを構築する。</p></li>
<li><p><strong>クエリーの高速化</strong>：インデックスを使用して小さな候補セットにフィルタリングし、完全一致を検証する。</p></li>
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
    </button></h3><p>Milvusはデータ取り込み中に、主に2つのステップを実行することによりNGRAMインデックスを構築する：</p>
<ol>
<li><p><strong>テキストをn-gramに分解</strong>する：Milvusはターゲットフィールドの各文字列を<em>n個の</em>ウィンドウでスライドさせ、重複する部分文字列（<em>n-gram）を</em>抽出します。これらの部分文字列の長さは設定可能な範囲、<code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>:生成する最短のn-gram。これは、インデックスの恩恵を受けられる最小のクエリ部分文字列長を定義する。</p></li>
<li><p><code translate="no">max_gram</code>:生成する最長n-gram。クエリ時に、長いクエリ文字列を分割する際の最大ウィンドウサイズとしても使用される。</p></li>
</ul>
<p>例えば、<code translate="no">min_gram=2</code> と<code translate="no">max_gram=3</code> の場合、<code translate="no">&quot;AI database&quot;</code> の文字列は以下のように分割されます：</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Ngramインデックスの構築</span> </span></p>
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
<li><p><strong>転置インデックスを構築する</strong>：生成された各n-gramを、それを含む文書IDのリストに対応付ける<strong>転置インデックスが</strong>作成される。</p>
<p>例えば、<code translate="no">&quot;AI&quot;</code> という2-gramがID 1, 5, 6, 8, 9の文書に出現する場合、<code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code> がインデックスに記録される。このインデックスをクエリー時に使用することで、検索範囲を素早く絞り込むことができる。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Ngramインデックス2の構築</span> </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">フェーズ2：クエリの高速化<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">LIKE</code> フィルタが実行されると、MilvusはNGRAMインデックスを使い、以下のステップでクエリを高速化する：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>クエリの高速化</span> </span></p>
<ol>
<li><p><strong>クエリー用語を抽出する：</strong>ワイルドカードを含まない連続した部分文字列が<code translate="no">LIKE</code> 式から抽出される（例えば、<code translate="no">&quot;%database%&quot;</code> は<code translate="no">&quot;database&quot;</code> になる）。</p></li>
<li><p><strong>クエリ語の分解：</strong>クエリ語の長さ (<code translate="no">L</code>) と<code translate="no">min_gram</code> および<code translate="no">max_gram</code> の設定に基づいて、クエリ語が<em>n-gram</em>に分解される。</p>
<ul>
<li><p><code translate="no">L &lt; min_gram</code> の場合、インデックスは使用できず、クエリはフルスキャンに戻る。</p></li>
<li><p><code translate="no">min_gram ≤ L ≤ max_gram</code> の場合、クエリ語全体が1つのn-gramとして扱われ、それ以上の分解は必要ない。</p></li>
<li><p><code translate="no">L &gt; max_gram</code> の場合、<code translate="no">max_gram</code> に等しいウィンドウ・サイズを使用して、クエリ用語は重複するグラムに分解される。</p></li>
</ul>
<p>たとえば、<code translate="no">max_gram</code> が<code translate="no">3</code> に設定され、クエリ語の長さが<strong>8</strong> の<code translate="no">&quot;database&quot;</code> の場合、<code translate="no">&quot;dat&quot;</code> 、<code translate="no">&quot;ata&quot;</code> 、<code translate="no">&quot;tab&quot;</code> などの 3-gram の部分文字列に分解される。</p></li>
<li><p><strong>各グラムの検索と交差</strong>：Milvusは転置インデックスで各クエリーグラムを検索し、その結果の文書IDリストを交差させて、候補文書の小さなセットを見つける。これらの候補にはクエリのグラムがすべて含まれている。</p></li>
<li><p><strong>検証して結果を返す：</strong>オリジナルの<code translate="no">LIKE</code> フィルタが、完全一致を見つけるために、小さな候補集合のみに最終チェックとして適用される。</p></li>
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
    </button></h2><p><code translate="no">VARCHAR</code> フィールドまたは<code translate="no">JSON</code> フィールド内の特定のパスに NGRAM インデックスを作成できます。</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">例1：VARCHARフィールドへの作成<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">VARCHAR</code> フィールドの場合、<code translate="no">field_name</code> を指定し、<code translate="no">min_gram</code> と<code translate="no">max_gram</code> を構成するだけです。</p>
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
<p>この設定により、<code translate="no">text</code> の各文字列に対して 2-gram と 3-gram が生成され、転置インデックスに格納されます。</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">例2：JSONパスでの作成<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">JSON</code> フィールドの場合、グラム設定に加えて、次のように指定する必要があります：</p>
<ul>
<li><p><code translate="no">params.json_path</code> - インデックスを作成したい値を指すJSONパス。</p></li>
<li><p><code translate="no">params.json_cast_type</code> - は、<code translate="no">&quot;varchar&quot;</code> （大文字小文字を区別しない）でなければなりません。NGRAMインデックスは文字列に対して動作するからです。</p></li>
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
<p>この例では</p>
<ul>
<li><p><code translate="no">json_field[&quot;body&quot;]</code> の値のみがインデックス化されます。</p></li>
<li><p>この値は n-gram トークン化の前に<code translate="no">VARCHAR</code> にキャストされます。</p></li>
<li><p>milvusは長さ2から4の部分文字列を生成し、それらを転置インデックスに格納します。</p></li>
</ul>
<p>JSONフィールドにインデックスを付ける方法の詳細については、<a href="/docs/ja/use-json-fields.md">JSONフィールドを</a>参照してください。</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">NGRAMによって高速化されるクエリー<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>NGRAMインデックスを適用するには</p>
<ul>
<li><p>クエリは、<code translate="no">NGRAM</code> インデックスを持つ<code translate="no">VARCHAR</code> フィールド（または JSON パス）を対象としなければならない。</p></li>
<li><p><code translate="no">LIKE</code> パターンのリテラル部分は、少なくとも<code translate="no">min_gram</code> 文字の長さでなければなりません<em>(例えば、予想される最短のクエリー項が 2 文字の場合、インデックス作成時に min_gram=2 を設定します)。</em></p></li>
</ul>
<p>サポートされるクエリー型</p>
<ul>
<li><p><strong>接頭辞マッチ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>接尾辞マッチ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>接尾辞マッチ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>ワイルドカード一致</strong></p>
<p>Milvus は<code translate="no">%</code> (0文字以上) と<code translate="no">_</code> (正確に1文字) の両方をサポートしています。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>JSONパスクエリ</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>フィルタ式の構文の詳細については、<a href="/docs/ja/basic-operators.md">基本演算</a>子を参照してください。</p>
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
<li><p><strong>フィールド・タイプ</strong>：<code translate="no">VARCHAR</code> および<code translate="no">JSON</code> フィールドでサポートされます。JSONの場合は、<code translate="no">params.json_path</code> と<code translate="no">params.json_cast_type=&quot;varchar&quot;</code> の両方を指定してください。</p></li>
<li><p><strong>ユニコード</strong>：NGRAM分解は文字ベースであり、言語にとらわれず、空白と句読点を含む。</p></li>
<li><p><strong>スペー ス と 時間の ト レー ド オ フ</strong> ： グ ラ ム範囲<code translate="no">[min_gram, max_gram]</code> を広 く す る と 、 グ ラ ム数が増え、 イ ンデ ッ ク ス も 大 き く な り ます。メモリが限られている場合は、大きな投稿リスト用に<code translate="no">mmap</code> モードを検討してください。詳しくは<a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmapを使うを</a>参照してください。</p></li>
<li><p><strong>不変性</strong>:<code translate="no">min_gram</code> と<code translate="no">max_gram</code> は、その場で変更することはできません。</p></li>
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
<li><p><strong>検索動作に合わせてmin_gramとmax_gramを選択する。</strong></p>
<ul>
<li><p><code translate="no">min_gram=2</code>,<code translate="no">max_gram=3</code> から始める。</p></li>
<li><p><code translate="no">min_gram</code> 、ユーザーが入力すると思われる最も短いリテラルに設定する。</p></li>
<li><p><code translate="no">max_gram</code> 。意味のある部分文字列の典型的な長さの近くに設定します。<code translate="no">max_gram</code> を大きくすると、フィルタリングは向上しますが、スペースが増えます。</p></li>
</ul></li>
<li><p><strong>選択性の低いグラムは避ける</strong></p>
<p>繰り返しの多いパターン（例：<code translate="no">&quot;aaaaaa&quot;</code> ）はフィルタリング効果が弱く、得られる効果も限定的です。</p></li>
<li><p><strong>一貫した正規化</strong></p>
<p>取り込まれたテキストとクエリ・リテラルに同じ正規化（例えば、小文字化、トリミング）を適用する。</p></li>
</ul>
