---
id: scaleout.md
related_key: scale Milvus cluster
summary: 了解如何在 Milvus 集群中手动或自动缩放和扩展。
title: 扩展 Milvus 集群
---
<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">扩展 Milvus 集群<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支持组件的水平扩展。这意味着你可以根据自己的需要增加或减少每种类型的工作节点数量。</p>
<p>本主题介绍如何在 Milvus 集群中进行扩展和缩放。我们假定您在扩展之前已经<a href="/docs/zh/install_cluster-helm.md">安装了 Milvus 群集</a>。另外，我们建议您在开始之前先熟悉一下<a href="/docs/zh/architecture_overview.md">Milvus 的架构</a>。</p>
<p>本教程以扩展三个查询节点为例。要扩展其他类型的节点，请在命令行中将<code translate="no">queryNode</code> 替换为相应的节点类型。</p>
<div class="alert note">
<p>有关如何使用 Milvus Operator 扩展群集的信息，请参阅<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">使用 Milvus Operator 扩展群集</a>。</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">什么是水平扩展？<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>水平扩展包括向外扩展和向内扩展。</p>
<h3 id="Scaling-out" class="common-anchor-header">向外扩展</h3><p>向外扩展是指增加群集中的节点数量。与向上扩展不同，向外扩展不需要为群集中的一个节点分配更多资源。相反，向外扩展是通过添加更多节点来横向扩展群集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>扩展</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>扩展</span> </span></p>
<p>根据<a href="/docs/zh/architecture_overview.md">Milvus 架构</a>，无状态工作节点包括查询节点、数据节点、索引节点和代理。因此，你可以根据业务需求和应用场景来扩展这些类型的节点。你可以手动或自动扩展 Milvus 集群。</p>
<p>一般来说，如果您创建的 Milvus 集群使用率过高，您就需要对其进行缩减。以下是一些可能需要缩减 Milvus 集群的典型情况：</p>
<ul>
<li>CPU 和内存利用率在一段时间内居高不下。</li>
<li>查询吞吐量变高。</li>
<li>需要更高的索引速度。</li>
<li>需要处理大量大型数据集。</li>
<li>需要确保 Milvus 服务的高可用性。</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">向内扩展</h3><p>向内扩展是指减少集群中的节点数量。一般来说，如果您创建的 Milvus 集群利用率不足，您就需要对其进行扩展。下面是一些需要对 Milvus 集群进行扩展的典型情况：</p>
<ul>
<li>一段时间内 CPU 和内存利用率较低。</li>
<li>查询吞吐量变低。</li>
<li>不需要更高的索引速度。</li>
<li>要处理的数据集规模较小。</li>
</ul>
<div class="alert note">
我们不建议大幅减少工作节点的数量。例如，如果集群中有五个数据节点，我们建议每次减少一个数据节点，以确保服务可用性。如果第一次尝试缩放后服务可用，则可以继续进一步减少数据节点的数量。</div>
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
    </button></h2><p>运行<code translate="no">kubectl get pods</code> ，获取所创建的 Milvus 集群中的组件及其工作状态列表。</p>
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
Milvus 只支持添加工作节点，不支持添加协调器组件。</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">扩展 Milvus 集群<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以手动或自动扩展 Milvus 群集。关于使用水平 Pod Autoscaling (HPA) 进行自动扩展，请参阅<a href="/docs/zh/hpa.md">为 Milvus 配置 HPA</a>。如果启用了自动缩放，当 CPU 和内存资源消耗达到你设定的值时，Milvus 集群将自动缩小或扩大。</p>
<p>目前，Milvus 2.1.0 只支持手动缩进和缩出。</p>
<h4 id="Scaling-out" class="common-anchor-header">向外扩展</h4><p>运行<code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> 手动缩减查询节点。</p>
<p>如果成功，将在查询节点上添加三个正在运行的 pod，如下图所示。</p>
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
<h4 id="Scaling-in" class="common-anchor-header">向内扩展</h4><p>运行<code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> 扩展查询节点。</p>
<p>如果成功，查询节点上的三个运行 pod 将缩减为一个，如下例所示。</p>
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
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>如果您想了解如何监控 Milvus 服务并创建警报：</p>
<ul>
<li>学习<a href="/docs/zh/monitor.md">在 Kubernetes 上使用 Prometheus 操作符监控 Milvus</a></li>
</ul></li>
<li><p>如果您已准备好在云上部署集群：</p>
<ul>
<li>学习如何<a href="/docs/zh/eks.md">使用 Terraform 在亚马逊 EKS 上部署 Milvus</a></li>
<li>学习如何<a href="/docs/zh/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 集群</a></li>
<li>了解如何<a href="/docs/zh/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
<li><p>如果您正在寻找如何分配资源的说明：</p>
<ul>
<li><a href="/docs/zh/allocate.md#standalone">在 Kubernetes 上分配资源</a></li>
</ul></li>
</ul>
