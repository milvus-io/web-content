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
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 29 Juli 2026</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi SDK Python</th><th>Versi SDK Node.js</th><th>Versi SDK Java</th><th>Versi SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 telah dirilis secara resmi! Berlandaskan arsitektur lake-native yang diperkenalkan pada <a href="https://milvus.io/docs/release_notes.md#v30-beta">versi 3.0-beta</a>, rilis ini menyempurnakan apa yang telah dimulai pada versi beta: External Collection kini mencakup lebih banyak alur kerja lakehouse; skema mendukung penambahan, pengisian ulang, dan penghapusan data secara online; indeks sparse dibangun ulang menggunakan SINDI; StructArray dan pencarian berfacet melengkapi mesin pengambilan data; FAISS passthrough dan TEXT memperluas pilihan indeks dan modus; serta Woodpecker berjalan sebagai layanan mandiri.</p>
<p>Tonton video di bawah ini untuk mempelajari lebih lanjut tentang Milvus 3.0 dan sesi tanya jawab (AMA) dengan pengelola inti:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Jika Anda baru mengenal seri 3.0, bagian ringkasan fitur Core 3.0 di bawah ini merangkum kemampuan yang diperkenalkan dalam 3.0-beta; <a href="https://milvus.io/docs/release_notes.md#v30-beta">catatan rilis 3.0-beta</a> berisi penjelasan lengkapnya.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Yang baru di 3.0.0 (sejak 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Koleksi Eksternal: alur kerja lakehouse yang lebih lengkap</h4><p>3.0-beta memperkenalkan Koleksi Eksternal: merujuk file lakehouse di tempat, membangun indeks, dan mencarinya tanpa menyalin data ke Milvus. Rilis ini memperluasnya menuju alur kerja pencarian lakehouse yang lengkap. Kolom eksternal kini dapat menjadi sumber untuk kolom keluaran fungsi seperti vektor langka BM25, tanda tangan MinHash, dan embedding teks, sehingga kolom pencarian berbasis teks dan model dapat dibangun di dalam Milvus tanpa menyalin tabel sumber. Refresh juga mendukung evolusi skema aditif: ketika tabel eksternal mendapatkan kolom baru, Milvus memperbarui segmen yang terpengaruh alih-alih membangun ulang koleksi.</p>
<p>Rilis ini juga menambahkan format eksternal " <code translate="no">milvus-table</code> " yang memperlakukan metadata Milvus Snapshot dan manifes Storage V3 sebagai sumber eksternal, sehingga snapshot koleksi itu sendiri dapat disajikan sebagai tabel eksternal — sistem batch dan sistem penyajian mendapatkan tampilan bersama yang didukung manifes atas data yang sama.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a> dan <a href="/docs/id/snapshots.md">Snapshot</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Skema fleksibel: tambahkan, isi ulang, dan hapus kolom secara online</h4><p>Skema tidak tetap statis di lingkungan produksi — model yang disematkan diganti, fitur diperbarui, bidang menjadi usang — dan hal ini biasanya berarti perlu membangun ulang seluruh koleksi dengan waktu henti atau penulisan ganda. Versi 3.0.0 menutup celah ini: kolom dapat ditambahkan, diisi, dan dihapus sementara layanan tetap berjalan.</p>
<p>Pengisian ulang (backfill) berfungsi dua arah. Pengisian ulang eksternal menangani nilai yang dihitung di luar Milvus: tambahkan kolom, ambil snapshot koleksi sebagai titik awal yang konsisten, jalankan tugas secara offline, tulis nilai kembali, dan Milvus mengindeks kolom baru secara bertahap — pembaruan model embedding pada ratusan juta baris menjadi proses yang berjalan lancar tanpa downtime. Pengisian ulang internal mencakup nilai-nilai yang diturunkan dari kernel: lampirkan fungsi BM25 atau MinHash ke koleksi yang ada, dan bidang outputnya dihitung secara otomatis berdasarkan data yang ada.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/add-fields-to-an-existing-collection.md">Menambahkan Bidang ke Koleksi yang Sudah Ada</a>.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Perombakan indeks spars: SINDI, Block-Max WAND, dan Block-Max MaxScore</h4><p>Milvus 3.0 meningkatkan indeks vektor spars di seluruh sistem. Versi ini memperkenalkan algoritma pencarian baru — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND, dan Block-Max MaxScore — bersama dengan kompresi daftar terbalik, kuantisasi yang dapat dikonfigurasi, serta pemilihan algoritma pencarian per beban kerja. Pemuatan mmap, serialisasi, dan penilaian BM25 juga dioptimalkan, sehingga mengurangi beban penyimpanan dan pemuatan indeks untuk pencarian vektor spars dan teks lengkap berskala besar. Dalam pengujian internal, indeks BM25 yang terkompresi ukurannya kira-kira 3 kali lebih kecil daripada indeks langka 2.6 dengan tingkat recall yang sebanding, dan SINDI mencapai hingga sekitar 10 kali QPS MaxScore pada embedding langka yang dipelajari. Setelah versi indeks baru diaktifkan (lihat Catatan kompatibilitas dan perilaku), SINDI menjadi default untuk pencarian IP spars, sedangkan MaxScore menjadi default untuk BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cakupan StructArray</h4><p>StructArray kini mendukung nilai null, indeks bitmap, penambahan bidang dinamis pada koleksi aktif, serta pembaruan parsial bidang struct melalui upsert, dengan cakupan REST dan impor massal yang sesuai.</p>
<p>Pencarian tingkat elemen menambahkan pencarian hibrida di seluruh sub-bidang vektor dengan penggabungan per-entitas yang dapat dikonfigurasi (varian max / sum / avg / top-k), ditambah pencarian rentang dan pengelompokan di dalamnya. Penyaringan bersarang mencakup predikat <code translate="no">element_filter</code>, kuantifier <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, akses sub-bidang posisional seperti <code translate="no">tags[0][name]</code>, dan <code translate="no">array_length()</code> pada kolom struct.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/array-of-structs.md">StructArray</a> dan <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregasi Pencarian dan pencarian berfacet</h4><p>Agregasi Kueri dari versi beta menghitung statistik yang tepat atas data yang difilter; versi 3.0.0 menambahkan pemfilteran berdasarkan aspek (faceting) pada jalur pencarian. Tentukan bidang aspek pada saat pencarian, dan Milvus akan mengembalikan nilai-nilai aspek teratas, masing-masing diwakili oleh anggota yang paling sesuai dalam peringkat ANN dan dilengkapi dengan agregat seperti COUNT dan AVG — bilah samping pencarian berfacet (merek, kisaran harga, atribut) dalam satu permintaan, alih-alih mengambil data berlebihan dan menghitungnya di sisi klien.</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">Penataan ulang melalui Rantai Fungsi<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>Penilaian ulang kini dapat digabungkan melalui API Rantai Fungsi, yang menjalankan pipa berurutan dan bertipe sebagai bagian dari satu permintaan pencarian. Sebuah rantai dapat menggabungkan penilaian ulang L0 awal pada QueryNode dengan penataan ulang peringkat pasca-reduksi L2 pada Proxy, mendukung transformasi dan kombinasi skor, penataan ulang peringkat berbasis model, penyortiran, serta pemangkasan kandidat tanpa perlu orkestrasi di sisi klien. Rilis ini juga menambahkan penilaian XGBoost bawaan untuk pengurutan ulang L0 menggunakan model UBJ yang terdaftar sebagai FileResources, bersama dengan Penyedia Inferensi Hugging Face untuk embedding teks yang dikelola server dan pengurutan ulang kesamaan kalimat.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Bidang teks panjang TEXT</h4><p>Kolom TEXT menjadikan teks panjang sebagai prioritas utama, dengan batasan panjang di sisi penyimpanan dihapus: kolom ini mendukung <code translate="no">text_match</code>, <code translate="no">phrase_match</code>, dan BM25. Nilai di bawah 64 KB tetap disimpan secara inline; nilai yang lebih besar disimpan ke berkas LOB tingkat partisi dalam format Vortex, dengan kolom hanya menyimpan referensi <code translate="no">(file_id, offset)</code>. File LOB dibagikan di seluruh segmen, sehingga pemadatan memindahkan referensi alih-alih menulis ulang teks. Untuk RAG, ini berarti mengambil vektor dan teks sumber dari penyimpanan yang sama dalam satu IO — tidak perlu mengoperasikan penyimpanan blob eksternal.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Passthrough indeks FAISS</h4><p>Jenis indeks " <code translate="no">FAISS</code> " yang baru menerima string pabrik indeks Faiss apa pun melalui parameter " <code translate="no">faiss_index_name</code> " — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — dengan parameter pencarian diteruskan, sehingga resep Faiss dapat direproduksi langsung di Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Dukungan format Vortex dan Lance</h4><p>Lapisan penyimpanan kini dilengkapi dengan dua format kolom terbuka: Vortex sebagai format internal generasi berikutnya — pengkodean adaptif (kamus, RLE, pengemasan bit, kompresi khusus float), dekompresi tanpa penyalinan, dioptimalkan untuk beban kerja campuran vektor + skalar — dan Lance bersama Parquet untuk pertukaran ekosistem terbuka. Vortex akan menjadi format internal default, dengan filter pushdown dan varian lokal yang sedang direncanakan.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Penerapan Woodpecker secara mandiri</h4><p>Woodpecker, WAL yang menjadi inti jalur penulisan streaming, kini dapat diterapkan sebagai layanan independen, bukan tertanam dalam node lain — penskalaan independen, isolasi kesalahan, dan kemampuan pengamatan, seperti layanan mikro lainnya. Hal ini sangat penting bagi klaster besar dan beban kerja penulisan tinggi.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Ringkasan fitur inti 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>Fitur-fitur di bawah ini telah diperkenalkan dalam <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> dan merupakan bagian dari 3.0.0; lihat catatan beta untuk penjelasan lengkapnya.</p>
<ul>
<li><strong>Koleksi Eksternal</strong> — kueri data lakehouse (Parquet, Lance, Iceberg, Vortex) di tempat: tanpa penyalinan, hanya baca, disinkronkan melalui penyegaran tambahan.</li>
<li><strong>Snapshot</strong> — tampilan koleksi read-only pada titik waktu tertentu berdasarkan referensi segmen, dengan penyimpanan marjinal mendekati nol.</li>
<li><strong>Penyimpanan V3 (Loon)</strong> — penyimpanan kolom berbasis manifest pada penyimpanan objek; fondasi untuk Snapshot dan Koleksi Eksternal.</li>
<li><strong>Query / Search ORDER BY</strong> — penyortiran multi-bidang di sisi server dengan ASC / DESC per bidang.</li>
<li><strong>Agregasi Kueri</strong> — COUNT / SUM / AVG / MIN / MAX dengan pengelompokan, dievaluasi di sisi server.</li>
<li><strong>EmbList + DiskANN</strong> — pengindeksan multi-vektor pada disk untuk daftar embedding StructArray, dengan jalur akselerasi seperti Muvera dan Lemur.</li>
<li><strong>Fungsi MinHash (doc-in, doc-out)</strong> — tanda tangan MinHash di sisi server ditambah " <code translate="no">MINHASH_LSH</code> " untuk deteksi duplikat hampir identik.</li>
<li><strong>Vektor yang dapat bernilai NULL</strong> — NULL pada keenam tipe vektor; pencarian melewati baris NULL, dan AddField diperluas ke bidang vektor.</li>
<li><strong>TTL Entitas</strong> — kedaluwarsa per baris yang ditentukan oleh bidang TIMESTAMPTZ.</li>
<li><strong>FileResource</strong> — kamus yang dikelola klaster, daftar sinonim, dan daftar kata penghalang untuk penganalisis, BM25, dan Text Match.</li>
<li><strong>Force Merge</strong> — pemadatan segmen yang dipicu oleh operator, dalam mode sinkron atau asinkron.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Catatan kompatibilitas dan perilaku<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) dinonaktifkan secara default.</strong> Fitur yang bergantung padanya — seperti Snapshot dan bidang TEXT — memerlukan pengaktifan manual melalui <code translate="no">common.storage.useLoonFFI</code>. Storage V3 akan diaktifkan secara default pada rilis berikutnya.</li>
<li><strong>Kompatibilitas dan rollback dari 2.6 ke 3.0 dijamin</strong> — penerapan versi 3.0 dapat dikembalikan ke versi 2.6. Namun, setelah Anda mengaktifkan atau menggunakan fitur yang mengubah format data serial (misalnya Storage V3), rollback tidak lagi dimungkinkan.</li>
<li><strong>Versi indeks baru saat ini bersifat opsional.</strong> Algoritma indeks yang baru diperkenalkan memerlukan penyesuaian versi indeks target secara manual (<code translate="no">dataCoord.targetVecIndexVersion</code> menjadi 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> menjadi 4) sebelum berlaku; rilis berikutnya akan mengaktifkannya secara default.</li>
<li><strong>Gambar GPU beralih ke CUDA 12.9</strong> dan tidak lagi mempertahankan kompatibilitas GPU Ubuntu 20.04.</li>
</ul>
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
<p>Milvus 3.0-beta memperluas basis data vektor Milvus dengan integrasi baru ke dalam ekosistem Open Lake: Fitur External Collection memungkinkan Milvus melakukan kueri terhadap tabel Open Lake eksternal tanpa salinan data (zero-copy), dan Spark dapat membaca koleksi Milvus secara langsung melalui Snapshot. Rilis ini juga menghadirkan pencarian yang lebih kaya, skema yang lebih ekspresif, penyesuaian pencarian teks yang lebih mendalam, kontrol siklus hidup data dan model yang lebih terperinci, serta kontrol sisi operator yang lebih banyak. Milvus 3.0 merupakan inti dari Zilliz Lakebase, yang mendukung penyajian terpadu, penemuan, dan pemrosesan batch.</p>
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
<p>Pengumpulan Eksternal menghilangkan proses penyalinan tersebut. Koleksi Milvus dapat merujuk ke file di lokasi aslinya, dan Milvus hanya mengelola skema, indeks, serta eksekusi kueri. Pembaruan bertahap memastikan Koleksi tetap selaras dengan file aslinya. Pelanggan yang datanya tidak dapat dipindahkan dari data lake, seperti tim keuangan dan kesehatan, dapat menjalankan pencarian vektor terhadap data tersebut di lokasi aslinya. Satu set data yang berada di data lake juga dapat disajikan dari beberapa instance Milvus secara bersamaan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Penyajian dan penemuan batch sering kali memerlukan Koleksi yang sama pada waktu yang bersamaan. Evaluasi model A/B, deduplikasi skala besar, validasi backfill, dan rollback versi semuanya memerlukan tampilan Koleksi yang stabil sementara penulisan data masih berlangsung.</p>
<p>Snapshot membuat tampilan Koleksi pada titik waktu tertentu yang hanya dapat dibaca dengan merujuk pada segmen yang ada, bukan dengan menyalin data, sehingga biaya penyimpanan marjinalnya mendekati nol. Pekerjaan batch dapat membaca dari Snapshot di bawah isolasi bergaya MVCC sementara Koleksi yang aktif terus menerima penulisan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/snapshots.md">Snapshot</a>, <a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a>, dan <a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Urutan Query / Pencarian</h4><p>Pencarian dan Kueri kini mendukung pengurutan multi-kolom, dengan proses pengurutan ditangani langsung oleh kernel Milvus dan opsi " <code translate="no">ASC</code> " serta " <code translate="no">DESC</code> " dapat disesuaikan per kolom. Hal ini mengatasi celah umum dalam produksi: pengurutan Top-K berdasarkan jarak saja seringkali tidak sesuai dengan kebutuhan bisnis ketika item yang paling mirip bukanlah yang termurah, terbaru, atau paling populer.</p>
<p>Aplikasi tidak lagi perlu mengambil hasil secara berlebihan dan melakukan pengurutan ulang di sisi klien untuk menghasilkan peringkat gabungan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Mengurutkan Hasil Pencarian berdasarkan Bidang Skalar</a> dan <a href="/docs/id/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Mengurutkan Hasil Kueri</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregasi Kueri</h4><p>Dulu, untuk menghasilkan statistik distribusi penyewa, hitungan kelengkapan bidang, atau kemajuan peluncuran versi dari Koleksi Milvus, diperlukan penarikan entitas yang cocok kembali ke klien dan pengagregasiannya di sana. Milvus 3.0 mengintegrasikan agregasi skalar bergaya SQL ke dalam kernel. Panggilan kueri menerima ekspresi " <code translate="no">group_by_fields</code> " dan ekspresi agregasi dalam " <code translate="no">output_fields</code>", termasuk " <code translate="no">count(*)</code>", " <code translate="no">count(&lt;field&gt;)</code>", " <code translate="no">sum(&lt;field&gt;)</code>", " <code translate="no">avg(&lt;field&gt;)</code>", " <code translate="no">min(&lt;field&gt;)</code>", dan " <code translate="no">max(&lt;field&gt;)</code>". Agregasi dievaluasi di sisi server setelah penyaringan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Hasil Kueri Agregat</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vektor Null</h4><p>Embedding sering dihasilkan secara asinkron, sehingga suatu entitas dapat tiba sebelum vektornya. Data multimodal juga memiliki celah alami, seperti video tanpa teks atau produk tanpa gambar. Versi sebelumnya tidak memiliki solusi yang memadai: aplikasi menunda penulisan hingga vektor siap atau mengisi vektor tempatholder, dan kedua pilihan tersebut merugikan kualitas pencarian.</p>
<p>Milvus 3.0 mendukung nilai NULL pada bidang vektor di seluruh enam jenis vektor. Pencarian secara otomatis melewati vektor NULL, kualitas pencarian tidak terpengaruh, dan vektor NULL secara efektif tidak memakan ruang penyimpanan. Fitur " <code translate="no">AddField</code> " juga berlaku untuk bidang vektor dalam perubahan ini: dengan " <code translate="no">nullable=True</code>", koleksi yang sudah ada dapat menambahkan bidang vektor baru secara online tanpa perlu rebuild.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Bidang</a> yang <a href="/docs/id/nullable-and-default.md">Dapat Bernilai NULL</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Kamus Kustom &amp; Kamus Sinonim</h4><p>Tokenizer bawaan tidak selalu memenuhi persyaratan kualitas pencarian produksi. Bahasa Mandarin, domain vertikal seperti kedokteran, hukum, dan kimia, serta korpus multibahasa dapat memperoleh manfaat besar dari kamus kustom dan tabel sinonim. Hingga saat ini, sumber daya ini sebagian besar hanya tersedia sebagai penulisan ulang kueri di sisi aplikasi.</p>
<p>Milvus 3.0 menambahkan mekanisme FileResource untuk mendaftarkan kamus tokenizer kustom, daftar sinonim, daftar kata penghalang, dan aturan pemisah kata majemuk. Setelah terdaftar, sumber daya tersebut dapat dirujuk dari tokenizer atau filter mana pun dan berlaku pada BM25, penganalisis, dan Text Match. Kamus dan sinonim kini dapat diberi versi dan dikelola secara terpusat, bukan tersebar di seluruh kode aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/manage-file-resources.md">Mengelola Sumber Daya File</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL Entitas</h4><p>TTL tingkat koleksi dan tingkat partisi terlalu kasar untuk banyak skenario siklus hidup dan kepatuhan. Penyewa yang berbeda di dalam Koleksi yang sama sering kali memiliki aturan penyimpanan yang berbeda, dan entitas individu mungkin perlu kedaluwarsa sesuai jadwal yang tidak sesuai dengan bagian Koleksi lainnya.</p>
<p>Milvus 3.0 mendukung TTL per entitas. Tentukan bidang ` <code translate="no">TIMESTAMPTZ</code> ` dalam skema, tandai sebagai bidang TTL melalui properti Koleksi, dan Milvus akan secara otomatis menghapus entitas yang telah kedaluwarsa. Fitur ini mencakup permintaan hak untuk dilupakan, data sesi yang kedaluwarsa, dan riwayat percakapan terbatas tanpa perlu pembersihan di sisi aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Tetapkan TTL Tingkat Entitas</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 menambahkan indeks <code translate="no">MINHASH_LSH</code> untuk deteksi duplikat hampir identik berbasis himpunan, tetapi aplikasi masih harus menghitung tanda tangan MinHash sebelum menulis data ke Milvus.</p>
<p>Milvus 3.0 menambahkan fungsi MinHash di sisi server. Deklarasikan bidang masukan ` <code translate="no">VARCHAR</code> ` dan bidang keluaran ` <code translate="no">BINARY_VECTOR</code> ` dalam skema, lampirkan fungsi ` <code translate="no">FunctionType.MINHASH</code> `, dan Milvus akan menghitung tanda tangan tersebut selama proses penyisipan, penyisipan massal, dan pencarian. Bersama dengan ` <code translate="no">MINHASH_LSH</code>`, hal ini mendukung alur kerja deduplikasi untuk dataset besar, pembuatan sidik jari, dan deteksi plagiarisme di dalam Milvus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Asumsi “satu entitas = satu vektor” tidak lagi sesuai dengan pencarian modern. Dokumen panjang dibagi menjadi banyak bagian, model interaksi akhir seperti ColBERT menghasilkan satu vektor per token, dan entitas multimodal dapat memiliki beberapa tampilan.</p>
<p>EmbList menyimpan daftar vektor berpanjang variabel per entitas, dengan <code translate="no">DISKANN</code> sebagai indeks di disk. Jalur disk ini membantu mengendalikan penggunaan RAM saat korpus melebihi batas memori. EmbList + <code translate="no">DISKANN</code> merupakan varian pertama dari keluarga StructList yang lebih luas dalam rilis kandidat (RC) ini. Sisa keluarga ini, termasuk penyaringan StructList dan akselerasi multi-vektor Muvera / Lemur, ditargetkan untuk rilis resmi versi 3.0.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Paksakan Penggabungan</h4><p>Beban kerja produksi menumpuk fragmentasi segmen seiring waktu, yang menyebabkan fluktuasi latensi kueri dan penggunaan penyimpanan yang membengkak.</p>
<p>Milvus 3.0 menambahkan kemampuan untuk memicu pemadatan segmen secara eksplisit selama jendela di luar jam sibuk, baik dalam mode sinkron maupun asinkron.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/force-merge.md">Pemadatan Force Merge</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Penyimpanan V3</h4><p>Milvus 3.0 memperkenalkan Storage V3, mesin penyimpanan kolom berbasis manifest di mana data dan metadata disimpan di penyimpanan objek yang kompatibel dengan S3. Setiap versi dataset direkam sebagai snapshot manifest yang tidak dapat diubah, yaitu berkas yang dienkode Avro yang mencatat kelompok kolom, log delta, dan statistik yang membentuk dataset tersebut.</p>
<p>Manifest adalah berkas Avro yang ringkas, sedangkan log delta mencatat penghapusan pada tingkat entitas tanpa perlu menulis ulang berkas data. Hal ini menjaga beban metadata tetap rendah seiring pertumbuhan dataset. Manifest juga memisahkan pelacakan metadata dari jalur kueri, sehingga sebuah Koleksi dapat mengelola lebih banyak segmen tanpa mengorbankan kinerja kueri.</p>
<p>Karena status disimpan di penyimpanan objek, dataset bersifat deskriptif sendiri: pembaca mana pun yang memiliki akses ke jalur penyimpanan dapat menemukannya dan menafsirkannya tanpa katalog pusat. Sifat ini menjadi dasar bagi External Collection, Snapshot, dan integrasi lake di masa mendatang.</p>
