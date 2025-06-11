---
id: schema-hands-on.md
title: Desain Model Data untuk Pencarian
summary: >-
  Sistem Temu Kembali Informasi, yang juga dikenal sebagai mesin pencari, sangat
  penting untuk berbagai aplikasi AI seperti Retrieval-augmented generation
  (RAG), pencarian visual, dan rekomendasi produk. Inti dari sistem ini adalah
  model data yang dirancang dengan cermat untuk mengatur, mengindeks, dan
  mengambil informasi.
---
<h1 id="Data-Model-Design-for-Search" class="common-anchor-header">Desain Model Data untuk Pencarian<button data-href="#Data-Model-Design-for-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Sistem Pencarian Informasi, yang juga dikenal sebagai mesin pencari, sangat penting untuk berbagai aplikasi AI seperti Retrieval-augmented generation (RAG), pencarian visual, dan rekomendasi produk. Inti dari sistem ini adalah model data yang dirancang dengan cermat untuk mengatur, mengindeks, dan mengambil informasi.</p>
<p>Milvus memungkinkan Anda untuk menentukan model data pencarian melalui skema koleksi, mengatur data yang tidak terstruktur, representasi vektor yang padat atau jarang, dan metadata terstruktur. Baik Anda bekerja dengan teks, gambar, atau tipe data lainnya, panduan praktis ini akan membantu Anda memahami dan menerapkan konsep-konsep skema utama untuk mendesain model data pencarian dalam praktiknya.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data-model-anatomy.png" alt="Data Model Anatomy" class="doc-image" id="data-model-anatomy" />
   </span> <span class="img-wrapper"> <span>Anatomi Model Data</span> </span></p>
<h2 id="Data-Model" class="common-anchor-header">Model Data<button data-href="#Data-Model" class="anchor-icon" translate="no">
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
    </button></h2><p>Desain model data sistem pencarian melibatkan analisis kebutuhan bisnis dan abstraksi informasi ke dalam model data yang diekspresikan dengan skema. Skema yang terdefinisi dengan baik penting untuk menyelaraskan model data dengan tujuan bisnis, memastikan konsistensi data dan kualitas layanan.  Selain itu, memilih tipe data dan indeks yang tepat juga penting dalam mencapai tujuan bisnis secara ekonomis.</p>
<h3 id="Analyzing-Business-Needs" class="common-anchor-header">Menganalisis Kebutuhan Bisnis</h3><p>Mengatasi kebutuhan bisnis secara efektif dimulai dengan menganalisis jenis pertanyaan yang akan dilakukan pengguna dan menentukan metode pencarian yang paling sesuai.</p>
<ul>
<li><p><strong>Pertanyaan Pengguna:</strong> Identifikasi jenis kueri yang diharapkan dilakukan pengguna. Hal ini membantu memastikan skema Anda mendukung kasus penggunaan di dunia nyata dan mengoptimalkan kinerja penelusuran. Hal ini mungkin termasuk:</p>
<ul>
<li><p>Mengambil dokumen yang cocok dengan kueri bahasa alami</p></li>
<li><p>Menemukan gambar yang mirip dengan gambar referensi atau mencocokkan deskripsi teks</p></li>
<li><p>Mencari produk berdasarkan atribut seperti nama, kategori, atau merek</p></li>
<li><p>Memfilter item berdasarkan metadata terstruktur (misalnya, tanggal publikasi, tag, peringkat)</p></li>
<li><p>Menggabungkan beberapa kriteria dalam kueri hibrida (misalnya, dalam penelusuran visual, dengan mempertimbangkan kemiripan semantik gambar dan keterangannya)</p></li>
</ul></li>
<li><p><strong>Metode Pencarian:</strong> Pilih teknik penelusuran yang sesuai dengan jenis kueri yang akan dilakukan pengguna. Metode yang berbeda memiliki tujuan yang berbeda dan sering kali dapat digabungkan untuk mendapatkan hasil yang lebih baik:</p>
<ul>
<li><p><strong>Pencarian semantik</strong>: Menggunakan kemiripan vektor yang padat untuk menemukan item dengan makna yang sama, ideal untuk data yang tidak terstruktur seperti teks atau gambar.</p></li>
<li><p><strong>Pencarian teks lengkap</strong>: Melengkapi pencarian semantik dengan pencocokan kata kunci.  Pencarian teks lengkap dapat menggunakan analisis leksikal untuk menghindari pemecahan kata yang panjang menjadi token-token yang terfragmentasi, dan memahami istilah-istilah khusus selama pencarian.</p></li>
<li><p><strong>Penyaringan metadata</strong>: Di atas pencarian vektor, menerapkan batasan seperti rentang tanggal, kategori, atau tag.</p></li>
</ul></li>
</ul>
<h3 id="Translates-Business-Requirements-into-a-Search-Data-Model" class="common-anchor-header">Menerjemahkan Persyaratan Bisnis ke dalam Model Data Pencarian</h3><p>Langkah berikutnya adalah menerjemahkan kebutuhan bisnis Anda ke dalam model data konkret, dengan mengidentifikasi komponen inti informasi Anda dan metode pencariannya:</p>
<ul>
<li><p>Tentukan data yang perlu Anda simpan, seperti konten mentah (teks, gambar, audio), metadata terkait (judul, tag, kepengarangan), dan atribut kontekstual (stempel waktu, perilaku pengguna, dll.)</p></li>
<li><p>Tentukan jenis dan format data yang sesuai untuk setiap elemen. Sebagai contoh:</p>
<ul>
<li><p>Deskripsi teks → string</p></li>
<li><p>Penyematan gambar atau dokumen → vektor padat atau jarang</p></li>
<li><p>Kategori, tag, atau bendera → string, larik, dan bool</p></li>
<li><p>Atribut numerik seperti harga atau peringkat → bilangan bulat atau float</p></li>
<li><p>Informasi terstruktur seperti detail penulis -&gt; json</p></li>
</ul></li>
</ul>
<p>Definisi yang jelas dari elemen-elemen ini memastikan konsistensi data, hasil pencarian yang akurat, dan kemudahan integrasi dengan logika aplikasi hilir.</p>
<h2 id="Schema-Design" class="common-anchor-header">Desain Skema<button data-href="#Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Di Milvus, model data diekspresikan melalui skema koleksi. Merancang bidang yang tepat dalam skema koleksi adalah kunci untuk memungkinkan pengambilan yang efektif. Setiap bidang mendefinisikan jenis data tertentu yang disimpan dalam koleksi dan memainkan peran yang berbeda dalam proses pencarian. Pada tingkat tinggi, Milvus mendukung dua jenis field utama: <strong>field vektor</strong> dan <strong>field skalar</strong>.</p>
<p>Sekarang, Anda dapat memetakan model data Anda ke dalam skema bidang, termasuk vektor dan bidang skalar tambahan. Pastikan bahwa setiap field berkorelasi dengan atribut dari model data Anda, terutama memperhatikan tipe vektor (dense atau spase) dan dimensinya.</p>
<h3 id="Vector-Field" class="common-anchor-header">Bidang Vektor</h3><p>Bidang vektor menyimpan penyematan untuk tipe data yang tidak terstruktur seperti teks, gambar, dan audio. Penyematan ini dapat berupa padat, jarang, atau biner, tergantung pada tipe data dan metode pengambilan yang digunakan. Biasanya, vektor padat digunakan untuk pencarian semantik, sedangkan vektor jarang lebih cocok untuk pencocokan teks atau leksikal. Vektor biner berguna ketika penyimpanan dan sumber daya komputasi terbatas. Sebuah koleksi dapat berisi beberapa bidang vektor untuk memungkinkan strategi pencarian multi-modal atau hibrida. Untuk panduan terperinci tentang topik ini, silakan lihat <a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a>.</p>
<p>Milvus mendukung tipe data vektor: <code translate="no">FLOAT_VECTOR</code> untuk <a href="/docs/id/dense-vector.md">Dense Vector</a>, <code translate="no">SPARSE_FLOAT_VECTOR</code> untuk <a href="/docs/id/sparse_vector.md">Sparse Vector</a>, dan <code translate="no">BINARY_VECTOR</code> untuk <a href="/docs/id/binary-vector.md">Binary Vector</a></p>
<h3 id="Scalar-Field" class="common-anchor-header">Bidang Skalar</h3><p>Bidang skalar menyimpan nilai primitif dan terstruktur - biasanya disebut sebagai metadata - seperti angka, string, atau tanggal. Nilai-nilai ini dapat dikembalikan bersama hasil pencarian vektor dan sangat penting untuk pemfilteran dan penyortiran. Nilai ini memungkinkan Anda mempersempit hasil pencarian berdasarkan atribut tertentu, seperti membatasi dokumen pada kategori tertentu atau rentang waktu tertentu.</p>
<p>Milvus mendukung tipe skalar seperti <code translate="no">BOOL</code>, <code translate="no">INT8/16/32/64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code>, <code translate="no">JSON</code>, dan <code translate="no">ARRAY</code> untuk menyimpan dan memfilter data non-vektor. Tipe-tipe ini meningkatkan ketepatan dan penyesuaian operasi pencarian.</p>
<h2 id="Leverage-Advanced-Features-in-Schema-Design" class="common-anchor-header">Memanfaatkan Fitur Canggih dalam Desain Skema<button data-href="#Leverage-Advanced-Features-in-Schema-Design" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika mendesain skema, hanya memetakan data Anda ke bidang menggunakan tipe data yang didukung tidaklah cukup. Sangat penting untuk memiliki pemahaman menyeluruh tentang hubungan antar bidang dan strategi yang tersedia untuk konfigurasi. Dengan mengingat fitur-fitur utama selama fase desain, memastikan bahwa skema tidak hanya memenuhi persyaratan penanganan data langsung, tetapi juga dapat diskalakan dan diadaptasi untuk kebutuhan di masa depan. Dengan mengintegrasikan fitur-fitur ini secara hati-hati, Anda dapat membangun arsitektur data yang kuat yang memaksimalkan kemampuan Milvus dan mendukung strategi dan tujuan data Anda yang lebih luas. Berikut ini adalah ikhtisar fitur-fitur utama yang membuat skema koleksi:</p>
<h3 id="Primary-Key" class="common-anchor-header">Kunci Utama</h3><p>Field kunci utama adalah komponen fundamental dari skema, karena secara unik mengidentifikasi setiap entitas dalam koleksi. Mendefinisikan kunci primer adalah wajib. Ini harus berupa bidang skalar dengan tipe integer atau string dan ditandai sebagai <code translate="no">is_primary=True</code>. Secara opsional, Anda dapat mengaktifkan <code translate="no">auto_id</code> untuk kunci primer, yang secara otomatis diberi nomor integer yang secara monolitik bertambah seiring dengan bertambahnya data yang dimasukkan ke dalam koleksi.</p>
<p>Untuk rincian lebih lanjut, lihat <a href="/docs/id/primary-field.md">Bidang Utama &amp; AutoID</a>.</p>
<h3 id="Partitioning" class="common-anchor-header">Pemilahan</h3><p>Untuk mempercepat pencarian, Anda dapat mengaktifkan partisi secara opsional. Dengan menetapkan bidang skalar tertentu untuk pemartisian dan menentukan kriteria pemfilteran berdasarkan bidang ini selama pencarian, cakupan pencarian dapat secara efektif dibatasi hanya pada partisi yang relevan. Metode ini secara signifikan meningkatkan efisiensi operasi pengambilan dengan mengurangi domain pencarian.</p>
<p>Untuk rincian lebih lanjut, lihat <a href="/docs/id/use-partition-key.md">Menggunakan Kunci Partisi</a>.</p>
<h3 id="Analyzer" class="common-anchor-header">Penganalisis</h3><p>Penganalisis adalah alat penting untuk memproses dan mengubah data teks. Fungsi utamanya adalah mengubah teks mentah menjadi token dan menyusunnya untuk pengindeksan dan pengambilan. Hal ini dilakukan dengan melakukan tokenisasi string, membuang kata-kata yang tidak perlu, dan membendung kata-kata individual menjadi token.</p>
<p>Untuk detail lebih lanjut, lihat <a href="/docs/id/analyzer-overview.md">Tinjauan Umum Penganalisis</a>.</p>
<h3 id="Function" class="common-anchor-header">Fungsi</h3><p>Milvus memungkinkan Anda untuk mendefinisikan fungsi bawaan sebagai bagian dari skema untuk secara otomatis mendapatkan bidang tertentu. Sebagai contoh, Anda dapat menambahkan fungsi BM25 bawaan yang menghasilkan vektor jarang dari bidang <code translate="no">VARCHAR</code> untuk mendukung pencarian teks lengkap. Bidang yang diturunkan dari fungsi ini menyederhanakan prapemrosesan dan memastikan bahwa koleksi tetap berdiri sendiri dan siap untuk kueri.</p>
<p>Untuk rincian lebih lanjut, lihat <a href="/docs/id/full-text-search.md">Pencarian Teks Lengkap</a>.</p>
<h2 id="A-Real-World-Example" class="common-anchor-header">Contoh Dunia Nyata<button data-href="#A-Real-World-Example" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada bagian ini, kami akan menguraikan desain skema dan contoh kode untuk aplikasi pencarian dokumen multimedia yang ditunjukkan pada diagram di atas. Skema ini dirancang untuk mengelola kumpulan data yang berisi artikel dengan pemetaan data ke bidang-bidang berikut:</p>
<table>
   <tr>
     <th><p><strong>Bidang</strong></p></th>
     <th><p><strong>Sumber Data</strong></p></th>
     <th><p><strong>Digunakan Oleh Metode Pencarian</strong></p></th>
     <th><p><strong>Primary Key</strong></p></th>
     <th><p><strong>Kunci Partisi</strong></p></th>
     <th><p><strong>Penganalisis</strong></p></th>
     <th><p><strong>Fungsi Masukan / Keluaran</strong></p></th>
   </tr>
   <tr>
     <td><p>article_id (<code translate="no">INT64</code>)</p></td>
     <td><p>dibuat secara otomatis dengan diaktifkan <code translate="no">auto_id</code></p></td>
     <td><p><a href="/docs/id/get-and-scalar-query.md">Kueri menggunakan Get</a></p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>judul (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>judul artikel</p></td>
     <td><p><a href="/docs/id/keyword-match.md">Pencocokan Teks</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>stempel waktu (<code translate="no">INT32</code>)</p></td>
     <td><p>tanggal penerbitan</p></td>
     <td><p><a href="/docs/id/use-partition-key.md">Filter berdasarkan Kunci Partisi</a></p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>teks (<code translate="no">VARCHAR</code>)</p></td>
     <td><p>teks mentah dari artikel</p></td>
     <td><p><a href="/docs/id/multi-vector-search.md">Pencarian Hibrida Multi-Vektor</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>Y</p></td>
     <td><p>masukan</p></td>
   </tr>
   <tr>
     <td><p>text_dense_vector (<code translate="no">FLOAT_VECTOR</code>)</p></td>
     <td><p>vektor padat yang dihasilkan oleh model penyematan teks</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/BaGlwzDmyiyVvVk6NurcFclInCd?from=from_parent_docs">Pencarian Vektor Dasar</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
   </tr>
   <tr>
     <td><p>text_sparse_vector (<code translate="no">SPARSE_FLOAT_VECTOR</code>)</p></td>
     <td><p>vektor jarang yang dihasilkan secara otomatis oleh fungsi BM25 bawaan</p></td>
     <td><p><a href="https://zilliverse.feishu.cn/wiki/RQTRwhOVPiwnwokqr4scAtyfnBf?from=from_parent_docs">Pencarian Teks Lengkap</a></p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>N</p></td>
     <td><p>keluaran</p></td>
   </tr>
</table>
<p>Untuk informasi lebih lanjut tentang skema dan panduan terperinci tentang cara menambahkan berbagai jenis bidang, silakan lihat <a href="/docs/id/schema.md">Penjelasan Skema</a>.</p>
<h3 id="Initialize-schema" class="common-anchor-header">Menginisialisasi skema</h3><p>Untuk memulai, kita perlu membuat skema kosong. Langkah ini menetapkan struktur dasar untuk mendefinisikan model data.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create an empty schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-comment">//Skip this step using JavaScript</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Skip this step using cURL</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-fields" class="common-anchor-header">Menambahkan bidang</h3><p>Setelah skema dibuat, langkah selanjutnya adalah menentukan bidang yang akan menjadi bagian dari data Anda. Setiap field diasosiasikan dengan tipe data dan atributnya masing-masing.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType

schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, enable_analyzer=<span class="hljs-literal">True</span>, enable_match=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;timestamp&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish date&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">2000</span>, enable_analyzer=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article text content&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;text dense vector&quot;</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;text_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;text sparse vector&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;article_id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">200</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .enableMatch(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;timestamp&quot;</span>)
        .dataType(DataType.Int32)
        .build())
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">2000</span>)
        .enableAnalyzer(<span class="hljs-literal">true</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">768</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>)
        .dataType(DataType.SparseFloatVector)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;article_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">200</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">enable_match</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;timestamp&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int32</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">enable_analyzer</span>: <span class="hljs-literal">true</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_dense_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_sparse_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SparseFloatVector</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;article_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>).
    WithIsAutoID(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article id&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;title&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">200</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithEnableMatch(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article title&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;timestamp&quot;</span>).
    WithDataType(entity.FieldTypeInt32).
    WithDescription(<span class="hljs-string">&quot;publish date&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">2000</span>).
    WithEnableAnalyzer(<span class="hljs-literal">true</span>).
    WithDescription(<span class="hljs-string">&quot;article text content&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_dense_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">768</span>).
    WithDescription(<span class="hljs-string">&quot;text dense vector&quot;</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithDataType(entity.FieldTypeSparseVector).
    WithDescription(<span class="hljs-string">&quot;text sparse vector&quot;</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> fields=<span class="hljs-string">&#x27;[
    {
        &quot;fieldName&quot;: &quot;article_id&quot;,
        &quot;dataType&quot;: &quot;Int64&quot;,
        &quot;isPrimary&quot;: true
    },
    {
        &quot;fieldName&quot;: &quot;title&quot;,
        &quot;dataType&quot;: &quot;VarChar&quot;,
        &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 200,
            &quot;enable_analyzer&quot;: true,
            &quot;enable_match&quot;: true
        }
    },
    {
        &quot;fieldName&quot;: &quot;timestamp&quot;,
        &quot;dataType&quot;: &quot;Int32&quot;
    },
    {
       &quot;fieldName&quot;: &quot;text&quot;,
       &quot;dataType&quot;: &quot;VarChar&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 2000,
            &quot;enable_analyzer&quot;: true
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_dense_vector&quot;,
       &quot;dataType&quot;: &quot;FloatVector&quot;,
       &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: 768
        }
    },
    {
       &quot;fieldName&quot;: &quot;text_sparse_vector&quot;,
       &quot;dataType&quot;: &quot;SparseFloatVector&quot;,
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dalam contoh ini, atribut-atribut berikut ini ditentukan untuk field:</p>
<ul>
<li><p>Primary key: <code translate="no">article_id</code> digunakan sebagai primary key yang memungkinkan pengalokasian primary key secara otomatis untuk entitas yang masuk.</p></li>
<li><p>Kunci partisi: <code translate="no">timestamp</code> ditetapkan sebagai kunci partisi yang memungkinkan pemfilteran berdasarkan partisi. Hal ini dapat berupa</p></li>
<li><p>Penganalisis teks: penganalisis teks diterapkan pada 2 bidang string <code translate="no">title</code> dan <code translate="no">text</code> untuk mendukung pencocokan teks dan pencarian teks lengkap.</p></li>
</ul>
<h3 id="Optional-Add-functions" class="common-anchor-header">(Opsional) Menambahkan fungsi</h3><p>Untuk meningkatkan kemampuan kueri data, fungsi dapat dimasukkan ke dalam skema. Sebagai contoh, sebuah fungsi dapat dibuat untuk memproses yang terkait dengan bidang tertentu.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse_vector&quot;</span>],
    function_type=FunctionType.BM25,
)

schema.add_function(bm25_function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq.Function;

<span class="hljs-keyword">import</span> java.util.*;

schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name(<span class="hljs-string">&quot;text_bm25&quot;</span>)
        .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text&quot;</span>))
        .outputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">FunctionType</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> functions = [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;text_bm25&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;bm25 function&#x27;</span>,
      <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">BM25</span>,
      <span class="hljs-attr">input_field_names</span>: [<span class="hljs-string">&#x27;text&#x27;</span>],
      <span class="hljs-attr">output_field_names</span>: [<span class="hljs-string">&#x27;text_sparse_vector&#x27;</span>],
      <span class="hljs-attr">params</span>: {},
    },
]；
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">function := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;text_bm25&quot;</span>).
    WithInputFields(<span class="hljs-string">&quot;text&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;text_sparse_vector&quot;</span>).
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(function)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> myFunctions=<span class="hljs-string">&#x27;[
    {
        &quot;name&quot;: &quot;text_bm25&quot;,
        &quot;type&quot;: &quot;BM25&quot;,
        &quot;inputFieldNames&quot;: [&quot;text&quot;],
        &quot;outputFieldNames&quot;: [&quot;text_sparse_vector&quot;],
        &quot;params&quot;: {}
    }
]&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: true,
    \&quot;fields\&quot;: <span class="hljs-variable">$fields</span>
    \&quot;functions\&quot;: <span class="hljs-variable">$myFunctions</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Contoh ini menambahkan fungsi BM25 bawaan di dalam skema, memanfaatkan bidang <code translate="no">text</code> sebagai masukan dan menyimpan vektor jarang yang dihasilkan di bidang <code translate="no">text_sparse_vector</code>.</p>
<h2 id="Next-Steps" class="common-anchor-header">Langkah selanjutnya<button data-href="#Next-Steps" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/id/create-collection.md">Membuat Koleksi</a></p></li>
<li><p><a href="/docs/id/alter-collection-field.md">Mengubah Bidang Koleksi</a></p></li>
</ul>
