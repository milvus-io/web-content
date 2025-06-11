---
id: index-explained.md
title: インデックスの説明
summary: >-
  インデックスはデータの上に構築される追加構造である。その内部構造は、使用する近似最近傍探索アルゴリズムに依存する。インデックスは検索を高速化するが、検索中の前処理時間、スペース、RAMが追加される。さらに、インデックスを使用すると一般的に想起率が低下する（その影響は無視できるほど小さいが、それでも重要である）。そこでこの記事では、インデックスを使用するコストを最小化しつつ、メリットを最大化する方法を説明する。
---
<h1 id="Index-Explained" class="common-anchor-header">インデックスの説明<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>インデックスはデータの上に構築される付加的な構造である。その内部構造は、使用する近似最近傍探索アルゴリズムに依存する。インデックスは検索を高速化しますが、検索中の前処理時間、スペース、RAMが追加されます。さらに、インデックスを使用すると一般的に想起率が低下する（その影響は無視できるほど小さいが、それでも重要である）。そこで、この記事では、インデックスを使用するコストを最小化しつつ、メリットを最大化する方法について説明する。</p>
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
    </button></h2><p>Milvusでは、インデックスはフィールドに固有のものであり、対象フィールドのデータ型によって適用可能なインデックスタイプが異なります。Milvusはプロフェッショナルなベクトルデータベースとして、ベクトル検索とスカラーフィルタリングの両方のパフォーマンスを向上させることに重点を置いており、そのために様々なインデックスタイプを提供しています。</p>
<p>以下の表はフィールドデータ型と適用可能なインデックス型の対応関係です。</p>
<table>
   <tr>
     <th><p>フィールドデータ型</p></th>
     <th><p>適用可能なインデックス・タイプ</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>BLOAT16_VECTOR</p></li></ul></td>
     <td><ul><li><p>フラット</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>バイナリベクトル</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>スパースフロートベクトル</p></td>
     <td><p>スパース・インバーテッド・インデックス</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED（再推奨）</p></li><li><p>ビットマップ</p></li><li><p>トライ</p></li></ul></td>
   </tr>
   <tr>
     <td><p>論理</p></td>
     <td><ul><li>BITMAP（推奨）</li><li>INVERTED</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>INVERTED</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>（BOOL、INT8/16/32/64、VARCHAR型の要素）</sup></p></td>
     <td><p>BITMAP（推奨）</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>（BOOL、INT8/16/32/64、FLOAT、DOUBLE、VARCHAR型の要素）</sup></p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>この記事では、適切なベクトル・インデックスの選択方法を中心に説明します。スカラー・フィールドでは、常に推奨されるインデックス・タイプを使用できます。</p>
<p>ベクトル検索に適切なインデックス型を選択することは、パフォーマンスやリソース使用量に大きな影響を与えます。ベクトルフィールドのインデックスタイプを選択する際には、基礎となるデータ構造、メモリ使用量、パフォーマンス要件など、さまざまな要因を考慮することが不可欠です。</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">ベクトル・インデックスの解剖<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>下図に示すように、Milvusのインデックスタイプは、<strong>データ構造</strong>、<strong>量子化</strong>、<strong>リファイナーという</strong>3つのコアコンポーネントから構成されています。量子化とリファイナーはオプションですが、コストよりも利益が大きいため、広く使用されています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>ベクトルインデックスの解剖</span> </span></p>
<p>インデックス作成時、milvusは選択されたデータ構造と量子化方法を組み合わせ、最適な<strong>展開率を</strong>決定する。クエリ時には、<code translate="no">topK × expansion rate</code> 候補ベクトルを検索し、リファイナーを適用してより高い精度で距離を再計算し、最終的に最も正確な<code translate="no">topK</code> 結果を返す。このハイブリッド・アプローチは、リソースを大量に消費する精密化を、フィルタリングされた候補のサブセットに制限することで、速度と精度のバランスをとっている。</p>
<h3 id="Data-structure" class="common-anchor-header">データ構造</h3><p>データ構造はインデックスの基礎となるレイヤーを形成する。一般的なタイプは以下の通り：</p>
<ul>
<li><p><strong>転置ファイル（IVF）</strong></p>
<p>IVFシリーズのインデックスタイプは、Milvusがセントロイドベースのパーティショニングによってベクトルをバケットにクラスタリングすることを可能にします。一般に、バケットの重心がクエリベクトルに近ければ、バケット内のすべてのベクトルはクエリベクトルに近いと仮定しても安全です。この前提に基づき、milvusはデータセット全体を調べるのではなく、重心がクエリベクトルに近いバケット内のベクトルの埋め込みのみをスキャンする。この戦略により、許容できる精度を維持しながら計算コストを削減することができる。</p>
<p>この種のインデックスデータ構造は、高速スループットを必要とする大規模データセットに最適である。</p></li>
<li><p><strong>グラフベース構造</strong></p>
<p><a href="https://arxiv.org/abs/1603.09320">HNSW（Hierarchical</a> Navigable Small World）のような、ベクトル検索用のグラフベースのデータ構造は、各ベクトルが最近傍のベクトルに接続する階層グラフを構築する。クエリーはこの階層をナビゲートし、粗い上層から始めて下層を切り替えることで、効率的な対数時間の検索複雑性を実現する。</p>
<p>このタイプのインデックス・データ構造は、高次元空間や低レイテンシーのクエリを必要とするシナリオに優れている。</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">量子化</h3><p>量子化は、より粗い表現によってメモリフットプリントと計算コストを削減します：</p>
<ul>
<li><p><strong>スカラー量子化</strong>（<strong>SQ8など</strong>）により、milvusは各ベクトル次元を1バイト（8ビット）に圧縮し、32ビット浮動小数点数と比較してメモリ使用量を75%削減することができます。</p></li>
<li><p><strong>積量子化</strong><strong>(PQ</strong>)は、Milvusがベクトルをサブベクトルに分割し、コードブックベースのクラスタリングを用いて符号化することを可能にします。これにより、高い圧縮率（例：4～32倍）が達成され、その代償として再現性がわずかに低下するため、メモリに制約のある環境に適しています。</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">リファイナー</h3><p>量子化は本質的に損失が大きい。リコール率を維持するために、量子化は一貫して必要以上のトップK候補を生成するため、リファイナーはより高い精度を使用してこれらの候補からトップK結果をさらに選択し、リコール率を向上させることができます。</p>
<p>例えば、FP32リファイナーは、量子化によって返された検索結果候補に対して、量子化された値ではなくFP32の精度を用いて距離を再計算する操作を行います。</p>
<p>これは、セマンティック検索や推薦システムなど、検索効率と精度のトレードオフを必要とするアプリケーションにおいて重要であり、わずかな距離の変動が結果の品質に大きく影響する。</p>
<h3 id="Summary" class="common-anchor-header">まとめ</h3><p>データ構造による粗いフィルタリング、量子化による効率的な計算、そして洗練による精度チューニングという階層化されたアーキテクチャにより、Milvusは精度と性能のトレードオフを適応的に最適化することができる。</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">性能のトレードオフ<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>パフォーマンスを評価する場合、<strong>ビルド時間</strong>、<strong>1秒あたりのクエリー数（QPS）</strong>、<strong>リコール率の</strong>バランスが非常に重要です。一般的なルールは以下の通りである：</p>
<ul>
<li><p><strong>グラフベースのインデックスタイプは</strong>通常、<strong>QPSの</strong>点で<strong>IVFの亜種を</strong>上回る。</p></li>
<li><p><strong>IVFバリアントは</strong>特に<strong>大きなtopK（例えば2,000以上）の</strong>シナリオに適している。</p></li>
<li><p><strong>PQは</strong>通常、<strong>SQと</strong>比較して、同程度の圧縮率でより優れた想起率を提供するが、後者の方がより高速なパフォーマンスを提供する。</p></li>
<li><p><strong>DiskANNの</strong>ように）インデックスの一部にハードディスクを使用することは、大きなデータセットの管理に役立つが、IOPSのボトルネックになる可能性もある。</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">容量</h3><p>容量は通常、データサイズと利用可能なRAMの関係を含む。容量を扱う場合、次のように考える：</p>
<ul>
<li><p>生データの4分の1がメモリに収まるなら、安定したレイテンシーを持つDiskANNを検討する。</p></li>
<li><p>生データの4分の1がメモリに収まるなら、安定したレイテンシを持つDiskANNを検討する。生データがすべてメモリに収まるなら、メモリベースのインデックスタイプとmmapを検討する。</p></li>
<li><p>量子化を適用したインデックスタイプとmmapを使用することで、精度と最大容量を交換することができます。</p></li>
</ul>
<div class="alert note">
<p>mmapが常に解決策とは限らない。ほとんどのデータがディスク上にある場合、DiskANNの方がレイテンシが優れています。</p>
</div>
<h3 id="Recall" class="common-anchor-header">リコール</h3><p>リコールは通常フィルター比率に関係し、検索前にフィルターで除外されるデータを指す。リコールを扱う場合、以下を考慮してください：</p>
<ul>
<li><p>フィルター比率が85%未満の場合、グラフベースのインデックスタイプはIVFの亜種を凌駕する。</p></li>
<li><p>フィルタ比率が 85% から 95% の場合は、IVF variant を使う。</p></li>
<li><p>フィルター比率が 98% 以上なら、最も正確な検索結果を得るために Brute-Force (FLAT) を使う。</p></li>
</ul>
<div class="alert note">
<p>上記の項目が常に正しいとは限りません。どのインデックスタイプが有効かを判断するために、異なるインデックスタイプでリコールをチューニングすることをお勧めします。</p>
</div>
<h3 id="Performance" class="common-anchor-header">パフォーマンス</h3><p>検索のパフォーマンスには通常、検索が返すレコード数を意味する top-K が含まれます。パフォーマンスを扱う場合、以下のことを考慮してください：</p>
<ul>
<li><p>高い想起率を必要とする小さなトップK（例えば2,000）の検索では、グラフベースのインデックスタイプはIVFバリアントよりも優れている。</p></li>
<li><p>ベクトル埋め込み総数と比較して）大きなトップKを持つ検索では、グラフベースのインデックスタイプよりもIVFバリアントが良い選択となる。</p></li>
<li><p>top-Kが中程度でフィルタ比率が高い検索では、IVF変種がより良い選択となる。</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">決定マトリクス最適なインデックスタイプの選択</h3><p>以下の表は、適切なインデックスタイプを選択する際に参照する決定マトリクスです。</p>
<table>
   <tr>
     <th><p>シナリオ</p></th>
     <th><p>推奨インデックス</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td><p>生データがメモリに収まる</p></td>
     <td><p>HNSW、IVF＋リファインメント</p></td>
     <td><p>低<code translate="no">k</code>/高リコールにはHNSWを使用。</p></td>
   </tr>
   <tr>
     <td><p>ディスク上の生データ、SSD</p></td>
     <td><p>ディスクANN</p></td>
     <td><p>レイテンシを重視するクエリに最適。</p></td>
   </tr>
   <tr>
     <td><p>ディスク上の生データ、限られたRAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>メモリアクセスとディスクアクセスのバランス</p></td>
   </tr>
   <tr>
     <td><p>高いフィルター比率（95%以上）</p></td>
     <td><p>ブルートフォース（FLAT）</p></td>
     <td><p>小さな候補集合のインデックス・オーバーヘッドを回避。</p></td>
   </tr>
   <tr>
     <td><p>大規模<code translate="no">k</code> (データセットの1%以上)</p></td>
     <td><p>IVF</p></td>
     <td><p>クラスタ刈り込みにより計算量を削減。</p></td>
   </tr>
   <tr>
     <td><p>極めて高い想起率 (&gt;99%)</p></td>
     <td><p>ブルートフォース (FLAT) + GPUs</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">メモリ使用量の推定<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>このセクションでは、特定のインデックス・タイプのメモリ消費量の計算に焦点を当て、多くの技術的な詳細を含みます。自分の興味に合わない場合は、このセクションを読み飛ばしても問題ありません。</p>
</div>
<p>インデックスのメモリ消費量は、そのデータ構造、量子化による圧縮率、使用するリファイナーに影響される。一般的に言って、グラフベースのインデックスは、グラフの構造（<strong>HNSW</strong> など）によりメモリフットプリントが大きくなる。対照的に、IVFとその亜種は、ベクトル毎の空間オーバヘッドが少ないため、メモリ効率が高い。しかし、<strong>DiskANNの</strong>ような高度な技術では、グラフやリファイナーといったインデックスの一部をディスクに常駐させることができるため、性能を維持しながらメモリ負荷を軽減することができる。</p>
<p>具体的には、インデックスのメモリ使用量は以下のように計算できる：</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVFインデックスのメモリ使用量</h3><p>IVFインデックスは、データをクラスタに分割することで、メモリ効率と検索性能のバランスをとっています。以下は、IVF バリアントを使用してインデックスを作成した 128 次元ベクトル 100 万個が使用するメモリの内訳です。</p>
<ol>
<li><p><strong>セントロイドが使用するメモリを計算します。</strong></p>
<p>IVFシリーズのインデックスタイプにより、Milvusはセントロイドベースのパーティショニングを使用して、ベクトルをバケットにクラスタ化することができます。各セントロイドは生のベクトル埋め込みにおけるインデックスに含まれます。ベクトルを2,000のクラスタに分割すると、メモリ使用量は以下のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>クラスタ割り当てによって使用されるメモリを計算します。</strong></p>
<p>各ベクトル埋め込みはクラスタに割り当てられ、整数のIDとして格納されます。2,000クラスタの場合、2バイトの整数で十分です。メモリ使用量は次のように計算できる：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>量子化による圧縮を計算する。</strong></p>
<p>IVFの亜種は通常PQとSQ8を使用し、メモリ使用量は以下のように見積もることができる：</p>
<ul>
<li><p>PQと8個の副量子化器を使用した場合。</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>SQ8を使用</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>次の表は、さまざまな構成での推定メモリ使用量の一覧である：</p>
<p><table>
<tr>
<th><p>構成</p></th>
<th><p>メモリ推定量</p></th>
<th><p>総メモリ量</p></th>
</tr>
<tr>
<td><p>IVF-PQ (絞り込みなし)</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ+10%生リファインメント</p></td>
<td><p>1.0 mb + 2.0 mb + 8.0 mb + 51.2 mb</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (リファインなし)</p></td>
<td><p>1.0 mb + 2.0 mb + 128 mb</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT（完全な生ベクトル）</p></td>
<td><p>1.0 mb + 2.0 mb + 512 mb</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>精密化オーバーヘッドの計算</strong></p>
<p>IVF バリアントはしばしばリファイナーとペアになって候補を再ランク付けする。上位10件を検索する検索で、拡張率が5の場合、絞り込みのオーバーヘッドは以下のように見積もられる：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">グラフベースインデックスのメモリ使用量</h3><p>HNSWのようなグラフベースのインデックス・タイプは、グラフ構造と生のベクトル埋め込みを保存するために大きなメモリを必要とします。以下は、HNSWインデックスタイプを使用してインデックス付けされた128次元ベクトル100万個が消費するメモリの詳細な内訳です。</p>
<ol>
<li><p><strong>グラフ構造が使用するメモリを計算する。</strong></p>
<p>HNSWの各ベクトルは近傍との接続を維持する。グラフ次数（ノードあたりの辺）を32とすると、消費されるメモリは以下のように計算できる：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>生のベクトル埋め込みが使用するメモリを計算する。</strong></p>
<p>非圧縮 FP32 ベクトルを格納するために消費されるメモリは以下のように計算できる：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>100万個の128次元ベクトル埋め込みをHNSWでインデックス化する場合、使用される総メモリは<strong>128 MB (グラフ) + 512 MB (ベクトル) = 640 MBと</strong>なります。</p></li>
<li><p><strong>量子化による圧縮を計算する。</strong></p>
<p>量子化はベクトルサイズを縮小します。例えば、8つのサブ量子化器（1ベクトルあたり8バイト）でPQを使用すると、劇的な圧縮につながります。圧縮されたベクトル埋め込みが消費するメモリは以下のように計算できる：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>これにより、生のベクトル埋め込みと比較して64倍の圧縮率が達成され、<strong>HNSWPQ</strong>インデックスタイプが使用する総メモリは<strong>128MB（グラフ）＋8MB（圧縮ベクトル）＝136MBと</strong>なる。</p></li>
<li><p><strong>精密化のオーバーヘッドを計算する。</strong></p>
<p>生のベクトルによる再ランク付けのような絞り込みは、高精度データを一時的にメモリにロードする。上位 10 件を検索する検索で、拡張率が 5 の場合、リファインメントのオーバーヘッドは以下のように見積もることができる：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">その他の考慮点</h3><p>IVFとグラフベースのインデックスが量子化によってメモリ使用量を最適化するのに対して、メモリマップファイル（mmap）とDiskANNは、データセットが利用可能なランダムアクセスメモリ（RAM）を超えるシナリオに対応します。</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN は Vamana グラフ ベースのインデックスで、検索中にデータ ポイントを効率的にナビゲートできるように接続する一方、PQ を適用してベクトル サイズを縮小し、ベクトル間の近似距離計算を迅速に行うことができます。</p>
<p>Vamana グラフはディスク上に保存されるため、DiskANN はメモリに収まらないような大きなデータセットも扱うことができます。これは特に10億ポイントのデータセットに有効です。</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">メモリ マップ ファイル (mmap)</h4><p>メモリマッピング(Mmap)は、ディスク上の大きなファイルへの直接メモリアクセスを可能にし、Milvusがメモリとハードディスクの両方にインデックスとデータを格納することを可能にします。このアプローチは、アクセス頻度に基づくI/Oコールのオーバーヘッドを削減することでI/Oオペレーションを最適化し、検索パフォーマンスに大きな影響を与えることなくコレクションのストレージ容量を拡張します。</p>
<p>具体的には、Milvusは特定のフィールドの生データを完全にメモリにロードするのではなく、メモリマップするように設定することができます。こうすることで、メモリの問題を心配することなくフィールドに直接メモリアクセスすることができ、コレクション容量を拡張することができます。</p>
