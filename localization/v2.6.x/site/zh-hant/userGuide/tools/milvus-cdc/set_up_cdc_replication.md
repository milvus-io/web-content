---
id: set_up_cdc_replication.md
summary: 學習如何部署兩個 Milvus 集群，並配置它們之間的 CDC 複製。
title: 設定 CDC 複製
---
<h1 id="Set-Up-CDC-Replication" class="common-anchor-header">設定 CDC 複製<button data-href="#Set-Up-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南展示如何使用 Milvus Operator 部署兩個獨立的 Milvus 群集，並配置 CDC 從源群集複製到目標群集。</p>
<p>範例使用</p>
<ul>
<li><code translate="no">source-cluster</code> 作為主要群集。</li>
<li><code translate="no">target-cluster</code> 作為備用群集。</li>
<li><code translate="no">milvus</code> 作為 Milvus 叢集的命名空間。</li>
<li><code translate="no">milvus-operator</code> 作為 Milvus Operator 的命名空間。</li>
</ul>
<p>在您開始之前，請閱讀<a href="/docs/zh-hant/v2.6.x/milvus_cdc_overview.md">Milvus CDC</a>以瞭解主備模式和故障移轉選項。</p>
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
    </button></h2><ul>
<li>Milvus v2.6.16 或更新版本。</li>
<li>Milvus Operator v1.3.4 或更新版本。</li>
<li>Kubernetes 叢集可用。</li>
<li>來源集群與目標集群可透過網路相互連線。</li>
<li>您擁有兩個 Milvus 叢集的管理認證。</li>
<li>您知道每個群集的實體通道數量。</li>
</ul>
<h2 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">步驟 1：升級 Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>新增 Milvus Operator Helm 套件庫：</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
<button class="copy-code-btn"></button></code></pre>
<p>更新儲存庫：</p>
<pre><code translate="no" class="language-bash">helm repo update zilliztech-milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>安裝或升級 Milvus Operator：</p>
<pre><code translate="no" class="language-bash">helm -n milvus-operator upgrade --install milvus-operator \
  zilliztech-milvus-operator/milvus-operator \
  --create-namespace
<button class="copy-code-btn"></button></code></pre>
<p>檢查 Operator Pod 是否正在執行：</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>範例輸出：</p>
<pre><code translate="no" class="language-text">NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-6f7d8c9c7d-xm4tj   1/1     Running   0          54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Deploy-the-Source-Cluster" class="common-anchor-header">步驟 2：部署原始群集<button data-href="#Step-2-Deploy-the-Source-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>建立一個名為<code translate="no">milvus_source_cluster.yaml</code> 的檔案：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">source-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>套用配置：</p>
<pre><code translate="no" class="language-bash">kubectl create namespace milvus
kubectl apply -f milvus_source_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>檢查來源群集 Pod 是否正在執行：</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p>範例輸出：</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
source-cluster-etcd-0                                  1/1     Running   0          3m
source-cluster-minio-6d8f7d9b9f-9t7j2                  1/1     Running   0          3m
source-cluster-milvus-standalone-7f8d9c8f6d-r2m5x      1/1     Running   0          2m
source-cluster-milvus-cdc-66d64747bd-sckxj             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<p>確保 CDC pod（如<code translate="no">source-cluster-milvus-cdc-...</code> ）處於<code translate="no">Running</code> 狀態。</p>
<h2 id="Step-3-Deploy-the-Target-Cluster" class="common-anchor-header">步驟 3：部署目標群集<button data-href="#Step-3-Deploy-the-Target-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>建立一個名為<code translate="no">milvus_target_cluster.yaml</code> 的檔案：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">target-cluster</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.16</span>
    <span class="hljs-attr">cdc:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>CDC 元件也在目標群集上啟用。當目標群集為備用時，它是閒置的，但如果目標群集之後成為切換後的主要群集，則需要它。</p>
<p>套用組態：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_target_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>檢查目標群集 pod 是否正在執行：</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus | grep -E <span class="hljs-string">&#x27;NAME|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>範例輸出：</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
target-cluster-etcd-0                                  1/1     Running   0          3m
target-cluster-minio-5f7c8d9b6f-k8s2q                  1/1     Running   0          3m
target-cluster-milvus-standalone-66dc8d9f7f-5n6bp      1/1     Running   0          2m
target-cluster-milvus-cdc-7f8c9d6b8c-q4t9m             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-Cluster-Information" class="common-anchor-header">步驟 4：準備群集資訊<button data-href="#Step-4-Prepare-Cluster-Information" class="anchor-icon" translate="no">
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
    </button></h2><p>取得兩個群集的 Milvus 服務位址：</p>
<pre><code translate="no" class="language-bash">kubectl get svc -n milvus | grep -E <span class="hljs-string">&#x27;NAME|source-cluster|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>範例輸出：</p>
<pre><code translate="no" class="language-text">NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
source-cluster-milvus                 ClusterIP   10.98.124.90     &lt;none&gt;        19530/TCP,9091/TCP   8m
target-cluster-milvus                 ClusterIP   10.109.234.172   &lt;none&gt;        19530/TCP,9091/TCP   3m
<button class="copy-code-btn"></button></code></pre>
<p>準備兩種地址：</p>
<ul>
<li>叢集位址會寫入複製組態，並由 CDC 元件使用。這些位址必須可以從 CDC pod 達到。</li>
<li>用戶端地址僅在呼叫 Milvus API 時被您的 Python 用戶端使用。如果您在 Kubernetes 集群之外執行 Python 用戶端，請透過正常的存取方法，例如負載平衡器、ingress 或 port-forward，來揭露 Milvus 服務。</li>
</ul>
<p>準備兩個群集的連線資訊和 pchannel 清單：</p>
<pre><code translate="no" class="language-python">source_cluster_addr = <span class="hljs-string">&quot;http://source-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>
target_cluster_addr = <span class="hljs-string">&quot;http://target-cluster-milvus.milvus.svc.cluster.local:19530&quot;</span>

source_client_addr = source_cluster_addr
target_client_addr = target_cluster_addr

<span class="hljs-comment"># If your Python client runs outside the Kubernetes cluster, replace only</span>
<span class="hljs-comment"># source_client_addr and target_client_addr with externally reachable addresses.</span>
<span class="hljs-comment"># Keep source_cluster_addr and target_cluster_addr reachable from CDC pods.</span>
<span class="hljs-comment"># For example:</span>
<span class="hljs-comment"># source_client_addr = &quot;http://127.0.0.1:19530&quot;</span>
<span class="hljs-comment"># target_client_addr = &quot;http://127.0.0.1:19531&quot;</span>

source_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>
target_cluster_token = <span class="hljs-string">&quot;root:Milvus&quot;</span>

source_cluster_id = <span class="hljs-string">&quot;source-cluster&quot;</span>
target_cluster_id = <span class="hljs-string">&quot;target-cluster&quot;</span>

pchannel_num = <span class="hljs-number">16</span>
source_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{source_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
target_cluster_pchannels = [
    <span class="hljs-string">f&quot;<span class="hljs-subst">{target_cluster_id}</span>-rootcoord-dml_<span class="hljs-subst">{i}</span>&quot;</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(pchannel_num)
]
<button class="copy-code-btn"></button></code></pre>
<p>用您環境中實際的 Milvus 服務位址取代位址。請勿設定<code translate="no">source_cluster_addr</code> 或<code translate="no">target_cluster_addr</code> 為本機連接埠轉送位址，除非 CDC Pod 也能到達該位址。pchannel 清單必須與您的 Milvus 部署相符。請勿在未檢查您的群集配置前複製範例值。</p>
<h2 id="Step-5-Create-the-Replication-Configuration" class="common-anchor-header">步驟 5：建立複製組態<button data-href="#Step-5-Create-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>建立從<code translate="no">source-cluster</code> 到<code translate="no">target-cluster</code> 的複製組態：</p>
<pre><code translate="no" class="language-python">replicate_config = {
    <span class="hljs-string">&quot;clusters&quot;</span>: [
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: source_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: source_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: source_cluster_pchannels,
        },
        {
            <span class="hljs-string">&quot;cluster_id&quot;</span>: target_cluster_id,
            <span class="hljs-string">&quot;connection_param&quot;</span>: {
                <span class="hljs-string">&quot;uri&quot;</span>: target_cluster_addr,
                <span class="hljs-string">&quot;token&quot;</span>: target_cluster_token,
            },
            <span class="hljs-string">&quot;pchannels&quot;</span>: target_cluster_pchannels,
        },
    ],
    <span class="hljs-string">&quot;cross_cluster_topology&quot;</span>: [
        {
            <span class="hljs-string">&quot;source_cluster_id&quot;</span>: source_cluster_id,
            <span class="hljs-string">&quot;target_cluster_id&quot;</span>: target_cluster_id,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-6-Apply-the-Replication-Configuration" class="common-anchor-header">步驟 6：套用複製組態<button data-href="#Step-6-Apply-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>對兩個群集套用相同的組態：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

source_client = MilvusClient(
    uri=source_client_addr,
    token=source_cluster_token,
)
target_client = MilvusClient(
    uri=target_client_addr,
    token=target_cluster_token,
)

<span class="hljs-keyword">try</span>:
    source_client.update_replicate_configuration(**replicate_config)
    target_client.update_replicate_configuration(**replicate_config)
<span class="hljs-keyword">finally</span>:
    source_client.close()
    target_client.close()
<button class="copy-code-btn"></button></code></pre>
<p>對於生產自動化，使用獨立的短暫用戶端進行此控制平面作業。這可避免在群集角色變更時，與應用程式 DML 流量共用相同的 gRPC 通道。</p>
<p>套用組態後，寫入<code translate="no">source-cluster</code> 的變更會複製到<code translate="no">target-cluster</code> 。</p>
<h2 id="Step-7-Verify-Data-Replication" class="common-anchor-header">步驟 7：驗證資料複製<button data-href="#Step-7-Verify-Data-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>驗證複製是否正常運作：</p>
<ol>
<li>連接至<code translate="no">source-cluster</code> 。</li>
<li>建立集合。</li>
<li>將資料插入資料集中。</li>
<li>載入資料集，並在<code translate="no">source-cluster</code> 上執行查詢或搜尋。</li>
<li>連接至<code translate="no">target-cluster</code> 。</li>
<li>在<code translate="no">target-cluster</code> 上執行相同的查詢或搜尋，但不在備用群集上手動載入資料集。</li>
<li>確認預期的資料在兩個群集上都可見。</li>
</ol>
<p>目標群集是此拓樸中的備用群集。請勿在備用群集上執行手動 DDL 或 DCL 作業，例如<code translate="no">load_collection</code> 。這些作業應該在來源群集上執行，並複製到目標群集。</p>
<p>確切的驗證碼取決於您的收集模式。有關基本的 Milvus 收集工作流程，請參閱 Milvus 快速入門文件。</p>
<h2 id="CDC-Lag" class="common-anchor-header">CDC 滯後期<button data-href="#CDC-Lag" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 滯後是主要群集和備用群集之間的資料視窗。配置複製後，您應持續監控它。</p>
<p>CDC 滯後會在下列情況下增加</p>
<ul>
<li>主要寫入速率高。</li>
<li>群集之間的網路延遲或封包遺失增加。</li>
<li>備用群集負載過重。</li>
<li>CDC 節點配置不足。</li>
<li>正在執行大型 DDL 或匯入作業。</li>
</ul>
<p>使用 CDC 滯後指導作業決策：</p>
<ul>
<li>如果滯後時間短，切換應更快完成。</li>
<li>如果滯後時間較長，故障轉換可能會遺失更多資料。</li>
</ul>
<p>您可以使用下列 PromQL 查詢估算 CDC 滯後時間：</p>
<pre><code translate="no" class="language-promql">clamp_min(
  max by (channel_name) (
    milvus_wal_last_confirmed_time_tick
  )
  -
  min by (channel_name) (
    milvus_cdc_last_replicated_time_tick
  ),
  0
)
</code></pre>
<p>結果以秒為單位。對於每個來源通道，查詢會比較最新確認的 WAL 時間指標和 CDC 複製的最後時間指標。如果主複製到多個備用群集，<code translate="no">min by (channel_name)</code> 表達式會報告該通道最慢的複製進度。</p>
<p>如果 Prometheus 掃描多個 Milvus 集群，請新增符合您部署的標籤篩選器，例如<code translate="no">namespace</code> 或<code translate="no">app_kubernetes_io_instance</code> ，以避免混合來自不同集群的指標。</p>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="common-anchor-header">我需要在兩個集群上呼叫<code translate="no">update_replicate_configuration</code> 嗎？<button data-href="#Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>是的。請將相同的拓樸套用至所有參與的群集。如果其中一個群集在呼叫時不是主要群集，則會等到透過 CDC 套用拓樸後再呼叫。</p>
<h3 id="How-should-I-choose-clusterid" class="common-anchor-header">我應該如何選擇<code translate="no">cluster_id</code> ？<button data-href="#How-should-I-choose-clusterid" class="anchor-icon" translate="no">
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
    </button></h3><p>為每個群集使用穩定、唯一的 ID。ID 也用於 pchannel 名稱和複製拓樸參照。</p>
<h3 id="Can-I-change-pchannels-after-replication-is-configured" class="common-anchor-header">複製配置完成後，我可以變更 pchannel 嗎？<button data-href="#Can-I-change-pchannels-after-replication-is-configured" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以更新拓扑，但 pchannel 列表必须与群集布局相匹配。請將 pchannel 變更視為進階作業，並在完成後仔細驗證複製。</p>
