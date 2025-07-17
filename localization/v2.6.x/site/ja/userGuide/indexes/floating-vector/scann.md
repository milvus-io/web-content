---
id: scann.md
title: SCANN
summary: >-
  GoogleのScaNNライブラリを搭載したMilvusのSCANNインデックスは、ベクトル類似検索のスケーリングの課題に対応するように設計されており、従来はほとんどの検索アルゴリズムにとって課題となるような大規模なデータセットであっても、速度と精度のバランスを取ることができる。
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Googleの<a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a>ライブラリを搭載したMilvusの<code translate="no">SCANN</code> インデックスは、ベクトル類似検索のスケーリングの課題に対応するように設計されており、従来はほとんどの検索アルゴリズムにとって課題となるような大規模なデータセットであっても、速度と精度のバランスを取ることができます。</p>
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
    </button></h2><p>ScaNNは、ベクトル検索における最大の課題の1つである、データセットが大きく複雑になっても、高次元空間で最も関連性の高いベクトルを効率的に見つけるという課題を解決するために構築されています。ScaNNのアーキテクチャは、ベクトル検索プロセスを明確な段階に分解します：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>スキャン</span> </span></p>
<ol>
<li><p><strong>パーティショニング</strong>：データセットをクラスタに分割する。この方法では、データセット全体をスキャンする代わりに、関連するデータのサブセットのみに焦点を当てることで検索空間を狭め、時間と処理リソースを節約する。ScaNN は多くの場合、<a href="https://zilliz.com/blog/k-means-clustering">k-means</a> などのクラスタリング・アルゴリズムを使用してクラスターを特定するため、類似検索をより効率的に実行できる。</p></li>
<li><p><strong>量子化</strong>：ScaNN はパーティショニング後に<a href="https://arxiv.org/abs/1908.10396">異方性ベクトル量子化として</a>知られる量子化プロセスを適用する。従来の量子化は、元のベクトルと圧縮されたベクトル間の全体的な距離を最小化することに重点を置いているが、これは<a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">最大内積探索（MIPS）の</a>ような、類似性が直接的な距離ではなくベクトルの内積によって決定されるタスクには理想的ではない。異方的量子化では、代わりにベクトル間の平行成分、つまり正確な内積を計算するために最も重要な部分の保存を優先します。このアプローチにより、ScaNNは圧縮されたベクトルをクエリと注意深く整列させることで高いMIPS精度を維持し、より高速で正確な類似性検索を可能にしている。</p></li>
<li><p><strong>再ランク付け</strong>：再順位付け段階は最終段階で、ScaNN は分割および量子化段階からの検索結果を微調整する。この再順位付けでは、上位の候補ベクトルに対して正確な内積計算が適用され、最終結果が高精度になるようにします。再順位付けは、最初のフィルタリングとクラスタリングが粗い層として機能し、最終段階で最も関連性の高い結果のみがユーザーに返されるようにする、高速推薦エンジンや画像検索アプリケーションにおいて極めて重要である。</p></li>
</ol>
<p><code translate="no">SCANN</code> の性能は、速度と精度のバランスを微調整できる2つの重要なパラメータによって制御されます：</p>
<ul>
<li><p><code translate="no">with_raw_data</code>:元のベクトル・データを量子化された表現と一緒に保存するかどうかを制御します。このパラメータを有効にすると、再ランキング時の精度が向上しますが、ストレージ要件が増加します。</p></li>
<li><p><code translate="no">reorder_k</code>:最終的な再ランキング段階で、いくつの候補を絞り込むかを決定します。値を高くすると精度は向上しますが、検索待ち時間が長くなります。</p></li>
</ul>
<p>これらのパラメータを特定のユースケースに最適化するための詳細なガイダンスについては、<a href="/docs/ja/scann.md#Index-params">Index params</a> を参照してください。</p>
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
    </button></h2><p>Milvusでベクトルフィールドに<code translate="no">SCANN</code> インデックスを構築するには、<code translate="no">add_index()</code> メソッドを使用し、<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 、インデックス用の追加パラメータを指定します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>この設定では</p>
<ul>
<li><p><code translate="no">index_type</code>:構築するインデックスのタイプ。この例では<code translate="no">SCANN</code> とします。</p></li>
<li><p><code translate="no">metric_type</code>:ベクトル間の距離の計算方法。サポートされている値には、<code translate="no">COSINE</code> 、<code translate="no">L2</code> 、<code translate="no">IP</code> があります。詳細については、<a href="/docs/ja/metric.md">メトリック・タイプを</a>参照してください。</p></li>
<li><p><code translate="no">params</code>:インデックスを構築するための追加設定オプション。</p>
<ul>
<li><code translate="no">with_raw_data</code>:元のベクトルデータを、量子化された表現と一緒に保存するかどうか。</li>
</ul>
<p><code translate="no">SCANN</code> インデックスで利用可能な構築パラメータの詳細については、<a href="/docs/ja/scann.md#Index-building-params">インデックス構築パラメータを</a>参照してください。</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>この構成では</p>
<ul>
<li><p><code translate="no">params</code>:インデックスで検索するための追加構成オプション。</p>
<ul>
<li><code translate="no">reorder_k</code>:再順位付け段階で絞り込む候補の数。</li>
</ul>
<p><code translate="no">SCANN</code> インデックスで利用可能な検索パラメータについては、<a href="/docs/ja/scann.md#Index-specific-search-params">インデックス固有の検索パラメータ</a> を参照。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">インデックス構築パラメータ</h3><p>次の表は、<code translate="no">params</code> で<a href="/docs/ja/scann.md#Build-index">インデックスを構築</a>する際に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>調整案</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>元のベクトルデータを量子化表現と一緒に保存するかどうか。有効にすると、再順位付けの段階で、量子化された近似値ではなく元のベクトルを使用することで、より正確な類似度計算が可能になる。</p></td>
     <td><p><strong>タイプ</strong>Boolean<strong>Range</strong>：<code translate="no">true</code>,<code translate="no">false</code></p>
<p><strong>デフォルト値</strong>：<code translate="no">true</code></p></td>
     <td><p><strong>より高い検索精度を</strong>得るため、また記憶容量が重要でない場合は、<code translate="no">true</code> に設定する。オリジナルのベクトル・データにより、再ランキング時により正確な類似度計算が可能になる。特に大規模なデータセットの場合、<strong>ストレージ・オーバーヘッドと</strong>メモリ使用<strong>量を削減する</strong>ために、<code translate="no">false</code> に設定する。ただし、再ランキング段階では量子化されたベクトルが使用されるため、検索精度が若干低下する可能性があります。</p>
<p><strong>推奨</strong>：精度が重要なプロダクション・アプリケーションには<code translate="no">true</code> を使用する。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">インデックス固有の検索パラメータ</h3><p>以下の表は、<code translate="no">search_params.params</code> で<a href="/docs/ja/scann.md#Search-on-index">インデックス検索</a>時に設定できるパラメータの一覧です。</p>
<table>
   <tr>
     <th><p>パラメータ</p></th>
     <th><p>説明</p></th>
     <th><p>値の範囲</p></th>
     <th><p>調整候補</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>再順位付け段階で絞り込まれる候補ベクトルの数を制御する。このパラメータは、最初のパーティショニングと量子化段階からの上位候補が、より正確な類似度計算を使用して再評価される数を決定します。</p></td>
     <td><p><strong>タイプ</strong>整数<strong>Range</strong>：[1,<em>int_max］</em></p>
<p><strong>デフォルト値</strong>なし</p></td>
     <td><p><code translate="no">reorder_k</code> を大きくすると、最終的な絞り込み段階でより多くの候補が考慮されるため、一般的に<strong>検索精度が高く</strong>なる。しかし、これはまた、追加の計算のために<strong>検索時間を増加さ</strong>せます。 高いリコールを達成することが重要であり、検索速度があまり気にならない場合は、<code translate="no">reorder_k</code> を増やすことを検討してください。<code translate="no">limit</code> (TopK results to return)の2-5倍から始めるのがよいでしょう。</p>
<p>特に、精度が多少低下しても構わないようなシナリオでは、より高速な検索を優先するため、<code translate="no">reorder_k</code> を減らすことを検討してください。</p>
<p>ほとんどの場合、この範囲内の値を設定することをお勧めします：[<em>limit</em>,<em>limit</em>* 5]。</p></td>
   </tr>
</table>
