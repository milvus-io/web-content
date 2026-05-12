---
id: snapshots.md
title: スナップショットCompatible with Milvus 3.0.x
summary: スナップショットを使用して、ロールバック、バージョニング、およびテストのために、ポイント・イン・タイムのコレクション状態をキャプチャします。
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">スナップショット<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>スナップショットはMilvusコレクションのポイントインタイムイメージで、迅速なロールバック、バージョン管理、テストに最適です。特定のタイムスタンプでコレクションの状態をキャプチャし、スキーマ、インデックス、ベクトルデータファイル（binlog）などのメタデータとマニフェストファイルのみを保存し、効率的な保存と復元を実現します。</p>
<div class="alert note">
<p>スナップショットは、データの迅速なポイント・イン・タイム・イメージであり、迅速なロールバックやテスト<strong>（数日から数週間</strong>）に適しています。同時に、バックアップは独立した完全なコピーで、長期的なディザスタリカバリ<strong>（数週間から数年</strong>）のために別々に保存され、完全なストレージ障害から保護します。</p>
<p>バックアップを作成するには、<a href="/docs/ja/milvus_backup_overview.md">Milvus Backupを</a>参照してください。</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">スナップショット構造<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはマニフェストベースのスナップショットアーキテクチャを実装しており、実際のベクターデータを複製することなく、データの効率的なポイントインタイムのキャプチャ、保存、リストアを実現します。このアーキテクチャはメタデータ管理を物理データストレージから分離し、オブジェクトストレージ内の既存のセグメントファイルを参照する軽量のスナップショットを可能にします。</p>
<p>コレクションのスナップショットを作成すると、Milvusは以下を収集します：</p>
<ul>
<li><p><strong>スナップショットのメタデータ</strong></p>
<p>スナップショット名と説明、ターゲットコレクションID、スナップショットが作成される時点など、スナップショットを作成するための基本情報を提供します。</p></li>
<li><p><strong>コレクションの説明</strong></p>
<p>スキーマ定義、パーティション情報、プロパティなど、ターゲット・コレクションの説明が含まれます。</p></li>
<li><p><strong>インデックス情報</strong></p>
<p>インデックスのメタデータとインデックスファイルへのパスが格納されます。</p></li>
<li><p><strong>セグメントデータ</strong></p>
<p>ベクターデータファイル(binlogs)、削除ログ(deltalogs)、インデックスファイルが格納される。</p></li>
</ul>
<p>上記の情報のうち、Milvusは各セグメントのApache Avroマニフェストファイルを生成し、スナップショットのメタデータ、コレクションの説明、インデックス情報、マニフェストファイルへのパスをJSONファイルに格納します。次の図は、スナップショットのフォルダ構造を示しています。</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>スナップショットの作成には通常ミリ秒かかり、リストアにはデータ量に応じて数秒から数分かかります。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">ストレージへの影響と考慮点<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusはスナップショット内のセグメントファイルまたはインデックスファイルを参照すると、スナップショットを削除しない限り、それらのファイルをガベージコレクションすることはありません。スナップショットはターゲットコレクションのサイズに比例してストレージを消費し、オブジェクトストレージのコストはスナップショットの保持に適用されます。極端な場合、スナップショット1つでオブジェクト・ストレージ・コストが2倍になることさえあります。以下のことをお勧めします。</p>
<ul>
<li>ストレージを節約するために、古いスナップショットを定期的に削除する。</li>
<li>将来の参照のために、わかりやすい名前と説明を使用する。</li>
<li>スナップショットの作成と復元結果を常に検証する。</li>
<li>モニタリングとトラブルシューティングのために、スナップショット作成のタイムスタンプ、ストレージ使用量、リストアジョブIDを追跡する。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">制限と制約<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>スナップショットは作成後、不変になります。</li>
<li>スナップショットは、オリジナルと同じクラスタ内の新しいコレクションにのみリストアできます。</li>
<li>リストアされたコレクションは、同じスキーマ、シャード数、パーティション数を保持します。</li>
<li>リストアされた履歴データはTTLポリシーと競合する可能性があります。スナップショットを作成する前に、TTLを無効にするか、TTL設定を調整することをお勧めします。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">その他の情報<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/manage-snapshots.md">スナップショットの管理</a>- スナップショットの作成、リストア、リストア、および削除。</li>
<li><a href="/docs/ja/snapshot-use-cases.md">スナップショットの使用例</a>- 一般的なパターンとワークフロー。</li>
<li><a href="/docs/ja/milvus_backup_overview.md">Milvus Backup</a>- クラスタ間での長期バックアップとリストア。</li>
</ul>
