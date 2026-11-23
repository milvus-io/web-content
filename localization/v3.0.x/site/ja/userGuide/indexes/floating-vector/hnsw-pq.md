---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQは、階層的ナビゲータブル・スモールワールド（HNSW）グラフとプロダクト量子化（PQ）を組み合わせることで、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス手法を実現しています。
  HNSW_SQと比較して、このインデックスタイプは、クエリ処理速度は低下し、インデックス構築時間も長くなりますが、同じ圧縮レベルでより高いリコール率を実現します。
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQは</strong>、階層型ナビゲータブル・スモールワールド（HNSW）グラフとプロダクト量子化（PQ）を組み合わせることで、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス手法を実現します。<a href="/docs/ja/hnsw-sq.md">HNSW_SQ</a>と比較して、このインデックスタイプは、クエリ処理速度は低下し、インデックス構築時間も長くなりますが、同じ圧縮レベルでより高いリコール率を実現します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_PQ は、高速なグラフベースのナビゲーションを実現する<strong>HNSW</strong>と、効率的なベクトル圧縮を実現する<strong>PQ</strong>という 2 つのインデックス作成技術を組み合わせたものです。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSWは、各ノードがデータセット内のベクトルに対応する多層グラフを構築します。このグラフでは、ノードは類似度に基づいて接続されており、データ空間を迅速に探索することができます。階層構造により、検索アルゴリズムは候補となる近傍を絞り込むことができ、高次元空間での検索プロセスを大幅に高速化します。</p>
<p>詳細については、<a href="/docs/ja/hnsw.md">HNSW</a>を参照してください。</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQは、高次元ベクトルをより小さな部分ベクトルに分解し、それらを量子化・圧縮するベクトル圧縮技術です。この圧縮により、メモリ要件が劇的に削減され、距離計算が高速化されます。</p>
<p>詳細については、<a href="/docs/ja/ivf-pq.md#PQ">IVF_PQ</a>を参照してください。</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQは、HNSWとPQの長所を組み合わせ、効率的な近似最近傍検索を実現します。PQを使用してデータを圧縮し（これによりメモリ使用量を削減）、その後、これらの圧縮されたベクトル上にHNSWグラフを構築することで、候補の迅速な検索を可能にします。 検索中、アルゴリズムはオプションで、精度向上のために高精度データを使用して候補結果を絞り込むことができます。そのプロセスは以下の通りです：</p>
<ol>
<li><p><strong>データ圧縮</strong>：PQは各ベクトルを複数のサブベクトルに分割し、<code translate="no">m</code> （サブベクトル数）や<code translate="no">nbits</code> （サブベクトルあたりのビット数）といったパラメータによって制御される重心コードブックを用いて量子化を行います。</p></li>
<li><p><strong>グラフの構築</strong>：圧縮されたベクトルを用いて、HNSWグラフが構築されます。ベクトルが圧縮された形式で格納されるため、結果として得られるグラフは通常、サイズが小さく、必要なメモリも少なく、より高速に探索できるため、候補の検索ステップが大幅に高速化されます。</p></li>
<li><p><strong>候補の抽出</strong>：クエリが実行されると、アルゴリズムはHNSWグラフ内の圧縮データを使用して、候補となる近傍のプールを効率的に特定します。このグラフベースの検索により、検討すべきベクトルの数が大幅に削減され、総当たり検索と比較してクエリのレイテンシが改善されます。</p></li>
<li><p><strong>（オプション）結果の精緻化</strong>：精度を高めるために、以下のパラメータに基づいて初期の候補結果を精緻化することができます：</p>
<ul>
<li><p><code translate="no">refine</code>: この絞り込みステップを有効にするかどうかを制御します。「<code translate="no">true</code> 」に設定すると、システムはより高精度な表現または非圧縮表現を使用して距離を再計算します。</p></li>
<li><p><code translate="no">refine_type</code>: 精緻化中に使用されるデータの精度レベルを指定します（例：SQ6、SQ8、BF16）。<code translate="no">FP32</code> のような高精度な選択肢は、より正確な結果をもたらしますが、より多くのメモリを必要とします。この値は、元の圧縮データセットの精度を<code translate="no">sq_type</code> 以上上回っている必要があります。</p></li>
<li><p><code translate="no">refine_k</code>: 拡大倍率として機能します。例えば、トップ<em>k</em>が 100 で、<code translate="no">refine_k</code> が 2 の場合、システムは上位 200 件の候補を再ランク付けし、その中から最良の 100 件を返すことで、全体的な精度を向上させます。</p></li>
</ul></li>
</ol>
<p>パラメータおよび有効な値の完全な一覧については、「<a href="/docs/ja/hnsw-sq.md#Index-params">Index params</a>」を参照してください。</p>
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
    </button></h2><p>Milvusのベクトルフィールド上に<code translate="no">HNSW_PQ</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、およびインデックス用の追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><p><code translate="no">index_type</code>: 構築するインデックスのタイプ。この例では、値を<code translate="no">HNSW_PQ</code> に設定します。</p></li>
<li><p><code translate="no">metric_type</code>: ベクトル間の距離を計算するために使用されるメソッド。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> などがあります。詳細については、<a href="/docs/ja/metric.md">「メトリックタイプ</a>」を参照してください。</p></li>
<li><p><code translate="no">params</code>: インデックスの構築に関する追加の設定オプション。詳細については、「<a href="/docs/ja/hnsw-pq.md#Index-building-params">インデックス構築パラメータ</a>」を参照してください。</p></li>
</ul>
<p>インデックスパラメータの設定が完了したら、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドにインデックスパラメータを渡すことで、インデックスを作成できます。詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
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
    </button></h2><p>インデックスの構築とエンティティの挿入が完了すると、そのインデックスに対して類似度検索を実行できます。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><code translate="no">params</code>: インデックスでの検索に関する追加の設定オプション。詳細については、「<a href="/docs/ja/hnsw-pq.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</li>
</ul>
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
    </button></h2><p>このセクションでは、インデックスの構築およびインデックスでの検索に使用されるパラメータの概要を説明します。</p>
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
    </button></h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/hnsw-pq.md#Build-index">インデックスを構築する</a>際に設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>グラフ内の各ノードが持つことができる接続（またはエッジ）の最大数。これには、発信エッジと受信エッジの両方が含まれます。
このパラメータは、インデックスの構築と検索の両方に直接影響します。</p></td>
     <td><p><strong>型</strong>：整数
<strong>範囲</strong>：[2, 2048]</p>
<p><strong>デフォルト値</strong>：<code translate="no">30</code> （ノードあたり最大 30 の発信エッジおよび 30 の受信エッジ）</p></td>
     <td><p><code translate="no">M</code> を大きくすると、一般的に<strong>精度は向上しますが</strong>、<strong>メモリのオーバーヘッドが増加し</strong>、<strong>インデックスの構築と検索の両方が遅くなります</strong>。
 高次元データセットの場合や、高いリコール率が重要な場合は、<code translate="no">M</code> の値を大きくすることを検討してください。</p>
<p>メモリ使用量や検索速度が最優先事項である場合は、<code translate="no">M</code> の値を小さくすることを検討してください。</p>
<p>ほとんどの場合、[5, 100] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>インデックス構築時に接続の対象として検討される候補の近傍の数。
 新しい要素ごとに評価される候補のプールは大きくなりますが、実際に確立される接続の最大数は依然として<code translate="no">M</code> によって制限されます。</p></td>
     <td><p><strong>型</strong>: 整数
<strong>範囲</strong>: [1,<em>int_max</em>]</p>
<p><strong>デフォルト値</strong>：<code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> の値を大きくすると、より多くの潜在的な接続が検討されるため、通常、<strong>より正確なインデックス</strong>が作成されます。ただし、これにより<strong>インデックス作成時間が長くなり、</strong>構築中の<strong>メモリ使用量も増加します。</strong>
 特にインデックス作成時間がそれほど重要ではないシナリオでは、精度を向上させるために<code translate="no">efConstruction</code> の値を増やすことを検討してください。</p>
<p>リソースの制約が懸念される場合は、インデックスの構築を高速化するために、<code translate="no">efConstruction</code> の値を小さくすることを検討してください。</p>
<p>ほとんどの場合、[50, 500] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>量子化プロセス中に、各高次元ベクトルを分割する（量子化に使用される）サブベクトルの数。</p></td>
     <td><p><strong>型</strong>: 整数
<strong>範囲</strong>: [1, 65536]</p>
<p><strong>デフォルト値</strong>：なし</p></td>
     <td><p><code translate="no">m</code> の値を大きくすると精度は向上しますが、計算の複雑さとメモリ使用量も増加します。
適切な分解を行うためには、<code translate="no">m</code> はベクトルの次元 (<em>D</em>) の約数でなければなりません。一般的に推奨される値は<em>m = D/2</em> です。</p>
<p>ほとんどの場合、[D/8, D] の範囲内の値を設定することを推奨します。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>圧縮形式で各部分ベクトルの重心インデックスを表すために使用されるビット数です。これは各コードブックのサイズを直接決定します。
 各コードブックには<sup>2n ビットの</sup>重心が含まれます。例えば、<code translate="no">nbits</code> が 8 に設定されている場合、各部分ベクトルは 8 ビットの重心インデックスで表現されます。これにより、その部分ベクトルに対するコードブックには<sup>2⁸</sup>(256) 個の重心が含まれることになります。</p></td>
     <td><p><strong>型</strong>：整数
<strong>範囲</strong>：[1, 24]</p>
<p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> の値を大きくすると、より大きなコードブックが可能になり、元のベクトルをより正確に表現できる可能性があります。ただし、各インデックスを格納するためにより多くのビットを使用することになり、圧縮率が低下することにもなります。
 ほとんどの場合、[1, 16]の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>検索中に精緻化ステップを適用するかどうかを制御するブール値のフラグです。精緻化では、クエリベクトルと候補ベクトル間の正確な距離を計算することで、初期の結果を再ランク付けします。</p></td>
     <td><p><strong>型</strong>：ブール値
<strong>範囲</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>デフォルト値</strong>：<code translate="no">false</code></p></td>
     <td><p>高い精度が不可欠であり、検索時間が多少遅くなっても許容できる場合は、<code translate="no">true</code> に設定してください。速度を優先し、精度のわずかな低下が許容できる場合は、<code translate="no">false</code> を使用してください。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>精緻化処理中に使用されるデータの精度を決定します。
この精度は、圧縮ベクトルの精度（<code translate="no">m</code> および<code translate="no">nbits</code> パラメータで設定されたもの）よりも高くなければなりません。</p></td>
     <td><p><strong>型</strong>: 文字列
<strong>範囲</strong>: [<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p>
<p><strong>デフォルト値</strong>：なし</p></td>
     <td><p>メモリ消費量は増えますが、最高の精度を求める場合は `<code translate="no">FP32</code> ` を、圧縮率を重視する場合は `<code translate="no">SQ6</code>` または `<code translate="no">SQ8</code> ` を使用してください。`<code translate="no">BF16</code> ` および `<code translate="no">FP16</code> ` は、両者のバランスが取れた選択肢となります。</p></td>
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
    </button></h3><p>以下の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/hnsw-pq.md#Search-on-index">インデックスを検索する</a>際に設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>最近傍検索時の検索範囲を制御します。これは、潜在的な最近傍として訪問・評価されるノードの数を決定します。
このパラメータは検索プロセスにのみ影響し、グラフの最下層にのみ適用されます。</p></td>
     <td><p><strong>型</strong>：整数
<strong>範囲</strong>：[1,<em>int_max</em>]</p>
<p><strong>デフォルト値</strong>：<em>limit</em>（返す上位K個の最近傍）</p></td>
     <td><p><code translate="no">ef</code> の値を大きくすると、より多くの潜在的な近傍が検討されるため、一般的に<strong>検索精度が向上</strong>します。ただし、これに伴い<strong>検索時間も増加します</strong>。
 高いリコール率の達成が重要であり、検索速度がそれほど問題にならない場合は、<code translate="no">ef</code> の値を大きくすることを検討してください。</p>
<p>特に、精度が多少低下しても許容できるシナリオでは、検索速度を優先するために<code translate="no">ef</code> を減らすことを検討してください。</p>
<p>ほとんどの場合、[K, 10K] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>リファインメント（再ランク付け）段階で、要求された上位 K 件の結果に対して、追加で検討される候補の数を制御する拡大率です。</p></td>
     <td><p><strong>タイプ</strong>：浮動小数点
<strong>範囲</strong>：[1,<em>float_max</em>)</p>
<p><strong>デフォルト値</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> の値を大きくすると、リコール率と精度が向上しますが、検索時間とリソースの使用量も増加します。値が 1 の場合、絞り込みプロセスでは最初のトップ K 件の結果のみが考慮されます。</p></td>
   </tr>
</table>
