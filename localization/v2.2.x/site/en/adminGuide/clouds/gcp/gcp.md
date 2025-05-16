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
    </button></h1><p>Milvus is a cloud-native vector database and can be deployed on various cloud environments. This guide walks you through every detail about setting up Milvus on Google Cloud Platform (GCP).</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/gcp-networking.png" alt="Deploy a Milvus cluster on GCP" class="doc-image" id="deploy-a-milvus-cluster-on-gcp" />
    <span>Deploy a Milvus cluster on GCP</span>
  </span>
</p>
<h3 id="Before-you-start" class="common-anchor-header">Before you start</h3><p>To deploy Milvus on GCP, ensure that</p>
<ul>
<li><p>A project already exists in your GCP account.</p>
<p>To create a project, refer to <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Creating and managing projects</a>. The name of the project used in this guide is <strong>milvus-testing-nonprod</strong>.</p></li>
<li><p>You have locally installed <a href="https://cloud.google.com/sdk/docs/quickstart#installing_the_latest_version">gcloud CLI</a>, <a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a>, and <a href="https://helm.sh/docs/intro/install/">Helm</a>, or decided to use the browser-based <a href="https://cloud.google.com/shell">Cloud Shell</a> instead.</p></li>
<li><p>You have <a href="https://cloud.google.com/sdk/docs/install-sdk#initializing_the">initialized the gcloud CLI</a> with your GCP account credentials.</p></li>
</ul>
<h3 id="Set-up-the-network" class="common-anchor-header">Set up the network</h3><p>To ensure Milvus security, you need to create a logically isolated virtual network in your GCP project. The following command creates a VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute networks create milvus-network \
    --project=milvus-testing-nonprod \
    --subnet-mode=auto \
    --mtu=1460 \
    --bgp-routing-mode=regional
<button class="copy-code-btn"></button></code></pre>
<p>To facilitate your work, you also need to set up several firewall rules to allow external traffic over ICMP, RDP, and SSH as well as the traffic within the VPC.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create milvus-network-allow-icmp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows ICMP connections from any source to any instance on the network.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=icmp

gcloud compute firewall-rules create milvus-network-allow-internal \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows connections from any source in the network IP range to any instance on the network using all protocols.&quot;</span> \
    --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">10.128</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">9</span> \
    --action=ALLOW --rules=<span class="hljs-built_in">all</span>

gcloud compute firewall-rules create milvus-network-allow-rdp \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows RDP connections from any source to any instance on the network using port 3389.&quot;</span> \ --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">3389</span>

gcloud compute firewall-rules create milvus-network-allow-ssh \
    --project=milvus-testing-nonprod \
    --network=projects/milvus-testing-nonprod/<span class="hljs-keyword">global</span>/networks/milvus-network \
    --description=<span class="hljs-string">&quot;Allows TCP connections from any source to any instance on the network using port 22.&quot;</span> \ --direction=INGRESS \
    --priority=<span class="hljs-number">65534</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span> \
    --action=ALLOW \
    --rules=tcp:<span class="hljs-number">22</span>
<button class="copy-code-btn"></button></code></pre>
<p>Finally, you need to allow the incoming traffic to the Milvus instance we will create later at port <strong>19530</strong>.</p>
<pre><code translate="no" class="language-bash">gcloud compute firewall-rules create allow-milvus-<span class="hljs-keyword">in</span> \
    --project=milvus-testing-nonprod  \
    --description=<span class="hljs-string">&quot;Allow ingress traffic for Milvus on port 19530&quot;</span> \
    --direction=<span class="hljs-variable constant_">INGRESS</span> \
    --priority=<span class="hljs-number">1000</span> \
    --network=projects/milvus-testing-nonprod/<span class="hljs-variable language_">global</span>/networks/milvus-network \
    --action=<span class="hljs-variable constant_">ALLOW</span> \
    --rules=<span class="hljs-attr">tcp</span>:<span class="hljs-number">19530</span> \
    --source-ranges=<span class="hljs-number">0.0</span><span class="hljs-number">.0</span><span class="hljs-number">.0</span>/<span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Provision-a-Kubernetes-cluster" class="common-anchor-header">Provision a Kubernetes cluster</h3><p>In this guide, we will use the Google Kubernetes Engine (GKE) service to provision a Kubernetes cluster with two nodes in the <strong>us-west1-a</strong> zone. Each node is an <strong>e2-standard-4</strong> Compute Engine virtual machine running the <strong>COS_CONTAINERD</strong> image.</p>
<div class="alert note">
<p>You are advised to use the types of machines that offer a minimum memory of 16 GB to ensure service stability.</p>
</div>
<pre><code translate="no" class="language-bash">gcloud beta container clusters create <span class="hljs-string">&quot;milvus-cluster-1&quot;</span> \
    --project <span class="hljs-string">&quot;milvus-testing-nonprod&quot;</span> \
    --zone <span class="hljs-string">&quot;us-west1-a&quot;</span> \
    --no-enable-basic-auth \
    --cluster-version <span class="hljs-string">&quot;1.20.8-gke.900&quot;</span> \
    --release-channel <span class="hljs-string">&quot;regular&quot;</span> \
    --machine-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;e2-standard-4&quot;</span> \
    --image-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;COS_CONTAINERD&quot;</span> \
    --disk-<span class="hljs-built_in">type</span> <span class="hljs-string">&quot;pd-standard&quot;</span> \
    --disk-size <span class="hljs-string">&quot;100&quot;</span> \
    --<span class="hljs-built_in">max</span>-pods-per-node <span class="hljs-string">&quot;110&quot;</span> \
    --num-nodes <span class="hljs-string">&quot;2&quot;</span> \
    --enable-stackdriver-kubernetes \
    --enable-ip-alias \
    --network <span class="hljs-string">&quot;projects/milvus-testing-nonprod/global/networks/milvus-network&quot;</span> \
    --subnetwork <span class="hljs-string">&quot;projects/milvus-testing-nonprod/regions/us-west1/subnetworks/milvus-network&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>It would take a couple of minutes for the Kubernetes cluster to go up. Once the cluster is ready, use the following command to fetch its credentials so that you can run <code translate="no">kubectl</code> commands in your terminal to communicate with the cluster remotely.</p>
<pre><code translate="no" class="language-bash">gcloud container clusters <span class="hljs-keyword">get</span>-credentials milvus-cluster<span class="hljs-number">-1</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deploy-Milvus" class="common-anchor-header">Deploy Milvus</h3><p>Now the Kubernetes cluster is ready. Let’s deploy Milvus right now.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> service.type=LoadBalancer
<button class="copy-code-btn"></button></code></pre>
<p>In the preceding commands, we add the repo of Milvus Helm charts locally and update the repo to fetch the latest charts. Then we install a Milvus instance and name it <strong>my-release</strong>.</p>
<p>Notice the arguments following the <code translate="no">--set</code> flag, which indicates that we would like to expose the Milvus instance through a Layer-4 load balancer.</p>
<p>If you would like to expose your Milvus instance through a Layer-7 load balancer, <a href="/docs/v2.2.x/gcp_layer7.md">read this</a>.</p>
<h3 id="Verify-the-deployment" class="common-anchor-header">Verify the deployment</h3><p>Once all pods are running, run the following command to view the external IP address and port used to access the Milvus instance.</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> services
<button class="copy-code-btn"></button></code></pre>
<p>The result is similar to the following:</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/gcp.png" alt="Milvus service over a Layer-4 load balancer on GCP" class="doc-image" id="milvus-service-over-a-layer-4-load-balancer-on-gcp" />
    <span>Milvus service over a Layer-4 load balancer on GCP</span>
  </span>
</p>
