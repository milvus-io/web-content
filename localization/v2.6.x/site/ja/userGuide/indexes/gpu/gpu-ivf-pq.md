---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  GPU_IVF_PQ インデックスは、IVF_PQ
  のコンセプトに基づき、逆ファイルクラスタリングと、高次元ベクトルをより小さな部分空間に分解し、効率的な類似性検索のためにそれらを量子化する積量子化（PQ）を組み合わせたものです。GPU環境専用に設計されたGPU_IVF_PQは、並列処理を活用して計算を高速化し、大規模なベクトルデータを効率的に処理します。基本コンセプトの詳細については、IVF_PQを参照してください。
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_IVF_PQ</strong>インデックスは、<strong>IVF_PQ の</strong>コンセプトに基づき、逆ファイルクラスタリングと積量子化 (PQ) を組み合わせたものです。PQ は、高次元ベクトルをより小さな部分空間に分解して量子化し、効率的な類似性検索を実現します。GPU環境専用に設計されたGPU_IVF_PQは、並列処理を活用して計算を高速化し、大規模なベクトルデータを効率的に処理します。基本概念の詳細については、<a href="/docs/ja/ivf-pq.md">IVF_PQを</a>参照してください。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">GPU_IVF_PQ</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックスの追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">GPU_IVF_PQ</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><code translate="no">m</code>:ベクトルを分割するサブベクトルの数。</li>
</ul>
<p><code translate="no">GPU_IVF_PQ</code> インデックスで使用可能な構築パラメータについては、<a href="/docs/ja/gpu-ivf-pq.md#Index-building-params">インデックス構築パラメータを</a>参照してください。</p></li>
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
    </button></h2><p>インデックスが構築され、エンティティが挿入されると、インデックス上で類似検索を実行できます。</p>
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
<p><code translate="no">GPU_IVF_PQ</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/gpu-ivf-pq.md#Index-specific-search-params">インデックス固有の検索パラメータを</a>参照してください。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/gpu-ivf-pq.md#Build-index">インデックスを構築する</a>際に設定できるパラメータの一覧です。</p>
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
     <td><p><strong>型</strong>：整数<strong>：</strong>[1, 65536]</p>
<p><strong>デフォルト値</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> の値を大きくすると、より洗練されたクラスターを作成することでリコールが向上しますが、インデックス構築時間が長くなります。ほとんどの場合、この範囲内の値を設定することを推奨する：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>量子化処理時に各高次元ベクトルを分割するサブベクトルの数（量子化に使用）。</p></td>
     <td><p><strong>タイプ</strong>：整数<strong>：</strong>[1, 65536]</p>
<p><strong>デフォルト値</strong>：なし</p></td>
     <td><p><code translate="no">m</code> の値を大きくすると精度が向上するが、計算の複雑さとメモリ使用量も増加する。<code translate="no">m</code> は、適切な分解を保証するために、ベクトル次元<em>(D</em>)の約数でなければならない。一般的に推奨される値は<em>m = D/2</em> です。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>各サブベクトルの重心インデックスを圧縮形式で表現するためのビット数。各コードブックは $2^{textit{nbits}}$ 個のセントロイドを含む。例えば、<code translate="no">nbits</code> を8に設定すると、各サブベクトルは8ビットのセントロイドのインデックスで表現される。これにより、そのサブベクトルのコードブックには$2^8$ (256)個のセントロイドが存在することになる。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>：</strong>[1, 64]</p>
<p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> の値を大きくすると、コードブックが大きくなり、元のベクトルをより正確に表現できる可能性がある。ほとんどの場合、この範囲内の値を設定することを推奨します：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>元のデータセットをGPUメモリにキャッシュするかどうかを決定します。設定可能な値：</p>
<ul>
<li><p><code translate="no">"true"</code>:元のデータセットをキャッシュし、検索結果を絞り込んで再現性を高めます。</p></li>
<li><p><code translate="no">"false"</code>:GPUメモリを節約するため、元のデータセットをキャッシュしない。</p></li>
</ul></td>
     <td><p><strong>タイプ</strong>文字列の<strong>範囲</strong>：[<code translate="no">"true"</code>,<code translate="no">"false"</code>]。</p>
<p><strong>デフォルト値</strong>：<code translate="no">"false"</code></p></td>
     <td><p><code translate="no">"true"</code> に設定すると、検索結果を絞り込むことで再現性を高めるが、より多くのGPUメモリを使用する。<code translate="no">"false"</code> に設定するとGPUメモリを節約します。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメーター</h3><p>次の表は、<a href="/docs/ja/gpu-ivf-pq.md#Search-on-index">インデックスで検索する</a>ときに<code translate="no">search_params.params</code> で設定できるパラメーターの一覧です。</p>
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
     <td><p><strong>型</strong>：整数<strong>Range</strong>：[1,<em>nlist］</em></p>
<p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>値を大きくすると、より多くのクラスターを検索できるようになり、検索範囲が広がることでリコールが向上しますが、その代償としてクエリの待ち時間が長くなります。速度と精度のバランスをとるために、<code translate="no">nlist</code> に比例して<code translate="no">nprobe</code> を設定します。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[1, nlist]。</p></td>
   </tr>
</table>
