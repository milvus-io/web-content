---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: >-
  Pelajari cara menginstal Milvus versi mandiri dengan dukungan GPU menggunakan
  Docker Compose.
title: Menjalankan Milvus dengan Dukungan GPU Menggunakan Docker Compose
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">Menjalankan Milvus dengan Dukungan GPU Menggunakan Docker Compose<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menjelaskan cara menjalankan instance Milvus dengan dukungan GPU menggunakan Docker Compose.</p>
<h2 id="Prerequisites" class="common-anchor-header">Persyaratan<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/get-docker/">Instal Docker</a>.</li>
<li><a href="/docs/id/prerequisite-gpu.md">Periksa persyaratan perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
</ul>
<div class="alert note">
<p>Jika Anda mengalami masalah saat menarik gambar, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail mengenai masalah tersebut, dan kami akan memberikan dukungan yang diperlukan.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Instal Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menginstal Milvus dengan dukungan GPU menggunakan Docker Compose, ikuti langkah-langkah berikut.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Unduh dan konfigurasikan berkas YAML<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Unduh <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> dan simpan sebagai docker-compose.yml secara manual, atau dengan perintah berikut.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk memeriksa unduhan, bandingkan hasil perintah berikut dengan ringkasan (digest) <code translate="no">sha256</code> yang tercantum untuk <code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> di <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">halaman rilis</a>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat mengubah perangkat GPU yang ditetapkan ke Milvus di bagian ` <code translate="no">deploy</code> ` dari layanan ` <code translate="no">standalone</code> ` dalam berkas YAML sebagai berikut:</p>
<ul>
<li>Untuk menetapkan perangkat GPU tertentu ke Milvus, cari bidang ` <code translate="no">deploy.resources.reservations.devices[0].device_ids</code> ` dalam definisi layanan ` <code translate="no">standalone</code> ` dan ganti nilainya dengan ID GPU yang diinginkan. Anda dapat menggunakan alat ` <code translate="no">nvidia-smi</code> `, yang disertakan dalam driver tampilan GPU NVIDIA, untuk menentukan ID perangkat GPU. Milvus mendukung beberapa perangkat GPU.</li>
</ul>
<p>Menetapkan satu perangkat GPU ke Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Menetapkan beberapa perangkat GPU ke Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Jalankan Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Di direktori yang berisi berkas `docker-compose.yml`, jalankan Milvus dengan perintah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda gagal menjalankan perintah di atas, periksa apakah sistem Anda telah menginstal Docker Compose V1. Jika demikian, Anda disarankan untuk beralih ke Docker Compose V2 sesuai dengan catatan pada <a href="https://docs.docker.com/compose/">halaman ini</a>.</p>
</div>
<p>Setelah Milvus dimulai,</p>
<ul>
<li>Kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> sudah aktif.
<ul>
<li>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke host dan memetakan datanya ke <strong>volumes/etcd</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-minio</strong> melayani port <strong>9000</strong> dan <strong>9001</strong> dengan kredensial otentikasi default dan memetakan datanya ke <strong>volumes/minio</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> dan <strong>9091</strong> dengan pengaturan default dan memetakan datanya ke <strong>volumes/milvus</strong> di folder saat ini.</li>
</ul></li>
</ul>
<p>Layanan ` <code translate="no">standalone</code> ` menetapkan ` <code translate="no">security_opt: seccomp:unconfined</code>`, sehingga kontainer Milvus berjalan tanpa profil seccomp Docker default.</p>
<div class="alert warning">
<blockquote>
<p>Berkas Compose mempublikasikan port-port ini tanpa alamat IP host, sehingga Docker mengikatnya ke semua antarmuka jaringan host, dan mesin lain yang dapat menjangkau host ini dapat terhubung ke Milvus dan MinIO. MinIO menggunakan kunci akses dan kunci rahasia <code translate="no">minioadmin</code>, yang ditetapkan dalam berkas Compose. Untuk mempublikasikan port hanya pada alamat loopback, tambahkan <code translate="no">127.0.0.1:</code> ke entri <code translate="no">ports</code> pada layanan <code translate="no">minio</code> dan <code translate="no">standalone</code> di <code translate="no">docker-compose.yml</code>, misalnya <code translate="no">&quot;127.0.0.1:19530:19530&quot;</code>, lalu jalankan <code translate="no">sudo docker compose up -d</code> kembali. Untuk detailnya, lihat <a href="https://docs.docker.com/engine/network/port-publishing/">Publikasi dan Pemetaan Port</a>. Untuk menggunakan kredensial MinIO lainnya, ubah <code translate="no">MINIO_ACCESS_KEY</code> dan <code translate="no">MINIO_SECRET_KEY</code> pada layanan <code translate="no">minio</code>, lalu tetapkan nilai yang sama pada <code translate="no">minio.accessKeyID</code> dan <code translate="no">minio.secretAccessKey</code> dalam konfigurasi Milvus. Untuk mewajibkan nama pengguna dan kata sandi pada koneksi klien ke Milvus, lihat <a href="/docs/id/authenticate.md">Otentikasi Akses Pengguna</a>.</p>
</blockquote>
</div>
<p>Anda dapat memeriksa apakah kontainer-kontainer tersebut aktif dan berjalan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>Secara default, perintah ini hanya menampilkan kontainer yang sedang berjalan. Pastikan hasil keluaran mencantumkan kontainer <strong>milvus-etcd</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-standalone</strong>, serta kolom ` <code translate="no">STATUS</code> ` pada masing-masing kontainer tersebut dimulai dengan ` <code translate="no">Up</code>`.</p>
<p>Anda juga dapat mengakses Milvus WebUI di <code translate="no">http://127.0.0.1:9091/webui/</code> untuk mempelajari lebih lanjut tentang instance Milvus Anda. Untuk detailnya, lihat <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>.</p>
<p>Untuk mengubah perangkat GPU yang digunakan Milvus setelah layanan dimulai, edit bidang ` <code translate="no">device_ids</code> ` di bawah ` <code translate="no">deploy.resources.reservations.devices</code> ` pada layanan ` <code translate="no">standalone</code> ` dalam berkas `docker-compose.yml` seperti yang ditunjukkan pada langkah 1, lalu jalankan perintah berikut. Karena konfigurasi layanan telah berubah, ` <code translate="no">docker compose up</code> ` akan berhenti dan membuat ulang kontainer <strong>`milvus-standalone</strong> `. Untuk detailnya, lihat <a href="https://docs.docker.com/compose/how-tos/gpu-support/">Menjalankan layanan Docker Compose dengan akses GPU</a>.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menghentikan dan menghapus kontainer ini sebagai berikut.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Konfigurasi pool memori<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Milvus aktif dan berjalan, Anda dapat menyesuaikan pool memori dengan mengubah pengaturan ` <code translate="no">initMemSize</code> ` dan ` <code translate="no">maxMemSize</code> ` di bagian ` <code translate="no">gpu</code> ` dalam konfigurasi Milvus.</p>
<div class="alert note">
<p>Berkas ` <code translate="no">milvus.yaml</code> ` terletak di direktori ` <code translate="no">/milvus/configs/</code> ` di dalam kontainer Milvus. Pengaturan dalam berkas ` <code translate="no">user.yaml</code> ` di direktori yang sama akan menggantikan nilai-nilai di ` <code translate="no">milvus.yaml</code>`.</p>
</div>
<p>Untuk mempertahankan pengaturan Anda saat kontainer dibuat ulang, simpan pengaturan tersebut dalam berkas ` <code translate="no">user.yaml</code> ` di host dan pasang (mount) berkas tersebut ke dalam kontainer sebagai berikut.</p>
<ol>
<li><p>Di direktori yang menyimpan berkas `docker-compose.yml`, buat berkas bernama ` <code translate="no">user.yaml</code> ` dengan pengaturan yang ingin Anda ubah. Contoh berikut menunjukkan bagian ` <code translate="no">gpu</code> ` beserta nilai defaultnya. Gantilah nilai-nilai tersebut dengan ukuran yang Anda butuhkan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Ukuran awal pool memori, dalam MB. Nilai defaultnya adalah 2048.</li>
<li><code translate="no">maxMemSize</code>: Ukuran maksimum pool memori, dalam MB. Nilai defaultnya adalah 4096.</li>
</ul></li>
<li><p>Di docker-compose.yml, tambahkan berkas <code translate="no">user.yaml</code> ke daftar <code translate="no">volumes</code> pada layanan <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Buat ulang kontainer Milvus untuk menerapkan perubahan:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>Setelah berkas dipasang, mulai ulang layanan ` <code translate="no">standalone</code> ` untuk menerapkan perubahan selanjutnya pada ` <code translate="no">user.yaml</code>`:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 dinonaktifkan secara default. Aktifkan fitur ini sebelum menggunakan fitur-fitur yang bergantung padanya. Untuk persyaratan dan pertimbangan kompatibilitas, lihat <a href="/docs/id/storage-v3.md">Storage V3</a>.</p>
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
    </button></h2><p>Setelah menginstal Milvus di Docker, Anda dapat:</p>
<ul>
<li><p>Lihat <a href="/docs/id/quickstart.md">Panduan Cepat</a> untuk mengetahui apa saja yang dapat dilakukan Milvus.</p></li>
<li><p>Periksa <a href="/docs/id/milvus-webui.md">Milvus WebUI</a> untuk mempelajari lebih lanjut tentang instance Milvus.</p></li>
<li><p>Pelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/insert-update-delete.md">Sisipkan, Upsert, dan Hapus</a></li>
<li><a href="/docs/id/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/upgrade_milvus_standalone-docker.md">Tingkatkan Milvus Standalone dengan Docker Compose</a>. Halaman tersebut menampilkan tag gambar CPU. Untuk penyebaran GPU ini, pertahankan sufiks " <code translate="no">-gpu</code> " (<code translate="no">milvusdb/milvus:v3.0.5-gpu</code>) dan pertahankan pengaturan " <code translate="no">deploy</code> " serta " <code translate="no">user.yaml</code> " Anda.</p></li>
<li><p><a href="/docs/id/scaleout.md">Skalakan kluster Milvus</a> di Kubernetes. Prosedur tersebut menggunakan Helm dan tidak berlaku untuk penyebaran Docker ini.</p></li>
<li><p>Deploy kluster Milvus Anda di cloud:</p>
<ul>
<li><a href="/docs/id/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>, antarmuka web intuitif untuk pemantauan dan pengelolaan Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk debugging Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk pengelolaan Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/monitor.md">Pantau Milvus dengan Prometheus</a>.</p></li>
</ul>
