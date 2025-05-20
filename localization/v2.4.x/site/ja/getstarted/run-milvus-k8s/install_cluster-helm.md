---
id: install_cluster-helm.md
label: Helm
related_key: Kubernetes
summary: KubernetesにMilvusクラスタをインストールする方法をご紹介します。
title: HelmでMilvusクラスタをインストールする
---
<h1 id="Run-Milvus-in-Kubernetes-with-Helm" class="common-anchor-header">KubernetesでHelmを使ってMilvusを起動する<button data-href="#Run-Milvus-in-Kubernetes-with-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、<a href="https://github.com/zilliztech/milvus-helm">Milvus Helmチャートを</a>使用してKubernetesでMilvusインスタンスを起動する方法を説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Helmはチャートと呼ばれるパッケージングフォーマットを使用します。チャートとは、Kubernetesリソースの関連するセットを記述したファイルのコレクションです。Milvusは、Milvusの依存関係やコンポーネントをデプロイするのに役立つチャートのセットを提供します。</p>
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
<li><p><a href="https://helm.sh/docs/intro/install/">Helm CLIをインストール</a>する。</p></li>
<li><p><a href="/docs/ja/v2.4.x/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes">K8sクラスタを作成</a>する。</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClassを</a>インストールする。インストールされたStorageClassは次のように確認できます。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>インストール前に<a href="/docs/ja/v2.4.x/prerequisite-helm.md">ハードウェアとソフトウェアの要件を</a>確認します。</p></li>
<li><p>Milvusをインストールする前に、<a href="https://milvus.io/tools/sizing">Milvus Sizing Toolを</a>使用して、データサイズに基づいてハードウェア要件を見積もることを推奨します。これにより、Milvusのインストールに最適なパフォーマンスとリソースを確保することができます。</p></li>
</ul>
<div class="alert note">
<p>イメージのプル時に問題が発生した場合は、<a href="mailto:community@zilliz.com">community@zilliz.com</a>まで問題の詳細をご連絡ください。</p>
</div>
<h2 id="Install-Milvus-Helm-Chart" class="common-anchor-header">Milvus Helm Chartのインストール<button data-href="#Install-Milvus-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Helm Chartsをインストールする前に、Milvus Helmリポジトリを追加する必要があります。</p>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">https://github.com/milvus-io/milvus-helm</code> にある Milvus Helm Charts リポジトリはアーカイブされており、<code translate="no">https://github.com/zilliztech/milvus-helm</code> から以下のようにアップデートを入手することができます：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>アーカイブされたリポジトリは、4.0.31までのチャートで利用可能です。それ以降のリリースについては、新しいレポをご利用ください。</p>
</div>
<p>Milvusチャートをリポジトリから取得するには以下のようにします：</p>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<p>このコマンドを実行することで、常に最新のMilvus Helmチャートを取得することができます。</p>
<h2 id="Online-install" class="common-anchor-header">オンラインインストール<button data-href="#Online-install" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Deploy-a-Milvus-cluster" class="common-anchor-header">1.Milvusクラスタのデプロイ</h3><p>Helmチャートをインストールしたら、Kubernetes上でMilvusを起動できます。ここでは、Milvusの起動手順を説明します。</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>上記のコマンドでは、<code translate="no">my-release</code> がリリース名、<code translate="no">milvus/milvus</code> がローカルにインストールされているチャートリポジトリです。別の名前を使用する場合は、<code translate="no">my-release</code> を適切なものに置き換えてください。</p>
<p>上記のコマンドは、Milvusクラスタとそのコンポーネントおよび依存関係をデフォルトの設定でデプロイします。これらの設定をカスタマイズするには、<a href="https://milvus.io/tools/sizing">Milvus Sizing Toolを</a>使用して実際のデータサイズに基づいて設定を調整し、対応するYAMLファイルをダウンロードすることをお勧めします。コンフィギュレーションパラメータの詳細については、<a href="https://milvus.io/docs/system_configuration.md">Milvusシステムコンフィギュレーションチェックリストを</a>ご参照ください。</p>
<div class="alert note">
  <ul>
    <li>リリース名にはアルファベット、数字、ダッシュのみを使用してください。リリース名にはドットは使用できません。</li>
    <li>MilvusをHelmと共にインストールする場合、デフォルトのコマンドラインはMilvusのクラスタバージョンをインストールします。Milvusをスタンドアロンでインストールする場合は、さらなる設定が必要です。</li>
    <li><a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kubernetesのdeprecated API migration guideに</a>よると、PodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンはv1.25で提供されなくなった。代わりに<b>policy/v1</b>APIバージョンを使用するようにマニフェストとAPIクライアントを移行することが推奨されます。<br/>Kubernetes v1.25以降でPodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンをまだ使用しているユーザのための回避策として、代わりに以下のコマンドを実行してmilvusをインストールすることができます:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
    <li>詳細については、<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>および<a href="https://helm.sh/docs/">Helmを</a>参照してください。</li>
  </ul>
</div>
<h3 id="2-Check-Milvus-cluster-status" class="common-anchor-header">2.Milvusクラスタのステータスの確認</h3><p>以下のコマンドを実行し、Milvusクラスタ内のすべてのPodのステータスを確認します。</p>
<pre><code translate="no">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>すべてのPodが稼働していれば、上記コマンドの出力は以下のようになるはずです：</p>
<pre><code translate="no">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3.ローカルポートをMilvusに転送する</h3><p>以下のコマンドを実行して、Milvusクラスタがサービスを提供しているポートを取得します。</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>出力は、Milvusインスタンスがデフォルトのポート<strong>19530で</strong>サービスを提供していることを示しています。</p>
<div class="alert note">
<p>Milvusをスタンドアロンモードでデプロイしている場合、ポッド名を<code translate="no">my-release-milvus-proxy-xxxxxxxxxx-xxxxx</code> から<code translate="no">my-release-milvus-xxxxxxxxxx-xxxxx</code> に変更します。</p>
</div>
<p>次に、以下のコマンドを実行して、ローカルポートをMilvusがサービスを提供するポートに転送します。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>オプションとして、上記のコマンドで<code translate="no">27017:19530</code> の代わりに<code translate="no">:19530</code> を使用することで、<code translate="no">kubectl</code> にローカルポートを割り当てさせることができ、ポートの競合を管理する必要がなくなります。</p>
<p>デフォルトでは、kubectlのポートフォワーディングは<code translate="no">localhost</code> のみをリッスンします。Milvusに選択したIPアドレスまたはすべてのIPアドレスをリッスンさせたい場合は、<code translate="no">address</code> フラグを使用してください。以下のコマンドは、port-forwardをホストマシンのすべてのIPアドレスでリッスンするようにします。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Offline-install" class="common-anchor-header">オフラインインストール<button data-href="#Offline-install" class="anchor-icon" translate="no">
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
    </button></h2><p>ネットワークが制限されている環境では、このセクションの手順に従ってMilvusクラスタを起動してください。</p>
<h3 id="1-Get-Milvus-manifest" class="common-anchor-header">1.Milvusマニフェストの取得</h3><p>以下のコマンドを実行してMilvusマニフェストを取得します。</p>
<pre><code translate="no" class="language-shell">$ helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上記のコマンドはMilvusクラスタのチャートテンプレートをレンダリングし、その出力を<code translate="no">milvus_manifest.yaml</code> という名前のマニフェストファイルに保存します。このマニフェストを使用して、コンポーネントと依存関係を持つMilvusクラスタを個別のポッドにインストールすることができます。</p>
<div class="alert note">
<ul>
<li>すべてのMilvusコンポーネントが単一のポッドに含まれるスタンドアロンモードでMilvusインスタンスをインストールするには、代わりに<code translate="no">helm template my-release --set cluster.enabled=false --set etcd.replicaCount=1 --set minio.mode=standalone --set pulsar.enabled=false milvus/milvus &gt; milvus_manifest.yaml</code> を実行して、スタンドアロンモードのMilvusインスタンス用のチャートテンプレートをレンダリングする必要があります。</li>
<li>Milvusのコンフィギュレーションを変更するには、Milvusテンプレートをダウンロードし、必要な設定をそのテンプレートに配置します。 <a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a>テンプレートをダウンロードし、必要な設定をそのテンプレートに配置し、<code translate="no">helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml</code> を使用して、それに従ってマニフェストをレンダリングします。</li>
</ul>
</div>
<h3 id="2-Download-image-pulling-script" class="common-anchor-header">2.image-pulling スクリプトのダウンロード</h3><p>画像抽出スクリプトはPythonで開発されています。<code translate="no">requirement.txt</code> ファイルにある依存関係とともにスクリプトをダウンロードしてください。</p>
<pre><code translate="no" class="language-shell">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="3-Pull-and-save-images" class="common-anchor-header">3.画像の取り込みと保存</h3><p>以下のコマンドを実行し、必要な画像を取り込んで保存します。</p>
<pre><code translate="no" class="language-shell">$ pip3 install -r requirements.txt
$ python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>画像はカレントディレクトリの<code translate="no">images</code> というサブフォルダに取り込まれます。</p>
<h3 id="4-Load-images" class="common-anchor-header">4.画像のロード</h3><p>以下のようにして、ネットワーク制限環境のホストにイメージをロードできます：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-keyword">for</span> image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="5-Deploy-Milvus" class="common-anchor-header">5.Milvusのデプロイ</h3><pre><code translate="no" class="language-shell">$ kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>ここまでで、オンラインインストールのステップ2と<a href="#3-Forward-a-local-port-to-Milvus">3に従って</a>クラスタの状態を確認し、ローカルポートをMilvusに転送することができます。</p>
<h2 id="Upgrade-running-Milvus-cluster" class="common-anchor-header">稼働中のMilvusクラスタのアップグレード<button data-href="#Upgrade-running-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行し、稼働中のMilvusクラスタを最新バージョンにアップグレードします：</p>
<pre><code translate="no" class="language-shell">$ helm repo update
$ helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Milvusのアンインストール<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>以下のコマンドを実行し、Milvusをアンインストールします。</p>
<pre><code translate="no" class="language-bash">$ helm uninstall my-release
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次の作業<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>DockerにMilvusをインストールしました：</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/quickstart.md">Hello Milvusで</a>Milvusの機能を確認する。</p></li>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.4.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/v2.4.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.4.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-helm.md">Helm Chartを使用したMilvusのアップグレード</a>。</p></li>
<li><p><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタをスケールする</a>。</p></li>
<li><p>Milvusクラスターをクラウド上にデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvusの</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backupを</a>ご紹介します。</p></li>
<li><p>Milvusのデバッグとダイナミックコンフィギュレーションアップデートのためのオープンソースツール、<a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcherの</a>ご紹介。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://milvus.io/docs/attu.md">Attuを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">PrometheusでMilvusを監視する</a>。</p></li>
</ul>
