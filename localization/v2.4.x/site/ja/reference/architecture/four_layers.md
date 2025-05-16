---
id: four_layers.md
summary: Milvusにおけるストレージ/コンピューティングの分離構造。
title: ストレージ／コンピューティングの分離
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">ストレージ／コンピューティングの分離<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>データプレーンとコントロールプレーンの分離の原則に従い、Milvusはスケーラビリティとディザスタリカバリの点で相互に独立した4つのレイヤーで構成されている。</p>
<h2 id="Access-layer" class="common-anchor-header">アクセス層<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>ステートレスプロキシで構成されるアクセスレイヤーは、システムのフロントレイヤーであり、ユーザーへのエンドポイントである。クライアントのリクエストを検証し、返された結果を縮小する：</p>
<ul>
<li>プロキシはそれ自体ステートレスである。Nginx、Kubernetes Ingress、NodePort、LVSなどのロードバランシングコンポーネントを使用して、統一されたサービスアドレスを提供する。</li>
<li>Milvusは超並列処理（MPP）アーキテクチャを採用しているため、プロキシは最終結果をクライアントに返す前に中間結果を集約し、後処理を行う。</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">コーディネータサービス<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>コーディネータサービスはワーカーノードにタスクを割り当て、システムの頭脳として機能します。担当するタスクには、クラスタトポロジ管理、負荷分散、タイムスタンプ生成、データ宣言、データ管理などがある。</p>
<p>コーディネータには、ルートコーディネータ（root coordinator）、データコーディネータ（data coordinator）、クエリコーディネータ（query coordinator）の3種類がある。</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">ルート・コーディネーター（root coordinator）</h3><p>ルート・コーディネータは、コレクション、パーティション、インデックスの作成または削除などのデータ定義言語 (DDL) およびデータ制御言語 (DCL) の要求を処理し、TSO (タイムスタンプ・オラクル) およびタイム・ティッカーの発行を管理します。</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">クエリコーディネータ（query coordinator）</h3><p>クエリ・コーディネータはクエリ・ノードのトポロジーと負荷分散、成長セグメントから封印セグメントへのハンドオフを管理します。</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">データコーディネータ(data coordinator)</h3><p>データノードとインデックスノードのトポロジーを管理し、メタデータを保持し、フラッシュ、コンパクト化、インデックス構築、その他のバックグラウンドデータ操作をトリガーする。</p>
<h2 id="Worker-nodes" class="common-anchor-header">ワーカーノード<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>ワーカーノードは、コーディネータサービスからの指示に従い、プロキシからデータ操作言語（DML）コマンドを実行する「ダム」エクゼキュータです。ワーカーノードはストレージと計算を分離しているためステートレスであり、Kubernetesにデプロイするとシステムのスケールアウトやディザスタリカバリを促進できる。ワーカーノードには3つのタイプがある：</p>
<h3 id="Query-node" class="common-anchor-header">クエリノード</h3><p>クエリノードは、インクリメンタルなログデータを取得し、ログブローカーにサブスクライブすることでそれらを成長セグメントに変換し、オブジェクトストレージから履歴データをロードし、ベクトルデータとスカラーデータの間でハイブリッド検索を実行する。</p>
<h3 id="Data-node" class="common-anchor-header">データノード</h3><p>データノードはログブローカーにサブスクライブすることで増分ログデータを取得し、変異リクエストを処理し、ログデータをログスナップショットにパックしてオブジェクトストレージに保存する。</p>
<h3 id="Index-node" class="common-anchor-header">インデックスノード</h3><p>インデックスノードはインデックスを構築します。メモリに常駐する必要はなく、サーバーレスフレームワークで実装できる。</p>
<h2 id="Storage" class="common-anchor-header">ストレージ<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>ストレージはシステムの骨格であり、データの永続化を担う。メタ・ストレージ、ログ・ブローカー、オブジェクト・ストレージで構成される。</p>
<h3 id="Meta-storage" class="common-anchor-header">メタ・ストレージ</h3><p>メタ・ストレージは、コレクション・スキーマやメッセージ消費チェックポイントなどのメタデータのスナップショットを保存する。メタデータの保存には極めて高い可用性、強力な一貫性、トランザクションサポートが要求されるため、Milvusはこの目的にetcdを選択した。Milvusはサービスの登録とヘルスチェックにもetcdを使用している。</p>
<h3 id="Object-storage" class="common-anchor-header">オブジェクトストレージ</h3><p>オブジェクトストレージは、ログのスナップショットファイル、スカラーデータとベクトルデータのインデックスファイル、中間クエリ結果を格納する。MilvusはオブジェクトストレージとしてMinIOを使用しており、AWS S3およびAzure Blobという世界で最も普及しているコスト効率の高いストレージサービスに容易に導入することができる。しかし、オブジェクトストレージはアクセスレイテンシーが高く、クエリー数によって課金される。milvusはパフォーマンスを向上させ、コストを削減するために、メモリまたはSSDベースのキャッシュプール上にコールド・ホット・データ分離を実装する予定である。</p>
<h3 id="Log-broker" class="common-anchor-header">ログブローカー</h3><p>ログブローカーは再生をサポートするパブサブシステムである。ストリーミングデータの永続化とイベント通知を担当する。また、ワーカー・ノードがシステム故障から回復する際、増分データの整合性を保証します。Milvus Distributedはログ・ブローカーとしてPulsarを使用し、Milvus StandaloneはRocksDBを使用する。ログ・ブローカーは、Kafkaのようなストリーミング・データ・ストレージ・プラットフォームに容易に置き換えることができる。</p>
<p>Milvusは「データとしてのログ」の原則に従っているため、Milvusは物理テーブルを保持せず、ログの永続性とスナップショットログによってデータの信頼性を保証している。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>ログメカニズム</span> </span></p>
<p>ログブローカーはMilvusのバックボーンである。生来のpub-subメカニズムにより、データの永続化と読み書き分解を担っています。上の図は、ログブローカー（ログシーケンスの維持）とログサブスクライバーの2つの役割にシステムが分割されているメカニズムを簡略化して示しています。後者は、ローカルデータを更新するためにログシーケンスを購読し、読み取り専用コピーの形でサービスを提供する。pub-subメカニズムは、変更データキャプチャ（CDC）とグローバルに分散された展開という点で、システムを拡張する余地もある。</p>
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
<li>Milvusアーキテクチャの詳細については、<a href="/docs/ja/v2.4.x/main_components.md">メインコンポーネントを</a>お読みください。</li>
</ul>
