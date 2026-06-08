---
id: release_notes.md
summary: Catatan Rilis Milvus
title: Catatan Rilis
---
<h1 id="Release-Notes" class="common-anchor-header">Catatan Rilis<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Cari tahu apa yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug di setiap rilis. Kami menyarankan agar Anda mengunjungi halaman ini secara teratur untuk mengetahui pembaruan.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 9 Mei 2026</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta memperluas basis data vektor Milvus dengan integrasi baru ke dalam ekosistem danau terbuka: Koleksi Eksternal memungkinkan Milvus melakukan kueri terhadap tabel danau eksternal tanpa menyalin, dan Spark dapat membaca koleksi Milvus secara langsung melalui Snapshot. Rilis ini juga menghadirkan pengambilan yang lebih kaya, skema yang lebih ekspresif, kustomisasi pencarian teks yang lebih dalam, kontrol siklus hidup data dan model yang lebih baik, dan lebih banyak kontrol dari sisi operator. Milvus 3.0 adalah kernel inti dari Zilliz Lakebase, yang memberdayakan penyajian, penemuan, dan batch yang terpadu.</p>
<p>Klik di bawah ini untuk bergabung dengan webinar kami untuk detail lebih lanjut tentang Milvus 3.0 dan AMA dengan pengelola inti:</p>
<p><a href="https://zilliz.com/event/whats-new-in-milvus-3-0-beta">
  
   <span class="img-wrapper"> <img translate="no" src="https://assets.zilliz.com/webinar_3_0_4746da7c2d.png" alt="Webinar 3.0 walkthrough" class="doc-image" id="webinar-3.0-walkthrough" />
 </span>  <span class="img-wrapper"> <span>Panduan Webinar 3.0</span> </span></a></p>
<h3 id="Key-Features" class="common-anchor-header">Fitur Utama<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Pengumpulan Eksternal</h4><p>Dalam pipeline data AI pada umumnya, terabyte embeddings dan metadata sudah berada di penyimpanan objek sebagai tabel Parquet, Lance, atau Iceberg. Menyalin data tersebut ke dalam Milvus akan menggandakan biaya penyimpanan, menambahkan pipeline ETL yang harus dijaga agar tetap sinkron, dan menggeser tata kelola data dari pelanggan.</p>
<p>Koleksi Eksternal menghapus salinan tersebut. Koleksi Milvus dapat mereferensikan file yang sudah ada, dan Milvus hanya mengelola skema, indeks, dan eksekusi kueri. Penyegaran tambahan membuat Koleksi tetap selaras dengan file yang mendasarinya. Pelanggan yang datanya tidak dapat meninggalkan danau, seperti tim keuangan dan perawatan kesehatan, dapat menjalankan pengambilan vektor terhadap data tersebut di mana data itu berada. Satu set data yang berada di dalam danau juga dapat disajikan dari beberapa instance Milvus sekaligus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Cuplikan</h4><p>Penyajian dan penemuan kumpulan sering kali membutuhkan Koleksi yang sama pada waktu yang sama. Evaluasi model A/B, deduplikasi skala besar, validasi isi ulang, dan rollback versi semuanya membutuhkan tampilan Collection yang stabil saat penulisan masih berlangsung.</p>
<p>Snapshot menciptakan tampilan hanya-baca pada saat itu juga dari Koleksi dengan mereferensikan segmen yang ada alih-alih menyalin data, sehingga biaya penyimpanan marjinal mendekati nol. Pekerjaan batch dapat membaca dari Snapshot di bawah isolasi gaya MVCC sementara Koleksi langsung terus menerima penulisan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/snapshots.md">Snapshot</a>, <a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a>, dan <a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Kueri / Urutan Pencarian Berdasarkan</h4><p>Pencarian dan Query sekarang menerima pengurutan multi-bidang, dengan pengurutan yang didorong ke dalam kernel Milvus dan <code translate="no">ASC</code> / <code translate="no">DESC</code> yang dapat diatur per bidang. Hal ini menutup kesenjangan produksi yang umum terjadi: Top-K berdasarkan jarak saja sering kali tidak sesuai dengan kebutuhan bisnis ketika item yang paling mirip bukanlah yang termurah, terbaru, atau terpopuler.</p>
<p>Aplikasi tidak lagi harus mengambil hasil secara berlebihan dan menyortir ulang pada klien untuk mengekspresikan peringkat komposit.</p>
<p>Untuk informasi lebih lanjut, lihat Mengurutkan <a href="/docs/id/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Hasil Pencarian berdasarkan Bidang Skalar</a> dan Mengurutkan <a href="/docs/id/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Hasil Kueri</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregasi Kueri</h4><p>Menghasilkan statistik distribusi penyewa, jumlah kelengkapan bidang, atau kemajuan peluncuran versi dari Koleksi Milvus yang dulunya memerlukan penarikan entitas yang cocok kembali ke klien dan menggabungkannya di sana. Milvus 3.0 mendorong agregasi skalar gaya SQL ke dalam kernel. Panggilan kueri menerima <code translate="no">group_by_fields</code> dan ekspresi agregasi di <code translate="no">output_fields</code>, termasuk <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, dan <code translate="no">max(&lt;field&gt;)</code>. Agregasi dievaluasi di sisi server setelah pemfilteran.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Hasil Kueri Agregasi</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vektor Nol</h4><p>Penyisipan sering kali dibuat secara tidak sinkron, sehingga sebuah entitas dapat tiba sebelum vektornya tiba. Data multimodal juga memiliki kesenjangan alami, seperti video tanpa teks atau produk tanpa gambar. Versi sebelumnya tidak memiliki jawaban yang baik: aplikasi menunda penulisan hingga vektor siap atau mengisi vektor placeholder, dan kedua pilihan tersebut merusak kualitas pengambilan.</p>
<p>Milvus 3.0 mendukung NULL pada bidang vektor di keenam jenis vektor. Pencarian melewatkan vektor NULL secara otomatis, kualitas pencarian tidak terpengaruh, dan vektor NULL secara efektif tidak memerlukan penyimpanan. <code translate="no">AddField</code> juga meluas ke bidang vektor di bawah perubahan ini: dengan <code translate="no">nullable=True</code>, Koleksi yang sudah ada dapat menambah bidang vektor baru secara online tanpa membangun ulang.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Bidang yang dapat dinullkan</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Kamus Khusus &amp; Kamus Sinonim</h4><p>Tokenisasi yang sudah tersedia tidak selalu memenuhi persyaratan kualitas pencarian produksi. Bahasa Mandarin, domain vertikal seperti kedokteran, hukum, dan kimia, serta korpora multibahasa dapat memperoleh manfaat yang besar dari kamus khusus dan tabel sinonim. Hingga saat ini, sumber daya ini sebagian besar hidup sebagai penulisan ulang kueri sisi aplikasi.</p>
<p>Milvus 3.0 menambahkan mekanisme FileResource untuk mendaftarkan kamus tokenizer khusus, daftar sinonim, daftar stop-word, dan aturan pengurai. Setelah terdaftar, sumber daya dapat direferensikan dari tokenizer atau filter apa pun dan berlaku pada BM25, penganalisis, dan Pencocokan Teks. Kamus dan sinonim sekarang dapat dibuat versi dan dikelola secara terpusat, bukan tersebar di seluruh kode aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/manage-file-resources.md">Mengelola Sumber Daya File</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL Entitas</h4><p>TTL tingkat koleksi dan tingkat partisi terlalu kasar untuk banyak skenario siklus hidup dan kepatuhan. Penyewa yang berbeda di dalam Koleksi yang sama sering kali memiliki aturan retensi yang berbeda, dan masing-masing entitas mungkin perlu kedaluwarsa pada jadwal yang tidak sesuai dengan Koleksi lainnya.</p>
<p>Milvus 3.0 mendukung TTL per entitas. Deklarasikan bidang <code translate="no">TIMESTAMPTZ</code> dalam skema, tandai sebagai bidang TTL melalui properti Koleksi, dan Milvus mendapatkan kembali entitas yang kedaluwarsa secara otomatis. Ini mencakup permintaan yang berhak untuk dilupakan, data sesi yang kedaluwarsa, dan riwayat percakapan yang dibatasi tanpa pembersihan sisi aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Mengatur TTL tingkat entitas</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 menambahkan indeks <code translate="no">MINHASH_LSH</code> untuk deteksi near-duplikat berbasis set, tetapi aplikasi masih harus menghitung tanda tangan MinHash sebelum menulis data ke dalam Milvus.</p>
<p>Milvus 3.0 menambahkan fungsi MinHash sisi server. Deklarasikan bidang masukan <code translate="no">VARCHAR</code> dan bidang keluaran <code translate="no">BINARY_VECTOR</code> dalam skema, lampirkan fungsi <code translate="no">FunctionType.MINHASH</code>, dan Milvus menghitung tanda tangan selama penyisipan, penyisipan massal, dan pencarian. Bersama dengan <code translate="no">MINHASH_LSH</code>, ini mendukung alur kerja deduplikasi untuk kumpulan data besar, sidik jari, dan deteksi plagiarisme di dalam Milvus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Asumsi "satu entitas = satu vektor" tidak lagi sesuai dengan pengambilan modern. Dokumen yang panjang dipecah menjadi banyak bagian, model interaksi akhir seperti ColBERT mengeluarkan satu vektor per token, dan entitas multimodal dapat membawa beberapa tampilan.</p>
<p>EmbList menyimpan daftar vektor dengan panjang variabel per entitas, dengan <code translate="no">DISKANN</code> sebagai indeks di dalam disk. Jalur disk menjaga penggunaan RAM tetap terkendali ketika korpus melebihi anggaran memori. EmbList + <code translate="no">DISKANN</code> adalah varian pertama dari keluarga StructList yang lebih luas dalam RC ini. Keluarga lainnya, termasuk penyaringan StructList dan akselerasi multi-vektor Muvera / Lemur, ditargetkan untuk rilis 3.0 resmi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Penyisipan</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Penggabungan Paksa</h4><p>Beban kerja produksi mengakumulasi fragmentasi segmen dari waktu ke waktu, yang menyebabkan jitter latensi kueri dan penyimpanan yang membengkak.</p>
<p>Milvus 3.0 menambahkan kemampuan untuk memicu pemadatan segmen secara eksplisit selama jendela di luar jam sibuk, baik dalam mode sinkron maupun asinkron.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/force-merge.md">Pemadatan Penggabungan Paksa</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Penyimpanan V3</h4><p>Milvus 3.0 memperkenalkan Storage V3, sebuah mesin penyimpanan kolumnar berbasis manifes di mana data dan metadata berada di penyimpanan objek yang kompatibel dengan S3. Setiap versi dataset diambil sebagai snapshot manifes yang tidak dapat diubah, file yang dikodekan dengan Avro yang mencatat kelompok kolom, log delta, dan statistik yang terdiri dari dataset.</p>
<p>Manifes adalah file Avro yang ringkas, dan delta log mencatat penghapusan tingkat entitas tanpa menulis ulang file data. Hal ini membuat overhead metadata tetap kecil seiring dengan bertambahnya set data. Manifes juga memisahkan pelacakan metadata dari jalur kueri, sehingga memungkinkan Collection mengelola lebih banyak segmen tanpa menurunkan kinerja kueri.</p>
<p>Karena state disimpan pada penyimpanan objek, dataset bersifat deskriptif: setiap pembaca dengan akses ke jalur penyimpanan dapat menemukan dan menginterpretasikannya tanpa katalog pusat. Properti ini mendukung Koleksi Eksternal, Snapshot, dan integrasi danau di masa depan.</p>
