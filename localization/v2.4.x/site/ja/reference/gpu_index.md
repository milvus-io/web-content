---
id: gpu_index.md
related_key: gpu_index
summary: MilvusのGPUインデックス機構。
title: GPUインデックス
---
<h1 id="GPU-Index" class="common-anchor-header">GPUインデックス<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは様々なGPUインデックスタイプをサポートし、特に高スループット、高リコールシナリオにおいて検索性能と効率を加速します。このトピックでは、MilvusがサポートするGPUインデックスタイプの概要、適した使用例、および性能特性について説明します。GPUを使用したインデックス構築については、<a href="/docs/ja/v2.4.x/index-with-gpu.md">GPUを使用したインデックスを</a>参照してください。</p>
<p>GPUインデックスを使用すると、CPUインデックスを使用した場合と比較して、必ずしもレイテンシが減少するとは限らないことに注意することが重要です。スループットを完全に最大化したいのであれば、極めて高いリクエスト・プレッシャーか、大量のクエリ・ベクターが必要になります。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>パフォーマンス</span> </span></p>
<p>MilvusのGPUサポートはNvidia<a href="https://rapids.ai/">RAPIDS</a>チームによって提供されています。以下は現在MilvusがサポートしているGPUインデックスタイプです。</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRAはGPU用に最適化されたグラフベースのインデックスです。Milvus GPUバージョンを実行するために推論グレードのGPUを使用することは、高価なトレーニンググレードのGPUを使用することと比較して、費用対効果が高くなります。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>プルーニングの前にグラフの次数を決定することで、リコールと構築時間に影響する。推奨値は<code translate="no">32</code> または<code translate="no">64</code> 。</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>プルーニング後のグラフの次数を設定することで、検索パフォーマンスと想起に影響する。この2つの次数の差が大きいほど、構築時間が長くなる。この値は<strong>intermediate_graph_degree</strong> の値より小さくなければならない。</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>プルーニング前のグラフ生成アルゴリズムを選択する。取り得る値：</br><code translate="no">IVF_PQ</code>:より高い品質を提供するが、構築時間は遅くなる。</br><code translate="no">NN_DESCENT</code>リコールが低くなる可能性がある。</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>元のデータセットをGPUメモリにキャッシュするかどうかを決定します。可能な値：</br><code translate="no">“true”</code>:元のデータセットをキャッシュし、検索結果を絞り込むことで想起を高める。</br><code translate="no">“false”</code>: GPUメモリを節約するため、元のデータセットをキャッシュしない。</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>検索中に保持される中間結果のサイズを決定する。この値を大きくすると、検索パフォーマンスを犠牲にしてでも検索結果を改善することができる。少なくとも最終的な top-k (limit) 値に等しくなければならず、通常は 2 のべき乗 (例: 16, 32, 64, 128) である。</td><td>空</td></tr>
<tr><td><code translate="no">search_width</code></td><td>検索中に CAGRA グラフに入る点の数を指定する。この値を大きくすると、想起率は向上するが、検索性能に影響を与える可能性がある（例：1, 2, 4, 8, 16, 32）。</td><td>空</td></tr>
<tr><td><code translate="no">min_iterations</code> /<code translate="no">max_iterations</code></td><td>検索の反復処理を制御する。デフォルトでは<code translate="no">0</code> に設定されており、CAGRA は<code translate="no">itopk_size</code> と<code translate="no">search_width</code> に基づいて自動的に反復回数を決定する。これらの値を手動で調整することで、性能と精度のバランスをとることができます。</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>GPU でのメトリック距離計算に使用する CUDA スレッド数を指定します。一般的な値は2の累乗から32までです（例：2、4、8、16、32）。これは検索性能に軽微な影響を与えます。デフォルト値は<code translate="no">0</code> で、milvus はベクトル次元に基づいて自動的に<code translate="no">team_size</code> を選択します。</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>検索の制限</p>
<table>
<thead>
<tr><th>パラメータ</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32,<code translate="no">search_width</code>)* 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLATと</a>同様に、GPU_IVF_FLATもベクトルデータを<code translate="no">nlist</code> クラスタ単位に分割し、ターゲット入力ベクトルと各クラスタの中心との距離を比較します。システムがクエリに設定するクラスタ数(<code translate="no">nprobe</code>)に応じて、ターゲット入力と最も類似したクラスタ内のベクトルとの比較のみに基づいて類似性検索結果が返され、クエリ時間が大幅に短縮されます。</p>
<p><code translate="no">nprobe</code> を調整することで、シナリオに応じた精度と速度の理想的なバランスを見つけることができる。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLATの性能テストの</a>結果は、ターゲット入力ベクトルの数(<code translate="no">nq</code>)と検索するクラスタの数(<code translate="no">nprobe</code>)の両方が増加すると、クエリ時間が急激に増加することを示しています。</p>
<p>GPU_IVF_FLATは最も基本的なIVFインデックスであり、各ユニットに格納されるエンコードされたデータは元のデータと一致します。</p>
<p>検索を行う場合、GPU_IVF_FLATインデックスを持つコレクションに対する検索では、top-Kを256まで設定できることに注意してください。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>元のデータセットをGPUメモリにキャッシュするかどうかを決定します。可能な値：</br><code translate="no">“true”</code>:元のデータセットをキャッシュし、検索結果を絞り込んで再現性を高めます。</br><code translate="no">“false”</code>GPUメモリを節約するため、元のデータセットをキャッシュしません。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<ul>
<li><p>共通検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>検索の制限</p>
<table>
<thead>
<tr><th>パラメータ</th><th>検索範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (積量子化）は、元の高次元ベクトル空間を の低次元ベクトル空間のデカルト積に一様に分解し、分解された低次元ベクトル空間を量子化します。積量子化により、対象ベクトルと全ユニットの中心との距離を計算する代わりに、対象ベクトルと各低次元空間のクラスタリング中心との距離を計算することが可能となり、アルゴリズムの時間的複雑性と空間的複雑性を大幅に削減することができる。<code translate="no">m</code> </p>
<p>IVF_PQ は，ベクトルの積を量子化する前にIVFインデックスクラスタリングを行います．そのインデックスファイルはIVF_SQ8よりもさらに小さいが、ベクトル探索時の精度が低下する。</p>
<div class="alert note">
<p>インデックス作成パラメータと検索パラメータはMilvus分布によって異なります。まずMilvusディストリビューションを選択してください。</p>
<p>検索を行う場合、GPU_IVF_FLATインデックスを持つコレクションに対する検索では、top-Kを8192まで設定できることに注意してください。</p>
</div>
<ul>
<li><p>インデックス作成パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>積量子化の因子数、</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[オプション] 各低次元ベクトルが格納されるビット数。</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>元のデータセットをGPUメモリにキャッシュするかどうかを決定します。可能な値：</br><code translate="no">“true”</code>:元のデータセットをキャッシュし、検索結果を絞り込んで再現性を高めます。</br><code translate="no">“false”</code>: GPUメモリを節約するため、元のデータセットをキャッシュしない。</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<ul>
<li><p>共通検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>検索の制限</p>
<table>
<thead>
<tr><th>パラメータ</th><th>検索範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=<code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCEは、非常に高いリコールが重要なケース向けに調整されており、各クエリをデータセット内のすべてのベクトルと比較することで、1のリコールを保証します。インデックス構築と検索パラメータとして、メトリックタイプ(<code translate="no">metric_type</code>)とtop-k(<code translate="no">limit</code>)のみを必要とします。</p>
<p>GPU_BRUTE_FORCEでは、インデックス構築パラメータや検索パラメータを追加する必要はない。</p>
<h2 id="Conclusion" class="common-anchor-header">結論<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>現在、Milvusは効率的な検索操作のために、すべてのインデックスをGPUメモリにロードします。ロードできるデータ量はGPUメモリのサイズに依存します：</p>
<ul>
<li><strong>GPU_CAGRA</strong>: メモリ使用量は元のベクトルデータの約 1.8 倍。</li>
<li><strong>GPU_IVF_FLAT</strong>および<strong>GPU_BRUTE_FORCE</strong>：元データのサイズに等しいメモリを必要とします。</li>
<li><strong>GPU_IVF_PQ</strong>: 圧縮パラメータの設定に依存しますが、より小さなメモリフットプリントを使用します。</li>
</ul>
