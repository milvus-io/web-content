---
id: scaleout.md
related_key: scale Milvus cluster
summary: 學習如何在 Milvus 集群中手動或自動縮放和擴展。
title: 擴充 Milvus 集群
---

<h1 id="Scale-a-Milvus-Cluster" class="common-anchor-header">擴充 Milvus 集群<button data-href="#Scale-a-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 支援其元件的水平擴充。這意味著您可以根據自己的需要，增加或減少每種類型的工作節點數量。</p>
<p>本主題將介紹如何擴展 Milvus 叢集。我們假設您在擴充之前<a href="/docs/zh-hant/v2.5.x/install_cluster-helm.md">已經安裝了 Milvus 叢集</a>。此外，我們建議您在開始之前先熟悉<a href="/docs/zh-hant/v2.5.x/architecture_overview.md">Milvus 架構</a>。</p>
<p>本教學以擴充三個查詢節點為例。若要縮放其他類型的節點，請在命令列中以對應的節點類型取代<code translate="no">queryNode</code> 。</p>
<div class="alert note">
<p>有关如何使用 Milvus Operator 扩展群集的信息，请参阅<a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/scale-a-milvus-cluster.md">使用 Milvus Operator 扩展群集</a>。</p>
</div>
<h2 id="What-is-horizontal-scaling" class="common-anchor-header">什麼是水平縮放？<button data-href="#What-is-horizontal-scaling" class="anchor-icon" translate="no">
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
    </button></h2><p>水平縮放包括縮出和縮入。</p>
<h3 id="Scaling-out" class="common-anchor-header">縮放</h3><p>縮放是指增加叢集中的節點數量。與擴充不同的是，向外擴充不需要您為群集中的一個節點分配更多的資源。相反，縮放是透過增加節點來水平擴展群集。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_out.jpg" alt="Scaleout" class="doc-image" id="scaleout" />
   </span> <span class="img-wrapper"> <span>縮放</span> </span></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scale_up.jpg" alt="Scaleup" class="doc-image" id="scaleup" />
   </span> <span class="img-wrapper"> <span>擴充</span> </span></p>
<p>根據<a href="/docs/zh-hant/v2.5.x/architecture_overview.md">Milvus 架構</a>，無狀態工作節點包括查詢節點、資料節點、索引節點和代理。因此，您可以擴展這些類型的節點，以滿足您的業務需求和應用場景。您可以手動或自動縮放 Milvus 集群。</p>
<p>一般而言，如果您建立的 Milvus 叢集使用率過高，您就需要將其縮減。以下是一些可能需要縮減 Milvus 叢集的典型情況：</p>
<ul>
<li>CPU 和記憶體使用率在一段時間內偏高。</li>
<li>查詢吞吐量變高。</li>
<li>需要更高的索引速度。</li>
<li>需要處理大量的大型資料集。</li>
<li>需要確保 Milvus 服務的高可用性。</li>
</ul>
<h3 id="Scaling-in" class="common-anchor-header">向內擴展</h3><p>向內擴充是指減少叢集中的節點數量。一般來說，如果您所建立的 Milvus 叢集使用率不足，您就需要擴充它。以下是一些需要擴充 Milvus 叢集的典型情況：</p>
<ul>
<li>CPU 和記憶體使用率在一段時間內偏低。</li>
<li>查詢吞吐量變低。</li>
<li>不需要更高的索引速度。</li>
<li>要處理的資料集大小很小。</li>
</ul>
<div class="alert note">
我們不建議大幅減少工作者節點的數量。例如，如果群集中有五個資料節點，我們建議每次減少一個資料節點，以確保服務可用性。如果第一次嘗試縮放之後，服務是可用的，您可以繼續進一步減少資料節點的數量。</div>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>執行<code translate="no">kubectl get pods</code> 以取得您建立的 Milvus 叢集中的元件清單及其工作狀態。</p>
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
Milvus 只支援新增工作節點，不支援新增協調器元件。</div>
<h2 id="Scale-a-Milvus-cluster" class="common-anchor-header">擴充 Milvus 叢集<button data-href="#Scale-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以手動或自動擴充 Milvus 叢集。要使用水平 Pod Autoscaling (HPA) 進行自動調整，請參閱<a href="/docs/zh-hant/v2.5.x/hpa.md">為 Milvus 配置 HPA</a>。如果啟用自動擴充，當 CPU 和記憶體資源消耗達到您設定的值時，Milvus 叢集會自動縮小或擴大。</p>
<p>目前，Milvus 2.1.0 只支援手動縮放。</p>
<h4 id="Scaling-out" class="common-anchor-header">縮放</h4><p>執行<code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=3 --reuse-values</code> 來手動縮放查詢節點。</p>
<p>如果成功，查詢節點上會新增三個執行中的 Pod，如以下範例所示。</p>
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
<h4 id="Scaling-in" class="common-anchor-header">縮放</h4><p>執行<code translate="no">helm upgrade my-release milvus/milvus --set queryNode.replicas=1 --reuse-values</code> 以擴充查詢節點。</p>
<p>如果成功，查詢節點上的三個執行中 Pod 將減少為一個，如以下範例所示。</p>
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
<li><p>如果您想學習如何監控 Milvus 服務並建立警示：</p>
<ul>
<li>學習<a href="/docs/zh-hant/v2.5.x/monitor.md">在 Kubernetes 上使用 Prometheus Operator 監控 Milvus</a></li>
</ul></li>
<li><p>如果您已準備好在雲上部署您的叢集：</p>
<ul>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/eks.md">使用 Terraform 在 Amazon EKS 上部署 Milvus</a></li>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 叢集</a></li>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
<li><p>如果您正在尋找如何分配資源的說明：</p>
<ul>
<li><a href="/docs/zh-hant/v2.5.x/allocate.md#standalone">在 Kubernetes 上分配資源</a></li>
</ul></li>
</ul>
