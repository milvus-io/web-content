---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Helm を使用して Milvus をインストールする前に、必要な準備について確認しましょう。
title: Kubernetes上でMilvusを実行するための要件
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Kubernetes上でMilvusを実行するための要件<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>このページでは、Milvus を稼働させるためのハードウェアおよびソフトウェアの要件を記載しています。</p>
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
<tr><th>コンポーネント</th><th>要件</th><th>推奨</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>第2世代 Intel Core CPU 以上</li><li>Apple Silicon</li></ul></td><td><ul><li>スタンドアロン：4コア以上</li><li>クラスター：8コア以上</li></ul></td><td></td></tr>
<tr><td>CPU命令セット</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Milvus でのベクトル類似性検索およびインデックス構築には、CPU が単一命令・複数データ (SIMD) 拡張セットをサポートしている必要があります。お使いの CPU が、記載されている SIMD 拡張機能のうち少なくとも 1 つをサポートしていることを確認してください。詳細については、「<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">AVX 対応 CPU</a>」を参照してください。</td></tr>
<tr><td>RAM</td><td><ul><li>スタンドアロン：8G</li><li>クラスタ：32G</li></ul></td><td><ul><li>スタンドアロン：16G</li><li>クラスタ：128G</li></ul></td><td>RAMの容量はデータ量によって異なります。</td></tr>
<tr><td>ハードドライブ</td><td>SATA 3.0 SSD または CloudStorage</td><td>NVMe SSD またはそれ以上</td><td>ハードドライブの容量は、データ量によって異なります。</td></tr>
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
    </button></h2><p>Kubernetes クラスタは、Linux プラットフォーム上で実行することを推奨します。</p>
<p>kubectl は Kubernetes 用のコマンドラインツールです。クラスターとマイナーバージョンが 1 つ以内の違いにある kubectl バージョンを使用してください。kubectl の最新バージョンを使用することで、予期せぬ問題を回避できます。</p>
<p>Kubernetes クラスタをローカルで実行するには、minikube が必要です。minikube には Docker が依存関係として必要です。Helm を使用して Milvus をインストールする前に、Docker をインストールしてください。詳細については、<a href="https://docs.docker.com/get-docker">「Docker の入手方法</a>」を参照してください。</p>
<table>
<thead>
<tr><th>オペレーティングシステム</th><th>ソフトウェア</th><th>注</th></tr>
</thead>
<tbody>
<tr><td>Linux プラットフォーム</td><td><ul><li>Kubernetes 1.16 以降</li><li>kubectl</li><li>Helm 3.0.0 以降</li><li>minikube（Milvus スタンドアロン用）</li><li>Docker 19.03 以降（Milvus スタンドアロン用）</li></ul></td><td>詳細については、<a href="https://helm.sh/docs/">Helm ドキュメントを</a>参照してください。</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>ソフトウェア</th><th>バージョン</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td><a href="#Additional-disk-requirements">追加のディスク要件を</a>参照してください。</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Milvus にバンドル（サービスモード：<code translate="no">v0.1.37</code> 以降）</td><td>デフォルトのメッセージキュー。分散デプロイの場合、Woodpecker は専用<strong>サービス</strong>として実行できます。<code translate="no">--set woodpecker.image.tag</code> を使用してバージョンを固定してください。サービスモードは、Woodpecker<code translate="no">v0.1.37</code> 以降でサポートされています。</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>オプション — メッセージキューをPulsarに切り替える場合のみ。デフォルトではインストールされません。</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">追加のディスク要件<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>ディスクのパフォーマンスは etcd にとって極めて重要です。ローカルの NVMe SSD を使用することを強く推奨します。ディスクの応答が遅いと、クラスタのエレクトションが頻繁に発生し、最終的には etcd サービスのパフォーマンスが低下する可能性があります。</p>
<p>ディスクが要件を満たしているかどうかをテストするには、<a href="https://github.com/axboe/fio">fio</a> を使用してください。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>理想的には、ディスクの IOPS が 500 を超え、99パーセンタイルの fsync レイテンシが 10ms 未満であることが望ましいです。より詳細な要件については、etcd<a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">ドキュメント</a>を参照してください。</p>
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
    </button></h3><p><a href="https://minikube.sigs.k8s.io/docs/">minikube</a>、<a href="https://kind.sigs.k8s.io/">kind</a>、<a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a> などのツールを使用すると、ローカルで Kubernetes クラスタを迅速にセットアップできます。以下の手順では、例として minikube を使用します。</p>
<ol>
<li>minikubeのダウンロード</li>
</ol>
<p><a href="https://minikube.sigs.k8s.io/docs/start/">「Get Started</a>」ページにアクセスし、<strong>「What you’ll need」</strong>セクションに記載されている条件を満たしているか確認した後、対象プラットフォームに対応するボタンをクリックし、バイナリをダウンロードしてインストールするためのコマンドをコピーしてください。</p>
<ol start="2">
<li>minikube を使用して K8s クラスタを起動する</li>
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
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>ハードウェアおよびソフトウェアが要件を満たしている場合は、以下の操作を行うことができます：</p>
<ul>
<li><a href="/docs/ja/install_cluster-milvusoperator.md">Milvus Operator を使用して Kubernetes で Milvus を実行する</a></li>
<li><a href="/docs/ja/install_cluster-helm.md">Helm を使用して Kubernetes で Milvus を実行する</a></li>
</ul></li>
<li><p>Milvusのインストール時に設定可能なパラメータについては、「<a href="/docs/ja/system_configuration.md">システム構成</a>」を参照してください。</p></li>
</ul>
