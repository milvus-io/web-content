---
id: upgrade_milvus_standalone-helm.md
label: Helm
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: MilvusスタンドアロンをHelm Chartでアップグレードする方法をご紹介します。
title: MilvusスタンドアロンとHelmチャートのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-helm.md" class='active '>OperatorHelmDocker</a><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-docker.md" class=''>コンポーザー</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Helm-Chart" class="common-anchor-header">MilvusスタンドアロンとHelmチャートのアップグレード<button data-href="#Upgrade-Milvus-Standalone-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus Helmチャートを使用してMilvusスタンドアロンをアップグレードする方法について説明します。</p>
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
<li>Helmバージョン &gt;= 3.14.0</li>
<li>Kubernetes バージョン &gt;= 1.20.0</li>
</ul>
<div class="alert note">
<p>Milvus-Helmチャートバージョン4.2.21以降、依存関係としてpulsar-v3.xチャートを導入しました。後方互換性のため、helmをv3.14またはそれ以降のバージョンにアップグレードし、<code translate="no">helm upgrade</code> を使用する際は必ず<code translate="no">--reset-then-reuse-values</code> オプションを追加してください。</p>
</div>
<h2 id="Check-the-Milvus-version" class="common-anchor-header">Milvusバージョンの確認<button data-href="#Check-the-Milvus-version" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行して、Milvusの新しいバージョンを確認してください。</p>
<pre><code translate="no">$ helm repo update
$ helm search repo zilliztech/milvus --versions
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus Helm Chartsのレポ（<code translate="no">https://milvus-io.github.io/milvus-helm/</code> ）はアーカイブされ、<code translate="no">https://zilliztech.github.io/milvus-helm/</code> ：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update zilliztech
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
<button class="copy-code-btn"></button></code></pre>
<p>アーカイブされたレポは4.0.31までのチャートで利用可能です。それ以降のリリースについては、代わりに新しいレポを使用してください。</p>
</div>
<pre><code translate="no">NAME                    CHART VERSION   APP VERSION             DESCRIPTION                                       
zilliztech/milvus       4.1.34          2.4.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.33          2.4.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.32          2.4.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.31          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.30          2.4.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.29          2.4.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.24          2.3.11                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.23          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.22          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.21          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.20          2.3.10                  Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.18          2.3.10                  Milvus is an open-source vector database built ... 
zilliztech/milvus       4.1.18          2.3.9                   Milvus is an open-source vector database built ...                                       
zilliztech/milvus       4.1.17          2.3.8                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.16          2.3.7                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.15          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.14          2.3.6                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.13          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.12          2.3.5                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.11          2.3.4                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.10          2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.9           2.3.3                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.8           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.7           2.3.2                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.6           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.5           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.4           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.3           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.2           2.3.1                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.1           2.3.0                   Milvus is an open-source vector database built ...
zilliztech/milvus       4.1.0           2.3.0                   Milvus is an open-source vector database built ...
<button class="copy-code-btn"></button></code></pre>
<p>Milvusのアップグレードパスは以下のように選択できます：</p>
<div style="display: none;">- Milvus v2.2.3以降からv2.4.23への[ローリングアップグレード](#conduct-a-rolling-upgrade)。</div>
<ul>
<li><p><a href="#Upgrade-Milvus-using-Helm">Helmを使用して</a>、v2.2.3以前のマイナーリリースからv2.4.23へ<a href="#Upgrade-Milvus-using-Helm">Milvusをアップグレードする</a>。</p></li>
<li><p>Milvus v2.1.xからv2.4.23へのアップグレード前に<a href="#Migrate-the-metadata">メタデータを移行する</a>。</p></li>
</ul>
<div style="display:none;">
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
    </button></h2><p>Milvus 2.2.3以降では、Milvusコーディネータをアクティブスタンバイ モードで動作するように設定し、コーディネータのローリングアップグレード機能を有効にすることで、コーディネータのアップグレード中にMilvusが受信したリクエストに応答できるようになります。以前のリリースでは、アップグレード中にコーディネータを削除してから作成するため、サービスのダウンタイムが発生する可能性がありました。</p>
<p>ローリングアップグレードでは、コーディネータをアクティブスタンバイで動作させる必要があります。弊社が提供する<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/deployments/upgrade/rollingUpdate.sh">スクリプトを</a>使用して、コーディネーターをアクティブスタンバイ モードで動作するように設定し、ローリングアップグレードを開始できます。</p>
<p>Kubernetesが提供するローリングアップデートの機能に基づいて、上記のスクリプトは、デプロイメントの依存関係に従って順序付けられたアップデートを強制します。さらに、Milvusはアップグレード中もそのコンポーネントに依存しているコンポーネントとの互換性を維持するメカニズムを実装し、潜在的なサービスのダウンタイムを大幅に削減します。</p>
<p>このスクリプトは、HelmとともにインストールされたMilvusのアップグレードにのみ適用されます。次の表は、スクリプトで使用可能なコマンドフラグの一覧です。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>デフォルト値</th><th>必須</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvusインスタンス名</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvusがインストールされている名前空間</td><td><code translate="no">default</code></td><td>偽</td></tr>
<tr><td><code translate="no">t</code></td><td>対象のMilvusバージョン</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">w</code></td><td>新しいMilvusイメージタグ</td><td><code translate="no">milvusdb/milvus:v2.2.3</code></td><td>真</td></tr>
<tr><td><code translate="no">o</code></td><td>操作方法</td><td><code translate="no">update</code></td><td>偽</td></tr>
</tbody>
</table>
<p>Milvusインスタンスのすべてのデプロイメントが正常な状態であることを確認したら、以下のコマンドを実行してMilvusインスタンスを2.4.23にアップグレードします。以下のコマンドを実行することで、Milvusインスタンスを2.4.23にアップグレードすることができます。</p>
<pre><code translate="no" class="language-shell">sh rollingUpdate.<span class="hljs-property">sh</span> -n <span class="hljs-keyword">default</span> -i my-release -o update -t <span class="hljs-number">2.4</span><span class="hljs-number">.23</span> -w <span class="hljs-string">&#x27;milvusdb/milvus:v2.4.23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ol>
<li>このスクリプトは<strong>RocksMQと共に</strong>インストールされたMilvusインスタンスには<strong>適用されません</strong>。</li>
<li>スクリプトはデプロイのアップグレード順序をハードコードしており、変更することはできません。</li>
<li>このスクリプトでは、<code translate="no">kubectl patch</code> を使用してデプロイメントを更新し、<code translate="no">kubectl rollout status</code> を使用してデプロイメントの状態を監視します。</li>
<li>スクリプトは<code translate="no">kubectl patch</code> を使用して、デプロイメントの<code translate="no">app.kubernetes.io/version</code> ラベルを、コマンドの<code translate="no">-t</code> フラグの後に指定されたラベルに更新します。</li>
</ol>
</div>
</div>
<h2 id="Upgrade-Milvus-using-Helm" class="common-anchor-header">Helmを使用したMilvusのアップグレード<button data-href="#Upgrade-Milvus-using-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusをv2.2.3以前のマイナーリリースから最新のものにアップグレードするには、以下のコマンドを実行します：</p>
<pre><code translate="no" class="language-shell">helm repo update
helm upgrade my-release milvus/milvus --reset-then-reuse-values --version=<span class="hljs-number">4.1</span><span class="hljs-number">.24</span> <span class="hljs-comment"># use the helm chart version here</span>
<button class="copy-code-btn"></button></code></pre>
<p>直前のコマンドでHelm chartのバージョンを使用してください。Helmチャートバージョンの取得方法については、「<a href="#Check-the-Milvus-version">Milvusバージョンの確認</a>」をご参照ください。</p>
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
    </button></h2><p>Milvus 2.2.0からメタデータに互換性がなくなりました。以下の例はMilvus 2.1.4からMilvus 2.2.0へのアップグレードを想定しています。</p>
<h3 id="1-Check-the-Milvus-version" class="common-anchor-header">1.Milvusバージョンの確認</h3><p><code translate="no">$ helm list</code> を実行し、Milvusアプリのバージョンを確認します。<code translate="no">APP VERSION</code> 、2.1.4であることがわかります。</p>
<pre><code translate="no"><span class="hljs-variable constant_">NAME</span>                <span class="hljs-variable constant_">NAMESPACE</span>   <span class="hljs-variable constant_">REVISION</span>    <span class="hljs-variable constant_">UPDATED</span>                                 <span class="hljs-variable constant_">STATUS</span>      <span class="hljs-variable constant_">CHART</span>           <span class="hljs-variable constant_">APP</span> <span class="hljs-variable constant_">VERSION</span>     
my-release          <span class="hljs-keyword">default</span>     <span class="hljs-number">1</span>           <span class="hljs-number">2022</span>-<span class="hljs-number">11</span>-<span class="hljs-number">21</span> <span class="hljs-number">15</span>:<span class="hljs-number">41</span>:<span class="hljs-number">25.51539</span> +<span class="hljs-number">0800</span> <span class="hljs-variable constant_">CST</span>     deployed    milvus-<span class="hljs-number">3.2</span><span class="hljs-number">.18</span>   <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Check-the-running-pods" class="common-anchor-header">2.起動しているPodの確認</h3><p><code translate="no">$ kubectl get pods</code> を実行して実行中のポッドを確認する。以下のように出力されます。</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          84s
my-release-milvus-standalone-75c599fffc-6rwlj   1/1     Running   0          84s
my-release-minio-744dd9586f-qngzv               1/1     Running   0          84s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Check-the-image-tag" class="common-anchor-header">3.イメージタグの確認</h3><p>ポッド<code translate="no">my-release-milvus-proxy-6c548f787f-scspp</code> のイメージタグを確認します。Milvusクラスタのリリースがv2.1.4であることがわかります。</p>
<pre><code translate="no" class="language-shell">$ kubectl <span class="hljs-keyword">get</span> pods my-release-milvus-proxy<span class="hljs-number">-6</span>c548f787f-scspp -o=jsonpath=<span class="hljs-string">&#x27;{$.spec.containers[0].image}&#x27;</span>
<span class="hljs-meta"># milvusdb/milvus:v2.1.4</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-Migrate-the-metadata" class="common-anchor-header">4.メタデータの移行</h3><p>Milvus2.2での大きな変更点はセグメントインデックスのメタデータ構造です。そのため、Milvusをv2.1.xからv2.2.0にアップグレードする際には、Helmを使用してメタデータを移行する必要があります。以下は、メタデータを安全に移行するための<a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">スクリプトです</a>。</p>
<p>このスクリプトはK8sクラスタにインストールされたMilvusにのみ適用されます。処理中にエラーが発生した場合は、まずロールバック操作で以前のバージョンにロールバックしてください。</p>
<p>以下の表はメタマイグレーションで実行できる操作の一覧です。</p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>デフォルト値</th><th>必須</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">i</code></td><td>Milvusインスタンス名。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">n</code></td><td>Milvusがインストールされている名前空間。</td><td><code translate="no">default</code></td><td>False</td></tr>
<tr><td><code translate="no">s</code></td><td>Milvusのソースバージョン。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">t</code></td><td>インストール先のMilvusのバージョン。</td><td><code translate="no">None</code></td><td>真</td></tr>
<tr><td><code translate="no">r</code></td><td>Milvusメタのルートパス。</td><td><code translate="no">by-dev</code></td><td>偽</td></tr>
<tr><td><code translate="no">w</code></td><td>Milvusの新しい画像タグ。</td><td><code translate="no">milvusdb/milvus:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">m</code></td><td>metaマイグレーションイメージタグ。</td><td><code translate="no">milvusdb/meta-migration:v2.2.0</code></td><td>False</td></tr>
<tr><td><code translate="no">o</code></td><td>メタマイグレーション操作</td><td><code translate="no">migrate</code></td><td>誤</td></tr>
<tr><td><code translate="no">d</code></td><td>マイグレーション完了後にマイグレーションポッドを削除するかどうか。</td><td><code translate="no">false</code></td><td>False</td></tr>
<tr><td><code translate="no">c</code></td><td>メタ・マイグレーションpvcのストレージ・クラス。</td><td><code translate="no">default storage class</code></td><td>False</td></tr>
<tr><td><code translate="no">e</code></td><td>milvusが使用するetcdエンポイント。</td><td><code translate="no">etcd svc installed with milvus</code></td><td>False</td></tr>
</tbody>
</table>
<h4 id="1-Migrate-the-metadata" class="common-anchor-header">1.メタデータの移行</h4><ol>
<li><a href="https://github.com/milvus-io/milvus/blob/master/deployments/migrate-meta/migrate.sh">移行スクリプトを</a>ダウンロードします。</li>
<li>Milvusコンポーネントを停止します。Milvusのetcdにライブセッションがあるとマイグレーションに失敗する可能性があります。</li>
<li>Milvusメタデータのバックアップを作成します。</li>
<li>Milvusメタデータを移行します。</li>
<li>新しいイメージでMilvusコンポーネントを起動する。</li>
</ol>
<h4 id="2-Upgrade-Milvus-from-v21x-to-2423" class="common-anchor-header">2.Milvusをv2.1.xから2.4.23にアップグレードする。</h4><p>以下のコマンドは、Milvusをv2.1.4から2.4.23にアップグレードすることを前提としています。必要なバージョンに変更してください。</p>
<ol>
<li><p>Milvusインスタンス名、ソースMilvusバージョン、ターゲットMilvusバージョンを指定します。</p>
<pre><code translate="no">./migrate.sh -i my-release -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>MilvusがデフォルトのK8s名前空間にインストールされていない場合は<code translate="no">-n</code> 。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusがカスタム<code translate="no">rootpath</code> でインストールされている場合は、<code translate="no">-r</code> でルートパスを指定してください。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusがカスタム<code translate="no">image</code> でインストールされている場合は、<code translate="no">-w</code> でイメージタグを指定してください。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>マイグレーション完了後にマイグレーションポッドを自動的に削除する場合は、<code translate="no">-d true</code> を設定します。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -w milvusdb/milvus:v2.4.23 -d <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>マイグレーションに失敗した場合は、ロールバックしてマイグレーションをやり直します。</p>
<pre><code translate="no">./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o rollback -w milvusdb/milvus:v2.1.1
./migrate.sh -i my-release -n milvus -s 2.1.4 -t 2.4.23 -r by-dev -o migrate -w milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
</ol>
