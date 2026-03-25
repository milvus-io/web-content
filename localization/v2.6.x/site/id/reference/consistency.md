---
id: consistency.md
summary: Pelajari tentang empat tingkat konsistensi dalam Milvus.
title: Konsistensi
---
<h1 id="Consistency" class="common-anchor-header">Konsistensi<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan empat tingkat konsistensi dalam Milvus dan skenario yang paling sesuai. Mekanisme di balik memastikan konsistensi dalam Milvus juga dibahas dalam topik ini.</p>
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
    </button></h2><p>Konsistensi dalam basis data terdistribusi secara khusus mengacu pada properti yang memastikan setiap node atau replika memiliki tampilan data yang sama ketika menulis atau membaca data pada waktu tertentu.</p>
<p>Milvus mendukung empat tingkat konsistensi: strong, bounded staleness, session, dan eventually. Tingkat konsistensi default di Milvus adalah bounded staleness.  Anda dapat dengan mudah mengatur tingkat konsistensi ketika melakukan <a href="/docs/id/single-vector-search.md">pencarian vektor tunggal</a>, <a href="/docs/id/multi-vector-search.md">pencarian hibrida</a>, atau <a href="/docs/id/get-and-scalar-query.md">kueri</a> agar sesuai dengan aplikasi Anda.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Tingkat konsistensi<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Seperti yang didefinisikan oleh teorema <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>, basis data terdistribusi harus mengorbankan konsistensi, ketersediaan, dan latensi. Konsistensi yang tinggi menyiratkan akurasi yang tinggi tetapi juga latensi pencarian yang tinggi, sementara konsistensi yang rendah mengarah pada kecepatan pencarian yang cepat tetapi kehilangan visibilitas data. Oleh karena itu, tingkat konsistensi yang berbeda sesuai dengan skenario yang berbeda.</p>
<p>Berikut ini menjelaskan perbedaan dari empat tingkat konsistensi yang didukung oleh Milvus dan skenario yang sesuai dengan masing-masing tingkat konsistensi.</p>
<h3 id="Strong" class="common-anchor-header">Kuat<button data-href="#Strong" class="anchor-icon" translate="no">
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
    </button></h3><p>Strong adalah tingkat konsistensi tertinggi dan paling ketat. Ini memastikan bahwa pengguna dapat membaca data versi terbaru.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Konsistensi yang kuat</span> </span></p>
<p>Menurut teorema PACELC, jika tingkat konsistensi diatur ke strong, latensi akan meningkat. Oleh karena itu, kami merekomendasikan untuk memilih konsistensi yang kuat selama pengujian fungsional untuk memastikan keakuratan hasil pengujian. Konsistensi yang kuat juga paling cocok untuk aplikasi yang memiliki permintaan ketat untuk konsistensi data dengan mengorbankan kecepatan pencarian. Contohnya adalah sistem keuangan online yang berhubungan dengan pembayaran pesanan dan penagihan.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Keusangan terbatas<button data-href="#Bounded-staleness" class="anchor-icon" translate="no">
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
    </button></h3><p>Bounded staleness, seperti namanya, memungkinkan ketidakkonsistenan data selama periode waktu tertentu. Namun, secara umum, data selalu konsisten secara global di luar periode waktu tersebut.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Konsistensi keusangan yang terbatas</span> </span></p>
<p>Bounded staleness cocok untuk skenario yang perlu mengontrol latensi pencarian dan dapat menerima ketidaktampakan data secara sporadis. Misalnya, dalam sistem pemberi rekomendasi seperti mesin rekomendasi video, ketidaktampakan data terkadang berdampak kecil pada tingkat penarikan secara keseluruhan, tetapi dapat secara signifikan meningkatkan kinerja sistem pemberi rekomendasi.</p>
<h3 id="Session" class="common-anchor-header">Sesi<button data-href="#Session" class="anchor-icon" translate="no">
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
    </button></h3><p>Sesi memastikan bahwa semua penulisan data dapat langsung dirasakan saat dibaca selama sesi yang sama. Dengan kata lain, ketika Anda menulis data melalui satu klien, data yang baru dimasukkan langsung dapat dicari.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Konsistensi sesi</span> </span></p>
<p>Kami merekomendasikan untuk memilih sesi sebagai tingkat konsistensi untuk skenario-skenario di mana permintaan akan konsistensi data dalam sesi yang sama sangat tinggi. Contohnya adalah menghapus data entri buku dari sistem perpustakaan, dan setelah konfirmasi penghapusan dan penyegaran halaman (sesi yang berbeda), buku tersebut seharusnya tidak lagi terlihat dalam hasil pencarian.</p>
<h3 id="Eventually" class="common-anchor-header">Akhirnya<button data-href="#Eventually" class="anchor-icon" translate="no">
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
    </button></h3><p>Tidak ada jaminan urutan pembacaan dan penulisan, dan replika pada akhirnya akan menyatu pada kondisi yang sama mengingat tidak ada operasi penulisan lebih lanjut yang dilakukan. Di bawah konsistensi "akhirnya", replika mulai mengerjakan permintaan baca dengan nilai terbaru yang diperbarui. Konsistensi akhirnya adalah level terlemah di antara keempat level tersebut.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Konsistensi akhirnya</span> </span></p>
<p>Namun, menurut teorema PACELC, latensi pencarian dapat sangat dipersingkat dengan mengorbankan konsistensi. Oleh karena itu, akhirnya konsisten paling cocok untuk skenario yang tidak memiliki permintaan tinggi untuk konsistensi data tetapi membutuhkan kinerja pencarian yang sangat cepat. Contohnya adalah mengambil ulasan dan peringkat produk Amazon dengan tingkat akhirnya konsisten.</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Menjamin stempel waktu<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menyadari tingkat konsistensi yang berbeda dengan memperkenalkan <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">stempel waktu Jaminan</a> (GuaranteeTs).</p>
<p>GuaranteeTs berfungsi untuk memberi tahu node kueri bahwa pencarian atau permintaan kueri tidak akan dilakukan hingga semua data sebelum GuaranteeTs dapat dilihat oleh node kueri. Ketika Anda menentukan tingkat konsistensi, tingkat konsistensi akan dipetakan ke nilai GuaranteeTs tertentu. Nilai GuaranteeTs yang berbeda sesuai dengan tingkat konsistensi yang berbeda:</p>
<ul>
<li><p><strong>Kuat</strong>: GuaranteeTs ditetapkan identik dengan stempel waktu sistem terbaru, dan simpul kueri menunggu hingga semua data sebelum stempel waktu sistem terbaru dapat dilihat, sebelum memproses permintaan pencarian atau kueri.</p></li>
<li><p><strong>Keusangan</strong> yang<strong>dibatasi</strong>: GuaranteeTs diatur relatif lebih kecil dari stempel waktu sistem terbaru, dan simpul kueri mencari pada tampilan data yang masih dapat ditoleransi dan kurang diperbarui.</p></li>
<li><p><strong>Sesi</strong>: Klien menggunakan stempel waktu dari operasi penulisan terbaru sebagai GuaranteeTs, sehingga setiap klien setidaknya dapat mengambil data yang dimasukkan oleh klien yang sama.</p></li>
<li><p><strong>Akhirnya</strong>: GuaranteeTs diatur ke nilai yang sangat kecil untuk melewatkan pemeriksaan konsistensi. Node kueri langsung mencari pada tampilan data yang ada.</p></li>
</ul>
<p>Lihat <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Cara Kerja GuaranteeTs</a> untuk informasi lebih lanjut tentang mekanisme di balik memastikan berbagai tingkat konsistensi di Milvus.</p>
<h2 id="Whats-next" class="common-anchor-header">Selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pelajari cara menyetel tingkat konsistensi ketika:<ul>
<li><a href="/docs/id/single-vector-search.md">melakukan pencarian vektor tunggal</a></li>
<li><a href="/docs/id/multi-vector-search.md">melakukan pencarian hibrida</a></li>
<li><a href="/docs/id/get-and-scalar-query.md">melakukan kueri skalar</a></li>
</ul></li>
</ul>
