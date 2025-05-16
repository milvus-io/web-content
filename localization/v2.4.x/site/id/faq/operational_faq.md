---
id: operational_faq.md
summary: >-
  Temukan jawaban atas pertanyaan umum yang sering diajukan tentang operasi di
  Milvus.
title: Pertanyaan Umum Operasional
---
<h1 id="Operational-FAQ" class="common-anchor-header">Pertanyaan Umum Operasional<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Bagaimana jika saya gagal menarik citra Milvus Docker dari Docker Hub?</h4><p>Jika Anda gagal menarik citra Milvus Docker dari Docker Hub, coba tambahkan mirror registri lainnya.</p>
<p>Pengguna dari Tiongkok Daratan dapat menambahkan URL "https://registry.docker-cn.com" ke larik registri-mirror di <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Apakah Docker satu-satunya cara untuk menginstal dan menjalankan Milvus?</h4><p>Docker adalah cara yang efisien untuk menggunakan Milvus, tetapi bukan satu-satunya cara. Anda juga dapat menggunakan Milvus dari kode sumber. Ini membutuhkan Ubuntu (18.04 atau lebih tinggi) atau CentOS (7 atau lebih tinggi). Lihat <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Membangun Milvus dari Kode Sumber</a> untuk informasi lebih lanjut.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Apa saja faktor utama yang memengaruhi pemanggilan?</h4><p>Pemanggilan dipengaruhi terutama oleh jenis indeks dan parameter pencarian.</p>
<p>Untuk indeks FLAT, Milvus melakukan pemindaian menyeluruh di dalam koleksi, dengan pengembalian 100%.</p>
<p>Untuk indeks IVF, parameter nprobe menentukan cakupan pencarian di dalam koleksi. Meningkatkan nprobe akan meningkatkan proporsi vektor yang dicari dan penarikan kembali, tetapi mengurangi kinerja kueri.</p>
<p>Untuk indeks HNSW, parameter ef menentukan luasnya pencarian grafik. Meningkatkan ef akan meningkatkan jumlah titik yang dicari pada grafik dan penarikan, tetapi mengurangi kinerja kueri.</p>
<p>Untuk informasi lebih lanjut, lihat <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Pengindeksan Vektor</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Mengapa perubahan yang saya lakukan pada file konfigurasi tidak berlaku?</h4><p>Milvus tidak mendukung modifikasi pada file konfigurasi selama runtime. Anda harus memulai ulang Milvus Docker agar perubahan pada berkas konfigurasi dapat diterapkan.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Bagaimana saya tahu jika Milvus telah berhasil dijalankan?</h4><p>Jika Milvus dimulai menggunakan Docker Compose, jalankan <code translate="no">docker ps</code> untuk mengamati berapa banyak kontainer Docker yang berjalan dan memeriksa apakah layanan Milvus telah dimulai dengan benar.</p>
<p>Untuk Milvus mandiri, Anda seharusnya dapat mengamati setidaknya tiga kontainer Docker yang berjalan, satu adalah layanan Milvus dan dua lainnya adalah layanan manajemen dan penyimpanan etcd. Untuk informasi lebih lanjut, lihat <a href="/docs/id/v2.4.x/install_standalone-docker.md">Menginstalasi Milvus Mandiri</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Mengapa waktu dalam berkas log berbeda dengan waktu sistem?</h4><p>Perbedaan waktu biasanya disebabkan oleh fakta bahwa mesin hos tidak menggunakan Waktu Universal Terkoordinasi (UTC).</p>
<p>Berkas log di dalam citra Docker menggunakan UTC secara default. Jika mesin hos Anda tidak menggunakan UTC, masalah ini dapat terjadi.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Bagaimana saya tahu jika CPU saya mendukung Milvus?</h4><p>Operasi komputasi Milvus bergantung pada dukungan CPU untuk set instruksi ekstensi SIMD (Single Instruction, Multiple Data). Dukungan CPU Anda terhadap set instruksi ekstensi SIMD sangat penting untuk pembuatan indeks dan pencarian kemiripan vektor dalam Milvus. Pastikan bahwa CPU Anda mendukung setidaknya satu dari set instruksi SIMD berikut ini:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Jalankan perintah lscpu untuk memeriksa apakah CPU Anda mendukung set instruksi SIMD yang disebutkan di atas:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Mengapa Milvus mengembalikan <code translate="no">illegal instruction</code> saat startup?</h4><p>Milvus membutuhkan CPU Anda untuk mendukung set instruksi SIMD: SSE4.2, AVX, AVX2, atau AVX512. CPU harus mendukung setidaknya salah satu dari ini untuk memastikan bahwa Milvus beroperasi secara normal. Kesalahan <code translate="no">illegal instruction</code> yang dikembalikan saat startup menunjukkan bahwa CPU Anda tidak mendukung salah satu dari empat set instruksi di atas.</p>
<p>Lihat <a href="/docs/id/v2.4.x/prerequisite-docker.md">dukungan CPU untuk Set Instruksi SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Dapatkah saya menginstal Milvus pada Windows?</h4><p>Ya, Anda dapat menginstall Milvus pada Windows baik dengan meng-compile dari kode sumber atau dari paket biner.</p>
<p>Lihat Menjalankan <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Milvus pada Windows</a> untuk mempelajari cara menginstal Milvus pada Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Saya mendapatkan kesalahan saat menginstal pymilvus pada Windows. Apa yang harus saya lakukan?</h4><p>Tidak disarankan untuk menginstal PyMilvus pada Windows. Tetapi jika Anda harus menginstal PyMilvus di Windows tetapi mendapatkan kesalahan, cobalah menginstalnya di lingkungan <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a>. Lihat <a href="/docs/id/v2.4.x/install-pymilvus.md">Instal Milvus SDK</a> untuk informasi lebih lanjut tentang cara menginstal PyMilvus di lingkungan Conda.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Dapatkah saya menggunakan Milvus ketika terputus dari Internet?</h4><p>Ya, Anda dapat menginstal Milvus di lingkungan offline. Lihat Menginstal <a href="/docs/id/v2.4.x/install_offline-helm.md">Milvus Offline</a> untuk informasi lebih lanjut.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Di mana saya bisa menemukan log yang dihasilkan oleh Milvus?</h4><p>Log Milvus dicetak ke stout (keluaran standar) dan stderr (kesalahan standar) secara default, namun kami sangat menyarankan untuk mengalihkan log Anda ke volume persisten dalam produksi. Untuk melakukannya, perbarui <code translate="no">log.file.rootPath</code> di <strong>milvus.yaml</strong>. Dan jika Anda menggunakan Milvus dengan <code translate="no">milvus-helm</code> chart, Anda juga perlu mengaktifkan persistensi log terlebih dahulu melalui <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Jika Anda tidak mengubah konfigurasi, menggunakan log kubectl &lt;pod-name&gt; atau log docker CONTAINER juga dapat membantu Anda menemukan log.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Dapatkah saya membuat indeks untuk suatu segmen sebelum memasukkan data ke dalamnya?</h4><p>Ya, Anda bisa. Namun, kami menyarankan untuk memasukkan data secara berkelompok, yang masing-masing tidak boleh melebihi 256 MB, sebelum mengindeks setiap segmen.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Dapatkah saya berbagi sebuah instance etcd di antara beberapa instance Milvus?</h4><p>Ya, Anda dapat berbagi instance etcd di antara beberapa instance Milvus. Untuk melakukannya, Anda perlu mengubah <code translate="no">etcd.rootPath</code> menjadi nilai yang terpisah untuk setiap instans Milvus dalam berkas konfigurasi masing-masing instans sebelum memulainya.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">Dapatkah saya membagikan sebuah instans Pulsar di antara beberapa instans Milvus?</h4><p>Ya, Anda dapat berbagi instans Pulsar di antara beberapa instans Milvus. Untuk melakukannya, Anda dapat</p>
<ul>
<li>Jika multi-tenancy diaktifkan pada instans Pulsar Anda, pertimbangkan untuk mengalokasikan penyewa atau namespace terpisah untuk setiap instans Milvus. Untuk melakukannya, Anda perlu mengubah <code translate="no">pulsar.tenant</code> atau <code translate="no">pulsar.namespace</code> dalam berkas konfigurasi instans Milvus Anda menjadi nilai unik untuk masing-masing instans sebelum memulainya.</li>
<li>Jika Anda tidak berencana untuk mengaktifkan multi-tenancy pada instans Pulsar Anda, pertimbangkan untuk mengubah <code translate="no">msgChannel.chanNamePrefix.cluster</code> dalam berkas konfigurasi instans Milvus Anda menjadi nilai unik untuk masing-masing instans sebelum memulainya.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">Dapatkah saya berbagi instance MinIO di antara beberapa instance Milvus?</h4><p>Ya, Anda dapat berbagi instance MinIO di antara beberapa instance Milvus. Untuk melakukannya, Anda perlu mengubah <code translate="no">minio.rootPath</code> menjadi nilai unik untuk setiap instans Milvus dalam file konfigurasi masing-masing sebelum memulai mereka.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Bagaimana cara menangani pesan kesalahan <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>Pesan kesalahan <code translate="no">Illegal uri [example.db]</code> mengindikasikan bahwa Anda mencoba terhubung ke Milvus Lite menggunakan versi PyMilvus yang lebih lama yang tidak mendukung tipe koneksi ini. Untuk mengatasi masalah ini, perbarui instalasi PyMilvus Anda ke setidaknya versi 2.4.2, yang mencakup dukungan untuk terhubung ke Milvus Lite.</p>
<p>Anda dapat memutakhirkan PyMilvus dengan menggunakan perintah berikut:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Mengapa saya mendapatkan hasil yang lebih sedikit daripada <code translate="no">limit</code> yang saya tetapkan dalam pencarian/kueri saya?</h4><p>Ada beberapa alasan mengapa Anda mendapatkan hasil yang lebih sedikit dari <code translate="no">limit</code> yang Anda tentukan:</p>
<ul>
<li><p><strong>Data terbatas</strong>: Koleksi mungkin tidak memiliki cukup entitas untuk memenuhi batas yang Anda minta. Jika jumlah total entitas dalam koleksi kurang dari batas, Anda akan menerima hasil yang lebih sedikit.</p></li>
<li><p><strong>Kunci Utama Duplikat</strong>: Milvus memprioritaskan entitas tertentu ketika menemukan kunci utama duplikat selama pencarian. Perilaku ini bervariasi berdasarkan jenis pencarian:</p></li>
<li><p><strong>Kueri (Pencocokan Tepat)</strong>: Milvus memilih entitas terbaru dengan PK yang cocok Pencarian ANN: Milvus memilih entitas dengan nilai kemiripan tertinggi, meskipun entitas memiliki PK yang sama. Prioritas ini dapat menghasilkan hasil unik yang lebih sedikit daripada batas jika koleksi Anda memiliki banyak kunci utama yang sama.</p></li>
<li><p><strong>Kecocokan yang tidak mencukupi</strong>: Ekspresi pemfilteran pencarian Anda mungkin terlalu ketat, sehingga menghasilkan lebih sedikit entitas yang memenuhi ambang batas kemiripan. Jika kondisi yang ditetapkan untuk pencarian terlalu ketat, tidak cukup banyak entitas yang cocok, sehingga menghasilkan hasil yang lebih sedikit dari yang diharapkan.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. Apa yang menyebabkan hal ini dan bagaimana cara mengatasinya?</h4><p>Kesalahan ini terjadi ketika Anda mencoba menggunakan Milvus Lite pada platform Windows. Milvus Lite terutama didesain untuk lingkungan Linux dan mungkin tidak memiliki dukungan asli untuk Windows.</p>
<p>Solusinya adalah menggunakan lingkungan Linux:</p>
<ul>
<li>Gunakan sistem operasi berbasis Linux atau mesin virtual untuk menjalankan Milvus Lite.</li>
<li>Pendekatan ini akan memastikan kompatibilitas dengan ketergantungan dan fungsionalitas perpustakaan.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Apa yang dimaksud dengan kesalahan "panjang melebihi panjang maksimum" di Milvus, dan bagaimana cara untuk memahami dan mengatasinya?</h4><p>Kesalahan "panjang melebihi panjang maksimal" di Milvus terjadi ketika ukuran elemen data melebihi ukuran maksimum yang diperbolehkan untuk sebuah koleksi atau field. Berikut adalah beberapa contoh dan penjelasannya:</p>
<ul>
<li><p>Kesalahan bidang JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Kesalahan panjang string: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Kesalahan bidang VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Untuk memahami dan mengatasi kesalahan-kesalahan ini:</p>
<ul>
<li>Pahami bahwa <code translate="no">len(str)</code> dalam Python mewakili jumlah karakter, bukan ukuran dalam byte.</li>
<li>Untuk tipe data berbasis string seperti VARCHAR dan JSON, gunakan <code translate="no">len(bytes(str, encoding='utf-8'))</code> untuk menentukan ukuran sebenarnya dalam byte, yang digunakan Milvus untuk &quot;max-length&quot;.</li>
</ul>
<p>Contoh dalam bahasa Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Masih ada pertanyaan?</h4><p>Kamu bisa:</p>
<ul>
<li>Lihat <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> di GitHub. Jangan ragu untuk bertanya, berbagi ide, dan membantu orang lain.</li>
<li>Bergabunglah dengan <a href="https://discord.com/invite/8uyFbECzPX">Server Discord</a> kami untuk mendapatkan dukungan dan terlibat dengan komunitas sumber terbuka kami.</li>
</ul>
