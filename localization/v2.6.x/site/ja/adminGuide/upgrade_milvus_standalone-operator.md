---
id: upgrade_milvus_standalone-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Milvus Operator を使用して Milvus スタンドアロンをアップグレードする方法について学びましょう。
title: Milvus Operator を使用した Milvus スタンドアロンのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/v2.6.x/upgrade_milvus_standalone-operator.md" class='active '>Milvus</a><a href="/docs/ja/v2.6.x/upgrade_milvus_standalone-docker.md" class=''>Operator</a>、Helm、Docker<a href="/docs/ja/v2.6.x/upgrade_milvus_standalone-docker.md" class=''>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Milvus-Operator" class="common-anchor-header">Milvus Operator を使用した Milvus スタンドアロンのアップグレード<button data-href="#Upgrade-Milvus-Standalone-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus Operator を使用して、Milvus スタンドアロン環境を v2.5.x から v2.6.19 にアップグレードする方法について説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">開始する前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Whats-new-in-v2619" class="common-anchor-header">v2.6.19の新機能<button data-href="#Whats-new-in-v2619" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 2.5.x から 2.6.19 へのアップグレードには、以下の重要なアーキテクチャの変更が含まれます：</p>
<ul>
<li><strong>コーディネーターの統合</strong>：従来別々に存在していたコーディネーター（<code translate="no">dataCoord</code> 、<code translate="no">queryCoord</code> 、<code translate="no">indexCoord</code> ）が、単一の<code translate="no">mixCoord</code></li>
<li><strong>新コンポーネント</strong>：データ処理機能を強化するためのストリーミングノードの導入</li>
<li><strong>コンポーネントの削除</strong>：<code translate="no">indexNode</code> が削除され、統合されました</li>
</ul>
<p>このアップグレードプロセスにより、新しいアーキテクチャへの適切な移行が保証されます。アーキテクチャの変更に関する詳細については、『<a href="/docs/ja/v2.6.x/architecture_overview.md">Milvus アーキテクチャ概要</a>』を参照してください。</p>
<h3 id="Requirements" class="common-anchor-header">要件<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>システム要件：</strong></p>
<ul>
<li>Milvus Operator を通じて Milvus スタンドアロンがデプロイされた Kubernetes クラスター</li>
<li><code translate="no">kubectl</code> クラスターにアクセスできるよう設定済み</li>
<li>Helm 3.x がインストールされていること</li>
</ul>
<p><strong>互換性に関する要件：</strong></p>
<ul>
<li>Milvus v2.6.0-rc1 は v2.6.19<strong>と互換性がありません</strong>。リリース候補版からの直接アップグレードはサポートされていません。</li>
<li>現在 v2.6.0-rc1 を実行しており、データを保持する必要がある場合は、移行の支援について<a href="https://github.com/milvus-io/milvus/issues/43538#issuecomment-3112808997">こちらのコミュニティガイド</a>を参照してください。</li>
<li>v2.6.19 にアップグレードする前に、v2.5.16 以降にアップグレード<strong>する必要があります</strong>。</li>
</ul>
<p><strong>メッセージキューの制限事項</strong>:Milvus v2.6.19 へアップグレードする際は、現在のメッセージキューの設定を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更機能は、将来のバージョンで提供される予定です。</p>
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
    </button></h2><h3 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">ステップ 1: Milvus Operator のアップグレード<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h3><p>まず、Milvus Operator を v1.3.7 にアップグレードします：</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update zilliztech-milvus-operator
helm -n milvus-operator upgrade milvus-operator zilliztech-milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Operatorのアップグレードを確認します：</p>
<pre><code translate="no" class="language-bash">kubectl -n milvus-operator get pods
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Upgrade-your-Milvus-standalone" class="common-anchor-header">ステップ 2: Milvus スタンドアロンのアップグレード<button data-href="#Step-2-Upgrade-your-Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="21-Upgrade-to-v2516" class="common-anchor-header">2.1 v2.5.16 へのアップグレード</h4><div class="alert-note">
<p>スタンドアロン環境がすでに v2.5.16 以降を実行している場合は、この手順をスキップしてください。</p>
</div>
<p>v2.5.16 にアップグレードするための設定ファイル `<code translate="no">milvusupgrade.yaml</code> ` を作成します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.16</span>
<button class="copy-code-btn"></button></code></pre>
<p>設定を適用します:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
<p>完了するまで待ちます:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Verify all pods are ready</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<h4 id="22-Upgrade-to-v2619" class="common-anchor-header">2.2 v2.6.19 へのアップグレード</h4><p>v2.5.16が正常に動作したら、v2.6.19にアップグレードします:</p>
<p>設定ファイル（この例では<code translate="no">milvusupgrade.yaml</code> ）を更新します:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>  <span class="hljs-comment"># Replace with your actual release name</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.19</span>
<button class="copy-code-btn"></button></code></pre>
<p>最終的なアップグレードを適用します:</p>
<pre><code translate="no" class="language-bash">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --<span class="hljs-built_in">type</span> merge
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>スタンドアロン環境が新しいバージョンで実行されていることを確認してください:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Check pod status</span>
kubectl get pods
<button class="copy-code-btn"></button></code></pre>
<p>さらにサポートが必要な場合は、<a href="https://milvus.io/docs">Milvusのドキュメント</a>または<a href="https://github.com/milvus-io/milvus/discussions">コミュニティフォーラム</a>をご参照ください。</p>
