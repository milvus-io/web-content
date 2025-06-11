---
id: hnsw.md
title: HNSW
summary: >-
  HNSWインデックスはグラフベースのインデックス作成アルゴリズムであり、高次元の浮動ベクトルを検索する際のパフォーマンスを向上させることができる。優れた検索精度と低レイテンシを提供する一方で、階層的なグラフ構造を維持するために高いメモリオーバーヘッドを必要とする。
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW</strong>インデックスは<strong>グラフベースの</strong>インデックス作成アルゴリズムであり、高次元の浮動ベクトルを検索する際のパフォーマンスを向上させることができる。<strong>優れた</strong>検索精度と<strong>低レイテンシを</strong>提供する一方で、階層グラフ構造を維持するために<strong>高い</strong>メモリオーバーヘッドを必要とする。</p>
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
    </button></h2><p>HNSW（Hierarchical Navigable Small World）アルゴリズムは、異なるズームレベルの地図のような多層グラフを構築する。<strong>最下層には</strong>すべてのデータ点が含まれ、<strong>上位層は</strong>下位層からサンプリングされたデータ点のサブセットで構成される。</p>
<p>この階層構造では、各レイヤーはデータポイントを表すノードを含み、それらの近接性を示すエッジで接続されている。上位レイヤーはターゲットに素早く近づくための長距離ジャンプを提供し、下位レイヤーは最も正確な結果を得るためのきめ細かい検索を可能にする。</p>
<p>その仕組みは以下の通りだ：</p>
<ol>
<li><p><strong>エントリーポイント</strong>：探索は、グラフ内のあらかじめ決められたノードである最上位レイヤーの固定されたエントリー・ポイントから開始される。</p></li>
<li><p><strong>貪欲な探索</strong>：アルゴリズムは、クエリーベクトルにこれ以上近づけなくなるまで、現在のレイヤーで最も近い近傍に貪欲に移動する。上位レイヤーは、下位レイヤーでより細かい探索を行うための潜在的なエントリーポイントを見つけるための粗いフィルターとして機能し、ナビゲーションの役割を果たす。</p></li>
<li><p><strong>レイヤーは下降する</strong>：現在のレイヤーで<strong>ローカル・ミニマムに</strong>到達すると、アルゴリズムは事前に確立されたコネクションを使用して下のレイヤーにジャンプダウンし、貪欲な探索を繰り返す。</p></li>
<li><p><strong>最終</strong> <strong>絞り込み</strong>：このプロセスは最下層に到達するまで続けられ、最終的な絞り込みステップで最近傍を特定する。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>HNSWの性能は、グラフの構造と探索動作の両方を制御するいくつかの重要なパラメータに依存する。これらには以下が含まれる：</p>
<ul>
<li><p><code translate="no">M</code>:各ノードがグラフの各階層で持つことのできる最大エッジ数または最大接続数。<code translate="no">M</code> が高いほどグラフは密になり、探索する経路が増えるため、想起率と精度が向上する。上の画像に示すように、<strong>M = 5は</strong>、HNSWグラフの各ノードが最大5つの他のノードに直接接続されていることを示す。これにより、ノードが他のノードに到達するための複数の経路を持つ、適度に密なグラフ構造が形成される。</p></li>
<li><p><code translate="no">efConstruction</code>:インデックス構築時に考慮される候補の数。一般に<code translate="no">efConstruction</code> が高いほど質の高いグラフになるが、構築により多くの時間を要する。</p></li>
<li><p><code translate="no">ef</code>:検索時に評価される近傍ノードの数。<code translate="no">ef</code> を増やすと、最近傍を見つける可能性は向上しますが、検索プロセスは遅くなります。</p></li>
</ul>
<p>これらの設定をニーズに合わせて調整する方法の詳細については、<a href="/docs/ja/hnsw.md#Index-params">Index paramsを</a>参照してください。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">HNSW</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">HNSW</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><p><code translate="no">M</code>:各ノードが接続できる近隣ノードの最大数。</p></li>
<li><p><code translate="no">efConstruction</code>:インデックス構築時に接続を考慮する近隣候補の数。</p></li>
</ul>
<p><code translate="no">HNSW</code> インデックスで使用可能な構築パラメータについては、<a href="/docs/ja/hnsw.md#Index-building-params">インデックス構築パラメータ</a> を参照してください。</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">params</code>:インデックスで検索するための追加構成オプション。</p>
<ul>
<li><code translate="no">ef</code>:検索時に考慮する近隣の数。</li>
</ul>
<p><code translate="no">HNSW</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/hnsw.md#Index-specific-search-params">インデックス固有の検索パラメータ</a> を参照。</p></li>
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
    </button></h2><p>このセクションでは、インデックスを構築し、インデックス上で検索を実行する際に使用するパラメータの概要を説明します。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/hnsw.md#Build-index">インデックスを構築する</a>際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>各ノードがグラフ内で持つことのできる接続（またはエッジ）の最大数。このパラメータはインデックス構築と検索の両方に直接影響する。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[2, 2048]</p><p><strong>デフォルト値</strong>:<code translate="no">30</code> (ノードあたり最大 30 の送信エッジと 30 の受信エッジ)</p></td>
     <td><p><code translate="no">M</code> を大きくすると、一般的に<strong>精度が高く</strong>なるが、<strong>メモリのオーバーヘッドが増加</strong>し、<strong>インデックス構築と検索の両方が遅くなる</strong>。高次元のデータセットや高い再現性が重要な場合は、<code translate="no">M</code> を増やすことを検討する。</p><p>メモリ使用量と検索速度を重視する場合は、<code translate="no">M</code> を減らすことを検討する。</p><p>ほとんどの場合、この範囲内の値を設定することを推奨する：[5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>インデックス構築時に接続を考慮する近隣候補の数。各新要素に対してより多くの候補が評価されますが、 実際に確立される接続の最大数は<code translate="no">M</code> によって制限されます。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[1,<em>int_max</em>] です。</p><p><strong>デフォルト値</strong>：<code translate="no">360</code></p></td>
     <td><p>より多くの接続候補が探索されるため、<code translate="no">efConstruction</code> を大きくすると、<strong>通常より正確なインデックスが</strong>得られる。しかし、これは<strong>インデックス作成時間の延長と、</strong>作成中の<strong>メモリ使用量の増加にも</strong>つながります。特にインデックス作成時間がそれほど重要でないシナリオでは、精度を向上させるために<code translate="no">efConstruction</code> を増加させることを検討してください。</p><p>リ ソ ース制約が懸念 さ れ る 場合には、<code translate="no">efConstruction</code> を減らして イ ンデ ッ ク ス作成を高速化す る こ と を検討 し て く だ さ い。</p><p>ほとんどの場合、この範囲内の値を設定することを推奨します：[50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<a href="/docs/ja/hnsw.md#Search-on-index">インデックスを検索する</a>際に<code translate="no">search_params.params</code> で設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングサジェスチョン</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>最近傍検索時の検索の幅を制御する。どれだけのノードが最近傍候補として訪問され、評価されるかを決定します。  このパラメータは検索プロセスのみに影響し、グラフの最下層にのみ適用される。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1,<em>int_max］</em></p><p><strong>デフォルト値</strong>:<em>limit</em>(TopK nearest neighbors to return)</p></td>
     <td><p><code translate="no">ef</code> を大きくすると、より多くの近傍候補が考慮されるため、一般に<strong>検索精度が高く</strong>なる。しかし、これは<strong>検索時間を増加させます</strong>。高い想起率を達成することが重要であり、検索速度があまり気にならない場合は、<code translate="no">ef</code> を増やすことを検討してください。</p><p>特に精度が多少低下しても構わないようなシナリオでは、<code translate="no">ef</code> を減らして、より高速な検索を優先させることを検討してください。</p><p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[K, 10K]。</p></td>
   </tr>
</table>
