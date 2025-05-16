---
id: chunk_cache.md
title: チャンク・キャッシュの設定
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">チャンクキャッシュの設定<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>チャンクキャッシュメカニズムは、Milvusが必要とする前に、クエリノードのローカルハードディスク上のキャッシュにデータを事前にロードすることを可能にします。このメカニズムにより、ディスクからメモリへのデータロード時間が短縮され、ベクトル検索のパフォーマンスが大幅に向上します。</p>
<h2 id="Background" class="common-anchor-header">背景<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでは、ベクトル検索のクエリを実行する前に、オブジェクトストレージからクエリノードのローカルハードディスク上のメモリキャッシュにデータをロードする必要があります。これは時間のかかるプロセスです。すべてのデータがロードされる前に、Milvusは一部のベクトル検索リクエストに対して遅延を伴って応答する可能性があります。</p>
<p>クエリのパフォーマンスを向上させるために、Milvusはチャンクキャッシュメカニズムを提供し、オブジェクトストレージから必要な前にローカルハードディスク上のキャッシュにデータをプリロードします。クエリーリクエストを受信すると、Segcoreはまずデータがオブジェクトストレージではなくキャッシュにあるかどうかをチェックする。もしデータがキャッシュにあれば、Segcoreはキャッシュから素早くデータを取り出し、結果をクライアントに返します。</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">チャンクキャッシュの設定<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>このガイドではMilvusインスタンスのチャンクキャッシュメカニズムの設定方法を説明します。構成はMilvusインスタンスのインストール方法によって異なります。</p>
<ul>
<li><p>Helm Chartsを使用してインストールしたMilvusインスタンスの場合</p>
<p><code translate="no">values.yaml</code> ファイルの<code translate="no">config</code> セクションに設定を追加します。詳細は<a href="/docs/ja/v2.4.x/configure-helm.md">Helm Chartsを使用したMilvusの設定を</a>参照してください。</p></li>
<li><p>Docker Composeを使用してインストールしたMilvusインスタンスの場合</p>
<p>Milvusインスタンスの起動に使用した<code translate="no">milvus.yaml</code> ファイルに設定を追加します。詳細は<a href="/docs/ja/v2.4.x/configure-docker.md">Docker Composeを使用したMilvusの設定を</a>参照してください。</p></li>
<li><p>Operatorを使用してインストールしたMilvusインスタンスの場合</p>
<p><code translate="no">Milvus</code> カスタムリソースの<code translate="no">spec.components</code> セクションに設定を追加します。詳細は「<a href="/docs/ja/v2.4.x/configure_operator.md">Operatorを使用したMilvusの設定</a>」を参照してください。</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">構成オプション</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">warmup</code> パラメータは、Milvus が必要になる前にオブジェクトストレージからクエリノードのローカルハードディスク上のキャッシュにデータをプリロードするかどうかを決定します。このパラメータのデフォルトは<code translate="no">disable</code> です。設定可能なオプションは以下のとおりです：</p>
<ul>
<li><code translate="no">async</code>:Milvusはバックグラウンドで非同期にデータをプリロードするため、コレクションのロード時間には影響しません。ただし、ロード処理が完了した後、短時間ベクタを取得する際に遅延が発生する場合があります。  これはデフォルトのオプションです。</li>
<li><code translate="no">sync</code>:Milvusは同期的にデータをプリロードするため、コレクションのロードにかかる時間に影響を与える可能性があります。しかし、ユーザはロード処理完了後、遅延なく直ちにクエリを実行することができます。</li>
<li><code translate="no">disable</code>:Milvusはメモリキャッシュにデータをプリロードしません。</li>
</ul>
<p>チャンクキャッシュの設定は、コレクションに新しいデータが挿入された場合やコレクションインデックスが再構築された場合にも適用されます。</p>
<h3 id="FAQ" class="common-anchor-header">よくある質問</h3><ul>
<li><p><strong>チャンクキャッシュメカニズムが正しく動作しているかどうかはどのように判断できますか?</strong></p>
<p>コレクションをロードした後、検索またはクエリ要求の待ち時間をチェックすることをお勧めします。レイテンシが予想よりかなり高い場合（たとえば数秒）、チャンクキャッシュメカニズムがまだ機能している可能性があります。</p>
<p>クエリの待ち時間が長い場合。オブジェクト・ストレージのスループットをチェックして、チャンク・キャッシュがまだ機能していることを確認できます。通常の場合、チャンク・キャッシュが機能していれば、オブジェクト・ストレージのスループットは高くなります。あるいは、<code translate="no">sync</code> モードでチャンク・キャッシュを試してみることもできます。</p></li>
</ul>
