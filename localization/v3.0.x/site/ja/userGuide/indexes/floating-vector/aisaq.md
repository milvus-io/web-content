---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQはディスクベースのベクトルインデックスで、DISKANNを拡張し、RAMの制限を超えることなく億単位のデータセットを扱うことができます。圧縮されたベクトルをメモリ上に保持するDISKANNとは異なり、AISAQは全てのデータをディスク上に保持し、性能とストレージコストのバランスを取るために2つのモードを提供します。
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQは<a href="/docs/ja/diskann.md">DISKANNを</a>拡張し、最小限のDRAMフットプリントで10億スケールのデータセットを扱えるようにしたディスクベースのベクトルインデックスです。</p>
<p>圧縮ベクトルをメモリ上に保持するDISKANNとは異なり、AISAQはすべてのデータ構造をSSD上に保持する「ニアゼロDRAMアーキテクチャ」で設計されています。</p>
<p>AISAQは、パフォーマンスとストレージコストのバランスを取るためのオペレーションモードを提供しながら、標準的なサーバーを使用して超大規模データベースを実行することを可能にします。</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQの仕組み<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>上の図は、<strong>DISKANN</strong>、<strong>AISAQ-Performance</strong>、<strong>AISAQ-Scaleの</strong>ストレージレイアウトを比較したもので、データ（生ベクトル、エッジリスト、PQコード）がRAMとディスクの間でどのように分配されるかを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>AisaqとDiskannの比較</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">ファウンデーションDISKANNのまとめ<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>DISKANNでは、生のベクトルとエッジリストはディスクに保存され、PQ圧縮されたベクトルはメモリ（DRAM）に保存される。</p>
<p>DISKANNがノード（例えば、<em>ベクトル0</em>）にトラバースするとき：</p>
<ul>
<li><p>生のベクトル<strong>（raw_vector_0</strong>）とそのエッジリスト<strong>（edgelist_0</strong>）をディスクからロードします。</p></li>
<li><p>エッジリストは、次に訪問する隣接ノード（この例ではノード2、3、5）を示します。</p></li>
<li><p>生ベクトルは、クエリーベクトルとの正確な距離を計算するために使用されます。</p></li>
<li><p>メモリ上のPQデータは、次の探索を導くための近似距離フィルタリングに使用される。</p></li>
</ul>
<p>PQデータはすでにDRAMにキャッシュされているため、各ノードへのアクセスに必要なディスクI/Oは1回のみであり、適度なメモリ使用量で高いクエリー速度を実現する。</p>
<p>これらのコンポーネントとパラメータの詳細については、「<a href="/docs/ja/diskann.md">DISKANN</a>」を参照してください。</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQの動作モード<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQは、2つの異なるユースケースに対応するために、2つの動作モードを提供します：</p>
<p>パフォーマンスモード：オンライン・セマンティック検索など、低レイテンシーと高スループットを必要とするアプリケーションに最適化されています。</p>
<p>スケールモード：RAGやオフラインのセマンティック検索など、レイテンシの制約がより緩やかなアプリケーションに最適化されており、データセットをコスト効率よく超大規模に拡張することができます。</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ-performanceモード</h4><p><strong>AISAQ-performanceは</strong>、データのコロケーションと冗長性により低IOPSを維持しながら、PQデータをメモリからディスクに移動することで、「Near-Zero DRAM footprint」を実現します。</p>
<ul>
<li><p>各ノードの生ベクトル、エッジ・リスト、および隣接ノードのPQデータは、ディスク上にまとめて保存されます。</p></li>
<li><p>このレイアウトにより、あるノード（例：ベクター0）を訪問しても、ディスクI/Oは1回で済みます。</p></li>
<li><p>PQデータは複数のノードの近傍に冗長に保存されるため、インデックスファイルのサイズは大幅に増加し、より多くのディスクスペースを消費します。</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQスケールモード</h4><p><strong>AISAQ-scaleは</strong>、ターゲットアプリケーションの性能要件を満たしながら、ディスク使用量を削減することに重点を置いています。</p>
<p>このモードでは</p>
<ul>
<li><p>PQデータは、冗長性を持たせることなく、ディスク上に別々に保存されます。</p></li>
<li><p>この設計はインデックスサイズを最小化しますが、グラフのトラバーサル時にI/O操作が増えることになります。</p></li>
<li><p>IOPSオーバーヘッドを軽減するために、AISAQは2つの最適化を導入している：</p>
<ul>
<li><p>データの局所性を向上させるために、PQベクトルを優先順位でソートするリアレンジアルゴリズム。</p></li>
<li><p>頻繁にアクセスされるPQデータをキャッシュするDRAM内のPQキャッシュ（pq_read_page_cache_size）。</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">構成例<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQパラメータ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQは、DISKANNからいくつかのパラメータ（<code translate="no">max_degree</code> 、<code translate="no">search_list_size</code> 、<code translate="no">pq_code_budget_gb_ratio</code> ）を継承している。</p>
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
    </button></h3><p>これらのパラメータはAISAQインデックスの構築方法に影響します。これらを調整することで、インデックスサイズ、構築時間、検索品質に影響を与えることができます。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Vamana グラフで各データポイントが持つことのできる接続 (エッジ) の最大数を制御する。</p></td>
     <td><p><strong>タイプ</strong>整数</p><p><strong>範囲</strong>[1, 512]</p><p><strong>デフォルト値</strong>：<code translate="no">56</code></p></td>
     <td><p>より高い値は、より密なグラフを作成し、潜在的にリコールを増加させる（より関連性の高い結果を見つける）が、メモリ使用量とビルド時間を増加させる。ほとんどの場合、この範囲内の値を設定することをお勧めします：[10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>インデックス構築中、このパラメータは各ノードの最近傍を検索する際に使用される候補プールのサイズを定義します。グラフに追加される各ノードに対して、アルゴリズムはこれまでに見つかった最良の候補のリストをsearch_list_sizeで保持します。このリストが改善されなくなった時点で、近傍探索は停止する。この最終的な候補プールから、最終的な辺を形成するために最大次数のノードが選択される。</p></td>
     <td><p><strong>型は</strong>整数</p><p><strong>範囲</strong>[1, 512]</p><p><strong>デフォルト値</strong>：<code translate="no">100</code></p></td>
     <td><p>search_list_sizeを大きくすると、各ノードの真の最近傍を見つける可能性が高くなり、より高品質なグラフと検索パフォーマンス（リコール）を向上させることができる。しかし、その代償としてインデックス構築時間が大幅に長くなります。常にmax_degree以上の値に設定すべきである。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>インデックスノードごとにインラインで保存されるPQベクトルの数（IOを減らすため、ノードがアクセスされたときに読み込まれる）</p></td>
     <td><p><strong>型</strong>：整数</p><p><strong>範囲</strong>： [0, max_degree[0,<em>max_degree］</em></p><p><strong>デフォルト値</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> の値を大きくするとパフォーマンスが向上するが、ディスク容量が増加する。</p><p>AISAQをスケール・モードで使用する場合は、<code translate="no">inline_pq</code>=0に設定する。</p><p><code translate="no">inline_pq</code>=-1 に設定すると、スケール・モードの AISAQ をさらに最適化するために、インデックス内の未使用スペースが自動的に PQ ベクターで満たされます。</p><p>パフォーマンス・モードのAISAQでは、<code translate="no">inline_pq</code>=<em>max</em>_degreeに設定します。</p><p><code translate="no">inline_pq</code> 0から<em>max_degreeの</em>間で設定することで、パフォーマンスとディスクスペース消費のバランスを調整することができます。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>PQベクトルデータ構造を再整理して、データの局所性を向上させ、探索中のディスクアクセスを削減する（パフォーマンスモードでは無視される）。</p></td>
     <td><p><strong>タイプ</strong>ブール値</p><p><strong>範囲</strong>：[true, false[true, false］</p><p><strong>デフォルト値</strong>：<code translate="no">true</code></p></td>
     <td><p>trueの場合、メモリとインデックス構築時間のわずかな増加で、検索中のIOを減らす。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>検索エントリーポイントの選択を最適化するための候補エントリーポイントの数。</p></td>
     <td><p><strong>型</strong>：整数</p><p><strong>範囲</strong>： [0, 1000[0, 1000]</p><p><strong>デフォルト値</strong>：<code translate="no">100</code></p></td>
     <td><p>高い値は、より近いエントリーポイントから検索を開始することにより、検索時間を短縮することができる。</p><p>大きなセグメントではより大きな値を設定する（例えば 10M ベクトル以上では 1000 を使用）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>PQ コード（データポイントの圧縮表現）のサイズを、非圧縮データのサイズと比較して制御する。</p></td>
     <td><p><strong>タイプ</strong>Float</p><p><strong>範囲</strong>：（0.0、0.25］</p><p><strong>デフォルト値</strong>：<code translate="no">0.125</code></p></td>
     <td><p>比率が高いほど、より正確な検索結果が得られ、元のベクトルに関するより多くの情報が効果的に保存されますが、検索時の計算複雑度が増します。</p><p>ほとんどの場合、この範囲内の値（0.0417, 0.25）を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>インデックスに格納された高精度ベクトル（再順位付けに使用）のPQコードのサイズを、非圧縮データのサイズと比較して制御します。</p></td>
     <td><p><strong>タイプ</strong>浮動小数点数</p><p><strong>範囲</strong>： [0, 0.25[0, 0.25]</p><p><strong>デフォルト値</strong>：<code translate="no">0.25</code></p></td>
     <td><p>デフォルト値0.25では、ベクトルは元のサイズの25%に量子化され(4倍圧縮)、精度の影響を最小限に抑えながらディスクの占有量を減らします。</p><p>再順位付けのためにディスク・インデックスに全精度のベクトルを保存するには、値を0に設定します。値を大きくすると再現率は高くなるが、ディスク使用量は増加する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>DRAM内のPQベクトル・キャッシュ・サイズ（バイト）。PQベクトルキャッシュはインデックスロード時にロードされ、IOを減らすために検索時に使用される(パフォーマンスモードでは無視される)。</p></td>
     <td><p><strong>タイプ</strong>：整数</p><p><strong>範囲</strong>： [0, 107374182[0, 1073741824]</p><p><strong>デフォルト値</strong>：<code translate="no">0</code></p></td>
     <td><p>より大きなキャッシュはクエリ・パフォーマンスを向上させますが、DRAM使用量を増加させます。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>頻繁にアクセスされるインデックス・ノードのキャッシュに使用する DRAM の量を制御します。</p><p>このキャッシュはインデックスロード時にロードされ、IOを減らすために検索時に使用される。</p></td>
     <td><p><strong>タイプ</strong>Float</p><p><strong>範囲</strong>：[0.0, 0.3[0.0, 0.3)</p><p><strong>デフォルト値</strong>：<code translate="no">0</code></p></td>
     <td><p>高い値を指定すると、キャッシュのためにより多くのメモリを割り当て、ディスクIOを減らすが、より多くのシステムメモリを消費する。低い値を指定すると、キャッシュに使用するメモリが少なくなり、ディスクアクセスの必要性が増す可能性がある。</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">インデックス検索パラメータ<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>これらのパラメータはAISAQがどのように検索を行うかに影響します。これらを調整することで、検索速度、待ち時間、リソース使用量に影響を与えることができます。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>検索操作中、このパラメータはアルゴリズムがグラフを横断する際に維持する候補プールのサイズを決定します。値を大きくすると、真の最近傍を見つける可能性が高くなりますが（より高いリコール）、検索の待ち時間も長くなります。</p></td>
     <td><p><strong>タイプ</strong>整数</p><p><strong>範囲</strong>：[topk, int32_max] とする。</p><p><strong>デフォルト値</strong>：<code translate="no">16</code></p></td>
     <td><p>性能と精度のバランスをとるために、この値は検索したい結果の数 (top_k) と同じか、それより少し大きく設定することを推奨する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>インデックスノードを読み込むための並列ディスクI/O要求の最大数を決定することにより、検索中の並列性の程度を制御する。</p></td>
     <td><p><strong>型は</strong>整数</p><p><strong>範囲</strong>[1, 16]</p><p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>値を大きくすると並列性が高まり、強力なCPUとSSDを持つシステムで検索を高速化できる。ただし、値を高く設定しすぎると、リソースが過剰に競合する可能性がある。</p><p>ほとんどの場合、値を 2 に設定することを推奨する。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>隣接する PQ ベクトルのグループを読み取るための並列ディスク I/O 要求の最大数を決定することで、検索中の並列性の程度を制御します（パフォーマンスモードでは無視されます）。</p></td>
     <td><p><strong>タイプ</strong>整数</p><p><strong>範囲</strong>：[1, 4] &lt;=<em>beamwidth</em>でなければならない。</p><p><strong>デフォルト値</strong>：<code translate="no">1</code></p></td>
     <td><p>値を大きくすると並列性が高まり、強力なCPUやSSDを搭載したシステムで検索を高速化できる。しかし、この値を高く設定しすぎると、隣接する PQ ベクトルグループが最大 max_degree ベクトルを含む可能性があるため、過剰なリソース競合につながる可能性があります。</p><p>ほとんどの場合、値を 1 に設定することを推奨します。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>検索スレッドごとの DRAM 内の PQ リード・キャッシュ・サイズ（バイト）。これは、PQ ベクターを含む、頻繁にアクセスされるデータ・ページをキャッシュする（パフォーマンス・モードでは無視され、rearrange が true の場合にのみ適用される）。</p><p>PQ リード・キャッシュ・メモリはすべての AISAQ セグメントで再利用される。</p></td>
     <td><p><strong>型</strong>：整数</p><p><strong>範囲</strong>：[0, 33554432[0, 33554432]</p><p><strong>デフォルト値</strong>：<code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>キャッシュを大きくすると、クエリのパフォーマンスは向上しますが、DRAM 使用量は増加します。</p><p>推奨値は、小セグメント（1 M ベクタ）で 2 MiB、中セグメント（50 M ベクタ）で 5 MiB、大セグメント（250 M ベクタ）で 10 MiB です。</p></td>
   </tr>
</table>
