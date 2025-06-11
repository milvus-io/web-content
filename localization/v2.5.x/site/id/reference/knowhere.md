---
id: knowhere.md
summary: Pelajari tentang Knowhere di Milvus.
title: Knowhere
---

<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan Knowhere, mesin eksekusi vektor inti dari Milvus.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere adalah mesin eksekusi vektor inti dari Milvus, yang menggabungkan beberapa pustaka pencarian kemiripan vektor termasuk <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a>, dan <a href="https://github.com/spotify/annoy">Annoy</a>. Knowhere juga dirancang untuk mendukung komputasi heterogen. Knowhere mengontrol perangkat keras (CPU atau GPU) mana yang akan menjalankan pembuatan indeks dan permintaan pencarian. Inilah bagaimana Knowhere mendapatkan namanya - mengetahui di mana harus menjalankan operasi. Lebih banyak jenis perangkat keras termasuk DPU dan TPU akan didukung dalam rilis mendatang.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere dalam arsitektur Milvus<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Gambar di bawah ini mengilustrasikan posisi Knowhere dalam arsitektur Milvus.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>Lapisan paling bawah adalah perangkat keras sistem. Di atasnya terdapat pustaka indeks pihak ketiga. Pada lapisan paling atas, Knowhere berinteraksi dengan simpul indeks dan simpul kueri melalui CGO, yang memungkinkan paket Go memanggil kode C.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Keunggulan Knowhere<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>Berikut ini adalah keunggulan Knowhere dibandingkan Faiss.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">Dukungan untuk BitsetView</h4><p>Milvus memperkenalkan mekanisme bitset untuk merealisasikan &quot;penghapusan lunak&quot;. Vektor yang dihapus secara lunak masih ada dalam database tetapi tidak akan dihitung selama pencarian atau kueri kemiripan vektor.</p>
<p>Setiap bit dalam bitset berhubungan dengan vektor yang diindeks. Jika sebuah vektor ditandai sebagai "1" dalam bitset, itu berarti vektor ini dihapus secara lunak dan tidak akan dilibatkan selama pencarian vektor. Parameter bitset diterapkan pada semua API kueri indeks Faiss yang terbuka di Knowhere, termasuk indeks CPU dan GPU.</p>
<p>Untuk informasi lebih lanjut tentang mekanisme bitset, lihat <a href="/docs/id/v2.5.x/bitset.md">bitset</a>.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">Dukungan untuk beberapa metrik kemiripan untuk mengindeks vektor biner</h4><p>Knowhere mendukung <a href="/docs/id/v2.5.x/metric.md#Hamming-distance">Hamming</a>, <a href="/docs/id/v2.5.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/id/v2.5.x/metric.md#Tanimoto-distance">Tanimoto</a>, <a href="/docs/id/v2.5.x/metric.md#Superstructure">Superstruktur</a>, dan <a href="/docs/id/v2.5.x/metric.md#Substructure">Substruktur</a>. Jaccard dan Tanimoto dapat digunakan untuk mengukur kemiripan antara dua set sampel, sedangkan Superstruktur dan Substruktur dapat digunakan untuk mengukur kemiripan struktur kimia.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">Dukungan untuk set instruksi AVX512</h4><p>Selain <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a> dan <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>, set instruksi yang telah didukung oleh Faiss, Knowhere juga mendukung <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>, yang dapat <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">meningkatkan kinerja pembuatan indeks dan kueri sebesar 20% hingga 30%</a> dibandingkan dengan AVX2.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">Pemilihan instruksi SIMD otomatis</h4><p>Knowhere mendukung pemanggilan instruksi SIMD yang sesuai secara otomatis (misalnya, SIMD SSE, AVX, AVX2, dan AVX512) pada prosesor CPU apa pun (baik di lokasi maupun platform cloud), sehingga pengguna tidak perlu secara manual menentukan flag SIMD (misalnya, "-msse4") selama kompilasi.</p>
<p>Knowhere dibangun dengan memfaktorkan ulang basis kode Faiss. Fungsi-fungsi umum (misalnya, komputasi kesamaan) yang mengandalkan akselerasi SIMD telah diperhitungkan. Kemudian untuk setiap fungsi, empat versi (yaitu, SSE, AVX, AVX2, AVX512) diimplementasikan dan masing-masing dimasukkan ke dalam file sumber yang terpisah. Kemudian file sumber selanjutnya dikompilasi secara individual dengan bendera SIMD yang sesuai. Oleh karena itu, pada saat runtime, Knowhere dapat secara otomatis memilih instruksi SIMD yang paling sesuai berdasarkan flag CPU saat ini dan kemudian menghubungkan penunjuk fungsi yang tepat menggunakan pengait.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">Optimalisasi kinerja lainnya</h4><p>Baca <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: Sistem Manajemen Data Vektor yang Dibangun Khusus</a> untuk mengetahui lebih lanjut tentang pengoptimalan kinerja Knowhere.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Struktur kode Knowhere<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Komputasi dalam Milvus terutama melibatkan operasi vektor dan skalar. Knowhere hanya menangani operasi pengindeksan vektor.</p>
<p>Indeks adalah struktur data yang terpisah dari data vektor aslinya. Secara umum, pengindeksan membutuhkan empat langkah: membuat indeks, melatih data, menyisipkan data, dan membangun indeks. Dalam beberapa aplikasi AI, pelatihan dataset dipisahkan dari pencarian vektor. Data dari dataset pertama-tama dilatih dan kemudian dimasukkan ke dalam basis data vektor seperti Milvus untuk pencarian kemiripan. Sebagai contoh, dataset terbuka sift1M dan sift1B membedakan data untuk pelatihan dan data untuk pengujian.</p>
<p>Namun, di Knowhere, data untuk pelatihan dan pencarian adalah sama. Knowhere melatih semua data dalam sebuah <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">segmen</a> dan kemudian memasukkan semua data yang telah dilatih dan membuat indeks untuk data tersebut.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>: kelas dasar</h4><p><code translate="no">DataObj</code> adalah kelas dasar dari semua struktur data di Knowhere. <code translate="no">Size()</code> adalah satu-satunya metode virtual di <code translate="no">DataObj</code>. Kelas Index diwarisi dari <code translate="no">DataObj</code> dengan sebuah field bernama &quot;size_&quot;. Kelas Index juga memiliki dua metode virtual - <code translate="no">Serialize()</code> dan <code translate="no">Load()</code>. Kelas <code translate="no">VecIndex</code> yang diturunkan dari <code translate="no">Index</code> adalah kelas dasar virtual untuk semua indeks vektor. <code translate="no">VecIndex</code> menyediakan metode termasuk <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code>, dan <code translate="no">ClearStatistics()</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>kelas dasar</span> </span></p>
<p>Beberapa jenis indeks lainnya tercantum di sebelah kanan pada gambar di atas.</p>
<ul>
<li><p>Indeks Faiss memiliki dua kelas dasar: <code translate="no">FaissBaseIndex</code> untuk semua indeks pada vektor float point, dan <code translate="no">FaissBaseBinaryIndex</code> untuk semua indeks pada vektor biner.</p></li>
<li><p><code translate="no">GPUIndex</code> adalah kelas dasar untuk semua indeks GPU Faiss.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> adalah kelas dasar untuk semua indeks yang dikembangkan sendiri. Dengan hanya ID vektor yang disimpan dalam berkas indeks, ukuran berkas untuk vektor 128 dimensi dapat dikurangi 2 kali lipat.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>: pencarian secara kasar (brute-force)</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>Secara teknis, <code translate="no">IDMAP</code> bukanlah sebuah indeks, melainkan digunakan untuk pencarian brute-force. Ketika vektor dimasukkan ke dalam basis data, tidak diperlukan pelatihan data atau pembuatan indeks. Pencarian akan dilakukan secara langsung pada data vektor yang dimasukkan.</p>
<p>Namun, untuk konsistensi kode, <code translate="no">IDMAP</code> juga mewarisi kelas <code translate="no">VecIndex</code> dengan semua antarmuka virtualnya. Penggunaan <code translate="no">IDMAP</code> sama dengan indeks lainnya.</p>
<h4 id="IVF-indices" class="common-anchor-header">Indeks IVF</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>Indeks IVF (inverted file) adalah indeks yang paling sering digunakan. Kelas <code translate="no">IVF</code> berasal dari <code translate="no">VecIndex</code> dan <code translate="no">FaissBaseIndex</code>, dan selanjutnya meluas ke <code translate="no">IVFSQ</code> dan <code translate="no">IVFPQ</code>. <code translate="no">GPUIVF</code> berasal dari <code translate="no">GPUIndex</code> dan <code translate="no">IVF</code>. Kemudian <code translate="no">GPUIVF</code> diperluas lebih lanjut menjadi <code translate="no">GPUIVFSQ</code> dan <code translate="no">GPUIVFPQ</code>.</p>
<p><code translate="no">IVFSQHybrid</code> adalah indeks hibrida yang dikembangkan sendiri. Kuantizer kasar dieksekusi di GPU sementara pencarian di bucket di CPU. Jenis indeks ini dapat mengurangi terjadinya penyalinan memori antara CPU dan GPU dengan memanfaatkan daya komputasi GPU. <code translate="no">IVFSQHybrid</code> memiliki tingkat recall yang sama dengan <code translate="no">GPUIVFSQ</code> tetapi hadir dengan kinerja yang lebih baik.</p>
<p>Struktur kelas dasar untuk indeks biner relatif lebih sederhana. <code translate="no">BinaryIDMAP</code> dan <code translate="no">BinaryIVF</code> diturunkan dari <code translate="no">FaissBaseBinaryIndex</code> dan <code translate="no">VecIndex</code>.</p>
<h4 id="Third-party-indices" class="common-anchor-header">Indeks pihak ketiga</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>indeks pihak ketiga</span> </span></p>
<p>Saat ini, hanya ada dua jenis indeks pihak ketiga yang didukung selain Faiss: indeks berbasis pohon <code translate="no">Annoy</code>, dan indeks berbasis grafik <code translate="no">HNSW</code>. Kedua indeks pihak ketiga yang umum dan sering digunakan ini berasal dari <code translate="no">VecIndex</code>.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Menambahkan indeks ke Knowhere<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda ingin menambahkan indeks baru ke Knowhere, pertama-tama Anda dapat merujuk ke indeks yang sudah ada:</p>
<ul>
<li><p>Untuk menambahkan indeks berbasis kuantisasi, lihat <code translate="no">IVF_FLAT</code>.</p></li>
<li><p>Untuk menambahkan indeks berbasis grafik, lihat <code translate="no">HNSW</code>.</p></li>
<li><p>Untuk menambahkan indeks berbasis pohon, lihat <code translate="no">Annoy</code>.</p></li>
</ul>
<p>Setelah merujuk ke indeks yang ada, Anda dapat mengikuti langkah-langkah di bawah ini untuk menambahkan indeks baru ke Knowhere.</p>
<ol>
<li><p>Tambahkan nama indeks baru di <code translate="no">IndexEnum</code>. Tipe datanya adalah string.</p></li>
<li><p>Tambahkan pemeriksaan validasi data pada indeks baru di file <code translate="no">ConfAdapter.cpp</code>. Pemeriksaan validasi terutama untuk memvalidasi parameter untuk pelatihan data dan kueri.</p></li>
<li><p>Buat file baru untuk indeks baru. Kelas dasar dari indeks baru harus menyertakan <code translate="no">VecIndex</code>, dan antarmuka virtual yang diperlukan dari <code translate="no">VecIndex</code>.</p></li>
<li><p>Tambahkan logika pembangunan indeks untuk indeks baru di <code translate="no">VecIndexFactory::CreateVecIndex()</code>.</p></li>
<li><p>Tambahkan unit test di bawah direktori <code translate="no">unittest</code>.</p></li>
</ol>
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
    </button></h2><p>Setelah mempelajari cara kerja Knowhere di Milvus, Anda mungkin juga ingin:</p>
<ul>
<li><p>Mempelajari <a href="/docs/id/v2.5.x/index.md">berbagai jenis indeks yang didukung oleh Milvus</a>.</p></li>
<li><p>Mempelajari tentang <a href="/docs/id/v2.5.x/bitset.md">mekanisme bitset</a>.</p></li>
<li><p>Memahami <a href="/docs/id/v2.5.x/data_processing.md">bagaimana data diproses</a> di Milvus.</p></li>
</ul>
