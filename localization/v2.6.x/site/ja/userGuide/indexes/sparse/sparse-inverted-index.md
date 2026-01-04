---
id: sparse-inverted-index.md
title: sparse_inverted_index
summary: >-
  SPARSE_INVERTED_INDEXインデックスはMilvusがスパースベクトルを効率的に格納・検索するために使用するインデックスタイプです。このインデックス型は逆インデックスの原理を利用し、スパースデータのための非常に効率的な検索構造を作成します。
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">sparse_inverted_index<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスはMilvusがスパースベクトルを効率的に格納、検索するために使用するインデックスタイプです。このインデックス型は転置インデックスの原理を利用し、スパースデータに対して非常に効率的な検索構造を作成します。詳細については<a href="/docs/ja/inverted.md">INVERTEDを</a>参照してください。</p>
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
    </button></h2><p>Milvusでスパースベクトルフィールドに<code translate="no">SPARSE_INVERTED_INDEX</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、そしてインデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では、<code translate="no">SPARSE_INVERTED_INDEX</code> に設定します。</p></li>
<li><p><code translate="no">metric_type</code>:スパース・ベクトル間の類似度を計算するために使用するメトリック。有効な値：</p>
<ul>
<li><p><code translate="no">IP</code> (内積)：ドット積を使用して類似度を測定します。</p></li>
<li><p><code translate="no">BM25</code>:通常、テキストの類似性に重点を置いた全文検索に使用される。</p>
<p>詳細は「<a href="/docs/ja/metric.md">メトリックタイプと</a> <a href="/docs/ja/full-text-search.md">全文検索</a>」を参照。</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>:インデックスの構築とクエリに使用されるアルゴリズム。有効な値：</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (デフォルト)：MaxScoreアルゴリズムを使用した最適化されたDocument-at-a-Time（DAAT）クエリ処理。MaxScoreは、高い<em>k</em>値や多くの用語を含むクエリに対して、影響が最小と思われる用語やドキュメントをスキップすることで、より優れたパフォーマンスを提供します。MaxScoreは、最大インパクトスコアに基づいて用語を必須グループと非必須グループに分割し、トップkの結果に貢献できる用語に焦点を当てることでこれを実現する。</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>:WANDアルゴリズムを使用したDAATクエリ処理の最適化。WANDは非競合文書をスキップするために最大インパクトスコアを活用することで、より少ないヒット文書を評価する。このため、WANDは<em>k</em>値が小さいクエリや短いクエリではスキップがより効率的である。</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>:Basic Term-at-a-Time (TAAT)クエリー処理。<code translate="no">DAAT_MAXSCORE</code> 、<code translate="no">DAAT_WAND</code> と比較すると遅いが、<code translate="no">TAAT_NAIVE</code> にはユニークな利点がある。グローバル収集パラメータ（avgdl）の変更に関係なく静的なままキャッシュされた最大影響スコアを使用するDAATアルゴリズムとは異なり、<code translate="no">TAAT_NAIVE</code> 、そのような変更に動的に適応する。</p></li>
</ul>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスで利用可能な構築パラメータについては、<a href="/docs/ja/sparse-inverted-index.md#Index-building-params">インデックス構築パラメータを</a>参照。</p></li>
</ul>
<p>インデックス・パラメータを構成したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドでインデックス・パラメータを渡してインデックスを作成できます。詳細は、<a href="/docs/ja/create-collection.md">コレクションの作成</a> を参照してください。</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> インデックスで使用できる検索パラメータについては、「<a href="/docs/ja/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">インデックス固有の検索パラメータ</a>」を参照してください。</p>
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
    </button></h2><p>このセクションでは、インデックスを構築し、インデックス上で検索を実行するために使用されるパラ メータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/sparse-inverted-index.md#Build-index">インデックスを構築</a>する際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>インデックスの構築とクエリに使用されるアルゴリズム。インデックスがどのようにクエリを処理するかを決定します。</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (デフォルト),<code translate="no">"DAAT_WAND"</code> 、<code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>高いk値を持つシナリオや多くの用語を持つクエリには<code translate="no">"DAAT_MAXSCORE"</code> 、競合しない文書をスキップすることで利益を得ることができます。 </p><p>k 値が小さいクエリや短いクエリでは<code translate="no">"DAAT_WAND"</code> を選択し、より効率的なスキップを活用します。</p><p>コレクションの変更（avgdlなど）に対する動的な調整が必要な場合は、<code translate="no">"TAAT_NAIVE"</code> 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>次の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/sparse-inverted-index.md#Search-on-index">インデックス検索</a>時に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングサジェスチョン</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>検索時に無視する最小値の割合。</p></td>
     <td><p>0.0から1.0の間の割合（例えば、0.2は最小値の20%を無視します）。</p></td>
     <td><p>クエリベクトルのスパース性とノイズレベルに基づいて、このパラメータを調整します。</p><p>このパラメータは、検索中に取りこぼされる小さい値の割合を制御します。この値を大きくすると（例えば、<code translate="no">0.2</code> ）、ノイズが減少し、より重要な成分に検索が集中するため、精度と効率が向上します。しかし、より多くの値を削除すると、潜在的に関連性のあるシグナルを除外することになり、リコールが低下する可能性もあります。作業負荷に応じて、リコールと精度のバランスが取れた値を選択してください。</p></td>
   </tr>
</table>
