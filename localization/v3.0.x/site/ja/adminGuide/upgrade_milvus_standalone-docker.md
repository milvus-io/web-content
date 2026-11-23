---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Docker Compose を使用して Milvus スタンドアロンをアップグレードする方法について学びましょう。
title: Docker Compose を使用した Milvus スタンドアロンのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ja/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>、Helm、Docker<a href="/docs/ja/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Docker Compose を使用した Milvus スタンドアロンのアップグレード<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Docker Compose を使用して Milvus 2.6.x スタンドアロン環境を v3.0.5 にアップグレードする方法について説明します。</p>
<div class="alert note">
<p>この手順は、イメージのみを変更した公式の Milvus 2.6.20 スタンドアロン Docker Compose 構成で検証済みです。ステップ 2 では、その検証対象外であった v3.0.5 の Compose 構成からデータディレクトリの所有権管理サービスを追加します。</p>
</div>
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
<li>Docker Engine および Docker Compose V2</li>
<li>Docker Compose によって管理されている既存の Milvus 2.6.x スタンドアロン環境</li>
<li>既存のデプロイメントで使用されている Docker Compose ファイルおよび設定</li>
<li>Milvusのメタデータおよび永続データの最新のバックアップ</li>
</ul>
<p><strong>メッセージキューの制限事項</strong>：Milvus v3.0.5 へのアップグレード時には、現在のメッセージキューの選択を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更に対するサポートは、将来のバージョンで提供される予定です。</p>
<div class="alert warning">
<p>この手順の一環として、現在の Compose ファイルを置き換えたり、依存関係のバージョンを変更したりしないでください。既存の etcd、オブジェクトストレージ、メッセージキュー、ボリューム、および設定はそのまま維持してください。Milvus イメージのタグを更新し、手順 2 で説明されているデータディレクトリの所有権設定サービスを追加してください。</p>
<p>Compose ファイルで `<code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> ` を使用しており、Docker がこのイメージをプルできない場合は、v3.0.5 の Compose 構成で使用されている `<code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>` に変更してください。リリースタグはそのまま維持してください。</p>
<p>この手順では、Milvus イメージを 2.6.x に戻すことによるダウングレードやロールバックの妥当性は検証されません。 v3.0.5 によるデータ書き込み後、イメージのみのロールバックでは、更新された状態を読み取れない場合があります。アップグレードに失敗した場合は、書き込みを停止し、アップグレード前のメタデータおよび永続データのバックアップを復元する復旧計画を実行してください。復旧計画は、まず本番環境以外で検証してください。</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">アップグレード手順<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">ステップ 1: 現在の構成をバックアップする<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>現在の Compose ファイルおよびマウントされている Milvus 設定ファイルのコピーを保存します:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>アップグレードを開始する前に、現在のコンテナが正常に動作していることを確認してください：</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">ステップ 2: Milvus イメージの更新<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>既存の Compose ファイル内で、<code translate="no">standalone</code> サービスのイメージを更新し、<code translate="no">depends_on</code> のエントリを以下の内容に置き換え、<code translate="no">milvus-volume-init</code> サービスを追加します。両サービスで同じイメージを使用し、<code translate="no">standalone</code> サービスが<code translate="no">/var/lib/milvus</code> でマウントしているのと同じホストディレクトリをマウントしてください。<code translate="no">standalone</code> サービスのその他の設定はそのまま維持してください:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus v3.0.5のイメージでは、Milvusは非rootユーザー<code translate="no">milvus</code> として実行されますが、Milvus 2.6.xのイメージではユーザーが設定されておらず、Milvusは<code translate="no">root</code> として実行されます。<code translate="no">milvus-volume-init</code> サービスは、v3.0.5のCompose構成に基づいています。 このサービスは、Milvusの起動前に一度だけ<code translate="no">root</code> として実行され、<code translate="no">/var/lib/milvus</code> とその内容の所有者を<code translate="no">milvus</code> ユーザーおよびグループに変更します。これにより、Milvusは2.6.xのデプロイで作成されたファイルに書き込みを行うことができます。その後、<code translate="no">/var/lib/milvus</code> に<code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> というマーカーファイルを書き込み、このマーカーファイルが存在する間は、以降の実行時に変更を加えることはありません。 後で、別のユーザーが所有するファイルをデータディレクトリに復元した場合は、サービスが再び実行されるように、このマーカーファイルを削除してください。</p>
<p>ターゲットイメージをプルし、Milvus コンテナを再作成します。<code translate="no">standalone</code> サービスは<code translate="no">milvus-volume-init</code> に依存しているため、Docker Compose は新しい Milvus コンテナを起動する前に、<code translate="no">milvus-volume-init</code> を実行して完了させます。</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose は、既存の etcd および object-storage コンテナを稼働させたままにし、設定済みのデータディレクトリを再利用します。依存関係（たとえば MinIO イメージ）の設定を変更した場合、Compose はそのコンテナを再作成し、マウントされたボリュームを維持します。</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">アップグレードの確認<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus コンテナのステータスと、そのコンテナで使用されているイメージを確認します:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">standalone</code> サービスが正常に動作していること、そのイメージが<code translate="no">milvusdb/milvus:v3.0.5</code> であること、および既存のコレクションに対して引き続きクエリや検索が可能であることを確認してください。v3.0.5 固有の機能を有効にする前に、これらの確認を完了させてください。</p>
<div class="alert note">
<p>Milvus 3.0 へのアップグレードだけでは、Storage V3 は有効になりません。アップグレードを確認した後、<a href="/docs/ja/storage-v3.md">Storage V3</a>に依存する機能を有効にする前に、<a href="/docs/ja/storage-v3.md">Storage V3</a>について確認してください。Milvus が Storage V3 データを書き込んだ後は、Storage V3 を読み取れない古いバージョンの Milvus へのダウングレードはサポートされません。</p>
</div>
