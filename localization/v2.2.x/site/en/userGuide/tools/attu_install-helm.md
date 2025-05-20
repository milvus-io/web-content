---
id: attu_install-helm.md
label: Install with Helm Chart
order: 1
group: attu_install-docker.md
related_key: attu
summary: Learn how to install Attu with Helm Chart to manage your Milvus service.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.2.x/attu_install-docker.md" class=''>Install with Docker Compose</a><a href="/docs/v2.2.x/attu_install-helm.md" class='active '>Install with Helm Chart</a><a href="/docs/v2.2.x/attu_install-package.md" class=''>Install with Package</a></div>
<h1 id="Install-Attu-with-Helm-Chart" class="common-anchor-header">Install Attu with Helm Chart<button data-href="#Install-Attu-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Attu is an efficient open-source management tool for Milvus. This topic describes how to install Attu with Helm Chart.</p>
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
<li>Kubernetes 1.16 or later</li>
<li>Helm 3.0.0 or later</li>
</ul>
<div class="alert note">
Attu only supports Milvus 2.x.
</div>
<h2 id="Install-Helm-Chart-for-Milvus" class="common-anchor-header">Install Helm Chart for Milvus<button data-href="#Install-Helm-Chart-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Helm is a Kubernetes package manager that can help you deploy Milvus quickly.</p>
<ol>
<li>Add Milvus Helm repository.</li>
</ol>
<pre><code translate="no">$ helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//milvus-io.github.io/milvus-helm/</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Update charts locally.</li>
</ol>
<pre><code translate="no">$ helm repo update
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Attu-while-installing-Milvus" class="common-anchor-header">Install Attu while installing Milvus<button data-href="#Install-Attu-while-installing-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Start Milvus and Attu with Helm by specifying the release name, the chart, and the parameters that indicate the installation of Attu. This topic uses <code translate="no">my-release</code> as the release name. To use a different release name, replace <code translate="no">my-release</code> in the command.</p>
<p>Kubernetes provides four service modes: ClusterIp, Ingress, LoadBalancer, and NodePort. The default service mode of Attu is ClusterIp. You can choose the  service mode that suits your application by configuring the parameters <code translate="no">attu.service.type</code> and <code translate="no">attu.ingress.enable</code>.</p>
<ol>
<li>Install Milvus and Attu</li>
</ol>
<pre><code translate="no">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> attu.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Forward the Attu service to local port <code translate="no">3000</code> and listen on all addresses.</li>
</ol>
<pre><code translate="no">kubectl port-forward --address 0.0.0.0 service/my-release-milvus-attu 3000
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Visit <code translate="no">http://{ your machine IP }/connect</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.2.x/assets/attu/insight_install.png" alt="Attu_install" class="doc-image" id="attu_install" />
    <span>Attu_install</span>
  </span>
</p>
<h2 id="Contribution" class="common-anchor-header">Contribution<button data-href="#Contribution" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu is an open-source project. All contributions are welcome. Please read our <a href="https://github.com/zilliztech/attu">Contribute guide</a> before making contributions.</p>
<p>If you find a bug or want to request a new feature, please create a <a href="https://github.com/zilliztech/attu">GitHub Issue</a>, and make sure that the same issue has not been created by someone else.</p>
