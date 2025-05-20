---
id: comparison.md
title: 比較
summary: この記事では、Milvusと他のベクトル検索ソリューションを比較する。
---
<h1 id="Comparing-Milvus-with-Alternatives" class="common-anchor-header">Milvusと代替データベースの比較<button data-href="#Comparing-Milvus-with-Alternatives" class="anchor-icon" translate="no">
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
    </button></h1><p>様々なベクターデータベースの選択肢を検討する際、この包括的なガイドはMilvusのユニークな機能を理解するのに役立ち、特定のニーズに最も適したデータベースを選択することを確実にします。Milvusはオープンソースのベクターデータベースの代表格であり、<a href="https://zilliz.com/cloud">Zilliz Cloudは</a>Milvusのフルマネージドサービスを提供しています。Milvusを競合他社に対して客観的に評価するには、<a href="https://github.com/zilliztech/VectorDBBench#quick-start">ベンチマークツールを</a>使用してパフォーマンス指標を分析することを検討してください。</p>
<h2 id="Milvus-highlights" class="common-anchor-header">Milvusのハイライト<button data-href="#Milvus-highlights" class="anchor-icon" translate="no">
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
<li><p><strong>機能性</strong>：Milvusは、基本的なベクトル類似検索にとどまらず、<a href="https://milvus.io/docs/sparse_vector.md">スパースベクトル</a>、<a href="https://milvus.io/docs/single-vector-search.md#Bulk-vector-search">バルクベクトル</a>、<a href="https://milvus.io/docs/single-vector-search.md#Filtered-search">フィルタリング検索</a>、<a href="https://milvus.io/docs/multi-vector-search.md">ハイブリッド検索などの</a>高度な機能をサポートしています。</p></li>
<li><p><strong>柔軟性</strong>：Milvusは、堅牢で統合されたエコシステムの中で、さまざまな展開モードと複数のSDKに対応しています。</p></li>
<li><p><strong>パフォーマンス</strong>：Milvusは、<a href="https://milvus.io/docs/index.md#HNSW">HNSWや</a> <a href="https://milvus.io/docs/disk_index.md">DiskANNなどの</a>最適化されたインデックス作成アルゴリズムと高度な<a href="https://milvus.io/docs/gpu_index.md">GPUアクセラレーションにより</a>、高スループットと低レイテンシーによるリアルタイム処理を保証します。</p></li>
<li><p><strong>スケーラビリティ</strong>：特注の分散アーキテクチャにより、小規模なデータセットから100億ベクトルを超えるコレクションまで、容易に拡張することができます。</p></li>
</ul>
<h2 id="Overall-comparison" class="common-anchor-header">全体的な比較<button data-href="#Overall-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>2つのベクトルデータベースソリューションであるMilvusとPineconeを比較するために、以下の表は様々な機能の違いを強調するように構成されています。</p>
<table>
<thead>
<tr><th>特徴</th><th>Pinecone</th><th>Milvus</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>展開モード</td><td>SaaSのみ</td><td>Milvus Lite、オンプレミスタンドアロン＆クラスタ、ZillizクラウドSaaS＆BYOC</td><td>Milvusは、より柔軟なデプロイメントモードを提供します。</td></tr>
<tr><td>対応SDK</td><td>Python、JavaScript/TypeScript</td><td>Python、Java、NodeJS、Go、Restful API、C#、Rust</td><td>Milvusはより幅広いプログラミング言語をサポートします。</td></tr>
<tr><td>オープンソースステータス</td><td>クローズド</td><td>オープンソース</td><td>Milvusはオープンソースのベクターデータベースです。</td></tr>
<tr><td>スケーラビリティ</td><td>スケールアップ/ダウンのみ</td><td>スケールアウト/インおよびスケールアップ/ダウン</td><td>Milvusは分散アーキテクチャを採用し、スケーラビリティを強化しています。</td></tr>
<tr><td>可用性</td><td>利用可能ゾーン内のポッドベースアーキテクチャ</td><td>利用可能ゾーンのフェイルオーバーとクロスリージョンHA</td><td>Milvus CDC (Change Data Capture)によるプライマリ/スタンバイモードによる高い可用性</td></tr>
<tr><td>パーフコスト（100万クエリーあたりドル）</td><td>中規模データセットで$0.178から、大規模データセットで$1.222から</td><td>Zilliz Cloudは中規模データセットで$0.148から、大規模データセットで$0.635から。</td><td><a href="https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud,Milvus,ElasticCloud,PgVector,Pinecone,QdrantCloud,WeaviateCloud&amp;dataset=medium&amp;filter=none,low,high&amp;tab=2">コストランキングレポートを</a>参照。</td></tr>
<tr><td>GPUアクセラレーション</td><td>サポートなし</td><td>NVIDIA GPUをサポート</td><td>GPUアクセラレーションはパフォーマンスを大幅に向上させます。</td></tr>
</tbody>
</table>
<h2 id="Terminology-comparison" class="common-anchor-header">用語の比較<button data-href="#Terminology-comparison" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusとPineconeはベクターデータベースとして同様の機能を果たしますが、ドメイン固有の用語は若干異なります。詳しい用語の比較は以下の通りです。</p>
<table>
<thead>
<tr><th>Pinecone</th><th>Milvus</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>インデックス</td><td><a href="https://zilliz.com/comparison">コレクション</a></td><td>Pineconeでは、インデックスが同一サイズのベクトルを保存・管理するための組織単位として機能し、このインデックスはポッドと呼ばれるハードウェアと密接に統合されています。対照的に、Milvusのコレクションは同様の役割を果たしますが、単一のインスタンス内で複数のコレクションを扱うことができます。</td></tr>
<tr><td>コレクション</td><td><a href="https://milvus.io/docs/milvus_backup_overview.md#Milvus-Backup">バックアップ</a></td><td>Pineconeでは、コレクションは基本的にインデックスの静的スナップショットであり、主にバックアップ目的で使用され、クエリを実行することはできません。Milvusでは、バックアップを作成するための同等の機能はより透過的でわかりやすい名前になっています。</td></tr>
<tr><td>名前空間</td><td><a href="https://milvus.io/docs/use-partition-key.md#Use-Partition-Key">パーティションキー</a></td><td>名前空間を使用すると、インデックス内のベクトルをサブセットに分割することができます。Milvusはパーティションやパーティションキーのような複数のメソッドを提供し、コレクション内の効率的なデータ分離を保証します。</td></tr>
<tr><td>メタデータ</td><td><a href="https://milvus.io/docs/boolean.md">スカラーフィールド</a></td><td>Pineconeのメタデータ処理はキーと値のペアに依存していますが、Milvusでは標準的なデータ型や動的なJSONフィールドを含む複雑なスカラーフィールドを使用できます。</td></tr>
<tr><td>クエリ</td><td><a href="https://milvus.io/docs/single-vector-search.md">検索</a></td><td>指定されたベクトルの最近傍を検索するために使用されるメソッドの名前。</td></tr>
<tr><td>使用不可</td><td><a href="https://milvus.io/docs/with-iterators.md">イテレータ</a></td><td>Pinecone にはインデックス内のすべてのベクトルを反復処理する機能がありません。Milvus は Search Iterator と Query Iterator メソッドを導入し、データセット間のデータ検索機能を強化しています。</td></tr>
</tbody>
</table>
<h2 id="Capability-comparison" class="common-anchor-header">機能の比較<button data-href="#Capability-comparison" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>機能</th><th>Pinecone</th><th>Milvus</th></tr>
</thead>
<tbody>
<tr><td>展開モード</td><td>SaaSのみ</td><td>Milvus Lite、オンプレミスタンドアロン＆クラスタ、ZillizクラウドSaaS＆BYOC</td></tr>
<tr><td>組み込み機能</td><td>利用不可</td><td><a href="https://github.com/milvus-io/milvus-model">pymilvus[model]</a>でサポート</td></tr>
<tr><td>データ型</td><td>文字列, 数値, ブール, 文字列のリスト</td><td>String、VarChar、Number (Int, Float, Double)、Bool、Array、JSON、Float Vector、Binary Vector、BFloat16、Float16、Sparse Vector</td></tr>
<tr><td>メトリックおよびインデックス型</td><td>Cos、Dot、ユークリッド<br/>P-ファミリー、S-ファミリー</td><td>Cosine, IP (Dot), L2 (Euclidean), Hamming, Jaccard<br/>FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, HNSW, SCANN, GPU インデックス</td></tr>
<tr><td>スキーマ設計</td><td>柔軟モード</td><td>柔軟モード, 厳密モード</td></tr>
<tr><td>複数ベクトルフィールド</td><td>該当なし</td><td>マルチ・ベクトルおよびハイブリッド検索</td></tr>
<tr><td>ツール</td><td>データセット、テキストユーティリティ、スパークコネクタ</td><td>Attu、Birdwatcher、Backup、CLI、CDC、Spark、Kafkaコネクタ</td></tr>
</tbody>
</table>
<h3 id="Key-insights" class="common-anchor-header">主なインサイト</h3><ul>
<li><p><strong>デプロイメントモード</strong>：Milvusは、企業向けにローカルデプロイ、Docker、Kubernetesオンプレミス、クラウドSaaS、BYOC（Bring Your Own Cloud）など、さまざまなデプロイオプションを提供しているが、PineconeはSaaSデプロイに限定されている。</p></li>
<li><p><strong>エンベッディング機能</strong>：Milvusは追加のエンベッディングライブラリをサポートしており、エンベッディングモデルを直接使用してソースデータをベクトルに変換することができます。</p></li>
<li><p><strong>データ型</strong>：Milvusは、配列やJSONなど、Pineconeよりも幅広いデータ型をサポートしています。Pineconeは、文字列、数値、ブーリアン、文字列のリストを値とするフラットなメタデータ構造のみをサポートしているのに対し、MilvusはJSONフィールド内で、入れ子構造を含むあらゆるJSONオブジェクトを扱うことができます。Pineconeはメタデータのサイズをベクターあたり40KBに制限しています。</p></li>
<li><p><strong>メトリックとインデックスタイプ</strong>：Milvusはさまざまなユースケースに対応できるよう、メトリックとインデックスのタイプを幅広くサポートしています。Milvusではベクトルに対するインデックスが必須ですが、AUTO_INDEXオプションが設定プロセスを効率化します。</p></li>
<li><p><strong>スキーマ設計</strong>Milvusにはスキーマ設計のための柔軟な<code translate="no">create_collection</code> モードがあります。これには、Pineconeのようなスキーマレス体験のためのダイナミックスキーマによるクイックセットアップと、リレーショナルデータベース管理システム（RDBMS）のような事前定義されたスキーマフィールドとインデックスによるカスタマイズセットアップがあります。</p></li>
<li><p><strong>複数のベクトルフィールド</strong>：Milvusでは、1つのコレクション内に複数のベクトルフィールドを格納することができます。Pineconeには同等の機能はありません。</p></li>
<li><p><strong>ツール</strong>：Milvusは、Attu、Birdwatcher、Backup、CLI、CDC、SparkおよびKafkaコネクタなど、データベース管理と活用のためのツールをより豊富に取り揃えています。</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><strong>トライアル</strong>：Milvus<a href="https://milvus.io/docs/quickstart.md">クイックスタート</a>または<a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloudにサインアップして</a>、Milvusを直接体験してください。</p></li>
<li><p><strong>もっと知る</strong>：包括的な<a href="/docs/ja/v2.4.x/glossary.md">用語集と</a> <a href="https://milvus.io/docs/manage-collections.md">ユーザーガイドで</a>Milvusの機能をより深く知ることができます。</p></li>
<li><p><strong>他の選択肢を探す</strong>：ベクターデータベースの選択肢をより幅広く比較するには、<a href="https://zilliz.com/comparison">このページの</a>その他のリソースをご覧ください。</p></li>
</ul>
