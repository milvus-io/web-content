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
    </button></h1><p>Temukan apa saja yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug di setiap rilis. Kami menyarankan Anda untuk mengunjungi halaman ini secara rutin untuk mengetahui pembaruan terbaru.</p>
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
<p>Milvus 3.0-beta memperluas basis data vektor Milvus dengan integrasi baru ke dalam ekosistem open lake: Koleksi Eksternal memungkinkan Milvus melakukan kueri tabel lake eksternal tanpa penyalinan (zero-copy), dan Spark dapat membaca koleksi Milvus secara langsung melalui Snapshot. Rilis ini juga menghadirkan pengambilan data yang lebih kaya, skema yang lebih ekspresif, penyesuaian pencarian teks yang lebih mendalam, kontrol siklus hidup data dan model yang lebih terperinci, serta kontrol sisi operator yang lebih banyak. Milvus 3.0 adalah inti dari Zilliz Lakebase, yang mendukung penyajian, penemuan, dan pemrosesan batch yang terpadu.</p>
<p>Tonton video di bawah ini untuk mempelajari lebih lanjut tentang Milvus 3.0 dan sesi tanya jawab (AMA) dengan pengembang inti:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Koleksi Eksternal</h4><p>Dalam pipa data AI pada umumnya, terabyte embedding dan metadata sudah tersimpan di penyimpanan objek sebagai tabel Parquet, Lance, atau Iceberg. Menyalin data tersebut ke Milvus akan menggandakan biaya penyimpanan, menambah pipa ETL yang harus dijaga agar tetap sinkron, dan mengalihkan tata kelola data dari pelanggan.</p>
<p>Koleksi Eksternal menghilangkan kebutuhan untuk menyalin data. Koleksi Milvus dapat merujuk ke file di lokasi aslinya, dan Milvus hanya mengelola skema, indeks, serta eksekusi kueri. Pembaruan bertahap menjaga Koleksi tetap selaras dengan file yang mendasarinya. Pelanggan yang datanya tidak dapat meninggalkan lake, seperti tim keuangan dan kesehatan, dapat menjalankan pengambilan vektor terhadap data tersebut di tempatnya. Satu dataset yang berada di lake juga dapat disajikan dari beberapa instance Milvus sekaligus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Buat Koleksi Eksternal</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Penyajian dan penemuan batch seringkali memerlukan Koleksi yang sama pada waktu yang sama. Evaluasi model A/B, deduplikasi skala besar, validasi backfill, dan rollback versi semuanya memerlukan tampilan yang stabil dari Koleksi sementara penulisan data masih berlangsung.</p>
<p>Snapshot membuat tampilan Koleksi pada titik waktu tertentu yang hanya dapat dibaca dengan merujuk segmen yang ada, bukan menyalin data, sehingga biaya penyimpanan marjinal mendekati nol. Pekerjaan batch dapat membaca dari Snapshot di bawah isolasi bergaya MVCC sementara Koleksi langsung terus menerima penulisan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/snapshots.md">Snapshot</a>, <a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a>, dan <a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Urutan Query / Pencarian</h4><p>Pencarian dan Query kini mendukung pengurutan multi-kolom, dengan proses pengurutan ditangani oleh kernel Milvus dan opsi " <code translate="no">ASC</code> " serta " <code translate="no">DESC</code> " dapat disesuaikan per kolom. Hal ini menutup celah umum dalam produksi: pengurutan Top-K berdasarkan jarak saja seringkali tidak sesuai dengan kebutuhan bisnis ketika item yang paling mirip bukanlah yang termurah, terbaru, atau paling populer.</p>
<p>Aplikasi tidak perlu lagi mengambil hasil secara berlebihan dan melakukan pengurutan ulang di sisi klien untuk mengekspresikan peringkat gabungan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Mengurutkan Hasil Pencarian berdasarkan Bidang Skalar</a> dan <a href="/docs/id/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Mengurutkan Hasil Kueri</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregasi Kueri</h4><p>Untuk menghasilkan statistik distribusi penyewa, hitungan kelengkapan bidang, atau kemajuan peluncuran versi dari Koleksi Milvus, sebelumnya diperlukan penarikan entitas yang cocok kembali ke klien dan pengagregasiannya di sana. Milvus 3.0 mengintegrasikan agregasi skalar bergaya SQL ke dalam kernel. Panggilan kueri menerima ekspresi agregasi skalar ( <code translate="no">group_by_fields</code> ) dan ekspresi agregasi dalam bentuk kueri ( <code translate="no">output_fields</code>), termasuk <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, dan <code translate="no">max(&lt;field&gt;)</code>. Agregasi dievaluasi di sisi server setelah penyaringan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Hasil Kueri Agregasi</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vektor Nol</h4><p>Embedding sering kali dihasilkan secara asinkron, sehingga suatu entitas dapat tiba sebelum vektornya. Data multimodal juga memiliki celah alami, seperti video tanpa teks atau produk tanpa gambar. Versi sebelumnya tidak memiliki solusi yang baik: aplikasi menunda penulisan hingga vektor siap atau mengisi vektor tempatholder, dan kedua pilihan tersebut merusak kualitas pencarian.</p>
<p>Milvus 3.0 mendukung NULL pada bidang vektor di semua enam jenis vektor. Pencarian secara otomatis melewati vektor NULL, kualitas pengambilan data tidak terpengaruh, dan vektor NULL tidak memakan ruang penyimpanan. Fitur " <code translate="no">AddField</code> " juga berlaku untuk bidang vektor dalam perubahan ini: dengan " <code translate="no">nullable=True</code>", koleksi yang sudah ada dapat menambahkan bidang vektor baru secara online tanpa perlu rebuild.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Bidang</a> yang <a href="/docs/id/nullable-and-default.md">Dapat Berisi Nilai NULL</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Kamus Kustom &amp; Kamus Sinonim</h4><p>Tokenizer bawaan tidak selalu memenuhi persyaratan kualitas pencarian produksi. Bahasa Mandarin, domain vertikal seperti kedokteran, hukum, dan kimia, serta korpus multibahasa dapat memperoleh manfaat besar dari kamus khusus dan tabel sinonim. Hingga saat ini, sumber daya ini sebagian besar berfungsi sebagai penulisan ulang kueri di sisi aplikasi.</p>
<p>Milvus 3.0 menambahkan mekanisme FileResource untuk mendaftarkan kamus tokenizer khusus, daftar sinonim, daftar kata penghalang, dan aturan dekomposisi kata majemuk. Setelah terdaftar, sumber daya dapat dirujuk dari tokenizer atau filter mana pun dan berlaku pada BM25, penganalisis, dan Text Match. Kamus dan sinonim kini dapat diberi versi dan dikelola secara terpusat, bukan tersebar di seluruh kode aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/manage-file-resources.md">Kelola Sumber Daya File</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL Entitas</h4><p>TTL tingkat koleksi dan tingkat partisi terlalu kasar untuk banyak skenario siklus hidup dan kepatuhan. Penyewa yang berbeda di dalam Koleksi yang sama sering kali memiliki aturan penyimpanan yang berbeda, dan entitas individual mungkin perlu kedaluwarsa sesuai jadwal yang tidak sesuai dengan Koleksi lainnya.</p>
<p>Milvus 3.0 mendukung TTL per entitas. Tetapkan bidang ` <code translate="no">TIMESTAMPTZ</code> ` dalam skema, tandai sebagai bidang TTL melalui properti Koleksi, dan Milvus akan secara otomatis menghapus entitas yang telah kadaluwarsa. Hal ini mencakup permintaan hak untuk dilupakan, data sesi yang kadaluwarsa, dan riwayat percakapan yang dibatasi tanpa perlu pembersihan di sisi aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Tetapkan TTL Tingkat Entitas</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 menambahkan indeks <code translate="no">MINHASH_LSH</code> untuk deteksi duplikat yang hampir sama berbasis set, tetapi aplikasi masih harus menghitung tanda tangan MinHash sebelum menulis data ke Milvus.</p>
<p>Milvus 3.0 menambahkan fungsi MinHash di sisi server. Deklarasikan bidang masukan " <code translate="no">VARCHAR</code> " dan bidang keluaran " <code translate="no">BINARY_VECTOR</code> " dalam skema, lampirkan fungsi " <code translate="no">FunctionType.MINHASH</code> ", dan Milvus akan menghitung tanda tangan selama proses penyisipan, penyisipan massal, dan pencarian. Bersama dengan " <code translate="no">MINHASH_LSH</code>", ini mendukung alur kerja deduplikasi untuk dataset besar, pembentukan sidik jari, dan deteksi plagiarisme di dalam Milvus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Asumsi “satu entitas = satu vektor” tidak lagi sesuai dengan pencarian modern. Dokumen panjang dibagi menjadi banyak bagian, model interaksi terlambat seperti ColBERT mengeluarkan satu vektor per token, dan entitas multimodal dapat membawa beberapa tampilan.</p>
<p>EmbList menyimpan daftar vektor berpanjang variabel per entitas, dengan " <code translate="no">DISKANN</code> " sebagai indeks di disk. Jalur disk ini menjaga penggunaan RAM tetap terkendali saat korpus melebihi batas memori. EmbList + " <code translate="no">DISKANN</code> " adalah varian pertama dari keluarga StructList yang lebih luas dalam rilis kandidat (RC) ini. Sisa keluarga ini, termasuk penyaringan StructList dan akselerasi multi-vektor Muvera / Lemur, ditargetkan untuk rilis resmi 3.0.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Paksakan Penggabungan</h4><p>Beban kerja produksi mengakumulasi fragmentasi segmen seiring waktu, yang menyebabkan jitter latensi kueri dan penyimpanan yang membengkak.</p>
<p>Milvus 3.0 menambahkan kemampuan untuk memicu pemadatan segmen secara eksplisit selama jendela di luar jam sibuk, baik dalam mode sinkron maupun asinkron.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/force-merge.md">Pemadatan Force Merge</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Penyimpanan V3</h4><p>Milvus 3.0 memperkenalkan Storage V3, mesin penyimpanan kolom berbasis manifest di mana data dan metadata disimpan di penyimpanan objek yang kompatibel dengan S3. Setiap versi dataset direkam sebagai snapshot manifest yang tidak dapat diubah, yaitu file yang dikodekan Avro yang mencatat kelompok kolom, log delta, dan statistik yang membentuk dataset.</p>
<p>Manifest adalah file Avro yang ringkas, sedangkan log delta mencatat penghapusan entitas tanpa menulis ulang file data. Hal ini menjaga beban metadata tetap kecil seiring pertumbuhan dataset. Manifest juga memisahkan pelacakan metadata dari jalur kueri, memungkinkan sebuah Collection mengelola lebih banyak segmen tanpa mengorbankan kinerja kueri.</p>
<p>Karena status disimpan di penyimpanan objek, kumpulan data bersifat deskriptif sendiri: pembaca mana pun yang memiliki akses ke jalur penyimpanan dapat menemukannya dan menafsirkannya tanpa katalog pusat. Sifat ini mendukung Koleksi Eksternal, Snapshot, dan integrasi lake di masa mendatang.</p>
