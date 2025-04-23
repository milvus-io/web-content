---
id: boolean.md
title: フィルタリングの説明
summary: >-
  Milvusはデータの正確なクエリを可能にする強力なフィルタリング機能を提供します。フィルタ式を使用すると、特定のスカラーフィールドを対象とし、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、Milvusにおけるフィルタ式の使用方法を、クエリ操作に焦点を当てた例を用いて説明します。また、検索および削除リクエストでこれらのフィルタを適用することもできます。
---
<h1 id="Filtering-Explained" class="common-anchor-header">フィルタリングの説明<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはデータの正確なクエリを可能にする強力なフィルタリング機能を提供します。フィルタ式を使用すると、特定のスカラーフィールドを対象とし、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、Milvusにおけるフィルタ式の使用方法を、クエリ操作に焦点を当てた例を用いて説明します。また、検索や削除のリクエストでもこれらのフィルタを適用することができます。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本演算子<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはデータをフィルタリングするためのいくつかの基本的な演算子をサポートしています：</p>
<ul>
<li><p><strong>比較演算子</strong>：<code translate="no">==</code> <code translate="no">!=</code>,<code translate="no">&gt;</code>,<code translate="no">&lt;</code>,<code translate="no">&gt;=</code>, および<code translate="no">&lt;=</code> では、数値フィールドまたはテキストフィールドに基づくフィルタリングが可能です。</p></li>
<li><p><strong>範囲フィルタ</strong>:<code translate="no">IN</code> および<code translate="no">LIKE</code> は、特定の値の範囲またはセットにマッチさせるのに役立ちます。</p></li>
<li><p><strong>算術演算子</strong>：<code translate="no">+</code> <code translate="no">-</code>,<code translate="no">*</code>,<code translate="no">/</code>,<code translate="no">%</code>, および<code translate="no">**</code> は、数値フィールドを含む計算に使用されます。</p></li>
<li><p><strong>論理演算子</strong>：<code translate="no">AND</code> <code translate="no">OR</code> および<code translate="no">NOT</code> は、複数の条件を組み合わせて複雑な式にします。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">例色によるフィルタリング</h3><p>スカラー・フィールド<code translate="no">color</code> で原色（赤、緑、青）を持つエンティティを検索するには、以下のフィルタ式を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">例JSONフィールドのフィルタリング</h3><p>MilvusではJSONフィールドのキーを参照することができます。たとえば、<code translate="no">price</code> および<code translate="no">model</code> をキーとする JSON フィールド<code translate="no">product</code> があり、特定のモデルで価格が 1,850 より低い製品を検索したい場合は、次のフィルタ式を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">例配列フィールドのフィルタリング</h3><p>2000年以降に観測所から報告された平均気温の記録を含む配列フィールド<code translate="no">history_temperatures</code> があり、2009年（10番目に記録された）の気温が23℃を超える観測所を見つけたい場合、この式を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これらの基本演算子についての詳細は、<a href="/docs/ja/basic-operators.md">基本演算子を</a>参照してください。</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">フィルタ式のテンプレート<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>日中韓の文字を使ってフィルタリングする場合、文字セットとエンコーディングの違いが大きいため、処理が複雑になることがあります。その結果、特に<code translate="no">IN</code> 演算子のパフォーマンスが低下することがあります。</p>
<p>Milvusは、日中韓文字を扱う際のパフォーマンスを最適化するために、フィルター式のテンプレート化を導入しました。フィルター式から動的な値を分離することで、クエリーエンジンはパラメーターの挿入をより効率的に処理します。</p>
<h3 id="Example" class="common-anchor-header">例</h3><p>北京」（北京）または「上海」（上海）に住む25歳以上の個人を検索するには、次のテンプレート式を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>パフォーマンスを向上させるには、パラメータ付きのこのバリエーションを使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>この方法は、構文解析のオーバーヘッドを減らし、クエリの速度を向上させます。詳細は<a href="/docs/ja/filtering-templating.md">Filter Templating</a> を参照してください。</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">データ型固有の演算子<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、JSON、ARRAY、VARCHARフィールドなどの特定のデータ型に対する高度なフィルタリング演算子を提供しています。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON フィールド固有の演算子</h3><p>MilvusはJSONフィールドをクエリするための高度な演算子を提供し、複雑なJSON構造内の正確なフィルタリングを可能にします：</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>:JSON 式がフィールドに存在するかどうかをチェックします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>:JSON式のすべての要素が存在することを確認します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>:JSON 式に少なくとも 1 つの要素が存在するエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>JSON 演算子の詳細については、「<a href="/docs/ja/json-operators.md">JSON 演算子</a>」を参照してください。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY フィールド固有の演算子</h3><p>Milvusは、<code translate="no">ARRAY_CONTAINS</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code> 、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_LENGTH</code> のような配列フィールド用の高度なフィルタリング演算子を提供しており、配列データに対するきめ細かな制御が可能です：</p>
<p><code translate="no">ARRAY_CONTAINS</code>:特定の要素を含むエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>:リスト内のすべての要素が存在するエンティティをフィルタリングする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>:リストから任意の要素を含むエンティティをフィルタリングする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>:配列の長さに基づいてフィルタリングする。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>配列演算子の詳細については、<a href="/docs/ja/array-operators.md">ARRAY 演算子を</a>参照してください。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR フィールド固有の演算子</h3><p>MilvusはVARCHARフィールドをテキストベースで正確に検索するために特化した演算子を提供しています：</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 演算子</h4><p><code translate="no">TEXT_MATCH</code> 演算子を使用すると、特定のクエリ語に基づいて文書を正確に検索することができます。スカラーフィルタとベクトル類似検索を組み合わせたフィルタ検索に特に便利です。セマンティック検索とは異なり、Text Matchは正確な用語の出現に焦点を当てる。</p>
<p>MilvusはTantivyを使用して、転置インデックスと用語ベースのテキスト検索をサポートしている。プロセスには以下が含まれる：</p>
<ol>
<li><p><strong>アナライザー</strong>：入力テキストをトークン化し、処理する。</p></li>
<li><p><strong>インデックス作成</strong>：一意のトークンを文書にマッピングする転置インデックスを作成する。</p></li>
</ol>
<p>詳細は<a href="/docs/ja/keyword-match.md">テキストマッチを</a>参照。</p>
