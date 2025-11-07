---
id: warm-up.md
title: PemanasanCompatible with Milvus 2.6.4+
summary: >-
  Di Milvus, Warm Up melengkapi Tiered Storage dengan mengurangi latensi yang
  terjadi saat data dingin diakses untuk pertama kalinya. Setelah dikonfigurasi,
  Warm Up melakukan pramuat jenis bidang atau indeks yang dipilih ke dalam cache
  sebelum segmen dapat di-query, sehingga memastikan bahwa data yang sering
  diakses tersedia segera setelah dimuat.
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
    </button></h1><p>Di Milvus, <strong>Pemanasan</strong> melengkapi Penyimpanan Berjenjang dengan mengurangi latensi yang terjadi saat data dingin diakses untuk pertama kalinya. Setelah dikonfigurasi, Pemanasan akan memuatkan jenis bidang atau indeks yang dipilih ke dalam cache sebelum sebuah segmen dapat di-query, sehingga memastikan bahwa data yang sering diakses akan segera tersedia setelah dimuat.</p>
<h2 id="Why-warm-up" class="common-anchor-header">Mengapa pemanasan<button data-href="#Why-warm-up" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/id/tiered-storage-overview.md#Phase-1-Lazy-load">Lazy Load</a> di Penyimpanan Berjenjang meningkatkan efisiensi dengan hanya memuat metadata pada awalnya. Namun, hal ini dapat menyebabkan latensi pada kueri pertama ke data dingin, karena potongan atau indeks yang diperlukan harus diambil dari penyimpanan objek.</p>
<p><strong>Warm Up</strong> memecahkan masalah ini dengan menyimpan data penting secara proaktif di cache selama inisialisasi segmen.</p>
<p>Ini sangat bermanfaat ketika:</p>
<ul>
<li><p>Indeks skalar tertentu sering digunakan dalam kondisi filter.</p></li>
<li><p>Indeks vektor sangat penting untuk kinerja pencarian dan harus segera disiapkan.</p></li>
<li><p>Latensi cold-start setelah QueryNode dimulai ulang atau pemuatan segmen baru tidak dapat diterima.</p></li>
</ul>
<p>Sebaliknya, Pemanasan <strong>tidak disarankan</strong> untuk bidang atau indeks yang jarang ditanyakan. Menonaktifkan Pemanasan akan mempersingkat waktu pemuatan segmen dan menghemat ruang cache - ideal untuk bidang vektor besar atau bidang skalar yang tidak kritis.</p>
<h2 id="Configuration" class="common-anchor-header">Konfigurasi<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Pemanasan dikontrol di bawah <code translate="no">queryNode.segcore.tieredStorage.warmup</code> di <code translate="no">milvus.yaml</code>. Anda dapat mengonfigurasinya secara terpisah untuk bidang skalar, indeks skalar, bidang vektor, dan indeks vektor. Setiap target mendukung dua mode:</p>
<table>
   <tr>
     <th><p>Mode</p></th>
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
     <th><p>Nilai</p></th>
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
<li><p>Hindari penggunaan <code translate="no">sync</code> secara berlebihan. Memuat terlalu banyak bidang akan meningkatkan waktu muat dan tekanan cache.</p></li>
<li><p>Mulailah secara konservatif - aktifkan Pemanasan hanya untuk bidang dan indeks yang sering diakses.</p></li>
<li><p>Pantau latensi kueri dan metrik cache, lalu perluas pramuat sesuai kebutuhan.</p></li>
<li><p>Untuk beban kerja campuran, terapkan <code translate="no">sync</code> untuk koleksi yang sensitif terhadap kinerja dan <code translate="no">disable</code> untuk koleksi yang berorientasi pada kapasitas.</p></li>
</ul>
