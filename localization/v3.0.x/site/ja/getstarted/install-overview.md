---
id: install-overview.md
summary: >-
  Milvusは、高性能かつスケーラブルなベクトルデータベースです。Jupyter
  Notebook上でローカルに実行するデモから、数百億のベクトルを扱う大規模なKubernetesクラスターまで、幅広い規模のユースケースに対応しています。現在、Milvusには「Milvus
  Lite」、「Milvus Standalone」、「Milvus Distributed」の3つの導入オプションがあります。
title: Milvusの導入オプションの概要
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvusの導入オプションの概要<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、高性能かつスケーラブルなベクトルデータベースです。Jupyter Notebook上でローカルに実行されるデモから、数百億のベクトルを処理する大規模なKubernetesクラスタまで、幅広い規模のユースケースに対応しています。現在、Milvusには「Milvus Lite」、「Milvus Standalone」、「Milvus Distributed」の3つのデプロイメントオプションがあります。</p>
<h2 id="Milvus-Lite" class="common-anchor-header">Milvus Lite<button data-href="#Milvus-Lite" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteは</a>、アプリケーションにインポートできるPythonライブラリです。Milvusの軽量版として、Jupyter Notebookでの迅速なプロトタイピングや、リソースが限られたスマートデバイス上での実行に最適です。 Milvus Liteは、他のMilvusデプロイメントと同じAPIをサポートしています。Milvus Liteとやり取りするクライアント側のコードは、他のデプロイメントモードのMilvusインスタンスでも動作します。</p>
<p>Milvus Liteをアプリケーションに統合するには、<code translate="no">pip install pymilvus</code> を実行してインストールし、<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ステートメントを使用して、すべてのデータを永続化するローカルファイルを持つベクトルデータベースをインスタンス化します。詳細については、「<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteの実行</a>」を参照してください。</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvus Standalone<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standalone は、単一マシンでのサーバー展開です。Milvus Standalone のすべてのコンポーネントは単一の<a href="https://milvus.io/docs/install_standalone-docker.md">Docker イメージ</a>にパッケージ化されており、展開が容易です。 本番環境のワークロードがあるものの、Kubernetesの使用を避けたい場合は、十分なメモリを備えた単一のマシン上でMilvus Standaloneを実行するのが良い選択肢です。デフォルトでは、Milvus Standaloneはメッセージキューとして<strong>Woodpecker</strong>（組み込み）を実行するため、別途メッセージングサービスを運用する必要はありません。</p>
<h2 id="Milvus-Distributed" class="common-anchor-header">Milvus Distributed<button data-href="#Milvus-Distributed" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Distributedは、<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetesクラスタ上に</a>デプロイ可能です。このデプロイ方式はクラウドネイティブなアーキテクチャを採用しており、データ取り込み負荷と検索クエリが分離されたノードによって個別に処理されるため、重要なコンポーネントの冗長性を確保できます。最高のスケーラビリティと可用性を提供するとともに、各コンポーネントに割り当てるリソースを柔軟にカスタマイズすることも可能です。 Milvus Distributedは、本番環境で大規模なベクトル検索システムを運用するエンタープライズユーザーにとって最適な選択肢です。デフォルトでは、Milvus Distributedはメッセージキューとして<strong>Woodpecker</strong>を実行し、Milvusと並行して専用サービスとしてデプロイされます。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">ユースケースに適したデプロイメントを選択する<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>デプロイモードの選択は、通常、アプリケーションの開発段階によって異なります：</p>
<ul>
<li><p><strong>迅速なプロトタイピングの場合</strong></p>
<p>プロトタイプとして、あるいは学習目的で迅速に何かを構築したい場合（例えば、Retrieval Augmented Generation（RAG）のデモ、AIチャットボット、マルチモーダリティ検索など）、Milvus Lite単体、またはMilvus LiteとMilvus Standaloneの組み合わせが適しています。 Milvus Liteをノートブックで使用して迅速なプロトタイピングを行い、RAGにおけるさまざまなチャンキング戦略など、多様なアプローチを検証できます。Milvus Liteで構築したアプリケーションを小規模な本番環境でデプロイして実際のユーザーにサービスを提供したり、数百万ベクトルを超えるような大規模なデータセットでアイデアの検証を行いたい場合は、Milvus Standaloneが適しています。 すべてのMilvusデプロイメントはクライアント側のAPIが共通であるため、Milvus Liteのアプリケーションロジックは引き続き共有可能です。また、Milvus Liteに保存されたデータは、コマンドラインツールを使用してMilvus Standaloneに移行することもできます。</p></li>
<li><p><strong>小規模な本番環境へのデプロイ</strong></p>
<p>プロジェクトがまだプロダクト・マーケット・フィットを模索している初期段階の本番環境において、スケーラビリティよりも俊敏性が重視される場合は、Milvus Standaloneが最適な選択肢です。十分なマシンリソースがあれば、最大1億ベクトルまでスケールアップが可能であり、K8sクラスタの維持管理に比べてDevOpsの負担が大幅に軽減されます。</p></li>
<li><p><strong>大規模な本番環境への導入</strong></p>
<p>ビジネスの急速な成長に伴い、データ規模が単一サーバーの容量を超えるようになったら、Milvus Distributedの導入を検討する時期です。開発環境やステージング環境では、利便性の高さから引き続きMilvus Standaloneを使用しつつ、Milvus Distributedを実行するK8sクラスターを運用することができます。 これにより、数百億ベクトル規模まで対応できるだけでなく、読み取りが頻繁で書き込みが稀なケースや、書き込みが頻繁で読み取りが少ないケースなど、特定のワークロードに合わせてノードサイズを柔軟に調整することも可能です。</p></li>
<li><p><strong>エッジデバイスでのローカル検索</strong></p>
<p>エッジデバイス上のプライベートなデータや機密情報を検索する場合、クラウドベースのサービスに依存することなく、デバイスにMilvus Liteをデプロイしてテキストや画像の検索を行うことができます。これは、独自のドキュメント検索や、デバイス上での物体検出などのケースに適しています。</p></li>
</ul>
<p>Milvusの導入モードの選択は、プロジェクトの段階や規模によって異なります。Milvusは、迅速なプロトタイピングから大規模なエンタープライズ導入まで、さまざまなニーズに対応する柔軟かつ強力なソリューションを提供します。</p>
<ul>
<li><strong>Milvus Liteは</strong>、数百万ベクトルまでの小規模なデータセットに推奨されます。</li>
<li><strong>Milvus Standaloneは</strong>、最大1億ベクトルまで拡張可能な中規模のデータセットに適しています。</li>
<li><strong>Milvus Distributedは</strong>、1億から数百億ベクトル規模のデータセットを処理できる大規模展開向けに設計されています。</li>
</ul>
<p>導入モードにかかわらず、すべてのMilvusインスタンスは、メッセージキュー、オブジェクトストレージ、およびメタデータストア（<strong>デフォルトではWoodpecker</strong>、<strong>MinIO</strong>、<strong>etcd</strong>）に依存しています。これらの依存関係について確認したり、調整したり、外部サービスを接続したりするには、<a href="/docs/ja/data-infra-integration-overview.md">「データインフラストラクチャと統合」</a>を参照してください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>ユースケースに応じた導入オプションを選択してください</span>
  
 </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">機能の比較<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>機能</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / クライアントライブラリ</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>データ型</td><td>密ベクトル<br/>疎ベクトル<br/>バイナリベクトル<br/>ブール値<br/>整数<br/>浮動小数点<br/>VarChar<br/>配列<br/>JSON</td><td>密ベクトル<br/>疎ベクトル<br/>バイナリベクトル<br/>ブール値<br/>整数<br/>浮動小数点<br/>VarChar<br/>配列<br/>JSON</td><td>密ベクトル<br/>疎ベクトル<br/>バイナリベクトル<br/>ブール値<br/>整数<br/>浮動小数点数<br/>VarChar<br/>配列<br/>JSON</td></tr>
<tr><td>検索機能</td><td>ベクトル検索（ANN 検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>プライマリキーによるエンティティの取得<br/>ハイブリッド検索</td><td>ベクトル検索（ANN検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>主キーによるエンティティの取得<br/>ハイブリッド検索</td><td>ベクトル検索（ANN検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>主キーによるエンティティの取得<br/>ハイブリッド検索</td></tr>
<tr><td>CRUD操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高度なデータ管理</td><td>該当なし</td><td>アクセス制御<br/>パーティション<br/>パーティションキー</td><td>アクセス制御<br/>パーティション<br/>パーティションキー<br/>物理リソースのグループ化</td></tr>
<tr><td>一貫性レベル</td><td>強力</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td></tr>
<tr><td>メッセージキュー</td><td>該当なし</td><td>Woodpecker (組み込み)</td><td>Woodpecker (サービス)</td></tr>
</tbody>
</table>
