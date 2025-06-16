---
id: meta_storage_operator.md
title: Mengkonfigurasi Penyimpanan Meta dengan Operator Milvus
related_key: 'minio, s3, storage, etcd, pulsar'
summary: Pelajari cara mengonfigurasi meta storage dengan Milvus Operator.
---
<h1 id="Configure-Meta-Storage-with-Milvus-Operator" class="common-anchor-header">Mengkonfigurasi Penyimpanan Meta dengan Operator Milvus<button data-href="#Configure-Meta-Storage-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus menggunakan etcd untuk menyimpan metadata. Topik ini memperkenalkan cara mengonfigurasi ketergantungan meta storage ketika Anda menginstal Milvus dengan Milvus Operator. Untuk detail lebih lanjut, lihat <a href="https://github.com/zilliztech/milvus-operator/blob/main/docs/administration/manage-dependencies/meta-storage.md">Mengkonfigurasi Meta Storage dengan Milvus Operator</a> di repositori Milvus Operator.</p>
<p>Topik ini mengasumsikan bahwa Anda telah men-deploy Milvus Operator.</p>
<div class="alert note">Lihat Menerapkan <a href="https://milvus.io/docs/v2.2.x/install_cluster-milvusoperator.md">Milvus Operator</a> untuk informasi lebih lanjut. </div>
<p>Anda perlu menentukan file konfigurasi untuk menggunakan Milvus Operator untuk memulai cluster Milvus.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda hanya perlu mengedit template kode di <code translate="no">milvus_cluster_default.yaml</code> untuk mengonfigurasi dependensi pihak ketiga. Bagian berikut ini memperkenalkan cara mengonfigurasi penyimpanan objek, etcd, dan Pulsar.</p>
<h2 id="Configure-etcd" class="common-anchor-header">Mengkonfigurasi etcd<button data-href="#Configure-etcd" class="anchor-icon" translate="no">
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
    </button></h2><p>Tambahkan bidang yang diperlukan di bawah <code translate="no">spec.dependencies.etcd</code> untuk mengkonfigurasi etcd.</p>
<p><code translate="no">etcd</code> mendukung <code translate="no">external</code> dan <code translate="no">inCluster</code>.</p>
<p>Bidang yang digunakan untuk mengkonfigurasi layanan etcd eksternal meliputi:</p>
<ul>
<li><code translate="no">external</code>: Nilai <code translate="no">true</code> mengindikasikan bahwa Milvus menggunakan layanan etcd eksternal.</li>
<li><code translate="no">endpoints</code>: Titik akhir dari etcd.</li>
</ul>
<h3 id="External-etcd" class="common-anchor-header">etcd eksternal</h3><h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan etcd eksternal.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span> <span class="hljs-comment"># Optional</span>
    <span class="hljs-attr">etcd:</span> <span class="hljs-comment"># Optional</span>
      <span class="hljs-comment"># Whether (=true) to use an existed external etcd as specified in the field endpoints or </span>
      <span class="hljs-comment"># (=false) create a new etcd inside the same kubernetes cluster for milvus.</span>
      <span class="hljs-attr">external:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Optional default=false</span>
      <span class="hljs-comment"># The external etcd endpoints if external=true</span>
      <span class="hljs-attr">endpoints:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-string">:2379</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Internal-etcd" class="common-anchor-header">Internal etcd</h3><p><code translate="no">inCluster</code> menunjukkan saat kluster Milvus dimulai, layanan etcd dimulai secara otomatis di dalam kluster.</p>
<h4 id="Example" class="common-anchor-header">Contoh</h4><p>Contoh berikut ini mengonfigurasi layanan etcd internal.</p>
<pre><code translate="no" class="language-YAML"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1alpha1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">dependencies:</span>
    <span class="hljs-attr">etcd:</span>
      <span class="hljs-attr">inCluster:</span>
        <span class="hljs-attr">values:</span>
          <span class="hljs-attr">replicaCount:</span> <span class="hljs-number">5</span>
          <span class="hljs-attr">resources:</span>
            <span class="hljs-attr">limits:</span> 
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
            <span class="hljs-attr">requests:</span>
              <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
              <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}              
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">Contoh sebelumnya menetapkan jumlah replika sebagai <code translate="no">5</code> dan membatasi sumber daya komputasi untuk etcd.</div>
<div class="alert note">Temukan item konfigurasi lengkap untuk mengonfigurasi layanan etcd internal di <a href="https://github.com/bitnami/charts/blob/ba6f8356e725a8342fe738a3b73ae40d5488b2ad/bitnami/etcd/values.yaml">values.yaml</a>. Tambahkan item konfigurasi sesuai kebutuhan di bawah <code translate="no">etcd.inCluster.values</code> seperti yang ditunjukkan pada contoh sebelumnya.</div>
<p>Dengan asumsi bahwa berkas konfigurasi bernama <code translate="no">milvuscluster.yaml</code>, jalankan perintah berikut untuk menerapkan konfigurasi.</p>
<pre><code translate="no" class="language-Shell">kubectl apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>Pelajari cara mengonfigurasi dependensi Milvus lainnya dengan Milvus Operator:</p>
<ul>
<li><a href="/docs/id/object_storage_operator.md">Mengonfigurasi Penyimpanan Objek dengan Milvus Operator</a></li>
<li><a href="/docs/id/message_storage_operator.md">Mengonfigurasi Penyimpanan Pesan dengan Milvus Operator</a></li>
</ul>
