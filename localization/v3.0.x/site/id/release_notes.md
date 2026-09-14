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
    </button></h1><p>Temukan hal-hal baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug pada setiap rilis. Kami menyarankan Anda untuk mengunjungi halaman ini secara rutin guna mengetahui pembaruan terbaru.</p>
<h2 id="v301" class="common-anchor-header">v3.0.1<button data-href="#v301" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 9 September 2026</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi SDK Python</th><th>Versi SDK Node.js</th><th>Versi SDK Java</th><th>Versi SDK Go</th></tr>
</thead>
<tbody>
<tr><td>3.0.1</td><td>3.0.1</td><td>3.0.5</td><td>3.0.9</td><td>3.0.1</td></tr>
</tbody>
</table>
<p>Dengan gembira kami mengumumkan peluncuran Milvus v3.0.1! Rilis ini menambahkan manajemen snapshot REST v2, kemampuan pengurutan ulang yang diperluas, dan dukungan bidang TEXT di klien Go dan RESTful API, di samping peningkatan kinerja dan perbaikan untuk Storage V3, konsistensi data, dan keamanan.</p>
<h3 id="Features-improvements" class="common-anchor-header">Peningkatan fitur<button data-href="#Features-improvements" class="anchor-icon" translate="no">
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
<li>Menambahkan API REST v2 untuk manajemen snapshot asli dalam lingkup koleksi dan pemulihan asinkron (<a href="https://github.com/milvus-io/milvus/pull/52118">#52118</a>, <a href="https://github.com/milvus-io/milvus/pull/52172">#52172</a>)</li>
<li>Menambahkan ambang batas jumlah hasil yang dapat dikonfigurasi untuk mengontrol pemilihan jalur keluaran Take pada operasi pencarian dan kueri (<a href="https://github.com/milvus-io/milvus/pull/52437">#52437</a>)</li>
<li>Menambahkan dukungan bidang TEXT ke klien Go dan API RESTful (<a href="https://github.com/milvus-io/milvus/pull/52450">#52450</a>)</li>
<li>Menambahkan laju IOPS baca awal dan maksimum yang dapat dikonfigurasi untuk Tabel Eksternal (<a href="https://github.com/milvus-io/milvus/pull/52503">#52503</a>)</li>
<li>Menambahkan pengaturan opt-in untuk pekerjaan penyegaran koleksi eksternal agar menunggu hingga semua segmen diindeks sebelum melaporkan penyelesaian, tanpa menunda publikasi data (<a href="https://github.com/milvus-io/milvus/pull/52712">#52712</a>)</li>
<li>Menambahkan dukungan L1 reranking ke rantai fungsi pencarian (<a href="https://github.com/milvus-io/milvus/pull/52745">#52745</a>)</li>
<li>Menambahkan penataan ulang RRF tertimbang dengan bobot opsional per permintaan ANN di FunctionScore, REST, pencarian hibrida lama, dan klien Go (<a href="https://github.com/milvus-io/milvus/pull/52891">#52891</a>, <a href="https://github.com/milvus-io/milvus/pull/52926">#52926</a>)</li>
</ul>
<h3 id="Stability-improvements" class="common-anchor-header">Peningkatan stabilitas<button data-href="#Stability-improvements" class="anchor-icon" translate="no">
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
<li>Meningkatkan keamanan memori dalam indeks dan cache geometri RTree, serta penanganan WKB yang tidak dapat diuraikan dan kueri geometri kosong (<a href="https://github.com/milvus-io/milvus/pull/51312">#51312</a>)</li>
<li>Manajemen memori ditingkatkan dengan memulihkan penganggaran memori sementara di seluruh proses dan mengoreksi perkiraan memori untuk pemuatan bidang Storage V2/V3 secara bersamaan serta pemuatan indeks skalar V3 (<a href="https://github.com/milvus-io/milvus/pull/51405">#51405</a>)</li>
<li>Mengurangi kemacetan unduhan dan penggunaan memori selama pembuatan indeks koleksi eksternal dengan melakukan pembacaan secara paralel dan mengalirkan data vektor mentah ke disk (<a href="https://github.com/milvus-io/milvus/pull/51651">#51651</a>)</li>
<li>Peningkatan throughput Woodpecker untuk beban kerja batch kecil dan konkurensi tinggi dengan menggabungkan penambahan klien dan menampilkan pengaturan sinkronisasi (<a href="https://github.com/milvus-io/milvus/pull/51810">#51810</a>)</li>
<li>Meningkatkan kepemilikan pembaca rekaman dan konsistensi masa pakai, penanganan blob kosong, serta pelaporan kesalahan baca di seluruh jalur penyimpanan dan pemadatan (<a href="https://github.com/milvus-io/milvus/pull/51891">#51891</a>)</li>
<li>Meningkatkan efisiensi pengelompokan hash-probe dengan pipa empat arah yang diselingi dan pengamanan untuk tabrakan dan batas rehash (<a href="https://github.com/milvus-io/milvus/pull/51977">#51977</a>)</li>
<li>Mengurangi overhead pemrosesan penyisipan dengan melewatkan penguraian isi penyisipan WAL untuk koleksi tanpa bidang keluaran BM25 atau MinHash (<a href="https://github.com/milvus-io/milvus/pull/51986">#51986</a>)</li>
<li>Peningkatan pelaporan kegagalan penyimpanan dan penanganan percobaan ulang dengan mempertahankan klasifikasi kesalahan sementara dan permanen di seluruh lapisan eksekusi (<a href="https://github.com/milvus-io/milvus/pull/51990">#51990</a>)</li>
<li>Peningkatan kinerja kueri spasial dengan mengaktifkan pemisahan kasar/halus GIS dan fusi predikat kolom yang sama secara default (<a href="https://github.com/milvus-io/milvus/pull/52008">#52008</a>)</li>
<li>Meningkatkan penjadwalan tugas pengindeksan teks dan pemecahan JSON dengan kontrol penerimaan berbasis antrian bersama dan prioritas pengiriman bergantian (<a href="https://github.com/milvus-io/milvus/pull/52010">#52010</a>)</li>
<li>Menambahkan dukungan mmap untuk pemetaan offset segmen tertutup, dengan opsi pemuatan khusus dan penghitungan sumber daya disk (<a href="https://github.com/milvus-io/milvus/pull/52035">#52035</a>)</li>
<li>Pemuatan data Storage V2 dioptimalkan dengan menjalankan estimasi memori potongan per kolom sesuai permintaan (<a href="https://github.com/milvus-io/milvus/pull/52037">#52037</a>)</li>
<li>Menambahkan dukungan AutoIndex sisi server untuk indeks yang terikat ke bidang keluaran fungsi baru, sehingga permintaan add_function_field dapat mengabaikan parameter indeks atau menentukan AUTOINDEX (<a href="https://github.com/milvus-io/milvus/pull/52109">#52109</a>)</li>
<li>Mengurangi beban laporan distribusi QueryNode melalui pelaporan bertahap dengan fallback laporan lengkap, serta mengurangi alokasi memori selama pengumpulan metrik (<a href="https://github.com/milvus-io/milvus/pull/52111">#52111</a>, <a href="https://github.com/milvus-io/milvus/pull/52119">#52119</a>)</li>
<li>Meningkatkan kekuatan hashing kata sandi dengan menaikkan nilai bcrypt dari 4 menjadi 10, dengan rotasi kredensial yang diperlukan untuk meng-upgrade hash yang sudah ada (<a href="https://github.com/milvus-io/milvus/pull/52145">#52145</a>)</li>
<li>Mengurangi dekoding berlebihan selama impor Parquet dengan hanya membaca kolom daun yang diperlukan untuk subbidang array struktur (<a href="https://github.com/milvus-io/milvus/pull/52224">#52224</a>)</li>
<li>Meningkatkan pengelompokan penggabungan paksa dengan perencanaan berbasis ukuran multi-putaran dan menghentikan penggunaan pengaturan ambang batas perencanaan lama (<a href="https://github.com/milvus-io/milvus/pull/52242">#52242</a>)</li>
<li>Meningkatkan cgosymbolizer untuk mencegah proses Milvus yang berjalan sebagai PID 1 macet setelah kesalahan native (<a href="https://github.com/milvus-io/milvus/pull/52299">#52299</a>)</li>
<li>Meningkatkan validasi jumlah baris untuk masukan penyorotan semantik (<a href="https://github.com/milvus-io/milvus/pull/52409">#52409</a>)</li>
<li>Peningkatan kontrol percobaan ulang impor dengan penundaan yang dapat dikonfigurasi untuk percobaan ulang penulisan (<a href="https://github.com/milvus-io/milvus/pull/52414">#52414</a>, <a href="https://github.com/milvus-io/milvus/pull/52415">#52415</a>, <a href="https://github.com/milvus-io/milvus/pull/52427">#52427</a>)</li>
<li>Meningkatkan pengelolaan siklus hidup tugas analisis dengan mengambil kembali versi statistik yang sudah kadaluwarsa dan menyimpan status terminal (<a href="https://github.com/milvus-io/milvus/pull/52416">#52416</a>, <a href="https://github.com/milvus-io/milvus/pull/52417">#52417</a>)</li>
<li>Peningkatan koordinasi siklus hidup segmen dengan menunggu pelepasan segmen setelah batas waktu kunci (<a href="https://github.com/milvus-io/milvus/pull/52422">#52422</a>)</li>
<li>Peningkatan penyortiran penyimpanan untuk pemadatan data dengan penggabungan k-way (<a href="https://github.com/milvus-io/milvus/pull/52429">#52429</a>)</li>
<li>Mengurangi perluasan buffer validitas bidang yang dapat bernilai null dengan mempertahankan masker terkemas di seluruh akses chunk, evaluasi ekspresi, dan statistik JSON (<a href="https://github.com/milvus-io/milvus/pull/52451">#52451</a>)</li>
<li>Peningkatan perlindungan kredensial sensitif, kunci API, hash kata sandi RBAC, dan detail sumber pengumpulan eksternal dengan mencegah paparan data tersebut dalam log atau pesan kesalahan (<a href="https://github.com/milvus-io/milvus/pull/52487">#52487</a>, <a href="https://github.com/milvus-io/milvus/pull/52664">#52664</a>, <a href="https://github.com/milvus-io/milvus/pull/52710">#52710</a>)</li>
<li>Peningkatan kontrol konkurensi pembaruan parsial dengan validasi CAS optimis dan upaya ulang yang aman untuk konflik yang memenuhi syarat (<a href="https://github.com/milvus-io/milvus/pull/52495">#52495</a>)</li>
<li>Peningkatan stabilitas snapshot baca segmen yang berkembang dan pengelolaan masa pakai snapshot skema (<a href="https://github.com/milvus-io/milvus/pull/52572">#52572</a>)</li>
<li>Mengurangi pemindaian berlebihan terhadap metadata otorisasi selama pencadangan (<a href="https://github.com/milvus-io/milvus/pull/52612">#52612</a>)</li>
<li>Meningkatkan pemetaan ID vektor yang dapat bernilai null dengan memindahkannya ke lapisan indeks, menyatukan penanganan ID logis, dan mendukung pemetaan yang didukung mmap untuk indeks tertutup (<a href="https://github.com/milvus-io/milvus/pull/52657">#52657</a>)</li>
<li>Sinkronisasi yang ditingkatkan antara kompilasi Sonic JIT dan pemuatan plugin Go dalam build CPU dan GPU (<a href="https://github.com/milvus-io/milvus/pull/52738">#52738</a>)</li>
<li>Meningkatkan resolusi saluran jalur penulisan Proxy melalui cache metadata, menghilangkan RPC koordinator yang berlebihan, dan meningkatkan klasifikasi kesalahan (<a href="https://github.com/milvus-io/milvus/pull/52739">#52739</a>)</li>
<li>Waktu perhitungan recall berkurang dari sekitar 3,08 detik menjadi 18,5 milidetik pada topk=100.000 dalam benchmark yang dilaporkan (<a href="https://github.com/milvus-io/milvus/pull/52763">#52763</a>)</li>
<li>Penyaringan bidang nullable dioptimalkan dengan menggunakan kembali bitmap validitas, mengurangi penyimpanan offset null yang berlebihan, dan mempercepat penyalinan bitset (<a href="https://github.com/milvus-io/milvus/pull/52801">#52801</a>, <a href="https://github.com/milvus-io/milvus/pull/52823">#52823</a>, <a href="https://github.com/milvus-io/milvus/pull/52825">#52825</a>)</li>
<li>Meningkatkan indeks skalar hibrida pada subbidang struktur bersarang dengan menggunakan STL_SORT ketika jumlah elemen yang berbeda mencapai batas kardinalitas bitmap (<a href="https://github.com/milvus-io/milvus/pull/52849">#52849</a>)</li>
<li>Meningkatkan efisiensi penyaringan ID segmen dalam cache metadata (<a href="https://github.com/milvus-io/milvus/pull/52855">#52855</a>)</li>
<li>Mengurangi alokasi memori dalam fungsi pembantu hash (<a href="https://github.com/milvus-io/milvus/pull/52857">#52857</a>)</li>
<li>Pengoptimalan penyortiran hasil rerank yang digabungkan dengan menghilangkan pencarian peta per-perbandingan (<a href="https://github.com/milvus-io/milvus/pull/52885">#52885</a>)</li>
<li>Peningkatan keamanan memori saat menangani nilai default JSON dan tampilan string yang tidak diakhiri dengan NUL (<a href="https://github.com/milvus-io/milvus/pull/52906">#52906</a>)</li>
<li>Meningkatkan waktu build C++ dengan kompilasi unity berskop, meningkatkan caching kompiler, dan mengurangi pekerjaan kompilasi yang berlebihan (<a href="https://github.com/milvus-io/milvus/pull/52995">#52995</a>)</li>
<li>Peningkatan cakupan dan kesegaran metrik sistem berkas dengan mengumpulkan metrik dari sistem berkas yang disimpan dalam cache pada saat pengumpulan data sambil mempertahankan nama dan label metrik yang ada (<a href="https://github.com/milvus-io/milvus/pull/53026">#53026</a>)</li>
<li>Menambahkan pengaturan growingBuildThreadRate yang dapat diperbarui untuk mengonfigurasi thread per pembangunan indeks sementara segmen yang berkembang sambil mempertahankan default single-threaded (<a href="https://github.com/milvus-io/milvus/pull/53033">#53033</a>)</li>
<li>Menambahkan dukungan penulisan balik data bidang mmap ke versi 3.0 melalui backport, dengan opsi queryNode.mmap.writeback yang dinonaktifkan secara default (<a href="https://github.com/milvus-io/milvus/pull/53079">#53079</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug<button data-href="#Bug-fixes" class="anchor-icon" translate="no">
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
<li>Memperbaiki hasil yang salah dan validasi predikat yang tidak konsisten dalam kueri JSON, ARRAY, dan TIMESTAMPTZ, termasuk predikat tipe campuran, perbandingan angka besar, dan penyaringan di beberapa batch (<a href="https://github.com/milvus-io/milvus/pull/51775">#51775</a>)</li>
<li>Memperbaiki data yang diperbarui secara tidak konsisten selama penyegaran koleksi eksternal paralel ketika file sumber segmen mencakup beberapa tugas (<a href="https://github.com/milvus-io/milvus/pull/51893">#51893</a>)</li>
<li>Memperbaiki ekspresi MATCH yang menerima predikat yang tidak beroperasi pada tingkat elemen (<a href="https://github.com/milvus-io/milvus/pull/51940">#51940</a>)</li>
<li>Memperbaiki pencarian tanpa kecocokan yang gagal dengan kesalahan tipe ID yang tidak didukung (<a href="https://github.com/milvus-io/milvus/pull/51999">#51999</a>)</li>
<li>Memperbaiki Milvus mandiri yang macet saat dimatikan dengan menambahkan batas waktu migrasi yang dapat dikonfigurasi dengan nilai default 10 detik (<a href="https://github.com/milvus-io/milvus/pull/52027">#52027</a>)</li>
<li>Memperbaiki permintaan embedding tabel eksternal yang menggunakan identitas cluster yang salah saat pekerja DataNode dibagikan di seluruh cluster penyedia layanan (<a href="https://github.com/milvus-io/milvus/pull/52042">#52042</a>)</li>
<li>Memperbaiki masalah yang mencegah pembaruan integration_id dan model_deployment_id untuk fungsi TextEmbedding (<a href="https://github.com/milvus-io/milvus/pull/52081">#52081</a>)</li>
<li>Memperbaiki respons HTTP JSON yang mengabaikan status ok=false eksplisit untuk segmen backfill yang gagal (<a href="https://github.com/milvus-io/milvus/pull/52082">#52082</a>)</li>
<li>Memperbaiki kegagalan unggahan objek MinIO dengan HTTP 400 XAmzContentChecksumMismatch saat dicoba kembali setelah transportasi atau batas waktu kecepatan rendah (<a href="https://github.com/milvus-io/milvus/pull/52128">#52128</a>, <a href="https://github.com/milvus-io/milvus/pull/52194">#52194</a>)</li>
<li>Memperbaiki penyeimbangan segmen antar QueryNodes yang terhenti saat Layanan Streaming diaktifkan (<a href="https://github.com/milvus-io/milvus/pull/52147">#52147</a>, <a href="https://github.com/milvus-io/milvus/pull/52169">#52169</a>)</li>
<li>Telah diperbaiki kehilangan data tanpa pemberitahuan selama pemadatan campuran ketika catatan yang disimpan tidak dapat dibangun kembali (<a href="https://github.com/milvus-io/milvus/pull/52200">#52200</a>)</li>
<li>Memperbaiki pemulihan snapshot yang kehilangan pengaturan koleksi dan secara tak terduga kembali ke konsistensi Kuat (<a href="https://github.com/milvus-io/milvus/pull/52206">#52206</a>)</li>
<li>Memperbaiki penghapusan streaming yang melewatkan segmen tersegel yang baru dimuat, sehingga data yang dihapus tetap dapat di-query (<a href="https://github.com/milvus-io/milvus/pull/52218">#52218</a>)</li>
<li>Telah diperbaiki indeks bersarang yang tidak dibangun dengan benar untuk data kosong (<a href="https://github.com/milvus-io/milvus/pull/52247">#52247</a>)</li>
<li>Memperbaiki kebuntuan saat beralih ke layanan streaming yang menyebabkan operasi menunggu tanpa batas waktu (<a href="https://github.com/milvus-io/milvus/pull/52292">#52292</a>)</li>
<li>Memperbaiki nilai default geometri yang salah selama pemadatan dan pembangunan ulang catatan, serta penandaan null yang salah untuk nilai geometri yang diisi secara default dalam impor Parquet (<a href="https://github.com/milvus-io/milvus/pull/52350">#52350</a>)</li>
<li>Memperbaiki segmen V3 yang valid ditolak selama pemadatan dan pemulihan setelah DataCoord dimulai ulang (<a href="https://github.com/milvus-io/milvus/pull/52383">#52383</a>, <a href="https://github.com/milvus-io/milvus/pull/52389">#52389</a>, <a href="https://github.com/milvus-io/milvus/pull/52390">#52390</a>, <a href="https://github.com/milvus-io/milvus/pull/52391">#52391</a>, <a href="https://github.com/milvus-io/milvus/pull/52392">#52392</a>, <a href="https://github.com/milvus-io/milvus/pull/52393">#52393</a>)</li>
<li>Memperbaiki kegagalan pemuatan segmen dengan kesalahan metadata versi yang hilang saat menggunakan indeks skalar hibrida pada sub-bidang array VARCHAR dalam struktur (<a href="https://github.com/milvus-io/milvus/pull/52385">#52385</a>)</li>
<li>Memperbaiki kolom eksternal yang gagal diperbarui saat manifest yang diperbarui dibuka kembali (<a href="https://github.com/milvus-io/milvus/pull/52397">#52397</a>)</li>
<li>Memperbaiki penanganan zona waktu yang salah dalam pencarian dengan kondisi yang bergantung pada waktu (<a href="https://github.com/milvus-io/milvus/pull/52407">#52407</a>)</li>
<li>Memperbaiki penanganan input ArrayOfVector yang salah dalam permintaan pencarian (<a href="https://github.com/milvus-io/milvus/pull/52408">#52408</a>)</li>
<li>Memperbaiki kegagalan penyisipan yang tidak menolak baris yang melebihi batas ukuran yang didukung (<a href="https://github.com/milvus-io/milvus/pull/52426">#52426</a>)</li>
<li>Memperbaiki indeks sementara yang mengabaikan versi indeks target yang dikonfigurasi (<a href="https://github.com/milvus-io/milvus/pull/52449">#52449</a>)</li>
<li>Memperbaiki kueri yang menggunakan order_by yang gagal mengembalikan bidang keluaran vektor padat (<a href="https://github.com/milvus-io/milvus/pull/52504">#52504</a>, <a href="https://github.com/milvus-io/milvus/pull/52606">#52606</a>)</li>
<li>Memperbaiki hak akses yang dicabut tetap berlaku setelah dihapus dari grup hak akses (<a href="https://github.com/milvus-io/milvus/pull/52554">#52554</a>)</li>
<li>Memperbaiki jumlah file binlog dan label format penyimpanan yang salah untuk segmen Storage V3 setelah DataCoord dimulai ulang (<a href="https://github.com/milvus-io/milvus/pull/52571">#52571</a>, <a href="https://github.com/milvus-io/milvus/pull/52578">#52578</a>)</li>
<li>Memperbaiki pemulihan snapshot eksternal yang terhenti karena pemeriksaan versi pekerja yang tidak dapat diandalkan atau berulang kali mencoba pekerja yang tidak didukung hingga waktu habis (<a href="https://github.com/milvus-io/milvus/pull/52639">#52639</a>)</li>
<li>Memperbaiki kegagalan pemuatan segmen untuk indeks HYBRID pada subbidang struct-array dengan file STLSORT lawas dari 3.0.0, tanpa memerlukan pengindeksan ulang (<a href="https://github.com/milvus-io/milvus/pull/52643">#52643</a>)</li>
<li>Memperbaiki crash saat memproses buffer Data Arrow C dengan panjang nol (<a href="https://github.com/milvus-io/milvus/pull/52652">#52652</a>)</li>
<li>Memperbaiki penanganan kegagalan yang salah saat memuat atau membuka kembali segmen Storage V3 setelah kesalahan manifest, dengan mempertahankan status segmen yang ada untuk upaya ulang yang aman (<a href="https://github.com/milvus-io/milvus/pull/52678">#52678</a>)</li>
<li>Memperbaiki kegagalan kueri saat filter elemen ARRAY menemukan batch penuh NULL atau array kosong sebelum elemen berikutnya (<a href="https://github.com/milvus-io/milvus/pull/52720">#52720</a>)</li>
<li>Memperbaiki pekerjaan backfill yang melakukan commit embedding usang setelah skema koleksi berubah (<a href="https://github.com/milvus-io/milvus/pull/52789">#52789</a>)</li>
<li>Memperbaiki bidang yang tidak ada dalam catatan Storage V3 yang dikembalikan sebagai NULL, bukan nilai default yang dinyatakan (<a href="https://github.com/milvus-io/milvus/pull/52790">#52790</a>, <a href="https://github.com/milvus-io/milvus/pull/52807">#52807</a>, <a href="https://github.com/milvus-io/milvus/pull/52888">#52888</a>)</li>
<li>Memperbaiki kegagalan penyalinan di sisi server yang mencegah pemulihan snapshot Storage V3 di GCS dengan kredensial IAM/OAuth, termasuk salinan objek yang lebih besar dari 5 GiB (<a href="https://github.com/milvus-io/milvus/pull/52792">#52792</a>)</li>
<li>Memperbaiki akses tanpa otentikasi melalui panggilan gRPC streaming pada port proxy eksternal (<a href="https://github.com/milvus-io/milvus/pull/52854">#52854</a>)</li>
<li>Memperbaiki data yang kehilangan cap waktu komit aslinya setelah pemadatan clustering (<a href="https://github.com/milvus-io/milvus/pull/52859">#52859</a>)</li>
<li>Memperbaiki crash node streaming yang disebabkan oleh kegagalan flush berulang setelah menambahkan bidang TEXT ke koleksi dengan segmen Storage V2 yang sudah ada (<a href="https://github.com/milvus-io/milvus/pull/52897">#52897</a>)</li>
<li>Memperbaiki baris yang kedaluwarsa di segmen Storage V3 yang gagal memicu pemadatan berbasis bidang TTL dan tetap tersimpan hingga kondisi pemadatan lainnya terpenuhi (<a href="https://github.com/milvus-io/milvus/pull/52931">#52931</a>)</li>
<li>Memperbaiki kunci utama yang dibuat secara otomatis yang tidak konsisten antara koleksi sumber dan target selama impor yang direplikasi CDC (<a href="https://github.com/milvus-io/milvus/pull/52941">#52941</a>)</li>
<li>Memperbaiki kehilangan penulisan bersamaan selama migrasi backend WAL (<a href="https://github.com/milvus-io/milvus/pull/52947">#52947</a>, <a href="https://github.com/milvus-io/milvus/pull/52951">#52951</a>, <a href="https://github.com/milvus-io/milvus/pull/52955">#52955</a>)</li>
<li>Memperbaiki indeks HYBRID bersarang yang dibangun ulang atau dipadatkan dengan data kardinalitas tinggi yang menjadi tidak dapat dibaca setelah rollback ke versi yang lebih lama (<a href="https://github.com/milvus-io/milvus/pull/52959">#52959</a>)</li>
<li>Memperbaiki penanganan elemen null dalam baris vektor padat eksternal dengan menerima baris yang dapat bernilai null dan menambahkan penanganan yang dapat dikonfigurasi untuk baris yang sebagian bernilai null (<a href="https://github.com/milvus-io/milvus/pull/52968">#52968</a>)</li>
<li>Memperbaiki jumlah baris segmen V3 yang salah dan kegagalan pemadatan urutan berulang setelah failover node streaming (<a href="https://github.com/milvus-io/milvus/pull/52970">#52970</a>)</li>
<li>Memperbaiki kueri yang menggabungkan kondisi rentang dengan OR yang mengabaikan catatan pada batas bawah inklusif (<a href="https://github.com/milvus-io/milvus/pull/52998">#52998</a>)</li>
<li>Memperbaiki pencarian berdasarkan kunci utama yang gagal mempertahankan urutan ID yang diminta (<a href="https://github.com/milvus-io/milvus/pull/52999">#52999</a>)</li>
<li>Memperbaiki masalah di mana penambahan bidang TEXT setelah mengaktifkan Storage V3 mencegah pemuatan segmen Storage V2 yang sedang berkembang, sehingga mengganggu operasi flush, sort, dan indeks (<a href="https://github.com/milvus-io/milvus/pull/53002">#53002</a>)</li>
<li>Memperbaiki snapshot yang menyertakan segmen Storage V3 yang belum dikonfirmasi, yang menyebabkan pemulihan dilaporkan berhasil padahal segmen yang dipulihkan tidak dapat dimuat (<a href="https://github.com/milvus-io/milvus/pull/53022">#53022</a>, <a href="https://github.com/milvus-io/milvus/pull/53039">#53039</a>)</li>
<li>Telah diperbaiki indeks teks Storage V3 yang gagal dimuat ketika file-file tersebut disimpan di direktori tugas atau versi bersarang (<a href="https://github.com/milvus-io/milvus/pull/53062">#53062</a>)</li>
</ul>
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
<p>Milvus 3.0.0 telah dirilis secara resmi! Berlandaskan arsitektur lake-native yang diperkenalkan pada <a href="https://milvus.io/docs/release_notes.md#v30-beta">versi 3.0-beta</a>, rilis ini menyempurnakan apa yang telah dimulai pada versi beta: External Collection kini mencakup lebih banyak alur kerja lakehouse; skema mendukung penambahan, pengisian ulang, dan penghapusan secara online; indeks sparsenya dibangun ulang menggunakan SINDI; StructArray dan pencarian berfacet melengkapi mesin pengambilan data; FAISS passthrough dan TEXT memperluas pilihan indeks dan modality; serta Woodpecker berjalan sebagai layanan mandiri.</p>
<p>Tonton video di bawah ini untuk mempelajari lebih lanjut tentang Milvus 3.0 dan sesi Tanya Jawab (AMA) dengan pengelola inti:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p>Jika Anda baru mengenal seri 3.0, bagian ringkasan fitur Core 3.0 di bawah ini merangkum kemampuan yang diperkenalkan dalam 3.0-beta; <a href="https://milvus.io/docs/release_notes.md#v30-beta">catatan rilis 3.0-beta</a> berisi uraian lengkapnya.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">Apa yang baru di 3.0.0 (sejak 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">Koleksi Eksternal: alur kerja lakehouse yang lebih lengkap</h4><p>3.0-beta memperkenalkan Koleksi Eksternal: merujuk file lake di tempat, membuat indeks, dan mencarinya tanpa menyalin data ke Milvus. Rilis ini memperluasnya menuju alur kerja pengambilan data lakehouse yang lengkap. Kolom eksternal kini dapat menjadi masukan untuk kolom keluaran fungsi seperti vektor langka BM25, tanda tangan MinHash, dan embedding teks, sehingga kolom pengambilan data berbasis teks dan model dibangun di dalam Milvus tanpa menyalin tabel sumber. Refresh juga mendukung evolusi skema aditif: ketika tabel eksternal mendapatkan kolom baru, Milvus memperbarui segmen yang terpengaruh alih-alih membangun ulang koleksi.</p>
<p>Rilis ini juga menambahkan format eksternal " <code translate="no">milvus-table</code> " yang memperlakukan metadata Milvus Snapshot dan manifest Storage V3 sebagai sumber eksternal, sehingga snapshot koleksi itu sendiri dapat disajikan sebagai tabel eksternal — sistem batch dan penyajian mendapatkan tampilan bersama yang didukung manifest dari data yang sama.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a> dan <a href="/docs/id/snapshots.md">Snapshot</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Skema fleksibel: tambahkan, isi ulang, dan hapus kolom secara online</h4><p>Skema tidak tetap statis di lingkungan produksi — model yang disematkan diganti, fitur diperbarui, bidang menjadi usang — dan hal ini biasanya berarti perlu membangun ulang seluruh koleksi dengan waktu henti atau penulisan ganda. Versi 3.0.0 menutup celah ini: kolom dapat ditambahkan, diisi, dan dihapus sementara layanan tetap berjalan.</p>
<p>Pengisian ulang (backfill) berfungsi dua arah. Pengisian ulang eksternal menangani nilai yang dihitung di luar Milvus: tambahkan kolom, ambil snapshot koleksi sebagai titik awal yang konsisten, jalankan tugas secara offline, tulis kembali nilai-nilai tersebut, dan Milvus mengindeks kolom baru secara bertahap — pembaruan model embedding pada ratusan juta baris menjadi proses yang berjalan lancar tanpa downtime. Pengisian ulang internal mencakup nilai-nilai yang diturunkan dari kernel: lampirkan fungsi BM25 atau MinHash ke koleksi yang ada, dan bidang outputnya dihitung secara otomatis berdasarkan data yang ada.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/add-fields-to-an-existing-collection.md">Menambahkan Bidang ke Koleksi yang Sudah Ada</a>.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Perombakan indeks spars: SINDI, Block-Max WAND, dan Block-Max MaxScore</h4><p>Milvus 3.0 meningkatkan indeks vektor spars di seluruh sistem. Versi ini memperkenalkan algoritma pencarian baru — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND, dan Block-Max MaxScore — bersama dengan kompresi daftar terbalik, kuantisasi yang dapat dikonfigurasi, dan pemilihan algoritma pencarian per beban kerja. Pemuatan mmap, serialisasi, dan penilaian BM25 juga dioptimalkan, sehingga mengurangi beban penyimpanan dan pemuatan indeks untuk pencarian vektor jarang dan teks lengkap berskala besar. Dalam pengujian internal, indeks BM25 yang dikompresi ukurannya kira-kira 3 kali lebih kecil daripada indeks sparse 2.6 dengan tingkat recall yang sebanding, dan SINDI mencapai QPS hingga sekitar 10 kali lipat dari MaxScore pada embedding sparse yang telah dilatih. Setelah versi indeks baru diaktifkan (lihat Catatan kompatibilitas dan perilaku), SINDI menjadi default untuk pencarian IP spars, dan MaxScore menjadi default untuk BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">Cakupan StructArray</h4><p>StructArray kini mendukung nilai null, indeks bitmap, penambahan bidang dinamis pada koleksi aktif, dan pembaruan parsial bidang struct melalui upsert, dengan cakupan REST dan impor massal yang sesuai.</p>
<p>Pencarian tingkat elemen menambahkan pencarian hibrida melintasi sub-bidang vektor dengan penggabungan per entitas yang dapat dikonfigurasi (varian max / sum / avg / top-k), ditambah pencarian rentang dan pengelompokan di dalamnya. Penyaringan bersarang mencakup predikat <code translate="no">element_filter</code>, kuantifier <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code>, akses sub-bidang posisional seperti <code translate="no">tags[0][name]</code>, dan <code translate="no">array_length()</code> pada kolom struct.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/array-of-structs.md">StructArray</a> dan <a href="/docs/id/struct-array-operators.md">Operator StructArray</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Agregasi Pencarian dan pencarian berfacet</h4><p>Agregasi Kueri dari versi beta menghitung statistik yang tepat atas data yang difilter; versi 3.0.0 menambahkan pemfilteran berdasarkan aspek pada jalur pencarian. Tentukan bidang aspek saat pencarian dan Milvus akan mengembalikan nilai-nilai aspek teratas, yang masing-masing diwakili oleh anggota yang paling cocok dalam peringkat ANN dan diberi anotasi dengan agregat seperti COUNT dan AVG — bilah samping pencarian berfacet (merek, kisaran harga, atribut) dalam satu permintaan, alih-alih mengambil data berlebihan dan menghitungnya di sisi klien.</p>
<h4 id="Function-Chain-reranking" class="common-anchor-header">Penilaian ulang Rantai Fungsi</h4><p>Penilaian ulang kini dapat dikomposisikan melalui API Rantai Fungsi, yang menjalankan pipa berurutan dan bertipe sebagai bagian dari satu permintaan pencarian. Sebuah rantai dapat menggabungkan penilaian ulang L0 awal pada `QueryNode` dengan penataan ulang L2 pasca-reduksi pada `Proxy`, mendukung transformasi dan penggabungan skor, penataan ulang berbasis model, penyortiran, serta pemangkasan kandidat tanpa perlu orkestrasi di sisi klien. Rilis ini juga menambahkan penilaian XGBoost bawaan untuk pengurutan ulang L0 menggunakan model UBJ yang terdaftar sebagai FileResources, bersama dengan Penyedia Inferensi Hugging Face untuk embedding teks yang dikelola server dan pengurutan ulang kesamaan kalimat.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">Bidang teks panjang TEXT</h4><p>Kolom TEXT menjadikan teks panjang sebagai prioritas utama, dengan batasan panjang di sisi penyimpanan dihapus: kolom ini mendukung <code translate="no">text_match</code>, <code translate="no">phrase_match</code>, dan BM25. Nilai di bawah 64 KB tetap disimpan secara inline; nilai yang lebih besar disimpan ke berkas LOB tingkat partisi dalam format Vortex, dengan kolom hanya menyimpan referensi <code translate="no">(file_id, offset)</code>. File LOB dibagikan di seluruh segmen, sehingga pemadatan memindahkan referensi alih-alih menulis ulang teks. Untuk RAG, ini berarti mengambil vektor dan teks sumber dari penyimpanan yang sama dalam satu IO — tidak perlu mengoperasikan penyimpanan blob eksternal.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">Passthrough indeks FAISS</h4><p>Jenis indeks " <code translate="no">FAISS</code> " yang baru menerima string pabrik indeks Faiss apa pun melalui parameter " <code translate="no">faiss_index_name</code> " — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — dengan parameter pencarian diteruskan, sehingga resep Faiss dapat direproduksi langsung di Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Dukungan format Vortex dan Lance</h4><p>Lapisan penyimpanan kini memiliki dua format kolom terbuka: Vortex sebagai format internal generasi berikutnya — pengkodean adaptif (kamus, RLE, pengemasan bit, kompresi khusus float), dekompresi tanpa penyalinan, dioptimalkan untuk beban kerja campuran vektor + skalar — dan Lance bersama Parquet untuk pertukaran ekosistem terbuka. Vortex akan menjadi format internal default, dengan filter pushdown dan varian lokal yang sedang direncanakan.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Penerapan Woodpecker yang berdiri sendiri</h4><p>Woodpecker, WAL yang menjadi inti jalur penulisan streaming, kini dapat diterapkan sebagai layanan independen, bukan tertanam di node lain — penskalaan independen, isolasi kesalahan, dan kemampuan observasi, seperti layanan mikro lainnya. Hal ini sangat penting untuk klaster besar dan beban kerja penulisan tinggi.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Ringkasan fitur Core 3.0<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
<li><strong>Snapshot</strong> — tampilan koleksi baca-saja pada titik waktu tertentu berdasarkan referensi segmen, dengan penyimpanan marjinal mendekati nol.</li>
<li><strong>Penyimpanan V3 (Loon)</strong> — penyimpanan kolom berbasis manifest pada penyimpanan objek; fondasi untuk Snapshot dan Koleksi Eksternal.</li>
<li><strong>Kueri / Pencarian ORDER BY</strong> — penyortiran multi-bidang di sisi server dengan ASC / DESC per bidang.</li>
<li><strong>Agregasi Kueri</strong> — COUNT / SUM / AVG / MIN / MAX dengan group-by, dievaluasi di sisi server.</li>
<li><strong>EmbList + DiskANN</strong> — pengindeksan multi-vektor pada disk untuk daftar embedding StructArray, dengan jalur akselerasi seperti Muvera dan Lemur.</li>
<li><strong>Fungsi MinHash (doc-in, doc-out)</strong> — tanda tangan MinHash di sisi server ditambah <code translate="no">MINHASH_LSH</code> untuk deteksi duplikat yang hampir sama.</li>
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
<li><strong>Versi indeks baru saat ini bersifat opsional.</strong> Algoritma indeks yang baru diperkenalkan memerlukan penyesuaian versi indeks target secara manual (<code translate="no">dataCoord.targetVecIndexVersion</code> menjadi 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> menjadi 4) sebelum berlaku; rilis mendatang akan mengaktifkannya secara default.</li>
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
<p>Milvus 3.0-beta memperluas basis data vektor Milvus dengan integrasi baru ke dalam ekosistem Open Lake: Fitur External Collection memungkinkan Milvus melakukan kueri terhadap tabel Open Lake eksternal tanpa salinan (zero-copy), dan Spark dapat membaca koleksi Milvus secara langsung melalui Snapshot. Rilis ini juga menghadirkan pencarian yang lebih kaya, skema yang lebih ekspresif, penyesuaian pencarian teks yang lebih mendalam, kontrol siklus hidup data dan model yang lebih terperinci, serta kontrol sisi operator yang lebih banyak. Milvus 3.0 merupakan inti dari Zilliz Lakebase, yang mendukung layanan terpadu, penemuan, dan pemrosesan batch.</p>
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">Koleksi Eksternal</h4><p>Dalam pipa data AI pada umumnya, terabyte embedding dan metadata sudah tersimpan di penyimpanan objek sebagai tabel Parquet, Lance, atau Iceberg. Menyalin data tersebut ke Milvus akan menggandakan biaya penyimpanan, menambahkan pipa ETL yang harus tetap sinkron, dan mengalihkan tata kelola data dari pelanggan.</p>
<p>Pengumpulan Eksternal menghilangkan kebutuhan penyalinan tersebut. Koleksi Milvus dapat merujuk ke file di lokasi aslinya, dan Milvus hanya mengelola skema, indeks, serta eksekusi kueri. Penyegaran inkremental menjaga Koleksi tetap selaras dengan file yang mendasarinya. Pelanggan yang datanya tidak dapat dipindahkan dari data lake, seperti tim keuangan dan kesehatan, dapat menjalankan pencarian vektor terhadap data tersebut di lokasi aslinya. Satu set data yang berada di data lake juga dapat disajikan dari beberapa instans Milvus secara bersamaan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/create-an-external-collection.md">Membuat Koleksi Eksternal</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Penyajian dan penemuan batch sering kali memerlukan Koleksi yang sama pada waktu yang bersamaan. Evaluasi model A/B, deduplikasi skala besar, validasi backfill, dan rollback versi semuanya memerlukan tampilan Koleksi yang stabil sementara penulisan data masih berlangsung.</p>
<p>Snapshot membuat tampilan Koleksi pada titik waktu tertentu yang hanya dapat dibaca dengan merujuk pada segmen yang ada, bukan dengan menyalin data, sehingga biaya penyimpanan marjinalnya mendekati nol. Pekerjaan batch dapat membaca dari Snapshot di bawah isolasi bergaya MVCC sementara Koleksi yang aktif tetap menerima penulisan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/snapshots.md">Snapshot</a>, <a href="/docs/id/manage-snapshots.md">Mengelola Snapshot</a>, dan <a href="/docs/id/snapshot-use-cases.md">Kasus Penggunaan Snapshot</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Urutan Query / Pencarian</h4><p>Pencarian dan Kueri kini mendukung pengurutan multi-kolom, dengan proses pengurutan ditangani langsung di kernel Milvus dan opsi " <code translate="no">ASC</code> " / " <code translate="no">DESC</code> " dapat diatur per kolom. Hal ini mengatasi celah umum dalam produksi: pengurutan Top-K berdasarkan jarak saja seringkali tidak sesuai dengan kebutuhan bisnis ketika item yang paling mirip bukanlah yang termurah, terbaru, atau paling populer.</p>
<p>Aplikasi tidak lagi perlu mengambil hasil secara berlebihan dan melakukan pengurutan ulang di sisi klien untuk menghasilkan peringkat gabungan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Mengurutkan Hasil Pencarian berdasarkan Bidang Skalar</a> dan <a href="/docs/id/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Mengurutkan Hasil Kueri</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Agregasi Kueri</h4><p>Dulu, untuk menghasilkan statistik distribusi penyewa, hitungan kelengkapan bidang, atau kemajuan peluncuran versi dari Koleksi Milvus, diperlukan penarikan entitas yang cocok kembali ke klien dan pengagregasiannya di sana. Milvus 3.0 mengintegrasikan agregasi skalar bergaya SQL ke dalam kernel. Panggilan kueri menerima ekspresi ` <code translate="no">group_by_fields</code> ` dan ekspresi agregasi dalam ` <code translate="no">output_fields</code>`, termasuk ` <code translate="no">count(*)</code>`, ` <code translate="no">count(&lt;field&gt;)</code>`, ` <code translate="no">sum(&lt;field&gt;)</code>`, ` <code translate="no">avg(&lt;field&gt;)</code>`, ` <code translate="no">min(&lt;field&gt;)</code>`, dan ` <code translate="no">max(&lt;field&gt;)</code>`. Agregasi dievaluasi di sisi server setelah penyaringan.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Hasil Kueri Agregat</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Vektor Null</h4><p>Embedding sering dihasilkan secara asinkron, sehingga sebuah entitas dapat tiba sebelum vektornya. Data multimodal juga memiliki celah alami, seperti video tanpa teks atau produk tanpa gambar. Versi sebelumnya tidak memiliki solusi yang memadai: aplikasi menunda penulisan hingga vektor siap atau mengisi vektor placeholder, dan kedua pilihan tersebut merugikan kualitas pencarian.</p>
<p>Milvus 3.0 mendukung nilai NULL pada bidang vektor di seluruh enam jenis vektor. Pencarian secara otomatis melewati vektor NULL, kualitas hasil pencarian tidak terpengaruh, dan vektor NULL secara efektif tidak memakan ruang penyimpanan. Fitur " <code translate="no">AddField</code> " juga diperluas ke bidang vektor dalam perubahan ini: dengan opsi ` <code translate="no">nullable=True</code>`, koleksi yang sudah ada dapat menambahkan bidang vektor baru secara online tanpa perlu rebuild.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/nullable-and-default.md">Bidang</a> yang <a href="/docs/id/nullable-and-default.md">Dapat Bernilai NULL</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Kamus Kustom &amp; Kamus Sinonim</h4><p>Tokenizer bawaan tidak selalu memenuhi persyaratan kualitas pencarian produksi. Bahasa Mandarin, domain vertikal seperti kedokteran, hukum, dan kimia, serta korpus multibahasa dapat memperoleh manfaat besar dari kamus khusus dan tabel sinonim. Hingga saat ini, sumber daya ini sebagian besar digunakan sebagai penulisan ulang kueri di sisi aplikasi.</p>
<p>Milvus 3.0 menambahkan mekanisme FileResource untuk mendaftarkan kamus tokenizer khusus, daftar sinonim, daftar kata penghalang, dan aturan pemisah kata majemuk. Setelah didaftarkan, sumber daya tersebut dapat dirujuk dari tokenizer atau filter mana pun dan berlaku pada BM25, penganalisis, dan Text Match. Kamus dan sinonim kini dapat diberi versi dan dikelola secara terpusat, bukan tersebar di berbagai kode aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/manage-file-resources.md">Mengelola Sumber Daya File</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">TTL Entitas</h4><p>TTL tingkat Koleksi dan tingkat partisi terlalu kasar untuk banyak skenario siklus hidup dan kepatuhan. Penyewa yang berbeda di dalam Koleksi yang sama sering kali memiliki aturan penyimpanan yang berbeda, dan entitas individu mungkin perlu kedaluwarsa sesuai jadwal yang tidak sesuai dengan bagian Koleksi lainnya.</p>
<p>Milvus 3.0 mendukung TTL per entitas. Tentukan bidang ` <code translate="no">TIMESTAMPTZ</code> ` dalam skema, tandai sebagai bidang TTL melalui properti Koleksi, dan Milvus akan secara otomatis menghapus entitas yang telah kadaluwarsa. Fitur ini mencakup permintaan hak untuk dilupakan, data sesi yang kadaluwarsa, dan riwayat percakapan yang dibatasi tanpa perlu pembersihan di sisi aplikasi.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Tetapkan TTL Tingkat Entitas</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 menambahkan indeks ` <code translate="no">MINHASH_LSH</code> ` untuk deteksi duplikat serupa berbasis himpunan, tetapi aplikasi masih harus menghitung tanda tangan MinHash sebelum menulis data ke Milvus.</p>
<p>Milvus 3.0 menambahkan fungsi MinHash di sisi server. Tetapkan bidang masukan ` <code translate="no">VARCHAR</code> ` dan bidang keluaran ` <code translate="no">BINARY_VECTOR</code> ` dalam skema, lampirkan fungsi ` <code translate="no">FunctionType.MINHASH</code> `, dan Milvus akan menghitung tanda tangan tersebut selama proses penyisipan, penyisipan massal, dan pencarian. Bersama dengan ` <code translate="no">MINHASH_LSH</code>`, fitur ini mendukung alur kerja deduplikasi untuk dataset besar, penciptaan sidik jari, dan deteksi plagiarisme di dalam Milvus.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/minhash-function.md">Fungsi MinHash</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>Asumsi “satu entitas = satu vektor” tidak lagi sesuai dengan pencarian modern. Dokumen panjang dibagi menjadi banyak bagian, model interaksi terlambat seperti ColBERT menghasilkan satu vektor per token, dan entitas multimodal dapat memiliki beberapa tampilan.</p>
<p>EmbList menyimpan daftar vektor berpanjang variabel per entitas, dengan ` <code translate="no">DISKANN</code> ` sebagai indeks di disk. Jalur disk ini menjaga penggunaan RAM tetap terkendali ketika korpus melebihi batas memori. EmbList + ` <code translate="no">DISKANN</code> ` adalah varian pertama dari keluarga StructList yang lebih luas dalam RC ini. Sisanya dari keluarga ini, termasuk penyaringan StructList dan akselerasi multi-vektor Muvera / Lemur, ditargetkan untuk rilis resmi 3.0.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/search-with-embedding-lists.md">Pencarian dengan Daftar Embedding</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Paksakan Penggabungan</h4><p>Beban kerja produksi mengakumulasi fragmentasi segmen seiring waktu, yang menyebabkan fluktuasi latensi kueri dan pembengkakan penyimpanan.</p>
<p>Milvus 3.0 menambahkan kemampuan untuk memicu pemadatan segmen secara eksplisit selama jendela di luar jam sibuk, baik dalam mode sinkron maupun asinkron.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/force-merge.md">Pemadatan Force Merge</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Penyimpanan V3</h4><p>Milvus 3.0 memperkenalkan Storage V3, mesin penyimpanan kolom berbasis manifest di mana data dan metadata disimpan di penyimpanan objek yang kompatibel dengan S3. Setiap versi dataset direkam sebagai snapshot manifest yang tidak dapat diubah, yaitu berkas yang dienkode Avro yang mencatat kelompok kolom, log delta, dan statistik yang membentuk dataset tersebut.</p>
<p>Manifest adalah berkas Avro yang ringkas, sedangkan log delta mencatat penghapusan entitas tanpa perlu menulis ulang berkas data. Hal ini menjaga beban metadata tetap rendah seiring pertumbuhan dataset. Manifest juga memisahkan pelacakan metadata dari jalur kueri, sehingga sebuah Koleksi dapat mengelola lebih banyak segmen tanpa mengorbankan kinerja kueri.</p>
<p>Karena status disimpan di penyimpanan objek, dataset bersifat self-descriptive: pembaca mana pun yang memiliki akses ke jalur penyimpanan dapat menemukannya dan menafsirkannya tanpa katalog pusat. Sifat ini menjadi dasar bagi External Collection, Snapshot, dan integrasi lake di masa mendatang.</p>
