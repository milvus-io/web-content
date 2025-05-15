---
id: configure_grafana_loki.md
title: Configure Grafana Loki
summary: >-
  This topic describes how to collect logs using Loki and query logs for a
  Milvus cluster using Grafana.
---
<h1 id="Configure-Grafana-Loki" class="common-anchor-header">Configure Grafana Loki<button data-href="#Configure-Grafana-Loki" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide provides instructions on how to configure Loki to collect logs and Grafana to query and display logs for a Milvus cluster.</p>
<p>In this guide, you will learn how to:</p>
<ul>
<li>Deploy <a href="https://grafana.com/docs/loki/latest/get-started/overview/">Loki</a> and <a href="https://grafana.com/docs/loki/latest/send-data/promtail/">Promtail</a> on a Milvus cluster using Helm.</li>
<li>Configure object storage for Loki.</li>
<li>Query logs using Grafana.</li>
</ul>
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
<li>You have <a href="/docs/v2.4.x/install_cluster-helm.md">installed a Milvus cluster on K8s</a>.</li>
<li>You have installed necessary tools, including <a href="https://helm.sh/docs/intro/install/">Helm</a> and <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl</a>.</li>
</ul>
<h2 id="Deploy-Loki" class="common-anchor-header">Deploy Loki<button data-href="#Deploy-Loki" class="anchor-icon" translate="no">
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
    </button></h2><p>Loki is a log aggregation system inspired by Prometheus. Deploy Loki using Helm to collect logs from your Milvus cluster.</p>
<h3 id="1-Add-Grafanas-Helm-Chart-Repository" class="common-anchor-header">1. Add Grafana’s Helm Chart Repository</h3><p>Add Grafana’s chart repository to Helm and update it:</p>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> grafana https:<span class="hljs-comment">//grafana.github.io/helm-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Configure-Object-Storage-for-Loki" class="common-anchor-header">2. Configure Object Storage for Loki</h3><p>Choose one of the following storage options and create a <code translate="no">loki.yaml</code> configuration file:</p>
<ul>
<li><p>Option 1: Using MinIO for storage</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Option 2: Using AWS S3 for storage</p>
<p>In the following example, replace <code translate="no">&lt;accessKey&gt;</code> and <code translate="no">&lt;keyId&gt;</code> with your own S3 access key and ID, <code translate="no">s3.endpoint</code> with the S3 endpoint, and <code translate="no">s3.region</code> with the S3 region.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">loki:</span>
  <span class="hljs-attr">commonConfig:</span>
    <span class="hljs-attr">replication_factor:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">auth_enabled:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">bucketNames:</span>
      <span class="hljs-attr">chunks:</span> <span class="hljs-string">loki-chunks</span>
      <span class="hljs-attr">ruler:</span> <span class="hljs-string">loki-ruler</span>
      <span class="hljs-attr">admin:</span> <span class="hljs-string">loki-admin</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">&#x27;s3&#x27;</span>
    <span class="hljs-attr">s3:</span>
      <span class="hljs-attr">endpoint:</span> <span class="hljs-string">s3.us-west-2.amazonaws.com</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">us-west-2</span>
      <span class="hljs-attr">secretAccessKey:</span> <span class="hljs-string">&lt;accessKey&gt;</span>
      <span class="hljs-attr">accessKeyId:</span> <span class="hljs-string">&lt;keyId&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="3-Install-Loki" class="common-anchor-header">3. Install Loki</h3><p>Run the following commands to install Loki:</p>
<pre><code translate="no" class="language-shell">kubectl create ns loki
helm install --values loki.yaml loki grafana/loki -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Deploy-Promtail" class="common-anchor-header">Deploy Promtail<button data-href="#Deploy-Promtail" class="anchor-icon" translate="no">
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
    </button></h2><p>Promtail is a log collection agent for Loki. It reads logs from Milvus pods and sends them to Loki.</p>
<h3 id="1-Create-Promtail-Configuration" class="common-anchor-header">1. Create Promtail Configuration</h3><p>Create a <code translate="no">promtail.yaml</code> configuration file:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">config:</span>
  <span class="hljs-attr">clients:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-attr">url:</span> <span class="hljs-string">http://loki-gateway/loki/api/v1/push</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Promtail" class="common-anchor-header">2. Install Promtail</h3><p>Install Promtail using Helm:</p>
<pre><code translate="no" class="language-shell">helm install  --values promtail.yaml promtail grafana/promtail -n loki
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-Logs-with-Grafana" class="common-anchor-header">Query Logs with Grafana<button data-href="#Query-Logs-with-Grafana" class="anchor-icon" translate="no">
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
    </button></h2><p>Deploy Grafana and configure it to connect to Loki for querying logs.</p>
<h3 id="1-Deploy-Grafana" class="common-anchor-header">1. Deploy Grafana</h3><p>Install Grafana using the following commands:</p>
<pre><code translate="no" class="language-shell">kubectl create ns monitoring
helm install my-grafana grafana/grafana --namespace monitoring
<button class="copy-code-btn"></button></code></pre>
<p>Before you can access Grafana, you need to retrieve the <code translate="no">admin</code> password:</p>
<pre><code translate="no" class="language-shell">kubectl get secret --namespace monitoring my-grafana -o jsonpath=&quot;{.data.admin-password}&quot; | base64 --decode ; echo
<button class="copy-code-btn"></button></code></pre>
<p>Then, forward the Grafana port to your local machine:</p>
<pre><code translate="no" class="language-shell">export POD_NAME=$(kubectl get pods --namespace monitoring -l &quot;app.kubernetes.io/name=grafana,app.kubernetes.io/instance=my-grafana&quot; -o jsonpath=&quot;{.items[0].metadata.name}&quot;)
kubectl --namespace monitoring port-forward $POD_NAME 3000
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Add-Loki-as-a-Data-Source-in-Grafana" class="common-anchor-header">2. Add Loki as a Data Source in Grafana</h3><p>Once Grafana is running, you need to add Loki as a data source to query logs.</p>
<ol>
<li>Open a web browser and navigate to <code translate="no">127.0.0.1:3000</code>. Log in using the username <code translate="no">admin</code> and the password obtained earlier.</li>
<li>In the left-side menu, choose <strong>Connections</strong> > <strong>Add new connection</strong>.</li>
<li>On the page that appears, choose <strong>Loki</strong> as the data source type. You can enter <strong>loki</strong> in the search bar to find the data source.</li>
<li>In the Loki data source settings, specify the <strong>Name</strong> and <strong>URL</strong>, and then click <strong>Save & test</strong>.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/datasource.jpg" alt="DataSource" class="doc-image" id="datasource" />
    <span>DataSource</span>
  </span>
</p>
<h3 id="3-Query-Milvus-Logs" class="common-anchor-header">3. Query Milvus Logs</h3><p>After adding Loki as a data source, query Milvus logs in Grafana:</p>
<ol>
<li>In the left-side menu, click <strong>Explore</strong>.</li>
<li>In the upper-left corner of the page, choose the loki data source.</li>
<li>Use <strong>Label browser</strong> to select labels and query logs.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/milvuslog.jpg" alt="Query" class="doc-image" id="query" />
    <span>Query</span>
  </span>
</p>
