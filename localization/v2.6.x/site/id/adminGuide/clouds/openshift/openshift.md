---
id: openshift.md
title: Menerapkan Cluster Milvus di OpenShift
related_key: cluster
summary: Pelajari cara menggunakan cluster Milvus di OpenShift.
---
<h1 id="Deploy-a-Milvus-Cluster-on-OpenShift" class="common-anchor-header">Menerapkan Cluster Milvus di OpenShift<button data-href="#Deploy-a-Milvus-Cluster-on-OpenShift" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menyediakan panduan langkah demi langkah tentang cara menggunakan Milvus di OpenShift.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum memulai proses penerapan, pastikan Anda memiliki:</p>
<ul>
<li>Cluster OpenShift yang sedang berjalan.</li>
<li>Akses cluster OpenShift dengan hak akses yang memadai (<code translate="no">cluster-admin</code> role atau yang setara).</li>
<li>Akses ke konsol web OpenShift Container Platform.</li>
</ul>
<h2 id="Step-1-Install-Cert-Manager" class="common-anchor-header">Langkah 1: Instal Cert Manager<button data-href="#Step-1-Install-Cert-Manager" class="anchor-icon" translate="no">
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
    </button></h2><p>Cert Manager diperlukan untuk mengelola sertifikat TLS untuk Milvus Operator.</p>
<ol>
<li><p>Temukan versi cert-manager yang sesuai untuk versi OpenShift Anda: <a href="https://cert-manager.io/docs/releases/">Rilis Cert Manager</a>.</p></li>
<li><p>Instal Cert Manager dengan mengikuti panduan resmi: <a href="https://cert-manager.io/docs/installation/">Instalasi Cert Manager</a>.</p></li>
<li><p>Verifikasi bahwa Cert Manager Anda telah berfungsi:</p>
<ol>
<li><p>Di konsol openshift Anda, navigasikan ke <strong>Workloads</strong> &gt; <strong>Pods</strong>. Pilih proyek <strong>cert-manager</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-1.png" alt="cert-manager-1" class="doc-image" id="cert-manager-1" />
   </span> <span class="img-wrapper"> <span>cert-manager-1</span> </span></p></li>
<li><p>Pastikan semua pod sudah siap. Sebagai contoh, gambar di bawah ini menunjukkan bahwa pods masih dalam proses memulai. Tunggu hingga semua pod ini siap.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/openshift-cert-manager-2.png" alt="cert-manager-2" class="doc-image" id="cert-manager-2" />
   </span> <span class="img-wrapper"> <span>cert-manager-2</span> </span></p></li>
</ol></li>
</ol>
<h2 id="Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="common-anchor-header">Langkah 2: Menerbitkan Sertifikat yang Ditandatangani Sendiri untuk Operator Milvus<button data-href="#Step-2-Issue-a-Self-Signed-Certificate-for-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Pastikan Anda masuk sebagai <code translate="no">kubeadmin</code> atau memiliki hak akses yang setara.</p>
<ol>
<li><p>Buat berkas manifes berikut ini dengan nama <code translate="no">milvus-operator-certificate.yaml</code>:</p>
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
<li><p>Terapkan file tersebut:</p>
<pre><code translate="no" class="language-shell">kubectl apply -f milvus-operator-certificate.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-3-Install-Milvus-Operator" class="common-anchor-header">Langkah 3: Menginstal Operator Milvus<button data-href="#Step-3-Install-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Sekarang Anda dapat mulai menginstal Milvus Operator. Disarankan untuk menggunakan Helm untuk menginstal Milvus Operator untuk menyederhanakan proses konfigurasi.</p>
<ol>
<li><p>Tambahkan repositori Helm Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm repo add milvus-operator https://zilliztech.github.io/milvus-operator/
helm repo update milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Instal Milvus Operator:</p>
<pre><code translate="no" class="language-shell">helm -n milvus-operator upgrade --install --create-namespace milvus-operator milvus-operator/milvus-operator
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-4-Deploy-Milvus" class="common-anchor-header">Langkah 4: Menerapkan Milvus<button data-href="#Step-4-Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Ikuti panduan selanjutnya pada situs dokumentasi Milvus: <a href="https://milvus.io/docs/install_cluster-milvusoperator.md#Deploy-Milvus">Menerapkan Milvus</a>.</p>
<h2 id="Whats-Next" class="common-anchor-header">Apa Selanjutnya<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda ingin mempelajari cara menerapkan Milvus di cloud lain:</p>
<ul>
<li><a href="/docs/id/eks.md">Menerapkan Milvus Cluster di AWS dengan Kubernetes</a></li>
<li><a href="/docs/id/azure.md">Menerapkan Milvus Cluster di Azure dengan Kubernetes</a></li>
<li><a href="/docs/id/gcp.md">Menerapkan Milvus Cluster di GCP dengan Kubernetes</a></li>
</ul>
