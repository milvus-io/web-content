---
id: install-overview.md
summary: >-
  Milvusは、高性能でスケーラブルなベクトルデータベースです。Jupyter
  Notebooksでローカルに実行されるデモから、数百億のベクトルを扱う大規模なKubernetesクラスタまで、幅広い規模のユースケースをサポートしている。現在、MilvusにはMilvus
  Lite、Milvus Standalone、Milvus Distributedの3つのデプロイメントオプションがあります。
title: Milvus導入オプションの概要
---
<h1 id="Overview-of-Milvus-Deployment-Options" class="common-anchor-header">Milvus導入オプションの概要<button data-href="#Overview-of-Milvus-Deployment-Options" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは高性能でスケーラブルなベクトルデータベースです。Jupyter Notebooksでローカルに実行されるデモから、数百億のベクトルを扱う大規模なKubernetesクラスタまで、幅広い規模のユースケースをサポートしています。現在、Milvusには3つの導入オプションがある：Milvus Lite、Milvus Standalone、Milvus Distributedです。</p>
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
    </button></h2><p><a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteは</a>、アプリケーションにインポート可能なPythonライブラリです。Milvusの軽量版として、Jupyter Notebookでの迅速なプロトタイピングや、リソースの限られたスマートデバイスでの実行に最適です。Milvus Liteは他のMilvusと同じAPIをサポートしています。Milvus Liteとインタラクションするクライアント側のコードは、他のデプロイメントモードのMilvusインスタンスでも動作します。</p>
<p>Milvus Liteをアプリケーションに統合するには、<code translate="no">pip install pymilvus</code> を実行してインストールし、<code translate="no">MilvusClient(&quot;./demo.db&quot;)</code> ステートメントを使用して、すべてのデータを永続化するローカルファイルを持つベクトルデータベースをインスタンス化します。詳細は<a href="https://milvus.io/docs/milvus_lite.md">Milvus Liteの実行を</a>参照してください。</p>
<h2 id="Milvus-Standalone" class="common-anchor-header">Milvusスタンドアロン<button data-href="#Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Standaloneはシングルマシンサーバです。Milvus Standaloneの全コンポーネントは単一の<a href="https://milvus.io/docs/install_standalone-docker.md">Dockerイメージにまとめられて</a>おり、デプロイに便利です。本番ワークロードがあるがKubernetesを使用したくない場合、十分なメモリを搭載したシングルマシン上でMilvus Standaloneを実行することは良い選択肢となる。さらに、Milvus Standaloneはマスタースレーブレプリケーションによる高可用性をサポートしています。</p>
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
    </button></h2><p>Milvus Distributedは<a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Kubernetes</a>クラスタ上にデプロイすることができる。このデプロイはクラウドネイティブアーキテクチャを特徴としており、インジェスト負荷と検索クエリは分離されたノードによって別々に処理され、重要なコンポーネントの冗長性を可能にする。最高のスケーラビリティと可用性を提供するだけでなく、各コンポーネントに割り当てられたリソースを柔軟にカスタマイズできる。Milvus Distributedは、大規模なベクトル検索システムを本番稼動させている企業ユーザーにとって、最良の選択肢となります。</p>
<h2 id="Choose-the-Right-Deployment-for-Your-Use-Case" class="common-anchor-header">ユースケースに適したデプロイメントの選択<button data-href="#Choose-the-Right-Deployment-for-Your-Use-Case" class="anchor-icon" translate="no">
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
    </button></h2><p>デプロイメントモードの選択は通常、アプリケーションの開発段階によって異なります：</p>
<ul>
<li><p><strong>クイックプロトタイピング</strong></p>
<p>RAG（Retrieval Augmented Generation）デモ、AIチャットボット、マルチモダリティ検索など、プロトタイプや学習用として素早く何かを構築したい場合、Milvus Lite単体、またはMilvus LiteとMilvus Standaloneの組み合わせが適しています。ラピッドプロトタイピングのためにノートブックでMilvus Liteを使用し、RAGで異なるチャンキング戦略など様々なアプローチを検討することができます。Milvus Liteでビルドしたアプリケーションを小規模なプロダクションにデプロイして実際のユーザに提供したり、数百万ベクトルを超えるような大規模なデータセットでアイデアを検証することもできます。Milvus Standaloneが適しています。Milvus Liteのアプリケーションロジックは、すべてのMilvusデプロイメントが同じクライアントサイドAPIを持つため、共有することができます。Milvus Liteに保存されたデータは、コマンドラインツールを使ってMilvus Standaloneに移植することもできます。</p></li>
<li><p><strong>小規模本番導入</strong></p>
<p>プロジェクトがまだ製品市場適合性を模索しており、スケーラビリティよりもアジリティが重要な初期段階の本番環境には、Milvus Standaloneが最適です。十分なマシンリソースがあれば100Mベクターまで拡張可能であり、K8sクラスタを維持するよりもはるかに少ないDevOpsで済みます。</p></li>
<li><p><strong>大規模本番展開</strong></p>
<p>ビジネスが急成長し、データ規模が単一サーバーの容量を超えた場合、Milvus Distributedを検討する時期に来ています。Milvus Standaloneを開発環境やステージング環境として利用し、Milvus Distributedを実行するK8sクラスタを運用することができます。これにより、数百億のベクターに対応することができ、また、高読み込み、低書き込み、高書き込み、低読み込みのケースなど、特定のワークロードに合わせてノードサイズを柔軟に調整することができる。</p></li>
<li><p><strong>エッジデバイスでのローカル検索</strong></p>
<p>エッジデバイス上のプライベートな情報や機密情報を検索する場合、クラウドベースのサービスに依存することなく、デバイス上にMilvus Liteを導入してテキスト検索や画像検索を行うことができます。これは、独自のドキュメント検索やデバイス上でのオブジェクト検出などのケースに適しています。</p></li>
</ul>
<p>Milvusのデプロイメントモードの選択は、プロジェクトのステージや規模によって異なります。Milvusは、ラピッドプロトタイピングから大規模なエンタープライズ展開まで、様々なニーズに対応する柔軟で強力なソリューションを提供します。</p>
<ul>
<li><strong>Milvus Liteは</strong>、数百万ベクトルまでの小規模なデータセットに適しています。</li>
<li><strong>Milvus Standaloneは</strong>、最大1億ベクトルまでの中規模データセットに適しています。</li>
<li><strong>Milvus Distributed</strong>は大規模なデータセットに適しており、1億から数百億のベクターまで対応可能です。</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/select-deployment-option.png" alt="Select deployment option for your use case" class="doc-image" id="select-deployment-option-for-your-use-case" />
   </span> <span class="img-wrapper"> <span>ユースケースに合わせて導入オプションを選択してください。</span> </span></p>
<h2 id="Comparison-on-functionalities" class="common-anchor-header">機能比較<button data-href="#Comparison-on-functionalities" class="anchor-icon" translate="no">
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
<tr><th>機能</th><th>Milvus Lite</th><th>Milvus スタンドアロン</th><th>Milvus分散型</th></tr>
</thead>
<tbody>
<tr><td>SDK/クライアントリラリ</td><td>Python<br/>gRPC</td><td>Python<br/>Go<br/>Java<br/>Node.js<br/>C#<br/>RESTful</td><td>Python<br/>Java<br/>Go<br/>Node.js<br/>C#<br/>RESTful</td></tr>
<tr><td>データタイプ</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td><td>Dense Vector<br/>Sparse Vector<br/>Binary Vector<br/>Boolean<br/>Integer<br/>Floating Point<br/>VarChar<br/>Array<br/>JSON</td></tr>
<tr><td>検索機能</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td><td>Vector Search (ANN Search)<br/>Metadata Filtering<br/>Range Search<br/>Scalar Query<br/>Get Entities by Primary Key<br/>Hybrid Search</td></tr>
<tr><td>CRUD操作</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
<tr><td>高度なデータ管理</td><td>該当なし</td><td>アクセス・コントロール<br/>パーティション<br/>パーティション・キー</td><td>アクセスコントロール<br/>パーティション<br/>パーティションキー<br/>物理リソースグループ化</td></tr>
<tr><td>一貫性レベル</td><td>強い</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td><td>Strong<br/>Bounded Staleness<br/>Session<br/>Eventual</td></tr>
</tbody>
</table>
