---
id: message_storage_operator.md
title: Configure Message Storage with Milvus Operator
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Learn how to configure message storage with Milvus Operator.
---
<h1 id="Configure-Message-Storage-with-Milvus-Operator" class="common-anchor-header">Configure Message Storage with Milvus Operator<button data-href="#Configure-Message-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus uses RocksMQ, Pulsar or Kafka for managing logs of recent changes, outputting stream logs, and providing log subscriptions. This topic introduces how to configure message storage dependencies when you install Milvus with Milvus Operator. For more details, refer to <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/message-storage.md">Configure Message Storage with Milvus Operator</a> in the Milvus Operator repository.</p>
<p>This topic assumes that you have deployed Milvus Operator.</p>
<div class="alert note">See <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information. </div>
<p>You need to specify a configuration file for using Milvus Operator to start a Milvus cluster.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>You only need to edit the code template in <code translate="no">milvus_cluster_default.yaml</code> to configure third-party dependencies. The following sections introduce how to configure object storage, etcd, and Pulsar respectively.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>The table below shows whether RocksMQ, NATS, Pulsar, and Kafka are supported in Milvus standalone and cluster mode.</p>
<table>
<thead>
<tr><th style="text-align:center"></th><th style="text-align:center">RocksMQ</th><th style="text-align:center">NATS</th><th style="text-align:center">Pulsar</th><th style="text-align:center">Kafka</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">Standalone mode</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
<tr><td style="text-align:center">Cluster mode</td><td style="text-align:center">✖️</td><td style="text-align:center">✖️</td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td></tr>
</tbody>
</table>
<p>There are also other limitations for specifying the message storage:</p>
<ul>
<li>Only one message storage for one Milvus instance is supported. However we still have backward compatibility with multiple message storages set for one instance. The priority is as follows:
<ul>
<li>standalone mode:  RocksMQ (default) > Pulsar > Kafka</li>
<li>cluster mode: Pulsar (default) > Kafka</li>
<li>Nats introduced in 2.3 do not participate in these priority rules for backward compatibility.</li>
</ul></li>
<li>The message storage cannot be changed while the Milvus system is running.</li>
<li>Only Kafka 2.x or 3.x verison is supported.</li>
</ul>
<h2 id="Configure-RocksMQ" class="common-anchor-header">Configure RocksMQ<button data-href="#Configure-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><p>RocksMQ is the default message storage in Milvus standalone.</p>
<div class="alert note">
<p>Currently, you can only configure RocksMQ as the message storage for Milvus standalone with Milvus Operator.</p>
</div>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures a RocksMQ service.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">standalone</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">rocksmq</span>
    <span class="hljs-attr">rocksmq:</span>
      <span class="hljs-attr">persistence:</span>
        <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">pvcDeletion:</span> <span class="hljs-literal">true</span>
        <span class="hljs-attr">persistentVolumeClaim:</span>
          <span class="hljs-attr">spec:</span>
            <span class="hljs-attr">accessModes:</span> [<span class="hljs-string">&quot;ReadWriteOnce&quot;</span>]
            <span class="hljs-attr">storageClassName:</span> <span class="hljs-string">&quot;local-path&quot;</span>  <span class="hljs-comment"># Specify your storage class</span>
            <span class="hljs-attr">resources:</span>
              <span class="hljs-attr">requests:</span>
                <span class="hljs-attr">storage:</span> <span class="hljs-string">10Gi</span>  <span class="hljs-comment"># Specify your desired storage size</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h5 id="Key-configuration-options" class="common-anchor-header">Key configuration options:</h5><ul>
<li><code translate="no">msgStreamType</code>: rocksmq: Explicitly sets RocksMQ as the message queue</li>
<li><code translate="no">persistence.enabled</code>: Enables persistent storage for RocksMQ data</li>
<li><code translate="no">persistence.pvcDeletion</code>: When true, the PVC will be deleted when the Milvus instance is deleted</li>
<li><code translate="no">persistentVolumeClaim.spec</code>: Standard Kubernetes PVC specification</li>
<li><code translate="no">accessModes</code>: Typically <code translate="no">ReadWriteOnce</code> for block storage</li>
<li><code translate="no">storageClassName</code>: Your cluster’s storage class</li>
<li><code translate="no">storage</code>: Size of the persistent volume</li>
</ul>
<h2 id="Configure-NATS" class="common-anchor-header">Configure NATS<button data-href="#Configure-NATS" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS is an alternative message storage for NATS.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures a NATS service.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> 
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&#x27;natsmq&#x27;</span>
    <span class="hljs-attr">natsmq:</span>
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      <span class="hljs-attr">server:</span> 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        <span class="hljs-attr">port:</span> <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        <span class="hljs-attr">storeDir:</span> <span class="hljs-string">/var/lib/milvus/nats</span> 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        <span class="hljs-attr">maxFileStore:</span> <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        <span class="hljs-attr">maxPayload:</span> <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        <span class="hljs-attr">maxPending:</span> <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        <span class="hljs-attr">initializeTimeout:</span> <span class="hljs-number">4000</span> 
        <span class="hljs-attr">monitor:</span>
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          <span class="hljs-attr">debug:</span> <span class="hljs-literal">false</span> 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          <span class="hljs-attr">logTime:</span> <span class="hljs-literal">true</span> 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          <span class="hljs-attr">logFile:</span> 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          <span class="hljs-attr">logSizeLimit:</span> <span class="hljs-number">0</span> 
        <span class="hljs-attr">retention:</span>
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          <span class="hljs-attr">maxAge:</span> <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          <span class="hljs-attr">maxBytes:</span>
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          <span class="hljs-attr">maxMsgs:</span> 
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>To migrate the message storage from RocksMQ to NATS, do as follows:</p>
<ol>
<li><p>Stop all DDL operations.</p></li>
<li><p>Call the FlushAll API and then stop Milvus once the API call finishes executing.</p></li>
<li><p>Change <code translate="no">msgStreamType</code> to <code translate="no">natsmq</code> and make necessary changes to NATS settings in <code translate="no">spec.dependencies.natsmq</code>.</p></li>
<li><p>Start Milvus again and check whether:</p>
<ul>
<li>A log entry that reads <code translate="no">mqType=natsmq</code> is present in the logs.</li>
<li>A directory named <code translate="no">jetstream</code> is present in the directory specified in <code translate="no">spec.dependencies.natsmq.server.storeDir</code>.</li>
</ul></li>
<li><p>(Optional) Back up and clean up the data files in the RocksMQ storage directory.</p></li>
</ol>
<div class="alert note">
<p><strong>Choose between RocksMQ and NATS?</strong></p>
<p>RockMQ uses CGO to interact with RocksDB and manages the memory by itself, while the pure-GO NATS embedded in the Milvus installation delegates its memory management to Go’s garbage collector (GC).</p>
<p>In the scenario where the data packet is smaller than 64 kb, RocksDB outperforms in terms of memory usage, CPU usage, and response time. On the other hand, if the data packet is greater than 64 kb, NATS excels in terms of response time with sufficient memory and ideal GC scheduling.</p>
<p>Currently, you are advised to use NATS only for experiments.</p>
</div>
<h2 id="Configure-Pulsar" class="common-anchor-header">Configure Pulsar<button data-href="#Configure-Pulsar" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar manages logs of recent changes, outputs stream logs, and provides log subscriptions. Configuring Pulsar for message storage is supported in both Milvus standalone and Milvus cluster. However, with Milvus Operator, you can only configure Pulsar as message storage for Milvus cluster. Add required fields under <code translate="no">spec.dependencies.pulsar</code> to configure Pulsar.</p>
<p><code translate="no">pulsar</code> supports <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<h3 id="External-Pulsar" class="common-anchor-header">External Pulsar</h3><p><code translate="no">external</code> indicates using an external Pulsar service.
Fields used to configure an external Pulsar service include:</p>
<ul>
<li><code translate="no">external</code>:  A <code translate="no">true</code> value indicates that Milvus uses an external Pulsar service.</li>
<li><code translate="no">endpoints</code>: The endpoints of Pulsar.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external Pulsar service.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">pulsar:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external pulsar as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new pulsar inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external pulsar endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:6650</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}           
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-Pulsar" class="common-anchor-header">Internal Pulsar</h3><p><code translate="no">inCluster</code> indicates when a Milvus cluster starts, a Pulsar service starts automatically in the cluster.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an internal Pulsar service.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">pulsar:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">components:</span>
            <span class="hljs-attr">autorecovery:</span> <span class="hljs-literal">false</span>
          <span class="hljs-attr">zookeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
          <span class="hljs-attr">bookkeeper:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">resoureces:</span>
              <span class="hljs-attr">limit:</span>
                <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
          <span class="hljs-attr">broker:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
            <span class="hljs-attr">configData:</span>
              <span class="hljs-comment">## Enable `autoSkipNonRecoverableData` since bookkeeper is running</span>
              <span class="hljs-comment">## without persistence</span>
              <span class="hljs-attr">autoSkipNonRecoverableData:</span> <span class="hljs-string">&quot;true&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultEnsembleSize:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultWriteQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
              <span class="hljs-attr">managedLedgerDefaultAckQuorum:</span> <span class="hljs-string">&quot;1&quot;</span>
          <span class="hljs-attr">proxy:</span>
            <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">1</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}            
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">This example specifies the numbers of replicas of each component of Pulsar, the compute resources of Pulsar BookKeeper, and other configurations.</div>
<div class="alert note">Find the complete configuration items to configure an internal Pulsar service in <a href="https://artifacthub.io/packages/helm/apache/pulsar/2.7.8?modal=values">values.yaml</a>. Add configuration items as needed under <code translate="no">pulsar.inCluster.values</code> as shown in the preceding example.</div>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka" class="common-anchor-header">Configure Kafka<button data-href="#Configure-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Pulsar is the default message storage in a Milvus cluster. If you want to use Kafka, add the optional field <code translate="no">msgStreamType</code> to configure Kafka.</p>
<p><code translate="no">kafka</code> supports <code translate="no">external</code> and <code translate="no">inCluster</code>.</p>
<h3 id="External-Kafka" class="common-anchor-header">External Kafka</h3><p><code translate="no">external</code> indicates using an external Kafka service.</p>
<p>Fields used to configure an external Kafka service include:</p>
<ul>
<li><code translate="no">external</code>: A <code translate="no">true</code> value indicates that Milvus uses an external Kafka service.</li>
<li><code translate="no">brokerList</code>: The list of brokers to send the messages to.</li>
</ul>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an external Kafka service.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-comment"># securityProtocol supports: PLAINTEXT, SSL, SASL_PLAINTEXT, SASL_SSL </span>
      <span class="hljs-attr">securityProtocol:</span> <span class="hljs-string">PLAINTEXT</span>
      <span class="hljs-comment"># saslMechanisms supports: PLAIN, SCRAM-SHA-256, SCRAM-SHA-512</span>
      <span class="hljs-attr">saslMechanisms:</span> <span class="hljs-string">PLAIN</span>
      <span class="hljs-attr">saslUsername:</span> <span class="hljs-string">&quot;&quot;</span>
      <span class="hljs-attr">saslPassword:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-comment"># Omit other fields ...</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">brokerList:</span> 
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr1:9092&quot;</span>
        <span class="hljs-bullet">-</span> <span class="hljs-string">&quot;kafkaBrokerAddr2:9092&quot;</span>
        <span class="hljs-comment"># ...</span>
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<p>SASL configurations are supported in operator v0.8.5 or higher version.</p>
</blockquote>
<h3 id="Internal-Kafka" class="common-anchor-header">Internal Kafka</h3><p><code translate="no">inCluster</code> indicates when a Milvus cluster starts, a Kafka service starts automatically in the cluster.</p>
<h4 id="Example" class="common-anchor-header">Example</h4><p>The following example configures an internal Kafka service.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span> 
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">msgStreamType:</span> <span class="hljs-string">&quot;kafka&quot;</span>
    <span class="hljs-attr">kafka:</span>
      <span class="hljs-attr">inCluster:</span> 
        <span class="hljs-attr">values:</span> {} <span class="hljs-comment"># values can be found in https://artifacthub.io/packages/helm/bitnami/kafka</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>Find the complete configuration items to configure an internal Kafka service <a href="https://artifacthub.io/packages/helm/bitnami/kafka">here</a>. Add configuration items as needed under <code translate="no">kafka.inCluster.values</code>.</p>
<p>Assuming that the configuration file is named <code translate="no">milvuscluster.yaml</code>, run the following command to apply the configuration.</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
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
    </button></h2><p>Learn how to configure other Milvus dependencies with Milvus Operator:</p>
<ul>
<li><a href="/docs/v2.5.x/object_storage_operator.md">Configure Object Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.5.x/meta_storage_operator.md">Configure Meta Storage with Milvus Operator</a></li>
</ul>
