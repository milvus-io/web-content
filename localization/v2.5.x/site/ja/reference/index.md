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
    </button></h1><p>このトピックでは、Milvusがサポートする様々なタイプのインメモリインデックス、それぞれのインデックスが最適なシナリオ、および、より良い検索パフォーマンスを達成するためにユーザが設定できるパラメータについて説明します。オンディスクインデックスについては、<strong><a href="/docs/ja/v2.5.x/disk_index.md">オンディスクインデックスを</a></strong>参照してください。</p>
<p>インデックスはデータを効率的に整理するプロセスであり、大規模なデータセットに対する時間のかかるクエリを劇的に高速化することで、類似検索を有用なものにする上で大きな役割を果たします。</p>
<p>クエリー性能を向上させるために、各ベクトルフィールドに<a href="/docs/ja/v2.5.x/index-vector-fields.md">インデックスタイプを指定する</a>ことができます。</p>
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
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">浮動小数点埋込みのインデックス</h3><p>128次元の浮動小数点埋め込み（ベクトル）の場合、浮動小数点埋め込みが占有するストレージは128 * floatのサイズ = 512バイトです。また、浮動小数点埋め込みに使われる<a href="/docs/ja/v2.5.x/metric.md">距離指標は</a>、ユークリッド距離 (<code translate="no">L2</code>) と内積 (<code translate="no">IP</code>) です。</p>
<p>これらのタイプのインデックスには、<code translate="no">FLAT</code> 、<code translate="no">IVF_FLAT</code> 、<code translate="no">IVF_PQ</code> 、<code translate="no">IVF_SQ8</code> 、<code translate="no">HNSW</code> 、<code translate="no">HNSW_SQ</code> 、<code translate="no">HNSW_PQ</code> 、<code translate="no">HNSW_PRQ</code> 、<code translate="no">SCANN</code> 、CPUベースのANN検索用などがある。</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">バイナリ埋め込み用インデックス</h3><p>128次元のバイナリ埋め込みでは、128 / 8 = 16バイトのストレージを占有する。そして、バイナリ埋め込みに使われる距離メトリックは<code translate="no">JACCARD</code> と<code translate="no">HAMMING</code> です。</p>
<p>このタイプのインデックスには、<code translate="no">BIN_FLAT</code> と<code translate="no">BIN_IVF_FLAT</code> がある。</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">スパース埋め込みインデックス</h3><p>スパース埋め込み用のインデックスは、<code translate="no">IP</code> と<code translate="no">BM25</code> （全文検索用） メトリクスのみをサポートします。</p>
<p>スパース埋め込みに対応するインデックスタイプ:<code translate="no">SPARSE_INVERTED_INDEX</code> 。</p>
<div class="alert note">
<p>Milvus 2.5.4以降、<code translate="no">SPARSE_WAND</code> は廃止予定です。代わりに、互換性を維持しながら同等性を保つために<code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> を使用することが推奨されます。詳細は<a href="/docs/ja/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">スパースベクタを</a>参照してください。</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>対応インデックス</th>
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
    <td>該当なし</td>
    <td>
      <ul>
        <li>高速クエリ</li>
        <li>可能な限り高い回収率が必要</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>超高速クエリ</li>
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
        <li>高速クエリ</li>
        <li>限られたメモリリソース</li>
        <li>想起率のわずかな妥協を受け入れる</li>
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
    <td>HNSW_SQ</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>超高速クエリ</li>
        <li>限られたメモリリソース</li>
        <li>想起率に若干の妥協を許容</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>中速クエリ</li>
        <li>非常に限られたメモリリソース</li>
        <li>想起率に若干の妥協を許容</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>中速クエリ</li>
        <li>非常に限られたメモリリソース</li>
        <li>想起率に若干の妥協を許容</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>量子化ベースのインデックス</td>
    <td>
      <ul>
        <li>非常に高速なクエリー</li>
        <li>可能な限り高い想起率を要求</li>
        <li>メモリリソースが大きい</li>
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
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>完全な精度が要求され、比較的小規模な（100万個規模の）データセットに依存する ベクトル類似検索アプリケーションには、FLATインデックスが適している。FLATはベクトルを圧縮せず、正確な検索結果を保証できる唯一のインデックスである。FLATの結果は、再現率が100%に満たない他のインデックスが生成した結果の比較対象としても使用できる。</p>
<p>FLATが正確なのは、検索に網羅的なアプローチをとるからである。つまり、クエリごとに、ターゲット入力がデータセット内のすべてのベクトル集合と比較される。このため、FLATは我々のリストの中で最も遅いインデックスであり、膨大なベクトルデータのクエリには適していない。MilvusではFLATインデックスに必要なパラメータはなく、FLATインデックスを使用することで追加のインデックス構築は必要ありません。</p>
<ul>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[オプション] 選択された距離メトリック。</td><td><a href="/docs/ja/v2.5.x/metric.md">サポートされるメトリックを</a>参照。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT はベクトルデータを<code translate="no">nlist</code> クラスタ単位に分割し、ターゲット入力ベクトルと各クラスタの中心との距離を比較します。システムがクエリに設定したクラスタ数 (<code translate="no">nprobe</code>) に応じて、ターゲット入力と最も類似したクラスタ内のベクトルとの比較のみに基づいて類似性検索結果が返され、クエリ時間が大幅に短縮されます。</p>
<p><code translate="no">nprobe</code> を調整することで、シナリオに応じた精度と速度の理想的なバランスを見つけることができる。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLATの性能テストの</a>結果は、ターゲット入力ベクトルの数(<code translate="no">nq</code>)と検索するクラスタの数(<code translate="no">nprobe</code>)の両方が増加すると、クエリ時間が急激に増加することを示しています。</p>
<p>IVF_FLATは最も基本的なIVFインデックスであり、各ユニットに格納される符号化データは元データと一致している。</p>
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
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLATは圧縮を行わないため、生成されるインデックスファイルのサイズは、インデックス付けされていない元の生のベクトルデータとほぼ同じです。例えば、元の 1B SIFT データセットが 476 GB である場合、IVF_FLAT のインデックスファイルは若干小さくなります (~470 GB)。すべてのインデックスファイルをメモリにロードすると、470GBのストレージを消費します。</p>
<p>ディスク、CPU、GPU のメモリリソースが限られている場合は、IVF_FLAT よりも IVF_SQ8 の方が適しています。このインデックスタイプは、スカラー量子化（SQ）を実行することで、各 FLOAT（4バイト）を UINT8（1バイト）に変換することができます。これにより、ディスク、CPU、GPUのメモリ消費量が70～75%削減される。1B SIFTデータセットの場合、IVF_SQ8インデックスファイルは140GBのストレージで済みます。</p>
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
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Mは、グラフ内の発信接続の最大数を定義する。M が大きいほど、固定 ef/efConstruction での精度/run_time が高くなる。</td><td>[2, 2048]</td><td>なし</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction はインデックス検索速度と構築速度のトレードオフを制御します。efConstructionパラメータを大きくするとインデックスの品質が向上しますが、インデックス作成時間が長くなる傾向があります。</td><td>[1, int_max］</td><td>なし</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>検索時間と精度のトレードオフを制御するパラメータ。<code translate="no">ef</code> を高くすると、検索精度は高くなるが、検索時間は遅くなる。</td><td>[<code translate="no">top_k</code>, int_max］</td><td>なし</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>スカラー量子化(SQ)は、浮動小数点データをその大きさに基づいて有限の値の集合に離散化するために使用される技法である。例えば、<strong>SQ6 は</strong>(2^6 = 64) 個の離散値への量子化を表し、各浮動小数点数は 6 ビットでエンコードされる。同様に、<strong>SQ8 は</strong>データを (2^8 = 256) 個の離散値に量子化し、各浮動小数点数は 8 ビットで表されます。この量子化により、効率的な処理のためにデータの本質的な構造を保持しながら、メモリフットプリントを削減します。</p>
<p>SQと組み合わせることで、HNSW_SQは高いクエリーパーセカンド（QPS）性能を維持しながら、インデックスサイズと精度のトレードオフを制御できる。標準的なHNSWと比較すると、インデックス構築時間の増加はわずかである。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Mは、グラフ内の発信接続の最大数を定義する。M が大きいほど、固定 ef/efConstruction での精度/run_time が高くなる。</td><td>[2, 2048]</td><td>なし</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction はインデックス検索速度と構築速度のトレードオフを制御します。efConstructionパラメータを大きくするとインデックスの品質が向上しますが、インデックス作成時間が長くなる傾向があります。</td><td>[1, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>スカラー量子化タイプ。</td><td><code translate="no">SQ6</code><code translate="no">SQ8</code>, 、<code translate="no">BF16</code> <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>インデックス構築時に洗練されたデータを予約するかどうか。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>リファインインデックスのデータ型。</td><td><code translate="no">SQ6</code> <code translate="no">SQ8</code>, , 、<code translate="no">BF16</code> <code translate="no">FP16</code> <code translate="no">FP32</code></td><td>なし</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>検索時間と精度のトレードオフを制御するパラメータ。<code translate="no">ef</code> を高くすると、検索精度は高くなるが、検索時間は遅くなる。</td><td>[<code translate="no">top_k</code>, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>kに対する</em>refineの倍率。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>PQ の基本的な考え方は，ベクトルを<code translate="no">m</code> 個の部分ベクトルに分割し，それぞれの部分ベクトルが kmeans に基づいて<em>2^{nbits}</em> のセントロイドを見つけ，それぞれの部分ベクトルがその近似部分ベクトルとして最も近いセントロイドを選択することである．そして、すべてのセントロイドを記録する。したがって、各サブベクトルは<code translate="no">nbits</code> 、長さ<code translate="no">dim</code> の浮動ベクトルは<em>m・nビットとして</em>符号化できる。</p>
<p>PQと組み合わせることで、HNSW_PQはインデックスサイズと精度のトレードオフを制御できるが、同じ圧縮率ではHNSW_SQよりQPS値が低く、想起率が高い。HNSW_SQと比較すると、インデックス構築に時間がかかる。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Mは、グラフ内の発信接続の最大数を定義する。M が大きいほど、固定 ef/efConstruction での精度/run_time が高くなる。</td><td>[2, 2048]</td><td>なし</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction はインデックス検索速度と構築速度のトレードオフを制御します。efConstructionパラメータを大きくするとインデックスの品質が向上しますが、インデックス作成時間が長くなる傾向があります。</td><td>[1, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">m</code></td><td>ベクトルを分割するサブベクターグループの数。</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>各グループのサブベクトルを量子化するビット数。</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>インデックス構築時に洗練されたデータを予約するかどうか。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>絞り込みインデックスのデータ型。</td><td><code translate="no">SQ6</code> <code translate="no">SQ8</code>, , 、<code translate="no">BF16</code> <code translate="no">FP16</code> <code translate="no">FP32</code></td><td>なし</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>検索時間と精度のトレードオフを制御するパラメータ。<code translate="no">ef</code> を高くすると、検索精度は高くなるが、検索時間は遅くなる。</td><td>[<code translate="no">top_k</code>, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>kに対する</em>refineの倍率。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ は PQ に似ており、ベクトルを<code translate="no">m</code> グループに分割する。各サブベクトルは<code translate="no">nbits</code> として符号化される。pq 量子化が完了すると、ベクトルと pq 量子化されたベクトルとの残差を計算し、残差ベクトルに pq 量子化を適用する。合計<code translate="no">nrq</code> の完全な pq 量子化が実行されるため、長さ<code translate="no">dim</code> の浮動ベクトルは<em>m・nビット・nrq</em>ビットとして符号化されます。</p>
<p>積残差量子化器（PRQ）と組み合わせることで、HNSW_PRQはインデックスサイズと精度のトレードオフをさらに高く制御できる。HNSW_PRQは同じ圧縮率でHNSW_PQとほぼ同等のQPS値と高い再現率を持つ。HNSW_PQと比較すると、インデックス構築にかかる時間は数倍になる可能性がある。</p>
<ul>
<li><p>インデックス構築パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>Mは、グラフ内の発信接続の最大数を定義する。M が大きいほど、固定 ef/efConstruction での精度/run_time が高くなる。</td><td>[2, 2048]</td><td>なし</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction はインデックス検索速度と構築速度のトレードオフを制御します。efConstructionパラメータを大きくするとインデックスの品質が向上しますが、インデックス作成時間が長くなる傾向があります。</td><td>[1, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">m</code></td><td>ベクトルを分割するサブベクターグループの数。</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>各グループのサブベクトルを量子化するビット数。</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>残余部分量子化器の数。</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>インデックス構築時にリファインデータを予約するかどうか。</td><td><code translate="no">true</code>,<code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>絞り込みインデックスのデータ型。</td><td><code translate="no">SQ6</code> <code translate="no">SQ8</code>, , 、<code translate="no">BF16</code> <code translate="no">FP16</code> <code translate="no">FP32</code></td><td>なし</td></tr>
</tbody>
</table>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th><th>デフォルト値</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>検索時間と精度のトレードオフを制御するパラメータ。<code translate="no">ef</code> を高くすると、検索精度は高くなるが、検索時間は遅くなる。</td><td>[<code translate="no">top_k</code>, int_max］</td><td>なし</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>kに対する</em>refineの倍率。</td><td>[1,<em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>このインデックスはFLATと全く同じですが、バイナリ埋め込みにのみ使用できます。</p>
<p>完璧な精度が要求され、比較的小さな（100万個規模の）データセットに依存するベクトル類似検索のアプリケーションでは、BIN_FLATインデックスが良い選択です。BIN_FLAT はベクトルを圧縮せず、正確な検索結果を保証できる唯一のインデックスです。BIN_FLATの結果は、再現率が100%に満たない他のインデックスが作成した結果の比較対象としても使用できます。</p>
<p>BIN_FLATが正確なのは、検索に網羅的なアプローチを取るからである。つまり、クエリごとに、ターゲット入力がデータセットのベクトルと比較される。このため、BIN_FLATは我々のリストの中で最も遅いインデックスであり、膨大なベクトルデータのクエリには適していない。MilvusにはBIN_FLATインデックス用のパラメータはなく、これを使用することでデータトレーニングや追加ストレージを必要としない。</p>
<ul>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[オプション] 選択された距離メトリック。</td><td><a href="/docs/ja/v2.5.x/metric.md">サポートされるメトリックを</a>参照してください。</td></tr>
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
<tr><td><code translate="no">inverted_index_algo</code></td><td>インデックスの構築とクエリに使用されるアルゴリズム。詳細は<a href="/docs/ja/v2.5.x/sparse_vector.md#Set-index-params-for-vector-field">Sparse Vector</a> を参照。</td><td><code translate="no">DAAT_MAXSCORE</code> (デフォルト), 、<code translate="no">DAAT_WAND</code> <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>用語頻度の飽和度を制御する。値が高いほど、文書ランキングにおける用語頻度の重要度が増す。</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>文書の長さを正規化する範囲を制御する。デフォルトは0.75。</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>Milvus v2.5.4以降、<code translate="no">drop_ratio_build</code> パラメータは非推奨となりました。インデックス作成時にこのパラメータを指定することはできますが、インデックスに実際の影響を与えることはありません。</p>
  </div>
</li>
<li><p>検索パラメータ</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>範囲</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>検索処理中に除外される小さなベクトル値の割合。このオプションは、クエリベクトル内の最小値を無視する比率を指定することで、検索処理を微調整することができます。検索精度とパフォーマンスのバランスをとるのに役立ちます。<code translate="no">drop_ratio_search</code> に設定する値が小さければ小さいほど、これらの小さな値が最終的なスコアに与える影響は小さくなります。いくつかの小さな値を無視することで、精度への影響を最小限に抑えながら検索性能を向上させることができる。</td><td>[0, 1]</td></tr>
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
そのため、ベクトルの総数が<code translate="no">nlist</code> 程度であれば、IVF_FLAT と FLAT は、必要な計算方法や探索性能にほとんど差がありません。しかし、ベクトル数が<code translate="no">nlist</code> の2倍、3倍、n倍と増えるにつれて、IVF_FLATインデックスがますます大きな利点を示し始めます。</p>
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
<li>Milvusでサポートされている<a href="/docs/ja/v2.5.x/metric.md">類似度指標について</a>詳しく知る。</li>
</ul>
