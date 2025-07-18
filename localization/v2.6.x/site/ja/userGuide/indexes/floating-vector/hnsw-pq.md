---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQは、HNSW（Hierarchical Navigable Small World）グラフとPQ（Product
  Quantization）を活用し、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス作成手法を実現する。HNSW_SQと比較して、このインデックスタイプは、クエリ処理速度の低下とインデックス構築時間の延長はあるものの、同じ圧縮レベルでより高い想起率を実現している。
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
    </button></h1><p><strong>HNSW_PQは</strong>、HNSW（Hierarchical Navigable Small World）グラフとPQ（Product Quantization）を活用し、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス作成手法を実現する。<a href="/docs/ja/hnsw-sq.md">HNSW_SQと</a>比較して、このインデックスタイプは、クエリ処理速度の低下とインデックス構築時間の延長はあるものの、同じ圧縮レベルでより高い想起率を実現している。</p>
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
    </button></h2><p>HNSW_PQは2つのインデックス作成技術を組み合わせたものである：<strong>HNSWは</strong>グラフベースの高速ナビゲーションを、<strong>PQは</strong>効率的なベクトル圧縮を実現する。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSWは、各ノードがデータセット中のベクトルに対応する多層グラフを構築する。このグラフでは、ノードは類似性に基づいて接続され、データ空間を高速にトラバースできる。階層構造により、検索アルゴリズムは近傍候補を絞り込むことができ、高次元空間での検索プロセスが大幅に高速化される。</p>
<p>詳細は<a href="/docs/ja/hnsw.md">HNSWを</a>参照。</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>PQはベクトル圧縮技術で、高次元ベクトルをより小さなサブベクトルに分解し、それを量子化して圧縮します。この圧縮により、メモリ要件が劇的に削減され、距離計算が高速化される。</p>
<p>詳細は<a href="/docs/ja/ivf-pq.md#PQ">IVF_PQを</a>参照。</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ</h3><p>HNSW_PQはHNSWとPQの長所を組み合わせ，効率的な近似最近傍探索を可能にする．PQを用いてデータを圧縮し（これによりメモリ使用量を削減する）、圧縮されたベクトル上にHNSWグラフを構築することで、候補の迅速な検索を可能にする。検索中、アルゴリズムは精度を向上させるために、オプションでより精度の高いデータを使用して候補結果を絞り込むことができます。以下はそのプロセスです：</p>
<ol>
<li><p><strong>データ圧縮</strong>：PQは各ベクトルを複数のサブ・ベクトルに分割し、<code translate="no">m</code> （サブ・ベクトル数）や<code translate="no">nbits</code> （サブ・ベクトルあたりのビット数）などのパラメータで制御されたセントロイドのコードブックを使用して量子化する。</p></li>
<li><p><strong>グラフの構築</strong>：圧縮されたベクトルは、HNSWグラフの構築に使用される。ベクターは圧縮された形で保存されるため、結果として得られるグラフは一般的に小さくなり、必要なメモリ量も少なく、より高速に走査できるようになる。</p></li>
<li><p><strong>候補の検索</strong>：クエリが実行されると、アルゴリズムはHNSWグラフの圧縮データを使用して、候補となる隣接候補のプールを効率的に特定する。このグラフベースの検索により、考慮すべきベクトル数が大幅に削減され、総当たり検索に比べてクエリの待ち時間が改善される。</p></li>
<li><p><strong>(オプション）結果の絞り込み</strong>：最初の候補結果は、以下のパラメータに基づいて、より精度の高いものに改良することができます：</p>
<ul>
<li><p><code translate="no">refine</code>:この絞り込みステップを有効にするかどうかを制御します。<code translate="no">true</code> に設定すると、システムはより高精度または非圧縮の表現を使用して距離を再計算します。</p></li>
<li><p><code translate="no">refine_type</code>:精密化時に使用するデータの精度レベルを指定します（SQ6、SQ8、BF16 など）。<code translate="no">FP32</code> のような高精度の選択は、より正確な結果をもたらしますが、より多くのメモリを必要とします。これは、元の圧縮データセットの精度を<code translate="no">sq_type</code> だけ上回る必要があります。</p></li>
<li><p><code translate="no">refine_k</code>:倍率として機能する。例えば、トップ<em>kが</em>100で<code translate="no">refine_k</code> が2の場合、システムはトップ200の候補を再ランク付けし、ベスト100を返し、全体的な精度を向上させる。</p></li>
</ul></li>
</ol>
<p>パラメータの完全なリストと有効な値については、<a href="/docs/ja/hnsw-sq.md#Index-params">Index params</a> を参照してください。</p>
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
    </button></h2><p>Milvusでベクトルフィールドに<code translate="no">HNSW_PQ</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
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
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">HNSW_PQ</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。詳細は「<a href="/docs/ja/hnsw-pq.md#Index-building-params">インデックス構築パラメータ</a>」を参照。</p></li>
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
<p>この構成では</p>
<ul>
<li><code translate="no">params</code>:インデックスで検索するための追加構成オプション。詳細については、「<a href="/docs/ja/hnsw-pq.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</li>
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
    </button></h2><p>このセクションでは、インデックスを構築し、インデックス上で検索を実行するために使用されるパラメータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表に、<code translate="no">params</code> で<a href="/docs/ja/hnsw-pq.md#Build-index">インデックスを構築</a>する際に設定できるパラメータを列挙します。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>各ノードがグラフ内で持つことのできる接続(またはエッジ)の最大数。 このパラメータはインデックスの構築と検索の両方に直接影響する。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[2, 2048]</p>
<p><strong>デフォルト値</strong>:<code translate="no">30</code> (ノードあたり最大 30 の送信エッジと 30 の受信エッジ)</p></td>
     <td><p><code translate="no">M</code> を大きくすると、一般的に<strong>精度が高く</strong>なるが、<strong>メモリ・オーバーヘッドが増加</strong>し、<strong>インデックス構築と検索の両方が遅くなる</strong>。 次元性の高いデータセットや、高い再現性が重要な場合は、<code translate="no">M</code> を大きくすることを検討する。</p>
<p>メモリ使用量と検索速度が最大の関心事である場合は、<code translate="no">M</code> を減らすことを検討する。</p>
<p>ほとんどの場合、この範囲内の値を設定することを推奨する：[5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>インデックス構築時に接続を考慮する近隣候補の数。 より多くの候補が新しい要素ごとに評価されますが、 実際に確立される接続の最大数は<code translate="no">M</code> によって制限されます。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[1,<em>int_max</em>] です。</p>
<p><strong>デフォルト値</strong>：<code translate="no">360</code></p></td>
     <td><p>より多くの接続候補が探索されるため、<code translate="no">efConstruction</code> を大きくすると、<strong>通常より正確なインデックスが</strong>得られる。しかし、これは<strong>インデックス作成時間の延長と、</strong>作成中の<strong>メモリ使用量の増加にも</strong>つながります。 特にインデックス作成時間がそれほど重要でないシナリオでは、精度を向上させるために<code translate="no">efConstruction</code> を増加させることを検討してください。</p>
<p>リ ソ ース制約が懸念 さ れ る 場合には、<code translate="no">efConstruction</code> を減らして イ ンデ ッ ク ス作成を高速化す る こ と を検討 し て く だ さ い。</p>
<p>ほとんどの場合、この範囲内の値を設定することを推奨します：[50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>量子化処理中に各高次元ベクトルを分割する（量子化に使用する）サブベクトルの数。</p></td>
     <td><p><strong>タイプ</strong>：整数<strong>：</strong>[1, 65536]</p>
<p><strong>デフォルト値</strong>：なし</p></td>
     <td><p><code translate="no">m</code> の値を大きくすると精度が向上するが、計算の複雑さとメモリ使用量も増加する。<code translate="no">m</code> は、適切な分解を保証するために、ベクトル次元<em>(D</em>)の約数でなければならない。一般的に推奨される値は<em>m = D/2</em> です。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>各サブベクトルの重心インデックスを圧縮形式で表現するためのビット数。各コードブックは $2^{textit{nbits}}$ 個のセントロイドを含む。例えば、<code translate="no">nbits</code> を8に設定すると、各サブベクトルは8ビットのセントロイドのインデックスで表現される。これにより、そのサブベクトルのコードブックには$2^8$ (256)個のセントロイドが存在することになる。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>：</strong>[1, 64]</p>
<p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> の値を大きくすると、コードブックが大きくなり、元のベクトルをより正確に表現できる可能性がある。ほとんどの場合、この範囲内の値を設定することを推奨します：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>検索時に絞り込みステップを適用するかどうかを制御するブーリアン・フラグ。refinementは、クエリベクタと候補の間の正確な距離を計算することにより、最初の結果を再ランク付けすることを含む。</p></td>
     <td><p><strong>タイプ</strong>：ブール値の<strong>範囲</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]。</p>
<p><strong>デフォルト値</strong>：<code translate="no">false</code></p></td>
     <td><p>高い精度が必須で、検索時間が多少遅くても許容できる場合は、<code translate="no">true</code> に設定する。スピードを優先し、精度の多少の妥協が許容できる場合は<code translate="no">false</code> を使用する。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>この精度は，圧縮ベクトル（<code translate="no">m</code> と<code translate="no">nbits</code> パラメータで設定）の精度よりも高くなければならない。</p></td>
     <td><p><strong>型</strong>：String<strong>Range:[</strong> <code translate="no">SQ6</code><strong>,</strong> <code translate="no">SQ8</code><strong>,</strong> <code translate="no">BF16</code><strong>,</strong> <code translate="no">FP16</code><strong>,</strong> <code translate="no">FP32</code> <strong>]。</strong></p>
<p><strong>デフォルト値</strong>：なし</p></td>
     <td><p>より高いメモリコストで最大の精度を得るには<code translate="no">FP32</code> を使用し、より良い圧縮を得るには<code translate="no">SQ6</code>/<code translate="no">SQ8</code> を使用する。<code translate="no">BF16</code> と<code translate="no">FP16</code> は、バランスの取れた代替案を提供する。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<a href="/docs/ja/hnsw-pq.md#Search-on-index">インデックスを検索する</a>際に<code translate="no">search_params.params</code> で設定可能なパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>最近傍検索時の検索の幅を制御します。どれだけのノードが最近傍候補として訪問され、評価されるかを決定します。 
 このパラメータは検索プロセスのみに影響し、グラフの最下層にのみ適用される。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1,<em>int_max］</em></p>
<p><strong>デフォルト値</strong>:<em>limit</em>(TopK nearest neighbors to return)</p></td>
     <td><p><code translate="no">ef</code> を大きくすると、より多くの近傍候補が考慮されるため、一般的に<strong>検索精度が高く</strong>なる。しかし、これはまた<strong>検索時間を増加させます</strong>。 高い想起を達成することが重要であり、検索速度があまり気にならない場合は、<code translate="no">ef</code> を増加させることを検討してください。</p>
<p>特に精度が多少低下しても構わないようなシナリオでは、<code translate="no">ef</code> を減らして、より高速な検索を優先させることを検討してください。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>要求された上位K個の結果に対して、絞り込み(再ランク付け)段階でどれだけの余分な候補を調べるかを制御する倍率。</p></td>
     <td><p><strong>タイプ</strong>：Float<strong>範囲</strong>：[1,<em>float_max</em>)</p>
<p><strong>デフォルト値</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> の値を高くすると、再現率と精度が向上するが、検索時間とリソースの使用量も増加する。1の値は、絞り込み処理が最初の上位K個の結果のみを考慮することを意味する。</p></td>
   </tr>
</table>
