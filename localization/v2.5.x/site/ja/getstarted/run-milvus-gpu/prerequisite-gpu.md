---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: GPUでMilvusをインストールする前に必要な準備をご紹介します。
title: GPU対応Milvusのインストール要件
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">GPU対応Milvusのインストール要件<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、GPUをサポートしたMilvusをセットアップするためのハードウェアとソフトウェアの要件を示します。</p>
<h2 id="Compute-capability" class="common-anchor-header">計算能力<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>GPUデバイスの計算能力は以下のいずれかである必要があります：6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>お使いのGPUデバイスが要件を満たしているかどうかを確認するには、NVIDIA開発者向けウェブサイトで<a href="https://developer.nvidia.com/cuda-gpus">Your GPU Compute Capabilityを</a>チェックしてください。</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIAドライバ<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>GPUデバイス用のNVIDIAドライバは、<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">サポートされているLinuxディストリビューションの</a>1つである必要があり、NVIDIA Container Toolkitは、<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">このガイドに従って</a>インストールされている必要があります。</p>
<p>Ubuntu 22.04ユーザの場合、以下のコマンドでドライバとコンテナツールキットをインストールできます：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>その他のOSユーザーについては、<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">公式のインストールガイドを</a>参照してください。</p>
<p>ドライバが正しくインストールされているかどうかは、以下のコマンドを実行することで確認できます：</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>バージョン545以上のドライバを使用することを推奨します。</p>
<h2 id="Software-requirements" class="common-anchor-header">ソフトウェア要件<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Linuxプラットフォーム上でKubernetesクラスタを実行することを推奨します。</p>
<ul>
<li>kubectlはKubernetes用のコマンドラインツールです。クラスタのマイナーバージョン差が1つ以内のkubectlバージョンを使用してください。最新バージョンのkubectlを使用することで、予期せぬ問題を回避できます。</li>
<li>Kubernetesクラスタをローカルで実行する場合は、minikubeが必要です。minikubeには依存関係としてDockerが必要です。Helmを使用してmilvusをインストールする前に、Dockerをインストールしていることを確認してください。詳しくは<a href="https://docs.docker.com/get-docker">Get Dockerを</a>参照してください。</li>
</ul>
<table>
<thead>
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>Linuxプラットフォーム</td><td><ul><li>Kubernetes 1.16以降</li><li>kubectl</li><li>Helm 3.0.0以降</li><li>minikube (Milvusスタンドアロン用)</li><li>Docker 19.03以降（Milvusスタンドアロン用）</li></ul></td><td>詳細は<a href="https://helm.sh/docs/">Helm Docs を</a>参照してください。</td></tr>
</tbody>
</table>
<h2 id="FAQs" class="common-anchor-header">よくある質問<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">テスト目的でK8sクラスタをローカルで起動するにはどうすればよいですか？</h3><p><a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a>、<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadmなどの</a>ツールを使って、Kubernetesクラスタをローカルで素早くセットアップできます。以下の手順では、例としてminikubeを使用します。</p>
<ol>
<li>minikubeをダウンロードする</li>
</ol>
<p><a href="https://minikube.sigs.k8s.io/docs/start/">Get Started</a>ページにアクセスし、<strong>What you'll need</strong>セクションに記載されている条件を満たしているかどうかを確認し、ターゲットプラットフォームについて記載されているボタンをクリックし、バイナリをダウンロードしてインストールするためのコマンドをコピーします。</p>
<ol start="2">
<li>minikubeを使ってK8sクラスタを起動する</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>K8sクラスタのステータスの確認</li>
</ol>
<p>以下のコマンドを使用して、インストールしたK8sクラスタのステータスを確認できます。</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">kubectl</code> 経由でK8sクラスタにアクセスできることを確認します。<code translate="no">kubectl</code> をローカルにインストールしていない場合は、「<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Use kubectl inside minikube</a>」を参照してください。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">GPUワーカーノードでK8sクラスタを起動するには？</h3><p>GPU対応ワーカーノードを使用したい場合は、以下の手順に従ってGPUワーカーノードを持つK8sクラスタを作成できます。GPUワーカーノードを持つK8sクラスタにMilvusをインストールし、プロビジョニングされたデフォルトのストレージクラスを使用することをお勧めします。</p>
<ol>
<li>GPUワーカーノードの準備</li>
</ol>
<p>GPU対応ワーカーノードを使用するには、<a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Prepare your GPU nodesの</a>手順に従ってください。</p>
<ol start="2">
<li>K8sでGPUサポートを有効にする</li>
</ol>
<p><a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">以下の</a>手順に従って、Helm で<strong>nvidia-device-plugin</strong>をデプロイします。</p>
<p>設定後、次のコマンドでGPUリソースを表示します。<code translate="no">&lt;gpu-worker-node&gt;</code> は実際のノード名に置き換えてください。</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
