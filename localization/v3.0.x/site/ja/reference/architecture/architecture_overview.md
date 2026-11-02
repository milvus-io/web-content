---
id: architecture_overview.md
summary: Milvusは、類似性検索と人工知能向けに特別に構築された、高速で信頼性が高く、安定したベクトルデータベースを提供しています。
title: Milvusのアーキテクチャ概要
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvusのアーキテクチャ概要<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、大規模なベクトルデータセットに対する高性能な類似性検索を目的として設計された、<strong>オープンソース</strong> <strong>のクラウドネイティブベクトル</strong>データベースです。Faiss、HNSW、DiskANN、SCANNなどの一般的なベクトル検索ライブラリを基盤として構築されており、AIアプリケーションや非構造化データの検索シナリオを強化します。 先に進む前に、埋め込み検索<a href="/docs/ja/glossary.md">の基本原理</a>について理解しておいてください。</p>
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
    </button></h2><p>以下の図は、Milvus の大まかなアーキテクチャを示しており、ストレージ層と演算層が完全に分離された、モジュール式でスケーラブルなクラウドネイティブ設計を特徴としています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>アーキテクチャ図</span>
  
 </span></p>
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
    </button></h2><p>Milvusは、データプレーンとコントロールプレーンの分離という原則に従っており、スケーラビリティと災害復旧の観点から互いに独立した4つの主要なレイヤーで構成されています。 ストレージ層と演算層が完全に分離されたこの共有ストレージアーキテクチャにより、演算ノードの水平スケーリングが可能になる一方で、WoodpeckerをゼロディスクWAL層として実装することで、弾力性を高め、運用オーバーヘッドを削減しています。</p>
<p>ストリーム処理を「ストリーミングノード」に、バッチ処理を「クエリノード」および「データノード」に分離することで、Milvus は高いパフォーマンスを実現すると同時に、リアルタイム処理の要件も満たしています。</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">詳細なレイヤーアーキテクチャ<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">レイヤー1：アクセス層<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>ステートレスプロキシのグループで構成されるアクセス層は、システムの最前面の層であり、ユーザーに対するエンドポイントです。この層はクライアントのリクエストを検証し、返される結果を絞り込みます。</p>
<ul>
<li>プロキシ自体はステートレスです。Nginx、Kubernetes Ingress、NodePort、LVS などのロードバランシングコンポーネントを使用して、統一されたサービスアドレスを提供します。</li>
<li>Milvusは大規模並列処理（MPP）アーキテクチャを採用しているため、プロキシは中間結果を集約・後処理してから、最終結果をクライアントに返します。</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">レイヤー2：コーディネーター<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>コーディネーターは、Milvusの「頭脳」としての役割を果たします。クラスター全体において、いかなる時点でも正確に1つのコーディネーターのみがアクティブであり、クラスターのトポロジーの維持、すべてのタスクタイプのスケジューリング、およびクラスターレベルの一貫性の確保を担当します。</p>
<p>以下は、<strong>コーディネーター</strong>が処理するタスクの一部です：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：コレクション、パーティション、インデックスの作成や削除などのデータ定義言語（DDL）およびデータ制御言語（DCL）のリクエストを処理するとともに、タイムスタンプ・オラクル（TSO）の管理やタイムティッカーの発行を行います。</li>
<li><strong>ストリーミング・サービスの管理</strong>：Write-Ahead Log（WAL）をストリーミング・ノードにバインドし、ストリーミング・サービスのサービス検出機能を提供します。</li>
<li><strong>クエリ管理</strong>：クエリノードのトポロジーと負荷分散を管理し、クエリのルーティングを誘導するためのクエリビューを提供・管理します。</li>
<li><strong>履歴データ管理</strong>：コンパクションやインデックス構築などのオフラインタスクをデータノードに分散し、セグメントおよびデータビューのトポロジーを管理します。</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">レイヤー 3：ワーカーノード<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>「腕と脚」に相当します。ワーカーノードは、コーディネーターからの指示に従う単純な実行ノードです。ストレージと演算が分離されているため、ワーカーノードはステートレスであり、Kubernetes上にデプロイされた場合、システムのスケールアウトや災害復旧を容易にします。ワーカーノードには3つのタイプがあります：</p>
<h3 id="Streaming-node" class="common-anchor-header">ストリーミングノード<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>ストリーミングノードは、シャードレベルの「ミニブレイン」として機能し、基盤となるWALストレージに基づいて、シャードレベルの一貫性保証と障害復旧を提供します。一方、ストリーミングノードは、増大するデータのクエリ処理やクエリプランの生成も担当します。さらに、増大するデータをシール済み（履歴）データに変換する処理も行います。</p>
<h3 id="Query-node" class="common-anchor-header">クエリノード<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>クエリノードは、オブジェクトストレージから履歴データを読み込み、履歴データのクエリ処理を提供します。</p>
<h3 id="Data-node" class="common-anchor-header">データノード<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>データノードは、コンパクションやインデックス構築など、履歴データのオフライン処理を担当します。</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">レイヤー4：ストレージ<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>ストレージはシステムの基盤であり、データの永続化を担当します。メタストレージ、ログブローカー、およびオブジェクトストレージで構成されています。</p>
<h3 id="Meta-storage" class="common-anchor-header">メタストレージ<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>メタストレージは、コレクションスキーマやメッセージ消費チェックポイントなどのメタデータのスナップショットを格納します。メタデータの格納には極めて高い可用性、強力な一貫性、およびトランザクションのサポートが求められるため、Milvusはメタストアとしてetcdを採用しました。また、Milvusではサービスの登録やヘルスチェックにもetcdを使用しています。</p>
<h3 id="Object-storage" class="common-anchor-header">オブジェクトストレージ<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>オブジェクトストレージは、データとインデックスファイルを永続化します。Milvusは、MinIO、AWS S3、Azure Blob Storageなどのオブジェクトストレージバックエンドをサポートしています。QueryNodesは、クエリ処理に必要なデータとインデックスをキャッシュします。</p>
<p>Milvus 2.6.4以降で利用可能な<a href="/docs/ja/tiered-storage-overview.md">階層型ストレージ</a>（<a href="/docs/ja/tiered-storage-overview.md">Tiered Storage）</a>により、QueryNodesは初期化時にすべてを読み込むのではなく、まずセグメントのメタデータを読み込み、フィールドデータやインデックスは必要に応じて取得できるようになります。リモートオブジェクトストレージが永続的なソースであり続け、ローカルキャッシュエントリを削除しても、保存されたデータは削除されません。 キャッシュされていないデータにアクセスすると、ストレージI/Oが増加し、クエリのレイテンシが長くなる可能性があります。レイテンシに敏感なフィールドやインデックスには「<a href="/docs/ja/warm-up.md">ウォームアップ」</a>を使用し、ロード戦略を選択する前に、コールドクエリおよびウォームキャッシュのレイテンシを評価してください。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL ストレージ<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Write-Ahead Log（WAL）ストレージは、分散システムにおけるデータの耐久性と一貫性の基盤です。変更がコミットされる前に、まずログに記録されます。これにより、障害が発生した場合でも、中断した箇所から正確に復旧することが可能になります。</p>
<p>一般的なWALの実装には、Kafka、Pulsar、Woodpeckerなどがあります。従来のディスクベースのソリューションとは異なり、Woodpeckerはクラウドネイティブのゼロディスク設計を採用しており、オブジェクトストレージに直接書き込みを行います。このアプローチにより、ニーズに応じて容易にスケールでき、ローカルディスクの管理にかかるオーバーヘッドを排除することで運用を簡素化します。</p>
<p>すべての書き込み操作を事前にログに記録することで、WALレイヤーは、分散環境がどれほど複雑化しても、信頼性の高いシステム全体のリカバリおよび一貫性を保証します。</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">データフローとAPIのカテゴリ<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusのAPIは機能別に分類され、アーキテクチャ内の特定のパスをたどります：</p>
<table>
<thead>
<tr><th>API カテゴリ</th><th>操作</th><th>APIの例</th><th>アーキテクチャ上のフロー</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>スキーマとアクセス制御</td><td><code translate="no">createCollection</code>、<code translate="no">dropCollection</code> 、<code translate="no">hasCollection</code> 、<code translate="no">createPartition</code></td><td>アクセス層 → コーディネーター</td></tr>
<tr><td><strong>DML</strong></td><td>データ操作</td><td><code translate="no">insert</code>,<code translate="no">delete</code>,<code translate="no">upsert</code></td><td>アクセス層 → ストリーミング・ワーカー・ノード</td></tr>
<tr><td><strong>DQL</strong></td><td>データクエリ</td><td><code translate="no">search</code>,<code translate="no">query</code></td><td>アクセス層 → バッチワーカーノード（クエリノード）</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">データフローの例：検索操作<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>クライアントがSDK/RESTful APIを介して検索リクエストを送信</li>
<li>ロードバランサーがリクエストをアクセス層の利用可能なプロキシにルーティングする</li>
<li>プロキシはルーティングキャッシュを使用してターゲットノードを決定し、キャッシュが利用できない場合にのみコーディネーターに連絡する</li>
<li>プロキシはリクエストを適切なストリーミングノードに転送し、ストリーミングノードはローカルで増分データ検索を実行しながら、クエリノードと連携してシールドデータの検索を行う</li>
<li>クエリノードは、必要に応じてオブジェクトストレージからシールドされたセグメントを読み込み、セグメントレベルの検索を実行する</li>
<li>検索結果は多段階の絞り込みを経る：クエリノードが複数のセグメントにわたる結果を絞り込み、ストリーミングノードがクエリノードからの結果を絞り込み、プロキシがすべてのストリーミングノードからの結果をさらに絞り込んでからクライアントに返す</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">データフローの例：データの挿入<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>クライアントは、ベクトルデータを含む挿入リクエストを送信する</li>
<li>アクセス層がリクエストを検証し、ストリーミングノードに転送します</li>
<li>ストリーミングノードは、耐久性を確保するために操作をWALストレージに記録します</li>
<li>データはリアルタイムで処理され、クエリに利用可能になります</li>
<li>セグメントが容量上限に達すると、ストリーミングノードがシールドセグメントへの変換をトリガーする</li>
<li>データノードがコンパクションを処理し、シールドセグメント上にインデックスを構築して、その結果をオブジェクトストレージに格納する</li>
<li>クエリノードは、新しく構築されたインデックスを読み込み、対応する増大中のデータを置き換えます</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">今後の展開<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>詳細な実装内容については、<a href="/docs/ja/main_components.md">主要コンポーネント</a>をご覧ください</li>
<li><a href="/docs/ja/data_processing.md">データ処理の</a>ワークフローと最適化戦略について学ぶ</li>
<li>Milvusにおける<a href="/docs/ja/tune_consistency.md">一貫性モデル</a>とトランザクションの保証について理解する</li>
</ul>
