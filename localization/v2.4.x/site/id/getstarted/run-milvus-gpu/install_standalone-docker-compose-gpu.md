---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: Pelajari cara menginstal cluster Milvus di Kubernetes.
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
    </button></h1><p>Halaman ini mengilustrasikan cara memulai instans Milvus dengan dukungan GPU menggunakan Docker Compose.</p>
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
    </button></h2><ul>
<li><a href="https://docs.docker.com/get-docker/">Instal Docker</a>.</li>
<li><a href="/docs/id/v2.4.x/prerequisite-gpu.md">Periksa persyaratan perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
</ul>
<div class="alert note">
<p>Jika Anda mengalami masalah dalam menarik citra, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail tentang masalahnya, dan kami akan memberi Anda dukungan yang diperlukan.</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">Menginstal Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk menginstall Milvus dengan dukungan GPU menggunakan Docker Compose, ikuti langkah-langkah berikut.</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. Unduh dan konfigurasikan berkas YAML</h3><p>Unduh <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> dan simpan sebagai docker-compose.yml secara manual, atau dengan perintah berikut.</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>Anda perlu membuat beberapa perubahan pada variabel lingkungan dari layanan mandiri dalam berkas YAML sebagai berikut:</p>
<ul>
<li>Untuk menetapkan perangkat GPU tertentu ke Milvus, cari bidang <code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> dalam definisi layanan <code translate="no">standalone</code> dan ganti nilainya dengan ID GPU yang diinginkan. Anda dapat menggunakan alat <code translate="no">nvidia-smi</code>, yang disertakan dengan driver tampilan GPU NVIDIA, untuk menentukan ID perangkat GPU. Milvus mendukung beberapa perangkat GPU.</li>
</ul>
<p>Menetapkan satu perangkat GPU ke Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>Menetapkan beberapa perangkat GPU ke Milvus:</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. Mulai Milvus</h3><p>Pada direktori yang menyimpan docker-compose.yml, jalankan Milvus dengan menjalankannya:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda gagal menjalankan perintah di atas, periksa apakah sistem Anda telah menginstal Docker Compose V1. Jika demikian, Anda disarankan untuk bermigrasi ke Docker Compose V2 sesuai dengan catatan di <a href="https://docs.docker.com/compose/">halaman ini</a>.</p>
</div>
<p>Setelah memulai Milvus,</p>
<ul>
<li>Kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> sudah aktif.<ul>
<li>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke hos dan memetakan datanya ke <strong>volume/etcd</strong> dalam folder saat ini.</li>
<li>Kontainer <strong>milvus-minio</strong> melayani port <strong>9090</strong> dan <strong>9091</strong> secara lokal dengan kredensial autentikasi default dan memetakan datanya ke <strong>volume/minio</strong> dalam folder saat ini.</li>
<li>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> secara lokal dengan pengaturan default dan memetakan datanya ke <strong>volume/milvus</strong> di folder saat ini.</li>
</ul></li>
</ul>
<p>Anda dapat memeriksa apakah kontainer sudah aktif dan berjalan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda telah menetapkan beberapa perangkat GPU ke Milvus di docker-compose.yml, Anda dapat menentukan perangkat GPU mana yang terlihat atau tersedia untuk digunakan.</p>
<p>Membuat perangkat GPU <code translate="no">0</code> terlihat oleh Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Membuat perangkat GPU <code translate="no">0</code> dan <code translate="no">1</code> terlihat oleh Milvus:</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menghentikan dan menghapus kontainer ini sebagai berikut.</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">Mengonfigurasi kumpulan memori<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah Milvus aktif dan berjalan, Anda dapat menyesuaikan kumpulan memori dengan memodifikasi pengaturan <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code> dalam berkas <code translate="no">milvus.yaml</code>.</p>
<div class="alert note">
<p>Berkas <code translate="no">milvus.yaml</code> terletak di direktori <code translate="no">/milvus/configs/</code> di dalam kontainer Milvus.</p>
</div>
<p>Untuk mengonfigurasi kumpulan memori, ubah pengaturan <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code> dalam berkas <code translate="no">milvus.yaml</code> sebagai berikut.</p>
<ol>
<li><p>Gunakan perintah berikut untuk menyalin <code translate="no">milvus.yaml</code> dari kontainer Milvus ke mesin lokal Anda. Ganti <code translate="no">&lt;milvus_container_id&gt;</code> dengan ID kontainer Milvus Anda yang sebenarnya.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Buka berkas <code translate="no">milvus.yaml</code> yang telah disalin dengan editor teks pilihan Anda. Sebagai contoh, menggunakan vim:</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Edit pengaturan <code translate="no">initMemSize</code> dan <code translate="no">maxMemSize</code> sesuai kebutuhan dan simpan perubahan Anda:</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: Ukuran awal dari kumpulan memori. Defaultnya adalah 1024.</li>
<li><code translate="no">maxMemSize</code>: Ukuran maksimum dari kumpulan memori. Setelan awal adalah 2048.</li>
</ul></li>
<li><p>Gunakan perintah berikut untuk menyalin berkas <code translate="no">milvus.yaml</code> yang telah dimodifikasi kembali ke kontainer Milvus. Ganti <code translate="no">&lt;milvus_container_id&gt;</code> dengan ID kontainer Milvus Anda yang sebenarnya.</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mulai ulang kontainer Milvus untuk menerapkan perubahan:</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
    </button></h2><p>Setelah menginstal Milvus di Docker, Anda dapat:</p>
<ul>
<li><p>Memeriksa <a href="/docs/id/v2.4.x/quickstart.md">Mulai Cepat</a> untuk melihat apa yang dapat dilakukan Milvus.</p></li>
<li><p>Mempelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/v2.4.x/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/v2.4.x/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/v2.4.x/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/v2.4.x/insert-update-delete.md">Menyisipkan, Menambah &amp; Menghapus</a></li>
<li><a href="/docs/id/v2.4.x/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/v2.4.x/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/v2.4.x/upgrade_milvus_cluster-helm.md">Tingkatkan Milvus Menggunakan Bagan Helm</a>.</p></li>
<li><p>Mengatur<a href="/docs/id/v2.4.x/scaleout.md">skala cluster Milvus Anda</a>.</p></li>
<li><p>Menerapkan cluster Milvu Anda di awan:</p>
<ul>
<li><a href="/docs/id/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk men-debug Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://milvus.io/docs/attu.md">Attu</a>, alat GUI sumber terbuka untuk manajemen Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/v2.4.x/monitor.md">Memantau Milvus dengan Prometheus</a>.</p></li>
</ul>
