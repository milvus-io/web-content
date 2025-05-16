---
id: knowhere.md
summary: MilvusでKnowhereについて学ぶ。
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusのコアとなるベクトル実行エンジンKnowhereについて紹介します。</p>
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
    </button></h2><p>KnowhereはMilvusの中核となるベクトル実行エンジンで、<a href="https://github.com/facebookresearch/faiss">Faiss</a>、<a href="https://github.com/nmslib/hnswlib">Hnswlib</a>、<a href="https://github.com/spotify/annoy">Annoyを</a>含む複数のベクトル類似性検索ライブラリを内蔵しています。また、Knowhereはヘテロジニアスコンピューティングをサポートするように設計されています。インデックス構築と検索要求をどのハードウェア（CPUまたはGPU）で実行するかを制御する。これがKnowhereの名前の由来である。将来のリリースでは、DPUやTPUを含む、より多くの種類のハードウェアがサポートされる予定です。</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">MilvusアーキテクチャにおけるKnowhere<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>下図は、MilvusアーキテクチャにおけるKnowhereの位置を示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>一番下の層はシステム・ハードウェアです。その上にサードパーティのインデックス・ライブラリが配置されています。一番上のレイヤでは、KnowhereはCGOを介してインデックスノードやクエリノードとやり取りします。</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhereの利点<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>以下はKnowhereがFaissより優れている点です。</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">BitsetViewのサポート</h4><p>Milvusは &quot;ソフト削除 &quot;を実現するためにビットセット機構を導入しています。ソフト削除されたベクトルはデータベースに存在しますが、ベクトルの類似性検索やクエリの際に計算されることはありません。</p>
<p>ビットセットの各ビットはインデックス付きベクトルに対応する。あるベクトルがビットセットで "1 "とマークされた場合、そのベクトルはソフト削除され、ベクトル検索には関与しないことを意味する。bitset パラメータは、CPU および GPU インデックスを含む、Knowhere で公開されているすべての Faiss インデックス照会 API に適用されます。</p>
<p>bitset メカニズムの詳細については、<a href="/docs/ja/v2.4.x/bitset.md">bitset</a> を参照してください。</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">バイナリ・ベクトルのインデックス作成における複数の類似性メトリクスのサポート</h4><p>Knowhereは<a href="/docs/ja/v2.4.x/metric.md#Hamming-distance">ハミング</a>、<a href="/docs/ja/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>、<a href="/docs/ja/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>、<a href="/docs/ja/v2.4.x/metric.md#Superstructure">Superstructure</a>、<a href="/docs/ja/v2.4.x/metric.md#Substructure">Substructureを</a>サポートしています。Jaccard と Tanimoto は 2 つのサンプル・セット間の類似性を測定するために使用でき、Superstructure と Substructure は化学構造の類似性を測定するために使用できます。</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">AVX512命令セットのサポート</h4><p>Faissがすでにサポートしている<a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>、<a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a>、<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>以外に、Knowhereは<a href="https://en.wikipedia.org/wiki/AVX-512">AVX512も</a>サポートしています。AVX512はAVX2と比較して<a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">インデックス構築とクエリの性能を20～30%向上させる</a>ことができます。</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">SIMD命令の自動選択</h4><p>Knowhereは、あらゆるCPUプロセッサ（オンプレミスとクラウドの両方のプラットフォーム）で適切なSIMD命令（SIMD SSE、AVX、AVX2、AVX512など）を自動的に呼び出すことをサポートしているため、ユーザーはコンパイル時にSIMDフラグ（"-msse4 "など）を手動で指定する必要がありません。</p>
<p>KnowhereはFaissのコードベースをリファクタリングして構築されています。SIMDアクセラレーションに依存する一般的な関数（類似度計算など）はファクタアウトされます。次に、各関数について4つのバージョン（すなわち、SSE、AVX、AVX2、AVX512）が実装され、それぞれが別々のソースファイルに入れられます。その後、ソースファイルは対応する SIMD フラグで個別にコンパイルされます。したがって、Knowhere は実行時に現在の CPU フラグに基づいて最適な SIMD 命令を自動的に選択し、フッキングを使用して適切な関数ポインタをリンクします。</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">その他の性能最適化</h4><p>Knowhereのパフォーマンス最適化については、<a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management Systemを</a>参照してください。</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhereのコード構造<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusの計算には主にベクトル演算とスカラー演算が含まれます。Knowhereはベクトル・インデックスの操作のみを処理します。</p>
<p>インデックスは元のベクトルデータから独立したデータ構造です。一般的に、インデックスの作成には、インデックスの作成、データの学習、データの挿入、インデックスの構築という4つのステップが必要です。AIアプリケーションの中には、データセットの学習とベクトル探索が分離されているものもある。データセットのデータはまず学習され、類似検索のためにmilvusのようなベクトルデータベースに挿入される。例えば、オープンデータセットsift1Mとsift1Bは、学習用データとテスト用データを区別している。</p>
<p>しかし、Knowhereでは学習用データと検索用データは同じです。Knowhereは<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">セグメント</a>内のすべてのデータを学習し、学習済みデータを挿入してインデックスを作成します。</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>基底クラス</h4><p><code translate="no">DataObj</code> <code translate="no">Size()</code> は の唯一の仮想メソッドです。Indexクラスは 、&quot;size_&quot;というフィールドを継承しています。また、Index クラスには と の 2 つの仮想メソッドがあります。 から派生した クラスは、すべてのベクトル・インデックスの仮想基底クラスです。 は、 、 、 、 などのメソッドを提供します。<code translate="no">DataObj</code> <code translate="no">DataObj</code> <code translate="no">Serialize()</code> <code translate="no">Load()</code> <code translate="no">Index</code> <code translate="no">VecIndex</code> <code translate="no">VecIndex</code> <code translate="no">Train()</code> <code translate="no">Query()</code> <code translate="no">GetStatistics()</code> <code translate="no">ClearStatistics()</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>基底クラス</span> </span></p>
<p>その他のインデックス・タイプを上図の右側にいくつか示します。</p>
<ul>
<li><p>Faissインデックスには2つの基底クラスがあります：浮動小数点ベクトル上のすべてのインデックス用の<code translate="no">FaissBaseIndex</code> 、バイナリ・ベクトル上のすべてのインデックス用の<code translate="no">FaissBaseBinaryIndex</code> 。</p></li>
<li><p><code translate="no">GPUIndex</code> はすべてのFaiss GPUインデックスの基底クラスです。</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> はすべての自己開発インデックスの基本クラスです。ベクトルIDのみがインデックス・ファイルに格納されることを考えると、128次元ベクトルのファイル・サイズは2桁小さくなります。</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>ブルートフォース検索</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>厳密に言えば、<code translate="no">IDMAP</code> はインデックスではなく、ブルートフォース検索に使用されます。ベクトルがデータベースに挿入される際、データ学習もインデックス構築も必要ない。検索は挿入されたベクトル・データに対して直接行われる。</p>
<p>しかし、コードの一貫性を保つために、<code translate="no">IDMAP</code> は<code translate="no">VecIndex</code> クラスを継承し、その仮想インターフェースもすべて継承している。<code translate="no">IDMAP</code> の使い方は他のインデックスと同じである。</p>
<h4 id="IVF-indices" class="common-anchor-header">IVFインデックス</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>IVF（転置ファイル）インデックスは最も頻繁に使用される。<code translate="no">IVF</code> クラスは<code translate="no">VecIndex</code> と<code translate="no">FaissBaseIndex</code> から派生し、さらに<code translate="no">IVFSQ</code> と<code translate="no">IVFPQ</code> へと拡張される。<code translate="no">GPUIVF</code> は<code translate="no">GPUIndex</code> と<code translate="no">IVF</code> から派生する。そして<code translate="no">GPUIVF</code> はさらに<code translate="no">GPUIVFSQ</code> と<code translate="no">GPUIVFPQ</code> に拡張される。</p>
<p><code translate="no">IVFSQHybrid</code> は、独自に開発したハイブリッド・インデックスである。粗い量子化器はGPUで実行され、バケット内の検索はCPUで実行される。このタイプのインデックスは、GPUの計算能力を活用することで、CPUとGPU間のメモリコピーの発生を減らすことができる。 は、 と同じ想起率を持つが、より優れた性能を持つ。<code translate="no">IVFSQHybrid</code> <code translate="no">GPUIVFSQ</code> </p>
<p><code translate="no">BinaryIDMAP</code> と<code translate="no">BinaryIVF</code> は<code translate="no">FaissBaseBinaryIndex</code> と<code translate="no">VecIndex</code> から派生したものである。</p>
<h4 id="Third-party-indices" class="common-anchor-header">サードパーティ・インデックス</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>サード・パーティ・インデックス</span> </span></p>
<p>現在、Faiss以外のサードパーティ・インデックスとしてサポートされているのは、ツリーベース・インデックス<code translate="no">Annoy</code> とグラフベース・インデックス<code translate="no">HNSW</code> の2種類のみである。これら 2 つの一般的で頻繁に使用されるサードパーティ・インデックスは、いずれも<code translate="no">VecIndex</code> から派生したものである。</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Knowhere へのインデックスの追加<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere に新しいインデックスを追加する場合、まず既存のインデックスを参照します：</p>
<ul>
<li><p>量子化ベースのインデックスを追加するには、<code translate="no">IVF_FLAT</code> を参照。</p></li>
<li><p>グラフベースのインデックスを追加するには、<code translate="no">HNSW</code> を参照。</p></li>
<li><p>ツリーベースのインデックスを追加するには、<code translate="no">Annoy</code> を参照してください。</p></li>
</ul>
<p>既存のインデックスを参照した後、以下の手順に従って新しいインデックスを Knowhere に追加できます。</p>
<ol>
<li><p><code translate="no">IndexEnum</code> に新しいインデックスの名前を追加します。デー タ 型は文字列です。</p></li>
<li><p>フ ァ イ ル<code translate="no">ConfAdapter.cpp</code> に、 新 し い イ ンデ ッ ク ス にデー タ 検証チ ェ ッ ク を追加 し ます。検証チェックは、主にデータ学習とクエリのパラメータを検証するためのものです。</p></li>
<li><p>新しいインデックス用に新しいファイルを作成します。新しいインデックスの基底クラスには、<code translate="no">VecIndex</code> と<code translate="no">VecIndex</code> の必要な仮想インタフェースを含める。</p></li>
<li><p>新しいインデックスのインデックス構築ロジックを<code translate="no">VecIndexFactory::CreateVecIndex()</code> に追加する。</p></li>
<li><p><code translate="no">unittest</code> ディレクトリの下にユニットテストを追加する。</p></li>
</ol>
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
    </button></h2><p>MilvusでKnowhereがどのように動作するのかを学んだ後は、次のことを行ってください：</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/index.md">Milvusがサポートする様々なタイプのインデックスについて</a>学ぶ。</p></li>
<li><p><a href="/docs/ja/v2.4.x/bitset.md">ビットセットメカニズムについて</a>学ぶ。</p></li>
<li><p>Milvusで<a href="/docs/ja/v2.4.x/data_processing.md">データがどのように処理されるかを</a>理解する。</p></li>
</ul>
