---
id: troubleshooting.md
summary: Milvusで遭遇する可能性のある一般的な問題とその克服方法について学びましょう。
title: トラブルシューティング
---
<h1 id="Troubleshooting" class="common-anchor-header">トラブルシューティング<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvusを使用する際に発生する可能性のある一般的な問題と、トラブルシューティングのヒントを示します。このページの問題は以下のカテゴリに分類されます：</p>
<ul>
<li><a href="#boot_issues">起動時の問題</a></li>
<li><a href="#runtime_issues">ランタイムの問題</a></li>
<li><a href="#api_issues">APIに関する問題</a></li>
<li><a href="#etcd_crash_issues">etcd のクラッシュに関する問題</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">ブートの問題<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>ブートエラーは通常致命的です。次のコマンドを実行して、エラーの詳細を表示する：</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">ランタイムの問題<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>ランタイム中に発生したエラーにより、サービスが停止することがあります。この問題をトラブルシューティングするには、先に進む前にサーバーとクライアントの互換性を確認してください。</p>
<h2 id="API-issues" class="common-anchor-header">APIの問題<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>これらの問題はMilvusサーバとクライアント間のAPIメソッド呼び出し中に発生します。同期または非同期でクライアントに返されます。</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">etcd クラッシュ問題<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. etcdポッドの保留</h3><p>etcdクラスタはデフォルトでpvcを使用します。StorageClassはKubernetesクラスタ用に事前に設定する必要があります。</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcdポッドのクラッシュ</h3><p>etcd podが<code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code> 、クラッシュした場合、このpodにログインし、<code translate="no">/bitnami/etcd/data/member_id</code> ファイルを削除することができます。</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3.<code translate="no">etcd-0</code> の実行中に複数のポッドがクラッシュし続ける。</h3><p><code translate="no">etcd-0</code> の実行中に複数のポッドがクラッシュし続ける場合は、以下のコードを実行する。</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4.すべてのポッドがクラッシュする</h3><p>すべてのポッドがクラッシュしたら、<code translate="no">/bitnami/etcd/data/member/snap/db</code> ファイルをコピーしてみてください。<code translate="no">https://github.com/etcd-io/bbolt</code> を使ってデータベースデータを変更してください。</p>
<p>Milvusのメタデータはすべて<code translate="no">key</code> バケットに保存されています。このバケット内のデータをバックアップし、以下のコマンドを実行してください。なお、<code translate="no">by-dev/meta/session</code> ファイル内のプレフィックスデータはバックアップの必要はありません。</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>問題解決に助けが必要な場合は、遠慮なくどうぞ：</p>
<ul>
<li><a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slackチャンネルに</a>参加し、milvusチームのサポートを受ける。</li>
<li>GitHub に問題の詳細を含む<a href="https://github.com/milvus-io/milvus/issues/new/choose">Issue を提出する</a>。</li>
</ul>
