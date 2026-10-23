---
id: hnsw.md
title: HNSW
summary: >-
  HNSWインデックスは、高次元の浮動小数点ベクトルを検索する際のパフォーマンスを向上させることができる、グラフベースのインデックス作成アルゴリズムです。優れた検索精度と低レイテンシを実現する一方で、階層的なグラフ構造を維持するために多大なメモリオーバーヘッドを必要とします。
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
    </button></h1><p><strong>HNSWインデックスは</strong>、高次元の浮動小数点ベクトルを検索する際のパフォーマンスを向上させることができる、<strong>グラフベースの</strong>インデックス作成アルゴリズムです。<strong>優れた</strong>検索精度と<strong>低レイテンシ</strong>を実現しますが、階層的なグラフ構造を維持するために<strong>多大な</strong>メモリオーバーヘッドを必要とします。</p>
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
    </button></h2><p>階層型ナビゲータブル・スモールワールド（HNSW）アルゴリズムは、ズームレベルが異なる地図のような多層グラフを構築します。<strong>最下層</strong>にはすべてのデータポイントが含まれ、<strong>上層は</strong>下層からサンプリングされたデータポイントのサブセットで構成されます。</p>
<p>この階層構造において、各層にはデータポイントを表すノードが含まれており、それらの近接度を示すエッジによって接続されています。上位の層はターゲットに素早く近づくための長距離ジャンプを可能にし、下位の層は最も正確な結果を得るためのきめ細かな検索を可能にします。</p>
<p>その仕組みは以下の通りです：</p>
<ol>
<li><p><strong>開始点</strong>：検索は、最上層にある固定の開始点（グラフ内のあらかじめ決められたノード）から開始されます。</p></li>
<li><p><strong>貪欲探索</strong>：アルゴリズムは、クエリベクトルにこれ以上近づけなくなるまで、現在の層で最も近い隣接ノードへと貪欲に移動します。上位層はナビゲーションの役割を果たし、下位層でのより詳細な探索に向けた潜在的なエントリポイントを見つけるための粗いフィルタとして機能します。</p></li>
<li><p><strong>層の下降</strong>：現在の層で<strong>局所最小値</strong>に達すると、アルゴリズムはあらかじめ確立された接続を利用して下の層へジャンプし、貪欲探索を繰り返します。</p></li>
<li><p><strong>最終的な精緻化</strong>：このプロセスは最下層に到達するまで続き、そこで最終的な精緻化ステップによって最近傍が特定される。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>HNSWの性能は、グラフの構造と探索挙動の両方を制御するいくつかの主要なパラメータに依存します。これらには以下が含まれます：</p>
<ul>
<li><p><code translate="no">M</code>: 階層の各レベルにおいて、グラフ内の各ノードが持つことができる辺または接続の最大数。<code translate="no">M</code> の値が大きいほど、グラフは高密度になり、探索可能な経路が増えるためリコール率と精度が向上する。ただし、接続が増えることでメモリ消費量が増加し、挿入時間が遅くなる。 上の図に示すように、<strong>M = 5</strong>とは、HNSW グラフ内の各ノードが、最大 5 つの他のノードと直接接続されていることを意味します。これにより、ノードが他のノードに到達するための複数の経路を持つ、適度に密なグラフ構造が形成されます。</p></li>
<li><p><code translate="no">efConstruction</code>: インデックス構築時に検討される候補の数。<code translate="no">efConstruction</code> の値が大きいほど、一般的にグラフの品質は向上しますが、構築に要する時間は長くなります。</p></li>
<li><p><code translate="no">ef</code>: 検索中に評価される近傍ノードの数。<code translate="no">ef</code> を増加させると、最寄りの近傍ノードが見つかる確率は高まりますが、検索処理が遅くなります。</p></li>
</ul>
<p>これらの設定をニーズに合わせて調整する方法の詳細については、「<a href="/docs/ja/hnsw.md#Index-params">インデックスパラメータ</a>」を参照してください。</p>
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
    </button></h2><p>この例では、<code translate="no">client</code> という名前の接続済みクライアントと、<code translate="no">your_collection_name</code> という名前の既存のコレクションを使用します。このコレクションには、<code translate="no">your_vector_field_name</code> という名前の5次元ベクトルフィールドが含まれています。</p>
<p><code translate="no">add_index()</code> を使用してインデックス・パラメータを定義し、<code translate="no">create_index()</code> を使用してインデックスを構築します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

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

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では：</p>
<ul>
<li><p><code translate="no">index_type</code>: 構築するインデックスのタイプ。この例では、値を<code translate="no">HNSW</code> に設定します。</p></li>
<li><p><code translate="no">metric_type</code>: ベクトル間の距離を計算するために使用されるメソッド。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、および<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">「メトリックタイプ</a>」を参照してください。</p></li>
<li><p><code translate="no">params</code>: インデックスの構築に関する追加の設定オプション。</p>
<ul>
<li><p><code translate="no">M</code>: 各ノードが接続できる近傍ノードの最大数。</p></li>
<li><p><code translate="no">efConstruction</code>: インデックス構築時に接続の対象として検討される候補となる近傍の数。</p></li>
</ul>
<p>この例では、<code translate="no">M=64</code> および<code translate="no">efConstruction=100</code> をチューニング用のオーバーライドとして設定しています。デフォルト値および許容範囲については、「<a href="/docs/ja/hnsw.md#Index-building-params">インデックス構築パラメータ</a>」を参照してください。</p></li>
</ul>
<p>コレクションとそのインデックスを同時に作成するには、<code translate="no">create_collection()</code> にインデックスパラメータを渡します。詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
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
    </button></h2><p>インデックスの構築とエンティティの挿入が完了したら、コレクションを読み込み、そのベクトルフィールドを検索します。通常のkNN検索を行う場合は、<code translate="no">ef</code> を少なくとも<code translate="no">limit</code> に設定してください。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><p><code translate="no">params</code>: インデックスでの検索に関する追加の設定オプション。</p>
<ul>
<li><code translate="no">ef</code>: 検索時に考慮する近傍の数。</li>
</ul>
<p><code translate="no">HNSW</code> インデックスで使用可能な検索パラメータの詳細については、「<a href="/docs/ja/hnsw.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</p></li>
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
    </button></h2><p>以下の表に、インデックスの構築および検索に関するパラメータを一覧表示します。省略したパラメータについては、サーバー設定によってデフォルト値が上書きされる場合があります。</p>
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
    </button></h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/hnsw.md#Build-index">インデックスを構築する</a>際に設定可能なパラメータを一覧表示したものです。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの推奨事項</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>グラフ内の各ノードが持つことができる接続（エッジ）の最大数。これには、発信エッジと受信エッジの両方が含まれます。このパラメータは、インデックスの構築と検索の両方に直接影響します。</p></td>
     <td><p><strong>型</strong>：整数<strong>範囲</strong>：[2, 2048]</p><p><strong>デフォルト値</strong>：<code translate="no">30</code> （ノードあたり最大 30 の発信エッジおよび 30 の受信エッジ）</p></td>
     <td><p><code translate="no">M</code> を大きくすると、一般的に<strong>精度は向上しますが</strong>、<strong>メモリ負荷が増加し</strong>、<strong>インデックスの構築と検索の両方が遅くなります</strong>。高次元のデータセットや、高いリコール率が不可欠な場合は、<code translate="no">M</code> の値を大きくすることを検討してください。</p><p>メモリ使用量や検索速度が最優先事項である場合は、<code translate="no">M</code> の値を小さくすることを検討してください。</p><p>ほとんどの場合、[5, 100] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>インデックス構築時に接続の対象として検討される候補の近傍の数。新しい要素ごとに評価される候補のプールは大きくなりますが、実際に確立される接続の最大数は、依然として<code translate="no">M</code> によって制限されます。</p></td>
     <td><p><strong>型</strong>：整数<strong>範囲</strong>：[1,<em>int_max</em>]</p><p><strong>デフォルト値</strong>：<code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> の値を大きくすると、探索される潜在的な接続が増えるため、通常は<strong>より正確なインデックス</strong>が得られます。ただし、これにより<strong>インデックス作成時間が長くなり、</strong>作成中の<strong>メモリ使用量も増加します。</strong>特にインデックス作成時間がそれほど重要でないシナリオでは、精度を向上させるために<code translate="no">efConstruction</code> の値を増やすことを検討してください。</p><p>リソースの制約が懸念される場合は、<code translate="no">efConstruction</code> を小さくしてインデックスの構築を高速化することを検討してください。</p><p>ほとんどの場合、[50, 500] の範囲内の値を設定することをお勧めします。</p></td>
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
    </button></h3><p>次の表は、<a href="/docs/ja/hnsw.md#Search-on-index">インデックスでの検索時に</a> <code translate="no">search_params.params</code> で設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>調整のヒント</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>最近傍検索時の検索範囲を制御します。これは、潜在的な最近傍として訪問・評価されるノードの数を決定します。このパラメータは検索プロセスにのみ影響し、グラフの最下層にのみ適用されます。</p></td>
     <td><p><strong>型</strong>：整数<strong>範囲</strong>：[1,<em>int_max</em>]</p><p><strong>デフォルト値</strong>：通常のkNN検索では<code translate="no">max(limit, 16)</code> 、範囲検索では<code translate="no">512</code> 。</p><p>通常のkNN検索の場合、明示的に指定された<code translate="no">ef</code> は、<code translate="no">limit</code> （返す最近傍の数）以上でなければなりません。</p></td>
     <td><p><code translate="no">ef</code> を大きくすると、より多くの潜在的な近傍が考慮されるため、一般的に<strong>検索精度が向上</strong>します。ただし、これにより<strong>検索時間も増加します</strong>。高いリコール率の達成が重要で、検索速度はそれほど問題にならない場合は、<code translate="no">ef</code> の増加を検討してください。</p><p>特に、精度のわずかな低下が許容できるシナリオでは、検索速度を優先するために<code translate="no">ef</code> を小さくすることを検討してください。</p><p>ほとんどの場合、[K, 10K] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
</table>
