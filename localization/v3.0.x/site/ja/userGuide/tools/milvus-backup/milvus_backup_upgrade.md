---
id: milvus_backup_upgrade.md
summary: Milvus Backup を 0.5.x から 0.6.0 にアップグレードし、設定とコマンドを更新した上で、バックアップと復元の動作を確認する。
title: Milvus Backup を 0.6.0 にアップグレードする
---
<h1 id="Upgrade-Milvus-Backup-to-060" class="common-anchor-header">Milvus Backup を 0.6.0 にアップグレードする<button data-href="#Upgrade-Milvus-Backup-to-060" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Milvus Backup ツールを</strong>0.5.x から 0.6.0 にアップグレードする際は、このガイドをご利用ください。このガイドでは、Milvus サーバー自体のアップグレードは行われません。0.5.x のままご利用を続ける場合は、<a href="/docs/ja/milvus_backup_cli.md">0.5.x 版の CLI</a>または<a href="/docs/ja/milvus_backup_api.md">API</a>ガイドを引き続きご利用ください。新規インストールを行う場合は、<a href="/docs/ja/milvus_backup_0_6_cli.md">0.6.0 版のガイド</a>をご利用ください。</p>
<p>V1 YAML 設定は、引き続き自動変換を通じて読み込まれます。ただし、0.6.0 では非推奨の CLI フラグは受け入れられなくなり、Milvus 3.0 ではデフォルトのバックアップ形式が変更されます。スケジュールされたジョブやサービスを切り替える前に、設定とコマンドの両方を確認してください。</p>
<h2 id="Check-the-starting-point" class="common-anchor-header">開始点を確認する<button data-href="#Check-the-starting-point" class="anchor-icon" translate="no">
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
    </button></h2><p>バックアップのバージョン、Milvus のソースおよびターゲットのバージョン、設定ファイル、環境変数の上書き設定、バックアップの保存場所、およびスクリプトや API サービスで使用されているコマンドを記録してください。それらのサーバーバージョンの<a href="/docs/ja/milvus_backup_overview.md#Compatibility-matrix">互換性情報を</a>確認してください。</p>
<p>新しいインストールを検証する際は、元のバイナリ、設定、および既存のバックアップディレクトリを保持してください。<a href="/docs/ja/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">「Milvus Backupの入手」</a>の手順に従って、0.6.0を別のディレクトリにダウンロードしてください。以下のすべてのコマンドは、そのディレクトリから実行され、0.6.0のバイナリを呼び出します。v1の設定のコピーを<code translate="no">configs/backup-v1.yaml</code> に配置してください。</p>
<h2 id="Migrate-the-configuration" class="common-anchor-header">設定の移行<button data-href="#Migrate-the-configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>v1の設定ファイルは0.6.0でも引き続き読み込まれます。Milvus Backupは起動時にそれをv2に変換し、警告を表示します。変換後の設定を別のファイルに保存するには、次のコマンドを実行します：</p>
<pre><code translate="no" class="language-shell">./milvus-backup config migrate --config configs/backup-v1.yaml --output configs/backup-v2.yaml --strict
./milvus-backup config show --config configs/backup-v2.yaml
./milvus-backup check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--strict</code> 無効な移行済み設定は拒否されます。<code translate="no">--output</code> を指定しない場合、コマンドは v2 YAML を標準出力に書き出します。設定が正しく反映されていることを確認してから、新しいファイルを使用してください。</p>
<table>
<thead>
<tr><th>v1の設定</th><th>v2の設定</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.address</code>,<code translate="no">milvus.port</code></td><td><code translate="no">milvus.grpc.address</code>,<code translate="no">milvus.grpc.port</code></td></tr>
<tr><td>以下のソースストレージ<code translate="no">minio.*</code></td><td><code translate="no">milvus.storage.*</code></td></tr>
<tr><td>バックアップストレージの下にある<code translate="no">minio.backup*</code></td><td><code translate="no">backup.storage.*</code></td></tr>
<tr><td>ストレージの認証情報</td><td><code translate="no">milvus.storage.auth.*</code> /<code translate="no">backup.storage.auth.*</code> とし、明示的に<code translate="no">auth.type</code></td></tr>
<tr><td><code translate="no">minio.crossStorage</code></td><td><code translate="no">transfer.mode</code></td></tr>
<tr><td><code translate="no">backup.gcPause.address</code></td><td><code translate="no">milvus.management.endpoint</code></td></tr>
</tbody>
</table>
<p>設定ファイルと同じ変更内で環境変数を確認してください。V2では、<code translate="no">MILVUS_STORAGE_AUTH_SECRET_ACCESS_KEY</code> など、サポートされている認証情報関連の環境変数のみを受け付けます。旧バージョンのv1の名称はv2ファイルには適用されません。バケット名やエンドポイントなどの認証情報以外の設定については、YAMLまたは設定キーによる上書きを使用してください:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup-v2.yaml --set milvus.storage.bucketName=my-bucket
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config migrate</code> 影響を受ける環境変数を報告しますが、そのシークレット値を出力ファイルにコピーすることはありません。<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/env_variables.md">サポートされている v2 環境変数を</a>参照してください。<code translate="no">config show</code> は、非推奨となった<code translate="no">check config</code> コマンドに代わるものです。</p>
<h2 id="Update-CLI-commands" class="common-anchor-header">CLI コマンドの更新<button data-href="#Update-CLI-commands" class="anchor-icon" translate="no">
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
    </button></h2><p>バージョン 0.5 で非推奨となったフラグは、バージョン 0.6.0 では受け入れられません。バイナリをアップグレードする前に、スクリプトを更新してください。</p>
<table>
<thead>
<tr><th>コマンド</th><th>削除されたオプション</th><th>代替</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">create</code></td><td><code translate="no">--colls</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--force</code> /<code translate="no">-f</code></td><td><code translate="no">--strategy skip_flush</code></td></tr>
<tr><td><code translate="no">create</code></td><td><code translate="no">--meta_only</code></td><td><code translate="no">--strategy meta_only</code></td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--collections</code> /<code translate="no">-c</code>,<code translate="no">--databases</code> /<code translate="no">-d</code>,<code translate="no">--database_collections</code> /<code translate="no">-a</code></td><td><code translate="no">--filter</code>、ターゲット名を使用して</td></tr>
<tr><td><code translate="no">restore</code></td><td><code translate="no">--restore_index</code></td><td><code translate="no">--rebuild_index</code></td></tr>
<tr><td><code translate="no">get</code></td><td><code translate="no">--detail</code> /<code translate="no">-d</code></td><td>フラグを削除してください。<code translate="no">get</code> を実行すると、バックアップ情報が返されます</td></tr>
<tr><td><code translate="no">list</code></td><td><code translate="no">--collection</code> /<code translate="no">-c</code></td><td>同等の収集フィルターはありません</td></tr>
</tbody>
</table>
<p>たとえば、以下の 0.5.16 のコマンドは、ソース名<code translate="no">coll</code> を選択します：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>0.6.0 での代替コマンドでは、復元時にターゲット名を使用します:</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>何も一致しない復元フィルターは、コレクションを作成せずに正常に終了することがあります。必ずターゲットコレクションとそのデータを確認してください。HTTP APIの<code translate="no">collection_names</code> は、バックアップ内のソース名を依然として選択します。<a href="/docs/ja/milvus_backup_0_6_api.md#Restore-data">0.6.0 APIガイドを</a>参照してください。</p>
<h2 id="Choose-the-backup-behavior" class="common-anchor-header">バックアップの動作を選択する<button data-href="#Choose-the-backup-behavior" class="anchor-icon" translate="no">
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
<li>サポート対象の Milvus 2.x サーバーでは、<code translate="no">auto</code> 形式は binlog を使用します。バックアップのアップグレードに、Milvus 3.0 への移行は必要ありません。</li>
<li>Milvus 3.0 では、<code translate="no">auto</code> はスナップショットを選択します。バックアップおよび復元の公式サポートは Milvus 3.0.1 から開始されます。バックアップ作成時に binlog の動作を維持するには、<code translate="no">--format binlog</code> を指定してください。</li>
<li>V1の設定互換性では、削除されたコマンドフラグは保持されず、新しいフォーマットのデフォルト設定も上書きされません。</li>
<li>「目的」プリセットでは、フォーマットやその他のオプションを設定できます。たとえば、<code translate="no">--for archive</code> を指定すると、<code translate="no">--format snapshot</code> も指定されている場合でも、binlogが強制的に使用されます。<a href="/docs/ja/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">フォーマットと目的の選択内容</a>を確認してください。</li>
<li>バックアップ中は、外部コレクションはスキップされます。タスクが成功したからといって、すべてのコレクションが対象に含まれたとみなすのではなく、バックアップのメタデータを確認してください。</li>
</ul>
<h2 id="Validate-before-switching-jobs" class="common-anchor-header">ジョブを切り替える前に検証を行う<button data-href="#Validate-before-switching-jobs" class="anchor-icon" translate="no">
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
    </button></h2><p>次の例では、binlog形式を維持したまま、新しいコレクションに復元します。「<code translate="no">coll</code> 」を、スキーマ、カウント、スカラーおよびベクトル値、検索結果が記録済みのコレクションに置き換えてください。新しいバックアップ名を使用し、ターゲット名「<code translate="no">coll_upgrade_check</code> 」が存在しないことを確認してください。</p>
<pre><code translate="no" class="language-shell">./milvus-backup check --config configs/backup-v2.yaml
./milvus-backup create --filter coll --format binlog -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup get -n upgrade_check --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_upgrade_check -n upgrade_check -s _upgrade_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>バックアップに「<code translate="no">coll</code> 」が含まれていること、および復元後に「<code translate="no">coll_upgrade_check</code> 」が存在することを確認してください。必要に応じてベクトルインデックスを作成し、データをロードした上で、復元されたデータと検索結果を記録済みのベースラインと比較してください。このテスト中は、ソースデータを変更しないでください。</p>
<p>また、新しいツールで既存のバックアップを利用する前に、代表的なバックアップをテストしてください。`<code translate="no">coll</code>` を含む `<code translate="no">legacy_backup</code> ` という名前の 0.5.16 バックアップの場合、別のターゲット名を使用してください：</p>
<pre><code translate="no" class="language-shell">./milvus-backup get -n legacy_backup --config configs/backup-v2.yaml
./milvus-backup restore --filter coll_legacy_check -n legacy_backup -s _legacy_check --config configs/backup-v2.yaml
<button class="copy-code-btn"></button></code></pre>
<p>これらのアップグレードパスは、<strong>Milvus 2.6.11</strong>、バックアップ<strong>0.5.16 → 0.6.0</strong>、および MinIO 内の binlog バックアップを使用して検証されました。新規に作成されたバックアップと既存のバックアップの両方について、エンティティ値およびベクトル検索結果が一致して復元されました。 ただし、これはすべての過去のバックアップや、Milvus 2.x から 3.0 への復元における互換性を保証するものではありません。また、0.5.x が 0.6.0 で作成されたバックアップを読み込めることを保証するものでもありません。</p>
<p>検証に成功したら、ジョブを更新して、新しいバイナリ、確認済みの構成、環境設定、および置換フラグを組み合わせて使用するようにしてください。 API デプロイメントの場合は、確認済みの構成で新しいサービスを起動し、<a href="/docs/ja/milvus_backup_0_6_api.md">0.6.0 HTTP API</a> を通じてタスクの完了を確認してください。Milvus 3.0.1 以降でスナップショットを採用するには、「<a href="/docs/ja/snapshot-backup-and-restore.md">1 つのインスタンスでのスナップショットのバックアップと復元</a>」の手順に従ってください。</p>
