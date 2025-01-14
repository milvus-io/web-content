---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Pelajari persiapan yang diperlukan sebelum menginstal Milvus dengan GPU.
title: Persyaratan untuk Menginstalasi Milvus dengan GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Persyaratan untuk Menginstalasi Milvus dengan GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini berisi daftar persyaratan perangkat keras dan perangkat lunak untuk menyiapkan Milvus dengan dukungan GPU.</p>
<h2 id="Compute-capability" class="common-anchor-header">Kemampuan komputasi<button data-href="#Compute-capability" class="anchor-icon" translate="no">
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
    </button></h2><p>Kemampuan komputasi perangkat GPU Anda haruslah salah satu dari yang berikut ini: 6.0, 7.0, 7.5, 8.0, 8.6, 9.0.</p>
<p>Untuk memeriksa apakah perangkat GPU Anda memenuhi persyaratan, lihat <a href="https://developer.nvidia.com/cuda-gpus">Kemampuan Komputasi GPU Anda</a> di situs web pengembang NVIDIA.</p>
<h2 id="NVIDIA-driver" class="common-anchor-header">Driver NVIDIA<button data-href="#NVIDIA-driver" class="anchor-icon" translate="no">
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
    </button></h2><p>Driver NVIDIA untuk perangkat GPU Anda harus ada di salah satu <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#linux-distributions">distribusi Linux yang didukung</a>, dan NVIDIA Container Toolkit telah diinstal dengan mengikuti <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">panduan ini</a>.</p>
<p>Untuk pengguna Ubuntu 22.04, Anda dapat menginstal driver dan container toolkit dengan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-545 nvidia-utils-545
<button class="copy-code-btn"></button></code></pre>
<p>Untuk pengguna OS lain, lihat <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html#installing-on-ubuntu-and-debian">panduan penginstalan resmi</a>.</p>
<p>Anda dapat memeriksa apakah driver telah terinstal dengan benar dengan menjalankan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span>
<span class="hljs-attr">version</span>:        <span class="hljs-number">545.29</span><span class="hljs-number">.06</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda disarankan untuk menggunakan driver versi 545 ke atas.</p>
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
<ul>
<li>kubectl adalah alat baris perintah untuk Kubernetes. Gunakan versi kubectl yang berada dalam satu perbedaan versi kecil dari klaster Anda. Menggunakan versi terbaru dari kubectl membantu menghindari masalah yang tidak terduga.</li>
<li>minikube diperlukan saat menjalankan klaster Kubernetes secara lokal. minikube membutuhkan Docker sebagai dependensi. Pastikan Anda menginstal Docker sebelum menginstal Milvus menggunakan Helm. Lihat <a href="https://docs.docker.com/get-docker">Dapatkan Docker</a> untuk informasi lebih lanjut.</li>
</ul>
<table>
<thead>
<tr><th>Sistem operasi</th><th>Perangkat lunak</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Platform Linux</td><td><ul><li>Kubernetes 1.16 atau yang lebih baru</li><li>kubectl</li><li>Helm 3.0.0 atau yang lebih baru</li><li>minikube (untuk Milvus mandiri)</li><li>Docker 19.03 atau yang lebih baru (untuk Milvus mandiri)</li></ul></td><td>Lihat <a href="https://helm.sh/docs/">Dokumen Helm</a> untuk informasi lebih lanjut.</td></tr>
</tbody>
</table>
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
    </button></h2><h3 id="How-can-I-start-a-K8s-cluster-locally-for-test-purposes" class="common-anchor-header">Bagaimana cara memulai cluster K8s secara lokal untuk tujuan pengujian?</h3><p>Anda dapat menggunakan alat seperti <a href="https://minikube.sigs.k8s.io/docs/">minikube</a>, <a href="https://kind.sigs.k8s.io/">kind</a>, dan <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/">Kubeadm</a>, untuk menyiapkan klaster Kubernetes secara lokal dengan cepat. Prosedur berikut ini menggunakan minikube sebagai contoh.</p>
<ol>
<li>Unduh minikube</li>
</ol>
<p>Buka halaman <a href="https://minikube.sigs.k8s.io/docs/start/">Memulai</a>, periksa apakah Anda telah memenuhi persyaratan yang tercantum di bagian <strong>Apa yang Anda perlukan</strong>, klik tombol yang menggambarkan platform target Anda, dan salin perintah untuk mengunduh dan menginstal biner.</p>
<ol start="2">
<li>Memulai cluster K8s menggunakan minikube</li>
</ol>
<pre><code translate="no" class="language-shell">$ minikube start
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>Memeriksa status klaster K8s</li>
</ol>
<p>Anda dapat memeriksa status klaster K8s yang terinstal menggunakan perintah berikut.</p>
<pre><code translate="no" class="language-shell">$ kubectl cluster-info
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Pastikan Anda dapat mengakses klaster K8s melalui <code translate="no">kubectl</code>. Jika Anda belum menginstal <code translate="no">kubectl</code> secara lokal, lihat <a href="https://minikube.sigs.k8s.io/docs/handbook/kubectl/">Menggunakan kubectl di dalam minikube</a>.</p>
</div>
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Bagaimana cara memulai klaster K8s dengan node pekerja GPU?</h3><p>Jika Anda lebih suka menggunakan node pekerja berkemampuan GPU, Anda dapat mengikuti langkah-langkah di bawah ini untuk membuat klaster K8s dengan node pekerja GPU. Kami menyarankan untuk menginstal Milvus pada cluster K8s dengan node pekerja GPU dan menggunakan kelas penyimpanan default yang disediakan.</p>
<ol>
<li>Menyiapkan node pekerja GPU</li>
</ol>
<p>Untuk menggunakan node pekerja berkemampuan GPU, ikuti langkah-langkah di <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#preparing-your-gpu-nodes">Mempersiapkan node GPU Anda</a>.</p>
<ol start="2">
<li>Mengaktifkan dukungan GPU pada K8</li>
</ol>
<p>Terapkan <strong>nvidia-device-plugin</strong> dengan Helm dengan mengikuti <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">langkah-langkah</a> berikut <a href="https://gitlab.com/nvidia/kubernetes/device-plugin/-/blob/main/README.md#deployment-via-helm">.</a></p>
<p>Setelah menyiapkan, lihat sumber daya GPU dengan perintah berikut. Ganti <code translate="no">&lt;gpu-worker-node&gt;</code> dengan nama node yang sebenarnya.</p>
<pre><code translate="no" class="language-shell">  $ kubectl describe node &lt;gpu-worker-node&gt;

  Capacity:
  ...
  nvidia.com/gpu:     4
  ...
  Allocatable:
  ...
  nvidia.com/gpu:     4
  ...
  ```  
<button class="copy-code-btn"></button></code></pre>
