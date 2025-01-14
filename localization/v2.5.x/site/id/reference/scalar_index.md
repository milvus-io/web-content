---
id: scalar_index.md
related_key: scalar_index
summary: Indeks skalar dalam Milvus.
title: Indeks Skalar
---
<h1 id="Scalar-Index" class="common-anchor-header">Indeks Skalar<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus mendukung pencarian terfilter yang menggabungkan bidang skalar dan vektor. Untuk meningkatkan efisiensi pencarian yang melibatkan bidang skalar, Milvus memperkenalkan pengindeksan bidang skalar mulai versi 2.1.0. Artikel ini memberikan gambaran umum mengenai pengindeksan medan skalar di Milvus, untuk membantu Anda memahami arti penting dan implementasinya.</p>
<h2 id="Overview" class="common-anchor-header">Gambaran Umum<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Setelah melakukan pencarian kemiripan vektor di Milvus, Anda dapat menggunakan operator logika untuk mengorganisasikan bidang skalar ke dalam ekspresi boolean.</p>
<p>Ketika Milvus menerima permintaan pencarian dengan ekspresi boolean, Milvus menguraikan ekspresi boolean menjadi pohon sintaks abstrak (AST) untuk menghasilkan rencana fisik untuk pemfilteran atribut. Milvus kemudian menerapkan rencana fisik di setiap segmen untuk menghasilkan <a href="/docs/id/bitset.md">bitset</a> sebagai hasil penyaringan dan menyertakan hasilnya sebagai parameter pencarian vektor untuk mempersempit cakupan pencarian. Dalam hal ini, kecepatan pencarian vektor sangat bergantung pada kecepatan pemfilteran atribut.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
   </span> <span class="img-wrapper"> <span>Pemfilteran atribut dalam segmen</span> </span></p>
<p>Pengindeksan bidang skalar adalah cara untuk memastikan kecepatan pemfilteran atribut dengan mengurutkan nilai bidang skalar dengan cara tertentu untuk mempercepat pencarian informasi.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Algoritma pengindeksan bidang skalar<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus bertujuan untuk mencapai penggunaan memori yang rendah, efisiensi penyaringan yang tinggi, dan waktu pemuatan yang singkat dengan algoritme pengindeksan bidang skalar. Algoritme ini dikategorikan ke dalam dua jenis utama: <a href="#auto-indexing">pengindeksan otomatis</a> dan <a href="#inverted-indexing">pengindeksan terbalik</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Pengindeksan otomatis</h3><p>Milvus menyediakan opsi <code translate="no">AUTOINDEX</code> untuk membebaskan Anda dari keharusan memilih jenis indeks secara manual. Ketika memanggil metode <code translate="no">create_index</code>, jika <code translate="no">index_type</code> tidak ditentukan, Milvus secara otomatis memilih jenis indeks yang paling sesuai berdasarkan tipe data.</p>
<p>Tabel berikut mencantumkan tipe data yang didukung Milvus dan algoritme pengindeksan otomatis yang sesuai.</p>
<table>
<thead>
<tr><th>Tipe data</th><th>Algoritme pengindeksan otomatis</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Indeks terbalik</td></tr>
<tr><td>INT8</td><td>Indeks terbalik</td></tr>
<tr><td>INT16</td><td>Indeks terbalik</td></tr>
<tr><td>INT32</td><td>Indeks terbalik</td></tr>
<tr><td>INT64</td><td>Indeks terbalik</td></tr>
<tr><td>FLOAT</td><td>Indeks terbalik</td></tr>
<tr><td>GANDA</td><td>Indeks terbalik</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Pengindeksan terbalik</h3><p>Pengindeksan terbalik menawarkan cara yang fleksibel untuk membuat indeks untuk bidang skalar dengan menentukan parameter indeks secara manual. Metode ini bekerja dengan baik untuk berbagai skenario, termasuk kueri titik, kueri pencocokan pola, pencarian teks lengkap, pencarian JSON, pencarian Boolean, dan bahkan kueri pencocokan awalan.</p>
<p>Indeks terbalik yang diimplementasikan di Milvus didukung oleh <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, sebuah pustaka mesin pencari teks lengkap. Tantivy memastikan bahwa pengindeksan terbalik di Milvus efisien dan cepat.</p>
<p>Indeks terbalik memiliki dua komponen utama: kamus istilah dan daftar terbalik. Kamus istilah mencakup semua kata yang diberi tanda yang diurutkan menurut abjad, sedangkan daftar terbalik berisi daftar dokumen di mana setiap kata muncul. Pengaturan ini membuat kueri titik dan kueri rentang jauh lebih cepat dan lebih efisien daripada pencarian brute force.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
   </span> <span class="img-wrapper"> <span>Diagram indeks terbalik</span> </span></p>
<p>Keuntungan menggunakan indeks terbalik terutama terlihat dalam operasi berikut:</p>
<ul>
<li><strong>Kueri titik</strong>: Misalnya, ketika mencari dokumen yang mengandung kata <strong>Milvus</strong>, prosesnya dimulai dengan memeriksa apakah <strong>Milvus</strong> ada dalam kamus istilah. Jika tidak ditemukan, tidak ada dokumen yang mengandung kata tersebut. Namun, jika ditemukan, daftar terbalik yang terkait dengan <strong>Milvus</strong> diambil, yang menunjukkan dokumen yang mengandung kata tersebut. Metode ini jauh lebih efisien daripada pencarian brute-force melalui jutaan dokumen, karena kamus istilah yang diurutkan secara signifikan mengurangi kerumitan waktu untuk menemukan kata <strong>Milvus</strong>.</li>
<li><strong>Kueri rentang</strong>: Efisiensi kueri rentang, seperti menemukan dokumen dengan kata yang secara alfabetis lebih besar daripada <strong>sangat</strong>, juga ditingkatkan oleh kamus istilah yang diurutkan. Pendekatan ini lebih efisien daripada pencarian brute-force, memberikan hasil yang lebih cepat dan lebih akurat.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Hasil pengujian</h3><p>Untuk menunjukkan peningkatan kinerja yang disediakan oleh indeks skalar di Milvus, sebuah percobaan dilakukan dengan membandingkan kinerja beberapa ekspresi menggunakan pengindeksan terbalik dan pencarian brute-force pada data mentah.</p>
<p>Eksperimen ini melibatkan pengujian berbagai ekspresi dalam dua kondisi: dengan indeks terbalik dan dengan pencarian brute-force. Untuk memastikan keadilan, distribusi data yang sama dipertahankan di seluruh pengujian, dengan menggunakan koleksi yang sama setiap kali. Sebelum setiap pengujian, koleksi dirilis, dan indeks dibuang dan dibangun kembali. Selain itu, kueri hangat dilakukan sebelum setiap pengujian untuk meminimalkan dampak data dingin dan panas, dan setiap kueri dieksekusi beberapa kali untuk memastikan keakuratan.</p>
<p>Untuk dataset yang terdiri dari <strong>1 juta</strong> record, menggunakan <strong>indeks terbalik</strong> dapat memberikan peningkatan kinerja hingga <strong>30x lipat</strong> untuk kueri titik. Peningkatan kinerja bisa lebih signifikan untuk dataset yang lebih besar.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Rekomendasi kinerja<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>Untuk memanfaatkan sepenuhnya kemampuan Milvus dalam pengindeksan bidang skalar dan mengeluarkan kekuatannya dalam pencarian kemiripan vektor, Anda mungkin memerlukan model untuk memperkirakan ukuran memori yang diperlukan berdasarkan data yang Anda miliki.</p>
<p>Tabel-tabel berikut mencantumkan fungsi-fungsi estimasi untuk semua tipe data yang didukung oleh Milvus.</p>
<ul>
<li><p>Bidang numerik</p>
<table>
<thead>
<tr><th>Tipe data</th><th>Fungsi estimasi memori (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>GANDA</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>Bidang string</p>
<table>
<thead>
<tr><th>Panjang string</th><th>Fungsi estimasi memori (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>Untuk mengindeks bidang skalar, baca <a href="/docs/id/index-scalar-fields.md">Membuat Indeks pada Skalar</a>.</p></li>
<li><p>Untuk mempelajari lebih lanjut tentang istilah dan aturan terkait yang disebutkan di atas, baca</p>
<ul>
<li><a href="/docs/id/bitset.md">Bitset</a></li>
<li><a href="/docs/id/multi-vector-search.md">Pencarian hibrida</a></li>
<li><a href="/docs/id/boolean.md">Aturan ekspresi Boolean</a></li>
<li><a href="/docs/id/schema.md#Supported-data-type">Tipe data yang didukung</a></li>
</ul></li>
</ul>
