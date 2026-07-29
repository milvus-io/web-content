---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Pelajari cara menginstal Milvus versi mandiri menggunakan Docker.
title: Menjalankan Milvus di Docker (Linux)
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">Menjalankan Milvus di Docker (Linux)<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menjelaskan cara menjalankan instance Milvus di Docker.</p>
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
<li><a href="/docs/id/prerequisite-docker.md">Periksa persyaratan perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Instal Milvus di Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan skrip instalasi untuk menginstalnya sebagai kontainer Docker. Skrip tersebut tersedia di <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositori Milvus</a>. Untuk menginstal Milvus di Docker, cukup jalankan</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Apa yang baru di v3.0.0:</strong></p>
<ul>
<li><strong>Streaming Node</strong>: Kemampuan pemrosesan data yang ditingkatkan</li>
<li><strong>Woodpecker MQ (default)</strong>: Penyebaran Docker ini menjalankan Woodpecker sebagai antrian pesan dengan <strong>sistem berkas lokal</strong> sebagai backend WAL-nya, sehingga tidak diperlukan layanan antrian pesan eksternal. Lihat <a href="/docs/id/woodpecker.md">Woodpecker</a>.</li>
<li><strong>Arsitektur yang Dioptimalkan</strong>: Komponen yang dikonsolidasikan untuk kinerja yang lebih baik</li>
</ul>
<p>Selalu unduh skrip terbaru untuk memastikan Anda mendapatkan konfigurasi dan peningkatan arsitektur terbaru.</p>
<p>Jika Anda ingin menggunakan <a href="https://milvus.io/docs/milvus_backup_overview.md">Backup</a> dalam mode penyebaran mandiri, disarankan untuk menggunakan metode penyebaran <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Jika Anda mengalami masalah saat menarik gambar, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail mengenai masalah tersebut, dan kami akan memberikan dukungan yang diperlukan.</p>
</div>
<p>Setelah menjalankan skrip instalasi:</p>
<ul>
<li>Sebuah kontainer Docker bernama milvus-standalone telah dimulai di port <strong>19530</strong>.</li>
<li>Embed etcd telah diinstal bersama Milvus di kontainer yang sama dan beroperasi di port <strong>2379</strong>. Berkas konfigurasinya dipetakan ke <strong>`embedEtcd.yaml</strong> ` di folder saat ini.</li>
<li>Untuk mengubah konfigurasi Milvus default, tambahkan pengaturan Anda ke berkas <strong>user.yaml</strong> di folder saat ini, lalu mulai ulang layanan.</li>
<li>Volume data Milvus dipetakan ke ` <strong>volumes/milvus</strong> ` di folder saat ini.</li>
</ul>
<p>Anda dapat mengakses Milvus WebUI di <code translate="no">http://127.0.0.1:9091/webui/</code> untuk mempelajari lebih lanjut tentang instance Milvus Anda. Untuk detailnya, lihat <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>.</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(Opsional) Perbarui konfigurasi Milvus<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat memodifikasi konfigurasi Milvus di berkas <strong>user.yaml</strong> di folder saat ini. Misalnya, untuk mengubah <code translate="no">proxy.healthCheckTimeout</code> menjadi <code translate="no">1000</code> ms, Anda dapat memodifikasi berkas tersebut sebagai berikut:</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Kemudian, mulai ulang layanan sebagai berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk item konfigurasi yang berlaku, lihat <a href="/docs/id/system_configuration.md">Konfigurasi Sistem</a>.</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">Memperbarui Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat melakukan pembaruan ke versi terbaru Milvus menggunakan perintah pembaruan bawaan. Perintah ini secara otomatis mengunduh konfigurasi terbaru dan gambar Milvus:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Perintah upgrade secara otomatis:</p>
<ul>
<li>Mengunduh skrip instalasi terbaru dengan konfigurasi yang diperbarui</li>
<li>Mengunduh gambar Docker Milvus terbaru</li>
<li>Memulai ulang kontainer dengan versi baru</li>
<li>Menjaga data dan konfigurasi yang sudah ada</li>
</ul>
<p>Ini adalah cara yang disarankan untuk melakukan pembaruan pada deployment Milvus standalone Anda.</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Hentikan dan hapus Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menghentikan dan menghapus kontainer ini sebagai berikut</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">Ketergantungan opsional<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>Secara default, deployment ini menjalankan <strong>Woodpecker</strong> (WAL sistem file lokal) sebagai antrian pesan dan <strong>etcd tertanam</strong> untuk metadata — tidak perlu menginstal apa pun lagi. Untuk menggunakan antrian pesan yang berbeda atau menghubungkan penyimpanan objek eksternal / metadata, lihat:</p>
<ul>
<li>Antrian pesan: <a href="/docs/id/woodpecker.md">Woodpecker</a> (default) · <a href="/docs/id/mq_pulsar.md">Pulsar</a> · <a href="/docs/id/mq_kafka.md">Kafka</a> · <a href="/docs/id/mq_rocksmq.md">RocksMQ</a></li>
<li>Penyimpanan objek: <a href="/docs/id/deploy_s3.md">MinIO</a> (default) · <a href="/docs/id/deploy_s3.md">AWS S3</a> · <a href="/docs/id/abs.md">Azure Blob</a> · <a href="/docs/id/gcs.md">GCP Cloud Storage</a> · <a href="/docs/id/deploy_s3.md">Aliyun OSS</a> · <a href="/docs/id/deploy_s3.md">Tencent COS</a> · <a href="/docs/id/deploy_s3.md">Huawei OBS</a> · <a href="/docs/id/deploy_s3.md">S3-compatible</a></li>
<li>Metadata: <a href="/docs/id/deploy_etcd.md">etcd</a></li>
</ul>
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
<li><p>Pelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/insert-update-delete.md">Sisipkan, Upsert, &amp; Hapus</a></li>
<li><a href="/docs/id/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/upgrade_milvus_cluster-helm.md">Tingkatkan Milvus Menggunakan Helm Chart</a>.</p></li>
<li><p><a href="/docs/id/scaleout.md">Skalakan kluster Milvus Anda</a>.</p></li>
<li><p>Terapkan kluster Milvus Anda di cloud:</p>
<ul>
<li><a href="/docs/id/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>, antarmuka web yang intuitif untuk pemantauan dan pengelolaan Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk men-debug Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk pengelolaan Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/monitor.md">Pantau Milvus dengan Prometheus</a>.</p></li>
</ul>
