---
id: replica.md
summary: Pelajari tentang replika dalam memori di Milvus.
title: Replika Dalam Memori
---

<h1 id="In-Memory-Replica" class="common-anchor-header">Replika Dalam Memori<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini memperkenalkan mekanisme replika dalam memori (replikasi) dalam Milvus yang memungkinkan replikasi beberapa segmen dalam memori kerja untuk meningkatkan kinerja dan ketersediaan.</p>
<p>Untuk informasi tentang cara mengonfigurasi replika dalam memori, lihat <a href="/docs/id/v2.5.x/configure_querynode.md#queryNodereplicas">Konfigurasi terkait Node Query</a>.</p>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Replika_Ketersediaan</span> </span></p>
<p>Dengan replika dalam memori, Milvus dapat memuat segmen yang sama pada beberapa node kueri. Jika satu simpul kueri gagal atau sibuk dengan permintaan pencarian saat ini ketika yang lain tiba, sistem dapat mengirim permintaan baru ke simpul kueri yang menganggur yang memiliki replikasi segmen yang sama.</p>
<h3 id="Performance" class="common-anchor-header">Kinerja</h3><p>Replika dalam memori memungkinkan Anda memanfaatkan sumber daya CPU dan memori ekstra. Hal ini sangat berguna jika Anda memiliki kumpulan data yang relatif kecil tetapi ingin meningkatkan throughput pembacaan dengan sumber daya perangkat keras tambahan. Keseluruhan QPS (kueri per detik) dan throughput dapat ditingkatkan secara signifikan.</p>
<h3 id="Availability" class="common-anchor-header">Ketersediaan</h3><p>Replika dalam memori membantu Milvus pulih lebih cepat jika simpul kueri mengalami kegagalan. Ketika sebuah node kueri gagal, segmen tidak harus dimuat ulang di node kueri lain. Sebaliknya, permintaan pencarian dapat dikirim ulang ke node kueri baru dengan segera tanpa harus memuat ulang data lagi. Dengan beberapa replika segmen yang dipertahankan secara bersamaan, sistem lebih tangguh dalam menghadapi kegagalan.</p>
<h2 id="Key-Concepts" class="common-anchor-header">Konsep Utama<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Replika dalam memori disusun sebagai grup replika. Setiap grup replika berisi replika <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">pecahan</a>. Setiap replika pecahan memiliki replika streaming dan replika historis yang sesuai dengan <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmen</a> yang tumbuh dan disegel dalam pecahan (yaitu saluran DML).</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>Ilustrasi cara kerja replika dalam memori</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">Grup replika</h3><p>Grup replika terdiri dari beberapa <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">node kueri</a> yang bertanggung jawab untuk menangani data historis dan replika.</p>
<h3 id="Shard-replica" class="common-anchor-header">Replika pecahan</h3><p>Replika pecahan terdiri dari replika streaming dan replika historis, keduanya termasuk dalam <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">pecahan</a> yang sama. Jumlah replika pecahan dalam kelompok replika ditentukan oleh jumlah pecahan dalam koleksi tertentu.</p>
<h3 id="Streaming-replica" class="common-anchor-header">Replika streaming</h3><p>Replika streaming berisi semua <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">segmen yang berkembang</a> dari saluran DML yang sama. Secara teknis, replika streaming harus dilayani oleh hanya satu simpul kueri dalam satu replika.</p>
<h3 id="Historical-replica" class="common-anchor-header">Replika historis</h3><p>Replika historis berisi semua segmen tersegel dari saluran DML yang sama. Segmen tersegel dari satu replika historis dapat didistribusikan pada beberapa node kueri dalam grup replika yang sama.</p>
<h3 id="Shard-leader" class="common-anchor-header">Pemimpin pecahan</h3><p>Shard leader adalah simpul kueri yang melayani replika streaming dalam replika pecahan.</p>
<h2 id="Design-Details" class="common-anchor-header">Detail Desain<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">Keseimbangan</h3><p>Segmen baru yang perlu dimuat akan dialokasikan ke beberapa node kueri yang berbeda. Permintaan pencarian dapat diproses setelah setidaknya satu replika berhasil dimuat.</p>
<h3 id="Search" class="common-anchor-header">Pencarian</h3><h4 id="Cache" class="common-anchor-header">Cache</h4><p>Proksi memelihara cache yang memetakan segmen ke node kueri dan memperbaruinya secara berkala. Ketika proksi menerima permintaan, Milvus mendapatkan semua segmen tersegel yang perlu dicari dari cache dan mencoba menetapkannya ke node kueri secara merata.</p>
<p>Untuk segmen yang terus bertambah, proksi juga memelihara cache saluran-ke-simpul-simpul dan mengirimkan permintaan ke simpul-simpul kueri yang sesuai.</p>
<h4 id="Failover" class="common-anchor-header">Failover</h4><p>Cache pada proxy tidak selalu diperbarui. Beberapa segmen atau saluran mungkin telah dipindahkan ke node kueri lain ketika permintaan masuk. Dalam kasus ini, proxy akan menerima respons kesalahan, memperbarui cache dan mencoba untuk menugaskannya ke node kueri lain.</p>
<p>Segmen akan diabaikan jika proxy masih tidak dapat menemukannya setelah memperbarui cache. Hal ini dapat terjadi jika segmen telah dipadatkan.</p>
<p>Jika cache tidak akurat, proxy mungkin melewatkan beberapa segmen. Node kueri dengan saluran DML (segmen yang berkembang) mengembalikan respons pencarian bersama dengan daftar segmen yang dapat diandalkan yang dapat dibandingkan oleh proxy dan memperbarui cache.</p>
<h3 id="Enhancement" class="common-anchor-header">Peningkatan</h3><p>Proxy tidak dapat mengalokasikan permintaan pencarian ke node kueri secara merata dan node kueri mungkin memiliki sumber daya yang berbeda untuk melayani permintaan pencarian. Untuk menghindari distribusi sumber daya yang berekor panjang, proksi akan menetapkan segmen aktif pada node kueri lain ke node kueri yang menganggur yang juga memiliki segmen ini.</p>
