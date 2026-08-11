---
id: snapshots.md
title: スナップショットCompatible with Milvus 3.0.x
summary: スナップショットを使用して、ロールバック、バージョン管理、およびテストのために、特定の時点におけるコレクションの状態をキャプチャします。
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
    </button></h1><p>スナップショットとは、Milvusコレクションの特定の時点におけるイメージであり、迅速なロールバック、バージョン管理、およびテストに最適です。特定のタイムスタンプ時点でのコレクションの状態をキャプチャし、効率的な保存と復元のために、スキーマ、インデックス、ベクトルデータファイル（binlog）などのメタデータとマニフェストファイルのみを保存します。</p>
<p>スナップショットは、データの特定の時点の状態を素早く取得したもので、迅速なロールバックやテスト（<strong>数日から数週間</strong>）に適しています。一方、バックアップは独立した完全なコピーであり、長期的な災害復旧（<strong>数週間から数年</strong>）や、ストレージ全体の障害に対するより強力な保護を目的として、別途保存されます。</p>
<p>バックアップの作成方法については、「<a href="/docs/ja/milvus_backup_overview.md">Milvus Backup</a>」を参照してください。</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">スナップショットの構造<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus は、実際のベクトルデータを複製することなく、データの特定の時点での取得、保存、復元を効率的に行うために、マニフェストベースのスナップショットアーキテクチャを実装しています。このアーキテクチャでは、メタデータ管理と物理的なデータ保存が分離されており、オブジェクトストレージ内の既存のセグメントファイルを参照する軽量なスナップショットを実現しています。</p>
<p>コレクションのスナップショットを作成すると、Milvus は以下の情報を収集します：</p>
<ul>
<li><p><strong>スナップショットのメタデータ</strong></p>
<p>スナップショット名や説明、対象コレクション ID、スナップショット作成時点など、スナップショット作成に必要な基本情報を提供します。</p></li>
<li><p><strong>コレクションの説明</strong></p>
<p>対象コレクションの説明が含まれており、スキーマ定義、パーティション情報、プロパティなどが含まれます。</p></li>
<li><p><strong>インデックス情報</strong></p>
<p>インデックスのメタデータと、インデックスファイルへのパスが格納されます。</p></li>
<li><p><strong>セグメントデータ</strong></p>
<p>ベクトルデータファイル（binlog）、削除ログ（deltalog）、およびインデックスファイルを格納します。</p></li>
</ul>
<p>上記の情報のうち、Milvus は各セグメントごとに Apache Avro マニフェストファイルを生成し、スナップショットのメタデータ、コレクションの説明、インデックス情報、およびマニフェストファイルへのパスを JSON ファイルに保存します。次の図は、スナップショットのフォルダ構造を示しています。</p>
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
<p>スナップショットの作成には通常数ミリ秒しかかかりませんが、復元にはデータ量に応じて数秒から数分かかります。</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">ストレージへの影響と考慮事項<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus がスナップショット内のセグメントまたはインデックスファイルを参照すると、スナップショットを削除しない限り、それらのファイルはガベージコレクションの対象にはなりません。スナップショットは、対象コレクションのサイズに比例してストレージを消費し、スナップショットの保持期間中はオブジェクトストレージのコストが発生します。極端な場合、1 つのスナップショットだけでオブジェクトストレージのコストが 2 倍になることもあります。以下のことをお勧めします。</p>
<ul>
<li>ストレージを節約するために、古いスナップショットを定期的に削除することをお勧めします。</li>
<li>将来参照できるよう、わかりやすい名前と説明を使用してください。</li>
<li>スナップショットの作成および復元結果は、必ず確認してください。</li>
<li>監視やトラブルシューティングのために、スナップショットの作成タイムスタンプとストレージ使用量を追跡してください。</li>
<li>監視およびトラブルシューティングのために、復元ジョブの ID を保存してください。</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">制限事項<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>スナップショットは、作成後は変更できなくなります。</li>
<li>スナップショットは、元のコレクションと同じクラスタ内の新しいコレクションにのみ復元できます。</li>
<li>復元されたコレクションは、元のコレクションと同じスキーマ、シャード数、およびパーティション数を保持します。</li>
<li>復元された履歴データは、TTL ポリシーと競合する可能性があります。スナップショットを作成する前に、TTL を無効にするか、TTL 設定を調整することをお勧めします。</li>
<li>スナップショットを<code translate="no">milvus-table</code> の外部ソースとして使用するには、そのスナップショットが通常のStorageV3 Milvusコレクションに由来するものである必要があります。外部コレクションのスナップショットは、<code translate="no">milvus-table</code> のソースとしてサポートされていません。</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">関連情報<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/manage-snapshots.md">スナップショットの管理</a>— スナップショットの作成、一覧表示、説明、固定、復元、削除。</li>
<li><a href="/docs/ja/snapshot-use-cases.md">スナップショットのユースケース</a>— 一般的なパターンとワークフロー。</li>
<li><a href="/docs/ja/milvus_backup_overview.md">Milvus バックアップ</a>— クラスタ間の長期バックアップおよび復元。</li>
</ul>
