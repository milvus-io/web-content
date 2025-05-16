---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: Pelajari cara menginstal Milvus mandiri dengan Docker Compose.
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
    </button></h1><p>Halaman ini mengilustrasikan cara meluncurkan instans Milvus di Docker menggunakan Docker Compose.</p>
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
<li><a href="/docs/id/v2.4.x/prerequisite-docker.md">Periksa persyaratan perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
</ul>
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
    </button></h2><p>Milvus menyediakan berkas konfigurasi Docker Compose di repositori Milvus. Untuk menginstal Milvus menggunakan Docker Compose, cukup jalankan</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>Jika Anda gagal menjalankan perintah di atas, periksa apakah sistem Anda telah menginstal Docker Compose V1. Jika demikian, Anda disarankan untuk bermigrasi ke Docker Compose V2 sesuai dengan catatan di <a href="https://docs.docker.com/compose/">halaman ini</a>.</p></li>
<li><p>Jika Anda mengalami masalah dalam menarik citra, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail tentang masalahnya, dan kami akan memberikan dukungan yang diperlukan.</p></li>
</ul>
</div>
<p>Setelah memulai Milvus,</p>
<ul>
<li>Kontainer bernama <strong>milvus-standalone</strong>, <strong>milvus-minio</strong>, dan <strong>milvus-etcd</strong> akan aktif.<ul>
<li>Kontainer <strong>milvus-etcd</strong> tidak mengekspos port apa pun ke hos dan memetakan datanya ke <strong>volume/etcd</strong> dalam folder saat ini.</li>
<li>Kontainer <strong>milvus-minio</strong> melayani port <strong>9090</strong> dan <strong>9091</strong> secara lokal dengan kredensial autentikasi default dan memetakan datanya ke <strong>volume/minio</strong> dalam folder saat ini.</li>
<li>Kontainer <strong>milvus-standalone</strong> melayani port <strong>19530</strong> secara lokal dengan pengaturan default dan memetakan datanya ke <strong>volume/milvus</strong> di folder saat ini.</li>
</ul></li>
</ul>
<p>Anda dapat memeriksa apakah kontainer sudah aktif dan berjalan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menghentikan dan menghapus kontainer ini sebagai berikut</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
<button class="copy-code-btn"></button></code></pre>
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
<li><p>Menerapkan cluster Milvus Anda di awan:</p>
<ul>
<li><a href="/docs/id/v2.4.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/v2.4.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/v2.4.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/v2.4.x/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk men-debug Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk manajemen Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/v2.4.x/monitor.md">Memantau Milvus dengan Prometheus</a>.</p></li>
</ul>
