---
id: configure_operator.md
title: Configure Milvus with Milvus Operator
related_key: Milvus Operator
summary: Learn how to configure Milvus with Milvus Operator.
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Configure Milvus with Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>In production environment, you need to allocate resources to the Milvus cluster based on machine type and workload. You can configure during deployment or update the configurations while the cluster is running.</p>
<p>This topic introduces how to configure a Milvus cluster when you install it with Milvus Operator.</p>
<p>This topic assumes that you have deployed Milvus Operator. See <a href="/docs/v2.1.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information.</p>
<p>Configuring a Milvus cluster with Milvus Operator includes:</p>
<ul>
<li>Global resource configurations</li>
<li>Private resource configurations</li>
</ul>
<div class="alert note">
Private resource configurations will overwrite global resource configurations. If you configure the resources globally and specify the private resource of a certain component at the same time, the component will prioritize and respond to the private configurations first.
</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Configure global resources<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>When using Milvus Operator to start a Milvus cluster, you need to specify a configuration file. The example here uses the default configuration file.</p>
<pre><code translate="no" class="language-yaml">kubectl apply -f <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>The details of the configuration file is as follows:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  dependencies: {}
  components: {}
  config: {}
<button class="copy-code-btn"></button></code></pre>
<p>The field <code translate="no">spec.components</code> includes both the global and private resource configuration of all Milvus components. The following are four commonly used fields to configure global resource.</p>
<ul>
<li><code translate="no">image</code>: The Milvus docker image used.</li>
<li><code translate="no">resources</code>: The compute resources allocated to each component.</li>
<li><code translate="no">tolerations</code> and <code translate="no">nodeSelector</code>: The scheduling rules of each Milvus component in the K8s cluster. See <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">tolerations</a> and <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> for more information.</li>
<li><code translate="no">env</code>: The environment variables.</li>
</ul>
<p>If you want to configure more fields, see documentation <a href="https://pkg.go.dev/github.com/milvus-io/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">here</a>.</p>
<p>To configure global resource for Milvus cluster, create a <code translate="no">milvuscluster_resource.yaml</code> file.</p>
<h3 id="Example" class="common-anchor-header">Example</h3><p>The following example configures global resource for a Milvus cluster.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    image: milvusdb/milvus:v2.1.0
    nodeSelector: {}
    tolerations: {}
    <span class="hljs-built_in">env</span>: {}
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
<button class="copy-code-btn"></button></code></pre>
<p>Run the following command to apply new configurations:</p>
<pre><code translate="no">kubectl apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Cluster resources will be updated according to the configuration file if there is a Milvus cluster named <code translate="no">my-release</code> in the K8s cluster. Otherwise, a new Milvus cluster will be created.
</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Configure private resources<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Originally in Milvus 2.0, a Milvus cluster includes eight components: proxy, root coord, index coord, data coord, query coord, index node, data node, and query node. However, a new component, mix coord, is released along with Milvus 2.1.0. Mix coord includes all coordinator components. Therefore, starting a mix coord means that you do not need to install and start other coordinators including root coord, index coord, data coord, and query coord.</p>
<p>Common fields used to configure each component include:</p>
<ul>
<li><code translate="no">replica</code>: The number of replicas of each component.</li>
<li><code translate="no">port</code>: The listen port number of each component.</li>
<li>The four commonly used fields in global resource configuration: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (see above). For more configurable fields, click on each component in <a href="https://pkg.go.dev/github.com/milvus-io/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">this documentation</a>.</li>
</ul>
<div class="alert note">
In addition, when configuring proxy, there is an extra field called `serviceType`. This field defines the type of service Milvus provides in the K8s cluster.
</div>
<p>To configure resources for a specific component, add the component name in the field under <code translate="no">spec.componets</code> first and then configure its private resources.</p>
<h3 id="Example" class="common-anchor-header">Example</h3><p>The example below configures the replicas and compute resources of proxy and datanode in the <code translate="no">milvuscluster.yaml</code> file.</p>
<pre><code translate="no">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    image: milvusdb/milvus:v2.1.0
    resources:
      limits:
        cpu: <span class="hljs-string">&#x27;4&#x27;</span>
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;6&#x27;</span>
          memory: <span class="hljs-string">&#x27;10Gi&#x27;</span>
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: <span class="hljs-string">&#x27;2&#x27;</span>
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
This example configures not only global resources but also private compute resources for root coord and proxy. When using this configuration file to start a Milvus cluster, the private resources configurations will be applied to root coord and proxy, while the rest of the components will follow the global resource configuration.
</div>
<p>Run the following command to apply new configurations:</p>
<pre><code translate="no">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Learn how to manage the following Milvus dependencies with Milvus Operator:
<ul>
<li><a href="/docs/v2.1.x/object_storage_operator.md">Configure Object Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.1.x/meta_storage_operator.md">Configure Meta Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.1.x/message_storage_operator.md">Configure Message Storage with Milvus Operator</a></li>
</ul></li>
</ul>
