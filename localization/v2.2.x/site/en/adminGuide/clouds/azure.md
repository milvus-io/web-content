---
id: azure.md
title: Deploying Milvus on Microsoft Azure With Kubernetes
related_key: cluster
summary: Learn how to deploy a Milvus cluster on Azure.
---
<h1 id="Deploy-Milvus-on-Azure-with-AKS" class="common-anchor-header">Deploy Milvus on Azure with AKS<button data-href="#Deploy-Milvus-on-Azure-with-AKS" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to provision and create a cluster with <a href="https://azure.microsoft.com/en-us/services/kubernetes-service/#overview">Azure Kubernetes Service</a> (AKS) and the <a href="https://portal.azure.com">Azure portal</a>.</p>
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
    </button></h2><p>Ensure that your Azure project has been set up properly and you have access to the resources that you want to use. Contact your administrators if you are not sure about your access permission.</p>
<h3 id="Software-requirements" class="common-anchor-header">Software requirements</h3><ul>
<li><a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli#install">Azure CLI</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
</ul>
<p>Alternatively, you can use the <a href="https://learn.microsoft.com/en-us/azure/cloud-shell/overview">Cloud Shell</a> which has the Azure CLI, kubectl, and Helm preinstalled.</p>
<div class="alert note">After you install the Azure CLI, ensure that you are properly authenticated. </div>
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
    </button></h2><ol>
<li>Log on to the Azure portal.</li>
<li>On the Azure portal menu or from the <strong>Home</strong> page, select <strong>Create a resource</strong>.</li>
<li>Select <strong>Containers</strong> &gt; <strong>Kubernetes Service</strong>.</li>
<li>On the <strong>Basics</strong> page, configure the following options:</li>
</ol>
<ul>
<li><p><strong>Project details</strong>:</p>
<ul>
<li><p><strong>Subscription</strong>: Contact your organization’s Azure Administrator to determine which subscription you should use.</p>
<ul>
<li><strong>Resource group</strong>: Contact your organization’s Azure Administrator to determine which resource group you should use.</li>
</ul></li>
</ul></li>
<li><p><strong>Cluster details</strong>:</p>
<ul>
<li><p><strong>Kubernetes cluster name</strong>: Enter a cluster name.</p></li>
<li><p><strong>Region</strong>: Select a region.</p></li>
<li><p><strong>Availability zones</strong>: Select <a href="https://docs.microsoft.com/en-us/azure/aks/availability-zones#overview-of-availability-zones-for-aks-clusters">availability zones</a> as you need. For production clusters, we recommend that you select multiple availability zones.</p></li>
</ul></li>
<li><p><strong>Primary node pool</strong>:</p>
<ul>
<li><p><strong>Node size</strong>: We recommend that you choose VMs with a minimum of 16 GB of RAM, but you can select virtual machine sizes as you need.</p></li>
<li><p><strong>Scale method</strong>: Choose a scale method.</p></li>
<li><p><strong>Node count range</strong>: Select a range for the number of nodes.</p></li>
</ul></li>
<li><p><strong>Node pools</strong>:</p>
<ul>
<li><p><strong>Enable virtual nodes</strong>: Select the checkbox to enable virtual nodes.</p></li>
<li><p><strong>Enable virtual machine scale sets</strong>: We recommend that you choose <code translate="no">enabled</code>.</p></li>
</ul></li>
<li><p><strong>Networking</strong>:</p>
<ul>
<li><p><strong>Network configuration</strong>: We recommend that you choose <code translate="no">Kubenet</code>.</p></li>
<li><p><strong>DNS name prefix</strong>: Enter a DNS name prefix.</p></li>
<li><p><strong>Traffic Routing</strong>:</p>
<ul>
<li><p><strong>Load balancer</strong>: <code translate="no">Standard</code>.</p></li>
<li><p><strong>HTTP application routing</strong>: Not required.</p></li>
</ul></li>
</ul></li>
</ul>
<ol start="5">
<li>After configuring the options, click <strong>Review + create</strong> and then <strong>Create</strong> when validation completes. It takes a few minutes to create the cluster.</li>
</ol>
<h2 id="Deploy-Milvus-with-Helm" class="common-anchor-header">Deploy Milvus with Helm<button data-href="#Deploy-Milvus-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>After the cluster is created, install Milvus on the cluster with Helm.</p>
<h3 id="Connect-to-the-cluster" class="common-anchor-header">Connect to the cluster</h3><ol>
<li>Navigate to the cluster that you have created in Kubernetes services and click it.</li>
<li>On the left-side navigation pane, click <code translate="no">Overview</code>.</li>
<li>On the <strong>Overview</strong> page that appears, click <strong>Connect</strong> to view the resource group and subscription.

  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/azure.png" alt="Azure" class="doc-image" id="azure" />
    <span>Azure</span>
  </span>
</li>
</ol>
<h3 id="Set-a-subscription-and-credentials" class="common-anchor-header">Set a subscription and credentials</h3><div class="alert note">You can use Azure Cloud Shell to perform the following procedures.</div>
<ol>
<li>Run the following command to set your subscription.</li>
</ol>
<pre><code translate="no" class="language-shell">az account <span class="hljs-built_in">set</span> --subscription EXAMPLE-SUBSCRIPTION-ID
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Run the following command to download credentials and configure the Kubernetes CLI to use them.</li>
</ol>
<pre><code translate="no" class="language-shell">az aks <span class="hljs-keyword">get</span>-credentials --resource-<span class="hljs-keyword">group</span> YOUR-RESOURCE-GROUP --name YOUR-CLUSTER-NAME
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Use the same shell for the following procedures. If you switch to another shell, run the preceding commands again.
</div>
<h3 id="Deploy-Milvus" class="common-anchor-header">Deploy Milvus</h3><ol>
<li>Run the following command to add the Milvus Helm chart repository.</li>
</ol>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Run the following command to update your Milvus Helm chart.</li>
</ol>
<pre><code translate="no" class="language-shell">helm repo update
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Run the following command to install Milvus.</li>
</ol>
<div class="alert note">
This topic uses <code translate="no">my-release</code> as the release name. Replace it with your release name.
</div>
<pre><code translate="no" class="language-shell">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=LoadBalancer
<button class="copy-code-btn"></button></code></pre>
<p>Starting pods might take several minutes. Run <code translate="no">kubectl get services</code> to view services. If successful, a list of services is shown as follows.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/azure_results.png" alt="Results" class="doc-image" id="results" />
    <span>Results</span>
  </span>
</p>
<div class="alert note">
<code translate="no">20.81.111.155</code> in the the <code translate="no">EXTERNAL-IP</code> column is the IP address of the load balancer. The default Milvus port is <code translate="no">19530</code>.
</div>
<h2 id="Using-Azure-Blob-Storage" class="common-anchor-header">Using Azure Blob Storage<button data-href="#Using-Azure-Blob-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>Azure Blob Storage is Azure’s version of AWS Simple Storage Service (S3).</p>
<p><a href="https://blog.min.io/deprecation-of-the-minio-gateway/">MinIO Azure Gateway</a> allows accessing Azure. Essentially, MinIO Azure Gateway translates and forwards all connections to Azure by using APIs. You can use MinIO Azure Gateway instead of a MinIO server.</p>
<h3 id="Set-variables" class="common-anchor-header">Set variables</h3><p>Set variables before you use MinIO Azure Gateway. Modify the default values as needed.</p>
<h4 id="Metadata" class="common-anchor-header">Metadata</h4><p>The following table lists the metadata that you can configure.</p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Description</th><th style="text-align:left">Default</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left"><code translate="no">minio.azuregateway.enabled</code></td><td style="text-align:left">Set the value to <code translate="no">true</code> to enable MinIO Azure Gateway.</td><td style="text-align:left"><code translate="no">false</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.accessKey</code></td><td style="text-align:left">The MinIO access key.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
<tr><td style="text-align:left"><code translate="no">minio.secretKey</code></td><td style="text-align:left">The MinIO secret key.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
<tr><td style="text-align:left"><code translate="no">externalAzure.bucketName</code></td><td style="text-align:left">The name of the Azure bucket to use. Unlike an S3/MinIO bucket, an Azure bucket must be globally unique.</td><td style="text-align:left"><code translate="no">&quot;&quot;</code></td></tr>
</tbody>
</table>
<p>The following table lists the metadata that you might want to leave as default.</p>
<table>
<thead>
<tr><th style="text-align:left">Option</th><th style="text-align:left">Description</th><th style="text-align:left">Default</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left"><code translate="no">minio.azuregateway.replicas</code></td><td style="text-align:left">The number of replica nodes to use for the gateway. We recommend that you use one because MinIO does not support well for more than one replica.</td><td style="text-align:left"><code translate="no">1</code></td></tr>
</tbody>
</table>
<p>Continue to use all predefined MinIO metadata variables.</p>
<p>The following example installs a chart named <code translate="no">my-release</code>.</p>
<pre><code translate="no" class="language-shell">helm install my-release ./milvus --<span class="hljs-built_in">set</span> service.type=LoadBalancer --<span class="hljs-built_in">set</span> minio.persistence.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> externalAzure.bucketName=milvusbuckettwo --<span class="hljs-built_in">set</span> minio.azuregateway.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> minio.azuregateway.replicas=1 --<span class="hljs-built_in">set</span> minio.accessKey=milvusstorage --<span class="hljs-built_in">set</span> minio.secretKey=your-azure-key
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
<li><a href="/docs/v2.2.x/aws.md">Deploy a Milvus Cluster on EC2</a></li>
<li><a href="/docs/v2.2.x/eks.md">Deploy a Milvus Cluster on EKS</a></li>
<li><a href="/docs/v2.2.x/gcp.md">Deploy a Milvus Cluster on GCP</a></li>
</ul>
