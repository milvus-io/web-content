---
id: mqtype-overview.md
title: メッセージキューの概要
summary: >-
  Milvusがサポートするメッセージキュー（mqType）オプションの概要、およびスタンドアロン環境と分散環境の各展開形態でどのオプションを使用すべきかについて。
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">メッセージキューの概要<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、メッセージキュー（ライトアヘッドログ、WAL）を利用して、最近の変更のログや出力ストリームのログを管理し、ログのサブスクリプションを提供します。Milvus 3.xでは、<strong>Woodpeckerが</strong>デフォルトのメッセージキューとなっており、別途メッセージングインフラストラクチャを必要としません。Pulsar、Kafka、およびRocksMQは、特定のシナリオにおいて引き続きサポートされています。</p>
<h2 id="Supported-message-queues" class="common-anchor-header">サポートされているメッセージキュー<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>メッセージキュー</th><th style="text-align:center">Milvus スタンドアロン</th><th style="text-align:center">Milvus 分散型（クラスタ）</th><th>デフォルト設定</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/ja/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (組み込み)</td><td style="text-align:center">✔️ (組み込みまたはサービス)</td><td><strong>Milvus 3.x</strong>（両モード）</td><td>デフォルトかつ推奨。オブジェクトストレージ上のクラウドネイティブWAL。外部サービスは不要。</td></tr>
<tr><td><a href="/docs/ja/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x（クラスタのデフォルト）</td><td>サポート対象（外部またはバンドル版）。</td></tr>
<tr><td><a href="/docs/ja/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>対応。Kafka 2.x または 3.x のみ。</td></tr>
<tr><td><a href="/docs/ja/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x（スタンドアロンのデフォルト）</td><td><strong>スタンドアロンのみ</strong>対応。</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>各 Milvus インスタンスは、メッセージキューを 1 つだけ使用します。</p></li>
<li><p><strong>メッセージキューの制限事項</strong>: Milvus v3.0-beta へアップグレードする際は、現在のメッセージキューの設定を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更機能は、将来のバージョンで提供される予定です。</p></li>
<li><p>実行中のインスタンスのメッセージキューを変更するには、「MQ タイプの切り替え」（v2.6.14 以降でサポート）を参照してください。</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">メッセージキューの選択<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>新規デプロイ（Milvus 3.x）：</strong> <strong>Woodpecker</strong>（デフォルト）を使用してください。スタンドアロン環境では組み込み方式で実行されます。分散（クラスタ）環境の場合、推奨されるデフォルトはHelmでデプロイされた専用<a href="/docs/ja/woodpecker.md#Deployment-modes">サービス</a>ですが、組み込み方式もサポートされています。</li>
<li><strong>既存のPulsarまたはKafkaユーザー：</strong>PulsarおよびKafkaは引き続き完全にサポートされています。そのまま使用するか、Woodpeckerに切り替えてください。</li>
<li><strong>RocksMQ：</strong>スタンドアロン環境のみ対応。Milvus 3.x では、組み込み型の Woodpecker に置き換えられています。</li>
</ul>
