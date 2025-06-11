---
id: inverted.md
title: 反転
summary: >-
  MilvusのINVERTEDインデックスは、スカラーフィールドと構造化JSONフィールドの両方に対するフィルタクエリを高速化するように設計されています。用語とそれを含む文書またはレコードを対応付けることにより、インバーテッドインデックスは総当たり検索と比較してクエリのパフォーマンスを大幅に向上させます。
---
<h1 id="INVERTED" class="common-anchor-header">反転<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusの<code translate="no">INVERTED</code> インデックスは、スカラーフィールドと構造化JSONフィールドの両方に対するフィルタクエリを高速化するように設計されています。用語とそれを含むドキュメントまたはレコードを対応付けることにより、インバーテッドインデックスは総当たり検索と比較してクエリのパフォーマンスを大幅に向上させます。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/quickwit-oss/tantivy">Tantivyを</a>搭載したmilvusは、特にテキストデータに対するフィルタクエリを高速化するために転置インデックスを実装しています。その仕組みは以下の通りです：</p>
<ol>
<li><p><strong>データをトークン化</strong>します：Milvusは、生のデータ（この例では2つの文章）を受け取ります：</p>
<ul>
<li><p><strong>「Milvusはクラウドネイティブのベクトルデータベースです。</strong></p></li>
<li><p><strong>「Milvusはパフォーマンスに優れています。</strong></p></li>
</ul>
<p>そして、それらをユニークな単語に分割します（例：<em>Milvus</em>,<em>is</em>,<em>cloud-native</em>,<em>vector</em>,<em>database</em>,<em>very</em>,<em>good</em>,<em>at</em>,<em>performance</em>）。</p></li>
<li><p><strong>用語辞書を構築する</strong>：これらのユニークな単語は、<strong>用語辞書と</strong>呼ばれるソートされたリストに格納されます。この辞書により、Milvusは単語が存在するかどうかを素早くチェックし、インデックス内の位置を特定することができる。</p></li>
<li><p><strong>転置リストを作成する</strong>：用語辞書の各単語について、Milvusはその単語を含む文書を示す<strong>転置リストを</strong>保持します。例えば、<strong>"Milvus "は</strong>両方の文章に登場するので、その転置リストは両方の文書IDを指す。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>反転リスト</span> </span></p>
<p>辞書はソートされているので、用語ベースのフィルタリングを効率的に処理することができる。Milvusはすべての文書をスキャンする代わりに、辞書で用語を検索し、その転置リストを取得するだけで、大規模なデータセットでの検索やフィルタリングを大幅に高速化できる。</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">通常のスカラーフィールドのインデックス<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>BOOL</strong>、<strong>INT8</strong>、<strong>INT16</strong>、<strong>INT32</strong>、<strong>INT64</strong>、<strong>FLOAT</strong>、<strong>DOUBLE</strong>、<strong>VARCHAR</strong>、<strong>ARRAYの</strong>ようなスカラーフィールドの場合、転置インデックスの作成は簡単です。<code translate="no">index_type</code> パラメータを<code translate="no">&quot;INVERTED&quot;</code> に設定して、<code translate="no">create_index()</code> メソッドを使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">JSONフィールドのインデックス<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはJSONフィールドにインデックス機能を拡張し、単一のカラムに格納されたネストされたデータや構造化されたデータを効率的にフィルタリングできるようにしました。スカラーフィールドとは異なり、JSONフィールドにインデックスを作成する場合、2つのパラメータを追加で指定する必要があります：</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong>インデックスを作成するネストされたキーを指定します。</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong>抽出されたJSON値がキャストされるデータ型（例えば、<code translate="no">&quot;varchar&quot;</code> 、<code translate="no">&quot;double&quot;</code> 、<code translate="no">&quot;bool&quot;</code> ）を定義します。</p></li>
</ul>
<p>例えば、<code translate="no">metadata</code> という名前のJSONフィールドが以下のような構造になっているとする：</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>特定のJSONパスに転置インデックスを作成するには、以下の方法を使用できます：</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の例</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>スキーマ内のJSONフィールドの名前。</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>作成するインデックス・タイプ。現在、JSON パスのインデックス作成でサポートされているのは<code translate="no">INVERTED</code> のみです。</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(オプション) カスタム・インデックス名。同じ JSON フィールドに複数のインデックスを作成する場合は、異なる名前を指定します。</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>インデックスを作成する JSON パスを指定します。ネストしたキー、配列の位置、またはその両方を対象とすることができます (例:<code translate="no">metadata["product_info"]["category"]</code> または<code translate="no">metadata["tags"][0]</code>)。 パスが見つからない場合、または配列要素が特定の行に存在しない場合、インデックス作成中にその行は単にスキップされ、エラーは発生しません。</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Milvusがインデックスを作成する際に、抽出されたJSON値をキャストするデータ型。有効な値</p>
<ul>
<li><p><code translate="no">"bool"</code> または<code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> または<code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> または<code translate="no">"VARCHAR"</code></p>
<p><strong>注意</strong>: 整数値の場合、Milvusは内部的にインデックスにdoubleを使用します。2^53以上の大きな整数は精度を失います。(型の不一致により)キャストに失敗した場合、エラーは発生せず、その行の値はインデックス化されません。</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">JSONインデックスの考慮点<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>フィルタリングロジック</strong>：</p>
<ul>
<li><p><strong>ダブル型インデックス (</strong><code translate="no">json_cast_type=&quot;double&quot;</code><strong>) を作成した</strong>場合、数値型フィルタ条件のみがそのインデックスを使用できます。フィルタでダブルインデックスと数値以外の条件が比較された場合、Milvusは総当たり検索にフォールバックします。</p></li>
<li><p><strong>varchar型インデックス(</strong><code translate="no">json_cast_type=&quot;varchar&quot;</code><strong>)を作成した</strong>場合、文字列型フィルタ条件のみがインデックスを使用できます。そうでない場合、Milvusは総当り検索に戻ります。</p></li>
<li><p><strong>ブール型</strong>インデックスもvarchar型インデックスと同様の動作をします。</p></li>
</ul></li>
<li><p><strong>条件式</strong>：</p>
<ul>
<li><code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code> を使用することができます。しかし、このインデックスはそのパスの下に格納されたスカラー値に対してのみ機能します。<code translate="no">json[&quot;field&quot;]</code> が配列の場合、クエリはブルートフォースに戻ります（配列型インデックスはまだサポートされていません）。</li>
</ul></li>
<li><p><strong>数値精度</strong>：</p>
<ul>
<li>内部的には、Milvusは全ての数値フィールドをdoubleとしてインデックスを作成します。数値が<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2532</mn></msup></mrow><annotation encoding="application/x-tex">^{</annotation><mrow><msup><mn>53}</mn></msup></mrow></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53を</span></span></span></span></span></span></span></span></span></span></span></span>超えると精度が落ち、範囲外の値に対するクエリは正確にマッチしない可能性があります。</li>
</ul></li>
<li><p><strong>データの完全性</strong>：</p>
<ul>
<li>Milvusは指定されたキャスティングを超えるJSONキーの解析や変換を行いません。ソースデータに一貫性がない場合（例えば、<code translate="no">&quot;k&quot;</code> キーに文字列を格納する行と数値を格納する行がある）、インデックスが作成されない行があります。</li>
</ul></li>
</ul>
