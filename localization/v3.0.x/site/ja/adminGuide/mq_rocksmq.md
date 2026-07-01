---
id: mq_rocksmq.md
title: RocksMQ
---
<h1 id="Use-RocksMQ-as-the-Milvus-Message-Queue" class="common-anchor-header">MilvusのメッセージキューとしてRocksMQを使用する<button data-href="#Use-RocksMQ-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>RocksMQは、Milvusにバンドルされている組み込みメッセージキュー（WAL）であり、<strong>Milvus Standaloneでのみ</strong>利用可能です。以前のMilvusバージョンでは、これがデフォルトのスタンドアロン用メッセージキューでしたが、Milvus 3.xでは、Milvus Standaloneはデフォルトで組み込み<a href="/docs/ja/woodpecker.md">のWoodpecker</a>を使用します。</p>
<h2 id="Version-compatibility" class="common-anchor-header">バージョンの互換性<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li><strong>スタンドアロンのみ</strong>— Milvus Distributed（クラスタ）ではRocksMQはサポート<strong>されていません</strong>。<a href="/docs/ja/mqtype-overview.md#Supported-message-queues">メッセージキューのサポートマトリックス</a>を参照してください。</li>
<li>RocksMQはMilvusに同梱されているため、別途インストールする必要はありません。</li>
<li>以前のMilvusバージョンでは、これがスタンドアロンのデフォルトメッセージキューでしたが、Milvus 3.xでは組み込み型のWoodpeckerに置き換えられました。</li>
</ul>
<h2 id="Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="common-anchor-header">Docker を使用して RocksMQ と共に Milvus Standalone をデプロイする<button data-href="#Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install" class="common-anchor-header">インストール<button data-href="#Install" class="anchor-icon" translate="no">
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
    </button></h3><p>「<a href="/docs/ja/install_standalone-docker.md">DockerでMilvusを実行する</a>」の手順に従ってください。Milvus 3.xではスタンドアロンのデフォルトはWoodpeckerであるため、メッセージキューのタイプを明示的にRocksMQに切り替えてください。ブートストラップスクリプトは、<strong>最初の</strong> <code translate="no">start</code> 時に新しい<code translate="no">user.yaml</code> を作成するため、その初回<strong>起動後に</strong>タイプを設定し、<code translate="no">restart</code> を実行して適用してください（<code translate="no">restart</code> を実行すると<code translate="no">user.yaml</code> が保持されます）：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-rocksmq &amp;&amp; <span class="hljs-built_in">cd</span> milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># 1. First start — boots the container and writes a default user.yaml</span>
bash standalone_embed.sh start

<span class="hljs-comment"># 2. Set the message queue to RocksMQ</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: rocksmq
EOF

<span class="hljs-comment"># 3. Restart to apply the change</span>
bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
この方法で<code translate="no">mq.type</code> を切り替えるのは、<b>まったく新しい</b>インスタンス（まだコレクションが存在しない状態）を対象としています。すでにデータを保持しているインスタンスのメッセージキューを変更する場合は、代わりにswitch手順に従ってください。
</div>
<h3 id="Configure" class="common-anchor-header">設定<button data-href="#Configure" class="anchor-icon" translate="no">
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
    </button></h3><p>RocksMQ を調整するには、<code translate="no">user.yaml</code> に<code translate="no">rocksmq</code> セクションを追加し、サービスを再起動してください：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<span class="hljs-attr">rocksmq:</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">/var/lib/milvus/rdb_data</span>   <span class="hljs-comment"># where messages are stored</span>
  <span class="hljs-attr">lrucacheratio:</span> <span class="hljs-number">0.06</span>              <span class="hljs-comment"># rocksdb cache memory ratio</span>
  <span class="hljs-attr">rocksmqPageSize:</span> <span class="hljs-number">67108864</span>        <span class="hljs-comment"># 64 MB, size of each message page</span>
  <span class="hljs-attr">retentionTimeInMinutes:</span> <span class="hljs-number">4320</span>     <span class="hljs-comment"># 3 days</span>
  <span class="hljs-attr">retentionSizeInMB:</span> <span class="hljs-number">8192</span>          <span class="hljs-comment"># 8 GB</span>
  <span class="hljs-attr">compactionInterval:</span> <span class="hljs-number">86400</span>        <span class="hljs-comment"># 1 day, trigger rocksdb compaction</span>
  <span class="hljs-attr">compressionTypes:</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">アンインストール<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">bash standalone_embed.sh stop
bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">注意事項<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>2.5.x から 2.6.x へのアップグレード:</strong> <strong>メッセージキューの制限事項</strong>: Milvus v3.0-beta へアップグレードする際は、現在のメッセージキューの選択を維持する必要があります。アップグレード中に異なるメッセージキューシステム間で切り替えることはサポートされていません。メッセージキューシステムの変更機能は、将来のバージョンで提供される予定です。
2.6.x ではスタンドアロンのデフォルトが Woodpecker に変更されるため、RocksMQ を継続して使用したい場合は、<strong>アップグレード前に</strong> <code translate="no">user.yaml</code> 内で<code translate="no">mq.type: rocksmq</code> を固定してください。</li>
<li>実行中のインスタンスのメッセージキューを変更するには、「RocksMQ から Woodpecker への切り替え」を参照してください。</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">今後の予定<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/woodpecker.md">Woodpecker（デフォルトのメッセージキュー）</a></li>
</ul>
