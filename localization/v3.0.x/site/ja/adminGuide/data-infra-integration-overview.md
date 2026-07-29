---
id: data-infra-integration-overview.md
title: データインフラストラクチャと統合
summary: Milvusが連携するサードパーティ製インフラストラクチャの概要 — メタデータ、オブジェクトストレージ、メッセージキュー。
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">データインフラストラクチャと統合<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、中核となる依存関係においてオープンなデータインフラストラクチャを基盤としています。この章では、プラグインとして組み込み、設定可能なコンポーネントについて説明します：</p>
<ul>
<li><strong><a href="/docs/ja/etcd.md">メタデータ</a></strong>— Milvusは、メタデータ（コレクションスキーマ、ノードステータス、消費チェックポイント）をetcdに格納します。</li>
<li><strong><a href="/docs/ja/object-storage.md">オブジェクトストレージ</a></strong>— Milvusは、インデックスファイルやバイナリログをMinIO、AWS S3、またはその他のS3互換／クラウドオブジェクトストレージに保存します。</li>
<li><strong><a href="/docs/ja/mqtype-overview.md">メッセージキュー</a></strong>— Milvusは、書き込み先行ログ（WAL）として、Woodpecker（デフォルト）、Pulsar、Kafka、またはRocksMQを使用します。</li>
</ul>
<p>デフォルトでは、新しい Milvus 3.x デプロイメントは、メッセージキューとして<strong>Woodpecker</strong>、メタデータとして<strong>etcd</strong>、オブジェクトストレージとして<strong>MinIO</strong>を使用して動作します。追加のメッセージングインフラストラクチャは必要ありません。</p>
