---
id: basic-operators.md
summary: >-
  Milvusはデータのフィルタリングやクエリを効率的に行うための豊富な基本演算子を提供しています。これらの演算子を使用すると、スカラーフィールド、数値計算、論理条件などに基づいて検索条件を絞り込むことができます。これらの演算子の使い方を理解することは、正確なクエリを構築し、検索の効率を最大化するために非常に重要です。
title: ベーシック・オペレーター
---
<h1 id="Basic-Operators​" class="common-anchor-header">基本演算子<button data-href="#Basic-Operators​" class="anchor-icon" translate="no">
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
<h2 id="Comparison-operators​" class="common-anchor-header">比較演算子<button data-href="#Comparison-operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>比較演算子は、等式、不等式、またはサイズに基づいてデータをフィルタリングするために使用されます。数値フィールド、テキストフィールド、日付フィールドに適用できます。</p>
<h3 id="Supported-Comparison-Operators​" class="common-anchor-header">サポートされている比較演算子</h3><ul>
<li><p><code translate="no">==</code> (等しい</p></li>
<li><p><code translate="no">!=</code> (等しくない</p></li>
<li><p><code translate="no">&gt;</code> (より大きい</p></li>
<li><p><code translate="no">&lt;</code> (より小さい</p></li>
<li><p><code translate="no">&gt;=</code> (大以上)</p></li>
<li><p><code translate="no">&lt;=</code> 以下</p></li>
</ul>
<h3 id="Example-1-Filtering-with-Greater-Than-or-Equal-To-​" class="common-anchor-header">例 1：Greater Than or Equal To (<code translate="no">&gt;=</code>) によるフィルタリング</h3><p><code translate="no">rating</code> が 4 以上のすべてのエンティティを検索する場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;rating &gt;= 4&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtering-with-Less-Than-or-Equal-To-​" class="common-anchor-header">例 2：Less Than or Equal To (<code translate="no">&lt;=</code>) によるフィルタリング</h3><p><code translate="no">discount</code> が 10% 以下のエンティティを検索する場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;discount &lt;= 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Range-operators​" class="common-anchor-header">範囲演算子<button data-href="#Range-operators​" class="anchor-icon" translate="no">
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
<h3 id="Supported-Range-Operators​" class="common-anchor-header">サポートされている範囲演算子。</h3><ul>
<li><p><code translate="no">IN</code>:特定のセットまたは範囲内の値をマッチさせるために使用されます。</p></li>
<li><p><code translate="no">LIKE</code>:パターンにマッチさせるために使用します（主にテキストフィールドの場合）。</p></li>
</ul>
<h3 id="Example-1-Using-IN-to-Match-Multiple-Values​" class="common-anchor-header">例 1：<code translate="no">IN</code> を使用して複数の値に一致させる</h3><p><code translate="no">color</code> が &quot;red&quot;、&quot;green&quot;、または &quot;blue&quot; のいずれかであるすべてのエンティティを検索する場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、値のリストに含まれるかどうかを調べたいときに便利です。</p>
<h3 id="Example-2-Using-LIKE-for-Pattern-Matching​" class="common-anchor-header">例 2:<code translate="no">LIKE</code> を使ったパターンマッチング</h3><p><code translate="no">LIKE</code> 演算子は文字列フィールドのパターンマッチングに使われます。この演算子は、<strong>プレフィックス</strong>、<strong>インフィックス</strong>、<strong>サフィックスなど</strong>、テキスト内のさまざまな位置の部分文字列にマッチさせることができます。<code translate="no">LIKE</code> 演算子は<code translate="no">%</code> シンボルをワイルドカードとして使い、任意の文字数（ゼロを含む）にマッチさせることができます。</p>
<h4 id="Prefix-Match-Starts-With​" class="common-anchor-header">プレフィックスマッチ（Starts With）</h4><p>文字列が指定したパターンで始まるような<strong>プレフィックス</strong>マッチを行うには、パターンを先頭に置き、<code translate="no">%</code> を使って、それに続く文字にマッチさせることができます。たとえば、<code translate="no">name</code> が &quot;Prod&quot; で始まるすべての製品を検索する場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;Prod%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、&quot;Product A&quot;、&quot;Product B &quot;など、商品名が &quot;Prod &quot;で始まるすべての商品にマッチします。</p>
<h4 id="Suffix-Match-Ends-With​" class="common-anchor-header">接尾辞マッチ（End With</h4><p>文字列が指定されたパターンで終わる<strong>接尾辞</strong>マッチの場合、<code translate="no">%</code> シンボルをパターンの先頭に置きます。例えば、<code translate="no">name</code> が &quot;XYZ&quot; で終わるすべての製品を検索する場合。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%XYZ&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>この場合、&quot;ProductXYZ&quot;、&quot;SampleXYZ &quot;など、製品名が &quot;XYZ &quot;で終わるすべての製品にマッチします。</p>
<h4 id="Infix-Match-Contains​" class="common-anchor-header">接尾辞マッチ（含む</h4><p>文字列のどこにでもパターンが出現するような<strong>infix</strong>マッチを行うには、<code translate="no">%</code> シンボルをパターンの最初と最後の両方に置きます。たとえば、<code translate="no">name</code> に &quot;Pro&quot; という単語が含まれるすべての製品を検索します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;name LIKE &quot;%Pro%&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、&quot;Product&quot;、&quot;ProLine&quot;、&quot;SuperPro &quot;など、製品名に &quot;Pro &quot;という部分文字列が含まれるすべての製品にマッチします。</p>
<h2 id="Arithmetic-Operators​" class="common-anchor-header">算術演算子<button data-href="#Arithmetic-Operators​" class="anchor-icon" translate="no">
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
<h3 id="Supported-Arithmetic-Operators​" class="common-anchor-header">サポートされる算術演算子</h3><ul>
<li><p><code translate="no">+</code> (加算)</p></li>
<li><p><code translate="no">-</code> (減算)</p></li>
<li><p><code translate="no">*</code> (乗算)</p></li>
<li><p><code translate="no">/</code> (除算)</p></li>
<li><p><code translate="no">%</code> (モジュラス</p></li>
<li><p><code translate="no">**</code> 指数</p></li>
</ul>
<h3 id="Example-1-Using-Addition-+​" class="common-anchor-header">例 1: 足し算の使用 (<code translate="no">+</code>)</h3><p><code translate="no">total</code> の価格が<code translate="no">base_price</code> と<code translate="no">tax</code> の合計であるエンティティを見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total == base_price + tax&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-Subtraction--​" class="common-anchor-header">例2：引き算の使用 (<code translate="no">-</code>)</h3><p><code translate="no">quantity</code> が 50 より大きく、<code translate="no">quantity_sold</code> が 30 より小さいエンティティを見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;quantity - quantity_sold &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-Multiplication-​" class="common-anchor-header">例3: 乗算を使う (<code translate="no">*</code>)</h3><p><code translate="no">price</code> が 100 より大きく、<code translate="no">quantity</code> が 10 より大きい、乗算されたエンティティを見つけるには。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price * quantity &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Using-Division-​" class="common-anchor-header">例 4: 除算の使用 (<code translate="no">/</code>)</h3><p><code translate="no">total_price</code> を<code translate="no">quantity</code> で割った値が 50 未満である実体を見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;total_price / quantity &lt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-5-Using-Modulus-​" class="common-anchor-header">例5：モジュラス (<code translate="no">%</code>) の使用</h3><p><code translate="no">id</code> が偶数（すなわち、2で割り切れる）である実体を見つけるには。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;id % 2 == 0&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-6-Using-Exponentiation-​" class="common-anchor-header">例6: 指数を使う (<code translate="no">**</code>)</h3><p><code translate="no">price</code> の 2 乗が 1000 より大きいエンティティを見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price ** 2 &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Logical-Operators​" class="common-anchor-header">論理演算子<button data-href="#Logical-Operators​" class="anchor-icon" translate="no">
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
<h3 id="Supported-Logical-Operators​" class="common-anchor-header">サポートされている論理演算子</h3><ul>
<li><p><code translate="no">AND</code>:すべて真でなければならない複数の条件を組み合わせます。</p></li>
<li><p><code translate="no">OR</code>:少なくとも1つが真でなければならない条件を組み合わせる。</p></li>
<li><p><code translate="no">NOT</code>:条件を否定する。</p></li>
</ul>
<h3 id="Example-1-Using-AND-to-Combine-Conditions​" class="common-anchor-header">例 1:<code translate="no">AND</code> を使って条件を組み合わせる</h3><p><code translate="no">price</code> が 100 より大きく、<code translate="no">stock</code> が 50 より大きい製品をすべて見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;price &gt; 100 AND stock &gt; 50&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Using-OR-to-Combine-Conditions​" class="common-anchor-header">例 2：<code translate="no">OR</code> を使って条件を組み合わせる</h3><p><code translate="no">color</code> が「赤」または「青」であるすべての製品を検索する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR color == &quot;blue&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Using-NOT-to-Exclude-a-Condition​" class="common-anchor-header">例 3:<code translate="no">NOT</code> を使って条件を除外する</h3><p><code translate="no">color</code> が &quot;green&quot; でないすべての商品を見つける。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;NOT color == &quot;green&quot;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="common-anchor-header">JSONとARRAYフィールドで基本演算子を使うヒント<button data-href="#Tips-on-Using-Basic-Operators-with-JSON-and-ARRAY-Fields​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの基本演算子は汎用性が高く、スカラーフィールドに適用することができますが、JSONやARRAYフィールドのキーやインデックスにも効果的に使用することができます。</p>
<p>例えば、<code translate="no">price</code>,<code translate="no">model</code>,<code translate="no">tags</code> のような複数のキーを含む<code translate="no">product</code> フィールドがある場合、常にキーを直接参照します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;product[&quot;price&quot;] &gt; 1000&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>記録された気温の配列の最初の気温が特定の値を超えているレコードを検索するには、次のように使用する。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;history_temperatures[0] &gt; 30&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion​" class="common-anchor-header">結論<button data-href="#Conclusion​" class="anchor-icon" translate="no">
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
