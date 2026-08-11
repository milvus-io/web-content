---
id: index-explained.md
title: インデックスの解説
summary: >-
  インデックスとは、データの上に構築される追加の構造体です。その内部構造は、使用されている近似最近傍探索アルゴリズムによって異なります。インデックスは検索を高速化しますが、検索時に追加の前処理時間、容量、およびRAMを消費します。さらに、インデックスを使用すると通常、リコール率が低下します（その影響はごくわずかですが、それでも重要な要素です）。
  そこで、本記事では、インデックス利用のメリットを最大化しつつ、そのコストを最小限に抑える方法について解説します。
---
<h1 id="Index-Explained" class="common-anchor-header">インデックスの解説<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>インデックスとは、データの上に構築される追加の構造体です。その内部構造は、使用されている近似最近傍探索アルゴリズムによって異なります。インデックスは検索を高速化しますが、その一方で、検索時に追加の前処理時間、ディスク容量、およびRAMを消費します。さらに、インデックスを使用すると通常、リコール率が低下します（その影響はごくわずかですが、それでも重要な要素です）。 そこで、本記事では、インデックス利用のメリットを最大化しつつ、そのコストを最小限に抑える方法について解説します。</p>
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
    </button></h2><p>Milvusでは、インデックスはフィールドごとに設定され、適用可能なインデックスタイプは対象フィールドのデータ型によって異なります。プロフェッショナルなベクトルデータベースとして、Milvusはベクトル検索とスカラーフィルタリングの両方のパフォーマンス向上に重点を置いており、そのため様々なインデックスタイプを提供しています。</p>
<p>以下の表に、フィールドのデータ型と適用可能なインデックス型の対応関係を示します。</p>
<table>
   <tr>
     <th><p>フィールドのデータ型</p></th>
     <th><p>適用可能なインデックス種別</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (推奨)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>BITMAP（推奨）</p></li><li><p>反転</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTED</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>（BOOL、INT8/16/32/64、およびVARCHAR型の要素）</sup></p></td>
     <td><p>BITMAP (推奨)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>（BOOL、INT8/16/32/64、FLOAT、DOUBLE、および VARCHAR 型の要素）</sup>INVERTED</p></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>この記事では、適切なベクトルインデックスの選択方法に焦点を当てています。スカラーフィールドについては、常に推奨されるインデックスタイプを使用できます。</p>
<p>ベクトル検索に適したインデックス型を選択することは、パフォーマンスとリソース使用量に大きな影響を与えます。ベクトルフィールドのインデックス型を選択する際には、基盤となるデータ構造、メモリ使用量、パフォーマンス要件など、さまざまな要素を考慮することが不可欠です。</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">ベクトルインデックスの構成<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>下の図に示すように、Milvus のインデックス型は、<strong>データ構造</strong>、<strong>量子化</strong>、<strong>リファイナー</strong>という 3 つの主要なコンポーネントで構成されています。量子化とリファイナーはオプションですが、コストを上回る大きなメリットがあるため、広く利用されています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>ベクトルインデックスの構成</span>
  
 </span></p>
<p>インデックスの作成時、Milvusは選択されたデータ構造と量子化手法を組み合わせて、最適な<strong>拡張率を</strong>決定します。クエリ実行時には、システムが<code translate="no">topK × expansion rate</code> の候補ベクトルを取得し、リファイナーを適用してより高精度な距離を再計算し、最終的に最も正確な<code translate="no">topK</code> の結果を返します。このハイブリッドなアプローチは、リソースを大量に消費する精緻化処理をフィルタリングされた候補のサブセットに限定することで、速度と精度のバランスを取っています。</p>
<h3 id="Data-structure" class="common-anchor-header">データ構造<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>データ構造は、インデックスの基盤となる層を形成します。一般的なタイプには以下が含まれます：</p>
<ul>
<li><p><strong>反転ファイル（IVF）</strong></p>
<p>IVFシリーズのインデックスタイプにより、Milvusは重心に基づくパーティショニングを通じてベクトルをバケットにクラスタリングできます。一般的に、バケットの重心がクエリベクトルに近い場合、そのバケット内のすべてのベクトルもクエリベクトルに近い可能性が高いと想定しても差し支えません。 この前提に基づき、Milvusはデータセット全体を調査するのではなく、中心点がクエリベクトルに近いバケット内のベクトル埋め込みのみをスキャンします。この戦略により、許容可能な精度を維持しつつ、計算コストを削減できます。</p>
<p>この種のインデックスデータ構造は、高速なスループットが求められる大規模データセットに最適です。</p></li>
<li><p><strong>グラフベースの構造</strong></p>
<p>Hierarchical Navigable Small World（<a href="https://arxiv.org/abs/1603.09320">HNSW</a>）などのベクトル検索用のグラフベースのデータ構造は、各ベクトルが最も近い隣接ベクトルと接続される階層的なグラフを構築します。クエリはこの階層を、粗い上位層から開始して下位層へと移行しながら探索し、対数時間での効率的な検索を実現します。</p>
<p>この種のインデックスデータ構造は、高次元空間や、低遅延のクエリが求められるシナリオにおいて特に優れています。</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">量子化<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>量子化は、表現を粗くすることでメモリ使用量と計算コストを削減します。</p>
<ul>
<li><p><strong>スカラー量子化</strong>（例：<strong>SQ8</strong>）により、Milvusは各ベクトル次元を1バイト（8ビット）に圧縮でき、妥当な精度を維持しつつ、32ビット浮動小数点数と比較してメモリ使用量を75％削減します。</p></li>
<li><p><strong>積量子化</strong>（<strong>PQ</strong>）により、Milvusはベクトルを部分ベクトルに分割し、コードブックベースのクラスタリングを用いてエンコードします。これにより、リコール率がわずかに低下する代償として、より高い圧縮率（例：4～32倍）を実現し、メモリに制約のある環境に適しています。</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">リファイナー<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>量子化は本質的に損失を伴います。リコール率を維持するため、量子化では常に必要以上に多くのトップK候補が生成されます。これにより、リファイナーはより高い精度を用いてこれらの候補からトップKの結果をさらに選別し、リコール率を向上させることができます。</p>
<p>例えば、FP32リファイナーは、量子化によって返された検索結果の候補に対して、量子化された値ではなくFP32精度を用いて距離を再計算することで処理を行います。</p>
<p>これは、わずかな距離の変動が結果の品質に大きな影響を与える、セマンティック検索やレコメンデーションシステムなど、検索効率と精度のトレードオフが求められるアプリケーションにとって極めて重要です。</p>
<h3 id="Summary" class="common-anchor-header">概要<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>この階層型アーキテクチャ（データ構造による粗いフィルタリング、量子化による効率的な計算、およびリファイニングによる精度の調整）により、Milvus は精度とパフォーマンスのトレードオフを適応的に最適化することができます。</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">パフォーマンスのトレードオフ<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>パフォーマンスを評価する際には、<strong>構築時間</strong>、<strong>1 秒あたりのクエリ数 (QPS)</strong>、および<strong>リコール率の</strong>バランスをとることが重要です。一般的なルールは次のとおりです。</p>
<ul>
<li><p><strong>グラフベースのインデックスタイプは</strong>、通常、<strong>QPS</strong>の点で<strong>IVFバリアント</strong>よりも優れたパフォーマンスを発揮します。</p></li>
<li><p><strong>IVFバリアントは</strong>、特に<strong>トップKの値が大きい</strong>シナリオ<strong>（例えば2,000以上）</strong>に適しています。</p></li>
<li><p><strong>PQは</strong>、<strong>SQ</strong>と比較して同程度の圧縮率であれば通常、より高いリコール率を提供しますが、<strong>SQ</strong>の方がパフォーマンスは高速です。</p></li>
<li><p>インデックスの一部にハードドライブを使用すること（<strong>DiskANN</strong> など）は、大規模なデータセットの管理に役立ちますが、IOPS のボトルネックが発生する可能性もあります。</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">容量<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>容量は通常、データサイズと利用可能な RAM の関係に関わります。容量を扱う際には、以下の点を考慮してください。</p>
<ul>
<li><p>生データの 4 分の 1 がメモリに収まる場合は、レイテンシが安定している DiskANN の使用を検討してください。</p></li>
<li><p>生データ全体がメモリに収まる場合は、メモリベースのインデックス型やmmapを検討してください。</p></li>
<li><p>量子化が適用されたインデックス型やmmapを使用することで、精度を犠牲にして最大容量を確保することができます。</p></li>
</ul>
<div class="alert note">
<p>mmapが常に最適な解決策とは限りません。データの大部分がディスク上にある場合は、DiskANNの方が優れたレイテンシを提供します。</p>
</div>
<h3 id="Recall" class="common-anchor-header">リコール<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>リコールには通常、フィルタ比が関係します。フィルタ比とは、検索前にフィルタリングされて除外されるデータの割合を指します。リコールを検討する際は、以下の点を考慮してください。</p>
<ul>
<li><p>フィルタ比が 85% 未満の場合、グラフベースのインデックスタイプは IVF バリアントよりも優れたパフォーマンスを発揮します。</p></li>
<li><p>フィルタ比率が 85% から 95% の場合は、IVF バリアントを使用してください。</p></li>
<li><p>フィルタ比率が98%を超える場合は、最も正確な検索結果を得るためにブルートフォース（FLAT）を使用してください。</p></li>
</ul>
<div class="alert note">
<p>上記の項目は常に正しいとは限りません。どのインデックスタイプが適しているかを判断するために、さまざまなインデックスタイプを用いてリコールを調整することをお勧めします。</p>
</div>
<h3 id="Performance" class="common-anchor-header">パフォーマンス<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>検索のパフォーマンスは通常、検索結果として返されるレコード数を指す「トップK」によって評価されます。パフォーマンスを検討する際は、以下の点に留意してください。</p>
<ul>
<li><p>トップKが小さく（例：2,000）、高いリコール率が必要な検索の場合、グラフベースのインデックスタイプはIVFバリアントよりも優れたパフォーマンスを発揮します。</p></li>
<li><p>（ベクトル埋め込みの総数と比較して）top-Kが非常に大きい検索の場合、グラフベースのインデックスタイプよりもIVFバリアントの方が適しています。</p></li>
<li><p>中程度のトップK数でフィルタ比が高い検索の場合、IVFバリアントの方が適しています。</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">決定マトリックス：最適なインデックスタイプの選択<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>以下の表は、適切なインデックス・タイプを選択する際の参考となる決定マトリックスです。</p>
<table>
   <tr>
     <th><p>シナリオ</p></th>
     <th><p>推奨インデックス</p></th>
     <th><p>備考</p></th>
   </tr>
   <tr>
     <td><p>生データがメモリに収まる場合</p></td>
     <td><p>HNSW、IVF + 精緻化</p></td>
     <td><p>低<code translate="no">k</code> ／高リコールの場合にはHNSWを使用する。</p></td>
   </tr>
   <tr>
     <td><p>ディスク（SSD）上の生データ</p></td>
     <td><p>DiskANN</p></td>
     <td><p>レイテンシに敏感なクエリに最適です。</p></td>
   </tr>
   <tr>
     <td><p>ディスク上の生データ、RAMが限られている場合</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>メモリとディスクへのアクセスのバランスが取れています。</p></td>
   </tr>
   <tr>
     <td><p>高いフィルタリング率（95%以上）</p></td>
     <td><p>ブルートフォース (FLAT)</p></td>
     <td><p>候補セットがごく小さい場合、インデックスによるオーバーヘッドを回避します。</p></td>
   </tr>
   <tr>
     <td><p>大規模な<code translate="no">k</code> （データセットの1%以上）</p></td>
     <td><p>IVF</p></td>
     <td><p>クラスタの剪定により計算量を削減します。</p></td>
   </tr>
   <tr>
     <td><p>極めて高いリコール率（&gt;99%）</p></td>
     <td><p>ブルートフォース (FLAT) + GPU</p></td>
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
<p>このセクションでは、特定のインデックスタイプのメモリ消費量の算出に焦点を当て、多くの技術的な詳細を扱っています。ご興味のない場合は、このセクションをスキップしても問題ありません。</p>
</div>
<p>インデックスのメモリ消費量は、そのデータ構造、量子化による圧縮率、および使用されているリファイナーの影響を受けます。一般的に、グラフベースのインデックスは、グラフの構造（例：<strong>HNSW</strong>）によりメモリ使用量が多くなる傾向があり、これは通常、ベクトル空間ごとの顕著なオーバーヘッドを意味します。 対照的に、IVFおよびその派生型は、ベクトル空間ごとのオーバーヘッドが小さいため、メモリ効率に優れています。ただし、<strong>DiskANN</strong>のような高度な技術を用いることで、グラフやリファイナーといったインデックスの一部をディスク上に配置することが可能となり、パフォーマンスを維持しつつメモリ負荷を軽減できます。</p>
<p>具体的には、インデックスのメモリ使用量は次のように計算できます：</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVFインデックスのメモリ使用量<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>IVFインデックスは、データをクラスタに分割することで、メモリ効率と検索パフォーマンスのバランスを取っています。以下は、IVFのバリエーションを使用してインデックス化された100万個の128次元ベクトルが使用するメモリの内訳です。</p>
<ol>
<li><p><strong>中心点（セントロイド）が使用するメモリを計算します。</strong></p>
<p>IVFシリーズのインデックスタイプにより、Milvusはセントロイドベースのパーティショニングを使用してベクトルをバケットにクラスタリングできます。各セントロイドは、生のベクトル埋め込みとしてインデックスに含まれます。ベクトルを2,000のクラスタに分割する場合、メモリ使用量は次のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>クラスタ割り当てによるメモリ使用量を計算します。</strong></p>
<p>各ベクトル埋め込みはクラスターに割り当てられ、整数IDとして格納されます。2,000個のクラスターの場合、2バイトの整数で十分です。メモリ使用量は次のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>量子化による圧縮効果を計算する。</strong></p>
<p>IVFのバリエーションでは通常、PQとSQ8が使用され、メモリ使用量は次のように推定できます：</p>
<ul>
<li><p>8つのサブ量子化器を用いたPQの場合</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>SQ8を使用する場合</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>以下の表は、さまざまな構成における推定メモリ使用量を示しています：</p>
<p><table>
<tr>
<th><p>構成</p></th>
<th><p>メモリ使用量の推定値</p></th>
<th><p>合計メモリ</p></th>
</tr>
<tr>
<td><p>IVF-PQ（精細化なし）</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10%の粗い精細化</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8（精細化なし）</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT（完全な生ベクトルデータ）</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>精緻化のオーバーヘッドを計算する。</strong></p>
<p>IVFのバリエーションでは、候補の再ランク付けを行うためにリファイナーと組み合わせて使用されることがよくあります。拡張率5で上位10件の結果を取得する検索の場合、絞り込みのオーバーヘッドは次のように推定できます：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">グラフベースのインデックスにおけるメモリ使用量<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSWのようなグラフベースのインデックス型では、グラフ構造と生のベクトル埋め込みの両方を格納するために多量のメモリが必要です。以下は、HNSWインデックス型を使用してインデックス化された100万個の128次元ベクトルが消費するメモリの詳細な内訳です。</p>
<ol>
<li><p><strong>グラフ構造が使用するメモリを計算します。</strong></p>
<p>HNSW では、各ベクトルが近隣ノードとの接続を維持しています。グラフの次数（ノードあたりの辺数）が 32 の場合、消費されるメモリは次のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>生のベクトル埋め込みが使用するメモリ量を計算します。</strong></p>
<p>非圧縮のFP32ベクトルを格納するために消費されるメモリは、次のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>HNSWを使用して100万個の128次元ベクトル埋め込みをインデックス化する場合、使用されるメモリの合計<strong>は128 MB（グラフ）＋512 MB（ベクトル）＝640 MB</strong>となります。</p></li>
<li><p><strong>量子化による圧縮率を計算します。</strong></p>
<p>量子化によりベクトルのサイズが縮小されます。例えば、8つのサブ量子化器（ベクトルあたり8バイト）を用いたPQを使用すると、大幅な圧縮が実現されます。圧縮されたベクトル埋め込みが消費するメモリは、次のように計算できます：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>これにより、生のベクトル埋め込みと比較して64倍の圧縮率が達成され、<strong>HNSWPQ</strong>インデックスタイプが使用する総メモリは<strong>128 MB（グラフ）＋8 MB（圧縮ベクトル）＝136 MB</strong>となります。</p></li>
<li><p><strong>精緻化のオーバーヘッドを計算します。</strong></p>
<p>生ベクトルを用いた再ランク付けなどの精緻化処理では、高精度データが一時的にメモリに読み込まれます。拡張率5で上位10件の結果を取得する検索の場合、精緻化のオーバーヘッドは次のように推定できます：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">その他の考慮事項<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF やグラフベースのインデックスは量子化によってメモリ使用量を最適化しますが、メモリマップドファイル（mmap）や DiskANN は、データセットが利用可能なランダムアクセスメモリ（RAM）容量を超えるシナリオに対応します。</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANNは、Vamanaグラフベースのインデックスであり、検索時の効率的なナビゲーションのためにデータポイントを接続すると同時に、PQを適用してベクトルのサイズを縮小し、ベクトル間の近似距離を迅速に計算できるようにします。</p>
<p>Vamanaグラフはディスク上に格納されるため、DiskANNは、メモリに収まりきらないほど大規模なデータセットを処理することが可能です。これは、10億データポイント規模のデータセットにおいて特に有用です。</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">メモリマップされたファイル (mmap)</h4><p>メモリマッピング（mmap）により、ディスク上の大容量ファイルへの直接メモリアクセスが可能となり、Milvusはインデックスとデータをメモリとハードドライブの両方に格納できるようになります。このアプローチは、アクセス頻度に基づいてI/O呼び出しのオーバーヘッドを削減することでI/O操作を最適化し、検索パフォーマンスに大きな影響を与えることなくコレクションのストレージ容量を拡張します。</p>
<p>具体的には、特定のフィールドの生データをメモリに完全に読み込むのではなく、メモリマッピングするようにMilvusを設定できます。これにより、メモリの問題を気にすることなくフィールドへの直接メモリアクセスが可能になり、コレクションの容量を拡張できます。</p>
