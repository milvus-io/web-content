---
id: stl-sort.md
title: STL_SORT
summary: >-
  STL_SORTインデックスは、Milvus内の数値フィールド(INT8、INT16など)やTIMESTAMPTZフィールドのデータをソート順に整理することにより、クエリのパフォーマンスを向上させるために特別に設計されたインデックスタイプです。
---
<h1 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">STL_SORT</code> インデックスはMilvus内の数値フィールド(INT8、INT16など)や<code translate="no">TIMESTAMPTZ</code> フィールドのデータをソート順に整理することにより、クエリの性能を向上させるために特別に設計されたインデックスタイプです。</p>
<p>以下のようなクエリを頻繁に実行する場合は、<code translate="no">STL_SORT</code> インデックスを使用してください：</p>
<ul>
<li><p><code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;=</code> 、<code translate="no">&lt;=</code> 演算子による比較フィルタリング</p></li>
<li><p><code translate="no">IN</code> および<code translate="no">LIKE</code> 演算子による範囲フィルタリング</p></li>
</ul>
<h2 id="Supported-data-types" class="common-anchor-header">サポートされるデータ型<button data-href="#Supported-data-types" class="anchor-icon" translate="no">
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
<li><p>数値フィールド（例：<code translate="no">INT8</code> 、<code translate="no">INT16</code> 、<code translate="no">INT32</code> 、<code translate="no">INT64</code> 、<code translate="no">FLOAT</code> 、<code translate="no">DOUBLE</code> ）。詳細は「<a href="/docs/ja/number.md">Boolean &amp; Number</a>」を参照。</p></li>
<li><p><code translate="no">TIMESTAMPTZ</code> フィールド。詳細は「<a href="/docs/ja/timestamptz-field.md">TIMESTAMPTZフィールド</a>」を参照。</p></li>
</ul>
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
    </button></h2><p>Milvusは2つのフェーズで<code translate="no">STL_SORT</code> ：</p>
<ol>
<li><p><strong>インデックスの構築</strong></p>
<ul>
<li><p>インジェスト中、Milvusはインデックスされたフィールドのすべての値を収集します。</p></li>
<li><p>値はC++ STLの<a href="https://en.cppreference.com/w/cpp/algorithm/sort.html">std::sortを</a>使用して昇順にソートされます。</p></li>
<li><p>各値はエンティティIDと対にされ、ソートされた配列がインデックスとして永続化されます。</p></li>
</ul></li>
<li><p><strong>クエリの高速化</strong></p>
<ul>
<li><p>クエリー時、Milvusはソートされた配列に対して<strong>バイナリサーチ</strong><a href="https://en.cppreference.com/w/cpp/algorithm/lower_bound.html">（std::lower_boundと</a> <a href="https://en.cppreference.com/w/cpp/algorithm/upper_bound.html">std::upper_bound</a>）を使用します。</p></li>
<li><p>等値の場合、Milvusは一致するすべての値を素早く見つけます。</p></li>
<li><p>範囲の場合、Milvusは開始位置と終了位置を特定し、その間のすべての値を返します。</p></li>
<li><p>一致したエンティティIDは、最終的な結果の組み立てのためにクエリ実行部に渡されます。</p></li>
</ul></li>
</ol>
<p>これにより、クエリの複雑さが<strong>O(n)</strong>(フルスキャン)から<strong>O(log n + m)</strong>(<em>mは</em>マッチ数<strong>)</strong>に減少します。</p>
<h2 id="Create-an-STLSORT-index" class="common-anchor-header">STL_SORTインデックスの作成<button data-href="#Create-an-STLSORT-index" class="anchor-icon" translate="no">
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
    </button></h2><p>数値フィールドまたは<code translate="no">TIMESTAMPTZ</code> フィールドに<code translate="no">STL_SORT</code> インデックスを作成することができます。追加のパラメータは必要ありません。</p>
<p>以下の例は、<code translate="no">TIMESTAMPTZ</code> フィールドに<code translate="no">STL_SORT</code> インデックスを作成する方法を示しています：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a TIMESTAMPTZ field named &quot;tsz&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;tsz&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;tsz&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,   <span class="hljs-comment"># Index for TIMESTAMPTZ</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;tsz_index&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;tsz_demo&quot;</span>,
    index_params=index_params
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
<li><p><strong>フィールド・タイプ：</strong>数値フィールドと<code translate="no">TIMESTAMPTZ</code> フィールドで動作します。データ型の詳細については、<a href="/docs/ja/number.md">Boolean &amp; Number</a>および<a href="/docs/ja/timestamptz-field.md">TIMESTAMPTZ Fieldを</a>参照してください。</p></li>
<li><p><strong>パラメータ：</strong>インデックス・パラメータは必要ありません。</p></li>
<li><p><strong>Mmapはサポートされていません：</strong>メモリ・マップド・モードは<code translate="no">STL_SORT</code> では使用できない。</p></li>
</ul>
