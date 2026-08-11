---
id: boolean.md
title: フィルタリングの解説
summary: >-
  Milvus
  は、データを正確にクエリするための強力なフィルタリング機能を提供します。フィルタ式を使用すると、特定のスカラーフィールドを対象に指定し、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、クエリ操作に焦点を当てた例を交えながら、Milvus
  でのフィルタ式の使用方法について説明します。また、これらのフィルタは検索リクエストや削除リクエストにも適用できます。
---
<h1 id="Filtering-Explained" class="common-anchor-header">フィルタリングの解説<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、データを正確にクエリするための強力なフィルタリング機能を提供します。フィルタ式を使用すると、特定のスカラーフィールドを指定し、さまざまな条件で検索結果を絞り込むことができます。このガイドでは、クエリ操作に焦点を当てた例を用いて、Milvusでのフィルタ式の使用方法を説明します。これらのフィルタは、検索リクエストや削除リクエストにも適用できます。</p>
<h2 id="Basic-operators" class="common-anchor-header">基本的な演算子<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、データのフィルタリングにいくつかの基本演算子がサポートされています：</p>
<ul>
<li><p><strong>比較演算子</strong>：<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、および<code translate="no">&lt;=</code> は、数値フィールドやテキストフィールドに基づくフィルタリングを可能にします。</p></li>
<li><p><strong>範囲およびパターンフィルター</strong>：<code translate="no">IN</code> 、<code translate="no">LIKE</code> 、<code translate="no">=~</code> 、および<code translate="no">!~</code> は、値、ワイルドカードパターン、または正規表現パターンに一致させます。文字列パターンの詳細については、<a href="/docs/ja/pattern-matching.md">「パターンマッチング</a>」を参照してください。</p></li>
<li><p><strong>算術演算子</strong>：<code translate="no">+</code> 、<code translate="no">-</code> 、<code translate="no">*</code> 、<code translate="no">/</code> 、<code translate="no">%</code> 、および<code translate="no">**</code> は、数値フィールドを用いた計算に使用されます。</p></li>
<li><p><strong>ビット演算子</strong>：Milvus 3.0.0 以降では、<code translate="no">&amp;</code> 、<code translate="no">|</code> 、および<code translate="no">^</code> は、権限やステータスビットなど、複数のフラグをエンコードする整数フィールドをフィルタリングします。詳細については、「<a href="/docs/ja/basic-operators.md#Bitwise-operators">基本演算子</a>」を参照してください。</p></li>
<li><p><strong>論理演算子</strong>：<code translate="no">AND</code> 、<code translate="no">OR</code> 、および<code translate="no">NOT</code> は、複数の条件を組み合わせて複雑な式を作成します。</p></li>
<li><p><strong>IS NULL および IS NOT NULL 演算子</strong>：<code translate="no">IS NULL</code> および<code translate="no">IS NOT NULL</code> 演算子は、フィールドに NULL 値（データが存在しない状態）が含まれているかどうかに基づいてフィールドをフィルタリングするために使用されます。詳細については、<a href="/docs/ja/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">「基本演算子」</a>を参照してください。</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">例：色によるフィルタリング<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>スカラーフィールド `<code translate="no">color</code>` に原色（赤、緑、青）を含むエンティティを検索するには、次のフィルタ式を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">例：権限ビットによるフィルタリング<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>整数型フィールド `<code translate="no">permissions</code> ` に `<code translate="no">SHARE</code> ` ビットが設定されているエンティティを検索するには、ビット単位のAND演算子（<code translate="no">&amp;</code> ）を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">例：正規表現パターンによるフィルタリング<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">message</code> フィールドに<code translate="no">E1001</code> などのエラーコードが含まれるエンティティを検索するには、正規表現マッチ演算子<code translate="no">=~</code> を使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>正規表現によるフィルタリングでは、部分文字列の一致が使用されます。フィールド値全体がパターンに一致するようにするには、<code translate="no">^</code> および<code translate="no">$</code> のアンカーを追加します。詳細については、<a href="/docs/ja/pattern-matching.md">「パターンマッチング</a>」を参照してください。</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">例：JSONフィールドのフィルタリング<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus では、JSON フィールド内のキーを参照することができます。たとえば、<code translate="no">product</code> という JSON フィールドに<code translate="no">price</code> および<code translate="no">model</code> というキーがあり、特定のモデルで価格が 1,850 未満の商品を検索したい場合は、次のフィルタ式を使用します:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">例：配列フィールドのフィルタリング<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>2000年以降に観測所から報告された平均気温のレコードを含む配列フィールド `<code translate="no">history_temperatures</code> ` があり、2009年（記録開始から10年目）の気温が23°Cを超える観測所を検索したい場合は、次の式を使用します:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これらの基本演算子の詳細については、「<a href="/docs/ja/basic-operators.md">基本演算子</a>」を参照してください。</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">フィルタ式テンプレート<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>CJK文字を使用してフィルタリングを行う場合、文字セットが広く、エンコーディングの違いがあるため、処理が複雑になることがあります。これにより、特に<code translate="no">IN</code> 演算子を使用する際、パフォーマンスが低下する可能性があります。</p>
<p>Milvusでは、CJK文字を扱う際のパフォーマンスを最適化するために、フィルタ式のテンプレート機能を導入しています。動的な値をフィルタ式から分離することで、クエリエンジンはパラメータの挿入をより効率的に処理できるようになります。</p>
<h3 id="Example" class="common-anchor-header">例<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>「北京」または「上海」のいずれかに居住し、25歳以上の個人を検索するには、次のテンプレート式を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>パフォーマンスを向上させるには、パラメータを使用した次のバリエーションを使用します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>このアプローチにより、解析のオーバーヘッドが軽減され、クエリ速度が向上します。詳細については、「<a href="/docs/ja/filtering-templating.md">フィルタテンプレート</a>」を参照してください。</p>
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
    </button></h2><p>Milvus では、JSON、ARRAY、VARCHAR フィールドなど、特定のデータ型向けの高度なフィルタリング演算子が提供されています。</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSONフィールド固有の演算子<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus は、JSON フィールドをクエリするための高度な演算子を提供しており、複雑な JSON 構造内でも正確なフィルタリングが可能になります:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: フィールド内にJSON式が存在するかどうかを確認します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: JSON式に含まれるすべての要素が存在することを確認します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: JSON式に少なくとも1つの要素が存在するエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>JSON演算子の詳細については、「<a href="/docs/ja/json-operators.md">JSON演算子</a>」を参照してください。</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAYフィールド固有の演算子<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus は、<code translate="no">ARRAY_CONTAINS</code> 、<code translate="no">ARRAY_CONTAINS_ALL</code> 、<code translate="no">ARRAY_CONTAINS_ANY</code> 、<code translate="no">ARRAY_LENGTH</code> など、配列フィールド用の高度なフィルタリング演算子を提供しており、これらを使用することで配列データをきめ細かく制御できます:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: 特定の要素を含むエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: リスト内のすべての要素を含むエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: リスト内のいずれかの要素を含むエンティティをフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: 配列の長さに基づいてフィルタリングします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>配列演算子の詳細については、「<a href="/docs/ja/array-operators.md">ARRAY 演算子</a>」を参照してください。</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHARフィールド固有の演算子<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus では、VARCHAR フィールドに対する精密なテキスト検索を行うための専用演算子が提供されています:</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">パターンマッチング演算子</h4><p><code translate="no">LIKE</code> 、<code translate="no">=~</code> 、および<code translate="no">!~</code> 演算子は、<code translate="no">VARCHAR</code> フィールド、JSON文字列パス、および特定の<code translate="no">ARRAY&lt;VARCHAR&gt;</code> 要素上の文字列パターンと照合します。単純なワイルドカードパターンには<code translate="no">LIKE</code> を使用します。RE2正規表現には<code translate="no">=~</code> および<code translate="no">!~</code> を使用します。</p>
<p>詳細については、「<a href="/docs/ja/pattern-matching.md">パターンマッチング</a>」を参照してください。</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> 演算子</h4><p><code translate="no">TEXT_MATCH</code> 演算子を使用すると、特定のクエリ用語に基づいてドキュメントを正確に検索できます。これは、スカラーフィルタとベクトル類似度検索を組み合わせたフィルタリング検索に特に有用です。セマンティック検索とは異なり、Text Matchは用語の完全一致に焦点を当てています。</p>
<p>Milvus は、Tantivy を使用して、逆引きインデックス作成と用語ベースのテキスト検索をサポートしています。そのプロセスは以下の通りです。</p>
<ol>
<li><p><strong>アナライザー</strong>：入力テキストをトークン化して処理します。</p></li>
<li><p><strong>インデックス作成</strong>：一意のトークンをドキュメントにマッピングする逆引きインデックスを作成します。</p></li>
</ol>
<p>詳細については、「<a href="/docs/ja/keyword-match.md">Text Match</a>」を参照してください。</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> 演算子<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p><strong>PHRASE_MATCH</strong>オペレータを使用すると、クエリ用語の順序と隣接性の両方を考慮し、フレーズが完全に一致することに基づいて、ドキュメントを正確に検索できます。</p>
<p>詳細については、「<a href="/docs/ja/phrase-match.md">フレーズマッチ</a>」を参照してください。</p>
