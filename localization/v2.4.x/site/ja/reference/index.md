---
id: index.md
related_key: index
summary: Milvusのインデックス機構。
title: インメモリインデックス
---
<h1 id="In-memory-Index" class="common-anchor-header">インメモリインデックス<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusがサポートする様々なタイプのインメモリインデックス、それぞれのインデックスが最適なシナリオ、および、より良い検索パフォーマンスを達成するためにユーザが設定できるパラメータについて説明します。オンディスクインデックスについては、<strong><a href="/docs/ja/v2.4.x/disk_index.md">オンディスクインデックスを</a></strong>参照してください。</p>
<p>インデックスはデータを効率的に整理するプロセスであり、大規模なデータセットに対する時間のかかるクエリを劇的に高速化することで、類似検索を有用なものにする上で大きな役割を果たします。</p>
<p>クエリー性能を向上させるために、各ベクトルフィールドに<a href="/docs/ja/v2.4.x/index-vector-fields.md">インデックスタイプを指定する</a>ことができます。</p>
<div class="alert note">
現在、ベクトルフィールドは1つのインデックスタイプしかサポートしていません。Milvusはインデックスタイプを切り替えると古いインデックスを自動的に削除します。</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNSベクトルインデックス<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusがサポートするベクトルインデックスタイプのほとんどは、近似最近傍探索(ANNS)アルゴリズムを使用しています。通常非常に時間のかかる正確な検索と比較して、ANNSの核となる考え方は、もはや最も正確な結果を返すことに限定されず、ターゲットの近傍のみを検索することです。ANNSは、許容範囲内の精度を犠牲にすることで、検索効率を向上させる。</p>
<p>実装方法によって、ANNSベクトルインデックスは4つのタイプに分類される：ツリーベース、グラフベース、ハッシュベース、量子化ベースである。</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Milvusでサポートされるインデックス<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは様々なインデックスタイプをサポートしており、それらは扱うベクトル埋め込みタイプによって分類されます：<strong>浮動小数点埋め込み</strong>（浮動小数点ベクトルまたは密ベクトルとも呼ばれる）、<strong>バイナリ埋め込み</strong>（バイナリベクトルとも呼ばれる）、<strong>スパース埋め込み</strong>（スパースベクトルとも呼ばれる）。</p>
<div class="filter">
 <a href="#floating">浮動小数点</a> <a href="#binary">埋め込み バイナリ埋め込み</a> <a href="#sparse">スパース埋め込み</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">浮動小数点埋込みのインデックス</h3><p>128次元の浮動小数点埋め込み（ベクトル）の場合、浮動小数点埋め込みが占有するストレージは128 * floatのサイズ = 512バイトです。また、浮動小数点埋め込みに使われる<a href="/docs/ja/v2.4.x/metric.md">距離指標は</a>、ユークリッド距離 (<code translate="no">L2</code>) と内積 (<code translate="no">IP</code>) です。</p>
<p>これらのタイプのインデックスには、CPUベースのANN検索用に<code translate="no">FLAT</code>,<code translate="no">IVF_FLAT</code>,<code translate="no">IVF_PQ</code>,<code translate="no">IVF_SQ8</code>,<code translate="no">HNSW</code>,<code translate="no">SCANN</code> がある。</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">バイナリ埋め込み用インデックス</h3><p>128次元のバイナリ埋め込みでは、128 / 8 = 16バイトのストレージを占有する。そして、バイナリ埋め込みに使われる距離メトリックスは<code translate="no">JACCARD</code> と<code translate="no">HAMMING</code> です。</p>
<p>このタイプのインデックスには、<code translate="no">BIN_FLAT</code> と<code translate="no">BIN_IVF_FLAT</code> がある。</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">スパース埋め込みインデックス</h3><p>スパース埋め込みでサポートされる距離メトリックは，<code translate="no">IP</code> のみです．</p>
<p>このタイプのインデックスには，<code translate="no">SPARSE_INVERTED_INDEX</code> と<code translate="no">SPARSE_WAND</code> があります．</p>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>サポートされるインデックス</th>
    <th>分類</th>
    <th>シナリオ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>フラット</td>
    <td>該当なし</td>
    <td>
      <ul>
        <li>比較的小さなデータセット</li>
        <li>100%の再現率が必要</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>高速クエリ</li>
        <li>可能な限り高い再現率が必要</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>高速クエリ</li>
        <li>限られたメモリリソース</li>
        <li>想起率の多少の妥協は許容</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>超高速クエリ</li>
        <li>限られたメモリリソース</li>
        <li>想起率の大幅な妥協を受け入れる</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>グラフベースのインデックス</td>
    <td>
      <ul>
        <li>非常に高速なクエリ</li>
        <li>可能な限り高い想起率を要求</li>
        <li>大きなメモリリソース</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>非常に高速なクエリ</li>
        <li>可能な限り高い再現率が必要</li>
        <li>大きなメモリリソース</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>対応インデックス</th>
    <th>分類</th>
    <th>シナリオ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>量子化ベースのインデックス</td>
    <td><ul>
      <li>比較的小さなデータセットに依存。</li>
      <li>完璧な精度が必要。</li>
      <li>圧縮は適用されない。</li>
      <li>正確な検索結果を保証する。</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>量子化ベースのインデックス</td>
    <td><ul>
      <li>高速クエリ</li>
      <li>可能な限り高い再現率が必要</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>対応インデックス</th>
    <th>分類</th>
    <th>シナリオ</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>sparse_inverted_index</td>
    <td>転置インデックス</td>
    <td><ul>
      <li>比較的小さなデータセットに依存。</li>
      <li>100%の再現率が必要。</li>
    </ul></td>
  </tr>
  <tr>
    <td>スパースワンド</td>
    <td>転置インデックス</td>
    <td><ul>
      <li><a href="https://dl.acm.org/doi/10.1145/956863.956944">弱いAND</a>アルゴリズムの高速化。</li>
      <li>わずかな想起率を犠牲にするのみで、大幅な速度向上を得ることができる。</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">フラット</h3><p>完璧な精度が要求され、比較的小さな（百万規模の）データセットに依存するベクトル類似検索アプリケーションには、FLATインデックスが良い選択である。FLATはベクトルを圧縮せず、正確な検索結果を保証できる唯一のインデックスである。FLATの結果は、再現率が100%に満たない他のインデックスが生成した結果の比較対象としても使用できる。</p>
<p>FLATが正確なのは、検索に網羅的なアプローチをとるからである。つまり、クエリごとに、ターゲット入力がデータセット内のすべてのベクトル集合と比較される。このため、FLATは我々のリストの中で最も遅いインデックスであり、膨大なベクトルデータのクエリには適していない。MilvusではFLATインデックスに必要なパラメータはなく、これを使用することでデータ学習も不要である。</p>
<ul>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[オプション] 選択された距離メトリック。</td><td><a href="/docs/ja/v2.4.x/metric.md">サポートされるメトリックを</a>参照。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT はベクトルデータを<code translate="no">nlist</code> クラスタ単位に分割し、ターゲット入力ベクトルと各クラスタの中心との距離を比較します。システムがクエリに設定したクラスタ数 (<code translate="no">nprobe</code>) に応じて、ターゲット入力と最も類似したクラスタ内のベクトルとの比較のみに基づいて類似性検索結果が返され、クエリ時間が大幅に短縮されます。</p>
<p><code translate="no">nprobe</code> を調整することで、シナリオに応じた精度と速度の理想的なバランスを見つけることができる。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLATの性能テストの</a>結果は、ターゲット入力ベクトルの数(<code translate="no">nq</code>)と検索するクラスタの数(<code translate="no">nprobe</code>)の両方が増加すると、クエリ時間が急激に増加することを示しています。</p>
<p>IVF_FLATは最も基本的なIVFインデックスであり、各ユニットに格納される符号化データは元データと一致する。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td><td>128</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範囲検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>パラメータ</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/>これは範囲検索パラメータであり、連続した空のバケツの数が指定された値に達する間、検索プロセスを終了する。<br/>この値を大きくすると、検索時間が長くなる代償として、リコール率を向上させることができる。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLATは圧縮を行わないため、生成されるインデックスファイルのサイズは、インデックス付けされていない元の生のベクトルデータとほぼ同じです。例えば、元の 1B SIFT データセットが 476 GB の場合、IVF_FLAT のインデックスファイルは若干小さくなります（~470 GB）。すべてのインデックスファイルをメモリにロードすると、470GBのストレージを消費します。</p>
<p>ディスク、CPU、GPU のメモリリソースが限られている場合は、IVF_FLAT よりも IVF_SQ8 の方が適しています。このインデックスタイプは、スカラー量子化（SQ）を実行することで、各 FLOAT（4バイト）を UINT8（1バイト）に変換することができます。これにより、ディスク、CPU、GPUのメモリ消費量が70～75%削減される。1B SIFTデータセットの場合、IVF_SQ8インデックスファイルに必要なストレージはわずか140GBです。</p>
<ul>
<li><p>インデックス作成パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範囲検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>パラメータ</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/>これは範囲検索パラメータであり、連続した空のバケツの数が指定された値に達する間、検索プロセスを終了する。<br/>この値を大きくすると、検索時間が長くなる代償として、リコール率を向上させることができる。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (Product Quantization) は、元の高次元ベクトル空間を、 低次元ベクトル空間のデカルト積に一様に分解し、分解された低次元ベクトル空間を量子化する。積量子化により、対象ベクトルと全ユニットの中心との距離を計算する代わりに、対象ベクトルと各低次元空間のクラスタリング中心との距離を計算することが可能となり、アルゴリズムの時間的複雑性と空間的複雑性を大幅に削減することができる。<code translate="no">m</code> </p>
<p>IVF_PQ は，ベクトルの積を量子化する前にIVFインデックスクラスタリングを行います．そのインデックスファイルはIVF_SQ8よりもさらに小さいが、ベクトル探索時の精度が低下する。</p>
<div class="alert note">
<p>インデックス作成パラメータと検索パラメータはMilvus分布によって異なります。まずはMilvusディストリビューションを選択してください。</p>
</div>
<ul>
<li><p>インデックス作成パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>積量子化の因子数</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[オプション] 各低次元ベクトルが格納されるビット数。</td><td>[1, 64] (デフォルトは8)</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範囲検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>パラメータ</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/>これは範囲検索パラメータであり、連続した空のバケツの数が指定された値に達する間、検索プロセスを終了する。<br/>この値を大きくすると、検索時間が長くなる代償として、リコール率を向上させることができる。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN (Scalable Nearest Neighbors) は、ベクトルクラスタリングと積量子化という点でIVF_PQに似ています。両者の違いは、積量子化の実装の詳細と、効率的な計算のためのSIMD（Single-Instruction / Multi-data）の使用にあります。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>生データをインデックスに含めるかどうか</td><td><code translate="no">True</code> または 。デフォルトは 。<code translate="no">False</code> <code translate="no">True</code></td></tr>
</tbody>
</table>
  <div class="alert note">
<p>IVF_PQ とは異なり、パフォーマンスを最適化するために、デフォルト値は<code translate="no">m</code> と<code translate="no">nbits</code> に適用されます。</p>
  </div>
</li>
<li><p>検索パラメータ</p>
<ul>
<li><p>共通検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>クエリーするユニット候補の数</td><td>[<code translate="no">top_k</code>, ∞ ]を指定する。</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>範囲検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>パラメータ</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/>これは範囲検索パラメータであり、連続した空のバケツの数が指定された値に達する間、検索プロセスを終了する。<br/>この値を大きくすると、検索時間が長くなる代償として、リコール率を向上させることができる。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW（Hierarchical Navigable Small World Graph）は、グラフベースのインデックス作成アルゴリズムである。HNSWは、ある規則に従って、画像に対して多層のナビゲーション構造を構築する。この構造では、上層ほど疎でノード間の距離が遠く、下層ほど密でノード間の距離が近い。探索は最上層から開始し、この層でターゲットに最も近いノードを見つけ、次の層に入って別の探索を開始する。何度も繰り返すうちに、目標位置に素早く近づくことができる。</p>
<p>パフォーマンスを向上させるために、HNSWはグラフの各レイヤー上のノードの最大次数を<code translate="no">M</code> に制限している。さらに、<code translate="no">efConstruction</code> （インデックス構築時）または<code translate="no">ef</code> （ターゲット検索時）を使って検索範囲を指定することができる。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M は、グラフ内の発信接続の最大数を定義します。Mが大きいほど、固定ef/efConstructionでの精度/run_timeが高くなる。</td><td>[2, 2048]</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction は、インデックス検索速度と構築速度のトレードオフを制御する。efConstructionパラメータを大きくするとインデックスの品質が向上するが、インデックス作成時間が長くなる傾向がある。</td><td>[1, int_max］</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>検索時間と精度のトレードオフを制御するパラメータ。<code translate="no">ef</code> が高いほど検索精度は高くなるが、検索時間は遅くなる。</td><td>[<code translate="no">top_k</code>, int_max］</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>このインデックスはFLATと全く同じであるが、バイナリ埋め込みにのみ使用できる。</p>
<p>完璧な精度が要求され、比較的小さな（百万規模の）データセットに依存するベクトル類似検索のアプリケーションには、BIN_FLATインデックスが良い選択です。BIN_FLAT はベクトルを圧縮せず、正確な検索結果を保証できる唯一のインデックスです。BIN_FLATの結果は、再現率が100%に満たない他のインデックスが作成した結果の比較対象としても使用できます。</p>
<p>BIN_FLATが正確なのは、検索に網羅的なアプローチを取るからである。つまり、クエリごとに、ターゲット入力がデータセットのベクトルと比較される。このため、BIN_FLATは我々のリストの中で最も遅いインデックスであり、膨大なベクトルデータのクエリには適していない。MilvusにはBIN_FLATインデックス用のパラメータはなく、これを使用することでデータトレーニングや追加ストレージを必要としない。</p>
<ul>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[オプション] 選択された距離メトリック。</td><td><a href="/docs/ja/v2.4.x/metric.md">サポートされるメトリックを</a>参照してください。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>このインデックスは IVF_FLAT と全く同じですが、バイナリ埋め込みにのみ使用できます。</p>
<p>BIN_IVF_FLAT はベクトルデータを<code translate="no">nlist</code> クラスタ単位に分割し、ターゲット入力ベクトルと各クラスタの中心との距離を比較します。システムがクエリに設定するクラスタ数（<code translate="no">nprobe</code> ）に応じて、ターゲット入力と最も類似したクラスタ（複数可）内のベクトル間の比較に基づく類似性検索結果が返され、クエリ時間が大幅に短縮されます。</p>
<p><code translate="no">nprobe</code> を調整することで、精度と速度の理想的なバランスを見つけることができます。クエリ時間は、ターゲット入力ベクトルの数 (<code translate="no">nq</code>) と検索するクラスタの数 (<code translate="no">nprobe</code>) の両方が増加するにつれて急激に増加します。</p>
<p>BIN_IVF_FLATは最も基本的なBIN_IVFインデックスであり、各ユニットに格納されるエンコードされたデータは元のデータと一致する。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>クラスタユニット数</td><td>[1, 65536]</td></tr>
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
<tr><td><code translate="no">nprobe</code></td><td>検索するユニットの数</td><td>[1, nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>範囲検索</p>
<table>
<thead>
<tr><th>パラメータ</th><th>パラメータ</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td><br/>これは範囲検索パラメータであり、連続した空のバケツの数が指定された値に達する間、検索プロセスを終了する。<br/>この値を大きくすると、検索時間が長くなる代償として、リコール率を向上させることができる。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">sparse_inverted_index</h3><p>各次元は、その次元で0でない値を持つベクトルのリストを保持する。検索中、milvusはクエリベクトルの各次元を繰り返し、その次元で非ゼロ値を持つベクトルのスコアを計算する。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>インデックス作成時に除外される小さなベクトル値の割合。このオプションを使用すると、インデックスを作成する際に小さな値を無視することで、効率と精度のトレードオフを行い、インデックス作成プロセスを微調整することができます。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>検索処理中に除外する小さなベクトル値の割合。このオプションは、クエリベクトル内の最小値を無視する割合を指定することで、検索処理を微調整することができます。検索精度とパフォーマンスのバランスをとるのに役立ちます。<code translate="no">drop_ratio_search</code> に設定する値が小さければ小さいほど、これらの小さな値が最終的なスコアに与える影響は小さくなります。いくつかの小さな値を無視することで、精度への影響を最小限に抑えながら検索パフォーマンスを向上させることができる。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="SPARSEWAND" class="common-anchor-header">SPARSE_WAND</h3><p>このインデックスは、<code translate="no">SPARSE_INVERTED_INDEX</code> と類似しているが、<a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a>アルゴリズムを利用することで、検索プロセスにおけるフル IP 距離評価の回数をさらに減らしている。</p>
<p>我々のテストに基づくと、<code translate="no">SPARSE_WAND</code> は一般的にスピードの点で他の方法を上回る。しかし、その性能はベクトルの密度が高くなるにつれて急激に悪化する可能性がある。この問題に対処するため、ゼロでない<code translate="no">drop_ratio_search</code> を導入することで、精度の低下を最小限に抑えつつ、性能を大幅に向上させることができます。詳細は<a href="/docs/ja/v2.4.x/sparse_vector.md">スパースベクトルを</a>参照。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>インデックス作成時に除外する小さなベクトル値の割合。このオプションを使用すると、インデックスを作成する際に小さな値を除外することで、効率と精度のトレードオフを行い、インデックス作成処理を微調整することができます。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>検索処理中に除外する小さなベクトル値の割合。このオプションは、クエリベクトル内の最小値を無視する割合を指定することで、検索処理を微調整することができます。検索精度とパフォーマンスのバランスをとるのに役立ちます。<code translate="no">drop_ratio_search</code> に設定する値が小さければ小さいほど、これらの小さな値が最終的なスコアに与える影響は小さくなります。いくつかの小さな値を無視することで、精度への影響を最小限に抑えながら検索性能を向上させることができる。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">FLATインデックスとIVF_FLATインデックスの違いは何ですか？</font></summary></p>
<p>IVF_FLAT インデックスはベクトル空間を<code translate="no">nlist</code> クラスタに分割します。<code translate="no">nlist</code> のデフォルト値を16384のままにしておくと、Milvusはターゲットベクトルと16384クラスタすべての中心との距離を比較し、<code translate="no">nprobe</code> 最も近いクラスタを取得します。次に、Milvusはターゲットベクトルと選択されたクラスタのベクトル間の距離を比較し、最も近いベクトルを得ます。IVF_FLATと異なり、FLATはターゲットベクトルと各ベクトル間の距離を直接比較します。</p>
<p>
そのため、ベクトルの総数が<code translate="no">nlist</code> 程度であれば、IVF_FLAT と FLAT は、必要な計算方法や探索性能にほとんど差がありません。しかし、ベクトル数が<code translate="no">nlist</code> の2倍、3倍、n倍になるにつれて、IVF_FLATインデックスがますます大きな利点を示し始めます。</p>
<p>
詳しくは<a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Milvusにおけるインデックスの選び方を</a>参照してください。</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvusでサポートされている<a href="/docs/ja/v2.4.x/metric.md">類似度指標について</a>詳しく知る。</li>
</ul>
