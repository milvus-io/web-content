---
id: choose-an-embeddinglist-search-strategy.md
title: Pilih Strategi Pencarian EmbeddingList
summary: >-
  Strategi pencarian EmbeddingList menentukan cara Milvus membangun indeks
  kandidat perkiraan untuk pencarian EmbeddingList. Strategi defaultnya adalah
  tokenann. Anda dapat beralih ke muvera atau lemur jika daftar embedding
  berukuran besar, TokenANN terlalu boros sumber daya, atau representasi tingkat
  baris yang telah dilatih/dikompresi lebih sesuai. Hasil akhir tetap dihasilkan
  oleh proses penataan ulang MaxSim ketika opsi `emb_list_rerank` diaktifkan.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">Pilih Strategi Pencarian EmbeddingList<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>Strategi pencarian EmbeddingList menentukan cara Milvus membangun indeks kandidat perkiraan untuk pencarian EmbeddingList. Strategi default adalah " <code translate="no">tokenann</code>". Anda dapat beralih ke " <code translate="no">muvera</code> " atau " <code translate="no">lemur</code> " jika daftar embedding sangat besar, TokenANN terlalu mahal, atau representasi baris yang dipelajari/terkompresi lebih sesuai. Hasil akhir tetap dihasilkan oleh MaxSim reranking saat opsi " <code translate="no">emb_list_rerank</code> " diaktifkan.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">Mengapa Strategi Pencarian Ada<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>Daftar Embedding dirancang untuk baris yang berisi beberapa vektor, seperti embedding token dalam dokumen teks, embedding patch dalam dokumen visual, atau embedding klip dalam video. Alih-alih membandingkan satu vektor kueri dengan satu vektor baris, MaxSim membandingkan daftar embedding kueri dengan daftar embedding dokumen dan mengagregasi kecocokan terbaik.</p>
<p>Hal ini memberikan kemampuan representasi yang lebih baik, tetapi MaxSim yang tepat membutuhkan biaya yang mahal dalam skala besar. Pencarian MaxSim dengan metode brute-force perlu membandingkan vektor kueri dengan setiap vektor di setiap baris kandidat. Hal ini biasanya terlalu lambat untuk pencarian produksi.</p>
<table>
<thead>
<tr><th>### Masalah - Setiap baris mungkin berisi banyak vektor. - MaxSim yang tepat pada semua baris memakan sumber daya. - Ukuran indeks dan latensi pencarian dapat meningkat dengan cepat.</th><th>### Strategi - Gunakan metode pengambilan tahap pertama yang mendekati. - Ambil lebih banyak kandidat daripada topK yang diminta. - Urutkan ulang kandidat dengan MaxSim yang tepat.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>Dalam hal ini, " <code translate="no">emb_list_strategy</code> " pada dasarnya merupakan strategi pembuatan indeks dan pengambilan kandidat. Strategi ini dikonfigurasi saat membangun indeks, dan menentukan bagaimana himpunan kandidat ANN tahap pertama dihasilkan. Parameter waktu pencarian seperti " <code translate="no">retrieval_ann_ratio</code> " dan " <code translate="no">emb_list_rerank</code> " kemudian mengontrol berapa banyak kandidat yang diambil serta apakah pengurutan ulang MaxSim diterapkan.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">Strategi yang Tersedia<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>Strategi</th><th>Unit pengambilan kandidat</th><th>Masalah yang diselesaikan</th><th>Kesesuaian terbaik</th><th>Pertimbangan utama</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>Vektor individual di dalam setiap baris</td><td>Menjaga vektor asli dan menghindari kehilangan akibat kompresi.</td><td>Pencarian yang mengutamakan kualitas, daftar embedding pendek atau sedang, embedding dengan daya diskriminasi tinggi.</td><td>Indeks yang lebih besar dan biaya pencarian kandidat yang lebih tinggi.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>Satu vektor terenkode per baris</td><td>Mengompres daftar embedding menjadi representasi FDE berdimensi tetap tanpa pelatihan.</td><td>Dokumen yang lebih panjang, embedding dengan tingkat diskriminasi tinggi, kasus di mana TokenANN terlalu berat.</td><td>Proyeksi acak menimbulkan kerugian akibat aproksimasi; dimensi FDE memengaruhi latensi.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>Satu vektor yang dipelajari per baris</td><td>Mempelajari kompresi khusus korpus dari daftar embedding ke vektor baris berdimensi tetap.</td><td>Embedding dengan tingkat diskriminasi rendah, pencarian dokumen multimodal atau visual, daftar embedding yang besar.</td><td>Membutuhkan pelatihan dan dapat dipengaruhi oleh distribusi korpus serta bias panjang dokumen.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> mengindeks setiap vektor dalam daftar embedding. Selama pencarian, setiap vektor kueri melakukan pencarian ANN, vektor yang cocok dikumpulkan kembali ke barisnya, dan kandidat baris yang dihasilkan diurutkan ulang dengan MaxSim.</p>
<div class="alert note">
<p><strong>Gunakan TokenANN ketika kualitas menjadi prioritas utama.</strong> Metode ini merupakan aproksimasi terdekat terhadap perhitungan MaxSim asli karena menjaga semua vektor tetap tersedia dalam indeks tahap pertama.</p>
</div>
<ul>
<li><p><strong>Cocok untuk:</strong> potongan teks pendek, baris dengan jumlah vektor kecil atau sedang, pemisahan semantik tingkat token yang kuat, baseline yang sensitif terhadap kualitas.</p></li>
<li><p><strong>Kurang cocok:</strong> dokumen yang sangat panjang, halaman visual dengan ribuan vektor patch, batasan memori atau latensi yang ketat.</p></li>
<li><p><strong>Perilaku tingkat elemen:</strong> TokenANN dapat mengambil kandidat dari vektor individual sebelum menggabungkannya kembali ke baris. Hasil pencarian EmbeddingList akhir tetap berada pada tingkat baris setelah penilaian MaxSim.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> mengkodekan setiap daftar embedding menjadi vektor berdimensi tetap menggunakan proyeksi acak. Hal ini mengubah pencarian tahap pertama menjadi pencarian vektor tingkat baris standar. Kandidat kemudian diurutkan ulang dengan MaxSim.</p>
<div class="alert note">
<p><strong>Gunakan MUVERA ketika TokenANN terlalu berat tetapi Anda tidak ingin melakukan langkah pelatihan.</strong> Ini merupakan jalan tengah yang praktis antara kualitas dan biaya.</p>
</div>
<ul>
<li><p><strong>Cocok untuk:</strong> dokumen teks panjang, ruang embedding dengan tingkat diskriminasi tinggi, beban kerja yang membutuhkan ukuran indeks lebih kecil daripada TokenANN.</p></li>
<li><p><strong>Kurang cocok:</strong> ruang embedding dengan tingkat diskriminasi rendah atau kasus di mana representasi FDE menjadi terlalu berdimensi tinggi untuk anggaran latensi.</p></li>
<li><p><strong>Parameter penting:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code>, dan <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> melatih model untuk mengompres setiap daftar embedding menjadi representasi berdimensi tetap. Pencarian ANN tahap pertama dijalankan pada vektor tingkat baris yang telah dipelajari, dan kandidat diurutkan ulang menggunakan MaxSim.</p>
<div class="alert note">
<p><strong>Gunakan LEMUR jika kompresi yang dipelajari sebanding dengan biaya pelatihan.</strong> Metode ini dapat bekerja dengan baik untuk ruang embedding dengan diskriminasi rendah dan pencarian multimodal, tetapi harus divalidasi terhadap korpus target karena dapat sensitif terhadap distribusi panjang dokumen.</p>
</div>
<ul>
<li><p><strong>Cocok untuk:</strong> pencarian dokumen visual, embedding patch multimodal, ruang embedding dengan tingkat diskriminasi rendah, daftar embedding besar di mana TokenANN tidak praktis.</p></li>
<li><p><strong>Kurang cocok:</strong> korpus yang sering berubah, embedding dengan tingkat diskriminasi tinggi dan panjang dokumen yang sangat tidak seimbang, beban kerja di mana biaya pelatihan tidak dapat diterima.</p></li>
<li><p><strong>Parameter penting:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code>, dan <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">Perilaku dan Konfigurasi Default<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Strategi EmbeddingList default di Knowhere adalah <code translate="no">tokenann</code>. Jika Anda tidak menentukan <code translate="no">emb_list_strategy</code>, Knowhere akan menggunakan TokenANN. Pengaturan default saat pencarian mencakup <code translate="no">retrieval_ann_ratio=3.0</code> dan <code translate="no">emb_list_rerank=true</code>.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">Item Konfigurasi Berdasarkan Strategi<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan item konfigurasi khusus strategi. Di Milvus, item saat pembuatan biasanya disertakan dalam peta ` <code translate="no">params</code> ` saat membuat indeks. Jika Anda memerlukan nilai default di sisi server, nilai tersebut harus didefinisikan dalam berkas konfigurasi Milvus di bawah bagian ` <code translate="no">knowhere</code> `.</p>
<table>
<thead>
<tr><th>Strategi</th><th>Item konfigurasi</th><th>Tahap</th><th>Nilai Default</th><th>Kapan harus mengubahnya</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>Pembuatan indeks</td><td><code translate="no">tokenann</code></td><td>Gunakan secara eksplisit jika Anda menginginkan perilaku pengindeksan vektor elemen default atau saat DiskANN digunakan.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>Pembuatan indeks</td><td><code translate="no">tokenann</code></td><td>Gunakan saat Anda menginginkan pengambilan data yang dikodekan pada tingkat baris tanpa pelatihan.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>Pembuatan indeks</td><td><code translate="no">4</code></td><td>Mengontrol jumlah proyeksi SimHash. Nilai yang lebih tinggi akan membuat lebih banyak bucket dan mungkin meningkatkan kualitas pengkodean, tetapi juga meningkatkan dimensi yang dikodekan.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>Pembuatan indeks</td><td><code translate="no">7</code></td><td>Mengontrol berapa banyak pengkodean FDE independen yang digabungkan. Nilai yang lebih tinggi mungkin meningkatkan ketahanan tetapi meningkatkan biaya indeks/pencarian.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>Pembuatan indeks</td><td><code translate="no">42</code></td><td>Disetel untuk proyeksi acak yang dapat direproduksi, terutama dalam pengujian dan perbandingan benchmark.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>Pembuatan indeks</td><td><code translate="no">tokenann</code></td><td>Gunakan ketika kompresi tingkat baris yang dipelajari diperkirakan akan bekerja lebih baik daripada proyeksi acak tetap.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>Pembuatan indeks</td><td><code translate="no">256</code></td><td>Mengontrol ukuran representasi terkompresi. Tingkatkan untuk kapasitas yang lebih besar; kurangi untuk penggunaan memori yang lebih rendah dan pengambilan data yang lebih cepat.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>Pembuatan indeks</td><td><code translate="no">20000</code></td><td>Tingkatkan jika korpusnya beragam dan kompresi yang dipelajari tidak cukup memadai; kurangi hanya untuk pengujian kecil atau pembuatan yang lebih cepat.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>Pembuatan indeks</td><td><code translate="no">50</code></td><td>Tingkatkan jika pelatihan belum konvergen; kurangi jika waktu pembuatan menjadi kendala utama.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>Pembuatan indeks</td><td><code translate="no">512</code></td><td>Sesuaikan untuk throughput pelatihan dan penggunaan memori.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>Pembuatan indeks</td><td><code translate="no">0.001</code></td><td>Sesuaikan saat pelatihan tidak stabil atau konvergensi terlalu lambat.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>Pembuatan indeks</td><td><code translate="no">42</code></td><td>Atur untuk menjalankan pelatihan yang dapat direproduksi.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>Pembuatan indeks</td><td><code translate="no">2</code></td><td>Tingkatkan hanya jika korpus memerlukan ekstraktor fitur yang lebih ekspresif dan Anda mampu menanggung biaya pelatihan tambahan.</td></tr>
<tr><td>Semua strategi</td><td><code translate="no">retrieval_ann_ratio</code></td><td>Pencarian</td><td><code translate="no">3.0</code></td><td>Tingkatkan untuk mendapatkan lebih banyak kandidat tahap pertama dan meningkatkan recall; kurangi untuk mengurangi latensi.</td></tr>
<tr><td>Semua strategi</td><td><code translate="no">emb_list_rerank</code></td><td>Pencarian</td><td><code translate="no">true</code></td><td>Biarkan tetap diaktifkan untuk pemeringkatan ulang MaxSim. Nonaktifkan hanya untuk eksperimen terkontrol di mana kualitas ANN tahap pertama diukur secara langsung.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Konfigurasikan Strategi di Milvus<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, strategi diteruskan sebagai parameter indeks saat membuat indeks pada bidang EmbeddingList, seperti sub-bidang vektor StructArray.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>Untuk LEMUR, berikan parameter pelatihan LEMUR dalam peta " <code translate="no">params</code> " yang sama.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Konfigurasi Pengaturan Default Sisi Server di Milvus<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus juga dapat mengisi parameter indeks dari ` <code translate="no">milvus.yaml</code>`. Bagian yang relevan adalah ` <code translate="no">knowhere</code>`. Parameter disusun berdasarkan jenis indeks dan tahap, menggunakan pola ` <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>`. Parameter indeks yang disediakan pengguna memiliki prioritas lebih tinggi daripada nilai default ini.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>Gunakan parameter per-indeks untuk pemilihan strategi.</strong> Pengaturan default dalam berkas konfigurasi Milvus berlaku secara luas untuk indeks dengan jenis dan tahap yang sama. Gunakan parameter <code translate="no">create_index</code> jika koleksi atau bidang yang berbeda memerlukan strategi EmbeddingList yang berbeda.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">Konfigurasikan Pengambilan Kandidat pada Saat Pencarian<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>Strategi ini menentukan cara indeks dibangun. Pada saat pencarian, gunakan <code translate="no">retrieval_ann_ratio</code> untuk mengontrol berapa banyak kandidat tahap pertama yang diambil sebelum penataan ulang MaxSim. Nilai yang lebih tinggi biasanya meningkatkan recall tetapi meningkatkan latensi.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parameter</th><th>Tahap</th><th>Default</th><th>Arti</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>Pembuatan indeks</td><td><code translate="no">tokenann</code></td><td>Memilih cara kandidat EmbeddingList diindeks dan diambil.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>Pencarian</td><td><code translate="no">3.0</code></td><td>Faktor ekspansi kandidat untuk putaran ANN pertama.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>Pencarian</td><td><code translate="no">true</code></td><td>Apakah kandidat yang diambil akan diurutkan ulang menggunakan MaxSim.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>Catatan kompatibilitas:</strong> MUVERA dan LEMUR saat ini mendukung data fp32 di Knowhere. DiskANN hanya mendukung EmbeddingList dengan strategi TokenANN. Jika Anda menggunakan tipe vektor non-fp32 atau DiskANN, pastikan strategi tersebut didukung sebelum mengubah pengaturan default.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">Cara Memilih Strategi<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Tidak ada strategi yang secara universal terbaik. Pilihlah berdasarkan panjang daftar embedding, diskriminasi ruang embedding, anggaran latensi, ukuran indeks, dan apakah Anda dapat melakukan langkah pelatihan.</p>
<table>
<thead>
<tr><th>Pertanyaan</th><th>Sinyal</th><th>Titik awal yang direkomendasikan</th></tr>
</thead>
<tbody>
<tr><td>Apakah Anda memerlukan baseline berkualitas tinggi?</td><td>Anda ingin mengukur perkiraan praktis terbaik sebelum mengoptimalkan biaya.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Apakah jumlah vektor pada setiap baris sedikit atau sedang?</td><td>Setiap baris memiliki sejumlah kecil vektor token, patch, atau klip.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>Apakah TokenANN terlalu besar atau terlalu lambat?</td><td>Ukuran indeks atau latensi pengambilan tahap pertama menjadi penghambat.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Apakah Anda ingin kompresi tanpa pelatihan?</td><td>Anda memerlukan model operasional yang lebih sederhana dan pengkodean yang dapat direproduksi.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>Apakah ruang embedding memiliki tingkat diskriminasi yang rendah?</td><td>Kandidat ANN tingkat token berisik, dan proyeksi acak tidak mempertahankan sinyal yang cukup.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>Apakah beban kerjanya bersifat visual atau multimodal?</td><td>Baris berisi banyak vektor patch, dan TokenANN terlalu mahal.</td><td><code translate="no">lemur</code> atau <code translate="no">muvera</code></td></tr>
<tr><td>Apakah panjang dokumen sangat tidak merata?</td><td>Beberapa baris berisi vektor yang jauh lebih banyak daripada baris lainnya.</td><td>Mulailah dengan <code translate="no">muvera</code>; validasi <code translate="no">lemur</code> dengan cermat.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">Alur Kerja Evaluasi yang Disarankan<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Mulailah dengan <code translate="no">tokenann</code> sebagai patokan kualitas jika ukuran dataset memungkinkannya.</p></li>
<li><p>Jalankan kueri yang sama dengan <code translate="no">muvera</code> dan bandingkan recall, nDCG, latensi, dan ukuran indeks.</p></li>
<li><p>Cobalah <code translate="no">lemur</code> jika daftar embedding besar, ruang embedding berisik, atau beban kerjanya bersifat visual atau multimodal.</p></li>
<li><p>Sesuaikan nilai ` <code translate="no">retrieval_ann_ratio</code> ` sebelum mengubah terlalu banyak parameter saat proses pembuatan. Tingkatkan nilainya jika recall rendah; kurangi nilainya jika latensi terlalu tinggi.</p></li>
<li><p>Selalu lakukan validasi pada kueri yang representatif dan distribusi panjang dokumen. Strategi yang berhasil pada teks pendek mungkin tidak berhasil pada dokumen visual atau korpus long-tail.</p></li>
</ol>
<table>
<thead>
<tr><th>### Kualitas diutamakan Mulailah dengan ` <code translate="no">tokenann</code>`. Gunakan sebagai patokan untuk kualitas aproksimasi MaxSim.</th><th>### Seimbang Cobalah <code translate="no">muvera</code> saat Anda membutuhkan biaya yang lebih rendah tanpa menambahkan pipeline pelatihan.</th><th>### Terkompresi Cobalah <code translate="no">lemur</code> jika kompresi tingkat baris yang dipelajari kemungkinan akan mengungguli proyeksi acak tetap.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">Referensi yang Digunakan untuk Draf Ini<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>Pengujian Milvus untuk <code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code>, dan <code translate="no">emb_list_rerank</code>.</p></li>
<li><p>Penanganan berkas konfigurasi Milvus untuk nilai default indeks sisi server di bawah bagian " <code translate="no">knowhere</code> ".</p></li>
<li><p>Definisi parameter Knowhere untuk nilai default dan nama strategi yang didukung.</p></li>
<li><p>Pemeriksaan kompatibilitas Knowhere untuk dukungan MUVERA/LEMUR yang hanya mendukung fp32 dan dukungan TokenANN yang hanya menggunakan DiskANN.</p></li>
<li><p>Catatan evaluasi internal yang membandingkan TokenANN, MUVERA, dan LEMUR untuk pengambilan kandidat MaxSim.</p></li>
</ul>
<div class="alert note">
<p><strong>Catatan penerbitan:</strong> Sebelum mempublikasikan ke luar, pastikan parameter mana yang secara resmi didukung dalam rilis Milvus yang dituju dan apakah produk ingin mengekspos semua parameter Knowhere tingkat rendah atau hanya subset yang lebih kecil dan terdokumentasi.</p>
</div>
