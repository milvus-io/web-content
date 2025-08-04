---
id: quickstart_with_attu.md
summary: >-
  Attu adalah alat administrasi sumber terbuka yang lengkap untuk Milvus. Attu
  memiliki antarmuka pengguna grafis (GUI) yang intuitif, memungkinkan Anda
  untuk berinteraksi dengan database Anda dengan mudah. Hanya dengan beberapa
  klik, Anda bisa memvisualisasikan status cluster Anda, mengelola metadata,
  melakukan kueri data, dan banyak lagi.
title: Memulai Cepat dengan Attu - UI Web dari Milvus
---
<h1 id="Quick-Start-with-Attu-Desktop" class="common-anchor-header">Memulai Cepat dengan Attu Desktop<button data-href="#Quick-Start-with-Attu-Desktop" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="1-Introduction" class="common-anchor-header">1. Pendahuluan<button data-href="#1-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://github.com/zilliztech/attu">Attu</a> adalah alat administrasi sumber terbuka yang lengkap untuk Milvus. Attu memiliki antarmuka pengguna grafis (GUI) yang intuitif, memungkinkan Anda untuk berinteraksi dengan database Anda dengan mudah. Hanya dengan beberapa klik, Anda dapat memvisualisasikan status cluster Anda, mengelola metadata, melakukan kueri data, dan banyak lagi.</p>
<hr>
<h2 id="2-Install-Desktop-Application" class="common-anchor-header">2. Instal Aplikasi Desktop<button data-href="#2-Install-Desktop-Application" class="anchor-icon" translate="no">
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
    </button></h2><p>Unduh versi desktop Attu dengan mengunjungi <a href="https://github.com/zilliztech/attu/releases">halaman Attu GitHub Releases</a>. Pilih versi yang sesuai untuk sistem operasi Anda dan ikuti langkah-langkah instalasi.</p>
<h3 id="Note-for-macOS-M-series-chip" class="common-anchor-header">Catatan untuk macOS (chip seri M):</h3><p>Jika Anda mengalami kesalahan:</p>
<pre><code translate="no">attu.app <span class="hljs-keyword">is</span> damaged <span class="hljs-keyword">and</span> cannot be opened.
<button class="copy-code-btn"></button></code></pre>
<p>Jalankan perintah berikut di terminal untuk mengatasi masalah ini:</p>
<pre><code translate="no"><span class="hljs-built_in">sudo</span> xattr -rd com.apple.quarantine /Applications/attu.app
<button class="copy-code-btn"></button></code></pre>
<hr>
<h2 id="3-Connect-to-Milvus" class="common-anchor-header">3. Menghubungkan ke Milvus<button data-href="#3-Connect-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu mendukung koneksi ke <strong>Milvus Standalone</strong> dan <strong>Zilliz Cloud</strong>, memberikan fleksibilitas untuk bekerja dengan basis data lokal atau yang di-host di cloud.</p>
<p>Untuk menggunakan Milvus Standalone secara lokal:</p>
<ol>
<li>Mulai Milvus Standalone dengan mengikuti <a href="https://milvus.io/docs/install_standalone-docker.md">panduan instalasi Milvus</a>.</li>
<li>Buka Attu dan masukkan informasi koneksi:<ul>
<li>Alamat Milvus: URI server Milvus Standalone Anda, contoh: http://localhost:19530</li>
<li>Pengaturan opsional lainnya: Anda dapat mengaturnya sesuai dengan konfigurasi Milvus Anda atau membiarkannya sebagai default.</li>
</ul></li>
<li>Klik Hubungkan untuk mengakses database Anda.</li>
</ol>
<blockquote>
<p>Anda juga dapat menghubungkan Milvus yang telah dikelola secara penuh di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Cukup atur <code translate="no">Milvus Address</code> dan <code translate="no">token</code> ke <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a> dari instance Zilliz Cloud Anda.</p>
</blockquote>
<ol start="4">
<li>Klik untuk mengakses database Anda.</li>
</ol>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_login_page.png" alt="Attu Login Page" width="80%">
</p>
<hr>
<h2 id="4-Prepare-Data-Create-Collection-and-Insert-Data" class="common-anchor-header">4. Menyiapkan Data, Membuat Koleksi, dan Menyisipkan Data<button data-href="#4-Prepare-Data-Create-Collection-and-Insert-Data" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="41-Prepare-the-Data" class="common-anchor-header">4.1 Menyiapkan Data</h3><p>Kami menggunakan halaman FAQ dari <a href="https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip">Dokumentasi Milvus 2.4.x</a> sebagai kumpulan data untuk contoh ini.</p>
<h4 id="Download-and-Extract-Data" class="common-anchor-header">Unduh dan Ekstrak Data:</h4><pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus-docs/releases/download/v2.4.6-preview/milvus_docs_2.4.x_en.zip
unzip -q milvus_docs_2.4.x_en.zip -d milvus_docs
<button class="copy-code-btn"></button></code></pre>
<h4 id="Process-Markdown-Files" class="common-anchor-header">Memproses File Penurunan Harga:</h4><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> glob <span class="hljs-keyword">import</span> glob

text_lines = []
<span class="hljs-keyword">for</span> file_path <span class="hljs-keyword">in</span> glob(<span class="hljs-string">&quot;milvus_docs/en/faq/*.md&quot;</span>, recursive=<span class="hljs-literal">True</span>):
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(file_path, <span class="hljs-string">&quot;r&quot;</span>) <span class="hljs-keyword">as</span> file:
        file_text = file.read()
    text_lines += file_text.split(<span class="hljs-string">&quot;# &quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="42-Generate-Embeddings" class="common-anchor-header">4.2 Hasilkan Penyematan</h3><p>Tentukan model penyematan untuk menghasilkan penyematan teks menggunakan <code translate="no">milvus_model</code>. Kami menggunakan model <code translate="no">DefaultEmbeddingFunction</code> sebagai contoh, yang merupakan model penyematan yang sudah terlatih dan ringan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> model <span class="hljs-keyword">as</span> milvus_model

embedding_model = milvus_model.DefaultEmbeddingFunction()

<span class="hljs-comment"># Generate test embedding</span>
test_embedding = embedding_model.encode_queries([<span class="hljs-string">&quot;This is a test&quot;</span>])[<span class="hljs-number">0</span>]
embedding_dim = <span class="hljs-built_in">len</span>(test_embedding)
<span class="hljs-built_in">print</span>(embedding_dim)
<span class="hljs-built_in">print</span>(test_embedding[:<span class="hljs-number">10</span>])
<button class="copy-code-btn"></button></code></pre>
<h4 id="Output" class="common-anchor-header">Keluaran:</h4><pre><code translate="no">768
[-0.04836066  0.07163023 -0.01130064 -0.03789345 -0.03320649 -0.01318448
 -0.03041712 -0.02269499 -0.02317863 -0.00426028]
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="43-Create-Collection" class="common-anchor-header">4.3 Membuat Koleksi</h3><p>Hubungkan ke Milvus dan buat koleksi:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

collection_name = <span class="hljs-string">&quot;attu_tutorial&quot;</span>

<span class="hljs-comment"># Drop collection if it exists</span>
<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

<span class="hljs-comment"># Create a new collection</span>
client.create_collection(
    collection_name=collection_name,
    dimension=embedding_dim,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Inner product distance</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="44-Insert-Data" class="common-anchor-header">4.4 Menyisipkan Data</h3><p>Lakukan iterasi melalui baris teks, buat penyematan, dan masukkan data ke dalam Milvus:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> tqdm <span class="hljs-keyword">import</span> tqdm

data = []
doc_embeddings = embedding_model.encode_documents(text_lines)

<span class="hljs-keyword">for</span> i, line <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(tqdm(text_lines, desc=<span class="hljs-string">&quot;Creating embeddings&quot;</span>)):
    data.append({<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;vector&quot;</span>: doc_embeddings[i], <span class="hljs-string">&quot;text&quot;</span>: line})

client.insert(collection_name=collection_name, data=data)
<button class="copy-code-btn"></button></code></pre>
<hr>
<h3 id="45-Visualize-Data-and-Schema" class="common-anchor-header">4.5 Memvisualisasikan Data dan Skema</h3><p>Sekarang kita dapat memvisualisasikan skema data dan entitas yang disisipkan menggunakan antarmuka Attu. Skema menampilkan bidang yang telah ditentukan, termasuk bidang <code translate="no">id</code> dengan tipe <code translate="no">Int64</code> dan bidang <code translate="no">vector</code> dengan tipe <code translate="no">FloatVector(768)</code> dengan metrik <code translate="no">Inner Product (IP)</code>. Koleksi ini dimuat dengan <strong>72 entitas</strong>.</p>
<p>Selain itu, kita dapat melihat data yang disisipkan, termasuk ID, penyematan vektor, dan bidang dinamis yang menyimpan metadata seperti konten teks. Antarmuka mendukung pemfilteran dan kueri berdasarkan kondisi yang ditentukan atau bidang dinamis.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_1.png" alt="Schema View" width="45%" />
  <img translate="no" src="/docs/v2.6.x/assets/attu_after_data_insertion_2.png" alt="Data View" width="45%" />
</p>
<h2 id="5-Visualizing-Search-Results-and-Relationships" class="common-anchor-header">5. Memvisualisasikan Hasil Pencarian dan Hubungan<button data-href="#5-Visualizing-Search-Results-and-Relationships" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu menyediakan antarmuka yang kuat untuk memvisualisasikan dan mengeksplorasi hubungan data. Untuk memeriksa titik data yang dimasukkan dan hubungan kemiripannya, ikuti langkah-langkah berikut:</p>
<h3 id="51-Perform-a-Search" class="common-anchor-header">5.1 <strong>Melakukan Pencarian</strong></h3><p>Buka tab <strong>Pencarian Vektor</strong> di Attu.</p>
<ol>
<li>Klik tombol <strong>Generate Random Data</strong> untuk membuat kueri pengujian.</li>
<li>Klik <strong>Cari</strong> untuk mengambil hasil berdasarkan data yang dihasilkan.</li>
</ol>
<p>Hasilnya ditampilkan dalam sebuah tabel, yang menunjukkan ID, skor kemiripan, dan bidang dinamis untuk setiap entitas yang cocok.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_table.png" alt="Search Results Table" width="80%">
</p>
<hr>
<h3 id="52-Explore-Data-Relationships" class="common-anchor-header">5.2 <strong>Jelajahi Hubungan Data</strong></h3><p>Klik tombol <strong>Jelajahi</strong> di panel hasil untuk memvisualisasikan hubungan antara vektor kueri dan hasil pencarian dalam <strong>struktur seperti grafik pengetahuan</strong>.</p>
<ul>
<li><strong>Simpul pusat</strong> mewakili vektor pencarian.</li>
<li><strong>Node yang terhubung</strong> mewakili hasil pencarian, dengan mengekliknya akan menampilkan informasi rinci dari node yang bersangkutan.</li>
</ul>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_searched_graph.png" alt="Knowledge Graph Visualization" width="80%">
</p>
<hr>
<h3 id="53-Expand-the-Graph" class="common-anchor-header">5.3 <strong>Memperluas Grafik</strong></h3><p>Klik dua kali pada simpul hasil mana pun untuk memperluas koneksinya. Tindakan ini akan memperlihatkan hubungan tambahan antara simpul yang dipilih dengan titik data lain dalam koleksi, sehingga menciptakan <strong>grafik pengetahuan yang lebih besar dan saling terhubung</strong>.</p>
<p>Tampilan yang diperluas ini memungkinkan eksplorasi yang lebih dalam tentang bagaimana titik-titik data terkait, berdasarkan kemiripan vektor.</p>
<p align="center">
  <img translate="no" src="/docs/v2.6.x/assets/attu_expanded_searched_graph.png" alt="Expanded Knowledge Graph" width="80%">
</p>
<hr>
<h2 id="6-Conclusion" class="common-anchor-header">6. Kesimpulan<button data-href="#6-Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Attu menyederhanakan pengelolaan dan visualisasi data vektor yang disimpan di Milvus. Dari penyisipan data hingga eksekusi kueri dan eksplorasi interaktif, Attu menyediakan antarmuka yang intuitif untuk menangani tugas-tugas pencarian vektor yang kompleks. Dengan fitur-fitur seperti dukungan skema dinamis, visualisasi pencarian grafis, dan filter kueri yang fleksibel, Attu memberdayakan pengguna untuk menganalisis kumpulan data berskala besar secara efektif.</p>
<p>Dengan memanfaatkan alat eksplorasi visual Attu, pengguna dapat lebih memahami data mereka, mengidentifikasi hubungan yang tersembunyi, dan membuat keputusan berdasarkan data. Mulailah menjelajahi dataset Anda sendiri hari ini dengan Attu dan Milvus!</p>
<hr>
