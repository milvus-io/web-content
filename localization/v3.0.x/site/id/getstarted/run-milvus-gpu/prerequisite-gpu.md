---
id: prerequisite-gpu.md
label: GPU requirements
related_key: GPU
summary: Pelajari persiapan yang diperlukan sebelum menginstal Milvus dengan GPU.
title: Persyaratan untuk Menginstal Milvus dengan GPU
---
<h1 id="Requirements-for-Installing-Milvus-with-GPU" class="common-anchor-header">Persyaratan untuk Menginstal Milvus dengan GPU<button data-href="#Requirements-for-Installing-Milvus-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini mencantumkan persyaratan perangkat keras dan perangkat lunak untuk mengonfigurasi Milvus dengan dukungan GPU.</p>
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
    </button></h2><p>Gambar GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> dirancang untuk perangkat GPU dengan kemampuan komputasi 7.0, 7.5, 8.0, 8.6, 9.0, 10.0, atau 12.0. Perangkat GPU Anda harus memiliki salah satu kemampuan komputasi tersebut, atau kemampuan komputasi yang lebih baru yang dapat menjalankan kode yang dibuat untuk salah satunya, seperti 8.9 atau 12.1. Untuk detailnya, lihat <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/cuda-platform.html#binary-compatibility">Kompatibilitas Biner</a> dan <a href="https://docs.nvidia.com/cuda/cuda-programming-guide/05-appendices/compute-capabilities.html#family-specific-features">Fitur Khusus Keluarga</a>.</p>
<p>Untuk memeriksa apakah perangkat GPU Anda memenuhi persyaratan tersebut, lihat <a href="https://developer.nvidia.com/cuda-gpus">Kemampuan Komputasi GPU Anda</a> di situs web pengembang NVIDIA.</p>
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
    </button></h2><p>Host Anda harus menjalankan salah satu <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html">distribusi Linux yang didukung oleh NVIDIA Container Toolkit</a> dan telah menginstal driver NVIDIA untuk perangkat GPU Anda.</p>
<p>Gambar GPU Milvus <code translate="no">milvusdb/milvus:v3.0.5-gpu</code> didasarkan pada CUDA 12.9 Update 1. Pengaturan " <code translate="no">NVIDIA_REQUIRE_CUDA</code> " memerlukan " <code translate="no">cuda&gt;=12.9</code>", sehingga driver NVIDIA harus mendukung CUDA 12.9 atau versi yang lebih baru. Untuk CUDA 12.9 Update 1, NVIDIA mencantumkan versi driver 575.57.08 atau yang lebih baru pada Linux x86_64. Untuk versi driver dari setiap rilis CUDA, lihat <a href="https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html#cuda-driver">catatan rilis CUDA Toolkit</a>.</p>
<p>Pengaturan yang sama juga mendukung driver dari cabang 535, 550, 560, 565, dan 570 pada beberapa merek GPU, tetapi tidak pada GPU GeForce atau Titan. Dengan driver ini, gambar bergantung pada <a href="https://docs.nvidia.com/deploy/cuda-compatibility/forward-compatibility.html">kompatibilitas maju CUDA</a>, yang hanya didukung NVIDIA pada GPU NVIDIA Data Center, SKU kartu RTX NGC Server Ready tertentu, dan papan Jetson. Jika driver tidak memenuhi persyaratan ini, NVIDIA Container Toolkit akan melaporkan kesalahan " <code translate="no">unsatisfied condition</code> " dan tidak akan menyiapkan GPU untuk kontainer tersebut.</p>
<p>Bagi pengguna Ubuntu 22.04, Anda dapat menginstal driver dengan perintah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> apt install --no-install-recommends nvidia-headless-580 nvidia-utils-580</span>
<button class="copy-code-btn"></button></code></pre>
<p>GPU dengan kemampuan komputasi 10.0 atau 12.0 (Blackwell) hanya didukung oleh modul kernel terbuka dari driver NVIDIA. Untuk GPU ini, instal ` <code translate="no">nvidia-headless-580-open</code> ` alih-alih ` <code translate="no">nvidia-headless-580</code>`. Modul kernel terbuka tidak mendukung GPU yang lebih lama dari Turing (kemampuan komputasi 7.5), seperti Volta (7.0), jadi gunakan ` <code translate="no">nvidia-headless-580</code> ` untuk GPU tersebut.</p>
<p>Untuk distribusi Linux lainnya, lihat <a href="https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/index.html">Panduan Instalasi Driver NVIDIA</a>.</p>
<p>Anda dapat memeriksa apakah driver telah terinstal dengan benar dengan menjalankan perintah berikut. Hasilnya akan menampilkan versi driver yang terinstal.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">modinfo nvidia | grep <span class="hljs-string">&quot;^version&quot;</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="NVIDIA-Container-Toolkit" class="common-anchor-header">NVIDIA Container Toolkit<button data-href="#NVIDIA-Container-Toolkit" class="anchor-icon" translate="no">
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
    </button></h2><p>Instal NVIDIA Container Toolkit dengan mengikuti langkah-langkah untuk distribusi Linux Anda dalam <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html">panduan instalasi NVIDIA Container Toolkit</a>.</p>
<p>Jika Anda menginstal Milvus dengan Docker Compose, konfigurasikan Docker untuk menggunakan NVIDIA Container Runtime, mulai ulang daemon Docker, lalu jalankan beban kerja contoh untuk memeriksa apakah kontainer dapat mengakses GPU:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> nvidia-ctk runtime configure --runtime=docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> systemctl restart docker</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker run --<span class="hljs-built_in">rm</span> --runtime=nvidia --gpus all ubuntu nvidia-smi</span>
<button class="copy-code-btn"></button></code></pre>
<p>Perintah terakhir menjalankan ` <code translate="no">nvidia-smi</code> ` dalam sebuah kontainer dan menampilkan informasi mengenai perangkat GPU pada host. Jika Anda menginstal Milvus di Kubernetes, siapkan node pekerja GPU Anda sesuai dengan yang dijelaskan dalam FAQ di bagian akhir halaman ini.</p>
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
    </button></h2><p>Persyaratan di bagian ini dan FAQ di bawah ini berlaku saat Anda menginstal Milvus dengan dukungan GPU di Kubernetes menggunakan Helm.</p>
<p>Disarankan agar Anda menjalankan kluster Kubernetes pada platform Linux.</p>
<ul>
<li>`kubectl` adalah alat baris perintah untuk Kubernetes. Gunakan versi `kubectl` yang selisih versinya tidak lebih dari satu versi minor dari kluster Anda. Menggunakan versi terbaru `kubectl` membantu menghindari masalah yang tidak terduga.</li>
<li>minikube diperlukan saat menjalankan klaster Kubernetes secara lokal. minikube memerlukan Docker sebagai dependensi. Pastikan Anda menginstal Docker sebelum menginstal Milvus menggunakan Helm. Lihat <a href="https://docs.docker.com/get-docker">Dapatkan Docker</a> untuk informasi lebih lanjut.</li>
</ul>
<table>
<thead>
<tr><th>Sistem operasi</th><th>Perangkat lunak</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Platform Linux</td><td><ul><li>Kubernetes 1.16 atau yang lebih baru</li><li>kubectl</li><li>Helm 3.0.0 atau yang lebih baru</li><li>minikube (untuk Milvus standalone)</li><li>Docker 19.03 atau yang lebih baru (untuk Milvus standalone)</li></ul></td><td>Lihat <a href="https://helm.sh/docs/">Helm Docs</a> untuk informasi lebih lanjut.</td></tr>
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
<p>Buka halaman <a href="https://minikube.sigs.k8s.io/docs/start/">Memulai</a>, periksa apakah Anda telah memenuhi persyaratan yang tercantum di bagian <strong>Yang Anda perlukan</strong>, klik tombol yang sesuai dengan platform target Anda, lalu salin perintah untuk mengunduh dan menginstal file biner.</p>
<ol start="2">
<li>Mulai kluster K8s menggunakan minikube</li>
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
<h3 id="How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="common-anchor-header">Bagaimana cara memulai kluster K8s dengan node pekerja GPU?<button data-href="#How-can-I-start-a-K8s-cluster-with-GPU-worker-nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>Jika Anda lebih suka menggunakan node pekerja yang mendukung GPU, Anda dapat mengikuti langkah-langkah di bawah ini untuk membuat klaster K8s dengan node pekerja GPU. Kami menyarankan untuk menginstal Milvus pada klaster K8s dengan node pekerja GPU dan menggunakan kelas penyimpanan default yang disediakan.</p>
<ol>
<li>Siapkan node pekerja GPU</li>
</ol>
<p>Untuk menggunakan node pekerja yang mendukung GPU, ikuti langkah-langkah di <a href="https://github.com/NVIDIA/k8s-device-plugin#preparing-your-gpu-nodes">Siapkan node GPU Anda</a>.</p>
<ol start="2">
<li>Aktifkan dukungan GPU di K8s</li>
</ol>
<p>Deploy <strong>nvidia-device-plugin</strong> menggunakan Helm dengan mengikuti <a href="https://github.com/NVIDIA/k8s-device-plugin#deployment-via-helm">langkah-langkah berikut</a>.</p>
<p>Setelah penyiapan selesai, lihat sumber daya GPU dengan perintah berikut. Ganti ` <code translate="no">&lt;gpu-worker-node&gt;</code> ` dengan nama node yang sebenarnya.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">  $ </span><span class="language-bash">kubectl describe node &lt;gpu-worker-node&gt;</span>

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
