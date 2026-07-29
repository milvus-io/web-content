---
id: prerequisite-helm.md
label: Install on Kubernetes
related_key: Kubernetes
summary: Pelajari persiapan yang diperlukan sebelum menginstal Milvus menggunakan Helm.
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
    </button></h1><p>Halaman ini mencantumkan persyaratan perangkat keras dan perangkat lunak untuk menginstal dan menjalankan Milvus.</p>
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
<tr><td>CPU</td><td><ul><li>Prosesor Intel Core Generasi ke-2 atau yang lebih baru</li><li>Apple Silicon</li></ul></td><td><ul><li>Standalone: 4 inti atau lebih</li><li>Cluster: 8 inti atau lebih</li></ul></td><td></td></tr>
<tr><td>Set instruksi CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Pencarian kesamaan vektor dan pembuatan indeks di dalam Milvus memerlukan dukungan CPU terhadap set ekstensi single instruction, multiple data (SIMD). Pastikan CPU mendukung setidaknya satu dari ekstensi SIMD yang tercantum. Lihat <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU dengan AVX</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>RAM</td><td><ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>Ukuran RAM bergantung pada volume data.</td></tr>
<tr><td>Hard drive</td><td>SSD SATA 3.0 atau CloudStorage</td><td>SSD NVMe atau yang lebih tinggi</td><td>Ukuran hard drive bergantung pada volume data.</td></tr>
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
    </button></h2><p>Disarankan agar Anda menjalankan kluster Kubernetes pada platform Linux.</p>
<p>kubectl adalah alat baris perintah untuk Kubernetes. Gunakan versi kubectl yang selisihnya tidak lebih dari satu versi minor dari kluster Anda. Menggunakan versi terbaru kubectl membantu menghindari masalah yang tidak terduga.</p>
<p>minikube diperlukan saat menjalankan kluster Kubernetes secara lokal. minikube memerlukan Docker sebagai dependensi. Pastikan Anda menginstal Docker sebelum menginstal Milvus menggunakan Helm. Lihat <a href="https://docs.docker.com/get-docker">Dapatkan Docker</a> untuk informasi lebih lanjut.</p>
<table>
<thead>
<tr><th>Sistem operasi</th><th>Perangkat lunak</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Platform Linux</td><td><ul><li>Kubernetes 1.16 atau yang lebih baru</li><li>kubectl</li><li>Helm 3.0.0 atau yang lebih baru</li><li>minikube (untuk Milvus standalone)</li><li>Docker 19.03 atau yang lebih baru (untuk Milvus standalone)</li></ul></td><td>Lihat <a href="https://helm.sh/docs/">Helm Docs</a> untuk informasi lebih lanjut.</td></tr>
</tbody>
</table>
<table>
<thead>
<tr><th>Perangkat Lunak</th><th>Versi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Lihat <a href="#Additional-disk-requirements">persyaratan disk tambahan</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Woodpecker</td><td>Disertakan dalam Milvus (mode layanan: <code translate="no">v</code>+)</td><td>Antrian pesan default. Untuk penerapan terdistribusi, Woodpecker dapat berjalan sebagai <strong>layanan</strong> khusus; tetapkan versinya dengan <code translate="no">--set woodpecker.image.tag</code>. Mode layanan didukung mulai dari Woodpecker <code translate="no">v</code> dan seterusnya.</td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td>Opsional — hanya jika Anda mengalihkan antrian pesan ke Pulsar; tidak diinstal secara default.</td></tr>
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
    </button></h3><p>Kinerja disk sangat penting bagi etcd. Sangat disarankan agar Anda menggunakan SSD NVMe lokal. Respons disk yang lambat dapat menyebabkan pemilihan kluster yang sering, yang pada akhirnya akan menurunkan kinerja layanan etcd.</p>
<p>Untuk menguji apakah disk Anda memenuhi syarat, gunakan <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealnya, disk Anda harus mencapai lebih dari 500 IOPS dan latensi fsync di bawah 10 ms untuk persentil ke-99. Baca <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Dokumen</a> etcd untuk persyaratan yang lebih terperinci.</p>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Bagaimana cara memulai kluster K8s secara lokal untuk keperluan pengujian?<button data-href="#How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat menggunakan alat seperti <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, dan <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, untuk dengan cepat menyiapkan kluster Kubernetes secara lokal. Prosedur berikut ini menggunakan minikube sebagai contoh.</p>
<ol>
<li>Unduh minikube</li>
</ol>
<p>Buka halaman <a href="https://minikube.sigs.k8s.io/docs/start/">Memulai</a>, periksa apakah Anda telah memenuhi persyaratan yang tercantum di bagian <strong>Yang Anda perlukan</strong>, klik tombol yang sesuai dengan platform target Anda, lalu salin perintah untuk mengunduh dan menginstal binari.</p>
<ol start="2">
<li>Jalankan kluster K8s menggunakan minikube</li>
</ol>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">minikube start</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Periksa status kluster K8s</li>
</ol>
<p>Anda dapat memeriksa status kluster K8s yang telah diinstal menggunakan perintah berikut.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">kubectl cluster-info</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pastikan Anda dapat mengakses kluster K8s melalui <code translate="no">kubectl</code>. Jika Anda belum menginstal <code translate="no">kubectl</code> secara lokal, lihat <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Gunakan kubectl di dalam minikube</a>.</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">Langkah selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Jika perangkat keras dan perangkat lunak Anda memenuhi persyaratan, Anda dapat:</p>
<ul>
<li><a href="/docs/id/install_cluster-milvusoperator.md">Menjalankan Milvus di Kubernetes dengan Milvus Operator</a></li>
<li><a href="/docs/id/install_cluster-helm.md">Menjalankan Milvus di Kubernetes dengan Helm</a></li>
</ul></li>
<li><p>Lihat <a href="/docs/id/system_configuration.md">Konfigurasi Sistem</a> untuk parameter yang dapat Anda atur saat menginstal Milvus.</p></li>
</ul>
