---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  IVF_PQインデックスは、高次元空間における近似最近傍探索のための量子化ベースのインデックス作成アルゴリズムである。グラフベースの手法ほど高速ではないが、IVF_PQは多くの場合メモリ使用量を大幅に削減できるため、大規模なデータセットに対して実用的な選択肢となる。
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_PQ</strong>インデックスは、高次元空間における近似最近傍探索のための<strong>量子化ベースの</strong>インデックス作成アルゴリズムである。グラフベースの手法ほど高速ではないが、<strong>IVF_PQは</strong>多くの場合メモリ使用量を大幅に削減できるため、大規模なデータセットに対して実用的な選択肢となる。</p>
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
    </button></h2><p><strong>IVF_PQは</strong> <strong>Inverted File with Product Quantizationの</strong>略で、効率的なベクトル検索と検索のためにインデックス作成と圧縮を組み合わせたハイブリッドアプローチである。IVF_PQは2つのコアコンポーネントを活用しています：<strong>反転ファイル(IVF)</strong>と<strong>積量子化(PQ)</strong>です。</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVFは、本の索引を作るようなものです。すべてのページ（私たちの場合はすべてのベクトル）をスキャンする代わりに、インデックスで特定のキーワード（クラスタ）を検索し、関連するページ（ベクトル）をすばやく見つけます。このシナリオでは、ベクターはクラスターにグループ化され、アルゴリズムはクエリーベクターに近いいくつかのクラスター内を検索します。</p>
<p>以下がその仕組みだ：</p>
<ol>
<li><p><strong>クラスタリング：</strong>ベクトルデータセットは、k-meansのようなクラスタリングアルゴリズムを使用して、指定された数のクラスタに分割されます。各クラスタにはセントロイド（クラスタを代表するベクトル）があります。</p></li>
<li><p><strong>割り当て：</strong>各ベクトルは、セントロイドが最も近いクラスタに割り当てられます。</p></li>
<li><p><strong>転置インデックス：</strong>各クラスタのセントロイドを、そのクラスタに割り当てられたベクトルのリストにマッピングするインデックスが作成されます。</p></li>
<li><p><strong>検索：</strong>最近傍を検索する場合、検索アルゴリズムはクエリベクトルとクラスタ重心を比較し、最も有望なクラスタを選択します。そして、その選択されたクラスタ内のベクトルに検索が絞り込まれます。</p></li>
</ol>
<p>技術的な詳細については、<a href="/docs/ja/ivf-flat.md">IVF_FLAT</a> を参照してください。</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>Product Quantization (PQ)</strong>は、高次元ベクトルの圧縮手法であり、高速な類似性検索を可能にすると同時に、ストレージ要件を大幅に削減します。</p>
<p>PQプロセスには以下の主要な段階があります：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>次元分解</strong>：このアルゴリズムは、各高次元ベクトルを<code translate="no">m</code> 等しい大きさの部分ベクトルに分解することから始まる。この分解により、元のD次元空間は<code translate="no">m</code> 分割された部分空間に変換され、各下部空間は<em>D/m</em>次元を含む。パラメータ<code translate="no">m</code> は分解の粒度を制御し、圧縮率に直接影響する。</p></li>
<li><p><strong>部分空間コードブック生成</strong>：それぞれの部分空間内で、アルゴリズムは<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-meansクラスタリングを</a>適用し、代表ベクトル（セントロイド）の集合を学習する。これらのセントロイドは集合的に、その部分空間のコードブックを形成する。各コードブックのセントロイドの数は、パラメータ<code translate="no">nbits</code> によって決定される。ここで、各コードブックは<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2nbits2^{</mn></msup></mrow><annotation encoding="application/x-tex">textit</annotation><mrow><msup><mn>{nbits}}</mn></msup></mrow></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits のセントロイドを含む。例えば、</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code> の場合、各コードブックは256個のセントロイドを含む。各セントロイドには<code translate="no">nbits</code> ビットの一意なインデックスが割り当てられる。</p></li>
<li><p><strong>ベクトル</strong> <strong>量子化</strong>：元のベクトル内の各サブベクトルに対して、PQは対応する部分空間内で、特定のメトリックタイプを使用して、その最も近いセントロイドを特定する。このプロセスは、各サブベクトルをコードブック内の最も近い代表ベクトルに効果的にマッピングする。完全な部分ベクトル座標を格納する代わりに、マッチしたセントロイドのインデックスのみが保持される。</p></li>
<li><p><strong>圧縮表現</strong>：最終的な圧縮表現は、各サブスペースから1つずつ、<code translate="no">m</code> 、<strong>PQコードと</strong>総称されるインデックスで構成される。このエンコーディングにより、<em>D×32</em>ビット（32ビット浮動小数点数を仮定）から<em>m×n</em>ビットへとストレージ要件が削減され、ベクトル距離の近似能力を維持しながら大幅な圧縮が達成されます。</p></li>
</ol>
<p>パラメータのチューニングと最適化の詳細については、<a href="/docs/ja/ivf-pq.md#Index-params">Index paramsを</a>参照してください。</p>
<div class="alert note">
<p>32ビット浮動小数点数を使用した<em>D = 128</em>次元のベクトルを考えます。PQ パラメータ<em>m = 64</em>（部分ベクトル）、<em>nbits = 8</em>（従って、<em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em>centroids per subspace）で、ストレージ要件を比較することができます：</p>
<ul>
<li><p>元のベクトル：128次元×32ビット＝4,096ビット</p></li>
<li><p>PQ圧縮ベクトル：64個の部分ベクトル×8ビット＝512ビット</p></li>
</ul>
<p>これは8倍の記憶容量の削減を意味する。</p>
</div>
<p><strong>PQによる距離計算</strong></p>
<p>クエリーベクターで類似検索を行う場合、PQは以下のステップで効率的な距離計算を可能にする：</p>
<ol>
<li><p><strong>クエリの前処理</strong></p>
<ul>
<li><p>クエリ・ベクトルは、元のPQ分解構造と一致するように、<code translate="no">m</code> サブ・ベクトルに分解される。</p></li>
<li><p>各クエリサブベクタと対応するコードブック（<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">nbits</annotation><mrow><msup><mn>2^{textit{nbits}}</mn></msup></mrow></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbitsのセントロイドを含む）について、すべてのセントロイドへの距離を計算し、格納する。</span></span></span></span></span></span></span></span></span></p></li>
<li><p>これは<code translate="no">m</code> ルックアップテーブルを生成し、各テーブルは<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits の距離を含む。</span></span></span></span></span></span></span></span></span></p></li>
</ul></li>
<li><p><strong>距離近似</strong></p>
<p>PQコードで表現されたデータベースベクトルに対して、クエリベクトルとの近似距離は以下のように計算される：</p>
<ul>
<li><p><code translate="no">m</code> の各サブベクトルについて、格納されているセントロイドインデックスを使用して、対応するルックアップテーブルから事前に計算された距離を取得する。</p></li>
<li><p>これらの<code translate="no">m</code> 距離を合計して、特定のメトリックタイプ（ユークリッド距離など）に基づく近似距離を得る。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>IVF PQ 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p><strong>IVF_PQ</strong>インデックスは、<strong>IVF</strong>と<strong>PQ の</strong>長所を組み合わせて検索を高速化する。この処理は2つのステップで行われる：</p>
<ol>
<li><p><strong>IVFによる粗いフィルタリング</strong>：IVFはベクトル空間をクラスタに分割し、検索範囲を狭める。データセット全体を評価する代わりに、このアルゴリズムはクエリーベクトルに最も近いクラスターのみに焦点を当てる。</p></li>
<li><p><strong>PQによるきめ細かな比較</strong>：選択されたクラスタ内で、PQは圧縮・量子化されたベクトル表現を用いて近似距離を高速に計算する。</p></li>
</ol>
<p><strong>IVF_PQ</strong>インデックスの性能は、IVFとPQの両アルゴリズムを制御するパラメータによって大きく影響を受けます。与えられたデータセットとアプリケーションに最適な結果を得るためには、これらのパラメータを調整することが極めて重要です。これらのパラメータの詳細と調整方法については、<a href="/docs/ja/ivf-pq.md#Index-params">Index paramsを</a>参照してください。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">IVF_PQ</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">IVF_PQ</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><code translate="no">m</code>:ベクトルを分割するサブベクトルの数。</li>
</ul>
<p><code translate="no">IVF_PQ</code> インデックスで使用可能な構築パラメータについては、<a href="/docs/ja/ivf-pq.md#Index-building-params">インデックス構築パラメータを</a>参照してください。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">params</code>:インデックスで検索するための追加構成オプション。</p>
<ul>
<li><code translate="no">nprobe</code>:検索するクラスタの数。</li>
</ul>
<p><code translate="no">IVF_PQ</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/ivf-pq.md#Index-specific-search-params">インデックス固有の検索パラメータを</a>参照してください。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/ivf-pq.md#Build-index">インデックスを構築する</a>際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>インデックス構築時にk-meansアルゴリズムを使用して作成するクラスタの数。</p></td>
     <td><p><strong>型</strong>：整数<strong>：</strong>[1, 65536]</p><p><strong>デフォルト値</strong>：<code translate="no">128</code></p></td>
     <td><p>より大きな<code translate="no">nlist</code> 値は、より洗練されたクラスタを作成することでリコールを向上させるが、インデックス構築時間を増加させる。データセットサイズと利用可能なリソースに基づいて最適化する。ほとんどの場合、この範囲内の値を設定することを推奨する：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>量子化処理時に各高次元ベクトルを分割するサブベクトルの数（量子化に使用）。</p></td>
     <td><p><strong>タイプ</strong>：整数<strong>：</strong>[1, 65536]</p><p><strong>デフォルト値</strong>：なし</p></td>
     <td><p><code translate="no">m</code> の値を大きくすると精度が向上するが、計算の複雑さとメモリ使用量も増加する。<code translate="no">m</code> は、適切な分解を保証するために、ベクトル次元<em>(D</em>)の約数でなければならない。一般的に推奨される値は<em>m = D/2</em> です。</p><p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>各サブベクトルの重心インデックスを圧縮形式で表現するためのビット数。各コードブックのサイズを直接決定する。各コードブックは$2^{textit{nbits}}$個のセントロイドを含む。例えば、<code translate="no">nbits</code> を8に設定すると、各サブベクトルは8ビットのセントロイドのインデックスで表現される。これにより、そのサブベクトルのコードブックには$2^8$ (256)個のセントロイドが存在することになる。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>：</strong>[1, 64]</p><p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> の値を大きくすると、コードブックが大きくなり、元のベクトルをより正確に表現できる可能性がある。しかし、これは各インデックスを格納するために多くのビットを使用することを意味し、結果として圧縮率が低くなります。ほとんどの場合、この範囲内の値を設定することをお勧めします：[1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<a href="/docs/ja/ivf-pq.md#Search-on-index">インデックスを検索する</a>際に<code translate="no">search_params.params</code> で設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th></th>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングサジェスチョン</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>候補を検索するクラスタの数。</p></td>
     <td><p><strong>型</strong>：整数<strong>Range</strong>：[1,<em>nlist］</em></p><p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>値を大きくすると、より多くのクラスターを検索できるようになり、検索範囲が広がることでリコールが向上しますが、その代償としてクエリの待ち時間が長くなります。速度と精度のバランスをとるために、<code translate="no">nlist</code> に比例して<code translate="no">nprobe</code> を設定します。</p><p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[1, nlist]。</p></td>
   </tr>
</table>
