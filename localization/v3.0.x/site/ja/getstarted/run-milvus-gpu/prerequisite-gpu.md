---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: GPUを搭載したMilvusをインストールする前に、必要な準備について確認しましょう。
title: GPU を使用した Milvus のインストール要件
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">GPU を使用した Milvus のインストール要件<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、GPU 対応の Milvus をセットアップするためのハードウェアおよびソフトウェアの要件について説明します。</p>
<h2 id="Compute-capability" class="common-anchor-header">演算能力<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus GPUイメージ「<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 」は、コンピュート能力 7.0、7.5、8.0、8.6、9.0、10.0、または 12.0 を備えた GPU デバイス向けに構築されています。 お使いの GPU デバイスは、これらのコンピュート・キャパビリティのいずれか、または 8.9 や 12.1 など、これら向けにビルドされたコードを実行できるそれ以降のコンピュート・キャパビリティを備えている必要があります。詳細については、<a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">「バイナリ互換性と</a> <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">ファミリー固有の機能</a>」を参照してください。</p>
<p>お使いの GPU デバイスが要件を満たしているかどうかを確認するには、NVIDIA 開発者ウェブサイトの<a href="https://developer.nvidia.com/cuda-gpus">「GPU コンピュート・キャパビリティ</a>」をご覧ください。</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">NVIDIA ドライバー<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>ホストは、<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">NVIDIA Container Toolkit でサポートされている Linux ディストリビューション</a>のいずれかを実行しており、お使いの GPU デバイス用の NVIDIA ドライバーがインストールされている必要があります。</p>
<p>Milvus GPU イメージ「<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> 」は、CUDA 12.9 Update 1 をベースとしています。このイメージの `<code translate="no">NVIDIA_REQUIRE_CUDA</code> ` 設定には `<code translate="no">cuda&gt;=12.9</code>` が必要であるため、NVIDIA ドライバーは CUDA 12.9 以降をサポートしている必要があります。 CUDA 12.9 Update 1 については、NVIDIA は Linux x86_64 向けにドライバーバージョン 575.57.08 以降を推奨しています。各 CUDA リリースのドライバーバージョンについては、<a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">CUDA Toolkit のリリースノートを</a>参照してください。</p>
<p>この設定では、一部のGPUブランドにおいて535、550、560、565、および570ブランチのドライバーも使用可能ですが、GeForceやTitan GPUでは使用できません。 これらのドライバーを使用する場合、<a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">イメージはCUDAのフォワード互換性に</a>依存しますが、NVIDIAはこの互換性をNVIDIA Data Center GPU、RTXカードの特定のNGC Server Ready SKU、およびJetsonボードでのみサポートしています。ドライバーがこれらの要件を満たしていない場合、NVIDIA Container Toolkitは「<code translate="no">unsatisfied condition</code> 」エラーを報告し、コンテナ用のGPUを設定しません。</p>
<p>Ubuntu 22.04 ユーザーは、次のコマンドでドライバをインストールできます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>コンピュート・キャパビリティ 10.0 または 12.0（Blackwell）の GPU は、NVIDIA ドライバーのオープンカーネルモジュールでのみサポートされています。 これらの GPU については、<code translate="no">nvidia-headless-580</code> の代わりに<code translate="no">nvidia-headless-580-open</code> をインストールしてください。オープンカーネルモジュールは、Volta（7.0）など、Turing（コンピュート能力 7.5）より古い GPU をサポートしていないため、それらの GPU には<code translate="no">nvidia-headless-580</code> を引き続き使用してください。</p>
<p>その他のLinuxディストリビューションについては、『<a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">NVIDIAドライバーインストールガイド</a>』を参照してください。</p>
<p>以下のコマンドを実行することで、ドライバが正しくインストールされているかを確認できます。出力には、インストールされたドライバのバージョンが表示されます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>NVIDIA Container Toolkit<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">インストールガイドに記載されている</a>、お使いの Linux ディストリビューションに応じた手順に従って、<a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">NVIDIA Container Toolkit</a> をインストールしてください。</p>
<p>Docker Compose を使用して Milvus をインストールする場合は、NVIDIA Container Runtime を使用するように Docker を設定し、Docker デーモンを再起動してから、サンプルワークロードを実行して、コンテナが GPU にアクセスできることを確認してください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>最後のコマンドは、コンテナ内で `<code translate="no">nvidia-smi</code> ` を実行し、ホスト上の GPU デバイスに関する情報を出力します。Kubernetes 上に Milvus をインストールする場合は、代わりにこのページの末尾にある FAQ に記載されている手順に従って、GPU ワーカーノードを準備してください。</p>
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
    </button></h2><p>このセクションおよび以下のFAQに記載されている要件は、Helmを使用してKubernetes上にGPUサポート付きのMilvusをインストールする場合に適用されます。</p>
<p>Kubernetes クラスタは Linux プラットフォーム上で実行することを推奨します。</p>
<ul>
<li>kubectl は Kubernetes 用のコマンドラインツールです。クラスタのバージョンとマイナーバージョンが 1 つ以内の kubectl バージョンを使用してください。kubectl の最新バージョンを使用することで、予期せぬ問題を回避できます。</li>
<li>Kubernetesクラスタをローカルで実行する場合は、minikubeが必要です。minikubeはDockerを依存関係として必要とします。Helmを使用してMilvusをインストールする前に、Dockerがインストールされていることを確認してください。詳細については、「<a href="https://docs.docker.com/get-docker">Dockerの入手方法</a>」を参照してください。</li>
</ul>
<table>
<thead>
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>Linuxプラットフォーム</td><td><ul><li>Kubernetes 1.16 以降</li><li>kubectl</li><li>Helm 3.0.0 以降</li><li>minikube（Milvus スタンドアロン用）</li><li>Docker 19.03 以降（Milvus スタンドアロン用）</li></ul></td><td>詳細については、<a href="https://helm.sh/docs/">Helm ドキュメントを</a>参照してください。</td></tr>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">テスト目的でローカルに K8s クラスターを起動するにはどうすればよいですか？<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a>、<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> などのツールを使用すると、ローカルで Kubernetes クラスターを素早くセットアップできます。以下の手順では、例として minikube を使用します。</p>
<ol>
<li>minikubeのダウンロード</li>
</ol>
<p><a href="https://minikube.sigs.k8s.io/docs/start/">「Get Started</a>」ページにアクセスし、<strong>「What you’ll need」</strong>セクションに記載されている条件を満たしているか確認した後、対象のプラットフォームに対応するボタンをクリックし、バイナリをダウンロードしてインストールするためのコマンドをコピーしてください。</p>
<ol start="2">
<li>minikube を使用して K8s クラスターを起動する</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>K8sクラスタのステータスを確認する</li>
</ol>
<p>以下のコマンドを使用して、インストールされた K8s クラスタの状態を確認できます。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">kubectl</code> 経由で K8s クラスターにアクセスできることを確認してください。<code translate="no">kubectl</code> をローカルにインストールしていない場合は、「<a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">minikube 内で kubectl を使用する</a>」を参照してください。</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">GPU ワーカーノードを使用した K8s クラスターを起動するにはどうすればよいですか？<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>GPU対応のワーカーノードを使用したい場合は、以下の手順に従ってGPUワーカーノードを備えたK8sクラスターを作成できます。GPUワーカーノードを備えたK8sクラスターにMilvusをインストールし、プロビジョニングされたデフォルトのストレージクラスを使用することを推奨します。</p>
<ol>
<li>GPUワーカーノードの準備</li>
</ol>
<p>GPU対応のワーカーノードを使用するには、「<a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">GPUノードの準備</a>」の手順に従ってください。</p>
<ol start="2">
<li>K8sでGPUサポートを有効にする</li>
</ol>
<p><a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">以下の手順</a>に従って、Helm を使用して<strong>nvidia-device-plugin</strong>をデプロイしてください。</p>
<p>セットアップ後、次のコマンドでGPUリソースを確認してください。「<code translate="no">&lt;gpu-worker-node&gt;</code> 」を実際のノード名に置き換えてください。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

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
