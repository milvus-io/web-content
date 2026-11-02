---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Pelajari persiapan yang diperlukan sebelum menginstal Milvus Standalone.
title: Persyaratan untuk Menginstal Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Persyaratan untuk Menginstal Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Sebelum menginstal instance Milvus Standalone, periksa perangkat keras dan perangkat lunak Anda untuk memastikan keduanya memenuhi persyaratan.</p>
<h2 id="Hardware-requirements" class="common-anchor-header">Persyaratan perangkat keras<button data-href="#Hardware-requirements" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Komponen</th><th>Persyaratan</th><th>Rekomendasi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>Prosesor</td><td><ul><li>Prosesor Intel Core Generasi ke-2 atau yang lebih tinggi</li><li>Apple Silicon</li></ul></td><td><ul><li>Standalone: 4 inti atau lebih</li><li>Cluster: 8 inti atau lebih</li></ul></td><td></td></tr>
<tr><td>Set instruksi CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Pencarian kesamaan vektor dan pembuatan indeks di Milvus memerlukan dukungan CPU terhadap set ekstensi single instruction, multiple data (SIMD). Pastikan CPU mendukung setidaknya salah satu ekstensi SIMD yang tercantum. Lihat <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU dengan AVX</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>RAM</td><td><ul><li>Standalone: 8G</li><li>Cluster: 32G</li></ul></td><td><ul><li>Standalone: 16G</li><li>Cluster: 128G</li></ul></td><td>Ukuran RAM bergantung pada volume data.</td></tr>
<tr><td>Hard drive</td><td>SSD SATA 3.0 atau yang lebih tinggi</td><td>SSD NVMe atau yang lebih tinggi</td><td>Ukuran hard drive bergantung pada volume data.</td></tr>
</tbody>
</table>
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
    </button></h2><table>
<thead>
<tr><th>Sistem operasi</th><th>Perangkat lunak</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>macOS yang didukung oleh Docker Desktop</td><td>Docker Desktop</td><td>Alokasikan setidaknya 8 GB memori ke mesin virtual (VM) Docker dan sesuaikan ukuran CPU-nya sesuai dengan rekomendasi perangkat keras di atas. <br/>Lihat <a href="https://docs.docker.com/desktop/setup/install/mac-install/">Menginstal Docker Desktop di Mac</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>Platform Linux</td><td><ul><li>Docker 19.03 atau yang lebih baru</li><li>Plugin Docker Compose versi 2 atau yang lebih baru (untuk penyebaran Compose)</li></ul></td><td>Lihat <a href="https://docs.docker.com/engine/install/">Instal Docker Engine</a> dan <a href="https://docs.docker.com/compose/install/">Instal Docker Compose</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>Windows dengan WSL 2 diaktifkan</td><td>Docker Desktop</td><td>Kami menyarankan agar Anda menyimpan kode sumber dan data lain yang dipasang secara terikat (bind-mounted) ke dalam kontainer Linux di sistem berkas Linux, bukan di sistem berkas Windows.<br/>Lihat <a href="https://docs.docker.com/desktop/features/wsl/">Instalasi Docker Desktop di Windows dengan backend WSL 2</a> untuk informasi lebih lanjut.</td></tr>
</tbody>
</table>
<p>Panduan Compose menggunakan perintah ` <code translate="no">docker compose</code>`, bukan perintah lama ` <code translate="no">docker-compose</code> ` versi 1. Pastikan plugin sudah terpasang sebelum mengikuti panduan ini:</p>
<pre><code translate="no" class="language-bash">docker compose version
<button class="copy-code-btn"></button></code></pre>
<p>Metode instalasi menentukan bagaimana dependensi disediakan. Gunakan versi gambar yang ditetapkan dalam skrip yang diunduh atau berkas Compose:</p>
<table>
<thead>
<tr><th>Komponen</th><th>Skrip Docker</th><th>Docker Compose</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>Terintegrasi dalam kontainer Milvus</td><td>Kontainer terpisah; lihat <a href="#Additional-disk-requirements">persyaratan disk tambahan</a>.</td></tr>
<tr><td>Penyimpanan objek</td><td>Sistem berkas lokal; tanpa kontainer MinIO</td><td>Kontainer MinIO dengan gambar yang disematkan dalam berkas Compose</td></tr>
<tr><td>Woodpecker</td><td>Disertakan dalam Milvus; backend WAL berbasis sistem berkas lokal</td><td>Disertakan dalam Milvus; backend WAL berbasis MinIO/penyimpanan objek</td></tr>
<tr><td>Pulsar</td><td>Layanan eksternal opsional; tidak diinstal secara default</td><td>Layanan eksternal opsional; tidak diinstal secara default</td></tr>
</tbody>
</table>
<h3 id="Additional-disk-requirements" class="common-anchor-header">Persyaratan disk tambahan<button data-href="#Additional-disk-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Kinerja disk sangat penting bagi etcd. Sangat disarankan agar Anda menggunakan SSD NVMe lokal. Respons disk yang lambat dapat menyebabkan pemilihan kluster yang sering, yang pada akhirnya akan menurunkan kinerja layanan etcd.</p>
<p>Untuk menguji apakah disk Anda memenuhi syarat, gunakan <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealnya, disk yang didedikasikan untuk etcd harus mencapai lebih dari 500 IOPS dan latensi fsync di bawah 10 ms untuk persentil ke-99. Baca <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Dokumen</a> etcd untuk persyaratan yang lebih terperinci.</p>
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
    </button></h2><p>Jika perangkat keras dan perangkat lunak Anda memenuhi persyaratan di atas, Anda dapat</p>
<ul>
<li><a href="/docs/id/install_standalone-docker.md">Menjalankan Milvus di Docker</a></li>
<li><a href="/docs/id/install_standalone-docker-compose.md">Menjalankan Milvus dengan Docker Compose</a></li>
</ul>
