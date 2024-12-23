---
id: array-operators.md
summary: Milvusは、配列フィールドをクエリするための強力な演算子を提供しており、配列の内容に基づいてエンティティをフィルタリングして取得することができます。
title: 配列演算子
---
<h1 id="ARRAY-Operators​" class="common-anchor-header">配列演算子<button data-href="#ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、配列フィールドをクエリするための強力な演算子を提供しており、配列の内容に基づいてエンティティをフィルタリングして取得することができます。</p>
<div class="alert note">
<p>配列内の要素はすべて同じ型でなければならず、配列内の入れ子構造はプレーンな文字列として扱われます。したがって、ARRAYフィールドを扱う際には、過度な深い入れ子は避け、 できるだけ平坦なデータ構造にしてパフォーマンスを最適化することを推奨します。</p>
</div>
<h2 id="Available-ARRAY-Operators​" class="common-anchor-header">使用可能なARRAY演算子<button data-href="#Available-ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、ARRAY演算子により、配列フィールドに対するきめ細かな問い合わせが可能です。これらの演算子は以下の通りです。</p>
<ul>
<li><p><a href="#ARRAY_CONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: 配列フィールドに特定の要素が存在するかどうかをチェックします。</p></li>
<li><p><a href="#ARRAY_CONTAINS_ALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>指定されたリストのすべての要素が配列フィールドに存在するか確認します。</p></li>
<li><p><a href="#ARRAY_CONTAINS_ANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>指定されたリストの要素のいずれかが配列フィールドに存在するかどうかをチェックする。</p></li>
<li><p><a href="#ARRAY_LENGTH"><code translate="no">ARRAY_LENGTH(identifier, expr)</code></a>: 配列フィールドの要素数に基づいてエンティティをフィルタリングできます。</p></li>
</ul>
<h2 id="ARRAYCONTAINS​" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS</code> 演算子は、配列フィールドに特定の要素が存在するかどうかを調べます。指定した要素が配列に存在するエンティティを見つけたい場合に便利です。</p>
<p><strong>例</strong></p>
<p>さまざまな年の最低気温の記録を含む配列フィールド<code translate="no">history_temperatures</code> があるとします。配列に値<code translate="no">23</code> が含まれるすべてのエンティティを検索するには、以下のフィルタ式を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、配列<code translate="no">history_temperatures</code> に値<code translate="no">23</code> が含まれるすべてのエンティティを返します。</p>
<h2 id="ARRAYCONTAINSALL​" class="common-anchor-header">array_contains_all<button data-href="#ARRAYCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ALL</code> 演算子は、指定したリストのすべての要素が配列フィールドに存在することを保証します。この演算子は、配列に複数の値が含まれるエンティティにマッチさせたい場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> と<code translate="no">24</code> の両方が含まれるエンティティをすべて検索する場合は、この演算子を使 用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、<code translate="no">history_temperatures</code> 配列に指定した値の両方が含まれるすべてのエンティティを返します。</p>
<h2 id="ARRAYCONTAINSANY​" class="common-anchor-header">array_contains_any<button data-href="#ARRAYCONTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_CONTAINS_ANY</code> 演算子は、指定したリストの要素が配列フィールドに存在するかどうかを調べます。これは、指定された値の少なくとも 1 つが配列に含まれるエンティティにマッチする場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列に<code translate="no">23</code> または<code translate="no">24</code> のいずれかが含まれるエンティティをすべて検索するには、 を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、<code translate="no">history_temperatures</code> 配列に値<code translate="no">23</code> または<code translate="no">24</code> の少なくともいずれかが含まれるすべてのエンティティを返します。</p>
<h2 id="ARRAYLENGTH​" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH​" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">ARRAY_LENGTH</code> 演算子を使用すると、配列フィールドの要素数に基づいてエンティティをフィルタリングできます。これは、特定の長さの配列を持つエンティティを見つける必要がある場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">history_temperatures</code> 配列の要素数が 10 未満のエンティティをすべて見つけたい場合は、次のようにします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>これは、<code translate="no">history_temperatures</code> 配列の要素数が 10 未満のエンティティをすべて返します。</p>
