---
id: warm-up.md
title: PemanasanCompatible with Milvus 2.6.4+
summary: >-
  Pemanasan melengkapi Penyimpanan Berjenjang dengan melakukan pramuat bidang
  atau indeks yang dipilih ke dalam cache sebelum segmen dapat di-query. Anda
  dapat mengonfigurasi pemanasan di tingkat cluster, koleksi, atau masing-masing
  bidang/indeks, sehingga memungkinkan kontrol yang lebih baik atas latensi
  kueri pertama dan penggunaan sumber daya.
beta: Milvus 2.6.4+
---
<h1 id="Warm-Up" class="common-anchor-header">Pemanasan<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Warm-Up" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Pemanasan</strong> melengkapi Penyimpanan Berjenjang dengan melakukan pramuat bidang atau indeks yang dipilih ke dalam cache sebelum segmen dapat di-query. Anda dapat mengonfigurasi pemanasan di tingkat kluster, koleksi, atau masing-masing bidang/indeks, sehingga memungkinkan kontrol yang lebih baik atas latensi kueri pertama dan penggunaan sumber daya.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Mengapa melakukan pemanasan<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/id/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Load</a> di Penyimpanan Berjenjang meningkatkan efisiensi dengan hanya memuat metadata pada awalnya. Namun, hal ini dapat menyebabkan latensi pada kueri pertama untuk data yang dingin, karena potongan atau indeks yang diperlukan harus diambil dari penyimpanan jarak jauh.</p>
<p><strong>Warm Up</strong> memecahkan masalah ini dengan menyimpan data penting secara proaktif di cache selama inisialisasi segmen.</p>
<p>Ini sangat bermanfaat ketika:</p>
<ul>
<li><p>Indeks skalar tertentu sering digunakan dalam kondisi filter.</p></li>
<li><p>Indeks vektor sangat penting untuk kinerja pencarian dan harus segera disiapkan.</p></li>
<li><p>Latensi cold-start setelah QueryNode dimulai ulang atau pemuatan segmen baru tidak dapat diterima.</p></li>
</ul>
<p>Sebaliknya, Pemanasan <strong>tidak disarankan</strong> untuk bidang atau indeks yang jarang ditanyakan. Menonaktifkan Pemanasan akan mempersingkat waktu pemuatan segmen dan menghemat ruang cache-ideal untuk bidang vektor besar atau bidang skalar yang tidak kritis.</p>
<h2 id="Configuration-levels" class="common-anchor-header">Tingkat konfigurasi<button data-href="#Configuration-levels" class="anchor-icon" translate="no">
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
   <tr>
     <th><p><strong>Tingkat</strong></p></th>
     <th><p><strong>Cakupan</strong></p></th>
     <th><p><strong>Metode konfigurasi</strong></p></th>
     <th><p><strong>Prioritas</strong></p></th>
   </tr>
   <tr>
     <td><p>Bidang/Indeks</p></td>
     <td><p>Bidang atau indeks tunggal</p></td>
     <td><p>Metode SDK: </p><ul><li><p><code translate="no">add_field()</code></p></li><li><p><code translate="no">alter_collection_field()</code></p></li><li><p><code translate="no">add_index()</code></p></li><li><p><code translate="no">alter_index_properties()</code></p></li></ul></td>
     <td><p>Tertinggi</p></td>
   </tr>
   <tr>
     <td><p>Koleksi</p></td>
     <td><p>Semua bidang/indeks dalam koleksi</p></td>
     <td><p>Metode SDK:</p><ul><li><p><code translate="no">create_collection()</code></p></li><li><p><code translate="no">alter_collection_properties()</code></p></li></ul></td>
     <td><p>Sedang</p></td>
   </tr>
   <tr>
     <td><p>Cluster</p></td>
     <td><p>Semua koleksi dalam klaster</p></td>
     <td><p><code translate="no">milvus.yaml</code> file konfigurasi</p></td>
     <td><p>Terendah (default)</p></td>
   </tr>
</table>
<p><strong>Mengesampingkan perilaku:</strong></p>
<ul>
<li><p>Jika sebuah bidang memiliki pengaturan pemanasannya sendiri, pengaturan tersebut diutamakan daripada pengaturan tingkat koleksi dan tingkat klaster.</p></li>
<li><p>Jika tidak ada pengaturan tingkat bidang atau tingkat indeks, pengaturan tingkat koleksi yang berlaku.</p></li>
<li><p>Jika tidak ada pengaturan tingkat bidang atau tingkat indeks atau tingkat koleksi, maka tingkat klaster yang berlaku.</p></li>
<li><p>Saat menggunakan operasi perubahan, nilai perubahan terbaru yang berlaku.</p></li>
</ul>
<h2 id="Configure-warmup-at-cluster-level" class="common-anchor-header">Mengonfigurasi pemanasan di tingkat klaster<button data-href="#Configure-warmup-at-cluster-level" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan tingkat klaster dikonfigurasi di file konfigurasi Milvus <code translate="no">milvus.yaml</code> dan berlaku untuk semua koleksi di dalam klaster. Ini berfungsi sebagai default dasar.</p>
<p>Setiap jenis target mendukung dua pengaturan:</p>
<table>
   <tr>
     <th><p>Pengaturan Pemanasan</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Skenario umum</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Memuat sebelum segmen dapat di-query. Waktu muat sedikit meningkat, tetapi kueri pertama tidak menimbulkan latensi.</p></td>
     <td><p>Gunakan untuk data yang sangat penting bagi kinerja yang harus segera tersedia, seperti indeks skalar frekuensi tinggi atau indeks vektor kunci yang digunakan dalam pencarian.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Lewati pemuatan awal. Segmen dapat di-query lebih cepat, tetapi query pertama dapat memicu pemuatan sesuai permintaan.</p></td>
     <td><p>Gunakan untuk data yang jarang diakses atau data besar seperti bidang vektor mentah atau bidang skalar yang tidak penting.</p></td>
   </tr>
</table>
<p><strong>Contoh YAML</strong>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># options: sync, disable.</span>
        <span class="hljs-comment"># Specifies the timing for warming up the Tiered Storage cache.</span>
        <span class="hljs-comment"># - `sync`: data will be loaded into the cache before a segment is considered loaded.</span>
        <span class="hljs-comment"># - `disable`: data will not be proactively loaded into the cache, and loaded only if needed by search/query tasks.</span>
        <span class="hljs-comment"># Defaults to `sync`, except for vector field which defaults to `disable`.</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span> <span class="hljs-comment"># cache warmup for vector field raw data is by default disabled.</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Pengaturan Pemanasan</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Kasus penggunaan yang disarankan</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Mengontrol apakah data bidang skalar dimuat sebelumnya.</p></td>
     <td><p>Gunakan <code translate="no">sync</code> hanya jika bidang skalar berukuran kecil dan sering diakses dalam filter. Jika tidak, gunakan <code translate="no">disable</code> untuk mengurangi waktu pemuatan.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Mengontrol apakah indeks skalar dimuat sebelumnya.</p></td>
     <td><p>Gunakan <code translate="no">sync</code> untuk indeks skalar yang terlibat dalam kondisi filter yang sering atau kueri rentang.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Mengontrol apakah data bidang vektor dimuat sebelumnya.</p></td>
     <td><p>Umumnya <code translate="no">disable</code> untuk menghindari penggunaan cache yang berat. Aktifkan <code translate="no">sync</code> hanya jika vektor mentah harus diambil segera setelah pencarian (misalnya, hasil kemiripan dengan pemanggilan vektor).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Mengontrol apakah indeks vektor dimuat sebelumnya.</p></td>
     <td><p>Gunakan <code translate="no">sync</code> untuk indeks vektor yang sangat penting untuk latensi pencarian. Dalam beban kerja batch atau frekuensi rendah, <code translate="no">disable</code> untuk kesiapan segmen yang lebih cepat.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-collection-level--Milvus-2611+" class="common-anchor-header">Mengonfigurasi pemanasan pada tingkat koleksi<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-collection-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan tingkat koleksi memungkinkan Anda untuk mengganti default kluster untuk koleksi tertentu. Hal ini berguna ketika sebuah koleksi memiliki pola akses yang berbeda dari baseline seluruh cluster.</p>
<h3 id="Set-warmup-when-creating-a-collection" class="common-anchor-header">Mengatur pemanasan saat membuat koleksi<button data-href="#Set-warmup-when-creating-a-collection" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-comment-line">    properties={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.scalarIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorField&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span></span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-collection" class="common-anchor-header">Mengubah pengaturan pemanasan pada koleksi yang sudah ada<button data-href="#Alter-warmup-settings-on-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda harus mengubah properti koleksi sebelum memanggil <code translate="no">load()</code>. Mengubah koleksi yang sudah dimuat akan menghasilkan kesalahan. Perubahan pada pengaturan pemanasan akan berlaku pada saat Anda memuat koleksi berikutnya.</p>
<pre><code translate="no" class="language-python">client.alter_collection_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    properties={
        <span class="hljs-string">&quot;warmup.vectorIndex&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>,
        <span class="hljs-string">&quot;warmup.scalarField&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Referensi properti</strong>:</p>
<table>
   <tr>
     <th><p><strong>Properti</strong></p></th>
     <th><p><strong>Pengaturan Pemanasan</strong></p></th>
     <th><p><strong>Deskripsi</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Pengaturan pemanasan untuk semua bidang skalar dalam koleksi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.scalarIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Pengaturan pemanasan untuk semua indeks skalar dalam koleksi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorField</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Pengaturan pemanasan untuk semua bidang vektor dalam koleksi.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">warmup.vectorIndex</code></p></td>
     <td><p><code translate="no">sync</code> | <code translate="no">disable</code></p></td>
     <td><p>Pengaturan pemanasan untuk semua indeks vektor dalam koleksi.</p></td>
   </tr>
</table>
<h2 id="Configure-warmup-at-field-level--Milvus-2611+" class="common-anchor-header">Mengonfigurasi pemanasan pada tingkat bidang<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-field-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan tingkat bidang memberikan perincian terbaik, memungkinkan Anda untuk mengontrol perilaku pemanasan untuk masing-masing bidang. Hal ini berguna ketika bidang tertentu memiliki pola akses yang unik.</p>
<p>Pemanasan tingkat bidang <strong>hanya</strong> berlaku untuk <strong>data mentah bidang</strong>, bukan untuk indeks pada bidang tersebut. Untuk mengonfigurasi pemanasan untuk indeks, gunakan <a href="https://file+.vscode-resource.vscode-cdn.net/Users/liyun/writingLab/3.0-milvus/warm-up/output/warm-up.md#Configure-warmup-at-index-level">konfigurasi tingkat indeks</a>.</p>
<h3 id="Set-warmup-when-creating-a-field" class="common-anchor-header">Mengatur pemanasan saat membuat bidang<button data-href="#Set-warmup-when-creating-a-field" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
    warmup=<span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this field at load time</span>
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    warmup=<span class="hljs-string">&quot;disable&quot;</span>  <span class="hljs-comment"># Do not preload vector raw data</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-field" class="common-anchor-header">Mengubah pengaturan pemanasan pada bidang yang sudah ada<button data-href="#Alter-warmup-settings-on-an-existing-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda harus mengubah pengaturan bidang sebelum memanggil <code translate="no">load()</code>. Mengubah bidang pada koleksi yang dimuat akan menghasilkan kesalahan. Perubahan pada pengaturan pemanasan akan berlaku pada saat Anda memuat koleksi berikutnya.</p>
<pre><code translate="no" class="language-python">client.alter_collection_field(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    field_params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-warmup-at-index-level--Milvus-2611+" class="common-anchor-header">Mengonfigurasi pemanasan pada tingkat indeks<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.11+</span><button data-href="#Configure-warmup-at-index-level--Milvus-2611+" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan tingkat indeks memungkinkan Anda mengontrol pemuatan awal untuk indeks individual, tidak tergantung pada pengaturan pemanasan bidang yang mendasarinya.</p>
<h3 id="Set-warmup-when-creating-an-index" class="common-anchor-header">Mengatur pemanasan saat membuat indeks<button data-href="#Set-warmup-when-creating-an-index" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">256</span>,
        <span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>  <span class="hljs-comment"># Preload this index at load time</span>
    }
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    params={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;disable&quot;</span>}  <span class="hljs-comment"># Do not preload this index</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Alter-warmup-settings-on-an-existing-index" class="common-anchor-header">Mengubah pengaturan pemanasan pada indeks yang sudah ada<button data-href="#Alter-warmup-settings-on-an-existing-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda harus mengubah pengaturan indeks sebelum memanggil <code translate="no">load()</code>. Mengubah indeks pada koleksi yang sudah dimuat akan menghasilkan kesalahan. Perubahan pada pengaturan pemanasan akan berlaku pada saat Anda memuat koleksi berikutnya.</p>
<pre><code translate="no" class="language-python">client.alter_index_properties(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    properties={<span class="hljs-string">&quot;warmup&quot;</span>: <span class="hljs-string">&quot;sync&quot;</span>}
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Warmup-behavior-reference" class="common-anchor-header">Referensi perilaku pemanasan<button data-href="#Warmup-behavior-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut ini meringkas perilaku pemanasan pada berbagai tahap siklus hidup segmen.</p>
<table>
   <tr>
     <th><p><strong>Pengaturan Pemanasan</strong></p></th>
     <th><p><strong>Fase Pemuatan</strong></p></th>
     <th><p><strong>Fase Pencarian/Pertanyaan</strong></p></th>
     <th><p><strong>Fase Pelepasan</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p>Data dimuat ke penyimpanan lokal. Tujuan (disk atau memori) tergantung pada pengaturan mmap.</p></td>
     <td><p>Query langsung masuk ke cache lokal.</p></td>
     <td><p>Data cache lokal dihapus.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p>Data tidak dimuat ke penyimpanan lokal.</p></td>
     <td><p>Data diambil sesuai permintaan dari penyimpanan objek, lalu ditembolok secara lokal berdasarkan pengaturan mmap.</p></td>
     <td><p>Data yang ditembolok lokal dihapus.</p></td>
   </tr>
</table>
<p><strong>Interaksi dengan mmap:</strong></p>
<table>
   <tr>
     <th><p><strong>Pengaturan Pemanasan</strong></p></th>
     <th><p><strong>Mmap Diaktifkan</strong></p></th>
     <th><p><strong>Lokasi Data</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>Disk lokal (<code translate="no">localStorage.path/cache/...</code>)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">sync</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>Memori lokal</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">true</code></p></td>
     <td><p>Diambil ke disk lokal pada akses pertama</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disable</code></p></td>
     <td><p><code translate="no">false</code></p></td>
     <td><p>Diambil ke memori lokal pada akses pertama</p></td>
   </tr>
</table>
<p><strong>Struktur direktori cache lokal (bila mmap diaktifkan):</strong></p>
<table>
   <tr>
     <th><p><strong>Tipe Data</strong></p></th>
     <th><p><strong>Jalur Direktori</strong></p></th>
   </tr>
   <tr>
     <td><p>Data bidang skalar/Vektor</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/...</code></p></td>
   </tr>
   <tr>
     <td><p>Berkas indeks skalar/Vektor</p></td>
     <td><p><code translate="no">localStorage.path/cache/&lt;collection_id&gt;/local_chunk/index_files/...</code></p></td>
   </tr>
</table>
<h2 id="Best-practices" class="common-anchor-header">Praktik terbaik<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan hanya memengaruhi beban awal. Jika data yang di-cache kemudian digusur, kueri berikutnya akan memuat ulang sesuai permintaan.</p>
<ul>
<li><p>Hindari penggunaan <code translate="no">sync</code> secara berlebihan. Memuat terlalu banyak field akan meningkatkan waktu muat dan tekanan cache.</p></li>
<li><p>Mulailah secara konservatif - aktifkan Pemanasan hanya untuk bidang dan indeks yang sering diakses.</p></li>
<li><p>Pantau latensi kueri dan metrik cache, lalu perluas pramuat sesuai kebutuhan.</p></li>
<li><p>Untuk beban kerja campuran, terapkan <code translate="no">sync</code> untuk koleksi yang sensitif terhadap kinerja dan <code translate="no">disable</code> untuk koleksi yang berorientasi pada kapasitas.</p></li>
</ul>
