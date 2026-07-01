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
<li><a href="/docs/id/v2.6.x/prerequisite-docker.md">Periksa persyaratan perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Apa yang baru di v2.6.17:</strong></p>
<ul>
<li><strong>Arsitektur yang Ditingkatkan</strong>: Menampilkan Streaming Node baru dan komponen yang dioptimalkan</li>
<li><strong>Dependensi yang Diperbarui</strong>: Termasuk versi terbaru MinIO dan etcd</li>
<li><strong>Konfigurasi yang Ditingkatkan</strong>: Pengaturan yang dioptimalkan untuk kinerja yang lebih baik</li>
</ul>
<p>Selalu unduh konfigurasi Docker Compose terbaru untuk memastikan kompatibilitas dengan fitur-fitur v2.6.17.</p>
<ul>
<li><p>Jika Anda gagal menjalankan perintah di atas, silakan periksa apakah sistem Anda telah menginstal Docker Compose V1. Jika demikian, Anda disarankan untuk bermigrasi ke Docker Compose V2 sesuai dengan catatan di <a href="https://docs.docker.com/compose/">halaman ini</a>.</p></li>
<li><p>Jika Anda mengalami masalah saat menarik gambar, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail mengenai masalah tersebut, dan kami akan memberikan dukungan yang diperlukan.</p></li>
</ul>
</div>
<p>Setelah Milvus dimulai,</p>
<ul>
<li>kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> sudah aktif.
<ul>
<li>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke host dan memetakan datanya ke <strong>volumes/etcd</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-minio</strong> melayani port <strong>9090</strong> dan <strong>9091</strong> secara lokal dengan kredensial otentikasi default dan memetakan datanya ke <strong>volumes/minio</strong> di folder saat ini.</li>
<li>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> secara lokal dengan pengaturan default dan memetakan datanya ke <strong>volumes/milvus</strong> di folder saat ini.</li>
</ul></li>
</ul>
<p>Anda dapat memeriksa apakah kontainer-kontainer tersebut aktif dan berjalan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Anda juga dapat mengakses Milvus WebUI di <code translate="no">http://127.0.0.1:9091/webui/</code> untuk mempelajari lebih lanjut tentang instance Milvus Anda. Untuk detailnya, lihat <a href="/docs/id/v2.6.x/milvus-webui.md">Milvus WebUI</a>.</p>
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
Berikut ini mengasumsikan bahwa Anda perlu menggantikan konfigurasi default <code translate="no">proxy.healthCheckTimeout</code>. Untuk item konfigurasi yang berlaku, lihat <a href="/docs/id/v2.6.x/system_configuration.md">Konfigurasi Sistem</a>.</p>
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
<li><p>Lihat <a href="/docs/id/v2.6.x/quickstart.md">Panduan Cepat</a> untuk mengetahui apa saja yang dapat dilakukan Milvus.</p></li>
<li><p>Pelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/v2.6.x/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/v2.6.x/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/v2.6.x/manage-partitions.md">Mengelola partisi</a></li>
<li><a href="/docs/id/v2.6.x/insert-update-delete.md">Sisipkan, Upsert, &amp; Hapus</a></li>
<li><a href="/docs/id/v2.6.x/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/v2.6.x/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/v2.6.x/upgrade_milvus_cluster-helm.md">Tingkatkan Milvus Menggunakan Helm Chart</a>.</p></li>
<li><p><a href="/docs/id/v2.6.x/scaleout.md">Skalakan kluster Milvus Anda</a>.</p></li>
<li><p>Terapkan kluster Milvus Anda di cloud:</p>
<ul>
<li><a href="/docs/id/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/v2.6.x/milvus-webui.md">Milvus WebUI</a>, antarmuka web yang intuitif untuk pemantauan dan pengelolaan Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk debugging Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk pengelolaan Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/v2.6.x/monitor.md">Pantau Milvus dengan Prometheus</a>.</p></li>
</ul>
