---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQは、階層的ナビゲータブル・スモールワールド（HNSW）グラフとスカラー量子化（SQ）を組み合わせたもので、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス手法を実現しています。
  標準的な HNSW と比較して、このインデックスタイプは、インデックス構築時間がわずかに増加する一方で、高いクエリ処理速度を維持します。
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQは</strong>、階層的ナビゲータブル・スモールワールド（HNSW）グラフとスカラー量子化（SQ）を組み合わせたもので、サイズと精度のトレードオフを制御可能な高度なベクトルインデックス手法を実現します。 標準的な<a href="/docs/ja/hnsw.md">HNSW</a> と比較して、このインデックスタイプは、インデックス構築時間がわずかに増加する一方で、高いクエリ処理速度を維持します。</p>
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
    </button></h2><p>HNSW_SQ は、高速なグラフベースのナビゲーションを実現する<strong>HNSW</strong>と、効率的なベクトル圧縮を実現する<strong>SQ</strong>という 2 つのインデックス作成技術を組み合わせたものです。</p>
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
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQは、ベクトルをより少ないビット数で表現することで圧縮する手法です。例えば：</p>
<ul>
<li><p><strong>SQ8は</strong>8ビットを使用し、値を256段階にマッピングします。詳細については、<a href="/docs/ja/ivf-sq8.md#SQ8">IVF_SQ8</a>を参照してください。</p></li>
<li><p><strong>SQ6は</strong>、各浮動小数点値を6ビットで表現し、64の離散レベルを生成します。</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>この精度の低減により、データの基本的な構造を維持しつつ、メモリ使用量を大幅に削減し、計算を高速化します。</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>極めて高速なクエリと最小限のメモリ使用量が求められるシナリオ向けに、Milvus は 4 ビットの均一スカラー量子化である<code translate="no">SQ4U</code> を導入しました。これは、各次元の浮動小数点値を<strong>4 ビットの</strong>符号なし整数に圧縮する、積極的なスカラー量子化の一種です。</p>
<p>SQ4U の「U」は「Uniform（均一）」を表しています。通常、各次元ごとに最小値と最大値を個別に計算する非均一スカラー量子化（次元ごとの量子化）とは異なり、SQ4U<strong>はグローバルな均一量子化戦略</strong>を採用しています。</p>
<ol>
<li><p><strong>グローバル統計</strong>：システムは、ベクトル（またはベクトルセグメント全体）<strong>のすべての次元に</strong>適用される<strong>単一の</strong>最小値<code translate="no">vmin</code> と<strong>単一の</strong>値の範囲<code translate="no">vdiff</code> を算出します。</p></li>
<li><p><strong>均一マッピング</strong>：グローバルな値の範囲は、16の等間隔に分割されます。ベクトル内のすべての浮動小数点値は、どの次元に属するかに関係なく、これらの共有パラメータを使用して4ビットの整数（0～15）にマッピングされます。</p></li>
</ol>
<p><strong>パフォーマンス上の利点：</strong></p>
<ul>
<li><p><strong>8倍の圧縮率：</strong> <code translate="no">FP32</code> と比較してサイズを8倍、<code translate="no">SQ8</code> と比較して2倍に縮小し、ベクトル検索におけるボトルネックとなりがちなメモリ帯域幅への負荷を大幅に軽減します。</p></li>
<li><p><strong>SIMD最適化：</strong>このコンパクトな構造により、最新のCPU（AVX2/AVX-512）は1サイクルあたりにより多くの次元を処理できるようになります。特に重要なのは、グローバルパラメータを使用することで、距離計算中に変動するスケール値やオフセット値をロードする必要がなくなり、命令パイプラインを完全に飽和状態に保てる点です。</p></li>
<li><p><strong>キャッシュ効率：</strong>ベクトルサイズが小さくなることで、CPUキャッシュにより多くのデータが収まり、メモリアクセスによるレイテンシが低減されます。</p></li>
</ul>
<div class="alert note">
<p>グローバルパラメータの共有により、SQ4Uは正規化されたデータ、または各次元で値の分布が均一なデータセットにおいて最高の性能を発揮します。</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQは、HNSWとSQの長所を組み合わせることで、効率的な近似最近傍検索を実現します。その仕組みは以下の通りです：</p>
<ol>
<li><p><strong>データ圧縮：</strong>SQは、<code translate="no">sq_type</code> （例：SQ6やSQ8）を使用してベクトルを圧縮し、メモリ使用量を削減します。この圧縮により精度は低下する可能性がありますが、システムがより大規模なデータセットを処理できるようになります。</p></li>
<li><p><strong>グラフの構築：</strong>圧縮されたベクトルを使用してHNSWグラフを構築します。データが圧縮されているため、生成されるグラフはサイズが小さくなり、検索速度が向上します。</p></li>
<li><p><strong>候補の抽出：</strong>クエリベクトルが指定されると、アルゴリズムは圧縮されたデータを使用して、HNSWグラフから候補となる近傍のプールを迅速に特定します。</p></li>
<li><p><strong>（オプション）結果の精緻化：</strong>精度を高めるために、以下のパラメータに基づいて初期の候補結果を精緻化することができます：</p>
<ul>
<li><p><code translate="no">refine</code>: この絞り込みステップを有効にするかどうかを制御します。「<code translate="no">true</code> 」に設定すると、システムはより高精度な表現または非圧縮表現を使用して距離を再計算します。</p></li>
<li><p><code translate="no">refine_type</code>: 精緻化中に使用されるデータの精度レベルを指定します（例：SQ6、SQ8、BF16）。<code translate="no">FP32</code> のような高精度な選択肢は、より正確な結果をもたらしますが、より多くのメモリを必要とします。この値は、<code translate="no">sq_type</code> によって設定された元の圧縮データセットの精度を上回っている必要があります。</p></li>
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
    </button></h2><p>Milvusのベクトルフィールド上に<code translate="no">HNSW_SQ</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、およびインデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では：</p>
<ul>
<li><p><code translate="no">index_type</code>: 構築するインデックスのタイプ。この例では、値を<code translate="no">HNSW_SQ</code> に設定します。</p></li>
<li><p><code translate="no">metric_type</code>: ベクトル間の距離を計算するために使用されるメソッド。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> などがあります。詳細については、<a href="/docs/ja/metric.md">「メトリックタイプ</a>」を参照してください。</p></li>
<li><p><code translate="no">params</code>: インデックスの構築に関する追加の設定オプション。詳細については、「<a href="/docs/ja/hnsw-sq.md#Index-building-params">インデックス構築パラメータ</a>」を参照してください。</p></li>
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
<li><code translate="no">params</code>: インデックスでの検索に関する追加の設定オプション。詳細については、「<a href="/docs/ja/hnsw-sq.md#Index-specific-search-params">インデックス固有の検索パラメータ</a>」を参照してください。</li>
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
    </button></h2><p>このセクションでは、インデックスの構築およびインデックスに対する検索に使用されるパラメータの概要を説明します。</p>
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
    </button></h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">インデックスを構築する</a>際に設定可能なパラメータの一覧です。</p>
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
     <td><p>グラフ内の各ノードが持つことができる接続（またはエッジ）の最大数。これには、発信エッジと受信エッジの両方が含まれます。</p><p>このパラメータは、インデックスの構築と検索の両方に直接影響します。</p></td>
     <td><p><strong>タイプ</strong>: 整数</p><p><strong>範囲</strong>：[2, 2048]</p><p><strong>デフォルト値</strong>：<code translate="no">30</code> （ノードあたり最大 30 の発信エッジおよび 30 の受信エッジ）</p></td>
     <td><p><code translate="no">M</code> を大きくすると、一般的に<strong>精度は高くなりますが</strong>、<strong>メモリのオーバーヘッドが増加し</strong>、<strong>インデックスの構築と検索の両方が遅くなります</strong>。</p><p>高次元データセットの場合や、高いリコール率が重要な場合は、<code translate="no">M</code> の値を大きくすることを検討してください。</p><p>メモリ使用量や検索速度が最優先事項である場合は、<code translate="no">M</code> の値を小さくすることを検討してください。</p><p>ほとんどの場合、[5, 100] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>インデックス構築時に、接続の対象として検討される候補の近傍の数。</p><p>新しい要素ごとに評価される候補のプールは大きくなりますが、実際に確立される接続の最大数は、<code translate="no">M</code> によって制限されます。</p></td>
     <td><p><strong>タイプ</strong>：整数</p><p><strong>範囲</strong>：[1,<em>int_max</em>]</p><p><strong>デフォルト値</strong>：<code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> の値を大きくすると、探索される潜在的な接続が増えるため、通常<strong>はより正確なインデックス</strong>が生成されます。ただし、これにより<strong>インデックス作成時間が長くなり、</strong>作成中の<strong>メモリ使用量も増加します</strong>。</p><p>特にインデックス作成時間がそれほど重要ではないシナリオでは、精度を向上させるために<code translate="no">efConstruction</code> の値を大きくすることを検討してください。</p><p>リソースの制約が懸念される場合は、インデックスの構築を高速化するために<code translate="no">efConstruction</code> の値を小さくすることを検討してください。</p><p>ほとんどの場合、[50, 500] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>ベクトルを圧縮するためのスカラー量子化方式を指定します。各オプションは、圧縮率と精度のバランスが異なります。</p><ul><li><p><code translate="no">SQ4U</code>: 4 ビットの均一量子化を使用してベクトルをエンコードします。このモードは、最高の速度と圧縮率を実現します。</p></li><li><p><code translate="no">SQ6</code>: 6 ビットの整数を使用してベクトルをエンコードします。</p></li><li><p><code translate="no">SQ8</code>: 8 ビットの整数を使用してベクトルをエンコードします。</p></li><li><p><code translate="no">BF16</code>: Bfloat16 形式を使用します。</p></li><li><p><code translate="no">FP16</code>: 標準の 16 ビット浮動小数点形式を使用します。</p></li></ul></td>
     <td><p><strong>型</strong>: 文字列</p><p><strong>範囲</strong>：[<code translate="no">SQ4U</code>,<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> ]</p><p><strong>デフォルト値</strong>：<code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> の選択は、具体的なアプリケーションの要件によって異なります。<code translate="no">SQ4U</code> は、速度とメモリ効率を最大化するために選択されます。<code translate="no">SQ6</code> または<code translate="no">SQ8</code> は、パフォーマンスのバランスを重視する場合に適しています。一方、精度が最優先される場合は、<code translate="no">BF16</code> または<code translate="no">FP16</code> が適している可能性があります。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>検索中に精緻化ステップを適用するかどうかを制御するブール値のフラグです。精緻化では、クエリベクトルと候補ベクトル間の正確な距離を計算することで、初期の結果を再ランク付けします。</p></td>
     <td><p><strong>型</strong>: ブール値</p><p><strong>範囲</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p><p><strong>デフォルト値</strong>:<code translate="no">false</code></p></td>
     <td><p>高い精度が不可欠であり、検索時間が多少遅くなっても許容できる場合は、<code translate="no">true</code> に設定します。速度を優先し、精度のわずかな低下が許容できる場合は、<code translate="no">false</code> を使用します。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>再ランク付けに使用されるデータの精度を決定します。</p><p>この精度は、圧縮ベクトルの精度（<code translate="no">sq_type</code> で設定された値）よりも高く設定する必要があり、再ランク付けされたベクトルの精度とメモリ使用量の両方に影響を与えます。</p></td>
     <td><p><strong>型</strong>：文字列</p><p><strong>範囲</strong>：[<code translate="no">SQ6</code> 、<code translate="no">SQ8</code> 、<code translate="no">BF16</code> 、<code translate="no">FP16</code> 、<code translate="no">FP32</code> ]</p><p><strong>デフォルト値</strong>：なし</p></td>
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
    </button></h3><p>以下の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/hnsw-sq.md#Search-on-index">インデックスを検索する</a>際に設定可能なパラメータの一覧です。省略したパラメータについては、サーバー設定によってデフォルト値が上書きされる場合があります。</p>
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
     <td><p>最近傍検索時の検索範囲を制御します。これにより、潜在的な最近傍として訪問・評価されるノードの数が決定されます。 </p><p>このパラメータは検索プロセスにのみ影響し、グラフの最下層にのみ適用されます。</p></td>
     <td><p><strong>型</strong>: 整数</p><p><strong>範囲</strong>：[1,<em>int_max</em>]</p><p><strong>デフォルト値</strong>：通常の kNN 検索の場合は<code translate="no">max(limit, 16)</code> 、範囲検索の場合は<code translate="no">512</code> 。</p><p>通常の kNN 検索の場合、明示的に指定する<code translate="no">ef</code> は、<code translate="no">limit</code> （返す最近傍の数）以上である必要があります。</p></td>
     <td><p><code translate="no">ef</code> を大きくすると、より多くの潜在的な近傍が考慮されるため、一般的に<strong>検索精度が向上</strong>します。ただし、これにより<strong>検索時間も長くなります</strong>。</p><p>高いリコール率の達成が重要であり、検索速度はそれほど問題にならない場合は、<code translate="no">ef</code> の値を大きくすることを検討してください。</p><p>特に、精度のわずかな低下が許容できるシナリオでは、検索速度を優先するために<code translate="no">ef</code> を小さくすることを検討してください。</p><p>ほとんどの場合、[K, 10K] の範囲内の値を設定することをお勧めします。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>リファインメント段階で、要求された上位 K 件の結果に対して、さらにいくつの候補を調査するかを制御する拡大率。</p></td>
     <td><p><strong>タイプ</strong>：浮動小数点</p><p><strong>範囲</strong>：[1,<em>float_max</em>)</p><p><strong>デフォルト値</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> の値を大きくすると、リコール率と精度が向上する可能性がありますが、検索時間とリソースの使用量も増加します。値が 1 の場合、絞り込み処理では最初のトップ K 件の結果のみが考慮されます。</p></td>
   </tr>
</table>
