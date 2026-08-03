---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Helmチャートを使用してMilvusスタンドアロンをアップグレードする方法について学びましょう。
title: Helmチャートを使用したMilvusスタンドアロンのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ja/upgrade_milvus_standalone-docker.md" class=''>Operator</a>、Helm、Docker<a href="/docs/ja/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">Helmチャートを使用したMilvusスタンドアロンのアップグレード<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Helm を使用して Milvus 2.6.x スタンドアロン環境を v3.0.0 にアップグレードする方法について説明します。</p>
<div class="alert note">
<p>この手順は、Milvus 2.6.20 から Milvus v3.0.0 へのアップグレードについて、Milvus Helm Chart 5.0.22 を使用して検証済みです。他の Milvus 2.6.x パッチリリースや Helm Chart バージョンを使用する場合は、まず本番環境以外でアップグレードを検証してください。</p>
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
<li>Helm 3.14.0 以降</li>
<li>Helmによって管理されている既存のMilvus 2.6.xデプロイメント</li>
<li>既存のデプロイメントで使用されている Helm 値</li>
<li>Milvus メタデータおよび永続データの最新のバックアップ</li>
</ul>
<p><strong>メッセージキューの制限事項</strong>：Milvus v3.0.0 へのアップグレード時には、現在のメッセージキューの設定を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更機能は、将来のバージョンで提供される予定です。</p>
<div class="alert warning">
<p>この手順の一環として、Helm Chartを変更またはダウングレードしないでください。Helmリリース用にすでにインストールされているChartバージョンを維持してください。テスト済みのベースラインでは、Helm Chart 5.0.22を維持し、Milvusイメージタグのみを<code translate="no">v3.0.0</code> に変更しました。</p>
<p>この手順では、Milvus イメージを 2.6.x に戻すことによるダウングレードやロールバックの妥当性は検証されていません。 v3.0.0 がデータを書き込んだ後、イメージのみのロールバックでは、更新後の状態を読み取れない場合があります。アップグレードに失敗した場合は、書き込みを停止し、アップグレード前のメタデータと永続データのバックアップを復元するリカバリ計画を実行してください。リカバリ計画は、まず本番環境以外で検証してください。</p>
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
    </button></h2><h3 id="Step-1-Update-the-Helm-repository" class="common-anchor-header">ステップ 1: Helm リポジトリを更新する<button data-href="#Step-1-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus Helm リポジトリを追加または更新します:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note"><code translate="no">https://milvus-io.github.io/milvus-helm/</code> にある Milvus Helm Charts リポジトリはアーカイブされました。チャートバージョン 4.0.31 以降については、新しいリポジトリ<code translate="no">https://zilliztech.github.io/milvus-helm/</code> を使用してください。
</div>
<h3 id="Step-2-Upgrade-Milvus" class="common-anchor-header">ステップ 2: Milvus のアップグレード<button data-href="#Step-2-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Helm リリースにインストールされているチャートのバージョンを確認します:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>「<code translate="no">CHART</code> 」列の値から「<code translate="no">milvus-</code> 」というプレフィックスを削除し、残りのバージョンを「<code translate="no">&lt;current-chart-version&gt;</code> 」として使用します。その後、アップグレードコマンドを実行します:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0.0&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 20m
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">--reset-then-reuse-values</code> オプションは、以前のリリースからの値を保持しつつ、選択されたChartのデフォルト設定に対して明示的なイメージのオーバーライドを適用します。</p>
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
    </button></h2><p>Helmのリビジョン、Podのステータス、およびコンテナイメージを確認します:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>必要なすべてのワークロードが利用可能であること、Milvusが<code translate="no">v3.0.0</code> を使用していること、および既存のコレクションが引き続きクエリおよび検索可能であることを確認してください。v3.0.0固有の機能を有効にする前に、これらの確認を完了してください。</p>
<div class="alert note">
<p>Milvus 3.0 へのアップグレードだけでは、Storage V3 は有効になりません。アップグレードを確認した後、<a href="/docs/ja/storage-v3.md">Storage V3</a>に依存する機能を有効にする前に、<a href="/docs/ja/storage-v3.md">Storage V3</a>について確認してください。Milvus が Storage V3 データを書き込んだ後は、Storage V3 を読み取れない古いバージョンの Milvus へのダウングレードはサポートされません。</p>
</div>
