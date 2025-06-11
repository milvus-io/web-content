---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  GPU_CAGRAインデックスはGPUに最適化されたグラフベースのインデックスです。MilvusのGPUバージョンを実行するために推論グレードのGPUを使用することは、高価なトレーニンググレードのGPUを使用することと比較して、費用対効果が高くなります。
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_CAGRA</strong>インデックスはGPU用に最適化されたグラフベースのインデックスです。MilvusのGPUバージョンを実行するために推論グレードのGPUを使用することは、高価なトレーニンググレードのGPUを使用することと比較して、費用対効果が高くなります。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">GPU_CAGRA</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、そしてインデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">GPU_CAGRA</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加構成オプション。<code translate="no">GPU_CAGRA</code> インデックスで利用可能な構築パラメータについては、<a href="/docs/ja/gpu-cagra.md#Index-building-params">インデックス構築パラメータを</a>参照してください。</p></li>
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
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
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
<li><code translate="no">params</code>:インデックスで検索するための追加構成オプション。<code translate="no">GPU_CAGRA</code> インデックスで使用できる検索パラメータについては、<a href="/docs/ja/gpu-cagra.md#Index-specific-search-params">インデックス固有の検索パラメータを</a>参照してください。</li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/gpu-cagra.md#Build-index">インデックスを構築</a>する際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>デフォルト値</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>プルーニングの前にグラフの次数を決定することで、想起と構築時間に影響する。推奨値は<code translate="no">32</code> または<code translate="no">64</code> 。</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>プルーニング後のグラフの次数を設定することで、検索パフォーマンスと想起に影響する。この2つの次数の差が大きいほど、構築時間が長くなる。この値は<code translate="no">intermediate_graph_degree</code> の値より小さくなければならない。</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>プルーニング前のグラフ生成アルゴリズムを選択する。取り得る値：</p>
<ul>
<li><p><code translate="no">IVF_PQ</code>:より高い品質を提供するが、構築時間は遅くなる。</p></li>
<li><p><code translate="no">NN_DESCENT</code>:リコールは低くなる可能性があるが、迅速なビルドを提供する。</p></li>
</ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>元のデータセットをGPUメモリにキャッシュするかどうかを決定します。可能な値：</p>
<ul>
<li><p><code translate="no">"true"</code>:元のデータセットをキャッシュし、検索結果を絞り込むことで再現率を高めます。</p></li>
<li><p><code translate="no">"false"</code>:GPUメモリを節約するため、元のデータセットをキャッシュしない。</p></li>
</ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>インデックス構築にGPUを使用し、検索にCPUを使用するかを決定する。 このパラメータを<code translate="no">"true"</code> に設定するには、検索リクエストに<code translate="no">ef</code> パラメータが存在する必要がある。</p></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<a href="/docs/ja/gpu-cagra.md#Search-on-index">インデックスで検索する</a>際に<code translate="no">search_params.params</code> で設定できるパラメーターの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>デフォルト値</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>検索中に保持する中間結果のサイズを決定する。この値を大きくすると、検索パフォーマンスを犠牲にして再現性が向上する可能性がある。少なくとも最終的な top-k (limit) 値に等しくなければならず、通常は 2 のべき乗 (例: 16, 32, 64, 128) である。</p></td>
     <td><p>空</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>検索中に CAGRA グラフに入る点の数を指定する。この値を大きくすると、想起率は向上するが、検索性能に影響を与える可能性がある（例：1, 2, 4, 8, 16, 32）。</p></td>
     <td><p>空</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> /<code translate="no">max_iterations</code></p></td>
     <td><p>検索の反復処理を制御する。デフォルトでは<code translate="no">0</code> に設定されており、CAGRA は<code translate="no">itopk_size</code> と<code translate="no">search_width</code> に基づいて自動的に反復回数を決定する。これらの値を手動で調整することで、性能と精度のバランスをとることができます。</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>GPU でのメトリック距離計算に使用する CUDA スレッド数を指定します。一般的な値は2の累乗から32までです（例：2、4、8、16、32）。これは検索性能に軽微な影響を与えます。デフォルト値は<code translate="no">0</code> で、milvus はベクトル次元に基づいて自動的に<code translate="no">team_size</code> を選択します。</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>クエリ時間と精度のトレードオフを指定します。<code translate="no">ef</code> の値を高くすると、検索精度は高くなりますが、検索速度は遅くなります。 インデックスを構築する際に<code translate="no">adapt_for_cpu</code> から<code translate="no">true</code> を設定した場合、このパラメータは必須となります。</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
