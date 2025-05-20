---
id: gcp.md
title: Deploy a Milvus Cluster on GCP
related_key: cluster
summary: Learn how to deploy a Milvus cluster on GCP.
---
<h1 id="Deploy-a-Milvus-Cluster-on-GCP" class="common-anchor-header">Deploy a Milvus Cluster on GCP<button data-href="#Deploy-a-Milvus-Cluster-on-GCP" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to deploy a Milvus cluster on <a href="https://console.cloud.google.com/">Google Cloud Platform</a> (GCP).</p>
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
    </button></h2><p>Determine the Google Cloud project that you want to work with. If you are not sure which one to use, ask your GCP administrators to create a new one. See <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creating and managing projects</a> for more information. The project used in this topic is named <code translate="no">milvus-testing-nonprod</code>. Replace it with your project name in commands.</p>
<h3 id="Software-requirements" class="common-anchor-header">Software requirements</h3><ul>
<li><a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">Cloud SDK</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>Alternatively, you can use <a href="https://cloud.google.com/shell">Cloud Shell</a> which has the GCP SDK, kubectl, and Helm preinstalled.</p>
<div class="alert note">After you install the Cloud SDK, ensure that you are properly authenticated.</div>
<h2 id="Set-up-network" class="common-anchor-header">Set up network<button data-href="#Set-up-network" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensure that you create a virtual private cloud (VPC) before creating a firewall rule for Milvus.
<br>
If you already have a VPC that you want to use, proceed to <a href="/docs/v2.0.x/gcp.md#Create-a-firewall-rule-for-Milvus">Create a firewall rule for Milvus </a>.</p>
<h3 id="Create-a-VPC" class="common-anchor-header">Create a VPC</h3><p>Open a terminal and run the following command to create a VPC.</p>
<div class="alert note">
Replace <code translate="no">milvus-testing-nonprod</code> with your project name.
</div>
<pre><code translate="no" class="language-shell">gcloud compute networks create milvus-network --project=milvus-testing-nonprod --subnet-mode=auto --mtu=1460 --bgp-routing-mode=regional
<button class="copy-code-btn"></button></code></pre>
<p>Run the following commands to create firewall rules to allow ICMP, internal, RDP, and SSH traffic.</p>
<pre><code translate="no" class="language-shell">gcloud compute firewall-rules create milvus-network-allow-icmp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network --description=Allows\ ICMP\ connections\ <span class="hljs-keyword">from</span>\ <span class="hljs-built_in">any</span>\ source\ to\ <span class="hljs-built_in">any</span>\ instance\ on\ the\ network. --direction=INGRESS --priority=<span class="hljs-number">65534</span> --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> --action=ALLOW --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network --description=Allows\ connections\ <span class="hljs-keyword">from</span>\ <span class="hljs-built_in">any</span>\ source\ <span class="hljs-keyword">in</span>\ the\ network\ IP\ <span class="hljs-built_in">range</span>\ to\ <span class="hljs-built_in">any</span>\ instance\ on\ the\ network\ using\ <span class="hljs-built_in">all</span>\ protocols. --direction=INGRESS --priority=<span class="hljs-number">65534</span> --source-ranges=<span class="hljs-number">10.128</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">9</span> --action=ALLOW --rules=<span class="hljs-built_in">all</span>

gcloud compute firewall-rules create milvus-network-allow-rdp --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network --description=Allows\ RDP\ connections\ <span class="hljs-keyword">from</span>\ <span class="hljs-built_in">any</span>\ source\ to\ <span class="hljs-built_in">any</span>\ instance\ on\ the\ network\ using\ port\ <span class="hljs-number">3389.</span> --direction=INGRESS --priority=<span class="hljs-number">65534</span> --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> --action=ALLOW --rules=tcp:<span class="hljs-number">3389</span>

gcloud compute firewall-rules create milvus-network-allow-ssh --project=milvus-testing-nonprod --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network --description=Allows\ TCP\ connections\ <span class="hljs-keyword">from</span>\ <span class="hljs-built_in">any</span>\ source\ to\ <span class="hljs-built_in">any</span>\ instance\ on\ the\ network\ using\ port\ <span class="hljs-number">22.</span> --direction=INGRESS --priority=<span class="hljs-number">65534</span> --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> --action=ALLOW --rules=tcp:<span class="hljs-number">22</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-a-firewall-rule-for-Milvus" class="common-anchor-header">Create a firewall rule for Milvus</h3><p>Create a firewall rule to allow incoming traffic on the <code translate="no">19530</code> port used by Milvus.</p>
<pre><code translate="no" class="language-Apache">gcloud compute --project=milvus-testing-nonprod firewall-rules create allow-milvus-<span class="hljs-keyword">in</span> --description=<span class="hljs-string">&quot;Allow ingress traffic for Milvus on port 19530&quot;</span> --direction=<span class="hljs-variable constant_">INGRESS</span> --priority=<span class="hljs-number">1000</span> --network=projects/milvus-testing-nonprod/<span class="hljs-variable language_">global</span>/networks/milvus-network --action=<span class="hljs-variable constant_">ALLOW</span> --rules=<span class="hljs-attr">tcp</span>:<span class="hljs-number">19530</span> --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Provision a Kubernetes cluster<button data-href="#Provision-a-Kubernetes-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>We use Google Kubernetes Engine (GKE) to provision a K8s cluster. In this topic, we create a cluster that has two nodes. The nodes are in the <code translate="no">use-west1-a</code> zone, are with the <code translate="no">e2-standard-4</code> machine type, and use the <code translate="no">cos_containerd</code> node image.</p>
<div class="alert note">
Modify the preceding options as needed.
</div>
<h3 id="Select-a-machine-type" class="common-anchor-header">Select a machine type</h3><p>In this topic, we use the <code translate="no">e2-standard-4</code> machine type, which has 4 vCPUs and 16 GB of memory.</p>
<div class="alert note">
You can select machine types as you need. However, we recommend that you select machine types that have a minimum of 16 GB of memory to ensure stability.
</div>
<pre><code translate="no" class="language-shell">gcloud beta container --project <span class="hljs-string">&quot;milvus-testing-nonprod&quot;</span> clusters create <span class="hljs-string">&quot;milvus-cluster-1&quot;</span> --zone <span class="hljs-string">&quot;us-west1-a&quot;</span> --no-enable-basic-auth --cluster-version <span class="hljs-string">&quot;1.20.8-gke.900&quot;</span> --release-channel <span class="hljs-string">&quot;regular&quot;</span> --machine-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;e2-standard-4&quot;</span> --image-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;COS_CONTAINERD&quot;</span> --disk-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;pd-standard&quot;</span> --disk-size <span class="hljs-string">&quot;100&quot;</span> --<span class="hljs-built_in">max</span>-pods-per-node <span class="hljs-string">&quot;110&quot;</span> --num-nodes <span class="hljs-string">&quot;2&quot;</span> --enable-stackdriver-kubernetes --enable-ip-alias --network <span class="hljs-string">&quot;projects/milvus-testing-nonprod/global/networks/milvus-network&quot;</span> --subnetwork <span class="hljs-string">&quot;projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Creating a cluster might take several minutes. After the cluster is created, run the following command to fetch credentials for the cluster.</p>
<pre><code translate="no" class="language-shell">gcloud container clusters <span class="hljs-keyword">get</span>-credentials milvus-cluster<span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre>
<p>The preceding command points <code translate="no">kubectl</code> at the cluster.</p>
<h2 id="Deploy-Milvus" class="common-anchor-header">Deploy Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>After provisioning a cluster, you can deploy Milvus. If you switch to a different terminal, run the following command again to fetch credentials.</p>
<pre><code translate="no" class="language-shell">gcloud container clusters <span class="hljs-keyword">get</span>-credentials milvus-cluster<span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>Run the following command to add the Milvus Helm chart repository.</li>
</ol>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//milvus-io.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Run the following command to update your Milvus Helm chart.</li>
</ol>
<pre><code translate="no" class="language-Apache">helm repo update
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Run the following command to deploy Milvus.</li>
</ol>
<div class="alert note">
This topic uses the <code translate="no">my-release</code> release name. Replace it with your release name.
</div>
<pre><code translate="no" class="language-shell">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=LoadBalancer
<button class="copy-code-btn"></button></code></pre>
<p>Starting pods might take several minutes. Run <code translate="no">kubectl get services</code> to view services. If successful, a list of services is shown as follows.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/gcp.png" alt="GCP" class="doc-image" id="gcp" />
    <span>GCP</span>
  </span>
</p>
<div class="alert note">
<p><code translate="no">34.145.26.89</code> in the the <code translate="no">EXTERNAL-IP</code> column is the IP address of the load balancer. The IP address is used to connect to Milvus.</p>
</div>
<h2 id="Use-Google-Cloud-Storage" class="common-anchor-header">Use Google Cloud Storage<button data-href="#Use-Google-Cloud-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Google Cloud Storage (GCS) is Google Cloud’s version of AWS Simple Storage Service (S3).</p>
<p>MinIO GCS Gateway allows accessing GCS. Essentially, MinIO GCS Gateway translates and forwards all connections to GCS by using APIs. You can use MinIO GCS Gateway instead of a MinIO server.</p>
<h3 id="Set-variables" class="common-anchor-header">Set variables</h3><p>Set variables before you use MinIO GCS Gateway. Modify the default values as needed.</p>
<h4 id="Secrets" class="common-anchor-header">Secrets</h4><p>To access GCS resources, MinIO GCS Gateway requires both GCP service account credentials and MinIO credentials. Store the credentials in a K8s secret. The credentials are listed as follows.</p>
<ul>
<li><code translate="no">accesskey</code>: The MinIO access key.</li>
<li><code translate="no">secretkey</code>: The MinIO secret key.</li>
<li><code translate="no">gcs_key.json</code>: The GCP service account credentials file.</li>
</ul>
<p>The following example creates a secret named <code translate="no">mysecret</code> with <code translate="no">accesskey=minioadmin</code>, <code translate="no">secretkey=minioadmin</code>, and <code translate="no">gcs_key.json</code> using the <code translate="no">/home/credentials.json</code> path.</p>
<pre><code translate="no" class="language-shell">$ kubectl create secret generic mysecret --<span class="hljs-keyword">from</span>-literal=accesskey=minioadmin --<span class="hljs-keyword">from</span>-literal=secretkey=minioadmin --<span class="hljs-keyword">from</span>-file=gcs_key.<span class="hljs-property">json</span>=<span class="hljs-regexp">/home/</span>credentials.<span class="hljs-property">json</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
If you choose <code translate="no">accesskey</code> and <code translate="no">secretkey</code> values other than the default <code translate="no">minioadmin/minioadmin</code>, you need to update the <code translate="no">minio.accessKey</code> and <code translate="no">minio.secretKey</code> metadata variables as well.
</div>
<h4 id="Metadata" class="common-anchor-header">Metadata</h4><p>The following table lists the metadata that you can configure.</p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Description</th><th style="text-align:left">Default</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left"><code translate="no">minio.mode</code></td><td style="text-align:left">Set the value to <code translate="no">standalone</code> to enable MinIO GCS Gateway.</td><td style="text-align:left"><code translate="no">distributed</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.gcsgateway.enabled</code></td><td style="text-align:left">Set the value to <code translate="no">true</code> to enable MinIO GCS Gateway.</td><td style="text-align:left"><code translate="no">false</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.gcsgateway.projectId</code></td><td style="text-align:left">The ID of the GCP project.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.existingSecret</code></td><td style="text-align:left">The name of the previously defined secret.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
<tr><td style="text-align:left"><code translate="no">externalGcs.bucketName</code></td><td style="text-align:left">The name of the GCS bucket to use. Unlike an S3/MinIO bucket, a GCS bucket must be globally unique.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
</tbody>
</table>
<p>The following table lists the metadata that you might want to leave as default.</p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Description</th><th style="text-align:left">Default</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left"><code translate="no">minio.gcsgateway.replicas</code></td><td style="text-align:left">The number of replica nodes to use for the gateway. We recommend that you use one because MinIO does not support well for more than one replica.</td><td style="text-align:left"><code translate="no">1</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.gcsgateway.gcsKeyJson</code></td><td style="text-align:left">The file path to GCS service account access credentials file. Do <strong>not</strong> modify the default value.</td><td style="text-align:left"><code translate="no">/etc/credentials/gcs_key.json</code></td></tr>
</tbody>
</table>
<p>Continue to use all normal MinIO metadata variables.</p>
<p>The following example installs a chart named <code translate="no">my-release</code>.</p>
<pre><code translate="no" class="language-shell">$ helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> minio.existingSecret=mysecret --<span class="hljs-built_in">set</span> minio.gcsgateway.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> minio.gcsgateway.projectId=milvus-testing-nonprod --<span class="hljs-built_in">set</span> externalGcs.bucketName=milvus-bucket-example --<span class="hljs-built_in">set</span> minio.mode=standalone
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
    </button></h2><p>If you want to learn how to deploy Milvus on other clouds:</p>
<ul>
<li><a href="/docs/v2.0.x/aws.md">Deploy a Milvus Cluster on EC2</a></li>
<li><a href="/docs/v2.0.x/eks.md">Deploy a Milvus Cluster on EKS</a></li>
<li><a href="/docs/v2.0.x/azure.md">Deploy a Milvus Cluster on Azure</a></li>
</ul>
