---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: HelmでMilvusをインストールする前に必要な準備を学ぶ。
title: Kubernetes上でMilvusを実行するための要件
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Kubernetes上でMilvusを稼働させるための要件<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvusを稼働させるために必要なハードウェアとソフトウェアの要件を示します。</p>
<h2 id="Hardware-requirements" class="common-anchor-header">ハードウェア要件<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>コンポーネント</th><th>要件</th><th>推奨環境</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>インテル第2世代コアCPU以上</li><li>アップルシリコン</li></ul></td><td><ul><li>スタンドアロン：4コア以上</li><li>クラスタ8コア以上</li></ul></td><td></td></tr>
<tr><td>CPU命令セット</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvusのベクトル類似度検索とインデックス作成には、CPUが単一命令複数データ（SIMD）拡張セットをサポートしている必要があります。CPUが少なくとも1つのSIMD拡張セットに対応していることを確認してください。詳細は<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVXを搭載したCPUを</a>参照してください。</td></tr>
<tr><td>RAM</td><td><ul><li>スタンドアロン: 8G</li><li>クラスタ32G</li></ul></td><td><ul><li>スタンドアロン: 16G</li><li>クラスタ128G</li></ul></td><td>RAMのサイズはデータ容量によって異なります。</td></tr>
<tr><td>ハードドライブ</td><td>SATA 3.0 SSDまたはCloudStorage</td><td>NVMe SSD以上</td><td>ハードドライブのサイズはデータ容量に依存します。</td></tr>
</tbody>
</table>
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
<p>kubectlはKubernetes用のコマンドラインツールです。クラスタのマイナーバージョン差が1つ以内のkubectlバージョンを使用してください。最新バージョンのkubectlを使用することで、予期せぬ問題を回避できます。</p>
<p>Kubernetesクラスタをローカルで実行する場合は、minikubeが必要です。minikubeには依存関係としてDockerが必要です。Helmを使用してMilvusをインストールする前に、Dockerをインストールしていることを確認してください。詳しくは<a href="https://docs.docker.com/get-docker">Get Dockerを</a>参照してください。</p>
<table>
<thead>
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>Linuxプラットフォーム</td><td><ul><li>Kubernetes 1.16以降</li><li>kubectl</li><li>Helm 3.0.0以降</li><li>minikube (Milvusスタンドアロン用)</li><li>Docker 19.03以降（Milvusスタンドアロン用）</li></ul></td><td>詳細は<a href="https://helm.sh/docs/">Helm Docs を</a>参照してください。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>ソフトウェア</th><th>バージョン</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">追加ディスク要件を</a>参照。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2023-03-20T20-16-18Z</td><td></td></tr>
<tr><td>パルサー</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">追加ディスク要件</h3><p>ディスク性能はetcdにとって極めて重要です。ローカルのNVMe SSDを使用することを強く推奨します。ディスクの応答が遅くなると、クラスタが頻繁に削除され、最終的にetcdサービスが低下する可能性があります。</p>
<p>ディスクが適格かどうかをテストするには、<a href="https://github.com/axboe/fio">fioを</a>使用します。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想的には、ディスクのIOPSが500以上、fsyncのレイテンシが99パーセンタイルで10ms以下である必要があります。より詳細な要件については etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Docs を</a>お読みください。</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">テスト目的でK8sクラスタをローカルで起動するにはどうすればいいですか？</h3><p><a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a>、<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadmの</a>ようなツールを使用して、Kubernetesクラスタをローカルで素早くセットアップできます。以下の手順では、例としてminikubeを使用します。</p>
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
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>ハードウェアとソフトウェアが要件を満たしていれば、次のことができます：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/install_cluster-milvusoperator.md">Milvus Operatorを使用してKubernetsでMilvusを実行する。</a></li>
<li><a href="/docs/ja/v2.4.x/install_cluster-helm.md">Helmを使用してKubernetesでMilvusを実行する</a></li>
</ul></li>
<li><p>Milvusのインストール時に設定できるパラメータについては、<a href="/docs/ja/v2.4.x/system_configuration.md">システム構成を</a>参照してください。</p></li>
</ul>
