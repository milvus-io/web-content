---
id: set_up_cdc_replication.md
summary: >-
  Learn how to deploy two Milvus clusters and configure CDC replication between
  them.
title: Set Up CDC Replication
---
<h1 id="Set-Up-CDC-Replication" class="common-anchor-header">Set Up CDC Replication<button data-href="#Set-Up-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide shows how to deploy two standalone Milvus clusters with Milvus Operator and configure CDC replication from a source cluster to a target cluster.</p>
<p>The examples use:</p>
<ul>
<li><code translate="no">source-cluster</code> as the primary cluster.</li>
<li><code translate="no">target-cluster</code> as the standby cluster.</li>
<li><code translate="no">milvus</code> as the namespace for Milvus clusters.</li>
<li><code translate="no">milvus-operator</code> as the namespace for Milvus Operator.</li>
</ul>
<p>Before you begin, read <a href="/docs/milvus_cdc_overview.md">Milvus CDC</a> to understand the primary-standby model and failover options.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus v2.6.16 or later.</li>
<li>Milvus Operator v1.3.4 or later.</li>
<li>A Kubernetes cluster is available.</li>
<li>The source and target clusters can connect to each other over the network.</li>
<li>You have admin credentials for both Milvus clusters.</li>
<li>You know the physical channel count for each cluster.</li>
</ul>
<h2 id="Step-1-Upgrade-Milvus-Operator" class="common-anchor-header">Step 1: Upgrade Milvus Operator<button data-href="#Step-1-Upgrade-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Add the Milvus Operator Helm repository:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech-milvus-operator https://zilliztech.github.io/milvus-operator/
<button class="copy-code-btn"></button></code></pre>
<p>Update the repository:</p>
<pre><code translate="no" class="language-bash">helm repo update zilliztech-milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Install or upgrade Milvus Operator:</p>
<pre><code translate="no" class="language-bash">helm -n milvus-operator upgrade --install milvus-operator \
  zilliztech-milvus-operator/milvus-operator \
  --create-namespace
<button class="copy-code-btn"></button></code></pre>
<p>Check that the operator pod is running:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>Example output:</p>
<pre><code translate="no" class="language-text">NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-6f7d8c9c7d-xm4tj   1/1     Running   0          54s
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Deploy-the-Source-Cluster" class="common-anchor-header">Step 2: Deploy the Source Cluster<button data-href="#Step-2-Deploy-the-Source-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a file named <code translate="no">milvus_source_cluster.yaml</code>:</p>
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
<p>Apply the configuration:</p>
<pre><code translate="no" class="language-bash">kubectl create namespace milvus
kubectl apply -f milvus_source_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Check that the source cluster pods are running:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p>Example output:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
source-cluster-etcd-0                                  1/1     Running   0          3m
source-cluster-minio-6d8f7d9b9f-9t7j2                  1/1     Running   0          3m
source-cluster-milvus-standalone-7f8d9c8f6d-r2m5x      1/1     Running   0          2m
source-cluster-milvus-cdc-66d64747bd-sckxj             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<p>Make sure the CDC pod, such as <code translate="no">source-cluster-milvus-cdc-...</code>, is in the <code translate="no">Running</code> state.</p>
<h2 id="Step-3-Deploy-the-Target-Cluster" class="common-anchor-header">Step 3: Deploy the Target Cluster<button data-href="#Step-3-Deploy-the-Target-Cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a file named <code translate="no">milvus_target_cluster.yaml</code>:</p>
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
<p>The CDC component is enabled on the target cluster as well. It is idle while the target is a standby, but it is needed if the target later becomes the primary after switchover.</p>
<p>Apply the configuration:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f milvus_target_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Check that the target cluster pods are running:</p>
<pre><code translate="no" class="language-bash">kubectl get pods -n milvus | grep -E <span class="hljs-string">&#x27;NAME|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Example output:</p>
<pre><code translate="no" class="language-text">NAME                                                   READY   STATUS    RESTARTS   AGE
target-cluster-etcd-0                                  1/1     Running   0          3m
target-cluster-minio-5f7c8d9b6f-k8s2q                  1/1     Running   0          3m
target-cluster-milvus-standalone-66dc8d9f7f-5n6bp      1/1     Running   0          2m
target-cluster-milvus-cdc-7f8c9d6b8c-q4t9m             1/1     Running   0          2m
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Prepare-Cluster-Information" class="common-anchor-header">Step 4: Prepare Cluster Information<button data-href="#Step-4-Prepare-Cluster-Information" class="anchor-icon" translate="no">
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
    </button></h2><p>Get the Milvus service addresses for both clusters:</p>
<pre><code translate="no" class="language-bash">kubectl get svc -n milvus | grep -E <span class="hljs-string">&#x27;NAME|source-cluster|target-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Example output:</p>
<pre><code translate="no" class="language-text">NAME                                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)              AGE
source-cluster-milvus                 ClusterIP   10.98.124.90     &lt;none&gt;        19530/TCP,9091/TCP   8m
target-cluster-milvus                 ClusterIP   10.109.234.172   &lt;none&gt;        19530/TCP,9091/TCP   3m
<button class="copy-code-btn"></button></code></pre>
<p>Prepare two types of addresses:</p>
<ul>
<li>Cluster addresses are written to the replication configuration and used by CDC components. These addresses must be reachable from the CDC pods.</li>
<li>Client addresses are used only by your Python client when calling Milvus APIs. If you run the Python client outside the Kubernetes cluster, expose the Milvus services through your normal access method, such as a load balancer, ingress, or port-forward.</li>
</ul>
<p>Prepare the connection information and pchannel lists for both clusters:</p>
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
<p>Replace the addresses with the actual Milvus service addresses in your environment. Do not set <code translate="no">source_cluster_addr</code> or <code translate="no">target_cluster_addr</code> to a local port-forward address unless the CDC pods can also reach that address. The pchannel list must match your Milvus deployment. Do not copy the example values without checking your cluster configuration.</p>
<h2 id="Step-5-Create-the-Replication-Configuration" class="common-anchor-header">Step 5: Create the Replication Configuration<button data-href="#Step-5-Create-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Create a replication configuration from <code translate="no">source-cluster</code> to <code translate="no">target-cluster</code>:</p>
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
<h2 id="Step-6-Apply-the-Replication-Configuration" class="common-anchor-header">Step 6: Apply the Replication Configuration<button data-href="#Step-6-Apply-the-Replication-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Apply the same configuration to both clusters:</p>
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
<p>For production automation, use separate short-lived clients for this control-plane operation. This avoids sharing the same gRPC channel with application DML traffic while the cluster role is changing.</p>
<p>After the configuration is applied, changes written to <code translate="no">source-cluster</code> are replicated to <code translate="no">target-cluster</code>.</p>
<h2 id="Step-7-Verify-Data-Replication" class="common-anchor-header">Step 7: Verify Data Replication<button data-href="#Step-7-Verify-Data-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>To verify that replication works:</p>
<ol>
<li>Connect to <code translate="no">source-cluster</code>.</li>
<li>Create a collection.</li>
<li>Insert data into the collection.</li>
<li>Load the collection and run a query or search on <code translate="no">source-cluster</code>.</li>
<li>Connect to <code translate="no">target-cluster</code>.</li>
<li>Run the same query or search on <code translate="no">target-cluster</code> without manually loading the collection on the standby cluster.</li>
<li>Confirm that the expected data is visible on both clusters.</li>
</ol>
<p>The target cluster is a standby cluster in this topology. Do not run manual DDL or DCL operations, such as <code translate="no">load_collection</code>, on the standby cluster. Those operations should be performed on the source cluster and replicated to the target cluster.</p>
<p>The exact verification code depends on your collection schema. For a basic Milvus collection workflow, see the Milvus quick start documentation.</p>
<h2 id="CDC-Lag" class="common-anchor-header">CDC Lag<button data-href="#CDC-Lag" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC lag is the data window between the primary and standby clusters. You should monitor it continuously after replication is configured.</p>
<p>CDC lag can increase when:</p>
<ul>
<li>The primary write rate is high.</li>
<li>Network latency or packet loss increases between clusters.</li>
<li>The standby cluster is overloaded.</li>
<li>CDC nodes are under-provisioned.</li>
<li>Large DDL or import operations are running.</li>
</ul>
<p>Use CDC lag to guide operational decisions:</p>
<ul>
<li>If lag is low, switchover should complete faster.</li>
<li>If lag is high, failover may lose more data.</li>
</ul>
<p>You can estimate CDC lag with the following PromQL query:</p>
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
<p>The result is in seconds. For each source channel, the query compares the latest confirmed WAL timetick with the last timetick replicated by CDC. If a primary replicates to multiple standby clusters, the <code translate="no">min by (channel_name)</code> expression reports the slowest replication progress for that channel.</p>
<p>If Prometheus scrapes multiple Milvus clusters, add label filters that match your deployment, such as <code translate="no">namespace</code> or <code translate="no">app_kubernetes_io_instance</code>, to avoid mixing metrics from different clusters.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="common-anchor-header">Do I need to call <code translate="no">update_replicate_configuration</code> on both clusters?<button data-href="#Do-I-need-to-call-updatereplicateconfiguration-on-both-clusters" class="anchor-icon" translate="no">
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
    </button></h3><p>Yes. Apply the same topology to all participating clusters. If one cluster is not primary at the time of the call, it waits until the topology is applied through CDC.</p>
<h3 id="How-should-I-choose-clusterid" class="common-anchor-header">How should I choose <code translate="no">cluster_id</code>?<button data-href="#How-should-I-choose-clusterid" class="anchor-icon" translate="no">
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
    </button></h3><p>Use a stable, unique ID for each cluster. The ID is also used in pchannel names and replication topology references.</p>
<h3 id="Can-I-change-pchannels-after-replication-is-configured" class="common-anchor-header">Can I change pchannels after replication is configured?<button data-href="#Can-I-change-pchannels-after-replication-is-configured" class="anchor-icon" translate="no">
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
    </button></h3><p>You can update the topology, but the pchannel list must match the cluster layout. Treat pchannel changes as an advanced operation and verify replication carefully afterward.</p>
