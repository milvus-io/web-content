---
id: schema-hands-on.md
title: Desain Skema Secara Langsung
summary: >-
  Milvus mendukung pendefinisian model data melalui skema koleksi. Koleksi
  mengatur data yang tidak terstruktur seperti teks dan gambar, bersama dengan
  representasi vektornya, termasuk vektor padat dan vektor jarang dalam berbagai
  presisi yang digunakan untuk pencarian semantik. Selain itu, Milvus mendukung
  penyimpanan dan penyaringan tipe data non-vektor yang disebut "Skalar".
  Tipe-tipe skalar termasuk BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON,
  dan Array.
---
<h1 id="Schema-Design-Hands-On​" class="common-anchor-header">Desain Skema Secara Langsung<button data-href="#Schema-Design-Hands-On​" class="anchor-icon" translate="no">
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
    </button></h1><p>Sistem Information Retrieval (IR), yang juga dikenal sebagai pencarian, sangat penting untuk berbagai aplikasi AI seperti Retrieval-augmented generation (RAG), pencarian gambar, dan rekomendasi produk. Langkah pertama dalam mengembangkan sistem IR adalah mendesain model data, yang melibatkan analisis kebutuhan bisnis, menentukan cara mengatur informasi, dan mengindeks data agar dapat dicari secara semantik.</p>
<p>Milvus mendukung pendefinisian model data melalui skema koleksi. Koleksi mengatur data yang tidak terstruktur seperti teks dan gambar, bersama dengan representasi vektornya, termasuk vektor padat dan vektor jarang dalam berbagai presisi yang digunakan untuk pencarian semantik. Selain itu, Milvus mendukung penyimpanan dan penyaringan tipe data non-vektor yang disebut &quot;Skalar&quot;. Tipe-tipe skalar termasuk BOOL, INT8/16/32/64, FLOAT/DOUBLE, VARCHAR, JSON, dan Array.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/schema-hands-on.png" alt="Example data schema designed for searching news article" class="doc-image" id="example-data-schema-designed-for-searching-news-article" />
   </span> <span class="img-wrapper"> <span>Contoh skema data yang dirancang untuk mencari artikel berita</span> </span></p>
<p>Desain model data dari sistem pencarian melibatkan analisis kebutuhan bisnis dan abstraksi informasi ke dalam model data yang diekspresikan dengan skema. Misalnya, untuk mencari sebuah teks, teks tersebut harus &quot;diindeks&quot; dengan mengubah string literal menjadi vektor melalui &quot;penyematan&quot;, sehingga memungkinkan pencarian vektor. Di luar persyaratan dasar ini, mungkin perlu untuk menyimpan properti lain seperti stempel waktu publikasi dan penulis. Metadata ini memungkinkan pencarian semantik disempurnakan melalui penyaringan, sehingga hanya menampilkan teks yang diterbitkan setelah tanggal tertentu atau oleh pengarang tertentu. Metadata ini mungkin juga perlu diambil bersama dengan teks utama, untuk menampilkan hasil pencarian dalam aplikasi. Untuk mengatur potongan-potongan teks ini, masing-masing harus diberi pengenal unik, yang dinyatakan sebagai bilangan bulat atau string. Elemen-elemen ini sangat penting untuk mencapai logika pencarian yang canggih.</p>
<p>Skema yang dirancang dengan baik sangat penting karena skema ini mengabstraksikan model data dan memutuskan apakah tujuan bisnis dapat dicapai melalui pencarian. Selain itu, karena setiap baris data yang dimasukkan ke dalam koleksi harus mengikuti skema, hal ini sangat membantu untuk menjaga konsistensi data dan kualitas jangka panjang. Dari perspektif teknis, skema yang terdefinisi dengan baik akan menghasilkan penyimpanan data kolom yang terorganisir dengan baik dan struktur indeks yang lebih bersih, yang dapat meningkatkan kinerja pencarian.</p>
<h1 id="An-Example-News-Search​" class="common-anchor-header">Contoh: Pencarian Berita<button data-href="#An-Example-News-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>Katakanlah kita ingin membangun pencarian untuk situs web berita dan kita memiliki korpus berita dengan teks, gambar mini, dan metadata lainnya. Pertama, kita perlu menganalisis bagaimana kita ingin memanfaatkan data tersebut untuk mendukung kebutuhan bisnis pencarian. Bayangkan kebutuhannya adalah mengambil berita berdasarkan gambar thumbnail dan ringkasan konten, dan mengambil metadata seperti info penulis dan waktu penerbitan sebagai kriteria untuk memfilter hasil pencarian. Persyaratan ini dapat dibagi lagi menjadi beberapa bagian.</p>
<ul>
<li><p>Untuk mencari gambar melalui teks, kita dapat menyematkan gambar ke dalam vektor melalui model penyematan multimodal yang dapat memetakan data teks dan gambar ke dalam ruang laten yang sama.</p></li>
<li><p>Teks ringkasan artikel disematkan ke dalam vektor melalui model penyematan teks.</p></li>
<li><p>Untuk memfilter berdasarkan waktu penerbitan, tanggal disimpan sebagai bidang skalar dan indeks diperlukan untuk bidang skalar untuk penyaringan yang efisien. Struktur data lain yang lebih kompleks seperti JSON dapat disimpan dalam bentuk skalar dan pencarian yang difilter dilakukan pada isinya (pengindeksan JSON adalah fitur yang akan datang).</p></li>
<li><p>Untuk mengambil byte thumbnail gambar dan merendernya pada halaman hasil pencarian, url gambar juga disimpan. Demikian pula untuk teks ringkasan dan judul. (Sebagai alternatif, kita dapat menyimpan data file teks dan gambar mentah sebagai bidang skalar jika diperlukan).</p></li>
<li><p>Untuk meningkatkan hasil pencarian pada teks ringkasan, kami merancang pendekatan pencarian hybrid. Untuk satu jalur pencarian, kami menggunakan model penyisipan biasa untuk menghasilkan vektor padat dari teks, seperti <code translate="no">text-embedding-3-large</code> milik OpenAI atau sumber terbuka <code translate="no">bge-large-en-v1.5</code>. Model-model ini bagus dalam merepresentasikan keseluruhan semantik teks. Cara lainnya adalah dengan menggunakan model penyematan jarang seperti BM25 atau SPLADE untuk menghasilkan vektor yang jarang, menyerupai pencarian teks lengkap yang baik dalam memahami detail dan konsep individual dalam teks. Milvus mendukung penggunaan keduanya dalam pengumpulan data yang sama berkat fitur multi-vektornya. Pencarian pada beberapa vektor dapat dilakukan dalam satu operasi <code translate="no">hybrid_search()</code>.</p></li>
<li><p>Terakhir, kita juga membutuhkan kolom ID untuk mengidentifikasi setiap halaman berita, yang secara resmi disebut sebagai "entitas" dalam terminologi Milvus. Bidang ini digunakan sebagai kunci utama (atau disingkat "pk").</p></li>
</ul>
<table data-block-token="EOxnd1GqhoODuWx4UyucOMahn0e"><thead><tr><th data-block-token="P2g0djnY5oRKT7xw7aSceiaQnRb" colspan="1" rowspan="1"><p data-block-token="TrIsdjxzooLqxUxiqkTcfN5pnHd">Nama Field</p>
</th><th data-block-token="KVq4dDr4BovOHSxtWd5cZBnnnn5" colspan="1" rowspan="1"><p data-block-token="D9uYdwp8ToHqXmxqueVcBAi2n6b">article_id (Kunci Utama)</p>
</th><th data-block-token="O6jTdN4rBouwtQxFNgpcM7GFnyp" colspan="1" rowspan="1"><p data-block-token="IJuldjRIeoNHRgx0ix5c2eBSn6f">judul</p>
</th><th data-block-token="V4EKdYzLqoENTTxXuOwcVTIGnLg" colspan="1" rowspan="1"><p data-block-token="Tldydg7BboZeSUxiaTfcUnsfnqd">author_info</p>
</th><th data-block-token="GHF6dqGRVoQ6Kpxv9tUcijFXnVc" colspan="1" rowspan="1"><p data-block-token="Ih0jdg4yToRJOkxyriwcKJ39nVd">publish_ts</p>
</th><th data-block-token="Ui3ldA2BwovU8LxMHcIcrmVvnLg" colspan="1" rowspan="1"><p data-block-token="PJGJdX1efoo647xvgCDcuhkznye">image_url</p>
</th><th data-block-token="VCskd6ySvocz8IxF5CVcpmF5n0b" colspan="1" rowspan="1"><p data-block-token="Cx7idKjgYoctpYxsnskc7OD0nxb">image_vector</p>
</th><th data-block-token="WSbhdTqglocn3KxpvBscFOh2n6d" colspan="1" rowspan="1"><p data-block-token="Q16ods013oZUOQxk9vicK0JGn2e">ringkasan</p>
</th><th data-block-token="T5HAdXwado1qJpxCpf9cwDjmnhe" colspan="1" rowspan="1"><p data-block-token="ZG3odG5k2oMqFSxM8TFcE8kZnCh">ringkasan_vektor_padat</p>
</th><th data-block-token="MWAHdYgIvogpIfxsRnscz5WWnOe" colspan="1" rowspan="1"><p data-block-token="MeU1dGziaodmTkxc5q9cvYR9ndd">ringkasan_ringkasan_jarang_vektor</p>
</th></tr></thead><tbody><tr><td data-block-token="V1x7d7y15oxxNSxpvRJcoW7VnWh" colspan="1" rowspan="1"><p data-block-token="X9old4LgooPgrexElIBc2JgNnac">Tipe</p>
</td><td data-block-token="EWlPdiRtBoqrOYxLoWDcnPUQn3f" colspan="1" rowspan="1"><p data-block-token="TtABd1mq0o2ShTxtXfncI8i9n8g">INT64</p>
</td><td data-block-token="ZICad5qEYohcTvxo477cZIWInCh" colspan="1" rowspan="1"><p data-block-token="CBHWdVhLKo2wn1xR3Pocf43NnRs">VARCHAR</p>
</td><td data-block-token="VTwJdpuQboqurJxXbQUctG8fnNc" colspan="1" rowspan="1"><p data-block-token="OI1ldgzbAoEIOUx7boRcooR0nvb">JSON</p>
</td><td data-block-token="UVWKdd69Mo8hyyxOqLLcZn7kncc" colspan="1" rowspan="1"><p data-block-token="QJUZdxgzEora0PxAxf8c1axknbp">INT32</p>
</td><td data-block-token="Wf8AdfYj1on0OkxjHkocPiqInYe" colspan="1" rowspan="1"><p data-block-token="KE0QdVg3doF05Exq3fmccqOcnvc">VARCHAR</p>
</td><td data-block-token="JVHgd9P9aoSl9mxqoFfcM7ownXz" colspan="1" rowspan="1"><p data-block-token="TwotdcMshoE2TSxGIauclTZjnLh">FLOAT_VECTOR</p>
</td><td data-block-token="MUwwdyV4co3V2QxOxc1cMuD9nbc" colspan="1" rowspan="1"><p data-block-token="RpfxdP0AHoW0xhx8sfBclJvtnyc">VARCHAR</p>
</td><td data-block-token="P4bqdeIGOoV67FxhYmtclfBpn1d" colspan="1" rowspan="1"><p data-block-token="RyztdWGXzoP4IBxHd8Pcu0q2nbe">FLOAT_VECTOR</p>
</td><td data-block-token="AtJldXTWUoT5FPxY6EncUqWsnrc" colspan="1" rowspan="1"><p data-block-token="FJMJdqKeFodc73xGlnpcYgJanWg">VEKTOR FLOAT_JARANG</p>
</td></tr><tr><td data-block-token="ZAKYdJAv6oj5IxxYUaUcLFOEnkh" colspan="1" rowspan="1"><p data-block-token="Frr0dWnzWo5UFDxLfqaceqvSnmg">Indeks Kebutuhan</p>
</td><td data-block-token="ONHadATa9ojiwAxEwUdcaJpOnbb" colspan="1" rowspan="1"><p data-block-token="ZGT8dgMGbo8r22xpFztcycKDn9c">N</p>
</td><td data-block-token="E3Hod6CkXozMt4x0xF6cPkdin4e" colspan="1" rowspan="1"><p data-block-token="Ha0PdI0byocer9xXJGac8QYdnPg">N</p>
</td><td data-block-token="NaJ5dcptooRPe8xk9VTcx6Amnld" colspan="1" rowspan="1"><p data-block-token="U57edD6zqoPY7LxQjPDcnNDVnxc">N (Dukungan segera hadir)</p>
</td><td data-block-token="MqejdtkWboMHmZxWWCAcK7X0n1e" colspan="1" rowspan="1"><p data-block-token="NeNJdcEvloQ4E7xN9JeczCORnQX">Y</p>
</td><td data-block-token="VKy3driI9owHhCx1l4Iczj8Hnkb" colspan="1" rowspan="1"><p data-block-token="QRWQdK0J3oWYc0x8xT6c4Me5nXb">N</p>
</td><td data-block-token="EZR0dRNXpotMtdxAKG9cHj8zn2c" colspan="1" rowspan="1"><p data-block-token="LTyRduM2FoGmkVxa1HgceBFbnKf">Y</p>
</td><td data-block-token="W3MydyW7bod6UaxdNURcqTnBnFb" colspan="1" rowspan="1"><p data-block-token="EwbCdu2ZZop4zJxbyhZcR2HunUh">N</p>
</td><td data-block-token="XQdvd35mVov5cUxstzpcipmlni8" colspan="1" rowspan="1"><p data-block-token="SJoudzWmiouT20xXCCpcQR1Mnsz">Y</p>
</td><td data-block-token="MXntdRmaUo91QoxGeNgc9goanee" colspan="1" rowspan="1"><p data-block-token="Sxfzdk7VoocU6kxAV63cI3ObnTe">Y</p>
</td></tr></tbody></table>
<h1 id="How-to-Implement-the-Example-Schema​" class="common-anchor-header">Cara Menerapkan Contoh Skema<button data-href="#How-to-Implement-the-Example-Schema​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Create-Schema​" class="common-anchor-header">Membuat Skema<button data-href="#Create-Schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pertama, kita membuat instance klien Milvus, yang dapat digunakan untuk terhubung ke server Milvus dan mengelola koleksi dan data. </p>
<p>Untuk menyiapkan skema, kita menggunakan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> untuk membuat objek skema dan <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> untuk menambahkan field ke skema.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>​
​
<span class="hljs-comment"># client = MilvusClient(uri=&quot;http://localhost:19530&quot;)​</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>)​
​
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;article_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;article id&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">200</span>, description=<span class="hljs-string">&quot;article title&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;author_info&quot;</span>, datatype=DataType.JSON, description=<span class="hljs-string">&quot;author information&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>, datatype=DataType.INT32, description=<span class="hljs-string">&quot;publish timestamp&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_url&quot;</span>, datatype=DataType.VARCHAR,  max_length=<span class="hljs-number">500</span>, description=<span class="hljs-string">&quot;image URL&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;image_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;image vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, description=<span class="hljs-string">&quot;article summary&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, description=<span class="hljs-string">&quot;summary dense vector&quot;</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR, description=<span class="hljs-string">&quot;summary sparse vector&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<p>Anda mungkin melihat argumen <code translate="no">uri</code> di <code translate="no">MilvusClient</code>, yang digunakan untuk menghubungkan ke server Milvus. Anda dapat mengatur argumen sebagai berikut.</p>
<ul>
<li><p>Jika Anda hanya membutuhkan basis data vektor lokal untuk data skala kecil atau pembuatan prototipe, mengatur uri sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</p></li>
<li><p>Jika Anda memiliki data berskala besar, misalnya lebih dari satu juta vektor, Anda dapat menyiapkan server Milvus yang lebih berkinerja tinggi di <a href="https://milvus.io/docs/quickstart.md">Docker atau Kubernetes</a>. Dalam pengaturan ini, gunakan alamat dan port server sebagai uri Anda, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi di Milvus, gunakan "&lt;nama_user Anda&gt;:&lt;kata sandi Anda&gt;" sebagai token, jika tidak, jangan setel token.</p></li>
<li><p>Jika Anda menggunakan <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, layanan cloud yang dikelola sepenuhnya untuk Milvus, sesuaikan <code translate="no">uri</code> dan <code translate="no">token</code>, yang sesuai dengan <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">Public Endpoint dan API key</a> di Zilliz Cloud.</p></li>
</ul>
<p>Sedangkan untuk <code translate="no">auto_id</code> di <code translate="no">MilvusClient.create_schema</code>, AutoID adalah atribut dari bidang utama yang menentukan apakah akan mengaktifkan kenaikan otomatis untuk bidang utama.  Karena kami menetapkan field<code translate="no">article_id</code> sebagai kunci utama dan ingin menambahkan id artikel secara manual, kami menetapkan <code translate="no">auto_id</code> False untuk menonaktifkan fitur ini.</p>
<p>Setelah menambahkan semua field ke objek skema, objek skema kita setuju dengan entri pada tabel di atas.</p>
<h2 id="Define-Index​" class="common-anchor-header">Menentukan Indeks<button data-href="#Define-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah mendefinisikan skema dengan berbagai bidang, termasuk metadata dan bidang vektor untuk data gambar dan ringkasan, langkah selanjutnya adalah menyiapkan parameter indeks. Pengindeksan sangat penting untuk mengoptimalkan pencarian dan pengambilan vektor, untuk memastikan kinerja kueri yang efisien. Pada bagian berikut, kita akan menentukan parameter indeks untuk bidang vektor dan skalar yang ditentukan dalam koleksi.</p>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_dense_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;summary_sparse_vector&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
)​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;publish_ts&quot;</span>,​
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Setelah parameter indeks diatur dan diterapkan, Milvus dioptimalkan untuk menangani kueri yang kompleks pada data vektor dan skalar. Pengindeksan ini meningkatkan kinerja dan keakuratan pencarian kemiripan di dalam koleksi, sehingga memungkinkan pengambilan artikel secara efisien berdasarkan vektor gambar dan vektor ringkasan. Dengan memanfaatkan fitur <a href="https://milvus.io/docs/glossary.md#Auto-Index"><code translate="no">AUTOINDEX</code></a> untuk vektor padat, fitur <a href="https://milvus.io/docs/sparse_vector.md#Index-the-collection"><code translate="no">SPARSE_INVERTED_INDEX</code></a> untuk vektor jarang dan <a href="https://milvus.io/docs/scalar_index.md#Inverted-indexing"><code translate="no">INVERTED_INDEX</code></a> untuk skalar, Milvus dapat dengan cepat mengidentifikasi dan mengembalikan hasil yang paling relevan, sehingga secara signifikan meningkatkan pengalaman pengguna secara keseluruhan dan efektivitas proses pencarian data.</p>
<p>Ada banyak jenis indeks dan metrik. Untuk informasi lebih lanjut tentang mereka, Anda dapat merujuk ke <a href="https://milvus.io/docs/overview.md#Index-types">jenis indeks Milvus</a> dan <a href="https://milvus.io/docs/glossary.md#Metric-type">jenis metrik Milvus</a>.</p>
<h2 id="Create-Collection​" class="common-anchor-header">Membuat Koleksi<button data-href="#Create-Collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Dengan skema dan indeks yang telah ditentukan, kita membuat "collection" dengan parameter-parameter tersebut. Koleksi untuk Milvus adalah seperti sebuah tabel untuk DB relasional.</p>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=collection_name,​
    schema=schema,​
    index_params=index_params,​
)​

<button class="copy-code-btn"></button></code></pre>
<p>Kita dapat memverifikasi bahwa koleksi telah berhasil dibuat dengan mendeskripsikan koleksi tersebut.</p>
<pre><code translate="no" class="language-python">collection_desc = client.describe_collection(​
    collection_name=collection_name​
)​
<span class="hljs-built_in">print</span>(collection_desc)​

<button class="copy-code-btn"></button></code></pre>
<h1 id="Other-Considerations​" class="common-anchor-header">Pertimbangan lain<button data-href="#Other-Considerations​" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Loading-Index​" class="common-anchor-header">Memuat Indeks<button data-href="#Loading-Index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Ketika membuat koleksi di Milvus, Anda dapat memilih untuk memuat indeks dengan segera atau menundanya sampai setelah memasukkan beberapa data secara massal. Biasanya, Anda tidak perlu membuat pilihan eksplisit mengenai hal ini, karena contoh di atas menunjukkan bahwa indeks secara otomatis dibuat untuk setiap data yang di-ingest langsung setelah pembuatan koleksi. Hal ini memungkinkan pencarian data yang telah di-entry dapat dilakukan dengan segera. Namun, jika Anda memiliki sisipan massal yang besar setelah pembuatan koleksi dan tidak perlu mencari data apa pun hingga titik tertentu, Anda dapat menunda pembuatan indeks dengan menghilangkan index_params dalam pembuatan koleksi dan membangun indeks dengan memanggil load secara eksplisit setelah meng-insert semua data. Cara ini lebih efisien untuk membangun indeks pada koleksi yang besar, tetapi tidak ada pencarian yang dapat dilakukan sampai memanggil load().</p>
<h2 id="How-to-Define-Data-Model-For-Multi-tenancy​" class="common-anchor-header">Bagaimana Mendefinisikan Model Data Untuk Multi-penyewaan<button data-href="#How-to-Define-Data-Model-For-Multi-tenancy​" class="anchor-icon" translate="no">
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
    </button></h2><p>Konsep beberapa penyewa biasanya digunakan dalam skenario di mana satu aplikasi perangkat lunak atau layanan perlu melayani beberapa pengguna atau organisasi independen, masing-masing dengan lingkungan yang terisolasi. Hal ini sering terlihat pada komputasi awan, aplikasi SaaS (Software as a Service), dan sistem basis data. Sebagai contoh, layanan penyimpanan cloud dapat menggunakan multi-tenancy untuk memungkinkan perusahaan yang berbeda untuk menyimpan dan mengelola data mereka secara terpisah sambil berbagi infrastruktur yang sama. Pendekatan ini memaksimalkan pemanfaatan sumber daya dan efisiensi sambil memastikan keamanan dan privasi data untuk setiap penyewa.</p>
<p>Cara termudah untuk membedakan penyewa adalah dengan mengisolasi data dan sumber daya mereka satu sama lain. Setiap penyewa memiliki akses eksklusif ke sumber daya tertentu atau berbagi sumber daya dengan yang lain untuk mengelola entitas Milvus seperti basis data, koleksi, dan partisi. Ada metode khusus yang selaras dengan entitas-entitas ini untuk mengimplementasikan multi-tenancy Milvus. Anda dapat merujuk ke <a href="https://milvus.io/docs/multi_tenancy.md#Multi-tenancy-strategies">halaman multi-tenancy Milvus</a> untuk informasi lebih lanjut.</p>
