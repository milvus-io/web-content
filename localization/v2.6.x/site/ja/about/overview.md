---
id: overview.md
title: Milvusとは？
related_key: Milvus Overview
summary: >-
  Milvusは、ラップトップから大規模な分散システムまで、幅広い環境で効率的に動作する高性能で拡張性の高いベクターデータベースです。オープンソースソフトウェアとしても、クラウドサービスとしても利用可能です。
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
    </button></h1><p><span>Milvus<span style="display: inline-block; vertical-align: middle;">
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
</span></span>はタカ目タカ科Milvus属の猛禽類で、その飛行速度、鋭い視力、驚くべき適応性で有名である。</p>
<style>
  audio::-webkit-media-controls { display: none !important; }.</style>
<p>Milvusは、ラップトップから大規模な分散システムまで、幅広い環境で効率的に動作する、オープンソースの高性能で拡張性の高いベクトルデータベースの名前です。オープンソースソフトウェアとしても、クラウドサービスとしても利用できる。</p>
<p>MilvusはZillizによって開発され、まもなくLinux Foundation傘下のLF AI &amp; Data Foundationに寄贈され、世界有数のオープンソース・ベクターデータベースプロジェクトとなった。MilvusはApache 2.0ライセンスの下で配布されており、ほとんどの貢献者はハイパフォーマンス・コンピューティング（HPC）コミュニティの専門家であり、大規模システムの構築やハードウェアを考慮したコードの最適化を専門としている。中心的な貢献者には、Zilliz、ARM、NVIDIA、AMD、Intel、Meta、IBM、Salesforce、Alibaba、Microsoftの専門家が含まれる。</p>
<p>興味深いことに、Zillizのオープンソース・プロジェクトにはすべて鳥の名前が付けられている。これは、自由、先見性、技術の機敏な進化を象徴する命名規則である。</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">非構造化データ、エンベッディング、milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>テキスト、画像、音声のような非構造化データは、形式が様々であり、豊富なセマンティクスを持っているため、分析が困難です。この複雑さを管理するために、エンベッディングは非構造化データをその本質的な特徴を捉える数値ベクトルに変換するために使用されます。これらのベクトルはベクトルデータベースに格納され、高速でスケーラブルな検索と分析を可能にします。</p>
<p>Milvusは堅牢なデータモデリング機能を備えており、非構造化データやマルチモーダルデータを構造化されたコレクションに整理することができます。Milvusは、一般的な数値型や文字型、様々なベクトル型、配列、集合、JSONなど、様々な属性モデリングに対応したデータ型を幅広くサポートしており、複数のデータベースシステムを管理する手間を省くことができます。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>非構造化データ、エンベッディング、Milvus</span> </span></p>
<p>Milvusは3つのデプロイメントモードを提供し、Jupyter Notebooksでのローカルプロトタイピングから数百億のベクトルを管理する巨大なKubernetesクラスタまで、幅広いデータスケールをカバーします：</p>
<ul>
<li>Milvus Liteは、アプリケーションに簡単に統合できるPythonライブラリです。Milvusの軽量版として、Jupyter Notebooksでの迅速なプロトタイピングや、リソースが限られたエッジデバイスでの実行に最適です。<a href="/docs/ja/milvus_lite.md">詳細は</a>こちら。</li>
<li>Milvus Standaloneは、シングルマシンサーバーデプロイメントで、すべてのコンポーネントが単一のDockerイメージにバンドルされており、デプロイに便利です。詳細は<a href="/docs/ja/install_standalone-docker.md">こちら</a>。</li>
<li>Milvus Distributedは、Kubernetesクラスタ上にデプロイすることができ、10億規模またはさらに大規模なシナリオ向けに設計されたクラウドネイティブなアーキテクチャを特徴としています。このアーキテクチャは、重要なコンポーネントの冗長性を保証します。<a href="/docs/ja/install_cluster-milvusoperator.md">詳細は</a>こちら。</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">Milvusは何が速いのか？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusは初日から非常に効率的なベクトルデータベースシステムとして設計されました。ほとんどの場合、Milvusは他のベクトルデータベースを2～5倍凌駕しています（VectorDBBenchの結果を参照）。この高い性能は、いくつかの重要な設計上の決定の結果です：</p>
<p><strong>ハードウェアを考慮した最適化</strong>：Milvusを様々なハードウェア環境に対応させるため、AVX512、SIMD、GPU、NVMe SSDなど、多くのハードウェアアーキテクチャとプラットフォームに特化して性能を最適化しました。</p>
<p><strong>高度な検索アルゴリズム</strong>：milvusは、IVF、HNSW、DiskANNなど、幅広いインメモリおよびオンディスクインデックス/検索アルゴリズムをサポートしており、これらはすべて深く最適化されています。FAISSやHNSWLibのような一般的な実装と比較して、Milvusは30%から70%の性能向上を実現しています。</p>
<p><strong>C++の検索エンジン</strong>：ベクトルデータベースの性能の80%以上は検索エンジンによって決まります。Milvusは、高性能、低レベル最適化、効率的なリソース管理のために、この重要なコンポーネントにC++を使用しています。最も重要なことは、Milvusはハードウェアの能力を十分に活用するために、アセンブリレベルのベクトル化からマルチスレッド並列化、スケジューリングに至るまで、ハードウェアを意識した数多くのコード最適化を統合していることです。</p>
<p><strong>列指向</strong>：Milvusは列指向のベクトルデータベースシステムです。主な利点はデータアクセスパターンにある。クエリを実行する際、列指向データベースは行全体ではなく、クエリに関係する特定のフィールドのみを読み込むため、アクセスされるデータ量が大幅に削減される。さらに、列ベースのデータに対する操作は簡単にベクトル化することができるため、列全体に一度に操作を適用することができ、パフォーマンスをさらに向上させることができます。</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Milvusがスケーラブルである理由<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022年、Milvusは10億スケールのベクトルをサポートし、2023年には安定したまま数百億までスケールアップし、Salesforce、PayPal、Shopee、Airbnb、eBay、NVIDIA、IBM、AT&amp;T、LINE、ROBLOX、Inflectionなど、300を超える大手企業の大規模シナリオを支えている。</p>
<p>Milvusのクラウドネイティブで高度に分離されたシステムアーキテクチャは、データの成長に合わせてシステムを継続的に拡張できることを保証します：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Milvusの高度に分離されたシステム・アーキテクチャ</span> </span></p>
<p>Milvus自体は完全にステートレスであるため、Kubernetesやパブリッククラウドの助けを借りて容易に拡張することができる。また、Milvusのコンポーネントは高度に分離されており、最も重要な3つのタスクである検索、データ挿入、インデックス作成/コンパクションは、複雑なロジックを分離し、並列化しやすいプロセスとして設計されている。これにより、対応するクエリー・ノード、データ・ノード、インデックス・ノードがそれぞれ独立してスケールアップ、スケールアウトできるようになり、パフォーマンスとコスト効率が最適化されます。</p>
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
    </button></h2><p>Milvusは様々なユースケースの要求に応えるため、様々なタイプの検索機能をサポートしています：</p>
<ul>
<li><a href="/docs/ja/single-vector-search.md#Basic-search">ANN検索</a>：クエリーベクトルに最も近い上位K個のベクトルを検索します。</li>
<li><a href="/docs/ja/single-vector-search.md#Filtered-search">フィルタリング検索</a>：指定されたフィルタリング条件でANN検索を行います。</li>
<li><a href="/docs/ja/single-vector-search.md#Range-search">範囲検索</a>：クエリーベクトルから指定した半径内のベクトルを検索します。</li>
<li><a href="/docs/ja/multi-vector-search.md">ハイブリッド検索</a>複数のベクトルフィールドに基づいてANN検索を行います。</li>
<li><a href="/docs/ja/full-text-search.md">全文検索</a>BM25に基づく全文検索。</li>
<li><a href="/docs/ja/weighted-ranker.md">再順位付け</a>追加条件または二次アルゴリズムに基づいて検索結果の順序を調整し、最初のANN検索結果を絞り込む。</li>
<li><a href="/docs/ja/get-and-scalar-query.md#Get-Entities-by-ID">フェッチ</a>主キーでデータを検索する。</li>
<li><a href="/docs/ja/get-and-scalar-query.md#Use-Basic-Operators">クエリー</a>：特定の式を使用してデータを検索します。</li>
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
    </button></h2><p>Milvusは、上記の主要な検索機能に加えて、ANN検索を中心に実装された一連の機能を提供しており、その機能をフルに活用することができます。</p>
<h3 id="API-and-SDK" class="common-anchor-header">APIとSDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a>(公式)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a>(Python SDK) (公式)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a>（公式）</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a>（公式）</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a>（JavaScript）SDK（公式）</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#（</a>マイクロソフトが提供）</li>
<li>C++ SDK（開発中）</li>
<li>Rust SDK（開発中）</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">高度なデータ型</h3><p>Milvusはプリミティブなデータ型に加え、様々な高度なデータ型とそれぞれに適用可能な距離メトリクスをサポートしています。</p>
<ul>
<li><a href="/docs/ja/sparse_vector.md">疎ベクトル</a></li>
<li><a href="/docs/ja/index-vector-fields.md">バイナリベクトル</a></li>
<li><a href="/docs/ja/use-json-fields.md">JSONサポート</a></li>
<li><a href="/docs/ja/array_data_type.md">配列サポート</a></li>
<li>テキスト（開発中）</li>
<li>ジオロケーション（開発中）</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">なぜMilvusなのか？</h3><ul>
<li><p><strong>規模に応じた高性能と高可用性</strong></p>
<p>Milvusは、<a href="/docs/ja/data_processing.md#Data-query">コンピュートと</a> <a href="/docs/ja/data_processing.md#Data-insertion">ストレージを</a>分離した<a href="/docs/ja/architecture_overview.md">分散アーキテクチャを</a>特徴としています。Milvusは、読み込みの多いワークロードにはクエリノードを、書き込みの多いワークロードにはデータノードを、それぞれ独立に増やすことで最適なパフォーマンスを実現し、多様なトラフィックパターンに水平スケールで適応することができます。K8s上のステートレスマイクロサービスは、障害からの<a href="/docs/ja/coordinator_ha.md#Coordinator-HA">迅速な復旧を</a>可能にし、高い可用性を保証します。<a href="/docs/ja/replica.md">レプリカの</a>サポートにより、複数のクエリーノードにデータセグメントをロードすることで、耐障害性とスループットがさらに向上します。性能比較は<a href="https://zilliz.com/vector-database-benchmark-tool">ベンチマークを</a>参照。</p></li>
<li><p><strong>様々なベクターインデックスタイプのサポートとハードウェアアクセラレーション</strong></p>
<p>Milvusはシステムとコアベクトルサーチエンジンを分離しているため、HNSW、IVF、FLAT（ブルートフォース）、SCANN、DiskANN、<a href="/docs/ja/index-explained.md">量子化ベースの</a>バリエーションや<a href="/docs/ja/mmap.md">mmapなど</a>、さまざまなシナリオに最適化された主要なベクトルインデックスタイプをすべてサポートすることができます。Milvusは、<a href="/docs/ja/boolean.md">メタデータフィルタリングや</a> <a href="/docs/ja/range-search.md">範囲検索などの</a>高度な機能のためにベクトル検索を最適化します。さらに、Milvusはベクトル検索のパフォーマンスを向上させるハードウェアアクセラレーションを実装し、NVIDIAの<a href="/docs/ja/gpu-cagra.md">CAGRAの</a>ようなGPUインデックスをサポートします。</p></li>
<li><p><strong>柔軟なマルチテナンシーとホット/コールドストレージ</strong></p>
<p>Milvusはデータベース、コレクション、パーティション、パーティションキーレベルでの分離により<a href="/docs/ja/multi_tenancy.md#Multi-tenancy-strategies">マルチテナントを</a>サポートします。この柔軟な戦略により、単一のクラスタで数百から数百万のテナントを処理することができ、最適化された検索パフォーマンスと柔軟なアクセス制御を保証します。Milvusはホット/コールドストレージによりコスト効率を高めます。頻繁にアクセスされるホットデータはメモリまたはSSDに保存してパフォーマンスを向上させ、アクセス頻度の低いコールドデータは低速でコスト効率の高いストレージに保存します。このメカニズムにより、重要なタスクに対して高いパフォーマンスを維持しながら、コストを大幅に削減することができます。</p></li>
<li><p><strong>全文検索とハイブリッド検索のためのスパース・ベクトル</strong></p>
<p>密なベクトルによるセマンティック検索に加えて、MilvusはSPLADEやBGE-M3のような学習されたスパース埋め込みだけでなく、BM25による<a href="/docs/ja/full-text-search.md">全文検索も</a>ネイティブでサポートします。ユーザはスパースベクタと密なベクタを同じコレクションに格納し、複数の検索リクエストの結果を再ランク付けする関数を定義することができます。<a href="/docs/ja/full_text_search_with_milvus.md">セマンティック検索＋全文検索のハイブリッド検索の</a>例をご覧ください。</p></li>
<li><p><strong>データセキュリティときめ細かなアクセス制御</strong></p>
<p>Milvusは、<a href="/docs/ja/authenticate.md">必須のユーザー認証</a>、<a href="/docs/ja/tls.md">TLS暗号化</a>、<a href="/docs/ja/rbac.md">役割ベースのアクセス制御（RBAC）を</a>実装することで、データセキュリティを確保しています。ユーザー認証により、有効な認証情報を持つ正規ユーザーのみがデータベースにアクセスできるようにし、TLS暗号化によりネットワーク内のすべての通信を保護します。さらに、RBACにより、役割に基づいてユーザに特定の権限を割り当てることで、きめ細かなアクセス制御が可能になります。これらの機能により、Milvusは企業アプリケーションにとって堅牢かつ安全な選択肢となり、機密データを不正アクセスや潜在的な侵害から保護します。</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AIインテグレーション</h3><ul>
<li><p>エンベッディングモデルの統合 エンベッディングモデルは、非構造化データを高次元データ空間の数値表現に変換し、Milvusに保存できるようにします。現在、Python SDKであるPyMilvusは、データをベクトル埋め込みに素早く準備できるように、いくつかの埋め込みモデルを統合しています。詳細は<a href="/docs/ja/embeddings.md">エンベッディングの概要を</a>ご覧ください。</p></li>
<li><p>再ランキングモデルの統合 情報検索や生成AIの領域では、再ランカーは最初の検索結果の順序を最適化する必須のツールです。PyMilvusは最初の検索から返される結果の順序を最適化するために、いくつかの再ランクモデルも統合しています。詳細は<a href="/docs/ja/rerankers-overview.md">リランカーの概要を</a>参照してください。</p></li>
<li><p>LangChainとその他のAIツールの統合 GenAI時代において、LangChainのようなツールはアプリケーション開発者から注目を集めています。Milvusは通常、そのようなツールのコアコンポーネントとしてベクターストアの役割を果たします。Milvusをお気に入りのAIツールに統合する方法については、<a href="/docs/ja/integrate_with_openai.md">統合と</a> <a href="/docs/ja/build-rag-with-milvus.md">チュートリアルを</a>ご参照ください。</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">ツールとエコシステム</h3><ul>
<li><p>Attu Attuはオールインワンの直感的なGUIで、Milvusとそのデータを管理することができます。詳細は<a href="https://github.com/zilliztech/attu">Attu</a>リポジトリをご参照ください。</p></li>
<li><p>Birdwatcher BirdwatcherはMilvusのデバッグツールです。etcdに接続することで、Milvusシステムの状態を確認したり、その場で設定を行うことができます。詳細は<a href="/docs/ja/birdwatcher_overview.md">BirdWatcherを</a>ご参照ください。</p></li>
<li><p>PromethusとGrafanaの統合 PrometheusはKubernetesのためのオープンソースのシステムモニタリングとアラートツールキットです。Grafanaはオープンソースの可視化スタックで、あらゆるデータソースと接続できます。PromethusとGrafanaを監視サービスプロバイダとして利用することで、分散したMilvusのパフォーマンスを視覚的に監視することができます。詳細については、<a href="/docs/ja/monitor.md">監視サービスのデプロイを</a>参照してください。</p></li>
<li><p>Milvusバックアップ Milvusバックアップは、Milvusデータのバックアップとリストアを可能にするツールです。CLIとAPIの両方を提供し、様々なアプリケーションシナリオに対応します。詳細は<a href="/docs/ja/milvus_backup_overview.md">Milvus Backupを</a>ご参照ください。</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDCはMilvusインスタンス内の増分データをキャプチャして同期し、ソースインスタンスとターゲットインスタンス間でシームレスに転送することでビジネスデータの信頼性を確保し、増分バックアップやディザスタリカバリを容易に行うことができます。詳細は<a href="/docs/ja/milvus-cdc-overview.md">Milvus CDCを</a>ご参照ください。</p></li>
<li><p>Milvusコネクタ Milvusは、MilvusをApache Sparkなどのサードパーティツールとシームレスに統合するためのコネクタ群を計画しています。現在、Spark Connectorを使用することで、MilvusのデータをApache Sparkに供給し、機械学習処理を行うことができます。詳細は<a href="/docs/ja/integrate_with_spark.md">Spark-Milvus Connectorを</a>ご参照ください。</p></li>
<li><p>Vector Transmission Services (VTS) Milvusは、MilvusインスタンスとZillizクラスタ、Elasticsearch、Postgres (PgVector)、別のMilvusインスタンスなどのデータソース間でデータを転送するためのツールセットを提供しています。詳細は<a href="https://github.com/zilliztech/vts">VTSを</a>ご参照ください。</p></li>
</ul>
