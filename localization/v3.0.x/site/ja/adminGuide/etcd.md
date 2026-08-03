---
id: etcd.md
title: etcd
---
<h1 id="etcd-Metadata" class="common-anchor-header">etcd（メタデータ）<button data-href="#etcd-Metadata" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusは、コレクションスキーマ、ノードの状態、メッセージ消費のチェックポイントなどのメタデータを保存<strong>するためにetcd</strong>を使用しています。</p>
<h2 id="Version" class="common-anchor-header">バージョン<button data-href="#Version" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus<strong>はetcd 3.5.x</strong>に対して検証済みです。Helmを使用してMilvusをインストールする場合、バンドルされるetcdイメージはデフォルトで<code translate="no">milvusdb/etcd:3.5.25-r1</code> となります。</p>
<h2 id="Change-the-etcd-image-with-Helm" class="common-anchor-header">Helm を使用して etcd イメージを変更する<button data-href="#Change-the-etcd-image-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>etcd イメージのバージョンを固定または置き換えるには、Helm を使用してインストールまたはアップグレードする際に、<code translate="no">etcd.image.tag</code> （および必要に応じて<code translate="no">etcd.image.repository</code> ）を上書きしてください:</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> etcd.image.repository=milvusdb/etcd \
  --<span class="hljs-built_in">set</span> etcd.image.tag=3.5.25-r1
<button class="copy-code-btn"></button></code></pre>
<p>外部の etcd を使用する場合、または Docker Compose / Helm / Milvus Operator の詳細な設定については、<a href="/docs/ja/deploy_etcd.md">「Docker Compose または Helm を使用したメタストレージの設定</a>」および「<a href="/docs/ja/meta_storage_operator.md">Milvus Operator を使用したメタストレージの設定</a>」を参照してください。</p>
