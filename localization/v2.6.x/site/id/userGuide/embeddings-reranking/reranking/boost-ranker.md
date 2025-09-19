---
id: boost-ranker.md
title: Boost RankerCompatible with Milvus v2.6.2+
summary: >-
  Alih-alih hanya mengandalkan kemiripan semantik yang dihitung berdasarkan
  jarak vektor, Boost Rankers memungkinkan Anda memengaruhi hasil pencarian
  dengan cara yang berarti. Sangat ideal untuk menyesuaikan hasil pencarian
  dengan cepat menggunakan pemfilteran metadata.
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
    </button></h1><p>Alih-alih hanya mengandalkan kemiripan semantik yang dihitung berdasarkan jarak vektor, Boost Rangking memungkinkan Anda untuk memengaruhi hasil pencarian dengan cara yang berarti. Ini sangat ideal untuk menyesuaikan hasil pencarian dengan cepat menggunakan pemfilteran metadata.</p>
<p>Ketika permintaan pencarian menyertakan fungsi Boost Ranker, Milvus menggunakan kondisi pemfilteran opsional dalam fungsi untuk menemukan kecocokan di antara kandidat hasil pencarian dan meningkatkan skor kecocokan tersebut dengan menerapkan bobot yang ditentukan, membantu mempromosikan atau menurunkan peringkat entitas yang cocok di hasil akhir.</p>
<h2 id="When-to-use-Boost-Ranker" class="common-anchor-header">Kapan menggunakan Boost Ranker<button data-href="#When-to-use-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Tidak seperti pemeringkat lain yang mengandalkan model penyandi silang atau algoritme fusi, Boost Ranker secara langsung menyuntikkan aturan berbasis metadata opsional ke dalam proses pemeringkatan, yang membuatnya lebih cocok dalam skenario berikut.</p>
<table>
   <tr>
     <th><p>Kasus Penggunaan</p></th>
     <th><p>Contoh</p></th>
     <th><p>Mengapa Boost Ranker Bekerja dengan Baik</p></th>
   </tr>
   <tr>
     <td><p>Penentuan prioritas konten berdasarkan bisnis</p></td>
     <td><ul><li><p>Menyoroti produk premium dalam hasil pencarian e-commerce</p></li><li><p>Meningkatkan visibilitas konten dengan metrik keterlibatan pengguna yang tinggi (seperti penayangan, suka, dan berbagi)</p></li><li><p>Mengangkat konten terbaru dalam aplikasi pencarian yang sensitif terhadap waktu</p></li><li><p>Memprioritaskan konten dari sumber yang terverifikasi atau tepercaya</p></li><li><p>Meningkatkan hasil yang sesuai dengan frasa yang tepat atau kata kunci dengan relevansi tinggi</p></li></ul></td>
     <td rowspan="2"><p>Tanpa perlu membangun ulang indeks atau memodifikasi model penyematan vektor-operasi yang dapat memakan waktu-Anda dapat langsung mempromosikan atau menurunkan item tertentu di hasil penelusuran dengan menerapkan filter metadata opsional secara real-time. Mekanisme ini memungkinkan peringkat pencarian yang fleksibel dan dinamis yang dengan mudah beradaptasi dengan kebutuhan bisnis yang terus berkembang.</p></td>
   </tr>
   <tr>
     <td><p>Penurunan peringkat konten strategis</p></td>
     <td><ul><li><p>Mengurangi keunggulan item dengan inventaris rendah tanpa menghapusnya sepenuhnya</p></li><li><p>Menurunkan peringkat konten dengan istilah yang berpotensi tidak pantas tanpa menyensor</p></li><li><p>Menurunkan dokumentasi yang lebih lama namun tetap dapat diakses dalam pencarian teknis</p></li><li><p>Secara halus mengurangi visibilitas produk pesaing dalam pencarian pasar</p></li><li><p>Mengurangi relevansi konten dengan indikasi kualitas yang lebih rendah (seperti masalah pemformatan, panjang yang lebih pendek, dll.)</p></li></ul></td>
   </tr>
</table>
<p>Anda juga dapat menggabungkan beberapa Boost Ranker untuk menerapkan strategi peringkat berbasis bobot yang lebih dinamis dan kuat.</p>
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
    </button></h2><p>Diagram berikut ini menggambarkan alur kerja utama Boost Rankers.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/boost-ranker-mechanism.png" alt="Boost Ranker Mechanism" class="doc-image" id="boost-ranker-mechanism" />
   </span> <span class="img-wrapper"> <span>Mekanisme Boost Ranker</span> </span></p>
<p>Ketika Anda memasukkan data, Milvus mendistribusikannya ke seluruh segmen. Selama pencarian, setiap segmen mengembalikan sekumpulan kandidat, dan Milvus memberi peringkat pada kandidat dari semua segmen untuk menghasilkan hasil akhir. Ketika permintaan pencarian menyertakan Boost Ranker, Milvus menerapkannya pada hasil kandidat dari setiap segmen untuk mencegah potensi kehilangan presisi dan meningkatkan recall.</p>
<p>Sebelum menyelesaikan hasil akhir, Milvus memproses kandidat-kandidat ini dengan Boost Ranker sebagai berikut:</p>
<ol>
<li><p>Menerapkan ekspresi pemfilteran opsional yang ditentukan di Boost Ranker untuk mengidentifikasi entitas yang cocok dengan ekspresi tersebut.</p></li>
<li><p>Menerapkan bobot yang ditentukan dalam Boost Ranker untuk meningkatkan skor entitas yang teridentifikasi.</p></li>
</ol>
<div class="alert note">
<p>Anda tidak dapat menggunakan Boost Ranker sebagai pemeringkat dalam pencarian hibrida multi-vektor. Namun, Anda dapat menggunakannya sebagai pemeringkat di salah satu sub-permintaannya (<code translate="no">AnnSearchRequest</code>).</p>
</div>
<h2 id="Examples-of-Boost-Ranker" class="common-anchor-header">Contoh Boost Ranker<button data-href="#Examples-of-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Contoh berikut ini mengilustrasikan penggunaan Boost Ranker dalam pencarian vektor tunggal yang membutuhkan pengembalian lima entitas paling relevan dan menambahkan bobot ke skor entitas dengan tipe dokumen abstrak.</p>
<ol>
<li><p><strong>Kumpulkan kandidat hasil pencarian dalam segmen-segmen.</strong></p>
<p>Tabel berikut ini mengasumsikan Milvus mendistribusikan entitas ke dalam dua segmen<strong>(0001</strong> dan <strong>0002</strong><strong>)</strong>, dengan masing-masing segmen mengembalikan lima kandidat.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>JenisDokumen</p></th>
<th><p>Skor</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p>117</p></td>
<td><p>abstrak</p></td>
<td><p>0.344</p></td>
<td><p>1</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>89</p></td>
<td><p>abstrak</p></td>
<td><p>0.456</p></td>
<td><p>2</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>tubuh</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>tubuh</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>tubuh</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>561</p></td>
<td><p>abstrak</p></td>
<td><p>0.366</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>344</p></td>
<td><p>abstrak</p></td>
<td><p>0.444</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>276</p></td>
<td><p>abstrak</p></td>
<td><p>0.845</p></td>
<td><p>5</p></td>
<td><p>0002</p></td>
</tr>
</table></p></li>
<li><p><strong>Terapkan ekspresi pemfilteran yang ditentukan dalam Boost Ranker</strong> (<code translate="no">doctype='abstract'</code>).</p>
<p>Seperti yang dilambangkan dengan bidang <code translate="no">DocType</code> pada tabel berikut, Milvus akan menandai semua entitas dengan <code translate="no">doctype</code> yang disetel ke <code translate="no">abstract</code> untuk diproses lebih lanjut.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Jenis Dokumen</p></th>
<th><p>Skor</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>tubuh</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>tubuh</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0.189</p></td>
<td><p>1</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>tubuh</p></td>
<td><p>0265</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p></li>
<li><p><strong>Terapkan bobot yang ditentukan dalam Boost Ranker</strong> (<code translate="no">weight=0.5</code>).</p>
<p>Semua entitas yang teridentifikasi pada langkah sebelumnya akan dikalikan dengan bobot yang ditentukan di Boost Ranker, sehingga menghasilkan perubahan pada peringkat mereka.</p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Jenis Dokumen</p></th>
<th><p>Skor</p></th>
<th><p>Skor Tertimbang </p><p>(= skor x bobot)</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p>257</p></td>
<td><p>tubuh</p></td>
<td><p>0.578</p></td>
<td><p>0.578</p></td>
<td><p>3</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>358</p></td>
<td><p>judul</p></td>
<td><p>0.788</p></td>
<td><p>0.788</p></td>
<td><p>4</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p>168</p></td>
<td><p>tubuh</p></td>
<td><p>0.899</p></td>
<td><p>0.899</p></td>
<td><p>5</p></td>
<td><p>0001</p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>2</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>3</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>48</p></td>
<td><p>tubuh</p></td>
<td><p>0.265</p></td>
<td><p>0.265</p></td>
<td><p>4</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>276</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.845</strong></p></td>
<td><p><strong>0.423</strong></p></td>
<td><p><strong>5</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
</table></p>
<p><div class="alert note"></p>
<p>Bobot harus berupa angka floating-point yang Anda pilih. Dalam kasus seperti contoh di atas, di mana skor yang lebih kecil menunjukkan relevansi yang lebih besar, gunakan bobot kurang dari <strong>1</strong>. Jika tidak, gunakan bobot yang lebih besar dari <strong>1</strong>.</p>
<p></div></p></li>
<li><p><strong>Agregasikan kandidat dari semua segmen berdasarkan skor tertimbang untuk menyelesaikan hasilnya.</strong></p>
<p><table>
<tr>
<th><p>ID</p></th>
<th><p>Jenis Dokumen</p></th>
<th><p>Skor</p></th>
<th><p>Skor Tertimbang</p></th>
<th><p>Peringkat</p></th>
<th><p>segmen</p></th>
</tr>
<tr>
<td><p><strong>117</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.344</strong></p></td>
<td><p><strong>0.172</strong></p></td>
<td><p><strong>1</strong></p></td>
<td><p><strong>0001</strong></p></td>
</tr>
<tr>
<td><p><strong>561</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.366</strong></p></td>
<td><p><strong>0.183</strong></p></td>
<td><p><strong>2</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p>46</p></td>
<td><p>tubuh</p></td>
<td><p>0.189</p></td>
<td><p>0.189</p></td>
<td><p>3</p></td>
<td><p>0002</p></td>
</tr>
<tr>
<td><p><strong>344</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.444</strong></p></td>
<td><p><strong>0.222</strong></p></td>
<td><p><strong>4</strong></p></td>
<td><p><strong>0002</strong></p></td>
</tr>
<tr>
<td><p><strong>89</strong></p></td>
<td><p><strong>abstrak</strong></p></td>
<td><p><strong>0.456</strong></p></td>
<td><p><strong>0.228</strong></p></td>
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
    </button></h2><p>Pada bagian ini, Anda akan melihat contoh cara menggunakan Boost Ranker untuk memengaruhi hasil pencarian vektor tunggal.</p>
<h3 id="Create-a-Boost-Ranker" class="common-anchor-header">Membuat Pemeringkat Boost<button data-href="#Create-a-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Sebelum meneruskan Boost Ranker sebagai perangking ulang permintaan pencarian, Anda harus mendefinisikan Boost Ranker dengan benar sebagai fungsi perangkingan ulang sebagai berikut:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Function, FunctionType

ranker = Function(
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
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Diperlukan?</p></th>
     <th><p>Deskripsi</p></th>
     <th><p>Nilai/Contoh</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">name</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Pengenal unik untuk Fungsi ini</p></td>
     <td><p><code translate="no">"rrf"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">input_field_names</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Daftar bidang vektor yang akan digunakan untuk menerapkan fungsi (harus kosong untuk Pemeringkat RRF)</p></td>
     <td><p><code translate="no">[]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">function_type</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Jenis Fungsi yang akan dipanggil; gunakan <code translate="no">RERANK</code> untuk menentukan strategi pemeringkatan</p></td>
     <td><p><code translate="no">FunctionType.RERANK</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.reranker</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan jenis pemeringkatan ulang.</p><p>Harus diatur ke <code translate="no">boost</code> untuk menggunakan Boost Ranker.</p></td>
     <td><p><code translate="no">"boost"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.weight</code></p></td>
     <td><p>Ya</p></td>
     <td><p>Menentukan bobot yang akan dikalikan dengan skor entitas yang cocok dalam hasil pencarian mentah.</p><p>Nilai harus berupa angka floating-point. </p><ul><li><p>Untuk menekankan pentingnya pencocokan entitas, tetapkan ke nilai yang meningkatkan skor.</p></li><li><p>Untuk menurunkan entitas yang cocok, tetapkan parameter ini dengan nilai yang menurunkan skornya.</p></li></ul></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.filter</code></p></td>
     <td><p>No</p></td>
     <td><p>Menentukan ekspresi filter yang akan digunakan untuk mencocokkan entitas di antara entitas hasil pencarian. Dapat berupa ekspresi filter dasar yang valid yang disebutkan dalam <a href="/docs/id/boolean.md">Penjelasan Pemfilteran</a>.</p><p><strong>Catatan</strong>: Hanya gunakan operator dasar, seperti <code translate="no">==</code>, <code translate="no">&gt;</code>, atau <code translate="no">&lt;</code>. Menggunakan operator lanjutan, seperti <code translate="no">text_match</code> atau <code translate="no">phrase_match</code>, akan menurunkan kinerja pencarian.</p></td>
     <td><p><code translate="no">"doctype == 'abstract'"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.random_score</code></p></td>
     <td><p>No</p></td>
     <td><p>Menentukan fungsi acak yang menghasilkan nilai antara <code translate="no">0</code> dan <code translate="no">1</code> secara acak. Ini memiliki dua argumen opsional berikut:</p><ul><li><p><code translate="no">seed</code> (number) Menentukan nilai awal yang digunakan untuk memulai generator nomor acak semu (PRNG).</p></li><li><p><code translate="no">field</code> (string) Menentukan nama bidang yang nilainya akan digunakan sebagai faktor acak dalam menghasilkan nomor acak. Sebuah field dengan nilai yang unik sudah cukup.</p><p>Anda disarankan untuk menetapkan <code translate="no">seed</code> dan <code translate="no">field</code> untuk memastikan konsistensi di seluruh generasi dengan menggunakan nilai seed dan field yang sama.</p></li></ul></td>
     <td><p><code translate="no">{"seed": 126, "field": "id"}</code></p></td>
   </tr>
</table>
<h3 id="Search-with-a-single-Boost-Ranker" class="common-anchor-header">Cari dengan satu Boost Ranker<button data-href="#Search-with-a-single-Boost-Ranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Setelah fungsi Boost Ranker siap, Anda dapat mereferensikannya dalam permintaan penelusuran. Contoh berikut ini mengasumsikan bahwa Anda telah membuat koleksi yang memiliki bidang berikut: <strong>id</strong>, <strong>vektor</strong>, dan <strong>jenis dokumen</strong>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Connect to the Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># Assume you have a collection set up</span>

<span class="hljs-comment"># Conduct a similarity search using the created ranker</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-multiple-Boost-Rankers" class="common-anchor-header">Mencari dengan beberapa Pemeringkat Boost<button data-href="#Search-with-multiple-Boost-Rankers" class="anchor-icon" translate="no">
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
    </button></h3><p>Anda dapat menggabungkan beberapa Boost Rankers dalam satu pencarian untuk memengaruhi hasil pencarian. Untuk melakukannya, buat beberapa Pemeringkat Boost, rujuk ke dalam instance <strong>FunctionScore</strong>, dan gunakan instance <strong>FunctionScore</strong> sebagai pemeringkat dalam permintaan pencarian.</p>
<p>Contoh berikut ini menunjukkan cara memodifikasi skor semua entitas yang diidentifikasi dengan menerapkan bobot antara <strong>0,8</strong> dan <strong>1,2</strong>.</p>
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
    params: {
        <span class="hljs-string">&quot;boost_mode&quot;</span>: <span class="hljs-string">&quot;Multiply&quot;</span>
        <span class="hljs-string">&quot;function_mode&quot;</span>: <span class="hljs-string">&quot;Sum&quot;</span>
    }
)

<span class="hljs-comment"># Conduct a similarity search using the created Function Score</span>
client.search(
    data=[-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    params={},
    output_field=[<span class="hljs-string">&quot;doctype&quot;</span>],
    ranker=ranker
)
<button class="copy-code-btn"></button></code></pre>
<p>Secara khusus, ada dua Boost Rankers: satu menerapkan bobot tetap untuk semua entitas yang ditemukan, sementara yang lain memberikan bobot acak kepada mereka. Kemudian, kami mereferensikan kedua pemeringkat ini dalam sebuah <strong>FunctionScore</strong>, yang juga mendefinisikan bagaimana bobot mempengaruhi nilai entitas yang ditemukan.</p>
<p>Tabel berikut mencantumkan parameter-parameter yang diperlukan untuk membuat sebuah instance <strong>FunctionScore</strong>.</p>
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
     <td><p>Menentukan nama-nama pemeringkat target dalam daftar.</p></td>
     <td><p><code translate="no">["fix_weight_ranker", "random_weight_ranker"]</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.boost_mode</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan bagaimana bobot yang ditentukan mempengaruhi skor dari setiap entitas yang cocok.</p><p>Nilai yang mungkin adalah:</p><ul><li><p><code translate="no">Multiple</code></p><p>Menunjukkan bahwa nilai tertimbang sama dengan skor asli entitas yang cocok dikalikan dengan bobot yang ditentukan. </p><p>Ini adalah nilai default.</p></li><li><p><code translate="no">Sum</code></p><p>Menunjukkan bahwa nilai tertimbang sama dengan jumlah skor asli dari entitas yang cocok dan bobot yang ditentukan</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.function_mode</code></p></td>
     <td><p>Tidak</p></td>
     <td><p>Menentukan bagaimana nilai tertimbang dari berbagai Pemeringkat Boost diproses.</p><p>Nilai yang mungkin adalah:</p><ul><li><p><code translate="no">Multiplify</code></p><p>Menunjukkan bahwa skor akhir dari entitas yang cocok sama dengan hasil kali nilai tertimbang dari semua Pemeringkat Boost.</p><p>Ini adalah nilai default.</p></li><li><p><code translate="no">Sum</code></p><p>Menunjukkan bahwa skor akhir dari entitas yang cocok sama dengan jumlah nilai tertimbang dari semua Pemeringkat Boost.</p></li></ul></td>
     <td><p><code translate="no">"Sum"</code></p></td>
   </tr>
</table>
