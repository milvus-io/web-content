---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: Pelajari cara meng-upgrade Milvus standalone menggunakan Docker Compose.
title: Memperbarui Milvus Standalone dengan Docker Compose
---
<div class="tab-wrapper"><a href="/docs/id/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/id/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>, Helm, Docker<a href="/docs/id/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">Memperbarui Milvus Standalone dengan Docker Compose<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>Panduan ini menjelaskan cara meng-upgrade deployment Milvus 2.6.x standalone ke v3.0.5 menggunakan Docker Compose.</p>
<div class="alert note">
<p>Prosedur ini telah diverifikasi menggunakan konfigurasi Docker Compose Milvus 2.6.20 standalone resmi dengan perubahan hanya pada gambar (image). Langkah 2 juga menambahkan layanan kepemilikan direktori data dari konfigurasi Compose v3.0.5, yang tidak tercakup dalam verifikasi tersebut.</p>
</div>
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
<li>Docker Engine dan Docker Compose V2</li>
<li>Penyebaran Milvus 2.6.x standalone yang sudah ada dan dikelola oleh Docker Compose</li>
<li>Berkas Docker Compose dan konfigurasi yang digunakan untuk deployment yang sudah ada</li>
<li>Cadangan terkini dari metadata Milvus dan data persisten</li>
</ul>
<p><strong>Batasan Antrian Pesan</strong>: Saat melakukan upgrade ke Milvus v3.0.5, Anda harus mempertahankan pilihan antrian pesan yang saat ini digunakan. Beralih antara sistem antrian pesan yang berbeda selama proses upgrade tidak didukung. Dukungan untuk mengganti sistem antrian pesan akan tersedia pada versi mendatang.</p>
<div class="alert warning">
<p>Jangan mengganti berkas Compose Anda saat ini atau mengubah versi dependensi sebagai bagian dari prosedur ini. Pertahankan etcd, penyimpanan objek, antrian pesan, volume, dan konfigurasi yang ada. Perbarui tag gambar Milvus dan tambahkan layanan kepemilikan direktori data yang dijelaskan pada Langkah 2.</p>
<p>Jika berkas Compose Anda menggunakan <code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> dan Docker tidak dapat menarik gambar ini, ubah menjadi <code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code>, yang digunakan oleh konfigurasi Compose v3.0.5. Pertahankan tag rilis yang sama.</p>
<p>Prosedur ini tidak memvalidasi penurunan versi atau rollback dengan mengubah gambar Milvus kembali ke 2.6.x. Setelah v3.0.5 menulis data, rollback yang hanya melibatkan gambar mungkin gagal membaca status yang telah diperbarui. Jika peningkatan versi gagal, hentikan penulisan dan gunakan rencana pemulihan yang memulihkan metadata sebelum peningkatan versi serta cadangan data persisten. Validasi rencana pemulihan tersebut terlebih dahulu di lingkungan non-produksi.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Proses peningkatan versi<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">Langkah 1: Cadangkan konfigurasi saat ini<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>Simpan salinan berkas Compose saat ini dan semua berkas konfigurasi Milvus yang terpasang:</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan bahwa kontainer saat ini dalam kondisi baik sebelum memulai peningkatan:</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">Langkah 2: Perbarui gambar Milvus<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>Di berkas Compose yang ada, perbarui gambar layanan <code translate="no">standalone</code>, ganti entri <code translate="no">depends_on</code> dengan yang tercantum di bawah ini, dan tambahkan layanan <code translate="no">milvus-volume-init</code>. Gunakan gambar yang sama untuk kedua layanan tersebut, serta pasang direktori host yang sama seperti yang dipasang oleh layanan <code translate="no">standalone</code> di <code translate="no">/var/lib/milvus</code>. Pertahankan pengaturan lain dari layanan <code translate="no">standalone</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gambar sistem Milvus v3.0.5 menjalankan Milvus sebagai pengguna non-root <code translate="no">milvus</code>, sedangkan gambar sistem Milvus 2.6.x tidak menetapkan pengguna dan menjalankan Milvus sebagai <code translate="no">root</code>. Layanan <code translate="no">milvus-volume-init</code> berasal dari konfigurasi Compose v3.0.5. Layanan ini berjalan sekali sebagai <code translate="no">root</code> sebelum Milvus dimulai dan mengubah kepemilikan <code translate="no">/var/lib/milvus</code> serta isinya menjadi pengguna dan grup <code translate="no">milvus</code>, sehingga Milvus dapat menulis ke berkas-berkas yang dibuat oleh penyebaran versi 2.6.x. Selanjutnya, layanan ini menulis berkas penanda <code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> ke <code translate="no">/var/lib/milvus</code> dan tidak melakukan perubahan pada eksekusi berikutnya selama berkas penanda tersebut masih ada. Jika Anda kemudian memulihkan berkas yang dimiliki oleh pengguna lain ke dalam direktori data, hapus berkas penanda tersebut agar layanan dapat berjalan kembali.</p>
<p>Unduh gambar target dan buat ulang kontainer Milvus. Karena layanan <code translate="no">standalone</code> bergantung pada <code translate="no">milvus-volume-init</code>, Docker Compose menjalankan <code translate="no">milvus-volume-init</code> hingga selesai sebelum memulai kontainer Milvus baru:</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose mempertahankan kontainer etcd dan object-storage yang ada agar tetap berjalan dan menggunakan kembali direktori data yang telah dikonfigurasi. Jika Anda mengubah konfigurasi suatu dependensi, misalnya gambar MinIO, Compose akan membuat ulang kontainer tersebut dan mempertahankan volume yang telah dipasang.</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifikasi pembaruan<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Periksa status kontainer dan gambar yang digunakan oleh kontainer Milvus:</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>Pastikan layanan <code translate="no">standalone</code> dalam kondisi baik, gambarnya adalah <code translate="no">milvusdb/milvus:v3.0.5</code>, dan koleksi yang ada tetap dapat di-query dan dicari. Selesaikan pemeriksaan ini sebelum Anda mengaktifkan fitur apa pun yang spesifik untuk v3.0.5.</p>
<div class="alert note">
<p>Peningkatan ke Milvus 3.0 tidak mengaktifkan Storage V3. Setelah Anda memverifikasi peningkatan, tinjau <a href="/docs/id/storage-v3.md">Storage V3</a> sebelum mengaktifkan fitur-fitur yang bergantung padanya. Setelah Milvus menulis data Storage V3, penurunan versi ke versi Milvus yang lebih lama yang tidak dapat membaca Storage V3 tidak didukung.</p>
</div>
