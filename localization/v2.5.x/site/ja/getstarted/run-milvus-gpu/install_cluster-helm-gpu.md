---
id: install_cluster-helm-gpu.md
label: Cluster (Helm)
related_key: Kubernetes
summary: KubernetesにMilvusクラスタをインストールする方法をご紹介します。
title: Helmチャートを使用したGPUサポート付きMilvusの実行
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
    </button></h2><p>Helmはチャートと呼ばれるパッケージングフォーマットを使用します。チャートとは、Kubernetesリソースの関連セットを記述したファイルの集まりです。Milvusは、Milvusの依存関係やコンポーネントをデプロイするのに役立つチャートのセットを提供します。<a href="https://artifacthub.io/packages/helm/milvus-helm/milvus">Milvus Helm Chartは</a>、Helmパッケージマネージャを使用してKubernetes (K8s)クラスタ上でMilvusデプロイメントをブートストラップするソリューションです。</p>
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
<li><p><a href="/docs/ja/v2.5.x/prerequisite-gpu.md#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes">GPUワーカーノードでK8sクラスタを作成</a>します。</p></li>
<li><p><a href="https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/">StorageClassを</a>インストールします。インストールしたStorageClassは以下の手順で確認できます。</p>
<pre><code translate="no" class="language-bash">$ kubectl get sc

NAME PROVISIONER RECLAIMPOLICY VOLUMEBIINDINGMODE ALLOWVOLUMEEXPANSION AGE
standard (default) k8s.io/minikube-hostpath Delete Immediate <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre></li>

<li><p>インストール前に<a href="/docs/ja/v2.5.x/prerequisite-gpu.md">ハードウェアとソフトウェアの要件を</a>確認してください。</p></li>
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
    </button></h2><p>HelmはK8sパッケージマネージャであり、Milvusの迅速な導入に役立ちます。</p>
<ol>
<li>Milvus Helmリポジトリを追加します。</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">https://milvus-io.github.io/milvus-helm/</code> にある Milvus Helm Charts リポジトリはアーカイブされ、<code translate="no">https://zilliztech.github.io/milvus-helm/</code> から以下のように更新を取得できます：</p>
<pre><code translate="no" class="language-shell">helm repo add zilliztech https://zilliztech.github.io/milvus-helm
helm repo update
<span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade existing helm release</span>
helm upgrade my-release zilliztech/milvus
<button class="copy-code-btn"></button></code></pre>
<p>アーカイブされたリポジトリは4.0.31までのチャートで利用可能です。それ以降のリリースについては、代わりに新しいレポを使用してください。</p>
</div>
<ol start="2">
<li>ローカルでのチャート更新</li>
</ol>
<pre><code translate="no"><span class="hljs-variable">$ </span>helm repo update
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
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
EOF</span>
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
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Assign-multiple-GPU-devices" class="common-anchor-header">2.複数のGPUデバイスの割り当て</h3><p>Milvusには、1つのGPUデバイスに加えて、複数のGPUデバイスを割り当てることができます。</p>
<ul>
<li><p>Milvusクラスタ</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の構成では、indexNodeとqueryNodeが2つのGPUを共有しています。indexNodeとqueryNodeに異なるGPUを割り当てるには、設定ファイルの<code translate="no">extraEnv</code> ：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre>
  <div class="alert note">
    <ul>
      <li>リリース名にはアルファベット、数字、ダッシュのみを使用します。リリース名には、文字、数字、およびダッシュのみを含める必要があります。</li>
      <li>デフォルトのコマンドラインは、Helmを使用してMilvusをインストールする際にMilvusのクラスタバージョンをインストールします。Milvusをスタンドアロンでインストールする場合は、さらなる設定が必要です。</li>
      <li><a href="https://kubernetes.io/docs/reference/using-api/deprecation-guide/#v1-25">Kuberenetesのdeprecated API migration guideに</a>よると、PodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンはv1.25から提供されなくなった。代わりに<b>policy/v1</b>APIバージョンを使用するようにマニフェストおよびAPIクライアントを移行することが推奨されます。<br/>Kuberenetes v1.25以降でPodDisruptionBudgetの<b>policy/v1beta1</b>APIバージョンを使用しているユーザのための回避策として、代わりに以下のコマンドを実行してmilvusをインストールすることができます:<br/> <code translate="no">helm install my-release milvus/milvus --set pulsar.bookkeeper.pdb.usePolicy=false,pulsar.broker.pdb.usePolicy=false,pulsar.proxy.pdb.usePolicy=false,pulsar.zookeeper.pdb.usePolicy=false</code></li> 
      <li>詳細は<a href="https://artifacthub.io/packages/helm/milvus/milvus">Milvus Helm Chart</a>および<a href="https://helm.sh/docs/">Helmを</a>参照してください。</li>
    </ul>
  </div>
</li>
<li><p>Milvusスタンドアローン</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;2&quot;
    limits:
      nvidia.com/gpu: &quot;2&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>上記の構成では、indexNodeとqueryNodeは2つのGPUを共有しています。indexNodeとqueryNodeに異なるGPUを割り当てるには、設定ファイルのextraEnvを以下のように設定することで、適宜設定を変更することができます：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cat</span> &lt;&lt;<span class="hljs-string">EOF &gt; custom-values.yaml
indexNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;0&quot;
queryNode:
  resources:
    requests:
      nvidia.com/gpu: &quot;1&quot;
    limits:
      nvidia.com/gpu: &quot;1&quot;
  extraEnv:
    - name: CUDA_VISIBLE_DEVICES
      value: &quot;1&quot;
EOF</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> -f custom-values.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="2-Check-Milvus-status" class="common-anchor-header">2.Milvusステータスのチェック</h3><p>以下のコマンドを実行して、Milvusのステータスをチェックします：</p>
<pre><code translate="no" class="language-bash">$ kubectl get pods
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
<h3 id="3-Forward-a-local-port-to-Milvus" class="common-anchor-header">3.ローカルポートをMilvusに転送する。</h3><p>Milvusサーバがリッスンしているローカルポートを確認します。ポッド名を自分のものに置き換えてください。</p>
<pre><code translate="no" class="language-bash">$ kubectl get pod my-release-milvus-proxy-6bd7f5587-ds2xv --template
=<span class="hljs-string">&#x27;{{(index (index .spec.containers 0).ports 0).containerPort}}{{&quot;\n&quot;}}&#x27;</span>
19530
<button class="copy-code-btn"></button></code></pre>
<p>次に、以下のコマンドを実行し、ローカルポートをMilvusがリッスンしているポートに転送する。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward service/my-release-milvus 27017:19530
Forwarding from 127.0.0.1:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>オプションとして、上記のコマンドで<code translate="no">27017:19530</code> の代わりに<code translate="no">:19530</code> を使用すると、<code translate="no">kubectl</code> にローカルポートを割り当てさせることができ、ポートの競合を管理する必要がなくなります。</p>
<p>デフォルトでは、kubectlのポートフォワーディングは<code translate="no">localhost</code> のみをリッスンします。Milvusに選択したIPアドレスまたはすべてのIPアドレスをリッスンさせたい場合は、<code translate="no">address</code> フラグを使用してください。以下のコマンドは、port-forwardをホストマシンのすべてのIPアドレスでリッスンするようにします。</p>
<pre><code translate="no" class="language-bash">$ kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
Forwarding from 0.0.0.0:27017 -&gt; 19530
<button class="copy-code-btn"></button></code></pre>
<p>これで、転送されたポートを使ってMilvusに接続できるようになります。</p>
<h2 id="Access-Milvus-WebUI" class="common-anchor-header">Milvus WebUIへのアクセス<button data-href="#Access-Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusにはMilvus WebUIというGUIツールが組み込まれており、ブラウザからアクセスすることができます。Milvus WebUIは、シンプルで直感的なインターフェースにより、システムの監視性を向上させます。Milvus Web UIを使用することで、Milvusのコンポーネントや依存関係の統計やメトリクスの観察、データベースやコレクションの詳細の確認、Milvusの詳細な設定の一覧などを行うことができます。Milvus Web UIの詳細については、<a href="/docs/ja/v2.5.x/milvus-webui.md">Milvus WebUIを</a>参照してください。</p>
<p>Milvus Web UIへのアクセスを有効にするには、プロキシポッドをローカルポートにポートフォワードする必要があります。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27018:9091</span>
Forwarding from 0.0.0.0:27018 -&gt; 9091
<button class="copy-code-btn"></button></code></pre>
<p>これで、Milvus Web UI に<code translate="no">http://localhost:27018</code> からアクセスできるようになります。</p>
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
    </button></h2><p>Milvusをインストールしたら、次のことができます：</p>
<ul>
<li><p><a href="/docs/ja/v2.5.x/quickstart.md">クイックスタートで</a>Milvusの機能を確認する。</p></li>
<li><p>Milvusの基本操作を学ぶ：</p>
<ul>
<li><a href="/docs/ja/v2.5.x/manage_databases.md">データベースの管理</a></li>
<li><a href="/docs/ja/v2.5.x/manage-collections.md">コレクションの管理</a></li>
<li><a href="/docs/ja/v2.5.x/manage-partitions.md">パーティションの管理</a></li>
<li><a href="/docs/ja/v2.5.x/insert-update-delete.md">挿入、アップサート、削除</a></li>
<li><a href="/docs/ja/v2.5.x/single-vector-search.md">単一ベクトル検索</a></li>
<li><a href="/docs/ja/v2.5.x/multi-vector-search.md">ハイブリッド検索</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.5.x/upgrade_milvus_cluster-helm.md">Helm Chartを使用したMilvusのアップグレード</a>。</p></li>
<li><p><a href="/docs/ja/v2.5.x/scaleout.md">Milvusクラスタをスケールする</a>。</p></li>
<li><p>Milvuクラスタをクラウドにデプロイする：</p>
<ul>
<li><a href="/docs/ja/v2.5.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/ja/v2.5.x/gcp.md">Googleクラウド</a></li>
<li><a href="/docs/ja/v2.5.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p><a href="/docs/ja/v2.5.x/milvus-webui.md">Milvusの</a>観測と管理のための直感的なWebインターフェースである<a href="/docs/ja/v2.5.x/milvus-webui.md">Milvus WebUIを</a>ご覧ください。</p></li>
<li><p><a href="/docs/ja/v2.5.x/milvus_backup_overview.md">Milvus</a>データバックアップのためのオープンソースツールである<a href="/docs/ja/v2.5.x/milvus_backup_overview.md">Milvus Backupを</a>ご紹介します。</p></li>
<li><p>Milvusのデバッグとダイナミックなコンフィギュレーション更新のためのオープンソースツール、<a href="/docs/ja/v2.5.x/birdwatcher_overview.md">Birdwatcherを</a>ご覧ください。</p></li>
<li><p>Milvusを直感的に管理するオープンソースのGUIツール<a href="https://github.com/zilliztech/attu">Attuを</a>ご紹介します。</p></li>
<li><p><a href="/docs/ja/v2.5.x/monitor.md">PrometheusでMilvusを監視する</a>。</p></li>
</ul>
