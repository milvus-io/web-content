---
id: milvus-cdc-overview.md
order: 1
summary: Milvus-CDCは、Milvusインスタンスのインクリメンタルデータを取り込み、同期することができるユーザーフレンドリーなツールです。
title: CDCの概要
---
<h1 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDCは、Milvusインスタンスの増分データをキャプチャし、同期することができるユーザーフレンドリーなツールです。ソースインスタンスとターゲットインスタンス間でシームレスにデータを転送することで、ビジネスデータの信頼性を確保し、増分バックアップやディザスタリカバリを容易に行うことができます。</p>
<h2 id="Key-capabilities" class="common-anchor-header">主な機能<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>逐次データ同期</strong>：Milvusインスタンス間でデータの変更を逐次同期することにより、データの整合性と一貫性を確保します。</p></li>
<li><p><strong>増分データのレプリケーション</strong>挿入や削除を含む増分データをソースMilvusからターゲットMilvusにレプリケートし、永続的なストレージを提供します。</p></li>
<li><p><strong>CDCタスク管理</strong>：OpenAPIリクエストによるCDCタスクの管理（CDCタスクの作成、ステータスの照会、削除を含む）を可能にします。</p></li>
</ul>
<p>さらに、将来的にはストリーム処理システムとの統合をサポートするように機能を拡張する予定です。</p>
<h2 id="Architecture" class="common-anchor-header">アーキテクチャ<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDCは、タスクとメタデータを管理するHTTPサーバと、ソースMilvusインスタンスからデータを取得するリーダと処理したデータをターゲットMilvusインスタンスに送信するライタとタスク実行を同期する<strong>corelibの</strong>2つの主要コンポーネントからなるアーキテクチャを採用しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-architecture</span> </span></p>
<p>先の図では</p>
<ul>
<li><p><strong>HTTPサーバ</strong>：ユーザーリクエストを処理し、タスクを実行し、メタデータを管理する。Milvus-CDCシステム内のタスクオーケストレーションのコントロールプレーンとして機能する。</p></li>
<li><p><strong>Corelib</strong>：タスクの実際の同期を担当する。ソースMilvusのetcdおよびメッセージキュー(MQ)から情報を取得するリーダコンポーネントと、MQからのメッセージをMilvusシステム用のAPIパラメータに変換し、これらのリクエストをターゲットMilvusに送信して同期プロセスを完了させるライタコンポーネントが含まれる。</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">ワークフロー<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDCのデータ処理フローには以下のステップが含まれます：</p>
<ol>
<li><p><strong>タスクの作成</strong>ユーザはHTTPリクエストを通じてCDCタスクを開始する。</p></li>
<li><p><strong>メタデータの取得</strong>：システムはソースMilvusのetcdからコレクション固有のメタデータ（コレクションのチャネルおよびチェックポイント情報を含む）をフェッチします。</p></li>
<li><p><strong>MQ接続</strong>：手元にあるメタデータを使用して、システムはMQに接続し、データストリームの購読を開始します。</p></li>
<li><p><strong>データ処理</strong>：MQからのデータは読み込まれ、解析され、Go SDKを使用して渡されるか、ソースMilvusで実行されたオペレーションを複製するために処理されます。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">リミット<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>インクリメンタルデータ同期</strong>：現在のところ、Milvus-CDCは増分データのみを同期するように設計されています。完全なデータバックアップが必要な場合は、<a href="https://milvus.io/community">弊社までお問い合わせ</a>ください。</p></li>
<li><p><strong>同期範囲</strong>現在、Milvus-CDCはクラスタレベルでの同期が可能です。今後のリリースでは、コレクションレベルでのデータ同期のサポートを追加する予定です。</p></li>
<li><p><strong>サポートされるAPIリクエスト</strong>Milvus-CDCは現在以下のAPIリクエストに対応しています。今後のリリースでは、より多くのリクエストに対応する予定です：</p>
<ul>
<li><p>コレクションの作成/削除</p></li>
<li><p>挿入/削除/アップサート</p></li>
<li><p>パーティションの作成/削除</p></li>
<li><p>インデックスの作成/削除</p></li>
<li><p>ロード/リリース/フラッシュ</p></li>
<li><p>パーティションのロード/リリース</p></li>
<li><p>データベースの作成/削除</p></li>
</ul></li>
</ul>
