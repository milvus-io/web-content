---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: KubernetesにMilvusクラスタをインストールする方法を学ぶ。
title: HelmチャートによるGPUサポートでのMilvusの実行
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="common-anchor-header">Helmチャートを使用したGPUサポート付きMilvusの実行<button data-href="#Run-Milvus-with-GPU-Support-Using-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Helm Chartを使用してGPUをサポートしたMilvusインスタンスを起動する方法を説明します。</p>
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
    </button></h2><p>Helmはチャートと呼ばれるパッケージングフォーマットを使用します。チャートとは、Kubernetesリソースの関連セットを記述したファイルの集まりです。Milvusは、Milvusの依存関係やコンポーネントをデプロイするのに役立つチャートのセットを提供します。<a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chartは</a>、Helmパッケージマネージャを使用してKubernetes (K8s)クラスタ上でMilvusのデプロイをブートストラップするソリューションです。</p>
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
<li><p><a href="/docs/ja/v2.4.x/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">GPUワーカーノードでK8sクラスタを作成</a>します。</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClassを</a>インストールします。インストールしたStorageClassは以下の手順で確認できます。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
<span class="hljs-title function_">standard</span> <span class="hljs-params">(<span class="hljs-keyword">default</span>)</span>    k8s.io/minikube-hostpath     Delete           Immediate             <span class="hljs-literal">false</span> 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>インストール前に<a href="/docs/ja/v2.4.x/prerequisite-gpu.md">ハードウェアとソフトウェアの要件を</a>確認してください。</p></li>
</ul>
<div class="alert note">
<p>イメージのプル時に問題が発生した場合は、<a href="mailto:community@zilliz.com">community@zilliz.com</a>まで問題の詳細をご連絡ください。</p>
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Milvus 用 Helm チャートのインストール<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>HelmはK8sパッケージマネージャであり、Milvusの迅速なデプロイを支援します。</p>
<ol>
<li>Milvus Helmリポジトリを追加します。</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">https://milvus-io.github.io/milvus-helm/</code> にある Milvus Helm Charts リポジトリはアーカイブされ、以下のように<code translate="no">https://zilliztech.github.io/milvus-helm/</code> からさらなるアップデートを取得できます：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-comment"># upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>アーカイブされたリポジトリは4.0.31までのチャートで利用可能です。それ以降のリリースについては、代わりに新しいレポを使用してください。</p>
</div>
<ol start="2">
<li>ローカルでのチャート更新</li>
</ol>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Milvus" class="common-anchor-header">Milvusの起動<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helmチャートをインストールしたら、Kubernetes上でMilvusを起動できます。このセクションでは、GPUをサポートしたMilvusを起動する手順を説明します。</p>
<p>リリース名、チャート、変更するパラメータを指定して、HelmでMilvusを起動する必要があります。このガイドでは、リリース名として<code translate="no">my-release</code> を使用します。別のリリース名を使用するには、以下のコマンドの<code translate="no">my-release</code> を使用しているものに置き換えてください。</p>
<p>Milvusでは、1つまたは複数のGPUデバイスをMilvusに割り当てることができます。</p>
<h3 id="1-Assign-a-single-GPU-device" class="common-anchor-header">1.単一のGPUデバイスを割り当てる</h3><p>GPUをサポートするMilvusでは、1つ以上のGPUデバイスを割り当てることができます。</p>
<ul>
<li><p>Milvusクラスタ</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusスタンドアロン</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
standalone:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2.複数のGPUデバイスの割り当て</h3><p>単一のGPUデバイスに加えて、複数のGPUデバイスをMilvusに割り当てることもできます。</p>
<ul>
<li><p>Milvusクラスタ</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の構成では、indexNodeとqueryNodeが2つのGPUを共有しています。indexNodeとqueryNodeに異なるGPUを割り当てるには、設定ファイルの<code translate="no">extraEnv</code> ：</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>リリース名にはアルファベット、数字、ダッシュのみを使用します。リリース名には、文字、数字、およびダッシュのみを含める必要があります。</li>
      <li>デフォルトのコマンドラインは、Helmを使用してMilvusをインストールする際にMilvusのクラスタバージョンをインストールします。Milvusをスタンドアロンでインストールする場合は、さらなる設定が必要です。</li>
      <li><a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kuberenetesのdeprecated API migration guideに</a>よると、PodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンはv1.25から提供されなくなった。代わりに<b>policy/v1</b>APIバージョンを使用するようにマニフェストおよびAPIクライアントを移行することが推奨されます。<br/>Kuberenetes v1.25以降でPodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンを使用しているユーザのための回避策として、代わりに以下のコマンドを実行してMilvusをインストールすることができます:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>詳細は<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>および<a href="https://helm.sh/docs/">Helmを</a>参照。</li>
    </ul>
  </div>
</li>
<li><p>Milvusスタンドアロン</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;2&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の構成では、indexNodeとqueryNodeは2つのGPUを共有しています。indexNodeとqueryNodeに異なるGPUを割り当てるには、設定ファイルのextraEnvを以下のように設定することで、適宜設定を変更することができます：</p>
<pre><code translate="no" class="language-bash">cat &lt;&lt;<span class="hljs-variable constant_">EOF</span> &gt; custom-values.<span class="hljs-property">yaml</span>
<span class="hljs-attr">indexNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;0&quot;</span>
<span class="hljs-attr">queryNode</span>:
  <span class="hljs-attr">resources</span>:
    <span class="hljs-attr">requests</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
    <span class="hljs-attr">limits</span>:
      nvidia.<span class="hljs-property">com</span>/<span class="hljs-attr">gpu</span>: <span class="hljs-string">&quot;1&quot;</span>
  <span class="hljs-attr">extraEnv</span>:
    - <span class="hljs-attr">name</span>: <span class="hljs-variable constant_">CUDA_VISIBLE_DEVICES</span>
      <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;1&quot;</span>
<span class="hljs-variable constant_">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2.Milvus ステータスのチェック</h3><p>以下のコマンドを実行してMilvusのステータスをチェックします：</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pods
<button class="copy-code-btn"></button></code></pre>
<p>Milvusが起動すると、<code translate="no">READY</code> 列にすべてのPodの<code translate="no">1/1</code> が表示されます。</p>
<ul>
<li><p>Milvusクラスタ</p>
<pre><code translate="no" class="language-shell">NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datacoord-6fd4bd885c-gkzwx     1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-indexcoord-5bfcf6bdd8-nmh5l    1/1    Running   0        3m23s
my-release-milvus-indexnode-5c5f7b5bd9-l8hjg     1/1    Running   0        3m24s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querycoord-579cd79455-xht5n    1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-rootcoord-7fb9488465-dmbbj     1/1    Running   0        3m23s
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
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusスタンドアロン</p>
<pre><code translate="no" class="language-shell">NAME                                               READY   STATUS      RESTARTS   AGE
my-release-etcd-0                                  1/1     Running     0          30s
my-release-milvus-standalone-54c4f88cb9-f84pf      1/1     Running     0          30s
my-release-minio-5564fbbddc-mz7f5                  1/1     Running     0          30s
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3.ローカルポートをMilvusに転送する</h3><p>Milvusサーバがリッスンしているローカルポートを確認します。ポッド名を自分のものに置き換えてください。</p>
<pre><code translate="no" class="language-bash">$ kubectl <span class="hljs-keyword">get</span> pod my-release-milvus-proxy<span class="hljs-number">-6b</span>d7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
<span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>次に、以下のコマンドを実行し、ローカルポートをMilvusがリッスンしているポートに転送します。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">127.0</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
<button class="copy-code-btn"></button></code></pre>
<p>オプションとして、上記のコマンドで<code translate="no">27017:19530</code> の代わりに<code translate="no">:19530</code> を使用すると、<code translate="no">kubectl</code> にローカルポートを割り当てさせることができ、ポートの競合を管理する必要がなくなります。</p>
<p>デフォルトでは、kubectlのポートフォワーディングは<code translate="no">localhost</code> のみをリッスンします。Milvusに選択したIPアドレスまたはすべてのIPアドレスをリッスンさせたい場合は、<code translate="no">address</code> フラグを使用してください。以下のコマンドは、port-forwardをホストマシンのすべてのIPアドレスでリッスンするようにします。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span> service/my-release-milvus <span class="hljs-number">27017</span>:<span class="hljs-number">19530</span>
<span class="hljs-title class_">Forwarding</span> <span class="hljs-keyword">from</span> <span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>:<span class="hljs-number">27017</span> -&gt; <span class="hljs-number">19530</span>
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
    </button></h2><p>Milvusをインストールしたら</p>
<ul>
<li><p><a href="/docs/ja/v2.4.x/quickstart.md">クイックスタートで</a>Milvusの機能を確認する。</p></li>
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
<li><p><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケール</a></p></li>
<li><p>Milvuクラスタをクラウドにデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvusの</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.4.x/milvus_backup_overview.md">Milvus Backupを</a>紹介します。</p></li>
<li><p>オープンソースのMilvusデバッグツールである<a href="/docs/ja/v2.4.x/birdwatcher_overview.md">Birdwatcherの</a>ご紹介。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://milvus.io/docs/attu.md">Attuを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.4.x/monitor.md">PrometheusによるMilvusの監視</a></p></li>
</ul>
