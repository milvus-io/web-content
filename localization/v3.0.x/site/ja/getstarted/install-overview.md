---
id: install-overview.md
summary: ワークロード、可用性の要件、および運用環境に応じて、Milvus Lite、スタンドアロン、または分散型の中から選択してください。
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
    </button></h1><p>Milvusは、ローカルでのプロトタイプ開発から大規模なベクトル検索サービスまで対応しています。データ量、読み書き負荷、可用性の要件、および動作環境に応じて、「Milvus Lite」、「Milvus Standalone」、「Milvus Distributed」の中から適切なオプションを選択してください。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteは</a>、アプリケーションにインポートできるPythonライブラリです。Milvusの軽量版として、Jupyter Notebookでの迅速なプロトタイピングや、リソースが限られたスマートデバイスでの実行に最適です。 Milvus Liteは、他のMilvusデプロイメントと同じAPIをサポートしています。Milvus Liteとやり取りするクライアント側のコードは、他のデプロイメントモードのMilvusインスタンスでも動作します。</p>
<p>ローカルでのサンプル実行には、Python 3.10 以降を使用し、オプションの Lite 依存関係を明示的にインストールしてください。Windows では、pip が `<code translate="no">milvus-lite</code> ` という接頭辞を省略するため、パッケージ名を明示的に指定する必要があります：</p>
<pre><code translate="no" class="language-bash">python3 -m pip install <span class="hljs-string">&quot;pymilvus[milvus-lite]==3.0.2&quot;</span> <span class="hljs-string">&quot;milvus-lite==3.2.2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> を使用してローカルストレージを開きます。Milvus Lite 3.x はこのパスにディレクトリを作成します。既存の Milvus Lite 2.x データベースファイルを使用する場合は、エクスポートと移行が必要です。プラットフォーム要件については「<a href="/docs/ja/milvus_lite.md">Milvus Lite の実行</a>」を、挿入と検索の完全な例については「<a href="/docs/ja/quickstart.md">クイックスタート</a>」を参照してください。</p>
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
    </button></h2><p>Milvus Standalone は、単一マシンでのサーバー展開です。Milvus Standalone のすべてのコンポーネントは単一の<a href="https://milvus.io/docs/install_standalone-docker.md">Docker イメージ</a>にパッケージ化されており、展開が容易です。 本番環境のワークロードがあるものの、Kubernetes を使用したくない場合は、十分なメモリを備えた単一のマシンで Milvus Standalone を実行するのが良い選択肢です。デフォルトでは、Milvus Standalone はメッセージキューとして<strong>Woodpecker</strong>（組み込み）を実行するため、別途メッセージングサービスを運用する必要はありません。</p>
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
    </button></h2><p>Milvus Distributedは、<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetesクラスター上に</a>デプロイできます。このデプロイ方式はクラウドネイティブなアーキテクチャを採用しており、データ取り込み負荷と検索クエリが分離されたノードによって個別に処理されるため、重要なコンポーネントの冗長性を確保できます。最高のスケーラビリティと可用性を提供するとともに、各コンポーネントに割り当てるリソースを柔軟にカスタマイズすることも可能です。 Milvus Distributedは、本番環境で大規模なベクトル検索システムを運用するエンタープライズユーザーにとって最適な選択肢です。デフォルトでは、Milvus Distributedはメッセージキューとして<strong>Woodpecker</strong>を実行し、Milvusと並行して専用のサービスとしてデプロイされます。</p>
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
<p>ノートブック上で Milvus Lite を使用し、埋め込みベクトル、RAG チャンキング戦略、および検索挙動をテストします。共有サーバーが必要になった場合、または測定されたメモリ使用量やクエリ負荷がローカル環境の許容範囲を超えた場合は、Milvus Standalone に移行してください。クライアント API は類似していますが、機能の違いを確認し、保存されたデータは別途移行してください。</p></li>
<li><p><strong>小規模な本番環境へのデプロイ</strong></p>
<p>単一のサーバーでワークロードと可用性の要件を満たせ、かつKubernetesを使用せずに運用したい場合は、Milvus Standaloneを使用してください。ベクトルの次元、スカラーフィールド、インデックス設定、レプリカ数からメモリ使用量を推定し、予想されるクエリの同時実行数と書き込みレートをベンチマークしてください。ベクトルの数だけでは容量を決定できません。</p></li>
<li><p><strong>大規模な本番環境への導入</strong></p>
<p>ビジネスの急速な成長に伴い、データ規模が単一サーバーの容量を超えた場合は、Milvus Distributedの導入を検討する時期です。利便性の観点から、開発環境やステージング環境では引き続きMilvus Standaloneを使用しつつ、Milvus Distributedを実行するK8sクラスターを運用することができます。 これにより、数百億規模のベクトルに対応できるだけでなく、読み取りが頻繁で書き込みが稀なケースや、書き込みが頻繁で読み取りが少ないケースなど、特定のワークロードに合わせてノードサイズを柔軟に調整することも可能です。</p></li>
<li><p><strong>エッジデバイスでのローカル検索</strong></p>
<p>エッジデバイス上のプライベートなデータや機密情報を検索する場合、クラウドベースのサービスに依存することなく、デバイスにMilvus Liteをデプロイしてテキストや画像の検索を行うことができます。これは、独自のドキュメント検索や、デバイス上での物体検出などのケースに適しています。</p></li>
</ul>
<p>Milvusの導入モードの選択は、プロジェクトの段階や規模によって異なります。Milvusは、迅速なプロトタイピングから大規模なエンタープライズ導入まで、さまざまなニーズに対応する柔軟かつ強力なソリューションを提供します。</p>
<ul>
<li><strong>Milvus Liteは</strong>、単一アプリケーションのリソース内で実行されるローカル評価やワークロードに適しています。</li>
<li><strong>Milvus Standaloneは</strong>、1台のサーバーで測定された容量および可用性の要件を満たす場合に、共有サービスを提供します。</li>
<li><strong>Milvus Distributedは</strong>、1台のサーバーを超えて拡張する必要がある場合や、読み取りリソースと書き込みリソースを分離する必要がある場合に、コンポーネントレベルのスケーリングと冗長性を提供します。</li>
</ul>
<p>Milvus Standalone および Distributed は、メッセージキュー、オブジェクトストレージ、およびメタデータストアを使用します。Milvus Lite は、これらの個別のサービスを使用せずにローカルで実行されます。サーバー展開のデフォルトの依存関係および外部サービスのオプションについては、「<a href="/docs/ja/data-infra-integration-overview.md">データインフラストラクチャ</a>」を参照してください。</p>
<p>サーバーインフラストラクチャの運用ではなく、マネージドサービスをご希望の場合は、<a href="https://zilliz.com/cloud">Zilliz Cloud</a>をご検討ください。ご自身でデプロイを行う場合は、<a href="/docs/ja/install_standalone-docker.md">Dockerまたは</a> <a href="/docs/ja/install_cluster-milvusoperator.md">Kubernetes</a>の手順に進んでください。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" /> 
   <span>ユースケースに応じたデプロイオプションを選択してください</span>
  
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
    </button></h2><p>「Lite」の列は、Milvus Lite 3.2.2 について記載しています。ローカルアプリケーションでサーバー機能を利用する前に、<a href="/docs/ja/milvus_lite.md#Supported-features-and-limits">Milvus Lite の制限事項</a>を確認してください。</p>
<table>
<thead>
<tr><th>機能</th><th>Milvus Lite</th><th>Milvus Standalone</th><th>Milvus Distributed</th></tr>
</thead>
<tbody>
<tr><td>SDK / クライアントライブラリ</td><td>Python（ローカル PyMilvus アダプタ）</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>データ型</td><td>密ベクトル<br/>疎ベクトル<br/>ブール値<br/>整数<br/>浮動小数点数<br/>VarChar<br/>配列<br/>JSON</td><td>密ベクトル<br/>疎ベクトル<br/>バイナリベクトル<br/>ブール値<br/>整数<br/>浮動小数点数<br/>VarChar<br/>配列<br/>JSON</td><td>密ベクトル<br/>疎ベクトル<br/>バイナリベクトル<br/>ブール値<br/>整数<br/>浮動小数点数<br/>VarChar<br/>配列<br/>JSON</td></tr>
<tr><td>検索機能</td><td>ベクトル検索（ANN 検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>主キーによるエンティティの取得<br/>ハイブリッド検索</td><td>ベクトル検索（ANN検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>主キーによるエンティティの取得<br/>ハイブリッド検索</td><td>ベクトル検索（ANN検索）<br/>メタデータフィルタリング<br/>範囲検索<br/>スカラークエリ<br/>主キーによるエンティティの取得<br/>ハイブリッド検索</td></tr>
<tr><td>CRUD操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高度なデータ管理</td><td>データベース<br/>パーティション<br/>エイリアス<br/>アクセス制御なし</td><td>アクセス制御<br/>パーティション<br/>パーティションキー</td><td>アクセス制御<br/>パーティション<br/>パーティションキー<br/>物理リソースのグループ化</td></tr>
<tr><td>一貫性レベル</td><td>該当なし：単一のローカルプロセスがすべてのリクエストを処理します。<code translate="no">consistency_level</code> は受け入れられますが、効果はありません。</td><td><br/>強<br/>セッション イベントアル<br/>限定された陳腐化</td><td><br/>（強力） （限定された陳腐化）<br/>セッション<br/>最終的</td></tr>
<tr><td>メッセージキュー</td><td>該当なし</td><td>Woodpecker (組み込み)</td><td>Woodpecker (サービス)</td></tr>
</tbody>
</table>
