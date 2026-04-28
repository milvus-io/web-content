---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Pelajari persiapan yang diperlukan sebelum memasang Milvus dengan Helm.
title: Persyaratan untuk menjalankan Milvus di Kubernetes
---
<h1 id="Requirements-for-running-Milvus-on-Kubernetes" class="common-anchor-header">Persyaratan untuk menjalankan Milvus di Kubernetes<button data-href="#Requirements-for-running-Milvus-on-Kubernetes" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini mencantumkan persyaratan perangkat keras dan perangkat lunak untuk menjalankan Milvus.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Persyaratan perangkat keras<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Komponen</th><th>Persyaratan</th><th>Rekomendasi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>CPU</td><td><ul><li>CPU Intel Core Generasi ke-2 atau lebih tinggi</li><li>Silikon Apple</li></ul></td><td><ul><li>Mandiri: 4 inti atau lebih</li><li>Cluster 8 inti atau lebih</li></ul></td><td></td></tr>
<tr><td>Set instruksi CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Pencarian kemiripan vektor dan pembuatan indeks dalam Milvus memerlukan dukungan CPU untuk set ekstensi instruksi tunggal, beberapa data (SIMD). Pastikan CPU mendukung setidaknya satu dari ekstensi SIMD yang terdaftar. Lihat <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU dengan AVX</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>RAM</td><td><ul><li>Mandiri: 8G</li><li>Cluster 32G</li></ul></td><td><ul><li>Mandiri: 16G</li><li>Cluster 128G</li></ul></td><td>Ukuran RAM tergantung pada volume data.</td></tr>
<tr><td>Hard drive</td><td>SSD SATA 3.0 atau CloudStorage</td><td>SSD NVMe atau yang lebih tinggi</td><td>Ukuran hard drive tergantung pada volume data.</td></tr>
</tbody>
</table>
<h2 id="Software-requirements" class="common-anchor-header">Persyaratan perangkat lunak<button data-href="#Software-requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda disarankan untuk menjalankan klaster Kubernetes pada platform Linux.</p>
<p>kubectl adalah alat baris perintah untuk Kubernetes. Gunakan versi kubectl yang memiliki perbedaan versi kecil dengan klaster Anda. Menggunakan versi terbaru dari kubectl membantu menghindari masalah yang tidak terduga.</p>
<p>minikube diperlukan saat menjalankan klaster Kubernetes secara lokal. minikube membutuhkan Docker sebagai dependensi. Pastikan Anda menginstal Docker sebelum menginstal Milvus menggunakan Helm. Lihat <a href="https://docs.docker.com/get-docker">Dapatkan Docker</a> untuk informasi lebih lanjut.</p>
<table>
<thead>
<tr><th>Sistem operasi</th><th>Perangkat lunak</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Platform Linux</td><td><ul><li>Kubernetes 1.16 atau yang lebih baru</li><li>kubectl</li><li>Helm 3.0.0 atau yang lebih baru</li><li>minikube (untuk Milvus mandiri)</li><li>Docker 19.03 atau yang lebih baru (untuk Milvus mandiri)</li></ul></td><td>Lihat <a href="https://helm.sh/docs/">Dokumen Helm</a> untuk informasi lebih lanjut.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Perangkat Lunak</th><th>Versi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Lihat <a href="#Additional-disk-requirements">persyaratan disk tambahan</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Persyaratan disk tambahan<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Performa disk sangat penting untuk etcd. Sangat disarankan agar Anda menggunakan SSD NVMe lokal. Respons disk yang lebih lambat dapat menyebabkan seringnya pemilihan kluster yang pada akhirnya akan menurunkan layanan etcd.</p>
<p>Untuk menguji apakah disk Anda memenuhi syarat, gunakan <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealnya, disk Anda harus mencapai lebih dari 500 IOPS dan di bawah 10 ms untuk latensi fsync persentil ke-99. Baca <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Dokumen</a> etcd untuk persyaratan yang lebih terperinci.</p>
<h2 id="FAQs" class="common-anchor-header">Pertanyaan Umum<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Bagaimana cara memulai cluster K8s secara lokal untuk tujuan pengujian?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat menggunakan alat seperti <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, dan <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, untuk menyiapkan klaster Kubernetes secara lokal dengan cepat. Prosedur berikut ini menggunakan minikube sebagai contoh.</p>
<ol>
<li>Unduh minikube</li>
</ol>
<p>Buka halaman <a href="https://minikube.sigs.k8s.io/docs/start/">Memulai</a>, periksa apakah Anda telah memenuhi persyaratan yang tercantum di bagian <strong>Apa yang Anda perlukan</strong>, klik tombol yang menggambarkan platform target Anda, dan salin perintah untuk mengunduh dan menginstal biner.</p>
<ol start="2">
<li>Memulai cluster K8s menggunakan minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Memeriksa status klaster K8s</li>
</ol>
<p>Anda dapat memeriksa status klaster K8s yang terinstal menggunakan perintah berikut.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pastikan Anda dapat mengakses klaster K8s melalui <code translate="no">kubectl</code>. Jika Anda belum menginstal <code translate="no">kubectl</code> secara lokal, lihat <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Menggunakan kubectl di dalam minikube</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Jika perangkat keras dan perangkat lunak Anda memenuhi persyaratan, Anda bisa:</p>
<ul>
<li><a href="/docs/id/install_cluster-milvusoperator.md">Menjalankan Milvus di Kubernet dengan Operator Milvus</a></li>
<li><a href="/docs/id/install_cluster-helm.md">Menjalankan Milvus di Kubernet dengan Helm</a></li>
</ul></li>
<li><p>Lihat <a href="/docs/id/system_configuration.md">Konfigurasi Sistem</a> untuk parameter yang dapat Anda tetapkan saat menginstal Milvus.</p></li>
</ul>
