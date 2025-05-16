---
id: birdwatcher_install_guides.md
summary: Pelajari cara menginstal Birdwatch untuk men-debug Milvus.
title: Menginstal Birdwatcher
---
<h1 id="Install-Birdwatcher" class="common-anchor-header">Menginstal Birdwatcher<button data-href="#Install-Birdwatcher" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menunjukkan cara menginstal Birdwatcher.</p>
<h2 id="Local-install" class="common-anchor-header">Instalasi lokal<button data-href="#Local-install" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda telah menginstal Milvus Standalone <a href="/docs/id/v2.4.x/install_standalone-docker.md">menggunakan docker</a>, Anda sebaiknya mengunduh dan menginstal biner yang telah dibangun, menginstal Birdwatcher sebagai modul Go biasa, atau membangun Birdwatcher dari sumbernya.</p>
<ul>
<li><p>Instal sebagai modul Go biasa.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go install github.com/milvus-io/birdwatcher
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat menjalankan Birdwatcher sebagai berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">go</span> run main.<span class="hljs-keyword">go</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Membangunnya dari sumbernya.</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
go build -o birdwatcher main.go
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat menjalankan Birdwatcher sebagai berikut:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mengunduh biner yang sudah dibangun</p>
<p>Pertama, buka <a href="https://github.com/milvus-io/birdwatcher/releases/latest">halaman rilis terbaru</a>, dan temukan biner yang sudah disiapkan.</p>
<pre><code translate="no" class="language-shell">wget -O birdwatcher.tar.gz \
https://github.com/milvus-io/birdwatcher/releases/download/latest/birdwatcher_&lt;os&gt;_&lt;<span class="hljs-built_in">arch</span>&gt;.tar.gz
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian Anda dapat mendekompresi tarball dan menggunakan Birdwatcher sebagai berikut:</p>
<pre><code translate="no" class="language-shell">tar -xvzf birdwatcher.tar.gz
./birdwatcher
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Install-as-a-Kubernetes-pod" class="common-anchor-header">Instal sebagai pod Kubernetes<button data-href="#Install-as-a-Kubernetes-pod" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda telah menginstal Milvus Standalone <a href="/docs/id/v2.4.x/install_standalone-helm.md">menggunakan grafik Helm</a> atau <a href="/docs/id/v2.4.x/install_standalone-operator.md">Milvus Operator</a> atau Milvus Cluster <a href="/docs/id/v2.4.x/install_cluster-helm.md">menggunakan grafik Helm</a> atau <a href="/docs/id/v2.4.x/install_cluster-milvusoperator.md">Milvus Operator</a>, Anda disarankan untuk menginstal Birdwatcher sebagai pod Kubernetes.</p>
<h3 id="Prepare-deploymentyml" class="common-anchor-header">Siapkan deployment.yml</h3><pre><code translate="no" class="language-yml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: birdwatcher
spec:
  selector:
    matchLabels:
      app: birdwatcher
  template:
    metadata:
      labels:
        app: birdwatcher
    spec:
      containers:
      - name: birdwatcher
        image: milvusdb/birdwatcher
        resources:
          limits:
            memory: <span class="hljs-string">&quot;128Mi&quot;</span>
            cpu: <span class="hljs-string">&quot;500m&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika citra yang tersedia di DockerHub bukan yang terbaru, Anda dapat membangun citra Birdwatcher menggunakan Dockerfile yang disediakan dengan kode sumber sebagai berikut:</p>
<pre><code translate="no" class="language-shell">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/birdwatcher.git
<span class="hljs-built_in">cd</span> birdwatcher
docker build -t milvusdb/birdwatcher .
<button class="copy-code-btn"></button></code></pre>
<p>Untuk men-deploy citra yang dibangun secara lokal, Anda perlu menambahkan <code translate="no">imagePullPolicy</code> ke spesifikasi di atas dan mengaturnya ke <code translate="no">Never</code>.</p>
<pre><code translate="no" class="language-yaml">...
      - name: birdwatcher
        image: milvusdb/birdwatcher
        imagePullPolicy: Never
...
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Apply-deploymentyml" class="common-anchor-header">Menerapkan deployment.yml</h3><p>Simpan YAML di atas dalam sebuah berkas dan beri nama <code translate="no">deployment.yml</code>, dan jalankan perintah berikut</p>
<pre><code translate="no" class="language-shell">kubectl apply -f deployment.yml
<button class="copy-code-btn"></button></code></pre>
