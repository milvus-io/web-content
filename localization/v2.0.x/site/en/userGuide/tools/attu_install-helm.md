---
id: attu_install-helm.md
label: Install with Helm Chart
order: 1
group: attu_install-docker.md
related_key: attu
summary: Learn how to install Attu with Helm Chart to manage your Milvus service.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.0.x/attu_install-docker.md" class=''>Install with Docker Compose</a><a href="/docs/v2.0.x/attu_install-helm.md" class='active '>Install with Helm Chart</a><a href="/docs/v2.0.x/attu_install-package.md" class=''>Install with Package</a></div>
<h1 id="Install-Attu-with-Helm-Charts" class="common-anchor-header">Install Attu with Helm Charts<button data-href="#Install-Attu-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Attu with Helm charts, an efficient open-source management tool for Milvus.</p>
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
    </button></h2><p>Start Milvus and Attu with Helm by specifying the release name, the chart, and the parameters that indicate the installation and service mode of Attu. This topic uses <code translate="no">my-release</code> as the release name. To use a different release name, replace <code translate="no">my-release</code> in the command.</p>
<p>Attu provides services in the following three modes among which you can select to suit your scenario. It is recommended to use Ingress mode. Port-forward mode is suggested to be used in test environment only.</p>
<ul>
<li><a href="#Ingress-mode">Ingress mode</a></li>
<li><a href="#LoadBalancer-mode">LoadBalancer mode</a></li>
<li><a href="#Port-forward-mode">Port-forward mode</a></li>
</ul>
<h3 id="Ingress-mode" class="common-anchor-header">Ingress mode</h3><div class="alert note">
Ensure that you have integrated Ingress controller in your Kubernetes cluster.
</div>
<ol>
<li>Install Milvus and Attu.</li>
</ol>
<pre><code translate="no">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> attu.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Check the established Ingress.</li>
</ol>
<pre><code translate="no">kubectl <span class="hljs-keyword">get</span> ingress
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Check the addresses that correspond to <code translate="no">my-release-milvus-attu</code> in the returned result.</li>
</ol>
<pre><code translate="no">NAME                          CLASS    HOSTS                  ADDRESS                               PORTS   AGE
my-release-milvus-attu        &lt;none&gt;   milvus-attu.local      10.100.32.1,10.100.32.2,10.100.32.3   80      22h
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Configure DNS on the device that requires the Attu service by mapping the path <code translate="no">milvus-attu.local</code> onto any of the addresses returned above in the system file <code translate="no">/etc/hosts</code>.</li>
</ol>
<pre><code translate="no">10.100.32.1     milvus-attu.local
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>Visit <code translate="no">http://milvus-attu.local</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_install.png" alt="Attu_install" class="doc-image" id="attu_install" />
    <span>Attu_install</span>
  </span>
</p>
<h3 id="LoadBalancer-mode" class="common-anchor-header">LoadBalancer mode</h3><p>Ensure that you have integrated LoadBalancer in your Kubernetes cluster.</p>
<ol>
<li>Install Milvus and Attu.</li>
</ol>
<pre><code translate="no">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> attu.enabled=<span class="hljs-literal">true</span> --<span class="hljs-built_in">set</span> attu.service.type=LoadBalancer --<span class="hljs-built_in">set</span> attu.ingress.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Check the Attu service.</li>
</ol>
<pre><code translate="no">kubectl <span class="hljs-keyword">get</span> svc
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Check the external IP of the service <code translate="no">my-release-milvus-attu</code> in the returned results.</li>
</ol>
<pre><code translate="no">NAME                                    TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)
my-release-etcd                        ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.106</span><span class="hljs-number">.84</span>    &lt;none&gt;        <span class="hljs-number">2379</span>/TCP,<span class="hljs-number">2380</span>/TCP                     117s
my-release-etcd-headless               ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">2379</span>/TCP,<span class="hljs-number">2380</span>/TCP                     117s
my-release-milvus                      ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.230</span><span class="hljs-number">.238</span>   &lt;none&gt;        <span class="hljs-number">19530</span>/TCP,<span class="hljs-number">9091</span>/TCP                    117s
my-release-milvus-datacoord            ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.75</span><span class="hljs-number">.27</span>     &lt;none&gt;        <span class="hljs-number">13333</span>/TCP,<span class="hljs-number">9091</span>/TCP                    117s
my-release-milvus-datanode             ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">9091</span>/TCP                              117s
my-release-milvus-indexcoord           ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.183</span><span class="hljs-number">.151</span>   &lt;none&gt;        <span class="hljs-number">31000</span>/TCP,<span class="hljs-number">9091</span>/TCP                    117s
my-release-milvus-indexnode            ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">9091</span>/TCP                              117s
my-release-milvus-attu                 LoadBalancer   <span class="hljs-number">10.96</span><span class="hljs-number">.79</span><span class="hljs-number">.103</span>    <span class="hljs-number">10.98</span><span class="hljs-number">.0</span><span class="hljs-number">.16</span>    <span class="hljs-number">3000</span>:<span class="hljs-number">30413</span>/TCP                        117s
my-release-milvus-querycoord           ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.204</span><span class="hljs-number">.140</span>   &lt;none&gt;        <span class="hljs-number">19531</span>/TCP,<span class="hljs-number">9091</span>/TCP                    117s
my-release-milvus-querynode            ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">9091</span>/TCP                              117s
my-release-milvus-rootcoord            ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.142</span><span class="hljs-number">.19</span>    &lt;none&gt;        <span class="hljs-number">53100</span>/TCP,<span class="hljs-number">9091</span>/TCP                    117s
my-release-minio                       ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.55</span><span class="hljs-number">.66</span>     &lt;none&gt;        <span class="hljs-number">9000</span>/TCP                              117s
my-release-minio-svc                   ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">9000</span>/TCP                              117s
my-release-pulsar-bookkeeper           ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">3181</span>/TCP                              117s
my-release-pulsar-broker               ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.177</span><span class="hljs-number">.151</span>   &lt;none&gt;        <span class="hljs-number">8080</span>/TCP,<span class="hljs-number">6650</span>/TCP,<span class="hljs-number">8443</span>/TCP,<span class="hljs-number">6651</span>/TCP   117s
my-release-pulsar-proxy                ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.148</span><span class="hljs-number">.241</span>   &lt;none&gt;        <span class="hljs-number">8080</span>/TCP,<span class="hljs-number">6650</span>/TCP,<span class="hljs-number">8000</span>/TCP            117s
my-release-pulsar-zookeeper            ClusterIP      <span class="hljs-literal">None</span>            &lt;none&gt;        <span class="hljs-number">2888</span>/TCP,<span class="hljs-number">3888</span>/TCP,<span class="hljs-number">2181</span>/TCP            117s
my-release-pulsar-zookeeper-ca         ClusterIP      <span class="hljs-number">10.96</span><span class="hljs-number">.100</span><span class="hljs-number">.254</span>   &lt;none&gt;        <span class="hljs-number">2888</span>/TCP,<span class="hljs-number">3888</span>/TCP,<span class="hljs-number">2181</span>/TCP            117s
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Configure DNS on the device that requires the Attu service by mapping the path <code translate="no">my-release-milvus-attu</code> onto its external IP returned above in the system file <code translate="no">/etc/hosts</code>.</li>
</ol>
<pre><code translate="no">10.98.0.16 my-release-milvus-attu
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>Visit <code translate="no">http://my-release-milvus-attu:3000/connect</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_install.png" alt="Attu_install" class="doc-image" id="attu_install" />
    <span>Attu_install</span>
  </span>
</p>
<h3 id="Port-forward-mode" class="common-anchor-header">Port-forward mode</h3><ol>
<li>Install Milvus and Attu.</li>
</ol>
<pre><code translate="no">helm install my-release milvus/milvus --<span class="hljs-built_in">set</span> attu.enabled=<span class="hljs-literal">true</span>  --<span class="hljs-built_in">set</span> attu.ingress.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Forward the Attu service to local port <code translate="no">3000</code>.</li>
</ol>
<pre><code translate="no">kubectl port-forward service/my-release-milvus-attu 3000
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Configure DNS on the device that forwards the Attu service by mapping the path <code translate="no">my-release-milvus-attu</code> onto <code translate="no">127.0.0.1</code> in the system file <code translate="no">/etc/hosts</code>.</li>
</ol>
<pre><code translate="no">127.0.0.1 my-release-milvus-attu
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Visit <code translate="no">http://my-release-milvus-attu:3000/connect</code> in your browser, and click <strong>Connect</strong> to enter the Attu service.</li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.0.x/assets/attu/insight_install.png" alt="Attu_install" class="doc-image" id="attu_install" />
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
