---
id: birdwatcher_install_guides.md
summary: Learn how to install Birdwatch to debug Milvus.
title: Install Birdwatcher
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">Install Birdwatcher<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>This page demonstrates how to install Birdwatcher.</p>
<h2 id="Local-install" class="common-anchor-header">Local install<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have installed Milvus Standalone <a href="/docs/v2.4.x/install_standalone-docker.md">using docker</a>, you’d better download and install the built binary, install Birdwatcher as a common Go module, or build Birdwatcher from the source.</p>
<ul>
<li><p>Install it as a common Go module.</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/milvus-io/birdwatcher.git
cd birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>Then you can run Birdwatcher as follows:</p>
<pre><code translate="no" class="language-shell">go run main.go
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Build it from the source.</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/milvus-io/birdwatcher.git
cd birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>Then you can run Birdwatcher as follows:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Download the already-built binary</p>
<p>First, open the <a href="https://github.com/milvus-io/birdwatcher/releases/latest">latest release page</a>, and find the prepared binaries.</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;arch&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>Then you can decompress the tarball and use Birdwatcher as follows:</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">Install as a Kubernetes pod<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p>If you have installed either Milvus Standalone <a href="/docs/v2.4.x/install_standalone-helm.md">using the Helm charts</a> or <a href="/docs/v2.4.x/install_standalone-operator.md">the Milvus Operator</a> or Milvus Cluster <a href="/docs/v2.4.x/install_cluster-helm.md">using the Helm charts</a> or <a href="/docs/v2.4.x/install_cluster-milvusoperator.md">the Milvus Operator</a>, you are advised to install Birdwatcher as a Kubernetes pod.</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">Prepare deployment.yml</h3><pre><code translate="no" class="language-yml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">birdwatcher</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">selector:</span>
    <span class="hljs-attr">matchLabels:</span>
      <span class="hljs-attr">app:</span> <span class="hljs-string">birdwatcher</span>
  <span class="hljs-attr">template:</span>
    <span class="hljs-attr">metadata:</span>
      <span class="hljs-attr">labels:</span>
        <span class="hljs-attr">app:</span> <span class="hljs-string">birdwatcher</span>
    <span class="hljs-attr">spec:</span>
      <span class="hljs-attr">containers:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">birdwatcher</span>
        <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/birdwatcher</span>
        <span class="hljs-attr">resources:</span>
          <span class="hljs-attr">limits:</span>
            <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;128Mi&quot;</span>
            <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;500m&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>If the image available on DockerHub is not the latest, you can build an image of Birdwatcher using the Dockerfile provided with the source code as follows:</p>
<pre><code translate="no" class="language-shell">git clone https://github.com/milvus-io/birdwatcher.git
cd birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>To deploy a locally built image, you need to add <code translate="no">imagePullPolicy</code> to the above specs and set it to <code translate="no">Never</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
      <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">birdwatcher</span>
        <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/birdwatcher</span>
        <span class="hljs-attr">imagePullPolicy:</span> <span class="hljs-string">Never</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">Apply deployment.yml</h3><p>Save the above YAML in a file and name it <code translate="no">deployment.yml</code>, and run the following command</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
