---
id: switch-mq-type.md
title: MQタイプの切り替え
summary: 既存のMilvusデプロイメントのメッセージキューを、ダウンタイムなしでWoodpeckerと別のメッセージキューの間で切り替える。
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">MQタイプの切り替え<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、既存のMilvusデプロイメントのメッセージキュー（MQ）を、ダウンタイムなしでオンラインのまま、<strong>Woodpeckerから別のメッセージキューに切り</strong>替える方法について説明します。</p>
<div class="alert warning">
<p>この機能はリリース予定であり、仕様は変更される可能性があります。試用をご希望の場合やご質問がある場合は、Milvusサポートまでお問い合わせください。</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>MQ切り替え機能は、Milvus 3.0以降で利用可能です。</strong>ご利用前に、MilvusインスタンスをMilvus 3.0以降にアップグレードしてください<strong>。</strong>以前のバージョンではこの機能は利用できません。</li>
<li>インスタンスが正常に動作していること。</li>
</ul>
<h2 id="Scope" class="common-anchor-header">適用範囲<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>本ガイドでは、<strong>Woodpeckerと他のメッセージキュー間の</strong>切り替えについてのみ説明します。PulsarとKafka間の直接的な切り替えについては、本ガイドの対象外です。</p>
<ul>
<li><a href="/docs/ja/switch-rocksmq-woodpecker.md">RocksMQとWoodpecker間の切り替え</a>— Milvusスタンドアロン（Docker Compose）</li>
<li><a href="/docs/ja/switch-pulsar-woodpecker.md">PulsarとWoodpecker間の切り替え</a>— Milvusクラスター（Helm / Milvus Operator）</li>
<li><a href="/docs/ja/switch-kafka-woodpecker.md">KafkaとWoodpecker間の切り替え</a>— Milvusクラスター（Helm / Milvus Operator）</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">一般的なワークフロー<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Milvusインスタンスが正常に動作していることを確認してください。</li>
<li>ソースMQのタイプとターゲットMQのタイプを確認します。</li>
<li><code translate="no">mqType</code> の値を変更<strong>せずに</strong>、ターゲットMQのアクセス設定をMilvusの設定に反映させます。</li>
<li>MixCoord上でWAL alter APIを呼び出し、切り替えをトリガーします。</li>
<li>ログを監視し、切り替えが完了したことを確認します。</li>
</ol>
<div class="alert note">
<p>切り替えを行う前に、ターゲット MQ に、現在の Milvus インスタンスで使用されているものと同じ名前のトピックが含まれていないことを確認してください。ターゲット MQ が別の Milvus インスタンスで使用されていた場合は、トピック名の競合により予期しない動作が発生する可能性があるため、この確認が特に重要です。</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">サポートマトリックス<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>ソース MQ</th><th>ターゲット MQ</th><th>デプロイメント</th><th>ステータス</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (ローカル/MinIO)</td><td>スタンドアロン (Docker Compose)</td><td><strong>サポート対象</strong></td></tr>
<tr><td>Woodpecker (ローカル/MinIO)</td><td>RocksMQ</td><td>スタンドアロン (Docker Compose)</td><td><strong>対応</strong></td></tr>
<tr><td>Pulsar（組み込み／外部）</td><td>Woodpecker (MinIO)</td><td>クラスター (Helm / Operator)</td><td><strong>対応</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar（外部）</td><td>クラスター (Helm / Operator)</td><td><strong>サポート対象</strong></td></tr>
<tr><td>Kafka（組み込み／外部）</td><td>Woodpecker (MinIO)</td><td>クラスター（Helm / Operator）</td><td><strong>対応</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka（外部）</td><td>クラスター (Helm / Operator)</td><td><strong>対応</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker ローカル（またはその逆）</td><td>任意</td><td><strong>未対応</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>MQのタイプを繰り返し切り替えることは避けてください。やむを得ず切り替える必要がある場合は、切り替えのたびに必ず関連データをクリーンアップしてください。残留データがあると、予期しない動作を引き起こす可能性があります。</p>
</div>
