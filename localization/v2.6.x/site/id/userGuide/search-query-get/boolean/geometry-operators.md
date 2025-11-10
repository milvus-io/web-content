---
id: geometry-operators.md
title: Operator GeometriCompatible with Milvus 2.6.4+
summary: >-
  Milvus mendukung seperangkat operator untuk penyaringan spasial pada bidang
  GEOMETRI, yang sangat penting untuk mengelola dan menganalisis data geometris.
  Operator-operator ini memungkinkan Anda untuk mengambil entitas berdasarkan
  hubungan geometris antar objek.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Operators" class="common-anchor-header">Operator Geometri<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung seperangkat operator untuk pemfilteran spasial pada bidang <code translate="no">GEOMETRY</code>, yang sangat penting untuk mengelola dan menganalisis data geometri. Operator-operator ini memungkinkan Anda untuk mengambil entitas berdasarkan hubungan geometri antar objek.</p>
<p>Semua operator geometri berfungsi dengan mengambil dua argumen geometri: nama bidang <code translate="no">GEOMETRY</code> yang ditentukan dalam skema koleksi Anda dan objek geometri target yang direpresentasikan dalam format <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text</a> (WKT).</p>
<h2 id="Use-syntax" class="common-anchor-header">Menggunakan sintaks<button data-href="#Use-syntax" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk memfilter pada bidang <code translate="no">GEOMETRY</code>, gunakan operator geometri dalam sebuah ekspresi:</p>
<ul>
<li><p>Umum: <code translate="no">{operator}(geo_field, '{wkt}')</code></p></li>
<li><p>Berbasis jarak: <code translate="no">ST_DWITHIN(geo_field, '{wkt}', distance)</code></p></li>
</ul>
<p>Di mana</p>
<ul>
<li><p><code translate="no">operator</code> adalah salah satu operator geometri yang didukung (misalnya, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Nama operator harus menggunakan huruf besar atau huruf kecil. Untuk daftar operator yang didukung, lihat <a href="/docs/id/geometry-operators.md#Supported-geometry-operators">Operator geometri yang didukung</a>.</p></li>
<li><p><code translate="no">geo_field</code> adalah nama bidang <code translate="no">GEOMETRY</code> Anda.</p></li>
<li><p><code translate="no">'{wkt}'</code> adalah representasi WKT dari geometri yang akan ditanyakan.</p></li>
<li><p><code translate="no">distance</code> adalah ambang batas khusus untuk <code translate="no">ST_DWITHIN</code>.</p></li>
</ul>
<p>Untuk mempelajari lebih lanjut tentang bidang <code translate="no">GEOMETRY</code> di Milvus, lihat <a href="/docs/id/geometry-field.md">Bidang Geometri</a>.</p>
<h2 id="Supported-geometry-operators" class="common-anchor-header">Operator geometri yang didukung<button data-href="#Supported-geometry-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Tabel berikut mencantumkan operator geometri yang tersedia di Milvus.</p>
<div class="alert note">
<p>Nama operator harus menggunakan <strong>huruf besar</strong> atau <strong>huruf kecil</strong>. Jangan mencampur huruf besar dan kecil dalam nama operator yang sama.</p>
</div>
<table>
   <tr>
     <th><p>Operator</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ST_EQUALS(A, B)</code> / <code translate="no">st_equals(A, B)</code></p></td>
     <td><p>Mengembalikan TRUE jika dua geometri identik secara spasial, yang berarti mereka memiliki kumpulan titik dan dimensi yang sama.</p></td>
     <td><p>Apakah dua geometri (A dan B) sama persis dalam ruang?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CONTAINS(A, B)</code> / <code translate="no">st_contains(A, B)</code></p></td>
     <td><p>Mengembalikan nilai TRUE jika geometri A sepenuhnya berisi geometri B, dengan interiornya memiliki setidaknya satu titik yang sama.</p></td>
     <td><p>Apakah sebuah batas kota (A) berisi sebuah taman tertentu (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_CROSSES(A, B)</code> / <code translate="no">st_crosses(A, B)</code></p></td>
     <td><p>Mengembalikan nilai TRUE jika geometri A dan B berpotongan sebagian tetapi tidak sepenuhnya berisi satu sama lain.</p></td>
     <td><p>Apakah dua jalan (A dan B) berpotongan di sebuah persimpangan?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_INTERSECTS(A, B)</code> / <code translate="no">st_intersects(A, B)</code></p></td>
     <td><p>Mengembalikan nilai TRUE jika geometri A dan B memiliki setidaknya satu titik yang sama. Ini adalah kueri spasial yang paling umum dan banyak digunakan.</p></td>
     <td><p>Apakah area pencarian (A) bersinggungan dengan salah satu lokasi toko (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_OVERLAPS(A, B)</code> / <code translate="no">st_overlaps(A, B)</code></p></td>
     <td><p>Mengembalikan TRUE jika geometri A dan B memiliki dimensi yang sama, tumpang tindih sebagian, dan tidak ada yang sepenuhnya berisi satu sama lain.</p></td>
     <td><p>Apakah dua bidang tanah (A dan B) tumpang tindih?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_TOUCHES(A, B)</code> / <code translate="no">st_touches(A, B)</code></p></td>
     <td><p>Mengembalikan nilai TRUE jika geometri A dan B memiliki batas yang sama namun interiornya tidak berpotongan.</p></td>
     <td><p>Apakah dua properti yang bertetangga (A dan B) memiliki batas yang sama?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_WITHIN(A, B)</code> / <code translate="no">st_within(A, B)</code></p></td>
     <td><p>Mengembalikan nilai TRUE jika geometri A sepenuhnya berada di dalam geometri B, dengan interiornya memiliki setidaknya satu titik yang sama. Ini adalah kebalikan dari <code translate="no">ST_Contains(B, A)</code>.</p></td>
     <td><p>Apakah sebuah titik tertentu (A) berada dalam radius pencarian yang ditentukan (B)?</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ST_DWITHIN(A, B, distance)</code> / <code translate="no">st_dwithin(A, B, distance)</code></p></td>
     <td><p>Mengembalikan TRUE jika jarak antara geometri A dan geometri B kurang dari atau sama dengan jarak yang ditentukan.</p><p><strong>Catatan</strong>: Geometri B saat ini hanya mendukung titik. Satuan jarak adalah meter.</p></td>
     <td><p>Temukan semua titik dalam jarak 5000 meter dari titik tertentu (B).</p></td>
   </tr>
</table>
<h2 id="STEQUALS--stequals" class="common-anchor-header">ST_SAMA / st_equals<button data-href="#STEQUALS--stequals" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_EQUALS</code> mengembalikan TRUE jika dua geometri identik secara spasial, yang berarti mereka memiliki set titik dan dimensi yang sama. Hal ini berguna untuk memverifikasi apakah dua objek geometri yang disimpan mewakili lokasi dan bentuk yang sama.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda ingin memeriksa apakah geometri yang tersimpan (seperti titik atau poligon) sama persis dengan geometri target. Sebagai contoh, Anda dapat membandingkan titik yang tersimpan dengan titik yang diinginkan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to check if a geometry matches a specific point</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_EQUALS(geo_field, &#x27;POINT(10 20)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCONTAINS--stcontains" class="common-anchor-header">ST_CONTAINS / st_contains<button data-href="#STCONTAINS--stcontains" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_CONTAINS</code> mengembalikan TRUE jika geometri pertama benar-benar berisi geometri kedua. Hal ini berguna untuk menemukan titik di dalam poligon, atau poligon yang lebih kecil di dalam poligon yang lebih besar.</p>
<p><strong>Contoh</strong></p>
<p>Bayangkan Anda memiliki koleksi distrik kota dan ingin menemukan tempat menarik tertentu, seperti restoran, yang berada di dalam batas-batas distrik tertentu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries completely within a specific polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CONTAINS(geo_field, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STCROSSES--stcrosses" class="common-anchor-header">ST_CROSSES / st_crosses<button data-href="#STCROSSES--stcrosses" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_CROSSES</code> mengembalikan <code translate="no">TRUE</code> jika perpotongan dua geometri membentuk geometri dengan dimensi yang lebih rendah dari geometri aslinya. Hal ini biasanya berlaku pada sebuah garis yang melintasi sebuah poligon atau garis lain.</p>
<p><strong>Contoh</strong></p>
<p>Anda ingin menemukan semua jalur pendakian (string garis) yang melintasi garis batas tertentu (string garis lain) atau memasuki area yang dilindungi (poligon).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that cross a line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_CROSSES(geo_field, &#x27;LINESTRING(5 0, 5 10)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STINTERSECTS--stintersects" class="common-anchor-header">ST_INTERSECTS / st_intersects<button data-href="#STINTERSECTS--stintersects" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_INTERSECTS</code> mengembalikan <code translate="no">TRUE</code> jika dua geometri memiliki titik batas atau interior yang sama. Ini adalah operator tujuan umum untuk mendeteksi segala bentuk tumpang tindih spasial.</p>
<p><strong>Contoh</strong></p>
<p>Jika Anda memiliki koleksi jalan dan ingin menemukan semua jalan yang melintasi atau menyentuh string garis tertentu yang merepresentasikan jalan baru yang diusulkan, Anda dapat menggunakan <code translate="no">ST_INTERSECTS</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that intersect with a specific line string.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_INTERSECTS(geo_field, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STOVERLAPS--stoverlaps" class="common-anchor-header">ST_TINDIH / st_tumpang tindih<button data-href="#STOVERLAPS--stoverlaps" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_OVERLAPS</code> mengembalikan <code translate="no">TRUE</code> jika dua geometri dengan dimensi yang sama memiliki perpotongan parsial, di mana perpotongan itu sendiri memiliki dimensi yang sama dengan geometri asli, tetapi tidak sama dengan salah satu dari mereka.</p>
<p><strong>Contoh</strong></p>
<p>Anda memiliki sekumpulan wilayah penjualan yang tumpang tindih dan ingin menemukan semua wilayah yang tumpang tindih secara parsial dengan zona penjualan baru yang diusulkan.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that partially overlap with a polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_OVERLAPS(geo_field, &#x27;POLYGON((0 0, 0 10, 10 10, 10 0, 0 0))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STTOUCHES--sttouches" class="common-anchor-header">ST_TOUCHES / st_touches<button data-href="#STTOUCHES--sttouches" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_TOUCHES</code> mengembalikan <code translate="no">TRUE</code> jika dua batas geometri bersentuhan, tetapi interiornya tidak bersinggungan. Hal ini berguna untuk mendeteksi kedekatan.</p>
<p><strong>Contoh</strong></p>
<p>Jika Anda memiliki peta bidang properti dan ingin menemukan semua bidang yang berbatasan langsung dengan taman umum tanpa adanya tumpang tindih.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that only touch a line string at their boundaries.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_TOUCHES(geo_field, &#x27;LINESTRING(0 0, 1 1)&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="STWITHIN--stwithin" class="common-anchor-header">ST_DALAM / st_within<button data-href="#STWITHIN--stwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_WITHIN</code> mengembalikan <code translate="no">TRUE</code> jika geometri pertama sepenuhnya berada di dalam interior atau pada batas geometri kedua. Ini adalah kebalikan dari <code translate="no">ST_CONTAINS</code>.</p>
<p><strong>Contoh</strong></p>
<p>Anda ingin menemukan semua area perumahan kecil yang terletak sepenuhnya di dalam area taman yang lebih besar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># The filter expression to find geometries that are completely within a larger polygon.</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_WITHIN(geo_field, &#x27;POLYGON((110 38, 115 38, 115 42, 110 42, 110 38))&#x27;)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Untuk informasi lebih lanjut mengenai cara menggunakan bidang <code translate="no">GEOMETRY</code>, lihat <a href="/docs/id/geometry-field.md">Bidang Geometri</a>.</p>
<h2 id="STDWITHIN--stdwithin" class="common-anchor-header">ST_DWITHIN / st_dwithin<button data-href="#STDWITHIN--stdwithin" class="anchor-icon" translate="no">
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
    </button></h2><p>Operator <code translate="no">ST_DWITHIN</code> mengembalikan <code translate="no">TRUE</code> jika jarak antara geometri A dan geometri B kurang dari atau sama dengan nilai yang ditentukan (dalam meter). Saat ini, geometri B harus berupa sebuah titik.</p>
<p><strong>Contoh</strong></p>
<p>Misalkan Anda memiliki koleksi lokasi toko dan ingin menemukan semua toko dalam jarak 5.000 meter dari lokasi pelanggan tertentu.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Find all stores within 5000 meters of the point (120 30)</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;ST_DWITHIN(geo_field, &#x27;POINT(120 30)&#x27;, 5000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
