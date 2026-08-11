---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Pelajari cara menginstal Milvus versi mandiri menggunakan Docker Compose.
title: Menjalankan Milvus dengan Docker Compose (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">Menjalankan Milvus dengan Docker Compose (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>Halaman ini menjelaskan cara menjalankan instance Milvus di Docker menggunakan Docker Compose.</p>
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
    </button></h2><p>Milvus menyediakan berkas konfigurasi Docker Compose di repositori Milvus. Untuk menginstal Milvus menggunakan Docker Compose, cukup jalankan</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Penerapan default (v3.0-beta):</strong> <code translate="no">docker compose up -d</code> memulai tiga kontainer — <code translate="no">milvus-etcd</code> (metadata), <code translate="no">milvus-minio</code> (penyimpanan objek), dan <code translate="no">milvus-standalone</code>. Antrian pesan menggunakan <strong>Woodpecker (terintegrasi, dengan MinIO / penyimpanan objek sebagai backend WAL-nya)</strong>, sehingga tidak diperlukan kontainer antrian pesan terpisah.</p>
<p><strong>Antrian pesan default berdasarkan versi:</strong></p>
<ul>
<li><strong>2.5.x</strong> — antrian pesan default adalah <strong>RocksMQ</strong>.</li>
<li><strong>2.6.x dan seterusnya</strong> — antrian pesan default adalah <strong>Woodpecker (terintegrasi)</strong>.</li>
</ul>
<p>Selalu unduh konfigurasi Docker Compose terbaru untuk memastikan kompatibilitas dengan fitur v3.0-beta.</p>
<ul>
<li><p>Jika Anda gagal menjalankan perintah di atas, silakan periksa apakah sistem Anda telah menginstal Docker Compose V1. Jika demikian, Anda disarankan untuk bermigrasi ke Docker Compose V2 sesuai dengan catatan pada <a href="https://docs.docker.com/compose/">halaman ini</a>.</p></li>
<li><p>Jika Anda mengalami masalah saat menarik gambar, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail mengenai masalah tersebut, dan kami akan memberikan dukungan yang diperlukan.</p></li>
</ul>
</div>
<p>Setelah Milvus dimulai,</p>
<ul>
<li>kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> sudah aktif.
<ul>
<li>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke host dan memetakan datanya ke <strong>volumes/etcd</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-minio</strong> melayani port <strong>9000</strong> dan <strong>9001</strong> secara lokal dengan kredensial otentikasi default dan memetakan datanya ke <strong>volumes/minio</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> secara lokal dengan pengaturan default dan memetakan datanya ke <strong>volumes/milvus</strong> di folder saat ini.</li>
</ul></li>
</ul>
<p>Anda dapat memeriksa apakah kontainer-kontainer tersebut aktif dan berjalan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">docker compose ps</span>

NAME                IMAGE   COMMAND                  SERVICE      CREATED         STATUS                   PORTS
milvus-etcd         …       &quot;etcd -advertise-cli…&quot;   etcd         2 minutes ago   Up 2 minutes (healthy)   2379-2380/tcp
milvus-minio        …       &quot;/usr/bin/docker-ent…&quot;   minio        2 minutes ago   Up 2 minutes (healthy)   9000-9001/tcp
milvus-standalone   …       &quot;/tini -- milvus run…&quot;   standalone   2 minutes ago   Up 2 minutes (healthy)   0.0.0.0:9091-&gt;9091/tcp, 0.0.0.0:19530-&gt;19530/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat mengakses Milvus WebUI di <code translate="no">http://127.0.0.1:9091/webui/</code> untuk mempelajari lebih lanjut tentang instance Milvus Anda. Untuk detailnya, lihat <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>.</p>
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
    </button></h2><p>Untuk memperbarui konfigurasi Milvus agar sesuai dengan kebutuhan Anda, Anda perlu memodifikasi berkas ` <code translate="no">/milvus/configs/user.yaml</code> ` di dalam kontainer ` <code translate="no">milvus-standalone</code> `.</p>
<ol>
<li><p>Akses kontainer ` <code translate="no">milvus-standalone</code> `.</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tambahkan konfigurasi tambahan untuk menggantikan konfigurasi default.
Berikut ini mengasumsikan bahwa Anda perlu menggantikan konfigurasi default <code translate="no">proxy.healthCheckTimeout</code>. Untuk item konfigurasi yang berlaku, lihat <a href="/docs/id/system_configuration.md">Konfigurasi Sistem</a>.</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Mulai ulang kontainer <code translate="no">milvus-standalone</code> untuk menerapkan perubahan.</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upgrading-from-Milvus-25x-to-26x" class="common-anchor-header">Meningkatkan versi dari Milvus 2.5.x ke 2.6.x<button data-href="#Upgrading-from-Milvus-25x-to-26x" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Batasan Antrian Pesan</strong>: Saat melakukan pembaruan ke Milvus v3.0-beta, Anda harus mempertahankan pilihan antrian pesan saat ini. Beralih antara sistem antrian pesan yang berbeda selama proses pembaruan tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia pada versi mendatang.</p>
<p>Karena versi 2.6.x mengubah antrian pesan default menjadi Woodpecker, instance yang menjalankan <strong>RocksMQ</strong> pada versi 2.5.x harus <strong>secara eksplisit mengunci (pin) RocksMQ sebelum melakukan pembaruan</strong> — jika tidak, proses pembaruan akan mencoba mengubah antrian pesan, yang tidak didukung. Setelah mengunduh berkas Docker Compose versi 2.6.x, atur kembali jenis antrian pesan menjadi ` <code translate="no">rocksmq</code> ` dalam file ` <code translate="no">user.yaml</code> ` Anda, lalu lakukan pembaruan:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml — keep RocksMQ across the 2.5.x → 2.6.x upgrade</span>
<span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk mengganti antrian pesan <em>setelah</em> melakukan pembaruan, lihat <a href="/docs/id/switch-mq-type.md">Mengganti Antrian Pesan</a>.</p>
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
    </button></h2><p>Penerapan ini menjalankan <strong>Woodpecker</strong> (terintegrasi, backend MinIO WAL) untuk pengiriman pesan, <strong>etcd</strong> untuk metadata, dan <strong>MinIO</strong> untuk penyimpanan objek. Untuk menggunakan antrian pesan yang berbeda atau menghubungkan penyimpanan objek/metadata eksternal, lihat:</p>
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
