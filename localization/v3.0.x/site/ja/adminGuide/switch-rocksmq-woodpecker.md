---
id: switch-rocksmq-woodpecker.md
title: RocksMQ と Woodpecker の切り替え
summary: >-
  Milvus Standalone（Docker
  Compose）のデプロイメントにおいて、メッセージキューをRocksMQとWoodpeckerの間で切り替える。
---
<h1 id="Switch-between-RocksMQ-and-Woodpecker" class="common-anchor-header">RocksMQ と Woodpecker の切り替え<button data-href="#Switch-between-RocksMQ-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、<strong>Milvus Standalone（Docker Compose）</strong>環境において、メッセージキュー（MQ）<strong>をRocksMQとWoodpecker</strong>（ローカルまたはMinIOバックエンド）の間で双方向に切り替える方法について説明します。一般的なワークフローと前提条件については、<a href="/docs/ja/switch-mq-type.md">「MQタイプの切り替え</a>」を参照してください。</p>
<div class="alert note">
<ul>
<li><strong>前提条件：</strong>MQの切り替え機能は<strong>、Milvus 3.0以降で</strong>利用可能です。作業を開始する前に、MilvusインスタンスをMilvus 3.0以降にアップグレードしてください。以前のバージョンではこの機能は利用できません。</li>
<li>MQの切り替えには、Docker<strong>Composeによる</strong>デプロイ（etcd設定ソースを有効にするもの）が必要です。シングルコンテナのDockerデプロイでは、切り替えはサポートされていません。</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker" class="common-anchor-header">RocksMQ から Woodpecker への切り替え<button data-href="#Switch-from-RocksMQ-to-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">ステップ 1: Milvus インスタンスが実行されていることを確認する<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Standalone Docker Compose インスタンスが正常に実行されていることを確認します。たとえば、テスト用コレクションを作成し、データを挿入し、クエリを実行するなどして確認してください。</p>
<h3 id="Step-2-Configure-Woodpecker-storage" class="common-anchor-header">ステップ 2: Woodpecker ストレージの設定<button data-href="#Step-2-Configure-Woodpecker-storage" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">mqType</code> の値<strong>を変更せずに</strong>、Milvusの設定にWoodpeckerの設定を追加します。<code translate="no">docker exec -it milvus-standalone bash</code> を実行してコンテナに入り、<code translate="no">/milvus/configs/user.yaml</code> を編集します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>   <span class="hljs-comment"># minio or local</span>
<button class="copy-code-btn"></button></code></pre>
<p>設定を適用するために、Milvusインスタンスを再起動します：</p>
<pre><code translate="no" class="language-shell">docker compose restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">ステップ 3: MQ の切り替えを実行する<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Woodpeckerへの切り替えが初めての場合は、この注意事項をスキップしてください。それ以外の場合は、再度切り替える前に、残存するWoodpeckerのメタデータとデータをクリーンアップしてください。残存データがあると、予期しない動作を引き起こす可能性があります。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>MixCoordのポートは通常、<code translate="no">9091</code> です。</p>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">ステップ 4: 切り替えが完了したことを確認する<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=woodpecker]</code> がログに記録されます。</p>
<h3 id="Step-5-Optional-Clean-up-RocksMQ-data" class="common-anchor-header">ステップ 5: (オプション) RocksMQ データのクリーンアップ<button data-href="#Step-5-Optional-Clean-up-RocksMQ-data" class="anchor-icon" translate="no">
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
    </button></h3><p>RocksMQのデータは、<code translate="no">docker-compose.yaml</code> で定義されている<code translate="no">volumes/milvus/rdb_data</code> および<code translate="no">volumes/milvus/rdb_data_meta_kv</code> ディレクトリ内にあります。後でRocksMQに戻す予定がある場合は、競合を避けるために、まずこれらのファイルをクリーンアップしてください。</p>
<h2 id="Switch-from-Woodpecker-to-RocksMQ" class="common-anchor-header">Woodpecker から RocksMQ への切り替え<button data-href="#Switch-from-Woodpecker-to-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">ステップ 1: Milvus インスタンスが実行中であることを確認する<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Standalone Docker Compose インスタンスが正常に実行されていることを確認してください。</p>
<h3 id="Step-2-Execute-the-MQ-switch" class="common-anchor-header">ステップ 2: MQ の切り替えを実行する<button data-href="#Step-2-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>インスタンスに、以前の実行から残っているRocksMQのデータがないことを確認してください。今回がRocksMQへの切り替えが初めての場合は、この注意事項をスキップしてください。それ以外の場合は、まず関連するRocksMQのメタデータとデータをクリーンアップしてください。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;rocksmq&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Verify-the-switch-is-complete" class="common-anchor-header">ステップ 3: 切り替えが完了したことを確認する<button data-href="#Step-3-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>切り替えが成功すると、<code translate="no">[mqTypeValue=rocksmq]</code> というログが出力されます。</p>
<h3 id="Step-4-Optional-Clean-up-Woodpecker-data" class="common-anchor-header">ステップ 4: (オプション) Woodpecker データのクリーンアップ<button data-href="#Step-4-Optional-Clean-up-Woodpecker-data" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>メタデータ（etcd）：</strong>Woodpeckerのキープレフィックスは通常、<code translate="no">woodpecker/...</code> です。<code translate="no">etcdctl get woodpecker --prefix</code> で確認し、削除してください。</li>
<li><strong>ストレージデータ：</strong> <strong>MinIOモードの場合</strong>、バケット内の<code translate="no">&lt;rootPath&gt;/wp/...</code> （通常は<code translate="no">files/wp/...</code> ）にあるログデータを削除します。<strong>ローカルモード</strong>の場合、データはローカルディスクの<code translate="no">volumes/milvus/data/wp/...</code> にあります。</li>
</ul>
<p>後でWoodpeckerに戻す予定がある場合は、競合を避けるために、まずこれらのファイルをクリーンアップしてください。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">サポートされているシナリオ<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
<tr><th>ソース MQ</th><th>ターゲット MQ</th><th>ステータス</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (MinIO/ローカル)</td><td><strong>対応済み</strong></td><td></td></tr>
<tr><td>Woodpecker (MinIO/ローカル)</td><td>RocksMQ</td><td><strong>サポート対象</strong></td><td></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker ローカル</td><td><strong>未対応</strong></td><td>Woodpeckerのストレージモードを切り替えるには、追加のメタデータ処理が必要ですが、これはまだサポートされていません。</td></tr>
<tr><td>Woodpecker ローカル</td><td>Woodpecker MinIO</td><td><strong>未対応</strong></td><td>上記と同様です。</td></tr>
<tr><td>RocksMQ / Woodpecker</td><td>外部のPulsar / Kafka</td><td><strong>サポートされていますが、推奨されません</strong></td><td>スタンドアロンインスタンスは、可能な限りシンプルに保ってください。</td></tr>
</tbody>
</table>
