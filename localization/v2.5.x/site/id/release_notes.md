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
    </button></h1><p>Cari tahu apa yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug di setiap rilis. Anda dapat menemukan catatan rilis untuk setiap versi yang dirilis setelah v2.5.0 di bagian ini. Kami menyarankan agar Anda secara teratur mengunjungi halaman ini untuk mengetahui pembaruan.</p>
<h2 id="v254" class="common-anchor-header">v2.5.4<button data-href="#v254" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 23 Januari 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Kami sangat senang mengumumkan rilis Milvus 2.5.4, yang memperkenalkan pengoptimalan kinerja utama dan fitur-fitur baru seperti isolasi PartitionKey, Sparse Index dengan DAAT MaxScore, dan mekanisme penguncian yang disempurnakan. Sorotan yang menonjol dari rilis ini adalah dukungannya untuk 10.000 koleksi dan 1 juta partisi, yang menandai tonggak penting untuk kasus penggunaan multi-penyewa. Versi ini juga mengatasi beberapa bug yang meningkatkan stabilitas dan keandalan secara keseluruhan, dua bug kritis dapat menyebabkan kehilangan data. Kami mendorong Anda untuk meng-upgrade atau mencoba rilis terbaru ini, dan kami menantikan umpan balik Anda untuk membantu kami terus menyempurnakan Milvus!</p>
<h3 id="Features" class="common-anchor-header">Fitur</h3><ul>
<li>Mendukung isolasi PartitionKey untuk meningkatkan kinerja dengan beberapa kunci partisi<a href="https://github.com/milvus-io/milvus/pull/39245">(#39245</a>). Untuk informasi lebih lanjut, lihat <a href="/docs/id/use-partition-key.md">Gunakan Kunci Partisi</a>.</li>
<li>Sparse Index kini mendukung DAAT MaxScore <a href="https://github.com/milvus-io/knowhere/pull/1015">knowhere/#1015</a>. Untuk informasi lebih lanjut, lihat <a href="/docs/id/sparse_vector.md">Vektor Jarang</a>.</li>
<li>Menambahkan dukungan untuk <code translate="no">is_null</code> dalam ekspresi<a href="https://github.com/milvus-io/milvus/pull/38931">(#38931</a>)</li>
<li>Hak akses root dapat disesuaikan<a href="https://github.com/milvus-io/milvus/pull/39324">(#39324</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><ul>
<li>Mendukung 10 ribu koleksi dan 1 juta partisi dalam satu cluster<a href="https://github.com/milvus-io/milvus/pull/37630">(#37630</a>)</li>
<li>Informasi delta segmen yang di-cache untuk mempercepat Koordinator Kueri<a href="https://github.com/milvus-io/milvus/pull/39349">(#39349</a>)</li>
<li>Membaca metadata secara bersamaan di tingkat koleksi untuk mempercepat pemulihan kegagalan<a href="https://github.com/milvus-io/milvus/pull/38900">(#38900</a>)</li>
<li>Perincian kunci yang disempurnakan di QueryNode<a href="https://github.com/milvus-io/milvus/pull/39282">(#39282</a>),<a href="https://github.com/milvus-io/milvus/pull/38907">(#38907</a>)</li>
<li>Gaya terpadu dengan menggunakan CStatus untuk menangani panggilan CGO NewCollection<a href="https://github.com/milvus-io/milvus/pull/39303">(#39303</a>)</li>
<li>Melewatkan pembuatan pembatas partisi jika tidak ada partisi yang ditetapkan<a href="https://github.com/milvus-io/milvus/pull/38911">(#38911</a>)</li>
<li>Menambahkan lebih banyak dukungan RESTful API<a href="https://github.com/milvus-io/milvus/pull/38875">(#38875</a>)<a href="https://github.com/milvus-io/milvus/pull/39425">(#39425</a>)</li>
<li>Menghapus Bloom Filter yang tidak perlu di QueryNode dan DataNode untuk mengurangi penggunaan memori<a href="https://github.com/milvus-io/milvus/pull/38913">(#38913</a>)</li>
<li>Mempercepat pemuatan data dengan mempercepat pembuatan, penjadwalan, dan eksekusi tugas di QueryCoord<a href="https://github.com/milvus-io/milvus/pull/38905">(#38905</a>)</li>
<li>Mengurangi penguncian di DataCoord untuk mempercepat operasi pemuatan dan penyisipan<a href="https://github.com/milvus-io/milvus/pull/38904">(#38904</a>)</li>
<li>Menambahkan nama field utama di <code translate="no">SearchResult</code> dan <code translate="no">QueryResults</code> <a href="https://github.com/milvus-io/milvus/pull/39222">(#39222</a>)</li>
<li>Menggunakan ukuran binlog dan ukuran indeks sebagai standar pembatasan kuota disk<a href="https://github.com/milvus-io/milvus/pull/38844">(#38844</a>)</li>
<li>Penggunaan memori yang dioptimalkan untuk pencarian teks lengkap knowhere/#1011</li>
<li>Menambahkan kontrol versi untuk indeks skalar<a href="https://github.com/milvus-io/milvus/pull/39236">(#39236</a>)</li>
<li>Meningkatkan kecepatan pengambilan informasi koleksi dari RootCoord dengan menghindari salinan yang tidak perlu<a href="https://github.com/milvus-io/milvus/pull/38902">(#38902</a>)</li>
</ul>
<h3 id="Critial-Bug-fixs" class="common-anchor-header">Perbaikan Bug Penting</h3><ul>
<li>Memperbaiki kegagalan pencarian untuk kunci utama dengan indeks<a href="https://github.com/milvus-io/milvus/pull/39390">(#39390</a>)</li>
<li>Memperbaiki potensi masalah kehilangan data yang disebabkan oleh memulai ulang MixCoord dan melakukan pembilasan secara bersamaan<a href="https://github.com/milvus-io/milvus/pull/39422">(#39422</a>)</li>
<li>Memperbaiki kegagalan penghapusan yang dipicu oleh konkurensi yang tidak tepat antara tugas statistik dan pemadatan L0 setelah MixCoord dimulai ulang<a href="https://github.com/milvus-io/milvus/pull/39460">(#39460</a>)</li>
<li>Memperbaiki ketidakcocokan indeks terbalik skalar saat meningkatkan dari 2.4 ke 2.5<a href="https://github.com/milvus-io/milvus/pull/39272">(#39272</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki masalah kueri lambat yang disebabkan oleh perincian kunci kasar selama pemuatan multi-kolom<a href="https://github.com/milvus-io/milvus/pull/39255">(#39255</a>)</li>
<li>Memperbaiki masalah di mana penggunaan alias dapat menyebabkan iterator melintasi database yang salah<a href="https://github.com/milvus-io/milvus/pull/39248">(#39248</a>)</li>
<li>Memperbaiki kegagalan pembaruan grup sumber daya saat mengubah basis data<a href="https://github.com/milvus-io/milvus/pull/39356">(#39356</a>)</li>
<li>Memperbaiki masalah sporadis di mana indeks tantivy tidak dapat menghapus file indeks selama rilis<a href="https://github.com/milvus-io/milvus/pull/39434">(#39434</a>)</li>
<li>Memperbaiki pengindeksan lambat yang disebabkan oleh terlalu banyak utas<a href="https://github.com/milvus-io/milvus/pull/39341">(#39341</a>)</li>
<li>Memperbaiki masalah yang mencegah pemeriksaan kuota disk dilewati selama impor massal<a href="https://github.com/milvus-io/milvus/pull/39319">(#39319)</a></li>
<li>Menyelesaikan masalah pembekuan yang disebabkan oleh terlalu banyak konsumen antrean pesan dengan membatasi konkurensi<a href="https://github.com/milvus-io/milvus/pull/38915">(#38915</a>)</li>
<li>Memperbaiki batas waktu kueri yang disebabkan oleh MixCoord yang dimulai ulang selama pemadatan skala besar<a href="https://github.com/milvus-io/milvus/pull/38926">(#38926)</a></li>
<li>Memperbaiki masalah ketidakseimbangan saluran yang disebabkan oleh waktu henti node<a href="https://github.com/milvus-io/milvus/pull/39200">(#39200)</a></li>
<li>Memperbaiki masalah yang dapat menyebabkan keseimbangan saluran menjadi macet.<a href="https://github.com/milvus-io/milvus/pull/39160">(#39160</a>)</li>
<li>Memperbaiki masalah di mana pemeriksaan tingkat hak istimewa grup kustom RBAC menjadi tidak efektif<a href="https://github.com/milvus-io/milvus/pull/39224">(#39224</a>)</li>
<li>Memperbaiki kegagalan untuk mengambil jumlah baris dalam indeks kosong<a href="https://github.com/milvus-io/milvus/pull/39210">(#39210</a>)</li>
<li>Memperbaiki estimasi memori yang salah untuk segmen kecil<a href="https://github.com/milvus-io/milvus/pull/38909">(#38909</a>)</li>
</ul>
<h2 id="v253" class="common-anchor-header">v2.5.3<button data-href="#v253" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 13 Januari 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.3 memberikan perbaikan bug kritis dan peningkatan kinerja untuk meningkatkan stabilitas, keandalan, dan kegunaan secara keseluruhan. Versi ini menyempurnakan penanganan konkurensi, meningkatkan pengindeksan dan pengambilan data, dan memperbarui beberapa komponen utama untuk pengalaman pengguna yang lebih kuat.</p>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki masalah di mana menggunakan filter <code translate="no">IN</code> pada kunci utama <code translate="no">VARCHAR</code> dapat mengembalikan hasil yang kosong.<a href="https://github.com/milvus-io/milvus/pull/39108">(#39108</a>)</li>
<li>Memperbaiki masalah konkurensi antara operasi query dan delete yang dapat menyebabkan hasil yang salah.<a href="https://github.com/milvus-io/milvus/pull/39054">(#39054</a>)</li>
<li>Memperbaiki kegagalan yang disebabkan oleh pemfilteran berulang ketika <code translate="no">expr</code> kosong dalam permintaan kueri.<a href="https://github.com/milvus-io/milvus/pull/39034">(#39034</a>)</li>
<li>Memperbaiki masalah di mana kesalahan disk selama pembaruan konfigurasi menyebabkan penggunaan pengaturan konfigurasi default.<a href="https://github.com/milvus-io/milvus/pull/39072">(#39072</a>)</li>
<li>Memperbaiki potensi kehilangan data yang dihapus karena pemadatan clustering.<a href="https://github.com/milvus-io/milvus/pull/39133">(#39133</a>)</li>
<li>Memperbaiki kueri pencocokan teks yang rusak di segmen data yang sedang tumbuh.<a href="https://github.com/milvus-io/milvus/pull/39113">(#39113</a>)</li>
<li>Memperbaiki kegagalan pengambilan yang disebabkan oleh indeks yang tidak berisi data asli untuk vektor yang jarang.<a href="https://github.com/milvus-io/milvus/pull/39146">(#39146</a>)</li>
<li>Memperbaiki kemungkinan kondisi perlombaan bidang kolom yang disebabkan oleh kueri dan pemuatan data secara bersamaan.<a href="https://github.com/milvus-io/milvus/pull/39152">(#39152</a>)</li>
<li>Memperbaiki kegagalan penyisipan massal ketika bidang yang dapat dinullkan atau nilai_default tidak disertakan dalam data.<a href="https://github.com/milvus-io/milvus/pull/39111">(#39111</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><ul>
<li>Menambahkan API grup sumber daya untuk antarmuka RESTful.<a href="https://github.com/milvus-io/milvus/pull/39092">(#39092</a>)</li>
<li>Mengoptimalkan kinerja pengambilan dengan memanfaatkan metode bitset SIMD.<a href="https://github.com/milvus-io/milvus/pull/39041">(#39041</a>)</li>
<li>Menggunakan stempel waktu MVCC sebagai stempel waktu jaminan saat ditentukan.<a href="https://github.com/milvus-io/milvus/pull/39019">(#39019</a>)</li>
<li>Menambahkan metrik penghapusan yang hilang.<a href="https://github.com/milvus-io/milvus/pull/38747">(#38747</a>)</li>
<li>Memperbarui Etcd ke versi v3.5.16.<a href="https://github.com/milvus-io/milvus/pull/38969">(#38969</a>)</li>
<li>Membuat paket Go baru untuk mengelola protos.<a href="https://github.com/milvus-io/milvus/pull/39128">(#39128</a>)</li>
</ul>
<h2 id="v252" class="common-anchor-header">v2.5.2<button data-href="#v252" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 3 Januari 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.2</td><td>2.5.3</td><td>2.5.3</td><td>2.5.3</td></tr>
</tbody>
</table>
<p>Milvus 2.5.2 mendukung modifikasi panjang maksimum untuk kolom VARCHAR dan menyelesaikan beberapa masalah kritis yang berkaitan dengan konkurensi, partisi drop, dan penanganan statistik BM25 selama impor. Kami sangat menyarankan untuk melakukan upgrade ke versi ini untuk meningkatkan stabilitas dan performa.</p>
<h3 id="Improvements" class="common-anchor-header">Peningkatan</h3><ul>
<li>Menghasilkan log penggunaan disk hanya jika jalur yang ditentukan tidak ada.<a href="https://github.com/milvus-io/milvus/pull/38822">(#38822</a>)</li>
<li>Menambahkan parameter untuk menyetel panjang VARCHAR maksimum dan mengembalikan batasnya ke 65.535.<a href="https://github.com/milvus-io/milvus/pull/38883">(#38883</a>)</li>
<li>Mendukung konversi tipe parameter untuk ekspresi.<a href="https://github.com/milvus-io/milvus/pull/38782">(#38782</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki potensi kebuntuan dalam skenario konkurensi.<a href="https://github.com/milvus-io/milvus/pull/38863">(#38863</a>)</li>
<li>Menghasilkan file index_null_offset hanya untuk bidang yang mendukung nilai nol.<a href="https://github.com/milvus-io/milvus/pull/38834">(#38834</a>)</li>
<li>Memperbaiki penggunaan paket retrieve setelah bebas dalam fase pengurangan.<a href="https://github.com/milvus-io/milvus/pull/38841">(#38841</a>)</li>
<li>Mengenali ekspresi dengan huruf besar AND dan OR.<a href="https://github.com/milvus-io/milvus/pull/38928">(#38928</a>)</li>
<li>Mengizinkan penurunan partisi yang berhasil meskipun pemuatan gagal.<a href="https://github.com/milvus-io/milvus/pull/38874">(#38874</a>)</li>
<li>Memperbaiki masalah registrasi file statistik BM25 selama impor.<a href="https://github.com/milvus-io/milvus/pull/38881">(#38881</a>)</li>
</ul>
<h2 id="v251" class="common-anchor-header">v2.5.1<button data-href="#v251" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 26 Desember 2024</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.1 berfokus pada serangkaian perbaikan bug yang menangani pemuatan memori, daftar RBAC, penyeimbangan simpul kueri, dan pengindeksan segmen tersegel, sementara juga meningkatkan UI Web dan penyadap. Kami sangat menyarankan untuk meningkatkan ke 2.5.1 untuk meningkatkan stabilitas dan keandalan.</p>
<h3 id="Improvement" class="common-anchor-header">Peningkatan</h3><ul>
<li>Memperbarui halaman koleksi dan kueri UI web.<a href="https://github.com/milvus-io/milvus/pull/38701">(#38701</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki masalah OOM dengan menambahkan faktor memori untuk estimasi pemuatan.<a href="https://github.com/milvus-io/milvus/pull/38722">(#38722</a>)</li>
<li>Memperbaiki perluasan grup hak istimewa saat mencantumkan kebijakan di RootCoord.<a href="https://github.com/milvus-io/milvus/pull/38760">(#38760</a>)</li>
<li>Memperbaiki masalah dengan daftar grup hak istimewa dan koleksi.<a href="https://github.com/milvus-io/milvus/pull/38738">(#38738</a>)</li>
<li>Memperbaiki penyeimbang untuk menghindari kelebihan beban berulang kali pada simpul kueri yang sama.<a href="https://github.com/milvus-io/milvus/pull/38724">(#38724</a>)</li>
<li>Memperbaiki tugas keseimbangan yang tidak terduga yang dipicu setelah QueryCoord dimulai ulang.<a href="https://github.com/milvus-io/milvus/pull/38725">(#38725</a>)</li>
<li>Memperbaiki pembaruan konfigurasi beban yang tidak berlaku untuk memuat koleksi.<a href="https://github.com/milvus-io/milvus/pull/38737">(#38737</a>)</li>
<li>Memperbaiki jumlah pembacaan nol selama impor data.<a href="https://github.com/milvus-io/milvus/pull/38695">(#38695</a>)</li>
<li>Memperbaiki decoding Unicode untuk kunci JSON dalam ekspresi.<a href="https://github.com/milvus-io/milvus/pull/38653">(#38653</a>)</li>
<li>Memperbaiki nama DB pencegat untuk alterCollectionField di 2.5. <a href="https://github.com/milvus-io/milvus/pull/38663">(#38663</a>)</li>
<li>Memperbaiki parameter indeks kosong untuk segmen yang disegel saat menggunakan pencarian brute force BM25.<a href="https://github.com/milvus-io/milvus/pull/38752">(#38752</a>)</li>
</ul>
<h2 id="v250" class="common-anchor-header">v2.5.0<button data-href="#v250" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 23 Desember 2024</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.0</td><td>2.5.1</td><td>2.5.2</td><td>2.5.2</td></tr>
</tbody>
</table>
<p>Milvus 2.5.0 membawa kemajuan yang signifikan untuk meningkatkan kegunaan, skalabilitas, dan kinerja bagi pengguna yang berurusan dengan pencarian vektor dan manajemen data berskala besar. Dengan rilis ini, Milvus mengintegrasikan fitur-fitur baru yang kuat seperti pencarian berbasis istilah, pemadatan klaster untuk kueri yang dioptimalkan, dan dukungan serbaguna untuk metode pencarian vektor yang jarang dan padat. Peningkatan dalam manajemen klaster, pengindeksan, dan penanganan data memperkenalkan tingkat fleksibilitas dan kemudahan penggunaan yang baru, membuat Milvus menjadi basis data vektor yang lebih kuat dan mudah digunakan.</p>
<h3 id="Key-Features" class="common-anchor-header">Fitur Utama</h3><h4 id="Full-Text-Search" class="common-anchor-header">Pencarian Teks Lengkap</h4><p>Milvus 2.5 mendukung pencarian teks lengkap yang diimplementasikan dengan Sparse-BM25! Fitur ini merupakan pelengkap penting bagi kemampuan pencarian semantik Milvus yang kuat, terutama dalam skenario yang melibatkan kata-kata langka atau istilah teknis. Pada versi sebelumnya, Milvus mendukung vektor jarang untuk membantu skenario pencarian kata kunci. Vektor-vektor jarang ini dihasilkan di luar Milvus oleh model neural seperti SPLADEv2/BGE-M3 atau model statistik seperti algoritma BM25.</p>
<p>Didukung oleh <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus 2.5 memiliki analisis bawaan dan ekstraksi vektor jarang, memperluas API dari hanya menerima vektor sebagai input menjadi menerima teks secara langsung. Informasi statistik BM25 diperbarui secara real time saat data dimasukkan, sehingga meningkatkan kegunaan dan akurasi. Selain itu, vektor yang jarang berdasarkan algoritma perkiraan tetangga terdekat (ANN) menawarkan kinerja yang lebih kuat daripada sistem pencarian kata kunci standar.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md">Ikhtisar Penganalisis</a> dan <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
<h4 id="Cluster-Management-WebUI-Beta" class="common-anchor-header">WebUI Manajemen Klaster (Beta)</h4><p>Untuk mendukung data yang sangat besar dan fitur yang kaya dengan lebih baik, desain Milvus yang canggih mencakup berbagai ketergantungan, banyak peran node, struktur data yang kompleks, dan banyak lagi. Aspek-aspek ini dapat menimbulkan tantangan untuk penggunaan dan pemeliharaan.</p>
<p>Milvus 2.5 memperkenalkan Cluster Management WebUI bawaan, mengurangi kesulitan pemeliharaan sistem dengan memvisualisasikan informasi lingkungan runtime Milvus yang kompleks. Ini termasuk rincian database dan koleksi, segmen, saluran, ketergantungan, status kesehatan node, informasi tugas, kueri yang lambat, dan banyak lagi.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/milvus-webui.md">Milvus WebUI</a>.</p>
<h4 id="Text-Match" class="common-anchor-header">Pencocokan Teks</h4><p>Milvus 2.5 memanfaatkan penganalisis dan pengindeksan dari <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> untuk prapemrosesan teks dan pembuatan indeks, yang mendukung pencocokan bahasa alami yang tepat untuk data teks berdasarkan istilah-istilah tertentu. Fitur ini terutama digunakan untuk pencarian yang difilter untuk memenuhi kondisi tertentu dan dapat menggabungkan pemfilteran skalar untuk menyempurnakan hasil kueri, sehingga memungkinkan pencarian kemiripan dalam vektor yang memenuhi kriteria skalar.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/analyzer-overview.md">Ikhtisar Penganalisis</a> dan <a href="/docs/id/keyword-match.md">Pencocokan Teks</a>.</p>
<h4 id="Bitmap-Index" class="common-anchor-header">Indeks Bitmap</h4><p>Indeks data skalar baru telah ditambahkan ke keluarga Milvus. Indeks BitMap menggunakan larik bit, yang panjangnya sama dengan jumlah baris, untuk merepresentasikan keberadaan nilai dan mempercepat pencarian.</p>
<p>Indeks Bitmap secara tradisional efektif untuk bidang dengan kardinalitas rendah, yang memiliki sejumlah kecil nilai yang berbeda-misalnya, kolom yang berisi informasi jenis kelamin dengan hanya dua nilai yang mungkin: laki-laki dan perempuan.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/bitmap.md">Indeks Bitmap</a>.</p>
<h4 id="Nullable--Default-Value" class="common-anchor-header">Nilai yang Dapat Dinolkan &amp; Nilai Default</h4><p>Milvus sekarang mendukung pengaturan properti nullable dan nilai default untuk field skalar selain field kunci utama. Untuk field skalar yang ditandai sebagai <code translate="no">nullable=True</code>, pengguna dapat menghilangkan field tersebut ketika memasukkan data; sistem akan memperlakukannya sebagai nilai null atau nilai default (jika diatur) tanpa memberikan kesalahan.</p>
<p>Nilai default dan properti yang dapat dinolkan memberikan fleksibilitas yang lebih besar untuk Milvus. Pengguna dapat menggunakan fitur ini untuk field dengan nilai yang tidak pasti ketika membuat koleksi. Fitur ini juga menyederhanakan migrasi data dari sistem basis data lain ke Milvus, yang memungkinkan untuk menangani kumpulan data yang mengandung nilai null dengan tetap mempertahankan pengaturan nilai default yang asli.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/nullable-and-default.md">Nilai Nullable &amp; Default</a>.</p>
<h4 id="Faiss-based-HNSW-SQPQPRQ" class="common-anchor-header">HNSW SQ/PQ/PRQ berbasis Faiss</h4><p>Melalui kolaborasi erat dengan komunitas Faiss, algoritme HNSW di Faiss telah mengalami peningkatan yang signifikan dalam hal fungsionalitas dan kinerja. Untuk pertimbangan stabilitas dan pemeliharaan, Milvus 2.5 telah secara resmi memigrasikan dukungannya untuk HNSW dari hnswlib ke Faiss.</p>
<p>Berdasarkan Faiss, Milvus 2.5 mendukung berbagai metode kuantisasi pada HNSW untuk memenuhi kebutuhan skenario yang berbeda: SQ (Pengukur Skalar), PQ (Pengukur Produk), dan PRQ (Pengukur Sisa Produk). SQ dan PQ lebih umum digunakan; SQ memberikan kinerja kueri yang baik dan kecepatan pembuatan, sementara PQ menawarkan penarikan yang lebih baik pada rasio kompresi yang sama. Banyak basis data vektor biasanya menggunakan kuantisasi biner, yang merupakan bentuk sederhana dari kuantisasi SQ.</p>
<p>PRQ adalah perpaduan antara PQ dan AQ (Additive Quantizer). Dibandingkan dengan PQ, PRQ membutuhkan waktu pembuatan yang lebih lama untuk menghasilkan penarikan yang lebih baik, terutama pada tingkat kompresi yang tinggi, dengan kata lain kompresi biner.</p>
<h4 id="Clustering-Compaction-Beta" class="common-anchor-header">Pemadatan Pengelompokan (Beta)</h4><p>Milvus 2.5 memperkenalkan Pemadatan Clustering untuk mempercepat pencarian dan mengurangi biaya dalam koleksi yang besar. Dengan menentukan bidang skalar sebagai kunci pengelompokan, data didistribusikan kembali berdasarkan rentang untuk mengoptimalkan penyimpanan dan pengambilan. Bertindak seperti indeks global, fitur ini memungkinkan Milvus memangkas data secara efisien selama kueri berdasarkan metadata pengelompokan, sehingga meningkatkan kinerja pencarian ketika filter skalar diterapkan.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/clustering-compaction.md">Pemadatan Klaster</a>.</p>
<h3 id="Other-Features" class="common-anchor-header">Fitur Lainnya</h3><h4 id="Streaming-Node-Beta" class="common-anchor-header">Streaming Node (Beta)</h4><p>Milvus 2.5 memperkenalkan komponen baru yang disebut streaming node, yang menyediakan layanan Write-Ahead Logging (WAL). Hal ini memungkinkan Milvus untuk mencapai konsensus sebelum dan sesudah membaca dan menulis saluran, membuka fitur, fungsi, dan pengoptimalan baru. Fitur ini dinonaktifkan secara default pada Milvus 2.5 dan akan tersedia secara resmi pada versi 3.0.</p>
<h4 id="IPv6-Support" class="common-anchor-header">Dukungan IPv6</h4><p>Milvus sekarang mendukung IPv6, yang memungkinkan konektivitas dan kompatibilitas jaringan yang lebih luas.</p>
<h4 id="CSV-Bulk-Import" class="common-anchor-header">Impor Massal CSV</h4><p>Selain format JSON dan Parquet, Milvus sekarang mendukung impor data secara langsung dalam format CSV.</p>
<h4 id="Expression-Templates-for-Query-Acceleration" class="common-anchor-header">Templat Ekspresi untuk Akselerasi Kueri</h4><p>Milvus sekarang mendukung templat ekspresi, meningkatkan efisiensi penguraian ekspresi, terutama dalam skenario dengan ekspresi yang kompleks.</p>
<p>Untuk detailnya, lihat <a href="/docs/id/filtering-templating.md">Templat Filter</a>.</p>
<h4 id="GroupBy-Enhancements" class="common-anchor-header">Penyempurnaan Berdasarkan Grup</h4><ul>
<li><strong>Ukuran Grup</strong> yang dapat<strong>disesuaikan</strong>: Menambahkan dukungan untuk menentukan jumlah entri yang dikembalikan untuk setiap grup.</li>
<li><strong>Pencarian GroupBy Hybrid</strong>: Mendukung pencarian GroupBy hybrid berdasarkan beberapa kolom vektor.</li>
</ul>
<h4 id="Iterator-Enhancements" class="common-anchor-header">Peningkatan Iterator</h4><ul>
<li><strong>Dukungan MVCC</strong>: Pengguna kini dapat menggunakan iterator tanpa terpengaruh oleh perubahan data berikutnya seperti penyisipan dan penghapusan, berkat Kontrol Konkurensi Multi-Versi (MVCC).</li>
<li><strong>Kursor Persisten</strong>: Milvus sekarang mendukung kursor persisten untuk QueryIterator, sehingga pengguna dapat melanjutkan iterasi dari posisi terakhir setelah Milvus dimulai ulang tanpa perlu memulai ulang seluruh proses iterasi.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Peningkatan</h3><h4 id="Deletion-Optimization" class="common-anchor-header">Optimalisasi Penghapusan</h4><p>Meningkatkan kecepatan dan mengurangi penggunaan memori untuk penghapusan berskala besar dengan mengoptimalkan penggunaan kunci dan manajemen memori.</p>
<h4 id="Dependencies-Upgrade" class="common-anchor-header">Peningkatan Ketergantungan</h4><p>Peningkatan ke ETCD 3.5.16 dan Pulsar 3.0.7 LTS, memperbaiki CVE yang ada dan meningkatkan keamanan. Catatan: Upgrade ke Pulsar 3.x tidak kompatibel dengan versi 2.x sebelumnya.</p>
<p>Untuk pengguna yang sudah memiliki penerapan Milvus yang berfungsi, Anda perlu mengupgrade komponen ETCD dan Pulsar sebelum dapat menggunakan fitur dan fungsi baru. Untuk detailnya, lihat <a href="/docs/id/upgrade-pulsar-v3.md">Meningkatkan Pulsar dari 2.x ke 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Penyimpanan Lokal V2</h4><p>Memperkenalkan format file lokal baru di Milvus 2.5, meningkatkan efisiensi pemuatan dan kueri untuk data skalar, mengurangi overhead memori, dan meletakkan dasar untuk pengoptimalan di masa mendatang.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Pengoptimalan Penguraian Ekspresi</h4><p>Penguraian ekspresi yang lebih baik dengan mengimplementasikan caching untuk ekspresi yang diulang, meningkatkan ANTLR, dan mengoptimalkan kinerja klausa <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Peningkatan Kinerja Konkurensi DDL</h4><p>Mengoptimalkan kinerja konkurensi operasi Data Definition Language (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Penyelarasan Fitur API RESTful</h4><p>Menyelaraskan fungsionalitas RESTful API dengan SDK lain untuk konsistensi.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Pembaruan Keamanan &amp; Konfigurasi</h4><p>TLS yang didukung untuk mengamankan komunikasi antar-simpul di lingkungan yang lebih kompleks atau lingkungan perusahaan. Untuk detailnya, lihat <a href="/docs/id/tls.md">Konfigurasi Keamanan</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Peningkatan Kinerja Pemadatan</h4><p>Menghapus batasan segmen maksimum dalam pemadatan campuran dan sekarang memprioritaskan segmen yang lebih kecil terlebih dahulu, meningkatkan efisiensi dan mempercepat kueri pada set data yang besar atau terfragmentasi.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Penyeimbangan Saluran Berbasis Skor</h4><p>Memperkenalkan kebijakan yang secara dinamis menyeimbangkan beban di seluruh saluran, meningkatkan pemanfaatan sumber daya dan stabilitas secara keseluruhan dalam penerapan skala besar.</p>
