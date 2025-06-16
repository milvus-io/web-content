---
id: diskann.md
title: DISKANN
summary: >-
  データセットに数十億から数兆のベクトルが含まれるような大規模なシナリオでは、標準的なインメモリインデクシング手法（HNSW、IVF_FLATなど）は、メモリの制限により、しばしば追いつくことができません。DISKANNは、データセットサイズが利用可能なRAMを超える場合でも、高い検索精度と速度を維持することで、これらの課題に対処するディスクベースのアプローチを提供します。
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>データセットに数十億から数兆のベクトルが含まれるような大規模なシナリオでは、標準的なインメモリインデクシング手法（<a href="/docs/ja/hnsw.md">HNSW</a>、<a href="/docs/ja/ivf-flat.md">IVF_FLATなど</a>）は、メモリの制限により、しばしば追いつくことができません。<strong>DISKANNは</strong>、データセットサイズが利用可能なRAMを超える場合でも、高い検索精度と速度を維持することで、これらの課題に対処するディスクベースのアプローチを提供します。</p>
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
    </button></h2><p><strong>DISKANNは</strong>、効率的なベクトル探索のための2つの主要な技術を組み合わせています：</p>
<ul>
<li><p><strong>Vamana Graph</strong>-<strong>ディスクベースの</strong> <strong>グラフベースの</strong>インデックスで、検索時に効率的なナビゲーションを行うためにデータポイント（またはベクトル）を連結します。</p></li>
<li><p><strong>積量子化（PQ）</strong>- ベクトルのサイズを縮小し、ベクトル間の近似距離計算を迅速に行うための<strong>メモリ内</strong>圧縮手法。</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">インデックス構築</h3><h4 id="Vamana-graph" class="common-anchor-header">バマナグラフ</h4><p>VamanaグラフはDISKANNのディスクベース戦略の中心です。構築中も構築後もメモリ上に完全に存在する必要がないため、非常に大きなデータセットを扱うことができます。</p>
<p>次の図は、Vamanaグラフの構築方法を示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>初期ランダム接続：</strong>各データ点（ベクトル）はグラフのノードとして表現される。これらのノードは最初はランダムに接続され、密なネットワークを形成する。通常、1つのノードは約500のエッジ（または接続）から始まり、幅広い接続性を持つ。</p></li>
<li><p><strong>効率化のための洗練：</strong>初期のランダム・グラフは、検索効率を高めるために最適化プロセスを経ます。これには2つの重要なステップがある：</p>
<ul>
<li><p><strong>冗長なエッジの刈り込み：</strong>冗長なエッジの刈り込み：このアルゴリズムは、ノード間の距離に基づいて不要な接続を削除します。このステップは、より質の高いエッジを優先する。</p>
<p><code translate="no">max_degree</code> パラメータは、ノードあたりの最大エッジ数を制限します。<code translate="no">max_degree</code> が高いほどグラフが密になり、より関連性の高い近傍を発見できる可能性がある（より高い想起）が、メモリ使用量と検索時間が増加する。</p></li>
<li><p><strong>戦略的ショートカットの追加：</strong>Vamanaは長距離エッジを導入し、ベクトル空間内で離れたデータポイント同士を接続する。これらのショートカットにより、検索はグラフを素早く飛び越え、中間ノードを迂回し、ナビゲーションを大幅に高速化する。</p>
<p><code translate="no">search_list_size</code> パラメータは、グラフ精密化処理の幅を決定する。<code translate="no">search_list_size</code> を高くすると、構築中の近傍探索が拡張され、最終的な精度が向上しますが、インデックス構築時間が長くなります。</p></li>
</ul></li>
</ol>
<p>パラメータチューニングの詳細については、<a href="/docs/ja/diskann.md#diskann-params">DISKANN paramsを</a>参照してください。</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANNは<strong>PQを使って</strong>高次元ベクトルをより小さな表現<strong>（PQコード</strong>）に圧縮し、それをメモリに保存して近似距離計算を高速に行います。</p>
<p><code translate="no">pq_code_budget_gb_ratio</code> パラメータは、これらの PQ コードを格納するためのメモリフットプリントを管理します。これは、ベクターの合計サイズ（ギガバイト単位）とPQコードの格納に割り当てられたスペースの比率を表します。実際のPQコードバジェット（ギガバイト単位）は、次の式で計算できます：</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>ここで</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> はベクターの合計サイズ（ギガバイト単位）です。</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> はユーザー定義の比率で、PQコード用に予約された総データ・サイズの割合を表します。このパラメータは、検索精度とメモリリソースのトレードオフを可能にします。パラメータチューニングの詳細については、<a href="/docs/ja/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a> を参照。</p></li>
</ul>
<p>基礎となるPQメソッドの技術的な詳細については、<a href="/docs/ja/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQを</a>参照してください。</p>
<h3 id="Search-process" class="common-anchor-header">検索プロセス</h3><p>インデックス（ディスク上のVamanaグラフとメモリ上のPQコード）が構築されると、DISKANNは以下のようにANN検索を実行する：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>クエリーとエントリーポイント：</strong>最も近い近傍を見つけるためにクエリーベクトルが提供される。DISKANNは、Vamanaグラフの選択されたエントリーポイント（多くの場合、データセットのグローバルセントロイドに近いノード）から開始する。グローバルセントロイドは全ベクトルの平均を表し、これはグラフを走査して希望する近傍を見つける距離を最小化するのに役立つ。</p></li>
<li><p><strong>近傍探索：</strong>アルゴリズムは、現在のノードのエッジから潜在的な近傍候補（図中の赤丸）を収集し、メモリ内のPQコードを活用して、これらの候補とクエリーベクトル間の距離を近似する。これらの潜在的な隣接候補は、Vamanaグラフのエッジを介して選択されたエントリーポイントに直接接続されているノードです。</p></li>
<li><p><strong>正確な距離計算のためのノードの選択：</strong>近似結果から、最も有望な近隣ノードのサブセット（図中の緑色の丸）が、圧縮されていない元のベクトルを使用して正確な距離評価のために選択されます。これにはディスクからデータを読み込む必要があり、時間がかかります。DISKANNはこの精度とスピードの微妙なバランスをコントロールするために2つのパラメータを使用します：</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>:探索の幅を制御する比率で、近傍探索のためにいくつの近傍候補が並列に選択されるかを決定する。<code translate="no">beam_width_ratio</code> を大きくすると探索範囲が広くなり、精度が向上する可能性がありますが、計算コストとディスクI/Oが増加します。ビーム幅、つまり選択されるノードの数は、以下の式で決定されます：<code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>:頻繁にアクセスされるディスクデータをキャッシュするために割り当てられるメモリの割合。このキャッシングはディスクI/Oを最小化するのに役立ち、データがすでにメモリ内にあるため、繰り返しの検索がより速くなります。</p></li>
</ul>
<p>パラメータチューニングの詳細については、<a href="/docs/ja/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configsを</a>参照してください。</p></li>
<li><p><strong>反復探索：</strong>十分な数の近傍が見つかるまで、近似評価（PQを使用）と正確なチェック（ディスクから元のベクトルを使用）を繰り返しながら、候補の集合を繰り返し改良します。</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">MilvusでDISKANNを有効にする<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトでは、Milvusの<strong>DISKANNは</strong>無効になっており、RAMに快適に収まるデータセットのために、インメモリインデックスの速度を優先しています。しかし、大規模なデータセットを扱う場合や、<strong>DISKANNの</strong>スケーラビリティとSSD最適化を利用したい場合は、簡単に有効にすることができます。</p>
<p>MilvusでDISKANNを有効にする方法は以下の通りです：</p>
<ol>
<li><p><strong>Milvus設定ファイルの更新</strong></p>
<ol>
<li><p>Milvusの設定ファイルを探します<strong>。</strong>(このファイルの見つけ方の詳細については、Milvusの設定に関するドキュメントを参照してください)。</p></li>
<li><p><code translate="no">queryNode.enableDisk</code> パラメータを見つけ、その値を<code translate="no">true</code> に設定する：</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>DISKANN 用ストレージの最適化</strong></p></li>
</ol>
<p>DISKANNで最高のパフォーマンスを得るためには、Milvusのデータを高速なNVMe SSDに保存することをお勧めします。ここでは、Milvusスタンドアロンとクラスタの両方について、この方法を説明します：</p>
<ul>
<li><p><strong>Milvus Standaloneの場合</strong></p>
<ul>
<li><p>Milvusコンテナ内のNVMe SSDにMilvusデータディレクトリをマウントします。これは、<code translate="no">docker-compose.yml</code> ファイルまたは他のコンテナ管理ツールを使用して行うことができます。</p></li>
<li><p>たとえば、NVMe SSDが<code translate="no">/mnt/nvme</code> にマウントされている場合、<code translate="no">docker-compose.yml</code> の<code translate="no">volumes</code>セクションを次のように更新します：</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvusクラスタ</strong></p>
<ul>
<li><p>QueryNodeとIndexNodeコンテナの両方で、MilvusデータディレクトリをNVMe SSDにマウントします。これは、コンテナ・オーケストレーション・セットアップで実現できます。</p></li>
<li><p>両方のノードタイプでNVMe SSDにデータをマウントすることで、検索とインデックス作成の両方の操作で高速な読み取りと書き込み速度を確保できます。</p></li>
</ul></li>
</ul>
<p>これらの変更を行ったら、Milvusインスタンスを再起動して設定を有効にします。これで、MilvusはDISKANNの機能を活用して大規模なデータセットを処理し、効率的でスケーラブルなベクトル検索を実現します。</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">DISKANNの設定<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANNのパラメータは主に2つの方法で設定することができます：</p>
<ul>
<li><p><strong>Milvus設定ファイル：</strong>Milvus設定ファイルを通してDISKANNパラメータを調整します。この方法は、Milvusインスタンスの一般的な設定オプションを設定するのに適しています。</p></li>
<li><p><strong>Milvus SDK：</strong>Milvus SDKを使用して、インデックス作成や検索操作中にDISKANNパラメータを微調整します。これにより、よりきめ細かな制御と特定のユースケースに基づいた動的なパラメータ調整が可能になります。</p></li>
</ul>
<div class="alert note">
<p>SDKによる設定は、設定ファイルで定義された設定よりも優先されるため、特定のアプリケーションやデータセットに対して柔軟な制御が可能です。</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Milvus設定ファイル</h3><p><code translate="no">milvus.yaml</code> 、DISKANNパラメータを設定する例を示します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">SDKコンフィギュレーション</h3><p>Milvus SDKを使用したDISKANNパラメータの設定例です。</p>
<h4 id="Build" class="common-anchor-header">構築</h4><p>Milvusでベクトルフィールドの<code translate="no">IVF_FLAT</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、およびインデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>インデックスパラメータが設定されると、<code translate="no">create_index()</code> メソッドを直接使用するか、<code translate="no">create_collection</code> メソッドでインデックスパラメータを渡してインデックスを作成することができます。詳細は、<a href="/docs/ja/create-collection.md">Create Collection</a> を参照してください。</p>
<h4 id="Search" class="common-anchor-header">検索</h4><p>インデックスが構築され、エンティティが挿入されると、インデックスで類似検索を実行できます。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN パラメータ<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN のパラメータを微調整することで、DISKANN の動作を特定のデータセットや検索ワークロードに合わせて調整し、速度、精度、メモリ使用量の適切なバランスを取ることができます。</p>
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>これらのパラメータは、DISKANNインデックスがどのように構築されるかに影響します。これらのパラメータを調整することで、インデックスサイズ、構築時間、検索品質に影響を与えることができます。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Vamanaグラフで各データポイントが持つことのできる接続（エッジ）の最大数を制御する。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1, 512]</p>
<p><strong>デフォルト値</strong>：<code translate="no">56</code></p></td>
     <td><p>値を大きくするとグラフが密になり、リコール（より関連性の高い結果を見つけること）が増加する可能性がありますが、メモリ使用量とビルド時間も増加します。 
 ほとんどの場合、この範囲内の値を設定することをお勧めします：[10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>グラフ構築時に各データポイントで考慮される近傍候補の数を決定します。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>：</strong>[1,<em>int_max］</em></p>
<p><strong>デフォルト値</strong>：<code translate="no">100</code></p></td>
     <td><p>値を大きくすると、より包括的なグラフになり、検索品質が向上する可能性があるが、構築時間が長くなる。 
 ほとんどの場合、この範囲内の値を設定することを推奨する：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>インデックス構築時にグラフの頻繁にアクセスされる部分をキャッシュするために割り当てられるメモリ量を制御する。</p></td>
     <td><p><strong>タイプ</strong>Float<strong>範囲</strong>：[0.0, 0.3)</p>
<p><strong>デフォルト値</strong>：<code translate="no">0.10</code></p></td>
     <td><p>高い値を指定すると、キャッシュのためにより多くのメモリが割り当てられ、ディスクI/Oが大幅に削減されるが、より多くのシステムメモリを消費する。ほとんどの場合、この範囲内の値を設定することをお勧めします：[0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>非圧縮データのサイズと比較したPQコード（データポイントの圧縮表現）のサイズを制御する。</p></td>
     <td><p><strong>タイプ</strong>：Float<strong>範囲</strong>：（0.0, 0.25］</p>
<p><strong>デフォルト値</strong>：<code translate="no">0.125</code></p></td>
     <td><p>比率が高いほど、PQ コードに割り当てるメモリの割合が大きくなり、元のベクトルに関するより多くの情報が効果的に格納されるため、より正確な検索結果が得られる。比率を低くすると、メモリ使用量は減りますが、PQコードの保持する情報が少なくなるため、精度が犠牲になる可能性があります。この方法は、メモリ制約が懸念されるシナリオに適しており、より大きなデータセットのインデックス作成が可能になる可能性があります。</p>
<p>ほとんどの場合、この範囲内の値を設定することを推奨する: (0.0625, 0.25])</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>これらのパラメータはDISKANNがどのように検索を行うかに影響します。これらを調整することで、検索速度、待ち時間、リソースの使用量に影響を与えることができます。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>利用可能なCPUコア数に対する並列ディスクI/Oリクエストの最大数を決定することにより、検索中の並列性の程度を制御する。</p></td>
     <td><p><strong>タイプ</strong>Float<strong>レンジ</strong>：[1, max(128 / CPU数, 16)] です。</p>
<p><strong>デフォルト値</strong>：<code translate="no">4.0</code></p></td>
     <td><p>値を高くすると並列性が高まり、強力な CPU と SSD を持つシステムでの検索を高速化できる。ほとんどの場合、この範囲内の値を設定することを推奨する：[1.0, 4.0].</p></td>
   </tr>
</table>
