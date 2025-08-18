---
id: basic-operators.md
title: 基本演算子
summary: >-
  Milvusはデータのフィルタリングやクエリを効率的に行うための豊富な基本演算子を提供しています。これらの演算子を使用すると、スカラーフィールド、数値計算、論理条件などに基づいて検索条件を絞り込むことができます。これらの演算子の使い方を理解することは、正確なクエリを構築し、検索の効率を最大化するために非常に重要です。
---
<h1 id="Basic-Operators" class="common-anchor-header">基本演算子<button data-href="#Basic-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはデータのフィルタリングやクエリを効率的に行うための豊富な基本演算子を提供しています。これらの演算子を使用すると、スカラーフィールド、数値計算、論理条件などに基づいて検索条件を絞り込むことができます。これらの演算子の使い方を理解することは、正確なクエリを構築し、検索の効率を最大限に高めるために非常に重要です。</p>
<h2 id="Comparison-operators" class="common-anchor-header">比較演算子<button data-href="#Comparison-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>比較演算子は、等式、不等式、またはサイズに基づいてデータをフィルタリングするために使用されます。数値フィールドとテキストフィールドに適用できます。</p>
<h3 id="Supported-Comparison-Operators" class="common-anchor-header">サポートされている比較演算子</h3><ul>
<li><p><code translate="no">==</code> (等しい）</p></li>
<li><p><code translate="no">!=</code> (等しくない）</p></li>
<li><p><code translate="no">&gt;</code> (より大きい）</p></li>
<li><p><code translate="no">&lt;</code> (より小さい）</p></li>
<li><p><code translate="no">&gt;=</code> (大以上)</p></li>
<li><p><code translate="no">&lt;=</code> 以下</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Equal-To-" class="common-anchor-header">例 1：Equal To (<code translate="no">==</code>) によるフィルタリング</h3><p><code translate="no">status</code> というフィールドがあり、<code translate="no">status</code> が "active" であるすべてのエンティティを検索したいとします。等号演算子<code translate="no">==</code> を使用できます：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Not-Equal-To-" class="common-anchor-header">例 2：Not Equal To (<code translate="no">!=</code>) を使ったフィルタリング</h3><p><code translate="no">status</code> が「非アクティブ」でないエンティティを見つける：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;status != &quot;inactive&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Filtering-with-Greater-Than-" class="common-anchor-header">例 3：Greater Than (<code translate="no">&gt;</code>) によるフィルタリング</h3><p><code translate="no">age</code> が 30 より大きいエンティティをすべて検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;age &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Filtering-with-Less-Than" class="common-anchor-header">例 4: 小を使ったフィルタリング</h3><p><code translate="no">price</code> が 100 未満のエンティティを検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &lt; 100&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Filtering-with-Greater-Than-or-Equal-To-" class="common-anchor-header">例 5：Greater Than または Equal To (<code translate="no">&gt;=</code>) によるフィルタリング</h3><p><code translate="no">rating</code> が 4 以上のエンティティをすべて検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Filtering-with-Less-Than-or-Equal-To" class="common-anchor-header">例 6：以下でのフィルタリング</h3><p><code translate="no">discount</code> が 10% 以下のエンティティを検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators" class="common-anchor-header">範囲演算子<button data-href="#Range-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>範囲演算子は、特定の値の集合または範囲に基づいてデータをフィルタリングするのに役立ちます。</p>
<h3 id="Supported-Range-Operators" class="common-anchor-header">サポートされている範囲演算子：</h3><ul>
<li><p><code translate="no">IN</code>:特定のセットまたは範囲内の値をマッチさせるために使用されます。</p></li>
<li><p><code translate="no">LIKE</code>:パターンにマッチさせるために使用します（主にテキストフィールドの場合）。</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values" class="common-anchor-header">例 1：<code translate="no">IN</code> を使用して複数の値に一致させる</h3><p><code translate="no">color</code> が "red"、"green"、または "blue" のいずれかであるすべてのエンティティを検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これは、値のリストに含まれるかどうかを調べたいときに便利です。</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching" class="common-anchor-header">例 2:<code translate="no">LIKE</code> を使ったパターンマッチング</h3><p><code translate="no">LIKE</code> 演算子は文字列フィールドのパターンマッチングに使われます。この演算子は、<strong>プレフィックス</strong>、<strong>インフィックス</strong>、<strong>サフィックスなど</strong>、テキスト内のさまざまな位置の部分文字列にマッチさせることができます。<code translate="no">LIKE</code> 演算子は<code translate="no">%</code> シンボルをワイルドカードとして使い、 任意の数の文字（ゼロを含む）にマッチさせることができます。</p>
<div class="alert note">
<p>ほとんどの場合、<strong>接尾辞</strong>マッチングや<strong>接尾辞</strong>マッチングは接頭辞マッチングよりも大幅に遅くなります。パフォーマンスを重視する場合は注意して使用してください。</p>
</div>
<h3 id="Prefix-Match-Starts-With" class="common-anchor-header">プレフィックスマッチ (Starts With)</h3><p>文字列が指定したパターンで始まるような<strong>プレフィックス</strong>マッチを行うには、 パターンを先頭に置き、<code translate="no">%</code> を使ってそれに続く文字にマッチさせます。たとえば、<code translate="no">name</code> が "Prod" で始まるすべての製品を検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これは、"Product A"、"Product B "など、商品名が "Prod "で始まるすべての商品にマッチします。</p>
<h3 id="Suffix-Match-Ends-With" class="common-anchor-header">接尾辞マッチ（End With）</h3><p>文字列が指定されたパターンで終わる<strong>接尾辞</strong>マッチの場合、<code translate="no">%</code> シンボルをパターンの先頭に置きます。例えば、<code translate="no">name</code> が "XYZ" で終わるすべての製品を検索する場合：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この場合、"ProductXYZ"、"SampleXYZ "など、製品名が "XYZ "で終わるすべての製品にマッチします。</p>
<h3 id="Infix-Match-Contains" class="common-anchor-header">接尾辞マッチ（含む）</h3><p>文字列のどこにでもパターンが出現するような<strong>infix</strong>マッチを行うには、<code translate="no">%</code> シンボルをパターンの最初と最後の両方に置きます。たとえば、<code translate="no">name</code> に "Pro" という単語が含まれるすべての製品を検索します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これは、"Product"、"ProLine"、"SuperPro "など、製品名に "Pro "という部分文字列が含まれるすべての製品にマッチします。</p>
<h2 id="Arithmetic-Operators" class="common-anchor-header">算術演算子<button data-href="#Arithmetic-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>算術演算子を使用すると、数値フィールドを含む計算に基づいて条件を作成できます。</p>
<h3 id="Supported-Arithmetic-Operators" class="common-anchor-header">サポートされる算術演算子</h3><ul>
<li><p><code translate="no">+</code> (加算)</p></li>
<li><p><code translate="no">-</code> (減算)</p></li>
<li><p><code translate="no">*</code> (乗算)</p></li>
<li><p><code translate="no">/</code> (除算)</p></li>
<li><p><code translate="no">%</code> (モジュラス）</p></li>
<li><p><code translate="no">**</code> 指数</p></li>
</ul>
<h3 id="Example-1-Using-Modulus-" class="common-anchor-header">例 1：モジュラス (<code translate="no">%</code>) の使用</h3><p><code translate="no">id</code> が偶数（つまり2で割り切れる）である実体を見つける：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Exponentiation-" class="common-anchor-header">例 2: 指数を使う (<code translate="no">**</code>)</h3><p><code translate="no">price</code> の 2 乗が 1000 より大きいエンティティを見つける：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators" class="common-anchor-header">論理演算子<button data-href="#Logical-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>論理演算子は、複数の条件を組み合わせて、より複雑なフィルタ式にするために使用します。これには<code translate="no">AND</code> 、<code translate="no">OR</code> 、および<code translate="no">NOT</code> が含まれます。</p>
<h3 id="Supported-Logical-Operators" class="common-anchor-header">サポートされている論理演算子</h3><ul>
<li><p><code translate="no">AND</code>:すべて真でなければならない複数の条件を組み合わせます。</p></li>
<li><p><code translate="no">OR</code>:少なくとも1つが真でなければならない条件を組み合わせる。</p></li>
<li><p><code translate="no">NOT</code>:条件を否定する。</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions" class="common-anchor-header">例 1:<code translate="no">AND</code> を使って条件を組み合わせる</h3><p><code translate="no">price</code> が 100 より大きく、<code translate="no">stock</code> が 50 より大きい製品をすべて見つける：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions" class="common-anchor-header">例 2：<code translate="no">OR</code> を使って条件を組み合わせる</h3><p><code translate="no">color</code> が「赤」または「青」であるすべての製品を検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition" class="common-anchor-header">例 3:<code translate="no">NOT</code> を使って条件を除外する</h3><p><code translate="no">color</code> が "green" ではないすべての製品を見つける：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="IS-NULL-and-IS-NOT-NULL-Operators" class="common-anchor-header">IS NULL および IS NOT NULL 演算子<button data-href="#IS-NULL-and-IS-NOT-NULL-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IS NULL</code> および<code translate="no">IS NOT NULL</code> 演算子は、フィールドに NULL 値（データがないこと）が含まれているかどうかに基づいてフィールドをフィルタリングするために使用されます。</p>
<ul>
<li><p><code translate="no">IS NULL</code>:特定のフィールドに NULL 値が含まれる、つまり値が存在しないか未定義のエンティティを識別します。</p></li>
<li><p><code translate="no">IS NOT NULL</code>:特定のフィールドにヌル以外の値が含まれているエンティティを識別します。</p></li>
</ul>
<div class="alert note">
<p>演算子は大文字と小文字を区別しないので、<code translate="no">IS NULL</code> または<code translate="no">is null</code> と、<code translate="no">IS NOT NULL</code> または<code translate="no">is not null</code> を使用できます。</p>
</div>
<h3 id="Regular-Scalar-Fields-with-Null-Values" class="common-anchor-header">NULL値を持つ通常のスカラーフィールド</h3><p>Milvusでは文字列や数値のようなNULL値を持つ通常のスカラーフィールドのフィルタリングが可能です。</p>
<div class="alert note">
<p>空の文字列<code translate="no">&quot;&quot;</code> は<code translate="no">VARCHAR</code> フィールドの NULL 値として扱われません。</p>
</div>
<p><code translate="no">description</code> フィールドが NULL のエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">description</code> フィールドが NULL ではないエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">description</code> フィールドが NULL でなく、<code translate="no">price</code> フィールドが 10 より大きいエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;description IS NOT NULL AND price &gt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="JSON-Fields-with-Null-Values" class="common-anchor-header">NULL 値を持つ JSON フィールド</h3><p>Milvusでは、NULL値を含むJSONフィールドのフィルタリングが可能です。JSONフィールドは、以下の方法でNULLとして扱われます：</p>
<ul>
<li><p>JSON オブジェクト全体が明示的に None (null) に設定されている場合 (例:<code translate="no">{&quot;metadata&quot;: None}</code>)。</p></li>
<li><p>JSONフィールド自体が、エンティティから完全に欠落している。</p></li>
</ul>
<div class="alert note">
<p>JSONオブジェクト内の一部の要素（個々のキーなど）がNULLの場合でも、フィールドは非NULLとみなされる。例えば、<code translate="no">category</code> のキーがNULLであっても、<code translate="no">\{&quot;metadata&quot;: \{&quot;category&quot;: None, &quot;price&quot;: 99.99}}</code> はNULLとして扱われない。</p>
</div>
<p>MilvusがNULL値を持つJSONフィールドをどのように扱うかをさらに説明するために、JSONフィールド<code translate="no">metadata</code> を持つ以下のサンプルデータを考えてみましょう：</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>},
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-comment"># Entire JSON object is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.78</span>, <span class="hljs-number">0.90</span>]
  },
  {  <span class="hljs-comment"># JSON field `metadata` is completely missing</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.91</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>]
  },
  {
      <span class="hljs-string">&quot;metadata&quot;</span>: {<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>}, <span class="hljs-comment"># Individual key value is null</span>
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">4</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.56</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.21</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 1：<code translate="no">metadata</code> が NULL のエンティティを検索する</strong></p>
<p><code translate="no">metadata</code> フィールドがないか、明示的に None に設定されているエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: None, &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 2：<code translate="no">metadata</code> が NULL ではないエンティティを検索する。</strong></p>
<p><code translate="no">metadata</code> フィールドが NULL ではないエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;metadata IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="ARRAY-Fields-with-Null-Values" class="common-anchor-header">NULL値を持つARRAYフィールド</h3><p>Milvusでは、NULL値を含むARRAYフィールドのフィルタリングが可能です。ARRAYフィールドは以下の方法でNULLとして扱われます：</p>
<ul>
<li><p>例えば、<code translate="no">&quot;tags&quot;: None</code> のように、ARRAYフィールド全体が明示的にNone（Null）に設定されている場合。</p></li>
<li><p>ARRAYフィールドがエンティティから完全に欠落している。</p></li>
</ul>
<div class="alert note">
<p>ARRAY フィールドのすべての要素が同じデータ型でなければならないため、ARRAY フィールドに部分的な NULL 値を含めることはできません。詳細は<a href="/docs/ja/array_data_type.md">配列フィールドを</a>参照してください。</p>
</div>
<p>MilvusがNULL値を持つARRAYフィールドをどのように扱うかをさらに説明するために、ARRAYフィールド<code translate="no">tags</code> を持つ以下のサンプルデータを考えてみましょう：</p>
<pre><code translate="no" class="language-python">data = [
  {
      <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;pop&quot;</span>, <span class="hljs-string">&quot;rock&quot;</span>, <span class="hljs-string">&quot;classic&quot;</span>],
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.34</span>, <span class="hljs-number">0.56</span>]
  },
  {
      <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-literal">None</span>,  <span class="hljs-comment"># Entire ARRAY is null</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">4</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.78</span>, <span class="hljs-number">0.91</span>, <span class="hljs-number">0.23</span>]
  },
  {  <span class="hljs-comment"># The tags field is completely missing</span>
      <span class="hljs-string">&quot;ratings&quot;</span>: [<span class="hljs-number">9</span>, <span class="hljs-number">5</span>],
      <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.18</span>, <span class="hljs-number">0.11</span>, <span class="hljs-number">0.23</span>]
  }
]
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 1：<code translate="no">tags</code> が NULL のエンティティを検索する</strong></p>
<p><code translate="no">tags</code> フィールドがないか、明示的に<code translate="no">None</code> に設定されているエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [4, 5], &#x27;embedding&#x27;: [0.78, 0.91, 0.23], &#x27;pk&#x27;: 2}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;tags&#x27;: None, &#x27;ratings&#x27;: [9, 5], &#x27;embedding&#x27;: [0.18, 0.11, 0.23], &#x27;pk&#x27;: 3}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>例 2：<code translate="no">tags</code> が NULL ではないエンティティを検索する。</strong></p>
<p><code translate="no">tags</code> フィールドが NULL ではないエンティティを検索する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;tags IS NOT NULL&#x27;</span>

<span class="hljs-comment"># Example output:</span>
<span class="hljs-comment"># data: [</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: &#x27;electronics&#x27;, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 1}&quot;,</span>
<span class="hljs-comment">#     &quot;{&#x27;metadata&#x27;: {&#x27;category&#x27;: None, &#x27;price&#x27;: 99.99, &#x27;brand&#x27;: &#x27;BrandA&#x27;}, &#x27;pk&#x27;: 4}&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="common-anchor-header">JSONおよびARRAYフィールドで基本演算子を使用する際のヒント<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの基本演算子は汎用性があり、スカラーフィールドに適用することができますが、JSONやARRAYフィールドのキーやインデックスにも効果的に使用することができます。</p>
<p>例えば、<code translate="no">price</code>,<code translate="no">model</code>,<code translate="no">tags</code> のような複数のキーを含む<code translate="no">product</code> フィールドがある場合、常にキーを直接参照します：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>記録された気温の配列の最初の気温が特定の値を超えているレコードを検索するには、次のように使用する：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusには基本的な演算子が揃っており、データのフィルタリングやクエリを柔軟に行うことができます。比較演算子、範囲演算子、算術演算子、論理演算子を組み合わせることで、検索結果を絞り込み、必要なデータを効率的に取得するための強力なフィルタ式を作成することができます。</p>
