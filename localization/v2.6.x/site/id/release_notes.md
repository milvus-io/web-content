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
    </button></h1><p>Cari tahu apa yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug dalam setiap rilis. Anda dapat menemukan catatan rilis untuk setiap versi yang dirilis setelah v2.6.0 di bagian ini. Kami menyarankan agar Anda secara teratur mengunjungi halaman ini untuk mempelajari tentang pembaruan.</p>
<h2 id="v266" class="common-anchor-header">v2.6.6<button data-href="#v266" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 21 November 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi Java SDK</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.8</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan peluncuran Milvus 2.6.6, yang menampilkan berbagai kemampuan baru yang kuat, peningkatan kinerja, dan perbaikan bug yang penting. Pembaruan ini memperkenalkan fitur-fitur penting seperti tipe data Geospasial dan Timestampz, Boost ranker untuk penilaian ulang, dll. Rilis ini juga memiliki banyak peningkatan kinerja pemfilteran skalar yang penting. Beberapa bug penting juga telah diatasi untuk memastikan stabilitas dan keandalan yang lebih baik. Dengan rilis ini, Milvus terus memberikan pengalaman yang lebih kuat dan efisien untuk semua pengguna. Di bawah ini adalah sorotan utama dari rilis ini.</p>
<ul>
<li>Tipe Data Geospasial: Milvus memperkenalkan dukungan untuk tipe data <code translate="no">Geometry</code>, yang mewakili objek geometris yang sesuai dengan OGC seperti <code translate="no">POINT</code>, <code translate="no">LINESTRING</code>, dan <code translate="no">POLYGON</code>. Tipe ini mendukung beberapa operator hubungan spasial (st_contains, st_intersects, st_within, st_dwithin,...) dan menyediakan indeks spasial <code translate="no">RTREE</code> untuk mempercepat pemfilteran spasial dan eksekusi kueri. Hal ini memungkinkan penyimpanan dan kueri yang efisien dari bentuk geospasial untuk LBS, pemetaan, dan beban kerja spasial lainnya.</li>
<li>Tipe Data Timestamptz: Milvus memperkenalkan tipe data TIMESTAMPTZ, yang memberikan kesadaran zona waktu untuk semua data temporal. Fitur ini memungkinkan manajemen data yang konsisten di seluruh penerapan global dengan memungkinkan pengguna untuk menentukan konteks waktu default menggunakan properti zona waktu pada Database dan Koleksi. Yang terpenting, bidang ini sepenuhnya mendukung pemfilteran berbasis ekspresi untuk kueri rentang waktu, dan operasi pengambilan (kueri dan pencarian) mendukung parameter zona waktu untuk konversi stempel waktu secara instan ke dalam format lokal yang diperlukan pada saat keluaran.</li>
<li>Meningkatkan Peringkat: Alih-alih hanya mengandalkan kemiripan semantik yang dihitung berdasarkan jarak vektor, Boost Ranker memungkinkan Milvus untuk menggunakan kondisi pemfilteran opsional dalam fungsi untuk menemukan kecocokan di antara kandidat hasil pencarian dan meningkatkan skor kecocokan tersebut dengan menerapkan bobot yang ditentukan, membantu meningkatkan atau menurunkan peringkat entitas yang cocok di hasil akhir.</li>
<li>Indeks STL_SORT sekarang mendukung tipe data VARCHAR dan TIMESTAMPTZ.</li>
<li>Anda sekarang dapat mengaktifkan bidang dinamis dari koleksi yang sudah ada dengan mengubahnya.</li>
<li>Memperbaiki cve-2025-63811.</li>
</ul>
<h3 id="Features" class="common-anchor-header">Fitur<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Menambahkan konfigurasi baru dan mengaktifkan konfigurasi pembaruan dinamis<a href="https://github.com/milvus-io/milvus/pull/45363">(#45363</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Memperbaiki cve-2025-63811<a href="https://github.com/milvus-io/milvus/pull/45658">(#45658</a>)</li>
<li>Menghapus array id segmen besar dari log kueri node<a href="https://github.com/milvus-io/milvus/pull/45720">(#45720</a>)</li>
<li>Memperbarui beberapa tempat di mana expr menyalin nilai input di setiap perulangan<a href="https://github.com/milvus-io/milvus/pull/45712">(#45712</a>)</li>
<li>Performa expr jangka waktu yang dioptimalkan<a href="https://github.com/milvus-io/milvus/pull/45671">(#45671</a>)</li>
<li>Potongan vektor yang diambil sebelumnya untuk segmen yang tidak diindeks yang disegel<a href="https://github.com/milvus-io/milvus/pull/45666">(#45666</a>)</li>
<li>Expr: hanya melakukan prefetching potongan sekali saja<a href="https://github.com/milvus-io/milvus/pull/45555">(#45555</a>)</li>
<li>Menambahkan dukungan yang dapat dibatalkan untuk jenis geometri dan timestamptz<a href="https://github.com/milvus-io/milvus/pull/45522">(#45522</a>)</li>
<li>Peningkatan ttl sesi dari 10 detik menjadi 30 detik<a href="https://github.com/milvus-io/milvus/pull/45517">(#45517</a>)</li>
<li>Menambahkan lebih banyak metrik untuk kerangka kerja ddl<a href="https://github.com/milvus-io/milvus/pull/45559">(#45559</a>)</li>
<li>Memperbarui versi konfigurasi maxconnections<a href="https://github.com/milvus-io/milvus/pull/45547">(#45547</a>)</li>
<li>Melewati pemeriksaan id sumber<a href="https://github.com/milvus-io/milvus/pull/45519">(#45519</a>)</li>
<li>Mendukung konfigurasi max_connection untuk penyimpanan jarak jauh<a href="https://github.com/milvus-io/milvus/pull/45364">(#45364</a>)</li>
<li>Mencegah kepanikan dengan menambahkan pemeriksaan penunjuk nol saat membersihkan insertrecord pk2offset<a href="https://github.com/milvus-io/milvus/pull/45442">(#45442</a>)</li>
<li>Melakukan beberapa pengoptimalan pengambilan bidang skalar dalam skenario penyimpanan berjenjang<a href="https://github.com/milvus-io/milvus/pull/45361">(#45361</a>)</li>
<li>Memperbaiki kesalahan ketik pada parameter penganalisis<a href="https://github.com/milvus-io/milvus/pull/45434">(#45434</a>)</li>
<li>Mengesampingkan index_type saat membuat indeks segmen<a href="https://github.com/milvus-io/milvus/pull/45417">(#45417</a>)</li>
<li>Menambahkan dukungan rbac untuk updatereplicateconfiguration<a href="https://github.com/milvus-io/milvus/pull/45236">(#45236</a>)</li>
<li>Menaikkan versi go ke 1.24.9<a href="https://github.com/milvus-io/milvus/pull/45369">(#45369</a>)</li>
<li>Menonaktifkan jsonshredding untuk konfigurasi default<a href="https://github.com/milvus-io/milvus/pull/45349">(#45349</a>)</li>
<li>Menyatukan buffer yang disejajarkan untuk buffer dan i / o langsung<a href="https://github.com/milvus-io/milvus/pull/45325">(#45325</a>)</li>
<li>Mengganti nama parameter konfigurasi pengguna terkait jsonstats<a href="https://github.com/milvus-io/milvus/pull/45252">(#45252</a>)</li>
<li>Membuat konfigurasi kumpulan thread pool knowhere dapat di-refresh<a href="https://github.com/milvus-io/milvus/pull/45191">(#45191</a>)</li>
<li>Patch yang dipilih dari kerangka kerja ddl baru dan cdc 3<a href="https://github.com/milvus-io/milvus/pull/45280">(#45280</a>)</li>
<li>Mengatur versi skema saat membuat koleksi baru<a href="https://github.com/milvus-io/milvus/pull/45269">(#45269</a>)</li>
<li>Mendukung file jsonl/ndjson untuk bulkinsert<a href="https://github.com/milvus-io/milvus/pull/44717">(#44717</a>)</li>
<li>Menunggu klien streaming replikasi selesai<a href="https://github.com/milvus-io/milvus/pull/45260">(#45260</a>)</li>
<li>Membuat geometrycache sebagai konfigurasi opsional<a href="https://github.com/milvus-io/milvus/pull/45196">(#45196</a>)</li>
<li>Patch yang dipilih dari kerangka kerja ddl baru dan cdc 2<a href="https://github.com/milvus-io/milvus/pull/45241">(#45241)</a></li>
<li>Tidak memulai cdc secara default<a href="https://github.com/milvus-io/milvus/pull/45217">(#45217</a>)</li>
<li>Patch yang dipilih dari kerangka ddl baru dan cdc<a href="https://github.com/milvus-io/milvus/pull/45025">(#45025)</a></li>
<li>Menghapus batas jumlah bidang vektor maksimal<a href="https://github.com/milvus-io/milvus/pull/45156">(#45156)</a></li>
<li>Menampilkan waktu pembuatan untuk pekerjaan impor<a href="https://github.com/milvus-io/milvus/pull/45059">(#45059</a>)</li>
<li>Inisialisasi bitmap scalarindexsort yang dioptimalkan untuk kueri rentang<a href="https://github.com/milvus-io/milvus/pull/45087">(#45087</a>)</li>
<li>Mengaktifkan stl_sort untuk mendukung varchar<a href="https://github.com/milvus-io/milvus/pull/45050">(#45050</a>)</li>
<li>Mengekstrak logika klien pecahan ke dalam paket khusus<a href="https://github.com/milvus-io/milvus/pull/45031">(#45031</a>)</li>
<li>Manajemen hak istimewa yang direformasi dengan mengekstraksi cache hak istimewa ke dalam paket terpisah<a href="https://github.com/milvus-io/milvus/pull/45002">(#45002</a>)</li>
<li>Mendukung nilai default json di fillfielddata<a href="https://github.com/milvus-io/milvus/pull/45470">(#45470</a>)</li>
<li>Memperbarui enabledynamicfield dan schemaversion selama modifikasi koleksi<a href="https://github.com/milvus-io/milvus/pull/45616">(#45616</a>)</li>
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
<li>Memperbaiki kepanikan pembaruan parsial dengan timestamptz<a href="https://github.com/milvus-io/milvus/pull/45741">(#45741</a>)</li>
<li>Menggunakan 2.6.6 untuk peningkatan milvus ddl<a href="https://github.com/milvus-io/milvus/pull/45739">(#45739</a>)</li>
<li>Menggunakan timetick terbaru untuk menghapus cache<a href="https://github.com/milvus-io/milvus/pull/45699">(#45699</a>)</li>
<li>Membuat streamingnode keluar ketika gagal melakukan inisialisasi<a href="https://github.com/milvus-io/milvus/pull/45732">(#45732</a>)</li>
<li>Melindungi tbb concurrent_map emplace untuk menghindari kebuntuan kondisi balapan<a href="https://github.com/milvus-io/milvus/pull/45682">(#45682</a>)</li>
<li>Mencegah kepanikan saat streaming coord dimatikan tetapi query coord masih berfungsi<a href="https://github.com/milvus-io/milvus/pull/45696">(#45696</a>)</li>
<li>Mengatur init tugas ketika pekerja tidak memiliki tugas<a href="https://github.com/milvus-io/milvus/pull/45676">(#45676</a>)</li>
<li>Mencegah kebuntuan dalam runcomponent ketika persiapan gagal<a href="https://github.com/milvus-io/milvus/pull/45647">(#45647</a>)</li>
<li>Mencegah kepanikan saat menutup saluran siaran ack dua kali<a href="https://github.com/milvus-io/milvus/pull/45662">(#45662</a>)</li>
<li>Mengoreksi pengisian ulang nilai default selama penambahan bidang<a href="https://github.com/milvus-io/milvus/pull/45644">(#45644)</a></li>
<li>Memadatkan riwayat penugasan saluran untuk mengurangi ukuran info pemulihan penugasan<a href="https://github.com/milvus-io/milvus/pull/45607">(#45607</a>)</li>
<li>Menangani nilai default dengan benar selama pemadatan untuk bidang yang ditambahkan<a href="https://github.com/milvus-io/milvus/pull/45619">(#45619</a>)</li>
<li>Menghapus validatefieldname di dropindex<a href="https://github.com/milvus-io/milvus/pull/45462">(#45462</a>)</li>
<li>Mengabaikan tugas pemadatan ketika segmen tidak sehat<a href="https://github.com/milvus-io/milvus/pull/45535">(#45535</a>)</li>
<li>Mengatur properti skema sebelum menyiarkan koleksi perubahan<a href="https://github.com/milvus-io/milvus/pull/45529">(#45529</a>)</li>
<li>Menyimpan peristiwa basis data jika kunci tidak valid<a href="https://github.com/milvus-io/milvus/pull/45530">(#45530</a>)</li>
<li>Memperbaiki bug bulkimport untuk bidang struct<a href="https://github.com/milvus-io/milvus/pull/45536">(#45536</a>)</li>
<li>Gagal mendapatkan data mentah untuk indeks hibrida<a href="https://github.com/milvus-io/milvus/pull/45408">(#45408</a>)</li>
<li>Menahan koleksi lebih awal untuk mencegahnya dirilis sebelum kueri selesai<a href="https://github.com/milvus-io/milvus/pull/45415">(#45415</a>)</li>
<li>Menggunakan kunci kunci sumber daya yang tepat untuk ddl dan menggunakan ddl baru dalam replika transfer<a href="https://github.com/milvus-io/milvus/pull/45509">(#45509</a>)</li>
<li>Memperbaiki kompatibilitas indeks setelah peningkatan<a href="https://github.com/milvus-io/milvus/pull/45374">(#45374</a>)</li>
<li>Memperbaiki kesalahan saluran tidak tersedia dan melepaskan pemblokiran koleksi<a href="https://github.com/milvus-io/milvus/pull/45429">(#45429</a>)</li>
<li>Menghapus meta koleksi saat menjatuhkan partisi<a href="https://github.com/milvus-io/milvus/pull/45497">(#45497</a>)</li>
<li>Memperbaiki segmen target yang ditandai jatuh untuk menyimpan hasil statistik dua kali<a href="https://github.com/milvus-io/milvus/pull/45479">(#45479</a>)</li>
<li>Timetick yang salah diperbarui dari info koleksi<a href="https://github.com/milvus-io/milvus/pull/45471">(#45471</a>)</li>
<li>Menambahkan ketergantungan tzdata untuk mengaktifkan pengenalan id zona waktu iana<a href="https://github.com/milvus-io/milvus/pull/45495">(#45495</a>)</li>
<li>Memperbaiki perhitungan offset data lapangan dalam fungsi rerank untuk pencarian massal<a href="https://github.com/milvus-io/milvus/pull/45482">(#45482</a>)</li>
<li>Memperbaiki geometri filter untuk pertumbuhan dengan mmap<a href="https://github.com/milvus-io/milvus/pull/45465">(#45465</a>)</li>
<li>Nextfieldid tidak mempertimbangkan struct<a href="https://github.com/milvus-io/milvus/pull/45438">(#45438</a>)</li>
<li>Nilai grup tidak ada<a href="https://github.com/milvus-io/milvus/pull/45419">(#45419</a>)</li>
<li>Memberikan estimasi ukuran yang akurat untuk array panah yang diiris dalam pemadatan<a href="https://github.com/milvus-io/milvus/pull/45352">(#45352</a>)</li>
<li>Memperbaiki perlombaan data di klien aliran replikasi<a href="https://github.com/milvus-io/milvus/pull/45347">(#45347</a>)</li>
<li>Melewati pembuatan indeks teks untuk kolom yang baru ditambahkan<a href="https://github.com/milvus-io/milvus/pull/45317">(#45317</a>)</li>
<li>Segmen tersegel yang tidak disengaja diabaikan dalam pemadatan l0<a href="https://github.com/milvus-io/milvus/pull/45341">(#45341</a>)</li>
<li>Memindahkan muatan akhir sebelum pembuatan indeks teks untuk memastikan ketersediaan data mentah<a href="https://github.com/milvus-io/milvus/pull/45335">(#45335</a>)</li>
<li>Tidak menggunakan json_shredding untuk jalur json yang bernilai null<a href="https://github.com/milvus-io/milvus/pull/45311">(#45311</a>)</li>
<li>Perbaikan yang dipilih sendiri terkait dengan timestamptz<a href="https://github.com/milvus-io/milvus/pull/45321">(#45321)</a></li>
<li>Memperbaiki kegagalan segmen beban karena kesalahan penggunaan disk<a href="https://github.com/milvus-io/milvus/pull/45300">(#45300</a>)</li>
<li>Mendukung nilai default json dalam pemadatan<a href="https://github.com/milvus-io/milvus/pull/45331">(#45331</a>)</li>
<li>Menghitung ukuran batch yang benar untuk indeks geometri dari segmen yang sedang tumbuh<a href="https://github.com/milvus-io/milvus/pull/45261">(#45261</a>)</li>
<li>Menerapkan patch bug kerangka kerja ddl<a href="https://github.com/milvus-io/milvus/pull/45292">(#45292)</a></li>
<li>Memperbaiki kegagalan pengumpulan perubahan dengan pengaturan mmap untuk struct<a href="https://github.com/milvus-io/milvus/pull/45240">(#45240</a>)</li>
<li>Rentang stempel waktu yang diinisialisasi dalam penulis binlog komposit<a href="https://github.com/milvus-io/milvus/pull/45283">(#45283</a>)</li>
<li>Melewati pembuatan dir tmp untuk menumbuhkan indeks r-tree<a href="https://github.com/milvus-io/milvus/pull/45257">(#45257</a>)</li>
<li>Menghindari potensi kondisi balapan saat memperbarui eksekutor<a href="https://github.com/milvus-io/milvus/pull/45232">(#45232</a>)</li>
<li>Mengizinkan "[" dan "]" dalam nama indeks<a href="https://github.com/milvus-io/milvus/pull/45194">(#45194</a>)</li>
<li>Memperbaiki bug untuk merobek-robek json ketika kosong tetapi bukan json null<a href="https://github.com/milvus-io/milvus/pull/45214">(#45214</a>)</li>
<li>Memastikan operasi penambahan hanya dapat dibatalkan oleh wal itu sendiri tetapi tidak oleh rpc<a href="https://github.com/milvus-io/milvus/pull/45079">(#45079</a>)</li>
<li>Menyelesaikan masalah akses penyimpanan cloud wp gcp dengan ak/sk<a href="https://github.com/milvus-io/milvus/pull/45144">(#45144</a>)</li>
<li>Memperbaiki impor data geometri nol<a href="https://github.com/milvus-io/milvus/pull/45162">(#45162</a>)</li>
<li>Menambahkan pemeriksaan null untuk packed_writer_ di jsonstatsparquetwriter::close()<a href="https://github.com/milvus-io/milvus/pull/45176">(#45176</a>)</li>
<li>Gagal memetakan emb_list_meta dalam daftar penyematan<a href="https://github.com/milvus-io/milvus/pull/45126">(#45126</a>)</li>
<li>Memperbarui metrik numentitas querynode ketika koleksi tidak memiliki segmen<a href="https://github.com/milvus-io/milvus/pull/45160">(#45160</a>)</li>
<li>Mencegah percobaan ulang saat mengimpor string utf-8 yang tidak valid<a href="https://github.com/milvus-io/milvus/pull/45068">(#45068</a>)</li>
<li>Menangani fielddata kosong dalam mengurangi/merangking ulang untuk skenario permintaan ulang<a href="https://github.com/milvus-io/milvus/pull/45137">(#45137</a>)</li>
<li>Memperbaiki kepanikan saat menghentikan cdc dengan anggun<a href="https://github.com/milvus-io/milvus/pull/45095">(#45095</a>)</li>
<li>Memperbaiki kontaminasi token auth, dukungan oss/cos, log kesalahan sinkronisasi yang berlebihan<a href="https://github.com/milvus-io/milvus/pull/45106">(#45106</a>)</li>
<li>Menangani data semua-null di stringindexsort untuk mencegah batas waktu pemuatan<a href="https://github.com/milvus-io/milvus/pull/45104">(#45104</a>)</li>
<li>Menonaktifkan pembuatan jsonstats versi lama dari permintaan<a href="https://github.com/milvus-io/milvus/pull/45102">(#45102</a>)</li>
<li>Memperbaiki bug untuk mengimpor data geometri<a href="https://github.com/milvus-io/milvus/pull/45090">(#45090</a>)</li>
<li>Memperbaiki bug impor parket di struct<a href="https://github.com/milvus-io/milvus/pull/45071">(#45071</a>)</li>
<li>Menambahkan getmetrics kembali ke indexnodeserver untuk memastikan kompatibilitas<a href="https://github.com/milvus-io/milvus/pull/45074">(#45074</a>)</li>
<li>Memperbaiki kegagalan pengumpulan perubahan untuk sub-bidang struct<a href="https://github.com/milvus-io/milvus/pull/45042">(#45042</a>)</li>
<li>Memperbaiki level koleksi mmap yang tidak berlaku untuk struct<a href="https://github.com/milvus-io/milvus/pull/44997">(#44997</a>)</li>
<li>Mencegah perlombaan data dalam pembaruan notifier koleksi querycoord<a href="https://github.com/milvus-io/milvus/pull/45051">(#45051</a>)</li>
<li>Menangani nilai default bidang json di lapisan penyimpanan<a href="https://github.com/milvus-io/milvus/pull/45009">(#45009</a>)</li>
<li>Memeriksa ulang untuk menghindari iter terhapus oleh thread lain<a href="https://github.com/milvus-io/milvus/pull/45015">(#45015</a>)</li>
<li>Memperbaiki bug pada fungsi gis untuk memfilter geometri<a href="https://github.com/milvus-io/milvus/pull/44967">(#44967</a>)</li>
</ul>
<h2 id="v265" class="common-anchor-header">v2.6.5<button data-href="#v265" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 11 November 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi Java SDK</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.7</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan rilis Milvus 2.6.5, yang mengatasi <strong>kerentanan keamanan kritis</strong> <a href="https://github.com/milvus-io/milvus/security/advisories/GHSA-mhjq-8c7m-3f7p">CVE-2025-64513</a> dan diupgrade ke Go 1.24.9. Kami sangat menyarankan <strong>semua pengguna Milvus 2.6.x untuk melakukan upgrade ke 2.6.5</strong> sesegera mungkin. Pembaruan ini juga mencakup beberapa peningkatan dan perbaikan bug lainnya, dan memberikan pengalaman yang lebih kuat dan efisien kepada pengguna.</p>
<h3 id="Improvements" class="common-anchor-header">Peningkatan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Peningkatan tag gambar pembangun yang diperbarui pada go1.24.9<a href="https://github.com/milvus-io/milvus/pull/45398">(#45398</a>)</li>
<li>Melewatkan pemeriksaan id sumber<a href="https://github.com/milvus-io/milvus/pull/45379">(#45379</a>)</li>
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
<li>Nilai grup tidak ada<a href="https://github.com/milvus-io/milvus/pull/45421">(#45421</a>)</li>
<li>Rentang stempel waktu yang diinisialisasi dalam penulis binlog komposit (<a href="https://github.com/milvus-io/milvus/pull/45402">#45402</a>)</li>
<li>Menangani fielddata kosong dalam pengurangan / perankingan ulang untuk skenario permintaan ulang (<a href="https://github.com/milvus-io/milvus/pull/45389">#45389</a>)</li>
<li>Menambahkan pemeriksaan null untuk packed_writer_ di jsonstatsparquetwrite...<a href="https://github.com/milvus-io/milvus/pull/45376">(#45376</a>)</li>
<li>Melewatkan pembuatan indeks teks untuk kolom yang baru ditambahkan<a href="https://github.com/milvus-io/milvus/pull/45358">(#45358</a>)</li>
<li>Secara tidak sengaja mengabaikan segmen yang disegel dalam pemadatan l0<a href="https://github.com/milvus-io/milvus/pull/45351">(#45351</a>)</li>
<li>Memindahkan muatan akhir sebelum pembuatan indeks teks untuk memastikan ketersediaan data mentah<a href="https://github.com/milvus-io/milvus/pull/45336">(#45336</a>)</li>
<li>Mendukung nilai default json dalam pemadatan<a href="https://github.com/milvus-io/milvus/pull/45332">(#45332</a>)</li>
<li>Memperbarui milvus-storage untuk memperbaiki inisialisasi aws sdk yang terduplikasi (<a href="https://github.com/milvus-io/milvus/pull/45075">#45075</a>)</li>
</ul>
<h2 id="v264" class="common-anchor-header">v2.6.4<button data-href="#v264" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 21 Oktober 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi SDK Java</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.6</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan bangga mengumumkan peluncuran Milvus 2.6.4, yang menampilkan berbagai kemampuan baru yang kuat, peningkatan kinerja, dan perbaikan bug yang penting. Pembaruan ini memperkenalkan fitur-fitur penting seperti Struct dalam ARRAY untuk pemodelan data tingkat lanjut. Selain itu, kami telah mengaktifkan JSON Shredding secara default, yang selanjutnya meningkatkan kinerja dan efisiensi kueri. Beberapa bug kritis juga telah diatasi untuk memastikan stabilitas dan keandalan yang lebih baik. Dengan rilis ini, Milvus terus memberikan pengalaman yang lebih kuat dan efisien untuk semua pengguna. Di bawah ini adalah sorotan utama dari rilis ini.</p>
<h3 id="Features" class="common-anchor-header">Fitur<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Struct dalam ARRAY: Milvus memperkenalkan tipe data baru, Struct, yang memungkinkan pengguna untuk mengatur dan mengelola beberapa field yang terkait dalam satu entitas. Saat ini, Struct hanya dapat digunakan sebagai elemen di bawah DataType.ARRAY, yang memungkinkan fitur-fitur seperti Array of Vector, di mana setiap baris berisi beberapa vektor, membuka kemungkinan baru untuk pemodelan dan pencarian data yang kompleks.<a href="https://github.com/milvus-io/milvus/pull/42148">(#42148</a>)</li>
<li>Mendukung model Qwen GTE-rerank-v2 yang didukung di DashScope<a href="https://github.com/milvus-io/milvus/pull/44660">(#44660</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Peningkatan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li><strong>Meningkatkan versi Go ke 1.24.6</strong> dengan pembuat gambar<a href="https://github.com/milvus-io/milvus/pull/44763">(#44763</a>)</li>
<li>Mengaktifkan penghancuran JSON default<a href="https://github.com/milvus-io/milvus/pull/44811">(#44811</a>)</li>
<li>Menambahkan kuota disk untuk ukuran binlog yang dimuat untuk mencegah kegagalan pemuatan node kueri<a href="https://github.com/milvus-io/milvus/pull/44932">(#44932</a>)</li>
<li>Mengaktifkan dukungan mmap untuk array struct di MemVectorIndex<a href="https://github.com/milvus-io/milvus/pull/44832">(#44832</a>)</li>
<li>Menambahkan manajemen lapisan cache untuk TextMatchIndex<a href="https://github.com/milvus-io/milvus/pull/44768">(#44768</a>)</li>
<li>Performa pencarian terbalik bitmap yang dioptimalkan (<a href="https://github.com/milvus-io/milvus/pull/44838">#44838</a>)</li>
<li>Memperbarui versi Knowhere<a href="https://github.com/milvus-io/milvus/pull/44707">(#44707</a> <a href="https://github.com/milvus-io/milvus/pull/44765">#44765</a>)</li>
<li>Menghapus pemeriksaan penggunaan logis selama pemuatan segmen<a href="https://github.com/milvus-io/milvus/pull/44770">(#44770</a>)</li>
<li>Menambahkan bidang log akses untuk informasi panjang nilai templat<a href="https://github.com/milvus-io/milvus/pull/44783">(#44783</a>)</li>
<li>Mengizinkan penimpaan jenis indeks saat ini selama pembuatan indeks<a href="https://github.com/milvus-io/milvus/pull/44754">(#44754</a>)</li>
<li>Menambahkan parameter pemuatan untuk indeks vektor<a href="https://github.com/milvus-io/milvus/pull/44749">(#44749</a>)</li>
<li>Manajemen status tugas eksekutor pemadatan terpadu<a href="https://github.com/milvus-io/milvus/pull/44722">(#44722</a>)</li>
<li>Menambahkan log yang disempurnakan untuk penjadwal tugas di QueryCoord<a href="https://github.com/milvus-io/milvus/pull/44725">(#44725</a>)</li>
<li>Memastikan accesslog.$consistency_level mewakili nilai aktual yang digunakan (<a href="https://github.com/milvus-io/milvus/pull/44711">#44711</a>)</li>
<li>Menghapus pengelola saluran yang berlebihan dari datacoord<a href="https://github.com/milvus-io/milvus/pull/44679">(#44679</a>)</li>
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
<li>Menghapus GCC dari build Dockerfile untuk memperbaiki CVE<a href="https://github.com/milvus-io/milvus/pull/44882">(#44882</a>)</li>
<li>Memastikan urutan hasil pencarian deterministik ketika skor sama<a href="https://github.com/milvus-io/milvus/pull/44884">(#44884</a>)</li>
<li>Perangkingan ulang sebelum permintaan ulang jika perangking ulang tidak menggunakan data lapangan<a href="https://github.com/milvus-io/milvus/pull/44943">(#44943</a>)</li>
<li>Memastikan pemenuhan janji ketika CreateArrowFileSystem melempar pengecualian<a href="https://github.com/milvus-io/milvus/pull/44976">(#44976</a>)</li>
<li>Memperbaiki konfigurasi enkripsi disk yang hilang<a href="https://github.com/milvus-io/milvus/pull/44839">(#44839)</a></li>
<li>Memperbaiki penonaktifan pemeriksa saldo yang menyebabkan masalah penghentian saldo<a href="https://github.com/milvus-io/milvus/pull/44836">(#44836</a>)</li>
<li>Memperbaiki masalah di mana "tidak sama" tidak termasuk "tidak ada"<a href="https://github.com/milvus-io/milvus/pull/44960">(#44960</a>)</li>
<li>Mendukung nilai default JSON di CreateArrowScalarFromDefaultValue<a href="https://github.com/milvus-io/milvus/pull/44952">(#44952</a>)</li>
<li>Menggunakan string debug pendek untuk menghindari baris baru dalam log debug<a href="https://github.com/milvus-io/milvus/pull/44929">(#44929</a>)</li>
<li>Memperbaiki ekspresi eksistensi untuk indeks datar JSON<a href="https://github.com/milvus-io/milvus/pull/44951">(#44951</a>)</li>
<li>Semantik jalur eksistensi JSON yang disatukan<a href="https://github.com/milvus-io/milvus/pull/44926">(#44926</a>)</li>
<li>Memperbaiki kepanikan yang disebabkan oleh pesan sisipan internal yang kosong<a href="https://github.com/milvus-io/milvus/pull/44906">(#44906</a>)</li>
<li>Memperbarui parameter AI/SAQ<a href="https://github.com/milvus-io/milvus/pull/44862">(#44862</a>)</li>
<li>Menghapus batas deduplikasi ketika indeks otomatis dinonaktifkan<a href="https://github.com/milvus-io/milvus/pull/44824">(#44824</a>)</li>
<li>Menghindari operasi reset/tambah secara bersamaan pada metrik DataCoord<a href="https://github.com/milvus-io/milvus/pull/44815">(#44815</a>)</li>
<li>Memperbaiki bug di JSON_contents(path, int)<a href="https://github.com/milvus-io/milvus/pull/44818">(#44818</a>)</li>
<li>Menghindari penggusuran di lapisan caching selama penanganan JSON<a href="https://github.com/milvus-io/milvus/pull/44813">(#44813</a>)</li>
<li>Memperbaiki hasil yang salah dari filter exp ketika dilewati<a href="https://github.com/milvus-io/milvus/pull/44779">(#44779</a>)</li>
<li>Memeriksa apakah node kueri adalah SQN dengan label dan daftar node streaming<a href="https://github.com/milvus-io/milvus/pull/44793">(#44793</a>)</li>
<li>Memperbaiki BM25 dengan boost yang mengembalikan hasil yang tidak diurutkan<a href="https://github.com/milvus-io/milvus/pull/44759">(#44759)</a></li>
<li>Memperbaiki impor massal dengan ID otomatis<a href="https://github.com/milvus-io/milvus/pull/44694">(#44694</a>)</li>
<li>Melewati sistem file melalui FileManagerContext saat memuat indeks<a href="https://github.com/milvus-io/milvus/pull/44734">(#44734</a>)</li>
<li>Menggunakan "akhirnya" dan memperbaiki ID tugas yang muncul di status eksekusi dan selesai<a href="https://github.com/milvus-io/milvus/pull/44715">(#44715</a>)</li>
<li>Menghapus tanda centang waktu mulai yang salah untuk menghindari penyaringan DML dengan tanda centang waktu yang kurang dari itu<a href="https://github.com/milvus-io/milvus/pull/44692">(#44692</a>)</li>
<li>Menjadikan penyedia kredensial AWS sebagai penyedia tunggal<a href="https://github.com/milvus-io/milvus/pull/44705">(#44705</a>)</li>
<li>Menonaktifkan penghancuran untuk jalur JSON yang berisi angka<a href="https://github.com/milvus-io/milvus/pull/44808">(#44808</a>)</li>
<li>Memperbaiki uji unit yang valid untuk TestUnaryRangeJsonNullable<a href="https://github.com/milvus-io/milvus/pull/44990">(#44990</a>)</li>
<li>Memperbaiki pengujian unit dan menghapus logika fallback sistem file<a href="https://github.com/milvus-io/milvus/pull/44686">(#44686</a>)</li>
</ul>
<h2 id="v263" class="common-anchor-header">v2.6.3<button data-href="#v263" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 11 Oktober 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi SDK Java</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.5</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan bangga mengumumkan peluncuran Milvus 2.6.3, yang memperkenalkan berbagai fitur baru yang menarik, peningkatan, dan perbaikan bug yang penting. Versi ini meningkatkan kinerja sistem, memperluas fungsionalitas, dan memperbaiki masalah-masalah utama, sehingga memberikan pengalaman yang lebih stabil bagi semua pengguna. Di bawah ini adalah sorotan dari rilis ini:</p>
<h3 id="New-Features" class="common-anchor-header">Fitur Baru<button data-href="#New-Features" class="anchor-icon" translate="no">
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
<li>Kunci Utama dengan AutoID Diaktifkan: Pengguna sekarang dapat menulis bidang kunci utama ketika <code translate="no">autoid</code> diaktifkan.<a href="https://github.com/milvus-io/milvus/pull/44424">(#44424</a> <a href="https://github.com/milvus-io/milvus/pull/44530">#44530</a>)</li>
<li>Pemadatan Manual untuk Segmen L0: Menambahkan dukungan untuk memadatkan segmen L0 secara manual.<a href="https://github.com/milvus-io/milvus/pull/44440">(#44440</a>)</li>
<li>Pengkodean ID Klaster dalam AutoID: ID yang dibuat secara otomatis sekarang akan menyertakan ID klaster.<a href="https://github.com/milvus-io/milvus/pull/44471">(#44471</a>)</li>
<li>Dukungan Tokenizer gRPC: Integrasi tokenizer gRPC untuk meningkatkan fleksibilitas kueri.<a href="https://github.com/milvus-io/milvus/pull/41994">(#41994</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Menyempurnakan pemeriksa saldo dengan mengimplementasikan antrean prioritas, meningkatkan distribusi tugas.<a href="https://github.com/milvus-io/milvus/pull/43992">(#43992</a>)</li>
<li>Statistik BM25 yang dimuat sebelumnya untuk segmen yang disegel dan serialisasi yang dioptimalkan.<a href="https://github.com/milvus-io/milvus/pull/44279">(#44279</a>)</li>
<li>Bidang yang dapat dinolkan sekarang dapat digunakan sebagai input untuk fungsi BM25.<a href="https://github.com/milvus-io/milvus/pull/44586">(#44586</a>)</li>
<li>Menambahkan dukungan untuk Azure Blob Storage di Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44592">(#44592</a>)</li>
<li>Menghapus file kecil tepat setelah pemadatan segmen Woodpecker.<a href="https://github.com/milvus-io/milvus/pull/44473">(#44473</a>)</li>
<li>Mengaktifkan fungsionalitas skor acak untuk meningkatkan kueri.<a href="https://github.com/milvus-io/milvus/pull/44214">(#44214</a>)</li>
<li>Opsi konfigurasi baru untuk tipe vektor <code translate="no">int8</code> dalam pengindeksan otomatis.<a href="https://github.com/milvus-io/milvus/pull/44554">(#44554</a>)</li>
<li>Menambahkan item parameter untuk mengontrol kebijakan permintaan penelusuran hibrida.<a href="https://github.com/milvus-io/milvus/pull/44466">(#44466</a>)</li>
<li>Menambahkan dukungan untuk mengontrol penyisipan bidang keluaran fungsi.<a href="https://github.com/milvus-io/milvus/pull/44162">(#44162</a>)</li>
<li>Fungsi peluruhan sekarang mendukung penggabungan skor yang dapat dikonfigurasi untuk kinerja yang lebih baik.<a href="https://github.com/milvus-io/milvus/pull/44066">(#44066</a>)</li>
<li>Peningkatan kinerja pencarian biner pada string.<a href="https://github.com/milvus-io/milvus/pull/44469">(#44469</a>)</li>
<li>Memperkenalkan dukungan untuk filter jarang dalam kueri. <a href="https://github.com/milvus-io/milvus/pull/44347">(#44347</a>)</li>
<li>Berbagai pembaruan untuk meningkatkan fungsionalitas indeks berjenjang.<a href="https://github.com/milvus-io/milvus/pull/44433">(#44433</a>)</li>
<li>Menambahkan pelacakan penggunaan sumber daya penyimpanan untuk pencarian skalar dan vektor.<a href="https://github.com/milvus-io/milvus/pull/44414">(#44414</a> <a href="https://github.com/milvus-io/milvus/pull/44308">#44308</a>)</li>
<li>Menambahkan penggunaan penyimpanan untuk hapus/update/istirahatkan<a href="https://github.com/milvus-io/milvus/pull/44512">(#44512</a>)</li>
<li>Mengaktifkan target flush granular untuk operasi <code translate="no">flushall</code>.<a href="https://github.com/milvus-io/milvus/pull/44234">(#44234</a>)</li>
<li>Datanode sekarang akan menggunakan sistem file non-singleton untuk manajemen sumber daya yang lebih baik.<a href="https://github.com/milvus-io/milvus/pull/44418">(#44418</a>)</li>
<li>Menambahkan opsi konfigurasi untuk pemrosesan batch dalam metadata. <a href="https://github.com/milvus-io/milvus/pull/44645">(#44645</a>)</li>
<li>Pesan kesalahan kini menyertakan nama database untuk kejelasan yang lebih baik.<a href="https://github.com/milvus-io/milvus/pull/44618">(#44618</a>)</li>
<li>Memindahkan uji pelacak ke repositori <code translate="no">milvus-common</code> untuk modularisasi yang lebih baik.<a href="https://github.com/milvus-io/milvus/pull/44605">(#44605</a>)</li>
<li>Memindahkan file unit test API C ke direktori <code translate="no">src</code> untuk pengaturan yang lebih baik.<a href="https://github.com/milvus-io/milvus/pull/44458">(#44458</a>)</li>
<li>Go SDK sekarang memungkinkan pengguna untuk memasukkan data primary key jika <code translate="no">autoid</code> diaktifkan.<a href="https://github.com/milvus-io/milvus/pull/44561">(#44561</a>)</li>
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
<li>Menyelesaikan kerentanan CVE-2020-25576 dan WS-2023-0223.<a href="https://github.com/milvus-io/milvus/pull/44163">(#44163</a>)</li>
<li>Memperbaiki masalah di mana sumber daya logis digunakan untuk metrik di pusat kuota pada node streaming.<a href="https://github.com/milvus-io/milvus/pull/44613">(#44613</a>)</li>
<li>Tetapkan <code translate="no">mixcoord</code> di <code translate="no">activatefunc</code> saat mengaktifkan siaga.<a href="https://github.com/milvus-io/milvus/pull/44621">(#44621</a>)</li>
<li>Menghapus inisialisasi yang berlebihan dari komponen penyimpanan V2. <a href="https://github.com/milvus-io/milvus/pull/44597">#44597</a>)</li>
<li>Memperbaiki pemblokiran tugas pemadatan karena keluarnya loop eksekutor.<a href="https://github.com/milvus-io/milvus/pull/44543">(#44543</a>)</li>
<li>Mengembalikan penggunaan sumber daya yang dimuat di destruktor <code translate="no">insert/deleterecord</code>.<a href="https://github.com/milvus-io/milvus/pull/44555">(#44555</a>)</li>
<li>Memperbaiki masalah di mana replicator tidak dapat berhenti dan meningkatkan validator konfigurasi replikasi.<a href="https://github.com/milvus-io/milvus/pull/44531">(#44531</a>)</li>
<li>Mengatur <code translate="no">mmap_file_raii_</code> ke <code translate="no">nullptr</code> saat mmap dinonaktifkan.<a href="https://github.com/milvus-io/milvus/pull/44516">(#44516</a>)</li>
<li>Membuat <code translate="no">diskfilemanager</code> menggunakan sistem file dari konteks.<a href="https://github.com/milvus-io/milvus/pull/44535">(#44535</a>)</li>
<li>Memaksa host virtual untuk OSS dan COS di penyimpanan V2.<a href="https://github.com/milvus-io/milvus/pull/44484">(#44484</a>)</li>
<li>Tetapkan nilai default <code translate="no">report_value</code> ketika <code translate="no">extrainfo</code> bukan <code translate="no">nil</code> untuk kompatibilitas.<a href="https://github.com/milvus-io/milvus/pull/44529">(#44529</a>)</li>
<li>Membersihkan metrik koleksi setelah menjatuhkan koleksi di rootcoord.<a href="https://github.com/milvus-io/milvus/pull/44511">(#44511</a>)</li>
<li>Memperbaiki kegagalan pemuatan segmen karena bidang duplikat <code translate="no">mmap.enable</code> properti.<a href="https://github.com/milvus-io/milvus/pull/44465">(#44465</a>)</li>
<li>Memperbaiki kesalahan penguraian konfigurasi beban untuk replika dinamis.<a href="https://github.com/milvus-io/milvus/pull/44430">(#44430</a>)</li>
<li>Menangani input baris-ke-kolom untuk kolom dinamis di Go SDK.<a href="https://github.com/milvus-io/milvus/pull/44626">(#44626</a>)</li>
</ul>
<h2 id="v262" class="common-anchor-header">v2.6.2<button data-href="#v262" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 19 September 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi SDK Java</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.2</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.4</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan peluncuran Milvus 2.6.2! Pembaruan ini memperkenalkan fitur-fitur baru yang kuat, peningkatan kinerja yang signifikan, dan perbaikan penting yang membuat sistem lebih stabil dan siap untuk produksi. Hal-hal yang menjadi sorotan termasuk pembaruan sebagian field dengan upsert, JSON Shredding untuk mempercepat pemfilteran field dinamis, pengindeksan NGram untuk kueri LIKE yang lebih cepat, dan evolusi skema yang lebih fleksibel pada koleksi yang ada. Dibangun berdasarkan umpan balik dari komunitas, rilis ini memberikan fondasi yang lebih kuat untuk penerapan di dunia nyata, dan kami mendorong semua pengguna untuk melakukan upgrade untuk memanfaatkan peningkatan ini.</p>
<h3 id="Features" class="common-anchor-header">Fitur<button data-href="#Features" class="anchor-icon" translate="no">
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
<li>Menambahkan dukungan untuk Penghancuran JSON untuk mempercepat pemfilteran bidang dinamis. Untuk detailnya, lihat <a href="/docs/id/json-shredding.md">Penghancuran JSON</a>.</li>
<li>Menambahkan dukungan untuk Indeks NGRAM untuk mempercepat operasi seperti. Untuk detailnya, lihat <a href="/docs/id/ngram.md">NGRAM</a>.</li>
<li>Menambahkan dukungan untuk pembaruan bidang parsial dengan API upsert. Untuk detailnya, lihat <a href="/docs/id/upsert-entities.md">Entitas Upsert</a>.</li>
<li>Menambahkan dukungan untuk Fungsi Boost. Untuk detailnya, lihat <a href="/docs/id/boost-ranker.md">Boost Ranker</a>.</li>
<li>Menambahkan dukungan untuk mengelompokkan berdasarkan bidang JSON dan bidang dinamis<a href="https://github.com/milvus-io/milvus/pull/43203">(#43203</a>)</li>
<li>Menambahkan dukungan untuk mengaktifkan skema dinamis pada koleksi yang sudah ada<a href="https://github.com/milvus-io/milvus/pull/44151">(#44151</a>)</li>
<li>Menambahkan dukungan untuk menjatuhkan indeks tanpa melepaskan koleksi<a href="https://github.com/milvus-io/milvus/pull/42941">(#42941</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>[StorageV2] Mengubah ukuran file log ke ukuran terkompresi<a href="https://github.com/milvus-io/milvus/pull/44402">(#44402</a>)</li>
<li>[StorageV2] Menambahkan bidang anak dalam info pemuatan<a href="https://github.com/milvus-io/milvus/pull/44384">(#44384</a>)</li>
<li>[StorageV2] Menambahkan dukungan untuk menyertakan kunci partisi dan pengelompokan dalam grup sistem<a href="https://github.com/milvus-io/milvus/pull/44372">(#44372</a>)</li>
<li>Menghapus batas waktu untuk tugas pemadatan<a href="https://github.com/milvus-io/milvus/pull/44277">(#44277</a>)</li>
<li>[StorageV2] Mengaktifkan build dengan Azure<a href="https://github.com/milvus-io/milvus/pull/44177">(#44177</a>)</li>
<li>[StorageV2] Info grup yang digunakan untuk memperkirakan penggunaan logika<a href="https://github.com/milvus-io/milvus/pull/44356">(#44356</a>)</li>
<li>[StorageV2] Memanfaatkan info pemisahan grup untuk memperkirakan penggunaan<a href="https://github.com/milvus-io/milvus/pull/44338">(#44338</a>)</li>
<li>[StorageV2] Grup kolom yang disimpan menghasilkan pemadatan<a href="https://github.com/milvus-io/milvus/pull/44327">(#44327</a>)</li>
<li>[StorageV2] Menambahkan konfigurasi untuk kebijakan pemisahan berbasis ukuran<a href="https://github.com/milvus-io/milvus/pull/44301">(#44301</a>)</li>
<li>[StorageV2] Menambahkan dukungan untuk kebijakan pemisahan berbasis skema dan berbasis ukuran<a href="https://github.com/milvus-io/milvus/pull/44282">(#44282</a>)</li>
<li>[StorageV2] Menambahkan kebijakan pemisahan yang dapat dikonfigurasi<a href="https://github.com/milvus-io/milvus/pull/44258">(#44258</a>)</li>
<li>[CachingLayer] Menambahkan lebih banyak metrik dan konfigurasi<a href="https://github.com/milvus-io/milvus/pull/44276">(#44276</a>)</li>
<li>Menambahkan dukungan untuk menunggu semua indeks siap sebelum memuat segmen<a href="https://github.com/milvus-io/milvus/pull/44313">(#44313</a>)</li>
<li>Menambahkan metrik latensi inti internal untuk simpul skor ulang<a href="https://github.com/milvus-io/milvus/pull/44010">(#44010</a>)</li>
<li>Format log akses yang dioptimalkan saat mencetak parameter KV<a href="https://github.com/milvus-io/milvus/pull/43742">(#43742</a>)</li>
<li>Menambahkan konfigurasi untuk memodifikasi ukuran batch snapshot dump<a href="https://github.com/milvus-io/milvus/pull/44215">(#44215)</a></li>
<li>Mengurangi interval pembersihan tugas pemadatan<a href="https://github.com/milvus-io/milvus/pull/44207">(#44207</a>)</li>
<li>Penyortiran gabungan yang ditingkatkan untuk mendukung beberapa bidang<a href="https://github.com/milvus-io/milvus/pull/44191">(#44191</a>)<a href="https://github.com/milvus-io/milvus/pull/43994">(#43994</a>)</li>
<li>Menambahkan estimasi sumber daya beban untuk indeks berjenjang<a href="https://github.com/milvus-io/milvus/pull/44171">(#44171</a>)</li>
<li>Menambahkan konfigurasi indeks otomatis untuk kasus deduplikasi<a href="https://github.com/milvus-io/milvus/pull/44186">(#44186</a>)</li>
<li>Menambahkan konfigurasi untuk mengizinkan karakter khusus pada nama (<a href="https://github.com/milvus-io/milvus/pull/44063">#44063</a>)</li>
<li>Menambahkan dukungan untuk cchannel untuk layanan streaming<a href="https://github.com/milvus-io/milvus/pull/44143">(#44143</a>)</li>
<li>Menambahkan mutex dan pemeriksaan rentang untuk menjaga penghapusan secara bersamaan<a href="https://github.com/milvus-io/milvus/pull/44128">(#44128</a>)</li>
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
<li>Menyelaraskan perilaku ekspresi eksistensi antara brute force dan indeks<a href="https://github.com/milvus-io/milvus/pull/44030">(#44030</a>)</li>
<li>Memperbaiki kesalahan saat mengganti nama ke koleksi yang dihapus<a href="https://github.com/milvus-io/milvus/pull/44436">(#44436</a>)</li>
<li>[StorageV2] Memeriksa panjang bidang anak<a href="https://github.com/milvus-io/milvus/pull/44405">(#44405</a>)</li>
<li>[StorageV2] Mengaktifkan Azure secara default<a href="https://github.com/milvus-io/milvus/pull/44377">(#44377</a>)</li>
<li>Memperbaiki jalur unggah pemadatan L0 di bawah datanode penyatuan<a href="https://github.com/milvus-io/milvus/pull/44374">(#44374</a>)</li>
<li>Penggantian nama yang tidak diizinkan jika enkripsi basis data diaktifkan<a href="https://github.com/milvus-io/milvus/pull/44225">(#44225</a>)</li>
<li>Penghapusan properti dynamicfield.enable yang tidak diizinkan<a href="https://github.com/milvus-io/milvus/pull/44335">(#44335</a>)</li>
<li>Menandai tugas sebagai gagal ketika ID yang telah dialokasikan sebelumnya tidak valid<a href="https://github.com/milvus-io/milvus/pull/44350">(#44350</a>)</li>
<li>Melewati pemeriksaan MVCC pada ekspresi perbandingan PK<a href="https://github.com/milvus-io/milvus/pull/44353">(#44353</a>)</li>
<li>Memperbaiki bug json_contains untuk statistik<a href="https://github.com/milvus-io/milvus/pull/44325">(#44325</a>)</li>
<li>Menambahkan pemeriksaan sistem berkas inisialisasi untuk simpul kueri dan simpul streaming<a href="https://github.com/milvus-io/milvus/pull/44360">(#44360</a>)</li>
<li>Memperbaiki target pemadatan kosong ketika segmen dikumpulkan sampah<a href="https://github.com/milvus-io/milvus/pull/44270">(#44270</a>)</li>
<li>Memperbaiki kondisi balapan saat menginisialisasi indeks stempel waktu<a href="https://github.com/milvus-io/milvus/pull/44317">(#44317</a>)</li>
<li>Memeriksa apakah arraydata bernilai nol untuk mencegah kepanikan<a href="https://github.com/milvus-io/milvus/pull/44332">(#44332</a>)</li>
<li>Memperbaiki bug statistik JSON build untuk objek bersarang<a href="https://github.com/milvus-io/milvus/pull/44303">(#44303</a>)</li>
<li>Menghindari penulisan ulang mmap oleh beberapa bidang JSON<a href="https://github.com/milvus-io/milvus/pull/44299">(#44299</a>)</li>
<li>Format data valid yang disatukan<a href="https://github.com/milvus-io/milvus/pull/44296">(#44296</a>)</li>
<li>Menyembunyikan kredensial penyedia penyematan/pemberian peringkat di UI web<a href="https://github.com/milvus-io/milvus/pull/44275">(#44275</a>)</li>
<li>Jalur statslog yang dikoreksi di bawah datanode penyatuan<a href="https://github.com/milvus-io/milvus/pull/44288">(#44288</a>)</li>
<li>Jalur yang dikoreksi dari oracle IDF<a href="https://github.com/milvus-io/milvus/pull/44266">(#44266</a>)</li>
<li>Pos pemeriksaan snapshot pemulihan yang digunakan jika tidak ada vchannel yang pulih<a href="https://github.com/milvus-io/milvus/pull/44246">(#44246</a>)</li>
<li>Nomor kolom terbatas dalam statistik JSON<a href="https://github.com/milvus-io/milvus/pull/44233">(#44233</a>)</li>
<li>Membuat jumlah sumber daya memuat indeks n-gram<a href="https://github.com/milvus-io/milvus/pull/44237">(#44237)</a></li>
<li>Menyimpulkan jenis metrik dari hasil pencarian yang tidak kosong<a href="https://github.com/milvus-io/milvus/pull/44222">(#44222</a>)</li>
<li>Memperbaiki penulisan multi-segmen yang hanya menulis satu segmen<a href="https://github.com/milvus-io/milvus/pull/44256">(#44256</a>)</li>
<li>Memperbaiki pengurutan gabungan di luar jangkauan<a href="https://github.com/milvus-io/milvus/pull/44230">(#44230</a>)</li>
<li>Menambahkan pemeriksaan UTF-8 sebelum menjalankan fungsi BM25<a href="https://github.com/milvus-io/milvus/pull/44220">(#44220</a>)</li>
<li>Mencoba ulang sesi lama jika ada<a href="https://github.com/milvus-io/milvus/pull/44208">(#44208</a>)</li>
<li>Menambahkan batas ukuran buffer Kafka untuk mencegah OOM datanode<a href="https://github.com/milvus-io/milvus/pull/44106">(#44106</a>)</li>
<li>Memperbaiki kepanikan dengan memperluas jangkauan penjagaan kunci<a href="https://github.com/milvus-io/milvus/pull/44130">(#44130</a>)</li>
<li>Memperbaiki segmen yang sedang tumbuh agar tidak memerah pada perubahan skema<a href="https://github.com/milvus-io/milvus/pull/44412">(#44412</a>)</li>
<li>[StorageV2] Menangani kesalahan IO<a href="https://github.com/milvus-io/milvus/pull/44255">(#44255</a>)</li>
<li>Mencegah kepanikan jika jalur indeks Tantivy tidak ada<a href="https://github.com/milvus-io/milvus/pull/44135">(#44135</a>)</li>
</ul>
<h2 id="v261" class="common-anchor-header">v2.6.1<button data-href="#v261" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 3 September 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi SDK Java</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.3</td><td style="text-align:left">2.6.1</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan peluncuran Milvus 2.6.1! Versi ini dibangun di atas kemajuan arsitektur utama dari rilis sebelumnya, memberikan peningkatan penting yang berfokus pada stabilitas produksi, kinerja, dan ketahanan operasional. Rilis ini menjawab umpan balik dari komunitas dan memperkuat sistem untuk penerapan skala besar. Kami sangat menganjurkan semua pengguna untuk melakukan upgrade untuk mendapatkan manfaat dari sistem yang lebih stabil, berkinerja, dan andal.</p>
<h3 id="Improvements" class="common-anchor-header">Peningkatan<button data-href="#Improvements" class="anchor-icon" translate="no">
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
<li>Mendukung sistem berkas yang kompatibel dengan POSIX untuk penyimpanan jarak jauh<a href="https://github.com/milvus-io/milvus/pull/43944">(#43944</a>)</li>
<li>Memperkenalkan pemeringkat berbasis model<a href="https://github.com/milvus-io/milvus/pull/43270">(#43270</a>)</li>
<li>Mengoptimalkan kinerja ekspresi perbandingan pada bidang kunci utama<a href="https://github.com/milvus-io/milvus/pull/43154">(#43154</a>)</li>
<li>Mengumpulkan doc_id dari daftar posting secara langsung untuk mempercepat pencocokan teks<a href="https://github.com/milvus-io/milvus/pull/43899">(#43899</a>)</li>
<li>Mengoptimalkan kinerja kueri dengan mengubah beberapa kondisi != menjadi satu klausa NOT IN<a href="https://github.com/milvus-io/milvus/pull/43690">(#43690</a>)</li>
<li>Meningkatkan manajemen sumber daya untuk lapisan cache selama pemuatan segmen<a href="https://github.com/milvus-io/milvus/pull/43846">(#43846</a>)</li>
<li>Meningkatkan estimasi memori untuk indeks sementara selama pemuatan data<a href="https://github.com/milvus-io/milvus/pull/44104">(#44104)</a></li>
<li>Membuat rasio build untuk indeks sementara dapat dikonfigurasi<a href="https://github.com/milvus-io/milvus/pull/43939">(#43939</a>)</li>
<li>Menambahkan batas kecepatan tulis yang dapat dikonfigurasi ke penulis disk<a href="https://github.com/milvus-io/milvus/pull/43912">(#43912</a>)</li>
<li>Parameter SegCore sekarang dapat diperbarui secara dinamis tanpa memulai ulang layanan Milvus<a href="https://github.com/milvus-io/milvus/pull/43231">(#43231</a>)</li>
<li>Menambahkan metrik latensi gRPC terpadu untuk pengamatan yang lebih baik<a href="https://github.com/milvus-io/milvus/pull/44089">(#44089</a>)</li>
<li>Termasuk stempel waktu permintaan klien di header gRPC untuk menyederhanakan debugging<a href="https://github.com/milvus-io/milvus/pull/44059">(#44059</a>)</li>
<li>Mendukung tingkat log jejak untuk segcore<a href="https://github.com/milvus-io/milvus/pull/44003">(#44003</a>)</li>
<li>Menambahkan sakelar yang dapat dikonfigurasi untuk menyesuaikan jaminan konsistensi untuk ketersediaan yang lebih tinggi<a href="https://github.com/milvus-io/milvus/pull/43874">(#43874</a>)</li>
<li>Menerapkan mekanisme rewatch yang kuat untuk menangani kegagalan koneksi etcd<a href="https://github.com/milvus-io/milvus/pull/43829">(#43829</a>)</li>
<li>Meningkatkan logika pemeriksaan kesehatan simpul internal<a href="https://github.com/milvus-io/milvus/pull/43768">(#43768</a>)</li>
<li>Mengoptimalkan akses metadata ketika membuat daftar koleksi<a href="https://github.com/milvus-io/milvus/pull/43902">(#43902</a>)</li>
<li>Meningkatkan klien Pulsar ke versi resmi v0.15.1 dan menambahkan lebih banyak pencatatan<a href="https://github.com/milvus-io/milvus/pull/43913">(#43913</a>)</li>
<li>Meningkatkan aws-sdk dari 1.9.234 ke 1.11.352<a href="https://github.com/milvus-io/milvus/pull/43916">(#43916</a>)</li>
<li>Mendukung pembaruan interval dinamis untuk komponen ticker<a href="https://github.com/milvus-io/milvus/pull/43865">(#43865</a>)</li>
<li>Meningkatkan deteksi otomatis set instruksi ARM SVE untuk operasi bitset<a href="https://github.com/milvus-io/milvus/pull/43833">(#43833</a>)</li>
<li>Memperbaiki pesan kesalahan saat pencocokan teks atau frasa gagal<a href="https://github.com/milvus-io/milvus/pull/43366">(#43366</a>)</li>
<li>Memperbaiki pesan kesalahan untuk ketidakcocokan dimensi vektor<a href="https://github.com/milvus-io/milvus/pull/43835">(#43835</a>)</li>
<li>Memperbaiki pelaporan kesalahan untuk menambahkan batas waktu ketika penyimpanan objek tidak tersedia<a href="https://github.com/milvus-io/milvus/pull/43926">(#43926</a>)</li>
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
<li>Memperbaiki potensi masalah Out-Of-Memory (OOM) selama impor file Parket<a href="https://github.com/milvus-io/milvus/pull/43756">(#43756</a>)</li>
<li>Memperbaiki masalah di mana node siaga tidak dapat pulih jika masa sewanya berakhir<a href="https://github.com/milvus-io/milvus/pull/44112">(#44112</a>)</li>
<li>Menangani status percobaan ulang pemadatan dengan benar<a href="https://github.com/milvus-io/milvus/pull/44119">(#44119</a>)</li>
<li>Memperbaiki potensi kebuntuan antara permintaan baca terus menerus dan pemuatan indeks yang dapat mencegah pemuatan indeks<a href="https://github.com/milvus-io/milvus/pull/43937">(#43937</a>)</li>
<li>Memperbaiki bug yang dapat menyebabkan penghapusan data gagal dalam skenario konkurensi tinggi<a href="https://github.com/milvus-io/milvus/pull/43831">(#43831</a>)</li>
<li>Memperbaiki potensi kondisi balapan saat memuat teks dan indeks JSON<a href="https://github.com/milvus-io/milvus/pull/43811">(#43811</a>)</li>
<li>Memperbaiki ketidakkonsistenan status node yang dapat terjadi setelah QueryCoord dimulai ulang<a href="https://github.com/milvus-io/milvus/pull/43941">(#43941</a>)</li>
<li>Memastikan bahwa QueryNode yang "kotor" dibersihkan dengan benar setelah restart<a href="https://github.com/milvus-io/milvus/pull/43909">(#43909</a>)</li>
<li>Memperbaiki masalah di mana status coba lagi tidak ditangani dengan benar untuk permintaan dengan muatan yang tidak kosong<a href="https://github.com/milvus-io/milvus/pull/44068">(#44068</a>)</li>
<li>Memperbaiki masalah di mana penulis massal v2 tidak menggunakan nama bucket yang benar<a href="https://github.com/milvus-io/milvus/pull/44083">(#44083</a>)</li>
<li>Meningkatkan keamanan dengan menyembunyikan item sensitif dari titik akhir RESTful get_configs<a href="https://github.com/milvus-io/milvus/pull/44057">(#44057</a>)</li>
<li>Memastikan bahwa unggahan objek untuk pelatuk tidak berdaya selama percobaan ulang batas waktu<a href="https://github.com/milvus-io/milvus/pull/43947">(#43947</a>)</li>
<li>Melarang mengimpor elemen null di bidang array dari file Parket<a href="https://github.com/milvus-io/milvus/pull/43964">(#43964</a>)</li>
<li>Memperbaiki bug di mana cache proxy tidak dibatalkan setelah membuat alias koleksi<a href="https://github.com/milvus-io/milvus/pull/43854">(#43854</a>)</li>
<li>Meningkatkan mekanisme penemuan layanan internal untuk node streaming<a href="https://github.com/milvus-io/milvus/pull/44033">(#44033</a>)</li>
<li>Memperbaiki logika grup sumber daya untuk memfilter node streaming dengan benar<a href="https://github.com/milvus-io/milvus/pull/43984">(#43984</a>)</li>
<li>Menambahkan label databaseName ke metrik untuk mencegah konflik penamaan di lingkungan multi-database<a href="https://github.com/milvus-io/milvus/pull/43808">(#43808</a>)</li>
<li>Memperbaiki kesalahan logika dalam penanganan status tugas internal<a href="https://github.com/milvus-io/milvus/pull/43777">(#43777</a>)</li>
<li>Mengoptimalkan waktu inisialisasi metrik internal untuk menghindari potensi kepanikan<a href="https://github.com/milvus-io/milvus/pull/43773">(#43773</a>)</li>
<li>Memperbaiki potensi kerusakan yang jarang terjadi pada server HTTP internal<a href="https://github.com/milvus-io/milvus/pull/43799">(#43799</a>)</li>
</ul>
<h2 id="v260" class="common-anchor-header">v2.6.0<button data-href="#v260" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 6 Agustus 2025</p>
<table>
<thead>
<tr><th style="text-align:left">Versi Milvus</th><th style="text-align:left">Versi Python SDK</th><th style="text-align:left">Versi SDK Node.js</th><th style="text-align:left">Versi SDK Java</th><th style="text-align:left">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.0</td><td style="text-align:left">2.6.1</td><td style="text-align:left">2.6.0</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0 secara resmi dirilis! Dibangun di atas fondasi arsitektur yang diletakkan di <a href="#v260-rc1">2.6.0-rc1</a>, versi siap produksi ini mengatasi berbagai masalah stabilitas dan kinerja sambil memperkenalkan kemampuan baru yang kuat termasuk Format Penyimpanan V2, pemrosesan JSON tingkat lanjut, dan fitur pencarian yang disempurnakan. Dengan perbaikan bug yang ekstensif dan pengoptimalan berdasarkan umpan balik dari komunitas selama fase RC, Milvus 2.6.0 siap untuk Anda jelajahi dan gunakan.</p>
<div class="alert warning">
<p>Upgrade langsung dari versi sebelum 2.6.0 tidak didukung karena adanya perubahan arsitektur. Silakan ikuti <a href="/docs/id/upgrade_milvus_cluster-operator.md">panduan peningkatan versi</a> kami.</p>
</div>
<h3 id="Whats-new-in-260-since-RC" class="common-anchor-header">Apa yang baru dalam 2.6.0 (sejak RC)<button data-href="#Whats-new-in-260-since-RC" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Optimized-storage-format-v2" class="common-anchor-header">Format penyimpanan yang dioptimalkan v2</h4><p>Untuk mengatasi tantangan penyimpanan data skalar dan vektor campuran, terutama pencarian titik pada data yang tidak terstruktur, Milvus 2.6 memperkenalkan Format Penyimpanan V2. Format penyimpanan kolumnar adaptif baru ini mengadopsi strategi tata letak "penggabungan kolom sempit + independensi kolom lebar", yang secara fundamental memecahkan hambatan kinerja saat menangani pencarian titik dan pengambilan batch kecil dalam basis data vektor.</p>
<p>Format baru ini sekarang mendukung akses acak yang efisien tanpa amplifikasi I/O dan mencapai peningkatan kinerja hingga 100x lipat dibandingkan dengan format Parket vanila yang diadopsi sebelumnya, sehingga ideal untuk beban kerja AI yang membutuhkan pemrosesan analitis dan pengambilan vektor yang tepat. Selain itu, format ini dapat mengurangi jumlah file hingga 98% untuk beban kerja yang umum. Konsumsi memori untuk pemadatan utama berkurang hingga 300%, dan operasi I/O dioptimalkan hingga 80% untuk pembacaan dan lebih dari 600% untuk penulisan.</p>
<h4 id="JSON-flat-index-beta" class="common-anchor-header">Indeks datar JSON (beta)</h4><p>Milvus 2.6 memperkenalkan JSON Flat Index untuk menangani skema JSON yang sangat dinamis. Tidak seperti JSON Path Index yang membutuhkan pra-deklarasi jalur tertentu dan jenis yang diharapkan, JSON Flat Index secara otomatis menemukan dan mengindeks semua struktur bersarang di bawah jalur yang diberikan. Ketika mengindeks bidang JSON, ia secara rekursif meratakan seluruh subpohon, membuat entri indeks terbalik untuk setiap pasangan nilai-path yang ditemuinya, tanpa memandang kedalaman atau jenisnya. Perataan otomatis ini membuat JSON Flat Index ideal untuk skema yang berkembang di mana bidang-bidang baru muncul tanpa peringatan. Misalnya, jika Anda mengindeks bidang "metadata", sistem akan secara otomatis menangani bidang bersarang baru seperti "metadata.version2.features.experimental" saat bidang tersebut muncul di data yang masuk, tanpa memerlukan konfigurasi indeks baru.</p>
<h3 id="Core-260-features-recall" class="common-anchor-header">Penarikan kembali fitur Core 2.6.0<button data-href="#Core-260-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>Untuk informasi rinci tentang perubahan arsitektur dan fitur yang diperkenalkan di 2.6 <a href="#v260-rc1">.</a>0-RC, lihat <a href="#v260-rc1">Catatan Rilis 2.6.0-rc1</a>.</p>
</div>
<h4 id="Architecture-simplification" class="common-anchor-header">Penyederhanaan arsitektur</h4><ul>
<li>Streaming Node (GA) - Manajemen WAL terpusat</li>
<li>WAL asli dengan Woodpecker - Menghapus ketergantungan Kafka/Pulsar</li>
<li>Koordinator terpadu (MixCoord); Penggabungan IndexNode dan DataNode - Mengurangi kompleksitas komponen</li>
</ul>
<h4 id="Search--analytics" class="common-anchor-header">Pencarian &amp; analisis</h4><ul>
<li>Kuantisasi RaBitQ 1-bit dengan daya ingat tinggi</li>
<li>Pencocokan frasa</li>
<li>MinHash LSH untuk deduplikasi</li>
<li>Fungsi pemeringkatan yang sadar waktu</li>
</ul>
<h4 id="Developer-experience" class="common-anchor-header">Pengalaman pengembang</h4><ul>
<li>Menyematkan fungsi untuk alur kerja "data-in, data-out"</li>
<li>Evolusi skema online</li>
<li>Dukungan vektor INT8</li>
<li>Tokenizer yang disempurnakan untuk dukungan bahasa global</li>
<li>Lapisan cache dengan pemuatan malas - Memproses set data yang lebih besar dari memori</li>
</ul>
<h2 id="v260-rc1" class="common-anchor-header">v2.6.0-rc1<button data-href="#v260-rc1" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 18 Juni 2025</p>
<table>
<thead>
<tr><th style="text-align:center">Versi Milvus</th><th style="text-align:center">Versi Python SDK</th><th style="text-align:center">Versi SDK Node.js</th><th style="text-align:center">Versi SDK Java</th><th style="text-align:center">Versi Go SDK</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0b0</td><td style="text-align:center">2.6.0-rc1</td><td style="text-align:center">2.6.0</td><td style="text-align:center">2.6.0-rc.1</td></tr>
</tbody>
</table>
<p>Milvus 2.6.0-rc1 memperkenalkan arsitektur cloud-native yang disederhanakan yang dirancang untuk meningkatkan efisiensi operasional, pemanfaatan sumber daya, dan total biaya kepemilikan dengan mengurangi kompleksitas penerapan. Rilis ini menambahkan fungsionalitas baru yang berfokus pada kinerja, pencarian, dan pengembangan. Fitur-fitur utama termasuk kuantisasi 1-bit presisi tinggi (RaBitQ) dan lapisan cache dinamis untuk meningkatkan kinerja, deteksi hampir duplikat dengan MinHash dan pencocokan frasa yang tepat untuk pencarian tingkat lanjut, dan fungsi penyematan otomatis dengan modifikasi skema online untuk meningkatkan pengalaman pengembang.</p>
<div class="alert note">
<p>Ini adalah versi pra-rilis Milvus 2.6.0. Untuk mencoba fitur-fitur terbaru, instal versi ini sebagai penerapan baru. Peningkatan dari Milvus v2.5.x atau yang lebih lama ke 2.6.0-rc1 tidak didukung.</p>
</div>
<h3 id="Architecture-Changes" class="common-anchor-header">Perubahan Arsitektur<button data-href="#Architecture-Changes" class="anchor-icon" translate="no">
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
    </button></h3><p>Sejak versi 2.6, Milvus memperkenalkan perubahan arsitektur yang signifikan yang bertujuan untuk meningkatkan kinerja, skalabilitas, dan kemudahan penggunaan. Untuk informasi lebih lanjut, lihat <a href="/docs/id/architecture_overview.md">Tinjauan Arsitektur Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming Node (GA)</h4><p>Pada versi sebelumnya, data streaming ditulis ke WAL oleh Proxy, dan dibaca oleh QueryNode dan DataNode. Arsitektur ini menyulitkan untuk mencapai konsensus di sisi penulisan, membutuhkan logika yang kompleks di sisi pembacaan. Selain itu, delegator kueri terletak di QueryNode, yang menghambat skalabilitas. Milvus 2.5.0 memperkenalkan Streaming Node, yang menjadi GA di versi 2.6.0. Komponen ini sekarang bertanggung jawab atas semua operasi baca/tulis WAL tingkat shard dan juga berfungsi sebagai delegator kueri, menyelesaikan masalah yang disebutkan di atas dan memungkinkan pengoptimalan baru.</p>
<p><strong>Pemberitahuan Peningkatan Penting</strong>: Streaming Node merupakan perubahan arsitektur yang signifikan, sehingga peningkatan langsung ke Milvus 2.6.0-rc1 dari versi sebelumnya tidak didukung.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus sebelumnya mengandalkan sistem eksternal seperti Kafka atau Pulsar untuk WAL-nya. Meskipun fungsional, sistem-sistem ini menambahkan kompleksitas operasional dan sumber daya yang signifikan, terutama untuk penerapan skala kecil hingga menengah. Di Milvus 2.6, semua itu digantikan oleh Woodpecker, sistem WAL yang dibuat khusus untuk cloud. Woodpecker dirancang untuk penyimpanan objek, mendukung mode zero-disk berbasis penyimpanan lokal dan objek, menyederhanakan operasi sekaligus meningkatkan kinerja dan skalabilitas.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Penggabungan DataNode dan IndexNode</h4><p>Dalam Milvus 2.6, tugas-tugas seperti pemadatan, impor massal, pengumpulan statistik, dan pembuatan indeks sekarang dikelola oleh penjadwal terpadu. Fungsi persistensi data yang sebelumnya ditangani oleh DataNode telah dipindahkan ke Streaming Node. Untuk menyederhanakan penerapan dan pemeliharaan, IndexNode dan DataNode telah digabungkan menjadi satu komponen DataNode. Node yang terkonsolidasi ini sekarang menjalankan semua tugas penting ini, mengurangi kompleksitas operasional dan mengoptimalkan pemanfaatan sumber daya.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Penggabungan Koordinator menjadi MixCoord</h4><p>Desain sebelumnya dengan modul RootCoord, QueryCoord, dan DataCoord yang terpisah memperkenalkan kompleksitas dalam komunikasi antar modul. Untuk menyederhanakan desain sistem, komponen-komponen ini telah digabungkan menjadi satu koordinator terpadu yang disebut MixCoord. Konsolidasi ini mengurangi kompleksitas pemrograman terdistribusi dengan mengganti komunikasi berbasis jaringan dengan panggilan fungsi internal, menghasilkan operasi sistem yang lebih efisien dan pengembangan dan pemeliharaan yang disederhanakan.</p>
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
    </button></h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Kuantisasi 1-bit RaBitQ</h4><p>Untuk menangani kumpulan data berskala besar, kuantisasi 1-bit merupakan teknik yang efektif untuk meningkatkan pemanfaatan sumber daya dan kinerja pencarian. Namun, metode tradisional dapat berdampak negatif pada daya ingat. Bekerja sama dengan penulis penelitian asli, Milvus 2.6 memperkenalkan RaBitQ, solusi kuantisasi 1-bit yang mempertahankan akurasi pencarian yang tinggi sekaligus memberikan manfaat sumber daya dan kinerja kompresi 1-bit.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/ivf-rabitq.md">IVF_RABITQ</a>.</p>
<h4 id="JSON-Capability-Enhancement" class="common-anchor-header">Peningkatan Kemampuan JSON</h4><p>Milvus 2.6 meningkatkan dukungannya terhadap tipe data JSON dengan peningkatan berikut ini:</p>
<ul>
<li><strong>Kinerja</strong>: Pengindeksan Jalur JSON sekarang secara resmi didukung, memungkinkan pembuatan indeks terbalik pada jalur tertentu dalam objek JSON (misalnya, <code translate="no">meta.user.location</code>). Hal ini untuk menghindari pemindaian objek secara penuh dan meningkatkan latensi kueri dengan filter yang kompleks.</li>
<li><strong>Fungsionalitas</strong>: Untuk mendukung logika pemfilteran yang lebih kompleks, rilis ini menambahkan dukungan untuk fungsi <code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_EXISTS</code>, <code translate="no">IS NULL</code>, dan <code translate="no">CAST</code>. Ke depannya, pekerjaan kami dalam dukungan JSON terus berlanjut. Kami sangat senang untuk mempratinjau bahwa rilis resmi yang akan datang akan menampilkan kemampuan yang lebih kuat, seperti penghancuran <strong>JSON</strong> dan <strong>Indeks JSON FLAT</strong>, yang dirancang untuk secara dramatis meningkatkan kinerja pada data JSON yang sangat bersarang.</li>
</ul>
<h4 id="AnalyzerTokenizer-Function-Enhancement" class="common-anchor-header">Peningkatan Fungsi Penganalisis/Tokenizer</h4><p>Rilis ini secara signifikan meningkatkan kemampuan pemrosesan teks dengan beberapa pembaruan pada Analyzer dan Tokenizer:</p>
<ul>
<li>Sintaks <a href="/docs/id/analyzer-overview.md#Example-use">Run Analyzer</a> baru tersedia untuk memvalidasi konfigurasi tokenizer.</li>
<li><a href="/docs/id/lindera-tokenizer.md">Tokenizer Lindera</a> diintegrasikan untuk meningkatkan dukungan terhadap bahasa-bahasa Asia seperti Jepang dan Korea.</li>
<li>Pemilihan tokenizer tingkat baris sekarang didukung, dengan <a href="/docs/id/icu-tokenizer.md">tokenizer ICU</a> tujuan umum yang tersedia sebagai cadangan untuk skenario multibahasa.</li>
</ul>
<h4 id="Data-in-Data-Out-with-Embedding-Functions" class="common-anchor-header">Data-in, Data-Out dengan Fungsi Penyematan</h4><p>Milvus 2.6 memperkenalkan kemampuan "Data-in, Data-Out" yang menyederhanakan pengembangan aplikasi AI dengan mengintegrasikan secara langsung dengan model penyematan pihak ketiga (misalnya, dari OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Pengguna sekarang dapat memasukkan dan membuat kueri menggunakan data teks mentah, dan Milvus akan secara otomatis memanggil layanan model yang ditentukan untuk mengubah teks menjadi vektor secara real-time. Hal ini menghilangkan kebutuhan akan pipa konversi vektor yang terpisah.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/embedding-function-overview.md">Ikhtisar Fungsi Penyisipan</a>.</p>
<h4 id="Phrase-Match" class="common-anchor-header">Pencocokan Frasa</h4><p>Pencocokan Frasa adalah fitur pencarian teks yang mengembalikan hasil hanya jika urutan kata yang tepat dalam kueri muncul secara berurutan dan dalam urutan yang benar dalam dokumen.</p>
<p><strong>Karakteristik Utama</strong>:</p>
<ul>
<li>Peka terhadap urutan: Kata-kata harus muncul dalam urutan yang sama seperti dalam kueri.</li>
<li>Kecocokan berurutan: Kata-kata harus muncul tepat di samping satu sama lain, kecuali jika nilai slop digunakan.</li>
<li>Slop (opsional): Parameter yang dapat disetel yang memungkinkan sejumlah kecil kata yang disisipkan, sehingga memungkinkan pencocokan frasa kabur.</li>
</ul>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/phrase-match.md">Pencocokan Frasa</a>.</p>
<h4 id="MinHash-LSH-Index-Beta" class="common-anchor-header">Indeks MinHash LSH (Beta)</h4><p>Untuk menjawab kebutuhan akan deduplikasi data dalam pelatihan model, Milvus 2.6 menambahkan dukungan untuk indeks MINHASH_LSH. Fitur ini menyediakan metode yang efisien secara komputasi dan terukur untuk memperkirakan kemiripan Jaccard antara dokumen untuk mengidentifikasi dokumen yang hampir sama. Pengguna dapat membuat tanda tangan MinHash untuk dokumen teks mereka selama prapemrosesan dan menggunakan indeks MINHASH_LSH di Milvus untuk secara efisien menemukan konten yang mirip dalam set data berskala besar, meningkatkan pembersihan data dan kualitas model.</p>
<h4 id="Time-Aware-Decay-Functions" class="common-anchor-header">Fungsi Peluruhan yang Sadar Waktu</h4><p>Milvus 2.6 memperkenalkan fungsi peluruhan yang sadar waktu untuk mengatasi skenario di mana nilai informasi berubah seiring waktu. Selama pemeringkatan ulang hasil, pengguna dapat menerapkan fungsi peluruhan eksponensial, Gaussian, atau linier berdasarkan bidang stempel waktu untuk menyesuaikan skor relevansi dokumen. Hal ini memastikan bahwa konten yang lebih baru dapat diprioritaskan, yang sangat penting untuk aplikasi seperti umpan berita, e-commerce, dan memori agen AI.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/decay-ranker-overview.md">Ikhtisar Pemeringkatan Peluruhan</a>.</p>
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Menambahkan Bidang untuk Evolusi Skema Online</h4><p>Untuk memberikan fleksibilitas skema yang lebih besar, Milvus 2.6 sekarang mendukung penambahan bidang skalar baru ke skema koleksi yang sudah ada secara online. Hal ini untuk menghindari kebutuhan untuk membuat koleksi baru dan melakukan migrasi data yang mengganggu ketika kebutuhan aplikasi berubah.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/add-fields-to-an-existing-collection.md">Menambahkan Field ke Koleksi yang Sudah Ada</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Dukungan Vektor INT8</h4><p>Menanggapi meningkatnya penggunaan model terkuantisasi yang menghasilkan penyematan bilangan bulat 8-bit, Milvus 2.6 menambahkan dukungan tipe data asli untuk vektor INT8. Hal ini memungkinkan pengguna untuk memasukkan vektor ini secara langsung tanpa melakukan de-quantization, sehingga menghemat komputasi, bandwidth jaringan, dan biaya penyimpanan. Fitur ini pada awalnya didukung untuk indeks keluarga HNSW.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/dense-vector.md">Vektor Padat</a>.</p>
