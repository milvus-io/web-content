---
id: integration_with_mindsdb.md
summary: >-
  Tutorial ini mendemonstrasikan cara mengintegrasikan Milvus dengan MindsDB,
  sehingga Anda dapat memanfaatkan kemampuan AI MindsDB dengan fungsionalitas
  basis data vektor Milvus melalui operasi mirip SQL untuk mengelola dan
  menanyakan penyematan vektor.
title: Mengintegrasikan Milvus dengan MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Mengintegrasikan Milvus dengan MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> adalah alat yang ampuh untuk mengintegrasikan aplikasi AI dengan beragam sumber data perusahaan. Alat ini bertindak sebagai mesin kueri federasi yang menertibkan penyebaran data sekaligus menjawab kueri dengan cermat di seluruh data terstruktur dan tidak terstruktur. Baik data Anda tersebar di seluruh aplikasi SaaS, database, atau gudang data, MindsDB dapat menghubungkan dan melakukan kueri menggunakan SQL standar. MindsDB memiliki sistem RAG otonom yang canggih melalui Basis Pengetahuan, mendukung ratusan sumber data, dan menyediakan opsi penerapan yang fleksibel mulai dari pengembangan lokal hingga lingkungan cloud.</p>
<p>Tutorial ini mendemonstrasikan cara mengintegrasikan Milvus dengan MindsDB, sehingga Anda dapat memanfaatkan kemampuan AI MindsDB dengan fungsionalitas basis data vektor Milvus melalui operasi mirip SQL untuk mengelola dan menanyakan penyematan vektor.</p>
<div class="alert note">
<p>Tutorial ini terutama mengacu pada dokumentasi resmi <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Jika Anda menemukan bagian yang sudah ketinggalan zaman dalam tutorial ini, Anda dapat memprioritaskan untuk mengikuti dokumentasi resmi dan membuat masalah untuk kami.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Menginstal MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum kita mulai, instal MindsDB secara lokal melalui <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> atau <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Sebelum melanjutkan, pastikan Anda memiliki pemahaman yang kuat tentang konsep dan operasi dasar MindsDB dan Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Pengenalan Argumen<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Argumen yang diperlukan untuk membuat koneksi adalah:</p>
<ul>
<li><code translate="no">uri</code>uri untuk basis data milvus, dapat diatur ke berkas ".db" lokal atau docker atau layanan cloud</li>
<li><code translate="no">token</code>: token untuk mendukung docker atau layanan cloud sesuai dengan opsi uri</li>
</ul>
<p>Argumen opsional untuk membuat koneksi adalah:</p>
<p>Ini digunakan untuk kueri <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: batas default yang akan dilewatkan dalam pernyataan tertentu (default=100)</li>
<li><code translate="no">search_metric_type</code>: jenis metrik yang digunakan untuk pencarian (default = &quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>: apakah akan mengabaikan segmen yang sedang berkembang selama pencarian kemiripan (default=False)</li>
<li><code translate="no">search_params</code>: khusus untuk <code translate="no">search_metric_type</code> (default={&quot;nprobe&quot;: 10})</li>
</ul>
<p>Ini digunakan untuk kueri <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: apakah akan membuat id secara otomatis saat memasukkan rekaman tanpa ID (default=False)</li>
<li><code translate="no">create_id_max_len</code>: panjang maksimum bidang id saat membuat tabel (default=64)</li>
<li><code translate="no">create_embedding_dim</code>: dimensi penyisipan untuk membuat tabel (default=8)</li>
<li><code translate="no">create_dynamic_field</code>: apakah tabel yang dibuat memiliki kolom dinamis atau tidak (default=True)</li>
<li><code translate="no">create_content_max_len</code>: panjang maksimal kolom konten (default=200)</li>
<li><code translate="no">create_content_default_value</code>: nilai default dari kolom konten (default='')</li>
<li><code translate="no">create_schema_description</code>: deskripsi dari skema yang dibuat (default='')</li>
<li><code translate="no">create_alias</code>: alias dari skema yang dibuat (default='default')</li>
<li><code translate="no">create_index_params</code>: parameter indeks yang dibuat pada kolom sematan (default={})</li>
<li><code translate="no">create_index_metric_type</code>: metrik yang digunakan untuk membuat indeks (default='L2')</li>
<li><code translate="no">create_index_type</code>: jenis indeks (default = 'AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Penggunaan<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Sebelum melanjutkan, pastikan bahwa versi <code translate="no">pymilvus</code> sama dengan <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">versi</a> yang disematkan ini. Jika Anda menemukan masalah dengan kompatibilitas versi, Anda dapat mengembalikan versi pymilvus Anda, atau menyesuaikannya di <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">file persyaratan</a> ini.</p>
<h3 id="Creating-connection" class="common-anchor-header">Membuat koneksi</h3><p>Untuk menggunakan handler ini dan menyambungkan ke server Milvus di MindsDB, sintaks berikut ini dapat digunakan:</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Jika Anda hanya membutuhkan basis data vektor lokal untuk data skala kecil atau pembuatan prototipe, menetapkan uri sebagai file lokal, misalnya<code translate="no">./milvus.db</code>, adalah metode yang paling mudah, karena secara otomatis menggunakan <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> untuk menyimpan semua data dalam file ini.</li>
<li>Untuk data dan lalu lintas data yang lebih besar dalam produksi, Anda dapat menyiapkan server Milvus di <a href="https://milvus.io/docs/install-overview.md">Docker atau Kubernetes</a>. Dalam penyiapan ini, gunakan alamat dan port server sebagai <code translate="no">uri</code>, misalnya<code translate="no">http://localhost:19530</code>. Jika Anda mengaktifkan fitur autentikasi pada Milvus, setel <code translate="no">token</code> sebagai <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, jika tidak, Anda tidak perlu menyetel token.</li>
<li>Anda juga dapat menggunakan Milvus yang dikelola sepenuhnya di <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Cukup setel <code translate="no">uri</code> dan <code translate="no">token</code> ke <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint dan API key</a> dari instance Zilliz Cloud Anda.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Memutuskan koneksi</h3><p>Untuk memutuskan koneksi, gunakan perintah ini</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Membuat tabel</h3><p>Untuk menyisipkan data dari tabel yang sudah ada sebelumnya, gunakan <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Menghapus koleksi</h3><p>Menghapus koleksi tidak didukung</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Membuat kueri dan memilih</h3><p>Untuk melakukan kueri basis data menggunakan vektor pencarian, Anda dapat menggunakan <code translate="no">search_vector</code> dalam klausa <code translate="no">WHERE</code> </p>
<p>Peringatan:</p>
<ul>
<li>Jika Anda menghilangkan <code translate="no">LIMIT</code>, maka <code translate="no">search_default_limit</code> akan digunakan karena Milvus mengharuskannya</li>
<li>Kolom metadata tidak didukung, tapi jika koleksi memiliki skema dinamis yang diaktifkan, Anda dapat melakukan kueri seperti biasa, lihat contoh di bawah ini</li>
<li>Kolom dinamis tidak dapat ditampilkan tapi dapat di-query</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Jika Anda menghilangkan <code translate="no">search_vector</code>, ini menjadi pencarian dasar dan <code translate="no">LIMIT</code> atau <code translate="no">search_default_limit</code> jumlah entri dalam koleksi akan dikembalikan</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>Anda dapat menggunakan klausa <code translate="no">WHERE</code> pada bidang dinamis seperti SQL biasa</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Menghapus rekaman</h3><p>Anda dapat menghapus entri menggunakan <code translate="no">DELETE</code> seperti halnya dalam SQL.</p>
<p>Peringatan:</p>
<ul>
<li>Milvus hanya mendukung penghapusan entitas dengan kunci primer yang ditentukan dengan jelas</li>
<li>Anda hanya dapat menggunakan operator <code translate="no">IN</code> </li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Memasukkan catatan</h3><p>Anda juga dapat menyisipkan baris individu seperti ini:</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Memperbarui</h3><p>Memperbarui record tidak didukung oleh Milvus API. Anda dapat mencoba menggunakan kombinasi <code translate="no">DELETE</code> dan <code translate="no">INSERT</code></p>
<hr>
<p>Untuk detail dan contoh lebih lanjut, silakan lihat <a href="https://docs.mindsdb.com/what-is-mindsdb">Dokumentasi Resmi MindsDB</a>.</p>
