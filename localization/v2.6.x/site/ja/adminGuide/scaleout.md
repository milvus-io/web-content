---
id: scaleout.md
related_key: scale Milvus cluster
summary: Milvusクラスタ内で手動または自動でスケールアウトおよびスケールする方法を学びます。
title: Milvusクラスタのスケール
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
<p>このトピックでは、Milvusクラスタのスケールアウトおよびスケールイン方法について説明します。スケールアウトする前に<a href="/docs/ja/install_cluster-helm.md">Milvusクラスタをインストール</a>済みであることを前提としています。また、始める前に<a href="/docs/ja/architecture_overview.md">Milvusアーキテクチャに慣れて</a>おくことをお勧めします。</p>
<p>このチュートリアルでは、3つのクエリノードのスケールアウトを例として取り上げます。他の種類のノードをスケールアウトするには、コマンドラインで<code translate="no">queryNode</code> を対応するノードタイプに置き換えてください。</p>
<div class="alert note">
<p>Milvus Operatorでクラスタをスケールアウトする方法については、<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">Milvus Operatorでクラスタをスケールアウトするを</a>参照してください。</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>スケールアウト</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>スケールアップ</span> </span></p>
<p><a href="/docs/ja/architecture_overview.md">Milvusアーキテクチャに</a>よると、ステートレスワーカーノードにはクエリノード、データノード、インデックスノード、プロキシが含まれます。したがって、ビジネスニーズやアプリケーションシナリオに合わせて、これらのタイプのノードをスケールアウトすることができます。Milvusクラスタは手動または自動でスケールアウトすることができます。</p>
<p>一般的に、作成したMilvusクラスタが過剰に使用されている場合はスケールアウトする必要があります。以下はMilvusクラスタのスケールアウトが必要となる典型的な状況です：</p>
<ul>
<li>CPUとメモリの使用率が一定期間高い。</li>
<li>クエリのスループットが高くなった。</li>
<li>インデックス作成の高速化が必要</li>
<li>大量の大規模データセットを処理する必要がある。</li>
<li>Milvusサービスの高い可用性を確保する必要がある。</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">スケールイン</h3><p>スケールインとは、クラスタ内のノード数を減らすことを指します。一般的に、作成したMilvusクラスタが十分に使用されていない場合、スケールインする必要があります。以下はMilvusクラスタのスケールインが必要な典型的な状況です：</p>
<ul>
<li>CPUとメモリの使用率が一定期間低い。</li>
<li>クエリのスループットが低下している。</li>
<li>インデックス作成の高速化は必要ない。</li>
<li>処理するデータセットのサイズが小さい。</li>
</ul>
<div class="alert note">
ワーカーノード数を極端に減らすことは推奨しない。例えば、クラスタ内に5つのデータノードがある場合、サービスの可用性を確保するために一度に1つのデータノードを減らすことを推奨します。最初にスケールインを試みてサービスが利用可能であれば、データノードの数をさらに減らし続けることができます。</div>
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
    </button></h2><p><code translate="no">kubectl get pods</code> を実行し、作成したMilvusクラスタ内のコンポーネントとその作業ステータスのリストを取得します。</p>
<pre><code translate="no">NAME                                            READY   STATUS       RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datacoord<span class="hljs-number">-7</span>b5d84d8c6<span class="hljs-operator">-</span>rzjml    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-665</span>d4586b9<span class="hljs-number">-525</span>pm     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexcoord<span class="hljs-number">-9669</span>d5989<span class="hljs-operator">-</span>kr5cm    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-operator">-</span>b89cc5756<span class="hljs-operator">-</span>xbpbn     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-7</span>cbcc8ffbc<span class="hljs-number">-4</span>jn8d        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>pulsar<span class="hljs-number">-6</span>b9754c64d<span class="hljs-number">-4</span>tg4m       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querycoord<span class="hljs-number">-75</span>f6c789f8<span class="hljs-operator">-</span>j28bg   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-7</span>c7779c6f8<span class="hljs-operator">-</span>pnjzh    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>rootcoord<span class="hljs-number">-75585</span>dc57b<span class="hljs-operator">-</span>cjh87    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-5564</span>fbbddc<span class="hljs-number">-9</span>sbgv               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>      <span class="hljs-number">0</span>          <span class="hljs-number">1</span>m 
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
    </button></h2><p>Milvusクラスタのスケーリングは手動または自動で行うことができます。Horizontal Pod Autoscaling (HPA)による自動スケーリングについては、<a href="/docs/ja/hpa.md">MilvusのHPAの設定を</a>参照してください。自動スケーリングが有効な場合、CPUおよびメモリリソースの消費量が設定した値に達すると、Milvusクラスタは自動的に縮小または拡張されます。</p>
<p>現在、Milvus 2.1.0では手動でのスケールインおよびスケールアウトのみサポートしています。</p>
<h4 id="Scaling-out" class="common-anchor-header">スケールアウト</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> を実行してクエリノードを手動でスケールアウトします。</p>
<p>成功すると、以下の例のようにクエリノード上で実行中のポッドが3つ追加されます。</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datacoord<span class="hljs-number">-7</span>b5d84d8c6<span class="hljs-operator">-</span>rzjml    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-665</span>d4586b9<span class="hljs-number">-525</span>pm     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexcoord<span class="hljs-number">-9669</span>d5989<span class="hljs-operator">-</span>kr5cm    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-operator">-</span>b89cc5756<span class="hljs-operator">-</span>xbpbn     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-7</span>cbcc8ffbc<span class="hljs-number">-4</span>jn8d        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>pulsar<span class="hljs-number">-6</span>b9754c64d<span class="hljs-number">-4</span>tg4m       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querycoord<span class="hljs-number">-75</span>f6c789f8<span class="hljs-operator">-</span>j28bg   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-7</span>c7779c6f8<span class="hljs-operator">-</span>czq9f    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-7</span>c7779c6f8<span class="hljs-operator">-</span>jcdcn    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">5</span>s
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-7</span>c7779c6f8<span class="hljs-operator">-</span>pnjzh    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>rootcoord<span class="hljs-number">-75585</span>dc57b<span class="hljs-operator">-</span>cjh87    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-5564</span>fbbddc<span class="hljs-number">-9</span>sbgv               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
<button class="copy-code-btn"></button></code></pre>
<h4 id="Scaling-in" class="common-anchor-header">スケールイン</h4><p><code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> を実行して、クエリノードをスケールインします。</p>
<p>成功すると、次の例に示すように、クエリ・ノード上で実行中の 3 つのポッドが 1 つに減ります。</p>
<pre><code translate="no">NAME                                            READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datacoord<span class="hljs-number">-7</span>b5d84d8c6<span class="hljs-operator">-</span>rzjml    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-665</span>d4586b9<span class="hljs-number">-525</span>pm     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexcoord<span class="hljs-number">-9669</span>d5989<span class="hljs-operator">-</span>kr5cm    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>indexnode<span class="hljs-operator">-</span>b89cc5756<span class="hljs-operator">-</span>xbpbn     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-7</span>cbcc8ffbc<span class="hljs-number">-4</span>jn8d        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>pulsar<span class="hljs-number">-6</span>b9754c64d<span class="hljs-number">-4</span>tg4m       <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querycoord<span class="hljs-number">-75</span>f6c789f8<span class="hljs-operator">-</span>j28bg   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-7</span>c7779c6f8<span class="hljs-operator">-</span>pnjzh    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>rootcoord<span class="hljs-number">-75585</span>dc57b<span class="hljs-operator">-</span>cjh87    <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-5564</span>fbbddc<span class="hljs-number">-9</span>sbgv               <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">2</span>m
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
<li><p>Milvusサービスを監視し、アラートを作成する方法を学びたい場合：</p>
<ul>
<li><a href="/docs/ja/monitor.md">Kubernetes上のPrometheus OperatorでMilvusを監視するを</a>参照してください。</li>
</ul></li>
<li><p>クラウド上にクラスタをデプロイする準備ができている場合は、こちらを参照してください：</p>
<ul>
<li><a href="/docs/ja/eks.md">Terraformを使ってAmazon EKSにMilvusをデプロイ</a>する方法を学びましょう。</li>
<li><a href="/docs/ja/gcp.md">Kubernetesを使ってGCP上にMilvusクラスタをデプロイ</a>する方法を学ぶ</li>
<li><a href="/docs/ja/azure.md">Kubernetesを使用してMicrosoft AzureにMilvusをデプロイ</a>する方法を学ぶ</li>
</ul></li>
<li><p>リソースの割り当て方法をお探しの方は、こちらをご覧ください：</p>
<ul>
<li><a href="/docs/ja/allocate.md#standalone">Kubernetesでリソースを割り当てる</a></li>
</ul></li>
</ul>
