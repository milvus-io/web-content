---
id: search_with_svs_vamana.md
summary: >-
  FAISSインデックスのパススルー機能を通じて、Milvus上でインメモリのSVS Vamanaグラフインデックスを構築・検索します。Intel
  CPUでは、オプションでLeanVecまたはLVQ圧縮を利用できます。
title: SVS Vamana および Milvus を使用した検索
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">SVS Vamana および Milvus を使用した検索<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a>（Scalable Vector Search）は、Vamanaグラフアルゴリズムを実装した、インテル社の高性能ベクトル検索ライブラリです。 Milvusでは、<a href="https://milvus.io/docs/faiss.md">FAISSインデックスのパススルーを通じてSVS</a> Vamanaを利用できます。<code translate="no">index_type</code> を<code translate="no">FAISS</code> に設定し、<code translate="no">SVSVamana</code> というインデックスファクトリ文字列を指定すると、MilvusはFaissのSVS統合機能を通じてインデックスを構築し、検索を行います。</p>
<p>Vamana<a href="https://milvus.io/docs/diskann.md">はDISKANNでも</a>使用されているグラフ構造ですが、SVS Vamanaはグラフ全体をメモリ内に保持します。また、<strong>LeanVecやLVQ</strong>を用いてベクトルを圧縮することができ、これによりメモリ使用量を削減し、検索速度を向上させつつ、非常に高いリコール率を維持します。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>SVSを有効にしてソースからビルドしたMilvus 3.0.0以降</li>
<li>PyMilvus 3.0.0 以降</li>
<li><code translate="no">LVQ*</code> または<code translate="no">LeanVec*</code> ストレージを使用する場合は、Intel CPUが必要です。<code translate="no">FP32</code> 、<code translate="no">FP16</code> 、および<code translate="no">SQ8</code> ストレージは、どのプラットフォームでも動作します。</li>
<li><a href="https://milvus.io/docs/faiss.md">FAISSのインデックスファクトリ文字列</a>に関する知識</li>
</ul>
<div class="alert note">
<p>SVSはデフォルトのMilvusビルドには含まれていません。<code translate="no">SVSVamana</code> ファクトリを使用するには、<code translate="no">make USE_SVS=ON</code> オプションを指定してMilvusをソースからビルドしてください。SVSを含まないビルドでは、Faissがファクトリ文字列を認識しないため、インデックス構築に失敗します。</p>
</div>
<p>LVQおよびLeanVec圧縮はIntel CPUでのみ実行可能であり、AVX-512を搭載したCPUではより高速に動作します。その他のCPUでは、<code translate="no">LVQ*</code> および<code translate="no">LeanVec*</code> のファクトリ文字列を使用した場合、インデックス構築に失敗します。</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">SVS Vamanaの仕組み<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Vamanaグラフ<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamanaは、単層の近傍グラフを構築します。各ベクトルがノードとなり、近傍である可能性が高いベクトル同士をエッジで結びます。グラフを構築するために、SVSは各ノード<strong>x</strong> に対して以下の処理を行います：</p>
<ol>
<li><p><strong>貪欲探索</strong>：SVSは、これまでに構築されたグラフを探索し、サイズが<code translate="no">construction_window_size</code> の候補リストを維持します。</p></li>
<li><p><strong>近傍の剪定</strong>：訪問済みのノードは、<strong>x</strong> の近傍候補となります。SVS は、<strong>x</strong> からの距離が小さい順にそれらを検討します。 すでに保持されているより近い近傍<code translate="no">n</code> が、<code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code> を満たす場合、候補<code translate="no">c</code> はスキップされる。これにより、長距離のエッジは保持され、冗長な短距離のエッジは削除されるため、検索はグラフを1つずつ最も近い近傍をたどって進むのではなく、グラフを飛び越えて進むことができる。グラフの次数に達すると、剪定は停止する。</p></li>
<li><p><strong>逆方向のエッジ</strong>：<strong>x</strong>の新しい隣接ノードごとに、SVS<strong>はx</strong>への逆方向のエッジを追加し、その隣接ノードのエッジリストがグラフの次数を超えている場合は、そのエッジリストを剪定します。</p></li>
</ol>
<p>剪定は2回のパスで実行されます。最初は<code translate="no">alpha = 1</code> で、次に設定された<code translate="no">alpha</code> で行われます。グラフの次数と<code translate="no">construction_window_size</code> を大きくすると、より密で高品質なグラフが得られますが、メモリを多く消費し、構築に時間がかかります。</p>
<p>検索時、SVSはグラフを貪欲探索し、<code translate="no">search_window_size</code> にこれまでに見つかった最も近い候補を保持します。次に探索するのは、常に最も近い未訪問の候補です。現在のノードのすべての隣接ノードが、ウィンドウ内の最悪の候補よりもクエリから遠い位置にあるようになった時点で、検索は終了します。<code translate="no">search_window_size</code> を大きく設定すると、グラフのより広い範囲が探索されるため、リコール率は向上しますが、レイテンシも増加します。</p>
<h3 id="LeanVec-compression" class="common-anchor-header">LeanVec圧縮<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVecは</a>、ベクトルあたりの次元数と次元あたりのビット数を両方とも削減します。LeanVecインデックスは、各ベクトルについて2つの表現を保持します：</p>
<ul>
<li><p><strong>プライマリ（次元削減済み）</strong>：ベクトルをより少ない次元数へと線形投影したものです。グラフ検索はこのプライマリデータセットに対して実行されるため、距離計算の大部分は低次元空間で行われます。これにより、演算負荷とメモリ帯域幅の両方の要件が軽減されます。デフォルトでは、削減後の次元数は元の次元数の半分になります（<code translate="no">dim / 2</code> ）。</p></li>
<li><p><strong>セカンダリ（フル次元）</strong>：ベクトルの元の次元での表現。SVSは、次元削減によって失われた精度を回復するために、プライマリグラフ検索によって返された候補を、このセカンダリデータセットに対して再ランク付けします。</p></li>
</ul>
<p>両方の表現は、<a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a>（局所適応ベクトル量子化）によって量子化されます。エンコーディングの選択は、ファクトリ文字列の「storage」コンポーネントによって行われます。例えば、<code translate="no">LeanVec4x8</code> では、プライマリデータセットに対して次元あたり 4 ビット、セカンダリデータセットに対して次元あたり 8 ビットが使用されます。再ランク付けのステップにおいても、フル精度のベクトルが読み込まれることは決してありません。</p>
<p>デフォルトでは、LeanVecはインデックス化されたベクトル用とクエリ用で別々の射影を学習します。これにより、インデックス化されたベクトルとは異なる分布（アウト・オブ・ディストリビューション、OOD）から来るクエリにも対応できます。 これは、テキストから画像への検索などのクロスモーダルワークロードで特に効果的であり、クエリがインデックス化されたベクトルと同じ分布に属する場合にも有効です。Milvusでは、投影計算用のクエリを渡す方法はまだサポートされていないため、現在はベースベクトルのみが使用されます。OODトレーニングを行うと、ビルド時間が長くなります。 クエリ性能を多少犠牲にしてビルドを高速化するには、<code translate="no">ood_training</code> を<code translate="no">False</code> に設定してください。</p>
<h3 id="LVQ-compression" class="common-anchor-header">LVQ圧縮<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>次元数が約512未満のデータセットの場合、次元削減を省略し、LVQ量子化のみで圧縮した方が良好な結果が得られることがあります。 LeanVecと同様に、LVQインデックスは高速検索用のプライマリ表現と、再ランク付け用の残差表現を保持します。例えば、<code translate="no">LVQ4x4</code> では、プライマリ表現に4ビット、残差表現に4ビットを使用します。<code translate="no">LVQ4x0</code> および<code translate="no">LVQ8x0</code> は再ランク付けを省略するため、ワークロードに対してリコール率が十分に高ければ、クエリ処理が高速化されます。</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">ファクトリ文字列の選択<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>SVS Vamanaのファクトリ文字列は、<code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code> という形式をとります。ここで、<code translate="no">&lt;degree&gt;</code> はグラフ内のノードあたりの最大エッジ数です。</p>
<table>
<thead>
<tr><th>ファクトリ文字列</th><th>ストレージ</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>非圧縮のベクトル。</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>16 ビット浮動小数点数</td><td><code translate="no">FP32</code> のベクトルメモリの半分で、精度の損失は最小限に抑えられます。</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>8ビットスカラー量子化</td><td><code translate="no">FP32</code> のベクトルメモリの4分の1。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>,<code translate="no">LVQ8x0</code></td><td>LVQを主方式とし、残差なし</td><td>Intel製CPUのみ。再ランク付けなし。</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>,<code translate="no">LVQ4x8</code></td><td>LVQを主関数とし、残差関数を使用</td><td>Intel製CPUのみ。</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>,<code translate="no">LeanVec4x8</code>,<code translate="no">LeanVec8x8</code></td><td>LeanVec（プライマリおよびセカンダリ）</td><td>Intel製CPUのみ。次元削減を設定するには、<code translate="no">_&lt;dim&gt;</code> という接尾辞を追加します。例えば、<code translate="no">LeanVec4x8_128</code> と指定すると、プライマリデータセットが128次元へと削減されます。接尾辞を省略した場合、次元削減後の次元数は<code translate="no">dim / 2</code> となります。</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> は良い出発点となります。そこから：</p>
<ul>
<li><p>メモリコストを多少犠牲にしても<strong>リコール率を高めたい</strong>場合は、<code translate="no">_&lt;dim&gt;</code> というサフィックスを使用してLeanVecの次元数を増やします。</p></li>
<li><p>リコール率を多少犠牲にして<strong>メモリ使用量を削減したい</strong>場合は、LeanVecの次元数を下げます。</p></li>
<li><p>低次元のベクトルの場合は、<code translate="no">LVQ8</code> を試してみてください。</p></li>
<li><p><strong>Intel製以外のCPUでは</strong>、<code translate="no">FP16</code> または<code translate="no">SQ8</code> を使用してください。</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">インデックスの構築<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、グラフの次数 64 および LeanVec 圧縮を使用した SVS Vamana インデックスを構築します。インデックスを構築する前に、セットアップ ブロックを展開して実行してください。</p>
<p><details></p>
<p><summary>コレクションの準備</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p><code translate="no">index_type</code> を<code translate="no">FAISS</code> に設定し、<code translate="no">faiss_index_name</code> を使用して SVS Vamana レシピを選択します。</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">インデックスの検索<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> は、<a href="https://milvus.io/docs/hnsw.md">HNSW</a>における<code translate="no">ef</code> と同様に、リコールとレイテンシのトレードオフを制御します。<code translate="no">search_buffer_capacity</code> を少なくとも同等の値に設定してください。両方のデフォルト値は10であり、SVSは<code translate="no">search_window_size</code> が<code translate="no">search_buffer_capacity</code> を超える検索を拒否します。</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">limit</code> が<code translate="no">search_window_size</code> より大きい場合、SVSはその検索に対してウィンドウを<code translate="no">limit</code> まで拡大します。</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">SVS Vamana パラメータ<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のビルドパラメータは、<code translate="no">add_index()</code> 内の<code translate="no">params</code> に、<code translate="no">faiss_index_name</code> の隣に指定します。インデックスの構築後は、これらを変更することはできません。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>デフォルト</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>グラフ構築時に各ノードの近傍を特定するために使用される候補リストのサイズ。値を大きくするとグラフの品質とリコール率は向上しますが、構築に時間がかかります。少なくともグラフの次数以上の値に設定してください。200 が一般的な設定値です。</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> <code translate="no">L2</code> については 、 については<code translate="no">0.95</code> <code translate="no">IP</code> <code translate="no">COSINE</code></td><td><code translate="no">L2</code> 、<code translate="no">IP</code> 、<code translate="no">COSINE</code> の「Pruning strength」。1から離れた値ほど積極的に剪定が行われ、冗長な短距離エッジよりも長距離エッジが優先されます。 には1より大きい値を、 および には1より小さい値を使用してください。自身のデータでより良い値が確認できない限り、デフォルト値のままにしておいてください。</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>ファクトリ文字列の「degree」、または<code translate="no">32</code></td><td>ノードあたりの最大エッジ数。ファクトリ文字列で指定された次数よりも優先されます。[32, 128]の範囲の値が、ほとんどのワークロードに適しています。値を大きくするとリコール率は向上しますが、メモリ使用量が増加し、構築に時間がかかります。</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>グラフの次数から4を引いた値</td><td>グラフの次数を超えたノードが、プルーニング後に保持するエッジの数。</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>ノードの隣接ノードを剪定する際に検討される候補の最大数。<code translate="no">construction_window_size</code> より大きくする必要があります。</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>剪定時に、最終候補だけでなく、構築検索中に訪問したすべてのノードを考慮するかどうか。</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> ファクトリ文字列のサフィックス、または<code translate="no">dim / 2</code></td><td>LeanVec のみ。プライマリデータセットの次元削減値。ファクトリ文字列の接尾辞を上書きします。値を小さくするとメモリ使用量が減り、グラフ検索が高速化されますが、リコール率は低下します。</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> LeanVec用</td><td>LeanVecのみ。インデックス化されたベクトルとクエリに対して、別々の射影を学習するかどうか。構築を高速化するには、<code translate="no">False</code> に設定してください。LeanVec以外のファクトリで<code translate="no">True</code> を設定すると失敗します。</td></tr>
</tbody>
</table>
<p>以下の検索パラメータは `<code translate="no">search_params.params</code>` に指定します。これらをビルドパラメータとして設定することも可能で、その場合、これらのパラメータが設定されていない検索に対してインデックスが使用するデフォルト値が変更されます。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>デフォルト</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>グラフの探索中に保持される最寄りの候補の数。値を大きくすると、リコール率とレイテンシが増加します。</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>検索バッファの容量。<code translate="no">search_window_size</code> 以上である必要があります。ほとんどの場合、<code translate="no">search_window_size</code> に設定してください。LeanVec を使用する場合は、<code translate="no">search_window_size</code> の 1.5 倍を試してみてください。</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">詳細<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>一般的なファクトリ・ストリングの契約、制限、およびエラー処理については、<a href="https://milvus.io/docs/faiss.md">FAISSインデックスパススルーの</a>リファレンスを参照してください。</li>
<li><a href="https://milvus.io/docs/diskann.md">DISKANN</a>に含まれるディスク上のVamana実装と比較してください。</li>
<li>ビルドの詳細、パフォーマンスのチューニング、および基盤となる C++ API については、<a href="https://github.com/intel/ScalableVectorSearch">SVS リポジトリ</a>を参照してください。</li>
</ul>
