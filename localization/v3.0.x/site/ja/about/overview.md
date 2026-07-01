---
id: overview.md
title: Milvusとは
related_key: Milvus Overview
summary: >-
  Milvusは、高性能かつ高いスケーラビリティを備えたベクトルデータベースであり、ノートパソコンから大規模な分散システムに至るまで、幅広い環境で効率的に動作します。オープンソースソフトウェアとしても、クラウドサービスとしても利用可能です。
---
<h1 id="What-is-Milvus" class="common-anchor-header">Milvusとは？<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>ミルバス（<span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span> ）</span>は、タカ科（Accipitridae）のMilvus属（Milvus）に属する猛禽類であり、その飛行速度、鋭い視力、そして驚くべき適応力によって知られています。</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zillizは、ノートパソコンから大規模な分散システムに至るまで、幅広い環境で効率的に動作する、オープンソースの高性能かつ高スケーラブルなベクトルデータベースに「Milvus」という名称を採用しています。これはオープンソースソフトウェアとしても、クラウドサービスとしても利用可能です。</p>
<p>Zillizによって開発され、まもなくLinux Foundation傘下のLF AI &amp; Data Foundationに寄贈される予定のMilvusは、世界をリードするオープンソースベクトルデータベースプロジェクトの一つとなっています。 Apache 2.0ライセンスの下で配布されており、貢献者の多くは、大規模システムの構築やハードウェアを意識したコードの最適化を専門とする、ハイパフォーマンスコンピューティング（HPC）コミュニティの専門家です。主要な貢献者には、Zilliz、ARM、NVIDIA、AMD、Intel、Meta、IBM、Salesforce、Alibaba、Microsoftの専門家が名を連ねています。</p>
<p>興味深いことに、Zillizのすべてのオープンソースプロジェクトは鳥の名前にちなんで名付けられており、この命名規則は自由、先見性、そして技術の機敏な進化を象徴しています。</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">非構造化データ、埋め込み表現、およびMilvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>テキスト、画像、音声などの非構造化データは、形式が多様で、その背景には豊かな意味論が込められているため、分析が困難です。この複雑さに対処するため、埋め込み（エンベディング）を用いて非構造化データを、その本質的な特性を捉えた数値ベクトルに変換します。これらのベクトルはベクトルデータベースに格納され、高速かつスケーラブルな検索や分析を可能にします。</p>
<p>Milvusは堅牢なデータモデリング機能を提供し、非構造化データやマルチモーダルデータを構造化されたコレクションとして整理することを可能にします。一般的な数値型や文字型、各種ベクトル型、配列、集合、JSONなど、さまざまな属性モデリングに対応した幅広いデータ型をサポートしており、複数のデータベースシステムを維持管理する手間を省くことができます。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>非構造化データ、埋め込み、そしてMilvus</span>
  
 </span></p>
<p>Milvusは、Jupyter Notebookでのローカルプロトタイピングから、数百億のベクトルを管理する大規模なKubernetesクラスタまで、幅広いデータ規模に対応する3つのデプロイメントモードを提供しています：</p>
<ul>
<li>Milvus Liteは、アプリケーションに簡単に統合できるPythonライブラリです。Milvusの軽量版として、Jupyter Notebookでの迅速なプロトタイピングや、リソースが限られたエッジデバイスでの実行に最適です。<a href="/docs/ja/milvus_lite.md">詳細はこちら</a>。</li>
<li>Milvus Standaloneは、単一マシンでのサーバー展開であり、すべてのコンポーネントが1つのDockerイメージにバンドルされているため、手軽にデプロイできます。<a href="/docs/ja/install_standalone-docker.md">詳細はこちら</a>。</li>
<li>Milvus Distributedは、Kubernetesクラスター上にデプロイ可能で、数十億規模、あるいはそれ以上のシナリオ向けに設計されたクラウドネイティブアーキテクチャを特徴としています。このアーキテクチャにより、重要なコンポーネントの冗長性が確保されます。<a href="/docs/ja/install_cluster-milvusoperator.md">詳細はこちら</a>。</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Milvusの高速性の秘密とは？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、開発当初から高効率なベクトルデータベースシステムとなるよう設計されました。ほとんどの場合、Milvusは他のベクトルデータベースよりも2～5倍のパフォーマンスを発揮します（VectorDBBenchの結果を参照）。この高いパフォーマンスは、いくつかの重要な設計上の決定によるものです：</p>
<p><strong>ハードウェアを意識した最適化</strong>：Milvusをさまざまなハードウェア環境に対応させるため、AVX512、SIMD、GPU、NVMe SSDなど、多くのハードウェアアーキテクチャやプラットフォーム向けにパフォーマンスを最適化しています。</p>
<p><strong>高度な検索アルゴリズム</strong>：Milvusは、IVF、HNSW、DiskANNなど、幅広いインメモリおよびオンディスクのインデックス作成／検索アルゴリズムをサポートしており、これらすべてが徹底的に最適化されています。FAISSやHNSWLibといった一般的な実装と比較して、Milvusは30％～70％高いパフォーマンスを発揮します。</p>
<p><strong>C++による検索エンジン</strong>：ベクトルデータベースのパフォーマンスの80％以上は、その検索エンジンによって決まります。Milvusは、C++の高いパフォーマンス、低レベルでの最適化、および効率的なリソース管理を活かし、この重要なコンポーネントにC++を採用しています。 最も重要な点として、Milvusはアセンブリレベルのベクトル化からマルチスレッド並列化およびスケジューリングに至るまで、ハードウェアの能力を最大限に活用するための数多くのハードウェア対応コード最適化を統合しています。</p>
<p><strong>列指向</strong>：Milvusは列指向のベクトルデータベースシステムです。 その主な利点は、データアクセスパターンに由来します。クエリを実行する際、カラム指向データベースは行全体ではなく、クエリに関連する特定のフィールドのみを読み込むため、アクセスされるデータ量が大幅に削減されます。さらに、カラムベースのデータに対する操作は容易にベクトル化できるため、操作をカラム全体に一度に適用することが可能となり、パフォーマンスがさらに向上します。</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Milvusの優れたスケーラビリティの要因<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022年、Milvusは10億規模のベクトルをサポートし、2023年には一貫した安定性を維持しながら数百億規模へとスケールアップし、Salesforce、PayPal、Shopee、Airbnb、eBay、NVIDIA、 IBM、AT&amp;T、LINE、ROBLOX、Inflectionなど、300社以上の大手企業の大規模なシナリオを支えています。</p>
<p>Milvusのクラウドネイティブかつ高度に分離されたシステムアーキテクチャにより、データの増加に合わせてシステムを継続的に拡張することが可能です：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Milvusの高度に疎結合なシステムアーキテクチャ</span>
  
 </span></p>
<p>Milvus自体は完全にステートレスであるため、Kubernetesやパブリッククラウドを活用して容易にスケールアップできます。 さらに、Milvusのコンポーネントは十分に疎結合されており、最も重要な3つのタスクである検索、データ挿入、インデックス作成／コンパクションは、複雑なロジックが分離された、容易に並列化可能なプロセスとして設計されています。これにより、対応するクエリノード、データノード、インデックスノードがそれぞれ独立してアップスケールおよびアウトスケールが可能となり、パフォーマンスとコスト効率が最適化されます。</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Milvusがサポートする検索の種類<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは、さまざまなユースケースのニーズに応えるため、以下の検索機能をサポートしています：</p>
<ul>
<li><a href="/docs/ja/single-vector-search.md#Basic-search">ANN検索</a>：クエリベクトルに最も近い上位K個のベクトルを検索します。</li>
<li><a href="/docs/ja/single-vector-search.md#Filtered-search">フィルタリング検索</a>：指定されたフィルタリング条件の下でANN検索を実行します。</li>
<li><a href="/docs/ja/single-vector-search.md#Range-search">範囲検索</a>：クエリベクトルから指定された半径内にあるベクトルを検索します。</li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a>：複数のベクトルフィールドに基づいてANN検索を実行します。</li>
<li><a href="/docs/ja/full-text-search.md">全文検索</a>：BM25に基づく全文検索を行います。</li>
<li><a href="/docs/ja/weighted-ranker.md">再ランク付け</a>：追加の基準または二次アルゴリズムに基づいて検索結果の順序を調整し、初期の ANN 検索結果を絞り込みます。</li>
<li><a href="/docs/ja/get-and-scalar-query.md#Get-Entities-by-ID">フェッチ</a>：主キーに基づいてデータを取得します。</li>
<li><a href="/docs/ja/get-and-scalar-query.md#Use-Basic-Operators">クエリ</a>：特定の式を使用してデータを取得します。</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">包括的な機能セット<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>上記の主要な検索機能に加え、Milvus はその機能を最大限に活用できるよう、ANN 検索を中心に実装された一連の機能も提供しています。</p>
<h3 id="API-and-SDK" class="common-anchor-header">API および SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">RESTful API</a>（公式）</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a>(Python SDK) (公式)</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">Go SDK</a>（公式）</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">Java SDK</a>（公式）</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a>(JavaScript) SDK (公式)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a>（Microsoft 提供）</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">C++ SDK</a>(公式)</li>
<li>Rust SDK（開発中）</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">高度なデータ型<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>基本データ型に加え、Milvusは様々な高度なデータ型と、それぞれに適用可能な距離メトリクスをサポートしています。</p>
<ul>
<li><a href="/docs/ja/sparse_vector.md">スパースベクトル</a></li>
<li><a href="/docs/ja/index-vector-fields.md">バイナリベクトル</a></li>
<li><a href="/docs/ja/use-json-fields.md">JSONのサポート</a></li>
<li><a href="/docs/ja/array_data_type.md">配列のサポート</a></li>
<li>テキスト（開発中）</li>
<li>位置情報（開発中）</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">なぜMilvusなのか？<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>大規模環境での高性能と高可用性</strong></p>
<p>Milvusは、<a href="/docs/ja/data_processing.md#Data-query">演算</a>と<a href="/docs/ja/data_processing.md#Data-insertion">ストレージを</a>分離した<a href="/docs/ja/architecture_overview.md">分散アーキテクチャ</a>を採用しています。Milvusは水平スケーリングが可能で、多様なトラフィックパターンに適応し、読み取り負荷の高いワークロードではクエリノードを、書き込み負荷の高いワークロードではデータノードを個別に増やすことで、最適なパフォーマンスを実現します。 K8s上のステートレスなマイクロサービスにより、障害からの<a href="/docs/ja/coordinator_ha.md#Coordinator-HA">迅速な復旧</a>が可能となり、高可用性が確保されます。<a href="/docs/ja/replica.md">レプリカの</a>サポートにより、データセグメントを複数のクエリノードに分散させることで、耐障害性とスループットがさらに向上します。パフォーマンス比較については<a href="https://zilliz.com/vector-database-benchmark-tool">ベンチマーク</a>をご覧ください。</p></li>
<li><p><strong>多様なベクトルインデックス形式とハードウェアアクセラレーションのサポート</strong></p>
<p>Milvusはシステムと中核となるベクトル検索エンジンを分離しており、HNSW、IVF、FLAT（ブルートフォース）、SCANN、DiskANNなど、さまざまなシナリオに最適化された主要なベクトルインデックス形式すべてをサポートしています。これには、<a href="/docs/ja/index-explained.md">量子化ベースの</a>バリエーションや<a href="/docs/ja/mmap.md">mmap</a>も含まれます。 Milvusは、<a href="/docs/ja/boolean.md">メタデータフィルタリング</a>や<a href="/docs/ja/range-search.md">範囲検索</a>などの高度な機能に対してベクトル検索を最適化しています。さらに、ベクトル検索のパフォーマンスを向上させるためのハードウェアアクセラレーションを実装しており、NVIDIA<a href="/docs/ja/gpu-cagra.md">のCAGRA</a>などのGPUインデックス作成もサポートしています。</p></li>
<li><p><strong>柔軟なマルチテナント機能とホット／コールドストレージ</strong></p>
<p>Milvusは、データベース、コレクション、パーティション、またはパーティションキーレベルでの分離を通じて<a href="/docs/ja/multi_tenancy.md#Multi-tenancy-strategies">マルチテナント</a>をサポートしています。この柔軟な戦略により、単一のクラスターで数百から数百万のテナントを処理できるほか、最適化された検索パフォーマンスと柔軟なアクセス制御も確保されます。 Milvusは、ホット／コールドストレージによりコスト効率を向上させます。頻繁にアクセスされるホットデータは、パフォーマンス向上のためにメモリまたはSSDに格納でき、アクセス頻度の低いコールドデータは、低速でコスト効率の高いストレージに保持されます。この仕組みにより、重要なタスクで高いパフォーマンスを維持しつつ、コストを大幅に削減できます。</p></li>
<li><p><strong>全文検索およびハイブリッド検索のためのスパースベクトル</strong></p>
<p>Milvusは、高密度ベクトルによるセマンティック検索に加え、BM25を用いた<a href="/docs/ja/full-text-search.md">全文検索や</a>、SPLADEやBGE-M3などの学習済みスパース埋め込みもネイティブにサポートしています。ユーザーは、スパースベクトルと高密度ベクトルを同じコレクションに格納し、複数の検索リクエストからの結果を再ランク付けするための関数を定義することができます。<a href="/docs/ja/full_text_search_with_milvus.md">セマンティック検索と全文検索を組み合わせたハイブリッド検索</a>の例をご覧ください。</p></li>
<li><p><strong>データセキュリティときめ細かなアクセス制御</strong></p>
<p>Milvusは、<a href="/docs/ja/authenticate.md">必須のユーザー認証</a>、<a href="/docs/ja/tls.md">TLS暗号化</a>、および<a href="/docs/ja/rbac.md">ロールベースのアクセス制御（RBAC）</a>を実装することで、データのセキュリティを確保しています。ユーザー認証により、有効な認証情報を持つ許可されたユーザーのみがデータベースにアクセスできるようになり、TLS暗号化によってネットワーク内のすべての通信が保護されます。 さらに、RBAC により、ユーザーの役割に基づいて特定の権限を割り当てることで、きめ細かなアクセス制御が可能になります。これらの機能により、Milvus はエンタープライズアプリケーションにとって堅牢かつ安全な選択肢となり、機密データを不正アクセスや潜在的な情報漏洩から保護します。</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI 統合<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>埋め込みモデルの統合
埋め込みモデルは、非構造化データを高次元データ空間における数値表現に変換し、Milvusに保存できるようにします。現在、Python SDKであるPyMilvusには複数の埋め込みモデルが統合されており、データをベクトル埋め込みとして迅速に準備することができます。詳細については、「<a href="/docs/ja/embeddings.md">埋め込みの概要」を</a>参照してください。</p></li>
<li><p>再ランク付けモデルの統合
情報検索や生成AIの分野において、再ランク付けモデル（リランカー）は、初期検索の結果順序を最適化する不可欠なツールです。PyMilvusには、初期検索から返される結果の順序を最適化するための複数の再ランク付けモデルが統合されています。詳細については、「<a href="/docs/ja/rerankers-overview.md">再ランク付けモデルの概要</a>」を参照してください。</p></li>
<li><p>LangChain およびその他の AI ツールとの連携
GenAI の時代において、LangChain などのツールはアプリケーション開発者から大きな注目を集めています。Milvus は中核コンポーネントとして、通常、こうしたツールにおけるベクトルストアとして機能します。お使いの AI ツールに Milvus を統合する方法については、「<a href="/docs/ja/integrate_with_openai.md">連携と</a> <a href="/docs/ja/build-rag-with-milvus.md">チュートリアル</a>」をご参照ください。</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">ツールとエコシステム<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Attu
Attuは、Milvusおよびそこに格納されたデータを管理するための、直感的なオールインワンGUIです。詳細については、<a href="https://github.com/zilliztech/attu">Attu</a>のリポジトリを参照してください。</p></li>
<li><p>Birdwatcher
Birdwatcherは、Milvus用のデバッグツールです。これを使用してetcdに接続することで、Milvusシステムの状態を確認したり、その場で設定を変更したりできます。詳細については、<a href="/docs/ja/birdwatcher_overview.md">BirdWatcher</a>を参照してください。</p></li>
<li><p>Prometheus および Grafana との連携
Prometheusは、Kubernetes向けのオープンソースのシステム監視およびアラートツールキットです。Grafanaは、あらゆるデータソースと連携可能なオープンソースの可視化スタックです。PrometheusとGrafanaを監視サービスプロバイダーとして使用することで、Milvus分散システムのパフォーマンスを視覚的に監視できます。詳細については、「<a href="/docs/ja/monitor.md">監視サービスのデプロイ」を</a>参照してください。</p></li>
<li><p>Milvus Backup
Milvus Backupは、Milvusデータのバックアップと復元を可能にするツールです。さまざまなアプリケーションシナリオに対応できるよう、CLIとAPIの両方を提供しています。詳細については、「<a href="/docs/ja/milvus_backup_overview.md">Milvus Backup</a>」を参照してください。</p></li>
<li><p>Milvus データ変更キャプチャ (CDC)
Milvus-CDC は、Milvus インスタンス内の増分データをキャプチャおよび同期し、ソースインスタンスとターゲットインスタンス間でデータをシームレスに転送することでビジネスデータの信頼性を確保し、増分バックアップや災害復旧を容易にします。詳細については、<a href="/docs/ja/milvus-cdc-overview.md">「Milvus CDC」</a>を参照してください。</p></li>
<li><p>Milvus コネクタ
Milvus では、Apache Spark などのサードパーティ製ツールと Milvus をシームレスに統合するための一連のコネクタを用意しています。現在、Spark コネクタを使用して、Milvus データを Apache Spark に取り込み、機械学習処理を行うことができます。詳細については、<a href="/docs/ja/integrate_with_spark.md">Spark-Milvus コネクタ</a>を参照してください。</p></li>
<li><p>ベクトル転送サービス（VTS）
Milvusは、Milvusインスタンスと、Zillizクラスタ、Elasticsearch、Postgres（PgVector）、および別のMilvusインスタンスを含む多数のデータソースとの間でデータを転送するための一連のツールを提供しています。詳細については、<a href="https://github.com/zilliztech/vts">VTS</a>を参照してください。</p></li>
</ul>
