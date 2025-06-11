---
id: flat.md
title: FLAT
summary: >-
  FLAT
  インデックスは、浮動小数点ベクトルをインデックス化し検索するための、最も単純で簡単な方法の1つです。高度な前処理やデータ構造化を行うことなく、各クエリ・ベクトルをデータセット内のすべてのベクトルと直接比較するという、総当たり的なアプローチに依存しています。このアプローチでは、一致する可能性のあるすべてのベクトルが評価されるため、100%の再現率で精度が保証されます。
---
<h1 id="FLAT" class="common-anchor-header">FLAT<button data-href="#FLAT" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>FLAT</strong>インデックスは、浮動小数点ベクトルをインデックス化し検索するための、最も単純で簡単な方法の 1 つです。高度な前処理やデータ構造化を行うことなく、各クエリ・ベクトルをデータセット内のすべてのベクトルと直接比較するという、総当たり的なアプローチに依存しています。このアプローチでは、一致する可能性のあるすべてのベクトルが評価されるため、100%の再現率という精度が保証される。</p>
<p>しかし、この網羅的検索法にはトレードオフがある。FLATインデックスは、クエリごとにデータセットのフルスキャンを実行するため、最も遅いインデックスオプションである。そのため、パフォーマンスが懸念される巨大なデータセットを扱う環境には適していない。FLATインデックスの主な利点は、学習や複雑なパラメータ設定を必要としないため、シンプルで信頼性が高いことです。</p>
<h2 id="Build-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">FLAT</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> と<code translate="no">metric_type</code> インデックス用のパラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={} <span class="hljs-comment"># No additional parameters required for FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">FLAT</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:FLAT インデックスには追加のパラメータは必要ありません。</p></li>
</ul>
<p>インデックス・パラメータを構成したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドでインデックス・パラメータを渡してインデックスを作成できます。詳細は、<a href="/docs/ja/create-collection.md">Create Collection</a> を参照してください。</p>
<h2 id="Search-on-index" class="common-anchor-header">インデックスでの検索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスが構築され、エンティティが挿入されると、インデックスで類似検索を実行できます。</p>
<pre><code translate="no" class="language-python">res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {}}  <span class="hljs-comment"># No additional parameters required for FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">インデックスパラメータ<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>FLAT インデックスでは、インデックス作成中も検索処理中も追加のパラメータは必要ありません。</p>
