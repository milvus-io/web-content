---
id: openshift.md
title: Deploy a Milvus Cluster on OpenShift
related_key: cluster
summary: Learn how to deploy a Milvus cluster on OpenShift.
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">Deploy a Milvus Cluster on OpenShift<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic provides a step-by-step guide on how to deploy Milvus on OpenShift.</p>
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
    </button></h2><p>Before beginning the deployment process, ensure you have:</p>
<ul>
<li>A running OpenShift cluster.</li>
<li>OpenShift cluster access with sufficient privileges (<code translate="no">cluster-admin</code> role or equivalent).</li>
<li>Access to the OpenShift Container Platform web console.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">Step 1: Install Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>Cert Manager is required for managing TLS certificates for Milvus Operator.</p>
<ol>
<li><p>Find a suitable cert-manager version for your OpenShift version: <a href="https://cert-manager.io/docs/releases/">Cert Manager Releases</a>.</p></li>
<li><p>Install Cert Manager following the official guide: <a href="https://cert-manager.io/docs/installation/">Cert Manager Installation</a>.</p></li>
<li><p>Verify your Cert Manager is working:</p>
<ol>
<li><p>In your openshift console, navigate to <strong>Workloads</strong> > <strong>Pods</strong>. Select the project <strong>cert-manager</strong>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
    <span>cert-manager-1</span>
  </span>
</p></li>
<li><p>Ensure all the pods are ready. For example, the image below suggests that the pods are still starting. Wait until all these pods are ready.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
    <span>cert-manager-2</span>
  </span>
</p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">Step 2: Issue a Self-Signed Certificate for Milvus Operator<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Ensure you are logged in as <code translate="no">kubeadmin</code> or have equivalent privileges.</p>
<ol>
<li><p>Create the following manifest file named <code translate="no">milvus-operator-certificate.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-operator-certificate.yaml</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Certificate</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-serving-cert</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dnsNames:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc</span>
  <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-operator-webhook-service.milvus-operator.svc.cluster.local</span>
  <span class="hljs-attr">issuerRef:</span>
    <span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
    <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">secretName:</span> <span class="hljs-string">milvus-operator-webhook-cert</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">cert-manager.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Issuer</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-operator-selfsigned-issuer</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">milvus-operator</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">selfSigned:</span> {}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Apply the file:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-operator-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">Step 3: Install Milvus Operator<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Now you can start installing the Milvus Operator. It is recommended to use Helm to install Milvus Operator to simplify the configuration process.</p>
<ol>
<li><p>Add the Milvus Operator Helm repository:</p>
<pre><code translate="no" class="language-shell">helm repo add milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Install Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">Step 4: Deploy Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Follow the rest of the guide on the Milvus documentation site: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Deploy Milvus</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">What’s Next<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li><a href="/docs/v2.4.x/eks.md">Deploy Milvus Cluster on AWS with Kubernetes</a></li>
<li><a href="/docs/v2.4.x/azure.md">Deploy Milvus Cluster on Azure with Kubernetes</a></li>
<li><a href="/docs/v2.4.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
</ul>
