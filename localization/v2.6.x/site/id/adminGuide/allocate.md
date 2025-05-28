---
id: allocate.md
title: Mengalokasikan Sumber Daya ke Milvus di Kubernetes
summary: Pelajari cara mengalokasikan sumber daya ke Milvus di Kubernetes.
---
<h1 id="Allocate-Resources-on-Kubernetes" class="common-anchor-header">Mengalokasikan Sumber Daya di Kubernetes<button data-href="#Allocate-Resources-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara mengalokasikan sumber daya ke cluster Milvus di Kubernetes.</p>
<p>Umumnya, sumber daya yang Anda alokasikan ke klaster Milvus dalam produksi harus proporsional dengan beban kerja mesin. Anda juga harus mempertimbangkan jenis mesin saat mengalokasikan sumber daya. Meskipun Anda dapat memperbarui konfigurasi saat klaster berjalan, kami sarankan untuk menetapkan nilainya sebelum <a href="/docs/id/install_cluster-helm.md">menerapkan klaster.</a></p>
<div class="alert note">
<p>Untuk informasi tentang cara mengalokasikan sumber daya dengan Milvus Operator, lihat Mengalokasikan <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/allocate-resources.md#allocate-resources-with-milvus-operator">Sumber Daya dengan Milvus Operator</a>.</p>
</div>
<h2 id="1-View-available-resources" class="common-anchor-header">1. Melihat sumber daya yang tersedia<button data-href="#1-View-available-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan <code translate="no">kubectl describe nodes</code> untuk melihat sumber daya yang tersedia pada instance yang telah Anda sediakan.</p>
<h2 id="2-Allocate-resources" class="common-anchor-header">2. Mengalokasikan sumber daya<button data-href="#2-Allocate-resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Gunakan Helm untuk mengalokasikan sumber daya CPU dan memori ke komponen Milvus.</p>
<div class="alert note">
Menggunakan Helm untuk meningkatkan sumber daya akan menyebabkan pod yang sedang berjalan melakukan pembaruan bergulir.</div>
<p>Ada dua cara untuk mengalokasikan sumber daya:</p>
<ul>
<li><a href="/docs/id/allocate.md#Allocate-resources-with-commands">Gunakan perintah</a></li>
<li><a href="/docs/id/allocate.md#Allocate-resources-by-setting-configuration-file">Mengatur parameter dalam berkas <code translate="no">YAML</code> </a></li>
</ul>
<h3 id="Allocate-resources-with-commands" class="common-anchor-header">Mengalokasikan sumber daya dengan perintah</h3><p>Anda perlu mengatur variabel sumber daya untuk setiap komponen Milvus jika Anda menggunakan <code translate="no">--set</code> untuk memperbarui konfigurasi sumber daya.</p>
<div class="filter">
<a href="#standalone">Milvus</a> <a href="#cluster">klaster Milvus</a><a href="#standalone">mandiri</a> </div>
<div class="table-wrapper filter-standalone" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set standalone.resources.limits.cpu=2 --set standalone.resources.limits.memory=4Gi --set standalone.resources.requests.cpu=0.1 --set standalone.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="table-wrapper filter-cluster" markdown="block">
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values --set dataNode.resources.limits.cpu=2 --set dataNode.resources.limits.memory=4Gi --set dataNode.resources.requests.cpu=0.1 --set dataNode.resources.requests.memory=128Mi
<button class="copy-code-btn"></button></code></pre>
</div>
<h3 id="Allocate-resources-by-setting-configuration-file" class="common-anchor-header">Mengalokasikan sumber daya dengan mengatur file konfigurasi</h3><p>Anda juga dapat mengalokasikan sumber daya CPU dan memori dengan menetapkan parameter <code translate="no">resources.requests</code> dan <code translate="no">resources.limits</code> pada berkas <code translate="no">resources.yaml</code>.</p>
<pre><code translate="no" class="language-Yaml"><span class="hljs-attr">dataNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">resources:</span>
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;4&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;16Gi&quot;</span>
    <span class="hljs-attr">requests:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;1&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">&quot;4Gi&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Apply-configurations" class="common-anchor-header">3. Menerapkan konfigurasi<button data-href="#3-Apply-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Jalankan perintah berikut untuk menerapkan konfigurasi baru ke cluster Milvus Anda.</p>
<pre><code translate="no" class="language-Shell">helm upgrade my-release milvus/milvus --reuse-values -f resources.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Jika <code translate="no">resources.limits</code> tidak ditentukan, pod akan menggunakan semua sumber daya CPU dan memori yang tersedia. Oleh karena itu, pastikan untuk menentukan <code translate="no">resources.requests</code> dan <code translate="no">resources.limits</code> untuk menghindari pengalokasian sumber daya secara keseluruhan saat tugas lain yang berjalan pada instans yang sama membutuhkan konsumsi memori lebih banyak.</div>
<p>Lihat <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">dokumentasi Kubernetes</a> untuk informasi lebih lanjut tentang mengelola sumber daya.</p>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Anda mungkin juga ingin mempelajari caranya:<ul>
<li><a href="/docs/id/scaleout.md">Menetapkan skala cluster Milvus</a></li>
<li><a href="/docs/id/upgrade_milvus_cluster-operator.md">Memutakhirkan Milvus Cluster</a></li>
<li><a href="/docs/id/upgrade_milvus_standalone-operator.md">Memutakhirkan Milvus Standalone</a></li>
</ul></li>
<li>Jika Anda siap untuk menerapkan cluster Anda di cloud:<ul>
<li>Pelajari cara <a href="/docs/id/eks.md">Menerapkan Milvus di Amazon EKS dengan Terraform</a></li>
<li>Pelajari cara <a href="/docs/id/gcp.md">Menerapkan Milvus Cluster di GCP dengan Kubernetes</a></li>
<li>Pelajari cara <a href="/docs/id/azure.md">Menerapkan Milvus di Microsoft Azure dengan Kubernetes</a></li>
</ul></li>
</ul>
