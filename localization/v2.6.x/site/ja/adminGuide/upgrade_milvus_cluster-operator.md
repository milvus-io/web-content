---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Milvus Operatorを使用してMilvusクラスタをアップグレードする方法について説明します。
title: Milvus OperatorでMilvusクラスタをアップグレードする
---
<div class="tab-wrapper"><a href="/docs/ja/v2.6.x/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/ja/v2.6.x/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Milvus OperatorでMilvusクラスタをアップグレードする<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus Operatorを使用してMilvusクラスタをアップグレードする方法について説明します。</p>
<h2 id="Before-you-start" class="common-anchor-header">始める前に<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.6.0より、従来の別々のコーディネータ(<code translate="no">dataCoord</code>,<code translate="no">queryCoord</code>,<code translate="no">indexCoord</code>)は単一の<code translate="no">mixCoord</code> に統合されました。アップグレードする前に、CRD仕様が個々のコーディネータコンポーネントではなく、<code translate="no">mixCoord</code> を使用していることを確認してください。</p>
<p>個別のコーディネータを使用している場合は、仕様を変更してください：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">mixCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># set to 1 or more</span>
    <span class="hljs-attr">dataCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
    <span class="hljs-attr">queryCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
    <span class="hljs-attr">indexCoord:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-your-Milvus-operator" class="common-anchor-header">Milvusオペレータのアップグレード<button data-href="#Upgrade-your-Milvus-operator" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行して、Milvus Operatorのバージョンをv1.3.0-rc1-hotfixにアップグレードしてください。</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> zilliztech-milvus-<span class="hljs-keyword">operator</span> https:<span class="hljs-comment">//zilliztech.github.io/milvus-operator/</span>
helm repo update zilliztech-milvus-<span class="hljs-keyword">operator</span>
helm -n milvus-<span class="hljs-keyword">operator</span> upgrade milvus-<span class="hljs-keyword">operator</span> zilliztech-milvus-<span class="hljs-keyword">operator</span>/milvus-<span class="hljs-keyword">operator</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusオペレータを最新バージョンにアップグレードした後、以下の選択肢があります：</p>
<ul>
<li>Milvusをv2.2.3からアップグレードするには、<a href="#Conduct-a-rolling-upgrade">ローリングアップグレードを</a>行います。</li>
<li>Milvusをv2.2.3以前のマイナーリリースから2.6.0-rc1にアップグレードするには、<a href="#Upgrade-Milvus-by-changing-its-image">Milvusのイメージバージョンを変更してアップグレードする</a>ことをお勧めします。</li>
<li>Milvusをv2.1.xから2.6.0-rc1にアップグレードするには、実際のアップグレードの前に<a href="#Migrate-the-metadata">メタデータをmilvusに移行</a>する必要があります。</li>
</ul>
<blockquote>
<p><strong>注意</strong>: 一度に1つのマイナーバージョンをアップグレードし、そのマイナーバージョンの最新の安定版リリースを使用することを強く推奨します。例えば、v2.4.xからv2.6.xにアップグレードする場合、まず最新のv2.4.xにアップグレードし、次に最新のv2.5.xにアップグレードし、最後にv2.6.xにアップグレードします。こうすることで、各マイナーバージョンの最新の安定版リリースを使用することになり、既存のデータや設定との互換性が高くなります。</p>
</blockquote>
<h2 id="Conduct-a-rolling-upgrade" class="common-anchor-header">ローリングアップグレードの実施<button data-href="#Conduct-a-rolling-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.2.3以降では、Milvusコーディネータをアクティブスタンバイ モードで動作するように設定し、コーディネータのローリングアップグレード機能を有効にすることで、コーディネータのアップグレード中にMilvusが受信したリクエストに応答できるようになりました。以前のリリースでは、アップグレード中にコーディネータを削除してから作成するため、サービスのダウンタイムが発生する可能性がありました。</p>
<p>Kubernetesが提供するローリングアップデート機能に基づいて、Milvusのオペレータは、デプロイメントの依存関係に従って順序付けられたアップデートを実施します。さらに、Milvusはアップグレード中もコンポーネントの互換性を維持し、サービスのダウンタイムを大幅に削減するメカニズムを実装しています。</p>
<p>ローリングアップグレード機能はデフォルトでは無効になっています。設定ファイルで明示的に有効にする必要があります。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingUpgrade</span> <span class="hljs-comment"># Default value, can be omitted</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
    <span class="hljs-comment"># Milvus Operator recognizes the image tag as a semantic version, and decides what to do based on the version.</span>
    <span class="hljs-comment"># So in case you&#x27;re using a non-sermantic verison image tag, you may also need to set the `version` field so that Milvus Operator can recognize the version correctly</span>
    <span class="hljs-attr">version:</span> <span class="hljs-string">v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の設定ファイルでは、<code translate="no">spec.components.enableRollingUpdate</code> を<code translate="no">true</code> に設定し、<code translate="no">spec.components.image</code> を任意の Milvus バージョンに設定します。</p>
<p>デフォルトでは、Milvusはコーディネーターのローリングアップグレードを順番に実行し、コーディネーターのポッドイメージを次々に置き換えていきます。アップグレード時間を短縮するには、<code translate="no">spec.components.imageUpdateMode</code> を<code translate="no">all</code> に設定し、Milvus がすべてのポッドイメージを同時に置き換えるようにします。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">all</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvusがコーディネータポッドイメージを低いバージョンに置き換えるようにするには、<code translate="no">spec.components.imageUpdateMode</code> を<code translate="no">rollingDowngrade</code> に設定します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">enableRollingUpdate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">imageUpdateMode:</span> <span class="hljs-string">rollingDowngrade</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:&lt;some-old-version&gt;</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、設定をYAMLファイル(例えば、<code translate="no">milvusupgrade.yaml</code>)として保存し、この設定ファイルを以下のようにMilvusインスタンスにパッチします：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">イメージを変更してMilvusをアップグレードする<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>通常の場合、Milvusのイメージを変更することで、Milvusを最新のものにアップデートすることができます。ただし、この方法でMilvusをアップグレードする場合、一定のダウンタイムが発生することに注意してください。</p>
<p>以下のように設定ファイルを作成し、<strong>milvusupgrade.yamlとして</strong>保存します：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">components:</span>
   <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.0-rc1</span>
<button class="copy-code-btn"></button></code></pre>
<p>その後、以下を実行してアップグレードを実行します：</p>
<pre><code translate="no" class="language-shell">kubectl patch -f milvusupgrade.yaml --patch-file milvusupgrade.yaml --type merge 
<button class="copy-code-btn"></button></code></pre>
<h2 id="Migrate-the-metadata" class="common-anchor-header">メタデータの移行<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 2.2.0以降、メタデータは以前のリリースと互換性がありません。以下の例は、Milvus 2.1.4からMilvus 2.6.0-rc1へのアップグレードを想定しています。</p>
<h3 id="1-Create-a-yaml-file-for-metadata-migration" class="common-anchor-header">1.メタデータ移行用ファイル<code translate="no">.yaml</code> の作成</h3><p>メタデータ移行ファイルを作成します。以下はその例です。設定ファイルには、<code translate="no">name</code> 、<code translate="no">sourceVersion</code> 、<code translate="no">targetVersion</code> を指定する必要があります。以下の例では、<code translate="no">name</code> を<code translate="no">my-release-upgrade</code> に、<code translate="no">sourceVersion</code> を<code translate="no">v2.1.4</code> に、<code translate="no">targetVersion</code> を<code translate="no">v2.6.0-rc1</code> に設定しています。これは、Milvusクラスタがv2.1.4からv2.6.0-rc1にアップグレードされることを意味します。</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">MilvusUpgrade</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release-upgrade</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">milvus:</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-string">&quot;v2.1.4&quot;</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-string">&quot;v2.6.0-rc1&quot;</span>
  <span class="hljs-comment"># below are some omit default values:</span>
  <span class="hljs-comment"># targetImage: &quot;milvusdb/milvus:v2.6.0-rc1&quot;</span>
  <span class="hljs-comment"># toolImage: &quot;milvusdb/meta-migration:v2.2.0&quot;</span>
  <span class="hljs-comment"># operation: upgrade</span>
  <span class="hljs-comment"># rollbackIfFailed: true</span>
  <span class="hljs-comment"># backupPVC: &quot;&quot;</span>
  <span class="hljs-comment"># maxRetry: 3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Apply-the-new-configuration" class="common-anchor-header">2.新しい設定の適用</h3><p>以下のコマンドを実行して新しい設定を作成します。</p>
<pre><code translate="no">$ kubectl <span class="hljs-built_in">create</span> -f https://github.com/zilliztech/milvus-operator/blob/main/<span class="hljs-built_in">config</span>/samples/beta/milvusupgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-status-of-metadata-migration" class="common-anchor-header">3.メタデータの移行ステータスの確認</h3><p>以下のコマンドを実行して、メタデータ移行のステータスを確認します。</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">describe</span> milvus <span class="hljs-keyword">release</span><span class="hljs-operator">-</span>name
<button class="copy-code-btn"></button></code></pre>
<p>出力のステータスが<code translate="no">ready</code> の場合は、メタデータの移行が成功したことを意味します。</p>
<p>あるいは、<code translate="no">kubectl get pod</code> を実行してすべてのポッドをチェックすることもできます。すべてのポッドが<code translate="no">ready</code> であれば、メタデータの移行は成功しています。</p>
<h3 id="4-Delete-my-release-upgrade" class="common-anchor-header">4.削除<code translate="no">my-release-upgrade</code></h3><p>アップグレードが成功したら、YAML ファイルの<code translate="no">my-release-upgrade</code> を削除します。</p>
