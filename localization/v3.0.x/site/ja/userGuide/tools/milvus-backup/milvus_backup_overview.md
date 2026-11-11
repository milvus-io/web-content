---
id: milvus_backup_overview.md
summary: Milvus Backup は、Milvus データのバックアップおよび復元を行うための CLI および HTTP API ワークフローを提供します。
title: Milvus Backup
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvus Backup<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Backup は、Milvus コレクションをバックアップし、同じインスタンスまたは別のインスタンスに復元します。コマンドラインインターフェース (CLI) および HTTP API を提供します。</p>
<p>Milvus Backup<strong>0.6.0</strong>では、Milvus 3.0 向けのスナップショットバックアップ、バージョン管理された v2 構成スキーマ、およびバックアップ作成用の目的別プリセットが追加されました。Milvus 3.0 に対する公式のバックアップおよび復元サポートは、<strong>Milvus 3.0.1</strong> から開始されます。</p>
<h2 id="Choose-your-guide" class="common-anchor-header">ガイドの選択<button data-href="#Choose-your-guide" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Backup には、Milvus サーバーのバージョンとは別の独自のリリースバージョンがあります。現在のガイドでは 0.6.x シリーズについて解説しています。Backup 0.5.x のセクションでは、以前のワークフローを掲載しています。ページタイトルのラベルで、対象となる Backup シリーズが識別できます。インストール手順や例では、検証済みの特定のリリースを使用しています。ソースおよびターゲットとなる Milvus サーバーの互換性は、別途確認してください。</p>
<table>
<thead>
<tr><th>作業内容</th><th>ガイド</th></tr>
</thead>
<tbody>
<tr><td>Backup 0.5.x の継続使用</td><td><a href="/docs/ja/milvus_backup_cli.md">0.5.xのコマンド</a>および<a href="/docs/ja/milvus_backup_api.md">HTTP API</a>（例は0.5.16に準拠）</td></tr>
<tr><td>既存のBackupインストールをアップグレードする</td><td><a href="/docs/ja/milvus_backup_upgrade.md">0.5.x から 0.6.x へのアップグレード</a></td></tr>
<tr><td>Backup 0.6.x のインストールと使用</td><td><a href="/docs/ja/milvus_backup_0_6_cli.md">コマンドおよび設定</a>、または<a href="/docs/ja/milvus_backup_0_6_api.md">HTTP API</a></td></tr>
<tr><td>Milvus 3.0.1 以降でのスナップショットのバックアップと復元</td><td><a href="/docs/ja/snapshot-backup-and-restore.md">1つのインスタンス内でのスナップショットのバックアップと復元</a></td></tr>
</tbody>
</table>
<p>既存の「<a href="/docs/ja/single-instance-backup-and-restore.md">同一インスタンス</a>」「<a href="/docs/ja/shared-bucket-backup-and-restore.md">共有バケット</a>」「<a href="/docs/ja/cross-bucket-backup-and-restore.md">バケット間</a>」「<a href="/docs/ja/multi-storage-backup-and-restore.md">ストレージ間</a>」に関するガイドでは、0.5.16 の設定およびコマンドが引き続き記載されています。これらのガイドの例については、Backup の新しいリリースが公開されてもバージョンが更新されることはありません。</p>
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
<li>同じリリースの Backup バイナリと設定例を使用してください。<a href="/docs/ja/milvus_backup_cli.md#Obtain-Milvus-Backup">0.5.x ガイドでは</a>0.5.16 を指定しており、<a href="/docs/ja/milvus_backup_0_6_cli.md#Obtain-Milvus-Backup">現在のガイドでは</a>0.6.0 を指定しています。</li>
<li>Milvus、そのストレージ、およびバックアップ先へのネットワークアクセスを確保してください。スナップショット操作を行うには、Milvus サーバーがバックアップストアにアクセスできることも必要です。</li>
<li>以下のサーバーの互換性を確認してください。Goはソースからビルドする場合にのみ必要です：Backup 0.5.16の場合は1.25以降、0.6.0の場合は1.26以降が必要です。</li>
</ul>
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_backup_architecture.png" alt="Milvus Backup components" class="doc-image" id="milvus-backup-components" /> 
   <span>Milvus Backup のコンポーネント</span>
  
 </span></p>
<p>Milvus Backup は、Milvus インスタンスとバックアップストレージ間のコレクションメタデータおよびデータバックアップを調整します。Backup 0.6.0 では、選択したフォーマットによってコレクションデータのエクスポートおよび復元方法が決定されます：</p>
<table>
<thead>
<tr><th>フォーマット</th><th>バックアップおよび復元の動作</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">snapshot</code></td><td>Milvus はコレクションのスナップショットバンドルをエクスポートします。Milvus Backup はこのバンドル情報を記録し、復元時には Milvus を通じてバンドルをインポートします。結果としてのデータレイアウトはサーバーが管理します。</td></tr>
<tr><td><code translate="no">binlog</code></td><td>Milvus Backupはコレクションのデータファイルとメタデータをコピーし、復元時にコレクションを再作成してバックアップされたデータをインポートします。</td></tr>
<tr><td><code translate="no">auto</code></td><td>サーバーがサポートする機能に応じてフォーマットを選択します。Milvus 3.0 では、スナップショットが選択されます。</td></tr>
</tbody>
</table>
<p>バックアップディレクトリには、メタデータとその形式に必要なファイルが含まれています。アーカイブや移動の際は、ディレクトリ全体をそのまま保持してください。スナップショットバックアップが binlog ディレクトリのレイアウトを使用していると想定しないでください。</p>
<p>バージョン 0.6.0 では、「<code translate="no">create --for</code> 」プリセットにより、目的に応じたオプションが設定されます。「<code translate="no">clone</code> 」は選択したフォーマットを維持しますが、「<code translate="no">archive</code> 」および「<code translate="no">secondary</code> 」では binlog が必要です。セカンダリには、設定済みのレプリケーショントポロジーも必要です。インスタンス間の通常の移行では、セカンダリは必要ありません。<a href="/docs/ja/milvus_backup_0_6_cli.md#Choose-a-backup-format-or-purpose">「バックアップフォーマットまたは目的の選択</a>」を参照してください。</p>
<p>Backup 0.6.0 では、バックアップ中に外部コレクションはスキップされます。タスクが正常に完了したからといって、外部コレクションのデータが含まれていたとは限りません。</p>
<h2 id="Compatibility-matrix" class="common-anchor-header">互換性マトリックス<button data-href="#Compatibility-matrix" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Backup 0.6.0 では、すべての Milvus インストールを 3.0 にアップグレードする必要はありません。</strong>サポート対象の Milvus 2.x バージョンにおけるバイナリログ（binlog）ワークフローに対応しています<strong>。</strong>Milvus 3.0 シリーズに対する公式のバックアップおよび復元サポートは<strong>Milvus 3.0.1</strong> から開始されており、スナップショットの例ではこのシリーズを使用しています。</p>
<p><a href="/docs/ja/milvus_backup_upgrade.md">アップグレードガイドは</a>、Milvus 2.6.11 上で Backup 0.5.16 および 0.6.0 を使用して検証されており、0.6.0 による 0.5.16 のバックアップの復元も含まれています。このテスト済みの組み合わせは、以下の互換性マトリックスを拡張するものではありません。</p>
<p>ソースおよびターゲットのMilvusバージョンは、サポート対象の組み合わせでなければなりません。ターゲットのバージョンが新しいというだけでは、互換性が保証されるわけではありません。以下のレガシーマトリックスは、Milvus Backup 0.5.7以降で文書化されているMilvus 2.xを対象としていますが、2.xから3.0への移行互換性を保証するものではありません。</p>
<table>
<thead>
<tr><th>バックアップ元 ↓ / 復元先 →</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th><th>Milvus v2.6.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>なし</td><td>いいえ</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.3.x</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.4.x</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.5.x</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.6.x</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>はい</td></tr>
</tbody>
</table>
<p>バージョン間の移行を行う前に、<a href="https://github.com/zilliztech/milvus-backup/tree/v0.6.0">バックアップのリリース文書</a>を参照し、ソースバージョン、ターゲットバージョン、およびバックアップ形式を確認してください。これらのガイドでは、記載されていない組み合わせについて、レガシーマトリックスを拡張するものではありません。</p>
<h2 id="Release-notes" class="common-anchor-header">リリースノート<button data-href="#Release-notes" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.6.0">v0.6.0</a></li>
</ul>
