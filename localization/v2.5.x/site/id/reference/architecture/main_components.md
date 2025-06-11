---
id: main_components.md
summary: Pelajari tentang komponen utama dalam Milvus standalone dan cluster.
title: Komponen Utama
---

<h1 id="Main-Components" class="common-anchor-header">Komponen Utama<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Ada dua mode untuk menjalankan Milvus: Standalone dan Cluster. Kedua mode ini memiliki fitur yang sama. Anda bisa memilih mode yang paling sesuai dengan ukuran dataset, data lalu lintas, dan lainnya. Untuk saat ini, Milvus standalone tidak dapat diupgrade "online" ke Milvus cluster.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus mandiri<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone terdiri dari tiga komponen:</p>
<ul>
<li><p><strong>Milvus:</strong> Komponen fungsional inti.</p></li>
<li><p><strong>Meta Store:</strong> Mesin metadata, yang mengakses dan menyimpan metadata dari komponen internal Milvus, termasuk proxy, node indeks, dan banyak lagi.</p></li>
<li><p><strong>Penyimpanan Objek:</strong> Mesin penyimpanan, yang bertanggung jawab atas persistensi data untuk Milvus.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur mandiri</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Milvus cluster<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus cluster</strong> mencakup tujuh komponen layanan mikro dan tiga dependensi pihak ketiga. Semua layanan mikro dapat digunakan di Kubernetes, secara independen satu sama lain.</p>
<h3 id="Microservice-components" class="common-anchor-header">Komponen layanan mikro</h3><ul>
<li>Koordinator akar (root coord)</li>
<li>Proxy</li>
<li>Koordinat kueri</li>
<li>Simpul kueri</li>
<li>Koordinat data</li>
<li>Simpul indeks</li>
<li>Simpul data</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">Ketergantungan pihak ketiga</h3><ul>
<li><strong>Penyimpanan Meta:</strong> Menyimpan metadata untuk berbagai komponen dalam cluster, misalnya etcd.</li>
<li><strong>Penyimpanan Objek:</strong> Bertanggung jawab atas persistensi data dari file-file besar di dalam cluster, seperti file indeks dan log biner, misalnya S3</li>
<li><strong>Log Broker:</strong> Mengelola log dari operasi mutasi terbaru, mengeluarkan log streaming, dan menyediakan layanan publish-subscribe log, misalnya Pulsar.</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur terdistribusi</span> </span></p>
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
    </button></h2><ul>
<li>Baca <a href="/docs/id/v2.5.x/four_layers.md">Komputasi/Pemilahan Penyimpanan</a> untuk memahami mekanisme dan prinsip desain Milvus.</li>
</ul>
