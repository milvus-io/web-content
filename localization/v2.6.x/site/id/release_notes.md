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
    </button></h1><p>Cari tahu apa yang baru di Milvus! Halaman ini merangkum fitur-fitur baru, peningkatan, masalah yang diketahui, dan perbaikan bug dalam setiap rilis. Anda dapat menemukan catatan rilis untuk setiap versi yang dirilis setelah v2.6.0 di bagian ini. Kami menyarankan agar Anda mengunjungi halaman ini secara teratur untuk mempelajari pembaruan.</p>
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
<h3 id="Architecture-Changes" class="common-anchor-header">Perubahan Arsitektur</h3><p>Sejak versi 2.6, Milvus memperkenalkan perubahan arsitektur yang signifikan yang bertujuan untuk meningkatkan kinerja, skalabilitas, dan kemudahan penggunaan. Untuk informasi lebih lanjut, lihat <a href="/docs/id/architecture_overview.md">Tinjauan Arsitektur Milvus</a>.</p>
<h4 id="Streaming-Node-GA" class="common-anchor-header">Streaming Node (GA)</h4><p>Pada versi sebelumnya, data streaming ditulis ke WAL oleh Proxy, dan dibaca oleh QueryNode dan DataNode. Arsitektur ini menyulitkan untuk mencapai konsensus di sisi penulisan, membutuhkan logika yang kompleks di sisi pembacaan. Selain itu, delegator kueri terletak di QueryNode, yang menghambat skalabilitas. Milvus 2.5.0 memperkenalkan Streaming Node, yang menjadi GA di versi 2.6.0. Komponen ini sekarang bertanggung jawab atas semua operasi baca/tulis WAL tingkat shard dan juga berfungsi sebagai delegator kueri, menyelesaikan masalah yang disebutkan di atas dan memungkinkan pengoptimalan baru.</p>
<p><strong>Pemberitahuan Peningkatan Penting</strong>: Streaming Node merupakan perubahan arsitektur yang signifikan, sehingga peningkatan langsung ke Milvus 2.6.0-rc1 dari versi sebelumnya tidak didukung.</p>
<h4 id="Woodpecker-Native-WAL" class="common-anchor-header">Woodpecker Native WAL</h4><p>Milvus sebelumnya mengandalkan sistem eksternal seperti Kafka atau Pulsar untuk WAL-nya. Meskipun fungsional, sistem-sistem ini menambahkan kompleksitas operasional dan sumber daya yang signifikan, terutama untuk penerapan skala kecil hingga menengah. Di Milvus 2.6, semua itu digantikan oleh Woodpecker, sistem WAL yang dibuat khusus untuk cloud. Woodpecker dirancang untuk penyimpanan objek, mendukung mode zero-disk berbasis penyimpanan lokal dan objek, menyederhanakan operasi sekaligus meningkatkan kinerja dan skalabilitas.</p>
<h4 id="DataNode-and-IndexNode-Merge" class="common-anchor-header">Penggabungan DataNode dan IndexNode</h4><p>Dalam Milvus 2.6, tugas-tugas seperti pemadatan, impor massal, pengumpulan statistik, dan pembuatan indeks sekarang dikelola oleh penjadwal terpadu. Fungsi persistensi data yang sebelumnya ditangani oleh DataNode telah dipindahkan ke Streaming Node. Untuk menyederhanakan penerapan dan pemeliharaan, IndexNode dan DataNode telah digabungkan menjadi satu komponen DataNode. Node yang terkonsolidasi ini sekarang menjalankan semua tugas penting ini, mengurangi kompleksitas operasional dan mengoptimalkan pemanfaatan sumber daya.</p>
<h4 id="Coordinator-Merge-into-MixCoord" class="common-anchor-header">Penggabungan Koordinator menjadi MixCoord</h4><p>Desain sebelumnya dengan modul RootCoord, QueryCoord, dan DataCoord yang terpisah memperkenalkan kompleksitas dalam komunikasi antar modul. Untuk menyederhanakan desain sistem, komponen-komponen ini telah digabungkan menjadi satu koordinator terpadu yang disebut MixCoord. Konsolidasi ini mengurangi kompleksitas pemrograman terdistribusi dengan mengganti komunikasi berbasis jaringan dengan panggilan fungsi internal, menghasilkan operasi sistem yang lebih efisien dan pengembangan dan pemeliharaan yang disederhanakan.</p>
<h3 id="Key-Features" class="common-anchor-header">Fitur Utama</h3><h4 id="RaBitQ-1-bit-Quantization" class="common-anchor-header">Kuantisasi 1-bit RaBitQ</h4><p>Untuk menangani kumpulan data berskala besar, kuantisasi 1-bit merupakan teknik yang efektif untuk meningkatkan pemanfaatan sumber daya dan kinerja pencarian. Namun, metode tradisional dapat berdampak negatif pada daya ingat. Bekerja sama dengan penulis penelitian asli, Milvus 2.6 memperkenalkan RaBitQ, solusi kuantisasi 1-bit yang mempertahankan akurasi pencarian yang tinggi sekaligus memberikan manfaat sumber daya dan kinerja kompresi 1-bit.</p>
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
<h4 id="Add-Field-for-Online-Schema-Evolution" class="common-anchor-header">Menambahkan Bidang untuk Evolusi Skema Online</h4><p>Untuk memberikan fleksibilitas skema yang lebih besar, Milvus 2.6 sekarang mendukung penambahan bidang skalar atau vektor baru ke skema koleksi yang sudah ada secara online. Hal ini untuk menghindari kebutuhan untuk membuat koleksi baru dan melakukan migrasi data yang mengganggu ketika kebutuhan aplikasi berubah.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/add-fields-to-an-existing-collection.md">Menambahkan Field ke Koleksi yang Sudah Ada</a>.</p>
<h4 id="INT8-Vector-Support" class="common-anchor-header">Dukungan Vektor INT8</h4><p>Menanggapi meningkatnya penggunaan model terkuantisasi yang menghasilkan penyematan bilangan bulat 8-bit, Milvus 2.6 menambahkan dukungan tipe data asli untuk vektor INT8. Hal ini memungkinkan pengguna untuk memasukkan vektor ini secara langsung tanpa melakukan de-kuantisasi, sehingga menghemat komputasi, bandwidth jaringan, dan biaya penyimpanan. Fitur ini pada awalnya didukung untuk indeks keluarga HNSW.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="/docs/id/dense-vector.md">Vektor Padat</a>.</p>
