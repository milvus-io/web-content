---
id: ivf-flat.md
title: IVF_FLAT
summary: IVF_FLATインデックスは、浮動小数点ベクトルの検索性能を向上させるインデックス・アルゴリズムである。
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_FLAT</strong>インデックスは、浮動小数点ベクトルの検索性能を向上させるインデックス・アルゴリズムです。</p>
<p>このインデックス・タイプは、高速なクエリ応答と高い精度を必要とする大規模なデータセット、特にデータセットをクラスタリングすることで検索空間を縮小でき、クラスタ・データを格納するのに十分なメモリを利用できる場合に最適です。</p>
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
    </button></h2><p><strong>IVF_FLATとは</strong> <strong>Inverted File Flatの</strong>略で、浮動小数点ベクトルのインデックス作成と検索に対する二層構造のアプローチを表しています：</p>
<ul>
<li><p><strong>反転ファイル（IVF）：</strong>Inverted File (IVF):<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-meansクラスタリングを</a>使用して、ベクトル空間を管理しやすい領域にクラスタリングすることを指します。各クラスタは<strong>重心によって</strong>表され、その中のベクトルの参照点として機能する。</p></li>
<li><p><strong>フラット：</strong>各クラスタ内で、正確な距離計算を行うために、圧縮や量子化を行わず、ベクトルを元の形（フラット構造）で保存することを示す。</p></li>
</ul>
<p>下図はその仕組みを示しています：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>IVF FLAT ワークフロー</span> </span></p>
<p>このインデックス作成方法は、検索プロセスを高速化しますが、潜在的な欠点を伴います：それは、クエリの埋め込みに最も近い候補として見つかった候補が、正確な最も近いものとは限らないということです。これは、クエリ埋め込みに最も近い埋め込みが、最近傍重心に基づいて選択されたクラスタとは異なるクラスタに存在する場合に起こり得ます（以下の可視化を参照）。</p>
<p>この問題に対処するため、<strong>IVF_FLATは</strong>2つのハイパーパラメータを提供します：</p>
<ul>
<li><p><code translate="no">nlist</code>:k-meansアルゴリズムを使用して作成するパーティションの数を指定します。</p></li>
<li><p><code translate="no">nprobe</code>:候補の探索中に考慮するパーティションの数を指定する。</p></li>
</ul>
<p>ここで、<code translate="no">nprobe</code> を1ではなく3に設定すると、次のような結果が得られる：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>IVF FLATワークフロー2</span> </span></p>
<p><code translate="no">nprobe</code> の値を大きくすることで、より多くのパーティションを検索に含めることができます。これにより、クエリに最も近い埋め込みが、たとえ異なるパーティションに存在するとしても、見逃されないようにすることができます。しかし、これは、より多くの候補を評価する必要があるため、検索時間の増加という代償を伴います。インデックスパラメータのチューニングの詳細については、<a href="/docs/ja/ivf-flat.md#Index-params">Index params</a> を参照してください。</p>
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
    </button></h2><p>Milvusでベクトル場に<code translate="no">IVF_FLAT</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">IVF_FLAT</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><code translate="no">nlist</code>:データセットを分割するクラスタ数。</li>
</ul>
<p><code translate="no">IVF_FLAT</code> インデックスで使用可能な構築パラメータについては、<a href="/docs/ja/ivf-flat.md#Index-building-params">インデックス構築パラメータ</a> を参照。</p></li>
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
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
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
<p><code translate="no">IVF_FLAT</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/ivf-flat.md#Index-specific-search-params">インデックス固有の検索パラメータを</a>参照してください。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="/docs/ja/ivf-flat.md#Build-index">インデックスを構築</a>する際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>インデックス構築時に k-means アルゴリズムを使用して作成するクラスタの数。セントロイドで表される各クラスタは、ベクトルのリストを格納します。このパラメータを増やすと、各クラスタ内のベクトル数が減少し、より小さく、より集中したパーティションが作成されます。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1, 65536]</p><p><strong>デフォルト値</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> の値を大きくすると、より洗練されたクラスターを作成することでリコールが向上しますが、インデックス作成時間が長くなります。データセットサイズと利用可能なリソースに基づいて最適化する。ほとんどの場合、この範囲内の値を設定することを推奨する：[32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/ivf-flat.md#Search-on-index">インデックス検索</a>時に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>チューニングの提案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>候補を検索するクラスタ数。値を大きくすると、より多くのクラスタを検索できるようになり、検索範囲が広がることでリコールが向上しますが、その代償としてクエリの待ち時間が長くなります。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1,<em>nlist］</em></p><p><strong>デフォルト値</strong>：<code translate="no">8</code></p></td>
     <td><p>この値を大きくするとリコールは向上するが、検索が遅くなる可能性がある。速度と精度のバランスをとるために、<code translate="no">nlist</code> に比例して<code translate="no">nprobe</code> を設定する。</p><p>ほとんどの場合、この範囲内の値を設定することを推奨する：[1, nlist]。</p></td>
   </tr>
</table>
