---
id: search_with_jev.md
summary: >-
  Pencarian vektor menemukan informasi yang berkaitan dengan suatu kueri.
  Membangun aplikasi pencarian yang bermanfaat juga melibatkan pengambilan
  keputusan: bagian mana yang benar-benar menjawab pertanyaan, apakah jawaban
  sebelumnya dapat digunakan kembali, dan apakah agen memiliki bukti yang cukup
  untuk menghentikan pencarian.
title: Bangun RAG dengan Milvus + PII Masker
---
<h1 id="Search-with-Jev-and-Milvus" class="common-anchor-header">Pencarian dengan Jev dan Milvus<button data-href="#Search-with-Jev-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Pencarian vektor menemukan informasi yang terkait dengan suatu kueri. Membangun aplikasi pencarian yang berguna juga melibatkan pengambilan keputusan: bagian mana yang benar-benar menjawab pertanyaan, apakah jawaban sebelumnya dapat digunakan kembali, dan apakah agen memiliki bukti yang cukup untuk menghentikan pencarian.</p>
<p>Milvus dan Jev menangani bagian-bagian berbeda dari alur kerja ini. <a href="https://milvus.io/">Milvus</a> menyimpan embedding dan mengambil catatan kandidat, dengan filter metadata untuk batasan seperti versi produk atau cakupan basis pengetahuan. <a href="https://docs.typesafe.ai/introduction">Jev</a> mengevaluasi makna teks yang diambil berdasarkan instruksi. Aplikasi Anda dapat menggunakan penilaiannya untuk memilih bukti atau mengontrol langkah pencarian berikutnya.</p>
<h2 id="What-does-Jev-do" class="common-anchor-header">Apa yang dilakukan Jev?<button data-href="#What-does-Jev-do" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebuah permintaan Jev menyediakan konteks dan satu atau lebih pertanyaan penilaian. <a href="https://docs.typesafe.ai/primitives">Keluaran bertipe</a> Jev mencakup pilihan di antara opsi tetap, skor berurutan, dan probabilitas ya/tidak. Keluaran ini memungkinkan kode aplikasi mengambil keputusan tanpa perlu mengurai penjelasan bebas bentuk. Model generasi tetap dapat menulis jawaban atau kueri pencarian lanjutan jika diperlukan.</p>
<p>Misalnya, seorang pengguna bertanya bagaimana cara menginstal Atlas v2. Milvus dapat membatasi pencarian pada dokumentasi v2 dan mengembalikan bagian-bagian serupa tentang instalasi, pembaruan, dan pemecahan masalah. Jev kemudian mengevaluasi bagian mana yang menjelaskan pengaturan awal. Aplikasi tersebut meneruskan bukti yang dipilih ke model pembuat jawaban.</p>
<p>Tanggung jawabnya jelas:</p>
<ol>
<li><strong>Mencari dengan Milvus:</strong> menemukan kandidat dalam batasan metadata yang diperlukan.</li>
<li><strong>Menilai dengan Jev:</strong> mengevaluasi kandidat-kandidat tersebut berdasarkan pertanyaan dan kriteria khusus tugas.</li>
<li><strong>Bertindak dalam kode aplikasi:</strong> menyusun ulang hasil, menyaring konteks, menggunakan kembali jawaban, atau melanjutkan pencarian.</li>
</ol>
<p>Beberapa keputusan diambil sebelum pencarian. Jev dapat memilih cakupan pencarian atau menilai dokumen yang masuk sebelum dimasukkan ke dalam koleksi. Kontrol akses dan filter yang tepat tetap menjadi tanggung jawab aplikasi.</p>
<h2 id="Explore-the-search-scenarios" class="common-anchor-header">Jelajahi skenario pencarian<button data-href="#Explore-the-search-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Koleksi</a> " <a href="https://github.com/milvus-io/bootcamp/tree/master/bootcamp/RAG/search_with_jev">Pencarian dengan Jev</a> " berisi sembilan tutorial yang dapat dijalankan. Masing-masing menggunakan dataset sintetis kecil dan menampilkan catatan yang diambil, penilaian, serta tindakan yang dihasilkan.</p>
<h3 id="Select-better-evidence" class="common-anchor-header">Pilih bukti yang lebih baik<button data-href="#Select-better-evidence" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Urutkan ulang hasil pencarian</a>: atur ulang urutan dokumentasi dan memori agen pengkodean. Memori tentang kesalahan port laptop mungkin mirip dengan masalah koneksi kontainer; memori yang lebih berguna mencatat perbaikan kontainer-host yang sebenarnya.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/filter_search_context.ipynb">Saring konteks yang diambil</a>: bedakan petunjuk instalasi awal dari bagian pembaruan dan pemecahan masalah setelah Milvus menerapkan filter versi.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_graph_relations.ipynb">Urutkan ulang hubungan grafik</a>: jawab pertanyaan tentang tempat kelahiran penulis buku dengan memilih jembatan buku-ke-penulis dan hubungan penulis-ke-tempat kelahiran, lalu pertahankan peringkat tersebut saat mengambil bagian sumber.</li>
</ul>
<h3 id="Control-search-and-answer-reuse" class="common-anchor-header">Mengontrol pencarian dan penggunaan kembali jawaban<button data-href="#Control-search-and-answer-reuse" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/decide_search_stopping.ipynb">Tentukan kapan harus menghentikan pencarian</a>: model generasi mengusulkan pencarian berdasarkan bukti yang terkumpul, sementara Jev menilai apakah pertanyaan asli dapat dijawab. Contoh-contoh mencakup jawaban langsung, pertanyaan dua langkah, dan fakta yang tidak tersedia yang mencapai batas pencarian tanpa jawaban.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/route_search_queries.ipynb">Rute permintaan pencarian</a>: pilih pencarian dokumentasi, penagihan, atau memori, lalu terapkan filter Milvus yang sesuai. Permintaan di luar cakupan akan mengambil jalur terpisah.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/validate_semantic_cache.ipynb">Validasi penggunaan kembali cache semantik</a>: ambil permintaan serupa yang tersimpan dalam cache, lalu periksa apakah jawabannya juga memenuhi persyaratan tugas, bahasa, dan konteks permintaan baru.</li>
</ul>
<h3 id="Improve-and-inspect-the-knowledge-pipeline" class="common-anchor-header">Tingkatkan dan periksa alur pengetahuan<button data-href="#Improve-and-inspect-the-knowledge-pipeline" class="anchor-icon" translate="no">
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
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/curate_search_data.ipynb">Kurasi dokumen sebelum pengindeksan</a>: bedakan panduan operasional substantif dari materi promosi atau yang tidak lengkap, dengan tindakan pengindeksan, peninjauan, dan pengecualian terpisah.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/check_search_guardrails.ipynb">Saring bagian teks yang diambil</a>: identifikasi teks yang mencoba mengalihkan asisten, sambil tetap mempertahankan saran keamanan biasa. Ini adalah langkah penyaringan tambahan, bukan jaminan keamanan.</li>
<li><a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/evaluation_with_jev.ipynb">Evaluasi bukti pencarian</a>: nilai relevansi bagian teks, apakah bukti sudah cukup, dan apakah jawaban tersebut membuat klaim yang tidak didukung. Contoh-contoh ini sengaja menghilangkan bukti atau menambahkan pernyataan yang tidak didukung untuk memperjelas perbedaannya.</li>
</ul>
<h2 id="A-ready-made-reranking-interface" class="common-anchor-header">Antarmuka penataan ulang yang siap pakai<button data-href="#A-ready-made-reranking-interface" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/milvus-io/milvus-model">Milvus Model</a> menyediakan antarmuka pemeringkatan ulang ( <code translate="no">JevRerankFunction</code>) di sisi aplikasi: masukkan kueri dan teks dokumen kandidat, lalu terima hasil yang telah diberi skor beserta indeks aslinya, yang diurutkan berdasarkan relevansi. Gunakan indeks tersebut untuk menyusun ulang catatan yang dikembalikan oleh Milvus.</p>
<p><a href="https://github.com/milvus-io/milvus-model/pull/90">Integrasi Jev</a> telah digabungkan. Lihat <a href="https://github.com/milvus-io/milvus-model/blob/main/src/pymilvus/model/reranker/jev.py">implementasi dan opsi konstruktor</a> untuk API saat ini. Fitur ini menerima <code translate="no">TYPESAFE_API_KEY</code> dan secara default menggunakan <code translate="no">jev-latest</code>. Gunakan versi paket yang mencakup integrasi ini.</p>
<p>Wrapper saat ini menggunakan prompt relevansi berbasis klaim dan bukti. Pastikan kriteria ini sesuai dengan tugas Anda. Untuk penilaian khusus seperti kompatibilitas memori, penghentian, atau perutean, ikuti tutorial yang tertaut dengan menggunakan API TypeSafe secara langsung. Tutorial tersebut mendemonstrasikan panggilan API langsung dari kode aplikasi Python.</p>
<h2 id="Try-it-with-Milvus" class="common-anchor-header">Cobalah dengan Milvus<button data-href="#Try-it-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">Buka tutorial reranking di Colab</a> untuk memulai dengan pengambilan kandidat dan pemeringkatan. Untuk pengaturan lokal dan daftar tutorial lengkap, lihat berkas <a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/README.md">README koleksi</a><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/RAG/search_with_jev/rerank_search_results.ipynb">ini</a>.</p>
<p>Contoh-contoh ini menggunakan <a href="https://aistudio.google.com/apikey">kunci API Gemini</a> untuk embedding dan <a href="https://console.typesafe.ai/">kunci API TypeSafe</a> untuk Jev. Tutorial agentic-search juga menggunakan Gemini untuk pembangkitan kueri dan jawaban. Teks sampel dikirim ke penyedia API ini, dan panggilan API mungkin menghabiskan kredit.</p>
<p>Tutorial ini berjalan dengan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> secara default dan menyertakan opsi koneksi ke server Milvus atau <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Pembagian tugas yang sama berlaku di seluruh implementasi: Milvus mengambil kandidat, dan aplikasi mengirimkan teks yang relevan ke Jev untuk penilaian.</p>
<p>Gunakan contoh-contoh ini sebagai titik awal untuk menentukan kriteria dan ambang batas Anda sendiri. Skor relevansi tidak menjamin bahwa jawaban tersebut benar, dan kumpulan data pembelajaran kecil ini tidak menjamin akurasi atau kecepatan dalam penggunaan produksi.</p>
<h2 id="Explore-implementations-and-evaluation-results" class="common-anchor-header">Jelajahi implementasi dan hasil evaluasi<button data-href="#Explore-implementations-and-evaluation-results" class="anchor-icon" translate="no">
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
    </button></h2><p>Proyek-proyek open-source berikut menerapkan ide-ide ini ke alur kerja pencarian yang lebih besar. Laporan yang tertaut menjelaskan dataset, perbandingan, dan batasan masing-masing eksperimen.</p>
<table>
<thead>
<tr><th>Proyek</th><th>Kasus penggunaan pencarian</th><th>Karya Jev</th></tr>
</thead>
<tbody>
<tr><td><a href="https://github.com/zilliztech/memsearch">MemSearch</a></td><td>Memori Markdown yang persisten untuk agen pengkodean</td><td><a href="https://github.com/zilliztech/memsearch/blob/main/src/memsearch/jev_reranker.py">Implementasi Jev</a> · <a href="https://github.com/zilliztech/memsearch/blob/main/evaluation/reranking-evaluation.md">Evaluasi</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/vector-graph-rag">Grafik Vektor RAG</a></td><td>Pencarian vektor dan graf untuk pertanyaan multi-hop</td><td><a href="https://github.com/zilliztech/vector-graph-rag/blob/main/src/vector_graph_rag/llm/jev.py">Implementasi Jev</a> · <a href="https://github.com/zilliztech/vector-graph-rag/blob/main/evaluation/jev/README.md">Evaluasi</a></td></tr>
<tr><td><a href="https://github.com/zilliztech/deep-searcher">DeepSearcher</a></td><td>Pencarian berulang atas pengetahuan pribadi</td><td><a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/run_full100.py">Pelaksana eksperimen</a> · <a href="https://github.com/zilliztech/deep-searcher/blob/master/evaluation/jev_stopping/README.md">Evaluasi penghentian pencarian</a> (eksperimen mandiri)</td></tr>
<tr><td><a href="https://github.com/zilliztech/GPTCache">GPTCache</a></td><td>Penggunaan kembali jawaban untuk permintaan yang kompatibel</td><td><a href="https://github.com/zilliztech/GPTCache/blob/main/gptcache/similarity_evaluation/jev.py">Implementasi Jev</a> · <a href="https://github.com/zilliztech/GPTCache/blob/main/examples/benchmark/reuse_compatibility/README.md">Evaluasi</a></td></tr>
</tbody>
</table>
<p>Kontribusi DeepSearcher adalah eksperimen penghentian pencarian mandiri. Tautan implementasi lainnya menunjukkan integrasi Jev yang spesifik untuk tugas tertentu. Hasil dari proyek-proyek ini sebaiknya dibaca dalam konteks evaluasi masing-masing, bukan dianggap sebagai tolok ukur bersama.</p>
