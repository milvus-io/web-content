---
id: milvus_backup_0_6_api.md
summary: HTTP API を通じて、Milvus Backup 0.6.0 のバックアップおよび復元タスクを作成・監視します。
title: Milvus Backup 0.6.0 HTTP API の使用
---
<h1 id="Use-the-Milvus-Backup-060-HTTP-API" class="common-anchor-header">Milvus Backup 0.6.0 HTTP API の使用<button data-href="#Use-the-Milvus-Backup-060-HTTP-API" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup HTTP API を使用して、バックアップの作成、コレクションの復元、および非同期タスクの監視を行います。以下のスナップショットの例では<strong>、Milvus 3.0.1 以降と Milvus</strong> <strong>Backup 0.6.0</strong>を使用しています。Backup 0.5.x については、<a href="/docs/ja/milvus_backup_api.md">0.5.x API ガイドを</a>参照してください。 既存のインストールについては、「<a href="/docs/ja/milvus_backup_upgrade.md">Milvus Backup のアップグレード」を</a>参照してください。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backup の入手<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 リリースから</a>適切なバイナリをダウンロードして解凍してください。代わりにソースからビルドする場合は、<a href="/docs/ja/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">「Milvus Backup の入手</a>」の手順に従ってください。ビルドには Go 1.26 以降が必要です。</p>
<h2 id="Prepare-configuration-file" class="common-anchor-header">設定ファイルの準備<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>「<a href="/docs/ja/milvus_backup_0_6_cli.md#Prepare-configuration-file">設定ファイルの準備</a>」にある v2 の例を使用して、<code translate="no">configs/backup.yaml</code> を作成してください。Milvus、インスタンスのストレージ、およびバックアップ先へのアクセスを設定します。また、スナップショット操作を行うためには、Milvus サーバーがバックアップ ストレージにアクセスできる必要があります。</p>
<p>v1形式のファイルをお持ちの場合、引き続き読み込むことができます。スキーマや環境変数を変更する前に、「<a href="/docs/ja/milvus_backup_upgrade.md#Migrate-the-configuration">設定の移行</a>」を参照してください。</p>
<p>バイナリが含まれるディレクトリから、設定を確認し、接続性をチェックします:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>接続性チェックの結果が「<code translate="no">Success!</code> 」と表示されたら、次の手順に進んでください。</p>
<h2 id="Start-up-the-API-server" class="common-anchor-header">APIサーバーを起動します<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>確認済みの設定を使用してサービスを起動します：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>デフォルトのポートは 8080 です。別のポートを選択するには、<code translate="no">-p</code> を使用してください:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 18080 --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>特定のサービスに対しては、これらのコマンドのうち1つだけを実行してください。以下の例ではポート8080を使用しています。別のポートを選択した場合は、URLを変更してください。Swagger UIは<code translate="no">http://localhost:8080/api/v1/docs/index.html</code> で利用可能です。</p>
<p>タスクのポーリング中は、サービスを稼働させたままにしてください。タスク ID およびリアルタイムの進行状況はサービスプロセスに紐づいており、プロセスが停止した後も永続化されたバックアップはオブジェクトストレージに残ります。</p>
<h2 id="Prepare-data" class="common-anchor-header">データの準備<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll</code> という名前の既存のコレクションを使用するか、「<a href="/docs/ja/snapshot-backup-and-restore.md#Prepare-sample-data">サンプルデータの準備</a>」の手順に従って 256 エンティティのテスト用コレクションを作成してください。独自のデータを使用する場合は、リクエスト内のコレクション名を変更してください。結果の検証中は、テストデータを変更しないでください。</p>
<h2 id="Back-up-data" class="common-anchor-header">データのバックアップ<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>非同期のバックアップリクエストを送信します：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;]
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>レスポンスには `<code translate="no">requestId</code>` が含まれます。リクエストの送信は、バックアップが完了したことを意味するものではありません。その値を `<code translate="no">backup_id</code> ` にコピーし、ポーリングを行います:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_backup?backup_id=BACKUP_REQUEST_ID&amp;backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">data.state_code</code> が<code translate="no">2</code> になるまで待ちます。API では以下のタスク状態が使用されます：</p>
<table>
<thead>
<tr><th><code translate="no">state_code</code></th><th>意味</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">0</code></td><td>初期</td></tr>
<tr><td><code translate="no">1</code></td><td>実行中</td></tr>
<tr><td><code translate="no">2</code></td><td>成功</td></tr>
<tr><td><code translate="no">3</code></td><td>失敗</td></tr>
<tr><td><code translate="no">4</code></td><td>タイムアウト</td></tr>
</tbody>
</table>
<p>レスポンスとタスクの状態の両方を確認してください。HTTP 200 だけでは不十分です。<code translate="no">code</code> の値が 0 以外の場合、エラーが発生していることを示します。正常なレスポンスの場合、<code translate="no">code</code> の値は 0 であるため、この項目は省略可能です。タスクが失敗またはタイムアウトした場合は、そのバックアップから復元する前に、レスポンスの詳細とサーバーログを確認してください。</p>
<p>保存されているバックアップの一覧を表示し、名前で完了済みのバックアップを確認します：</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/list&#x27;
curl &#x27;http://localhost:8080/api/v1/get_backup?backup_name=my_backup&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">get_backup</code> <code translate="no">collection_backups</code> を含む JSON メタデータを返します。バックアップファイルはダウンロード<strong>されません</strong>。別のプロセスによって作成されたバックアップの場合、名前のみのクエリでは、進行中のタスクの進捗情報を含まないメタデータが返されることがあります。アクティブなバックアップを監視する際は、現在のサービスの create レスポンスから取得したタスク ID を使用してください。</p>
<p>デフォルトの形式は `<code translate="no">auto</code>` であり、これは Milvus 3.0 のスナップショットを選択します。binlog を明示的に要求するには、`create` ボディに `<code translate="no">&quot;format&quot;: &quot;binlog&quot;</code> ` を追加してください。CLI の `<code translate="no">--for</code> ` プリセットは、HTTP リクエストのフィールドではありません。</p>
<p>バックアップを保持または移動するには、オブジェクトストレージ内のディレクトリ全体をコピーします。<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">0.6.0の転送ガイド</a>を参照してください。</p>
<h2 id="Restore-data" class="common-anchor-header">データの復元<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">coll_bak</code> が既に存在していないことを確認してください。サフィックスを指定して復元リクエストを送信します:</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;_bak&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>HTTPの<code translate="no">collection_names</code> フィールドは、サフィックスが適用される前に、<strong>バックアップ内の</strong>名前を選択します。このリクエストは<code translate="no">coll</code> を選択し、<code translate="no">coll_bak</code> を作成します。一方、CLIの<code translate="no">--filter</code> は、名前変更後のターゲット名と照合します。このHTTPフィールドに<code translate="no">coll_bak</code> を代入しないでください。</p>
<p>復元レスポンスから<code translate="no">data.id</code> をコピーし、タスクをポーリングします:</p>
<pre><code translate="no" class="language-shell">curl &#x27;http://localhost:8080/api/v1/get_restore?id=RESTORE_TASK_ID&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">data.state_code: 2</code> が表示されるまで待機し、<code translate="no">collection_restore_tasks</code> で期待されるターゲットコレクションを確認してください。タスクが送信されただけでは、復元がまだ検証されたことにはなりません。</p>
<h3 id="Restore-with-the-original-name" class="common-anchor-header">元の名前で復元する<button data-href="#Restore-with-the-original-name" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">coll</code> が存在しないターゲットインスタンスを使用します。そのターゲットおよびバックアップ完了先が設定された別のバックアップ API サービスを起動し、このリクエストをターゲットサービスに送信します：</p>
<pre><code translate="no" class="language-shell">curl --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
  --header &#x27;Content-Type: application/json&#x27; \
  --data &#x27;{
    &quot;async&quot;: true,
    &quot;backup_name&quot;: &quot;my_backup&quot;,
    &quot;collection_names&quot;: [&quot;coll&quot;],
    &quot;collection_suffix&quot;: &quot;&quot;
  }&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>返されたタスク ID を使用して、同じサービス上の<code translate="no">get_restore</code> をポーリングします。復元先については<code translate="no">milvus.*</code> を、既存のバックアップについては<code translate="no">backup.storage</code> を設定します。「<a href="/docs/ja/milvus_backup_0_6_cli.md#Prepare-configuration-file">構成ファイルの準備</a>」を参照してください。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">復元されたデータの確認<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>復元タスクが成功したら、ターゲットの Milvus インスタンスに接続し、期待されるコレクションとデータが存在することを確認します。256 エンティティのテストコレクションについては、「<a href="/docs/ja/snapshot-backup-and-restore.md#Verify-the-result">結果の確認</a>」に記載されているスカラー、ベクトル、および検索の全チェックを実行してください。</p>
<p>元の名前で復元する場合は、<code translate="no">coll_bak</code> を<code translate="no">coll</code> に変更してください。検証コードは、復元されたデータを削除することなく読み取ります。本番データについては、バックアップ時に取得したベースラインと比較してください。</p>
