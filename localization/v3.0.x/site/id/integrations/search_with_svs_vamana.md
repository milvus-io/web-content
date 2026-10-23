---
id: search_with_svs_vamana.md
summary: >-
  Buat dan lakukan pencarian pada indeks graf SVS Vamana dalam memori di Milvus
  melalui fitur passthrough indeks FAISS, dengan kompresi LeanVec atau LVQ
  opsional pada CPU Intel.
title: Pencarian dengan SVS Vamana dan Milvus
---
<h1 id="Search-with-SVS-Vamana-and-Milvus" class="common-anchor-header">Pencarian dengan SVS Vamana dan Milvus<button data-href="#Search-with-SVS-Vamana-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/intel/ScalableVectorSearch">SVS</a> (Scalable Vector Search) adalah pustaka pencarian vektor berkinerja tinggi dari Intel yang mengimplementasikan algoritma graf Vamana. Di Milvus, Anda dapat mengakses SVS Vamana melalui fitur <a href="https://milvus.io/docs/faiss.md">passthrough indeks FAISS</a>: atur ` <code translate="no">index_type</code> ` menjadi ` <code translate="no">FAISS</code> ` dan berikan string ` <code translate="no">SVSVamana</code> ` sebagai index-factory, lalu Milvus akan membangun dan melakukan pencarian pada indeks tersebut melalui integrasi SVS dari FAISS.</p>
<p>Vamana adalah struktur graf yang juga digunakan oleh <a href="https://milvus.io/docs/diskann.md">DISKANN</a>, tetapi SVS Vamana menyimpan seluruh graf di memori. SVS Vamana juga dapat mengompres vektor dengan <strong>LeanVec</strong> atau <strong>LVQ</strong>, yang mengurangi penggunaan memori dan mempercepat pencarian sambil tetap mencapai tingkat recall yang sangat tinggi.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 atau yang lebih baru, dibangun dari sumber dengan SVS diaktifkan</li>
<li>PyMilvus 3.0.0 atau yang lebih baru</li>
<li>Prosesor Intel jika Anda menggunakan penyimpan <code translate="no">LVQ*</code>, atau <code translate="no">LeanVec*</code>; penyimpan <code translate="no">FP32</code>, <code translate="no">FP16</code>, dan <code translate="no">SQ8</code> dapat berjalan di platform apa pun</li>
<li>Memahami <a href="https://milvus.io/docs/faiss.md">string index-factory FAISS</a></li>
</ul>
<div class="alert note">
<p>SVS tidak termasuk dalam build Milvus default. Untuk menggunakan string pabrik <code translate="no">SVSVamana</code>, bangun Milvus dari sumber dengan <code translate="no">make USE_SVS=ON</code>. Dalam build tanpa SVS, pembuatan indeks akan gagal karena Faiss tidak mengenali string pabrik tersebut.</p>
</div>
<p>Kompresi LVQ dan LeanVec hanya berjalan pada CPU Intel, dan berjalan lebih cepat pada CPU dengan AVX-512. Pada CPU lain, pembuatan indeks akan gagal untuk string pabrik <code translate="no">LVQ*</code> dan <code translate="no">LeanVec*</code>.</p>
<h2 id="How-SVS-Vamana-works" class="common-anchor-header">Cara Kerja SVS Vamana<button data-href="#How-SVS-Vamana-works" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Vamana-graph" class="common-anchor-header">Grafik Vamana<button data-href="#Vamana-graph" class="anchor-icon" translate="no">
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
    </button></h3><p>SVS Vamana membangun grafik kedekatan satu lapisan. Setiap vektor merupakan simpul, dan tepi menghubungkan vektor-vektor yang kemungkinan besar merupakan tetangga terdekat. Untuk membangun grafik, SVS melakukan hal berikut untuk setiap simpul <strong>x</strong>:</p>
<ol>
<li><p><strong>Pencarian rakus</strong>: SVS menelusuri grafik yang telah dibangun sejauh ini, sambil menyimpan daftar kandidat berukuran <code translate="no">construction_window_size</code>.</p></li>
<li><p><strong>Pemangkasan tetangga</strong>: Simpul yang telah dikunjungi menjadi kandidat tetangga untuk <strong>x</strong>. SVS mempertimbangkannya berdasarkan urutan jarak yang semakin jauh dari <strong>x</strong>. Seorang kandidat <code translate="no">c</code> akan dilewati jika tetangga yang lebih dekat <code translate="no">n</code> yang telah disimpan memenuhi syarat <code translate="no">alpha * distance(n, c) &lt;= distance(x, c)</code>. Hal ini mempertahankan tepi jarak jauh dan menghilangkan tepi jarak dekat yang berlebihan, sehingga pencarian dapat melompati graf alih-alih bergerak melaluinya satu tetangga terdekat pada satu waktu. Pemangkasan berhenti begitu derajat graf tercapai.</p></li>
<li><p><strong>Sisi balik</strong>: Untuk setiap tetangga baru dari <strong>x</strong>, SVS menambahkan sisi balik ke <strong>x</strong> dan memangkas daftar sisi tetangga tersebut jika melebihi derajat graf.</p></li>
</ol>
<p>Pemangkasan dilakukan dalam dua tahap: pertama dengan ` <code translate="no">alpha = 1</code>`, kemudian dengan ` <code translate="no">alpha</code>` yang telah dikonfigurasi. Derajat graf yang lebih besar dan ` <code translate="no">construction_window_size</code> ` menghasilkan graf yang lebih padat dan berkualitas lebih tinggi, tetapi menggunakan lebih banyak memori dan membutuhkan waktu lebih lama untuk dibangun.</p>
<p>Pada saat pencarian, SVS menjelajahi graf secara rakus (greedy), menyimpan kandidat terdekat yang telah dilihat sejauh ini dalam daftar " <code translate="no">search_window_size</code> ". SVS selalu menjelajahi kandidat terdekat yang belum dikunjungi berikutnya. Pencarian berakhir begitu setiap tetangga dari simpul saat ini lebih jauh dari kueri daripada kandidat terburuk dalam jendela. Nilai " <code translate="no">search_window_size</code> " yang lebih besar menjelajahi lebih banyak bagian graf, yang meningkatkan recall tetapi juga meningkatkan latensi.</p>
<h3 id="LeanVec-compression" class="common-anchor-header">Kompresi LeanVec<button data-href="#LeanVec-compression" class="anchor-icon" translate="no">
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
    </button></h3><p><a href="https://openreview.net/forum?id=wczqrpOrIc">LeanVec</a> mengurangi jumlah dimensi per vektor dan jumlah bit per dimensi. Indeks LeanVec menyimpan dua representasi dari setiap vektor:</p>
<ul>
<li><p><strong>Primer (dimensi yang dikurangi)</strong>: Proyeksi linier vektor ke jumlah dimensi yang lebih kecil. Pencarian graf dijalankan pada kumpulan data primer ini, sehingga sebagian besar perhitungan jarak terjadi di ruang berdimensi lebih rendah. Hal ini mengurangi kebutuhan komputasi dan bandwidth memori. Secara default, dimensi yang dikurangi setengah dari dimensi asli (<code translate="no">dim / 2</code>).</p></li>
<li><p><strong>Sekunder (dimensi penuh)</strong>: Vektor pada dimensi aslinya. SVS melakukan pemeringkatan ulang kandidat yang dikembalikan oleh pencarian graf primer terhadap kumpulan data sekunder ini untuk memulihkan akurasi yang hilang akibat pengurangan dimensi.</p></li>
</ul>
<p>Kedua representasi tersebut dikuantisasi dengan <a href="https://vldb.org/pvldb/volumes/16/paper/Similarity%20search%20in%20the%20blink%20of%20an%20eye%20with%20compressed%20indices">LVQ</a> (Locally-adaptive Vector Quantization). Komponen penyimpanan dari string pabrik menentukan pengkodean yang digunakan. Misalnya, <code translate="no">LeanVec4x8</code> menggunakan 4 bit per dimensi untuk dataset primer dan 8 bit per dimensi untuk dataset sekunder. Bahkan pada langkah pemeringkatan ulang, vektor presisi penuh tidak pernah dibaca.</p>
<p>Secara default, LeanVec mempelajari proyeksi terpisah untuk vektor yang diindeks dan untuk kueri, guna mendukung kueri yang berasal dari distribusi yang berbeda dari vektor yang diindeks (out-of-distribution, atau OOD). Hal ini bekerja dengan sangat baik untuk beban kerja lintas-modal seperti pencarian teks-ke-gambar, dan juga bekerja dengan baik ketika kueri berasal dari distribusi yang sama dengan vektor yang diindeks. Milvus belum mendukung cara untuk meneruskan kueri guna menghitung proyeksi, sehingga saat ini hanya vektor dasar yang digunakan. Pelatihan OOD menambah waktu pembangunan. Untuk mempercepat proses pembangunan dengan mengorbankan sedikit kinerja kueri, atur ` <code translate="no">ood_training</code> ` menjadi ` <code translate="no">False</code>`.</p>
<h3 id="LVQ-compression" class="common-anchor-header">Kompresi LVQ<button data-href="#LVQ-compression" class="anchor-icon" translate="no">
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
    </button></h3><p>Untuk dataset dengan dimensi kurang dari sekitar 512, melewati reduksi dimensi dan hanya melakukan kompresi dengan kuantisasi LVQ dapat memberikan hasil yang lebih baik. Seperti LeanVec, indeks LVQ menyimpan representasi utama untuk pencarian cepat dan representasi sisa untuk pemeringkatan ulang. Misalnya, <code translate="no">LVQ4x4</code> menggunakan 4 bit untuk representasi utama dan 4 bit untuk representasi sisa. <code translate="no">LVQ4x0</code> dan <code translate="no">LVQ8x0</code> melewati pemeringkatan ulang, yang mempercepat kueri jika tingkat recall-nya cukup baik untuk beban kerja Anda.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Pilih string pabrik<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>String pabrik SVS Vamana memiliki bentuk <code translate="no">SVSVamana&lt;degree&gt;[,&lt;storage&gt;]</code>, di mana <code translate="no">&lt;degree&gt;</code> adalah jumlah maksimum tepi per simpul dalam graf.</p>
<table>
<thead>
<tr><th>String pabrik</th><th>Penyimpanan</th><th>Catatan</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">SVSVamana64</code></td><td><code translate="no">FP32</code></td><td>Vektor yang tidak terkompresi.</td></tr>
<tr><td><code translate="no">SVSVamana64,FP16</code></td><td>Bilangan floating-point 16-bit</td><td>Setengah dari memori vektor <code translate="no">FP32</code>, dengan kehilangan akurasi minimal.</td></tr>
<tr><td><code translate="no">SVSVamana64,SQ8</code></td><td>Kuantisasi skalar 8-bit</td><td>Seperempat dari memori vektor <code translate="no">FP32</code>.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x0</code>, <code translate="no">LVQ8x0</code></td><td>LVQ primer, tanpa residu</td><td>Hanya untuk CPU Intel. Tanpa pengurutan ulang.</td></tr>
<tr><td><code translate="no">SVSVamana64,LVQ4x4</code>, <code translate="no">LVQ4x8</code></td><td>LVQ primer dan residu</td><td>Hanya CPU Intel.</td></tr>
<tr><td><code translate="no">SVSVamana64,LeanVec4x4</code>, <code translate="no">LeanVec4x8</code>, <code translate="no">LeanVec8x8</code></td><td>LeanVec primer dan sekunder</td><td>Hanya untuk CPU Intel. Tambahkan sufiks <code translate="no">_&lt;dim&gt;</code> untuk menetapkan dimensi yang telah dikurangi. Misalnya, <code translate="no">LeanVec4x8_128</code> mengurangi dataset primer menjadi 128 dimensi. Tanpa sufiks tersebut, dimensi yang dikurangi adalah <code translate="no">dim / 2</code>.</td></tr>
</tbody>
</table>
<p><code translate="no">SVSVamana64,LeanVec4x8</code> merupakan titik awal yang baik. Dari sana:</p>
<ul>
<li><p>Untuk <strong>meningkatkan recall</strong> dengan sedikit pengorbanan memori, tingkatkan dimensi LeanVec menggunakan sufiks <code translate="no">_&lt;dim&gt;</code>.</p></li>
<li><p>Untuk <strong>ukuran yang lebih kecil</strong> dengan mengorbankan sedikit recall, kurangi dimensi LeanVec.</p></li>
<li><p>Untuk vektor berdimensi rendah, coba gunakan <code translate="no">LVQ8</code>.</p></li>
<li><p><strong>Pada CPU non-Intel</strong>, gunakan <code translate="no">FP16</code> atau <code translate="no">SQ8</code>.</p></li>
</ul>
<h2 id="Build-the-index" class="common-anchor-header">Buat indeks<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut membuat indeks SVS Vamana dengan derajat graf 64 dan kompresi LeanVec. Perluas blok pengaturan dan jalankan sebelum membuat indeks.</p>
<p><details></p>
<p><summary>Siapkan koleksi</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;svs_vamana_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">256</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">256</span>)

client.create_collection(collection_name=collection_name, schema=schema)

client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Atur <code translate="no">index_type</code> menjadi <code translate="no">FAISS</code>, dan gunakan <code translate="no">faiss_index_name</code> untuk memilih resep SVS Vamana.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;svs_vamana_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># SVSVamana64 -&gt; Vamana graph degree 64</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># LeanVec4x8  -&gt; 4-bit primary, 8-bit secondary</span></span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># _128        -&gt; LeanVec dim 128 (omit the suffix for dim / 2)</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;SVSVamana64,LeanVec4x8_128&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;construction_window_size&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># build-time search width</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;ood_training&quot;</span>: <span class="hljs-literal">True</span>,             <span class="hljs-comment"># OOD on (default)</span></span>
<span class="highlighted-comment-line">    },</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-the-index" class="common-anchor-header">Cari indeks<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">search_window_size</code> mengontrol keseimbangan antara recall dan latensi, seperti halnya <code translate="no">ef</code> pada <a href="https://milvus.io/docs/hnsw.md">HNSW</a>. Atur <code translate="no">search_buffer_capacity</code> setidaknya sama dengan nilainya. Nilai default indeks untuk keduanya adalah 10, dan SVS akan menolak pencarian jika <code translate="no">search_window_size</code> lebih besar dari <code translate="no">search_buffer_capacity</code>.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_window_size&quot;</span>: <span class="hljs-number">100</span>,      <span class="hljs-comment"># wider = higher recall, lower QPS</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;search_buffer_capacity&quot;</span>: <span class="hljs-number">100</span>,  <span class="hljs-comment"># must be &gt;= search_window_size</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">}</span>

res = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Jika <code translate="no">limit</code> lebih besar daripada <code translate="no">search_window_size</code>, SVS akan menaikkan jendela ke <code translate="no">limit</code> untuk pencarian tersebut.</p>
<h2 id="SVS-Vamana-parameters" class="common-anchor-header">Parameter SVS Vamana<button data-href="#SVS-Vamana-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Parameter build berikut ditempatkan di <code translate="no">params</code> di <code translate="no">add_index()</code>, di sebelah <code translate="no">faiss_index_name</code>. Anda tidak dapat mengubahnya setelah indeks dibangun.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">construction_window_size</code></td><td><code translate="no">40</code></td><td>Ukuran daftar kandidat yang digunakan untuk menemukan tetangga setiap simpul selama konstruksi graf. Nilai yang lebih besar meningkatkan kualitas graf dan recall, tetapi membutuhkan waktu lebih lama untuk dibangun. Tetapkan nilainya setidaknya sebesar derajat graf. 200 adalah pilihan umum.</td></tr>
<tr><td><code translate="no">alpha</code></td><td><code translate="no">1.2</code> untuk <code translate="no">L2</code>, <code translate="no">0.95</code> untuk <code translate="no">IP</code>, dan <code translate="no">COSINE</code></td><td>Kekuatan pemangkasan. Nilai yang semakin jauh dari 1 akan memangkas secara lebih agresif, mengutamakan tepi jarak jauh daripada tepi jarak dekat yang berlebihan. Gunakan nilai di atas 1 untuk <code translate="no">L2</code> dan di bawah 1 untuk <code translate="no">IP</code> serta <code translate="no">COSINE</code>. Pertahankan nilai default kecuali Anda telah mengukur nilai yang lebih baik pada data Anda.</td></tr>
<tr><td><code translate="no">graph_max_degree</code></td><td>Degree dalam string pabrik atau <code translate="no">32</code></td><td>Jumlah maksimum tepi per simpul. Menggantikan derajat dalam string pabrik. Nilai dalam rentang [32, 128] cocok untuk sebagian besar beban kerja. Nilai yang lebih tinggi dapat meningkatkan recall tetapi menggunakan lebih banyak memori dan membutuhkan waktu lebih lama untuk dibangun.</td></tr>
<tr><td><code translate="no">prune_to</code></td><td>Derajat graf dikurangi 4</td><td>Jumlah tepi yang dipertahankan oleh sebuah simpul setelah pemangkasan ketika melebihi derajat graf.</td></tr>
<tr><td><code translate="no">max_candidate_pool_size</code></td><td><code translate="no">200</code></td><td>Jumlah maksimum kandidat yang dipertimbangkan saat memangkas tetangga suatu simpul. Harus lebih besar dari <code translate="no">construction_window_size</code>.</td></tr>
<tr><td><code translate="no">use_full_search_history</code></td><td><code translate="no">True</code></td><td>Apakah pemangkasan mempertimbangkan setiap simpul yang dikunjungi selama pencarian konstruksi, bukan hanya kandidat akhir.</td></tr>
<tr><td><code translate="no">leanvec_d</code></td><td><code translate="no">_&lt;dim&gt;</code> sufiks string bawaan atau <code translate="no">dim / 2</code></td><td>hanya LeanVec. Dimensi yang telah direduksi dari dataset utama. Menggantikan sufiks string bawaan. Nilai yang lebih kecil mengurangi penggunaan memori dan mempercepat pencarian graf, tetapi menurunkan recall.</td></tr>
<tr><td><code translate="no">ood_training</code></td><td><code translate="no">True</code> untuk LeanVec</td><td>Hanya untuk LeanVec. Apakah akan mempelajari proyeksi terpisah untuk vektor yang diindeks dan kueri. Atur ` <code translate="no">False</code> ` untuk proses pembuatan yang lebih cepat. Mengatur ` <code translate="no">True</code> ` untuk pabrik apa pun selain LeanVec akan gagal.</td></tr>
</tbody>
</table>
<p>Parameter pencarian berikut dimasukkan ke dalam ` <code translate="no">search_params.params</code>`. Anda juga dapat mengaturnya sebagai parameter pembuatan, yang akan mengubah nilai default yang digunakan indeks untuk pencarian yang tidak mengatur parameter tersebut.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>Deskripsi</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_window_size</code></td><td><code translate="no">10</code></td><td>Jumlah kandidat terdekat yang disimpan saat menjelajahi graf. Nilai yang lebih besar meningkatkan recall dan latensi.</td></tr>
<tr><td><code translate="no">search_buffer_capacity</code></td><td><code translate="no">10</code></td><td>Kapasitas buffer pencarian. Harus lebih besar dari atau sama dengan <code translate="no">search_window_size</code>. Dalam kebanyakan kasus, atur nilainya sama dengan <code translate="no">search_window_size</code>. Untuk LeanVec, coba 1,5 kali <code translate="no">search_window_size</code>.</td></tr>
</tbody>
</table>
<h2 id="Learn-more" class="common-anchor-header">Pelajari lebih lanjut<button data-href="#Learn-more" class="anchor-icon" translate="no">
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
<li>Baca referensi <a href="https://milvus.io/docs/faiss.md">FAISS index passthrough</a> untuk kontrak string pabrik umum, batasan, dan penanganan kesalahan.</li>
<li>Bandingkan dengan implementasi Vamana di disk dalam <a href="https://milvus.io/docs/diskann.md">DISKANN</a>.</li>
<li>Lihat <a href="https://github.com/intel/ScalableVectorSearch">repositori SVS</a> untuk detail pembangunan, penyempurnaan kinerja, dan API C++ yang mendasarinya.</li>
</ul>
