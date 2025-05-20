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
    </button></h1><p>Cari tahu apa yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug di setiap rilis. Anda dapat menemukan catatan rilis untuk setiap versi yang dirilis setelah v2.5.0 di bagian ini. Kami menyarankan agar Anda secara teratur mengunjungi halaman ini untuk mempelajari tentang pembaruan.</p>
<h2 id="v2511" class="common-anchor-header">v2.5.11<button data-href="#v2511" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.11</td><td>2.5.8</td><td>2.5.8</td><td>2.5.8</td></tr>
</tbody>
</table>
<p>Kami sangat senang mengumumkan peluncuran Milvus 2.5.11! Versi ini memperkenalkan fitur-fitur baru yang hebat seperti kemampuan multi-analyzer dan dukungan tokenizer yang diperluas (Jieba, Lindera, ICU, Pengenal Bahasa). Kami juga telah melakukan beberapa peningkatan, termasuk pembaruan kumpulan thread pemuatan segmen dinamis dan pemfilteran hapus yang dioptimalkan selama impor binlog. Perbaikan bug utama mengatasi potensi masalah penurunan segmen, kegagalan pencarian BM25, dan kesalahan pemfilteran statistik JSON.</p>
<p>Kami menyarankan Anda untuk meningkatkan ke 2.5.11 untuk memanfaatkan peningkatan dan perbaikan ini!</p>
<h3 id="Features" class="common-anchor-header">Fitur</h3><ul>
<li>Menambahkan kemampuan untuk mengonfigurasi beberapa penganalisis (tokenizer) untuk dukungan multi bahasa dan memilih yang sesuai berdasarkan instruksi dari data input<a href="https://github.com/milvus-io/milvus/pull/41444">(#41444</a>).</li>
<li>Meningkatkan fungsionalitas BM25 Analyzer<a href="https://github.com/milvus-io/milvus/pull/41456">(#41456</a>).<ul>
<li>Memperkenalkan API <code translate="no">run_analyzer</code> untuk uji coba untuk membantu menganalisis hasil tokenisasi. Untuk informasi lebih lanjut, lihat <a href="/docs/id/analyzer-overview.md">Ikhtisar Penganalisis</a>.</li>
<li>Pembuat Token<ul>
<li>Menambahkan dukungan untuk menyesuaikan parameter tokenizer Jieba.</li>
<li>Menambahkan dukungan untuk tokenizer Lindera. Untuk informasi lebih lanjut, lihat <a href="/docs/id/lindera-tokenizer.md">Lindera</a>.</li>
<li>Menambahkan dukungan untuk tokenizer ICU. Untuk informasi lebih lanjut, lihat <a href="/docs/id/icu-tokenizer.md">ICU</a>.</li>
<li>Menambahkan tokenizer Pengenal Bahasa untuk deteksi bahasa.</li>
</ul></li>
<li>Filter<ul>
<li>Dukungan bahasa yang diperluas untuk filter kata henti bawaan. Untuk informasi lebih lanjut, lihat <a href="/docs/id/stop-filter.md">Berhenti</a>.</li>
<li>Menambahkan filter <code translate="no">remove_punct</code> untuk menghapus tanda baca. Untuk informasi lebih lanjut, lihat <a href="/docs/id/removepunct-filter.md">Hapus</a> Tanda Baca.</li>
<li>Menambahkan filter <code translate="no">regex</code> untuk pemfilteran teks berbasis pola. Untuk informasi lebih lanjut, lihat <a href="/docs/id/regex-filter.md">Regex</a>.</li>
</ul></li>
</ul></li>
<li>Menambahkan dukungan untuk memodifikasi kapasitas maksimum bidang larik<a href="https://github.com/milvus-io/milvus/pull/41406">(#41406</a>)<a href="https://github.com/milvus-io/milvus/pull/41406">.</a></li>
<li>Menambahkan dukungan untuk ekspresi rentang biner dalam indeks jalur JSON<a href="https://github.com/milvus-io/milvus/pull/41317">(#41317)</a>.</li>
<li>Menambahkan dukungan untuk jenis pencocokan infiks dan sufiks dalam statistik JSON<a href="https://github.com/milvus-io/milvus/pull/41388">(#41388)</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Peningkatan</h3><ul>
<li>Mengaktifkan pembaruan dinamis pada ukuran kumpulan utas pemuatan Segmen<a href="https://github.com/milvus-io/milvus/pull/41549">(#41549).</a></li>
<li>Pemfilteran hapus yang dipercepat selama impor binlog<a href="https://github.com/milvus-io/milvus/pull/41552">(#41552)</a>.</li>
<li>Menambahkan parameter pemantauan untuk rasio filter ekspresi<a href="https://github.com/milvus-io/milvus/pull/41403">(#41403).</a></li>
<li>Menambahkan opsi konfigurasi untuk memaksa membangun ulang indeks ke versi terbaru<a href="https://github.com/milvus-io/milvus/pull/41432">(#41432).</a></li>
<li>Memperbaiki pesan log kesalahan untuk kebijakan daftar<a href="https://github.com/milvus-io/milvus/pull/41368">(#41368).</a></li>
<li>Penanganan yang disesuaikan untuk tanda hubung di header metadata gRPC<a href="https://github.com/milvus-io/milvus/pull/41372">(#41372).</a></li>
<li>Meningkatkan versi Go ke 1.24.1 untuk mengatasi CVE<a href="https://github.com/milvus-io/milvus/pull/41522">(#41522</a>, <a href="https://github.com/milvus-io/milvus/pull/41319">#41319</a>).</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki masalah di mana segmen mungkin tidak dijatuhkan dengan benar saat menjatuhkan partisi<a href="https://github.com/milvus-io/milvus/pull/41543">(#41543</a>)<a href="https://github.com/milvus-io/milvus/pull/41543">.</a></li>
<li>Memperbaiki penyisipan massal untuk menggunakan daftar bidang input dari function runner, bukan daftar bidang skema<a href="https://github.com/milvus-io/milvus/pull/41561">(#41561).</a></li>
<li>Memperbaiki kegagalan pencarian BM25 yang terjadi ketika <code translate="no">avgdl</code> (panjang dokumen rata-rata) adalah NaN<a href="https://github.com/milvus-io/milvus/pull/41503">(#41503</a>)<a href="https://github.com/milvus-io/milvus/pull/41503">.</a></li>
<li>Memperbaiki label yang tidak akurat di metrik QueryNode<a href="https://github.com/milvus-io/milvus/pull/41422">(#41422)</a>.</li>
<li>Memperbaiki masalah di mana pembuatan indeks statistik JSON dapat gagal jika data berisi peta kosong<a href="https://github.com/milvus-io/milvus/pull/41506">(#41506).</a></li>
<li>Memperbaiki API <code translate="no">AlterCollection</code> untuk menyimpan stempel waktu modifikasi dengan benar<a href="https://github.com/milvus-io/milvus/pull/41469">(#41469).</a></li>
<li>Memperbaiki kesalahan pemfilteran yang terputus-putus pada statistik JSON di <code translate="no">ConjunctExpr</code> dan meningkatkan logika penghitungan slot tugas untuk mempercepat pembuatan statistik JSON<a href="https://github.com/milvus-io/milvus/pull/41458">(#41458).</a></li>
<li>Memperbaiki kebocoran oracle IDF dalam penghitungan statistik BM25<a href="https://github.com/milvus-io/milvus/pull/41426">(#41426)</a>.</li>
<li>Memastikan topik yang telah dibuat sebelumnya diperiksa terlebih dahulu selama validasi nomor pecahan<a href="https://github.com/milvus-io/milvus/pull/41421">(#41421).</a></li>
<li>Memperbaiki laporan kebuntuan yang salah yang terjadi pada unit test<a href="https://github.com/milvus-io/milvus/pull/41377">(#41377).</a></li>
</ul>
<h2 id="v2510" class="common-anchor-header">v2.5.10<button data-href="#v2510" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 21 April 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.10</td><td>2.5.6</td><td>2.5.8</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Milvus 2.5.10 memberikan peningkatan kinerja pencarian dan pemuatan, pelaporan metrik yang lebih baik, dan dukungan SVE yang diperluas untuk komputasi metrik yang dipercepat. Rilis ini juga mencakup beberapa perbaikan bug yang meningkatkan stabilitas dan ketepatan. Kami mendorong Anda untuk meng-upgrade atau mencobanya-umpan balik Anda sangat berharga dalam membantu kami membuat Milvus menjadi lebih baik!</p>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><ul>
<li>Abaikan metrik indeks pelaporan untuk indeks yang tidak ada<a href="https://github.com/milvus-io/milvus/pull/41296">(#41296</a>)</li>
<li>Gunakan mode pemindaian untuk LIKE bahkan ketika ada indeks terbalik<a href="https://github.com/milvus-io/milvus/pull/41309">(#41309</a>)</li>
<li>Mengoptimalkan kinerja untuk ekspresi SUKA<a href="https://github.com/milvus-io/milvus/pull/41222">(#41222)</a></li>
<li>Mengoptimalkan format indeks untuk meningkatkan kinerja pemuatan<a href="https://github.com/milvus-io/milvus/pull/41041">(#41041</a>)</li>
<li>RESTful: membuat batas waktu default dapat dikonfigurasi<a href="https://github.com/milvus-io/milvus/pull/41225">(#41225</a>)</li>
<li>Mengaktifkan dukungan SVE untuk komputasi metrik L2 dalam fungsi FP16 / NY<a href="https://github.com/zilliztech/knowhere/pull/1134">(knowhere #1134</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki indeks JSON yang tidak berfungsi untuk filter string<a href="https://github.com/milvus-io/milvus/pull/41383">(#41383</a>)</li>
<li>Lewati pemeriksaan dimensi untuk bidang non-vektor dalam pemeriksaan awal<a href="https://github.com/milvus-io/milvus/pull/41329">(#41329)</a></li>
<li>Alter collection sekarang memperbarui skema dengan benar<a href="https://github.com/milvus-io/milvus/pull/41308">(#41308</a>)</li>
<li>Perbarui versi knowhere untuk memperbaiki build macOS<a href="https://github.com/milvus-io/milvus/pull/41315">(#41315</a>)</li>
<li>Mencegah kepanikan saat mendaftarkan indeks sebelum inisialisasi indeks segmen selesai<a href="https://github.com/milvus-io/milvus/pull/41299">(#41299</a>)</li>
<li>Mengatasi regresi kinerja dengan mengubah level log<a href="https://github.com/milvus-io/milvus/pull/41269">(#41269</a>)</li>
<li>Tutup klien sebelum menghapus klien pekerja<a href="https://github.com/milvus-io/milvus/pull/41254">(#41254</a>)</li>
</ul>
<h2 id="v259" class="common-anchor-header">v2.5.9<button data-href="#v259" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 11 April 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.9</td><td>2.5.6</td><td>2.5.7</td><td>2.5.7</td></tr>
</tbody>
</table>
<p>Kami sangat senang mengumumkan Milvus 2.5.9, yang membawa peningkatan kinerja untuk statistik kunci JSON, kemampuan pengindeksan yang lebih baik, dan beberapa perbaikan bug penting yang meningkatkan stabilitas dan penanganan data. Kami mendorong Anda untuk meng-upgrade atau mencoba versi ini, dan seperti biasa, umpan balik Anda sangat kami hargai karena kami terus menyempurnakan Milvus.</p>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><ul>
<li>Mendukung normalisasi skor lompatan untuk perangkingan ulang berbobot<a href="https://github.com/milvus-io/milvus/pull/40905">(#40905</a>)</li>
<li>Meningkatkan performa pembuatan statistik kunci JSON dengan menambahkan dokumen secara berkelompok<a href="https://github.com/milvus-io/milvus/pull/40898">(#40898</a>)</li>
<li>Gunakan <code translate="no">int32</code> saat membuat indeks larik untuk tipe elemen <code translate="no">int8</code>/<code translate="no">int16</code> <a href="https://github.com/milvus-io/milvus/pull/41186">(#41186</a>)</li>
<li>Menyelaraskan hasil pencarian brute-force dengan perilaku indeks JSON untuk ekspresi <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41056">(#41056</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki masalah yang menyebabkan kebingungan traceID jika klien mengirim traceID<a href="https://github.com/milvus-io/milvus/pull/41149">(#41149</a>)</li>
<li>Memperbaiki potensi kerusakan karena penggunaan <code translate="no">noexcept</code> yang salah, yang menyebabkan kegagalan IO<a href="https://github.com/milvus-io/milvus/pull/41221">(#41221</a>)</li>
<li>Menyelesaikan loop saldo normal tak terbatas yang dipicu setelah penangguhan saldo<a href="https://github.com/milvus-io/milvus/pull/41196">(#41196</a>)</li>
<li>Tampilkan koleksi sekarang mendukung objek yang diberikan ke grup hak istimewa khusus<a href="https://github.com/milvus-io/milvus/pull/41204">(#41204</a>)</li>
<li>Memperbaiki kegagalan untuk mengambil posisi saluran replikasi<a href="https://github.com/milvus-io/milvus/pull/41189">(#41189</a>)</li>
<li>Memperbaiki potensi kebocoran thread yang disebabkan oleh batas waktu RESTful<a href="https://github.com/milvus-io/milvus/pull/41184">(#41184</a>)</li>
<li>Menambahkan bitmap yang jelas untuk mode lompatan batch<a href="https://github.com/milvus-io/milvus/pull/41165">(#41165</a>)</li>
<li>Memperbaiki masalah di mana menghapus tipe indeks gagal dalam penyimpanan jarak jauh mode lokal<a href="https://github.com/milvus-io/milvus/pull/41163">(#41163</a>)</li>
<li>Gunakan <code translate="no">element_type</code> untuk operator array <code translate="no">isNull</code> <a href="https://github.com/milvus-io/milvus/pull/41158">(#41158</a>)</li>
<li>Menghapus pengaturan ulang metrik untuk memastikan pelaporan yang akurat<a href="https://github.com/milvus-io/milvus/pull/41081">(#41081</a>)</li>
<li>Memperbaiki bug yang mencegah data <code translate="no">null</code> disaring oleh ekspresi <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/41135">(#41135</a>)</li>
<li>Mengabaikan segmen yang sedang berkembang tanpa posisi awal untuk kebijakan segel<a href="https://github.com/milvus-io/milvus/pull/41131">(#41131)</a></li>
<li>Menghindari memperbarui permintaan pencarian/kueri asli selama percobaan ulang<a href="https://github.com/milvus-io/milvus/pull/41127">(#41127</a>)</li>
<li>Memperbaiki kesalahan segmentasi jika <code translate="no">LoadArrowReaderFromRemote</code> berjalan di jalur pengecualian<a href="https://github.com/milvus-io/milvus/pull/41071">(#41071</a>)</li>
<li>Mengatasi masalah saldo manual dan pemeriksaan saldo<a href="https://github.com/milvus-io/milvus/pull/41038">(#41038</a>)</li>
<li>Skema yang divalidasi tidak <code translate="no">nil</code> untuk statistik JSON dengan lazy <code translate="no">DescribeCollection</code> <a href="https://github.com/milvus-io/milvus/pull/41068">(#41068</a>)</li>
<li>Memperbaiki bug pergerakan kursor saat membandingkan dua kolom<a href="https://github.com/milvus-io/milvus/pull/41054">(#41054</a>)</li>
<li>Mengatasi kerusakan saat memasukkan array <code translate="no">null</code> dan non-null dengan mmap yang sedang terbuka<a href="https://github.com/milvus-io/milvus/pull/41052">(#41052)</a></li>
<li>Memperbaiki masalah kompilasi arm64<a href="https://github.com/milvus-io/milvus/pull/41058">(#41058</a>)</li>
<li>Menambahkan mode bypass thread pool untuk menghindari pemblokiran operasi sisipan/muat dengan menumbuhkan indeks<a href="https://github.com/milvus-io/milvus/pull/41013">(#41013</a>)</li>
<li>Memperbaiki kesalahan format JSON<a href="https://github.com/milvus-io/milvus/pull/41031">(#41031</a>)</li>
<li>Memperbaiki kesalahan 404 di WebUI ketika <code translate="no">http.enablepprof</code> salah<a href="https://github.com/milvus-io/milvus/pull/41007">(#41007</a>)</li>
</ul>
<h2 id="v258" class="common-anchor-header">v2.5.8<button data-href="#v258" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 1 April 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.8</td><td>2.5.6</td><td>2.5.7</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan peluncuran Milvus 2.5.8, yang menampilkan peningkatan pada ekspresi JSON, validasi UTF-8, penggunaan memori, dan logika penyeimbangan. Versi ini juga menyertakan beberapa perbaikan bug penting untuk meningkatkan konkurensi dan penanganan data. Kami mendorong Anda untuk meng-upgrade atau mencobanya, dan seperti biasa, umpan balik Anda akan membantu kami untuk terus menyempurnakan Milvus!</p>
<h3 id="Features" class="common-anchor-header">Fitur</h3><ul>
<li>Mendukung ekspresi JSON <code translate="no">null</code>/<code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/41002">(#41002</a>)</li>
<li>Mendukung penguraian vektor yang jarang dari struktur Parket dalam sisipan massal<a href="https://github.com/milvus-io/milvus/pull/40874">(#40874</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><ul>
<li>Menyeimbangkan koleksi dengan jumlah baris terbesar terlebih dahulu<a href="https://github.com/milvus-io/milvus/pull/40958">(#40958</a>)</li>
<li>Mendukung validasi string UTF-8 selama impor<a href="https://github.com/milvus-io/milvus/pull/40746">(#40746</a>)</li>
<li>Tambahkan validasi UTF-8 untuk semua bidang VARCHAR<a href="https://github.com/milvus-io/milvus/pull/40993">(#40993</a>)</li>
<li>Hindari kueri ulang jika pencarian hibrida hanya meminta PK sebagai bidang keluaran<a href="https://github.com/milvus-io/milvus/pull/40906">(#40906</a>)</li>
<li>Perbaiki tampilan larik untuk mengoptimalkan penggunaan memori<a href="https://github.com/milvus-io/milvus/pull/40206">(#40206</a>)</li>
<li>Menambahkan konfigurasi interval pemicu untuk penyeimbangan otomatis<a href="https://github.com/milvus-io/milvus/pull/39918">(#39818</a>)</li>
<li>Mengonversi beberapa ekspresi OR menjadi ekspresi IN<a href="https://github.com/milvus-io/milvus/pull/40751">(#40751</a>)</li>
<li>Mendukung kriteria pemadatan manual yang terperinci<a href="https://github.com/milvus-io/milvus/pull/40924">(#40924</a>)</li>
<li>Mempertahankan token mentah untuk pencatatan audit<a href="https://github.com/milvus-io/milvus/pull/40867">(#40867</a>)</li>
<li>Mengoptimalkan penggunaan meta mutex DataCoord<a href="https://github.com/milvus-io/milvus/pull/40753">(#40753</a>)</li>
<li>Memperkenalkan langganan batch di <code translate="no">MsgDispatcher</code> <a href="https://github.com/milvus-io/milvus/pull/40596">(#40596</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki kerusakan yang melibatkan input yang dapat dibatalkan dan tipe data mmap yang terus bertambah<a href="https://github.com/milvus-io/milvus/pull/40980">(#40980</a>)</li>
<li>Memperbaiki potensi kehilangan data dalam operasi penghapusan yang disebabkan oleh ID binlog ganda<a href="https://github.com/milvus-io/milvus/pull/40985">(#40985</a>),<a href="https://github.com/milvus-io/milvus/pull/40976">(#40976</a>)</li>
<li>Menambahkan kunci indeks bidang untuk <code translate="no">GetSegmentsIndexStates</code> untuk menghindari potensi kepanikan saat penyisipan saat membuat koleksi<a href="https://github.com/milvus-io/milvus/pull/40969">(#40969</a>)</li>
<li>Memperbaiki masalah konkurensi dalam pendaftaran konsumen Rocksmq<a href="https://github.com/milvus-io/milvus/pull/40885">(#40885</a>)</li>
<li>Mengambil semua log delta anak untuk pemuatan segmen<a href="https://github.com/milvus-io/milvus/pull/40957">(#40957</a>)</li>
<li>Memperbaiki hasil yang salah yang disebabkan oleh penggunaan indeks JSON ketika <code translate="no">iterative_filter</code> ditentukan<a href="https://github.com/milvus-io/milvus/pull/40946">(#40946</a>)</li>
<li>Memastikan prioritas yang lebih tinggi untuk operasi <code translate="no">exists</code> <a href="https://github.com/milvus-io/milvus/pull/40865">(#40865</a>)</li>
<li>Memperbaiki <code translate="no">WithGroupSize</code> sambil mengurangi<a href="https://github.com/milvus-io/milvus/pull/40920">(#40920</a>)</li>
<li>Meningkatkan jumlah slot secara proporsional seiring dengan bertambahnya ukuran segmen<a href="https://github.com/milvus-io/milvus/pull/40862">(#40862</a>)</li>
<li>Mengatur waktu antrian tugas sebelum enqueue<a href="https://github.com/milvus-io/milvus/pull/40853">(#40853</a>)</li>
<li>Memperbaiki ketidakseimbangan saluran pada DataNode<a href="https://github.com/milvus-io/milvus/pull/40854">(#40854</a>)</li>
<li>Mengatur konfigurasi default yang benar untuk slot tugas<a href="https://github.com/milvus-io/milvus/pull/40821">(#40821</a>)</li>
<li>Go SDK: Tetapkan flag yang dapat dinolkan menurut FieldSchema untuk penyisipan berbasis baris<a href="https://github.com/milvus-io/milvus/pull/40962">(#40962</a>)</li>
</ul>
<h2 id="v257" class="common-anchor-header">v2.5.7<button data-href="#v257" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 21 Maret 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.7</td><td>2.5.6</td><td>2.5.6</td><td>2.5.6</td></tr>
</tbody>
</table>
<p>Kami sangat senang mengumumkan rilis Milvus 2.5.7, yang disorot oleh fitur JSON Path Index yang baru diperkenalkan. Fitur ini memungkinkan Anda untuk membuat indeks terbalik pada kolom dinamis atau JSON untuk meningkatkan kinerja kueri secara signifikan. Bersamaan dengan fungsionalitas baru ini, kami telah melakukan banyak peningkatan dan perbaikan bug untuk keandalan yang lebih baik, penanganan kesalahan yang lebih baik, dan peningkatan kegunaan. Kami mendorong Anda untuk meng-upgrade atau mencobanya, dan seperti biasa, umpan balik Anda sangat kami hargai karena kami terus meningkatkan Milvus!</p>
<h3 id="Features" class="common-anchor-header">Fitur</h3><ul>
<li><strong>Indeks Jalur JSON</strong>: Untuk memenuhi kebutuhan pengguna akan skema dinamis, Milvus 2.5.7 memperkenalkan kemampuan untuk membangun indeks pada kolom dinamis dan kolom JSON. Dengan fitur ini, Anda dapat membuat indeks terbalik untuk kolom dinamis atau jalur JSON tertentu, yang secara efektif melewati proses pemuatan JSON yang lebih lambat dan sangat meningkatkan kinerja kueri. Untuk informasi lebih lanjut, lihat <a href="/docs/id/use-json-fields.md">Bidang JSON</a>.</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Peningkatan</h3><ul>
<li>Susun ulang sub-ekspresi untuk ekspresi gabungan<a href="https://github.com/milvus-io/milvus/pull/40186">(#40186</a>)</li>
<li>Menambahkan lebih banyak opsi konfigurasi untuk <code translate="no">interimindex</code> untuk mendukung mode<a href="https://github.com/milvus-io/milvus/pull/40429"> yang</a> disempurnakan<a href="https://github.com/milvus-io/milvus/pull/40429">(#40429</a>)</li>
<li>Gunakan metrik penghitung yang benar untuk penghitungan WA secara keseluruhan<a href="https://github.com/milvus-io/milvus/pull/40679">(#40679</a>)</li>
<li>Membuat konfigurasi pemangkasan segmen dapat di-refresh<a href="https://github.com/milvus-io/milvus/pull/40632">(#40632</a>)</li>
<li>Tambahkan kebijakan segel saluran berdasarkan pemblokiran L0<a href="https://github.com/milvus-io/milvus/pull/40535">(#40535</a>)</li>
<li>Perbaiki metadata tugas dengan penguncian tingkat kunci<a href="https://github.com/milvus-io/milvus/pull/40353">(#40353</a>)</li>
<li>Menghapus label koleksi dan partisi yang tidak perlu dari metrik<a href="https://github.com/milvus-io/milvus/pull/40593">(#40593</a>)</li>
<li>Memperbaiki pesan kesalahan impor<a href="https://github.com/milvus-io/milvus/pull/40597">(#40597</a>)</li>
<li>Hindari mengubah potongan byte tubuh menjadi string di <code translate="no">httpserver</code> <a href="https://github.com/milvus-io/milvus/pull/40414">(#40414</a>)</li>
<li>Mencatat posisi awal penghapusan pesan<a href="https://github.com/milvus-io/milvus/pull/40678">(#40678</a>)</li>
<li>Mendukung pengambilan binlog segmen dengan antarmuka <code translate="no">GetSegmentsInfo</code> yang baru<a href="https://github.com/milvus-io/milvus/pull/40466">(#40466</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Gunakan <code translate="no">newInsertDataWithFunctionOutputField</code> saat mengimpor file binlog<a href="https://github.com/milvus-io/milvus/pull/40742">(#40742</a>)</li>
<li>Memperbaiki masalah di mana properti mmap gagal diterapkan saat membuat koleksi<a href="https://github.com/milvus-io/milvus/pull/40515">(#40515</a>)</li>
<li>Jangan hapus file centroid ketika pengambilan sampel gagal; sebagai gantinya, tunggu GC<a href="https://github.com/milvus-io/milvus/pull/40702">(#40702</a>)</li>
<li>Memperbaiki masalah kehilangan pesan selama pencarian<a href="https://github.com/milvus-io/milvus/pull/40736">(#40736</a>)</li>
<li>Menghapus target jeda setelah dispatcher utama<a href="https://github.com/milvus-io/milvus/pull/40717">(#40717</a>)</li>
<li>Menambahkan input bitmap yang jelas untuk setiap batch loop<a href="https://github.com/milvus-io/milvus/pull/40722">(#40722</a>)</li>
<li>Melindungi <code translate="no">GetSegmentIndexes</code> dengan RLock<a href="https://github.com/milvus-io/milvus/pull/40720">(#40720</a>)</li>
<li>Menghindari kesalahan segmentasi yang disebabkan oleh pengambilan set data vektor kosong<a href="https://github.com/milvus-io/milvus/pull/40546">(#40546</a>)</li>
<li>Memperbaiki filter indeks JSON "tidak-sama"<a href="https://github.com/milvus-io/milvus/pull/40648">(#40648</a>)</li>
<li>Memperbaiki pemuatan offset nol dalam indeks terbalik<a href="https://github.com/milvus-io/milvus/pull/40524">(#40524</a>)</li>
<li>Memperbaiki logika pembersihan sampah pada statistik <code translate="no">jsonKey</code> dan meningkatkan filter statistik kunci JSON<a href="https://github.com/milvus-io/milvus/pull/40039">(#40039</a>)</li>
<li>Menangkap kesalahan penunjuk JSON yang tidak valid<a href="https://github.com/milvus-io/milvus/pull/40626">(#40626</a>)</li>
<li>Hak istimewa bintang RBAC sekarang mengembalikan kosong saat mencantumkan kebijakan<a href="https://github.com/milvus-io/milvus/pull/40557">(#40557</a>)</li>
<li>Menghindari kepanikan ketika sebuah field tidak ada dalam skema di QueryNode<a href="https://github.com/milvus-io/milvus/pull/40542">(#40542</a>)</li>
<li>Memperbaiki masalah pengumpulan referensi untuk pencarian/kueri<a href="https://github.com/milvus-io/milvus/pull/40550">(#40550</a>)</li>
<li>Menangani baris kosong untuk vektor yang jarang<a href="https://github.com/milvus-io/milvus/pull/40586">(#40586</a>)</li>
<li>Menambahkan pemeriksaan parameter tipe/indeks yang diduplikasi saat membuat koleksi<a href="https://github.com/milvus-io/milvus/pull/40465">(#40465</a>)</li>
<li>Memindahkan <code translate="no">metaHeader</code> ke klien untuk menghindari perlombaan data<a href="https://github.com/milvus-io/milvus/pull/40444">(#40444</a>)</li>
</ul>
<h2 id="v256" class="common-anchor-header">v2.5.6<button data-href="#v256" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 10 Maret 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.6</td><td>2.5.5</td><td>2.5.5</td><td>2.5.5</td></tr>
</tbody>
</table>
<p>Kami dengan senang hati mengumumkan peluncuran Milvus 2.5.6, yang menampilkan peningkatan yang berharga pada toolchain, pencatatan, metrik, dan penanganan larik, serta beberapa perbaikan bug untuk meningkatkan keandalan dan kinerja. Pembaruan ini mencakup penanganan konkurensi yang disempurnakan, tugas pemadatan yang lebih kuat, dan peningkatan utama lainnya. Kami mendorong Anda untuk meng-upgrade atau mencobanya, dan seperti biasa, kami menyambut umpan balik Anda untuk membantu kami terus meningkatkan Milvus!</p>
<h3 id="Improvements" class="common-anchor-header">Peningkatan</h3><ul>
<li>Tingkatkan rantai alat Go ke 1.22.7<a href="https://github.com/milvus-io/milvus/pull/40399">(#40399</a>)</li>
<li>Meningkatkan versi Rust ke 1.83<a href="https://github.com/milvus-io/milvus/pull/40317">(#40317</a>)</li>
<li>Meningkatkan versi Etcd ke 3.5.18<a href="https://github.com/milvus-io/milvus/pull/40230">(#40230</a>)</li>
<li>Hanya memeriksa tipe elemen untuk array<a href="https://github.com/milvus-io/milvus/pull/40447"> yang</a> tidak nol<a href="https://github.com/milvus-io/milvus/pull/40447">(#40447</a>)</li>
<li>Hapus log debug di penangan grup sumber daya (v2)<a href="https://github.com/milvus-io/milvus/pull/40393">(#40393</a>)</li>
<li>Meningkatkan pencatatan untuk gRPC resolver<a href="https://github.com/milvus-io/milvus/pull/40338">(#40338</a>)</li>
<li>Menambahkan lebih banyak metrik untuk komponen CGO asinkron<a href="https://github.com/milvus-io/milvus/pull/40232">(#40232</a>)</li>
<li>Bersihkan cache lokasi pecahan setelah koleksi dirilis<a href="https://github.com/milvus-io/milvus/pull/40228">(#40228</a>)</li>
</ul>
<h3 id="Bug-fixes" class="common-anchor-header">Perbaikan bug</h3><ul>
<li>Memperbaiki kerusakan larik yang disebabkan oleh pengabaian validitas<a href="https://github.com/milvus-io/milvus/pull/40433">(#40433</a>)</li>
<li>Memperbaiki masalah di mana ekspresi <code translate="no">null</code> tidak berfungsi untuk bidang JSON<a href="https://github.com/milvus-io/milvus/pull/40457">(#40457</a>)</li>
<li>Memperbaiki masalah yang menyimpan offset yang salah ketika membangun Tantivy dengan field yang dapat dinolkan<a href="https://github.com/milvus-io/milvus/pull/40453">(#40453</a>)</li>
<li>Melewati statistik eksekusi untuk segmen nol<a href="https://github.com/milvus-io/milvus/pull/40449">(#40449</a>)</li>
<li>Estimasi ukuran memori yang dikoreksi untuk larik<a href="https://github.com/milvus-io/milvus/pull/40377">(#40377</a>)</li>
<li>Melewati penunjuk ransel untuk menghindari pemadatan ganda<a href="https://github.com/milvus-io/milvus/pull/40401">(#40401</a>)</li>
<li>Memperbaiki masalah kerusakan dengan penyisipan massal<a href="https://github.com/milvus-io/milvus/pull/40304">(#40304)</a></li>
<li>Mencegah kebocoran aliran pesan dengan menghentikan dispatcher utama dengan benar<a href="https://github.com/milvus-io/milvus/pull/40351">(#40351</a>)</li>
<li>Memperbaiki masalah konkurensi untuk offset <code translate="no">null</code> <a href="https://github.com/milvus-io/milvus/pull/40363">(#40363</a>),<a href="https://github.com/milvus-io/milvus/pull/40365">(#40365</a>)</li>
<li>Memperbaiki penguraian dari <code translate="no">import end ts</code> <a href="https://github.com/milvus-io/milvus/pull/40333">(#40333</a>)</li>
<li>Peningkatan penanganan kesalahan dan uji unit untuk fungsi <code translate="no">InitMetaCache</code> <a href="https://github.com/milvus-io/milvus/pull/40324">(#40324</a>)</li>
<li>Menambahkan pemeriksaan parameter duplikat untuk <code translate="no">CreateIndex</code> <a href="https://github.com/milvus-io/milvus/pull/40330">(#40330</a>)</li>
<li>Menyelesaikan masalah yang mencegah tugas pemadatan ketika ukuran melebihi batas maksimum<a href="https://github.com/milvus-io/milvus/pull/40350">(#40350</a>)</li>
<li>Memperbaiki konsumsi duplikat dari stream untuk segmen yang tidak terlihat<a href="https://github.com/milvus-io/milvus/pull/40318">(#40318</a>)</li>
<li>Mengubah variabel CMake untuk beralih ke <code translate="no">knowhere-cuvs</code> <a href="https://github.com/milvus-io/milvus/pull/40289">(#40289</a>)</li>
<li>Memperbaiki masalah di mana menjatuhkan properti DB melalui RESTful gagal<a href="https://github.com/milvus-io/milvus/pull/40260">(#40260</a>)</li>
<li>Menggunakan tipe pesan yang berbeda untuk API <code translate="no">OperatePrivilegeV2</code> <a href="https://github.com/milvus-io/milvus/pull/40193">(#40193</a>)</li>
<li>Memperbaiki perlombaan data di cache delta tugas<a href="https://github.com/milvus-io/milvus/pull/40262">(#40262</a>)</li>
<li>Mengatasi kebocoran cache delta tugas yang disebabkan oleh ID tugas ganda<a href="https://github.com/milvus-io/milvus/pull/40184">(#40184</a>)</li>
</ul>
<h2 id="v255" class="common-anchor-header">v2.5.5<button data-href="#v255" class="anchor-icon" translate="no">
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
    </button></h2><p>Tanggal rilis: 26 Februari 2025</p>
<table>
<thead>
<tr><th>Versi Milvus</th><th>Versi Python SDK</th><th>Versi SDK Node.js</th><th>Versi Java SDK</th></tr>
</thead>
<tbody>
<tr><td>2.5.5</td><td>2.5.4</td><td>2.5.5</td><td>2.5.4</td></tr>
</tbody>
</table>
<p>Milvus 2.5.5 membawa peningkatan yang signifikan dalam hal jumlah koleksi dan partisi yang dapat didukung oleh sebuah cluster. Sekarang Milvus dapat dijalankan dengan 10 ribu koleksi dan 100 ribu partisi. Rilis ini juga mengatasi beberapa bug kritis, termasuk statistik kecocokan yang hilang dan masalah kebuntuan dalam kueri multi-tahap. Selain itu, rilis ini juga mencakup berbagai peningkatan kemampuan pengamatan dan keamanan. Kami sangat menyarankan agar semua pengguna yang menjalankan Milvus 2.5.x untuk melakukan upgrade sesegera mungkin.</p>
<h3 id="Dependency-Upgrade" class="common-anchor-header">Peningkatan Ketergantungan</h3><p>Ditingkatkan ke ETCD 3.5.18 untuk memperbaiki beberapa CVE.</p>
<ul>
<li>[2.5] Memperbarui rakit ke cuvs<a href="https://github.com/milvus-io/milvus/pull/39221">(#39221</a>)</li>
<li>[2.5] Memperbarui versi Knowhere<a href="https://github.com/milvus-io/milvus/pull/39673">(#39673</a>, <a href="https://github.com/milvus-io/milvus/pull/39574">#39574</a>)</li>
</ul>
<h3 id="Critical-Bugs" class="common-anchor-header">Bug Kritis</h3><ul>
<li>[2.5] Menggunakan awalan <code translate="no">text_log</code> untuk file offset null textmatchindex<a href="https://github.com/milvus-io/milvus/pull/39936">(#39936)</a></li>
<li>[2.5] Menambahkan sub-pool tugas untuk tugas multi-tahap untuk menghindari kebuntuan<a href="https://github.com/milvus-io/milvus/pull/40081">(#40081</a>)</li>
</ul>
<h3 id="Bug-Fixes" class="common-anchor-header">Perbaikan Bug</h3><ul>
<li>[2.5] Memperbaiki kebuntuan penjadwal tugas<a href="https://github.com/milvus-io/milvus/pull/40121">(#40121)</a></li>
<li>[2.5] Memperbaiki kondisi balapan yang menyebabkan beberapa indeks identik dibuat<a href="https://github.com/milvus-io/milvus/pull/40180">(#40180</a>)</li>
<li>[2.5] Memperbaiki masalah di mana koleksi dengan nama ganda dapat dibuat<a href="https://github.com/milvus-io/milvus/pull/40147">(#40147</a>)</li>
<li>Memperbaiki kegagalan pencarian ekspresi null<a href="https://github.com/milvus-io/milvus/pull/40128">(#40128</a>)</li>
<li>[2.5] Memperbaiki bug di mana pencocokan awalan gagal ketika ada wildcard di awalan<a href="https://github.com/milvus-io/milvus/pull/40021">(#40021</a>)</li>
<li>Membatalkan kaskade subkonteks ketika permintaan HTTP habis waktunya<a href="https://github.com/milvus-io/milvus/pull/40060">(#40060</a>)</li>
<li>[2.5] Memperbaiki kebocoran cache delta tugas pada tugas pengurangan<a href="https://github.com/milvus-io/milvus/pull/40056">(#40056)</a></li>
<li>[2.5] Memperbaiki kepanikan querycoord dalam kasus sudut<a href="https://github.com/milvus-io/milvus/pull/40058">(#40058</a>)</li>
<li>[2.5] Fungsi isbalanced yang disempurnakan untuk menghitung pasangan quote dengan benar<a href="https://github.com/milvus-io/milvus/pull/40002">(#40002</a>)</li>
<li>[2.5] Memperbaiki tugas pemadatan eksekusi negatif -1<a href="https://github.com/milvus-io/milvus/pull/39955">(#39955</a>)</li>
<li>[2.5] Memperbaiki bug di mana sebuah segmen tidak dapat dipindahkan dari sealed ke flushing<a href="https://github.com/milvus-io/milvus/pull/39996">(#39996</a>)</li>
<li>Melewati pembuatan indeks kunci utama saat memuat indeks pk<a href="https://github.com/milvus-io/milvus/pull/39922">(#39922</a>)</li>
<li>[2.5] Melewatkan pembuatan indeks teks ketika segmen bernilai nol setelah penyortiran<a href="https://github.com/milvus-io/milvus/pull/39969">(#39969)</a></li>
<li>[2.5] Memperbaiki kegagalan untuk mencari ke posisi paling awal<a href="https://github.com/milvus-io/milvus/pull/39966">(#39966)</a></li>
<li>Opsi pertumbuhan yang diabaikan hilang pada pencarian hibrida<a href="https://github.com/milvus-io/milvus/pull/39900">(#39900)</a></li>
<li>[2.5] Memperbaiki altercollection yang tidak dapat mengubah tingkat konsistensi<a href="https://github.com/milvus-io/milvus/pull/39902">(#39902)</a></li>
<li>Memperbaiki kegagalan impor karena jumlah baris 0<a href="https://github.com/milvus-io/milvus/pull/39904">(#39904)</a></li>
<li>[2.5] Memperbaiki hasil modul yang salah untuk tipe panjang<a href="https://github.com/milvus-io/milvus/pull/39802">(#39802)</a></li>
<li>[2.5] Menambahkan dan menggunakan konteks seumur hidup untuk pemicu pemadatan<a href="https://github.com/milvus-io/milvus/pull/39880">(#39880</a>)</li>
<li>[2.5] Memeriksa rilis koleksi sebelum pemeriksaan target<a href="https://github.com/milvus-io/milvus/pull/39843">(#39843</a>)</li>
<li>Memperbaiki kegagalan penghentian anggun Rootcoord dan sumber daya CI yang terbatas<a href="https://github.com/milvus-io/milvus/pull/39793">(#39793)</a></li>
<li>[2.5] Menghapus pemeriksaan ukuran kolom bidang beban &amp; skema<a href="https://github.com/milvus-io/milvus/pull/39834">(#39834</a>, <a href="https://github.com/milvus-io/milvus/pull/39835">#39835</a>)</li>
<li>[2.5] Menghapus param mmap.enable di param tipe saat membuat indeks<a href="https://github.com/milvus-io/milvus/pull/39806">(#39806</a>)</li>
<li>[2.5] Tidak melewatkan nama indeks saat menjatuhkan properti<a href="https://github.com/milvus-io/milvus/pull/39679">(#39679</a>)</li>
<li>[2.5] Segmen mengembalikan hasil yang tumbuh dan disegel<a href="https://github.com/milvus-io/milvus/pull/39789">(#39789</a>)</li>
<li>[2.5] Memperbaiki masalah peta yang bersamaan<a href="https://github.com/milvus-io/milvus/pull/39776">(#39776</a>)</li>
<li>[2.5] Konflik yang terselesaikan pada tes tugas QC<a href="https://github.com/milvus-io/milvus/pull/39797">(#39797</a>)</li>
<li>[2.5] Memperbaiki beban pengumpulan yang macet jika terjadi pemadatan atau GC<a href="https://github.com/milvus-io/milvus/pull/39761">(#39761</a>)</li>
<li>[2.5] Memperbaiki distribusi yang tidak merata yang disebabkan oleh kebocoran cache delta tugas yang dieksekusi<a href="https://github.com/milvus-io/milvus/pull/39759">(#39759)</a></li>
<li>[2.5] Dikembalikan lebih awal saat melewatkan memuat indeks pk<a href="https://github.com/milvus-io/milvus/pull/39763">(#39763)</a></li>
<li>[2.5] Memperbaiki pengguna root yang dapat membuat daftar semua koleksi bahkan ketika <code translate="no">common.security.rootShouldBindRole</code> ditetapkan<a href="https://github.com/milvus-io/milvus/pull/39714">(#39714</a>)</li>
<li>[2.5] Memperbaiki kebocoran diagram alir<a href="https://github.com/milvus-io/milvus/pull/39686">(#39686</a>)</li>
<li>[2.5] Pemformat item param yang digunakan untuk menghindari overlay setconfig<a href="https://github.com/milvus-io/milvus/pull/39636">(#39636</a>)</li>
<li>[2.5] Nama hak istimewa metastore diperiksa dengan nama hak istimewa "semua"<a href="https://github.com/milvus-io/milvus/pull/39492">(#39492</a>)</li>
<li>[2.5] Menambahkan pembatas kecepatan untuk RESTful v1<a href="https://github.com/milvus-io/milvus/pull/39555">(#399555)</a></li>
<li>[2.5] Menghapus nomor partisi yang dikodekan dengan kode keras di penangan RESTful<a href="https://github.com/milvus-io/milvus/pull/40113">(#40113</a>)</li>
</ul>
<h3 id="Improvements" class="common-anchor-header">Perbaikan</h3><h4 id="Observability" class="common-anchor-header">Pengamatan</h4><ul>
<li>Menambahkan metrik monitor untuk mengambil data mentah<a href="https://github.com/milvus-io/milvus/pull/40155">(#40155</a>)</li>
<li>[2.5] Menambahkan metrik get vector latency dan pesan kesalahan batas permintaan yang disempurnakan<a href="https://github.com/milvus-io/milvus/pull/40085">(#40085</a>)</li>
<li>[2.5] Menambahkan metrik untuk antrean proxy<a href="https://github.com/milvus-io/milvus/pull/40071">(#40071</a>)</li>
<li>Mengekspos lebih banyak data metrik<a href="https://github.com/milvus-io/milvus/pull/39466">(#39466</a>)</li>
<li>[2.5] Menambahkan metrik untuk ekspresi parsing<a href="https://github.com/milvus-io/milvus/pull/39716">(#39716</a>)</li>
<li>[2.5] Menambahkan bidang log DSL untuk pencarian hibrida<a href="https://github.com/milvus-io/milvus/pull/39598">(#39799</a>)</li>
<li>[2.5] Melewatkan memperbarui metrik indeks jika indeks dibuang<a href="https://github.com/milvus-io/milvus/pull/39572">(#39572</a>)</li>
<li>[2.5] Membuang info pprof jika komponen menghentikan progres yang sudah habis waktunya<a href="https://github.com/milvus-io/milvus/pull/39760">(#39760</a>)</li>
<li>[2.5] Menambahkan API manajemen untuk memeriksa status saldo querycoord<a href="https://github.com/milvus-io/milvus/pull/39909">(#39909</a>)</li>
</ul>
<h4 id="StatsCompactionIndex-Task-Scheduler-Optimization" class="common-anchor-header">Pengoptimalan Penjadwal Tugas Statistik/Pemadatan/Pengoptimalan Penjadwal Tugas Indeks</h4><ul>
<li>Kebijakan penjadwal tugas indeks<a href="https://github.com/milvus-io/milvus/pull/40104"> yang</a> disempurnakan<a href="https://github.com/milvus-io/milvus/pull/40104">(#40104</a>)</li>
<li>[2.5] Membatasi kecepatan pembuatan tugas statistik<a href="https://github.com/milvus-io/milvus/pull/39645">(#39645)</a></li>
<li>Menambahkan konfigurasi untuk jadwal pemadatan<a href="https://github.com/milvus-io/milvus/pull/39511">(#39511</a>)</li>
<li>[2.5] Memeriksa pemadatan L0 hanya dengan saluran yang sama saat menyatakan<a href="https://github.com/milvus-io/milvus/pull/39543">(#39543</a>)</li>
<li>[2.5] Estimasi memori pemuat segmen yang disesuaikan untuk indeks sementara<a href="https://github.com/milvus-io/milvus/pull/39509">(#39509</a>)</li>
<li>[2.5] Menggunakan start pos ts untuk segmen segel berdasarkan kebijakan seumur hidup<a href="https://github.com/milvus-io/milvus/pull/39994">(#39994)</a></li>
<li>Menghapus meta tugas ketika tugas tidak lagi diperlukan<a href="https://github.com/milvus-io/milvus/pull/40146">(#40146</a>)</li>
<li>[2.5] Mempercepat pencatatan objek selama impor binlog<a href="https://github.com/milvus-io/milvus/pull/40048">(#40048</a>)</li>
<li>Mendukung pembuatan koleksi dengan deskripsi<a href="https://github.com/milvus-io/milvus/pull/40028">(#40028</a>)</li>
<li>[2.5] Interval batas waktu permintaan indeks yang diekspor dalam konfigurasi<a href="https://github.com/milvus-io/milvus/pull/40118">(#40118</a>)</li>
<li>[2.5] Nilai default proxy.maxTaskNum yang disinkronkan menjadi 1024<a href="https://github.com/milvus-io/milvus/pull/40073">(#40073</a>)</li>
<li>Penurunan batas snapshot dump dari 10w ke 1w<a href="https://github.com/milvus-io/milvus/pull/40102">(#40102)</a></li>
<li>[2.5] Menghindari string untuk mengiris salinan byte untuk batch pk yang ada<a href="https://github.com/milvus-io/milvus/pull/40097">(#40097</a>)</li>
<li>Mendukung pengembalian properti yang dapat dikonfigurasi saat mendeskripsikan indeks<a href="https://github.com/milvus-io/milvus/pull/40043">(#40043</a>)</li>
<li>Performa ekspresi yang dioptimalkan untuk poin-poin tertentu<a href="https://github.com/milvus-io/milvus/pull/39938">(#39938</a>)</li>
<li>[2.5] Format hasil yang dioptimalkan dari getQueryNodeDistribution<a href="https://github.com/milvus-io/milvus/pull/39926">(#3926)</a></li>
<li>[cp25] Pengamatan yang diaktifkan untuk amplifikasi penulisan<a href="https://github.com/milvus-io/milvus/pull/39743">(#39743</a>)</li>
<li>[2.5] Mengembalikan hasil top-k saat mencari di RESTful v2<a href="https://github.com/milvus-io/milvus/pull/39839">(#39839</a>)</li>
<li>[2.5] [GoSDK] Ditambahkan dengan gula sintaksis EnableMatch<a href="https://github.com/milvus-io/milvus/pull/39853">(#39853</a>)</li>
<li>[2.5] Indeks sementara mendukung tipe indeks yang berbeda dan lebih banyak tipe data (FP16/BF16)<a href="https://github.com/milvus-io/milvus/pull/39180">(#39180</a>)</li>
<li>[GoSDK] [2.5] Sinkronisasi komit GoSDK yang disinkronkan dari cabang master<a href="https://github.com/milvus-io/milvus/pull/39823">(#39823</a>)</li>
<li>Menjaga konsistensi memori dan meta penyiar<a href="https://github.com/milvus-io/milvus/pull/39721">(#39721</a>)</li>
<li>Disiarkan dengan notifikasi berbasis peristiwa<a href="https://github.com/milvus-io/milvus/pull/39550">(#39550)</a></li>
<li>[2.5] Pesan kesalahan yang disempurnakan untuk pengecekan skema &amp; indeks<a href="https://github.com/milvus-io/milvus/pull/39565">(#39565)</a></li>
<li>[2.5] Setel ulang jenis indeks otomatis default untuk skalar<a href="https://github.com/milvus-io/milvus/pull/39820">(#39820</a>)</li>
<li>[2.5] Tugas pemadatan L0 yang di-enqueue ulang ketika pemeriksaan awal gagal<a href="https://github.com/milvus-io/milvus/pull/39871">(#39871</a>)</li>
</ul>
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
<p>Kami sangat senang mengumumkan rilis Milvus 2.5.4, yang memperkenalkan pengoptimalan kinerja utama dan fitur-fitur baru seperti isolasi PartitionKey, Sparse Index dengan DAAT MaxScore, dan mekanisme penguncian yang disempurnakan. Sorotan yang menonjol dari rilis ini adalah dukungannya untuk 10.000 koleksi dan 1 juta partisi, yang menandai tonggak penting untuk kasus penggunaan multi-penyewa. Versi ini juga menangani beberapa bug yang meningkatkan stabilitas dan keandalan secara keseluruhan, dua bug kritis dapat menyebabkan kehilangan data. Kami mendorong Anda untuk meng-upgrade atau mencoba rilis terbaru ini, dan kami menantikan umpan balik Anda untuk membantu kami terus menyempurnakan Milvus!</p>
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
<p>Untuk pengguna yang sudah memiliki penerapan Milvus yang berfungsi, Anda perlu meng-upgrade komponen ETCD dan Pulsar sebelum dapat menggunakan fitur dan fungsi baru. Untuk detailnya, lihat <a href="/docs/id/upgrade-pulsar-v3.md">Meningkatkan Pulsar dari 2.x ke 3.x</a></p>
<h4 id="Local-Storage-V2" class="common-anchor-header">Penyimpanan Lokal V2</h4><p>Memperkenalkan format file lokal baru di Milvus 2.5, meningkatkan efisiensi pemuatan dan kueri untuk data skalar, mengurangi overhead memori, dan meletakkan dasar untuk pengoptimalan di masa mendatang.</p>
<h4 id="Expression-Parsing-Optimization" class="common-anchor-header">Pengoptimalan Penguraian Ekspresi</h4><p>Penguraian ekspresi yang lebih baik dengan mengimplementasikan caching untuk ekspresi yang diulang, meningkatkan ANTLR, dan mengoptimalkan kinerja klausa <code translate="no">NOT IN</code>.</p>
<h4 id="Improved-DDL-Concurrency-Performance" class="common-anchor-header">Peningkatan Kinerja Konkurensi DDL</h4><p>Mengoptimalkan kinerja konkurensi operasi Data Definition Language (DDL).</p>
<h4 id="RESTful-API-Feature-Alignment" class="common-anchor-header">Penyelarasan Fitur API RESTful</h4><p>Menyelaraskan fungsionalitas RESTful API dengan SDK lain untuk konsistensi.</p>
<h4 id="Security--Configuration-Updates" class="common-anchor-header">Pembaruan Keamanan &amp; Konfigurasi</h4><p>TLS yang didukung untuk mengamankan komunikasi antar-simpul di lingkungan yang lebih kompleks atau lingkungan perusahaan. Untuk detailnya, lihat <a href="/docs/id/tls.md">Konfigurasi Keamanan</a>.</p>
<h4 id="Compaction-Performance-Enhancements" class="common-anchor-header">Peningkatan Kinerja Pemadatan</h4><p>Menghapus batasan segmen maksimum dalam pemadatan campuran dan sekarang memprioritaskan segmen yang lebih kecil terlebih dahulu, meningkatkan efisiensi dan mempercepat kueri pada set data yang besar atau terfragmentasi.</p>
<h4 id="Score-Based-Channel-Balancing" class="common-anchor-header">Penyeimbangan Saluran Berbasis Skor</h4><p>Memperkenalkan kebijakan yang secara dinamis menyeimbangkan beban di seluruh saluran, meningkatkan pemanfaatan sumber daya dan stabilitas secara keseluruhan dalam penerapan skala besar.</p>
