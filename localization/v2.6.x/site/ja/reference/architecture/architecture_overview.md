---
id: architecture_overview.md
summary: Milvusは、類似検索と人工知能のために特別に構築された、高速で信頼性が高く、安定したベクトルデータベースを提供します。
title: Milvusアーキテクチャの概要
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvusアーキテクチャの概要<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは<strong>オープンソースの</strong> <strong>クラウドネイティブな</strong>ベクトルデータベースであり、膨大なベクトルデータセットの高性能な類似検索用に設計されています。Faiss、HNSW、DiskANN、SCANNを含む一般的なベクトル検索ライブラリの上に構築され、AIアプリケーションや非構造化データ検索シナリオを強化します。先に進む前に、埋め込み検索の<a href="/docs/ja/v2.6.x/glossary.md">基本原理を</a>理解してください。</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">アーキテクチャ図<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の図は、Milvusのハイレベルなアーキテクチャを示しており、完全に分離されたストレージとコンピュートレイヤーを備えた、モジュール化されたスケーラブルでクラウドネイティブな設計を示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>アーキテクチャ図</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">アーキテクチャの原則<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはデータプレーンとコントロールプレーンの分離という原則に従い、スケーラビリティとディザスタリカバリの点で相互に独立した4つの主要レイヤーで構成されています。ストレージとコンピュートレイヤーが完全に分離されたこの共有ストレージアーキテクチャは、コンピュートノードの水平スケーリングを可能にし、同時にWoodpeckerをゼロディスクWALレイヤーとして実装することで、弾力性の向上と運用オーバーヘッドの削減を実現しています。</p>
<p>ストリーム処理をStreaming Nodeに、バッチ処理をQuery NodeとData Nodeに分離することで、Milvusはリアルタイム処理要件を同時に満たしながら高いパフォーマンスを実現しています。</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">詳細レイヤアーキテクチャ<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">レイヤー1：アクセスレイヤー</h3><p>ステートレスプロキシ群から構成されるアクセスレイヤーは、システムのフロントレイヤーであり、ユーザーへのエンドポイントである。クライアントのリクエストを検証し、返された結果を縮小する：</p>
<ul>
<li>プロキシはそれ自体ステートレスである。Nginx、Kubernetes Ingress、NodePort、LVSなどのロードバランシングコンポーネントを使用して、統一されたサービスアドレスを提供する。</li>
<li>Milvusは超並列処理（MPP）アーキテクチャを採用しているため、プロキシは最終結果をクライアントに返す前に中間結果を集約し、後処理を行う。</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">レイヤ2：コーディネータ</h3><p>CoordinatorはMilvusの頭脳として機能する。常にクラスタ全体で1つのCoordinatorがアクティブであり、クラスタトポロジの維持、すべてのタスクタイプのスケジューリング、クラスタレベルの一貫性の確保を担当します。</p>
<p>以下は<strong>Coordinatorが</strong>処理するタスクの一部です：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：コレクション、パーティション、インデックスの作成または削除などのデータ定義言語（DDL）およびデータ制御言語（DCL）リクエストの処理、タイムスタンプオラクル（TSO）の管理、タイムティッカーの発行。</li>
<li><strong>ストリーミング・サービス管理</strong>：ライト・アヘッド・ログ（WAL）をストリーミング・ノードにバインドし、ストリーミング・サービスのサービス・ディスカバリーを提供する。</li>
<li><strong>クエリー管理</strong>：クエリ・ノードのトポロジーと負荷分散を管理し、クエリ・ルーティングをガイドするサービング・クエリ・ビューを提供・管理します。</li>
<li><strong>履歴データ管理</strong>：コンパクションやインデックス構築などのオフラインタスクをデータノードに分散し、セグメントとデータビューのトポロジーを管理する。</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">レイヤー3：ワーカー・ノード</h3><p>手足。ワーカーノードはコーディネーターの指示に従うダムエグゼキューターです。ワーカーノードはストレージと計算を分離しているためステートレスであり、Kubernetesにデプロイすることでシステムのスケールアウトやディザスタリカバリを容易にすることができる。ワーカーノードには3つのタイプがある：</p>
<h3 id="Streaming-node" class="common-anchor-header">ストリーミングノード</h3><p>Streaming Nodeは、シャードレベルの「ミニ頭脳」として機能し、基礎となるWAL Storageに基づいてシャードレベルの一貫性保証と障害回復を提供する。一方、ストリーミング・ノードは、データ・クエリの増大とクエリ・プランの生成も担当する。さらに、成長データの密封（履歴）データへの変換も行う。</p>
<h3 id="Query-node" class="common-anchor-header">クエリーノード</h3><p>クエリーノードはオブジェクトストレージからヒストリカルデータをロードし、ヒストリカルデータクエリーを提供します。</p>
<h3 id="Data-node" class="common-anchor-header">データノード</h3><p>データノードは、コンパクションやインデックス構築など、履歴データのオフライン処理を担当します。</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">レイヤー4：ストレージ</h3><p>ストレージはシステムの骨格であり、データの永続性を担う。メタ・ストレージ、ログ・ブローカー、オブジェクト・ストレージで構成される。</p>
<h3 id="Meta-storage" class="common-anchor-header">メタ・ストレージ</h3><p>メタ・ストレージは、コレクション・スキーマやメッセージ消費チェックポイントなどのメタデータのスナップショットを保存する。メタデータの保存には極めて高い可用性、強力な一貫性、トランザクションサポートが要求されるため、Milvusはメタ・ストレージにetcdを選択した。Milvusはサービスの登録とヘルスチェックにもetcdを使用している。</p>
<h3 id="Object-storage" class="common-anchor-header">オブジェクトストレージ</h3><p>オブジェクトストレージには、ログのスナップショットファイル、スカラーデータおよびベクトルデータのインデックスファイル、クエリの中間結果が格納される。MilvusはオブジェクトストレージとしてMinIOを使用しており、AWS S3やAzure Blobといった世界で最も利用されているコスト効率の高いストレージサービスに容易に導入することができる。しかし、オブジェクトストレージはアクセスレイテンシーが高く、クエリー数によって課金される。パフォーマンスを向上させ、コストを下げるために、milvusはメモリまたはSSDベースのキャッシュプール上にコールド・ホット・データ分離を実装する予定である。</p>
<h3 id="WAL-storage" class="common-anchor-header">WALストレージ</h3><p>WAL（Write-Ahead Log）ストレージは、分散システムにおけるデータの耐久性と一貫性の基盤である。変更がコミットされる前に、まずログに記録され、障害が発生した場合でも、中断したところから正確にリカバリできることを保証する。</p>
<p>一般的なWALの実装には、Kafka、Pulsar、Woodpeckerなどがある。従来のディスクベースのソリューションとは異なり、Woodpeckerはオブジェクトストレージに直接書き込むクラウドネイティブなゼロディスク設計を採用しています。このアプローチは、お客様のニーズに合わせて容易に拡張でき、ローカルディスクを管理するオーバーヘッドを取り除くことで運用を簡素化します。</p>
<p>WALレイヤーは、すべての書き込み操作を事前にログに記録することで、分散環境がどんなに複雑になっても、信頼性の高いシステム全体のリカバリーと一貫性のメカニズムを保証します。</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">データフローとAPIカテゴリ<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusのAPIはその機能によって分類され、アーキテクチャを通じて特定のパスに従います：</p>
<table>
<thead>
<tr><th>APIカテゴリ</th><th>オペレーション</th><th>API例</th><th>アーキテクチャフロー</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>スキーマとアクセス制御</td><td><code translate="no">createCollection</code> <code translate="no">dropCollection</code>, 、<code translate="no">hasCollection</code> <code translate="no">createPartition</code></td><td>アクセス層 → コーディネータ</td></tr>
<tr><td><strong>DML</strong></td><td>データ操作</td><td><code translate="no">insert</code> <code translate="no">delete</code> <code translate="no">upsert</code></td><td>アクセス層 → ストリーミングワーカーノード</td></tr>
<tr><td><strong>DQL</strong></td><td>データクエリー</td><td><code translate="no">search</code>,<code translate="no">query</code></td><td>アクセス層 → バッチワーカーノード（クエリノード）</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">データフロー例：検索操作</h3><ol>
<li>クライアントがSDK/RESTful API経由で検索リクエストを送信</li>
<li>ロードバランサーがリクエストをアクセスレイヤーの利用可能なプロキシにルーティング</li>
<li>Proxyはルーティングキャッシュを使ってターゲットノードを決定し、キャッシュが利用できない場合のみCoordinatorに連絡する。</li>
<li>Proxyはリクエストを適切なStreaming Nodeに転送し、Streaming Nodeはローカルで成長データ検索を実行しながら、密封データ検索のためにQuery Nodeと連携する。</li>
<li>クエリーノードは必要に応じてオブジェクトストレージから封印されたセグメントをロードし、セグメントレベルの検索を実行する。</li>
<li>検索結果はマルチレベルで削減される：クエリ・ノードは複数のセグメントにわたる結果を削減し、ストリーミング・ノードはクエリ・ノードからの結果を削減し、プロキシはクライアントに戻る前にすべてのストリーミング・ノードからの結果を削減します。</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">データフローの例：データ挿入</h3><ol>
<li>クライアントがベクトルデータを含む挿入リクエストを送信</li>
<li>アクセス・レイヤがリクエストを検証し、ストリーミング・ノードに転送する。</li>
<li>ストリーミング・ノードが操作をWALストレージに記録し、耐久性を確保する</li>
<li>データはリアルタイムで処理され、クエリに利用可能になる</li>
<li>セグメントが容量に達すると、Streaming Nodeは密封されたセグメントへの変換をトリガーする</li>
<li>データノードがコンパクションを行い、密封されたセグメント上にインデックスを構築し、結果をオブジェクトストレージに格納する。</li>
<li>クエリノードは新しく構築されたインデックスを読み込み、対応する成長データを置き換える。</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">次のページ<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/v2.6.x/main_components.md">メインコンポーネントの</a>詳細な実装を見る</li>
<li><a href="/docs/ja/v2.6.x/data_processing.md">データ処理の</a>ワークフローと最適化戦略について学ぶ</li>
<li>Milvusの<a href="/docs/ja/v2.6.x/consistency.md">一貫性</a>モデルとトランザクション保証について理解する。</li>
</ul>
