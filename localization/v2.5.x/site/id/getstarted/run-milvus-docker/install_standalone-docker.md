---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: Pelajari cara menginstal Milvus mandiri dengan Docker.
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
    </button></h1><p>Halaman ini mengilustrasikan cara meluncurkan instans Milvus di Docker.</p>
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
<li><a href="/docs/id/v2.5.x/prerequisite-docker.md">Periksa persyaratan untuk perangkat keras dan perangkat lunak</a> sebelum melakukan instalasi.</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">Menginstal Milvus di Docker<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyediakan skrip instalasi untuk menginstalnya sebagai kontainer docker. Skrip ini tersedia di <a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">repositori Milvus</a>. Untuk menginstal Milvus di Docker, cukup jalankan</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Jika Anda ingin menggunakan <a href="https://milvus.io/docs/milvus_backup_overview.md">Cadangan</a> dalam mode penerapan mandiri, disarankan untuk menggunakan metode penerapan <a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>.</p>
<p>Jika Anda mengalami masalah saat menarik citra, hubungi kami di <a href="mailto:community@zilliz.com">community@zilliz.com</a> dengan detail tentang masalahnya, dan kami akan menyediakan dukungan yang diperlukan.</p>
</div>
<p>Setelah menjalankan skrip instalasi:</p>
<ul>
<li>Kontainer docker bernama milvus telah dimulai pada port <strong>19530</strong>.</li>
<li>Sebuah embed etcd telah terinstal bersama dengan Milvus di dalam kontainer yang sama dan melayani di port <strong>2379</strong>. Berkas konfigurasinya dipetakan ke <strong>embedEtcd.yaml</strong> di dalam folder saat ini.</li>
<li>Untuk mengubah konfigurasi default Milvus, tambahkan pengaturan Anda ke file <strong>user.yaml</strong> di folder saat ini dan kemudian mulai ulang layanan.</li>
<li>Volume data Milvus dipetakan ke <strong>volume/milvus</strong> di folder saat ini.</li>
</ul>
<p>Anda dapat mengakses Milvus WebUI di <code translate="no">http://127.0.0.1:9091/webui/</code> untuk mempelajari lebih lanjut tentang instans Milvus Anda. Untuk detailnya, lihat <a href="/docs/id/v2.5.x/milvus-webui.md">Milvus WebUI</a>.</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">Menghentikan dan menghapus Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menghentikan dan menghapus kontainer ini dengan cara berikut</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat memutakhirkan Milvus versi terbaru sebagai berikut</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">upgrade Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
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
<li><p>Memeriksa <a href="/docs/id/v2.5.x/quickstart.md">Mulai Cepat</a> untuk melihat apa yang dapat dilakukan Milvus.</p></li>
<li><p>Mempelajari operasi dasar Milvus:</p>
<ul>
<li><a href="/docs/id/v2.5.x/manage_databases.md">Mengelola Basis Data</a></li>
<li><a href="/docs/id/v2.5.x/manage-collections.md">Mengelola Koleksi</a></li>
<li><a href="/docs/id/v2.5.x/manage-partitions.md">Mengelola Partisi</a></li>
<li><a href="/docs/id/v2.5.x/insert-update-delete.md">Menyisipkan, Menambah &amp; Menghapus</a></li>
<li><a href="/docs/id/v2.5.x/single-vector-search.md">Pencarian Vektor Tunggal</a></li>
<li><a href="/docs/id/v2.5.x/multi-vector-search.md">Pencarian Hibrida</a></li>
</ul></li>
<li><p><a href="/docs/id/v2.5.x/upgrade_milvus_cluster-helm.md">Tingkatkan Milvus Menggunakan Bagan Helm</a>.</p></li>
<li><p>Mengatur<a href="/docs/id/v2.5.x/scaleout.md">skala cluster Milvus Anda</a>.</p></li>
<li><p>Menerapkan cluster Milvu Anda di awan:</p>
<ul>
<li><a href="/docs/id/v2.5.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/id/v2.5.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/id/v2.5.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>Jelajahi <a href="/docs/id/v2.5.x/milvus-webui.md">Milvus WebUI</a>, antarmuka web yang intuitif untuk pengamatan dan manajemen Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.5.x/milvus_backup_overview.md">Milvus Backup</a>, alat sumber terbuka untuk pencadangan data Milvus.</p></li>
<li><p>Jelajahi <a href="/docs/id/v2.5.x/birdwatcher_overview.md">Birdwatcher</a>, alat sumber terbuka untuk men-debug Milvus dan pembaruan konfigurasi dinamis.</p></li>
<li><p>Jelajahi <a href="https://github.com/zilliztech/attu">Attu</a>, alat GUI sumber terbuka untuk manajemen Milvus yang intuitif.</p></li>
<li><p><a href="/docs/id/v2.5.x/monitor.md">Memantau Milvus dengan Prometheus</a>.</p></li>
</ul>
