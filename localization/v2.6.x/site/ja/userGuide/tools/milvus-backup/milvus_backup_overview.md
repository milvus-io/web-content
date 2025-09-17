---
id: milvus_backup_overview.md
summary: Milvus-BackupはMilvusデータのバックアップとリストアを可能にするツールです。
title: Milvusバックアップ
---
<h1 id="Milvus-Backup" class="common-anchor-header">Milvusバックアップ<button data-href="#Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus BackupはMilvusデータのバックアップとリストアを可能にするツールです。CLIとAPIの両方を提供し、様々なアプリケーションシナリオに対応します。</p>
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
    </button></h2><p>Milvus Backupを使用する前に、以下を確認してください。</p>
<ul>
<li>オペレーティングシステムがCentOS 7.5+またはUbuntu LTS 18.04+であること、</li>
<li>Goのバージョンが1.20.2以降であること。</li>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_backup_architecture.png" alt="Milvus Backup architecture" class="doc-image" id="milvus-backup-architecture" />
   </span> <span class="img-wrapper"> <span>Milvus Backupのアーキテクチャ</span> </span></p>
<p>Milvus BackupはMilvusインスタンス間のメタデータ、セグメント、データのバックアップとリストアを容易にします。バックアップおよびリストアプロセスを柔軟に操作するために、CLI、API、gRPCベースのGoモジュールなどのノースバウンドインターフェースを提供します。</p>
<p>Milvus Backupはバックアップを作成するために、ソースのMilvusインスタンスからコレクションのメタデータとセグメントを読み込みます。そして、ソースMilvusインスタンスのルートパスからコレクションデータをコピーし、コピーしたデータをバックアップのルートパスに保存します。</p>
<p>バックアップからリストアするために、Milvusバックアップはバックアップのコレクションメタデータとセグメント情報に基づいてターゲットMilvusインスタンスに新しいコレクションを作成します。そしてバックアップデータをバックアップルートパスからターゲットインスタンスのルートパスにコピーします。</p>
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
    </button></h2><p>Milvus Backup v0.5.7以降のMilvusバージョン間のバックアップ・リストアの互換性を以下の表に示します。</p>
<table>
<thead>
<tr><th>バックアップ ↓ / リストア → （英語</th><th>Milvus v2.2.x</th><th>Milvus v2.3.x</th><th>Milvus v2.4.x</th><th>Milvus v2.5.x</th></tr>
</thead>
<tbody>
<tr><td>Milvus v2.2.x</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>いいえ</td></tr>
<tr><td>Milvus v2.3.x</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.4.x</td><td>いいえ</td><td>いいえ</td><td>はい</td><td>はい</td></tr>
<tr><td>Milvus v2.5.x</td><td>いいえ</td><td>いいえ</td><td>いいえ</td><td>はい</td></tr>
</tbody>
</table>
<h2 id="Latest-release" class="common-anchor-header">最新リリース<button data-href="#Latest-release" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.7">v0.5.7</a></li>
</ul>
