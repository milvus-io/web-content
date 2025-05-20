---
id: index-with-gpu.md
order: 3
summary: このガイドでは、MilvusでGPUをサポートしてインデックスを構築し、検索パフォーマンスを向上させる方法を説明します。
title: GPUによるインデックス
---
<h1 id="Index-with-GPU" class="common-anchor-header">GPUによるインデックス<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、MilvusでGPUをサポートしたインデックスを構築する手順の概要を説明します。MilvusがサポートするGPUインデックスの種類については、<a href="/docs/ja/v2.4.x/gpu_index.md">GPUインデックスを</a>ご参照ください。</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">GPUメモリ制御のためのMilvus設定の構成<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusはGPUメモリを割り当てるためにグローバルグラフィックメモリプールを使用します。</p>
<p><a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus設定</a>ファイルで<code translate="no">initMemSize</code> と<code translate="no">maxMemSize</code> の2つのパラメータをサポートしています。プールサイズは最初は<code translate="no">initMemSize</code> に設定され、この制限を超えると自動的に<code translate="no">maxMemSize</code> に拡張されます。</p>
<p>デフォルトの<code translate="no">initMemSize</code> は Milvus 起動時に利用可能な GPU メモリの 1/2 で、デフォルトの<code translate="no">maxMemSize</code> は利用可能なすべての GPU メモリと等しくなります。</p>
<p>Milvus 2.4.1（バージョン2.4.1を含む）までは、Milvusは統合GPUメモリプールを使用していました。2.4.1以前のバージョン（バージョン2.4.1を含む）では、両方の値を0に設定することが推奨されていました。</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus2.4.1以降では、GPUメモリプールは検索中の一時的なGPUデータにのみ使用されます。そのため、2048と4096に設定することを推奨します。</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例は、異なるタイプのGPUインデックスを構築する方法を示しています。</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">インデックスパラメータの準備</h3><p>GPU インデックスパラメータを設定する際に、<strong>index_type</strong>、<strong>metric_type</strong>、<strong>params</strong> を定義します：</p>
<ul>
<li><p><strong>index_type</strong><em>(文字列</em>)：index_type (string): ベクトル探索を加速するために使用するインデックスのタイプ。有効なオプションは<strong>GPU_CAGRA</strong>、<strong>GPU_IVF_FLAT</strong>、<strong>GPU_IVF_PQ</strong>、<strong>GPU_BRUTE_FORCE</strong>です。</p></li>
<li><p><strong>metric_type</strong><em>（文字列</em>）：ベクトルの類似度を測定するために使用されるメトリクスのタイプ。有効なオプションは<strong>IP</strong>と<strong>L2</strong> です。</p></li>
<li><p><strong>params</strong><em>(dict</em>)：インデックス固有の構築パラメータ。このパラメータに有効なオプションはインデックスの種類に依存します。</p></li>
</ul>
<p>以下は、異なるインデックス・タイプの構成例です：</p>
<ul>
<li><p><strong>GPU_CAGRA</strong>インデックス</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>paramsに</strong>指定できるオプションは以下の通りです：</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>)：プルーニングの前にグラフの次数を決定することで、リコールと構築時間に影響します。推奨値は<strong>32</strong>または<strong>64</strong>。</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>)：プルーニング後のグラフ次数を設定することで、検索パフォーマンスとリコールに影響する。通常、<strong>intermediate_graph_degreeの</strong>半分である。この2つの次数の差が大きいと、構築時間が長くなる。この値は<strong>intermediate_graph_degree</strong> の値より小さくなければならない。</p></li>
<li><p><strong>build_algo</strong><em>(文字列</em>)：プルーニング前のグラフ生成アルゴリズムを選択する。可能なオプション：</p>
<ul>
<li><p><strong>IVF_PQ</strong>: 高品質を提供するが、構築時間がかかる。</p></li>
<li><p><strong>NN_DESCENT</strong>：リコールが低くなる可能性があるが、短時間で構築できる。</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>,<strong>"true"</strong>|<strong>"false")：</strong>オリジナルデータセットをGPUメモリにキャッシュするかどうかを決定する。これを<strong>"true "</strong>に設定すると、検索結果が洗練されることでリコールが向上し、<strong>"false "</strong>に設定するとGPUメモリが節約されます。</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong>または<strong>GPU_IVF_PQ</strong>インデックス</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>params</strong>オプションは、<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong>と<strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> で使われているものと同じです。</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong>インデックス</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>追加の<strong>params</strong>設定は必要ありません。</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">インデックスの構築</h3><p><strong>index_params</strong> でインデックスパラメータを設定した後、インデックスを構築するために <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a>メソッドを呼び出してインデックスを構築します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">検索<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>GPUインデックスを構築したら、次は検索を行う前に検索パラメータを準備します。</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">検索パラメータの準備</h3><p>以下は、さまざまなインデックスタイプの構成例です：</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE</strong>インデックス</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>追加の<strong>パラメータ</strong>設定は必要ありません。</p></li>
<li><p><strong>GPU_CAGRA</strong>インデックス</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>主な検索パラメータは以下の通り：</p>
<ul>
<li><p><strong>itopk_size</strong>：検索中に保持される中間結果のサイズを決定します。この値を大きくすると、検索パフォーマンスを犠牲にして再現率が向上する可能性があります。少なくとも最終的なtop-k<strong>（限界</strong>）値と等しくなければならず、通常は2のべき乗（例：16、32、64、128）である。</p></li>
<li><p><strong>search_width</strong>: 検索中に CAGRA グラフに入る点の数を指定する。この値を大きくすると想起率が向上するが、検索パフォーマンスに影響する可能性がある。</p></li>
<li><p><strong>min_iterations</strong>/<strong>max_iterations</strong>：これらのパラメータは検索の反復処理を制御する。デフォルトでは<strong>0</strong> に設定されており、CAGRA は<strong>itopk_size</strong>と<strong>search_width</strong> に基づいて自動的に反復回数を決定する。これらの値を手動で調整することで、性能と精度のバランスをとることができます。</p></li>
<li><p><strong>team_size</strong>：GPU上のメトリック距離計算に使用するCUDAスレッド数を指定します。一般的な値は2のべき乗から32までです（例：2、4、8、16、32）。これは検索性能に軽微な影響を与えます。デフォルト値は<strong>0で</strong>、milvusはベクトル次元に基づいて自動的に<strong>team_sizeを</strong>選択します。</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong>または<strong>GPU_IVF_PQ</strong>インデックス</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>これら2つのインデックス・タイプの検索パラメータは、<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>および<a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQで</a></strong>使用されるものと似ています。詳細については、<a href="https://milvus.io/docs/search.md#Prepare-search-parameters">ベクトル類似検索の実施を</a>参照してください。</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">検索の実行</h3><p>を使用します。 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a>メソッドを使用して、GPU インデックスのベクトル類似性検索を実行します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">制限<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU インデックスを使用する場合、特定の制約に注意してください：</p>
<ul>
<li><p><strong>GPU_IVF_FLAT</strong> の場合、<strong>limit</strong>の最大値は 1024 です。</p></li>
<li><p><strong>GPU_IVF_PQ</strong>と<strong>GPU_CAGRA の</strong>場合、<strong>limit</strong>の最大値は 1024 です。</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong> には<strong>limit</strong>の上限は設定されていませんが、潜在的なパ フォーマンスの問題を避けるために 4096 を超えないことが推奨されます。</p></li>
<li><p>現在、GPUインデックスはCOSINE距離をサポートしていません。COSINE 距離が必要な場合は、まずデータを正規化し、それから内積 (IP) 距離で代用することができます。</p></li>
<li><p>GPUインデックスに対するOOM保護のロードは完全にはサポートされていません。</p></li>
<li><p>GPUインデックスは<a href="https://milvus.io/docs/single-vector-search.md#Range-search">範囲検索や</a> <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">グループ検索の</a>ような検索機能をサポートしていません。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">よくある質問<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>GPUインデックスはどのような場合に利用するのが適切ですか？</strong></p>
<p>GPUインデックスは、高スループットや高リコールが要求される状況で特に有益です。例えば、大きなバッチを扱う場合、GPUインデックスのスループットはCPUインデックスのそれを100倍も上回ることができます。より小さなバッチを扱うシナリオでは、GPUインデックスが性能の点でCPUインデックスを大きく上回ることに変わりはありません。さらに、迅速なデータ挿入が必要な場合、GPUを組み込むことで、インデックスの構築プロセスを大幅にスピードアップすることができます。</p></li>
<li><p><strong>CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT、GPU_BRUTE_FORCE などの GPU インデックスは、どのようなシナリオに最適ですか？</strong></p>
<p>CAGRA インデックスは、より多くのメモリを消費する代償はあるものの、より高いパフォーマンスを要求するシナリオに最適です。メモリの節約が優先される環境では、<strong>GPU_IVF_PQ</strong>インデックスはストレージ要件を最小化するのに役立ちますが、これは精度の高い損失を伴います。<strong>GPU_IVF_FLAT</strong>インデックスはバランスの取れたオプションとして機能し、性能とメモリ使用量の妥協点を提供します。最後に、<strong>GPU_BRUTE_FORCE</strong>インデックスは、網羅的検索操作のために設計されており、トラバーサル検索を実行することで、1の再現率を保証します。</p></li>
</ul>
