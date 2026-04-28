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
    </button></h1><p>Sebuah klaster Milvus terdiri dari lima komponen inti dan tiga dependensi pihak ketiga. Setiap komponen dapat digunakan secara independen di Kubernetes:</p>
<h2 id="Milvus-components" class="common-anchor-header">Komponen Milvus<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>Koordinator: mode master-slave dapat diaktifkan untuk menyediakan ketersediaan tinggi.</li>
<li>Proksi: satu atau lebih per cluster</li>
<li>Streaming Node: satu atau lebih per cluster</li>
<li>Query Node: satu atau lebih per cluster</li>
<li>Data Node: satu atau lebih per cluster</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">Ketergantungan pihak ketiga<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>Meta Store:</strong> Menyimpan metadata untuk berbagai komponen dalam milvus, misalnya, etcd.</li>
<li><strong>Penyimpanan Objek:</strong> Bertanggung jawab atas persistensi data dari file-file besar dalam milvus, seperti file indeks dan log biner, misalnya S3</li>
<li><strong>Penyimpanan WAL:</strong> Menyediakan layanan Write-Ahead Log (WAL) untuk milvus, misalnya pelatuk.<ul>
<li>Di bawah mode zero-disk woodpecker, <strong>WAL</strong> secara langsung menggunakan penyimpanan objek dan penyimpanan meta tanpa penerapan lain, sehingga mengurangi ketergantungan pihak ketiga.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Mode penyebaran Milvus<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Ada dua mode untuk menjalankan Milvus:</p>
<h3 id="Standalone" class="common-anchor-header">Mandiri</h3><p>Sebuah instance tunggal Milvus yang menjalankan semua komponen dalam satu proses, yang cocok untuk dataset kecil dan beban kerja rendah. Selain itu, dalam mode mandiri, implementasi WAL yang lebih sederhana, seperti woodpecker dan rocksmq, dapat dipilih untuk menghilangkan kebutuhan akan ketergantungan WAL Storage pihak ketiga.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur_mandiri</span> </span></p>
<p>Saat ini, Anda tidak dapat melakukan peningkatan online dari instance Milvus mandiri ke cluster Milvus, meskipun backend penyimpanan WAL mendukung mode cluster.</p>
<h3 id="Cluster" class="common-anchor-header">Cluster</h3><p>Mode penyebaran terdistribusi Milvus di mana setiap komponen berjalan secara independen dan dapat ditingkatkan untuk elastisitas. Pengaturan ini cocok untuk dataset besar dan skenario beban tinggi.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Arsitektur terdistribusi</span> </span></p>
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
    </button></h2><ul>
<li>Baca <a href="/docs/id/four_layers.md">Komputasi/Pemisahan Penyimpanan</a> untuk memahami mekanisme dan prinsip desain Milvus.</li>
</ul>
