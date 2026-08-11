---
id: array-operators.md
title: ARRAY演算子
summary: Milvus は、配列のフィールドをクエリするための強力な演算子を提供しており、配列の内容に基づいてエンティティをフィルタリングして取得することができます。
---
<h1 id="ARRAY-Operators" class="common-anchor-header">ARRAY演算子<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus は、配列フィールドをクエリするための強力な演算子を提供しており、配列の内容に基づいてエンティティをフィルタリングおよび取得することができます。</p>
<div class="alert note">
<p>配列内のすべての要素は同じ型でなければならず、配列内のネストされた構造は単純な文字列として扱われます。したがって、ARRAYフィールドを扱う際は、パフォーマンスを最適化するために、過度なネストを避け、データ構造をできるだけフラットに保つことをお勧めします。</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">利用可能なARRAY演算子<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>ARRAY演算子を使用すると、Milvusの配列フィールドに対してきめ細かなクエリを実行できます。これらの演算子は以下の通りです。</p>
<ul>
<li><p><a href="/docs/ja/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: 配列フィールドに特定の要素が存在するかどうかを確認します。</p></li>
<li><p><a href="/docs/ja/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: 指定されたリストのすべての要素が配列フィールドに含まれていることを確認します。</p></li>
<li><p><a href="/docs/ja/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: 指定されたリストの要素のいずれかが配列フィールドに含まれているかどうかを確認します。</p></li>
<li><p><a href="/docs/ja/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: 配列フィールド内の要素数を返し、フィルタリングのために比較演算子と組み合わせることができます。</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 演算子は、配列フィールドに特定の要素が存在するかどうかを確認します。これは、配列内に指定された要素が含まれるエンティティを検索したい場合に役立ちます。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> という配列フィールドがあり、そこに各年の観測された最低気温が格納されているとします。この配列に値「<code translate="no">23</code> 」が含まれるすべてのエンティティを検索するには、次のフィルタ式を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> という値が含まれるすべてのエンティティが返されます。</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 演算子は、指定されたリストのすべての要素が配列フィールドに含まれていることを保証します。この演算子は、配列に複数の値を含むエンティティを照合したい場合に役立ちます。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> と<code translate="no">24</code> の両方が含まれるすべてのエンティティを検索するには、次のようにします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に指定された両方の値が含まれているすべてのエンティティが返されます。</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 演算子は、指定されたリストの要素のいずれかが配列フィールドに含まれているかどうかを確認します。これは、配列内の指定された値のうち少なくとも1つを含むエンティティを一致させたい場合に役立ちます。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> または<code translate="no">24</code> のいずれかが含まれるすべてのエンティティを検索するには、次のようにします：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> または<code translate="no">24</code> のいずれか1つ以上が含まれるすべてのエンティティが返されます。</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> は、配列フィールドの長さ（要素数）を返します。この関数は、配列フィールドの識別子という、ちょうど1つのパラメータを受け取ります。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列の要素数が10未満であるすべてのエンティティを検索するには：</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>これにより、<code translate="no">history_temperatures</code> 配列の要素数が10未満であるすべてのエンティティが返されます。</p>
