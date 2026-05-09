---
id: prerequisite-docker.md
label: Standalone requirements
related_key: Standalone
summary: Pelajari persiapan yang diperlukan sebelum menginstal Milvus Standalone.
title: Persyaratan untuk Menginstalasi Milvus Standalone
---
<h1 id="Requirements-for-Installing-Milvus-Standalone" class="common-anchor-header">Persyaratan untuk Menginstalasi Milvus Standalone<button data-href="#Requirements-for-Installing-Milvus-Standalone" class="anchor-icon" translate="no">
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
    </button></h1><p>Sebelum menginstal instance Milvus Standalone, periksa perangkat keras dan perangkat lunak Anda untuk mengetahui apakah sudah memenuhi persyaratan.</p>
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
<tr><td>CPU</td><td><ul><li>CPU Intel Core Generasi ke-2 atau lebih tinggi</li><li>Silikon Apple</li></ul></td><td><ul><li>Mandiri: 4 inti atau lebih</li><li>Cluster 8 inti atau lebih</li></ul></td><td></td></tr>
<tr><td>Set instruksi CPU</td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td><ul><li>SSE4.2</li><li>AVX</li><li>AVX2</li><li>AVX-512</li></ul></td><td>Pencarian kemiripan vektor dan pembuatan indeks dalam Milvus memerlukan dukungan CPU untuk set ekstensi instruksi tunggal, beberapa data (SIMD). Pastikan CPU mendukung setidaknya satu dari ekstensi SIMD yang terdaftar. Lihat <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions#CPUs_with_AVX">CPU dengan AVX</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>RAM</td><td><ul><li>Mandiri: 8G</li><li>Cluster 32G</li></ul></td><td><ul><li>Mandiri: 16G</li><li>Cluster 128G</li></ul></td><td>Ukuran RAM tergantung pada volume data.</td></tr>
<tr><td>Hard drive</td><td>SSD SATA 3.0 atau lebih tinggi</td><td>SSD NVMe atau lebih tinggi</td><td>Ukuran hard drive tergantung pada volume data.</td></tr>
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
<tr><td>macOS 10.14 atau yang lebih baru</td><td>Desktop Docker</td><td>Atur mesin virtual (VM) Docker untuk menggunakan minimal 2 CPU virtual (vCPU) dan memori awal 8 GB. Jika tidak, penginstalan mungkin gagal. <br/>Lihat Menginstal <a href="https://docs.docker.com/desktop/mac/install/">Docker Desktop pada Mac</a> untuk informasi lebih lanjut.</td></tr>
<tr><td>Platform Linux</td><td><ul><li>Docker 19.03 atau yang lebih baru</li><li>Docker Compose 1.25.1 atau yang lebih baru</li></ul></td><td>Lihat <a href="https://docs.docker.com/engine/install/">Instal Mesin Docker</a> dan <a href="https://docs.docker.com/compose/install/">Instal Docker Compose</a> untuk informasi selengkapnya.</td></tr>
<tr><td>Windows dengan WSL 2 yang diaktifkan</td><td>Desktop Docker</td><td>Kami menyarankan agar Anda menyimpan kode sumber dan data lain yang diikat ke dalam kontainer Linux di sistem berkas Linux, bukan di sistem berkas Windows.<br/>Lihat Menginstal <a href="https://docs.docker.com/desktop/windows/install/#wsl-2-backend">Docker Desktop di Windows dengan backend WSL 2</a> untuk informasi lebih lanjut.</td></tr>
</tbody>
</table>
<p>Ketergantungan berikut ini akan didapatkan dan dikonfigurasi secara otomatis saat Milvus Standalone diinstal menggunakan skrip Docker, atau konfigurasi Docker Compose:</p>
<table>
<thead>
<tr><th>Perangkat Lunak</th><th>Versi</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td>etcd</td><td>3.5.0</td><td>Lihat <a href="#Additional-disk-requirements">persyaratan disk tambahan</a>.</td></tr>
<tr><td>MinIO</td><td>RELEASE.2024-12-18T13-15-44Z</td><td></td></tr>
<tr><td>Pulsar</td><td>2.8.2</td><td></td></tr>
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
    </button></h3><p>Performa disk sangat penting untuk etcd. Sangat disarankan agar Anda menggunakan SSD NVMe lokal. Respons disk yang lebih lambat dapat menyebabkan seringnya pemilihan kluster yang pada akhirnya akan menurunkan layanan etcd.</p>
<p>Untuk menguji apakah disk Anda memenuhi syarat, gunakan <a href="https://github.com/axboe/fio">fio</a>.</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> test-data
fio --rw=write --ioengine=<span class="hljs-built_in">sync</span> --fdatasync=1 --directory=test-data --size=2200m --bs=2300 --name=mytest
<button class="copy-code-btn"></button></code></pre>
<p>Idealnya, disk yang didedikasikan untuk etcd harus mencapai lebih dari 500 IOPS dan di bawah 10 ms untuk latensi fsync persentil ke-99. Baca <a href="https://etcd.io/docs/v3.5/op-guide/hardware/#disks">Dokumen</a> etcd untuk persyaratan yang lebih terperinci.</p>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
