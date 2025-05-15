---
id: eks.md
title: Deploy a Milvus Cluster on EKS
related_key: cluster
summary: Learn how to deploy a Milvus cluster on EKS
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">Deploy a Milvus Cluster on EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to deploy a Milvus cluster on <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a>.</p>
<div class="alert note">This topic assumes that you have a basic understanding of AWS access management. If you're not familiar with it, see <a href=https://docs.aws.amazon.com/iam/?id=docs_gateway>AWS Identity and Access Management Documentation</a>.</div>
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
    </button></h2><h3 id="Software-requirements" class="common-anchor-header">Software requirements</h3><ul>
<li><a href="https://helm.sh/docs/intro/install/">Helm</a></li>
<li><a href="https://kubernetes.io/docs/tasks/tools/">kubectl</a></li>
<li><a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">AWS CLI version 2</a></li>
</ul>
<h3 id="Cloud-security" class="common-anchor-header">Cloud security</h3><ul>
<li>Access to EKS, EC2, and S3</li>
<li>Access key ID</li>
<li>Security access key</li>
</ul>
<h2 id="Deploy-a-Milvus-cluster" class="common-anchor-header">Deploy a Milvus cluster<button data-href="#Deploy-a-Milvus-cluster" class="anchor-icon" translate="no">
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
<li>Copy the code from below code block, and save it to a file in yaml format, name the file as milvus_cluster.yaml.</li>
</ol>
<pre><code translate="no">apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-eks-cluster
  region: us-west-2
  version: <span class="hljs-string">&quot;1.23&quot;</span>

nodeGroups:
  - name: ng-1-workers
    labels: { role: workers }
    instanceType: m5.4xlarge
    desiredCapacity: 2
    volumeSize: 80
    iam:
      withAddonPolicies:
        ebs: <span class="hljs-literal">true</span>

addons:
- name: aws-ebs-csi-driver
  version: v1.13.0-eksbuild.1 <span class="hljs-comment"># optional</span>

<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Run the following command to create an EKS cluster. The example in this topic uses <code translate="no">my-cluster</code> as the cluster name. You can replace it with your own value. See <a href="https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html">Getting started with Amazon EKS</a> for more information.</li>
</ol>
<pre><code translate="no">eksctl create cluster -f milvus_cluster.yaml
<button class="copy-code-btn"></button></code></pre>
<p>You will see the following output if the EKS cluster is created.</p>
<pre><code translate="no">...
[✓]  EKS cluster <span class="hljs-string">&quot;my-cluster&quot;</span> <span class="hljs-keyword">in</span> <span class="hljs-string">&quot;region-code&quot;</span> region <span class="hljs-keyword">is</span> ready
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li><p>After a Milvus cluster is provisioned, run the following command with a region and name for the cluster.</p>
<pre><code translate="no" class="language-shell">aws eks --region <span class="hljs-variable">${aws-region}</span> update-kubeconfig --name <span class="hljs-variable">${cluster-name}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Create a kubeconfig file and run <code translate="no">kubectl get svc</code>.  If successful, a cluster appears in the output.</p>
<pre><code translate="no" class="language-shell">NAME          TYPE      CLUSTER-IP    EXTERNAL-IP                                <span class="hljs-title function_">PORT</span><span class="hljs-params">(S)</span>             AGE
kubernetes       ClusterIP   <span class="hljs-number">10.100</span><span class="hljs-number">.0</span><span class="hljs-number">.1</span>    &lt;none&gt;                                  <span class="hljs-number">443</span>/TCP             106m
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Add the Milvus Helm repository.</p></li>
</ol>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//milvus-io.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>Run the following command to start the Milvus cluster that you have provisioned. The access key and an S3 bucket are required to use S3 as storage.</li>
</ol>
<pre><code translate="no" class="language-shell">helm upgrade --install --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=<span class="hljs-string">&#x27;s3.us-east-2.amazonaws.com&#x27;</span> --<span class="hljs-built_in">set</span> externalS3.port=80 --<span class="hljs-built_in">set</span> externalS3.accessKey=<span class="hljs-variable">${access-key}</span> --<span class="hljs-built_in">set</span> externalS3.secretKey=<span class="hljs-variable">${secret-key}</span> --<span class="hljs-built_in">set</span> externalS3.bucketName=<span class="hljs-variable">${bucket-name}</span> --<span class="hljs-built_in">set</span> minio.enabled=False --<span class="hljs-built_in">set</span> service.type=LoadBalancer milvus milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>Run <code translate="no">kubectl get svc</code> again to retrieve the IP address of the load balancer and use it as the IP address of the Milvus cluster.</li>
</ol>
<div class="alert note"> Run <code translate="no">kubectl get pods</code> to view the running pods on the cluster.</div>
<h2 id="Scale-the-Milvus-cluster" class="common-anchor-header">Scale the Milvus cluster<button data-href="#Scale-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>Currently, a Milvus cluster can only be scaled manually. Run the following command to modify the numbers of node instances with different types.</p>
<div class ="alert note">See <a href="https://milvus.io/docs/v2.1.x/four_layers.md#StorageComputing-Disaggregation">Storage/Computing Disaggregation</a> for more information about the data node, index node, query node, and proxy.</div>
<pre><code translate="no" class="language-shell">helm upgrade --install --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> dataNode.replicas=1 --<span class="hljs-built_in">set</span> indexNode.replicas=1 --<span class="hljs-built_in">set</span> queryNode.replicas=1 --<span class="hljs-built_in">set</span> proxy.replicas=1 --<span class="hljs-built_in">set</span> externalS3.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> externalS3.host=<span class="hljs-string">&#x27;s3.us-east-2.amazonaws.com&#x27;</span> --<span class="hljs-built_in">set</span> externalS3.port=80 --<span class="hljs-built_in">set</span> externalS3.accessKey=<span class="hljs-variable">${access-key}</span> --<span class="hljs-built_in">set</span> externalS3.secretKey=<span class="hljs-variable">${secret-key}</span> --<span class="hljs-built_in">set</span> externalS3.bucketName=<span class="hljs-variable">${bucket-name}</span> --<span class="hljs-built_in">set</span> minio.enabled=False --<span class="hljs-built_in">set</span> service.type=LoadBalancer milvus milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<p>After running the preceding command, you can run <code translate="no">kubectl get pods</code> to view the newly created node instances.</p>
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
<li><a href="/docs/v2.1.x/aws.md">Deploy a Milvus Cluster on EC2</a></li>
<li><a href="/docs/v2.1.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li><a href="/docs/v2.1.x/azure.md">Guide to Deploying Milvus on Microsoft Azure With Kubernetes</a></li>
</ul>
