---
id: deploy_pulsar.md
title: Configure Message Storage with Docker Compose or Helm
related_key: 'Pulsar, storage'
summary: Learn how to configure message storage with Docker Compose or Helm.
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">Configure Message Storage with Docker Compose or Helm<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus uses Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. Pulsar is the default message storage system. This topic introduces how to configure message storage with Docker Compose or Helm.</p>
<p>You can configure Pulsar with <a href="https://docs.docker.com/get-started/overview/">Docker Compose</a> or on K8s and configure Kafka on K8s.</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">Configure Pulsar with Docker Compose<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1. Configure Pulsar</h3><p>To configure Pulsar with Docker Compose, provide your values for the <code translate="no">pulsar</code> section in the <code translate="no">milvus.yaml</code> file on the milvus/configs path.</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>See <a href="/docs/v2.2.x/configure_pulsar.md">Pulsar-related configurations</a> for more information.</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2. Run Milvus</h3><p>Run the following command to start Milvus that uses the Pulsar configurations.</p>
<pre><code translate="no">docker-compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Configurations only take effect after Milvus starts. See <a href=https://milvus.io/docs/install_standalone-docker.md#Start-Milvus>Start Milvus</a> for more information.</div>
<h2 id="Configure-Pulsar-on-K8s" class="common-anchor-header">Configure Pulsar on K8s<button data-href="#Configure-Pulsar-on-K8s" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Configure-Pulsar-on-K8s" class="common-anchor-header">Configure Pulsar on K8s</h3><p>For Milvus clusters on K8s, you can configure Pulsar in the same command that starts Milvus. Alternatively, you can configure Pulsar using the <code translate="no">values.yml</code> file on the /charts/milvus path in the <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> repository before you start Milvus.</p>
<p>The following table lists the keys for configuring Pulsar in the YAML file.</p>
<table>
<thead>
<tr><th>Key</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">pulsar.enabled</code></td><td>Enables or disables Pulsar.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalPulsar.enabled</code></td><td>Enables or disables external Pulsar.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalPulsar.host</code></td><td>The endpoint to access external Pulsar.</td><td></td></tr>
<tr><td><code translate="no">externalPulsar.port</code></td><td>The port to access external Pulsar.</td><td></td></tr>
</tbody>
</table>
<h4 id="Using-the-YAML-file" class="common-anchor-header">Using the YAML file</h4><ol>
<li>Configure the <code translate="no">pulsar</code> section in the <code translate="no">values.yaml</code> file.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure the <code translate="no">externalPulsar</code> section using your values in the <code translate="no">values.yaml</code> file.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalPulsar</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
  <span class="hljs-attr">host</span>: &lt;your_pulsar_IP&gt;
  <span class="hljs-attr">port</span>: &lt;your_pulsar_port&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>After configuring the preceding sections and saving the <code translate="no">values.yaml</code> file, run the following command to install Milvus that uses the Pulsar configurations.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h4 id="Using-a-command" class="common-anchor-header">Using a command</h4><p>To install Milvus and configure Pulsar, run the following command using your values.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalPulsar.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalPulsar.host=&lt;your_pulsar_IP&gt; --<span class="hljs-built_in">set</span> externalPulsar.port=&lt;your_pulsar_port&gt;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-Kafka-on-K8s" class="common-anchor-header">Configure Kafka on K8s</h3><p>For Milvus clusters on K8s, you can configure Kafka in the same command that starts Milvus. Alternatively, you can configure Kafka using the <code translate="no">values.yml</code> file on the /charts/milvus path in the <a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a> repository before you start Milvus.</p>
<p>The following table lists the keys for configuring Pulsar in the YAML file.</p>
<table>
<thead>
<tr><th>Key</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">kafka.enabled</code></td><td>Enables or disables Kafka.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalKafka.enabled</code></td><td>Enables or disables external Kafka.</td><td><code translate="no">true</code>/<code translate="no">false</code></td></tr>
<tr><td><code translate="no">externalKafka.brokerlist</code></td><td>The brokerlist to access external Kafka.</td><td></td></tr>
</tbody>
</table>
<p>The following table lists the mandatory configurations for external Kafka. Set them in Kafka configurations.</p>
<table>
<thead>
<tr><th>Key</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max.request.size</code></td><td>The maximum size of a request in bytes.</td><td><code translate="no">5242880</code></td></tr>
<tr><td><code translate="no">message.max.bytes</code></td><td>The largest record batch size allowed by Kafka.</td><td><code translate="no">10485760</code></td></tr>
<tr><td><code translate="no">auto.create.topics.enable</code></td><td>Enable auto creation of topic on the server.</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">num.partitions</code></td><td>The default number of log partitions per topic.</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
<h4 id="Using-the-YAML-file" class="common-anchor-header">Using the YAML file</h4><ol>
<li>Configure the <code translate="no">kafka</code> section in the <code translate="no">values.yaml</code> file if you want to use Kafka as the message storage system.</li>
</ol>
<pre><code translate="no" class="language-yaml">kafka:
  enabled: <span class="hljs-literal">true</span>
  name: kafka
  replicaCount: 3
  image:
    repository: bitnami/kafka
    tag: 3.1.0-debian-10-r52
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Configure the <code translate="no">externalKafka</code> section using your values in the <code translate="no">values.yaml</code> file if you want to use external Kafka as the message storage system.</li>
</ol>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">externalKafka</span>:
  <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>
  <span class="hljs-attr">brokerList</span>: &lt;your_kafka_IP&gt;:&lt;your_kafka_port&gt;
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>After configuring the preceding sections and saving the <code translate="no">values.yaml</code> file, run the following command to install Milvus that uses the Kafka configurations.</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h4 id="Using-a-command" class="common-anchor-header">Using a command</h4><p>To install Milvus and configure Kafka, run the following command using your values.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> kafka.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>To install Milvus and configure external Kafka, run the following command using your values.</p>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalKafka.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalKafka.brokerlist=&lt;your_kafka_IP&gt;:&lt;your_kafka_port&gt;
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
    </button></h2><p>Learn how to configure other Milvus dependencies with Docker Compose or Helm:</p>
<ul>
<li><a href="/docs/v2.2.x/deploy_s3.md">Configure Object Storage with Docker Compose or Helm</a></li>
<li><a href="/docs/v2.2.x/deploy_etcd.md">Configure Meta Storage with Docker Compose or Helm</a></li>
</ul>
