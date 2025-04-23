---
id: json-operators.md
title: JSONオペレータ
summary: >-
  MilvusはJSONフィールドのクエリやフィルタリングのための高度な演算子をサポートしており、複雑な構造化データの管理に最適です。これらの演算子を使用すると、JSON
  ドキュメントを非常に効率的にクエリすることができ、JSON
  フィールド内の特定の要素、値、または条件に基づいてエンティティを取得することができます。このセクションでは、MilvusにおけるJSON固有の演算子の使用方法について、実用的な例を示しながら、その機能を説明します。
---
<h1 id="JSON-Operators" class="common-anchor-header">JSONオペレータ<button data-href="#JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusはJSONフィールドのクエリやフィルタリングのための高度な演算子をサポートしており、複雑な構造化データの管理に最適です。これらの演算子を使用すると、JSON ドキュメントを非常に効率的にクエリできるようになり、JSON フィールド内の特定の要素、値、または条件に基づいてエンティティを取得できるようになります。このセクションでは、MilvusにおけるJSON固有の演算子の使用方法について、実用的な例を示しながら、その機能を説明します。</p>
<div class="alert note">
<p>JSON フィールドは複雑な入れ子構造を扱うことができず、すべての入れ子構造をプレーンな文字列として扱います。そのため、JSONフィールドを扱う際には、最適なパフォーマンスを得るために、過度に深い入れ子を避け、データ構造を可能な限りフラットにすることをお勧めします。</p>
</div>
<h2 id="Available-JSON-Operators" class="common-anchor-header">利用可能なJSON演算子<button data-href="#Available-JSON-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、JSONデータのフィルタリングやクエリに役立つ強力なJSON演算子をいくつか提供しています：</p>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, expr)</code>:指定されたJSON式がフィールド内にあるエンティティをフィルタリングします。</p></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code>:指定されたJSON式のすべての要素がフィールド内に存在することを確認します。</p></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code>:JSON式の少なくとも1つのメンバがフィールド内に存在するエンティティをフィルタリングします。</p></li>
</ul>
<p>これらの演算子が実際のシナリオでどのように適用されるか、例を挙げて調べてみましょう。</p>
<h2 id="JSONCONTAINS" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains</code> 演算子は、JSON フィールド内に特定の要素またはサブ配列が存在するかどうかをチェックします。JSONの配列やオブジェクトに特定の値が含まれていることを確認したい場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code> のような文字列の JSON 配列を含む<code translate="no">tags</code> フィールドを持つ商品のコレクションがあるとします。タグ<code translate="no">&quot;sale&quot;</code> を持つ製品をフィルタリングしたいとします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains(product[&quot;tags&quot;], &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この例では、Milvusは、<code translate="no">tags</code> フィールドが要素<code translate="no">&quot;sale&quot;</code> を含むすべての製品を返します。</p>
<h2 id="JSONCONTAINSALL" class="common-anchor-header">json_contains_all<button data-href="#JSONCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_all</code> 演算子は、指定されたJSON式のすべての要素が対象フィールドに存在することを保証します。これは、JSON配列内の複数の値にマッチする必要がある場合に特に便利です。</p>
<p><strong>例</strong></p>
<p>商品タグのシナリオを続けると、<code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 、<code translate="no">&quot;new&quot;</code> のタグを持つすべての商品を検索する場合は、<code translate="no">json_contains_all</code> 演算子を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_all(product[&quot;tags&quot;], [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>このクエリは、<code translate="no">tags</code> 配列に指定した 3 つの要素すべてが含まれるすべての製品を返します：<code translate="no">&quot;electronics&quot;</code>,<code translate="no">&quot;sale&quot;</code>, および<code translate="no">&quot;new&quot;</code> 。</p>
<h2 id="JSONCONTAINSANY" class="common-anchor-header">json_contains_any<button data-href="#JSONCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">json_contains_any</code> 演算子は、JSON 式の少なくとも 1 つのメンバがフィールド内に存在するエンティティをフィルタリングします。これは、複数の可能な値のいずれかに基づいてエンティティをマッチさせたい場合に便利です。</p>
<p><strong>例</strong></p>
<p><code translate="no">&quot;electronics&quot;</code> 、<code translate="no">&quot;sale&quot;</code> 、<code translate="no">&quot;new&quot;</code> のいずれかのタグを少なくとも1つ持つ製品をフィルタリングしたいとします。これを実現するには、<code translate="no">json_contains_any</code> 演算子を使用できます。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>この場合、Milvusはリスト<code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code> にあるタグのうち少なくとも1つを持つすべての商品を返します。これらのタグを1つしか持たない商品であっても、結果に含まれます。</p>
