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
    </button></h1><p>Temukan apa saja yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug pada setiap rilis. Kami menyarankan Anda untuk mengunjungi halaman ini secara rutin guna mengetahui pembaruan terbaru.</p>
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
<tr><th>Versi Milvus</th><th>Versi SDK Python</th><th>Versi SDK Node.js</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus v3.0-beta menandai peralihan Milvus dari basis data vektor menjadi mesin lake yang native semantik. Kernel Milvus kini dapat beroperasi langsung pada data dalam format lake terbuka, dan kemampuan inti Milvus telah diperluas mencakup pengambilan data, skema, siklus hidup, bahasa, dan operasi.</p>
<p>Pengumpulan Eksternal dan Snapshot merupakan fitur utama yang ditambahkan di sisi lake. Kernel yang sama juga mendukung Zilliz Lakebase, sebuah platform data semantik-native yang dibangun di atas Milvus 3.0.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Pengumpulan Eksternal</h4><p>Dalam pipa data AI pada umumnya, terabyte embedding dan metadata sudah tersimpan di penyimpanan objek sebagai tabel Parquet, Lance, atau Iceberg. Menyalin data tersebut ke Milvus akan menggandakan biaya penyimpanan, menambah pipa ETL yang harus tetap disinkronkan, dan mengalihkan tata kelola data dari pelanggan.</p>
<p>Pengumpulan Eksternal menghilangkan proses penyalinan tersebut. Koleksi Milvus dapat merujuk ke file di lokasi aslinya, dan Milvus hanya mengelola skema, indeks, serta eksekusi kueri. Penyegaran bertahap memastikan Koleksi tetap selaras dengan file aslinya. Pelanggan yang datanya tidak dapat dipindahkan dari data lake, seperti tim keuangan dan kesehatan, dapat menjalankan pencarian vektor terhadap data tersebut di lokasi aslinya. Satu set data yang berada di data lake juga dapat disajikan dari beberapa instans Milvus secara bersamaan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Penyajian dan penemuan batch sering kali memerlukan Koleksi yang sama pada waktu yang bersamaan. Evaluasi model A/B, deduplikasi skala besar, validasi backfill, dan rollback versi semuanya memerlukan tampilan Koleksi yang stabil sementara penulisan data masih berlangsung.</p>
<p>Snapshot membuat tampilan Koleksi pada titik waktu tertentu yang hanya dapat dibaca dengan merujuk pada segmen yang ada, bukan dengan menyalin data, sehingga biaya penyimpanan marjinalnya mendekati nol. Pekerjaan batch dapat membaca dari Snapshot di bawah isolasi bergaya MVCC sementara Koleksi yang aktif tetap menerima penulisan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/snapshots.md">Snapshot</a>, <a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a>, dan <a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a>.</p>
<h4 id="External-Backfill" class="common-anchor-header">Pengisian Ulang Eksternal</h4><p>Memperbarui model embedding, seperti beralih dari embedding v1 ke v2 pada Koleksi yang sudah ada, dulunya berarti membangun ulang dari awal. Hal ini memaksa layanan untuk dihentikan sementara atau menerapkan logika penulisan ganda di sisi aplikasi.</p>
<p>Milvus 3.0 mendukung peningkatan ini sebagai alur kerja "hot". Anda dapat menambahkan bidang vektor baru dengan perintah ` <code translate="no">AddCollectionField</code>`, menggunakan Snapshot untuk membekukan titik awal yang konsisten, menjalankan pekerjaan embedding secara offline terhadap Snapshot, dan menulis nilai-nilai tersebut kembali melalui jalur pengambilan data normal. Setelah bidang baru diindeks secara online, aplikasi dapat beralih tanpa downtime.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Urutan Query / Pencarian</h4><p>Pencarian dan Kueri kini mendukung pengurutan multi-bidang, dengan proses pengurutan ditangani langsung oleh kernel Milvus dan parameter ` <code translate="no">ASC</code> ` / ` <code translate="no">DESC</code> ` dapat disesuaikan per bidang. Hal ini mengatasi celah umum dalam produksi: pengurutan Top-K berdasarkan jarak saja seringkali tidak sesuai dengan kebutuhan bisnis ketika item yang paling mirip bukanlah yang termurah, terbaru, atau paling populer.</p>
<p>Aplikasi tidak lagi perlu mengambil hasil secara berlebihan dan melakukan pengurutan ulang di sisi klien untuk menghasilkan peringkat gabungan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Mengurutkan Hasil Pencarian berdasarkan Bidang Skalar</a> dan <a href="/docs/id/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Mengurutkan Hasil Kueri</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vektor Null</h4><p>Embedding sering kali dihasilkan secara asinkron, sehingga suatu entitas dapat tiba sebelum vektornya. Data multimodal juga memiliki celah alami, seperti video tanpa teks terjemahan atau produk tanpa gambar. Versi sebelumnya tidak memiliki solusi yang memadai: aplikasi harus menunda penulisan hingga vektor siap atau mengisi vektor tempatholder, dan kedua pilihan tersebut merugikan kualitas pengambilan data.</p>
<p>Milvus 3.0 mendukung nilai NULL pada bidang vektor di seluruh enam jenis vektor. Pencarian secara otomatis melewati vektor NULL, kualitas pengambilan data tidak terpengaruh, dan vektor NULL secara efektif tidak memakan ruang penyimpanan. Fitur " <code translate="no">AddField</code> " juga berlaku untuk bidang vektor dalam perubahan ini: dengan " <code translate="no">nullable=True</code>", sebuah Koleksi yang sudah ada dapat menambahkan bidang vektor baru secara online tanpa perlu rebuild.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Bidang</a> yang <a href="/docs/id/nullable-and-default.md">Dapat Bernilai NULL</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Kamus Kustom &amp; Kamus Sinonim</h4><p>Tokenizer bawaan tidak selalu memenuhi persyaratan kualitas pencarian produksi. Bahasa Mandarin, domain vertikal seperti kedokteran, hukum, dan kimia, serta korpus multibahasa dapat memperoleh manfaat besar dari kamus kustom dan tabel sinonim. Hingga saat ini, sumber daya ini sebagian besar berfungsi sebagai penulisan ulang kueri di sisi aplikasi.</p>
<p>Milvus 3.0 menambahkan mekanisme FileResource untuk mendaftarkan kamus tokenizer kustom, daftar sinonim, daftar kata penghalang, dan aturan pemisah kata majemuk. Setelah didaftarkan, suatu sumber daya dapat dirujuk dari tokenizer atau filter mana pun dan berlaku pada BM25, penganalisis, dan Text Match. Kamus dan sinonim kini dapat diberi versi dan dikelola secara terpusat, bukan tersebar di seluruh kode aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/manage-file-resources.md">Mengelola Sumber Daya File</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL Entitas</h4><p>TTL tingkat koleksi dan tingkat partisi terlalu kasar untuk banyak skenario siklus hidup dan kepatuhan. Penyewa yang berbeda di dalam Koleksi yang sama sering kali memiliki aturan penyimpanan yang berbeda, dan entitas individu mungkin perlu kedaluwarsa sesuai jadwal yang tidak sesuai dengan bagian Koleksi lainnya.</p>
<p>Milvus 3.0 mendukung TTL per entitas. Tentukan bidang ` <code translate="no">TIMESTAMPTZ</code> ` dalam skema, tandai sebagai bidang TTL melalui properti Koleksi, dan Milvus akan secara otomatis menghapus entitas yang telah kadaluwarsa. Fitur ini mencakup permintaan "hak untuk dilupakan", data sesi yang kadaluwarsa, serta riwayat percakapan yang dibatasi tanpa perlu pembersihan di sisi aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Tetapkan TTL Tingkat Entitas</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 menambahkan indeks <code translate="no">MINHASH_LSH</code> untuk deteksi duplikat hampir identik berbasis himpunan, tetapi aplikasi masih harus menghitung tanda tangan MinHash sebelum menulis data ke Milvus.</p>
<p>Milvus 3.0 menambahkan fungsi MinHash di sisi server. Deklarasikan bidang masukan ` <code translate="no">VARCHAR</code> ` dan bidang keluaran ` <code translate="no">BINARY_VECTOR</code> ` dalam skema, lampirkan fungsi ` <code translate="no">FunctionType.MINHASH</code> `, dan Milvus akan menghitung tanda tangan tersebut selama proses penyisipan, penyisipan massal, dan pencarian. Bersama dengan ` <code translate="no">MINHASH_LSH</code>`, fitur ini mendukung alur kerja deduplikasi untuk dataset besar, pembuatan sidik jari, dan deteksi plagiarisme di dalam Milvus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Asumsi “satu entitas = satu vektor” tidak lagi sesuai dengan pencarian modern. Dokumen panjang dibagi menjadi banyak bagian, model interaksi terlambat seperti ColBERT menghasilkan satu vektor per token, dan entitas multimodal dapat memiliki beberapa tampilan.</p>
<p>EmbList menyimpan daftar vektor berpanjang variabel per entitas, dengan <code translate="no">DISKANN</code> sebagai indeks di disk. Jalur disk ini membantu mengendalikan penggunaan RAM saat korpus melebihi batas memori. EmbList + <code translate="no">DISKANN</code> merupakan varian pertama dari keluarga StructList yang lebih luas dalam rilis kandidat (RC) ini. Sisa keluarga ini, termasuk penyaringan StructList dan akselerasi multi-vektor Muvera / Lemur, ditargetkan untuk rilis resmi versi 3.0.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Paksakan Penggabungan</h4><p>Beban kerja produksi menumpuk fragmentasi segmen seiring waktu, yang menyebabkan fluktuasi latensi kueri dan penggunaan penyimpanan yang membengkak.</p>
<p>Milvus 3.0 menambahkan kemampuan untuk memicu pemadatan segmen secara eksplisit selama jendela di luar jam sibuk, baik dalam mode sinkron maupun asinkron.</p>
<p>Untuk informasi lebih lanjut, lihat " <a href="/docs/id/force-merge.md">Pemadatan Force Merge</a>".</p>
