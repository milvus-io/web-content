---
id: milvus_backup_0_6_cli.md
summary: Milvus Backup 0.6.0 を設定し、バックアップを作成し、CLI を使用して復元されたデータを確認します。
title: Milvus Backup 0.6.0 の使用
---
<h1 id="Use-Milvus-Backup-060" class="common-anchor-header">Milvus Backup 0.6.0 の使用<button data-href="#Use-Milvus-Backup-060" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup を使用してコレクションをバックアップし、同じ Milvus インスタンスまたは別の Milvus インスタンスに復元します。 このガイドでは、<strong>Milvus Backup 0.6.0</strong> について説明します。Milvus 3.0 でのバックアップと復元は、<strong>Milvus 3.0.1</strong> 以降で公式にサポートされています。Backup 0.6.0 は、サポート対象の Milvus 2.x バージョンにおける binlog ワークフローもサポートしています。<a href="/docs/ja/milvus_backup_overview.md#Compatibility-matrix">Milvus Backup の互換性については</a>、こちらをご確認ください。</p>
<p>Backup 0.5.x を引き続き使用している場合は、<a href="/docs/ja/milvus_backup_cli.md">0.5.x CLI ガイド</a>を参照してください。アップグレードを行う場合は、まず「<a href="/docs/ja/milvus_backup_upgrade.md">Milvus Backup のアップグレード</a>」の手順に従ってください。</p>
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
    </button></h2><p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0 リリースから</a>、お使いのオペレーティングシステムおよびアーキテクチャに対応したバイナリをダウンロードし、解凍してください。バイナリと設定例は、同じリリースのものを使用してください。</p>
<p>代わりにソースからビルドする場合は、<strong>Go 1.26 以降を</strong>インストールしてから、次のコマンドを実行してください：</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.6.0 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<p>あらかじめビルドされたバイナリには Go は必要ありません。以降のすべてのシェルコマンドは、<code translate="no">milvus-backup</code> を含むディレクトリから実行してください。</p>
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
    </button></h2><p>Milvus Backup は、Milvus の gRPC エンドポイント、その管理エンドポイント、インスタンスのストレージ、およびバックアップ先へのアクセスを必要とします。スナップショットバックアップの場合、Milvus サーバーはバックアップストレージへのアクセスも必要とします。</p>
<p>設定ディレクトリを作成します:</p>
<pre><code translate="no" class="language-shell">mkdir -p configs
<button class="copy-code-btn"></button></code></pre>
<p>この MinIO の例を `<code translate="no">configs/backup.yaml</code>` として保存してください。アドレス、認証情報、バケット、およびルートパスは、ご自身のデプロイメントの設定に置き換えてください。<code translate="no">minioadmin</code> の認証情報は、MinIO のテスト用デフォルト値です。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">configVersion:</span> <span class="hljs-string">v2</span>
<span class="hljs-attr">milvus:</span>
  <span class="hljs-attr">grpc:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">management:</span>
    <span class="hljs-attr">endpoint:</span> <span class="hljs-string">http://localhost:9091</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">provider:</span> <span class="hljs-string">minio</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">localhost</span>
    <span class="hljs-attr">port:</span> <span class="hljs-number">9000</span>
    <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">false</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">files</span>
    <span class="hljs-attr">auth:</span>
      <span class="hljs-attr">type:</span> <span class="hljs-string">static</span>
      <span class="hljs-attr">accessKeyID:</span> <span class="hljs-string">minioadmin</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">minioadmin</span>
<span class="hljs-attr">backup:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketName:</span> <span class="hljs-string">a-bucket</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">backup</span>
<span class="hljs-attr">transfer:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">auto</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">milvus.grpc</code> バックアップまたは復元対象のインスタンスに接続します。認証が有効になっている場合は、<code translate="no">milvus.user</code> および<code translate="no">milvus.password</code> も設定してください。</li>
<li><code translate="no">milvus.management.endpoint</code> は、バックアップ中のガベージコレクションの一時停止/再開に使用されます。</li>
<li><code translate="no">milvus.storage</code> インスタンスの実際のオブジェクトストレージと一致している必要があります。ここにバケットを設定しても、Milvusの設定は変更されません。</li>
<li><code translate="no">backup.storage</code> バックアップ先を指定します。設定されていないフィールドは<code translate="no">milvus.storage</code> から継承されますが、<code translate="no">rootPath</code> は例外で、デフォルトは<code translate="no">backup</code> です。</li>
<li><code translate="no">transfer.mode: auto</code> バックエンドが一致する場合はストレージ側のコピーを、それ以外の場合はMilvus Backup経由のストリーミングを選択します。この設定はオブジェクト転送を制御するものであり、バックアップ形式を制御するものではありません。</li>
</ul>
<p>一般的なストレージのデフォルト設定を以下に示します。使用する前に、稼働中のデプロイメントでこれらの値を確認してください。</p>
<table>
<thead>
<tr><th>設定</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td>バケット</td><td><code translate="no">a-bucket</code></td><td><code translate="no">milvus-bucket</code></td></tr>
<tr><td>ルートパス</td><td><code translate="no">files</code></td><td><code translate="no">file</code></td></tr>
</tbody>
</table>
<p>Milvusサーバーがバックアップストアへのアクセスに別のアドレスを使用する場合は、<code translate="no">backup.storage.milvusAddress</code> および<code translate="no">milvusPort</code> を、サーバーからアクセス可能なアドレスに設定してください。認証、TLS、その他のストレージプロバイダー、および追加の設定については、<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/configs/backup.yaml">0.6.0 の設定例を</a>参照してください。</p>
<p>有効な値を確認し、接続性をチェックしてください:</p>
<pre><code translate="no" class="language-shell">./milvus-backup config show --config configs/backup.yaml
./milvus-backup check --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">config show</code> 各値のソース元を報告し、値を非表示にします。接続性の確認では、<code translate="no">Success!</code> と報告されるはずです。バックアップを作成する前に、接続エラーやストレージエラーを解決してください。</p>
<p>既存の v1 設定については、「<a href="/docs/ja/milvus_backup_upgrade.md#Migrate-the-configuration">Milvus バックアップのアップグレード</a>」を参照してください。自動設定変換では、削除された CLI フラグは置き換えられません。</p>
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
    </button></h2><p>「<code translate="no">coll</code> 」という名前の既存のコレクションを使用し、「<code translate="no">coll_bak</code> 」が存在しないことを確認してください。バックアップの前に、スキーマ、エンティティ数、代表的なスカラー値およびベクトル値、および既知の検索結果を記録してください。復元したコピーと比較する際は、サンプルデータを変更しないようにしてください。代わりに、小規模な使い捨てデータセットを作成するには、<a href="/docs/ja/snapshot-backup-and-restore.md#Prepare-sample-data">「サンプルデータの準備</a>」を参照してください。</p>
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
    </button></h2><p><code translate="no">coll</code> の名前付きバックアップを作成します：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --filter coll -n my_backup --config configs/backup.yaml
./milvus-backup list --config configs/backup.yaml
./milvus-backup get -n my_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>create コマンドの実行結果に `<code translate="no">create backup success</code>` と表示されるはずです。`<code translate="no">get</code> ` を実行するとバックアップのメタデータが返されます。期待されるコレクションが含まれていることを確認してください。`<code translate="no">--filter</code> ` を省略すると、対象となるすべてのコレクションがバックアップされます。外部コレクションはスキップされます。</p>
<p><code translate="no">--filter</code> カンマ区切りの名前を受け付けます：デフォルトデータベース内の `<code translate="no">coll</code> `、`<code translate="no">db1.coll</code>`、またはデータベース内のすべてのコレクションを指定する `<code translate="no">'db1.*'</code> `。シェル展開を防ぐには、<code translate="no">*</code> を含むパターンを引用符で囲んでください。</p>
<h3 id="Choose-a-backup-format-or-purpose" class="common-anchor-header">バックアップ形式または目的を選択する<button data-href="#Choose-a-backup-format-or-purpose" class="anchor-icon" translate="no">
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
    </button></h3><p>デフォルトの<code translate="no">--format auto</code> では、Milvus 3.0 はスナップショットバックアップを使用します。対応している Milvus 2.x サーバーは binlog を使用します。binlog の動作を明示的に維持するには、<code translate="no">--format binlog</code> を指定してください。<a href="/docs/ja/snapshot-backup-and-restore.md">スナップショットの例では</a>、<code translate="no">--format snapshot</code> を明示的に選択しています。</p>
<p>ワークフローに合致する目的がある場合は、<code translate="no">--for</code> を使用してください：</p>
<table>
<thead>
<tr><th>目的</th><th>プリセットによって適用される値</th><th>想定される用途</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">clone</code></td><td>RBACバックアップを有効にし、フォーマットおよび戦略の選択内容を維持します</td><td>データを別のインスタンスにコピーします。<code translate="no">auto</code> はMilvus 3.0のスナップショット機能を使用します</td></tr>
<tr><td><code translate="no">archive</code></td><td><code translate="no">binlog</code> を強制適用し、RBACバックアップを有効化します</td><td>後の復元のためにbinlog形式のバックアップを保持します</td></tr>
<tr><td><code translate="no">secondary</code></td><td><code translate="no">binlog</code> 、<code translate="no">bulk_flush</code> 、RBACバックアップ、およびインデックスの追加メタデータを強制的に有効化します</td><td>構成済みのレプリケーショントポロジー内でセカンダリを初期化する</td></tr>
</tbody>
</table>
<p>例：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create --for clone --filter coll -n clone_backup --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>プリセットは、それが設定対象とするオプションについて、競合する値を上書きします。例えば、<code translate="no">--for archive --format snapshot</code> はバイナリログ形式のバックアップを生成します。RBAC メタデータをバックアップしても、それが自動的に復元されるわけではありません。必要な場合は、restore コマンドの<code translate="no">--rbac</code> オプションを使用してください。</p>
<p><code translate="no">secondary</code> は、通常のインスタンス間復元の近道ではありません。また、インデックス・メタデータ用のソース etcd へのアクセス、正しいレプリケーション・クラスタ ID およびチャネル、そして新しいセカンダリ・ターゲットも必要です。バックアップには、<code translate="no">meta/full_meta.json</code> を含む完全なメタデータが保持されている必要があります。レプリケーションの設定およびフェイルオーバーの実行については、本ガイドの範囲外です。 バージョン固有の実装および要件については、<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">0.6.0のソースコードおよびリファレンスを</a>参照してください。</p>
<h3 id="Preserve-the-complete-backup" class="common-anchor-header">バックアップの完全な保存<button data-href="#Preserve-the-complete-backup" class="anchor-icon" translate="no">
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
    </button></h3><p>バックアップは<code translate="no">&lt;backup.storage.bucketName&gt;/&lt;backup.storage.rootPath&gt;/&lt;backup_name&gt;</code> 配下に保存されます。このディレクトリ内のすべてのオブジェクトを保持してください。スナップショットバックアップには、エクスポートされたバンドルとメタデータが含まれます。</p>
<p>メタデータファイルのみをコピーしたり、スナップショットバックアップのレイアウトがバイナリログバックアップと同じであると想定したりしないでください。</p>
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
    </button></h2><p><code translate="no">coll</code> を、設定済みのインスタンス内の<code translate="no">coll_bak</code> として復元します:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll_bak -n my_backup -s _bak --config configs/backup.yaml
<button class="copy-code-btn"></button></code></pre>
<p>CLI では、<code translate="no">--filter</code> は、<code translate="no">-s</code> または<code translate="no">--rename</code> が適用<strong>された後の名前と</strong>一致します。<code translate="no">--filter coll -s _bak</code> を含むコマンドは何も一致せず、コレクションを復元せずに正常に終了します。</p>
<p>元の名前を使用して復元するには、そのコレクション名が存在しないターゲットを選択し、構成でそのターゲットとバックアップの保存場所を指定し、サフィックスを省略します:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore --filter coll -n my_backup --config configs/backup-target.yaml
<button class="copy-code-btn"></button></code></pre>
<p>同一インスタンスでの完全な例については、「<a href="/docs/ja/snapshot-backup-and-restore.md">1つのインスタンス内でのスナップショットのバックアップと復元</a>」を参照してください。 既存のインスタンス間共通ケースのページでは、Backup 0.5.16 および v1 の設定が使用されています。これらのコマンドを 0.6.0 にそのまま適用しないでください。0.6.0 の転送設定については、<a href="https://github.com/zilliztech/milvus-backup/blob/v0.6.0/docs/user_guide/transfer.md">バージョン別の転送ガイド</a>を参照してください。</p>
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
    </button></h2><p><code translate="no">coll_bak</code> が存在することを確認してください。復元時にベクトルインデックスが再作成されなかった場合は、コレクションを読み込む前に、スキーマに適したインデックスを作成してください。そのスキーマ、エンティティ数、スカラーおよびベクトル値、および既知の検索結果を、バックアップ前にキャプチャされたベースラインと比較してください。</p>
<p>使い捨ての256エンティティのデータセットについては、「<a href="/docs/ja/snapshot-backup-and-restore.md#Verify-the-result">結果の確認</a>」に記載されている完全なチェック手順を実行してください。コマンドが正常に実行されただけでは、期待されるデータが復元されたとは限りません。</p>
