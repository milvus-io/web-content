---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Alih-alih hanya mengandalkan kemiripan semantik yang dihitung berdasarkan
  jarak vektor, Boost Rankers memungkinkan Anda memengaruhi hasil pencarian
  secara bermakna. Fitur ini sangat ideal untuk menyesuaikan hasil pencarian
  dengan cepat menggunakan penyaringan metadata.
beta: Milvus v2.6.2+
---
<h1 id="Boost-Ranker" class="common-anchor-header">Boost Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Alih-alih hanya mengandalkan kemiripan semantik yang dihitung berdasarkan jarak vektor, Boost Ranker memungkinkan Anda memengaruhi hasil pencarian secara bermakna. Fitur ini sangat ideal untuk menyesuaikan hasil pencarian dengan cepat menggunakan penyaringan metadata.</p>
<p>Ketika permintaan pencarian menyertakan fungsi Boost Ranker, Milvus menggunakan kondisi penyaringan opsional di dalam fungsi tersebut untuk menemukan kecocokan di antara kandidat hasil pencarian dan meningkatkan skor kecocokan tersebut dengan menerapkan bobot yang ditentukan, sehingga membantu menaikkan atau menurunkan peringkat entitas yang cocok dalam hasil akhir.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Kapan Menggunakan Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Berbeda dengan ranker lain yang mengandalkan model lintas-encoder atau algoritma fusi, Boost Ranker secara langsung menyisipkan aturan berbasis metadata opsional ke dalam proses peringkat, sehingga lebih cocok digunakan dalam skenario berikut.</p>
<table>
   <tr>
     <th><p>Kasus Penggunaan</p></th>
     <th><p>Contoh</p></th>
     <th><p>Mengapa Boost Ranker Berfungsi dengan Baik</p></th>
   </tr>
   <tr>
     <td><p>Prioritas konten yang didorong oleh kebutuhan bisnis</p></td>
     <td><ul><li><p>Menonjolkan produk premium dalam hasil pencarian e-commerce</p></li><li><p>Meningkatkan visibilitas konten dengan metrik keterlibatan pengguna yang tinggi (seperti tampilan, suka, dan bagikan)</p></li><li><p>Meningkatkan peringkat konten terbaru dalam aplikasi pencarian yang sensitif terhadap waktu</p></li><li><p>Memprioritaskan konten dari sumber yang terverifikasi atau tepercaya</p></li><li><p>Meningkatkan hasil yang sesuai dengan frasa persis atau kata kunci yang sangat relevan</p></li></ul></td>
     <td rowspan="2"><p>Tanpa perlu membangun kembali indeks atau memodifikasi model embedding vektor—operasi yang bisa memakan waktu—Anda dapat langsung mempromosikan atau menurunkan peringkat item tertentu dalam hasil pencarian dengan menerapkan filter metadata opsional secara real time. Mekanisme ini memungkinkan peringkat pencarian yang fleksibel dan dinamis yang mudah beradaptasi dengan kebutuhan bisnis yang terus berkembang.</p></td>
   </tr>
   <tr>
     <td><p>Penurunan peringkat konten secara strategis</p></td>
     <td><ul><li><p>Mengurangi keunggulan item dengan persediaan rendah tanpa menghapusnya sepenuhnya</p></li><li><p>Menurunkan peringkat konten yang mengandung istilah yang berpotensi kontroversial tanpa sensor</p></li><li><p>Menurunkan peringkat dokumentasi lama sambil tetap menjadikannya dapat diakses dalam pencarian teknis</p></li><li><p>Secara halus mengurangi visibilitas produk pesaing dalam pencarian marketplace</p></li><li><p>Mengurangi relevansi konten yang menunjukkan indikasi kualitas rendah (seperti masalah format, panjang yang lebih pendek, dll.)</p></li></ul></td>
   </tr>
</table>
<p>Anda juga dapat menggabungkan beberapa Boost Ranker untuk menerapkan strategi peringkat berbasis bobot yang lebih dinamis dan kokoh.</p>
<h2 id="Mechanism-of-Boost-Ranker" class="common-anchor-header">Mekanisme Boost Ranker<button data-href="#Mechanism-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Diagram berikut menggambarkan alur kerja utama Boost Ranker.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" /> 
   <span>Mekanisme Boost Ranker</span>
  
 </span></p>
<p>Saat Anda memasukkan data, Milvus mendistribusikannya ke berbagai segmen. Selama pencarian, setiap segmen mengembalikan sekumpulan kandidat, dan Milvus memeringkat kandidat-kandidat ini dari semua segmen untuk menghasilkan hasil akhir. Ketika permintaan pencarian menyertakan Boost Ranker, Milvus menerapkannya pada hasil kandidat dari setiap segmen untuk mencegah potensi kehilangan presisi dan meningkatkan recall.</p>
<p>Sebelum memfinalisasi hasil, Milvus memproses kandidat-kandidat ini dengan Boost Ranker sebagai berikut:</p>
<ol>
<li><p>Menerapkan ekspresi penyaringan opsional yang ditentukan dalam Boost Ranker untuk mengidentifikasi entitas yang cocok dengan ekspresi tersebut.</p></li>
<li><p>Menerapkan bobot yang ditentukan dalam Boost Ranker untuk meningkatkan skor entitas yang teridentifikasi.</p></li>
</ol>
<div class="alert note">
<p>Anda tidak dapat menggunakan Boost Ranker sebagai pengurut dalam pencarian hibrida multi-vektor. Namun, Anda dapat menggunakannya sebagai pengurut dalam salah satu sub-permintaannya (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Contoh Penggunaan Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini menggambarkan penggunaan Boost Ranker dalam pencarian vektor tunggal yang memerlukan pengembalian lima entitas paling relevan teratas dan penambahan bobot ke skor entitas dengan tipe dokumen abstrak.</p>
<ol>
<li><p><strong>Kumpulkan kandidat hasil pencarian dalam segmen.</strong></p>
<p>Tabel berikut mengasumsikan Milvus mendistribusikan entitas ke dalam dua segmen (<strong>0001</strong> dan <strong>0002</strong>), dengan setiap segmen mengembalikan lima kandidat.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Jenis Dokumen</p></th>
<th><p>Skor</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstrak</p></td>
<td><p>0,344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstrak</p></td>
<td><p>0,456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>isi</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>isi</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>badan</p></td>
<td><p>0,189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>badan</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstrak</p></td>
<td><p>0,366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstrak</p></td>
<td><p>0,444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstrak</p></td>
<td><p>0,845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Terapkan ekspresi penyaringan yang ditentukan di Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Sebagaimana ditunjukkan oleh kolom " <code translate="no">DocType</code> " pada tabel berikut, Milvus akan menandai semua entitas yang nilai " <code translate="no">doctype</code> "-nya diatur ke " <code translate="no">abstract</code> " untuk diproses lebih lanjut.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Skor</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>isi</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>isi</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>badan</p></td>
<td><p>0,189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>badan</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Terapkan bobot yang ditentukan dalam Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Semua entitas yang teridentifikasi pada langkah sebelumnya akan dikalikan dengan bobot yang ditentukan di Boost Ranker, sehingga menghasilkan perubahan pada peringkatnya.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Jenis Dokumen</p></th>
<th><p>Skor</p></th>
<th><p>Skor Tertimbang </p><p>(= skor × bobot)</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>badan</p></td>
<td><p>0,578</p></td>
<td><p>0,578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0,788</p></td>
<td><p>0,788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>tubuh</p></td>
<td><p>0,899</p></td>
<td><p>0,899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>badan</p></td>
<td><p>0,265</p></td>
<td><p>0,265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,845</strong></p></td>
<td><p><strong>0,423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0,0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Bobot harus berupa bilangan desimal yang Anda tentukan. Dalam kasus seperti contoh di atas, di mana skor yang lebih kecil menunjukkan relevansi yang lebih tinggi, gunakan bobot kurang dari <strong>1</strong>. Sebaliknya, gunakan bobot lebih dari <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Gabungkan kandidat dari semua segmen berdasarkan skor tertimbang untuk menentukan hasil akhir.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>DocType</p></th>
<th><p>Skor</p></th>
<th><p>Skor Tertimbang</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,344</strong></p></td>
<td><p><strong>0,172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,366</strong></p></td>
<td><p><strong>0,183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0,189</p></td>
<td><p>0,189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,444</strong></p></td>
<td><p><strong>0,222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0,456</strong></p></td>
<td><p><strong>0,228</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
</table></p></li>
</ol>
<h2 id="Usage-of-Boost-Ranker" class="common-anchor-header">Penggunaan Boost Ranker<button data-href="#Usage-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Pada bagian ini, Anda akan melihat contoh-contoh cara menggunakan Boost Ranker untuk memengaruhi hasil pencarian vektor tunggal.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Membuat Boost Ranker<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum meneruskan Boost Ranker sebagai reranker dari permintaan pencarian, Anda harus mendefinisikan Boost Ranker dengan benar sebagai fungsi reranking sebagai berikut:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

rerank = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.5</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BoostRanker;

<span class="hljs-type">BoostRanker</span> <span class="hljs-variable">rerank</span> <span class="hljs-operator">=</span> BoostRanker.builder()
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .filter(<span class="hljs-string">&quot;doctype == \&quot;abstract\&quot;&quot;</span>)
        .weight(<span class="hljs-number">0.5f</span>)
        .randomScoreField(<span class="hljs-string">&quot;id&quot;</span>)
        .randomScoreSeed(<span class="hljs-number">126L</span>)
        .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

rerank := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rerank</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;filter&quot;</span>, <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126, \&quot;field\&quot;: \&quot;id\&quot;}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.5&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> rerank = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetFilter</span>(<span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>);
rerank-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.5</span>);
<span class="hljs-comment">// Note: SetRandomScoreField()/SetRandomScoreSeed() are not usable as of</span>
<span class="hljs-comment">// milvus-sdk-cpp v3.0.3 - the SDK sends the seed as a string, which the</span>
<span class="hljs-comment">// server rejects (a numeric seed is required).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> rerank = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;doctype == &#x27;abstract&#x27;&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
      <span class="hljs-attr">field</span>: <span class="hljs-string">&quot;id&quot;</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.5</span>,
  },
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> RANKER=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;boost&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;boost&quot;,
        &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
        &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
        &quot;weight&quot;: 0.5
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Wajib?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai/Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Pengidentifikasi unik untuk Fungsi ini</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar bidang vektor yang akan diterapkan fungsi ini (harus kosong untuk Boost Ranker)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Jenis fungsi yang akan dipanggil; gunakan ` <code translate="no">RERANK</code> ` untuk menentukan strategi pengurutan ulang</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan jenis reranker.</p><p>Harus disetel ke ` <code translate="no">boost</code> ` untuk menggunakan Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan bobot yang akan dikalikan dengan skor entitas yang cocok dalam hasil pencarian mentah.</p><p>Nilainya harus berupa bilangan desimal. </p><ul><li><p>Untuk menekankan pentingnya entitas yang cocok, atur nilainya agar meningkatkan skor.</p></li><li><p>Untuk menurunkan peringkat entitas yang cocok, tetapkan parameter ini ke nilai yang menurunkan skornya.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan ekspresi filter yang akan digunakan untuk mencocokkan entitas di antara entitas hasil pencarian. Ekspresi ini dapat berupa ekspresi filter dasar yang valid apa pun yang disebutkan dalam <a href="/docs/id/boolean.md">Penjelasan Penyaringan</a>.</p><p><strong>Catatan</strong>: Gunakan hanya operator dasar, seperti <code translate="no">==</code>, <code translate="no">&gt;</code>, atau <code translate="no">&lt;</code>. Penggunaan operator lanjutan, seperti <code translate="no">text_match</code> atau <code translate="no">phrase_match</code>, akan menurunkan kinerja pencarian.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan fungsi acak yang menghasilkan nilai secara acak antara <code translate="no">0</code> dan <code translate="no">1</code>. Fungsi ini memiliki dua argumen opsional berikut:</p><ul><li><p><code translate="no">seed</code> (number) Menentukan nilai awal yang digunakan untuk memulai generator bilangan acak semu (PRNG).</p></li><li><p><code translate="no">field</code> (string) Menentukan nama bidang yang nilainya akan digunakan sebagai faktor acak dalam menghasilkan bilangan acak. Bidang dengan nilai-nilai unik sudah cukup.</p><p>Anda disarankan untuk mengatur baik <code translate="no">seed</code> maupun <code translate="no">field</code> guna memastikan konsistensi antar generasi dengan menggunakan nilai seed dan field yang sama.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Pencarian dengan satu Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah fungsi Boost Ranker siap, Anda dapat merujuknya dalam permintaan pencarian. Contoh berikut mengasumsikan bahwa Anda telah membuat koleksi yang memiliki bidang-bidang berikut: <strong>id</strong>, <strong>vector</strong>, dan <strong>doctype</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=rerank
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954f</span>, <span class="hljs-number">0.447943f</span>, -<span class="hljs-number">0.174938f</span>, -<span class="hljs-number">0.424803f</span>, -<span class="hljs-number">0.864845f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(FunctionScore.builder()
                .addFunction(rerank)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{
    entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>},
}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(entity.NewFunctionScore().AddFunction(rerank)))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(FunctionScore::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">add_function</span>(rerank.<span class="hljs-title function_ invoke__">clone</span>()))
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(rerank);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-comment">// Connect to the Milvus server</span>
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>
});

<span class="hljs-comment">// Assume you have a collection set up</span>

<span class="hljs-comment">// Conduct a similarity search</span>
<span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_collection&#x27;</span>,
  <span class="hljs-attr">data</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;doctype&#x27;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: rerank,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results:&#x27;</span>, searchResults);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;filter&quot;: &quot;doctype == &#x27;</span>\&#x27;<span class="hljs-string">&#x27;abstract&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126, &quot;field&quot;: &quot;id&quot;},
                    &quot;weight&quot;: 0.5
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Pencarian dengan beberapa Boost Ranker<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat menggabungkan beberapa Boost Ranker dalam satu pencarian untuk memengaruhi hasil pencarian. Untuk melakukannya, buat beberapa Boost Ranker, rujuk dalam instance <strong>FunctionScore</strong>, dan gunakan instance <strong>FunctionScore</strong> tersebut sebagai ranker dalam permintaan pencarian.</p>
<p>Contoh berikut menunjukkan cara memodifikasi skor semua entitas yang teridentifikasi dengan menerapkan bobot antara <strong>0,8</strong> dan <strong>1,2</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType, FunctionScore

<span class="hljs-comment"># Create a Boost Ranker with a fixed weight</span>
fix_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.8</span>
    }
)

<span class="hljs-comment"># Create a Boost Ranker with a randomly generated weight between 0 and 0.4</span>
random_weight_ranker = Function(
    name=<span class="hljs-string">&quot;boost&quot;</span>,
    input_field_names=[], <span class="hljs-comment"># Must be an empty list</span>
    function_type=FunctionType.RERANK,
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;boost&quot;</span>,
        <span class="hljs-string">&quot;random_score&quot;</span>: {
            <span class="hljs-string">&quot;seed&quot;</span>: <span class="hljs-number">126</span>,
        },
        <span class="hljs-string">&quot;weight&quot;</span>: <span class="hljs-number">0.4</span>
    }
)

<span class="hljs-comment"># Create a Function Score</span>
ranker = FunctionScore(
    functions=[
        fix_weight_ranker,
        random_weight_ranker
    ],
    params={
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_fields=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.FunctionScore;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">fixWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)
        .build();

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">randomWeightRanker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
        .functionType(FunctionType.RERANK)
        .name(<span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
        .param(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)
        .param(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
        .build();

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>);
params.put(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>);

<span class="hljs-type">FunctionScore</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> FunctionScore.builder()
        .addFunction(fixWeightRanker)
        .addFunction(randomWeightRanker)
        .params(params)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.619954382375778f</span>, <span class="hljs-number">0.4479436794798608f</span>, -<span class="hljs-number">0.17493894838751745f</span>, -<span class="hljs-number">0.4248030059917294f</span>, -<span class="hljs-number">0.8648452746018911f</span>})))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;doctype&quot;</span>))
        .topK(<span class="hljs-number">10</span>)
        .functionScore(ranker)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

fixWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>)

randomWeightRanker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;boost&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>).
    WithParam(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>).
    WithParam(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>)

ranker := entity.NewFunctionScore().
    AddFunction(fixWeightRanker).
    AddFunction(randomWeightRanker).
    WithParam(<span class="hljs-string">&quot;boost_mode&quot;</span>, <span class="hljs-string">&quot;Multiply&quot;</span>).
    WithParam(<span class="hljs-string">&quot;function_mode&quot;</span>, <span class="hljs-string">&quot;Sum&quot;</span>)

resultSet, err := client.Search(ctx, milvusclient.NewSearchOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-number">10</span>, []entity.Vector{entity.FloatVector{<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>}}).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;doctype&quot;</span>).
    WithFunctionScore(ranker))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(resultSet)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>)).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">fix_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.8&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">random_weight_ranker</span> = Function::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">function_type</span>(FunctionType::Rerank)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;boost&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;random_score&quot;</span>, <span class="hljs-string">&quot;{\&quot;seed\&quot;: 126}&quot;</span>)
    .<span class="hljs-title function_ invoke__">param</span>(<span class="hljs-string">&quot;weight&quot;</span>, <span class="hljs-string">&quot;0.4&quot;</span>);

<span class="hljs-keyword">let</span> <span class="hljs-variable">function_score</span> = FunctionScore::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_function</span>(fix_weight_ranker)
    .<span class="hljs-title function_ invoke__">add_function</span>(random_weight_ranker)
    .<span class="hljs-title function_ invoke__">params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
        (<span class="hljs-string">&quot;boost_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Multiply&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
        (<span class="hljs-string">&quot;function_mode&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;Sum&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()),
    ]));

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]]))
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;doctype&quot;</span>])
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">rerank</span>(function_score)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, response);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;memory&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-keyword">auto</span> fix_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
fix_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.8</span>);

<span class="hljs-keyword">auto</span> random_weight_ranker = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::BoostRerank&gt;(<span class="hljs-string">&quot;boost&quot;</span>);
random_weight_ranker-&gt;<span class="hljs-built_in">SetWeight</span>(<span class="hljs-number">0.4</span>);
<span class="hljs-comment">// Note: SetRandomScoreSeed() is not usable as of milvus-sdk-cpp v3.0.3 —</span>
<span class="hljs-comment">// the SDK sends the seed as a string, which the server rejects.</span>

<span class="hljs-keyword">auto</span> function_score = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::FunctionScore&gt;();
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(fix_weight_ranker);
function_score-&gt;<span class="hljs-built_in">AddFunction</span>(random_weight_ranker);

std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">-0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, <span class="hljs-number">-0.17493894838751745</span>, <span class="hljs-number">-0.4248030059917294</span>, <span class="hljs-number">-0.8648452746018911</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                   .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">WithRerank</span>(function_score)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;doctype&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> {<span class="hljs-title class_">FunctionType</span>} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> fix_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.8</span>,
  },
};

<span class="hljs-keyword">const</span> random_weight_ranker = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;boost&quot;</span>,
  <span class="hljs-attr">input_field_names</span>: [],
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">FunctionType</span>.<span class="hljs-property">RERANK</span>,
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">reranker</span>: <span class="hljs-string">&quot;boost&quot;</span>,
    <span class="hljs-attr">random_score</span>: {
      <span class="hljs-attr">seed</span>: <span class="hljs-number">126</span>,
    },
    <span class="hljs-attr">weight</span>: <span class="hljs-number">0.4</span>,
  },
};

<span class="hljs-keyword">const</span> ranker = {
  <span class="hljs-attr">functions</span>: [fix_weight_ranker, random_weight_ranker],
  <span class="hljs-attr">params</span>: {
    <span class="hljs-attr">boost_mode</span>: <span class="hljs-string">&quot;Multiply&quot;</span>,
    <span class="hljs-attr">function_mode</span>: <span class="hljs-string">&quot;Sum&quot;</span>,
  },
};

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">data</span>: [[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
  <span class="hljs-attr">params</span>: {},
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;doctype&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">rerank</span>: ranker
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;doctype&quot;],
    &quot;functionScore&quot;: {
        &quot;functions&quot;: [
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;weight&quot;: 0.8
                }
            },
            {
                &quot;name&quot;: &quot;boost&quot;,
                &quot;type&quot;: &quot;Rerank&quot;,
                &quot;inputFieldNames&quot;: [],
                &quot;outputFieldNames&quot;: [],
                &quot;params&quot;: {
                    &quot;reranker&quot;: &quot;boost&quot;,
                    &quot;random_score&quot;: {&quot;seed&quot;: 126},
                    &quot;weight&quot;: 0.4
                }
            }
        ],
        &quot;params&quot;: {
            &quot;boost_mode&quot;: &quot;Multiply&quot;,
            &quot;function_mode&quot;: &quot;Sum&quot;
        }
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Secara spesifik, terdapat dua Boost Ranker: satu menerapkan bobot tetap ke semua entitas yang ditemukan, sedangkan yang lain menetapkan bobot acak kepada entitas-entitas tersebut. Selanjutnya, kita merujuk kedua ranker ini dalam sebuah <strong>FunctionScore</strong>, yang juga menentukan bagaimana bobot-bobot tersebut memengaruhi skor entitas yang ditemukan.</p>
<p>Tabel berikut mencantumkan parameter yang diperlukan untuk membuat instance <strong>FunctionScore</strong>.</p>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Diperlukan?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai/Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">functions</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan nama-nama ranker target dalam sebuah daftar.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan bagaimana bobot yang ditentukan memengaruhi skor entitas yang cocok.</p><p>Nilai yang mungkin adalah:</p><ul><li><p><code translate="no">Multiply</code></p><p>Menunjukkan bahwa nilai tertimbang sama dengan skor asli entitas yang cocok dikalikan dengan bobot yang ditentukan. </p><p>Ini adalah nilai default.</p></li><li><p><code translate="no">Sum</code></p><p>Menunjukkan bahwa nilai yang diberi bobot sama dengan jumlah skor asli dari entitas yang cocok dan bobot yang ditentukan</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan cara pemrosesan nilai tertimbang dari berbagai Boost Ranker.</p><p>Nilai yang mungkin adalah:</p><ul><li><p><code translate="no">Multiply</code></p><p>Menunjukkan bahwa skor akhir dari suatu entitas yang cocok sama dengan hasil kali nilai-nilai tertimbang dari semua Boost Ranker.</p><p>Ini adalah nilai default.</p></li><li><p><code translate="no">Sum</code></p><p>Menunjukkan bahwa skor akhir dari suatu entitas yang cocok sama dengan jumlah nilai tertimbang dari semua Boost Ranker.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
