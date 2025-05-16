---
id: install_offline-helm.md
summary: Learn how to install Milvus on Kubernetes offline.
title: Install Milvus Offline with Helm Charts
deprecate: true
---

<h1 id="Install-Milvus-Offline-with-Helm-Charts" class="common-anchor-header">Install Milvus Offline with Helm Charts<button data-href="#Install-Milvus-Offline-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to install Milvus with Helm charts in an offline environment.</p>
<p>Installation of Milvus might fail due to image loading errors. You can install Milvus in an offline environment to avoid such problem.</p>
<h2 id="Download-files-and-images" class="common-anchor-header">Download files and images<button data-href="#Download-files-and-images" class="anchor-icon" translate="no">
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
    </button></h2><p>To install Milvus offline, you need to pull and save all images in an online environment first, and then transfer them to the target host and load them manually.</p>
<ol>
<li>Add and update Milvus Helm repository locally.</li>
</ol>
<pre><code translate="no">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
helm repo update
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Get a Kubernetes manifest.</li>
</ol>
<ul>
<li>For Milvus standalone:</li>
</ul>
<pre><code translate="no">helm template my-release --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> --<span class="hljs-built_in">set</span> etcd.replicaCount=1 --<span class="hljs-built_in">set</span> minio.mode=standalone --<span class="hljs-built_in">set</span> pulsar.enabled=<span class="hljs-literal">false</span> milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>For Milvus cluster:</li>
</ul>
<pre><code translate="no" class="language-cluster">helm template my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<p>If you want to change multiple configurations, you can download a <a href="https://github.com/milvus-io/milvus-helm/blob/master/charts/milvus/values.yaml"><code translate="no">value.yaml</code></a> file, specify configurations in it, and generate a manifest based on it.</p>
<pre><code translate="no" class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml
helm template -f values.yaml my-release milvus/milvus &gt; milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Download requirement and script files.</li>
</ol>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/requirements.txt</span>
$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus/master/deployments/offline/save_image.py</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Pull and save images.</li>
</ol>
<pre><code translate="no">pip3 install -r requirements.txt
python3 save_image.py --manifest milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
The images are stored in the <code translate="no">/images</code> folder.
</div>
<ol start="5">
<li>Load the images.</li>
</ol>
<pre><code translate="no"><span class="hljs-built_in">cd</span> images/for image <span class="hljs-keyword">in</span> $(find . -<span class="hljs-built_in">type</span> f -name <span class="hljs-string">&quot;*.tar.gz&quot;</span>) ; <span class="hljs-keyword">do</span> gunzip -c <span class="hljs-variable">$image</span> | docker load; <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Milvus-offline" class="common-anchor-header">Install Milvus offline<button data-href="#Install-Milvus-offline" class="anchor-icon" translate="no">
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
    </button></h2><p>Having transferred the images to the target host, run the following command to install Milvus offline.</p>
<pre><code translate="no">kubectl apply -f milvus_manifest.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Uninstall-Milvus" class="common-anchor-header">Uninstall Milvus<button data-href="#Uninstall-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>To uninstall Milvus, run the following command.</p>
<pre><code translate="no">kubectl <span class="hljs-keyword">delete</span> -f milvus_manifest.<span class="hljs-property">yaml</span>
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
    </button></h2><p>Having installed Milvus, you can:</p>
<ul>
<li><p>Check <a href="/docs/fr/v2.4.x/quickstart.md">Hello Milvus</a> to run an example code with different SDKs to see what Milvus can do.</p></li>
<li><p>Learn the basic operations of Milvus:</p>
<ul>
<li><a href="/docs/fr/v2.4.x/manage-collections.md">Manage Collections</a></li>
<li><a href="/docs/fr/v2.4.x/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/fr/v2.4.x/insert-update-delete.md">Insert, Upsert &amp; Delete</a></li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md">Single-Vector Search</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Hybrid Search</a></li>
</ul></li>
<li><p><a href="/docs/fr/v2.4.x/upgrade_milvus_cluster-helm.md">Upgrade Milvus Using Helm Chart</a>.</p></li>
<li><p><a href="/docs/fr/v2.4.x/scaleout.md">Scale your Milvus cluster</a>.</p></li>
<li><p>Explore <a href="/docs/fr/v2.4.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed for importing and exporting data in Milvus.</p></li>
<li><p><a href="/docs/fr/v2.4.x/monitor.md">Monitor Milvus with Prometheus</a>.</p></li>
</ul>
