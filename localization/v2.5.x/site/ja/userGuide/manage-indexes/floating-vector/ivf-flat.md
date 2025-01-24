---
id: ivf-flat.md
order: 1
summary: 今回はMilvusのIVF_FLATインデックスについて紹介する。
title: IVF_FLAT
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
    </button></h2><p><strong>IVF_FLATは</strong> <strong>Inverted File Flatの</strong>略で、浮動小数点ベクトルのインデックス作成と検索に対する二重構造のアプローチを表しています：</p>
<ul>
<li><strong>反転ファイル（IVF）：</strong>Inverted File (IVF):<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-meansクラスタリングを</a>使用して、ベクトル空間を管理しやすい領域にクラスタリングすることを指します。各クラスタは<strong>重心で</strong>表され、その中のベクトルの参照点として機能する。</li>
<li><strong>フラット：</strong>各クラスタ内で、正確な距離計算を行うために、圧縮や量子化を行わず、ベクトルを元の形（フラット構造）で保存することを示す。</li>
</ul>
<p>次の図はその仕組みを示しています：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-1.png" alt="ivf-flat-1.png" class="doc-image" id="ivf-flat-1.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-1.png</span> </span></p>
<p>このインデックス作成法は、検索処理を高速化しますが、潜在的な欠点を伴います：それは、クエリの埋め込みに最も近いものとして見つかった候補が、正確な最も近いものとは限らないということです。これは、クエリ埋め込みに最も近い埋め込みが、最も近い重心に基づいて選択されたクラスタとは異なるクラスタに存在する場合に起こり得ます（以下の可視化を参照）。</p>
<p>この問題に対処するため、<strong>IVF_FLATは</strong>2つのハイパーパラメータを提供します：</p>
<ul>
<li><code translate="no">nlist</code>:k-meansアルゴリズムを使用して作成するパーティションの数を指定します。</li>
<li><code translate="no">nprobe</code>:候補の探索中に考慮するパーティションの数を指定する。</li>
</ul>
<p>ここで、<code translate="no">nprobe</code> を1ではなく3に設定すると、次のような結果が得られる：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-2.png" alt="ivf-flat-2.png" class="doc-image" id="ivf-flat-2.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-2.png</span> </span></p>
<p><code translate="no">nprobe</code> の値を大きくすることで、より多くのパーティションを検索に含めることができます。これにより、クエリに最も近い埋め込みが、たとえ異なるパーティションに存在したとしても、見逃されないようにすることができます。しかし、これは、より多くの候補を評価する必要があるため、検索時間の増加という代償を伴います。インデックスパラメータのチューニングの詳細については、<a href="#index-params">Index params</a> を参照してください。</p>
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
    </button></h2><p>Milvusでベクトルフィールドに<code translate="no">IVF_FLAT</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
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
<p><code translate="no">IVF_FLAT</code> インデックスで使用可能な構築パラメータについては、<a href="#Index-building-params">インデックス構築パラメータ</a> を参照。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">params</code>:インデックスで検索するための追加構成オプション。</p>
<ul>
<li><code translate="no">nprobe</code>:検索するクラスタの数。</li>
</ul>
<p><code translate="no">IVF_FLAT</code> インデックスで利用可能な検索パラメータについては、<a href="#index-specific-search-params">インデックス固有の検索パラメータを</a>参照してください。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>以下の表は、<code translate="no">params</code> で<a href="#Build-index">インデックスを構築</a>する際に設定できるパラメータの一覧です。</p>
<table>
<thead>
<tr><th><strong>パラメータ</strong></th><th><strong>説明</strong></th><th><strong>値の範囲</strong></th><th><strong>チューニングの提案</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>インデックス構築時に k-means アルゴリズムを使用して作成するクラスタの数。セントロイドで表される各クラスタには、ベクトルのリストが格納されます。このパラメータを増やすと、各クラスタ内のベクトル数が減り、より小さく、より集中したパーティションが作成されます。</td><td><strong>タイプ</strong>整数<br><strong>範囲</strong>: [1, 65536[1, 65536]<br><strong>デフォルト値</strong>：<code translate="no">128</code></td><td><code translate="no">nlist</code> の値を大きくすると、より洗練されたクラスターを作成することでリコールが向上するが、インデックス構築時間が長くなる。ほとんどの場合、この範囲内の値を設定することを推奨する：[32, 4096].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>次の表は、<code translate="no">search_params.params</code> で<a href="#Search-on-index">インデックス検索</a>時に設定できるパラメータの一覧です。</p>
<table>
<thead>
<tr><th><strong>パラメータ</strong></th><th><strong>説明</strong></th><th><strong>値の範囲</strong></th><th><strong>チューニングの提案</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>値を大きくすると、より多くのクラスタを検索できるようになり、検索範囲が広がることでリコールが向上しますが、その代償としてクエリの待ち時間が長くなります。</td><td><strong>タイプ</strong>整数<br><strong>範囲</strong>[1,<em>nlist］</em><br><strong>デフォルト値</strong>：<code translate="no">8</code></td><td>この値を大きくすると想起は向上するが、検索が遅くなる可能性がある。速度と精度のバランスをとるために、<code translate="no">nlist</code> に比例して<code translate="no">nprobe</code> を設定する。<br>ほとんどの場合、この範囲内の値を設定することを推奨する：[1, nlist]。</td></tr>
</tbody>
</table>
