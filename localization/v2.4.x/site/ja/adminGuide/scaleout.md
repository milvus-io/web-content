---
id: scaleout.md
related_key: scale Milvus cluster
summary: Milvusクラスタを手動または自動でスケールアウトおよびスケールする方法について説明します。
title: Milvusクラスターをスケールする
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">Milvusクラスタのスケール<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusはコンポーネントの水平スケーリングをサポートしています。つまり、必要に応じて各タイプのワーカーノードの数を増やしたり減らしたりすることができます。</p>
<p>このトピックでは、Milvusクラスタのスケールアウトおよびスケールイン方法について説明します。スケールアウトする前に<a href="/docs/ja/v2.4.x/install_cluster-helm.md">Milvusクラスタをインストール</a>済みであることを前提としています。また、始める前に<a href="/docs/ja/v2.4.x/architecture_overview.md">Milvusアーキテクチャに慣れて</a>おくことをお勧めします。</p>
<p>このチュートリアルでは、3つのクエリノードのスケールアウトを例として取り上げます。他の種類のノードをスケールアウトするには、コマンドラインで<code translate="no">queryNode</code> を対応するノードタイプに置き換えてください。</p>
<div class="alert note">
<p>Milvus Operatorを使用してクラスタをスケールアウトする方法については、<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Milvus Operatorを使用したクラスタのスケールアウトを</a>参照してください。</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">水平スケーリングとは何ですか?<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>水平スケーリングには、スケールアウトとスケールインがあります。</p>
<h3 id="Scaling-out" class="common-anchor-header">スケールアウト</h3><p>スケールアウトとは、クラスタ内のノード数を増やすことを指します。スケールアップとは異なり、スケールアウトではクラスタ内の1つのノードにより多くのリソースを割り当てる必要はありません。その代わりに、スケールアウトではノードを追加することでクラスタを水平方向に拡張します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>スケールアウト</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>スケールアップ</span> </span></p>
<p><a href="/docs/ja/v2.4.x/architecture_overview.md">Milvusアーキテクチャに</a>よると、ステートレスワーカーノードにはクエリノード、データノード、インデックスノード、プロキシが含まれます。そのため、ビジネスニーズやアプリケーションシナリオに合わせてこれらのタイプのノードをスケールアウトすることができます。Milvusクラスタは手動または自動でスケールアウトすることができます。</p>
<p>一般的に、作成したMilvusクラスタが過剰に使用されている場合はスケールアウトする必要があります。以下はMilvusクラスタのスケールアウトが必要となる典型的な状況です：</p>
<ul>
<li>CPUとメモリの使用率が一定期間高い。</li>
<li>クエリのスループットが高くなった。</li>
<li>インデックス作成の高速化が必要</li>
<li>大量の大規模データセットを処理する必要がある。</li>
<li>Milvusサービスの高い可用性を確保する必要がある。</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">スケールイン</h3><p>スケールインとは、クラスタ内のノード数を減らすことを指します。一般的に、作成したMilvusクラスタが十分に利用されていない場合、スケールインする必要があります。以下はMilvusクラスタのスケールインが必要な典型的な状況です：</p>
<ul>
<li>CPUとメモリの使用率が一定期間低い。</li>
<li>クエリのスループットが低下している。</li>
<li>インデックス作成の高速化は必要ない。</li>
<li>処理するデータセットのサイズが小さい。</li>
</ul>
<div class="alert note">
ワーカーノード数を極端に減らすことは推奨しない。例えば、クラスタ内に5つのデータノードがある場合、サービスの可用性を確保するために一度に1つのデータノードを減らすことを推奨します。最初にスケールインを試みてサービスが利用可能であれば、データノードの数をさらに減らしていくことができます。</div>
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
    </button></h2><p><code translate="no">kubectl get pods</code> を実行して、作成したMilvusクラスタ内のコンポーネントとその作業ステータスのリストを取得します。</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my-release-etcd-0                               1/1     Running      0          1m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running      0          1m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running      0          1m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running      0          1m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running      0          1m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running      0          1m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running      0          1m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running      0          1m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running      0          1m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running      0          1m
my-release-minio-5564fbbddc-9sbgv               1/1     Running      0          1m 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Milvusはワーカーノードの追加のみをサポートしており、コーディネータコンポーネントの追加はサポートしていません。</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">Milvusクラスタのスケール<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusクラスタは手動または自動でスケールできます。自動スケールが有効な場合、CPUおよびメモリリソースの消費量が設定した値に達すると、Milvusクラスタは自動的に縮小または拡張されます。</p>
<p>現在のところ、Milvus 2.1.0では手動によるスケールインおよびスケールアウトのみがサポートされています。</p>
<h4 id="Scaling-out" class="common-anchor-header">スケールアウト</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> を実行して手動でクエリノードをスケールアウトします。</p>
<p>成功すると、以下の例のようにクエリノード上で実行中のポッドが3つ追加されます。</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-czq9f    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-jcdcn    1/1     Running   0          5s
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">スケールイン</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> を実行して、クエリノードをスケールインします。</p>
<p>成功すると、次の例に示すように、クエリ・ノード上で実行中の 3 つのポッドが 1 つに減ります。</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my-release-etcd-0                               1/1     Running   0          2m
my-release-milvus-datacoord-7b5d84d8c6-rzjml    1/1     Running   0          2m
my-release-milvus-datanode-665d4586b9-525pm     1/1     Running   0          2m
my-release-milvus-indexcoord-9669d5989-kr5cm    1/1     Running   0          2m
my-release-milvus-indexnode-b89cc5756-xbpbn     1/1     Running   0          2m
my-release-milvus-proxy-7cbcc8ffbc-4jn8d        1/1     Running   0          2m
my-release-milvus-pulsar-6b9754c64d-4tg4m       1/1     Running   0          2m
my-release-milvus-querycoord-75f6c789f8-j28bg   1/1     Running   0          2m
my-release-milvus-querynode-7c7779c6f8-pnjzh    1/1     Running   0          2m
my-release-milvus-rootcoord-75585dc57b-cjh87    1/1     Running   0          2m
my-release-minio-5564fbbddc-9sbgv               1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Milvusのサービスを監視してアラートを作成する方法を学びたい場合は、次の手順に進んでください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/monitor.md">Kubernetes上のPrometheus OperatorでMilvusを監視するを</a>参照してください。</li>
</ul></li>
<li><p>クラウド上にクラスタをデプロイする準備ができている場合は、こちらを参照してください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Terraformを使ってAmazon EKSにMilvusをデプロイ</a>する方法を学ぶ</li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Kubernetesを使ってGCPにMilvusクラスタをデプロイ</a>する方法</li>
<li><a href="/docs/ja/v2.4.x/azure.md">Kubernetesを使ってMicrosoft AzureにMilvusをデプロイ</a>する方法</li>
</ul></li>
<li><p>リソースの割り当て方法をお探しの方は、こちらをご覧ください：</p>
<ul>
<li><a href="/docs/ja/v2.4.x/allocate.md#standalone">Kubernetesでリソースを割り当てる</a></li>
</ul></li>
</ul>
